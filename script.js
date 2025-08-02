// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Configuration de la Carte Interactive (Leaflet.js) ---
    
    // Coordonnées de Louhans, 71500
    const louhansCoords = [46.6293, 5.2238];
    const map = L.map('map').setView(louhansCoords, 9); // Le '9' est le niveau de zoom

    // Ajout du fond de carte (OpenStreetMap, gratuit)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ajout d'un marqueur pour votre domicile
    L.marker(louhansCoords).addTo(map)
        .bindPopup('<b>Mon point de départ</b><br>Louhans, 71500')
        .openPopup();

    // Dessin du cercle de 100km
    L.circle(louhansCoords, {
        color: '#005A9C',      // Couleur du cercle
        fillColor: '#005A9C',  // Couleur de remplissage
        fillOpacity: 0.15,     // Opacité
        radius: 100000         // Rayon en mètres (100 km)
    }).addTo(map);


    // --- Effet d'apparition des sections au défilement ---
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});