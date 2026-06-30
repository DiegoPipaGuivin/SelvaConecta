// --- Perfil de Usuario ---
const estadoUsuario = SelvaDB.usuarioActual();
const nombre = estadoUsuario.nombre;
const email  = estadoUsuario.email;
const isLoggedIn = estadoUsuario.isLoggedIn;

// Redirigir si no ha iniciado sesión
if (!isLoggedIn && window.location.pathname.includes('perfil.html')) {
    window.location.href = 'index.html';
}

// Poblar datos del encabezado
const perfilNombre = document.getElementById('perfil-nombre');
const perfilEmail  = document.getElementById('perfil-email');
const perfilAvatar = document.getElementById('perfil-avatar');

if (perfilNombre) perfilNombre.textContent = nombre || 'Mi Perfil';
if (perfilEmail)  perfilEmail.textContent  = email;
if (perfilAvatar && nombre) {
    const initials = nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    perfilAvatar.textContent = initials;
}

// --- Cerrar Sesión ---
const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        SelvaDB.cerrarSesion();
        window.location.href = 'index.html';
    });
}

// --- Función Helper para Evitar Errores de Referencia ---
function escapeHTML(str) {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// --- Renderizado de Reservas ---
function cargarReservasUsuario() {
    const contenedor = document.getElementById('mis-reservas');
    if (!contenedor) return;

    // Obtener las reservas del usuario actual usando tu SelvaDB centralizado
    const reservas = SelvaDB.obtenerReservas(email);

    if (reservas.length === 0) {
        contenedor.innerHTML = `<div class="text-center py-5 text-muted"><i class="bi bi-calendar-x fs-1"></i><p class="mt-2">No tienes reservas registradas.</p></div>`;
        return;
    }

    contenedor.innerHTML = '';
    reservas.forEach(r => {
        contenedor.innerHTML += `
        <div class="card mb-3 shadow-sm border-0">
            <div class="card-body p-4">
                <h5 class="fw-bold text-success font-outfit mb-3">${escapeHTML(r.experiencia)}</h5>
                <div class="row g-3 text-secondary small">
                    <div class="col-sm-6 col-md-3">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-calendar-event text-success"></i>
                            <div>
                                <div class="fw-semibold text-dark">Fecha</div>
                                <div>${escapeHTML(r.fecha)}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-people-fill text-success"></i>
                            <div>
                                <div class="fw-semibold text-dark">Viajeros</div>
                                <div>${r.adultos} adu.${r.ninos > 0 ? ', ' + r.ninos + ' niñ.' : ''}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-cash-coin text-success"></i>
                            <div>
                                <div class="fw-semibold text-dark">Total pagado</div>
                                <div class="text-success fw-bold fs-6">${escapeHTML(r.total)}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-info-circle-fill text-success"></i>
                            <div>
                                <div class="fw-semibold text-dark">Estado</div>
                                <div class="fw-bold ${r.estado === 'Cancelada' ? 'text-danger' : 'text-primary'}">${escapeHTML(r.estado || 'Confirmada')}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-3 pt-3 border-top">
                    <div class="d-flex flex-wrap gap-3">
                        ${r.metodoPago ? `<span class="text-muted small"><i class=\"bi bi-wallet2 text-success me-1\"></i>${escapeHTML(r.metodoPago)}</span>` : ''}
                        ${r.fechaRegistro ? `<span class="text-muted small"><i class=\"bi bi-clock me-1\"></i>Registrada el ${escapeHTML(r.fechaRegistro)}</span>` : ''}
                    </div>
                    ${r.estado !== 'Cancelada' ? `<button onclick="cancelarReserva('${escapeHTML(r.codigo)}')" class="btn btn-sm btn-outline-danger rounded-pill px-3"><i class="bi bi-x-circle me-1"></i>Cancelar reserva</button>` : ''}
                </div>
            </div>
        </div>`;
    });
}

// --- Acción de Cancelar Reserva ---
// Exponemos la función a 'window' para que el atributo onclick del HTML pueda encontrarla
window.cancelarReserva = function(codigo) {
    if (confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
        // Traemos TODAS las reservas globales de la app
        let todasLasReservas = SelvaDB.obtenerReservas();
        
        // Modificamos el estado de la que coincida con el código
        todasLasReservas = todasLasReservas.map(r => {
            if (r.codigo === codigo) {
                r.estado = 'Cancelada';
            }
            return r;
        });
        
        // Guardamos la lista actualizada de vuelta en el localStorage
        SelvaDB.actualizarTodasLasReservas(todasLasReservas);
        
        // Volvemos a pintar la lista para ver el cambio reflejado
        cargarReservasUsuario();
    }
};

// Inicializar la carga cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarReservasUsuario);