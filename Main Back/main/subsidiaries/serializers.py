from rest_framework import serializers
from .models import *

class SubsidySerializers(serializers.ModelSerializer):
    class Meta:
        model = Subsidy
        fields = '__all__'