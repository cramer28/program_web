//recuperar input's de tareas, lista de tareas y boton fullscreen
const inputs = document.querySelector(".ingresar input");
const boton = document.querySelector(".ingresar button");
const lista = document.querySelector(".lista");
const full = document.querySelector("header span");

//Codigo de caracteres para botones
let borrarIcn = String.fromCodePoint(0x1F5D1);
let compartirIcn = String.fromCodePoint(0x2BAB);
let copiarIcn = String.fromCodePoint(0x1F4CE);

//inicialización array tareas y obj geolocalización
let tareas = [];
let geo = {
    "lat" : null,
    "lon" : null
}

//geolocalización
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        (location) => {
            geo.lat = location.coords.latitude;
            geo.lon = location.coords.longitude;
        },
        (err) => {
            console.warn(err);
            geo.lat = null;
            geo.lon = null;
        }
    );
} else {
    console.warn("Geolocalizacion no soportada");
}

//recuperar datos de LocalStorage
if ('localStorage' in window || 'sessionStorage' in window) {
    tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.map((t) => {
        crearTarea(t);
    });
}else{
    console.warn("problemas con local/session Storage");
}

//comprobación y ingreso de tarea
inputs.addEventListener("keyup", function(event) {
    let valorIngresado = inputs.value;
    if(valorIngresado.trim() != 0){
        if (event.code === 'Enter') {
            agregar();
        }else{
            boton.classList.add("active"); 
        }
    }else{
        boton.classList.remove("active");
    }
});

//presionar boton "añadir"
boton.onclick = ()=>{
    agregar();
}

//funcionamiento boton "fullscreen"
full.onclick = ()=>{
    if(document.fullscreenElement == null){
        document.documentElement.requestFullscreen();
        full.innerHTML = "🔙";
    }else{
        document.exitFullscreen();
        full.innerHTML = "↕";
    }
}

//creacion objeto tarea seguido de almacenamiento en array y LS
function agregar(){

    let tarea = {
        "id"         : new Date().getTime(),
        "nombre"     : inputs.value,
        "completada" : false,
        "ubicacion"  : geo
    }

    crearTarea(tarea);
    tareas.push(tarea);
    guardarTareas();

}

//creacion de <li> para la pagina
function crearTarea(tarea){
    var li = document.createElement("li");
    var check = document.createElement("input");
    var text = document.createElement("p");
    var but = document.createElement("span");
    var com = document.createElement("span");
    var copy = document.createElement("span");

    li.setAttribute("id",tarea.id);
    text.appendChild(document.createTextNode(tarea.nombre));
    check.setAttribute("type","checkbox");
    if(tarea.completada){
        check.setAttribute("checked","");
    }
    check.onclick = function(){completar(this.parentElement);};
    but.appendChild(document.createTextNode(borrarIcn));
    but.setAttribute("class", "eliminar");
    but.onclick = function(){eliminar(this.parentElement);};
    com.appendChild(document.createTextNode(compartirIcn));
    com.setAttribute("class", "compartir");
    com.onclick = function(){compartir(this.parentElement);};
    copy.appendChild(document.createTextNode(copiarIcn));
    copy.setAttribute("class", "copiar");
    copy.onclick = function(){copiar(this.parentElement);};
    li.appendChild(check);
    li.appendChild(text);
    li.appendChild(copy);
    li.appendChild(com);
    li.appendChild(but);
    lista.insertBefore(li, lista.childNodes[0]);
    inputs.value = "";
    boton.classList.remove("active");
    //inputs.focus();
}

//guardar la realizacion de la tarea en el array y LS
function completar(tarea){
    let id = tarea.getAttribute("id");
    tareas.forEach(t => {
        if (t.id == id) {
            if(t.completada){
                t.completada = false;
            }else{
                t.completada = true;
            }
        }
    });
    guardarTareas();
}

//eliminar tarea en pantalla, array y LS
function eliminar(tarea){
    let id = tarea.getAttribute("id");
    tareas = tareas.filter(t => t.id != id);
    tarea.remove();
    guardarTareas();
}

//copiar el nombre de la tarea al portapapeles
function copiar(tarea){
    texto = tarea.querySelector("p").textContent;
    navigator.clipboard.writeText(texto);
}

//compartir tarea mediante distintos medios de comunicación
function compartir(tarea){
    var title = "";
    let id = tarea.getAttribute("id");
    let aCompartir = tareas.filter(t => t.id == id);
    

    if(aCompartir[0].completada){
        title = "Ya completé una tarea de mi lista..";
    }else{
        title = "Tarea pendiente de mi lista..";
    }

    if (!("share" in navigator)) {
        alert('Web Share API not supported.');
        return;
    }

    navigator.share({
        title: title,
        text: "La tarea es: "+aCompartir[0].nombre+"\nLatitud: "+aCompartir[0].ubicacion.lat+"\nLongitud: "+aCompartir[0].ubicacion.lon,
        url: document.URL
    })
    .then(
        () => console.log('Compartido!')
    )
    .catch(
        error => console.log('Error sharing:', error)
    );

}

//ejecutar fullscreen
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
}

//guardar tareas en LocalStorage
function guardarTareas(){
    if ('localStorage' in window || 'sessionStorage' in window) {
        localStorage.setItem("tareas", JSON.stringify(tareas));
        console.log("Tareas almacenadas satisfactoriamente.");
    } else {
        alert("LocalStorage not supported!");
    }
}

