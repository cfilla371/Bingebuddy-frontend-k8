FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_REACT_APP_BACKEND_API_URL

ENV VITE_REACT_APP_BACKEND_API_URL=$VITE_REACT_APP_BACKEND_API_URL

RUN npm run build # Vite will now pick up the ENV variable here

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]