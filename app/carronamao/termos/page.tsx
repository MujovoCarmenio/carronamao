import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos e Condições — CarroNaMão",
  description:
    "Termos e condições de utilização da aplicação CarroNaMão, incluindo subscrições, pagamentos via M-Pesa e responsabilidades dos utilizadores.",
};

export default function TermosCarroNaMao() {
  return (
    <div className="cnm-page">
      <header className="cnm-header">
        <div className="cnm-header__inner">
          <span className="cnm-brand">
            Carro<em>NaMão</em>
          </span>
        </div>
      </header>

      <main className="cnm-content">
        <Link href="/" className="cnm-back">
          ← Ndlovu Digital
        </Link>

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
          de um veículo criada por um utilizador para venda ou aluguer.
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
        <p>
          Para questões relacionadas com estes termos, contacte{" "}
          <a href="mailto:suporte@ndlovutechsolutions.com">
            suporte@ndlovutechsolutions.com
          </a>
          .
        </p>
      </main>
    </div>
  );
}
