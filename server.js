const express = require('express')
const mongoose = require('mongoose')
const app = express()



app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//rotas API
const movieRoutes = require('./routes/movieRoutes')
app.use('/movie', movieRoutes)



//rota home
app.get('/', (req,res) => {
    res.json({message: 'Rodou Express!'})
})
mongoose.connect('mongodb+srv://biancaHendy:EbY6JxHm0fkKpcXh@filmesdb.lwirl39.mongodb.net/test')
.then(() => { //quando da certo a conexão 
    console.log('Conectou ao banco!')
    app.listen(3030)
  })
  .catch((err) => console.log(err)) //quando da erro de conexao


