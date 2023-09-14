from tortoise.models import Model
from tortoise import fields




class Book(Model):
    """Class that represents the book model"""
    name = fields.CharField(max_length=255)
    reading= fields.BooleanField(default=False)
    to_read= fields.BooleanField(default=False)
    completed= fields.BooleanField(default=False)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    
    def __str__(self):
        return self.name
