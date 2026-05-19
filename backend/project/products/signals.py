from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps


@receiver(post_migrate)
def seed_food_categories(sender, **kwargs):

    if sender.name != "products":
        return

    FoodCategory = apps.get_model("products", "FoodCategory")

    categories = [
        "Biryani",
        "Pizza",
        "Burger",
        "Chinese",
        "South Indian",
        "North Indian",
        "Arabian",
        "Shawarma",
        "Fried Chicken",
        "Pasta",
        "Noodles",
        "Momos",
        "Seafood",
        "BBQ",
        "Grill",
        "Healthy Food",
        "Salads",
        "Ice Cream",
        "Cakes",
        "Tea",
        "Coffee",
        "Milkshakes",
        "Fresh Juice",
        "Soft Drinks",
    ]

    for name in categories:
        FoodCategory.objects.get_or_create(
            name=name
        )