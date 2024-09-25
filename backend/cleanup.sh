#!/bin/sh

# Diretório onde os arquivos de upload estão armazenados
UPLOAD_DIR="/app/uploads"

# Apagar todos os arquivos do diretório de upload
rm -rf $UPLOAD_DIR/*
echo "Arquivos de upload apagados."
