// lib/resend.ts
const RESEND_API_KEY = process.env.RESEND_API_KEY as string;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@ndlovutechsolutions.com";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `CarroNaMão <${FROM_EMAIL}>`,
        to,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[resend] falha ao enviar email:", errorText);
      return { success: false, error: errorText };
    }

    return { success: true };
  } catch (err) {
    console.error("[resend] erro inesperado:", err);
    return { success: false, error: String(err) };
  }
}
