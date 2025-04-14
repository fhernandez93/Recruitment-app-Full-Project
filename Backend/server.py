import identity.web
import requests
from flask import Flask, jsonify, redirect, render_template, request, session, url_for, send_from_directory
from flask_session import Session
from flask_cors import CORS  # Import CORS
from API_Module import *
from msal import ConfidentialClientApplication

import variables


app = Flask(__name__)

app.register_blueprint(db_blueprint)

app.config.from_object(variables)
Session(app)

back_end_url=os.getenv("BACKEND_URL")
FRONT_end_url=os.getenv("FRONTEND_URL")
# Enable CORS
CORS(app, supports_credentials=True, origins=[FRONT_end_url,back_end_url,"http://localhost"])

if not os.getenv("DEV"):
    auth = identity.web.Auth(
        session=session,
        authority=app.config["AUTHORITY"],
        client_id=app.config["CLIENT_ID"],
        client_credential=app.config["CLIENT_SECRET"],
    )
    app.config['auth_var'] = auth


fake_token = None


if os.getenv("DEV"):
    app.config['fake_token'] = fake_token





@app.route("/api/login")
def login():
    if os.getenv("DEV"):
        app.config['fake_token'] = {
            "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users/$entity",
            "businessPhones": [],
            "displayName": "Francisco",
            "givenName": "",
            "id": "d00cb2f6-e7e1-456a-8d6d-491e9a7aab4b",
            "jobTitle": "",
            "mail": "fhernandez@optumus.com",
            "mobilePhone": "",
            "officeLocation": "",
            "preferredLanguage": "",
            "surname": "",
            "userPrincipalName": "d00cb2f6-e7e1-456a-8d6d-491e9a7aab4b@recruitmentapp.onmicrosoft.com"
        }
        return redirect(url_for("index"))

    else:
        auth_response = auth.log_in(
            scopes=variables.SCOPE,  # Have user consent to scopes during log-in
            redirect_uri=rf"{back_end_url}/getAToken"
        )
    auth_url = auth_response.get("auth_uri")  
    return redirect(auth_url)



@app.route(variables.REDIRECT_PATH)
def auth_response():
    result = auth.complete_log_in(request.args)
    if "error" in result:
        return render_template("auth_error.html", result=result)
    return redirect(url_for("index"))

@app.route("/api/logout")
def logout():
    if os.getenv("DEV"):
        app.config['fake_token'] = None
        return redirect(FRONT_end_url)

    return redirect(auth.log_out(url_for("login", _external=True)))


@app.route("/api/user")
def get_user_info():

    if os.getenv("DEV"):
        return jsonify(app.config['fake_token'])

    user = auth.get_user()
    if not user:
        return jsonify({"error": "User not authenticated"}), 401
    return jsonify(user)

@app.route("/")
def index():
    if os.getenv("DEV"):
        if not app.config['fake_token']:
            return redirect(url_for("login"))
        else:
            return redirect(FRONT_end_url)
    
    user = auth.get_user()
    if not user:
        return redirect(url_for("login"))
    
    return redirect(FRONT_end_url)

@app.route("/api/call_downstream_api")
def call_downstream_api():
    token = auth.get_token_for_user(variables.SCOPE)
    if "error" in token:
        return redirect(url_for("login"))
    # Use access token to call downstream api
    api_result = requests.get(
        variables.ENDPOINT,
        headers={'Authorization': 'Bearer ' + token['access_token']},
        timeout=30,
    ).json()
    return render_template('display.html', result=api_result)

##############Email Sending###############


@app.route("/api/send-email", methods=['POST'])
def send_email():
    '''
    message in this format: 
    {
        "message": {
            "subject": "Hello from Flask using Microsoft Graph API",
            "body": {"contentType": "Text", "content": "This is a test email."},
            "toRecipients": [{"emailAddress": {"address": "example@optumus.com"}}],
        }
    }
    '''
    
    token = auth.get_token_for_user(variables.SCOPE)
    if "error" in token:
        return jsonify({"error": "User not authenticated"}), 401
   
    email_data = request.json

    headers={'Authorization': 'Bearer ' + token['access_token'],"Content-Type": "application/json"}

    try:
        response = requests.post(f"{app.config['ENDPOINT']}/sendMail", headers=headers, json=email_data)
        
        # Handle 202 response with empty body
        if response.status_code == 202:
            return jsonify({"message": "Email request accepted and is being processed"}), 202

        # Handle error responses
        if response.status_code >= 400:
            return jsonify({"error": f"Request failed with status {response.status_code}", "details": response.text}), response.status_code

        # Only parse JSON if response body exists
        if response.text:
            return jsonify(response.json()), response.status_code
        else:
            return jsonify({"message": "Request successful but no response body"}), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Request failed", "details": str(e)}), 500
##########################################


############################Calendar Invite#################


@app.route("/api/create-event", methods=['POST'])
def create_event():
    '''
    {
        "subject": "Meeting with Research Team",
        "body": {
            "contentType": "HTML",
            "content": "Discussion on the latest results from the simulations."
        },
        "start": {
            "dateTime": "2025-03-20T10:00:00",
            "timeZone": "Europe/Zurich"
        },
        "end": {
            "dateTime": "2025-03-20T11:00:00",
            "timeZone": "Europe/Zurich"
        },
        "location": {
            "displayName": "ETH Zurich, Room 305"
        },
        "attendees": [
            {
                "emailAddress": {"address": "fhernandez@optumus.com"},
                "type": "required"
            }
        ]
    }

    '''
    token = auth.get_token_for_user(variables.SCOPE)
    if "error" in token:
        return jsonify({"error": "User not authenticated"}), 401
    
    event_data = request.json


    headers = {
        "Authorization": f"Bearer {token['access_token']}",
        "Content-Type": "application/json"
    }

    
    try:
        response = requests.post(
        f"{app.config['ENDPOINT']}/events",
        headers=headers,
        json=event_data
    )
        
        # Handle 202 response with empty body
        if response.status_code == 202:
            return jsonify({"message": "Request accepted and is being processed"}), 202

        # Handle error responses
        if response.status_code >= 400:
            return jsonify({"error": f"Request failed with status {response.status_code}", "details": response.text}), response.status_code

        # Only parse JSON if response body exists
        if response.text:
            return jsonify(response.json()), response.status_code
        else:
            return jsonify({"message": "Request successful but no response body"}), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Request failed", "details": str(e)}), 500
    

@app.route("/update-event/<event_id>", methods=["PATCH"])
def update_event(event_id):
    token = auth.get_token_for_user(variables.SCOPE)
    if "error" in token:
        return jsonify({"error": "User not authenticated"}), 401

    update_data = {
        "subject": "Updated Meeting with Research Team",
        "body": {
            "contentType": "HTML",
            "content": "We've updated the agenda for this meeting."
        },
        "start": {
            "dateTime": "2025-03-19T11:00:00",
            "timeZone": "Europe/Zurich"
        },
        "end": {
            "dateTime": "2025-03-19T12:00:00",
            "timeZone": "Europe/Zurich"
        },
        "location": {
            "displayName": "ETH Zurich, Room 405"
        }
    }

    headers = {
        "Authorization": f"Bearer {token['access_token']}",
        "Content-Type": "application/json"
    }

    response = requests.patch(
        f"{app.config['GRAPH_ENDPOINT']}/me/events/{event_id}",
        headers=headers,
        json=update_data
    )

    return jsonify(response.json()), response.status_code



######################################################################################
if __name__ == "__main__":
    app.run(host="0.0.0.0",port=3000)
    