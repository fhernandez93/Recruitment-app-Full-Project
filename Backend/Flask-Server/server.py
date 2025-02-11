import identity.web
import requests
from flask import Flask, jsonify, redirect, render_template, request, session, url_for
from flask_session import Session
from flask_cors import CORS  # Import CORS
from API_Module import *

import variables

app = Flask(__name__)

app.register_blueprint(db_blueprint)

app.config.from_object(variables)
Session(app)

# Enable CORS
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

auth = identity.web.Auth(
    session=session,
    authority=app.config["AUTHORITY"],
    client_id=app.config["CLIENT_ID"],
    client_credential=app.config["CLIENT_SECRET"],
)

@app.route("/login")
def login():
    return auth.log_in(
        scopes=variables.SCOPE, # Have user consent to scopes during log-in
        redirect_uri=url_for("auth_response", _external=True)
    )



@app.route(variables.REDIRECT_PATH)
def auth_response():
    result = auth.complete_log_in(request.args)
    if "error" in result:
        return render_template("auth_error.html", result=result)
    return redirect(url_for("index"))

@app.route("/logout")
def logout():
    return redirect(auth.log_out("http://localhost:3000"))


@app.route("/user")
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
    return render_template("index.html", user=user)

@app.route("/call_downstream_api")
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
    app.run(debug=True, port=3000)