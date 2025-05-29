import styles from "./eventoPage.module.css";

export default async function EventoPage({ params }) { // recebe o id da vez como parametro


  // busca os dados direto da API pelo ID do evento, então não precisa acessar o contexto global.

  const id = params.id.split("-").pop(); // separa em sgtrings e pega o ultimo trecho cm pop

  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=dwzDtoPdrpnAALSuOP28vm1poN38P95Y`
  );
  const evento = await res.json();// transforma resposta da API em objeto JS

  const imagemAlta = evento.images?.reduce((maior, atual) => { // percorre as imgs do evento 
    return atual.width > (maior?.width || 0) ? atual : maior;// pega a de maior largura
  }, null)?.url;

  const nome = evento.name;
  const data = evento.dates?.start?.localDate; // dada - opt chaining, para evitar erro undefined/null
  const horario = evento.dates?.start?.localTime; // hora
  const local = evento._embedded?.venues?.[0]?.name;// se embedded existe, e venues tb, pegue o nome do primeiro venue(local) da lista
  const endereco = evento._embedded?.venues?.[0]?.address?.line1;// pega linha 1 do objt endereço do primeiro local
  const cidade = evento._embedded?.venues?.[0]?.city?.name;// nome da cidade
  const descricao = evento.info || evento.description || "Sem descrição disponível."; // usa o campo que tiver info
  const organizador = evento.promoter?.name;// se sexitir
  const categoria = evento.classifications?.[0]?.segment?.name;//categoria
  const inicioVendas = evento.sales?.public?.startDateTime;//vendas
  const url = evento.url;//link oficial

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>{nome}</h1>
      {imagemAlta && <img src={imagemAlta} alt={nome} className={styles.imagem} />}

      <p className={styles.info}><strong>Data:</strong> {data}</p>
      <p className={styles.info}><strong>Horário:</strong> {horario}</p>
      <p className={styles.info}><strong>Local:</strong> {local}</p>
      <p className={styles.info}><strong>Endereço:</strong> {endereco}, {cidade}</p>
      <p className={styles.info}><strong>Descrição:</strong> {descricao}</p>
      <p className={styles.info}><strong>Organizador:</strong> {organizador || "Não informado"}</p>
      <p className={styles.info}><strong>Categoria:</strong> {categoria}</p>
      {inicioVendas && (
        <p className={styles.info}>
          <strong>Vendas:</strong> Início {new Date(inicioVendas).toLocaleString()}
        </p>
      )}
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        Comprar Ingressos
      </a>
    </div>
  );
}
