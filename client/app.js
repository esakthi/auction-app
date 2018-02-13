//web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var web3 = require("web3");
window.onload = function () {
  let accounts = web3.eth.accounts; //create local variable for easy access
  let maxBid = Math.ceil (Math.random () * 1000); //the maximum bid placed by the end of the auction
  let status = document.getElementById ('status');
  Auction.new ({from: accounts [0]}) //create new contract object
    .then ( (contract) => {
      contract.AuctionClosed ().watch ( (err, response) => {  //set up listener for the AuctionClosed Event
        //once the event has been detected, take actions as desired
        status.innerHTML = 'The auction has ended! Highest Bid is ' + response.args.highestBid;
      });
      setTimeout ( () => {  //simulate an auction for 3 seconds, after which the creator closes the auction
        contract.closeAuction (maxBid, {from: accounts [0]});
      }, 3000);
    })
    .catch ( (err) => {
      status.innerHTML = 'Some error occured. I guess shit happens =(';
    });
};