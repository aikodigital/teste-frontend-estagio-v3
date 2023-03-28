<!-- # Teste Frontend estágio V3

![Aiko](img/aiko.png)

Neste teste serão avaliados seus conhecimentos em Javascript, HTML e CSS, a criatividade e metodologia aplicada no desenvolvimento, a usabilidade e design da aplicação final.

## O Desafio

Você é o desenvolvedor frontend de uma empresa que coleta dados de equipamentos utilizados em uma operação florestal. Dentre esses dados estão o histórico de posições e estados desses equipamentos. O estado de um equipamento é utilizado para saber o que o equipamento estava fazendo em um determinado momento, seja *Operando*, *Parado* ou em *Manutenção*. O estado é alterado de acordo com o uso do equipamento na operação, já a posição do equipamento é coletada através do GPS e é enviada e armazenada de tempo em tempo pela aplicação.

Seu objetivo é, de posse desses dados, desenvolver o frontend de aplicação web que trate e exibida essas informações para os gestores da operação.

## Requisitos

Esses requisitos são obrigatórios e devem ser desenvolvidos para a entrega do teste.

* **Posições dos equipamentos**: Exibir no mapa os equipamentos nas suas posições mais recentes.

* **Estado atual do equipamento**: Visualizar o estado mais recente dos equipamentos. Exemplo: mostrando no mapa, como um pop-up, mouse hover sobre o equipamento, etc.

* **Histórico de estados do equipamento**: Permitir a visualização do histórico de estados de um equipamento específico ao clicar sobre o equipamento.

## Dados

Todos os dados que precisa para desenvolver os requisitos estão na pasta `data/` no formato `json` e são detalhados a seguir.

```sh
data/
|- equipment.json
|- equipmentModel.json
|- equipmentPositionHistory.json
|- equipmentState.json
|- equipmentStateHistory.json
```

### equipment.json
Contém todos os equipamentos da aplicação.

```JSONC
[
    {
        // Identificador único do equipamento
        "id": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        // Chave estrangeira, utilizada para referenciar de qual modelo é esse equipamento 
        "equipmentModelId": "a3540227-2f0e-4362-9517-92f41dabbfdf",
        // Nome do Equipamento
        "name": "CA-0001"
    },
    // ...
]
```

### equipmentState.json
Contém todos os estados dos equipamentos.

```JSONC
[
    {
        // Identificador único do estado de equipamento
        "id": "0808344c-454b-4c36-89e8-d7687e692d57",
        // Nome do estado
        "name": "Operando",
        // Cor utilizada para representar o estado
        "color": "#2ecc71"
    },
    // ...
]
```

### equipmentModel.json
Contém todos os modelos de equipamento e a informação de qual é o valor por hora do equipamento em cada um dos estados.

```JSONC
[
    {
        // Identificador único do modelo de equipamento
        "id": "a3540227-2f0e-4362-9517-92f41dabbfdf",
        // Nome do modelo de equipamento
        "name": "Caminhão de carga",
        // Valor gerado por hora para cada estado
        "hourlyEarnings": [
            {
                // Chave estrangeira, utilizada para referenciar de qual valor é esse estado
                "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57",
                // Valor gerado por hora nesse estado
                "value": 100
            },
            // ...
        ]
    },
    // ...
]
```

### equipmentStateHistory.json
O histórico de estados por equipamento.

```JSONC
[
    {
        // Chave estrangeira, utilizada para referenciar de qual equipamento são esses estados
        "equipmentId": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        // Histórico de estados do equipamento
        "states": [
            {
                // Data em que o equipamento declarou estar nesse estado
                "date": "2021-02-01T03:00:00.000Z",
                // Chave estrangeira, utilizada para referenciar qual é o estado
                // que o equipamento estava nesse momento
                "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
            },
            // ...
        ]
    },
    // ...
]
```

### equipmentPositionHistory.json
O histórico de posições dos equipamentos.

```JSONC
[
    {
        // Chave estrangeira, utilizada para referenciar de qual equipamento são esses estados
        "equipmentId": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        // Posições do equipamento
        "positions": [
            {   
                // Data em que a posição foi registrada
                "date": "2021-02-01T03:00:00.000Z",
                // Latitude WGS84
                "lat": -19.126536,
                // Longitude WGS84
                "lon": -45.947756
            },
            // ...
        ]
    },
    // ...
]
```


## O que é permitido

* Vue, React e Angular.

* Typescript.

* Bibliotecas de componentes (Element-ui, Vuetify, Bootstrap, etc.)

* Bibliotecas e APIs de Mapas (Leaflet, Openlayers, Google Maps API, etc).

* Template engines (Pug, Ejs, etc).

* Gerenciamento de estado (Vuex, Redux, etc).

* Frameworks CSS (Tailwind, Bulma, Bootstrap, Materialize, etc).

* Pré-processadores CSS (SCSS, SASS, LESS, etc).

* Frameworks baseados em Vue (Nuxt.js, Quasar, etc).

* Qualquer tecnologia complementar as citadas anteriormente são permitidas desde que seu uso seja justificável.

## O que não é permitido

* Utilizar componentes ou códigos de terceiros que implementem algum dos requisitos.

## Recomendações

* **Linter**: Desenvolva o projeto utilizando algum padrão de formatação de código.

* **Leaflet**: Para a exibição de informações no mapa recomendamos o Leaflet por ser uma biblioteca de código aberto e de fácil uso.

## Extras

Aqui são listados algumas sugestões para você que quer ir além do desafio inicial. Lembrando que você não precisa se limitar a essas sugestões, se tiver pensado em outra funcionalidade que considera relevante ao escopo da aplicação fique à vontade para implementá-la.

* **Filtros**: Filtrar as visualizações por estado atual ou modelo de equipamento.

* **Pesquisa**: Ser possível pesquisar por dados de um equipamento especifico.

* **Percentual de Produtividade do equipamento**: Calcular a produtividade do equipamento, que consiste em uma relação das horas produtivas (em estado "Operando") em relação ao total de horas. Exemplo se um equipamento teve 18 horas operando no dia a formula deve ser `18 / 24 * 100 = 75% de produtividade`.

* **Ganho por equipamento**: Calcular o ganho do equipamento com base no valor recebido por hora informado no Modelo de Equipamento. Exemplo se um modelo de equipamento gera 100 por hora em operando e -20 em manutenção, então se esse equipamento ficou 10 horas em operação e 4 em manutenção ele gerou `10 * 100 + 4 * -20 = 920`.

* **Diferenciar os equipamentos**: Diferenciar visualmente os equipamentos por modelo de equipamento na visualização do mapa.

* **Histórico de posições**: Que seja possível visualizar o histórico de posições de um equipamento, mostrando o trajeto realizado por ele.

* **Testes**: Desenvolva testes que achar necessário para a aplicação, seja testes unitários, testes automatizados, testes de acessibilidade, etc.

* **Documentação**: Gerar uma documentação da aplicação. A documentação pode incluir detalhes sobre as decisões tomadas, especificação dos componentes desenvolvidos, instruções de uso dentre outras informações que achar relevantes.

## Entregas

Para realizar a entrega do teste você deve:

* Relizar o fork e clonar esse repositório para sua máquina.
  
* Criar uma branch com o nome de `teste/[NOME]`.
  * `[NOME]`: Seu nome.
  * Exemplos: `teste/fulano-da-silva`; `teste/beltrano-primeiro-gomes`.
  
* Faça um commit da sua branch com a implementação do teste.
  
* Realize o pull request da sua branch nesse repositório. -->



# Teste para Front-end Aiko Digital

## Descrição
A classe "Equipment" é instanciada de acordo com os valores obtidos nos arquivos.JSON, gerando objetos para casa equipamento. Classes auxiliares para as entidades "Position" e "State" também são criadas, e casa equipamento contém um array de dadas classes.
No "App.tsx", todos os equipamentos são passados para os componentes "sidebar" e "map"

"sidebar" contém um campo de rolagem(radix scrollArea) que exibe um "card" com as informações(nome, modelo, estado etc) para cada equipamento. Cada "card" também inclui um "accordeon" que exibe uma outra scrollArea com o histórico de estados de cada equipamento. No topo da sidebar existe 3 componentes "select", que podem ser utilizados para filtrar especificos equipamentos(por nome,modelo e estado atual).

"map" é um componente do Leaflet, que exibe um mapa com as cordenadas indicadas. Para cada equipamento, um "marker" é criado no mapa. Cada marker tem um ícone e uma cor correspondente a seu modelo(caminhão de carga, garra traçadeira ou harverster) e estado(parado, trabalhando ou em manutenção). Ao clicar em um "marker" uma "popUp" aparece mostrando mais informações sobre o equipamento em questão, e a possibilidade de também ver o histórico de estados do equipamento


### Tecnologias utilizadas

- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

- Radix-UI Components (https://www.radix-ui.com/)
- Phospor-Icons icons (https://phosphoricons.com/)

### Instalação e inicialização do projeto
```
git clone
cd client
npm i
npm run dev
```
