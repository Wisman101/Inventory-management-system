const electron = require ('electron');
// const url = require('url');
// const path = require ('path');
// const app = electron.app;
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const mysql = require('mysql');
document.getElementById('rUser').addEventListener('click', ()=>{
    document.getElementById('ru').style.visibility = "visible";
});

function submit() {
    ipc.send('back', '');
}
function addUser(){
    ipc.send('addUser', '');
}
function addStock(){
    ipc.send('addStock', '');
}
function logOut(){
    ipc.send('show', '');
}
document.getElementById('home').addEventListener('click', function (event) {
    submit();
    let window = remote.getCurrentWindow();
    window.close();

});
document.getElementById('aUser').addEventListener('click', () => {
    addUser()
});
document.getElementById('aStock').addEventListener('click', () => {
    addStock()
});
document.getElementById('logOut').addEventListener('click', function (event) {
    logOut();
    let window = remote.getCurrentWindow();
    window.close();
});

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Somenigga101',
    database: 'inventory_db',

});

con.connect();
let sql = 'SELECT * FROM `users` where status = 1 ';
//let sql = 'SELECT password FROM login WHERE username = ' + mysql.escape(arg.userName);
con.query(sql, function(err, result) {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
        document.getElementById('all').innerHTML += '<tr><td>' + result[i].user_id + '</td><td>' + result[i].fname + '</td><td>' + result[i].lname + '</td>' +
            '<td>' + result[i].id_no + '</td><td>' + result[i].contact + '</td><td>' + result[i].email + '</td></tr>';
    }
});
    let sqli = 'SELECT * FROM `stock`';
//let sql = 'SELECT password FROM login WHERE username = ' + mysql.escape(arg.userName);
    con.query(sqli, function (err, results) {
        if (err) throw err;
        for (let j = 0; j < results.length; j++) {
            document.getElementById('alls').innerHTML += '<tr><td>' + results[j].stock_id + '</td><td>' + results[j].name_description + '</td><td>' + results[j].keyword +
                '</td>' + '<td>' + results[j].quantity_available + '</td><td>' + results[j].unit_of_measure + '</td><td>' + results[j].price_per_unit +
                '</td></tr>';
        }


    });
document.getElementById('rem').addEventListener('click', ()=>{
    let userId = document.getElementById('ui').value;
    con.query('UPDATE `users` SET `status` = '+0+' WHERE user_id = ' + mysql.escape(userId), function (err) {
        window.alert(err)
        //     document.getElementById('com').style.color ='red';
        //     document.getElementById('com').innerHTML = "userId doesn't exist!"
        // }else{
        //     document.getElementById('com').innerHTML = 'user Removed successfully'
        // }
    });
});

