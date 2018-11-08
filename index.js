var express = require('express');
var app = express();
var bodyParser = require('body-parser');


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


//Fake DB in memory

bookings = [
  {
    _id: 1,
    booked_by: "Anna",
    booking_date: new Date(),
    booked_from: new Date("2018-11-30T14:29Z"),
    booked_to: new Date("2018-12-06T14:29Z"),
    booked_dates: [
      new Date("2018-11-30T14:29Z"),
      new Date("2018-12-01T14:29Z"),
      new Date("2018-12-02T14:29Z"),
      new Date("2018-12-03T14:29Z"),
      new Date("2018-12-04T14:29Z"),
      new Date("2018-12-05T14:29Z"),
      new Date("2018-12-06T14:29Z")
    ]
  }
];

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.get('/api/bookings/:id', (req, res) => {
  const id = req.params.id;
  const booking = bookings.find(c => c._id === parseInt(id));

  if (!booking) {
    return res.status(404).json({message: `Booking id: ${id} not found!`});
  }
  else {
    res.json(booking);
  }
});


app.post('/api/bookings', (req, res) => {

});


app.put('/api/bookings/:id', (req, res) => {

});

app.delete('/api/bookings/:id', (req, res) => {

});


const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Started on port: " + port);
});
