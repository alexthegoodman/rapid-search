import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)


# class Post(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(50))
#     content = db.Column(db.String(255))

#     def __repr__(self):
#         return '<Post %s>' % self.title

# with app.app_context():
#     db.create_all()


# class PostSchema(ma.Schema):
#     class Meta:
#         fields = ("id", "title", "content")


# post_schema = PostSchema()
# posts_schema = PostSchema(many=True)


# class PostListResource(Resource):
#     def get(self):
#         posts = Post.query.all()
#         return posts_schema.dump(posts)

#     def post(self):
#         app.logger.info("new_post")
#         print("post")

#         new_post = Post(
#             title=request.json['title'],
#             content=request.json['content']
#         )
        
#         db.session.add(new_post)
#         db.session.commit()
#         return post_schema.dump(new_post)


# class PostResource(Resource):
#     def get(self, post_id):
#         post = Post.query.get_or_404(post_id)
#         return jsonify(post)

#     def patch(self, post_id):
#         post = Post.query.get_or_404(post_id)

#         if 'title' in request.json:
#             post.title = request.json['title']
#         if 'content' in request.json:
#             post.content = request.json['content']

#         db.session.commit()
#         return jsonify(post)

#     def delete(self, post_id):
#         post = Post.query.get_or_404(post_id)
#         db.session.delete(post)
#         db.session.commit()
#         return '', 204


# api.add_resource(PostListResource, '/posts')
# api.add_resource(PostResource, '/posts/<int:post_id>')


if __name__ == '__main__':
    app.run(debug=True)
