"use client";

import { useState, FormEvent } from "react";

type Step = "email" | "otp" | "done";

const RESEND_COOLDOWN_SECONDS = 45;

export default function DeleteAccountPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  async function handleRequestOtp(e: FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/account-deletion/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Não foi possível enviar o código.");
        return;
      }

      setInfoMessage(data.message);
      setStep("otp");
      startCooldown();
    } catch {
      setErrorMessage("Falha de ligação. Verifica a tua internet e tenta novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (cooldown > 0) return;
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/account-deletion/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setInfoMessage(res.ok ? data.message : null);
      if (!res.ok) setErrorMessage(data.error);
      startCooldown();
    } catch {
      setErrorMessage("Falha de ligação. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  }

  function startCooldown() {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function handleConfirmDeletion(e: FormEvent) {
    e.preventDefault();
    if (!confirmed) return;

    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/account-deletion/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Não foi possível confirmar o código.");
        return;
      }

      setStep("done");
    } catch {
      setErrorMessage("Falha de ligação. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <span style={styles.wordmark}>CarroNaMão</span>
          <span style={styles.headerLabel}>Remoção de conta</span>
        </div>
      </header>

      <div style={styles.content}>
        <h1 style={styles.title}>Apagar a tua conta</h1>
        <p style={styles.subtitle}>
          Este processo remove permanentemente a tua conta CarroNaMão e os
          dados associados. Segue os passos abaixo para confirmar.
        </p>

        <ol style={styles.steps}>
          <StepItem
            number={1}
            title="Introduz o teu email"
            active={step === "email"}
            done={step !== "email"}
          >
            {step === "email" && (
              <form onSubmit={handleRequestOtp} style={styles.form}>
                <label style={styles.label} htmlFor="email">
                  Email da conta
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="tuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
                <button
                  type="submit"
                  disabled={loading || !email}
                  style={styles.primaryButton}
                >
                  {loading ? "A enviar..." : "Enviar código"}
                </button>
              </form>
            )}
          </StepItem>

          <StepItem
            number={2}
            title="Confirma o código enviado por email"
            active={step === "otp"}
            done={step === "done"}
          >
            {step === "otp" && (
              <form onSubmit={handleConfirmDeletion} style={styles.form}>
                {infoMessage && (
                  <p style={styles.infoText}>{infoMessage}</p>
                )}
                <label style={styles.label} htmlFor="code">
                  Código de 6 dígitos
                </label>
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  required
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  style={{ ...styles.input, letterSpacing: "0.3em" }}
                />

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0 || loading}
                  style={styles.linkButton}
                >
                  {cooldown > 0
                    ? `Reenviar código (${cooldown}s)`
                    : "Não recebeste? Reenviar código"}
                </button>

                <div style={styles.confirmBox}>
                  <label style={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      style={styles.checkbox}
                    />
                    <span>
                      Entendo que esta ação é <strong>permanente e irreversível</strong> —
                      a minha conta, os anúncios publicados e os carros
                      guardados serão apagados.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || code.length !== 6 || !confirmed}
                  style={styles.dangerButton}
                >
                  {loading ? "A processar..." : "Apagar a minha conta"}
                </button>
              </form>
            )}
          </StepItem>

          <StepItem
            number={3}
            title="Conta removida"
            active={step === "done"}
            done={step === "done"}
            last
          >
            {step === "done" && (
              <p style={styles.doneText}>
                A tua conta e os dados associados foram removidos com
                sucesso. Podes fechar esta página.
              </p>
            )}
          </StepItem>
        </ol>

        {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}

        <section style={styles.dataSection}>
          <h2 style={styles.dataTitle}>O que acontece aos teus dados</h2>
          <ul style={styles.dataList}>
            <li>Perfil, email e número de telefone associados à conta.</li>
            <li>Anúncios de carros publicados por ti.</li>
            <li>Carros guardados/favoritos e preferências de conta.</li>
          </ul>
          <p style={styles.retentionNote}>
            {/* Ajusta este parágrafo à tua política real de retenção de dados
                antes de publicar — a Google Play exige que este processo
                descreva claramente o que é ou não retido, e porquê. */}
            Alguns registos podem ser retidos por período limitado quando
            exigido por lei (por exemplo, para fins fiscais ou de segurança),
            mesmo após a remoção da conta. Para mais informação, contacta{" "}
            <a href="mailto:suporte@carronamao.co.mz" style={styles.link}>
              suporte@carronamao.co.mz
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

function StepItem({
  number,
  title,
  active,
  done,
  last,
  children,
}: {
  number: number;
  title: string;
  active: boolean;
  done: boolean;
  last?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <li
      style={{
        ...styles.stepItem,
        borderLeftColor: active ? "var(--amber)" : done ? "var(--asphalt)" : "var(--hairline)",
        marginBottom: last ? 0 : "2rem",
      }}
    >
      <div style={styles.stepHeader}>
        <span
          style={{
            ...styles.stepNumber,
            background: done ? "var(--asphalt)" : active ? "var(--amber)" : "transparent",
            color: done || active ? "#fff" : "var(--steel)",
            borderColor: active || done ? "transparent" : "var(--hairline)",
          }}
        >
          {done && !active ? "✓" : number}
        </span>
        <h3
          style={{
            ...styles.stepTitle,
            color: active || done ? "var(--asphalt)" : "var(--steel-light)",
          }}
        >
          {title}
        </h3>
      </div>
      {children && <div style={styles.stepBody}>{children}</div>}
    </li>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
  },
  header: {
    background: "var(--asphalt)",
    padding: "1.25rem 0",
  },
  headerInner: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "flex",
    alignItems: "baseline",
    gap: "0.75rem",
  },
  wordmark: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1.15rem",
    color: "#fff",
  },
  headerLabel: {
    fontSize: "0.85rem",
    color: "var(--steel-light)",
  },
  content: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "3rem 1.5rem 5rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 600,
    lineHeight: 1.15,
  },
  subtitle: {
    marginTop: "0.9rem",
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "var(--steel)",
    maxWidth: "42ch",
  },
  steps: {
    listStyle: "none",
    padding: 0,
    margin: "2.75rem 0 0",
  },
  stepItem: {
    borderLeftWidth: 2,
    borderLeftStyle: "solid",
    paddingLeft: "1.5rem",
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    borderWidth: 1,
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.85rem",
    fontWeight: 600,
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: "1.05rem",
    fontWeight: 600,
  },
  stepBody: {
    marginTop: "1rem",
    marginLeft: "2.6rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    maxWidth: 360,
  },
  label: {
    fontSize: "0.85rem",
    color: "var(--steel)",
    fontWeight: 500,
  },
  input: {
    padding: "0.7rem 0.85rem",
    fontSize: "1rem",
    border: "1px solid var(--hairline)",
    borderRadius: 6,
    background: "#fff",
    color: "var(--asphalt)",
  },
  primaryButton: {
    marginTop: "0.4rem",
    padding: "0.75rem 1.25rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    background: "var(--amber)",
    color: "var(--asphalt)",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    alignSelf: "flex-start",
  },
  dangerButton: {
    marginTop: "0.25rem",
    padding: "0.75rem 1.25rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    background: "var(--danger)",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    alignSelf: "flex-start",
  },
  linkButton: {
    alignSelf: "flex-start",
    background: "none",
    border: "none",
    color: "var(--amber-dark)",
    fontSize: "0.85rem",
    padding: 0,
    cursor: "pointer",
    textDecoration: "underline",
  },
  confirmBox: {
    marginTop: "0.5rem",
    padding: "0.9rem 1rem",
    background: "var(--asphalt-soft)",
    borderRadius: 8,
  },
  checkboxRow: {
    display: "flex",
    gap: "0.6rem",
    alignItems: "flex-start",
    fontSize: "0.85rem",
    color: "#e5e4e0",
    lineHeight: 1.5,
    cursor: "pointer",
  },
  checkbox: {
    marginTop: "0.2rem",
    flexShrink: 0,
  },
  infoText: {
    fontSize: "0.85rem",
    color: "var(--steel)",
    margin: 0,
  },
  doneText: {
    fontSize: "0.95rem",
    color: "var(--asphalt)",
    maxWidth: "40ch",
    lineHeight: 1.6,
  },
  errorText: {
    marginTop: "1.5rem",
    padding: "0.75rem 1rem",
    background: "#fbe9e7",
    color: "var(--danger-dark)",
    borderRadius: 6,
    fontSize: "0.9rem",
    maxWidth: 480,
  },
  dataSection: {
    marginTop: "4rem",
    paddingTop: "2rem",
    borderTop: "1px solid var(--hairline)",
  },
  dataTitle: {
    fontSize: "1.05rem",
    fontWeight: 600,
  },
  dataList: {
    marginTop: "0.9rem",
    paddingLeft: "1.2rem",
    color: "var(--steel)",
    fontSize: "0.92rem",
    lineHeight: 1.9,
  },
  retentionNote: {
    marginTop: "1.25rem",
    fontSize: "0.85rem",
    color: "var(--steel)",
    lineHeight: 1.6,
    maxWidth: "58ch",
  },
  link: {
    color: "var(--amber-dark)",
  },
};
