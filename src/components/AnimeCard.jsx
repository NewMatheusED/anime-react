export const AnimeCard = ({nome, personagem, poder}) =>  {
    return(
        <div className="bg-zinc-800 border w-64 h-1/2  mx-auto my-auto bg-in">
            <h1 className=" text-gray-50">Anime: {nome}</h1>
            <p className="text-blue-300">Personagem: {personagem}</p>
            <p className="text-red-800">Poder: {poder}</p>
          
           
        </div>
    )
}
