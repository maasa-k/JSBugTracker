const email = document.getElementById('txtEmail');
const password = document.getElementById('txtPassword');
// const btnLogin = document.getElementById('btnLogin');
// const btnSignUp = document.getElementById('btnSignUp');
// const btnLogout = document.getElementById('btnLogout');

auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user.email + ' is logged in');
        const issues = db.ref('issues');
        setupIssues(issues);
        setupNavbar(user);
    } else {
        console.log('Logged out');
        setupIssues();
        setupNavbar();
    }
})

// btnSignUp.addEventListener('click', e => {
//     e.preventDefault();
//     const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
//     promise.catch(e => alert(e.message));
// })

// btnLogin.addEventListener('click', e => {
//     e.preventDefault();
//     const promise = auth.signInWithEmailAndPassword(email.value, password.value);
//     promise.catch(e => alert(e.message));
// })
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        $('#loginModal').modal('toggle');
        loginForm.reset();
    })
    // .catch(error => {
    //     loginForm.querySelector('.error').innerHTML = error.message;
    // })
})

const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        $('#signupModal').modal('toggle');
        signupForm.reset();
    })
    // .catch(error => {
    //     loginForm.querySelector('.error').innerHTML = error.message;
    // })
})

const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
})