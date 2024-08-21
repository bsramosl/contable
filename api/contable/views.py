from django.shortcuts import render
from contable.models import *
from rest_framework import viewsets
from contable.serializers import *

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all() 
    serializer_class = ProductoSerializer
