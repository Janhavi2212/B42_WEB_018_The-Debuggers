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

let googleSignUpTeacher = document.getElementById("googleSignUpTeacher");
let googleSignUpParent = document.getElementById("googleSignUpParent");
let learnerSignUpForm = document.getElementById("learnerSignUpForm");

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
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
}

async function parentSignUpGoogle() {
  try {
    let res = await signInWithPopup(auth, provider);
    let user = res.user;
    let obj = {
      name: user.displayName,
      email: user.email,
      password: "google",
      role: "parent",
    };
    fetch(
      `https://khanacademy-12e3c-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${obj.email}"`
    )
      .then((resp) => resp.json())
      .then((res) => {
        if (Object.keys(res).length == 0) {
          insertUser(obj);
        } else {
          let role;
          let parent;
          for (let r in res) {
            parent = res[r];
            role = res[r].role;
          }

          let tempObj = {
            name: parent.name,
            email: parent.email,
            role: parent.role,
          };
          if (role == "teacher") {
            let str = JSON.stringify(tempObj);
            let page = `./deleteTeacher.html`;
            window.location.href = page + "?data=" + encodeURIComponent(str);
          } else if (role == "parent") {
            let str = JSON.stringify(tempObj);
            let page = `./deleteParent.html`;
            window.location.href = page + "?data=" + encodeURIComponent(str);
          } else {
            let str = JSON.stringify(tempObj);
            let page = `./deleteHomepage.html`;
            window.location.href = page + "?data=" + encodeURIComponent(str);
          }
         }
        let tempObj = {
          name: obj.name,
          email: obj.email,
          role: obj.role,
        };
        let str = JSON.stringify(tempObj);
        let page = `./deleteParent.html`;
        window.location.href = page + "?data=" + encodeURIComponent(str);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error);
  }
}

async function teacherSignUpGoogle() {
  try {
    let res = await signInWithPopup(auth, provider);
    let user = res.user;
    let obj = {
      name: user.displayName,
      email: user.email,
      password: "google",
      role: "teacher",
    };
    fetch(
      `https://khanacademy-12e3c-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${obj.email}"`
    )
      .then((resp) => resp.json())
      .then((res) => {
        if (Object.keys(res).length == 0) {
          insertUser(obj);
        } else {
          let role;
          let teacher;
          for (let r in res) {
            teacher = res[r];
            role = res[r].role;
          }
          let tempObj = {
            name: teacher.name,
            email: teacher.email,
            role: teacher.role,
          };
          if (role == "teacher") {
            let str = JSON.stringify(tempObj);
            let page = `./deleteTeacher.html`;
            window.location.href = page + "?data=" + encodeURIComponent(str);
          } else if (role == "parent") {
            let str = JSON.stringify(tempObj);
            let page = `./deleteParent.html`;
            window.location.href = page + "?data=" + encodeURIComponent(str);
          } else {
            let str = JSON.stringify(tempObj);
            let page = `./deleteHomepage.html`;
            window.location.href = page + "?data=" + encodeURIComponent(str);
          }
        }
        let tempObj = {
          name: obj.name,
          email: obj.email,
          role: obj.role,
        };
        let str = JSON.stringify(tempObj);
        let page = `./deleteTeacher.html`;
        window.location.href = page + "?data=" + encodeURIComponent(str);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error);
  }
}

/*
async function userSignOut() {
  try {
    await signOut(auth);
    alert("you have signed out");
  } catch (error) {
    console.log(error);
  }
}
  */

googleSignUpTeacher.addEventListener("click", teacherSignUpGoogle);
googleSignUpParent.addEventListener("click", parentSignUpGoogle);

onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
  }
});
