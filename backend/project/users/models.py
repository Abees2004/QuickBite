from django.db import models
from django.contrib.auth.models import AbstractUser




class User(AbstractUser):
    image = models.ImageField(upload_to='user_profile/',null=True,blank=True)
    phno = models.IntegerField(null=True,blank=True,db_index=True)
    bio = models.TextField(null=True,blank=True)
    is_del = models.BooleanField(default=False,db_index=True)
    is_busy = models.BooleanField(default=False,db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['username']),
            models.Index(fields=['email']),
            models.Index(fields=['is_del']),
            models.Index(fields=['is_busy']),
        ]

    def __str__(self):
        return self.username





