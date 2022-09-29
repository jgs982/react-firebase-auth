/**
 * Credenciales de Firebase
 *  Tuerca > Configuración del Proyecto > Crear App Web
 */

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    // Copiar de la plataforma de Firebase
}

export const app  = initializeApp(firebaseConfig)
export const auth = getAuth(app)