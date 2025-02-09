console.log("connected");
/* authentication part */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
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

let learnerSignUpForm = document.getElementById("learnerSignUpForm");
let emailTxt = document.getElementById("email");
let usernameTxt = document.getElementById("username");
let passwordTxt = document.getElementById("password");
let backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
  window.location.href = "./signup.html";
});

function insertUser(user) {
  let secondArg = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  fetch(
    `https://khanacademy-12e3c-default-rtdb.firebaseio.com/users.json`,
    secondArg
  )
    .then((res) => {
      console.log("student is created");
      let std = {
        name: user.name,
        email: user.email,
        role: user.role,
      };
      console.log("new Student = ", std);
      let str = JSON.stringify(std);
      let page = `../Home.html`;
      setTimeout(() => {
        window.location.href = page + "?data=" + encodeURIComponent(str);
      }, 500);
    })
    .catch((e) => {
      console.log("error is occured");
      console.log(e);
    });
}
function learnerSignUpWithEmail(student) {
  fetch(
    `https://khanacademy-12e3c-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${student.email}"`
  )
    .then((resp) => resp.json())
    .then((res) => {
      console.log("res = ", res);
      if (Object.keys(res).length == 0) {
        insertUser(student);
      } else {
        alert("Email Already Exits, Go to SignIn page or use another Email");
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

learnerSignUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let student = {
    name: usernameTxt.value,
    email: emailTxt.value,
    password: passwordTxt.value,
    role: "learner",
    attempted: [],
  };
  console.log("student", student);
  learnerSignUpWithEmail(student);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
  }
});
