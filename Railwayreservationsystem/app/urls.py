from django.urls import path
from .views import TrainList, TrainDetail, ReservationList, ReservationDetail,TicketList,TicketDetail

urlpatterns = [
    path('trains/', TrainList.as_view(), name='train-list'),
    path('trains/<int:pk>/', TrainDetail.as_view(), name='train-detail'),
    path('reservations/', ReservationList.as_view(), name='reservation-list'),
    path('reservations/<int:pk>/', ReservationDetail.as_view(), name='reservation-detail'),
    path('tickets/', TicketList.as_view(), name='ticket-list'),
    path('tickets/<int:pk>/', TicketDetail.as_view(), name='ticket-detail'),
]

