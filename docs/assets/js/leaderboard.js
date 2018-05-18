
const mockedResults = [
  {teamId: 1, timestamp1: Date.now(), timestamp2: undefined, timestamp3: Date.now()},
  {teamId: 2, timestamp1: Date.now(), timestamp2: Date.now(), timestamp3: Date.now()},
  {teamId: 5, timestamp1: undefined, timestamp2: Date.now(), timestamp3: undefined},
  {teamId: 10, timestamp1: Date.now(), timestamp2: Date.now(), timestamp3: undefined},
]

const messages = {
  notReady: 'Not ready'
}

class Result {
  static redyTasks(result) {
    let tasks = 0;
    if(result.timestamp1) tasks+=1;
    if(result.timestamp2) tasks+=1;
    if(result.timestamp3) tasks+=1;
    return tasks;
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
