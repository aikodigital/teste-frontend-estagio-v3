
# Introdução

Nesse teste, como o conhecimento em HTML, CSS e JS é avaliado, eu optei por utilizar um código em JS que realiza a mesma função de um JSX (react.js). Criei uma função chamada "Page" que é genérica, ou seja, não é necessário inserir manualmente no código qual o dado que se quer tratar. Essa função faz a busca no objeto JSON onde estão os dados e encontra os seus pares nos demais objetos, tornando possível adicionar mais dados no JSON (respeitando a modelagem do objeto) e ela irá tratar essas novas informações normalmente.

Para o melhor acesso desse código, ele foi hospedado no site https://www.felipececcotti.com/rastreio/

# O Porquê de tais decisões!

Não julguei necessário documentar o código, pois cada função já possui comentários para auxiliar no entendimento e para facilitar futuros upgrades.

É importante ressaltar o porquê das escolhas feitas. Inicialmente, o código foi pensado para ser mais estático. No entanto, durante o desenvolvimento, houve uma mudança de direção e optou-se por um código mais genérico. Dessa forma, é possível alterar informações no JSON e, se essas alterações fizerem sentido para a função, ela será tratada normalmente. Por exemplo, se um novo estado "em pausa" for adicionado ou uma nova cor for incluída, o código será capaz de adicioná-los ao código.

# Como o código funciona?


Como é selecionado os equipamentos?

No final do código, é possível observar um "addEventListener" que utiliza o método 'change'. Quando há uma mudança de veículo no "select", o valor selecionado é enviado para minha função "Page()". Para alternar entre os veículos sem problemas e evitar a desseleção de um veículo e o retorno à página inicial, foi criado um "if" que verifica o valor recebido pelo "select". Se o valor for válido, ele é atribuído à minha função "Page()" e a página inicial é removida da tela, e  o mapa e a tabela são adicionados. Se o valor for falso, a página inicial é exibida novamente e o mapa e a tabela são removidos da tela.

Como é possível fazer os pares que vêm dos JSONs?

Para tornar este código mais dinâmico, em vez de ser necessário especificar manualmente qual objeto do array é necessário, foi utilizado o método "Find()" para encontrar o par desse equipamento com base em sua id. Por exemplo, se um equipamento 1 tiver a id1 e houver outro objeto JSON com várias informações, indicando que se trata do equipamento 1, o código encontrará automaticamente o equipamento correspondente usando o método "Find()".



# Quais foram os principais desafios?

Um dos principais desafios foi usar o Leaflet, uma biblioteca que nunca havia utilizado antes. Foi necessário compreender seu funcionamento e aplicá-la corretamente, o que exigiu a leitura atenta da documentação.

Outro desafio foi não utilizar o React, uma vez que o teste não é avaliado outras linguagens além de HTML, CSS e JS, apesar de outras linguagens serem permitidas. Decidi me desafiar a desenvolver um código 100% em JS, buscando a diversidade do React.js, que permite manipular estados sem a necessidade de mudar de página.






