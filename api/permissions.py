from rest_framework import permissions
from api.models import Dataset, Variable

class IsOwnerOrDeny(permissions.BasePermission***REMOVED***:
  def has_object_permission(self, request, view, obj***REMOVED***:
    if isinstance(obj, Dataset***REMOVED***:
      return obj.owner == request.user
    elif isinstance(obj, Variable***REMOVED***:
      return obj.dataset.owner == request.user
    else:
      return False