from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Train)
admin.site.register(Reservation)
admin.site.register(Ticket)