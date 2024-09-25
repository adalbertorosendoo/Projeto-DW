FROM node:20-alpine3.19

# Instalar tini e outras ferramentas necessárias
RUN apk update && apk add --no-cache tini

WORKDIR /app

# Copia o código da aplicação
COPY package*.json ./
RUN npm ci
COPY . .

# Copia o arquivo cronjob e o script de limpeza
COPY cronjob /etc/crontabs/root
COPY cleanup.sh /app/cleanup.sh

# Dá permissão de execução ao script de limpeza e ao entrypoint
RUN chmod +x /app/cleanup.sh
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Usa tini como PID 1 para o contêiner
ENTRYPOINT ["/sbin/tini", "--", "/app/entrypoint.sh"]

# Expor a porta
EXPOSE 5000
