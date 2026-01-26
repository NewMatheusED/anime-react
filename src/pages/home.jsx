import {SearchBar} from '../components/SearchBar';
import {Header} from '../components/Header';
import {AnimeList} from '../components/AnimeList';

export const Home = () =>{
    const ListAnime = [
        {id:1, nome:'naruto',personagem:'gaara', poder: 'caixao de areia'},
        {id:2, nome:'one piece',personagem:'sanji', poder: 'diable jumbe'},
        {id:3, nome:'black clover',personagem:'asta', poder: 'anti magia'}
    ];
    return(
        <div>
            <AnimeList animes = {ListAnime.slice(0,2)}/>
        </div>
    )
};

