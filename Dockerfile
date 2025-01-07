# Usando a imagem oficial do Node.js
FROM node:18

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando apenas os arquivos de dependências inicialmente
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante do código para o container
COPY . .

# Expondo a porta 5173, que é usada pelo Vite em modo de desenvolvimento
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev", "--", "--host"]
