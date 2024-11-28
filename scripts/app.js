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

function renderisarPaleta(colores){
    paletteContainer.innerHTML = '';
    colores.forEach(color => {
        const div =document.createElement('div')
        div.className = 'color-box'
        div.style.backgroundColor = color;
        div.textContent = color;
        paletteContainer.appendChild(div);
    });
}

function agregarColor() {
    if (colores.length >= 10) {
        alert("Ya no hay más espacio para colores");
    } else {
        const newColor = chroma.random().hex();
        colores.push(newColor); // Agregamos el nuevo color al array
        const div = document.createElement('div');
        div.className = 'color-box';
        div.style.backgroundColor = newColor;
        div.textContent = newColor;
        paletteContainer.appendChild(div);
    }
}