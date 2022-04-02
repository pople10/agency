const express = require("express");
const app = express();
const RequestIp = require('@supercharge/request-ip');
const fetch = require('node-fetch');
var visit = require("./visitsModule");
var contact = require("./contactModule");
const bodyParser = require("body-parser");
const validator = require("./validatorModule");

/* Middlewres for configuration */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
/* APIs */

app.use("/public",express.static('public'))

app.use(function (req, res, next) {
  const ip_address = RequestIp.getClientIp(req);
    fetch("http://ipinfo.io/"+ip_address+"/json")
    .then(response => response.json())
    .then(data => 
    {
        visit.fullfill(data);
        visit.insert();
        console.log({status:"done"});
		next();
    });
})

app.post("/api/contact",function(req,res)
{
    if(req.body.email===null || req.body.email===undefined || !validator.isEmail(req.body.email))
        res.status(403).json({status:"Email est invalide"});
    if(req.body.name===null || req.body.name===undefined || !validator.isName(req.body.name))
        res.status(403).json({status:"Nom est invalide"});
    if(req.body.subject===null || req.body.subject===undefined || validator.isEmpty(req.body.subject))
        res.status(403).json({status:"Message est vide"});
    contact.fullfill(req.body.name,req.body.email,req.body.subject);;
    try{
        contact.sendEmailToAdminFR();
        contact.sendEmailToGuestFR();
        res.json({status:"Envoyé avec succès"});
    }catch(e)
    {
        res.status(403).json({status:"L'email ne peut pas envoyer\nVeuillez envoyer une autre fois ou contactez-nous!"});
    }
});

app.post("/api/visit",function(req, res){
    const ip_address = RequestIp.getClientIp(req);
    fetch("http://ipinfo.io/"+ip_address+"/json")
    .then(response => response.json())
    .then(data => 
    {
        visit.fullfill(data);
        visit.insert();
        res.json({status:"done"});
    });
});
/* Rendering pages */
app.get("/",function(req,res){
    res.render("index");
});
/* Middleware for error pages */
app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

app.use(function(err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(err.status || 500);
      res.render('404');
});
app.listen(5055/*we can add the port here*/);
