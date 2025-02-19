import pyodbc
from flask import Blueprint, current_app, url_for, jsonify,request
from variables import *
import requests

# Create a Blueprint for the database routes
db_blueprint = Blueprint('db_blueprint', __name__)

@db_blueprint.before_request
def verify_token():
    user = current_app.config['auth_var'].get_user()

    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

# Connect to the database. This will create a new file named 'mydatabase.db' if it doesn't exist.
Driver = rf"Driver={{ODBC Driver 18 for SQL Server}};Server=tcp:recruitment-app.database.windows.net,1433;Database=opt-recruitment-db;Uid={SQLUSER};Pwd={SQLPASS};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
conn = pyodbc.connect(Driver)
cursor = conn.cursor()

#Create tables 
cursor.execute('''
    if not exists (select * from sysobjects where name='Customers' and xtype='U')
    create table Customers (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        name varchar(max) NOT NULL
    )
''')

conn.commit()
conn.close()




def get_db_connection():
    Driver = rf"Driver={{ODBC Driver 18 for SQL Server}};Server=tcp:recruitment-app.database.windows.net,1433;Database=opt-recruitment-db;Uid={SQLUSER};Pwd={SQLPASS};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    conn = pyodbc.connect(Driver)
    return conn

@db_blueprint.route('/api/data/jobs', methods=['GET'])
def get_data():
    """Handle GET requests to fetch data from the database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = "SELECT * FROM Customers"  # Replace with your table name
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
    name = data.get('name')

    if not name:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    query = "INSERT INTO Customers (name) VALUES (?)"  # Replace with your table columns
    cursor.execute(query, (name))
    conn.commit()
    
    conn.close()
    return jsonify({"message": "Data inserted successfully"}), 201
