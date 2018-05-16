var fs = require('fs');
var csv = require('fast-csv');
var BigNumber = require('bignumber.js');

const Web3 = require('web3');


if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

let distribData = new Array();
let allocData = new Array();
let fullFileData = new Array();
let balances = new Array();

async function parseTimestamp() {

  console.log(`
    --------------------------------------------
    ------------Getting Timestamps--------------
    --------------------------------------------
  `);

  //console.log("DIS",parseInt(distribData2));

  for(var i = 0;i< distribData.length;i++){
    try{
        //console.log("DIS",Number(distribData2[i]));
        console.log("Attempting to find balance for address:",distribData[i],"\n\n");
        //var blockNumber = web3.eth.blockNumber;
        //console.log("blockNumber:",blockNumber,"\n\n");

        var balance = web3.eth.getBalance('0xf9478412c9570b1952e1cd6c4f03fbbc4f0f28ca',5589955);
        console.log("Found balance:",balance,"\n\n");

        balances.push(balance);

    } catch (err){
      console.log("ERROR:",err);
    }
  }
  writeFile();
}


function readFile() {
  var stream = fs.createReadStream("data/input2.csv");

  console.log(`
    --------------------------------------------
    --------- Parsing csv file ---------
    --------------------------------------------
  `);

  var csvStream = csv()
      .on("data", function(data){
          if(data[0]!=null && data[0]!='' ){
             allocData.push(data[0]);
             fullFileData.push(data[0]);

             distribData.push(allocData);
             allocData = [];
          }
      })
      .on("end", function(){
        parseTimestamp();
      });

  stream.pipe(csvStream);
}

function writeFile() {
  var fast_csv = csv.createWriteStream();
  var writeStream = fs.createWriteStream("data/output2.csv");

  console.log(`
    --------------------------------------------
    --------- Writing csv file -----------------
    --------------------------------------------
  `);

  fast_csv.pipe(writeStream);

  for(var i = 0; i < timestamps.length; i++){
    fast_csv.write( [ distribData[i],balances[i] ] );             //each element inside bracket
  }
  fast_csv.end();

}

console.log("Processing balances");
readFile();
