<<<<<<< HEAD
# Checoristo
Trabalho faculdade - lista de compras
=======
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
>>>>>>> master




Engenharia de Software Fase 5
Nome: Vitor Bansen Delfino e Julio Cesar Marcon
Projeto Gestão De Vendas(GV)
1. Introdução
1.1 Objetivos
○ O objetivo do projeto GV é desenvolver uma aplicação web para
gerenciamento de Gestão de vendas, oferecendo uma interface amigável e
intuitiva para os usuários.
1.2 Escopo
○ O escopo do projeto abrange o desenvolvimento tanto do frontend quanto do
backend da aplicação, utilizando tecnologias como TypeScript, React.js,
Chakra UI, Prisma ORM e SQLite.
1.3 Definições
1.3.1 Requisitos Funcionais
1.3.2. CRUD de Itens do Projeto GV
Os usuários podem adicionar novos itens à Tabela de gestão , especificando o nome,
quantidade e qualquer outra informação relevante. Eles podem editar os detalhes de um
item existente, como quantidade ou descrição. Os itens podem ser removidos da tabela
quando não forem mais necessários.
1.3.3. Marcar Itens como Vendidos
Os usuários podem marcar os itens da tabela como comprados após adquiri-los. A opção
de desmarcar itens comprados também está disponível para ajustes futuros
.
1.3.4 Filtrar e Pesquisar Itens
Os usuários podem filtrar os itens da tabela com base em diferentes critérios, como
categoria, status de compra, etc. A funcionalidade de pesquisa permite que os usuários
encontrem rapidamente itens específicos na tabela, digitando palavras-chave.
1.3.5 Existem Duas Tabelas que seriam Minhas vendas e Confirmados - Quando acionar o
checkbox do produto em minhas vendas ele será adicionado a tabela Confirmados.
1.3.6 Requisitos Não Funcionais
1.3.7 Interface de Usuário Intuitiva A interface de usuário será projetada de forma intuitiva e
amigável, garantindo que os usuários possam navegar facilmente pela aplicação e realizar
tarefas sem dificuldade.
1.3.8 Tela de Criação de Produto A tela de criação de produto permitirá que os usuários
iniciem uma novo produto, fornecendo detalhes básicos, como título da lista e possíveis
categorias.
1.4 Evolução
○ Será Organizada Pelo Git Commits no projeto com o controle e data dos
commits
2. Gerenciamento de Configuração de Software
○ Será gerenciado com o GitHub e o Jira.
2.1 Organização e Responsabilidade
○ Será usado o Figma para organização e
2.2 Ferramentas, Ambientes, Infraestrutura
Neste projeto, serão utilizadas diversas ferramentas e tecnologias para criar uma base
sólida de desenvolvimento. O ambiente de desenvolvimento será configurado com o
seguinte conjunto de ferramentas:
● Visual Studio Code (VSCode): Um editor de código-fonte leve e altamente
personalizável, ideal para desenvolvimento em várias linguagens de programação,
incluindo TypeScript.
● Node.js: Um ambiente de execução JavaScript que permite executar código
JavaScript no lado do servidor, tornando-o ideal para construir aplicativos web
escaláveis.
● TypeScript: Uma extensão do JavaScript que adiciona tipagem estática opcional e
outros recursos avançados, fornecendo uma base sólida para desenvolvimento de
aplicativos robustos e escaláveis.
● Prisma: Uma ferramenta moderna de mapeamento objeto-relacional (ORM) para
Node.js e TypeScript. O Prisma simplifica a interação com bancos de dados SQL,
fornecendo uma API tipo-safe e gerando código TypeScript automaticamente com
base no modelo de dados.
● SQLite: Um banco de dados SQL embutido que é rápido, confiável e amplamente
utilizado em aplicativos móveis, desktop e web. Sua simplicidade e eficiência o
tornam uma escolha conveniente para desenvolvimento local e pequenas
aplicações.
.
3. O Programa de Gerenciamento de Configuração
3.1 Utilização do Git para Controle de Versão:
3.1 No contexto do seu projeto, o Git será utilizado para controlar o código-fonte, permitindo
que você e sua equipe trabalhem de forma colaborativa e acompanhem as mudanças ao
longo do tempo. Aqui estão algumas políticas e procedimentos que podem ser adotados:
● Políticas de Branch: Você pode adotar uma estratégia de branch como o Git Flow,
onde existem branches principais como master (para código pronto para produção) e
dev (para integração de novos recursos). Além disso, branches de feature, hotfixes e
release podem ser criados conforme necessário.
● Políticas de Merge: As branches de feature podem ser mescladas de volta para a
branch dev após a conclusão do desenvolvimento e revisão de código. Hotfixes
podem ser mesclados tanto em dev quanto em master, dependendo da gravidade do
problema. O merge deve ser feito através de pull requests para garantir revisão de
código.
● Procedimentos para Resolução de Conflitos: Quando ocorrem conflitos durante o
merge, os desenvolvedores devem resolver esses conflitos localmente em suas
máquinas, garantindo que o código resultante seja funcional e mantenha a
integridade do projeto.
3.2 Planejamento com Prisma:
Prisma pode ser utilizado para planejar e gerenciar o modelo de dados do seu projeto.
Aqui está como você pode aplicá-lo:
● Definição de Requisitos: Antes de começar a desenvolver, é importante definir os
requisitos do seu projeto. Isso pode incluir identificar as entidades principais do seu
sistema, seus atributos e os relacionamentos entre elas.
● Criação de Modelos de Dados: Com base nos requisitos definidos, você pode criar
modelos de dados usando o Prisma. Isso envolve a definição de entidades (como
usuários, posts, comentários, etc.) e seus campos correspondentes.
● Esquemas de Banco de Dados: Uma vez que os modelos de dados estejam
definidos, o Prisma pode ser usado para gerar esquemas de banco de dados. Isso
inclui a geração de migrations para criar ou alterar tabelas no banco de dados
conforme necessário.
3.3 Acompanhamento de Tarefas com Jira:
O Jira pode ser usado para acompanhar e gerenciar as tarefas do projeto. Aqui está como
ele pode ser aplicado:
● Atribuição de Tarefas: As tarefas podem ser criadas no Jira e atribuídas aos
membros da equipe responsáveis por sua conclusão. Isso permite que todos saibam
quem está trabalhando em cada tarefa.
● Acompanhamento de Progresso: Os membros da equipe podem atualizar o status
de suas tarefas no Jira à medida que avançam. Isso permite que todos
acompanhem o progresso do projeto em tempo real.
● Registro de Problemas: Se surgirem problemas durante o desenvolvimento, eles
podem ser registrados no Jira como problemas a serem resolvidos. Isso ajuda a
garantir que todos os problemas sejam documentados e tratados adequadamente.
4. Marcos
○ Lista os principais marcos do projeto, incluindo etapas de desenvolvimento,
integração, testes e lançamentos. Isso inclui prazos estimados para cada
marco e critérios de conclusão no Jyra e Git.
5. Controle de Software
Controle de Alterações:
● Utilizo o Git para rastrear e gerenciar todas as alterações no código-fonte.
● Escrevo mensagens de commit descritivas para documentar o propósito e
impacto das mudanças realizadas.
Políticas de Branch e Merge:
● Sigo a estratégia Git Flow, trabalhando com as branches master e develop.
● Crio branches de feature a partir de dev e as mesclo de volta após conclusão
e revisão.
● Realizo hotfixes e os mesclo em master e develop conforme necessário.
Procedimentos de Liberação de Versões:
● Defino versões com base em marcos do desenvolvimento.
● Crio versões de release candidate a partir de dev.
● Conduzo testes de aceitação e regressão antes da liberação oficial.
Revisões de Código e Testes de Qualidade:
● Realizo revisões de código em minhas próprias alterações antes da
mesclagem.
● Utilizo pull requests para revisar e discutir minhas próprias mudanças.
● Implemento testes automatizados e manuais para garantir a qualidade do
código e do produto final.
