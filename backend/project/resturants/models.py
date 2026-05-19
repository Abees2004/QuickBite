from django.db import models


# Create your models here.    


    

















# from django.db import models


class Restaurant(models.Model):
    partner = models.ForeignKey("users.User",on_delete=models.CASCADE,limit_choices_to={"is_staff": True},db_index=True)
    name = models.CharField(null=False,max_length=100,blank=False,db_index=True)
    image = models.ImageField(upload_to='uploads/',null=True,blank=True)
    description = models.TextField(max_length=255,null=True,blank=True)
    is_veg = models.IntegerField(default=False,db_index=True)
    street_name = models.CharField(max_length=100,null=True,blank=True)
    city = models.CharField(max_length=100,null=True,blank=True,db_index=True)
    pincode = models.IntegerField(null=False,blank=False,db_index=True)
    is_active = models.BooleanField(default=True,db_index=True)
    created_at = models.DateTimeField(auto_now_add=True,db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['city']),
            models.Index(fields=['is_active']),
            models.Index(fields=['created_at']),
        ]

        ordering = ['-created_at']

    def __str__(self):
        return self.name
 
  