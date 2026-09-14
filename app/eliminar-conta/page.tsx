"use client";

import { FormEvent, useEffect, useState } from "react";
// @ts-expect-error Next.js handles this global stylesheet import at build time.
import "./eliminar-conta.css";

type Step = 1 | 2 | 3;

export default function EliminarContaPage() {
  const [step, setStep] = useState<Step>(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [accepted, setAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [cooldown, setCooldown] = useState(0);

  // --------------------------------------------------
  // COOLDOWN
  // --------------------------------------------------

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((current) => {
        if (current <= 1) {
          clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // --------------------------------------------------
  // HELPERS
  // --------------------------------------------------

  function clearMessages() {
    setErrorMessage("");
    setSuccessMessage("");
  }

  // --------------------------------------------------
  // REQUEST OTP
  // --------------------------------------------------

  async function requestOtp(event?: FormEvent) {
    event?.preventDefault();

    clearMessages();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setErrorMessage("Introduz o teu email.");
      return;
    }

    if (!normalizedEmail.includes("@")) {
      setErrorMessage("Introduz um email válido.");
      return;
    }

    if (cooldown > 0) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/account-deletion/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: normalizedEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Não foi possível processar o pedido."
        );
      }

      setEmail(normalizedEmail);

      setCooldown(45);

      setStep(2);

    } catch (error) {
      console.error(
        "[account deletion] request error:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado."
      );
    } finally {
      setLoading(false);
    }
  }

  // --------------------------------------------------
  // CONFIRM DELETE
  // --------------------------------------------------

  async function confirmDeletion(
    event?: FormEvent
  ) {
    event?.preventDefault();

    clearMessages();

    if (!code || code.length !== 6) {
      setErrorMessage(
        "Introduz o código de 6 dígitos."
      );
      return;
    }

    if (!accepted) {
      setErrorMessage(
        "Confirma que compreendes que esta ação é permanente."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/account-deletion/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Não foi possível eliminar a conta."
        );
      }

      setSuccessMessage(
        data?.message ||
          "A tua conta foi eliminada com sucesso."
      );

      setStep(3);

    } catch (error) {
      console.error(
        "[account deletion] confirm error:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Código inválido ou expirado."
      );
    } finally {
      setLoading(false);
    }
  }

  // --------------------------------------------------
  // RESEND
  // --------------------------------------------------

  async function resendCode() {
    if (cooldown > 0 || loading) {
      return;
    }

    await requestOtp();
  }

  // --------------------------------------------------
  // INPUT OTP
  // --------------------------------------------------

  function handleCodeChange(
    value: string
  ) {
    const numericValue = value
      .replace(/\D/g, "")
      .slice(0, 6);

    setCode(numericValue);
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <main className="delete-page">

      {/* HEADER */}

      <header className="delete-header">

        <div className="delete-header-inner">

          <div className="delete-brand">
            Carro<span>NaMão</span>
          </div>

          <div className="delete-header-label">
            Remoção de conta
          </div>

        </div>

      </header>


      {/* CONTENT */}

      <div className="delete-container">

        <h1 className="delete-title">
          Apagar a tua conta
        </h1>

        <p className="delete-subtitle">
          Este processo remove permanentemente a tua
          conta CarroNaMão e os dados associados.
          Segue os passos abaixo para confirmar.
        </p>


        {/* WARNING */}

        <div className="delete-warning">

          <div className="delete-warning-title">
            <span>⚠️</span>
            Esta ação é permanente e irreversível
          </div>

          <p>
            Depois de confirmares a eliminação, a tua
            conta, anúncios e restantes dados associados
            não poderão ser recuperados.
          </p>

        </div>


        {/* ERROR */}

        {errorMessage && (

          <div
            className="delete-alert delete-alert-error"
            role="alert"
          >
            <span>⚠️</span>

            <span>
              {errorMessage}
            </span>

          </div>

        )}


        {/* SUCCESS */}

        {successMessage && step !== 3 && (

          <div
            className="delete-alert delete-alert-success"
            role="status"
          >
            <span>✓</span>

            <span>
              {successMessage}
            </span>

          </div>

        )}


        {/* STEPS */}

        <ol className="delete-steps">


          {/* STEP 1 */}

          <li
            className={`
              delete-step
              ${step === 1 ? "active" : ""}
              ${step > 1 ? "completed" : ""}
            `}
          >

            <div className="delete-step-number">
              {step > 1 ? "✓" : "1"}
            </div>

            <div className="delete-step-header">

              <h2>
                Introduz o teu email
              </h2>

            </div>


            {step === 1 && (

              <div className="delete-step-content">

                <p className="delete-step-description">
                  Introduz o endereço de email associado
                  à tua conta CarroNaMão. Enviaremos um
                  código de confirmação.
                </p>


                <form
                  onSubmit={requestOtp}
                  className="delete-form"
                >

                  <label htmlFor="email">
                    Email da conta
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="tuemail@exemplo.com"
                    autoComplete="email"
                    disabled={loading}
                  />


                  <button
                    type="submit"
                    className="delete-primary-button"
                    disabled={loading}
                  >

                    {loading ? (
                      <>
                        <span className="spinner" />
                        A enviar...
                      </>
                    ) : (
                      <>
                        Enviar código
                        <span>→</span>
                      </>
                    )}

                  </button>

                </form>

              </div>

            )}

          </li>


          {/* STEP 2 */}

          <li
            className={`
              delete-step
              ${step === 2 ? "active" : ""}
              ${step > 2 ? "completed" : ""}
            `}
          >

            <div className="delete-step-number">
              {step > 2 ? "✓" : "2"}
            </div>


            <div className="delete-step-header">

              <h2>
                Confirma o código enviado por email
              </h2>

            </div>


            {step === 2 && (

              <div className="delete-step-content">

                <p className="delete-step-description">
                  Enviámos um código de confirmação para:
                </p>

                <div className="delete-email-display">
                  {email}
                </div>


                <form
                  onSubmit={confirmDeletion}
                  className="delete-form"
                >

                  <label htmlFor="code">
                    Código de 6 dígitos
                  </label>

                  <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(event) =>
                      handleCodeChange(
                        event.target.value
                      )
                    }
                    className="delete-otp-input"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="000000"
                    disabled={loading}
                  />


                  <div className="delete-otp-hint">
                    O código expira em 15 minutos.
                  </div>


                  <button
                    type="button"
                    className="delete-resend-button"
                    onClick={resendCode}
                    disabled={
                      cooldown > 0 || loading
                    }
                  >

                    {cooldown > 0
                      ? `Reenviar código (${cooldown}s)`
                      : "Não recebeste? Reenviar código"
                    }

                  </button>


                  {/* CONFIRMATION */}

                  <div className="delete-confirm-box">

                    <label className="delete-checkbox">

                      <input
                        type="checkbox"
                        checked={accepted}
                        onChange={(event) =>
                          setAccepted(
                            event.target.checked
                          )
                        }
                        disabled={loading}
                      />

                      <span>
                        Entendo que esta ação é{" "}
                        <strong>
                          permanente e irreversível
                        </strong>
                        . A minha conta, anúncios e
                        restantes dados associados serão
                        apagados.
                      </span>

                    </label>

                  </div>


                  <button
                    type="submit"
                    className="delete-danger-button"
                    disabled={
                      loading ||
                      code.length !== 6 ||
                      !accepted
                    }
                  >

                    {loading ? (
                      <>
                        <span className="spinner" />
                        A eliminar...
                      </>
                    ) : (
                      <>
                        Apagar a minha conta
                        <span>→</span>
                      </>
                    )}

                  </button>

                </form>

              </div>

            )}

          </li>


          {/* STEP 3 */}

          <li
            className={`
              delete-step
              ${step === 3 ? "active completed" : ""}
            `}
          >

            <div className="delete-step-number">
              {step === 3 ? "✓" : "3"}
            </div>


            <div className="delete-step-header">

              <h2>
                Conta removida
              </h2>

            </div>


            {step === 3 && (

              <div className="delete-step-content">

                <div className="delete-success">

                  <div className="delete-success-icon">
                    ✓
                  </div>

                  <div>

                    <h3>
                      Conta eliminada
                    </h3>

                    <p>
                      A tua conta e os dados associados
                      foram removidos com sucesso.
                      Podes fechar esta página.
                    </p>

                  </div>

                </div>

              </div>

            )}

          </li>

        </ol>


        {/* DATA */}

        <section className="delete-data">

          <h2>
            O que acontece aos teus dados
          </h2>


          <ul>

            <li>
              Perfil, email e número de telefone
              associados à conta.
            </li>

            <li>
              Anúncios de carros publicados por ti.
            </li>

            <li>
              Carros guardados, favoritos e
              preferências da conta.
            </li>

          </ul>


          <p className="delete-retention">

            Alguns registos podem ser retidos por período
            limitado quando exigido por lei, por exemplo
            para fins fiscais ou de segurança.

            Para mais informação, contacta{" "}

            <a href="mailto:suporte@ndlovutechsolutions.com">
              suporte@ndlovutechsolutions.com
            </a>.

          </p>

        </section>

      </div>

    </main>
  );
}