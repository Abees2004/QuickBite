from django.db import models


class DeliveryAddress(models.Model):
    user = models.ForeignKey("users.User",on_delete=models.CASCADE,db_index=True)
    street_name = models.CharField(null=True,max_length=255,blank=True)
    pincode = models.IntegerField(null=True,blank=True)
    city = models.CharField(max_length=255,null=True,blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['user']),
        ]


class Order(models.Model):

    status_choices=[
        ('PENDING','PENDING'),
        ('PLACES','PLACED'),
        ('FAILED','FAILED'),
        ('APPROVED','APPROVED'),
        ('REJECTED','REJECTED'),
        ('ASSIGNED','ASSIGNED'),
        ('PICKED','PICKED'),
        ('DELIVERED','DELIVERD')
    ]
    payment = models.ForeignKey("payment.Payment",on_delete=models.SET_NULL,null=True,blank=True,related_name="orders")
    customer = models.ForeignKey("users.User",on_delete=models.CASCADE,related_name='customer',db_index=True)
    restaurant = models.ForeignKey("resturants.Restaurant",on_delete=models.CASCADE,db_index=True)
    Delivery_partner = models.ForeignKey("users.User",on_delete=models.CASCADE,null=True,blank=True,
        limit_choices_to={'is_del': True},related_name='delivery_partner',db_index=True)
    street_name = models.CharField(max_length=100)
    pincode = models.IntegerField()
    city = models.CharField(max_length=100)
    total = models.IntegerField()
    status = models.CharField(max_length=20,choices=status_choices,default='PENDING',db_index=True)
    creadted_at = models.DateTimeField(auto_now_add=True,db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['customer']),
            models.Index(fields=['restaurant']),
            models.Index(fields=['Delivery_partner']),
            models.Index(fields=['status']),
            models.Index(fields=['creadted_at']),
        ]

        ordering = ['-creadted_at']

    def __str__(self):
        return f"{self.customer.username}'s {self.status}"


class OrderItems(models.Model):

    order = models.ForeignKey(Order,on_delete=models.CASCADE,db_index=True)
    food = models.ForeignKey("products.FoodItem",on_delete=models.CASCADE,db_index=True)
    quantity = models.IntegerField()
    price = models.IntegerField()

    class Meta:
        indexes = [
            models.Index(fields=['order']),
            models.Index(fields=['food']),
            models.Index(fields=['order', 'food']),
        ]