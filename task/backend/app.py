import os
from flask import Flask, jsonify, request
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    # Configuration
    app.config["JSON_SORT_KEYS"] = False

    # Enable CORS (only for React frontend)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    # -------------------------
    # Routes
    # -------------------------

    @app.route("/")
    def home():
        return jsonify({
            "status": "success",
            "message": "Welcome to Flask API 🚀"
        })

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "success",
            "message": "Flask backend is running 🚀"
        }), 200

    @app.route("/api/data", methods=["GET"])
    def get_data():
        return jsonify({
            "status": "success",
            "message": "Hello from Flask!",
            "method": request.method
        }), 200

    # -------------------------
    # Error Handling
    # -------------------------

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "status": "error",
            "message": "Route not found"
        }), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            "status": "error",
            "message": "Internal server error"
        }), 500

    return app
    @app.route("/api/login", methods=["POST"])
    def login():
        data = request.get_json()
        email = data.get("email")
    password = data.get("password")

    # Dummy validation (later connect DB)
    if email == "admin@example.com" and password == "123456":
        return jsonify({
            "status": "success",
            "message": "Login successful",
            "user": {
                "email": email
            }
        }), 200
    else:
        return jsonify({
            "status": "error",
            "message": "Invalid credentials"
        }), 401


if __name__ == "__main__":
    app = create_app()

    port = int(os.environ.get("PORT", 5000))
    host = os.environ.get("HOST", "0.0.0.0")

    app.run(host=host, port=port, debug=True)
