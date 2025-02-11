# Base image for backend
FROM python:3.12.8 AS backend

WORKDIR /app
COPY Backend/ /app
RUN pip install -r requirements.txt

# Build frontend React app
FROM node:16.15.1 AS frontend
WORKDIR /frontend
COPY frontend/ .
RUN yarn install && yarn run build

# Final Image
FROM python:3.12.8
WORKDIR /app
COPY --from=backend /app .
COPY --from=frontend /frontend/dist ./frontend_build

ENV FLASK_ENV=production

CMD ["python", "Flask-Server/server.py"]

# az webapp create -g opt-recruitment-app -p opt-recruitment-app-service -n opt-recruitment-app-web -i optrecruitmentapp.azurecr.io/recruitment-app-optumus:latest