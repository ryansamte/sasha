var firebaseConfig = {
    apiKey: "AIzaSyDslGg-UDKf6EZE04uXx1kX1Q02lJTQhCk",
    authDomain: "webapp-28ce9.firebaseapp.com",
    databaseURL: "https://webapp-28ce9.firebaseio.com",
    projectId: "webapp-28ce9",
    storageBucket: "webapp-28ce9.appspot.com",
    messagingSenderId: "608100955334",
    appId: "1:608100955334:web:a2b4a9bb22a0db1e0a13c7",
    measurementId: "G-04NST0ZK8K"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


document.addEventListener("DOMContentLoaded", ()=>{
    const login = document.getElementById("login");
    const createAccount = document.getElementById("createAccount");

    document.getElementById("linkCreateAccount").addEventListener("click", (e)=>{
        e.preventDefault();

        login.classList.add("form--hidden");
        createAccount.classList.remove("form--hidden");
    });

    document.getElementById("linkLogin").addEventListener("click", (e)=>{
        e.preventDefault();

        login.classList.remove("form--hidden");
        createAccount.classList.add("form--hidden");
    });
});

let contactSaved = firebase.database().ref("Users");

document.querySelector(".form--hidden").addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();

    var username = document.querySelector(".username").value;
    var email = document.querySelector(".email").value;
    var password = document.querySelector(".password").value;
    var passwordConfirmed = document.querySelector(".passwordConfirmed").value;
    console.log(username, email, password, passwordConfirmed);

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response){

        console.log(response);

        let newContactSaver = contactSaved.push();

        newContactSaver.set({
            username: username,
            email: email,
            password: password,
            passwordConfirmed: passwordConfirmed,
        });
    });

    document.querySelector(".form--hidden").reset();
}

document.getElementById("login").addEventListener("submit", function(e) {
    e.preventDefault();

    var email = document.getElementById('email');
    var password = document.getElementById('password');

    if(email != null && password != null){
        var loginMe = firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(function(user) {
            console.log('success');
            window.location.href="community.html";
        });

        loginMe.catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert(errorCode);
            console.log(errorMessge + "login successfully");
        });
    }
});