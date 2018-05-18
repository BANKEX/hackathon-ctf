if (typeof web3 !== 'undefined') {
  window.web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
