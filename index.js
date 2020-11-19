const firebaseConfig = {
    apiKey: "AIzaSyDzMxIcY-puVE7ul2QcI4GYIyn1V6owJXQ",
    authDomain: "jsbugtracker.firebaseapp.com",
    databaseURL: "https://jsbugtracker.firebaseio.com",
    projectId: "jsbugtracker",
    storageBucket: "jsbugtracker.appspot.com",
    messagingSenderId: "73963561169",
    appId: "1:73963561169:web:a2bf79837b6afebad7e5f0"
};

firebase.initializeApp(firebaseConfig);

const issuesRef = firebase.database().ref('issues');

function readIssues() {
    issuesRef.orderByChild("date").on("value", function(snapshot) {
        snapshot.forEach(snap => {
            const issue = snap.val();
            
            document.getElementById("issuesList").innerHTML += `
                <div class="card" id="${issue.id}">
                    <div class="card-body">
                        <h6 class="card-title">${issue.desc}</h6>
                        <p>Issue ID: ${issue.id}</p>
                        <p><span class="label label-info">Status: ${issue.status}</span></p>
                        <p><span class="glyphicon glyphicon-time">Priority Level: ${issue.priority}</span></p>
                        <p><span class="glyphicon glyphicon-user">Date created: ${issue.date}</span></p>
                        ` +
                        statusButton(issue)
                        +
                        ` 
                        <button onclick="deleteIssue('${issue.id}')" class="btn btn-danger mx-3">Delete</button>
                    </div>
                </div>
            `
        })
    }
)}

const filterButtons = document.querySelector('.filterButtons');

filterButtons.addEventListener('click', filterIssues);

function filterIssues(e) {
    document.getElementById('issuesList').innerHTML = "";
    const priorityLevel = e.target.innerHTML;
    readFilteredIssues(priorityLevel);
}

function readFilteredIssues(filterOption) {
    if (filterOption === "All") renderCurrentData();
    issuesRef.orderByChild('priority').equalTo(filterOption).on("value", function(snapshot) {
        snapshot.forEach(snap => {
            const issue = snap.val();
            
            document.getElementById("issuesList").innerHTML += `
                <div class="card mb-3" id="${issue.id}">
                    <div class="card-body">
                        <h6 class="card-title">${issue.desc}</h6>
                        <p>Issue ID: ${issue.id}</p>
                        <p><span class="label label-info">Status: ${issue.status}</span></p>
                        <p><span class="glyphicon glyphicon-time">Priority Level: ${issue.priority}</span></p>
                        <p><span class="glyphicon glyphicon-user">Date created: ${issue.date}</span></p>
                        ` +
                        statusButton(issue)
                        +
                        ` 
                        <button onclick="deleteIssue('${issue.id}')" class="btn btn-danger mx-3">Delete</button>
                    </div>
                </div>
            `
        })
    }
)}

function statusButton(issue) {
    if (issue.status === "Open") {
        return `<button onclick="setStatusClosed('${issue.id}')" id="closeButton" class="btn btn-warning mx-3">Close</button>`
    } else {
        return `<button onclick="setStatusOpen('${issue.id}')" id="openButton" class="btn btn-warning mx-3">Open</button>`
    }
}

function renderCurrentData() {
    document.getElementById('issuesList').innerHTML = "";
    readIssues();
}

document.getElementById("newIssueForm").addEventListener("submit", e => {
    e.preventDefault()

    const desc = document.getElementById("issueDescInput").value;
    const priority = document.getElementById("priorityLevelInput").value;
    const date = Date();
    const status = "Open";
    const id = generateId();
    
    newIssueForm.reset();
    
    saveIssue(desc, priority, date, status, id);
})

function generateId() {
    const newDate = new Date();

    const date = newDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).replace(/[^0-9]/g, "");
    
    const time = newDate.getTime().toString();

    return date + time;
}

function saveIssue(desc, priority, date, status, id) {    
    issuesRef.child(`${id}`).set({
        desc: desc,
        id: id,
        status: status,
        priority: priority,
        date: date
    });

    renderCurrentData();
}

function setStatusClosed(id) {
    issuesRef.child(id).update({
        "status": "Closed"
    })
    
    renderCurrentData();
}

function setStatusOpen(id) {
    issuesRef.child(id).update({
        "status": "Open"
    })
    
    renderCurrentData();
}

function changeStatus() {
    
}

function deleteIssue(id) {
    issuesRef.child(id).remove();
    
    renderCurrentData();
}

/////////////////////// AUTHENTICATION ///////////////////////

const auth = firebase.auth();

const email = document.getElementById('txtEmail');
const password = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

btnSignUp.addEventListener('click', signUp);
btnLogin.addEventListener('click', login);

function signUp() {
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert('Signed Up!');
}

function login() {
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert('Signed in ' + email.value);
}

function logout() {
    auth.signOut();
    alert('Signed out')
}

auth.onAuthStateChanged(function(user) {
    if (user) {
        const email = user.email;
        alert('Active User ' + email);
    } else {
        alert('No Active User');
    }
});