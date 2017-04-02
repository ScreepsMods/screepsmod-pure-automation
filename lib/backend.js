const express = require('express')

module.exports = function(config){
  config.backend.on('expressPreConfig',(app)=>{
    let router = express.Router()
    app.use('/api',router)
    router.post('/gen-unique-object-name', locked)
    router.post('/check-unique-object-name', locked)
    router.post('/create-flag', locked)
    router.post('/gen-unique-flag-name', locked)
    router.post('/check-unique-flag-name', locked)
    router.post('/change-flag-color', locked)
    router.post('/remove-flag', locked)
    router.post('/add-object-intent', locked)
    router.post('/create-construction', locked)
    router.post('/set-notify-when-attacked', locked)
    router.post('/create-invader', locked)
    router.post('/remove-invader', locked)
  })
}

function locked(req,res){
  res.status(423)
  res.end()
}
