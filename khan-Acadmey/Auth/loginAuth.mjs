console.log("connected");
/* authentication part */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_MVBf-7jx1EHhw0icvV21DSjhLmHoKo0",
  authDomain: "khanacademy-12e3c.firebaseapp.com",
  projectId: "khanacademy-12e3c",
  storageBucket: "khanacademy-12e3c.firebasestorage.app",
  messagingSenderId: "479863932420",
  appId: "1:479863932420:web:056ceef191a44a3cb81751",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

let loginButton = document.getElementById("loginButton");
let email = document.getElementById("email");
let password = document.getElementById("password");
let googleSignupBtn = document.getElementById("googleSignupBtn");

function userSignIn(email, password) {
  fetch(
    `https://khanacademy-12e3c-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${email}"`
  )
    .then((resp) => resp.json())
    .then((res) => {
      if (Object.keys(res).length == 0) {
        alert("User does not exist, please create account first!");
      } else {
        let user;
        for (let r in res) {
          user = res[r];
        }
        console.log(user);
        if (user.password === password) {
          let obj = {
            name: user.name,
            email: user.email,
            role: user.role,
          };
          if (user.role == "teacher") {
            let str = JSON.stringify(obj);
            let page = `./deleteTeacher.html`;
            window.location.href = page + "?data=" + encodeURIComponent(str);
          } else if (user.role == "parent") {
            let str = JSON.stringify(obj);
            let page = `./deleteParent.html`;
            window.location.href = page + "?data=" + encodeURIComponent(str);
          } else {
            let str = JSON.stringify(obj);
            let page = `./deleteHomepage.html`;
            window.location.href = page + "?data=" + encodeURIComponent(str);
          }
        } else {
          alert("invalid Password");
        }
      }
      /*
          let str = JSON.stringify(parent);
          let page = `./deleteParent.html`;
          window.location.href = page + "?data=" + encodeURIComponent(str);
          */
    })
    .catch((e) => {
      console.log(e);
    });
}

loginButton.addEventListener("click", () => {
  let emainTxt = email.value;
  let passwordTxt = password.value;
  if (emainTxt == "" || passwordTxt == "") {
    alert("please fill the email id and password correctly");
  } else {
    userSignIn(emainTxt, passwordTxt);
  }
});

async function loginInByGoogle() {
  let res = await signInWithPopup(auth, provider);
  let user = res.user;
  userSignIn(user.email, "google");
}

googleSignupBtn.addEventListener("click", loginInByGoogle);
