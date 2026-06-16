// Configuration for Experiences
const EXPERIENCES = {
    'detalleAma.html': {
        id: 'Ama',
        title: 'Tour en la Amazonía',
        price: 150,
        rating: 4.8,
        ratingsCount: 12,
        ratingDist: { 5: 10, 4: 1, 3: 1, 2: 0, 1: 0 },
        defaultComments: [
            { name: 'Sofía Ramos', rating: 5, text: 'Increíble paseo por el río Amazonas. El guía Manuel conocía muchísimo sobre la flora, fauna y los delfines rosados.', date: '10/06/2026' },
            { name: 'Carlos Mendoza', rating: 4, text: 'Muy buena experiencia, muy puntuales. El almuerzo típico estuvo delicioso y fresco.', date: '04/06/2026' }
        ]
    },
    'detalleYagu.html': {
        id: 'Yagu',
        title: 'Comunidad Nativa Yagua',
        price: 180,
        rating: 4.9,
        ratingsCount: 24,
        ratingDist: { 5: 22, 4: 2, 3: 0, 2: 0, 1: 0 },
        defaultComments: [
            { name: 'Alejandra Ruiz', rating: 5, text: 'Una inmersión cultural única. Nos recibieron con cantos tradicionales y nos enseñaron a usar la cerbatana.', date: '12/06/2026' },
            { name: 'Mateo Silva', rating: 5, text: 'Espectacular poder conversar con el curaca y aprender de su visión del mundo y medicina natural.', date: '08/06/2026' }
        ]
    },
    'detalleFauna.html': {
        id: 'Fauna',
        title: 'Avistamiento de Fauna',
        price: 120,
        rating: 4.7,
        ratingsCount: 9,
        ratingDist: { 5: 7, 4: 1, 3: 1, 2: 0, 1: 0 },
        defaultComments: [
            { name: 'Daniela Flores', rating: 5, text: 'Logramos ver monos aulladores, perezosos y una gran variedad de aves exóticas. El guía Juan tiene un ojo increíble.', date: '14/06/2026' },
            { name: 'Roberto Díaz', rating: 4, text: 'La caminata para el avistamiento es un poco exigente pero vale totalmente la pena por la fauna que encuentras.', date: '02/06/2026' }
        ]
    },
    'detalleCanotaje.html': {
        id: 'Canotaje',
        title: 'Canotaje Amazónico',
        price: 140,
        rating: 4.6,
        ratingsCount: 15,
        ratingDist: { 5: 11, 4: 3, 3: 1, 2: 0, 1: 0 },
        defaultComments: [
            { name: 'Enrique Soto', rating: 5, text: 'Pura adrenalina y paisajes hermosos a lo largo del río Nanay. El equipamiento es de primera y los guías cuidan mucho la seguridad.', date: '11/06/2026' },
            { name: 'Lucía Valdivia', rating: 4, text: 'Muy entretenido. Remar en la selva te da una perspectiva completamente diferente del paisaje.', date: '05/06/2026' }
        ]
    },
    'detalleCaminata.html': {
        id: 'Caminata',
        title: 'Caminata en la Amazonía',
        price: 90,
        rating: 4.8,
        ratingsCount: 18,
        ratingDist: { 5: 15, 4: 2, 3: 1, 2: 0, 1: 0 },
        defaultComments: [
            { name: 'Marcos Vega', rating: 5, text: 'Una caminata en bosque primario inolvidable. Aprendimos sobre árboles milenarios gigantes y técnicas de supervivencia básica.', date: '13/06/2026' },
            { name: 'Valeria Castro', rating: 4, text: 'Excelente recorrido. Recomiendo llevar repelente fuerte y buenas botas para el lodo.', date: '09/06/2026' }
        ]
    },
    'detallePesca.html': {
        id: 'Pesca',
        title: 'Pesca Artesanal',
        price: 130,
        rating: 4.9,
        ratingsCount: 32,
        ratingDist: { 5: 29, 4: 3, 3: 0, 2: 0, 1: 0 },
        defaultComments: [
            { name: 'Guillermo Paz', rating: 5, text: 'Pescar pirañas usando las varas de bambú tradicionales fue divertidísimo. Luego nos cocinaron lo pescado, ¡delicioso!', date: '15/06/2026' },
            { name: 'Diana Torres', rating: 5, text: 'La paciencia de los pescadores locales es admirable. Te explican cómo leer el río y las corrientes. Gran tarde.', date: '10/06/2026' }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Determine current experience
    const pageName = window.location.pathname.split('/').pop() || 'detalleAma.html';
    const exp = EXPERIENCES[pageName] || EXPERIENCES['detalleAma.html'];

    // Load elements
    const adultInput = document.getElementById('booking-adults');
    const childInput = document.getElementById('booking-children');
    const dateInput = document.getElementById('booking-date');
    const nameInput = document.getElementById('booking-name');
    const emailInput = document.getElementById('booking-email');
    const phoneInput = document.getElementById('booking-phone');
    
    const adultPriceEl = document.getElementById('adult-price-summary');
    const childPriceEl = document.getElementById('child-price-summary');
    const totalEl = document.getElementById('total-price');
    const bookingForm = document.getElementById('booking-form');
    const bookingFields = document.getElementById('booking-fields');
    const bookingSuccess = document.getElementById('booking-success');

    // Set Min Date to Today
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Dynamic pricing calculator
    function updatePricing() {
        if (!adultInput || !childInput || !totalEl) return;
        
        const adultsCount = parseInt(adultInput.value) || 0;
        const childrenCount = parseInt(childInput.value) || 0;
        
        const adultTotal = adultsCount * exp.price;
        const childPrice = Math.round(exp.price * 0.7); // 30% discount for kids
        const childTotal = childrenCount * childPrice;
        const total = adultTotal + childTotal;

        if (adultPriceEl) adultPriceEl.textContent = `S/${adultTotal} (${adultsCount} × S/${exp.price})`;
        if (childPriceEl) childPriceEl.textContent = `S/${childTotal} (${childrenCount} × S/${childPrice})`;
        totalEl.textContent = `S/${total}`;
    }

    if (adultInput) adultInput.addEventListener('input', updatePricing);
    if (childInput) childInput.addEventListener('input', updatePricing);

    // Initial price calculation
    updatePricing();

    // Form Validation and Booking Confirmation
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear prior errors
            document.querySelectorAll('.invalid-feedback').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.booking-input').forEach(el => el.classList.remove('is-invalid'));

            let isValid = true;

            // Date validation
            if (!dateInput.value) {
                showError(dateInput, 'Seleccione una fecha para el viaje.');
                isValid = false;
            } else {
                const selectedDate = new Date(dateInput.value + 'T00:00:00');
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                    showError(dateInput, 'La fecha no puede ser en el pasado.');
                    isValid = false;
                }
            }

            // Travelers validation (must be at least 1 person in total, and at least 1 adult or child)
            const adults = parseInt(adultInput.value) || 0;
            const children = parseInt(childInput.value) || 0;
            if (adults + children <= 0) {
                showError(adultInput, 'Debe haber al menos 1 viajero.');
                isValid = false;
            } else if (adults <= 0 && children > 0) {
                showError(adultInput, 'Debe registrar al menos 1 adulto acompañante.');
                isValid = false;
            }

            // Contact details validation
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Ingrese su nombre completo.');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Ingrese un correo electrónico válido.');
                isValid = false;
            }

            const phoneRegex = /^[0-9+ \-]{9,15}$/;
            if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
                showError(phoneInput, 'Ingrese un número telefónico válido (mínimo 9 dígitos).');
                isValid = false;
            }

            if (isValid) {
                // Generate Booking Reference Number
                const bookingRef = 'SC-' + Math.floor(100000 + Math.random() * 900000);
                
                // Show Success View
                bookingFields.classList.add('d-none');
                bookingSuccess.classList.remove('d-none');
                
                document.getElementById('success-ref').textContent = bookingRef;
                document.getElementById('success-date').textContent = dateInput.value;
                document.getElementById('success-travelers').textContent = `${adults} Adulto(s) ${children > 0 ? ', ' + children + ' Niño(s)' : ''}`;
                document.getElementById('success-total').textContent = totalEl.textContent;
                document.getElementById('success-email').textContent = emailInput.value.trim();

                // Auto scroll to success message
                bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    function showError(inputElement, message) {
        inputElement.classList.add('is-invalid');
        const feedback = inputElement.parentElement.querySelector('.invalid-feedback') || inputElement.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = message;
            feedback.style.display = 'block';
        }
    }

    // --- COMMENTS / REVIEWS SYSTEM ---
    const commentsStorageKey = `comments_${exp.id}`;
    
    // Get saved comments or initialize defaults
    let comments = JSON.parse(localStorage.getItem(commentsStorageKey));
    if (!comments) {
        comments = exp.defaultComments;
        localStorage.setItem(commentsStorageKey, JSON.stringify(comments));
    }

    // Render Comments
    const commentsListEl = document.getElementById('comments-list');
    const commentCountEl = document.getElementById('comment-count-title');
    const reviewsCountHeader = document.getElementById('reviews-count-header');

    function renderComments() {
        if (!commentsListEl) return;
        commentsListEl.innerHTML = '';
        
        // Update counts
        const totalComments = comments.length;
        if (commentCountEl) commentCountEl.textContent = `Opiniones (${totalComments})`;
        if (reviewsCountHeader) reviewsCountHeader.textContent = `${totalComments} opiniones`;

        // Calculate and update ratings average if necessary (but let's keep it clean)
        comments.forEach(c => {
            const initials = c.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
            
            // Create Star HTML
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= c.rating) {
                    starsHtml += '<i class="bi bi-star-fill text-warning me-1"></i>';
                } else {
                    starsHtml += '<i class="bi bi-star text-muted me-1"></i>';
                }
            }

            const commentHtml = `
                <div class="comment-card fade-in">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div class="d-flex align-items-center gap-3">
                            <div class="user-initials-avatar">${initials}</div>
                            <div>
                                <h6 class="mb-0 fw-semibold">${escapeHTML(c.name)}</h6>
                                <div class="text-muted small">${c.date}</div>
                            </div>
                        </div>
                        <div class="rating-stars">${starsHtml}</div>
                    </div>
                    <p class="mb-0 text-muted fs-6" style="white-space: pre-line;">${escapeHTML(c.text)}</p>
                </div>
            `;
            commentsListEl.insertAdjacentHTML('beforeend', commentHtml);
        });
    }

    // Helper to escape HTML to prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    renderComments();

    // Comment Form Submission
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newNameInput = document.getElementById('comment-author-name');
            const newTextInput = document.getElementById('comment-text');
            const selectedRatingInput = document.querySelector('input[name="comment-rating"]:checked');

            let isFormValid = true;

            // Clear errors
            document.getElementById('comment-name-error').style.display = 'none';
            document.getElementById('comment-text-error').style.display = 'none';
            document.getElementById('comment-rating-error').style.display = 'none';

            if (!newNameInput.value.trim()) {
                document.getElementById('comment-name-error').textContent = 'Ingrese su nombre.';
                document.getElementById('comment-name-error').style.display = 'block';
                isFormValid = false;
            }

            if (!newTextInput.value.trim()) {
                document.getElementById('comment-text-error').textContent = 'Escriba un comentario sobre su experiencia.';
                document.getElementById('comment-text-error').style.display = 'block';
                isFormValid = false;
            }

            if (!selectedRatingInput) {
                document.getElementById('comment-rating-error').textContent = 'Seleccione una calificación (estrellas).';
                document.getElementById('comment-rating-error').style.display = 'block';
                isFormValid = false;
            }

            if (isFormValid) {
                const newComment = {
                    name: newNameInput.value.trim(),
                    rating: parseInt(selectedRatingInput.value),
                    text: newTextInput.value.trim(),
                    date: new Date().toLocaleDateString('es-ES')
                };

                // Add to list and save to storage
                comments.unshift(newComment);
                localStorage.setItem(commentsStorageKey, JSON.stringify(comments));

                // Re-render and reset form
                renderComments();
                commentForm.reset();

                // Clear checked radio stars
                document.querySelectorAll('input[name="comment-rating"]').forEach(radio => radio.checked = false);
            }
        });
    }
});
