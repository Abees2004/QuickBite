from django.db import models


class PartnerRegister(models.Model):
    partner = models.ForeignKey("users.User",on_delete=models.CASCADE,limit_choices_to={'is_staff': False},
        related_name='register_partner_requests',
        db_index=True)
    restaurant_name = models.CharField(max_length=255, db_index=True)
    is_veg = models.BooleanField(default=True)
    image = models.ImageField(upload_to='uploadsregister/', null=True, blank=True)
    street_name = models.CharField(max_length=255, db_index=True)
    city = models.CharField(max_length=255, db_index=True)
    pincode = models.IntegerField(db_index=True)

    status_choices = [
        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED')
    ]

    status = models.CharField(
        max_length=20,
        choices=status_choices,
        default='PENDING',
        db_index=True
    )

    def __str__(self):
        return f"{self.partner} status {self.status}"
    









class DeliveryPartnerRegister(models.Model):
    delivery_partner = models.ForeignKey("users.User",on_delete=models.CASCADE,limit_choices_to={'is_staff': False},
        related_name='delivery_partner_requests',db_index=True)
    age = models.IntegerField(db_index=True)
    location = models.CharField(max_length=255, db_index=True)
    license = models.ImageField(upload_to='License/', null=True, blank=True)
    vehicle_type = models.CharField(max_length=255, db_index=True)

    status_choices = [
        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED')
    ]

    status = models.CharField(
        max_length=20,
        choices=status_choices,
        default='PENDING',
        db_index=True
    )

    def __str__(self):
        return f'Delivery partner {self.delivery_partner} status {self.status}'