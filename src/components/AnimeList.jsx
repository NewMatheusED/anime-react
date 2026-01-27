import {AnimeCard} from './AnimeCard';

 export const AnimeList = ({animes}) =>{
     return(
        <div className=' bg-zinc-900 flex mx-auto w-1/2'>
          {animes.map(anime =>  
          <AnimeCard key={anime.id} {...anime}/>)}
         </div>
           )
           };


