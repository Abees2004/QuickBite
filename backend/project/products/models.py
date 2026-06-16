from django.db import models


class FoodCategory(models.Model):
    name = models.CharField(null=False,max_length=100,blank=False,db_index=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class FoodItem(models.Model):
    restaurant = models.ForeignKey("resturants.Restaurant",on_delete=models.CASCADE,
        limit_choices_to={'is_active': True},db_index=True)
    name = models.CharField(null=False,max_length=100,blank=False,db_index=True)
    image = models.ImageField(upload_to='uploads_to/',blank=True,null=True)
    price = models.IntegerField(null=False,blank=False,db_index=True)
    description = models.CharField(blank=True,null=True,max_length=255)
    category = models.ForeignKey(FoodCategory,on_delete=models.CASCADE,db_index=True)
    is_veg = models.BooleanField(default=True,db_index=True)
    status = models.BooleanField(default=True,db_index=True)
    created_at = models.DateTimeField(auto_now_add=True,db_index=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} from {self.restaurant.name}"







class RatingReview(models.Model):
    user = models.ForeignKey("users.User",on_delete=models.CASCADE,db_index=True)
    restaurant = models.ForeignKey("resturants.Restaurant",on_delete=models.CASCADE,db_index=True)
    rating = models.PositiveIntegerField(db_index=True)
    review = models.TextField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'restaurant')

        indexes = [
            models.Index(fields=['restaurant', 'rating']),
        ]
