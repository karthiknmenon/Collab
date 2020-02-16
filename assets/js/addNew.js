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
var ref = firebase.database().ref();
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' at ' + time;

$("#logout-button").click(function (event) {
    event.preventDefault();
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location.href = "login.html";
    }).catch(function (error) {
        // An error happened.
    });
});
var tId, uid, email;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        uid = firebase.auth().currentUser.uid;
        email = firebase.auth().currentUser.email;
        console.log(uid);
        // console.log(email);
        // console.log('here2');

        firebase.database().ref().child('projectid').once("value", function (snapshot) {
            // console.log('here');
            var tId = snapshot.child(uid).val();
            console.log(tId);

            document.getElementById('projectid').value = tId;
            document.getElementById('email').value = email;
        })

    } else {
        // No user is signed in.

    }
});
$("#writeForm").submit(function (e) {
    e.preventDefault();
})

function fetchValues() {
    // e.preventDefault();
    var pb = document.querySelector("#pbody").value;
    var ph = document.querySelector("#pheader").value;
    console.log("Body:" + pb);
    console.log("Header:" + ph);
    writeUserData(pb, ph);
}

function writeUserData(body, header) {
    var tId, uid, email;
    // var newPostKey = firebase.database().ref().child('/data/').push().key;
    // console.log("newpostKey:" + newPostKey);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            uid = firebase.auth().currentUser.uid;
            email = firebase.auth().currentUser.email;
            console.log(uid);
            // console.log(email);
            // console.log('here2');

            firebase.database().ref().child('projectid').once("value", function (snapshot) {
                // console.log('here');
                var tId = snapshot.child(uid).val();
                console.log("tId: " + tId);
                firebase.database().ref(tId + '/').push({
                    projectID: String(tId),
                    projectHeader: String(header),
                    projectBody: String(body),
                    log: String(dateTime),
                    status: "null"
                });
            })
            // $("#pheader").value="";
            // $("#pbody").value="";

        } else {
            // No user is signed in.

        }
    });


}
$(document).ready(function () {
    // console.log("ready");
    return firebase.database().ref('/data/').once('value').then(function (snapshot) {
        // var projectID = (snapshot.val() && snapshot.val().projectBody) || 'Anonymous';
        var projectID = (snapshot.val() && snapshot.val().projectID);
        console.log(projectID);
        var projectHeader = (snapshot.val() && snapshot.val().projectHeader);
        console.log(projectHeader);
        var projectBody = (snapshot.val() && snapshot.val().projectBody);
        console.log(projectBody);
    });

})