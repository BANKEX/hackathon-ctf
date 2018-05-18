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
  notReady: 'Not ready',
  notRinkeby: 'Please use Rinkeby Test Network'
}

class Result {
  static redyTasks(result) {
    let tasks = 0;
    if(result.timestamp1) tasks+=1;
    if(result.timestamp2) tasks+=1;
    if(result.timestamp3) tasks+=1;
    return tasks;
  }
  constructor( _userAddress, _timestamp1, _timestamp2, _timestamp3) {
    this.userAddress = _userAddress;
    this.timestamp1 = _timestamp1;
    this.timestamp2 = _timestamp2;
    this.timestamp3 = _timestamp3;
  }
}

/**
 * Generate random number of given length
 * @param  {number} len
 */
function rnd(len) {
  return Math.floor(Math.random() * Math.pow(10, len));
}

/**
 * Prepare timestamp
 * @param  {number} len
 */
function date(timestamp) {
  if (timestamp) {
    let str;
    let date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  } else {
    return messages.notReady;
  }
}

function getHackatonResults() {
  hackatonResults.next(mockedResults);
}

