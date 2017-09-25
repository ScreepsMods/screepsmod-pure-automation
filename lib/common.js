const EventEmitter = require('events').EventEmitter
module.exports = function(config){
  // This exposes config.example.test to other mods (Note: Its best if the other mods are loaded after this one)
  config.pureAutomation = new EventEmitter()
  Object.assign(config.pureAutomation, {
    enabled: true,
    enable: function() {
      config.pureAutomation.enabled = true
    },
    disable: function() {
      config.pureAutomation.enabled = false
    }
  })
}