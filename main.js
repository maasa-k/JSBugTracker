//--------------------------------------Firebase---------------------------------------------------------//
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
                        <button onclick="setStatusClosed('${issue.id}')" id="closeButton" class="btn btn-warning mx-3">Close</button>
                        <button onclick="deleteIssue('${issue.id}')" class="btn btn-danger mx-3">Delete</button>
                    </div>
                </div>
            `
        })
    }
)}

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
    firebase.database().ref('issues/' + id).set({
        desc: desc,
        id: id,
        status: status,
        priority: priority,
        assignedTo: assignedTo
    });
    
    document.getElementById('issuesList').innerHTML = "";
    readIssues();
}

function setStatusClosed(id) {
    issuesRef.child(`${id}`).update({
        "status": "Closed"
    })
    document.getElementById('issuesList').innerHTML = "";
    readIssues();
}

function deleteIssue(id) {
    firebase.database().ref("issues/" + id).remove();
    document.getElementById('issuesList').innerHTML = "";
    readIssues();
}

            //------------------------------------------------------------------------------------------------------//
            
            // issues.on('value', function(snapshot) {
                //     snapshot.forEach(function(childSnapshot) {
                    //     //   const id = childSnapshot.key;
                    //       const issue = childSnapshot.val();
                    
                    //       const id = issue.id;
                    //       const desc = issue.desc;
                    //       const priority = issue.priority;
                    //       const assignedTo = issue.assignedTo;
                    //       const status = issue.status;
                    
                    //       issuesList.innerHTML += '<div class="card mb-3" style="width: 25rem" id="' + id + '">' + 
                    //                                 '<div class="card-body">' +
                    //                                 '<h3 class="card-title">' + desc + '</h3>' + 
                    //                                 '<h6>Issue ID: ' + id + '<h6>' + 
                    //                                 '<p><span class="label label-info">Status: ' + status + '</span></p>' + 
                    //                                 '<p><span class="glyphicon glyphicon-time">Priority Level: ' + priority + '</span></p>' + 
    //                                 '<p><span class="glyphicon glyphicon-user">Assigned to: ' + assignedTo + '</span></p>' + 
    //                                 '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning mx-3">Close</a>' + 
    //                                 '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' + 
    //                                 '</div>' +
    //                             '</div>'
          
    //     });
    // })

        // for (let i = 0; i < issues.length; i++) {
        //     const id = issues[i].id;
        //     const desc = issues[i].desc;
        //     const priority = issues[i].priority;
        //     const assignedTo = issues[i].assignedTo;
        //     const status = issues[i].status;
        // }

        // const id = snapshot.val().issues.id

        // issuesList.innerHTML += '<div class="card mb-3" style="width: 25rem" id="' + id + '">' + 
        //                             '<div class="card-body">' +
        //                             '<h3 class="card-title">' + desc + '</h3>' + 
        //                             '<h6>Issue ID: ' + id + '<h6>' + 
        //                             '<p><span class="label label-info">Status: ' + status + '</span></p>' + 
        //                             '<p><span class="glyphicon glyphicon-time">Priority Level: ' + priority + '</span></p>' + 
        //                             '<p><span class="glyphicon glyphicon-user">Assigned to: ' + assignedTo + '</span></p>' + 
        //                             '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning mx-3">Close</a>' + 
        //                             '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' + 
        //                             '</div>' +
        //                         '</div>'

    // for (let i = 0; i < issues.length; i++) {
    //     const id = issues[i].id;
    //     const desc = issues[i].desc;
    //     const priority = issues[i].priority;
    //     const assignedTo = issues[i].assignedTo;
    //     const status = issues[i].status;

    //     issuesList.innerHTML += '<div class="card mb-3" style="width: 25rem" id="' + id + '">' + 
    //                                 '<div class="card-body">' +
    //                                 '<h3 class="card-title">' + desc + '</h3>' + 
    //                                 '<h6>Issue ID: ' + id + '<h6>' + 
    //                                 '<p><span class="label label-info">Status: ' + status + '</span></p>' + 
    //                                 '<p><span class="glyphicon glyphicon-time">Priority Level: ' + priority + '</span></p>' + 
    //                                 '<p><span class="glyphicon glyphicon-user">Assigned to: ' + assignedTo + '</span></p>' + 
    //                                 '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning mx-3">Close</a>' + 
    //                                 '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' + 
    //                                 '</div>' +
    //                             '</div>'
    // }   
    



//---------------------------------------Original--------------------------------------------------------//

// document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

// function fetchIssues() {
//     const issues = JSON.parse(localStorage.getItem('issues'));
//     const issuesList = document.getElementById('issuesList');
    
//     issuesList.innerHTML = "";

//     for (let i = 0; i < issues.length; i++) {
//         const id = issues[i].id;
//         const desc = issues[i].desc;
//         const priority = issues[i].priority;
//         const assignedTo = issues[i].assignedTo;
//         const status = issues[i].status;

//         issuesList.innerHTML += '<div class="card mb-3" style="width: 25rem" id="' + id + '">' + 
//                                     '<div class="card-body">' +
//                                     '<h3 class="card-title">' + desc + '</h3>' + 
//                                     '<h6>Issue ID: ' + id + '<h6>' + 
//                                     '<p><span class="label label-info">Status: ' + status + '</span></p>' + 
//                                     '<p><span class="glyphicon glyphicon-time">Priority Level: ' + priority + '</span></p>' + 
//                                     '<p><span class="glyphicon glyphicon-user">Assigned to: ' + assignedTo + '</span></p>' + 
//                                     '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning mx-3">Close</a>' + 
//                                     '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' + 
//                                     '</div>' +
//                                 '</div>'
//     }
// }

// function saveIssue(e){
//     e.preventDefault();

//     const issueDesc = document.getElementById("issueDescInput").value;
//     const issuePriority = document.getElementById("priorityLevelInput").value;
//     const issueAssignedTo = document.getElementById("issueAssignedTo").value;
//     const issueId = chance.guid();
//     const issueStatus = "Open";

//     const issue = {
//         id: issueId,
//         desc: issueDesc,
//         priority: issuePriority,
//         assignedTo: issueAssignedTo,
//         status: issueStatus
//     }

//     if (localStorage.getItem("issues") === null) {
//         const issues = [];
//         issues.push(issue);
//         localStorage.setItem("issues", JSON.stringify(issues));
//     } else {
//         const issues = JSON.parse(localStorage.getItem("issues"));
//         issues.push(issue);
//         localStorage.setItem("issues", JSON.stringify(issues));
//     }

//     document.getElementById("issueInputForm").reset();

//     fetchIssues();
// }

// function deleteIssue(id) {
//     const issues = JSON.parse(localStorage.getItem('issues'));
//     for (let i = 0; i < issues.length; i++) {
//         if (issues[i].id == id) {
//             issues.splice(i, 1);
//             const el = document.getElementById(`${id}`);
//             el.parentNode.removeChild(el);
//         }
//     }

//     localStorage.setItem('issues', JSON.stringify(issues));
    
//     // fetchIssues();

// }

// function setStatusClosed(id) {
//     const issues = JSON.parse(localStorage.getItem('issues'));

//     for (let i = 0; i < issues.length; i++) {
//         if (issues[i].id == id) {
//             issues[i].status = "Closed";
//         }
//     }

//     localStorage.setItem('issues', JSON.stringify(issues));

//     fetchIssues();
// }