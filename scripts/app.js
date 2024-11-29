const boton = document.getElementById('generate')
const paletteContainer = document.getElementById('palette');
document.getElementById('add-color').addEventListener('click', agregarColor);

boton.addEventListener('click', generarPaleta)

let colores =[]


function generarPaleta (){
    let cantidadDeColores = colores.length
    colores = Array.from({ length: cantidadDeColores === 0 ? 5 : cantidadDeColores }, () => chroma.random().hex());

    renderisarPaleta(colores)
    
}
function renderisarPaleta(colores) {
    paletteContainer.innerHTML = '';
    colores.forEach((color, index) => {
        const div = document.createElement('div');
        div.className = 'color-box';
        div.style.backgroundColor = color;

        // Contenedor para el color y el botón
        const contentDiv = document.createElement('div');
        contentDiv.style.position = 'relative';

        // Texto del color
        const colorText = document.createElement('span');
        colorText.textContent = color;

        // Botón de eliminación
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-button';

        // Asociar evento de eliminación
        deleteButton.addEventListener('click', () => {
            eliminarColor(index);
        });

        // Agregar botón y texto al contenedor
        contentDiv.appendChild(colorText);
        contentDiv.appendChild(deleteButton);
        div.appendChild(contentDiv);

        // Agregar todo al contenedor de la paleta
        paletteContainer.appendChild(div);
    });
}

function agregarColor() {
    if (colores.length >= 10) {
        alert("Ya no hay más espacio para colores");
    } else {
        const newColor = chroma.random().hex();
        colores.push(newColor); // Agregamos el nuevo color al array

        const index = colores.length - 1;

        const div = document.createElement('div');
        div.className = 'color-box';
        div.style.backgroundColor = newColor;

        // Contenedor para el color y el botón
        const contentDiv = document.createElement('div');
        contentDiv.style.position = 'relative';

        // Texto del color
        const colorText = document.createElement('span');
        colorText.textContent = newColor;

        // Botón de eliminación
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-button';

        // Asociar evento de eliminación
        deleteButton.addEventListener('click', () => {
            eliminarColor(index);
        });

        // Agregar botón y texto al contenedor
        contentDiv.appendChild(colorText);
        contentDiv.appendChild(deleteButton);
        div.appendChild(contentDiv);

        // Agregar todo al contenedor de la paleta
        paletteContainer.appendChild(div);
    }
}

// Nueva función para eliminar colores
function eliminarColor(index) {
    colores.splice(index, 1); // Elimina el color del array
    renderisarPaleta(colores); // Vuelve a renderizar la paleta
}


document.getElementById('add-custom-color').addEventListener('click', agregarColorPersonalizado);

function agregarColorPersonalizado() {
  // Capturar valores de input
const colorInput = document.getElementById('color-input').value.trim();
const colorPicker = document.getElementById('color-picker').value;

  // Decidir cuál color usar
  const color = colorInput || colorPicker; // Si no ingresaron texto, usar el picker

  // Validar color ingresado
if (!esColorValido(color)) {
    alert('Por favor, ingresa un color válido en formato HEX, RGB o HSL.');
    return;
};

if (colores.length >= 10) {
    alert("Ya no hay más espacio para colores")
}else{
    colores.push(color);
    renderisarPaleta(colores);

}
}

// Función para validar colores en distintos formatos
function esColorValido(color) {
  // Validar HEX (#FFFFFF)
  const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  // Validar RGB (rgb(255, 255, 255))
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;

  // Validar HSL (hsl(360, 100%, 100%))
  const hslRegex = /^hsl\(\d{1,3},\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;

  return hexRegex.test(color) || rgbRegex.test(color) || hslRegex.test(color);
}
