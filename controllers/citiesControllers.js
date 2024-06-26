const Cities = require("../models/cities")

const citiesControllers = {
    getCities: async (req, res) => {
        let cities
        let error = null
        try{
            cities = await Cities.find()
        }catch (err) { error = err }
        res.json({
            response : error ? 'ERROR' : { cities },
            success: error ? false : true,
            error: error
        })
    },
    getOneCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try{
            city = await Cities.findOne({ _id: id })
        }catch (err) { error = err }
        res.json({
            response : error ? 'ERROR' : { city },
            success: error ? false : true,
            error: error
        })
    },
    addCity: async (req, res) => {
        const { cityname, country, image, description } = req.body //vienen las variables con el nombre que vos haces el dispatch(o sea el parametro como lo recibis en las actions, claro ejemplo es el controlador de comentarios, porque en el dispatch pasa comment, cuando la action hace la peticion al endpoint, el parametro que pasa es comment, entonces eso es lo que recibe por body)
        let city
        let error = null
        try{
            city = await new Cities({
                cityname: cityname,
                country: country,
                image: image,
                description: description,
            }).save()
        }catch (err) { error = err }
        res.json({
            response : error ? 'ERROR' : { city },
            success: error ? false : true,
            error: error
        })
    },
    modifyCity: async (req, res) => {
        const id = req.params.id
        const city = req.body.data
        let citydb
        let error = null
        try{
            citydb = await Cities.findOneAndUpdate({ _id: id }, city,{ new: true })
        }catch (err) { error = err }
        res.json({
            response : error ? 'ERROR' : { citydb },
            success: error ? false : true,
            error: error
        })
    },
    removeCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try{
            city = await Cities.findOneAndDelete({ _id: id })
        }catch (err) { error = err }
        res.json({
            response : error ? 'ERROR' : { cities },
            success: error ? false : true,
            error: error
        })
    }
}
module.exports = citiesControllers