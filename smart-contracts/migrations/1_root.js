const Root = artifacts.require("./Root.sol");

let tasks = ["BrokenVisaCard", "CALLapse", "Dividends", "Lottery", "PlasmaChain"];
// const cryptoAddresses = ["0xff55a7b95adEe5d578b1aB182350A8b765119097", "0xc658C6cE553e14cc30439E424ff74dcFD21c2E43", "0xd59b3C1c8E35Ae98EB2c16F672C471549aBA01DB", "0xCaDcf41B2676fa4f910c7C55C890F4BcDD0CBca7", "0xB3fd9919dBd9db534078097Ac17d8c28e9d5F20b"];

module.exports = (deployer, network, accounts) => {
    async function deploy(contract, operator, params){
        params = typeof params !== 'undefined' ?  params : [];
        params = [contract].concat(params).concat([{"from" : operator}]);
        await deployer.deploy.apply(deployer, params);
        return await contract.deployed()
    }

    const operator = accounts[0];

    deployer.then(async function () {
        const root = await deploy(Root, operator, "1540706400");
        const deployedTasks = [];
        for (let i in tasks)
            deployedTasks.push(await deploy(artifacts.require("./Factory"+tasks[i]+".sol"), operator));
        for (let i in deployedTasks) {
            await root.addFactory(deployedTasks[i].address, {from: operator})
            console.log(`Address ${deployedTasks[i].address} was successfully added to Root Contract`)
        }
    });

};