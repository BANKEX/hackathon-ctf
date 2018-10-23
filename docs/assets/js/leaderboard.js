const { Observable, Subject, ReplaySubject, from, of, range } = rxjs;
const hackatonResults = new Subject();

const messages = {
  notReady: 'Not ready',
  notRinkeby: 'Please use Rinkeby Test Network',
  submitedAt: 'The result was obtained in',
}

class Result {
  static countFinishedTasks(tasks, count = 0) {
    Object.keys(tasks).forEach((key, index) => tasks[key] && (count +=1))
    return count;
  }
  constructor( _userAddress) {
    this.userAddress = _userAddress;
    this.tasks = {};
    this.tasks['BrokenVisaCard'] = undefined;
    this.tasks['CALLapse'] = undefined;
    this.tasks['Dividends'] = undefined;
    this.tasks['Lottery'] = undefined;
    this.tasks['PlasmaChain'] = undefined;
    this.score = undefined;
    this.timestampScore = undefined;
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
    let date = new Date(timestamp);
    return `${messages.submitedAt+' '+('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}:${('0'+date.getSeconds()).slice(-2)}`;
  } else {
    return messages.notReady;
  }
}

getHackatonResults = async (streamReader) =>  {
  // const rowData = {};
  // const solvedEvents = await contract.getPastEvents(
  //   'Solved', { fromBlock: 0});
  // solvedEvents.forEach((event, index, array) => {
  //   const { amount, factoryName, participantAddress, timestamp}  = event.returnValues;
  //   if (rowData[participantAddress]) {
  //     rowData[participantAddress][factoryName] = [timestamp, amount]
  //   } else {
  //     let content = {};
  //     content[factoryName] = [timestamp, amount];
  //     rowData[participantAddress] = content;
  //   }
  // });
  // // console.log(rowData);
  // getUserNames(rowData);
  // const results = [];
  // Object.keys(rowData).forEach((address, index, array) => {
  //   const tasks = rowData[address];
  //   const result = new Result(address);
  //   result.score = 0;
  //   result.timestampScore = 0;
  //   result.tasks = {};
  //   Object.keys(tasks).forEach((taskName, index, array) => {
  //     const task = tasks[taskName];
  //     result.tasks[taskName] = task[0]*1000;
  //     result.score += +task[1];
  //     result.timestampScore += +task[0]*task[1];
  //   });
  //  results.push(result);
  //});

  console.log(results)
  hackatonResults.next(results);
}

getUserNames = async (addresses) => {
  await Promise.all(Object.keys(addresses).map(async(address) => {
    const name = await contract.methods.participantName(address).call();
    userNames[address] = name;
  }));
}

async function fetchData(request) {
  fetch(request).then(data => data.json()).then(results => hackatonResults.next(results));
}

