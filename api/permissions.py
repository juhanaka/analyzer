from rest_framework import permissions
from api.models import Dataset, Variable

class IsOwnerOrDeny(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    if isinstance(obj, Dataset):
      return obj.owner == request.user
    elif isinstance(obj, Variable):
      return obj.dataset.owner == request.user
    else:
      return False