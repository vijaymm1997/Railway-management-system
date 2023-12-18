document.addEventListener('DOMContentLoaded', function () {
    const trainListDiv = document.getElementById('train-list');
    const reservationListDiv = document.getElementById('reservation-list');

    // Fetch train data from the API
    fetch('/api/trains/')
        .then(response => response.json())
        .then(data => {
            // Display train data
            trainListDiv.innerHTML = '<h2>Train List</h2>';
            data.forEach(train => {
                const trainDiv = document.createElement('div');
                trainDiv.innerHTML = `<p><strong>${train.name}</strong> - Source: ${train.source}, Destination: ${train.destination}</p>`;
                trainListDiv.appendChild(trainDiv);
            });
        })
        .catch(error => console.error('Error fetching train data:', error));

    // Fetch reservation data from the API
    fetch('/api/reservations/')
        .then(response => response.json())
        .then(data => {
            // Display reservation data
            reservationListDiv.innerHTML = '<h2>Reservation List</h2>';
            data.forEach(reservation => {
                const reservationDiv = document.createElement('div');
                reservationDiv.innerHTML = `<p><strong>${reservation.passenger_name}</strong> - Train: ${reservation.train.name}, Seat: ${reservation.seat_number}</p>`;
                reservationListDiv.appendChild(reservationDiv);
            });
        })
        .catch(error => console.error('Error fetching reservation data:', error));
});
document.addEventListener('DOMContentLoaded', function () {
    // ... (previous JavaScript code)

    const trainSelect = document.getElementById('train');
    const ticketListDiv = document.getElementById('ticket-list');

    // Fetch train data from the API
    fetch('/api/trains/')
        .then(response => response.json())
        .then(data => {
            // Populate the train dropdown
            data.forEach(train => {
                const option = document.createElement('option');
                option.value = train.id;
                option.text = `${train.name} - ${train.source} to ${train.destination}`;
                trainSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching train data:', error));

    // Fetch ticket data from the API
    fetch('/api/tickets/')
        .then(response => response.json())
        .then(data => {
            // Display ticket data
            ticketListDiv.innerHTML = '<h2>Ticket List</h2>';
            data.forEach(ticket => {
                const ticketDiv = document.createElement('div');
                ticketDiv.innerHTML = `<p><strong>${ticket.reservation.passenger_name}</strong> - Train: ${ticket.reservation.train.name}, Seat: ${ticket.reservation.seat_number}</p>`;
                ticketListDiv.appendChild(ticketDiv);
            });
        })
        .catch(error => console.error('Error fetching ticket data:', error));
});

function bookTicket() {
    const trainId = document.getElementById('train').value;
    const passengerName = document.getElementById('passenger-name').value;
    const seatNumber = document.getElementById('seat-number').value;
    const dateOfJourney = document.getElementById('date-of-journey').value;

    fetch('/api/reservations/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            train: trainId,
            passenger_name: passengerName,
            seat_number: seatNumber,
            date_of_journey: dateOfJourney,
        }),
    })
    .then(response => response.json())
    .then(reservation => {
        fetch('/api/tickets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reservation: reservation.id,
            }),
        })
        .then(response => response.json())
        .then(ticket => {
            // Update the ticket
