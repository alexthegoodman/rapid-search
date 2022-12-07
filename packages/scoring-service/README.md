# Scoring Service

This will be a Flask API which scores and classifies text documents using machine learning.

## Startup

- `python3 -m venv env`
- `source env/bin/activate`
- `pip install -U pip setuptools wheel`
- `pip install -r requirements.txt`
- `python3 main.py`

Additional:

- `python -m spacy download en_core_web_md`

## EC2

- `ssh -i "ec2-keypair1.pem" ec2-user@ec2-18-217-198-241.us-east-2.compute.amazonaws.com`
- `git clone https://github.com/alexthegoodman/rapid-search`
- `cd rapid-search/packages/scoring-service`
- `pip3 install -r requirements.txt`

## Links

- https://github.com/Pandora-Intelligence/classy-classification
- https://huggingface.co/facebook/bart-large-mnli
- https://huggingface.co/typeform/distilbert-base-uncased-mnli
- https://huggingface.co/gpt2
- https://huggingface.co/facebook/xglm-564M (?)
- https://beta.openai.com/docs/introduction
