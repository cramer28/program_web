const inputs = document.querySelector(".ingresar input");
const boton = document.querySelector(".ingresar button");
const lista = document.querySelector(".lista");
let id = 0;
let tarea = "";
let emoji = String.fromCodePoint(0x1F5D1);

inputs.onkeyup = ()=>{
    let valorIngresado = inputs.value;
    if(valorIngresado.trim() != 0){
        boton.classList.add("active"); 
    }else{
        boton.classList.remove("active");
    }
}



boton.onclick = ()=>{
    var f=id;
    let texto = inputs.value;
    var li = document.createElement("li");
    var but = document.createElement("span");
    li.appendChild(document.createTextNode(`${texto}`));
    li.setAttribute("id", f);
    li.onclick = function(){tildar(f)};
    but.appendChild(document.createTextNode(emoji));
    but.setAttribute("class", "eliminar");
    but.onclick = function(){borrar(f)};
    li.appendChild(but);
    //lista.appendChild(li);
    lista.insertBefore(li, lista.childNodes[0]);
    inputs.value = "";
    id++;
    boton.classList.remove("active");
}

function borrar(f){
    var aBorrar = document.getElementById(f);
    aBorrar.remove();
}

function tildar(f){
    let taria = document.getElementById(f);
    if(taria.classList.contains("tilde")){
        taria.classList.remove("tilde");
    }else{
        taria.classList.add("tilde");
    }
}