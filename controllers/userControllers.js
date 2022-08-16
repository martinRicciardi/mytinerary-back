const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendEmail = require('./sendEmail')
const jwt = require('jsonwebtoken')

const usersControllers = {
signUpUsers: async (req, res) => {
    const { fullname, photo, email, password, country, from } = req.body.userData
    try{
        const usuarioExiste = await User.findOne({email})
        const verification = false
        const uniqueString = crypto.randomBytes(15).toString('hex')
        if (usuarioExiste){
            if(usuarioExiste.from.indexOf(from) !== -1) {
                res.json({
                    success: false,
                    from: from,
                    message: "You have already registered in this way, please log in"
                })
            }else {
                const contraseñaHasheada = bcryptjs.hashSync(password, 10)
                usuarioExiste.from.push(from)
                usuarioExiste.password.push(contraseñaHasheada)
                usuarioExiste.verification = true
                await usuarioExiste.save()
                res.json({
                    success: true,
                    from: from,
                    message: "Add " + email + " so you can log in"
                })
            }
        }else {
            const contraseñaHasheada = bcryptjs.hashSync(password, 10)
            const nuevoUsuario = await new User({
                fullname,
                photo,
                email,
                password: [contraseñaHasheada],
                country,
                uniqueString: uniqueString,
                verification: verification,
                from: [from],
            })
            if (from !== "form-Signup") {
                nuevoUsuario.verification = true,
                await nuevoUsuario.save()
                res.json({
                    success: true,
                    from: "Google",
                    message: "Congratulations, your user was created with " + from + " go to log in!"
                })
            }else {
                await nuevoUsuario.save()
                await sendEmail(email, uniqueString)
                res.json({
                    success: true,
                    from: from,
                    message: "We send you an email to verify it, check your box and follow the steps"
                })
            }
        }
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong, try again in a few minutes"
        })
    }
},
signInUser: async (req, res) => {
    const { email, password, from } = req.body.logedUser
    try{
        const usuarioExiste = await User.findOne({ email })
        // console.log(usuarioExiste);
        // const indexpass = usuarioExiste.from.indexOf(from)
        if (!usuarioExiste || !usuarioExiste.verification) {
            res.json({
                success: false,
                message: "Your user has not been registered"
            })
        }else {
            if(from !== "form-Signup" || usuarioExiste.verification) {
                let contraseñaCoincide = usuarioExiste.password.filter(pass => bcryptjs.compareSync(password, pass))
                if (contraseñaCoincide.length >= 0) {
                    const userData = {
                        id: usuarioExiste._id,
                        fullname: usuarioExiste.fullname,
                        email: usuarioExiste.email,
                        photo: usuarioExiste.photo,
                        from: from,
                    }
                    await usuarioExiste.save()
                    const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24})
                    // console.log(token)
                    res.json({
                        success: true,
                        from: from,
                        response: {token, userData},
                        message: "Welcome again " + userData.fullname + "!"
                    })
                }else {
                    res.json({
                        success: false,
                        from: from,
                        message: "You did not register with " + from + " If you want to enter you must register first with " + from
                    })
                }
            }else {
                let contraseñaCoincide = usuarioExiste.filter(pass => bcryptjs.compareSync(password, pass))
                if(contraseñaCoincide.length > 0) {
                    const userData = {
                        id: usuarioExiste._id,
                        fullname: usuarioExiste.fullname,
                        email: usuarioExiste.email,
                        photo: usuarioExiste.photo,
                        from: from
                    }
                    await usuarioExiste.save()
                    const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24})
                    console.log(token)
                    res.json({
                        success: true,
                        from: from,
                        response: { token, userData },
                        message: "Welcome again " + userData.fullname
                    })
                }else {
                    res.json({
                        success: false,
                        from: from,
                        message: "The username or password do not match"
                    })
                }
            }
        }
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong, try again in a few minutes"
        })
    }
},
verifyMail: async (req, res) => {
    const { string } = req.params
    const user = await User.findOne({ uniqueString: string })
    if (user) {
        user.verification = true
        await user.save()
        res.redirect("http://localhost:3000/")
    }
    else {
        res.json({
            success: false,
            message: `This email has not account yet!`
        })
    }
},
verifyToken:(req, res) => {
    if(req.user){
        console.log(req.user)
        res.json({success:true,
        response:{id:req.user.id,
                    fullname:req.user.fullname,
                    email:req.user.email,
                    photo:req.user.photo,
                    from:"token"},
        message:"Welcome again "+req.user.fullname})
    }else{
        res.json({
            success: false,
            message: "Please signin again"})
    }
},
signOutUser:async (req, res) => {
    const email = req.body.userData
    const user = await User.findOne({email})
    await user
    res.json({message: email+' sign out!'})
},
}
module.exports = usersControllers