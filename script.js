// 1. DATA MANAGEMENT (Gestão de Dados)
const deuses = [
    { nome: "Zeus", titulo: "Soberano do Olimpo", bio: "O deus dos céus e dos trovões, mantenedor da ordem." },
    { nome: "Hera", titulo: "Rainha dos Deuses", bio: "Protetora do casamento e da família, poderosa e majestosa." },
    { nome: "Poseidon", titulo: "Senhor dos Mares", bio: "Governa as águas, tempestades e criador dos cavalos." },
    { nome: "Atena", titulo: "Deusa da Sabedoria", bio: "Patrona da civilização, estratégia militar e artesanato." }
];

const historias = [
    { titulo: "O Mito de Prometeu", texto: "O herói que roubou o fogo dos deuses para dar aos humanos." },
    { titulo: "A Odisseia de Ulisses", texto: "A jornada de 10 anos de um herói tentando voltar para casa." }
];

// 2. RENDERIZAÇÃO
function render() {
    const track = document.getElementById('carousel-track');
    const accordion = document.getElementById('accordion-group');

    deuses.forEach(d => {
        track.innerHTML += `
            <article class="card">
                <h3>${d.nome}</h3>
                <p><strong>${d.titulo}</strong></p>
                <p>${d.bio}</p>
            </article>
        `;
    });

    historias.forEach((h, i) => {
        accordion.innerHTML += `
            <div class="accordion-item">
                <button class="accordion-trigger" aria-expanded="false" onclick="toggleAccordion(this)">
                    ${h.titulo} <span>+</span>
                </button>
                <div class="accordion-panel" role="region">
                    <p>${h.texto}</p>
                </div>
            </div>
        `;
    });
}

// 3. ACESSIBILIDADE E COMPONENTES
function toggleAccordion(btn) {
    const panel = btn.nextElementSibling;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    btn.setAttribute('aria-expanded', !isExpanded);
    panel.classList.toggle('active');
    btn.querySelector('span').innerText = isExpanded ? '+' : '-';
}

// Controles de Fonte
let currentSize = 100;
document.getElementById('font-up').onclick = () => {
    currentSize += 10;
    document.documentElement.style.setProperty('--font-size', currentSize + '%');
};
document.getElementById('font-down').onclick = () => {
    currentSize -= 10;
    document.documentElement.style.setProperty('--font-size', currentSize + '%');
};

// Contraste
document.getElementById('contrast-toggle').onclick = () => {
    document.body.classList.toggle('high-contrast');
};

// Carrossel Manual
document.getElementById('next').onclick = () => document.getElementById('carousel-track').scrollLeft += 300;
document.getElementById('prev').onclick = () => document.getElementById('carousel-track').scrollLeft -= 300;

// 4. SCROLL REVEAL (Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

window.onload = () => {
    render();
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
};
