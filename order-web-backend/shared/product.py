from ..index import db


class Product(db.Document):
    title = db.StringField(required=True)
    description = db.StringField()
    image = db.FileField()
    price = db.IntField()