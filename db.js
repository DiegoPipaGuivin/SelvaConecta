// db.js - Gestor centralizado de almacenamiento local (Prototipo)

const DB_KEYS = {
    USUARIOS: 'sc_usuarios',
    RESERVAS: 'sc_reservas',
    OPERADORES: 'sc_operadores'
};

const SelvaDB = {
    // --- Operadores ---
    guardarOperador: function(operador) {
        const operadores = this.obtenerOperadores();
        operadores.push(operador);
        localStorage.setItem(DB_KEYS.OPERADORES, JSON.stringify(operadores));
        return true;
    },
    
    obtenerOperadores: function() {
        return JSON.parse(localStorage.getItem(DB_KEYS.OPERADORES)) || [];
    },

    // --- Reservas ---
    guardarReserva: function(reserva) {
        const reservas = this.obtenerReservas();
        reservas.push(reserva);
        localStorage.setItem(DB_KEYS.RESERVAS, JSON.stringify(reservas));
        return true;
    },

    obtenerReservas: function(emailUsuario) {
        const reservas = JSON.parse(localStorage.getItem(DB_KEYS.RESERVAS)) || [];
        if (emailUsuario) {
            return reservas.filter(r => r.usuario === emailUsuario); // Filtra por el campo 'usuario'
        }
        return reservas;
    },

    actualizarTodasLasReservas: function(nuevasReservas) {
        localStorage.setItem(DB_KEYS.RESERVAS, JSON.stringify(nuevasReservas));
    }
};

// --- Inyección de Datos Semilla ---
// Esto asegura que al abrir tu GitHub Pages siempre haya datos para mostrar
function inicializarDatosDePrueba() {
    // Si no hay reservas en el sistema, creamos una de prueba automáticamente
    if (!localStorage.getItem(DB_KEYS.RESERVAS)) {
        const reservasPrueba = [{
            codigo: "SC-999999",
            experiencia: "Comunidad Nativa Yagua",
            fecha: "2026-10-15",
            adultos: 2,
            ninos: 0,
            total: "S/360",
            usuario: "prueba@turista.com", // Inicia sesión con este correo en la web para verla
            estado: "Confirmada",
            metodoPago: "Tarjeta de Crédito",
            fechaRegistro: "01/06/2026"
        }];
        localStorage.setItem(DB_KEYS.RESERVAS, JSON.stringify(reservasPrueba));
    }
}

// Inicializar la siembra de datos de forma automática
inicializarDatosDePrueba();