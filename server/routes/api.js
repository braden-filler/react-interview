var express = require('express');
var router = express.Router();
var Event = require('../../src/models/event');

router.get('/', function(req, res){
  res.render('index')
});

router.route('/addEvent').post(function(req, res) {
  var event = new Event();
  event.title = req.body.title;
  event.date = req.body.date;
  event.time = req.body.time;
  console.log(req.body);
  event.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.send('Event successfully added!');
  });
});

router.get('/delete', function(req, res){
 var id = req.query.id;
 Event.find({_id: id}).remove().exec(function(err, event) {
  if(err)
   res.send(err)
  res.send('Event successfully deleted!');
 })
});

router.get('/getEvents',function(req, res) {
  Event.find().where('date').gte(new Date()).exec(function(err, events) {
   if (err){
    res.send(err);
   }
   res.json(events);
  });
});

router.get('/getEvents/older',function(req, res) {
  Event.find(function(err, events) {
   if (err){
    res.send(err);
   }
   res.json(events);
  });
});


module.exports = router;
