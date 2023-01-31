from flask_restful import Resource
from flask import request
import json

from ml import TextGenerator

textGenerator = TextGenerator()

class GeneratorResource(Resource):
    def post(self):
        data = json.loads(request.data)
        text = data['text']

        print(text)

        generatedText = textGenerator.generateText(text)

        return generatedText