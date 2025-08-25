import express from 'express';
import qrcode from 'qrcode';
import jwt from 'jsonwebtoken';
const app = express()
const port = 3000
const user = {}
//随机整数生成器
const getRandomId = () => Math.floor(Math.random() * 10000)
const userId = getRandomId()
app.use('/static',express.static('public'))

app.get('/qrcode', async (req, res) => {
  user[userId] = {
    token: null,
    time: Date.now(),
    reject: false
  }
  const code = await qrcode.toDataURL(`http://192.168.31.179:3000/static/mandate.html?userId=${userId}`)
  res.json({ 
    code,
    userId
  })
})

app.post('/login/:userId', (req, res) => {
  const id = req.params.userId
  const token = jwt.sign({ id }, 'aoisjdo')
  user[id].token = token
  user[id].time = Date.now()
  res.json({ token })
})

app.post('/reject/:userId', (req, res) => {
  const id = req.params.userId
  user[id].reject = true
  if (user[id]) {
    res.json({ reject: true })
  }
})


app.get('/check/:userId', (req, res) => {
  const id = req.params.userId
  if (Date.now() - user[id]?.time > 1000 * 60 * 1) {
    res.json({
      status: 2
    })
  } else if (user[id].token) {
    res.json({
      status: 1,
    })
  } else if (user[id].reject) {
    res.json({
      status: 3,
    })
  } else {
    res.json({
      status: 0,
    })
  }
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))