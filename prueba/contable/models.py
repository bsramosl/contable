from django.db import models

# Create your models here.



class Producto(models.Model):
    title = models.CharField(max_length=255, blank=True,null=True)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    descripcion = models.TextField()
    category = models.CharField(max_length=255,blank=True,null=True)
    image = models.URLField(blank=True,null=True)

    def __str__(self):
        return self.title
    
