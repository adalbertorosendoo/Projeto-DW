FROM node:20.17 AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# FROM nginx:1.26.0-alpine AS production-stage
# RUN mkdir /app
# COPY --from=build-stage /app/src/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

CMD [ "npm", "run", "preview"]