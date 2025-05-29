"use client";

import { useState, useEffect } from "react";// importa hooks do react
import { usePathname } from "next/navigation";// hook do next pra saber qual rota está ativa
import style from "./Menu.module.css";// importa estilos css em escopo local
import { useEventos } from "./EventosContext";// importa o contexto dos eventos

export default function Menu() {
  const [menuAberto, setMenuAberto] = useState(false);  // estado pra saber se o menu de cidades tá aberto ou não
  const [cidadesComEvento, setCidadesComEvento] = useState([]);// estado que guarda a lista de cidades com eventos
  const { buscarEventos } = useEventos();// pega a função de buscar eventos do contexto
  const pathname = usePathname();// pega o caminho da url atual

  const estaNaPaginaDeEvento = pathname.startsWith("/evento/");// declara um const p o caminho q começa com /evento
  const toggleMenu = () => setMenuAberto(!menuAberto); // função abre/fecha menu de cidades

  useEffect(() => {
    async function carregarCidadesComEvento() {
      try {
        const res = await fetch(  
          "https://app.ticketmaster.com/discovery/v2/events.json?apikey=dwzDtoPdrpnAALSuOP28vm1poN38P95Y&countryCode=BR&size=200"
        );//  requisição pra api do ticketmaster / country code BR
        const data = await res.json();// transforma resposta em json
        const eventos = data._embedded?.events || []; // pega os eventos da resposta do json

       const cidades = new Set(
        eventos
          .map((e) => e._embedded?.venues?.[0]?.city?.name)
          .filter((nome) => nome && nome.trim() !== "" && nome.toLowerCase() !== "nocity")
        );
        const cidadesUnicas = Array.from(cidades).sort();// transforma o set em array e ordena em ordem alfabética
        setCidadesComEvento(cidadesUnicas);// salva no estado pra mostrar no menu
      } catch (err) {
        console.error("Erro ao buscar eventos:", err);
      }
    }

    carregarCidadesComEvento();// chama a função quando o menu for carregado
  }, []);

  useEffect(() => {
    if (estaNaPaginaDeEvento) { // verifica se esta em /evento 
      setMenuAberto(false); // garante q ele vai fechar se ja veio aberto da rota
    }
  }, [pathname]);//caminho atual qu esta sendo verificado, exe toda vez q muda rota

  return (
    <nav className={style.navMenu}>{/* nav principal do menu lateral */}
      <ul className={style.lista}>{/* lista de botões de navegação */}
        <li><a href="/" className={style.botaoVerde}>Home</a></li>{/* link pra home */}
        <li><a href="/about" className={style.botaoVerde}>Sobre</a></li>
        <li><a href="/contact" className={style.botaoVerde}>Contato</a></li>

        {!estaNaPaginaDeEvento && (// só mostra os botões de busca se não tiver na tela de evento
          <li>
            <button onClick={toggleMenu} className={style.botaoVerde}>
              Buscar Eventos por Cidade{/* botão pra abrir/fechar lista de cidades */}
            </button>

            {menuAberto && (// só mostra se o menu tiver aberto 
              <div>
                {cidadesComEvento.map((cidade) => (// pra cada cidade encontrada, cria um botão
                  <button
                    key={cidade}// chama a função de buscar eventos com a cidade escolhida
                    className={style.botaoVerde}
                    onClick={() => buscarEventos(cidade)}//aqui
                  >
                    {cidade}{/* mostra o nome da cidade */}
                  </button>
                ))}
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}