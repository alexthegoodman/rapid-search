import spacy
import classy_classification

data = ["Baking",]

nlp = spacy.blank("en")
nlp.add_pipe(
    "text_categorizer",
    config={
        "data": data,
        "model": "typeform/distilbert-base-uncased-mnli",
        "cat_type": "zero",
        "device": "gpu"
    }
)

print(nlp("Simply dip the bag in the water")._.cats)