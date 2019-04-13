const electron = require ('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const mysql = require('mysql');
let Id;

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Somenigga101',
    database: 'inventory_db',

});
con.connect();

document.getElementById('sell').addEventListener('click', ()=>{
    let number_of_entries = k-1;
    let user_id = Id;
    let grand_price = document.getElementById('tp').value;

    if(set === true){
        con.query('INSERT INTO `transactions`(user_id, no_of_entries, grand_price) VALUES ("'+user_id+'","'+number_of_entries+'",' +
            '"'+grand_price+'")', function(err) {
                if(err){
                    document.getElementById('comment').innerHTML = "Internal server error!"
                }else{
                    document.getElementById('comment').style.color = "green";
                    document.getElementById('comment').innerHTML = "Sale completed succesfully";
                }
        });

        for(let i=1; i<=number_of_entries; i++){
            let stock_id = 0;
            let trans_id= 0;
            let keyword = document.getElementById('kw'+i).value;

            let sql = 'SELECT `stock_id` FROM `stock` where keyword = ' + mysql.escape(keyword);

            con.query(sql, function (err, resul){
                stock_id = resul[0].stock_id;

                let sqli = 'SELECT `trans_id` FROM `transactions` ORDER BY trans_id DESC LIMIT 1';
                con.query(sqli, function (error, resuls){
                    trans_id = resuls[0].trans_id;

                    let sq = 'INSERT INTO `sales` (stock_id, trans_id, quantity_sold, total_price) VALUES ("'+stock_id+'","'+trans_id+'","'+quantity+'",' +
                        '"'+totalPrice+'")';
                    con.query(sq, function (err) {
                        if(err){
                            console.log(err);
                            document.getElementById('comment').innerHTML = "Internal server error!"
                        }else{
                            document.getElementById('comment').style.color = "green";
                            document.getElementById('comment').innerHTML = "Sale completed succesfully";
                        }
                    })
                });
            });

            let quantity = document.getElementById('q'+i).value;
            let totalPrice = document.getElementById('pr'+i).value;
        }
        return false;

    }else{
        document.getElementById('comment').innerHTML = "Internal server error!";
    }
});

//displaying all the stock available
document.getElementById('sum').addEventListener('click', ()=>{
    document.getElementById('alls').innerHTML = '';
    let sqli = 'SELECT * FROM `stock`';
    con.query(sqli, function (err, results) {
        if (err) throw err;
        for (let j = 0; j < results.length; j++) {
            document.getElementById('alls').innerHTML += '<tr><td>' + results[j].stock_id + '</td><td>' + results[j].name_description + '</td><td>' + results[j].keyword +
                '</td>' + '<td>' + results[j].quantity_available + '</td><td>' + results[j].unit_of_measure + '</td><td>' + results[j].price_per_unit +
                '</td></tr>';
        }
    });
});

//getting user's details from the main processes
    ipc.send('isAdmin', '');

//receiving the user's details from the main process
//displaying the relevant details
    ipc.on('user', function (event, arg, ar, ag, a, id) {
        if (arg === 1) {
            document.getElementById('admin').style.visibility = "visible";
        }
        document.getElementById('username').innerHTML = ar;
        document.getElementById('font').style.fontSize = '20px';
        document.getElementById('font').innerHTML += ag + ' ' + a;
        Id = id;
    });

//add event listener for the admin button
//close the home window and call function submit onclick
    document.getElementById('admin').addEventListener('click', function () {
        //data();
        submit();
        let window = remote.getCurrentWindow();
        window.close();

    });

//add event listener for the logout button
//close the home window and call function logout onclick
    document.getElementById('logOut').addEventListener('click', function (event) {
         logOut();
        let window = remote.getCurrentWindow();
        window.close();
    });

    //opens the admins window
    function submit() {
        ipc.send('admin', '');
    }

    //opens the login window
    function logOut() {
        ipc.send('show', '');
    }




