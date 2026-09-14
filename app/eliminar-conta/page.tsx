// app/eliminar-conta/page.tsx
"use client";

import { useRef, useState } from "react";

type Step = "email" | "otp" | "success";

export default function DeleteAccountPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmChecked, setConfirmChecked] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleRequestCode = async () => {
    setError(null);

    if (!email.includes("@") || !email.includes(".")) {
      setError("Escreve um email válido.");
      return;
    }
    if (!confirmChecked) {
      setError("Confirma que entendes que esta ação é permanente.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/account-deletion/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      if (!res.ok) throw new Error(res.statusText);

      setStep("otp");
    } catch (err) {
      setError(`Não foi possível enviar o código. Tenta novamente. ${err instanceof Error ? err.message : ""}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // só dígitos, um por caixa

    const next = [...code];
    next[index] = value;
    setCode(next);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirmDeletion = async () => {
    setError(null);
    const fullCode = code.join("");

    if (fullCode.length !== 6) {
      setError("Introduz o código de 6 dígitos.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/account-deletion/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code: fullCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Código incorreto ou expirado.");
        return;
      }

      setStep("success");
    } catch (err) {
      setError("Erro inesperado. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .del-page {
          --bg: #101622;
          --surface: #17202F;
          --surface-2: #172540;
          --accent: #1152D4;
          --accent-glow: #3b82f6;
          --danger: #ef4444;
          --success: #22c55e;
          --text-1: #F5F7FA;
          --text-2: #A9B2C3;
          --text-3: #6B7488;
          --border: rgba(255,255,255,0.09);

          max-width: 520px;
          margin: 0 auto;
          padding: 56px 24px 100px;
          background: var(--bg);
          color: var(--text-1);
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          min-height: 100vh;
        }

        .del-page header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .del-page .brand {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 700;
        }
        .del-page .brand span { color: var(--accent-glow); }

        .del-page h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.3px;
          margin: 0 0 10px;
        }

        .del-page .subtitle {
          font-size: 14px;
          color: var(--text-2);
          margin: 0 0 28px;
        }

        .del-page .warning-box {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 14px;
          padding: 18px 20px;
          margin-bottom: 28px;
        }
        .del-page .warning-box h3 {
          color: var(--danger);
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 10px;
        }
        .del-page .warning-box ul {
          margin: 0;
          padding-left: 18px;
        }
        .del-page .warning-box li {
          font-size: 13.5px;
          color: var(--text-2);
          margin-bottom: 6px;
          line-height: 1.5;
        }

        .del-page label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-2);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
        }

        .del-page input[type="email"] {
          width: 100%;
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 15px;
          color: var(--text-1);
          margin-bottom: 20px;
          outline: none;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }
        .del-page input[type="email"]:focus {
          border-color: var(--accent-glow);
        }

        .del-page .checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 24px;
          cursor: pointer;
        }
        .del-page .checkbox-row input {
          margin-top: 3px;
          width: 16px;
          height: 16px;
          accent-color: var(--danger);
          flex-shrink: 0;
        }
        .del-page .checkbox-row span {
          font-size: 13.5px;
          color: var(--text-2);
          line-height: 1.5;
        }

        .del-page .otp-row {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }
        .del-page .otp-box {
          flex: 1;
          height: 56px;
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          color: var(--text-1);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .del-page .otp-box:focus {
          border-color: var(--accent-glow);
        }

        .del-page .btn {
          width: 100%;
          border: none;
          border-radius: 14px;
          padding: 15px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
        }
        .del-page .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .del-page .btn-primary {
          background: var(--accent);
          color: #fff;
        }
        .del-page .btn-danger {
          background: var(--danger);
          color: #fff;
        }
        .del-page .btn-ghost {
          background: transparent;
          color: var(--text-2);
          border: 1px solid var(--border);
          margin-top: 10px;
        }

        .del-page .error-text {
          color: var(--danger);
          font-size: 13px;
          margin: -10px 0 16px;
        }

        .del-page .resend-text {
          text-align: center;
          font-size: 13px;
          color: var(--text-2);
          margin-top: 16px;
        }
        .del-page .resend-text a {
          color: var(--accent-glow);
          font-weight: 600;
          cursor: pointer;
        }

        .del-page .success-box {
          text-align: center;
          padding: 40px 20px;
        }
        .del-page .success-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.3);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          font-size: 28px;
        }
        .del-page .success-box h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          margin: 0 0 10px;
        }
        .del-page .success-box p {
          font-size: 14px;
          color: var(--text-2);
          line-height: 1.6;
        }
      `}</style>

      <div className="del-page">
        <header>
          <div className="brand">
            Carro<span>NaMão</span>
          </div>
        </header>

        {step === "email" && (
          <>
            <h1>Eliminar conta</h1>
            <p className="subtitle">
              Solicita a eliminação permanente da tua conta CarroNaMão e de
              todos os dados associados.
            </p>

            <div className="warning-box">
              <h3>⚠️ Esta ação é irreversível</h3>
              <ul>
                <li>O teu perfil e dados de conta serão eliminados</li>
                <li>Todos os anúncios de veículos que publicaste serão removidos</li>
                <li>Fotografias e informações de subscrição serão apagadas</li>
                <li>Não será possível recuperar estes dados depois de confirmares</li>
              </ul>
            </div>

            <label htmlFor="email">Email da conta</label>
            <input
              id="email"
              type="email"
              placeholder="o-teu-email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={confirmChecked}
                onChange={(e) => setConfirmChecked(e.target.checked)}
              />
              <span>
                Entendo que esta ação é permanente e que todos os meus dados
                serão eliminados sem possibilidade de recuperação.
              </span>
            </label>

            {error && <p className="error-text">{error}</p>}

            <button
              className="btn btn-danger"
              onClick={handleRequestCode}
              disabled={loading}
            >
              {loading ? "A enviar..." : "Enviar código de confirmação"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <h1>Confirma o código</h1>
            <p className="subtitle">
              Enviámos um código de 6 dígitos para <strong>{email}</strong>.
              Introduz o código abaixo para confirmar a eliminação da conta.
            </p>

            <div className="otp-row">
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  className="otp-box"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(i, e)}
                />
              ))}
            </div>

            {error && <p className="error-text">{error}</p>}

            <button
              className="btn btn-danger"
              onClick={handleConfirmDeletion}
              disabled={loading}
            >
              {loading ? "A eliminar conta..." : "Confirmar e eliminar conta"}
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => {
                setStep("email");
                setCode(["", "", "", "", "", ""]);
                setError(null);
              }}
            >
              Voltar
            </button>

            <p className="resend-text">
              Não recebeste o código?{" "}
              <a onClick={handleRequestCode}>Reenviar</a>
            </p>
          </>
        )}

        {step === "success" && (
          <div className="success-box">
            <div className="success-icon">✅</div>
            <h2>Conta eliminada</h2>
            <p>
              A tua conta CarroNaMão e todos os dados associados foram
              eliminados permanentemente. Obrigado por teres usado o
              CarroNaMão.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
