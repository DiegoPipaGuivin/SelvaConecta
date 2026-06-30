// =====================================================================
// auth.js — Navbar y modal de inicio de sesión / registro (compartido)
// -----------------------------------------------------------------------
// Antes este bloque (HTML del modal + listeners de login/registro +
// pintado del navbar) estaba duplicado casi línea por línea en
// index.html y en detalle.js. Cualquier corrección debía hacerse dos
// veces y era fácil que se desincronizaran. Ahora vive en un solo lugar.
//
// Requiere que db.js (SelvaDB) se cargue ANTES de este archivo.
// Uso: SelvaAuth.actualizarNavbar() se llama sola en DOMContentLoaded,
// y expone SelvaAuth.abrirModalLogin() para botones "Iniciar sesión".
// =====================================================================

const SelvaAuth = (function () {

    function escapeHTML(str) {
        if (!str) return '';
        return str.toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function _obtenerModal() {
        return document.getElementById('authModal');
    }

    function _crearModalSiNoExiste() {
        if (_obtenerModal()) return;

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
                            <div id="login-error" class="alert alert-danger py-2 small d-none"></div>
                            <form id="login-form">
                                <div class="mb-3">
                                    <label for="login-email" class="form-label fw-semibold text-muted small">CORREO ELECTRÓNICO</label>
                                    <input type="email" class="form-control booking-input" id="login-email" placeholder="ejemplo@correo.com" required>
                                </div>
                                <div class="mb-4">
                                    <label for="login-password" class="form-label fw-semibold text-muted small">CONTRASEÑA</label>
                                    <input type="password" class="form-control booking-input" id="login-password" placeholder="••••••" required>
                                </div>
                                <button type="submit" class="btn btn-success w-100 py-3 rounded-pill fw-bold">Iniciar Sesión</button>
                            </form>
                            <div id="register-error" class="alert alert-danger py-2 small d-none"></div>
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
                                <button type="submit" class="btn btn-success w-100 py-3 rounded-pill fw-bold">Crear Cuenta</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        _bindModalEvents();
    }

    function _mostrarError(elId, mensaje) {
        const el = document.getElementById(elId);
        if (!el) return;
        el.textContent = mensaje;
        el.classList.remove('d-none');
    }

    function _ocultarErrores() {
        ['login-error', 'register-error'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('d-none');
        });
    }

    function _bindModalEvents() {
        const tLog = document.getElementById('tab-login');
        const tReg = document.getElementById('tab-register');
        const fLog = document.getElementById('login-form');
        const fReg = document.getElementById('register-form');

        tLog.addEventListener('click', () => {
            tLog.classList.add('active');
            tReg.classList.remove('active');
            fLog.classList.remove('d-none');
            fReg.classList.add('d-none');
            _ocultarErrores();
        });

        tReg.addEventListener('click', () => {
            tReg.classList.add('active');
            tLog.classList.remove('active');
            fReg.classList.remove('d-none');
            fLog.classList.add('d-none');
            _ocultarErrores();
        });

        fLog.addEventListener('submit', (e) => {
            e.preventDefault();
            _ocultarErrores();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const resultado = SelvaDB.validarLogin(email, password);
            if (!resultado.ok) {
                _mostrarError('login-error', resultado.error);
                return;
            }

            SelvaDB.iniciarSesion(resultado.usuario);
            const modalInstance = bootstrap.Modal.getInstance(_obtenerModal());
            if (modalInstance) modalInstance.hide();
            fLog.reset();
            actualizarNavbar();
        });

        fReg.addEventListener('submit', (e) => {
            e.preventDefault();
            _ocultarErrores();
            const nombre = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value;
            const telefono = document.getElementById('reg-phone').value.trim();
            const password = document.getElementById('reg-password').value;

            const resultado = SelvaDB.registrarUsuario({ nombre, email, telefono, password });
            if (!resultado.ok) {
                _mostrarError('register-error', resultado.error);
                return;
            }

            SelvaDB.iniciarSesion(resultado.usuario);
            const modalInstance = bootstrap.Modal.getInstance(_obtenerModal());
            if (modalInstance) modalInstance.hide();
            fReg.reset();
            actualizarNavbar();
        });
    }

    function actualizarNavbar() {
        const buttonsContainer = document.getElementById('navbar-buttons-container');
        if (!buttonsContainer) return;

        _crearModalSiNoExiste();

        const estado = SelvaDB.usuarioActual();
        const authBtn = document.getElementById('btn-auth-tourist');

        const viejo = document.getElementById('user-logged-in-container');
        if (viejo) viejo.remove();

        if (estado.isLoggedIn) {
            if (authBtn) authBtn.style.display = 'none';

            const initials = estado.nombre
                ? estado.nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
                : 'U';

            const userContainerHtml = `
                <div class="d-flex align-items-center gap-2" id="user-logged-in-container">
                    <span class="user-avatar-nav">${escapeHTML(initials)}</span>
                    <span class="text-success fw-semibold small">Hola, ${escapeHTML(estado.nombre)}</span>
                    <a href="perfil.html" class="btn btn-sm btn-outline-success">Mi Perfil</a>
                    <button class="btn btn-link text-danger text-decoration-none fw-semibold p-0 ms-2 small" id="btn-logout-tourist">
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
                    SelvaDB.cerrarSesion();
                    actualizarNavbar();
                    if (window.location.pathname.includes('perfil.html')) {
                        window.location.href = 'index.html';
                    }
                });
            }
        } else {
            if (authBtn) authBtn.style.display = 'inline-block';
        }
    }

    function abrirModalLogin() {
        _crearModalSiNoExiste();
        const modal = new bootstrap.Modal(_obtenerModal());
        modal.show();
    }

    document.addEventListener('DOMContentLoaded', actualizarNavbar);

    return { actualizarNavbar, abrirModalLogin, escapeHTML };
})();
