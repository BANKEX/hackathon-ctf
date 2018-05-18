function addProduct(tokenNum) {
    console.log(productId)
    productId[tokenNum] += 1;countProd
    document.getElementById('prodC'+tokenNum).innerHTML = productId[tokenNum]+'<br><br><br>';
    document.getElementById('prodT'+tokenNum).innerHTML = productNames[tokenNum]+'<br><br><br>';
    document.getElementById('prodD'+tokenNum).innerHTML = `<button id="delProd${tokenNum}" onclick="delProduct(${tokenNum})" class="btn btn-danger"><p class="pminus"><strong>-</strong></p></button><br><br>`;
}

function delProduct(tokenNum) {
    if (productId[tokenNum] > 0) {  
        productId[tokenNum] -= 1;
        if(productId[tokenNum] == 0) {
            document.getElementById('prodC'+tokenNum).innerHTML = '';
            document.getElementById('prodT'+tokenNum).innerHTML = '';
            document.getElementById('prodD'+tokenNum).innerHTML = '';
            return;
        }  
        document.getElementById('prodC'+tokenNum).innerHTML = productId[tokenNum]+'<br><br><br>';
        document.getElementById('prodT'+tokenNum).innerHTML = productNames[tokenNum]+'<br><br><br>';
        document.getElementById('prodD'+tokenNum).innerHTML = `<button id="delProd${tokenNum}" onclick="delProduct(${tokenNum})" class="btn btn-danger"><p class="pminus"><strong>-</strong></p></button><br><br>`;
    }
}

function proceedToСheckout() {
    var checkCountOfProducts = 0;
    for (let i in productId) {
        if (productId[i] > 0) {
            checkCountOfProducts += 1;
        }
    }
    if (checkCountOfProducts > 0) {
        localStorage.setItem('pay', productId[1] + "," + productId[2] + "," + productId[3] + "," + productId[4] + "," + productId[5] + "," + productId[6] + "," + productId[7] + "," + productId[8] + "," + productId[9] + "," +productId[10] + "," + productId[11] + "," + productId[12]  +","+ productId[13] + "," + productId[14] + "," + productId[15] +","+ productId[16] + "," + productId[17] + "," + productId[18] + "," + productId[19] + "," + productId[20]);
        
    } else {
        
    }
}

function cancelPay() {
    localStorage.removeItem('pay');
}

function kp(e) {
 
    if (e) keyCode = e.which
    else if (event) keyCode=event.keyCode
    else return
    if (keyCode == keys["1"] ) document.getElementById("addProd1").click()
    if (keyCode == keys["2"] ) document.getElementById("addProd2").click()
    if (keyCode == keys["3"] ) document.getElementById("addProd3").click()
    if (keyCode == keys["4"] ) document.getElementById("addProd4").click()
    if (keyCode == keys["5"] ) document.getElementById("addProd5").click()
    if (keyCode == keys["q"] ) document.getElementById("addProd6").click()
    if (keyCode == keys["w"] ) document.getElementById("addProd7").click()
    if (keyCode == keys["e"] ) document.getElementById("addProd8").click()
    if (keyCode == keys["r"] ) document.getElementById("addProd9").click()
    if (keyCode == keys["t"] ) document.getElementById("addProd10").click()
    if (keyCode == keys["a"] ) document.getElementById("addProd11").click()
    if (keyCode == keys["s"] ) document.getElementById("addProd12").click()
    if (keyCode == keys["d"] ) document.getElementById("addProd13").click()
    if (keyCode == keys["f"] ) document.getElementById("addProd14").click()
    if (keyCode == keys["g"] ) document.getElementById("addProd15").click()
    if (keyCode == keys["z"] ) document.getElementById("addProd16").click()
    if (keyCode == keys["x"] ) document.getElementById("addProd17").click()
    if (keyCode == keys["c"] ) document.getElementById("addProd18").click()
    if (keyCode == keys["v"] ) document.getElementById("addProd19").click()
    if (keyCode == keys["b"] ) document.getElementById("addProd20").click()
    if (keyCode == keys["!"] ) document.getElementById("delProd1").click()
    if (keyCode == keys["@"] ) document.getElementById("delProd2").click()
    if (keyCode == keys["#"] ) document.getElementById("delProd3").click()
    if (keyCode == keys["$"] ) document.getElementById("delProd4").click()
    if (keyCode == keys["%"] ) document.getElementById("delProd5").click()
    if (keyCode == keys["Q"] ) document.getElementById("delProd6").click()
    if (keyCode == keys["W"] ) document.getElementById("delProd7").click()
    if (keyCode == keys["E"] ) document.getElementById("delProd8").click()
    if (keyCode == keys["R"] ) document.getElementById("delProd9").click()
    if (keyCode == keys["T"] ) document.getElementById("delProd10").click()
    if (keyCode == keys["A"] ) document.getElementById("delProd11").click()
    if (keyCode == keys["S"] ) document.getElementById("delProd12").click()
    if (keyCode == keys["D"] ) document.getElementById("delProd13").click()
    if (keyCode == keys["F"] ) document.getElementById("delProd14").click()
    if (keyCode == keys["G"] ) document.getElementById("delProd15").click()
    if (keyCode == keys["Z"] ) document.getElementById("delProd16").click()
    if (keyCode == keys["X"] ) document.getElementById("delProd17").click()
    if (keyCode == keys["C"] ) document.getElementById("delProd18").click()
    if (keyCode == keys["V"] ) document.getElementById("delProd19").click()
    if (keyCode == keys["B"] ) document.getElementById("delProd20").click()
    if (keyCode == 13 ) document.getElementById("goToTx").click()
    
  }
  document.onkeypress=kp;
   
   
   
  if (navigator.appName == 'Netscape') {
      window.captureEvents(Event.KEYPRESS);
      window.onKeyPress = kp;
  } 
document.getElementById('scanStream').innerHTML = `<video id="preview"></video>`;
    createScanner((err, content) => { 

    })

// если баланс ноль, очищать стораж