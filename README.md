# Desafio Tekeat

## Descrição


## Pré-requisitos

### PostgreSQL

Este projeto utiliza o **PostgreSQL** como banco de dados. Para configurá-lo corretamente, siga os passos abaixo:

1. **Instale o PostgreSQL**  
   Caso não tenha o PostgreSQL instalado, você pode seguir as instruções no [site oficial do PostgreSQL](https://www.postgresql.org/download/) para o seu sistema operacional.

2. **Criação do banco de dados**  
   Após instalar o PostgreSQL, crie um banco de dados para o projeto. Você pode fazer isso através do terminal com o comando:
   
   ```bash
   psql -U postgres
   CREATE DATABASE nome_do_banco;
   ```

3. **Criação de um usuário**  
   Em seguida, crie um usuário com permissões para acessar o banco de dados. Execute o seguinte comando no terminal:

   ```bash
   CREATE USER seu_usuario WITH ENCRYPTED PASSWORD 'sua_senha';
   GRANT ALL PRIVILEGES ON DATABASE nome_do_banco TO seu_usuario;
   ```

5. **Verifique a conexão**  
   Após configurar o banco, você pode testar se a conexão está funcionando corretamente com um cliente SQL, como o pgAdmin ou usando o comando psql no terminal:

   ```bash
   psql -U seu_usuario -d nome_do_banco
   ```

### Redis

Este projeto também utiliza o **Redis** para armazenamento em cache ou outras funcionalidades. Siga os passos abaixo para configurar o Redis:

1. **Instale o Redis**  
   Se você ainda não tem o Redis instalado, siga as instruções no [site oficial do Redis](https://redis.io/download) para o seu sistema operacional.

2. **Inicie o Redis**  
   Após instalar, inicie o Redis no seu sistema. Geralmente, você pode iniciar o Redis com o comando:

   ```bash
   redis-server
   ```

3. **Verifique a conexão**  
   Para verificar se o Redis está funcionando corretamente, execute o comando:

   ```bash
   redis-cli ping
   ```

   O Redis deve responder com `PONG`.

4. **Instale o Redis no Docker**
  Caso esteja usando um ambiente com DOcker basta instalar o Redis nele, execute o comando:
   ```bash
   docker run -d --name redis -p 6379:6379 redis  
   ```

## Instalação

Clone este repositório:

   ```bash
   git clone [URL do repositório]
   cd [nome_do_projeto]
   ```

### Instalação do Backend

1. Navege para a pasta do projeto:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configuração no arquivo `.env`
   O projeto requer que você forneça as credenciais do banco de dados no arquivo `.env`. Crie este arquivo na raiz do projeto e adicione as seguintes variáveis:

   ```env
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   DB_HOST=localhost
   DB_PORT=5432
   ```

   Onde:
   - `DB_USER`: o nome do usuário que você criou.
   - `DB_PASSWORD`: a senha do usuário.
   - `DB_NAME`: o nome do banco de dados que você criou.
   - `DB_HOST`: o endereço do servidor PostgreSQL (geralmente `localhost`).
   - `DB_PORT`: a porta de conexão do PostgreSQL (o padrão é `5432`).

4. Crie as tabelas:

   ```bash
   npm run migrate
   ```
5. Rode os Seeders:

   ```bash
   npm run seed
   ```

### Executando o Projeto Backend

1. Inicie o servidor:

   ```bash
   npm start:dev
   ```

2. O projeto estará disponível em: [http://localhost:8000](http://localhost:8000)

3. O Swagger está disponível em: [http://localhost:8000/api-docs](http://localhost:8000/api-docs)


### Instalação do Front

1. Navege para a pasta do projeto:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configuração no arquivo `.env`
   O projeto requer que informe a rota onde esta o backend. Para isso, basta alterar a variável `VITE_API_URL` para o endereço do servidor.
   Se não mudou a porta basta deixar o valor padrão:
   ```bash
   VITE_API_URL=http://localhost:8000
   ```


### Executando o Projeto Front

1. Inicie o servidor:

   ```bash
   npm run dev
   ```

2. O projeto estará disponível em: [http://localhost:5173](http://localhost:5173)



