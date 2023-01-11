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

function create(req, res){
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })  
}

export {
    index,
    newFlight as new,
    create,
}