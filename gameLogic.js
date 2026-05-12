// gameLogic.js

// Genera un número aleatorio entre 1 y 100
export const generarNumeroSecreto = () => Math.floor(Math.random() * 100) + 1;

// Evalúa la suposición del usuario
export const evaluarIntento = (intento, secreto) => {
    if (intento === secreto) return 'ganaste';
    if (intento > secreto) return 'alto';
    return 'bajo';
};