from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import SchemeSerializers


class API(APIView):
    def get(self, request):
        queryset = Scheme.objects.all()
        serializer = SchemeSerializers(queryset,many = True)
        return Response({
                "message" : "success",
                "data" : serializer.data
            })
        
    def post(self, request, format = None):
        data = request.data
        serializer = SchemeSerializers(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Data Successfully saved",
                "data" : serializer.data
            })
        else:
            return Response({
                "message" : "There was an unexpected error",
                "Error" : serializer.errors
            })