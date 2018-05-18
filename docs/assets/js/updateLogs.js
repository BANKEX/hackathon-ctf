setInterval(() => {
    var logsHTML = '';
    var logsArr = [];

    var counter = 0;
    for (let i in localStorage) {
        if (i.substring(0,2) == "15") {
            var date = String(new Date(Number(i)));
            logsArr.push(
                `
                <tr>
                        
                        <td>${date.substring(0, date.length - 15)}</td>
                        <td>${productNames[Number(localStorage[i])]}</td>
                        
                              
                </tr>
                    
                `
            );
        }  
    }

    for (let g = logsArr.length-1; g >= 0; g--) {
        logsHTML += logsArr[g];
    }

    document.getElementById('tx_logs').innerHTML = logsHTML;
}, 5000);