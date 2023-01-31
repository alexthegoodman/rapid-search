from transformers import pipeline

class TextGenerator:
    def __init__(self):
        self.generator = pipeline('text-generation', model='EleutherAI/gpt-neo-125M', device=0)

    def generateText(self, text):
        generatedText = self.generator(text, do_sample=True, min_new_tokens=20, max_new_tokens=75)

        print(generatedText)

        return generatedText