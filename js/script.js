const book = document.querySelector('.book');
const textBox = document.getElementById('textBox');
const animatedText = document.getElementById('animatedText');
const closingText = document.getElementById('closingText');
const bookCover = document.getElementById('bookCover');

const fullText = 'Hay personas que son lecciones de vida en su forma más bonita. Gracias por todo lo que he aprendido todo este tiempo. 📚❤️ ✨';

let isOpen = false;
let typingInterval = null;

book.addEventListener('click', () => {
  isOpen = !isOpen;
  
  if (isOpen) {
    book.classList.add('open');
    // Iniciar la animación de escritura después de que el libro se abra
    setTimeout(() => {
      typewriterAnimation();
    }, 600);
  } else {
    book.classList.remove('open');
    // Detener la animación de escritura
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
    // Limpiar el texto cuando se cierra
    animatedText.textContent = '';
    closingText.classList.remove('show');
  }
  
  // Lanzar estrellas solo si se abre
  if (isOpen) {
    createStars();
  }
});

function typewriterAnimation() {
  let index = 0;
  animatedText.textContent = '';
  
  // Detener cualquier intervalo anterior
  if (typingInterval) {
    clearInterval(typingInterval);
  }
  
  // Animación de escritura más lenta (120ms por carácter)
  typingInterval = setInterval(() => {
    if (index < fullText.length) {
      animatedText.textContent += fullText[index];
      index++;
    } else {
      clearInterval(typingInterval);
      typingInterval = null;
      // Mostrar el texto de cierre después de terminar
      setTimeout(() => {
        closingText.classList.add('show');
      }, 500);
    }
  }, 120);
}

function createStars() {
  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    star.innerHTML = '⭐';
    star.style.position = 'absolute';
    star.style.left = '50%';
    star.style.top = '50%';
    star.style.fontSize = (Math.random() * 20 + 15) + 'px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '100';
    star.style.transition = 'all 1.5s ease-out';
    
    document.body.appendChild(star);
    
    // Dirección aleatoria
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 300 + 100;
    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity;
    
    // Animación inmediata
    setTimeout(() => {
      star.style.transform = `translate(${x}px, ${y}px)`;
      star.style.opacity = '0';
    }, 50);
    
    // Limpieza
    setTimeout(() => star.remove(), 500);
  }
}