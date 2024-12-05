const boton = document.getElementById('generate');
const paletteContainer = document.getElementById('palette');
document.getElementById('add-color').addEventListener('click', agregarColor);
document.getElementById('add-custom-color').addEventListener('click', agregarColorPersonalizado);
const colorPicker = document.getElementById('color-picker');
const colorInput = document.getElementById('color-input');
const complementarioBtn = document.getElementById('complementario');

let colores = ["#000000"];
let bloqueados = [];
let colorBase = colores[0]; // Inicializa un color base por defecto

let bloqueaSincronizacion = false; // Controla para evitar bucles de sincronización

// Sincronizar el input y el picker
colorInput.addEventListener('input', () => {
    if (!bloqueaSincronizacion) {
        const color = colorInput.value.trim();
        if (esColorValido(color)) {
            bloqueaSincronizacion = true;
            colorPicker.value = color; // Actualizar el picker con el valor del input
            colorBase = color; // Actualizar el color base
            bloqueaSincronizacion = false;
        }
    }
});

colorPicker.addEventListener('input', () => {
    if (!bloqueaSincronizacion) {
        bloqueaSincronizacion = true;
        colorInput.value = colorPicker.value; // Actualizar el input con el valor del picker
        colorBase = colorPicker.value; // Actualizar el color base
        bloqueaSincronizacion = false;
    }
});

// Generar colores complementarios
complementarioBtn.addEventListener('click', () => {
    if (!esColorValido(colorBase)) {
        alert('Por favor selecciona un color base válido.');
        return;
    }
    const [base, complementario] = generarColoresComplementarios(colorBase);
    colores = [base, complementario];
    bloqueados = [true, true]; // Bloquear ambos colores
    renderisarPaleta(colores);
});

boton.addEventListener('click', generarPaleta);

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

        const contentDiv = document.createElement('div');
        contentDiv.style.position = 'relative';

        const colorText = document.createElement('span');
        colorText.textContent = color;

        const botonBloqueo = document.createElement('button');
        botonBloqueo.textContent = bloqueados[index] ? '🔒' : '🔓';
        botonBloqueo.className = 'boton-bloqueo';
        botonBloqueo.addEventListener('click', () => {
            bloqueados[index] = !bloqueados[index];
            botonBloqueo.textContent = bloqueados[index] ? '🔒' : '🔓';
        });

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
    const color = colorInput.value.trim() || colorPicker.value;

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

function generarColoresComplementarios(colorBase) {
    const color1 = chroma(colorBase); // Color base
    const color2 = color1.set('hsl.h', '+180'); // Complementario (180 grados en HSL)
    return [color1.hex(), color2.hex()];
}
