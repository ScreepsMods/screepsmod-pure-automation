const express = require('express')
const fs = require('fs')
const ini = require('ini')

module.exports = function (config) {
  let opts = {}
  try {
    opts = ini.parse(fs.readFileSync('./.screepsrc', {encoding: 'utf8'}))
    opts = opts.pureAutomation || {}
    for (let k in opts) {
      if (opts[k] === 'false') opts[k] = false
      if (opts[k] === 'true') opts[k] = true
    }
  } catch (e) { }
  if (config.pureAutomation) opts = Object.assign(opts, config.pureAutomation)
  config.backend.on('expressPreConfig', (app) => {
    let router = express.Router()

    app.use('/api', router)
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
    if (opts.respawn === false) {
      router.post('/user/respawn', locked)
    }
    if (opts.placeSpawn === false) {
      router.post('/game/place-spawn', locked)
    }
    if (opts.upload === false) {
      router.post('/user/code', locked)
    }
    if (opts.memory === false) {
      router.post('/user/memory', locked)
      router.post('/user/memory-segment', locked)
    }
    if (opts.console === false) {
      router.post('/user/console', locked)
    }
    if (opts.setBranch === false) {
      router.post('/user/set-active-branch', locked)
    }
  })
}

function locked (req, res) {
  res.status(423)
  res.end()
}
