# teste-alfredo-luis-silva-santana
Teste V3 para a vaga de estagiário em desenvolvimento Frontend.
## Execução
* **0** Certifique-se que tem o Node.js esteja instalado na sua maquina local, e caso tenha problemas na execução atualize-o para a versão mais recente.
* **1** Baixe ou clone o repositório do GitHub em sua máquina local.
* **2** Abra o terminal ou o prompt de comando na pasta do projeto.
* **3** Execute o comando 'npm install --force' para baixar e instalar todas as bibliotecas e dependências usadas pelo aplicativo. Isso deve criar uma pasta "node_modules" na raiz do projeto
* **4** Depois que a instalação estiver concluída, execute o comando npm start para iniciar o servidor de desenvolvimento. Isso deve abrir o aplicativo no seu navegador padrão no endereço http://localhost:3000/ (ou em outra porta, se a porta 3000 já estiver sendo usada).

## Funcionalidades
A seguir, são descritas as principais funcionalidades do projeto, que foram feitas pensando no UX Desing da aplicação:
### Mapa
* É a tela inicial do projeto, mostrando a localização de todos os equipamentos, com um zoom adequado.
* É exbido uma legenda dentro do mapa para as cores e símbolos do mapa, deixando-o mais simples de ser compreendido.
* Possui ícones dos equipamentos diferenciados de acordo com o modelo e estado atual.
### Detalhes do Equipamento
* Ao clicar em um ícone é aberto um popup mostrando as principais informações atuais do equipamento, como nome, modelo, ultima atualização de estado e localização, e um botão para mais informações do equipamento.
* Após clicar em "mais informações", o mapa deve diminuir de tamanho para a esquerda e exibir as próximas características no espaço que se abril
* A localização atual da máquina selecionada deve permanecer em destaque
* Aparece o histórico dos ultimos dias de suas localizações, indo de branco para a mais antiga e preto para a mais recente. 
* O resultado do Cálculo de Ganho e Percentual de Produtividade
### Cálculo de Ganho e Percentual de Produtividade
* O projeto deve calcular o ganho por equipamento total e percentual de produtividade do equipamento total
* O caluculo é feito baseado no período de informações fornecidas pelo arquivo equipmentStateHistory.json.
### Pesquisa por Equipamentos e Seletor por Estado ou Modelo
* A pesquisa sugere os nomes de todos os equipamentos, além da opção "todos".
* Ao alterar a pesquisa, ela leva para os Detalhes do Equipamento do respectivo equipamento, ou para o Mapa inicial, caso a opção "todos" seja escolhida.
* O seletor sugere os nomes de todos os estados e modelos de equipamento e também possuem a opção "todos".
* Ao alterar o seletor, ele fara ser exibido no mapa, apenas os equipamentos que correspondem ao filtro.

## Tecnologias Utilizadas
O projeto utiliza as seguintes tecnologias:
* React
* Leaflet
* HTML
* CSS
* JavaScrit
