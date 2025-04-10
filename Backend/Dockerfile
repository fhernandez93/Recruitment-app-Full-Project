# Base image for backend
FROM python:3.12.8 AS backend

WORKDIR /app
COPY . .

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
# # RUN az login
# RUN az login --service-principal -u "$CLIENT_ID" -p "$CLIENT_SECRET" --tenant "$TENANT_ID"



# Expose the ports for backend and frontend
EXPOSE 3000



# Serve the React app on port 80 and Flask app on port 3000
# CMD ["python","server.py"]
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]