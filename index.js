const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Joi = require('joi');
var moment = require('moment');
const functions = require('./modules/module');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


//Fake DB in memory

let bookings = [];

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

  const data = req.body;
  console.log(req.get("X-Token"));

  const booked_dates = functions.getDates(new Date(data.start_date), new Date(data.end_date));

  const schema = Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    persons: Joi.number().integer().required(),
    booking_date: Joi.object().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    booked_dates: Joi.array().required(),
    confirmed: Joi.boolean().default(false),
    payed: Joi.boolean().default(false)
  });


  const newBooking = {
    _id: "booking_" + (bookings.length + 1),
    name: data.name,
    email: data.email,
    persons: parseInt(data.persons),
    booking_date: new Date(),
    start_date: data.start_date,
    end_date: data.end_date,
    booked_dates: booked_dates,
    confirmed: false,
    payed: false
  }

  Joi.validate(newBooking, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        message: "Validation error",
        error: err
      });
    }
    else {
      // TODO Make insert to mongoDB instead of bushing to array later
      bookings.push(newBooking);
      res.json({
        status: "Success",
        message: "New booking created",
        data: newBooking
      });
    }
  })
});


app.put('/api/bookings/:id', (req, res) => {

});

app.delete('/api/bookings/:id', (req, res) => {

});


const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Started on port: " + port);
});
