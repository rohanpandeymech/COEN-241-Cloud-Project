from flask import Flask, request, jsonify
from transformers import pipeline
from transformers import logging
import requests

API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
headers = {"Authorization": "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}

application = Flask(__name__)

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

def text_summarizer(text):
    classifier = pipeline("summarization")
    summary = classifier(text)[0]['summary_text']
    return summary

logging.set_verbosity_warning()
logging.set_verbosity_error()

@application.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    text = data['text']
    # summary = text_summarizer(text)

    output = query({"inputs": text})
    
    # return jsonify({'summary': summary})
    # return jsonify(output)
    return jsonify({'summary': output[0]['summary_text']})

if __name__ == '__main__':
    application.run(debug=True)