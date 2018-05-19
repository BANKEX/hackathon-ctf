let myWeb3, contract, account, network;

const start = async () => {
  try {
    myWeb3 = checkAndInstantiateWeb3();
    const init = await initConnection(myWeb3);
    account = init.account;
    network = init.network;
    if (network === 1) throw new Error('Wrong network');
    contract = new myWeb3.eth.Contract(abi, contractAddress);
    if (!await checkAuth()) funcButton();
  } catch(e) {
    alert(e);
    console.error(e);
  }
};

const checkAuth = async () => {
  const auth = await contract.methods.getSignedUp().call({from: account});
  if (auth) {
    regButton.disabled = true;
    teamName.innerHTML = await contract.methods.getTeamName().call({from: account});
    setTimeout(() => {window.location.href = 'tasks1.html'}, 1000);
  } else return false;
};

const funcButton = () => {
  regButton.disabled = false;
  regButton.onclick = regSubmit;
};

const regSubmit = async () => {
  try {
    if (team.value === '') throw new Error('Введите название команды');
    regButton.disabled = true;
    await checkAuth();
    const res = await contract.methods.signUp(team.value).send({from: account});
    if (!res) {
      regButton.disabled = false;
      throw new Error('Registration failed');
    }
    teamName.innerHTML = `Ожидайте, идет регистрация команды ${team.value}`;
    setInterval(checkAuth, 2000);
  } catch (e) {
    alert(e);
    console.log(e);
  }
};

window.onload = start;
