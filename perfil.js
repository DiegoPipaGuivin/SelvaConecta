// --- Perfil de Usuario ---
const nombre = localStorage.getItem('touristName') || '';
const email  = localStorage.getItem('touristEmail') || '';
const isLoggedIn = localStorage.getItem('touristLoggedIn') === 'true';

// Redirect if not logged in
if (!isLoggedIn) {
    window.location.href = 'index.html';
}

// Populate header info
const perfilNombre = document.getElementById('perfil-nombre');
const perfilEmail  = document.getElementById('perfil-email');
const perfilAvatar = document.getElementById('perfil-avatar');

if (perfilNombre) perfilNombre.textContent = nombre || 'Mi Perfil';
if (perfilEmail)  perfilEmail.textContent  = email;
if (perfilAvatar && nombre) {
    const initials = nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    perfilAvatar.textContent = initials;
}

// --- Logout ---
const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('touristLoggedIn');
        localStorage.removeItem('touristName');
        localStorage.removeItem('touristEmail');
        localStorage.removeItem('touristPhone');
        window.location.href = 'index.html';
    });
}

// --- Reservas ---
const contenedor = document.getElementById('mis-reservas');
const reservas = JSON.parse(localStorage.getItem('sc_reservas')) || [];

// Filter reservations for logged-in user
const misReservas = reservas.filter(r => r.usuario === email);

function estadoBadge(estado) {
    const map = {
        'Confirmada': 'success',
        'Pendiente':  'warning text-dark',
        'Cancelada':  'danger',
    };
    const color = map[estado] || 'secondary';
    return `<span class="badge bg-${color} rounded-pill px-3 py-1">${estado}</span>`;
}

if (misReservas.length === 0) {
    contenedor.innerHTML = `
    <div class="text-center py-5 bg-light rounded-4 border">
        <i class="bi bi-calendar-x display-1 text-muted mb-3 d-block"></i>
        <h4 class="font-outfit fw-bold text-secondary">Aún no tienes aventuras programadas</h4>
        <p class="text-muted">Explora nuestros tours y conéctate con la magia de la selva peruana.</p>
        <a href="index.html" class="btn btn-success rounded-pill px-4 py-2 mt-2 fw-semibold">
            <i class="bi bi-compass me-1"></i>Explorar experiencias
        </a>
    </div>`;
} else {
    misReservas.forEach(r => {
        contenedor.innerHTML += `
        <div class="card border rounded-4 shadow-sm mb-3 overflow-hidden card-hover">
            <div class="card-body p-4">
                <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                    <h5 class="font-outfit fw-bold mb-0 text-dark">
                        <i class="bi bi-tree-fill text-success me-2"></i>${r.experiencia}
                    </h5>
                    ${estadoBadge(r.estado)}
                </div>
                <div class="row g-2 text-muted small">
                    <div class="col-sm-6 col-md-3">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-hash text-success"></i>
                            <div>
                                <div class="fw-semibold text-dark">Código</div>
                                <div>${r.codigo}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-calendar-event text-success"></i>
                            <div>
                                <div class="fw-semibold text-dark">Fecha del viaje</div>
                                <div>${r.fecha}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-people-fill text-success"></i>
                            <div>
                                <div class="fw-semibold text-dark">Viajeros</div>
                                <div>${r.adultos} adulto(s)${r.ninos > 0 ? ', ' + r.ninos + ' niño(s)' : ''}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-cash-coin text-success"></i>
                            <div>
                                <div class="fw-semibold text-dark">Total pagado</div>
                                <div class="text-success fw-bold fs-6">${r.total}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-wrap gap-3 mt-3 pt-3 border-top">
                    ${r.metodoPago ? `<span class="text-muted small"><i class="bi bi-wallet2 text-success me-1"></i>${r.metodoPago}</span>` : ''}
                    ${r.fechaRegistro ? `<span class="text-muted small"><i class="bi bi-clock me-1"></i>Registrada el ${r.fechaRegistro}</span>` : ''}
                </div>
            </div>
        </div>`;
    });
}