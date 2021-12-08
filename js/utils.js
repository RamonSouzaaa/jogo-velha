
const IA_NOMES = ['Jarvis','Friday','R2D2','Ultron']

var controller;

document.getElementById('formJogador').style.display = 'flex';
document.getElementById('divJogo').style.display = 'none';

function iniciarTabuleiro(){
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
    element_item.setAttribute('style', 'border:1px solid black;')
    element_item.setAttribute('width', '70')
    element_item.setAttribute('height', '70')
    element_item.setAttribute('onclick', 'itemSelecionado(this)')
    element_linha.appendChild(element_item)
}


function iniciarJogo(){
    controller = new Controller();
    let form = document.formulario
    let jogador_um = new Jogador(form.nome.value, parseInt(form.tipo_peca.value), true, 1)
    let jogador_dois = new Jogador(getIAJogo(), (parseInt(form.tipo_peca.value) == 1 ? 2 : 1), false, 2)
    controller.setJogadores = [jogador_um, jogador_dois]
    iniciarTabuleiro()
    setLabelJogador()

    document.getElementById('formJogador').style.display = 'none';
    document.getElementById('divJogo').style.display = 'flex';
}

function getIAJogo(){
    let min = 0
    let max = IA_NOMES.length - 1;
    return IA_NOMES[Math.floor(Math.random() * (max - min + 1)) + min];
}

function itemSelecionado(item){
    let id_item = parseInt(item.id)
    if(!controller.hasItemJaContemPeca(id_item)){
        let jogador = controller.getJogadorVez
        let src_image = jogador.tipo_peca == TIPO_PECA_X ? 'img/icon-x.png' : 'img/icon-o.png'
        let id_peca = controller.getPecas.length + 1
        let peca = new Peca(id_peca, src_image, jogador)
        let element_image = document.createElement('img')
        controller.addPeca(peca)
        
        element_image.setAttribute('src', src_image)
        element_image.setAttribute('width', '50')
        element_image.setAttribute('height', '50')
        document.getElementById(item.id).appendChild(element_image)


        controller.getItemId(id_item).setPeca = peca
        
        if(!controller.hasVitoria()){
            if(!controller.hasEmpate()){
                alterarVezJogador()
            }else{
                setLabelEmpate()
            }
        }else{
            setLabelVitoria()
        }
    }
}

function setLabelVitoria(){
    document.getElementById('labelResultado').innerHTML = 'Vitória'
    document.getElementById('labelJogadorResultado').innerHTML = controller.getJogadorVez.getNome
}

function setLabelEmpate(){
    document.getElementById('labelResultado').innerHTML = 'Empate'
    document.getElementById('labelJogadorResultado').innerHTML = 'Ninguém ganhou'
}

function setLabelJogador(){
    document.getElementById('label').innerHTML = 'Vez jogador: ' + controller.getJogadorVez.getNome
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

    document.getElementById('formJogador').style.display = 'flex';
    document.getElementById('divJogo').style.display = 'none';
    
    document.getElementById('labelResultado').innerHTML = ''
    document.getElementById('labelJogadorResultado').innerHTML = ''

    document.formulario.nome.value = ''


}