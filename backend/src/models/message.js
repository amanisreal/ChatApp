const mongoose = require('mongoose')

const msgSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },

    to: {
        type: String,
        required: true,
    },

    message: {
        type: String
    },

}, {
    timestamps: true,
})

const MSG = mongoose.model('MSG', msgSchema);

module.exports = MSG;