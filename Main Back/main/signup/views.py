from rest_framework.response import Response
# Create your views here.
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Hello, authenticated user!"})
