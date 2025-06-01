from django.urls import path
from .views import FilteredAPI

urlpatterns = [
    path('api/products/', FilteredAPI.as_view(), name='filtered-products'),
]
