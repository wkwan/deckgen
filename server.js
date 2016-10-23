var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var spawn = require('child_process').spawn;

app.use(cors());
app.use(bodyParser());

var port = process.env.PORT || 5000;

var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

// var index = require('./routes/index');

app.use(express.static(__dirname + '/public'));


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

// app.get('/', function (req, res) {
//     console.log("hohohoh");
//     // Product.find(function (err, products) {
//     //     res.send(products);
//     // });
//     // res.send('hello world');
//     res.sendfile('/app/public/index.html');
// });

// app.use('/', index);

app.post('/add', function (req, res) {
    // var name = req.body.name;
    // var product = new Product({name: name});
    // product.save(function (err) {
    //     res.send();
    // });

});

function Perceptron(input, hidden, output)
{
   // create the layers
   var inputLayer = new Layer(input);
   var hiddenLayer = new Layer(hidden);
   var outputLayer = new Layer(output);

   // connect the layers
   inputLayer.project(hiddenLayer);
   hiddenLayer.project(outputLayer);

   // set the layers
   this.set({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer
   });
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

app.post('/generate', function (req, res) {
    // console.log(req.body);
   console.log("gen deck");
   // var process = spawn('python',[__dirname + "/brain.py"]);
   // console.log('spawned');
   // process.stdout.on('data', function (data){
   //    console.log('got back ' + data);
   // });

   // var myPerceptron = new Perceptron(2,3,1);
   // var myTrainer = new Trainer(myPerceptron);
   //
   // myTrainer.XOR(); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

   // console.log(myPerceptron.activate([0,0])); // 0.0268581547421616

   var myLSTM = new Architect.LSTM(2,6,1)
   var trainingSet = [
      {
         input: [0,3],
         output: [0]
      },
      {
         input: [0,1],
         output: [1]
      },
      {
         input: [1,0],
         output: [1]
      },
      {
         input: [1,1],
         output: [0]
      },
   ]

   var trainer = new Trainer(myLSTM);

   trainer.train(trainingSet,{
      rate: .1,
      iterations: 20000,
      error: .005,
      shuffle: true,
      log: 1000,
      cost: Trainer.cost.CROSS_ENTROPY
   });

   console.log("activate the lstm " +  myLSTM.activate([0, 2]));
   console.log("activate the lstm " +  myLSTM.activate([0, 2]));
   console.log("activate the lstm " +  myLSTM.activate([0, 2]));
   console.log("activate the lstm " +  myLSTM.activate([0, 2]));
   console.log("activate the lstm " +  myLSTM.activate([0, 2]));
   console.log("activate the lstm " +  myLSTM.activate([0, 2]));
   console.log("activate the lstm " +  myLSTM.activate([0, 2]));
   console.log("activate the lstm " +  myLSTM.activate([0, 2]));


   res.send({'Excavated Evil' : 2, 'Cabal Shadow Priest' : 1})
});

app.listen(port);