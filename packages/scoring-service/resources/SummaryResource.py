from flask_restful import Resource
from flask import request
import json

from ml import TextSummarizer

textSummarizer = TextSummarizer()

class SummaryResource(Resource):
    def post(self):
        data = json.loads(request.data)
        text = data['text']

        print(text)

        summary = textSummarizer.summarizeText(text)

        return summary