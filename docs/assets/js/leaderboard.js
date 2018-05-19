const { Observable, Subject, ReplaySubject, from, of, range } = rxjs;
// const { map, filter, switchMap } = rxjs.operators;

const hackatonResults = new Subject();
const mockedResults = [
  {userAddress: '0x1231235', timestamp1: Date.now(), timestamp2: undefined, timestamp3: Date.now()},
  {userAddress: '0x1233123', timestamp1: Date.now(), timestamp2: Date.now(), timestamp3: Date.now()},
  {userAddress: '0x4563257', timestamp1: undefined, timestamp2: Date.now(), timestamp3: undefined},
  {userAddress: '0x1236456', timestamp1: Date.now(), timestamp2: Date.now(), timestamp3: undefined},
]

const messages = {
  notReady: 'Не готова',
  notRinkeby: 'Please use Rinkeby Test Network'
}

class Result {
  static readyTasks(result) {
    const count = Object.keys(result.tasks).length;
    return count;
  }
  constructor( _userAddress = undefined) {
    this.userAddress = _userAddress;
    this.score = undefined;
    this.timestampScore = undefined;
    this.tasks = {};
  }
}

/**
 * Generate random number of given length
 * @param  {number} len
 */
rnd = (len) => {
  return Math.floor(Math.random() * Math.pow(10, len));
}

/**
 * Prepare timestamp
 * @param  {number} len
 */
date = (timestamp) => {
  if (timestamp) {
    let str;
    let date = new Date(timestamp);
    return `${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}:${('0'+date.getSeconds()).slice(-2)}`;
  } else {
    return messages.notReady;
  }
}

getHackatonResults = async () =>  {
  const rowData = {};
  const solvedEvents = await contract.getPastEvents(
    'Solved', { fromBlock: 0});
  solvedEvents.forEach((event, index, array) => {
    const { amount, factoryName, participantAddress, timestamp}  = event.returnValues;
    if (rowData[participantAddress]) {
      rowData[participantAddress][factoryName] = [timestamp, amount]
    } else {
      let content = {};
      content[factoryName] = [timestamp, amount];
      rowData[participantAddress] = content;
    }
  });
  // console.log(rowData);
  getUserNames(rowData);
  const results = [];
  Object.keys(rowData).forEach((address, index, array) => {
    const tasks = rowData[address];
    const result = new Result(address);
    result.score = 0;
    result.timestampScore = 0;
    result.tasks = {};
    Object.keys(tasks).forEach((taskName, index, array) => {
      const task = tasks[taskName];
      result.tasks[taskName] = task[0]*1000;
      result.score += +task[1];
      result.timestampScore += +task[0]*task[1];
    });
    results.push(result);
  });
  //console.log(results)
  //console.log(userNames)
  hackatonResults.next(results);
}

getUserNames = async (addresses) => {
  await Promise.all(Object.keys(addresses).map(async(address) => {
    const name = await contract.methods.participantName(address).call();
    userNames[address] = name;
  }));
}

