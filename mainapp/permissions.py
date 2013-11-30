from rest_framework import permissions

class IsOwnerOrDeny(permissions.BasePermission***REMOVED***:
  def has_object_permission(self, request, view, obj***REMOVED***:
    return obj.owner == request.user