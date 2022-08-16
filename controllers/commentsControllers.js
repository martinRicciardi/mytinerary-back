const Itinerary = require('../models/itineraries')

const commentsControllers = {
    addComment: async (req, res) => {
        const { itineraryId } = req.body.comment
        const comment = req.body.comment.comments.comment
        console.log(req.body);
        const {user} = req
        try {
        const newComment = await Itinerary.findOneAndUpdate({ _id: itineraryId }, 
            { $push: { comments: { comment: comment, userID: user, date: Date.now() } } }, { new: true })
            .populate("comments.userID")
        res.json({ success: true, response: { newComment }, message: "Thanks for your comment" })
        }
        catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong, please try in a few seconds" })
        }
    },
    modifyComment: async (req, res) => {
        const {commentId, comment} = req.body.comment
        console.log(commentId);
        try {
            const newComment = await Itinerary.findOneAndUpdate({"comments._id":commentId}, 
            {$set: {"comments.$.comment": comment,"comments.$.date": Date.now() }}, {new: true})
            .populate("comments.userID")
            res.json({ success: true, response:{newComment}, message:"Your commentary has been changed" })
        }
        catch (error) {
            console.log(error)
            res.json({ success: true, message: "Something went wrong, please try in a few seconds" })
        }
    },
    deleteComment: async (req, res) => {
        const id = req.params.id
        try {
            const deleteComment = await Itinerary.findOneAndUpdate({"comments._id":id}, {$pull: {comments: {_id: id}}}, {new: true})
            res.json({ success: true, response:{deleteComment}, message: "Message deleted" })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something went wrong, please try in a few seconds" })
        }
    },
    
}
module.exports = commentsControllers