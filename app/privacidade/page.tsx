// app/carronamao/privacidade/page.tsx
//
// Política de privacidade servida como página normal do Next.js —
// fica disponível em ndlovutechsolutions.com/carronamao/privacidade
// depois de fazeres deploy. É este URL que colas no Google Play Console.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — CarroNaMão",
  description:
    "Política de Privacidade do CarroNaMão, aplicação de publicidade de veículos em Moçambique.",
};

export default function PrivacyPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .privacy-page {
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

          background: var(--bg);
          color: var(--text-1);
          font-family: 'Inter', sans-serif;
          line-height: 1.7;
          min-height: 100vh;
        }

        .privacy-page .wrap {
          max-width: 760px;
          margin: 0 auto;
          padding: 56px 24px 100px;
        }

        .privacy-page header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .privacy-page .logo-badge {
          width: 38px; height: 38px;
          border-radius: 11px;
          background: linear-gradient(135deg, var(--accent), #0d3fa8);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .privacy-page .brand {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 700;
        }

        .privacy-page .brand span { color: var(--accent-glow); }

        .privacy-page h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin: 28px 0 6px;
        }

        .privacy-page .updated {
          font-size: 13px;
          color: var(--text-3);
          margin-bottom: 36px;
        }

        .privacy-page .notice {
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.25);
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 13px;
          color: var(--warning);
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .privacy-page h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 19px;
          font-weight: 600;
          margin: 40px 0 12px;
          padding-top: 8px;
        }

        .privacy-page h3 {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-1);
          margin: 22px 0 8px;
        }

        .privacy-page p, .privacy-page li {
          font-size: 15px;
          color: var(--text-2);
        }

        .privacy-page ul { padding-left: 20px; margin: 10px 0; }
        .privacy-page li { margin-bottom: 6px; }

        .privacy-page a { color: var(--accent-glow); text-decoration: none; }
        .privacy-page a:hover { text-decoration: underline; }

        .privacy-page strong { color: var(--text-1); font-weight: 600; }

        .privacy-page .table {
          width: 100%;
          border-collapse: collapse;
          margin: 14px 0 24px;
          font-size: 13.5px;
        }
        .privacy-page .table th, .privacy-page .table td {
          text-align: left;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border);
          color: var(--text-2);
        }
        .privacy-page .table th {
          color: var(--text-1);
          font-weight: 600;
          background: var(--surface-2);
        }
        .privacy-page .table tr:last-child td { border-bottom: none; }

        .privacy-page .contact-card {
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px 22px;
          margin-top: 16px;
        }
        .privacy-page .contact-card p { margin: 4px 0; }

        .privacy-page footer {
          margin-top: 56px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-3);
          text-align: center;
        }
      `}</style>

      <div className="privacy-page">
        <div className="wrap">
          <header>
            <div className="logo-badge">
              <img
                src="https://tdtudeklstqvpkspvrci.supabase.co/storage/v1/object/public/carronamao/icon-192.png"
                alt="CarroNaMão Logo"
                width="40"
                className="display: block; border: 0"
              />
            </div>
            <div className="brand">Carro<span>NaMão</span></div>
          </header>

          <h1>Política de Privacidade</h1>
          <p className="updated">
            Última atualização: <strong>Setembro de 2026</strong>
          </p>

          <p>
            A <strong>Ndlovu Tech Solutions</strong> (&quot;nós&quot;, &quot;nosso&quot;) desenvolve e
            opera o <strong>CarroNaMão</strong> (&quot;Aplicação&quot;, &quot;Serviço&quot;), uma
            plataforma de publicidade de veículos disponível em
            Moçambique. Esta Política de Privacidade explica que dados pessoais
            recolhemos, como os usamos, com quem os partilhamos, e quais são os
            teus direitos sobre eles.
          </p>
          <p>
            Ao criares uma conta ou usares o CarroNaMão, aceitas as práticas
            descritas nesta política.
          </p>

          <h2>1. Que dados recolhemos</h2>

          <h3>1.1 Dados fornecidos diretamente por ti</h3>
          <table className="table">
            <tbody>
              <tr>
                <th>Dado</th>
                <th>Quando é recolhido</th>
              </tr>
              <tr>
                <td>Nome completo</td>
                <td>Criação de conta</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>Criação de conta, autenticação</td>
              </tr>
              <tr>
                <td>Número de telefone</td>
                <td>Criação de conta, contacto sobre anúncios</td>
              </tr>
              <tr>
                <td>Data de nascimento</td>
                <td>Criação de conta (verificação de idade mínima)</td>
              </tr>
              <tr>
                <td>Cidade/Endereço</td>
                <td>Perfil de utilizador, localização de anúncios</td>
              </tr>
              <tr>
                <td>Fotografia de perfil</td>
                <td>Opcional, editável no perfil</td>
              </tr>
              <tr>
                <td>Fotografias e detalhes de veículos</td>
                <td>Ao publicares um anúncio</td>
              </tr>
              <tr>
                <td>Password</td>
                <td>Criação de conta — armazenada de forma encriptada, nunca em texto simples</td>
              </tr>
            </tbody>
          </table>

          <h3>1.2 Dados recolhidos automaticamente</h3>
          <ul>
            <li>
              Identificador do dispositivo e informações técnicas básicas
              (modelo, sistema operativo), para efeitos de compatibilidade e
              suporte
            </li>
            <li>
              Dados de utilização da aplicação (ecrãs visitados,
              funcionalidades usadas), para melhorarmos o serviço
            </li>
          </ul>

          <h2>2. Como usamos os teus dados</h2>
          <ul>
            <li>Criar e gerir a tua conta, incluindo autenticação e recuperação de acesso</li>
            <li>Publicar e apresentar os teus anúncios de veículos a outros utilizadores</li>
            <li>Enviar emails transacionais — confirmação de conta, recuperação de password</li>
            <li>Responder a pedidos de suporte que nos envies</li>
            <li>
              Detetar e prevenir fraude, abuso ou atividade que viole os
              nossos termos de uso
            </li>
            <li>Melhorar e manter a qualidade e segurança do Serviço</li>
          </ul>
          <p>
            Não vendemos os teus dados pessoais a terceiros, nem os usamos
            para publicidade de terceiros.
          </p>

          <h2>3. Com quem partilhamos os teus dados</h2>
          <p>
            Partilhamos dados apenas com prestadores de serviços que nos
            ajudam a operar o CarroNaMão, na medida necessária para cada
            serviço:
          </p>
          <table className="table">
            <tbody>
              <tr>
                <th>Prestador</th>
                <th>Finalidade</th>
                <th>Dados partilhados</th>
              </tr>
              <tr>
                <td>Supabase</td>
                <td>Base de dados, autenticação e armazenamento de imagens</td>
                <td>Todos os dados de conta e conteúdo da app</td>
              </tr>
              <tr>
                <td>Resend</td>
                <td>Envio de emails transacionais</td>
                <td>Endereço de email, conteúdo da mensagem</td>
              </tr>
              <tr>
                <td>Vercel</td>
                <td>Alojamento da infraestrutura de backend/API</td>
                <td>Dados em trânsito, conforme necessário para o funcionamento da API</td>
              </tr>
            </tbody>
          </table>
          <p>
            Também podemos divulgar dados se exigido por lei, ordem judicial,
            ou para proteger os direitos, propriedade ou segurança da Ndlovu
            Tech Solutions, dos nossos utilizadores, ou de terceiros.
          </p>

          <h2>4. Onde e como os dados são armazenados</h2>
          <p>
            Os teus dados são armazenados em infraestrutura fornecida pelo
            Supabase, com controlo de acesso através de políticas de
            segurança ao nível da base de dados (Row Level Security),
            garantindo que cada utilizador só acede aos seus próprios dados
            privados. As comunicações entre a aplicação e os nossos
            servidores são encriptadas (HTTPS/TLS).
          </p>

          <h2>5. Quanto tempo guardamos os teus dados</h2>
          <p>
            Mantemos os teus dados enquanto a tua conta estiver ativa. Se
            eliminares a tua conta, removemos ou anonimizamos os teus dados
            pessoais dentro de um prazo razoável, exceto quando a retenção
            for exigida por lei.
          </p>

          <h2>6. Os teus direitos</h2>
          <p>Tens o direito de:</p>
          <ul>
            <li><strong>Aceder</strong> aos dados pessoais que temos sobre ti</li>
            <li>
              <strong>Corrigir</strong> dados incorretos ou desatualizados,
              diretamente no teu perfil ou contactando-nos
            </li>
            <li><strong>Eliminar</strong> a tua conta e os dados associados</li>
            <li>
              <strong>Retirar o consentimento</strong> para comunicações
              opcionais (ex: notificações push, emails não essenciais)
            </li>
          </ul>
          <p>
            Para exerceres qualquer um destes direitos, contacta-nos através
            dos dados abaixo.
          </p>

          <h2>7. Privacidade de menores</h2>
          <p>
            O CarroNaMão não se destina a menores de 18 anos. Não recolhemos
            intencionalmente dados de pessoas com menos de 18 anos. Se
            tomarmos conhecimento de que recolhemos dados de um menor sem
            verificação adequada, tomaremos medidas para eliminar essa
            informação.
          </p>

          <h2>8. Segurança</h2>
          <p>
            Aplicamos medidas técnicas e organizativas razoáveis para
            proteger os teus dados contra acesso não autorizado, perda ou
            alteração — incluindo encriptação em trânsito, controlo de
            acesso baseado em políticas RLS, e armazenamento seguro de
            passwords. No entanto, nenhum sistema é 100% seguro, e não
            podemos garantir segurança absoluta.
          </p>

          <h2>9. Alterações a esta política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente.
            Notificaremos sobre alterações materiais através da aplicação ou
            por email, e atualizaremos a data no topo deste documento.
          </p>

          <h2>10. Contacto</h2>
          <div className="contact-card">
            <p><strong>Ndlovu Tech Solutions</strong></p>
            <p>
              Email:{" "}
              <a href="mailto:suporte@ndlovutechsolutions.com">
                suporte@ndlovutechsolutions.com
              </a>
            </p>
            <p>Aplicação: CarroNaMão</p>
          </div>

          <footer>
            CarroNaMão — Ndlovu Tech Solutions · Este documento está
            disponível em{" "}
            <a href="https://carronamao.ndlovutechsolutions.com/privacidade">
              carronamao.ndlovutechsolutions.com/privacidade
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}
