from rest_framework.permissions import BasePermission
   

class IsStaffUser(BasePermission):

    def has_permission(self, request, view):

        user = request.user

        return bool(
            user and
            user.is_authenticated and
            user.is_staff and
            not user.is_superuser
        )
    


class IsDeliveryUser(BasePermission):

    def has_permission(self, request, view):

        user = request.user

        return bool(
            user and
            user.is_authenticated and
            user.is_del and
            not user.is_staff and
            not user.is_superuser
        )