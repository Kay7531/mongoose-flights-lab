import { Flight } from '../models/flights.js'
import { Meal } from '../models/meal.js'
function index(req, res) {
  Flight.find({})
    .then(flights => {
      res.render('flights/index', {
        title: 'All Flights',
        flights: flights
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
}

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight",
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
    .populate('meals')
    .then(flight => {
      Meal.find({ _id: { $nin: flight.meals } })
        .then(meals => {

          res.render('flights/show', {
            title: 'Flight Detail',
            flight: flight,
            meals: meals,
          })
        })
    })
}

function create(req, res) {
  // remove empty properties
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
    .then(flight => {
      res.redirect(`/flights/${flight_.id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights/new')
    })
}

function deleteFlights(req, res) {
  Flight.findByIdAndDelete(req.params.id)
    .then(flight => {
      res.redirect("/flights")
    })
    .catch(err => {
      console.log(err)
      res.redirect("/flights")
    })
}

function edit(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      res.render("flights/edit", {
        flight, // same as flight: flight
        title: "Edit Flight"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
}
function update(req, res) {

  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(flight => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      flight.tickets.push(req.body)
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`)
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function addToMeal(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      flight.meals.push(req.body.mealId)
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`)
        })
        .catch(err => {
          console.log(err);
          res.redirect("/flights")
        })
    })
    .catch(err => {
      console.log(err);
      res.redirect("/flights")
    })
}




export {
  index,
  newFlight as new,
  show,
  create,
  deleteFlights as delete,
  edit,
  update,
  createTicket,
  addToMeal


}