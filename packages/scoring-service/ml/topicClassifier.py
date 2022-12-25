# import spacy
# import classy_classification

# from defs import interestsData

# class TopicClassifier:
#     def __init__(self):
#         # for i in range(len(interestsData)):
#         #     interestsData[i] = interestsData[i].lower()
#         # interestsData = ["Dogs", "Cats", "Movies", "Music", "Food"]

#         spacy.require_gpu()

#         self.nlp = spacy.blank("en")
#         self.nlp.add_pipe(
#             "text_categorizer",
#             config={
#                 "data": interestsData,
#                 # "model": "facebook/bart-large-mnli", # not much more accurate, far slower
#                 "model": "typeform/distilbert-base-uncased-mnli",
#                 "cat_type": "zero",
#                 "device": "gpu"
#             }
#         )

#     def classifyText(self, text):
#         topicRankings = self.nlp(text)._.cats
        
#         print(topicRankings)

#         # print(interestsData)

#         return topicRankings