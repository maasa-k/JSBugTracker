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