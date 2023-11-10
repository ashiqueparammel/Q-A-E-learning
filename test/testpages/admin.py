from django.contrib import admin
from .models import Options, Questions, TestPages, Results
# Register your models here.

admin.site.register(TestPages)
admin.site.register(Questions)
admin.site.register(Options)
admin.site.register(Results)