import pyodbc
from flask import Blueprint, current_app, url_for, jsonify,request
from variables import *
import requests
from dotenv import load_dotenv
import os
load_dotenv()

# Create a Blueprint for the database routes
db_blueprint = Blueprint('db_blueprint', __name__)

@db_blueprint.before_request
def verify_token():
    
    if os.getenv("DEV"):
        user = current_app.config["fake_token"]
    else:
        user = current_app.config['auth_var'].get_user()

    if not user:
        return jsonify({'error': 'Unauthorized'}), 401



def get_db_connection():
    if os.environ.get("DEV"):
        Driver = rf"DRIVER={{SQL Server}};Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;"
    else:
        Driver = rf"Driver={{ODBC Driver 18 for SQL Server}};Server=tcp:recruitment-app.database.windows.net,1433;Database=opt-recruitment-db;Uid={SQLUSER};Pwd={SQLPASS};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    
    conn = pyodbc.connect(Driver)
    return conn

@db_blueprint.route('/api/data/jobs', methods=['GET'])
def get_data():
    """Handle GET requests to fetch data from the database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = "SELECT * FROM [REC - Jobs]"  # Replace with your table name
    cursor.execute(query)
    rows = cursor.fetchall()

    # Convert rows to a JSON-compatible format
    data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]
    
    conn.close()
    return jsonify(data)


@db_blueprint.route('/api/data/jobs', methods=['POST'])
def insert_data():
    """Handle POST requests to insert data into the database."""
    data = request.json
    name = data.get('Role Name')

    if not name:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    query = "INSERT INTO [REC - Jobs] ([Role Name]) VALUES (?)"  # Replace with your table columns
    cursor.execute(query, (name))
    conn.commit()
    
    conn.close()
    return jsonify({"message": "Data inserted successfully"}), 201
