from django.db import models


# ["Name of the product","Subsidy price per unit","Category","Stock Availability"]

# Create your models here.

class Subsidy(models.Model):
    ProductName = models.CharField(max_length=10)
    ProductImage = models.ImageField(upload_to='subsidy_images/')
    ProductPrice = models.IntegerField()
    StockAvailability = models.BooleanField(default=True)
    Category = models.CharField(max_length=10)
    region = models.CharField(max_length=50)

    def __str__(self):
        return self.ProductName

