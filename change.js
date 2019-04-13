const mysql = require ('mysql');
document.getElementById('sub').addEventListener('click', ()=>{

    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Somenigga101',
        database: 'inventory_db',

    });

    con.connect();
    let username = document.getElementById('un').value;
    let sql = 'select `password` from users where username = ' + mysql.escape(username);
    con.query(sql, function (err, result) {
        //if(err) throw err;
       // window.alert("****" + err);
        let pass = document.getElementById('op').value;
        let npass = document.getElementById('np').value;
        let cnpass = document.getElementById('cnp').value;

        if(result[0] == null){
            document.getElementById('error').style.color = 'red';
            document.getElementById('error').innerHTML ="Wrong username";
            document.getElementById('un').value = '';
            document.getElementById('op').value = '';
            document.getElementById('np').value = '';
            document.getElementById('cnp').value = '';
        }else
        if(pass !== result[0].password){
            document.getElementById('error').style.color = 'red';
            document.getElementById('error').innerHTML ="Wrong old password";
            document.getElementById('op').value = '';
            document.getElementById('np').value = '';
            document.getElementById('cnp').value = '';
        }else
            if(npass !== cnpass){
                document.getElementById('error').style.color = 'red';
                document.getElementById('error').innerHTML ="Error! password should match";
                document.getElementById('np').value = '';
                document.getElementById('cnp').value = '';
            }else
            {
            con.query('UPDATE `users` SET `password` = "'+cnpass+'" where username = ' + mysql.escape(username), function (err) {
                //if (err) throw err;
               // window.alert(err);
                document.getElementById('error').style.color = 'green';
                document.getElementById('error').innerHTML ="Password changed successfully";
                document.getElementById('un').value = '';
                document.getElementById('op').value = '';
                document.getElementById('np').value = '';
                document.getElementById('cnp').value = '';
            });
            }

    });

});
