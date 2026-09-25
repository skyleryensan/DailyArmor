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
   SHOW A PAGE
========================= */

function showPage(pageId, clickedButton) {

  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.add("hidden");
  });

  document.getElementById(pageId).classList.remove("hidden");


  /* Change active bottom button */

  const buttons = document.querySelectorAll(".nav-button");

  buttons.forEach(button => {
    button.classList.remove("active");
  });

  clickedButton.classList.add("active");


  /* Scroll to the top */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   DISPLAY VERSE
========================= */

function displayVerse() {

  const verse = verses[currentVerse];

  document.getElementById("verseText").textContent =
    `"${verse.text}"`;

  document.getElementById("verseReference").textContent =
    verse.reference;
}


/* =========================
   NEW VERSE BUTTON
========================= */

function newVerse() {

  let newNumber;

  do {
    newNumber =
      Math.floor(Math.random() * verses.length);
  }

  while (newNumber === currentVerse && verses.length > 1);


  currentVerse = newNumber;

  displayVerse();
}


/* =========================
   PRAYER JOURNAL
========================= */

function savePrayer() {

  const prayer =
    document.getElementById("prayer").value;

  localStorage.setItem(
    "dailyArmorPrayer",
    prayer
  );

  alert("Your prayer was saved! 💜");
}


/* =========================
   LOAD PRAYER
========================= */

function loadPrayer() {

  const savedPrayer =
    localStorage.getItem("dailyArmorPrayer");

  if (savedPrayer) {

    document.getElementById("prayer").value =
      savedPrayer;

  }
}


/* =========================
   MONTHLY MISSION
========================= */

function loadMission() {

  const month =
    new Date().getMonth();

  const mission =
    missions[month % missions.length];


  document.getElementById("missionTitle").textContent =
    mission.title;

  document.getElementById("missionDescription").textContent =
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
    document.querySelectorAll(".task:checked").length;


  const percent =
    Math.round(
      (completed / tasks.length) * 100
    );


  document.getElementById(
    "progressBar"
  ).style.width = percent + "%";


  document.getElementById(
    "progressText"
  ).textContent =
    percent + "% Complete";


  /* Save checklist */

  const checklist = [];

  tasks.forEach(task => {
    checklist.push(task.checked);
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

    loadPrayer();

    loadMission();

    loadChecklist();


    /* Watch checklist */

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
