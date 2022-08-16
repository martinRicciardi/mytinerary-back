const Router = require("express").Router()

const citiesControllers = require("../controllers/citiesControllers");
const {getCities, getOneCity, addCity, modifyCity, removeCity} = citiesControllers

Router.route("/cities")
.get(getCities)
.post(addCity)

Router.route("/cities/:id")
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)

const itinerariesControllers = require("../controllers/itinerariesControllers");
const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItineray, findTinFromCity, like} = itinerariesControllers

Router.route("/itineraries")
.get(getItineraries)
.post(addItinerary)

Router.route("/itineraries/:id")
.delete(removeItineray)
.put(modifyItinerary)
.get(getOneItinerary)

Router.route("/itineraries/cities/:id")
.get(findTinFromCity)

const usersControllers = require('../controllers/userControllers')
const {signUpUsers, signInUser, verifyMail, verifyToken, signOutUser} = usersControllers
const validator = require("../config/validator");
const passport = require('../config/passport')

Router.route('/signUp')
.post(validator, signUpUsers)

Router.route('/signIn')
.post(signInUser)

Router.route('/verify/:string')
.get(verifyMail)


Router.route('/signOut')
.post(signOutUser)

const activityControllers = require("../controllers/activitiesControllers")
const {getActivities, getOneActivity, addActivity, modifyActivity, removeActivity, findActFromTin} = activityControllers

Router.route('/activities')
.get(getActivities)
.post(addActivity)

Router.route('/activities/:id')
.delete(removeActivity)
.put(modifyActivity)
.get(getOneActivity)

Router.route('/activities/itineraries/:id')
.get(findActFromTin)

Router.route('/signInToken')
.get(passport.authenticate('jwt',{ session: false }), verifyToken)
Router.route("/itineraries/like/:id")
.put(passport.authenticate('jwt',{session: false}), like)

const commentsControllers = require('../controllers/commentsControllers');
const { addComment, modifyComment, deleteComment } = commentsControllers

Router.route('/comments')
    .put(passport.authenticate('jwt', { session: false }), modifyComment)
    .post(passport.authenticate('jwt', { session: false }), addComment)

Router.route('/comments/:id')
    .post(passport.authenticate('jwt', { session: false }), deleteComment)

module.exports = Router 