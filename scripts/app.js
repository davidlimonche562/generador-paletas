const boton = document.getElementById('generate');
const paletteContainer = document.getElementById('palette');
document.getElementById('add-color').addEventListener('click', agregarColor);

boton.addEventListener('click', generarPaleta);

let colores = [];
let bloqueados = [];

// Generar la paleta inicial o regenerar
function generarPaleta() {
    const cantidadDeColores = colores.length || 5;

    colores = Array.from({ length: cantidadDeColores }, (_, index) =>
        bloqueados[index] ? colores[index] : chroma.random().hex()
    );

    bloqueados = Array.from({ length: cantidadDeColores }, (_, index) => bloqueados[index] || false);

    renderisarPaleta(colores);
}

// Renderizar la paleta de colores
function renderisarPaleta(colores) {
    paletteContainer.innerHTML = '';
    colores.forEach((color, index) => {
        const div = document.createElement('div');
        div.className = 'color-box';
        div.style.backgroundColor = color;

        // Contenedor de texto y botones
        const contentDiv = document.createElement('div');
        contentDiv.style.position = 'relative';

        // Texto del color
        const colorText = document.createElement('span');
        colorText.textContent = color;

        // Botón de bloqueo
        const botonBloqueo = document.createElement('button');
        botonBloqueo.textContent = bloqueados[index] ? '🔒' : '🔓';
        botonBloqueo.className = 'boton-bloqueo';
        botonBloqueo.addEventListener('click', () => {
            bloqueados[index] = !bloqueados[index];
            botonBloqueo.textContent = bloqueados[index] ? '🔒' : '🔓';
        });

        // Botón de eliminación
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            eliminarColor(index);
        });

        contentDiv.appendChild(colorText);
        contentDiv.appendChild(botonBloqueo);
        contentDiv.appendChild(deleteButton);
        div.appendChild(contentDiv);

        paletteContainer.appendChild(div);
    });
}

// Agregar un nuevo color
function agregarColor() {
    if (colores.length >= 10) {
        alert("Ya no hay más espacio para colores");
    } else {
        const newColor = chroma.random().hex();
        colores.push(newColor);
        bloqueados.push(false);
        renderisarPaleta(colores);
    }
}

// Agregar un color personalizado
function agregarColorPersonalizado() {
    const colorInput = document.getElementById('color-input').value.trim();
    const colorPicker = document.getElementById('color-picker').value;
    const color = colorInput || colorPicker;

    if (!esColorValido(color)) {
        alert('Por favor, ingresa un color válido en formato HEX, RGB o HSL.');
        return;
    }

    if (colores.length >= 10) {
        alert("Ya no hay más espacio para colores");
    } else {
        colores.push(color);
        bloqueados.push(false);
        renderisarPaleta(colores);
    }
}

// Eliminar un color
function eliminarColor(index) {
    colores.splice(index, 1);
    bloqueados.splice(index, 1);
    renderisarPaleta(colores);
}

// Validar color
function esColorValido(color) {
    const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    const hslRegex = /^hsl\(\d{1,3},\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
    return hexRegex.test(color) || rgbRegex.test(color) || hslRegex.test(color);
}
