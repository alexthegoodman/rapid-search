from flask_restful import Resource
from flask import request
import json

from ml import KeywordExtractor

keywordExtractor = KeywordExtractor()

class KeywordResource(Resource):
    def post(self):
        data = json.loads(request.data)
        text = data['text']

        print(text)

        keywords = keywordExtractor.extractKeywords(text)

        return keywords