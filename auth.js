const email = document.getElementById('txtEmail');
const password = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user.email + ' is logged in');
        const issues = db.ref('issues');
        setupIssues(issues);
        setupNavbar(user);
    } else {
        console.log('Logged out');
        setupIssues();
    }
})

btnSignUp.addEventListener('click', e => {
    e.preventDefault();
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
})

btnLogin.addEventListener('click', e => {
    e.preventDefault();
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
})

const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
})

// btnLogout.addEventListener('click', e => {
//     auth.signOut();
// })