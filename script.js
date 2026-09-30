// ===== Digital Locker Logic =====
const CODE = "12345";
let entered = "";

const dots = document.querySelectorAll(".dot");
const display = document.getElementById("lockerDisplay");
const hint = document.getElementById("lockerHint");
const entryScreen = document.getElementById("entryScreen");
const body = document.body;

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("filled", i < entered.length);
  });
}

function resetCode() {
  entered = "";
  updateDots();
}

function wrongCode() {
  display.classList.add("shake");
  hint.textContent = "Wrong code, try again";
  setTimeout(() => {
    display.classList.remove("shake");
    resetCode();
    hint.textContent = "Enter the code to unlock";
  }, 400);
}

function unlock() {
  hint.textContent = "Unlocked!";
  entryScreen.classList.add("unlocking");
  body.classList.remove("locked");
  setTimeout(() => {
    entryScreen.classList.add("hidden");
  }, 1000);
}

function handleKey(key) {
  if (key === "clear") {
    resetCode();
    return;
  }
  if (key === "back") {
    entered = entered.slice(0, -1);
    updateDots();
    return;
  }
  if (entered.length >= CODE.length) return;

  entered += key;
  updateDots();

  if (entered.length === CODE.length) {
    if (entered === CODE) {
      unlock();
    } else {
      wrongCode();
    }
  }
}

document.querySelectorAll(".key").forEach((btn) => {
  btn.addEventListener("click", () => handleKey(btn.dataset.key));
});

document.addEventListener("keydown", (e) => {
  if (!body.classList.contains("locked")) return;
  if (e.key >= "0" && e.key <= "9") handleKey(e.key);
  if (e.key === "Backspace") handleKey("back");
  if (e.key === "Escape") handleKey("clear");
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ===== Newsletter (UI only, no backend) =====
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMsg = document.getElementById("newsletterMsg");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("newsletterEmail").value;
  newsletterMsg.textContent = `Thanks! We'll send updates to ${email}.`;
  newsletterForm.reset();
});