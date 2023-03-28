# Teste Frontend estágio V3
Author: Júlia Alessandra Borges Pereira

## O Desafio
Projeto desenvolvido para o Teste de Estágio Front-End da empresa Aiko.
Esse projeto gerencia os dados recolhidos de equipamentos utilizados em uma operação florestal, possibilitando ver informações de posição, estado atual e histórico de estados dos equipamentos.

Para saber mais sobre o desafio proposto, acesse o [README.md](https://github.com/aikodigital/teste-frontend-estagio-v3#readme) oficial.

### Tecnologias Utilizadas
* ReactJS
* Redux
* Typescript
* Leaflet
* ESLINT
* Prettier

### Funcionalidades
#### Exibição das máquinas e sua localização
O sistema se propõe a exibir a posição das máquinas, dispostas no mapa do Leaflet, diferenciando-as por modelo.

#### Filtro por máquinas
Essa função possibilita que seja feita a filtragem de equipamentos, onde selecionam-se os nomes das máquinas desejadas para a visualização no mapa. Selecionar uma ou mais máquinas afeta o estado de exibição das mesmas, desmarcar todas exibe novamente a listagem completa no mapa.

#### Informações das máquinas, estado atual e última posição
Essa função permite que o nome da máquina, seu ID, estado atual (operando, manutenção ou parado) sejam visualizados em um PopUp, que é exibido ao clicar sobre uma máquina. Além de sua última posição especificada em Latitude e Longitude, também é possível ter acesso ao histórico de estados da máquina.

#### Histórico de estados
Essa função mostra o histórico de estados de um determinado equipamento, por meio de uma tabela com dados de ID, data e cor do estado.

### Como executar o projeto

* Deverá ser clonado o repositório do projeto.
* Acessar a raiz do projeto.
* Instalar as dependências com:
`npm install`
* Executar o projeto com o comando:
`npm start`
* O navegador deverá abrir com o endereço `localhost:3000`

### Padronizando e validando o código com ESLINT e Prettier
* Para a validação de código, poderá ser executado o comando  na raiz do projeto
`npm run lint`
* Em caso de existência de códigos não adequados aos padrões de configuração, erros serão exibidos no terminal.
* É possível realizar o fix executando o comando no terminal:
`npm run lint:fix`
* Para formatação de identação e demais configurações, também foi configurado o Prettier, que pode ser executado da seguinte forma no terminal:
`npm run format`

### Configurações do ESlint
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "camelcase": "error",
    "spaced-comment": "error",
    "quotes": [
      "error",
      "single"
    ],
    "no-duplicate-imports": "error"
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": {}
    }
  }
}
```
### Configurações do Prettier
```json
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all",
  "jsxSingleQuote": true,
  "bracketSpacing": true,
}
```

