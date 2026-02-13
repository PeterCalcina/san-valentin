const book = document.querySelector(".book");
const animatedText = document.getElementById("animatedText");
const closingText = document.getElementById("closingText");
const bgAudio = document.getElementById("bgAudio");

const fullText =
  "Hay personas que son lecciones de vida en su forma más bonita. Gracias por todo lo que he aprendido todo este tiempo. \n\n 📚 ❤️ ✨";

let isOpen = false;
let timeoutId = null;

book.addEventListener("click", () => {
  isOpen = !isOpen;

  if (isOpen) {
    book.classList.add("open");

    if (bgAudio && bgAudio.paused) {
      bgAudio.volume = 0.6;
      bgAudio.play().catch(() => console.log("Clic para activar sonido"));
    }

    createStars(35);

    clearTimeout(timeoutId);
    animatedText.textContent = "";
    closingText.classList.remove("show");

    setTimeout(() => typeWriter(0), 800);
  } else {
    book.classList.remove("open");
    if (bgAudio) {
      bgAudio.pause();
    }
    clearTimeout(timeoutId);
    animatedText.textContent = "";
    closingText.classList.remove("show");
  }
});

function typeWriter(index) {
  if (index < fullText.length) {
    const char = fullText[index];
    animatedText.textContent += char;

    let delay = Math.random() * (70 - 40) + 40;

    if (char === "." || char === "!" || char === "✨") {
      delay = 700;
    } else if (char === "," || char === ":") {
      delay = 350; // Pausa media en comas
    } else if (char === " ") {
      delay = Math.random() * (100 - 60) + 60; // Los espacios dan aire
    }

    timeoutId = setTimeout(() => {
      typeWriter(index + 1);
    }, delay);
  } else {
    // Aparece el texto de cierre con un pequeño delay extra
    setTimeout(() => {
      closingText.classList.add("show");
    }, 500);
  }
}

function createStars(count) {
  let container = document.getElementById("star-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "star-container";
    document.body.appendChild(container);
  }

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    const particles = ["⭐", "✨", "🌟", "💫"];
    star.innerHTML = particles[Math.floor(Math.random() * particles.length)];

    Object.assign(star.style, {
      position: "absolute",
      left: "50%",
      top: "50%",
      fontSize: `${Math.random() * 25 + 10}px`,
      pointerEvents: "none",
      filter: `blur(${Math.random() * 1}px)`,
      transition: "all 4s cubic-bezier(0.1, 0.8, 0.3, 1)",
      opacity: "1",
      transform: "translate(-50%, -50%)",
    });

    container.appendChild(star);

    // Movimiento
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 400 + 100;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const rotation = Math.random() * 720 - 360;

    requestAnimationFrame(() => {
      star.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg)`;
      star.style.opacity = "0";
    });

    // Limpieza
    setTimeout(() => star.remove(), 4000);
  }
}
