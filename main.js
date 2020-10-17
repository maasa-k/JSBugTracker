document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e){
    const issueDesc = document.getElementById("issueDescInput").value;
    const issuePriority = document.getElementById("priorityLevelInput").value;
    const issueAssignedTo = document.getElementById("issueAssignedTo").value;
    const issueId = chance.guid();
    const issueStatus = "Open";

    const issue = {
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

function fetchIssues() {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = "";

    for (let i = 0; i < issues.length; i++) {
        const id = issues[i].id;
        const desc = issues[i].description;
        const severity = issues[i].severity;
        const assignedTo = issues[i].assignedTo;
        const status = issues[i].status;

        issuesList.innerHTML += '<div class="well">' + 
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