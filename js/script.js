const book = document.querySelector(".book");
const animatedText = document.getElementById("animatedText");
const closingText = document.getElementById("closingText");
const bgAudio = document.getElementById("bgAudio");

const fullText =
  "Hay personas que son lecciones de vida en su forma más bonita. Gracias por todo lo que he aprendido todo este tiempo. \r\n 📚 ❤️ ✨";

let isOpen = false;
let timeoutId = null;

book.addEventListener("click", () => {
  isOpen = !isOpen;

  if (isOpen) {
    book.classList.add("open");

    if (bgAudio && bgAudio.paused) {
      bgAudio
        .play()
        .catch(() => console.log("Interacción requerida para audio"));
    }

    createStars(40);

    clearTimeout(timeoutId);
    animatedText.textContent = "";
    closingText.classList.remove("show");
    setTimeout(() => {
      typeWriter(0);
    }, 800);
  } else {
    book.classList.remove("open");
    if (bgAudio && !bgAudio.paused) {
      bgAudio.pause();
    }
    clearTimeout(timeoutId);
    animatedText.textContent = "";
    closingText.classList.remove("show");
  }
});

function typeWriter(index) {
  if (index < fullText.length) {
    animatedText.textContent += fullText[index];

    const speed = Math.random() * (110 - 70) + 70;

    timeoutId = setTimeout(() => {
      typeWriter(index + 1);
    }, speed);
  } else {
    setTimeout(() => {
      closingText.classList.add("show");
    }, 600);
  }
}

function createStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");

    const particles = ["⭐", "✨", "🌟", "💫"];
    star.innerHTML = particles[Math.floor(Math.random() * particles.length)];

    star.style.position = "fixed";
    star.style.left = "50%";
    star.style.top = "50%";

    const size = Math.random() * 25 + 10;
    star.style.fontSize = `${size}px`;

    star.style.pointerEvents = "none";
    star.style.zIndex = "1000";
    star.style.filter = `blur(${Math.random() * 1}px)`;

    star.style.transition = "all 6.5s cubic-bezier(0.1, 0.8, 0.3, 1)";

    document.body.appendChild(star);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 500 + 100;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const rotation = Math.random() * 720 - 360;

    requestAnimationFrame(() => {
      star.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
      star.style.opacity = "0";
    });

    setTimeout(() => star.remove(), 5000);
  }
}
