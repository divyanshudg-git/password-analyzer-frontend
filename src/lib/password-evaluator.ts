export type PasswordLabel = "Weak" | "Moderate" | "Strong";

export type PasswordCheck = {
  label: string;
  passed: boolean;
};

export type PasswordInsight = {
  score: number;
  label: PasswordLabel;
  confidence: number;
  entropy: number;
  tips: string[];
  checks: PasswordCheck[];
  breakdown: {
    length: number;
    variety: number;
    hygiene: number;
    entropy: number;
  };
  source: "model" | "heuristic";
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

function normalizeTokens(personalInfo: string) {
  return personalInfo
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3);
}

function pickLabel(score: number): PasswordLabel {
  if (score >= 78) return "Strong";
  if (score >= 52) return "Moderate";
  return "Weak";
}

function uniqueRatio(password: string) {
  if (!password.length) return 0;
  return new Set(password).size / password.length;
}

function buildTips(checks: PasswordCheck[]) {
  const tips: string[] = [];

  if (!checks.find((check) => check.label === "At least 12 characters")?.passed) {
    tips.push("Increase your password length to at least 12 characters.");
  }
  if (!checks.find((check) => check.label === "Uppercase and lowercase mix")?.passed) {
    tips.push("Use both uppercase and lowercase letters.");
  }
  if (!checks.find((check) => check.label === "Includes number")?.passed) {
    tips.push("Add at least one number.");
  }
  if (!checks.find((check) => check.label === "Includes special symbol")?.passed) {
    tips.push("Add at least one special symbol like ! @ # $ %.");
  }
  if (!checks.find((check) => check.label === "No obvious repeated pattern")?.passed) {
    tips.push("Avoid repeated patterns like aaa or 123123.");
  }
  if (!checks.find((check) => check.label === "No personal information tokens")?.passed) {
    tips.push("Do not include names, birth years, or personal identifiers.");
  }

  if (!tips.length) {
    tips.push("Great baseline. Keep this password unique and use it with MFA.");
  }

  return tips;
}

export function evaluatePasswordStrength(
  password: string,
  personalInfo = "",
): PasswordInsight {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const longEnough = password.length >= 12;
  const veryLong = password.length >= 16;
  const repeatedPattern = /(.)\1{2,}/.test(password) || /(\d{3,})\1/.test(password);
  const sequencePattern = /0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf/i.test(
    password,
  );

  const infoTokens = normalizeTokens(personalInfo);
  const loweredPassword = password.toLowerCase();
  const containsPersonalToken = infoTokens.some((token) => loweredPassword.includes(token));

  const characterPool =
    (hasLower ? 26 : 0) +
    (hasUpper ? 26 : 0) +
    (hasNumber ? 10 : 0) +
    (hasSymbol ? 32 : 0);

  const entropy = Math.round(password.length * Math.log2(Math.max(1, characterPool)));
  const varietyClasses = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
  const uniqueness = uniqueRatio(password);

  let score = 12;
  score += clamp(password.length * 2.3, 0, 36);
  score += varietyClasses * 11;
  score += clamp(Math.round(uniqueness * 18), 0, 18);
  score += veryLong ? 7 : 0;
  score -= repeatedPattern ? 16 : 0;
  score -= sequencePattern ? 10 : 0;
  score -= containsPersonalToken ? 14 : 0;

  score = clamp(Math.round(score), 2, 99);

  const checks: PasswordCheck[] = [
    { label: "At least 12 characters", passed: longEnough },
    { label: "Uppercase and lowercase mix", passed: hasUpper && hasLower },
    { label: "Includes number", passed: hasNumber },
    { label: "Includes special symbol", passed: hasSymbol },
    { label: "No obvious repeated pattern", passed: !repeatedPattern && !sequencePattern },
    { label: "No personal information tokens", passed: !containsPersonalToken },
  ];

  const failedChecks = checks.filter((check) => !check.passed).length;
  const confidence = clamp(Number((0.94 - failedChecks * 0.08).toFixed(2)), 0.5, 0.98);

  const hygieneBase = clamp(100 - failedChecks * 16, 8, 100);

  return {
    score,
    label: pickLabel(score),
    confidence,
    entropy,
    checks,
    tips: buildTips(checks),
    breakdown: {
      length: clamp(Math.round((password.length / 16) * 100), 6, 100),
      variety: clamp(Math.round((varietyClasses / 4) * 100), 10, 100),
      hygiene: hygieneBase,
      entropy: clamp(Math.round((entropy / 80) * 100), 8, 100),
    },
    source: "heuristic",
  };
}

export function applyModelSignal(
  localInsight: PasswordInsight,
  modelPrediction: string,
): PasswordInsight {
  const normalized = modelPrediction.trim().toLowerCase();
  const insight = { ...localInsight, source: "model" as const };

  if (normalized === "strong") {
    const score = clamp(Math.max(localInsight.score, 80), 0, 100);
    return {
      ...insight,
      score,
      label: pickLabel(score),
      confidence: clamp(localInsight.confidence + 0.03, 0, 1),
    };
  }

  if (normalized === "weak") {
    const score = clamp(Math.min(localInsight.score, 45), 0, 100);
    return {
      ...insight,
      score,
      label: pickLabel(score),
      confidence: clamp(localInsight.confidence + 0.03, 0, 1),
    };
  }

  if (normalized === "moderate" || normalized === "medium") {
    const score = clamp(Math.round((localInsight.score + 62) / 2), 0, 100);
    return {
      ...insight,
      score,
      label: pickLabel(score),
      confidence: clamp(localInsight.confidence + 0.02, 0, 1),
    };
  }

  return localInsight;
}
