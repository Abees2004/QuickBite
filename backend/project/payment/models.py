from django.db import models

# Create your models here.
class Payment(models.Model):
    STATUS_CHOICES = (
        ("PENDING", "PENDING"),
        ("SUCCESS", "SUCCESS"),
        ("FAILED", "FAILED"),
    )
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    razorpay_order_id = models.CharField(max_length=255, unique=True,db_index=True)
    razorpay_payment_id = models.CharField(max_length=255, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.id} - {self.status}"