const book = document.querySelector('.book');

book.addEventListener('click', () => {
  // Abrir o cerrar el libro
  book.classList.toggle('open');
  
  // Lanzar estrellas solo si se abre
  if (book.classList.contains('open')) {
    createStars();
  }
});

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
    setTimeout(() => star.remove(), 1500);
  }
}