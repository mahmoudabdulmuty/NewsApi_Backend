const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    imageNews:{
        type: Buffer
    },
    description: {
        type: String,
        required: true,
        trim: true
    },title:{
        type: String,
        required: true,
        unique: true,
    },
    auther:{
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Reporters'
    }
}, {
    timestamps: true
})

const News = mongoose.model('News', newsSchema)

module.exports = News