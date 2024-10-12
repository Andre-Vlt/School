<p align ="center">
    <img src = "./assets/images/api-logo.png" alt="Logo do projeto">
</p>

<h2>OBJETIVO DO PROJETO</h2>
<p>Desenvolvido como projeto para o Tech Challenge (fase 2) da pós graduação em desenvolvimento full stack da FIAP.</p>
<h2>DESCRIÇÃO</h2>
<p>API RESTful para gerenciamento de posts em formato de texto. Construída em Node.js e typescript</p>
<h2>INSTALAR E CONFIGURAR LOCALMENTE</h2>
<p>
<ol>
<li><b>Clonar o repositório:</b><br>
    - git clone https://github.com/Andre-Vlt/School</li><br>
<li><b>Instalar as dependências:</b><br>
    - npm install</li><br>
<li><b>Configurar variáveis de ambiente em .env</b><br>
    <ul>
        <li>Foi utilizado postgres com Docker. A imagem para o banco de dados pode ser obtida com o comando:<br> - docker pull andrevlt/school-app </li>
        <li>Caso assim prefira, é possível criar a imagem localmente utilizando o docker-compose:<br>
        - docker-compose up</li>
        </ul>
<li><b>Rodar o projeto:</b><br>
    - npm run start</li><br>
<li><b>Testes (dev environment):</b><br>
    - npm run test</li>
</ol>
</p>
<h2>DOCUMENTAÇÃO</h2>
<p>Toda a <b>documentação do projeto</b> foi feita utilizando SWAGGER, contendo todos os endpoints e exemplos de uso dos mesmos. Acesse a documentação pela rota <b>/api-docs</b>, uma vez que o projeto esteja rodando.</p>
<h2>INSTRUÇÕES DE USO</h2>
<p>Apesar de existir a documentação swagger, listarei os principais endpoints presentes na API. São eles:<br>

<ol>

<li>POST/adm/user
<ul>
<li>Para que possamos iniciar com a manipulação de posts, é preciso efetuar o cadastro de usuários, que poderão ser professores ou alunos. A seguir segue um exemplo de corpo da requisição para efetuar o cadastro de um usuário:<br>
{<br>
"username":"username1",<br>
"password":"password1"<br>
}</li></ul></li>
<br>

<li>POST/adm/person
<ul>
<li>Uma vez cadastrado o usuário, precisa-se dizer que este é uma pessoa. Isto é feito passando o id de usuário, que é retornado quando se faz a criação do mesmo, numa nova requisição POST com alguns atributos a mais. Segue exemplo do corpo da requisição:
<br>
{<br>
    "id_user": "uuid_gerado_na_requisição_anterior",<br>
    "name":"John",<br>
    "email":"john@email.com",<br>
    "birth":"1999-02-09",<br>
    "cpf":"12345678910"<br>
}
</li>
</ul></li><br>


<li>
POST/adm/teacher
<ul>
<li>
Com a pessoa já cadastrada, é necessário dizer qual a função (aluno ou professor) da mesma. Faz-se isso com o endpoint acima e o corpo de sua requisição da seguinte maneira:<br>
{<br>
    "id_person":"uuid_gerado_person",<br>
    "id_subject": "1"<br>
}<br>
<b>OBS: O código conta com um arquivo de inicialização do banco de dados, que conta com o insert das matérias necessárias em sua devida tabela.
</b>
</li></ul>

<li>POST/adm/student
<ul><li>Para atribuir a função de aluno para uma pessoa, basta passar no corpo da requisição os seguintes atributos:<br>
{<br>
"id_person":"uuid_gerado_person",<br>
"grade":"9"<br>
}
    </li></ul></li>

<br>
<li>POST/teacher/post
<ul>
<li>
Para inserir um novo post, é necessário que um id de professor e o id da matéria a qual o post é referido sejam passados no corpo da requisição, da seguinte maneira:<br>
{<br>
"id_teacher": "uuid_professor",<br>
"id_subject": "1",<br>
"post_text": "Aqui vem o texto do post, que pode conter quebras de linhas utilizando "\n",<br>
"post_title": "Título do post"<br>
}
</li>
</ul></li>
<br>

<li> DELETE/teacher/post/:post_id
<ul>
<li>
Uma vez criado o post, pode-se excluí-lo com a rota acima. Basta inserir o id do post na url. Exemplo:<Br>
<center><b>localhost:3000/teacher/post/1</b></center>
A rota acima resultará na exclusão do post de id 1.
</li>
</ul>
</li>
<br>

<li>UPDATE/teacher/post/:post_id
<ul>
<li>
Para atualizar o conteúdo de um post, basta referir-se ao id do mesmo pela URL e passar no corpo de sua requisição os seguintes atributos:<br>
{<br>
"id_teacher": "uuid_professor",<br>
"id_subject": "1",<br>
"post_text": "Texto do post atualizado",<br>
"post_title": "Título do post atualizado"<br>
}
</li></ul></li>

<br>
<li>GET/teacher/posts<ul><li>
Para obter a lista de todos os posts, basta utilizar esta rota, que retornará um JSON de todos os posts.</li></ul></li>
<br>

<li>GET/student/posts/:id_post<ul><li>
É possível obter apenas um post específico, passando na URL o seu id. exemplo:<br>
<center><b>localhost:3000/student/posts/1</b></center>
O caminho acima retornará, se existir, o post de id 1.</li></ul></li>

<br>
<li>GET/student/search<ul><li>
Para obter todos os posts que contém uma palavra específica, é possível passar tal palavra nos query params, da seguinte maneira:<br>
<center><b>localhost:3000/student/search?keyWord=Test</b></center>
A partir desta requisição, todos os posts que tiverem ou em seu título ou em seu próprio texto a palavra "Test" serão retornados.</li></ul></li>


</ol><br></p>

<h2>PRINCIPAIS FUNCIONALIDADES</h2>
<p>
<ul>
<li>
Criação, leitura, atualização e remoção de posts (CRUD)
</li>
</ul>
</p>
<h2>TECNOLOGIAS UTILIZADAS</h2>
<p>
<ul>
<li>
Node.js;
</li>
<li>
Express
</li>
<li>
PostgreSQL
</li>
<li>
Docker
</li>
<li>
Zod
</li>
<li>
Vitest
</li>
</ul>
</p>

<h2></h2>
