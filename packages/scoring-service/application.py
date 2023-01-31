import logging
import os
import signal
import platform
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from resources import GeneratorResource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)

print("Adding Resources...")

# api.add_resource(TopicResource, '/topic')
# api.add_resource(SummaryResource, '/summary')
# api.add_resource(KeywordResource, '/keywords')
api.add_resource(GeneratorResource, '/generator')

@app.errorhandler(Exception)          
def basic_error(e): 
    PID = os.getpid()

    print("an error occured: " + str(e))
    print(PID)
    
    # kill server so it can restart
    # if platform.system() != 'Windows':
    #     PGID = os.getpgid(PID)
    if platform.system() != 'Windows':
        # os.killpg(PGID, signal.SIGKILL)
        os.kill(PID, signal.SIGKILL)
    else:
        os.kill(PID, signal.SIGTERM)
    

print("Starting Server...")

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
