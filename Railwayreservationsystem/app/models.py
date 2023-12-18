from django.db import models

class Train(models.Model):
    name = models.CharField(max_length=100)
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()

    def __str__(self):
        return self.name

class Reservation(models.Model):
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    passenger_name = models.CharField(max_length=100)
    seat_number = models.IntegerField()
    date_of_journey = models.DateField()


class Ticket(models.Model):
    reservation = models.OneToOneField(Reservation, on_delete=models.CASCADE)
    booking_time = models.DateTimeField(auto_now_add=True)