
var controller
var isJogoIniciado = false

function iniciarTabuleiro(){
    controller = new Controller();
    let elememt_jogo = document.getElementById('jogo')
    if(document.getElementById('tabuleiro') !== null){
        document.getElementById('tabuleiro').remove()
    }
    let element_tabuleiro = document.createElement('table')
    element_tabuleiro.setAttribute('id', 'tabuleiro')

    elememt_jogo.contains = ''

    controller.criarLinhasTabuleiro()
    
    for(linha of controller.getLinhasTabuleiro){
        inserirLinhaTabuleiro(element_tabuleiro, linha);
    }

    elememt_jogo.appendChild(element_tabuleiro)
}

function inserirLinhaTabuleiro(element_tabuleiro, linha){
    let element_linha = document.createElement('tr')
    for(item of linha){
        inserirItemTabuleiro(element_linha, item)
    }
    element_tabuleiro.appendChild(element_linha);
}

function inserirItemTabuleiro(element_linha, item){
    let element_item = document.createElement('td')
    element_item.setAttribute('id', item.getId)
    element_item.setAttribute('onclick', 'itemSelecionado(this)')
    element_linha.appendChild(element_item)
}


function iniciarJogo(){
    if(!isJogoIniciado){
        let form = document.formulario
        let jogador_um 
        let jogador_dois
        let isHumanoIniciaJogo = (parseInt(form.tipo_peca.value) == 1 ? true : false)

        isJogoIniciado = true

        iniciarTabuleiro()
        
        jogador_um = new Jogador(parseInt(form.tipo_peca.value), isHumanoIniciaJogo, 1)
        jogador_dois = new Jogador((parseInt(form.tipo_peca.value) == 1 ? 2 : 1), !isHumanoIniciaJogo, 2)
        
        controller.setJogadores = [jogador_um, jogador_dois]

        document.getElementById('botao_iniciar').innerHTML = 'Reiniciar'
        
        setLabelJogador()

        if(controller.getJogadorVez.getTipoJogador === TIPO_JOGADOR_IA){
            IAJogar()
        }

    }else{
        reiniciarJogo()
    }
}

function itemSelecionado(item){
    let id_item = parseInt(item.id)
    if(isJogoIniciado){

        let jogador = controller.getJogadorVez
        let src_image = jogador.tipo_peca == TIPO_PECA_X ? 'img/icon-x.png' : 'img/icon-o.png'
        let id_peca = controller.getPecas.length + 1
        let peca = new Peca(id_peca, src_image, jogador)
        let element_image = document.createElement('img')
        let hasTemVitoria = controller.hasVitoria()
        let hasTemEmpate = controller.hasEmpate()
        let isJogoFinalizado = hasTemVitoria || hasTemEmpate

        if(!isJogoFinalizado){
            if(!controller.hasItemJaContemPeca(id_item)){
                controller.addPeca(peca)
                
                element_image.setAttribute('src', src_image)
                document.getElementById(item.id).appendChild(element_image)

                controller.getItemId(id_item).setPeca = peca
                
                if(!controller.hasVitoria() && !controller.hasEmpate()){
                    alterarVezJogador()
                }else if(controller.hasVitoria()){
                    setLabelVitoria()
                }else if(controller.hasEmpate()){
                    setLabelEmpate()
                }
            }
        }
    }
}

function setLabelVitoria(){
    document.getElementById('label').innerHTML = controller.getJogadorVez.getTipoPeca == TIPO_PECA_X ? 'Vencedor: X' : 'Vencedor: O'
}

function setLabelEmpate(){
    document.getElementById('label').innerHTML = 'Empate'
}

function setLabelJogador(){
    document.getElementById('label').innerHTML = controller.getJogadorVez.getTipoPeca == TIPO_PECA_X ? 'Vez de: X' : 'Vez de : O'
}

function alterarVezJogador(){
    for(item of controller.getJogadores){
        if(item.isVezJogar){
            item.setVezJogar = false
        }else{
            item.setVezJogar = true
        }
    }
    setLabelJogador()
    if(controller.getJogadorVez.getTipoJogador === TIPO_JOGADOR_IA){
        IAJogar()
    }
}

function IAJogar(){
    itemSelecionado(document.getElementById(controller.getIdEstrategiaIA()))
}

function reiniciarJogo(){
    isJogoIniciado = false
    document.getElementById('botao_iniciar').innerHTML = 'Iniciar';
    document.getElementById('label').innerHTML = ''
    if(document.getElementById('tabuleiro') !== null){
        document.getElementById('tabuleiro').remove()
    }
}
