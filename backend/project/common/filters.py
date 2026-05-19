import django_filters
from django.db.models import Q
from resturants.models import Restaurant


class RestaurantFilter(django_filters.FilterSet):

    min_price = django_filters.NumberFilter(
        method='filter_min_price'
    )

    min_rating = django_filters.NumberFilter(
        method='filter_min_rating'
    )

    class Meta:
        model = Restaurant
        fields = []

    def filter_min_price(self, queryset, name, value):

        search = self.request.GET.get('search')

        if search:
            return queryset.filter(
                fooditem__name__icontains=search,
                fooditem__price__gte=value
            ).distinct()

        return queryset.filter(
            fooditem__price__gte=value
        ).distinct()

    def filter_min_rating(self, queryset, name, value):

        return queryset.filter(
            ratingreview__rating__gte=value
        ).distinct()