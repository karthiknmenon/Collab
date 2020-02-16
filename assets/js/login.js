var firebaseConfig = {
    apiKey: "AIzaSyCQRgYkdCyqtzGrvUnTEghX9UdGc-6f7fE",
    authDomain: "test-ckwtsw.firebaseapp.com",
    databaseURL: "https://test-ckwtsw.firebaseio.com",
    projectId: "test-ckwtsw",
    storageBucket: "test-ckwtsw.appspot.com",
    messagingSenderId: "640912972565",
    appId: "1:640912972565:web:8a0266535494dadea2271c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
// firebase.analytics();
$("#login-button").click(function (event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        $(".error").show(2000);
        $('#errorText').text(errorMessage);
    });
});
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        window.location.href = "review.html";
    } else {

        console.log("Signed Out!");
    }
});