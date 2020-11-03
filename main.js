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
    issuesRef.on("value", function(snapshot) {
        snapshot.forEach(snap => {
            const issue = snap.val();
            
            document.getElementById("issuesList").innerHTML += `
                <div class="card mb-3" id="${issue.id}" style="width: 25rem">
                    <div class="card-body">
                        <h3 class="card-title">${issue.desc}</h3>
                        <h6>Issue ID: ${issue.id}</h6>
                        <p><span class="label label-info">Status: ${issue.status}</span></p>
                        <p><span class="glyphicon glyphicon-time">Priority Level: ${issue.priority}</span></p>
                        <p><span class="glyphicon glyphicon-user">Assigned to: ${issue.assignedTo}</span></p>
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

document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault()
    const desc = document.getElementById("issueDescInput").value;
    const priority = document.getElementById("priorityLevelInput").value;
    const assignedTo = document.getElementById("issueAssignedTo").value;
    const status = "Open";
    const id = chance.guid();
    
    form.reset();
    
    saveIssue(desc, priority, assignedTo, status, id);
})

function saveIssue(desc, priority, assignedTo, status, id) {    
    issuesRef.child(`${id}`).set({
        desc: desc,
        id: id,
        status: status,
        priority: priority,
        assignedTo: assignedTo
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

function deleteIssue(id) {
    issuesRef.child(id).remove();
    
    renderCurrentData();
} 