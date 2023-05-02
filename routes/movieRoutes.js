const router = require('express').Router()
const Movie = require('../models/Movie')


//cria um dado no banco a partir do body
router.post('/', async (req,res) => {
    const{name, price, active} = req.body
    if(!name){
        res.status(422).json({message: 'O nome é obrigatório'})
        return
    }
    const movie = {
        name,
        price,
        active
    }
    try{
       await Movie.create(movie)
        res.status(201).json({message: 'Filme inserido com sucesso!!'})

    }catch(error){
        res.status(500).json({error: 'Erro ao inserir o filme'})
    }
})

//le os dados do banco 
router.get('/', async (req,res) => {
    try{
        const movies = await Movie.find()
        res.status(200).json(movies)
        
    }catch(error){
        res.status(500).json({error:'Erro ao ler dados'})
    }
})

router.get('/:id', async (req,res) => {
    //extrair o id da requisição
    //extração de dado na url utiliza-se o params
    const id = req.params.id
    try{
        const movie = await Movie.findOne({_id: id})
        if(!movie){
            res.status(422).json({message: 'O usuario não foi encontrado!'})
            return
        }
        res.status(200).json(movie)
    }catch(error){
        rres.status(500).json({ erro: 'Erro no servidor' })
    }

})

// atualização de dados (PUT PATCH)
router.put('/:id', async (req,res) => {
    //tira o id da url
    const id = req.params.id
//chamam o corpo da requisição recriando as variaveis 
    const{name, price, active} = req.body

    //recria o objeto 
    const movie = {
        name,
        price,
        active
    }
    try{
        //tem que atualizar os dados, salvar em uma variavel e mandar novamente
        // ele atualiza os dados baseado no id e manda o objeto que foi recriado
        const updateMovie = await Movie.updateMany({_id: id}, movie)     

        res.status(200).json({movie})

    }catch{
        res.status(500).json({ erro: 'Erro no servidor' })
    }

})
// atualização de dados (PUT PATCH)
router.patch('/:id', async (req,res) => {
    
    const id = req.params.id

    const{name, price, active} = req.body
 
    const movie = {
        name,
        price,
        active
    }
    try{
        
        const updateMovie = await Movie.updateOne({_id: id}, movie)     
        if(updateMovie.matchedCount === 0){
            res.status(422).json({message: 'Filme não encontrado'})
            return
        }
        res.status(200).json({movie})

    }catch{
        res.status(500).json({ erro: 'Erro no servidor' })
    }

})
router.delete('/:id', async (req,res) => {
    const id = req.params.id

    const movie = await Movie.findOne({_id: id})

    if(!movie){
        res.status(422).json({message: 'O filme não foi encontrado'})
        return
    }
    try{
        await Movie.deleteOne({_id: id})
        res.status(200).json({message: 'Filme removido com sucesso'})

    }catch(error){
        res.status(500).json({message: 'Erro no servidor'})
    }

})
module.exports = router