# Setup do Ambiente Frontend com Docker

Este documento fornece instruções detalhadas sobre como rodar o ambiente frontend utilizando Docker, com suporte para desenvolvimento local.

## **Requisitos**
Certifique-se de ter instalado:
- [Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
- [Docker Compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt)
## **Subindo o Ambiente com Docker**

1. **Clone o Repositório:**
   ```bash
   git clone git@github.com:rgkip01/register-users-front-3clicksRH.git
   cd register-users-front-3clicksRH
   ```

2. **Construa e suba os containers:**
   ```bash
   docker-compose build --no-cache
   ```
3. **Suba os containers:**
   ```bash
   docker-compose up web
   ```

   O frontend estará acessível em `http://localhost:5173`.
   
   > **Nota:** Se tudo correr bem com o setup, você verá uma tela semelhante a esta:
![alt text](image.png)
---

## **Variáveis de Ambiente**

O projeto utiliza algumas variáveis de ambiente importantes, definidas no arquivo `.env.local`:

```bash
VITE_BACKEND_URL=http://localhost:3000/api/v1
VITE_JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.qOC1IujG6MLzDGxrxRIeoo-IPNWwmtZg5tLi8bCguqk
```

- **`VITE_BACKEND_URL`**: URL do backend que será consumido pelo frontend.
- **`VITE_JWT_SECRET`**: Token JWT utilizado para simular autenticação nas chamadas ao backend.

Certifique-se de que o backend esteja rodando localmente em `http://localhost:3000`.

---

## **Scripts Disponíveis**

Para instalar as dependências do projeto caso necessário:


- **`docker-compose run web npm install`**

---

## **Encerrando os Containers**

Para encerrar os containers e remover os serviços:

```bash
docker-compose down
```

---

## **Conclusão**
Este documento fornece todas as informações necessárias para rodar o ambiente frontend utilizando Docker. Certifique-se de seguir as instruções para garantir o funcionamento adequado durante o desenvolvimento local.

