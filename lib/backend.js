const express = require('express')

module.exports = function(config){
  config.backend.on('expressPreConfig',(app)=>{
    let router = express.Router()
    let opts = config.pureAutomation || {}
    app.use('/api',router)
    router.post('/game/gen-unique-object-name', locked)
    router.post('/game/check-unique-object-name', locked)
    router.post('/game/create-flag', locked)
    router.post('/game/gen-unique-flag-name', locked)
    router.post('/game/check-unique-flag-name', locked)
    router.post('/game/change-flag-color', locked)
    router.post('/game/remove-flag', locked)
    router.post('/game/add-object-intent', locked)
    router.post('/game/create-construction', locked)
    router.post('/game/set-notify-when-attacked', locked)
    router.post('/game/create-invader', locked)
    router.post('/game/remove-invader', locked)
    // TODO: Make all configurable
    if(opts.respawn === false) { 
      router.post('/user/respawn', locked)
    }
    if(opts.placeSpawn === false) { 
      router.post('/game/place-spawn', locked)
    }
  })
}

function locked(req,res){
  res.status(423)
  res.end()
}
