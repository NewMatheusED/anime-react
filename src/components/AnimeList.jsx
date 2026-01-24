import {animes} from '../pages/home';

export function AnimeList (){
     return(
        <div>
            <h1>Lista de animes</h1>
            <ul>{animes.map(anime => (
                <li key={anime.id}> {anime.nome} {anime.personagem} </li>
            ))}
            </ul>
        </div>
     )
}


