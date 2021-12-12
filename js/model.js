const TIPO_PECA_X = 1
const TIPO_PECA_0 = 2

const TIPO_JOGADOR_HUMANO = 1
const TIPO_JOGADOR_IA = 2

const POSICOES_VITORIA = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [3,2,1],
    [6,5,4],
    [9,8,7],
    [2,3,1],
    [5,6,4],
    [8,9,7],
    [2,1,3],
    [5,4,6],
    [8,7,9],
    [1,3,2],
    [4,6,5],
    [7,9,8],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [7,4,1],
    [8,5,2],
    [9,6,3],
    [4,1,7],
    [5,2,8],
    [6,3,9],
    [4,7,1],
    [5,8,2],
    [6,9,3],
    [1,7,4],
    [2,8,5],
    [3,9,6],
    [1,5,9],
    [3,5,7],
    [9,5,1],
    [7,5,3],
    [5,1,9],
    [5,3,7],
    [5,9,1],
    [5,7,3],
    [1,9,5],
    [3,7,5],
]

class Item {
    constructor(id, peca){
        this.id = id
        this.peca = peca
    }

    get getId(){ return this.id }

    get getPeca(){ return this.peca }

    get hasPeca(){ return this.peca !== null }
    
    set setPeca(peca){
        this.peca = peca
    }
}

class Peca {
    constructor(id, icone, jogador){
        this.id = id
        this.icone = icone
        this.jogador = jogador
    }

    get getId(){ return this.id }

    get getJogador(){ return this.jogador }

    get getIcone(){ return this.icone }

    set setJogador(jogador){
        this.jogador = jogador
    }
}

class Jogador {
    constructor(tipo_peca, vez_jogar, tipo_jogador){
        this.tipo_peca = tipo_peca
        this.vez_jogar = vez_jogar
        this.tipo_jogador = tipo_jogador
    }

    get getTipoPeca(){ return this.tipo_peca }

    get getTipoJogador(){ return this.tipo_jogador }

    get isVezJogar(){ return this.vez_jogar }

    set setVezJogar(item){
        this.vez_jogar = item
    }
}

class Controller {

    pecas = []
    itens = []

    get getLinhasTabuleiro(){ return this.linhas }

    get getPecas(){ 
        return this.pecas
    }

    get getItens(){ 
        return this.itens
    }

    get getJogadores(){ return this.jogadores }

    get getJogadorVez(){ 
        return this.jogadores.find(element => element.isVezJogar)
    }

    set setLinhasTabuleiro(linhas){
        this.linhas = linhas
    }

    set setJogadores(jogadores){
        this.jogadores = jogadores
    }

    hasItemJaContemPeca(id){
        return this.getItemId(id).hasPeca
    }

    hasItensSemPecas(){
        return this.getItens.find(element => element.getPeca == null) !== undefined
    }

    hasVitoria(){
        let jogador = this.getJogadorVez
        let tipo_peca = jogador.getTipoPeca
        let contador=0;
        let item;

        for(let posicoes of POSICOES_VITORIA){
            contador = 0
            for(let i=0; i<posicoes.length; i++){
                item = this.getItemId(posicoes[i])
                if(item.hasPeca){
                    if(item.getPeca.getJogador.getTipoPeca == tipo_peca){
                        contador++
                    }
                }
            }
            
            if(contador == 3){
                break
            }else{
                contador = 0
            }
        }

        return contador == 3
    }

    hasEmpate(){
        let existe = true
        for(let item of this.getItens){
            if(!item.hasPeca){
                existe = false
                break
            }
        }
        return existe
    }
    
    getItemId(id){
        let item = undefined

        for(let element of this.getItens){
            if(element.getId === id){
                item = element
                break
            }        
        }

        return item
    }

    addPeca(peca){
        this.pecas.push(peca)
    }

    addItem(item){
        this.itens.push(item)
    }

    criarLinhasTabuleiro(){
        let item;
        let linhas = [];
        let linha = [];
        let id = 1;
        for(let i=0; i<3; i++){
            linha = [];
            for(let j=0; j<3; j++){
                item = new Item(id, null);
                linha.push(item)
                this.addItem(item)
                id++;
            }
            linhas.push(linha)
        }

        this.setLinhasTabuleiro = linhas
    }

    getIdEstrategiaIA(){
        let contador = 0
        let id = -1;
        let min = 1
        let max = 9;

        for(let posicoes of POSICOES_VITORIA.reverse()){
            contador = 0
            for(let i=0; i<posicoes.length; i++){
                if(id < 0){
                    item = this.getItemId(posicoes[i])
                    if(contador < 2){
                        if(item.hasPeca){
                            if(item.getPeca.getJogador.getTipoJogador == TIPO_JOGADOR_HUMANO){
                                contador++
                            }
                        }else{
                            contador = 0
                        }
                    }else{
                        if(!item.hasPeca){
                            id = posicoes[i]
                            break
                        }else{
                            contador = 0
                        }
                    }
                }else{
                    break
                }
            }
        }
        
        if(id < 0){
            do {
                id = Math.floor(Math.random() * (max - min + 1)) + min
            }while(this.hasItemJaContemPeca(id))
        }

        return id
    }
}