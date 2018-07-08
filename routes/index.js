module.exports = function(app){
    var view = require('./view/scrape');
    // var api = require('./api');

    app.use('/',view);
}