"""
Flask Backend — Sudhanshu Kumar Resume API
Run: python app.py
API base: http://localhost:5000/api
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import re

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

# ── In-memory data store (replace with DB in production) ──────────────────────

RESUME_DATA = {
    "hero": {
        "name": "Sudhanshu Kumar",
        "roles": ["Cyber Security Analyst", "SOC Enthusiast", "Threat Hunter", "Incident Responder"],
        "bio": (
            "Passionate about protecting digital infrastructure through proactive threat "
            "detection, security monitoring, and rapid incident response. Building expertise "
            "in SOC operations and cyber defence."
        ),
        "available": True,
    },
    "about": {
        "description": [
            "I'm Sudhanshu Kumar, a cybersecurity professional specialising in Security "
            "Operations Centre (SOC) analysis, threat monitoring, and incident handling. "
            "I graduated from Chandigarh University in 2023 with a deep focus on cyber defence.",

            "My core interest lies in Cyber Defence — actively monitoring networks, correlating "
            "security events through SIEM platforms, hunting for threats, and coordinating rapid "
            "incident response. I love digging into logs and turning raw data into actionable intelligence.",

            "I believe in continuous learning and staying ahead of evolving threats. Whether it's "
            "crafting detection rules, dissecting network packets, or deploying containerised "
            "security tools — I'm always building.",
        ],
        "tags": ["SOC Operations", "Threat Detection", "Log Analysis", "SIEM", "Incident Response", "Network Security"],
        "info": {
            "education": "Chandigarh University, 2023",
            "focus": "Cyber Defence & SOC",
            "interests": "Monitoring, Incident Handling",
            "location": "India",
        },
    },
    "skills": [
        {"name": "ELK Stack",   "category": "SIEM",    "level": 85, "icon": "📊"},
        {"name": "Splunk",      "category": "SIEM",    "level": 80, "icon": "🔍"},
        {"name": "Wazuh",       "category": "SIEM",    "level": 78, "icon": "🛡️"},
        {"name": "Nmap",        "category": "Network", "level": 88, "icon": "🗺️"},
        {"name": "Wireshark",   "category": "Network", "level": 82, "icon": "🦈"},
        {"name": "Linux",       "category": "OS",      "level": 90, "icon": "🐧"},
        {"name": "Docker",      "category": "DevOps",  "level": 75, "icon": "🐳"},
    ],
    "projects": [
        {
            "id": 1,
            "title": "Login System",
            "description": (
                "A secure authentication system built with modern security practices including "
                "hashed credentials, session management, and brute-force protection mechanisms."
            ),
            "tags": ["Authentication", "Security", "Web"],
            "github": "https://github.com/Unixxxxxx/login",
            "status": "Active",
            "icon": "⚙️",
        }
    ],
    "experience": [
        {
            "id": 1,
            "role": "SOC Analyst (Aspirant)",
            "company": "Self-Directed Learning & Labs",
            "period": "2023 – Present",
            "points": [
                "Deployed and configured ELK Stack and Wazuh for home lab SIEM environments.",
                "Performed network scanning and vulnerability assessments using Nmap.",
                "Analysed network traffic and suspicious packets with Wireshark.",
                "Built detection rules and alerts for common attack patterns.",
                "Practiced incident response workflows in simulated environments.",
            ],
        }
    ],
    "education": [
        {
            "id": 1,
            "degree": "Bachelor of Technology",
            "institution": "Chandigarh University",
            "year": "Class of 2023",
            "description": (
                "Studied computer science with a strong focus on network security, ethical hacking, "
                "and defensive security practices. Built foundational expertise in cybersecurity "
                "concepts, cryptography, and system administration."
            ),
            "tags": ["Network Security", "Ethical Hacking", "Cryptography", "System Administration"],
            "icon": "🏛️",
        }
    ],
}

# Messages store (in-memory; use a real DB like SQLite/PostgreSQL in prod)
MESSAGES = []


# ── Helpers ───────────────────────────────────────────────────────────────────

def success(data, status=200):
    return jsonify({"status": "success", "data": data}), status


def error(message, status=400):
    return jsonify({"status": "error", "message": message}), status


def validate_email(email: str) -> bool:
    return bool(re.match(r"^[\w\.\+\-]+@[\w\-]+\.[a-z]{2,}$", email, re.I))


# ── Routes ────────────────────────────────────────────────────────────────────

@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return success({
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "version": "1.0.0",
    })


@app.route("/api/resume", methods=["GET"])
def get_full_resume():
    """Return all resume data in one call."""
    return success(RESUME_DATA)


@app.route("/api/hero", methods=["GET"])
def get_hero():
    return success(RESUME_DATA["hero"])


@app.route("/api/about", methods=["GET"])
def get_about():
    return success(RESUME_DATA["about"])


@app.route("/api/skills", methods=["GET"])
def get_skills():
    category = request.args.get("category")
    skills = RESUME_DATA["skills"]
    if category:
        skills = [s for s in skills if s["category"].lower() == category.lower()]
    return success(skills)


@app.route("/api/projects", methods=["GET"])
def get_projects():
    return success(RESUME_DATA["projects"])


@app.route("/api/projects/<int:project_id>", methods=["GET"])
def get_project(project_id):
    project = next((p for p in RESUME_DATA["projects"] if p["id"] == project_id), None)
    if not project:
        return error("Project not found", 404)
    return success(project)


@app.route("/api/experience", methods=["GET"])
def get_experience():
    return success(RESUME_DATA["experience"])


@app.route("/api/education", methods=["GET"])
def get_education():
    return success(RESUME_DATA["education"])


@app.route("/api/contact", methods=["POST"])
def send_message():
    """
    Accept a contact form submission.
    Expected JSON body: { name, email, subject, message }
    """
    body = request.get_json(silent=True)
    if not body:
        return error("Request body must be JSON")

    name    = str(body.get("name", "")).strip()
    email   = str(body.get("email", "")).strip()
    subject = str(body.get("subject", "")).strip()
    message = str(body.get("message", "")).strip()

    # Validation
    if not name:
        return error("Name is required")
    if len(name) < 2:
        return error("Name must be at least 2 characters")
    if not email:
        return error("Email is required")
    if not validate_email(email):
        return error("Invalid email address")
    if not message:
        return error("Message is required")
    if len(message) < 10:
        return error("Message must be at least 10 characters")

    record = {
        "id":        len(MESSAGES) + 1,
        "name":      name,
        "email":     email,
        "subject":   subject or "No subject",
        "message":   message,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "read":      False,
    }
    MESSAGES.append(record)

    print(f"\n📬 New message from {name} <{email}>")
    print(f"   Subject : {record['subject']}")
    print(f"   Message : {message[:80]}{'...' if len(message) > 80 else ''}\n")

    return success(
        {"id": record["id"], "message": "Message received! I'll get back to you soon."},
        status=201,
    )


@app.route("/api/messages", methods=["GET"])
def get_messages():
    """List all received messages (admin view)."""
    return success({"count": len(MESSAGES), "messages": MESSAGES})


# ── 404 / 405 handlers ────────────────────────────────────────────────────────

@app.errorhandler(404)
def not_found(e):
    return error("Endpoint not found", 404)


@app.errorhandler(405)
def method_not_allowed(e):
    return error("Method not allowed", 405)


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("🛡️  Sudhanshu Kumar — Resume API")
    print("   Running at  http://localhost:5000")
    print("   Health check http://localhost:5000/api/health\n")
    app.run(debug=True, port=5000)

