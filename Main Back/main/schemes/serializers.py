from rest_framework import serializers
from .models import *

class SchemeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Scheme
        fields = '__all__'