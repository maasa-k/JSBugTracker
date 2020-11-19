const auth = firebase.auth();

const email = document.getElementById('txtEmail');
const password = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

btnSignUp.addEventListener('click', signUp);
btnLogin.addEventListener('click', login);
btnLogout.addEventListener('click', logout);

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

module.exports = auth;






// btnLogin.addEventListener('click', e => {
//     const email = txtEmail.value;
//     const password = txtPassword.value;
    
//     const auth = firebase.auth();
//     const promise = auth.signInWithEmailAndPassword(email, password);
//     promise.catch(e => console.log(e.message))
// })

// btnSignUp.addEventListener('click', e => {
//     const email = txtEmail.value;
//     const password = txtPassword.value;
    
//     const auth = firebase.auth();
//     const promise = auth.createUserWithEmailAndPassword(email, password);
//     promise
//         .catch(e => alert(e.message));
// })

// btnLogout.addEventListener('click', e => {
//     firebase.auth().signOut();
// })

// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if (firebaseUser) {
//         console.log(firebaseUser);
//         btnLogout.classList.remove('hide');
//     } else {
//         alert('not logged in');
//         btnLogout.classList.add('hide');
//     }
// })