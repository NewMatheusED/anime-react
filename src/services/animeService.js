const API_URL = ('https://api.jikan.moe/v4/top/anime');

export const buscarTodosAnimes = async () =>{
    try{
        const response = await fetch(API_URL);
        const json = await response.json();
        return json.data;
    }catch(erro) {
        console.log('Erro ao buscar animes:', erro);
        throw erro;
    }
}

export const buscarAnimePorId = async (id) =>{
    try{
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        return data;
    }catch(erro){
        console.log('Erro ao buscar anime:', erro);
        throw erro;
    }
}