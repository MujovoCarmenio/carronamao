// app/carronamao/termos/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos e Condições — CarroNaMão",
  description:
    "Termos e condições de utilização da aplicação CarroNaMão e responsabilidades dos utilizadores.",
};

export default function TermosCarroNaMao() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .cnm-page {
          --bg: #101622;
          --surface: #101622;
          --surface-2: #17202F;
          --accent: #1152D4;
          --accent-glow: #3b82f6;
          --text-1: #F5F7FA;
          --text-2: #A9B2C3;
          --text-3: #6B7488;
          --border: rgba(255,255,255,0.09);
          --warning: #f59e0b;

          max-width: 760px;
          margin: 0 auto;
          padding: 56px 24px 100px;
          background: var(--bg);
          color: var(--text-1);
          font-family: 'Inter', sans-serif;
          line-height: 1.7;
          min-height: 100vh;
        }

        .cnm-page header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .cnm-page .logo-badge {
          width: 40px; height: 40px;
          border-radius: 11px;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .cnm-page .brand {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 700;
        }

        .cnm-page .brand span { color: var(--accent-glow); }

        .cnm-page h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin: 28px 0 6px;
        }

        .cnm-page .cnm-updated {
          display: block;
          font-size: 13px;
          color: var(--text-3);
          margin-bottom: 36px;
        }

        .cnm-page .notice {
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.25);
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 13px;
          color: var(--warning);
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .cnm-page h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 19px;
          font-weight: 600;
          margin: 40px 0 12px;
          padding-top: 8px;
        }

        .cnm-page h3 {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-1);
          margin: 22px 0 8px;
        }

        .cnm-page p, .cnm-page li {
          font-size: 15px;
          color: var(--text-2);
        }

        .cnm-page ul { padding-left: 20px; margin: 10px 0; }
        .cnm-page li { margin-bottom: 6px; }

        .cnm-page a { color: var(--accent-glow); text-decoration: none; }
        .cnm-page a:hover { text-decoration: underline; }

        .cnm-page strong { color: var(--text-1); font-weight: 600; }

        .cnm-page .table {
          width: 100%;
          border-collapse: collapse;
          margin: 14px 0 24px;
          font-size: 13.5px;
        }
        .cnm-page .table th, .cnm-page .table td {
          text-align: left;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border);
          color: var(--text-2);
        }
        .cnm-page .table th {
          color: var(--text-1);
          font-weight: 600;
          background: var(--surface-2);
        }
        .cnm-page .table tr:last-child td { border-bottom: none; }

        .cnm-page .contact-card {
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px 22px;
          margin-top: 16px;
        }
        .cnm-page .contact-card p { margin: 4px 0; }

        .cnm-page footer {
          margin-top: 56px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-3);
          text-align: center;
        }
      `}</style>

      <div className="cnm-page">
        <header>
          <div className="logo-badge">
            <img
              src="https://tdtudeklstqvpkspvrci.supabase.co/storage/v1/object/public/carronamao/icon-192.png"
              alt="CarroNaMão Logo"
              width="40"
              style={{ display: "block", border: 0 }}
            />
          </div>
          <div className="brand">
            Carro<span>NaMão</span>
          </div>
        </header>

        <main className="cnm-content">
          <h1>Termos e Condições</h1>
          <span className="cnm-updated">Última actualização: Agosto de 2026</span>

          <p>
            Estes Termos e Condições regem a utilização da aplicação CarroNaMão,
            propriedade da Ndlovu Tech Solutions. Ao criar uma conta ou usar a
            aplicação, o utilizador aceita estes termos na íntegra.
          </p>

          <h2>1. Definições</h2>
          <p>
            &ldquo;Aplicação&rdquo; refere-se ao CarroNaMão, disponível para
            Android e iOS. &ldquo;Utilizador&rdquo; é qualquer pessoa que crie
            uma conta na aplicação. &ldquo;Anúncio&rdquo; é qualquer publicação
            de um veículo criada por um utilizador.
          </p>

          <h2>2. Conta e elegibilidade</h2>
          <ul>
            <li>É necessário ter 18 anos ou mais para criar uma conta.</li>
            <li>
              O utilizador é responsável por manter a confidencialidade das
              suas credenciais de acesso.
            </li>
            <li>
              Informação fornecida no registo (nome, contacto, província) deve
              ser verdadeira e mantida actualizada.
            </li>
          </ul>

          <h2>3. Anúncios de veículos</h2>
          <ul>
            <li>
              O utilizador é o único responsável pela veracidade das
              informações, fotografias e preço apresentados em cada anúncio.
            </li>
            <li>
              O CarroNaMão actua como intermediário de listagem e não é parte
              em nenhuma transacção entre comprador e vendedor.
            </li>
            <li>
              É proibido anunciar veículos roubados, sem documentação válida,
              ou publicar informação enganosa sobre o estado do veículo.
            </li>
            <li>
              A Ndlovu Tech Solutions reserva-se o direito de remover qualquer
              anúncio que viole estes termos, sem aviso prévio.
            </li>
          </ul>

          <h2>4. Subscrições e pagamentos</h2>
          <ul>
            <li>
              A publicação de anúncios pode requerer uma subscrição activa,
              processada através da rede M-Pesa.
            </li>
            <li>
              Os pagamentos são processados por um gateway de pagamento
              certificado; a Ndlovu Tech Solutions não armazena dados
              completos de cartões ou credenciais M-Pesa.
            </li>
            <li>
              A subscrição renova-se automaticamente no final de cada período,
              salvo cancelamento pelo utilizador antes da data de renovação.
            </li>
            <li>
              Pagamentos confirmados não são reembolsáveis, excepto em casos de
              erro técnico comprovado da plataforma.
            </li>
          </ul>

          <h2>5. Conduta proibida</h2>
          <p>É expressamente proibido:</p>
          <ul>
            <li>Publicar conteúdo falso, difamatório ou fraudulento.</li>
            <li>Usar a aplicação para fins ilegais ou não autorizados.</li>
            <li>
              Tentar contornar os mecanismos de subscrição ou pagamento da
              aplicação.
            </li>
            <li>
              Recolher dados de outros utilizadores para fins não previstos
              nestes termos.
            </li>
          </ul>

          <h2>6. Limitação de responsabilidade</h2>
          <p>
            A Ndlovu Tech Solutions não garante a disponibilidade contínua e
            ininterrupta da aplicação, nem se responsabiliza por danos
            resultantes de transacções realizadas entre utilizadores fora da
            plataforma. O uso da aplicação é feito por conta e risco do
            utilizador.
          </p>

          <h2>7. Alterações aos termos</h2>
          <p>
            Estes termos podem ser actualizados periodicamente. Alterações
            significativas serão comunicadas através da aplicação. A
            utilização continuada após uma actualização constitui aceitação
            dos novos termos.
          </p>

          <h2>8. Contacto</h2>
          <div className="contact-card">
            <p>
              Para questões relacionadas com estes termos, contacte{" "}
              <a href="mailto:suporte@ndlovutechsolutions.com">
                suporte@ndlovutechsolutions.com
              </a>
              .
            </p>
          </div>
        </main>
      </div>
    </>
  );
}