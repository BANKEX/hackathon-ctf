var Root = artifacts.require("./Root.sol");

var tasks = ["FastFlow", "JoiCasino", "LEGO", "Kamikaze", "Vault"];



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

  })();

  
};