# Base image for backend
FROM python:3.12.8 AS backend

WORKDIR /app
COPY . .
# Declare arguments (passed from .env)
ARG CLIENT_ID
ARG CLIENT_SECRET
ARG TENANT_ID

# Export as environment variables
ENV CLIENT_ID=${CLIENT_ID}
ENV CLIENT_SECRET=${CLIENT_SECRET}
ENV TENANT_ID=${TENANT_ID}

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
RUN pip install -r requirements.txt

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh




# Expose the ports for backend and frontend
EXPOSE 3000

CMD ["/entrypoint.sh"]

