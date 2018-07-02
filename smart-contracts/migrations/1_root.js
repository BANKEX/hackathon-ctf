var Root = artifacts.require("./Root.sol");

var tasks = ["FastFlow", "JoiCasino", "LEGO", "Kamikaze", "Vault", "FactoryDoubleTapVote"];
var cryptoAddresses = ["0x635a457b2c04cfc57a6d6553b2254af624c42e23", "0x98af0a02278fa978d0cdd006f0dab3692cd0d680", "0xdeeb17af769dd158fccb12208907833f2dd03215", "0xd52f3792c3afabd246113ef058c5671b6baa0191"];



module.exports = function(deployer, network, accounts) {
  async function deploy(contract, operator, params){
    params = typeof params !== 'undefined' ?  params : [];
    params = [contract].concat(params).concat([{"from" : operator}]);
    await deployer.deploy.apply(deployer, params);
    return await contract.deployed()
  }

  const operator = accounts[0];
  (async () => {
    let rootPromise = deploy(Root, operator, (Math.floor(Date.now()/1000) + 3600*24*2).toString());
    tasks = await Promise.all(tasks.map(t=>deploy(artifacts.require("./Factory"+t+".sol"), operator)));
    let root = await rootPromise;
    await Promise.all(tasks.map(t=> root.addFactory(t.address)));
    await Promise.all(cryptoAddresses.map(a => root.addFactory(a)));
  })();

};