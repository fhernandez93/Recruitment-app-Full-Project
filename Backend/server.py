import identity.web
import requests
from flask import Flask, jsonify, redirect, render_template, request, session, url_for, send_from_directory
from flask_session import Session
from flask_cors import CORS  # Import CORS
from API_Module import *

import variables


app = Flask(__name__)

app.register_blueprint(db_blueprint)

app.config.from_object(variables)
Session(app)

# Enable CORS
CORS(app, supports_credentials=True, origins=["https://localhost:3000","https://localhost:80","https://opt-recuitement-backend.gentlemeadow-e1068751.westus2.azurecontainerapps.io","https://opt-recruitment-full.gentlemeadow-e1068751.westus2.azurecontainerapps.io","https://opt-recruitment-frontend.gentlemeadow-e1068751.westus2.azurecontainerapps.io"])

auth = identity.web.Auth(
    session=session,
    authority=app.config["AUTHORITY"],
    client_id=app.config["CLIENT_ID"],
    client_credential=app.config["CLIENT_SECRET"],
)

app.config['auth_var'] = auth


@app.route("/api/login")
def login():
    auth_response = auth.log_in(
        scopes=variables.SCOPE,  # Have user consent to scopes during log-in
        # redirect_uri=url_for("auth_response", _external=True)
        redirect_uri = "https://opt-recuitement-backend.gentlemeadow-e1068751.westus2.azurecontainerapps.io/getAToken"
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
    return redirect(auth.log_out(url_for("login", _external=True)))


@app.route("/api/user")
def get_user_info():
    user = auth.get_user()
    if not user:
        return jsonify({"error": "User not authenticated"}), 401
    return jsonify(user)

@app.route("/")
def index():
    user = auth.get_user()
    if not user:
        return redirect(url_for("login"))
    return redirect("/api/call_downstream_api")

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





if __name__ == "__main__":
    app.run(host="0.0.0.0",port=3000)
    