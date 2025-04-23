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


####GlobalCandidate Endpoints###########################

# Whitelist of allowed table names to prevent SQL injection
ALLOWED_TABLES = {
    'global-candidates': '[GlobalCandidate]',
    'global-statuses':'[EnglishCertification]',
    'english-certifications':'[GlobalStatus]',
    'education-levels':'[EducationLevel]',
}

# GET all candidates
@db_blueprint.route('/api/<string:table_key>', methods=['GET'])
def get_all_from_table(table_key):
    """Generic handler to get all rows from a given allowed table."""
    if table_key not in ALLOWED_TABLES:
        return jsonify({'error': 'Table not allowed'}), 403

    table_name = ALLOWED_TABLES[table_key]
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()
        data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


# GET one candidate by ID
@db_blueprint.route('/api/global-candidates/<int:id>', methods=['GET'])
def get_candidate(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM GlobalCandidate WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return jsonify(dict(zip([column[0] for column in cursor.description], row)))
    return jsonify({'error': 'Candidate not found'}), 404

# POST new candidate
@db_blueprint.route('/api/global-candidates', methods=['POST'])
def create_candidate():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    keys = ', '.join(data.keys())
    placeholders = ', '.join(['?' for _ in data])
    values = list(data.values())

    cursor.execute(f"INSERT INTO GlobalCandidate ({keys}) VALUES ({placeholders})", values)
    conn.commit()
    conn.close()
    return jsonify({'message': 'Candidate created'}), 201


# PUT update (complete)
@db_blueprint.route('/api/global-candidates/<int:id>', methods=['PUT'])
def update_candidate(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    fields = ', '.join([f"{k}=?" for k in data])
    values = list(data.values()) + [id]

    cursor.execute(f"UPDATE GlobalCandidate SET {fields} WHERE id = ?", values)
    conn.commit()
    conn.close()
    return jsonify({'message': 'Candidate updated'})


# PATCH update (partial)
@db_blueprint.route('/api/global-candidates/<int:id>', methods=['PATCH'])
def patch_candidate(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    fields = ', '.join([f"{k}=?" for k in data])
    values = list(data.values()) + [id]

    cursor.execute(f"UPDATE GlobalCandidate SET {fields} WHERE id = ?", values)
    conn.commit()
    conn.close()
    return jsonify({'message': 'Candidate partially updated'})

# DELETE candidate
@db_blueprint.route('/api/global-candidates/<int:id>', methods=['DELETE'])
def delete_candidate(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM GlobalCandidate WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Candidate deleted'})