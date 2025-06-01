from django.urls import path
from . import views

urlpatterns = [
    path('schemes-end-point/',views.API.as_view()),
]