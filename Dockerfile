# Base image for backend
FROM python:3.12.8 AS backend

WORKDIR /app
COPY Backend/ /app

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

RUN apt-get install gcc
# Install gcc, update apt-get, and install unixODBC development package
RUN apt-get update 
RUN apt-get install -y gcc 
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - 
RUN curl https://packages.microsoft.com/config/debian/11/prod.list  > /etc/apt/sources.list.d/mssql-release.list 

RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash
RUN apt-get update 
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql18 
RUN apt-get install -y unixodbc-dev
RUN pip3 install -r requirements.txt

RUN az login
EXPOSE 3000

CMD ["python","server.py"]
