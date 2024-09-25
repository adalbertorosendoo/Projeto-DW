#!/bin/sh

# Iniciar o cronjob em background
crond -d 8 &

# Iniciar a aplicação
npm run start:migrate:deploy
