var Root = artifacts.require("./Root.sol");

var tasks = ["FastFlow", "JoiCasino", "LEGO"];



module.exports = function(deployer, network, accounts) {
  async function deploy(contract, operator){
    await deployer.deploy(contract, {"from" : operator});
    return await contract.deployed()
  }

  const operator = accounts[0];
  (async () => {
    let rootPromise = deploy(Root, operator);
    tasks = await Promise.all(tasks.map(t=>deploy(artifacts.require("./Factory"+t+".sol"), operator)));
    let root = await rootPromise;
    await Promise.all(tasks.map(t=> root.addFactory(t.address)));

  })();

  
};