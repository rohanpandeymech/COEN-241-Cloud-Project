from flask import Flask, request, jsonify
from transformers import pipeline
from transformers import logging

app = Flask(__name__)

def text_summarizer(text):
    classifier = pipeline("summarization")
    summary = classifier(text)[0]['summary_text']
    return summary

logging.set_verbosity_warning()
logging.set_verbosity_error()

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    text = data['text']
    summary = text_summarizer(text)
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)
