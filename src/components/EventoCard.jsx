"use client";// marca como client component porque usa props e interatividade
import styles from "./eventoCard.module.css";
import Link from "next/link"; // componente de link do next, pra navegação sem recarregar a página

export default function EventoCard({ evento }) { // componente que recebe 1 evento como prop de Home
  if (!evento) return null;// se não receber evento, não renderiza nada (segurança)

  const image = evento.images?.[0]?.url;// pega a primeira imagem do evento
  const data = evento.dates?.start?.localDate;// pega a data do evento
  const local = evento._embedded?.venues?.[0]?.name;// pega o nome do local onde vai acontecer

  // cria slug com nome + id - rota dinamica
  const slug = `${evento.name.toLowerCase()// transforma o nome pra letras minúsculas
    .replace(/\s+/g, "-")// troca os espaços por traço
    .replace(/[^\w-]+/g, "")}-${evento.id}`; // remove caracteres especiais e junta com o id

  return (
    <Link href={`/evento/${slug}`} className={styles.linkLimpo}>{/*faz o card inteiro virar um link */}
      <div className={styles.card}>
        {image && <img src={image} alt={evento.name} className={styles.imagem} />}{/* mostra a img */}
        <h3 className={styles.titulo}>{evento.name}</h3>
        <p className={styles.texto}>{data}</p>
        <p className={styles.texto}>{local}</p>
      </div>
    </Link>
  );
}
