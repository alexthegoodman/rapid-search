# Scoring Service

This will be a Flask API which scores and classifies text documents using machine learning.

## Startup

- `python3 -m venv env`
- `source env/bin/activate`
- `sudo apt-get install python3-dev`
- `pip install -U pip setuptools wheel`
- `pip install -r requirements.txt`
- `python3 application.py`

Additional:

- `pip install -U 'spacy[cuda-autodetect]'`
- `python -m spacy download en_core_web_md`
- `npm install forever -g; forever start --spinSleepTime=30000 --minUptime=30000 -d -c python3 application.py` 
(Note: Runs in background. See `forever list` and `forever logs application.py`)

## EC2

- `ssh -i "ec2-keypair1.pem" ec2-user@ec2-18-217-198-241.us-east-2.compute.amazonaws.com`
- `git clone https://github.com/alexthegoodman/rapid-search`
- `cd rapid-search/packages/scoring-service`
- `pip install -U pip setuptools wheel`
- `sudo yum install python3-devel`
- (sudo) (pip3.7) `pip3 install -r requirements.txt`

## Windows

- `pip install virtualenv`
- `python -m virtualenv env`
- `env/bin/activate`
- `python -m [cmd]`

## GeForce 3070

- `pip install -U spacy[cuda101]`

## Links

- https://github.com/Pandora-Intelligence/classy-classification
- https://huggingface.co/facebook/bart-large-mnli
- https://huggingface.co/typeform/distilbert-base-uncased-mnli
- https://huggingface.co/gpt2
- https://huggingface.co/facebook/xglm-564M (?)
- https://beta.openai.com/docs/introduction
