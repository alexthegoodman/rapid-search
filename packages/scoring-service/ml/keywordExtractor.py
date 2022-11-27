import spacy
from collections import Counter
from string import punctuation

class KeywordExtractor:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_md")

    def extractKeywords(self, text):
        keywords = self.getHotwords(text)
        mostCommonKeywords = self.getMostCommon(keywords)

        return mostCommonKeywords

    # https://betterprogramming.pub/extract-keywords-using-spacy-in-python-4a8415478fbf
    def getHotwords(text):
        result = []
        pos_tag = ['PROPN', 'ADJ', 'NOUN']
        doc = self.nlp(text.lower())

        for token in doc:
            if(token.text in self.nlp.Defaults.stop_words or token.text in punctuation):
                continue
            if(token.pos_ in pos_tag):
                result.append(token.text)
                    
        return result

    def getMostCommon(keywords, count = 5):
        mostCommonKeywords = Counter(keywords).most_common(count)

        return mostCommonKeywords