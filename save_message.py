from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# ✅ Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="joy",  # Replace with your MySQL username
    password="NewChange@2025",  # Replace with your MySQL password
    database="my_database"
)
cursor = conn.cursor()

# ✅ Create table if it doesn't exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS contact_Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")
conn.commit()

@app.route("/save_message", methods=["POST"])
def save_message():
    try:
        # ✅ Read JSON data from JavaScript fetch request
        data = request.json
        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not (name and email and message):
            return jsonify({"error": "❌ Missing form fields."}), 400

        # ✅ Insert data into MySQL
        sql = "INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s)"
        values = (name, email, message)
        cursor.execute(sql, values)
        conn.commit()

        return jsonify({"success": f"✅ Message from {name} saved!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
