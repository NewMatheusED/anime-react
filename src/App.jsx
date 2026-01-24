import {AnimeList} from './components/AnimeList';
import {Header} from './components/Header'
import {SearchBar} from './components/SearchBar'

function App() {
    return (
         <div className="">
            <AnimeList
                titulo='One Piece'
                nota='10' 
            />

            <Header
                cor='vermelho'
            />

            <SearchBar
            personagem='Sanji'
            />
            
        </div>
    )
}




export default App;