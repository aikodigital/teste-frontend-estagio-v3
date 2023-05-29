# Aiko Digital

## Como executar a aplicação ?

1.0 Clicar no link da hospedagem:

<br>

Link para o projeto: https://raphael-lima-aiko-teste.netlify.app

<br>

2.0 Rodar na sua propria maquina:

<br>

2.2 Certificar que o nodeJS está na versão "18.14.2"

<br>

2.1 Executar o comando: "npm i"

<br>

2.2 Executar o comando: "npm start"

## Tecnologias e tecnicas utilizadas:

<ul>

<li>ReactJS</li>

<li>JavaScript</li>

<li>CSS</li>

<li>HTML</li>

<li>Design Responsivo</li>

<li>Mobile First</li>

</ul>

## Sobre a aplicação:

A aplicação é composta por três páginas, sendo que todas possuem o mesmo cabeçalho onde o usuário consegue pesquisar qualquer equipamento da aplicação pelo nome.

<br>

A primeira é a página home nela existe um mapa, uma lista de equipamentos e uma legenda para o usuário identificar o status no equipamento pela cor. No mapa é possível visualizar a localização de todos os equipamentos da aplicação, ao clicar na marcação gera um popup que mostra o nome e o status do equipamento, ao clicar nisso a aplicação é redirecionada para uma página onde mostra os dados do respectivo equipamento. Na lista de equipamentos estão todos os equipamentos identificados pelo nome e um bullet point com a cor do status do equipamento, ao clicar o usuário é redirecionado para a página do respectivo equipamento.

<br>

Na segunda página temos uma página para visualização dos dados de um único equipamento selecionado pelo usuário, nela é possível visualizar o histórico de status do equipamento em uma tabela e sua localização no mapa. Ao clicar na marcação do mapa gera um popup com o nome do equipamento.

<br>

Por fim, temos a última página que é apenas uma página caso o usuário erre a rota ou pesquise o nome errado de um equipamento na busca. Nela existe um botão para a aplicação ser redirecionada para a home.

## Montagem da aplicação:

Para construção da aplicação primeiramente mapeei todas as funcionalidades e os dados que eu queria entregar para o usuário no tempo proposto na demanda. Em seguida, já tendo as funcionalidades que estariam na aplicação fiz um rascunho do layout, pensando em ele iria apresentar essas funcionalidades, tentando alcançar sempre uma melhor experiência para o usuário.

<br>

Já tendo o layout separei todos os componentes dele para organizar melhor o código, ver quais componentes poderiam ser reutilizados e a comunicação entre eles. Nessa etapa tomei a decisão de não utilizar o Redux na aplicação, pois não haveria comunicação entre os componentes e como já tenho ideia clara que a aplicação não vai crescer, logo na minha opinião usar o redux não faria sentido.

<br>

Para o desenvolvimento do cabeçalho, optei por apenas colocar um logo e um espaço para busca. Nesse espaço para busca escolhi um único atributo do objeto de "equipment.json" que seria único assim conseguiria redirecionar a apicação para a página de um respectivo equipamento com o usuário pesquisando pelo nome e com esse dado capturei o id e o enviei na rota, caso o usuário não digite nada a aplicação não é redirecionado e caso o usuário digite o nome errado de algum equipamento a aplicação vai para a página de equipamento não encontrado.

<br>

Para a construção do mapa, lista de equipamentos, e a página única do equipamento, primeiramente invoquei todos os array de objetos que possuíam os dados que iria utilizar, criei uma função usando o useEffect para montar esse array de objetos para centralizar os dados que seriam utilizado e o apliquei dentro de uma state em cada componente, todas essas funções possuem comentários explicativos por terem uma maior complexidade, com isso foi apenas manipular esses dados para serem renderizados no layout de cada elemento, sendo que na página de única do equipamento eu fiz uma função de filtro para a partir desse array capturar o objeto pesquisado pelo usuário.

## Contato para Feedback:

Email: raphaeldesousalm@gmail.com <br>

LinkedIn: https://www.linkedin.com/in/raphaellima98/
