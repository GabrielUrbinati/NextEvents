"use client";// marca como client component pra poder usar hooks
import { createContext, useState, useContext } from "react";// importa funções do react: contexto, estados e hook


const EventosContext = createContext();// cria o contexto que vai armazenar os eventos e funções

export const EventosProvider = ({ children }) => { // componente que vai envolver tudo e prover o contexto
  const [eventos, setEventos] = useState([]);// estado com a lista de eventos buscados
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);// estado com a cidade que o usuário escolheu

  const buscarEventos = async (cidade = null) => {// faz a busca dos eventos, pode receber cidade ou não
    try {
      setCidadeSelecionada(cidade);// salva a cidade  no state

      const base = `https://app.ticketmaster.com/discovery/v2/events.json`;// url base da api
      const params = new URLSearchParams({// cria os parâmetros da url
        apikey: "dwzDtoPdrpnAALSuOP28vm1poN38P95Y", // api key da ticketmaster
        countryCode: "BR", // filtra só brasil
        size: "100", // quantidade máxima de eventos
      });

      if (cidade) {
        params.append("city", cidade);//  Menu.jsx usa cidade como parametro ao chamar buscarEventos
      }

      const url = `${base}?${params.toString()}`;// monta a url completa 
      const res = await fetch(url);// faz a requisição
      const data = await res.json();// transforma em json

      const eventosRecebidos = data._embedded?.events || [];// pega os eventos do retorno
      setEventos(eventosRecebidos);// salva os eventos no estado
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  return (
    <EventosContext.Provider value={{ eventos, buscarEventos, cidadeSelecionada }}>
      {children}{/* permite que os filhos usem o contexto */}
    </EventosContext.Provider>
  );
};

export const useEventos = () => useContext(EventosContext); // hook pra usar o contexto
