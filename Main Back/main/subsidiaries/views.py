from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Subsidy
from .serializers import SubsidySerializers

class FilteredAPI(APIView):
    def get(self, request, *args, **kwargs):
        # Get query parameters for filtering
        region = request.query_params.get('region', None)
        category = request.query_params.getlist('category', [])  # Handles multiple categories
        availability = request.query_params.get('availability', None)  # Example: "true" or "false"

        # Start with the Subsidy queryset
        queryset = Subsidy.objects.all()

        # Apply filters conditionally
        if region:
            queryset = queryset.filter(region=region)
        if category:
            queryset = queryset.filter(category__in=category)  # Assuming `category` is a field in the model
        if availability is not None:
            availability_bool = availability.lower() == 'true'  # Convert to boolean
            queryset = queryset.filter(availability=availability_bool)

        # Serialize and return the filtered data
        serializer = SubsidySerializers(queryset, many=True)
        return Response({
            "message": "success",
            "data": serializer.data
        })

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = SubsidySerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Data Successfully saved",
                "data": serializer.data
            }, status=200)
        else:
            return Response({
                "message": "There was an unexpected error",
                "Error": serializer.errors
            })
