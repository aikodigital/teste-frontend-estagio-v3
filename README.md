
# Gerenciamento de Equipamentos

*Deploy* 
https://aiko-frontend.onrender.com/

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
