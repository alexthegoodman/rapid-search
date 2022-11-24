from flask_restful import Resource
from flask import request

from ml import TextSummarizer

class SummaryResource(Resource):
    def post(self):
        textSummarizer = TextSummarizer()

        text = request.args['text']
        summary = textSummarizer.summarizeText(text)

        return summary