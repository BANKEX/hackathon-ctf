async function initConnection(web3, turnOfTheCheckFlag) {
  try {
    if (!web3 || !web3.currentProvider) throw new Error('No Web3 provider found');
    let accounts, account, network;
    accounts = await web3.eth.getAccounts();
    if (!accounts) throw new Error('No Web3 provider found. Have you installed Metamask?');
    if (!accounts[0]) throw new Error('Metamask is locked!');
    account = accounts[0];
    network = await web3.eth.net.getId();
    return {account, network};
  } catch(e) {
    if (turnOfTheCheckFlag) { return false; }
    alert((web3.currentProvider.host?'No Metamask found - connecting to local provider. Error: ':'')+e.message);
  }
}

function getTeamAddressByUserAddress(contract, address) {
  return contract.methods.teamHash(address).call();
}

// Returns ready-to-go Web3 instacne
function checkAndInstantiateWeb3() {
  // tslint:disable:max-line-length
  // Checking if Web3 has been injected by the browser
  if (typeof web3 !== 'undefined') {
    //console.info('Connected with Metamask');
    return new Web3(web3.currentProvider);
  } else {
    console.info('No metamask detected. Falling back to http://localhost:8545.');
    return new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }
}
