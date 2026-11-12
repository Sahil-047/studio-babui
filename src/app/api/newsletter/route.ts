import { isValidEmail } from "@/lib/utils";

/**
 * Newsletter sign-up endpoint.
 *
 * INTEGRATION POINT: no email provider is connected yet. Replace the marked
 * block with a call to the studio's provider (Mailchimp, Klaviyo, Resend, …),
 * reading its API key from an environment variable. Until then the endpoint
 * validates the address and answers honestly that it was received.
 */
export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return Response.json({ ok: false, message: "We couldn't read that request." }, { status: 400 });
  }

  if (!isValidEmail(email) || email.length > 254) {
    return Response.json({ ok: false, message: "Enter an email address like name@example.com." }, { status: 422 });
  }

  // ── Provider call goes here ──────────────────────────────────────
  // await provider.subscribe({ email });

  return Response.json({
    ok: true,
    message: "Thank you. You're on the list for letters from Babui.",
  });
}
