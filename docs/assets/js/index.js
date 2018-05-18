/**
 * Allows get the allowed balances to specified address
 * @param {string} cashboxAddress The cashbox ethereum address
 * @param {string} customerAddress Customer address
 * @param {function(string, string, string)} callback Token balances
 */

async function checkAllowanceOfTokens(contractOwnerAddress, customerAddress, callback) {
    function getAllowance(i, contractOwnerAddress, customerAddress) {
        return new Promise((resolve, reject) => {
            allowance(i, contractOwnerAddress, customerAddress, (err, balance) => {
                if (err) {
                    resolve("Subtoken " + i + " is not created");
                } else {
                    resolve(balance);
                }
            })
        });
    }
    let tokenBalance1 = getAllowance(1, contractOwnerAddress, customerAddress);
    let tokenBalance2 = getAllowance(2, contractOwnerAddress, customerAddress);
    let tokenBalance3 = getAllowance(3, contractOwnerAddress, customerAddress);
    let tokenBalance4 = getAllowance(4, contractOwnerAddress, customerAddress);
    let tokenBalance5 = getAllowance(5, contractOwnerAddress, customerAddress);
    let tokenBalance6 = getAllowance(6, contractOwnerAddress, customerAddress);
    let tokenBalance7 = getAllowance(7, contractOwnerAddress, customerAddress);
    let tokenBalance8 = getAllowance(8, contractOwnerAddress, customerAddress);
    let tokenBalance9 = getAllowance(9, contractOwnerAddress, customerAddress);
    let tokenBalance10 = getAllowance(10, contractOwnerAddress, customerAddress);
    let tokenBalance11 = getAllowance(11, contractOwnerAddress, customerAddress);
    let tokenBalance12 = getAllowance(12, contractOwnerAddress, customerAddress);
    let tokenBalance13 = getAllowance(13, contractOwnerAddress, customerAddress);
    let tokenBalance14 = getAllowance(14, contractOwnerAddress, customerAddress);
    let tokenBalance15 = getAllowance(15, contractOwnerAddress, customerAddress);
    let tokenBalance16 = getAllowance(16, contractOwnerAddress, customerAddress);
    let tokenBalance17 = getAllowance(17, contractOwnerAddress, customerAddress);
    let tokenBalance18 = getAllowance(18, contractOwnerAddress, customerAddress);
    let tokenBalance19 = getAllowance(19, contractOwnerAddress, customerAddress);
    let tokenBalance20 = getAllowance(20, contractOwnerAddress, customerAddress);

    var balances = await Promise.all([
        tokenBalance1,
        tokenBalance2,
        tokenBalance3,
        tokenBalance4,
        tokenBalance5,
        tokenBalance6,
        tokenBalance7,
        tokenBalance8,
        tokenBalance9,
        tokenBalance10,
        tokenBalance11,
        tokenBalance12,
        tokenBalance13,
        tokenBalance14,
        tokenBalance15,
        tokenBalance16,
        tokenBalance17,
        tokenBalance18,
        tokenBalance19,
        tokenBalance20
    ]);
    console.log(balances)
    callback(balances);
}

/**
 * Gets balances of tokens to current hour
 */

async function onLoadPage() {
    let subtokenSupply1 = await new Promise((resolve, reject) => {
        totalSupply(1, (err, supply) => {
            if (err) {
                resolve("Subtoken 1 is not created");
            } else {
                resolve(supply);
            }
        })
    });

    let subtokenSupply2 = await new Promise((resolve, reject) => {
        totalSupply(2, (err, supply) => {
            console.log(err)
            if (err) {
                resolve("Subtoken 2 is not created");
            } else {
                resolve(supply);
            }
        })
    });

    let subtokenSupply3 = await new Promise((resolve, reject) => {
        totalSupply(3, (err, supply) => {
            if (err) {
                resolve("Subtoken 3 is not created");
            } else {
                resolve(supply);
            }
        })
    });

    getPeriod();
    document.getElementById('Breakfast_tokens').innerText = subtokenSupply1;
    document.getElementById('Dinner_tokens').innerText = subtokenSupply2;
    document.getElementById('Supper_tokens').innerText = subtokenSupply3;
}

/**
 * It's time to breakfast/lunch/supper 
 * And total allowed N tokens
 */

function getPeriod() {
    // let currentHour = new Date(Date.now()).getHours();
    // let tokenNumber;
    // let itsTimeTO;

    // if (currentHour >= 5 && currentHour < 12) {
    //     itsTimeTO = 'Breakfast';
    //     tokenNumber = 1;
    // } else if (currentHour >= 12 && currentHour <= 17) {
    //     itsTimeTO = 'Lunch';
    //     tokenNumber = 2;
    // } else {
    //     itsTimeTO = 'Supper';
    //     tokenNumber = 3;
    // }

    // document.getElementById('period_status').innerText = itsTimeTO;
    // return tokenNumber;
}

function getPeriodAndAllowedToken() {
    var cashboxPrivateKey = localStorage.getItem('prvtKey');
    var cashboxAddress = localStorage.getItem('cashboxAddress');
    if (!cashboxAddress) {
        let cashboxAddress = prompt("Введите адрес кассы", '');
        localStorage.setItem('cashboxAddress', cashboxAddress);
    }
    if (!cashboxPrivateKey) {
        let prvtKey = prompt("Введите privateKey для кассы", '');
        localStorage.setItem('prvtKey', prvtKey);
    }
    // allowedToken(getPeriod());
}

/**
 * Set token total supply
 * @param {number} tokenNumber Token Number to current hour
 */
function allowedToken(tokenNumber) {
    // totalSupply(tokenNumber, (err, supply) => {
    //     if (err) {
    //         alert(`Subtoken ${tokenNumber} is not created`);
    //     } else {
    //         document.getElementById('allowedTokens').innerText = supply;
    //     }
    // })
}

/**
 * Decrease approval from customer's address
 * @param {string} customerAddress Customer's address
 */

function spendToken(customerAddress) {
    document.getElementById('txSuccessOrNot').innerHTML =
        `
        <div class="alert alert-dismissible alert-success">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 class="alert-heading">Ожидайте</h4>
        <h2>Операция выполняется</h2>
        </div>
    `;
    pay(customerAddress, (isTrue) => {
        if (isTrue == true) {
            document.getElementById('txSuccessOrNot').innerHTML =
                `
                <div class="alert alert-dismissible alert-success">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <h4 class="alert-heading">Успешно!</h4>
                <h2>Оплата завершена</h2>
                </div>
            `;

            setTimeout(() => {
                localStorage.removeItem('pay');
                document.getElementById('txSuccessOrNot').innerHTML = '';
            }, 8000);
        }
    });
}

function pay(customerAddress, callback) {
    if (!localStorage.getItem('pay')) {
        document.getElementById('txSuccessOrNot').innerHTML =
            `
                <div class="alert alert-dismissible alert-success">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <h4 class="alert-heading">Ошибка</h4>
                <h2>Вы должны сделать заказ на кассе!</h2>
                </div>
            `;
        setTimeout(() => {
            localStorage.removeItem('pay');
            document.getElementById('txSuccessOrNot').innerHTML = '';
        }, 6000);
    } else {
        let basket = localStorage.getItem('pay').split(',');

        checkAllowanceOfTokens(getAddress(localStorage.getItem('prvtKey')), customerAddress, (balances) => {
            var err = false;
            var counterForNonce = 0;
            var counterForArrIndex = 0;
            for (let i in basket) {
                if (basket[i] > balances[i]) {
                    err = true;
                    console.log(productNames[i + 1])
                    console.log(productNames[1]);
                    document.getElementById('txSuccessOrNot').innerHTML =
                        `
                            <div class="alert alert-dismissible alert-danger">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <h4 class="alert-heading">Ошибка!</h4>
                            <h2>Недостаточно средств для покупки ${productNames[Number(i)+1]}</h2>
                            </div>
                        `
                    document.getElementById('txSuccessOrNot').innerHTML =
                        `
                            <div class="alert alert-dismissible alert-danger">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <h4 class="alert-heading">Ошибка!</h4>
                            <h2>Недостаточно средств для покупки ${productNames[Number(i)+1]}</h2>
                            </div>
                        `
                    setTimeout(() => {
                        document.getElementById('txSuccessOrNot').innerHTML = '';
                        localStorage.removeItem('pay');
                    }, 6000);
                    return;
                } else if (basket[i] > 0) {
                    if (err) {
                        return;
                    }
                    getPay(Number(web3.eth.getTransactionCount(getAddress(localStorage.getItem('prvtKey')))) + counterForNonce, counterForArrIndex, customerAddress);
                    counterForNonce+=2;
                    counterForArrIndex++;
                }
            }

            function getPay(nonce, i, customerAddress) {
                decreaseApproval(nonce, Number(i)+1, localStorage.getItem('prvtKey'), customerAddress, basket[Number(i)], (err, txHash) => {
                    if (err) {
                        localStorage.removeItem('pay');
                        alert('Failed');
                        return;
                    }
                });
                transfer(Number(nonce)+1, Number(i)+1, localStorage.getItem('prvtKey'), localStorage.getItem('cashboxAddress'), basket[Number(i)], (err, txHash) => {
                    localStorage.setItem(customerAddress, Date.now());
                    localStorage.setItem(Date.now(), Number(i) + 1);
                    document.getElementById('txHash').innerText = "Last transaction: " + txHash;
                });
            }
            callback(true);
        });
    }
}

/**
 * 1. Camera turns on
 * 2. Scanned QR code
 * 3. The address and balances for tokens are displayed
 */

function startStream() {
    document.getElementById('startVideoStream').innerHTML = `<video id="preview"></video>`;
    createScanner((err, content) => {
        let decryptedAddress = decryptAddress(content, "123");
        let lastUseThisAddress = localStorage.getItem(decryptedAddress);

        if (!lastUseThisAddress || Number(lastUseThisAddress) + 10000 < Date.now()) {
            if (Object.keys(localStorage).length > 40) {
                for (let i in localStorage) {
                    if (i.substring(2) == "15") {
                        localStorage.removeItem(i);
                    }
                }
            }
            if (decryptedAddress == "") {
                document.getElementById('txSuccessOrNot').innerHTML =
                    `<div class="alert alert-dismissible alert-danger">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <h4 class="alert-heading">Error!</h4>
                    <h2>Invalid address</h2>
                    </div>
                    `
                setTimeout(() => {
                    document.getElementById('txSuccessOrNot').innerHTML = '';
                }, 2000);
            } else {
                spendToken(decryptedAddress);
            }
        } else {
            document.getElementById('txSuccessOrNot').innerHTML =
                `<div class="alert alert-dismissible alert-danger">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <h4 class="alert-heading">Error!</h4>
                    <h2>You can get food no sooner than in 10 seconds</h2>
                    </div>
                    `
            setTimeout(() => {
                document.getElementById('txSuccessOrNot').innerHTML = '';
            }, 2000);
        }
    });
}