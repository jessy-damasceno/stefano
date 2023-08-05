# Full Stack Typescript Contact List

Aplicação full stack de lista de contatos personalizada por usuário cadastrado feita com TypeScript, Express.js, Next.js e MySQL.

## Rodando a aplicação localmente (Com Docker) 🐋

1. Para rodar a aplicação localmente, é necessário criar o arquivo `backend/.env` com as variáveis de ambiente necessárias para o backend:

    > 💡 Dica: o arquivo `backend/env.example` já vem preenchido com os valores padrão do container gerado com o comando acima, ajuste para a sua instância conforme a necessidade.

    ```sh
    docker run -p 3306:3306 --name mysql_80 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=stefano -d mysql:8.0.32 mysqld
    ```

2. Na raíz do projeto, instale as dependências do projeto. Após instalado, suba o container do Docker através do docker-compose através do script abaixo:

    ```sh
    npm install
    npm run compose:up
    ```

4. Confira se o backend se conectou corretamente com o banco, através dos logs do Docker container. Se houve problemas, favor reiniciar o container app_backend.

5. Ainda na raiz do projeto, inicie a aplicação (o Next.js informará o entrypoint da aplicação):

   ```sh
    npm start
    ```
