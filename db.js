// =====================================================================
// db.js — SelvaDB: capa de datos centralizada (localStorage)
// -----------------------------------------------------------------------
// Antes, cada página leía/escribía 'sc_reservas' directamente con su
// propia copia de lógica (detalle.js) mientras otras (perfil.js) pasaban
// por funciones tipo SelvaDB. Esto generaba duplicación y riesgo de que
// ambas implementaciones se desincronicen. Ahora TODA la app pasa por
// este único módulo.
//
// Importante: este proyecto no tiene backend, así que las "contraseñas"
// solo se protegen con un hash simple (no criptográfico). Esto evita que
// cualquiera pueda iniciar sesión como otro usuario solo escribiendo su
// correo (como ocurría antes), pero NO sustituye un backend real con
// hashing seguro (bcrypt/argon2) ni transporte cifrado de credenciales.
// =====================================================================

const SelvaDB = (function () {
    const KEYS = {
        RESERVAS: 'sc_reservas',
        USUARIOS: 'sc_usuarios'
    };

    function _leer(key) {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.error(`SelvaDB: error leyendo "${key}" de localStorage`, e);
            return [];
        }
    }

    function _escribir(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error(`SelvaDB: error escribiendo "${key}" en localStorage`, e);
            return false;
        }
    }

    // Hash simple tipo "djb2". NO es seguro criptográficamente, solo evita
    // dejar contraseñas en texto plano en localStorage para esta demo.
    function _hash(texto) {
        let hash = 5381;
        const str = String(texto);
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return hash.toString(36);
    }

    // ---------------------------------------------------------------
    // RESERVAS
    // ---------------------------------------------------------------

    // Devuelve las reservas de un usuario (por email). Sin email, devuelve todas.
    function obtenerReservas(email) {
        const todas = _leer(KEYS.RESERVAS);
        if (!email) return todas;
        return todas.filter(r => r.usuario === email);
    }

    function agregarReserva(reserva) {
        const todas = _leer(KEYS.RESERVAS);
        todas.push(reserva);
        _escribir(KEYS.RESERVAS, todas);
        return reserva;
    }

    function actualizarTodasLasReservas(reservas) {
        return _escribir(KEYS.RESERVAS, reservas);
    }

    // Cupos: solo cuentan las reservas activas (no canceladas) para una experiencia.
    function contarReservasActivas(tituloExperiencia) {
        const todas = _leer(KEYS.RESERVAS);
        return todas.filter(r => r.experiencia === tituloExperiencia && r.estado !== 'Cancelada').length;
    }

    // ---------------------------------------------------------------
    // USUARIOS / AUTENTICACIÓN
    // ---------------------------------------------------------------

    function registrarUsuario({ nombre, email, telefono, password }) {
        email = (email || '').trim().toLowerCase();
        if (!nombre || !email || !password) {
            return { ok: false, error: 'Completa nombre, correo y contraseña.' };
        }
        if (password.length < 6) {
            return { ok: false, error: 'La contraseña debe tener al menos 6 caracteres.' };
        }
        const usuarios = _leer(KEYS.USUARIOS);
        const existe = usuarios.some(u => u.email === email);
        if (existe) {
            return { ok: false, error: 'Ya existe una cuenta registrada con ese correo. Inicia sesión.' };
        }
        usuarios.push({ nombre, email, telefono: telefono || '', passwordHash: _hash(password) });
        _escribir(KEYS.USUARIOS, usuarios);
        return { ok: true, usuario: { nombre, email, telefono: telefono || '' } };
    }

    function validarLogin(email, password) {
        email = (email || '').trim().toLowerCase();
        const usuarios = _leer(KEYS.USUARIOS);
        const usuario = usuarios.find(u => u.email === email);
        if (!usuario) {
            return { ok: false, error: 'No existe una cuenta con ese correo. Regístrate primero.' };
        }
        if (usuario.passwordHash !== _hash(password)) {
            return { ok: false, error: 'Contraseña incorrecta.' };
        }
        return { ok: true, usuario: { nombre: usuario.nombre, email: usuario.email, telefono: usuario.telefono } };
    }

    function iniciarSesion(usuario) {
        localStorage.setItem('touristLoggedIn', 'true');
        localStorage.setItem('touristName', usuario.nombre || '');
        localStorage.setItem('touristEmail', usuario.email || '');
        localStorage.setItem('touristPhone', usuario.telefono || '');
    }

    function cerrarSesion() {
        localStorage.removeItem('touristLoggedIn');
        localStorage.removeItem('touristName');
        localStorage.removeItem('touristEmail');
        localStorage.removeItem('touristPhone');
    }

    function usuarioActual() {
        return {
            isLoggedIn: localStorage.getItem('touristLoggedIn') === 'true',
            nombre: localStorage.getItem('touristName') || '',
            email: localStorage.getItem('touristEmail') || '',
            telefono: localStorage.getItem('touristPhone') || ''
        };
    }

    function obtenerHistorialOperadores() {
        return JSON.parse(localStorage.getItem('sc_historial_operadores')) || [];
    }

    function agregarHistorialOperador(op) {
        const ops = obtenerHistorialOperadores();
        ops.push(op);
        localStorage.setItem('sc_historial_operadores', JSON.stringify(ops));
    }

    return {
        obtenerReservas,
        agregarReserva,
        actualizarTodasLasReservas,
        contarReservasActivas,
        registrarUsuario,
        validarLogin,
        iniciarSesion,
        cerrarSesion,
        usuarioActual,
        obtenerHistorialOperadores,
        agregarHistorialOperador
    };
})();
