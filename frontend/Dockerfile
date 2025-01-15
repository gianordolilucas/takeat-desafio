# Etapa 1: Construção do frontend
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Mostre a estrutura de arquivos após copiar tudo
RUN echo "Estrutura de arquivos após copiar tudo:" && ls -l

# Execute o build do frontend
RUN npm run build

# Etapa 2: Usando Nginx para servir os arquivos
FROM nginx:alpine

# Mostre a estrutura de arquivos no Nginx
RUN echo "Estrutura de arquivos do Nginx:" && ls -l /usr/share/nginx/html

# Copie os arquivos construídos para o Nginx
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

# Inicie o Nginx
CMD ["nginx", "-g", "daemon off;"]
