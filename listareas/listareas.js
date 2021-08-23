const inputs = document.querySelector(".ingresar input");
const boton = document.querySelector(".ingresar button");
const lista = document.querySelector(".lista");
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
}

function compartir(tarea){
    alert(tarea.value);
}