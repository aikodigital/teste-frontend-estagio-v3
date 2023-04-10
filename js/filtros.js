

/* Atribuindo os selects da lista a variaveis */
let filtroEstadoLista = document.getElementById("list_filter-estate")
let filtroModeloLista = document.getElementById("list_filter-model")

/* Ao trocar de opcao a funcao "filtrarLista" sera chamada */
filtroEstadoLista.addEventListener("change", filtrarLista)
filtroModeloLista.addEventListener("change", filtrarLista)

/* Essa funcao serve para filtrar os elementos da lista de equipamentos */
function filtrarLista(){
    /* Criando uma array para receber os equipamentos filtrados */
    let listaFiltrada = []
    /* Atribuindo os Values atuais das opcoes a variaveis */
    let estadoSelecionado = filtroEstadoLista.value
    let modeloSelecionado = filtroModeloLista.value

    /* Se o estadoSelecionado for diferente de " " */
    if (estadoSelecionado != "") {
        /* Para cada item da lista */
        for (let i = 0; i < lista.length; i++) {
            /* Se o EstadoAtual do equipamentos for igual ao EstadoSelecionado */
            if (lista[i].estadoAtual == estadoSelecionado) {
                /* Se o modeloSelecionado for diferente de " " */
                if(modeloSelecionado != ""){
                    /* Se o Modelo do equipamentos for igual ao ModeloSelecionado */
                    if (lista[i].modelo == modeloSelecionado) {
                        /* Adicionar esse equipamento a ListaFiltrada */
                        listaFiltrada.push(lista[i])
                    }
                /* Se o modeloSelecionado for igual de " " */
                }else{
                    /* Adicionar esse equipamento a ListaFiltrada */
                    listaFiltrada.push(lista[i])
                }
            }
        }
        /* Funcao para reiniciar a tabela do histórico. (Essa funcao é para caso um equipamento tenha sido selecionado, ao trocar os filtros ele sair da exibicao do historico) */
        limparHistorico()
        /* Funcao para exibir a lista na tela, enviando como parametro a lista filtrada */
        exibirListaNaTela(listaFiltrada)
    /* Se o modeloSelecionado for diferente de " " */
    }else if(modeloSelecionado != ""){
        /* Para cada item da lista */
        for (let i = 0; i < lista.length; i++) {
            /* Se o Modelo do equipamentos for igual ao ModeloSelecionado */
            if (lista[i].modelo == modeloSelecionado) {
                /* Se o estadoSelecionado for diferente de " " */
                if(estadoSelecionado != ""){
                    /* Se o EstadoAtual do equipamentos for igual ao EstadoSelecionado */
                    if (lista[i].estadoAtual == estadoSelecionado) {
                        /* Adicionar esse equipamento a ListaFiltrada */
                        listaFiltrada.push(lista[i])
                    }
                /* Se o modeloSelecionado for igual de " " */
                }else{
                    /* Adicionar esse equipamento a ListaFiltrada */
                    listaFiltrada.push(lista[i])
                }
            }
        }
        /* Funcao para reiniciar a tabela do histórico. (Essa funcao é para caso um equipamento tenha sido selecionado, ao trocar os filtros ele sair da exibicao do historico) */
        limparHistorico()
        /* Funcao para exibir a lista na tela, enviando como parametro a lista filtrada */
        exibirListaNaTela(listaFiltrada)
        /* Se modeloSelecionado & estadoSelecionado forem == "" */
    }else{
        /* Funcao para reiniciar a tabela do histórico. (Essa funcao é para caso um equipamento tenha sido selecionado, ao trocar os filtros ele sair da exibicao do historico) */
        limparHistorico()
        /* Funcao para exibir a lista na tela, enviando como parametro a lista filtrada */
        exibirListaNaTela(lista)
    }
}



/* Atribuindo os selects do mapa a variaveis */
let filtroEstadoMapa = document.getElementById("map_filter-estate")
let filtroModeloMapa = document.getElementById("map_filter-model")

/* Ao trocar de opcao a funcao "filtrarMapa" sera chamada */
filtroEstadoMapa.addEventListener("change", filtrarMapa)
filtroModeloMapa.addEventListener("change", filtrarMapa)

/* Essa funcao serve para filtrar os elementos do mapa */
function filtrarMapa(){
    /* Criando uma array para receber os equipamentos filtrados */
    let listaFiltrada = []
    /* Atribuindo os Values atuais das opcoes a variaveis */
    let selecionadoEstado = filtroEstadoMapa.value
    let selecionadoModelo = filtroModeloMapa.value
    
    /* Se o estadoSelecionado for diferente de " " */
    if (selecionadoEstado != "") {
        /* Para cada item da lista */
        for (let i = 0; i < lista.length; i++) {
            /* Se o EstadoAtual do equipamentos for igual ao EstadoSelecionado */
            if (lista[i].estadoAtual == selecionadoEstado) {
                /* Se o modeloSelecionado for diferente de " " */
                if(selecionadoModelo != ""){
                    /* Se o Modelo do equipamentos for igual ao ModeloSelecionado */
                    if (lista[i].modelo == selecionadoModelo) {
                        /* Adicionar esse equipamento a ListaFiltrada */
                        listaFiltrada.push(lista[i])
                    }
                /* Se o modeloSelecionado for igual de " " */
                }else{
                    /* Adicionar esse equipamento a ListaFiltrada */
                    listaFiltrada.push(lista[i])
                }
            }
        }
        /* Funcao para reiniciar a tabela do histórico. (Essa funcao é para caso um equipamento tenha sido selecionado, ao trocar os filtros ele sair da exibicao do historico) */
        limparMapa()
        /* Funcao para exibir a lista na tela, enviando como parametro a lista filtrada */
        exibirListaNoMapa(listaFiltrada)
    /* Se o modeloSelecionado for diferente de " " */
    }else if(selecionadoModelo != ""){
        /* Para cada item da lista */
        for (let i = 0; i < lista.length; i++) {
            /* Se o Modelo do equipamentos for igual ao ModeloSelecionado */
            if (lista[i].modelo == selecionadoModelo) {
                /* Se o estadoSelecionado for diferente de " " */
                if(selecionadoEstado != ""){
                    /* Se o EstadoAtual do equipamentos for igual ao EstadoSelecionado */
                    if (lista[i].estadoAtual == selecionadoEstado) {
                        /* Adicionar esse equipamento a ListaFiltrada */
                        listaFiltrada.push(lista[i])
                    }
                /* Se o modeloSelecionado for igual de " " */
                }else{
                    /* Adicionar esse equipamento a ListaFiltrada */
                    listaFiltrada.push(lista[i])
                }
            }
        }
        /* Funcao para reiniciar a tabela do histórico. (Essa funcao é para caso um equipamento tenha sido selecionado, ao trocar os filtros ele sair da exibicao do historico) */
        limparMapa()
        /* Funcao para exibir a lista na tela, enviando como parametro a lista filtrada */
        exibirListaNoMapa(listaFiltrada)
    /* Se modeloSelecionado & estadoSelecionado forem == "" */
    }else{
        /* Funcao para reiniciar a tabela do histórico. (Essa funcao é para caso um equipamento tenha sido selecionado, ao trocar os filtros ele sair da exibicao do historico) */
        limparMapa()
        /* Funcao para exibir a lista na tela, enviando como parametro a lista filtrada */
        exibirListaNoMapa(lista)
    }
}

/* Pegando a barra de pesquisa da lista e atribuindo a uma variavel */
let barraPesquisaLista = document.getElementById("list_filter-search")
/* Chamar a funcao pesquisarEquipamentoLista sempre que entrar uma informacao na barra de pesquisa */
barraPesquisaLista.addEventListener("input", pesquisarEquipamentoLista)
/* Funcao para pesquisar por nome, usando a barra de pesquisa */
function pesquisarEquipamentoLista(){
    /* Criando uma array para receber os equipamentos filtrados */
    let listaFiltrada = []

    /* Pegando as informacoes na barra de pesquisa e deixando-as em caixa alta */
    let conteudoPesquisa = barraPesquisaLista.value.toUpperCase()

    /* Para cada item da lista */
    for (let i = 0; i < lista.length; i++) {
        /* Atribuindo o nome do equipamento em caixa alta a variavel */
        let equipamentoNome = lista[i].equipamento.toUpperCase()
        /* Se o que estiver na barra de pesquisa tambem ter no equipamento */
        if (equipamentoNome.includes(conteudoPesquisa)) {
            /* Colocando os equipamentos na ListaFiltrada */
            listaFiltrada.push(lista[i])
        }
    }
    /* Funcao para reiniciar a tabela do histórico. (Essa funcao é para caso um equipamento tenha sido selecionado, ao trocar os filtros ele sair da exibicao do historico) */
    limparHistorico()
    /* Funcao para exibir a lista na tela, enviando como parametro a lista filtrada */
    exibirListaNaTela(listaFiltrada)
}

/* Pegando a barra de pesquisa do mapa e atribuindo a uma variavel */
let barraPesquisaMapa = document.getElementById("map_filter-search")
/* Chamar a funcao pesquisarEquipamentoLista sempre que entrar uma informacao na barra de pesquisa */
barraPesquisaMapa.addEventListener("input", pesquisarEquipamentoMapa)
/* Funcao para pesquisar por nome, usando a barra de pesquisa */
function pesquisarEquipamentoMapa(){
    /* Criando uma array para receber os equipamentos filtrados */
    let listaFiltrada = []

    /* Pegando as informacoes na barra de pesquisa e deixando-as em caixa alta */
    let conteudoPesquisa = barraPesquisaMapa.value.toUpperCase()

    /* Para cada item da lista */
    for (let i = 0; i < lista.length; i++) {
        /* Atribuindo o nome do equipamento em caixa alta a variavel */
        let equipamentoNome = lista[i].equipamento.toUpperCase()
        /* Se o que estiver na barra de pesquisa tambem ter no equipamento */
        if (equipamentoNome.includes(conteudoPesquisa)) {
            /* Colocando os equipamentos na ListaFiltrada */
            listaFiltrada.push(lista[i])
        }
    }
        /* Funcao para reiniciar a tabela do histórico. (Essa funcao é para caso um equipamento tenha sido selecionado, ao trocar os filtros ele sair da exibicao do historico) */
        limparMapa()
        /* Funcao para exibir a lista na tela, enviando como parametro a lista filtrada */
        exibirListaNoMapa(listaFiltrada)
}