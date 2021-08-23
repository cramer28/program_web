const inputs = document.querySelector(".ingresar input");
const boton = document.querySelector(".ingresar button");
const lista = document.querySelector(".lista");
const full = document.querySelector("header span");

let borrarIcn = String.fromCodePoint(0x1F5D1);
let compartirIcn = String.fromCodePoint(0x2BAB);

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

boton.onclick = ()=>{
    agregar();
}

full.onclick = ()=>{
    toggleFullScreen();
}

function agregar(){
    var li = document.createElement("li");
    var check = document.createElement("input");
    var text = document.createElement("p");
    var but = document.createElement("span");
    var com = document.createElement("span");
    text.appendChild(document.createTextNode(inputs.value));
    check.setAttribute("type","checkbox");
    but.appendChild(document.createTextNode(borrarIcn));
    but.setAttribute("class", "eliminar");
    but.onclick = function(){this.parentElement.remove();};
    com.appendChild(document.createTextNode(compartirIcn));
    com.setAttribute("class", "compartir");
    com.onclick = function(){compartir(this.parentElement);};
    li.appendChild(check);
    li.appendChild(text);
    li.appendChild(com);
    li.appendChild(but);
    lista.insertBefore(li, lista.childNodes[0]);
    inputs.value = "";
    boton.classList.remove("active");
    //inputs.focus();
}

function compartir(tarea){
    var title = "";
    const texto = tarea.querySelector("p").textContent;
    if(tarea.querySelector("input").classList.contains("checked")){ //esto hay que arreglarlo
        title = "Ya completé una tarea de mi lista";
    }else{
        title = "Tarea por completar de mi lista";
    }

    if (!("share" in navigator)) {
        alert('Web Share API not supported.');
        return;
    }

    navigator.share({
        title: title,
        text: texto,
        url: document.URL
    })
    .then(
        () => console.log('Compartido!')
    )
    .catch(
        error => console.log('Error sharing:', error)
    );

}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }