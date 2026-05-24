# Estágio 1: Build da aplicação React
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm ci

# Copia o restante do código
COPY . .

# Roda o build de produção (gera a pasta dist)
RUN npm run build

# Estágio 2: Servidor Nginx para os arquivos estáticos
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos buildados do estágio anterior para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuração customizada do Nginx para suportar React Router (SPA)
# Isso garante que qualquer rota recaia no index.html e não retorne 404
RUN echo 'server { \
    listen 80; \
    server_name _; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expõe a porta 80 do container
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
