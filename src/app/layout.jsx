import "./globals.css";
import Menu from "../components/Menu"; 
import { EventosProvider } from "../components/EventosContext";

export const metadata = {
  title: "NextEvents",
  description: "Plataforma de eventos no Brasil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>
        <EventosProvider>{/* provê os dados de eventos pra toda a aplicação */}
          <section style={{ display: "flex", height: "100vh", overflow: "hidden" }}>{/* divide a tela em menu e conteudo da direita */}
            <nav style={{ width: "250px", overflowY: "auto" }}>
              <Menu />{/* mostra o menu de navegação lateral */}
            </nav>
            <main style={{ flex: 1, overflowY: "auto", height: "100vh", padding: "2rem" }}>
              {children}{/*  home, evento, etc */}
            </main>
          </section>
        </EventosProvider>
      </body>
    </html>
  );
}
