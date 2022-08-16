const Itinerary = require("../models/itineraries")

const itinerariesControllers = {
    getItineraries: async (req, res) => {
        let itineraries
        let error = null
        try{
            itineraries = await Itinerary.find()
            .populate("cities")
            .populate("comments.userID", {fullname:1, photo:1, email:1})
        }catch (err) { error = err }
        res.json({
            response : error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },
    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try{
            itinerary = await Itinerary.findOne({ _id: id })
            .populate("comments.userID", {fullname:1, photo:1, email:1})
        }catch (err) { error = err }
        res.json({
            response : error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    },
    addItinerary: async (req, res) => {
        const { itineraryname, username, userimage, price, time, hashtags, likes, cities, comments } = req.body
        let itinerary
        let error = null
        try{
            itinerary = await new Itinerary({
                itineraryname: itineraryname,
                username: username,
                userimage: userimage,
                price: price,
                time: time,
                hashtags: hashtags,
                likes: likes,
                cities: cities,
                comments: comments
            }).save()
        }catch (err) { error = err }
        res.json({
            response : error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    },
    modifyItinerary: async (req, res) => {
        const cityid = req.params.id
        const itinerary = req.body.data
        let itinerarydb
        let error = null
        try{
            itinerarydb = await Itinerary.findOneAndUpdate({ _id: cityid }, itinerary,{ new: true })
        }catch (err) { error = err }
        res.json({
            response : error ? 'ERROR' : { itinerarydb },
            success: error ? false : true,
            error: error
        })
    },
    removeItineray: async (req, res) => {
        const cityid = req.params.id
        let itinerary
        let error = null
        try{
            itinerary = await Itinerary.findOneAndDelete({ _id: cityid })
        }catch (err) { error = err }
        res.json({
            response : error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },
    findTinFromCity: async (req,res) => {
        const cityid = req.params.id
        let itineraries 
        let error = null
        try{
            itineraries = await Itinerary.find({ cities : cityid })
            .populate("cities")
            .populate("activities")
            .populate("comments.userID")
        }catch (err) { error = err 
            console.log(error)}
        res.json({
            response : error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },
    like: async (req, res) => {
        let itineraryId = req.params.id
        let user = req.user.id
        await Itinerary.findOne({_id:itineraryId})
        .then( (itinerary) => {
            if (itinerary.likes.includes(user)) {
                Itinerary.findOneAndUpdate({_id:itineraryId}, {$pull:{likes:user}}, {new:true})
                .then(response => res.json({
                    response: response.likes,
                    success: true
                }))
                .catch(error => console.log(error))
            } else {
                Itinerary.findOneAndUpdate({_id:itineraryId}, {$push:{likes:user}}, {new:true})
                .then(response => res.json({
                    response: response.likes,
                    succes: true
                }))
                .catch(error => console.log(error))
            } 
        }).catch ((error) =>
            res.json({
                response: error,
                success: false
            })
        )
    }
}
module.exports = itinerariesControllers