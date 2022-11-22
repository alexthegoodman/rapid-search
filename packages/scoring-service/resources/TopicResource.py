from flask_restful import Resource
from flask import request

from ml import TopicClassifier

class TopicResource(Resource):
    def get(self):
        topicClassifier = TopicClassifier()

        text = request.args['text']
        categories = topicClassifier.classifyText(text)

        return categories