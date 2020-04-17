const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// 使用body-parser中间件  解析post请求参数
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// app.use('/',(req,res,next)=>{
//     console.log(req.query)
//     console.log(req.params)
//     res.send('二大爷好')
//     console.log('/聊')
//     next()
// })
app.get('/www',(req,res)=>{
    console.log('过啦');
    
    res.send({
        name:"二大爷"
    })
})

app.post('/ddd',(req,res)=>{
    console.log(req.body)
    let data = req.body
    if(data.name=='admin'&&data.password==666666){
        res.send({
            code:0,
            msg:'登录成功'
        })
    }else{
        res.send({
            code:1,
            msg:'用户名或密码错误，请重新输入'
        })
    }
})


app.listen(4000)


