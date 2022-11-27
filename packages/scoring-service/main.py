import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from resources import TopicResource, SummaryResource, KeywordResource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)

api.add_resource(TopicResource, '/topic')
api.add_resource(SummaryResource, '/summary')
api.add_resource(KeywordResource, '/keywords')

if __name__ == '__main__':
    app.run(debug=True)
