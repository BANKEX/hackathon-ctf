let myWeb3, contract, account, network, deployedAddress, intDep, intSol;

const checkAuth = async () => {
  return await contract.methods.getSignedUp().call({from: account});
};

const funcTusk = () => {
  taskDeploy.onclick = deployFunc;
  taskCheck.onclick = sendSolve;
};

const checkDeployed = async () => {
  deployedAddress = await contract.methods.getInstance(TASK).call({from: account});
  if (deployedAddress !== '0x0000000000000000000000000000000000000000') {
    taskCheck.disabled = false;
    taskAddress.innerHTML = deployedAddress;
    clearInterval(intDep);
    return true;
  } else return false;
};

const deployFunc = async () => {
  const oa = taskAddress.innerHTML;
  taskAddress.innerHTML = '...please wait...';
  try {
    const res = await contract.methods.createInstance(TASK).send({from: account});
    if (!res) throw new Error('Deploy fail');
    if (!await checkDeployed()) {
      intDep = setInterval(checkDeployed, 2000);
    }
  } catch (e) {
    if (e.message.indexOf('User denied transaction signature')!==-1) {
      taskAddress.innerHTML = oa;
    } else {
      throw new Error(e);
    }
  }
};

const getSolved = async () => {
  if (await contract.methods.getSolved(TASK).call({from: account})) {
    taskDeploy.style.display = 'none';
    taskCheck.style.display = 'none';
    taskSolved.style.display = 'block';
    taskAddress.innerHTML = '----';
    clearInterval(intSol);
    return true;
  } else false;
};

const sendSolve = async () => {
  const oa = taskAddress.innerHTML;
  taskAddress.innerHTML = '...please wait...';
  try{
    const res = await contract.methods.checkSolved(TASK).send({from: account});
    if (!res) throw new Error('Check fail');
    if (!await getSolved()) {
      alert('The task is not solved');
      taskAddress.innerHTML = oa;
    }
  } catch (e) {
    if (e.message.indexOf('User denied transaction signature')!==-1) {
      taskAddress.innerHTML = oa;
    } else {
      throw new Error(e);
    }
  }
};

const start = async () => {
  try {
    myWeb3 = checkAndInstantiateWeb3();
    const init = await initConnection(myWeb3);
    account = init.account;
    network = init.network;
    if (network === 1) throw new Error('Wrong network');
    contract = new myWeb3.eth.Contract(abi, contractAddress);
    const auth = await checkAuth();
    if (!auth) window.location.href = 'team_reg.html';
    teamName.onclick = () => window.location.href = 'team_reg.html'
    teamName.style.cursor = 'pointer';
    teamName.innerHTML = await contract.methods.getTeamName().call({from: account});
    funcTusk();
    await checkDeployed();
    await getSolved();
  } catch(e) {
    alert(e);
    console.error(e);
  }
};

window.onload = start;
