function switchRole(role) {
  document
    .querySelectorAll(".role")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector(`.role[onclick="switchRole('${role}')"]`)
    .classList.add("active");

  if (role === "learner") {
    document.getElementById("learner-form").classList.remove("hidden");
    document.getElementById("teacher-form").classList.add("hidden");
    document.getElementById("parent-form").classList.add("hidden");
    document.getElementById("left-title").textContent =
      "Join Khan Academy to activate your learning";
    document.getElementById("left-desc").textContent =
      "Log in to Khan Academy to get started!";
  } else if (role === "teacher") {
    document.getElementById("learner-form").classList.add("hidden");
    document.getElementById("teacher-form").classList.remove("hidden");
    document.getElementById("parent-form").classList.add("hidden");
    document.getElementById("left-title").textContent =
      "Join Khan Academy to activate your teaching";
    document.getElementById("left-desc").textContent =
      "Log in to Khan Academy to get started!";
  } else if (role === "parent") {
    document.getElementById("learner-form").classList.add("hidden");
    document.getElementById("teacher-form").classList.add("hidden");
    document.getElementById("parent-form").classList.remove("hidden");
    document.getElementById("left-title").textContent =
      "Support your child’s learning through Khan Academy";
    document.getElementById("left-desc").textContent =
      "Log in to Khan Academy to get started!";
  }
}

const daySelect = document.getElementById("day");
for (let i = 1; i <= 31; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  daySelect.appendChild(option);
}
const yearSelect = document.getElementById("year");
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 1900; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  yearSelect.appendChild(option);
}

function openPopup(url) {
  window.open(url, "_blank", "width=600,height=600");
}

const monthSelect = document.getElementById("month");
const daySelect2 = document.getElementById("day");
const yearSelect2 = document.getElementById("year");
const signUpButton = document.getElementById("learner-signupButton");
signUpButton.style.display = "none";

function checkDateSelection() {
  if (
    monthSelect.value !== "" &&
    daySelect2.value !== "" &&
    yearSelect2.value !== ""
  ) {
    signUpButton.style.display = "block";
  } else {
    signUpButton.style.display = "none";
  }
}

monthSelect.addEventListener("change", checkDateSelection);
daySelect2.addEventListener("change", checkDateSelection);
yearSelect2.addEventListener("change", checkDateSelection);
