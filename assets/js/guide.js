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

function addToDom(key, data) {
    const container = document.getElementById("contentHere");
    // console.log("addToDom: "+key);
    const cardHtml = `
        <div class="card text-center mt-3">
                <div class="card-header" id="projectId">${data.projectID}</div>
                <div class="card-body">
                    <h5 class="card-title" id="header">${data.projectHeader}</h5>
                    <p class="card-text" id="body">${data.projectBody}</p>
                    <button type="button" class="btn btn-outline-dark" id="childKey" value="${key}" onclick="changeStatus(this)" data-toggle="modal"
                        data-target="#staticBackdrop">Check</button>
                    <button type="button" class="btn btn-outline-danger" id="childKey" value="${key}" onclick="uncheckStatus(this)" data-toggle="modal"
                        data-target="#staticBackdrop">Uncheck</button>
                    <input type="hidden" id="uniqueKey"></input>
                </div>
                <div class="card-footer text-muted" id="logDate">${data.log}</div>
            </div>`;
    const imageEl = document.createElement('div');
    imageEl.classList.add("col-12", "col-md-12")
    imageEl.innerHTML = cardHtml;
    container.appendChild(imageEl);
}

function addToDomChecked(key, data) {
    const container = document.getElementById("contentHere");
    const cardHtml = `
    <div class="card border-success text-center mt-3">
            <div class="card-header" id="projectId">${data.projectID}</div>
            <div class="card-body">
                <h5 class="card-title text-success" id="header">${data.projectHeader}</h5>
                <p class="card-text text-success" id="body">${data.projectBody}</p>
                <button type="button" class="btn btn-outline-danger" id="childKey" value="${key}" onclick="uncheckStatus(this)" data-toggle="modal"
                        data-target="#staticBackdrop">Uncheck</button>
            </div>
            <div class="card-footer text-muted" id="logDate">${data.log}</div>
        </div>`;
    const imageEl = document.createElement('div');
    imageEl.classList.add("col-12", "col-md-12")
    imageEl.innerHTML = cardHtml;
    container.appendChild(imageEl);
}

function addToDomunChecked(key, data) {
    const container = document.getElementById("contentHere");
    const cardHtml = `
    <div class="card border-danger text-center mt-3">
            <div class="card-header" id="projectId">${data.projectID}</div>
            <div class="card-body">
                <h5 class="card-title text-danger" id="header">${data.projectHeader}</h5>
                <p class="card-text text-danger" id="body">${data.projectBody}</p>
                <button type="button" class="btn btn-outline-dark" id="childKey" value="${key}" onclick="changeStatus(this)" data-toggle="modal"
                        data-target="#staticBackdrop">Check</button>
            </div>
            <div class="card-footer text-muted" id="logDate">${data.log}</div>
        </div>`;
    const imageEl = document.createElement('div');
    imageEl.classList.add("col-12", "col-md-12")
    imageEl.innerHTML = cardHtml;
    container.appendChild(imageEl);
}

function changeStatus(obj) {
    var uniqueId = obj.value;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            uid = firebase.auth().currentUser.uid;
            email = firebase.auth().currentUser.email;
            // console.log(uid);
            firebase.database().ref().child('projectid').once("value",
                function (snapshot) {
                    // console.log('here');
                    // console.log("unique id inside auth:" + uniqueId);
                    var tId = snapshot.child(uid).val();
                    kj = tId;
                    var status = firebase.database().ref(tId + '/' + uniqueId + '/status').set("ok");
                }
            )
            var reloadRef = firebase.database().ref(uniqueId + '/');
            reloadRef.on('child_added', function (data) {
                console.log("child added");
            });

            reloadRef.on('child_changed', function (data) {
                console.log("child changed");
            });
        }
        // $(body).empty();
        // setTimeout(function () {
        //     location.reload();
        // }, 2000)
    });

};

function uncheckStatus(obj) {

    var uniqueId = obj.value;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            uid = firebase.auth().currentUser.uid;
            email = firebase.auth().currentUser.email;
            // console.log(uid);
            firebase.database().ref().child('projectid').once("value",
                function (snapshot) {
                    // console.log('here');
                    // console.log("unique id inside auth:" + uniqueId);
                    var tId = snapshot.child(uid).val();
                    kj = tId;
                    var status = firebase.database().ref(tId + '/' + uniqueId + '/status').set("0");
                }
            )
            var reloadRef = firebase.database().ref(uniqueId + '/');
            reloadRef.on('child_added', function (data) {
                console.log("child added");
            });

            reloadRef.on('child_changed', function (data) {
                console.log("child changed");
            });
        }
        // $(body).empty();
        // setTimeout(function () {
        //     location.reload();
        // }, 2000)
    });

}

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            uid = firebase.auth().currentUser.uid;
            email = firebase.auth().currentUser.email;
            // console.log(uid);
            // console.log(email);
            // console.log('here2');

            firebase.database().ref().child('projectid').once("value",
                function (
                    snapshot) {
                    // console.log('here');
                    var tId = snapshot.child(uid).val();
                    // console.log("tId: " + tId);
                    const values = [];
                    var leadsRef = database.ref(tId + '/');
                    leadsRef.on('value', function (snapshot) {
                        snapshot.forEach(function (
                            childSnapshot) {
                            var childKey =
                                childSnapshot
                                .key;
                            console.log(childKey);
                            var childData =
                                childSnapshot
                                .val();
                            values.push({
                                childKey,
                                childData
                            });
                            // console.log(childData.log)
                        });
                        values.reverse().map((value) => {
                            if (value.childData.status == "ok") {
                                addToDomChecked(value.childKey, value
                                    .childData);
                            } else if (value.childData.status == "0") {
                                addToDomunChecked(value.childKey, value
                                    .childData);
                            } else {
                                addToDom(value.childKey, value
                                    .childData);
                            }

                        });
                        $(body).empty();
                        // console.log(values);
                        // console.log(values.log);
                    });

                })

        } else {
            // No user is signed in.

        }
    })
})