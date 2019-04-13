const sql = require('mysql');
const electron = require ('electron');
const url = require('url');
const path = require ('path');
const app = electron.app;
const ipc = electron.ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;
// function validateName() {
// 	let name = document.getElementById('fname').value;
//
// 		document.getElementById("Fn").innerHTML = name;
//
// }

// function producePrompt(msg, location, color) {
// 	document.getElementById(location).innerHTML = msg;
// 	document.getElementById(location).style = color;
// }
let error = document.getElementById('fError');
function isFNameCharacter() {
    let value =  document.getElementById('fname').value;
    if(/[^a-z]/ig.test(value)){
        error.innerHTML = 'Characters only buddy';
    }else{
        error.innerHTML = '';
    }
}
let lError = document.getElementById('lError');
function isLNameCharacter() {
    let value =  document.getElementById('lname').value;
    if(/[^a-z]/ig.test(value)){
        lError.innerHTML = 'Characters only buddy';
    }else{
        lError.innerHTML = '';
    }
}

// document.getElementById("tel").addEventListener("click", ()=>{
// 	console.log("Key up is responding");
// 	let result = document.getElementById("tel").value;
// 	let test;
// 	let telRegEx = /^[[+]\d+]/gi;
//
// 	test = telRegEx.test(result);
//
// 	if(test){
// 		console.log("NOT A NUMBER");
// 		document.getElementById("telError").innerHTML = "Numbers only buddy"
// 	}else{
// 		console.log("A number");
// 	}
// });

function isNumber(e){
    // let telephoneError = document.getElementById('telError');
    // 	var result = false;
    console.log("Key up is responding");
    // try {
    // 	var charCode = (e.which) ? e.which : e.keyCode;
    // 	if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105)) {
    // 		result = true;
    // 		telephoneError.innerHTML = "";
    // 	}else{
    // 		telephoneError.innerHTML = "Numbers only buddy";
    // 	}
    // }
    // catch(err) {
    // 	console.log(err);
    // }
    // return result;


}

function aSubmit(){
    //e.preventDefault();
    let userData = {};
    let foreName =  document.getElementById('fname');
    let lastName = document.getElementById('lname');
    let telephoneNumber = document.getElementById('tel');
    let idNumber =  document.getElementById('idNo');
    let email = document.getElementById('email');
    let userName = document.getElementById('Uname');
    let password =  document.getElementById('pass');

    validateEmptyInput(foreName.value, event);
    validateEmptyInput(lastName.value, event);
    validateEmptyInput(telephoneNumber.value, event);
    validateEmptyInput(idNumber.value, event);
    validateEmptyInput(email.value, event);
    validateEmptyInput(userName.value, event);
    validateEmptyInput(password.value, event);

    function validateEmptyInput ( value, e){
        let commonError = document.getElementById('common_error');
        if(value==='' ){
            commonError.innerHTML = "All fields are required";
            e.preventDefault();

        }else{
            commonError.innerHTML= '';
        }


    }


    userData.firstName =foreName.value;
    userData.lastName = lastName.value;
    userData.phoneNumber = telephoneNumber.value;
    userData.idNumber =idNumber.value;
    userData.email = email.value;
    userData.userName =userName .value;
    userData.password =password.value;

    //console.log(userData);

    // function passwordValidator(string){
    // 	let password = string.split("");
    // 	if(password.length<8){
    // 		return false;
    // 	}else{
    // 		let regEx = /\W*\w+\W*/gi;
    // 		if(regEx.test(string){
    // 			return true
    // 		}else{
    // 			return false;
    // 		}
    // 	}
    // }


    ipc.send('cAddUser', userData);
}
document.getElementById('sbt').addEventListener('click', () => {
    aSubmit()
});