import json
import requests
from bs4 import BeautifulSoup
import boto3
import uuid
import time

# Extract article text from URL
def extract_text(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    article_text = ' '.join(map(lambda p: p.text, soup.find_all('p')))
    return article_text


def summarize(text):
    summarization_url = "http://52.15.221.197:5000/summarize"
    headers = {'Content-Type': 'application/json'}
    data = json.dumps({"text": text})
    response = requests.post(summarization_url, headers=headers, data=data)
    summary = response.json().get("summary", "Summarization failed")
    return summary


def store_summary(url, text, summary, user_agent):
    try:
        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table("summary_requests")
        current_time_millis = int(round(time.time() * 1000))
        table.put_item(Item={
            "id": str(uuid.uuid4()),
            "url": url,
            "user_text": text,
            "date": current_time_millis,
            "user_agent": user_agent,
            "summary": summary
        })
    except Exception as e:
        print(f"Error storing summary in DynamoDB for {url} {text}: {e}")


# Lambda handler function
def lambda_handler(event, context):
    # Get the URL or text from the POST request data
    try:
        if "body" not in event:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing body in event"}),
            }

        body = json.loads(event["body"])
        url = body.get("url")
        text = body.get("text")

        if not url and not text:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing URL or text in request body"}),
            }

    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid JSON in request body"}),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Internal server error", "details": str(e)}),
        }

    if url:
        article_text = extract_text(url)
    else:
        article_text = text

    summary = summarize(article_text)

    user_agent = event.get("headers", {}).get("User-Agent", "Unknown")
    store_summary(url, text, summary, user_agent)

    return {"statusCode": 200, "body": json.dumps({"summary": summary})}