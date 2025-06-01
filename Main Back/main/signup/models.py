from django.db import models

# Create your models here.
class registration(models.Model):
    types={
        ('kdp','kadapa'),
        ('mpl','madanapalle'),
        ('mum','bombay')
    }
    username = models.CharField(max_length=50)
    email = models.EmailField()
    aadhaar = models.CharField(max_length=12,unique=True)
    region = models.CharField(max_length=3,choices=types)
    password = models.CharField(max_length=50)
    