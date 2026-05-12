// main.js
import './style.css';
// Importamos nuestras funciones modulares
import { generarNumeroSecreto, evaluarIntento } from './gameLogic.js';

// Elementos del DOM
const inputNumero = document.getElementById('input-numero');
const btnAdivinar = document.getElementById('btn-adivinar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const parrafoMensaje = document.getElementById('mensaje');
const parrafoIntentos = document.getElementById('intentos');

// Estado del juego
let numeroSecreto = generarNumeroSecreto();
let cantidadIntentos = 0;

// Función principal para jugar
const procesarIntento = () => {
    const intentoUsuario = parseInt(inputNumero.value);

    // Validación básica
    if (isNaN(intentoUsuario) || intentoUsuario < 1 || intentoUsuario > 100) {
        parrafoMensaje.textContent = '❌ Por favor, ingresa un número válido del 1 al 100.';
        parrafoMensaje.className = 'mensaje error';
        return;
    }

    cantidadIntentos++;
    parrafoIntentos.textContent = `Intentos: ${cantidadIntentos}`;

    // Evaluamos el intento usando nuestro módulo externo
    const resultado = evaluarIntento(intentoUsuario, numeroSecreto);

    if (resultado === 'ganaste') {
        parrafoMensaje.textContent = `🎉 ¡Correcto! El número era ${numeroSecreto}.`;
        parrafoMensaje.className = 'mensaje exito';
        
        // Deshabilitar input y mostrar botón de reinicio
        inputNumero.disabled = true;
        btnAdivinar.disabled = true;
        btnReiniciar.classList.remove('oculto');
    } else if (resultado === 'alto') {
        parrafoMensaje.textContent = '📉 Demasiado alto. Intenta un número menor.';
        parrafoMensaje.className = 'mensaje error';
    } else {
        parrafoMensaje.textContent = '📈 Demasiado bajo. Intenta un número mayor.';
        parrafoMensaje.className = 'mensaje error';
    }

    // Limpiamos el input para el siguiente intento
    inputNumero.value = '';
    inputNumero.focus();
};

// Función para reiniciar el juego (Funcionalidad Extra)
const reiniciarJuego = () => {
    numeroSecreto = generarNumeroSecreto();
    cantidadIntentos = 0;
    
    parrafoIntentos.textContent = `Intentos: 0`;
    parrafoMensaje.textContent = '';
    parrafoMensaje.className = 'mensaje';
    
    inputNumero.disabled = false;
    btnAdivinar.disabled = false;
    btnReiniciar.classList.add('oculto');
    
    inputNumero.value = '';
    inputNumero.focus();
};

// Listeners de Eventos
btnAdivinar.addEventListener('click', procesarIntento);
btnReiniciar.addEventListener('click', reiniciarJuego);

// Permitir jugar presionando la tecla "Enter"
inputNumero.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !btnAdivinar.disabled) {
        procesarIntento();
    }
});