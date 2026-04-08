import { NextResponse } from "next/server";
import { z } from "zod";
import { applyModelSignal, evaluatePasswordStrength } from "@/lib/password-evaluator";

const requestSchema = z.object({
  password: z.string().min(1).max(256),
  personalInfo: z.string().max(240).optional().default(""),
});

type RemotePredictionResponse = {
  prediction?: string;
};

const DEFAULT_MODEL_URL =
  "https://password-analyzer-api-r397.onrender.com/predict";

async function fetchModelPrediction(password: string, personalInfo: string) {
  const endpoint = process.env.PASSWORD_ANALYZER_ENDPOINT ?? DEFAULT_MODEL_URL;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, personal_info: personalInfo }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as RemotePredictionResponse;
    return payload.prediction ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  let parsedRequest: z.infer<typeof requestSchema>;

  try {
    const body = await request.json();
    parsedRequest = requestSchema.parse(body);
  } catch {
    return NextResponse.json(
      { message: "Invalid payload. Provide a password string." },
      { status: 400 },
    );
  }

  const localInsight = evaluatePasswordStrength(
    parsedRequest.password,
    parsedRequest.personalInfo,
  );
  const modelPrediction = await fetchModelPrediction(
    parsedRequest.password,
    parsedRequest.personalInfo,
  );

  if (!modelPrediction) {
    return NextResponse.json(localInsight, { status: 200 });
  }

  const merged = applyModelSignal(localInsight, modelPrediction);
  return NextResponse.json(merged, { status: 200 });
}
