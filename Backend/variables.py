import os
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential
from dotenv import load_dotenv
load_dotenv()

keyVaultName = "keyRecruitmentApp"
KVUri = f"https://{keyVaultName}.vault.azure.net"
credential = DefaultAzureCredential()
client = SecretClient(vault_url=KVUri, credential=credential)

SQLUSER=str(client.get_secret("SQLUSER").value)
SQLPASS=str(client.get_secret("SQLPASS").value)
KEY_VAULT_NAME=str(client.get_secret("KEYVAULTNAME").value)
CLIENT_SECRET=str(client.get_secret("CLIENTSECRET").value)
CLIENT_ID=str(client.get_secret("CLIENTID").value)
AUTHORITY=str(client.get_secret("AUTHORITY").value)
REDIRECT_PATH = "/getAToken"
ENDPOINT = 'https://graph.microsoft.com/v1.0/me'
SCOPE = ["User.Read"]
SESSION_TYPE = "filesystem"

