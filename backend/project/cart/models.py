from django.db import models

# Create your models here.


class Cart(models.Model):

    customer = models.ForeignKey("users.User",on_delete=models.CASCADE,db_index=True)
    restaurant = models.ForeignKey("resturants.Restaurant",on_delete=models.CASCADE,null=True,
        blank=True,db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['customer']),
            models.Index(fields=['restaurant']),
            models.Index(fields=['customer', 'restaurant']),
        ]

    def __str__(self):
        return f"{self.customer.username}'s Cart"


class CartItem(models.Model):

    cart = models.ForeignKey(Cart,on_delete=models.CASCADE,db_index=True)
    food = models.ForeignKey("products.FoodItem",on_delete=models.CASCADE,db_index=True)
    quantity = models.IntegerField(default=1)

    class Meta:
        indexes = [
            models.Index(fields=['cart']),
            models.Index(fields=['food']),
            models.Index(fields=['cart', 'food']),
        ]

    def __str__(self):
        return f"{self.food.name} x {self.quantity}"