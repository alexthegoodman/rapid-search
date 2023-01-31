# from transformers import pipeline

# class TextSummarizer:
#     def __init__(self):
#         self.summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=0)


#     def summarizeText(self, text):
#         summary = self.summarizer(text, max_length=130, min_length=30, do_sample=False)

#         print(summary)

#         return summary