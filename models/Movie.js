const mongoose = require('mongoose')

const Filmes = mongoose.model('Filme',{
    name: String,
    price: Number,
    active: Boolean,
})
module.exports = Filmes