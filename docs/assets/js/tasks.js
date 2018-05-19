let myWeb3, contract, account, network, deployedAddressб, intDep, intSol;

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
  }
};

const deployFunc = async () => {
  const res = await contract.methods.createInstance(TASK).send({from: account});
  if (!res) throw new Error('Deploy fail');
  taskAddress.innerHTML = '...ожидайте...';
  intDep = setInterval(checkDeployed, 2000);
};

const getSolved = async () => {
  if (await contract.methods.getSolved(TASK).call({from: account})) {
    taskDeploy.style.display = 'none';
    taskCheck.style.display = 'none';
    taskSolved.style.display = 'block';
    taskAddress.innerHTML = '----';
    clearInterval(intSol);
  }
};

const sendSolve = async () => {
  const res = await contract.methods.checkSolved(TASK).send({from: account});
  if (!res) throw new Error('Check fail');
  taskAddress.innerHTML = '...ожидайте...';
  intSol = setInterval(getSolved, 2000);
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
