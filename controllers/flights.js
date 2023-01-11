import {Flight} from '../models/flights.js'

function index (req, res) {
    Flight.find({})
    .then(flights => {
        res.render('flights/index', {
            title: 'All Flights',
            flights: flights
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/movies')
      })
}

function newFlight(req, res) {
    res.render("flights/new", {
      title: "Add Flight",
    })
  }

function show(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        res.render('flights/show', {
            title: 'Flight Detail',
            flight: flight
        })
    })
}

function create(req, res){
  // remove empty properties
	for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })  
}

function deleteFlights(req, res) {
    Flight.findByIdAndDelete(req.params.id)
    .then(movie => {
      res.redirect("/flights")
    })
    .catch(err => {
      console.log(err)
      res.redirect("/flights")
    })
  }

  function edit(req, res) {
    Flight.findById(req.params.id)
    .then(movie => {
      res.render("flights/edit", {
        movie, // same as: movie: movie
        title: "Edit Flight"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  }

export {
    index,
    newFlight as new,
    show,
    create,
    deleteFlights as delete,
    edit

}