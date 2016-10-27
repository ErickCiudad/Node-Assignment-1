var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send all the promoes to you!');
})

.post(function(req, res, next){
    res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting all promoes');
});

promoRouter.route('/:promoId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the promo: ' + req.params.promoId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the promo: ' + req.params.promoId + '\n');
    res.end('Will update the promo: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting promo: ' + req.params.promoId);
});

app.use('/promoes',promoRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
