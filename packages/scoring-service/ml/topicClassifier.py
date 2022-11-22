import spacy
import classy_classification

from defs import interestsData

class TopicClassifier:
    def __init__(self):
        self.nlp = spacy.blank("en")
        self.nlp.add_pipe(
            "text_categorizer",
            config={
                "data": interestsData,
                "model": "typeform/distilbert-base-uncased-mnli",
                "cat_type": "zero",
                "device": "gpu"
            }
        )

    def classifyText(self, text):
        topicRankings = self.nlp(text)._.cats
        
        print(topicRankings)

        # print(interestsData)

        return topicRankings