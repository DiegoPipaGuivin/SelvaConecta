// Configuration for Experiences
const EXPERIENCES = {
    'detalleAma.html': {
        id: 'Ama',
        title: 'Tour en la Amazonía',
        price: 150,
        capacity: 20,
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
        capacity: 20,
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
        capacity: 20,
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
        capacity: 20,
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
        capacity: 20,
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
        capacity: 20,
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
// --- Interactividad de las Estrellas del Guía ---
// --- Interactividad para colorear las estrellas (Experiencia y Guía) ---
function habilitarEstrellas(selectorClass) {
    document.querySelectorAll(`${selectorClass} label`).forEach(label => {
        label.addEventListener('click', function() {
            const selectedInput = document.getElementById(this.getAttribute('for'));
            if (!selectedInput) return;
            
            // Forzar que el input oculto se marque (checked)
            selectedInput.checked = true;
            
            const val = parseInt(selectedInput.value);
            
            // Colorear las estrellas solo de este grupo
            document.querySelectorAll(`${selectorClass} label`).forEach(l => {
                const currentInput = document.getElementById(l.getAttribute('for'));
                if (currentInput && parseInt(currentInput.value) <= val) {
                    l.classList.remove('bi-star');
                    l.classList.add('bi-star-fill');
                } else if (currentInput) {
                    l.classList.remove('bi-star-fill');
                    l.classList.add('bi-star');
                }
            });
        });
    });
}

// Inicializar ambos grupos de estrellas
habilitarEstrellas('.rating-stars');
habilitarEstrellas('.rating-stars-guide');
    // Determine current experience
    const pageName = window.location.pathname.split('/').pop() || 'detalleAma.html';
    const exp = EXPERIENCES[pageName] || EXPERIENCES['detalleAma.html'];
    const reservas =
JSON.parse(localStorage.getItem('sc_reservas')) || [];

const reservasExp =
reservas.filter(r =>
    r.experiencia === exp.title
);

const cuposDisponibles = exp.capacity - reservasExp.length;
    const cupos = document.getElementById('cupos-disponibles');
    if (cupos) {
        cupos.innerHTML = `Quedan ${cuposDisponibles} cupos`;
    }

    // Load elements
    const adultInput = document.getElementById('booking-adults');
    const childInput = document.getElementById('booking-children');
    const dateInput = document.getElementById('booking-date');
    
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
        const fechasAgotadas = [

'2026-07-10',
'2026-07-15',
'2026-07-20'

];
dateInput.addEventListener(
'change',
function(){

    if(
        fechasAgotadas.includes(
            this.value
        )
    ){

        alert(
        'Fecha agotada'
        );

        this.value = '';

    }

});
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
        
        return { total, adultsCount, childrenCount };
    }

    if (adultInput) adultInput.addEventListener('input', updatePricing);
    if (childInput) childInput.addEventListener('input', updatePricing);

    // Initial price calculation
    updatePricing();

    // --- NAVBAR AUTH SYNC ---
    function updateNavbarAuth() {
        const isLoggedIn = localStorage.getItem('touristLoggedIn') === 'true';
        const authBtn = document.getElementById('btn-auth-tourist');
        const buttonsContainer = document.getElementById('navbar-buttons-container');
        
        if (!buttonsContainer) return;
        
        // Inject global auth modal if not exists
        let globalAuthModal = document.getElementById('authModal');
        if (!globalAuthModal) {
            const modalHtml = `
                <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content rounded-4 border-0 shadow-lg">
                            <div class="modal-header border-0 pb-0">
                                <h5 class="modal-title font-outfit fw-bold text-success fs-4" id="authModalLabel">Ingresa a SelvaConecta</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div class="modal-tabs d-flex justify-content-start gap-2 mb-4">
                                    <button type="button" class="modal-tab-btn active" id="tab-login">Iniciar Sesión</button>
                                    <button type="button" class="modal-tab-btn" id="tab-register">Registrarse</button>
                                </div>
                                <form id="login-form">
                                    <div class="mb-3">
                                        <label for="login-email" class="form-label fw-semibold text-muted small">CORREO ELECTRÓNICO</label>
                                        <input type="email" class="form-control booking-input" id="login-email" placeholder="ejemplo@correo.com" required>
                                    </div>
                                    <div class="mb-4">
                                        <label for="login-password" class="form-label fw-semibold text-muted small">CONTRASEÑA</label>
                                        <input type="password" class="form-control booking-input" id="login-password" placeholder="••••••" required>
                                    </div>
                                    <button type="submit" class="btn btn-success w-100 py-2.5 rounded-pill fw-bold">Iniciar Sesión</button>
                                </form>
                                <form id="register-form" class="d-none">
                                    <div class="mb-3">
                                        <label for="reg-name" class="form-label fw-semibold text-muted small">NOMBRE COMPLETO</label>
                                        <input type="text" class="form-control booking-input" id="reg-name" placeholder="Nombre completo" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="reg-email" class="form-label fw-semibold text-muted small">CORREO ELECTRÓNICO</label>
                                        <input type="email" class="form-control booking-input" id="reg-email" placeholder="ejemplo@correo.com" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="reg-phone" class="form-label fw-semibold text-muted small">TELÉFONO / WHATSAPP</label>
                                        <input type="tel" class="form-control booking-input" id="reg-phone" placeholder="987654321" required>
                                    </div>
                                    <div class="mb-4">
                                        <label for="reg-password" class="form-label fw-semibold text-muted small">CONTRASEÑA</label>
                                        <input type="password" class="form-control booking-input" id="reg-password" placeholder="Mínimo 6 caracteres" required minlength="6">
                                    </div>
                                    <button type="submit" class="btn btn-success w-100 py-2.5 rounded-pill fw-bold">Crear Cuenta</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Tab Toggle
            const tLog = document.getElementById('tab-login');
            const tReg = document.getElementById('tab-register');
            const fLog = document.getElementById('login-form');
            const fReg = document.getElementById('register-form');
            
            tLog.addEventListener('click', () => {
                tLog.classList.add('active');
                tReg.classList.remove('active');
                fLog.classList.remove('d-none');
                fReg.classList.add('d-none');
            });
            
            tReg.addEventListener('click', () => {
                tReg.classList.add('active');
                tLog.classList.remove('active');
                fReg.classList.remove('d-none');
                fLog.classList.add('d-none');
            });
            
            // Form Submissions
            fLog.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const name = email.split('@')[0];
                const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
                
                localStorage.setItem('touristLoggedIn', 'true');
                localStorage.setItem('touristName', formattedName);
                localStorage.setItem('touristEmail', email);
                localStorage.setItem('touristPhone', '999888777');
                
                bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
                fLog.reset();
                updateNavbarAuth();
            });
            
            fReg.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('reg-name').value;
                const email = document.getElementById('reg-email').value;
                const phone = document.getElementById('reg-phone').value;
                
                localStorage.setItem('touristLoggedIn', 'true');
                localStorage.setItem('touristName', name);
                localStorage.setItem('touristEmail', email);
                localStorage.setItem('touristPhone', phone);
                
                bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
                fReg.reset();
                updateNavbarAuth();
            });
        }
        
        const oldUserContainer = document.getElementById('user-logged-in-container');
        if (oldUserContainer) oldUserContainer.remove();
        
        if (isLoggedIn) {
            if (authBtn) authBtn.style.display = 'none';
            
            const name = localStorage.getItem('touristName') || 'Turista';
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
            
            const userContainerHtml = `
<div class="d-flex align-items-center gap-2"
id="user-logged-in-container">

    <span class="user-avatar-nav">
        ${initials}
    </span>

    <span class="text-success fw-semibold small">
        Hola, ${name}
    </span>

    <a
        href="perfil.html"
        class="btn btn-sm btn-outline-success"
    >
        Mi Perfil
    </a>

    <button
        class="btn btn-link text-danger text-decoration-none fw-semibold p-0 ms-2 small"
        id="btn-logout-tourist"
    >
        Cerrar Sesión
    </button>

</div>
`;
            
            const regOperatorBtn = document.getElementById('btn-reg-operator');
            if (regOperatorBtn) {
                regOperatorBtn.insertAdjacentHTML('beforebegin', userContainerHtml);
            } else {
                buttonsContainer.insertAdjacentHTML('beforeend', userContainerHtml);
            }
            
            const logoutBtn = document.getElementById('btn-logout-tourist');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    localStorage.removeItem('touristLoggedIn');
                    localStorage.removeItem('touristName');
                    localStorage.removeItem('touristEmail');
                    localStorage.removeItem('touristPhone');
                    updateNavbarAuth();
                });
            }
        } else {
            if (authBtn) authBtn.style.display = 'inline-block';
        }
    }

    // Initialize Navbar Auth state
    updateNavbarAuth();



    // --- FORM VALIDATION AND BOOKING REGISTRATION FLOW ---
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

            // Travelers validation
            const adults = parseInt(adultInput.value) || 0;
            const children = parseInt(childInput.value) || 0;
            if (adults + children <= 0) {
                showError(adultInput, 'Debe haber al menos 1 viajero.');
                isValid = false;
            } else if (adults <= 0 && children > 0) {
                showError(adultInput, 'Debe registrar al menos 1 adulto acompañante.');
                isValid = false;
            }

            if (isValid) {
                const isLoggedIn = localStorage.getItem('touristLoggedIn') === 'true';
                const pricingInfo = updatePricing();
                
                if (isLoggedIn) {
                    // Open Quick Confirmation Modal
                    openConfirmBookingModal(pricingInfo);
                } else {
                    // Open Tourist Auth/Registration Modal
                    openTouristRegistrationModal(pricingInfo);
                }
            }
        });
    }

    function openConfirmBookingModal(pricingInfo) {
        let confirmModal = document.getElementById('confirmBookingModal');
        if (!confirmModal) {
            const modalHtml = `
                <div class="modal fade" id="confirmBookingModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content rounded-4 border-0 shadow-lg">
                            <div class="modal-header border-0 pb-0">
                                <h5 class="modal-title font-outfit fw-bold text-success fs-4">Confirmar Reserva</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <p class="text-muted">Por favor, confirma los detalles de tu reserva antes de enviarla al operador:</p>
                                <div class="bg-light p-3 rounded-3 mb-4">
                                    <div class="mb-2"><strong>Experiencia:</strong> <span class="text-dark fw-semibold" id="confirm-exp-title"></span></div>
                                    <div class="mb-2"><strong>Fecha del Viaje:</strong> <span class="text-dark" id="confirm-exp-date"></span></div>
                                    <div class="mb-2"><strong>Viajeros:</strong> <span class="text-dark" id="confirm-exp-travelers"></span></div>
                                    <div class="mb-0"><strong>Total Estimado:</strong> <span class="text-success fw-bold fs-5" id="confirm-exp-total"></span></div>
                                </div>
                                <div class="d-flex gap-2">
                                    <button type="button" class="btn btn-outline-secondary rounded-pill w-50" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-success rounded-pill w-50 fw-bold" id="btn-submit-confirm-booking">Confirmar Reserva</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            confirmModal = document.getElementById('confirmBookingModal');
        }

        // Set variables
        document.getElementById('confirm-exp-title').textContent = exp.title;
        document.getElementById('confirm-exp-date').textContent = dateInput.value;
        document.getElementById('confirm-exp-travelers').textContent = `${pricingInfo.adultsCount} Adulto(s) ${pricingInfo.childrenCount > 0 ? ', ' + pricingInfo.childrenCount + ' Niño(s)' : ''}`;
        document.getElementById('confirm-exp-total').textContent = `S/${pricingInfo.total}`;

        const bootstrapModal = new bootstrap.Modal(confirmModal);
        bootstrapModal.show();

        const btnConfirmSubmit = document.getElementById('btn-submit-confirm-booking');
        
        // Remove existing listener to avoid stacking
        const newBtnConfirmSubmit = btnConfirmSubmit.cloneNode(true);
        btnConfirmSubmit.parentNode.replaceChild(newBtnConfirmSubmit, btnConfirmSubmit);

        newBtnConfirmSubmit.addEventListener('click', () => {
            bootstrapModal.hide();
            openPaymentModal(pricingInfo);
        });
    }

    function openTouristRegistrationModal(pricingInfo) {
        let authModal = document.getElementById('detailAuthModal');
        if (!authModal) {
            const modalHtml = `
                <div class="modal fade" id="detailAuthModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content rounded-4 border-0 shadow-lg">
                            <div class="modal-header border-0 pb-0">
                                <h5 class="modal-title font-outfit fw-bold text-success fs-4">Iniciar Sesión o Registrarse</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div class="modal-tabs d-flex justify-content-start gap-2 mb-4">
                                    <button type="button" class="modal-tab-btn active" id="modal-tab-reg">Registrarse</button>
                                    <button type="button" class="modal-tab-btn" id="modal-tab-login">Iniciar Sesión</button>
                                </div>
                                
                                <p class="text-muted small mb-4">Debes registrarte o iniciar sesión para completar tu reserva. Capturaremos tus datos para coordinar el viaje.</p>
                                
                                <!-- REGISTRATION FORM -->
                                <form id="modal-reg-form">
                                    <div class="mb-3">
                                        <label for="m-reg-name" class="form-label fw-semibold text-muted small">NOMBRE COMPLETO</label>
                                        <input type="text" class="form-control booking-input" id="m-reg-name" required placeholder="Nombre completo">
                                    </div>
                                    <div class="mb-3">
                                        <label for="m-reg-email" class="form-label fw-semibold text-muted small">CORREO ELECTRÓNICO</label>
                                        <input type="email" class="form-control booking-input" id="m-reg-email" required placeholder="ejemplo@correo.com">
                                    </div>
                                    <div class="mb-3">
                                        <label for="m-reg-phone" class="form-label fw-semibold text-muted small">TELÉFONO / WHATSAPP</label>
                                        <input type="tel" class="form-control booking-input" id="m-reg-phone" required placeholder="987654321">
                                    </div>
                                    <div class="mb-4">
                                        <label for="m-reg-pass" class="form-label fw-semibold text-muted small">CONTRASEÑA</label>
                                        <input type="password" class="form-control booking-input" id="m-reg-pass" required minlength="6" placeholder="Mínimo 6 caracteres">
                                    </div>
                                    <button type="submit" class="btn btn-success w-100 py-2.5 rounded-pill fw-bold">Crear Cuenta y Confirmar Reserva</button>
                                </form>
                                
                                <!-- LOGIN FORM -->
                                <form id="modal-login-form" class="d-none">
                                    <div class="mb-3">
                                        <label for="m-log-email" class="form-label fw-semibold text-muted small">CORREO ELECTRÓNICO</label>
                                        <input type="email" class="form-control booking-input" id="m-log-email" required placeholder="ejemplo@correo.com">
                                    </div>
                                    <div class="mb-4">
                                        <label for="m-log-pass" class="form-label fw-semibold text-muted small">CONTRASEÑA</label>
                                        <input type="password" class="form-control booking-input" id="m-log-pass" required placeholder="••••••">
                                    </div>
                                    <button type="submit" class="btn btn-success w-100 py-2.5 rounded-pill fw-bold">Iniciar Sesión y Confirmar Reserva</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            authModal = document.getElementById('detailAuthModal');
            
            // Tab Toggle
            const tabReg = document.getElementById('modal-tab-reg');
            const tabLog = document.getElementById('modal-tab-login');
            const regForm = document.getElementById('modal-reg-form');
            const logForm = document.getElementById('modal-login-form');
            
            tabReg.addEventListener('click', () => {
                tabReg.classList.add('active');
                tabLog.classList.remove('active');
                regForm.classList.remove('d-none');
                logForm.classList.add('d-none');
            });
            
            tabLog.addEventListener('click', () => {
                tabLog.classList.add('active');
                tabReg.classList.remove('active');
                logForm.classList.remove('d-none');
                regForm.classList.add('d-none');
            });
        }

        const bootstrapModal = new bootstrap.Modal(authModal);
        bootstrapModal.show();

        const mRegForm = document.getElementById('modal-reg-form');
        const mLogForm = document.getElementById('modal-login-form');

        // Reset forms
        mRegForm.reset();
        mLogForm.reset();

        // Remove old listeners by replacing forms
        const newMRegForm = mRegForm.cloneNode(true);
        mRegForm.parentNode.replaceChild(newMRegForm, mRegForm);
        const newMLogForm = mLogForm.cloneNode(true);
        mLogForm.parentNode.replaceChild(newMLogForm, mLogForm);

        // Bind registration
        newMRegForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('m-reg-name').value;
            const email = document.getElementById('m-reg-email').value;
            const phone = document.getElementById('m-reg-phone').value;
            
            localStorage.setItem('touristLoggedIn', 'true');
            localStorage.setItem('touristName', name);
            localStorage.setItem('touristEmail', email);
            localStorage.setItem('touristPhone', phone);
            
            bootstrapModal.hide();
            updateNavbarAuth();
            openPaymentModal(pricingInfo);
        });

        // Bind login
        newMLogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('m-log-email').value;
            const name = email.split('@')[0];
            const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
            
            localStorage.setItem('touristLoggedIn', 'true');
            localStorage.setItem('touristName', formattedName);
            localStorage.setItem('touristEmail', email);
            localStorage.setItem('touristPhone', '999888777');
            
            bootstrapModal.hide();
            updateNavbarAuth();
            openPaymentModal(pricingInfo);
        });
    }


    // --- PAYMENT MODAL ---
    function openPaymentModal(pricingInfo) {
        let payModal = document.getElementById('paymentModal');
        if (!payModal) {
            const modalHtml = `
                <div class="modal fade" id="paymentModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content rounded-4 border-0 shadow-lg">
                            <div class="modal-header border-0 pb-0">
                                <h5 class="modal-title font-outfit fw-bold text-success fs-4">
                                    <i class="bi bi-lock-fill me-2"></i>Pago seguro
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">

                                <div class="bg-light rounded-3 px-4 py-3 mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
                                    <div class="text-muted small">
                                        <strong class="text-dark" id="pay-exp-title"></strong><br>
                                        <span id="pay-exp-date"></span> &bull; <span id="pay-exp-travelers"></span>
                                    </div>
                                    <div class="fs-4 fw-bold text-success" id="pay-exp-total"></div>
                                </div>

                                <p class="fw-semibold text-muted small mb-3">ELIGE TU MÉTODO DE PAGO</p>
                                <div class="d-flex gap-3 mb-4 flex-wrap">
                                    <button type="button" class="btn btn-outline-success rounded-pill px-4 fw-semibold" id="pay-tab-yape" data-method="yape">
                                        <i class="bi bi-phone-fill me-1" style="color:#6D28D9;"></i>Yape
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary rounded-pill px-4 fw-semibold" id="pay-tab-card" data-method="tarjeta">
                                        <i class="bi bi-credit-card me-1"></i>Tarjeta
                                    </button>
                                </div>

                                <div id="pay-panel-yape" class="d-none">
                                    <div class="text-center py-2">
                                        <div class="bg-white border rounded-4 d-inline-block p-3 mb-3 shadow-sm">
                                            <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="160" height="160" fill="white"/>
                                                <rect x="10" y="10" width="50" height="50" fill="none" stroke="#6D28D9" stroke-width="4"/>
                                                <rect x="20" y="20" width="30" height="30" fill="#6D28D9"/>
                                                <rect x="100" y="10" width="50" height="50" fill="none" stroke="#6D28D9" stroke-width="4"/>
                                                <rect x="110" y="20" width="30" height="30" fill="#6D28D9"/>
                                                <rect x="10" y="100" width="50" height="50" fill="none" stroke="#6D28D9" stroke-width="4"/>
                                                <rect x="20" y="110" width="30" height="30" fill="#6D28D9"/>
                                                <rect x="70" y="10" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="70" y="30" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="80" y="70" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="100" y="70" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="120" y="70" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="70" y="80" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="70" y="100" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="90" y="100" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="110" y="110" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="80" y="120" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="100" y="130" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="120" y="120" width="10" height="10" fill="#6D28D9"/>
                                                <rect x="62" y="62" width="36" height="36" rx="6" fill="#6D28D9"/>
                                                <text x="80" y="86" text-anchor="middle" fill="white" font-size="20" font-weight="bold" font-family="Arial">Y</text>
                                            </svg>
                                        </div>
                                        <div class="mb-1 fw-bold text-dark">SelvaConecta SAC</div>
                                        <div class="text-muted small mb-1">Escanea con tu app Yape o yapea al número:</div>
                                        <div class="fs-5 fw-bold mb-3" style="color:#6D28D9;">987 654 321</div>
                                        <div class="alert alert-warning py-2 px-3 rounded-3 text-start small mb-4">
                                            <i class="bi bi-exclamation-triangle-fill me-1"></i>
                                            Tras yapear, ingresa el <strong>código de operación</strong> que aparece en tu app Yape.
                                        </div>
                                        <div class="mb-3 text-start">
                                            <label class="form-label fw-semibold text-muted small">CÓDIGO DE OPERACIÓN</label>
                                            <input type="text" id="yape-code" class="form-control booking-input" placeholder="Ej: 123456789" maxlength="12" inputmode="numeric">
                                            <div id="yape-code-error" class="text-danger small mt-1" style="display:none;">Ingresa el código de operación Yape.</div>
                                        </div>
                                        <button type="button" class="btn w-100 py-3 rounded-pill fw-bold text-white" id="btn-pay-yape" style="background:#6D28D9;border:none;">
                                            <i class="bi bi-check-circle-fill me-2"></i>Confirmar pago con Yape
                                        </button>
                                    </div>
                                </div>

                                <div id="pay-panel-card" class="d-none">
                                    <div class="mb-3">
                                        <label class="form-label fw-semibold text-muted small">NÚMERO DE TARJETA</label>
                                        <div class="position-relative">
                                            <input type="text" id="card-number" class="form-control booking-input pe-5" placeholder="1234 5678 9012 3456" maxlength="19" inputmode="numeric">
                                            <span class="position-absolute top-50 end-0 translate-middle-y me-3" id="card-brand-icon">
                                                <i class="bi bi-credit-card text-muted fs-5"></i>
                                            </span>
                                        </div>
                                        <div id="card-number-error" class="text-danger small mt-1" style="display:none;"></div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label fw-semibold text-muted small">NOMBRE EN LA TARJETA</label>
                                        <input type="text" id="card-name" class="form-control booking-input" placeholder="Como aparece en tu tarjeta" autocomplete="cc-name">
                                        <div id="card-name-error" class="text-danger small mt-1" style="display:none;"></div>
                                    </div>
                                    <div class="row g-3 mb-3">
                                        <div class="col-6">
                                            <label class="form-label fw-semibold text-muted small">VENCIMIENTO</label>
                                            <input type="text" id="card-expiry" class="form-control booking-input" placeholder="MM/AA" maxlength="5" inputmode="numeric">
                                            <div id="card-expiry-error" class="text-danger small mt-1" style="display:none;"></div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label fw-semibold text-muted small d-flex align-items-center gap-1">
                                                CVV
                                                <span data-bs-toggle="tooltip" title="Los 3 dígitos al dorso de tu tarjeta (4 en Amex)">
                                                    <i class="bi bi-question-circle text-muted"></i>
                                                </span>
                                            </label>
                                            <input type="password" id="card-cvv" class="form-control booking-input" placeholder="•••" maxlength="4" inputmode="numeric" autocomplete="cc-csc">
                                            <div id="card-cvv-error" class="text-danger small mt-1" style="display:none;"></div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center gap-2 text-muted small mb-4">
                                        <i class="bi bi-shield-lock-fill text-success fs-5"></i>
                                        Datos cifrados con SSL 256 bits. No almacenamos tu tarjeta.
                                    </div>
                                    <button type="button" class="btn btn-success w-100 py-3 rounded-pill fw-bold" id="btn-pay-card">
                                        <i class="bi bi-lock-fill me-2"></i>Pagar <span id="btn-pay-card-amount"></span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            payModal = document.getElementById('paymentModal');

            // Tab switching
            function activateTab(method) {
                const isYape = method === 'yape';
                document.getElementById('pay-tab-yape').className = isYape
                    ? 'btn btn-outline-success rounded-pill px-4 fw-semibold'
                    : 'btn btn-outline-secondary rounded-pill px-4 fw-semibold';
                document.getElementById('pay-tab-card').className = !isYape
                    ? 'btn btn-outline-success rounded-pill px-4 fw-semibold'
                    : 'btn btn-outline-secondary rounded-pill px-4 fw-semibold';
                document.getElementById('pay-panel-yape').classList.toggle('d-none', !isYape);
                document.getElementById('pay-panel-card').classList.toggle('d-none', isYape);
            }
            document.getElementById('pay-tab-yape').addEventListener('click', () => activateTab('yape'));
            document.getElementById('pay-tab-card').addEventListener('click', () => activateTab('card'));

            // Card number formatting + brand detection
            document.getElementById('card-number').addEventListener('input', function () {
                let v = this.value.replace(/\D/g, '').substring(0, 16);
                this.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
                const icon = document.getElementById('card-brand-icon');
                if (/^4/.test(v)) {
                    icon.innerHTML = '<span class="fw-bold small" style="color:#1A1F71;">VISA</span>';
                } else if (/^5[1-5]/.test(v) || /^2[2-7]/.test(v)) {
                    icon.innerHTML = '<span class="fw-bold small" style="color:#EB001B;">MC</span>';
                } else {
                    icon.innerHTML = '<i class="bi bi-credit-card text-muted fs-5"></i>';
                }
            });

            // Expiry auto-format
            document.getElementById('card-expiry').addEventListener('input', function () {
                let v = this.value.replace(/\D/g, '').substring(0, 4);
                if (v.length >= 3) v = v.substring(0, 2) + '/' + v.substring(2);
                this.value = v;
            });

            // CVV numbers only
            document.getElementById('card-cvv').addEventListener('input', function () {
                this.value = this.value.replace(/\D/g, '').substring(0, 4);
            });

            // Card name uppercase
            document.getElementById('card-name').addEventListener('input', function () {
                this.value = this.value.toUpperCase();
            });
        }

        // Populate summary strip
        document.getElementById('pay-exp-title').textContent = exp.title;
        document.getElementById('pay-exp-date').textContent = dateInput.value;
        document.getElementById('pay-exp-travelers').textContent =
            `${pricingInfo.adultsCount} adulto(s)${pricingInfo.childrenCount > 0 ? ', ' + pricingInfo.childrenCount + ' niño(s)' : ''}`;
        document.getElementById('pay-exp-total').textContent = `S/${pricingInfo.total}`;
        document.getElementById('btn-pay-card-amount').textContent = `S/${pricingInfo.total}`;

        // Reset to Yape tab and clear inputs
        document.getElementById('pay-tab-yape').click();
        document.getElementById('yape-code').value = '';
        document.getElementById('yape-code-error').style.display = 'none';

        const bsPayModal = new bootstrap.Modal(payModal);
        bsPayModal.show();

        // Yape pay
        const btnYape = document.getElementById('btn-pay-yape');
        const newBtnYape = btnYape.cloneNode(true);
        btnYape.parentNode.replaceChild(newBtnYape, btnYape);
        newBtnYape.addEventListener('click', () => {
            const code = document.getElementById('yape-code').value.trim();
            if (!code) {
                document.getElementById('yape-code-error').style.display = 'block';
                return;
            }
            document.getElementById('yape-code-error').style.display = 'none';
            bsPayModal.hide();
            completeBooking(pricingInfo.adultsCount, pricingInfo.childrenCount, `S/${pricingInfo.total}`, `Yape (Op: ${code})`);
        });

        // Card pay
        const btnCard = document.getElementById('btn-pay-card');
        const newBtnCard = btnCard.cloneNode(true);
        btnCard.parentNode.replaceChild(newBtnCard, btnCard);
        newBtnCard.addEventListener('click', () => {
            let valid = true;
            const num  = document.getElementById('card-number').value.replace(/\s/g, '');
            const name = document.getElementById('card-name').value.trim();
            const exp_ = document.getElementById('card-expiry').value.trim();
            const cvv  = document.getElementById('card-cvv').value.trim();

            ['card-number-error','card-name-error','card-expiry-error','card-cvv-error'].forEach(id => {
                document.getElementById(id).style.display = 'none';
            });

            if (num.length < 16) {
                document.getElementById('card-number-error').textContent = 'Ingresa un número de tarjeta válido (16 dígitos).';
                document.getElementById('card-number-error').style.display = 'block';
                valid = false;
            }
            if (!name) {
                document.getElementById('card-name-error').textContent = 'Ingresa el nombre tal como aparece en tu tarjeta.';
                document.getElementById('card-name-error').style.display = 'block';
                valid = false;
            }
            if (!/^\d{2}\/\d{2}$/.test(exp_)) {
                document.getElementById('card-expiry-error').textContent = 'Formato inválido. Usa MM/AA (ej: 08/27).';
                document.getElementById('card-expiry-error').style.display = 'block';
                valid = false;
            }
            if (cvv.length < 3) {
                document.getElementById('card-cvv-error').textContent = 'CVV inválido (3 o 4 dígitos).';
                document.getElementById('card-cvv-error').style.display = 'block';
                valid = false;
            }
            if (!valid) return;

            const brand = num.startsWith('4') ? 'Visa' : (num[0] === '5' || num[0] === '2') ? 'Mastercard' : 'Tarjeta';
            const masked = '**** **** **** ' + num.slice(-4);
            bsPayModal.hide();
            completeBooking(pricingInfo.adultsCount, pricingInfo.childrenCount, `S/${pricingInfo.total}`, `${brand} (${masked})`);
        });
    }

    function completeBooking(adults, children, totalStr, paymentMethod) {
        // Generate Booking Reference Number
        const bookingRef = 'SC-' + Math.floor(100000 + Math.random() * 900000);

        const nuevaReserva = {
    codigo: bookingRef,
    experiencia: exp.title,
    fecha: dateInput.value,
    adultos: adults,
    ninos: children,
    total: totalStr,
    usuario: localStorage.getItem('touristEmail'),
    estado: 'Confirmada',
    metodoPago: paymentMethod || 'No especificado',
    fechaRegistro: new Date().toLocaleString()
};

let reservas =
JSON.parse(localStorage.getItem('sc_reservas')) || [];

reservas.push(nuevaReserva);

localStorage.setItem(
    'sc_reservas',
    JSON.stringify(reservas)
);
        
        // Show Success View
        bookingFields.classList.add('d-none');
        bookingSuccess.classList.remove('d-none');
        
        document.getElementById('success-ref').textContent = bookingRef;
        document.getElementById('success-date').textContent = dateInput.value;
        document.getElementById('success-travelers').textContent = `${adults} Adulto(s) ${children > 0 ? ', ' + children + ' Niño(s)' : ''}`;
        document.getElementById('success-total').textContent = totalStr;
        document.getElementById('success-email').textContent = localStorage.getItem('touristEmail') || 'tu correo';
        const successPaymentEl = document.getElementById('success-payment');
        if (successPaymentEl) successPaymentEl.textContent = paymentMethod || 'No especificado';

        // Auto scroll to success message
        bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

    // Render Comments List
    const commentsListEl = document.getElementById('comments-list');

   function renderComments() {
    if (!commentsListEl) return;
    commentsListEl.innerHTML = '';
    
    comments.forEach(c => {
        // Generar iniciales del usuario (ej: "Alejandra Ruiz" -> "AR")
        const initials = c.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        
        // Crear estrellas HTML para la EXPERIENCIA GENERAL
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= c.rating) {
                starsHtml += '<i class="bi bi-star-fill text-warning me-1"></i>';
            } else {
                starsHtml += '<i class="bi bi-star text-muted me-1"></i>';
            }
        }

        // Crear estrellas para el GUÍA LOCAL (Por defecto 5 si es antiguo)
        const estrellasGuia = '⭐'.repeat(c.guideRating || 5);

        // Construir la tarjeta del comentario completa combinando todos los datos
        const commentHTML = `
            <div class="card border-0 shadow-sm mb-3">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style="width: 45px; height: 45px; font-weight: bold;">
                            ${initials}
                        </div>
                        <div>
                            <h6 class="mb-0 fw-bold font-outfit">${escapeHTML(c.name)}</h6>
                            <small class="text-muted">${escapeHTML(c.date)}</small>
                        </div>
                    </div>
                    
                    <div class="mb-2">
                        ${starsHtml} <span class="ms-2 small text-muted">Experiencia</span>
                    </div>
                    
                    <div class="mb-3 small">
                        <span class="badge bg-light text-dark border">
                            <i class="bi bi-person-badge text-success me-1"></i>Guía Local: ${estrellasGuia}
                        </span>
                    </div>
                    
                    <p class="mb-0 text-secondary">${escapeHTML(c.text)}</p>
                </div>
            </div>
        `;
        
        // Insertar la tarjeta en la lista
        commentsListEl.insertAdjacentHTML('beforeend', commentHTML);
    });
}

// Función Helper de seguridad (por si no la tienes definida arriba en detalle.js)
function escapeHTML(str) {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

    // --- DYNAMIC RATINGS CALCULATION AND DISTRIBUTIONS ---
    function updateRatingsStats() {
        const ratingsDistList = document.getElementById('ratings-distribution-list');
        const totalReviews = comments.length;
        
        // Calculate statistics
        let sum = 0;
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        
        comments.forEach(c => {
            sum += c.rating;
            counts[c.rating] = (counts[c.rating] || 0) + 1;
        });
        
        const avgRating = totalReviews > 0 ? (sum / totalReviews).toFixed(1) : '0.0';
        
        // Update average rating text in header
        const avgHeaderEl = document.querySelector('.detail-header-section .fw-bold.me-1');
        if (avgHeaderEl) {
            avgHeaderEl.textContent = avgRating;
        }
        
        // Update count text in header
        const countHeaderEl = document.getElementById('reviews-count-header');
        if (countHeaderEl) {
            countHeaderEl.textContent = `${totalReviews} opiniones`;
        }
        
        // Update count text in section title
        const countTitleEl = document.getElementById('comment-count-title');
        if (countTitleEl) {
            countTitleEl.textContent = `Opiniones (${totalReviews})`;
        }
        
        // Render rating progress bars dynamically
        if (ratingsDistList) {
            ratingsDistList.innerHTML = '';
            for (let star = 5; star >= 1; star--) {
                const count = counts[star] || 0;
                const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                
                const barHtml = `
                    <div class="rating-bar-container">
                        <span class="rating-bar-label">${star} estrellas</span>
                        <div class="rating-bar-progress">
                            <div class="rating-bar-fill" style="width: ${percent}%"></div>
                        </div>
                        <span class="rating-bar-count">${count}</span>
                    </div>
                `;
                ratingsDistList.insertAdjacentHTML('beforeend', barHtml);
            }
        }
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

    // Initial render of reviews and calculations
    renderComments();
    updateRatingsStats();

    // Comment Form Submission
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        // --- NUEVO: Interactividad para colorear las estrellas del Guía ---
    document.querySelectorAll('.rating-stars-guide label').forEach(label => {
        label.addEventListener('click', function() {
            const selectedInput = document.getElementById(this.getAttribute('for'));
            if (!selectedInput) return;
            const val = parseInt(selectedInput.value);
            
            document.querySelectorAll('.rating-stars-guide label').forEach(l => {
                const currentInput = document.getElementById(l.getAttribute('for'));
                if (currentInput && parseInt(currentInput.value) <= val) {
                    l.classList.remove('bi-star');
                    l.classList.add('bi-star-fill');
                } else if (currentInput) {
                    l.classList.remove('bi-star-fill');
                    l.classList.add('bi-star');
                }
            });
        });
    });

if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // 1. Validar si el usuario ha iniciado sesión
        const emailUsuario = localStorage.getItem('touristEmail') || '';
        const isLoggedIn = localStorage.getItem('touristLoggedIn') === 'true';

        if (!isLoggedIn) {
            alert('Debes iniciar sesión con tu correo para dejar una opinión.');
            return;
        }

        // 2. Validar si el usuario tiene una reserva comprada para ESTA experiencia
        const reservas = JSON.parse(localStorage.getItem('sc_reservas')) || [];
        const tieneReserva = reservas.some(r => 
            r.usuario === emailUsuario && 
            r.experiencia === exp.title
        );

        if (!tieneReserva) {
            alert(`Aún no puedes comentar. Debes tener una reserva confirmada para "${exp.title}".`);
            return;
        }

        // 3. Capturar las estrellas de la Experiencia y del Guía
        const selectedRatingInput = document.querySelector('input[name="comment-rating"]:checked');
        const selectedGuideRatingInput = document.querySelector('input[name="guide-rating"]:checked');

        // Validar que haya tocado las estrellas
        if (!selectedRatingInput || !selectedGuideRatingInput) {
            alert("Por favor, selecciona cuántas estrellas le das a la experiencia Y al guía.");
            return;
        }

        // Validar que los campos de texto existan para evitar errores
        if (!newNameInput || !newTextInput) {
            console.error("No se encontraron los campos comment-name o comment-text en el HTML.");
            return;
        }

        // 4. Crear el nuevo comentario
        const newComment = {
            name: newNameInput.value.trim() || 'Turista',
            rating: parseInt(selectedRatingInput.value),
            guideRating: parseInt(selectedGuideRatingInput.value),
            text: newTextInput.value.trim(),
            date: new Date().toLocaleDateString('es-ES')
        };

        // 5. Guardar en el almacenamiento local (LocalStorage)
        comments.unshift(newComment); // Lo pone de primero en la lista
        localStorage.setItem(commentsStorageKey, JSON.stringify(comments));

        // 6. Actualizar la interfaz
        renderComments();
        if (typeof updateRatingsStats === 'function') {
            updateRatingsStats();
        }

        // 7. Limpiar el formulario y las estrellas visuales
        commentForm.reset();
        document.querySelectorAll('.rating-stars label, .rating-stars-guide label').forEach(l => {
            l.classList.remove('bi-star-fill');
            l.classList.add('bi-star');
        });

        alert("¡Tu opinión se ha registrado con éxito!");
    });
}
}
});