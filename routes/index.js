var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = require('../models/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/credits', function(req, res, next) {
    res.render('credits');
});

router.get('/quizzes', function(req, res, next) {
    sequelize.models.quiz.findAll()
        .then(quizzes => {
            res.render('quizzes', {quizzes});
        })
        .catch(Sequelize.ValidationError, error => {
            errorlog('El quiz es erroneo:');
            error.errors.forEach(({message}) => errorlog(message));
        })
        .catch(error => {
            errorlog(error.message);
        })

});

module.exports = router;

