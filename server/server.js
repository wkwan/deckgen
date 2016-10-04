var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser());

var port = Number(process.env.PORT || 5000);



// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/jetbrains');

// var Product = mongoose.model('Product', {name: String});
//
// var product = new Product({name: 'Webstorm'});
// product.save(function (err) {
//     if (err) {
//         console.log('failed');
//     } else {
//         console.log('saved');
//     }
// });

app.get('/', function (req, res) {
    console.log("hohohoh");
    // Product.find(function (err, products) {
    //     res.send(products);
    // });
});

app.post('/add', function (req, res) {
    // var name = req.body.name;
    // var product = new Product({name: name});
    // product.save(function (err) {
    //     res.send();
    // });

});

app.post('/generate', function (req, res) {
    // console.log(req.body);
   res.send({'Excavated Evil' : 2, 'Cabal Shadow Priest' : 1})
});

app.listen(port);