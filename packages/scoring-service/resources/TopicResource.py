from flask_restful import Resource
from flask import request
from pprint import pprint
import json

from ml import TopicClassifier

topicClassifier = TopicClassifier()

class TopicResource(Resource):
    def post(self):
        data = json.loads(request.data)
        text = data['text']
        
        categories = topicClassifier.classifyText(text)

        return categories