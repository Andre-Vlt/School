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
<h2>INSTRUÇÕES DE USO</h2>
<p>Toda a <b>documentação do projeto</b> foi feita utilizando SWAGGER, contendo todos os endpoints e exemplos de uso dos mesmos. Acesse a documentação pela rota <b>/api-docs</b>, uma vez que o projeto esteja rodando.</p>
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
