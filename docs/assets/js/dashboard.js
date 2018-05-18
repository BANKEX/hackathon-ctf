/**
 * Allows to create new subtoken
 */

function createToken() {
    // loginOwner();
    let tokenID = document.getElementById("createTokenID").value;
    let ownerPrvtKey = document.getElementById("createTokenOwnerPrvtKey").value;
    let tokenOwner = document.getElementById("createTokenTokenOwner").value;
    let supply = document.getElementById("createTokenTotalSupply").value;

    if (tokenID == "" || ownerPrvtKey == "" || supply == "" || tokenOwner == "") {
        alert("You did not complete all the fields");
        return;
    }

    createNewSubtoken(web3.eth.getTransactionCount(getAddress(senderPrvtKey)),ownerPrvtKey, tokenID, tokenOwner, supply, (err, txHash) => {
        if (err) {
            console.log(err)
            alert("Faild");
            return;
        }
        alert("Success");
    });
}

/**
 * Generates new ethereum address
 */

function createRandomAddress() {
    var randomAddress = getAddress(createNewAccount());
    document.getElementById("randomAddress").innerText = randomAddress;
}

/**
 * Encrypt entered ethereum address by password
 */

function encryptPassedAddress() {
    let address = document.getElementById("encryptAddress").value;
    let password = document.getElementById("cryptoPassword").value;

    if (address == "" || password == "") {
        alert("You did not complete all the fields");
        return;
    }

    let encryptedAddress = encryptAddress(address, password);
    document.getElementById("encryptedAddress").innerText = encryptedAddress;
    createQRCode(encryptedAddress);
}

/**
 * Decrypt entered ethereum address by password
 */

function decryptEncryptedAddress() {
    let address = document.getElementById("decryptAddress").value;
    let password = document.getElementById("cryptoPassword").value;

    if (address == "" || password == "") {
        alert("You did not complete all the fields");
        return;
    }

    let encryptedAddress = decryptAddress(address, password);

    if (encryptedAddress == "") {
        alert("Wrong password");
        return;
    }

    document.getElementById("decryptedAddress").innerText = encryptedAddress;
}

/**
 * Allows to approve customers ethereum address
 */

function approveCustomer() {
    // loginOwner()
    let tokenID = document.getElementById("approveTokenID").value;
    let senderPrvtKey = document.getElementById("approveSenderPrvtKey").value;
    let spenderAddress = document.getElementById("approveSpenderAddress").value;
    let value = document.getElementById("approveValue").value;

    if (tokenID == "" || senderPrvtKey == "" || spenderAddress == "" || value == "") {
        alert("You did not complete all the fields");
        return;
    }
    
    approve(web3.eth.getTransactionCount(getAddress(senderPrvtKey)),tokenID, senderPrvtKey, spenderAddress, value, (err, success) => {
        if (err || success == false) {
            alert("Faild");
            return;
        }
        alert("Success");
    });
}

/**
 * Allows to increase approval to customer ethereum address
 */

function increaseCustomerApproval() {
    // loginOwner()
    let tokenID = document.getElementById("increaseApprovalTokenID").value;
    let senderPrvtKey = document.getElementById("increaseApprovalSenderPrvtKey").value;
    let spenderAddress = document.getElementById("increaseApprovalSpenderAddress").value;
    let addedValue = document.getElementById("increaseApprovalValue").value;

    if (tokenID == "" || senderPrvtKey == "" || spenderAddress == "" || addedValue == "") {
        alert("You did not complete all the fields");
        return;
    }

    increaseApproval(web3.eth.getTransactionCount(getAddress(senderPrvtKey)),tokenID, senderPrvtKey, spenderAddress, addedValue, (err, success) => {
        if (err || success == false) {
            alert("Faild");
            return;
        }
        alert("Success");
    });
}

/**
 * Allows to decrease approval to customer ethereum address
 */

function decreaseCustomerApproval() {
    // loginOwner()
    let tokenID = document.getElementById("decreaseApprovalTokenID").value;
    let senderPrvtKey = document.getElementById("decreaseApprovalSenderPrvtKey").value;
    let spenderAddress = document.getElementById("decreaseApprovalSpenderAddress").value;
    let subtractedValue = document.getElementById("decreaseApprovalValue").value;

    if (tokenID == "" || senderPrvtKey == "" || spenderAddress == "" || subtractedValue == "") {
        alert("You did not complete all the fields");
        return;
    }

    decreaseApproval(web3.eth.getTransactionCount(getAddress(senderPrvtKey)),tokenID, senderPrvtKey, spenderAddress, subtractedValue, (err, success) => {
        if (err || success == false) {
            alert("Faild");
            return;
        }
        alert("Success");
    });
}

/**
 * Shows customer's approval
 */

function customerAllowance() {
    let tokenID = document.getElementById("allowanceTokenID").value;
    let ownerAddress = document.getElementById("allowanceOwnersAddress").value;
    let spenderAddress = document.getElementById("allowanceSpenderAddress").value;

    if (tokenID == "" || ownerAddress == "" || spenderAddress == "") {
        alert("You did not complete all the fields");
        return;
    }

    allowance(tokenID, ownerAddress, spenderAddress, (err, balance) => {
        if (err) {
            alert("Faild");
            return;
        }
        document.getElementById("allowanceCount").value = balance;
    });
}

function createQRCode(text) {
    (function() {
        const qr = new QRious({
        element: document.getElementById('qrcode'),
        value: text
        });
        qr.size = 300;
    })();
}

/**
 * Checks total supply of specified token
 */


function checkTotalSupply() {
    let tokenID = document.getElementById('totalSupplyTokenID').value;

    if (tokenID == "") {
        alert("You did not complete all the fields");
        return;
    }

    totalSupply(tokenID, (err, supply) => {
        if (err) {
            alert('Token is not yet created');
            return;
        }
        document.getElementById('totalSupply').innerText = String(supply);
    });
}

/**
 * Checks balance of specified address
 */

function checkBalanceOf() {
    let tokenID = document.getElementById('balanceOfTokenID').value;
    let address = document.getElementById('balanceOfAddress').value;

    if (tokenID == "" || address == "") {
        alert("You did not complete all the fields");
        return;
    }

    balanceOf(tokenID, address, (err, balance) => {
        if (err) {
            alert('Token is not yet created');
            return;
        }
        document.getElementById('balance').innerText = String(balance);
    });
}

/**
 * Transfer token to specified address
 */

function transferToken() {
    // loginOwner()
    let tokenID = document.getElementById('transferTokenID').value;
    let senderPrvtKey = document.getElementById('transferPrvtKey').value;
    let addressTo = document.getElementById('transferAddressTo').value;
    let value = document.getElementById('transferValue').value;

    if (tokenID == "" || senderPrvtKey == "" || addressTo == "" || value == "") {
        alert("You did not complete all the fields");
        return;
    }

    transfer(web3.eth.getTransactionCount(getAddress(senderPrvtKey)),tokenID, senderPrvtKey, addressTo, value, (err, success) => {
        if (err || success == false) {
            alert('Faild');
            return;
        }
        alert('Success');
    });
}

/**
 * Transfer token from another address to specified address
 */

function transferTokenFrom() {
    // loginOwner()
    let tokenID = document.getElementById('transferFromTokenID').value;
    let senderPrvtKey = document.getElementById('transferFromPrvtKey').value;
    let addressFrom = document.getElementById('transferFromAddressFrom').value;
    let addressTo = document.getElementById('transferFromAddressTo').value;
    let value = document.getElementById('transferFromValue').value;

    if (tokenID == "" || senderPrvtKey == "" || addressTo == "" || value == "" || addressFrom == "") {
        alert("You did not complete all the fields");
        return;
    }

    transferFrom(web3.eth.getTransactionCount(getAddress(senderPrvtKey)),tokenID, senderPrvtKey, addressFrom, addressTo, value, (err, success) => {
        if (err || success == false) {
            alert('Faild');
            return;
        }
        alert('Success');
    });
}