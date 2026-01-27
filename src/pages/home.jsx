import {AnimeList} from '../components/AnimeList';
import {useState, useEffect} from 'react';
import {buscarTodosAnimes} from '../services/animeService'

export const Home = () =>{
    const [lista, setLista]   = useState([]);
    const [loading, setLoading] = useState(true);  
      
    const [novoNome, setNovoNome] = useState('');
    const [novoPersonagem, setNovoPersonagem] = useState('');
    const [novoPoder, setNovoPoder] = useState('');

useEffect(() =>{
    async function carregarAnimes() {
        const dados = await buscarTodosAnimes();
        setLista(dados)
        setLoading(false);
    }

    carregarAnimes();
}, []);
    
    
    const adicionarAnime = () =>{
        const novo = {
            mal_id: Date.now(),
            nome: novoNome,
            personagem: novoPersonagem,
            poder: novoPoder
        }
    setLista([...lista, novo]);

    setNovoNome('');
    setNovoPersonagem('');
    setNovoPoder('');

    if (loading) return <p>Carregando..</p>;
}

    return(
        <div className='bg-zinc-950 h-screen flex'>
            <AnimeList animes = {lista}/>
            <div>

                <h2>Adicionar novo Anime</h2>
                
                <input 
                type="text" 
                placeholder='Titulo do Anime'
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                />

                <input 
                type="text"
                placeholder='Personagem'
                value={novoPersonagem}
                onChange={(e) => setNovoPersonagem(e.target.value)} 
                />

                <input 
                type="text"
                placeholder='Poder'
                value={novoPoder}
                onChange={(e) => setNovoPoder(e.target.value)} 
                />

                <button onClick={adicionarAnime} className='bg-green-950 p-1' >
                    Adicionar
                </button>
                
                
                
            </div>
        </div>
    )
        
}



