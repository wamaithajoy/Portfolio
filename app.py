from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  # Allows cross-origin requests
import mysql.connector
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, supports_credentials=True)

# MySQL Connection using .env
db = mysql.connector.connect(
    host=os.getenv("MYSQL_HOST"),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_PASSWORD"),
    database=os.getenv("MYSQL_DATABASE")
)

cursor = db.cursor()


@app.route("/submit_form", methods=["POST"])
def submit_form():
    try:
        data = request.get_json()  # Extract JSON data correctly
        print("Received data:", data)  # Debugging output
        
        if not data:
            return jsonify({"status": "error", "message": "❌ No data received!"}), 400

        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name or not email or not message:
            return jsonify({"status": "error", "message": "❌ All fields are required!"}), 400

        cursor.execute("INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s)", 
                       (name, email, message))
        db.commit()
        
        return jsonify({"status": "success", "message": "✅ Message sent successfully,!"})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"status": "error", "message": "❌ Something went wrong. Please try again!"})

@app.route("/")
def home():
    return "Welcome to the Contact Form API"

if __name__ == "__main__":
    app.run(debug=True, port=5000)