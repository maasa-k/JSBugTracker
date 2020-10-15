document.getElementById("issueInputForm").addEventListener('submit', saveIssue);

function saveIssue(e){
    const issueDesc = document.getElementById("issueDescInput").value;
    const issuePriority = document.getElementById("priorityLevelInput").value;
    const issueAssignedTo = document.getElementById("issueAssignedTo").value;
    const issueId = chance.guid();
    const issueStatus = "Open";

    const bug = {
        id: issueId,
        desc: issueDesc,
        priority: issuePriority,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem("issues") === null) {
        const issues = [];
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    } else {
        const issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    }

    document.getElementById("issueInpuForm").reset();

    fetchIssues();

    e.preventDefault();
}

function fetchbugs() {
    const bugs = JSON.parse(localStorage.getItem('bugs'));
    const bugsList = document.getElementById('bugsList');

    bugsList.innerHTML = "";

    for (let i = 0; i < bugs.length; i++) {
        const id = bugs[i].id;
        const desc = bugs[i].description;
        const severity = bugs[i].severity;
        const assignedTo = bugs[i].assignedTo;
        const status = bugs[i].status;

        bugsList.innerHTML += '<div class="well">' + 
                                '<h6>Issue ID: ' + id + '<h6>' + 
                                '<p><span class="label label-info">' + status + '</span></p>' + 
                                '<h3>' + desc + '</h3>' + 
                                '<p><span class="glyphicon glyphicon-time">' + severity + '</span></p>' + 
                                '<p><span class="glyphicon glyphicon-user">' + assignedTo + '</span></p>' + 
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' + 
                                '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' + 
                                '</div>'
    }
}