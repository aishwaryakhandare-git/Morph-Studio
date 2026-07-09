from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

import os
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


SYSTEM_PROMPT = """
You are Morph Studio AI.

You are an expert UI/UX designer and senior frontend engineer.

The user will describe an interface.

Return ONLY valid JSON.

Format:

{
    "reply":"",
    "title":"",
    "description":"",
    "type":"",
    "sections":[]
}

Rules

type must be one of

landing
dashboard
portfolio
login
pricing
ecommerce

reply should explain what you designed.

title should be short.

description should describe the generated interface.

sections should be an array.

Example

{
"title":"Finance Dashboard",
"description":"Analytics dashboard for fintech.",
"type":"dashboard",
"reply":"I designed a finance dashboard with KPI cards and charts.",
"sections":[
"Navbar",
"Sidebar",
"KPI Cards",
"Revenue Chart",
"Transactions",
"Users"
]
}
"""


@app.route("/api/health", methods=["GET"])
def health():

    return jsonify({
        "status": "online",
        "message": "Morph Studio Backend Running"
    })


@app.route("/api/generate", methods=["POST"])
def generate():

    try:

        body = request.get_json()

        if body is None:

            return jsonify({
                "success": False,
                "message": "No JSON received"
            }), 400

        prompt = body.get("prompt", "").strip()

        if prompt == "":

            return jsonify({
                "success": False,
                "message": "Prompt is required"
            }), 400

        response = client.chat.completions.create(

            model="gpt-5.5",

            messages=[

                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },

                {
                    "role": "user",
                    "content": prompt
                }

            ],

            response_format={
                "type": "json_object"
            }

        )

        content = response.choices[0].message.content

        data = json.loads(content)

        return jsonify({

            "success": True,

            "reply": data["reply"],

            "title": data["title"],

            "description": data["description"],

            "type": data["type"],

            "sections": data["sections"]

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


        