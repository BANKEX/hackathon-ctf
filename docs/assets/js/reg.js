let myWeb3, contract, account, network;

const start = async () => {
  try {
    myWeb3 = checkAndInstantiateWeb3();
    const init = await initConnection(myWeb3);
    account = init.account;
    network = init.network;
    if (network === 1) throw new Error('Wrong network');
    contract = new myWeb3.eth.Contract(abi, contractAddress);
    if (await checkAuth()) {
      yourTeamEl.classList.add('d-block');
      teamName.innerHTML = await contract.methods.getTeamName().call({from: account});
      leaveButton.onclick = () => window.location.href = 'tasks1.html';
      inviteButton.onclick = () => invite(mate.value);
    } else {
      createTeamEl.classList.add('d-block')
      regButton.onclick = regSubmit;
      const invitations = await getInvitations(account);
      if (Object.keys(invitations).length === 0) { return; }
      Object.keys(invitations).forEach(key => {
        const el = document.createElement('div');
        el.classList.add('col-md-12', 'text-center', 'p-2');
        el.innerHTML = `
          <span class="teamname p-3">${invitations[key]}</span>
          <button type="button" class="btn btn-success" data-team="${key}" name="joinButton">
            Присоединиться
          </button>
        `;
        el.onclick = acceptInvitation.bind(this, key);
        joinTeamEl.appendChild(el);
      })
      joinTeamEl.classList.add('d-block');
    };
  } catch(e) {
    alert(e);
    console.error(e);
  }
};

const checkAuth = async () => await contract.methods.getSignedUp().call({from: account});

const regSubmit = async () => {
  try {
    if (team.value === '') throw new Error('Enter the name of the team');
    if (team.value.length < 6) throw new Error('The name must be more than five characters');
    regButton.disabled = true;
    setInfo(`Please wait, there is a team registration ${team.value}`);
    try {
      const pEvent = contract.methods.signUpTeam(team.value).send({from: account});
      pEvent
        .then(success => {
          if (!success) {
            regButton.disabled = false;
            throw new Error('Registration failed');
          }
          window.location.reload();
        })
    } catch (e) {
      if (e.message.indexOf('User denied transaction signature')!==-1) {
        teamName.innerHTML = '';
        regButton.disabled = false;
        resetInfo();
      } else {
        throw new Error(e);
        resetInfo();
      }
    }
  } catch (e) {
    alert(e);
    resetInfo();
    regButton.disabled = false;
  }
};

const invite = async (address) => {
  try {
    if (address === '') throw new Error('Enter team name');
    if (!myWeb3.utils.isAddress(address)) throw new Error('Invalid address');
    inviteButton.disabled = true;
    setInfo('An invitation is sent, wait');
    const pEvent = contract.methods.inviteMember(address).send({from: account});
    pEvent
      .then(success => {
        if (!success) {
          regButton.disabled = false;
          throw new Error('Invitation failed');
        }
        setInfo('Invitation sent');
      }).catch(e => {
        resetInfo();
        inviteButton.disabled = false;
        if (e.message.indexOf('User denied transaction signature')!==-1) {
        } else {
          alert(e);
        }
      })
  } catch (e) {
    resetInfo();
    inviteButton.disabled = false;
    if (e.message.indexOf('User denied transaction signature')!==-1) {
    } else {
      alert(e);
    }
  }
}

const acceptInvitation = async (address) => {
  try {
    if (address === '') throw new Error('No teams');
    if (!myWeb3.utils.isAddress(address)) throw new Error('Invalid team address');
    $('button[name="joinButton"]').toArray().forEach(el => el.disabled = true);
    setInfo('Connect to the team, wait');
    const pEvent = contract.methods.acceptInvitation(address).send({from: account});
    pEvent
      .then(success => {
        if (!success) {
          $('button[name="joinButton"]').toArray().forEach(el => el.disabled = false);
          throw new Error('Invitation failed');
        }
        setTimeout(() => window.location.reload(), 5000);
      }).catch(function(e) {
        resetInfo();
        $('button[name="joinButton"]').toArray().forEach(el => el.disabled = false);
        if (e.message.indexOf('User denied transaction signature')!==-1) {
        } else {
          alert(e);
        }
      })
  } catch (e) {
    resetInfo();
    $('button[name="joinButton"]').toArray().forEach(el => el.disabled = false);
    if (e.message.indexOf('User denied transaction signature')!==-1) {
    } else {
      alert(e);
    }
  }
}

const getInvitations = async (address) => {
  try {
    if (!myWeb3.utils.isAddress(address)) throw new Error('Invalid address');
    const invitations = await contract.getPastEvents('Invite', {
      filter: {participantAddress: address},
      fromBlock: 0,
      toBlock: 'latest'
    })
    const results = {};
    for (let i = 0; i < invitations.length; i += 1){
      const inv = invitations[i].returnValues;
      if (!results.participantTeamAddress) {
        results[inv.participantTeamAddress] = await contract.methods.participantName(inv.participantTeamAddress).call();
      }
    };
    return(results);
  } catch (err) {
    alert(err);
  }
}

const setInfo = (msg) => info.innerHTML = msg;

const resetInfo = () => info.innerHTML = '';

window.onload = start;
