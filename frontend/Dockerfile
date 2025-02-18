# Build frontend React app
FROM node:16.15.1 AS frontend
WORKDIR /app
COPY . .
RUN yarn install && yarn run build


# Install dependencies
RUN apt-get update && apt-get install -y gcc curl nginx

# Setup Nginx
# COPY /default.conf /etc/nginx/conf.d/default.conf
# RUN rm -rf /usr/share/nginx/html/* && \
#     cp -r ./frontend_build/* /usr/share/nginx/html/

# # Expose the ports for backend and frontend
# EXPOSE 80

# Stage 2: Serve
FROM nginx:alpine

COPY --from=frontend /app/dist /usr/share/nginx/html

EXPOSE 80

