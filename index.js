const issuesList = document.querySelector('#issuesList');
const container = document.querySelector('.container');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const issuesRef = db.ref('issues');

const setupNavbar = (user) => {
    if (user) {
        loggedInLinks.forEach(link => link.style.display = 'block');
        loggedOutLinks.forEach(link => link.style.display = 'none');
    } else {
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'block');
    }
}

const setupIssues = (issues) => {
    if (issues) {
        issuesRef.orderByChild("date").on("value", function(snapshot) {
            let html = '';
            snapshot.forEach(snap => {
                const issue = snap.val();
                // document.getElementById("issuesList").innerHTML += `
                const card = `
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
                `;
                html += card;
            });
            issuesList.innerHTML = html;
        })
    } else {
        container.innerHTML = '<h3>Login to use JS Bug Tracker</h3>'
    }
}
// function readIssues() {
//     issuesRef.orderByChild("date").on("value", function(snapshot) {
//         snapshot.forEach(snap => {
//             const issue = snap.val();
            
//             document.getElementById("issuesList").innerHTML += `
//             <div class="card" id="${issue.id}">
//             <div class="card-body">
//             <h6 class="card-title">${issue.desc}</h6>
//             <p>Issue ID: ${issue.id}</p>
//             <p><span class="label label-info">Status: ${issue.status}</span></p>
//             <p><span class="glyphicon glyphicon-time">Priority Level: ${issue.priority}</span></p>
//             <p><span class="glyphicon glyphicon-user">Date created: ${issue.date}</span></p>
//             ` +
//             statusButton(issue)
//                         +
//                         ` 
//                         <button onclick="deleteIssue('${issue.id}')" class="btn btn-danger mx-3">Delete</button>
//                     </div>
//                 </div>
//             `
//         })
//     }
// )}

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
    setupIssues();
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

function deleteIssue(id) {
    issuesRef.child(id).remove();
    
    renderCurrentData();
}