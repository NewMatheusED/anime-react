export const AnimeCard = ({anime}) =>  {
    return(
        <div>
            <h1 className="text-3xl ">{anime.nome}</h1>
            <p className="text-blue-700">{anime.personagem}</p>
            <p className="text-red-800">{anime.poder}</p>
        </div>
    )
}
