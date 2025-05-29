"use client";
import { useEffect } from "react";
import { useEventos } from "../components/EventosContext";
import EventoCard from "../components/EventoCard";

export default function Home() {
  const { eventos, buscarEventos, cidadeSelecionada } = useEventos();

  useEffect(() => {
    if (!cidadeSelecionada) { // se nao tem cidade selecionada,
      buscarEventos(); // busca geral (Brasil inteiro).
    }
  }, [cidadeSelecionada]);// roda efeito sempre que mudar a cidade

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>
        {cidadeSelecionada ? `Eventos em ${cidadeSelecionada}` : "Eventos no Brasil"} {/* se tem cidade , se não */}
      </h2>

      {eventos.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#555" }}>
          Nenhum evento encontrado no momento.
        </p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          {eventos.map((evento) => (
            <EventoCard key={evento.id} evento={evento} /> // prop de EventoCard //
          ))}
        </div>
      )}
    </div>
  );
}
