# Build frontend React app
FROM node:16.15.1 AS frontend
WORKDIR /app


# Define build-time environment variable
ENV VITE_APP_DEV=False
ENV VITE_APP_DEFAULTAUTH=fake
# ENV VITE_APP_BACKEND_URL="http://localhost:3000"
# ENV VITE_APP_FRONTEND_URL="http://localhost:80"
ENV VITE_APP_BACKEND_URL="https://opt-recuitement-backend.gentlemeadow-e1068751.westus2.azurecontainerapps.io"
ENV VITE_APP_FRONTEND_URL="https://opt-recruitement-frontend.gentlemeadow-e1068751.westus2.azurecontainerapps.io"

COPY . .
RUN yarn install && yarn run build


# Install dependencies
RUN apt-get update && apt-get install -y gcc curl nginx

FROM nginx:alpine

COPY --from=frontend /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

