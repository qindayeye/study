const app = require('express')()
const server = require('http').createServer(app)

app.use('/',(req,res)=>{
    console.log(server)
    res.send('hello,scoketio!')
})



server.listen(3000)












