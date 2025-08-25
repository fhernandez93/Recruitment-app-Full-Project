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
    
    query = "SELECT * FROM Jobs"  # Replace with your table name
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

    query = "INSERT INTO Jobs ([Role Name]) VALUES (?)"  # Replace with your table columns
    cursor.execute(query, (name))
    conn.commit()
    
    conn.close()
    return jsonify({"message": "Data inserted successfully"}), 201


# GET all applications for a specific Job
@db_blueprint.route('/api/applications/job/<job_id>', methods=['GET'])
def get_applications_by_job(job_id):
    # Validate that job_id is an integer
    try:
        job_id = int(job_id)
    except ValueError:
        return jsonify({
            'error': 'JobId must be an integer',
            'received': job_id
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Query all applications that belong to the given JobId
        cursor.execute("""
            SELECT *
            FROM Applications a
            JOIN Candidates c ON a.CandidateId = c.CandidateId
            WHERE a.JobId = ?
        """, (job_id,))

        rows = cursor.fetchall()

        # Convert each row into a dictionary
        data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]
    finally:
        # Always close the connection
        conn.close()

    return jsonify({'applications': data}), 200



# POST new applications
@db_blueprint.route('/api/applications', methods=['POST'])
def create_applications():
    data = request.json

    try:
        job_id = int(data.get("JobId"))
        applicationstatus_id = int(data.get("ApplicationStatusId"))
        candidate_ids = data.get("Candidates", [])
        candidate_ids = [int(cid) for cid in candidate_ids]  # Convert each to int
    except (ValueError, TypeError):
        return jsonify({'error': 'JobId, ApplicationStatusId and Candidates must be integers'}), 400

    if not candidate_ids:
        return jsonify({'error': 'Candidates array cannot be empty'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    created = []
    skipped = []

    try:
        for candidate_id in candidate_ids:
            # Check if the application already exists
            cursor.execute("""
                SELECT COUNT(*) 
                FROM Applications 
                WHERE JobId = ? AND CandidateId = ?
            """, (job_id, candidate_id))
            exists = cursor.fetchone()[0]

            if exists:
                skipped.append(candidate_id)
            else:
                cursor.execute("""
                    INSERT INTO Applications (JobId, CandidateId, ApplicationStatusId)
                    VALUES (?, ?, ?)
                """, (job_id, candidate_id, applicationstatus_id))
                created.append(candidate_id)

        conn.commit()
    except Exception as e:
        conn.rollback()
        import traceback
        traceback.print_exc()  # Print the traceback for debugging
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

    return jsonify({
        'message': 'Applications processed',
        'created': created,
        'skipped': skipped
    }), 201



####Candidates Endpoints###########################

# Whitelist of allowed table names to prevent SQL injection
ALLOWED_TABLES = {
    'applications': '[Applications]',
    'candidates': '[Candidates]',
    'global-statuses':'[GlobalStatus]',
    'english-certifications':'[EnglishCertification]',
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
@db_blueprint.route('/api/candidate/<int:id>', methods=['GET'])
def get_candidate(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Candidates WHERE CandidateID = ?", (id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return jsonify(dict(zip([column[0] for column in cursor.description], row)))
    return jsonify({'error': 'Candidate not found'}), 404

# POST new candidate
@db_blueprint.route('/api/candidate', methods=['POST'])
def create_candidate():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    keys = ', '.join(data.keys())
    placeholders = ', '.join(['?' for _ in data])
    values = list(data.values())

    cursor.execute(f"INSERT INTO Candidates ({keys}) VALUES ({placeholders})", values)
    conn.commit()
    conn.close()
    return jsonify({'message': 'Candidate created'}), 201


# PUT update (complete)
@db_blueprint.route('/api/candidate/<int:id>', methods=['PUT'])
def update_candidate(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    fields = ', '.join([f"{k}=?" for k in data])
    values = list(data.values()) + [id]

    cursor.execute(f"UPDATE Candidates SET {fields} WHERE CandidateID = ?", values)
    conn.commit()
    conn.close()
    return jsonify({'message': 'Candidate updated'})


# PATCH update (partial)
@db_blueprint.route('/api/candidate/<int:id>', methods=['PATCH'])
def patch_candidate(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    fields = ', '.join([f"{k}=?" for k in data])
    values = list(data.values()) + [id]

    cursor.execute(f"UPDATE Candidates SET {fields} WHERE CandidateID = ?", values)
    conn.commit()
    conn.close()
    return jsonify({'message': 'Candidate partially updated'})

# DELETE candidate
@db_blueprint.route('/api/candidate/<int:id>', methods=['DELETE'])
def delete_candidate(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Candidates WHERE CandidateID = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Candidate deleted'})