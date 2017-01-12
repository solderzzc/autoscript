var Nightmare = require('nightmare');       

var total = process.env.TOTAL || 1

function init(){

var nightmare = Nightmare({ show: false, 
  webPreferences: {
    partition: 'persist: testing'
}});

Nightmare.action('clearCache',
  function(name, options, parent, win, renderer, done) {
    parent.respondTo('clearCache', function(done) {
      //win.webContents.session.clearCache(done);
    });
    done();
  },
  function(done) {
    this.child.call('clearCache', done);
  });

nightmare
  .goto('http://demo-cloud.apps.58dahuo.com/')
  .wait(10000)
  .wait('#playbtn')
  .click('#playbtn')
  .evaluate(function () {
                return 'ok';
            })
  .wait(29000)
  .end()
  .then(function (result) {
    console.log(result);
    setTimeout(function(){
      init()
    },3000)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
    setTimeout(function(){
      init()
    },3000)
  });
}
for (var i=1;i<=total;i++){
  setTimeout(init,i*1000)
}
