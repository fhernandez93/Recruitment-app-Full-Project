import os
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential
from dotenv import load_dotenv
load_dotenv()

keyVaultName = os.environ["KEY_VAULT_NAME"]
KVUri = f"https://{keyVaultName}.vault.azure.net"
credential = DefaultAzureCredential()
client = SecretClient(vault_url=KVUri, credential=credential)

SQLUSER=str(client.get_secret("SQLUSER").value)
SQLPASS=str(client.get_secret("SQLPASS").value)
KEY_VAULT_NAME=os.getenv("KEY_VAULT_NAME")
CLIENT_SECRET=os.getenv("CLIENT_SECRET")
CLIENT_ID=os.getenv("CLIENT_ID")
AUTHORITY=os.getenv("AUTHORITY")
REDIRECT_PATH = "/getAToken"
ENDPOINT = 'https://graph.microsoft.com/v1.0/me'
SCOPE = ["User.Read"]
SESSION_TYPE = "filesystem"

