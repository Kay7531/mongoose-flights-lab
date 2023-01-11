import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

/* GET users listing. */
router.get('/', flightsCtrl.index)

// GET localhost:3000/flights/new
router.get('/new', flightsCtrl.new)
//GET localhost:3000/flights/:id
router.get('/:id', flightsCtrl.show)
//POST localhost:3000/flights
router.post('/', flightsCtrl.create)
// DELETE localhost:3000/flights/:id
router.delete('/:id', flightsCtrl.delete)
// localhost:3000/flights/:id/edit
router.get("/:id/edit", flightsCtrl.edit)


export {
  router
}
