# Teste Frontend estágio V3

## Decisões tomadas

- **Manter os dados em contexts diferentes**: Como haviam vários arquivos com dados, e como para cada informação que eu quisesse eu teria que usar o dado de algum arquivo para buscar em outro, decidi deixar todos separados para facilitar o entendimento;
- **Usar Context Api e não Redux**: Prefiro usar Redux apenas em aplicações que são muito grandes e possuem muitas variáveis, requisições, set States, etc;
- **Codar rápido e depois refatorar**: Pensando em tempo, primeiro eu criava a funcionalidade (no primeiro momento pensava mais na velocidade de criação das featues, para depois refatorar). Muitas coisas não tive tempo de refatorar, inclusive acabou sobrando um pequeno erro na linha 157, apesar de não ser um erro que quebra a aplicação, continua sendo um erro.

## Especificação dos componentes

### Contexts

Cada context foi responsável por armazenar e distribuir seus respectivos dados vindo da pasta data fornecida no desafio

### Map.tsx

Por ser o componente principal era o componente com mais responsabilidades, tais como:

- Exibir o Leaflet Map;
- Passar para o Leaflet qual era o icon de determinado <Marker/>;
- Buscar nos contexts os dados necessários que o <Marker/> necessita para exibir na tela e entrega-los;
- Buscar os dados sobre o último estado de cada equipamento, o nome do modelo e seu nome e passar para o <Popup/> do <Marker/>;
- Quando algum <Marker/> recebesse um click, chamaria o setSelectedEquipmentId passando o equipmentId para atuliazar o context para que o Panel.tsx pudesse cumprir sua função.

### Panel.tsx

- Consumir o dado do `SelectedEquipmentIdContext` e mostrar o histórico de estados do equipamento selecionado.

## Instruções de uso

### Como desenvolvendo

Projeto foi criado utilizando `yarn create vite`, então para executar-lo em sua máquina basta apenas utilizar `yarn run dev`

### Como usuário

Para usar a aplicação é bem simples, você precisa apenas clicar no equipamento que deseja ver informações e elas serão exibidas.
