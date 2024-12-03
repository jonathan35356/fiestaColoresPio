const titulo = document.getElementById("titulo");
const pistaDeBaile = document.getElementById("pista-de-baile");
const nuevoColorInput = document.getElementById("nuevo-color");
const agregarColorBtn = document.getElementById("agregar-color");
const reiniciarBtn = document.getElementById("reiniciar");
const colorPopularDiv = document.getElementById("color-popular");
const sonido = document.getElementById("sonido");
const audioDisco = document.getElementById("audio-disco");
const discoVisual = document.createElement("div");

let votos = {}; 
let temporizador;


const mensajeError = document.createElement("div");
mensajeError.style.color = "red";
mensajeError.style.marginTop = "10px";
nuevoColorInput.parentNode.insertBefore(mensajeError, nuevoColorInput.nextSibling);


function esColorValido(color) {
    const div = document.createElement("div");
    div.style.color = color;
    return div.style.color !== ""; 
}


function agregarColor(color) {
    if (!esColorValido(color)) {
        mensajeError.textContent = "⚠️ Por favor, ingresa un color válido.";
        return;
    }

    mensajeError.textContent = ""; 

    
    if (!votos[color]) {
        votos[color] = 0;

        
        const colorDiv = document.createElement("div");
        colorDiv.className = "color";
        colorDiv.style.backgroundColor = color;
        colorDiv.style.width = "50px";
        colorDiv.style.height = "50px";
        colorDiv.style.margin = "5px";
        colorDiv.style.borderRadius = "5px";
        colorDiv.style.cursor = "pointer";
        colorDiv.style.display = "flex";
        colorDiv.style.alignItems = "center";
        colorDiv.style.justifyContent = "center";
        colorDiv.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        colorDiv.innerText = votos[color]; 

        
        colorDiv.addEventListener("click", () => {
            votos[color]++;
            colorDiv.innerText = votos[color]; 
            titulo.style.color = color;
            sonido.currentTime = 0;
            sonido.play(); 
            mostrarColorPopular(); 
        });

        
        pistaDeBaile.appendChild(colorDiv);
    }
}

function reproducirSonido() {
    sonido.currentTime = 0; 
    sonido.play();
}


function mostrarColorPopular() {
   
    const colorMasPopular = Object.keys(votos).reduce((a, b) =>
        votos[a] > votos[b] ? a : b
    );

    colorPopularDiv.innerText = `🎨 El color más popular es: ${colorMasPopular} con ${votos[colorMasPopular]} votos.`;
}

function reiniciarFiesta() {
    pistaDeBaile.innerHTML = ""; 
    titulo.style.color = "black"; 
    colorPopularDiv.innerText = ""; 
    votos = {}; 
    mensajeError.textContent = ""; 
    clearTimeout(temporizador); 
}


agregarColorBtn.addEventListener("click", () => {
    const nuevoColor = nuevoColorInput.value.trim(); 
    if (nuevoColor) {
        agregarColor(nuevoColor); 
        nuevoColorInput.value = ""; 
    }
});

discoVisual.id = "disco";
document.body.appendChild(discoVisual); 

function reproducirDisco() {
   
    discoVisual.style.display = "block";

    
    audioDisco.currentTime = 0;
    audioDisco.play();

    
    audioDisco.onended = () => {
        discoVisual.style.display = "none";
    };
}


const botonReproducir = document.createElement("button");
botonReproducir.textContent = "🎵 Reproducir Disco";
botonReproducir.style.marginTop = "20px";
document.body.appendChild(botonReproducir);

botonReproducir.addEventListener("click", reproducirDisco);


reiniciarBtn.addEventListener("click", reiniciarFiesta);