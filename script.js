/* =========================
   DAILY VERSES
========================= */

const verses = [
  {
    text: "Be strong and courageous.",
    reference: "Joshua 1:9"
  },
  {
    text: "Trust in the Lord with all your heart.",
    reference: "Proverbs 3:5"
  },
  {
    text: "Let all that you do be done in love.",
    reference: "1 Corinthians 16:14"
  },
  {
    text: "The Lord is my shepherd.",
    reference: "Psalm 23:1"
  },
  {
    text: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13"
  }
];


/* =========================
   MONTHLY MISSIONS
========================= */

const missions = [
  {
    title: "Encourage Someone 💜",
    description:
      "Find someone who could use encouragement and brighten their day."
  },
  {
    title: "Serve Someone 🤝",
    description:
      "Look for a way to help someone without being asked."
  },
  {
    title: "Practice Gratitude 😊",
    description:
      "Take time to notice the blessings God has given you."
  },
  {
    title: "Be Kind 💜",
    description:
      "Look for opportunities to show kindness to the people around you."
  }
];


/* =========================
   CURRENT VERSE
========================= */

let currentVerse = 0;


/* =========================
   LOGIN
========================= */

function login() {

  const name =
    document.getElementById("loginName").value.trim();

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;

  const message =
    document.getElementById("loginMessage");


  if (!name || !email || !password) {

    message.textContent =
      "Please fill in all the boxes.";

    return;
  }


  const savedAccount =
    JSON.parse(
      localStorage.getItem("dailyArmorAccount")
    );


  if (
    savedAccount &&
    savedAccount.email === email &&
    savedAccount.password === password
  ) {

    localStorage.setItem(
      "dailyArmorLoggedIn",
      "true"
    );

    localStorage.setItem(
      "dailyArmorName",
      savedAccount.name
    );

    showApp();

    return;
  }


  if (!savedAccount) {

    message.textContent =
      "No account found. Click Create Account first.";

    return;
  }


  message.textContent =
    "The email or password is incorrect.";
}


/* =========================
   CREATE ACCOUNT
========================= */

function showSignup() {

  document.getElementById("loginTitle").textContent =
    "Create Your Account 💜";

  document.querySelector(
    ".login-card button[onclick='login()']"
  ).textContent =
    "✨ Create Account";

  document.querySelector(
    ".login-card button[onclick='showSignup()']"
  ).textContent =
    "Already have an account? Log In";

  document.querySelector(
    ".login-card button[onclick='login()']"
  ).onclick =
    createAccount;

  document.querySelector(
    ".login-card button[onclick='createAccount()']"
  );

  document.querySelector(
    ".login-card button[onclick='showSignup()']"
  ).onclick =
    showLogin;

}


function showLogin() {

  document.getElementById("loginTitle").textContent =
    "Welcome Back 💜";

  const mainButton =
    document.querySelector(".login-card button");

  mainButton.textContent =
    "🔐 Log In";

  mainButton.onclick =
    login;

  const secondButton =
    document.querySelectorAll(".login-card button")[1];

  secondButton.textContent =
    "✨ Create Account";

  secondButton.onclick =
    showSignup;

  document.getElementById("loginMessage").textContent =
    "";
}


/* =========================
   CREATE ACCOUNT
========================= */

function createAccount() {

  const name =
    document.getElementById("loginName").value.trim();

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;


  const message =
    document.getElementById("loginMessage");


  if (!name || !email || !password) {

    message.textContent =
      "Please fill in all the boxes.";

    return;
  }


  const account = {
    name: name,
    email: email,
    password: password
  };


  localStorage.setItem(
    "dailyArmorAccount",
    JSON.stringify(account)
  );


  localStorage.setItem(
    "dailyArmorLoggedIn",
    "true"
  );


  localStorage.setItem(
    "dailyArmorName",
    name
  );


  showApp();
}


/* =========================
   SHOW APP
========================= */

function showApp() {

  document.getElementById("loginPage")
    .classList.add("hidden");

  document.getElementById("app")
    .classList.remove("hidden");

}


/* =========================
   CHECK LOGIN
========================= */

function checkLogin() {

  const loggedIn =
    localStorage.getItem(
      "dailyArmorLoggedIn"
    );

  if (loggedIn === "true") {

    showApp();

  } else {

    document.getElementById("loginPage")
      .classList.remove("hidden");

    document.getElementById("app")
      .classList.add("hidden");

  }
}


/* =========================
   SHOW A PAGE
========================= */

function showPage(pageId, clickedButton) {

  const pages =
    document.querySelectorAll(".page");


  pages.forEach(page => {

    page.classList.add("hidden");

  });


  document.getElementById(pageId)
    .classList.remove("hidden");


  const buttons =
    document.querySelectorAll(".nav-button");


  buttons.forEach(button => {

    button.classList.remove("active");

  });


  clickedButton.classList.add("active");


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  if (pageId === "studies") {

    displayStudyVerse();

    loadStudies();

  }

}


/* =========================
   DISPLAY VERSE
========================= */

function displayVerse() {

  const verse =
    verses[currentVerse];


  document.getElementById("verseText")
    .textContent =
      `"${verse.text}"`;


  document.getElementById("verseReference")
    .textContent =
      verse.reference;

}


/* =========================
   DISPLAY STUDY VERSE
========================= */

function displayStudyVerse() {

  const verse =
    verses[currentVerse];


  document.getElementById("studyVerseText")
    .textContent =
      `"${verse.text}"`;


  document.getElementById("studyVerseReference")
    .textContent =
      verse.reference;

}


/* =========================
   NEW VERSE
========================= */

function newVerse() {

  let newNumber;


  do {

    newNumber =
      Math.floor(
        Math.random() * verses.length
      );

  }

  while (
    newNumber === currentVerse &&
    verses.length > 1
  );


  currentVerse =
    newNumber;


  displayVerse();

  displayStudyVerse();

}


/* =========================
   PRAYER JOURNAL
========================= */

function savePrayer() {

  const prayer =
    document.getElementById("prayer")
      .value.trim();


  if (!prayer) {

    alert("Write a prayer first. 💜");

    return;

  }


  const prayers =
    JSON.parse(
      localStorage.getItem(
        "dailyArmorPrayers"
      )
    ) || [];


  prayers.push({
    text: prayer,
    date: new Date().toLocaleString()
  });


  localStorage.setItem(
    "dailyArmorPrayers",
    JSON.stringify(prayers)
  );


  document.getElementById("prayer")
    .value = "";


  loadPrayers();


  alert("Your prayer was saved! 💜");

}


/* =========================
   LOAD SAVED PRAYERS
========================= */

function loadPrayers() {

  const container =
    document.getElementById(
      "savedPrayers"
    );


  const prayers =
    JSON.parse(
      localStorage.getItem(
        "dailyArmorPrayers"
      )
    ) || [];


  if (prayers.length === 0) {

    container.innerHTML =
      "<p>No saved prayers yet.</p>";

    return;

  }


  container.innerHTML = "";


  prayers.slice().reverse()
    .forEach(prayer => {

      const item =
        document.createElement("div");

      item.className =
        "saved-item";


      item.innerHTML = `
        <p>"${escapeHTML(prayer.text)}"</p>
        <small>${prayer.date}</small>
      `;


      container.appendChild(item);

    });

}


/* =========================
   SAVE STUDY
========================= */

function loadPrayers() {

  const container =
    document.getElementById(
      "savedPrayers"
    );


  const prayers =
    JSON.parse(
      localStorage.getItem(
        "dailyArmorPrayers"
      )
    ) || [];


  if (prayers.length === 0) {

    container.innerHTML =
      "<p>No saved prayers yet.</p>";

    return;

  }


  container.innerHTML = "";


  prayers.slice().reverse()
    .forEach((prayer, reversedIndex) => {

      const actualIndex =
        prayers.length - 1 - reversedIndex;

      const item =
        document.createElement("div");

      item.className =
        "saved-item";


      item.innerHTML = `
        <p>"${escapeHTML(prayer.text)}"</p>
        <small>${prayer.date}</small>

        <button
          class="delete-button"
          onclick="deletePrayer(${actualIndex})">
          🗑️ Delete
        </button>
      `;


      container.appendChild(item);

    });

}function deletePrayer(index) {

  const prayers =
    JSON.parse(
      localStorage.getItem(
        "dailyArmorPrayers"
      )
    ) || [];


  prayers.splice(index, 1);


  localStorage.setItem(
    "dailyArmorPrayers",
    JSON.stringify(prayers)
  );


  loadPrayers();

}
/* =========================
   LOAD SAVED STUDIES
========================= */

function loadStudies() {

  const container =
    document.getElementById(
      "savedStudies"
    );


  const studies =
    JSON.parse(
      localStorage.getItem(
        "dailyArmorStudies"
      )
    ) || [];


  if (studies.length === 0) {

    container.innerHTML =
      "<p>No saved studies yet.</p>";

    return;

  }


  container.innerHTML = "";


  studies.slice().reverse()
    .forEach(study => {

      const item =
        document.createElement("div");


      item.className =
        "saved-item";


      item.innerHTML = `

        <h3>
          ${escapeHTML(study.reference)}
        </h3>

        <p>
          "${escapeHTML(study.verse)}"
        </p>

        <p>
          ${escapeHTML(study.study)}
        </p>

        <small>
          ${study.date}
        </small>

      `;


      container.appendChild(item);

    });

}


/* =========================
   ESCAPE SAVED TEXT
========================= */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent =
    text;

  return div.innerHTML;

}


/* =========================
   MONTHLY MISSION
========================= */

function loadMission() {

  const month =
    new Date().getMonth();


  const mission =
    missions[
      month % missions.length
    ];


  document.getElementById(
    "missionTitle"
  ).textContent =
    mission.title;


  document.getElementById(
    "missionDescription"
  ).textContent =
    mission.description;

}


/* =========================
   COMPLETE MISSION
========================= */

function completeMission() {

  localStorage.setItem(
    "dailyArmorMissionCompleted",
    "true"
  );


  alert(
    "Mission completed! 🎉 Keep growing in faith!"
  );

}


/* =========================
   CHECKLIST PROGRESS
========================= */

function updateProgress() {

  const tasks =
    document.querySelectorAll(".task");


  const completed =
    document.querySelectorAll(
      ".task:checked"
    ).length;


  const percent =
    Math.round(
      (completed / tasks.length) * 100
    );


  document.getElementById(
    "progressBar"
  ).style.width =
    percent + "%";


  document.getElementById(
    "progressText"
  ).textContent =
    percent + "% Complete";


  const checklist = [];


  tasks.forEach(task => {

    checklist.push(
      task.checked
    );

  });


  localStorage.setItem(
    "dailyArmorChecklist",
    JSON.stringify(checklist)
  );

}


/* =========================
   LOAD CHECKLIST
========================= */

function loadChecklist() {

  const saved =
    JSON.parse(
      localStorage.getItem(
        "dailyArmorChecklist"
      )
    );


  if (!saved) {

    return;

  }


  const tasks =
    document.querySelectorAll(".task");


  tasks.forEach((task, index) => {

    task.checked =
      saved[index] || false;

  });


  updateProgress();

}


/* =========================
   START APP
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    displayVerse();

    displayStudyVerse();

    loadMission();

    loadPrayers();

    loadStudies();

    loadChecklist();

    checkLogin();


    document
      .querySelectorAll(".task")
      .forEach(task => {

        task.addEventListener(
          "change",
          updateProgress
        );

      });

  }
);
function logout() {
  localStorage.removeItem("dailyArmorLoggedIn");
  location.reload();
}
