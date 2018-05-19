async function initConnection(web3) {
  let account, network;
  if (!web3 || !web3.currentProvider) throw new Error('No Web3 provider found');
  const accounts = await web3.eth.getAccounts();
  if (!accounts) throw new Error('No Web3 provider found');
  if (!accounts[0]) throw new Error('Web3 provider is locked');
  account = accounts[0];
  network = await web3.eth.net.getId();
  return {account, network};
}

// Returns ready-to-go Web3 instacne
function checkAndInstantiateWeb3() {
  // tslint:disable:max-line-length
  // Checking if Web3 has been injected by the browser
  if (typeof web3 != 'undefined') {
    console.warn(
      'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
    );
    return new Web3(web3.currentProvider);
  } else {
    console.warn(
      'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    return new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }
}
