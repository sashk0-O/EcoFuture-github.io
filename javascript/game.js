const bins = document.querySelectorAll('.bin');
const trashContainer = document.querySelector('.trash-grid');
let trashItems = document.querySelectorAll('.trash');
const scoreDisplay = document.getElementById('score');

let score = 0;
let draggedElement = null;

// ===== РАНДОМНЕ ПЕРЕМІШУВАННЯ СМІТТЯ =====
function shuffleTrash() {
  const items = Array.from(trashContainer.children);
  items.sort(() => Math.random() - 0.5);
  items.forEach(item => trashContainer.appendChild(item));
}

// ===== МОТИВАЦІЙНІ ПОВІДОМЛЕННЯ =====
const messages = [
  "🌟 Молодець! Ти впорався!",
  "♻️ Чудова робота! Планета дякує тобі!",
  "🌍 Ти справжній еко-герой!",
  "👏 Відмінно! Так тримати!",
  "💚 Супер! Ти допоміг природі!"
];

// ===== ПОКАЗ ПОВІДОМЛЕННЯ ПІСЛЯ ЗАВЕРШЕННЯ =====
function showFinalMessage() {
  const message = messages[Math.floor(Math.random() * messages.length)];
  setTimeout(() => {
    alert(message);
  }, 300);
}

// ===== ПЕРЕВІРКА ЧИ ГРА ЗАВЕРШЕНА =====
function checkGameComplete() {
  const remainingTrash = document.querySelectorAll('.trash');
  if (remainingTrash.length === 0) {
    showFinalMessage();
  }
}

// ===== DRAG & DROP =====
trashItems.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

bins.forEach(bin => {
  bin.addEventListener('dragover', dragOver);
  bin.addEventListener('drop', dropTrash);
});

function dragStart(e) {
  draggedElement = e.target;
  e.dataTransfer.setData("type", e.target.dataset.type);
  setTimeout(() => {
    e.target.style.opacity = "0.3";
  }, 0);
}

function dragEnd(e) {
  e.target.style.opacity = "1";
}

function dragOver(e) {
  e.preventDefault();
}

function dropTrash(e) {
  e.preventDefault();

  const trashType = e.dataTransfer.getData("type");
  const bin = e.target.closest(".bin");
  const binType = bin.id;

  if (!draggedElement) return;

  // ✅ ПРАВИЛЬНО
  if (trashType === binType) {
    score++;
    scoreDisplay.textContent = score;

    bin.classList.add("correct");
    setTimeout(() => bin.classList.remove("correct"), 600);

    draggedElement.remove();
    draggedElement = null;

    checkGameComplete();
  }
  // ❌ НЕПРАВИЛЬНО
  else {
    bin.classList.add("wrong");
    setTimeout(() => bin.classList.remove("wrong"), 600);

    draggedElement.style.opacity = "1";
    if (score > 0) score--;
    scoreDisplay.textContent = score;
  }
}

// ===== СТАРТ ГРИ =====
shuffleTrash();
