// modificacion titulo principal
$(".tituloPrincipal").css({ background: "white" , padding:"18px" , textAlign: "center" , fontWeight: "bold"});

// nos muestra los botones de anadir carrito
const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []
// agrega cada click a la lista de carrito
Clickbutton.forEach(btn =>{
    btn.addEventListener('click', agregarCarrito)
})
// selecciona la tarjeta y el titulo que lo contiene de cada item
function agregarCarrito(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent ;
    const itemPrice = item.querySelector('.precio').textContent ;
    const itemImg = item.querySelector('.card-img-top').src; 
    // se crea un objeto
    const newItem ={
        title:itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }
// pasar todo a una funcion 
addItemCarrito(newItem)
}

function addItemCarrito(newItem){
    
// funcion para la alerta 
const alert = document.querySelector('.alert')
setTimeout(function(){
    alert.classList.add('hide')
},700)
alert.classList.remove('hide')

    const inputElemento = tbody.getElementsByClassName('input__elemento')
// Se realiza for para que  vaya sumando la cantidad de veces que se clickea el anadir carrito e impacte en carrito
for(let i=0 ; i<carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
        carrito[i].cantidad ++;
        const inputValue = inputElemento[i]
        inputValue.value++
        console.log(carrito)
        CarritoTotal()
        return null; 
    }
}
// Se va ir guardando dentro de la matriz principal carrito todo los newItem
    carrito.push(newItem)
    renderCarrito()
}

// lo que se encuentre en el carrito lo renderizamos para obtener el valor final 
function renderCarrito (){
    tbody.innerHTML =''
    console.log(carrito)
    // cada vez que se ejecute tbody quiero que este vacio
    carrito.map(item => {
        const tr = document.createElement('tr')
        // la clase tr va venir con esa clase incoorporado
        tr.classList.add('ItemCarrito')
        // agregar al contenido
        const Content =`
        <th scope="row">1</th>
        <td class="table__productos">
        <img src=${item.img} alt="">
        <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__precio"><p>${item.precio} </p></td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete btn btn-danger"> X </button>
        </td>
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click',removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change',sumaCantidad)

    })
    CarritoTotal()
}
// realizamos la configuracion para el monto total
function CarritoTotal(){
    let Total = 0 ;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) =>{
        const precio = Number(item.precio.replace("$",''))
        Total = Total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total} USD`
    addLocalStorage()
}

// funcion para eliminar una seleccion en la ventana carrito
function removeItemCarrito(e){ 
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0 ; i<carrito.length ; i++){

        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i,1)
        }
    }

    const alert = document.querySelector('.remove')
    setTimeout(function(){
    alert.classList.add('remove')
    },700)
    alert.classList.remove('remove')


    tr.remove()
    CarritoTotal()
}
// funcion para que el monto total impacte la cantidad que se coloca 
function sumaCantidad(e){
    const sumaInput =e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value  = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })
    console.log(carrito)
}
// guardamos los datos en localstorage 
function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
    window.onload =function(){
        const storage = JSON.parse(localStorage.getItem('carrito'));
        if(storage){
            carrito = storage ;
            renderCarrito()
        }

    }
