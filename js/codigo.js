var oModelo = new Modelo();

//USUARIOS DE PRUEBA
var admin = new Cliente("0",0,"admin@a.aaa","a","Admin");
oModelo.clientes.push(admin);
oModelo.altaClienteParticular("98765431w", "Nombreuno", "Apellidosuno", "Direccionuno", 987654321, "particular@p.ppp", "p");
oModelo.altaClienteEmpresa("98765435w", "Nombrecinco", "Direccioncinco", 987654325, "empresa@e.eee", "e");
oModelo.crearProyecto("proyecto", "descripcion", "11-02-1992", "11-02-2017", "aprobado", "123");
oModelo.crearPresupuesto("001", "25,2", "aprobado", "11-02-1992", "empresa@e.eee", "proyecto", "000");


oModelo.altaClienteParticular("98765432w", "Nombredos", "Apellidosdos", "Direcciondos", 987654322, "email2@cwsdc.wer", "contraseña2");
oModelo.altaClienteParticular("98765433w", "Nombretres", "Apellidostres", "Direcciontres", 987654323, "email3@cwsdc.wer", "contraseña3");
oModelo.altaClienteParticular("98765434w", "Nombrecuatro", "Apellidoscuatro", "Direccioncuatro", 987654324, "email4@cwsdc.wer", "contraseña4");
oModelo.altaClienteEmpresa("98765436w", "Nombreseis", "Direccionseis", 987654326, "email6@cwsdc.wer", "contraseña6");
oModelo.altaClienteEmpresa("98765437w", "Nombresiete", "Direccionsiete", 987654327, "email7@cwsdc.wer", "contraseña7");
oModelo.crearProyecto("proyecto1", "descripcion1", "11-02-1942", "11-02-2017", "aprobado", "321");
oModelo.crearProyecto("proyecto2", "descripcion2", "11-02-1932", "23-02-2017", "aprobado", "111");
oModelo.crearProyecto("proyecto3", "descripcion3", "11-02-1913", "23-02-2012", "pendiente", "122");
oModelo.crearProyecto("proyecto4", "descripcion4", "11-02-1912", "11-11-2011", "pendiente", "133");
oModelo.crearPresupuesto("002", "1234,23", "aprobado", "11-02-1913", "particular@p.ppp", "proyecto1", "000");
oModelo.crearPresupuesto("003", "22342,25", "pendiente", "11-02-1992", "particular@p.ppp", "proyecto2", "001");
oModelo.crearPresupuesto("004", "0,2", "pendiente", "11-02-1912", "empresa@e.eee", "proyecto3", "002");



window.addEventListener("load",login,false);

//***********************FUNCIONES PARA EL LOGIN*****************************//
function login() {
    //Oculto
    ocultarTodo();
    //Muestro el formulario de login
    var oDivMenu = document.getElementById("mostrarLogin").style.display="block";
    //Al cargar le asignamos los eventos a los dos botones
    document.getElementById("aceptarLogin").addEventListener("click",comprobarLogin,false);
    document.getElementById("btnRegistro").addEventListener("click",altaCliente,false);
}
var tipoUsuario;//se inicializa al loguearse y puede ser Admin Empresa o Particular
function comprobarLogin(email_login, contraseña){
    var email_login = document.getElementById("email_login");
    var contraseña_login = document.getElementById("contraseña_login");
    var abortar = false;
    var error="";
    var focus = false
    //VALIDAMOS EL CAMPO email
    if(email_login){
        if(/[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(email_login.value)){
            email_login.setAttribute("class","form-control");
        }else{
            error += "Debe introducir un email válido\n";
            email_login.setAttribute("class","form-control error");
            abortar = true;
            email_login.focus();
            focus = true;
        }
    }
    if (abortar){
        alert(error)
    }else{
        tipoUsuario = oModelo.comprobarLogin(email_login.value, contraseña_login.value);
        if(tipoUsuario == "Particular" || tipoUsuario == "Empresa"){
            cargarDatosCliente();
        }else if (tipoUsuario == "Admin") {
            mostrarMenuAdmin()
        }else{
            alert("El código o contraseña no son correctos")
        }
    }
}

function mostrarMenuAdmin() {
    //ocultamos
    ocultarTodo();
    //mostramos
    document.getElementById("mostrarMenuAdmin").style.display ="block";

    //********************AÑADIMOS LOS EVENTOS*********************
    var oTabla = document.querySelector("#mostrarMenuAdmin table");

    oTabla.getElementsByTagName("td")[0].addEventListener("click", cargarDatosClienteAdmin, false);
    //oTabla.getElementsByTagName("td")[1].addEventListener("click", mostrarMenuEmpleados, false);
    oTabla.getElementsByTagName("td")[2].addEventListener("click", mostrarProyectos, false);
    oTabla.getElementsByTagName("td")[3].addEventListener("click", mostrarPresupuestos, false);
    //oTabla.getElementsByTagName("td")[4].addEventListener("click", mostrarListarPedidos, false);
    document.querySelector("#mostrarMenuAdmin button").addEventListener("click", login, false);
}

//***********************FUNCIONES PARA EL CLIENTE*****************************//
function cargarDatosCliente() {
    //oculto formularios
    ocultarTodo();
    //oculto el boton que solo es para el admin
    document.getElementById("cargarDatosClienteAdmin").style.display = "none";
    document.getElementById("crearClienteAdmin").style.display = "none";
    document.getElementById("listarClientes").style.display = "none";

    //muestro lo que quiero
    document.getElementById("datosCliente").style.display = "block";
    //añado los eventos a los botones del menu de Cliente
    document.querySelector("#datosCliente .volver").addEventListener("click", login, false);
    document.getElementById("actualizarDatosCliente").addEventListener("click", actualizarDatosCliente, false);
    document.getElementById("eliminarCliente").addEventListener("click", eliminarCliente, false);
    document.getElementById("listarClientes").addEventListener("click", listarClientes, false);

    var usuarioActual = oModelo.getUsuarioActual();
    var oForm = document.formDatosCliente;
    var inputs = oForm.querySelectorAll("input");
    var oTexto;

    if(usuarioActual.tipoUsuario == "Particular") {
        document.getElementById("div_NIF_DatosEmpresa").style.display = "none";
        document.getElementById("div_nombre_DatosEmpresa").style.display = "none";
        document.getElementById("DNIDatosCliente").style.display = "block";
        document.getElementById("nombreDatosCliente").style.display = "block";
        document.getElementById("apellidosDatosCliente").style.display = "block";
        oTexto = document.createTextNode(usuarioActual.DNI);
        inputs[0].setAttribute("value", oTexto.nodeValue);
        oTexto = document.createTextNode(usuarioActual.nombre);
        inputs[2].setAttribute("value", oTexto.nodeValue);
        oTexto = document.createTextNode(usuarioActual.apellidos);
        inputs[4].setAttribute("value", oTexto.nodeValue);
    }else {
        document.getElementById("div_NIF_DatosEmpresa").style.display = "block";
        document.getElementById("div_nombre_DatosEmpresa").style.display = "block";
        document.getElementById("DNIDatosCliente").style.display = "none";
        document.getElementById("nombreDatosCliente").style.display = "none";
        document.getElementById("apellidosDatosCliente").style.display = "none";
        oTexto = document.createTextNode(usuarioActual.NIF);
        inputs[1].setAttribute("value", oTexto.nodeValue);
        oTexto = document.createTextNode(usuarioActual.nombre);
        inputs[3].setAttribute("value", oTexto.nodeValue);
    }
    oTexto = document.createTextNode(usuarioActual.direccion);
    inputs[5].setAttribute("value", oTexto.nodeValue);
    oTexto = document.createTextNode(usuarioActual.telefono);
    inputs[6].setAttribute("value", oTexto.nodeValue);
    oTexto = document.createTextNode(usuarioActual.email);
    inputs[7].setAttribute("value", oTexto.nodeValue);
    oTexto = document.createTextNode(usuarioActual.contraseña);
    inputs[8].setAttribute("value", oTexto.nodeValue);
}
function actualizarDatosCliente() {
    var error="";
    var abortar = false;
    var focus = false;
    var nombre;

    /********RECOGER DATOS*********/
    if(tipoUsuario == "Particular") {
        var DNI = document.getElementById("DNI_DatosCliente");
        nombre = document.getElementById("nombre_DatosCliente");
        var apellidos = document.getElementById("apellidos_DatosClient");
    }else{
        var NIF = document.getElementById("NIF_DatosEmpresa");
        nombre = document.getElementById("nombre_DatosEmpresa");
    }
    var direccion = document.getElementById("direccion_DatosCliente");
    var telefono = document.getElementById("telefono_DatosCliente");
    var email = document.getElementById("email_DatosCliente");
    var contraseña = document.getElementById("contraseña_DatosCliente");

    //VALIDAMOS LOS DATOS INTRODUCIDOS

    //Commprobamos que exista la variable DNI primero para que no de errores
    if(tipoUsuario == "Particular"){
        if (/[0-9]{8}[A-z]/.test(DNI.value)) {
            DNI.setAttribute("class", "form-control");
            DNI = DNI.value;
        } else {
            error += "Error en el formato del DNI, debe estar compuesto de 8 números y 1 letra\n";
            DNI.setAttribute("class", "form-control error");
            abortar = true;
            DNI.focus();
            focus = true;
        }
    }
    if(tipoUsuario == "Empresa"){
        if(/[0-9]{8}[A-z]/.test(NIF.value)){
            NIF.setAttribute("class","form-control");
            NIF = NIF.value;
        }else{
            error+="Error en el formato del NIF, debe estar compuesto de 8 números y 1 letra\n";
            NIF.setAttribute("class","form-control error");
            abortar = true;
            NIF.focus();
            focus = true;
        }
    }

    if(/^[a-z0-9_ -]{2,40}$/.test(nombre.value)) {
        nombre.setAttribute("class", "form-control");
        nombre = nombre.value;
    }else{
        error+="El nombre no tiene un formato válido\n";
        nombre.setAttribute("class","form-control error");
        abortar = true;
        nombre.focus();
        focus = true;
    }
    if(tipoUsuario == "Particular") {
        if (/^[a-z0-9_ -]{2,40}$/.test(apellidos.value)) {
            apellidos.setAttribute("class", "form-control");
            apellidos = apellidos.value;
        } else {
            error += "El apellido no tiene un formato válido\n";
            apellidos.setAttribute("class", "form-control error");
            abortar = true;
            apellidos.focus();
            focus = true;
        }
    }
    if(/^[a-z0-9_ -]{2,40}$/.test(direccion.value)){
        direccion.setAttribute("class","form-control");
        direccion = direccion.value;
    }else{
        error+="La dirección no tiene un formato válido\n";
        direccion.setAttribute("class","form-control error");
        abortar = true;
        direccion.focus();
        focus = true;
    }
    if(/^[9|6|7][0-9]{8}$/.test(telefono.value)){
        telefono.setAttribute("class","form-control");
        telefono = telefono.value;
    }else{
        error+="El teléfono no tiene un formato válido. Debe estar compuesto de 9 números y comenzar por 9, 6 ó 7.\n";
        telefono.setAttribute("class","form-control error");
        abortar = true;
        telefono.focus();
        focus = true;
    }
    //email
    if(/[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(email.value)){
        email.setAttribute("class","form-control");
        email = email.value;
    }else{
        error += "Debe introducir un email válido\n";
        email.setAttribute("class","form-control error");
        abortar = true;
        email.focus();
        focus = true;
    }

    if(/^[a-z_-]{2,40}$/.test(contraseña.value)){
        contraseña.setAttribute("class","form-control");
        contraseña = contraseña.value;
    }else{
        error+="La contraseña no tiene un formato válido\n";
        contraseña.setAttribute("class","form-control error");
        abortar = true;
        contraseña.focus();
        focus = true;
    }

    if (abortar){
        alert(error)
    }else {
        var oForm = document.formDatosCliente;
        var inputs = oForm.querySelectorAll("input");
        var datosNuevos = [];
        for (var i = 0; i < inputs.length; i++) {
            datosNuevos[i] = inputs[i].value;
        }
        var oMensaje = oModelo.actualizarCliente(datosNuevos);
        alert(oMensaje);
    }
}
function eliminarCliente(){
    var oMensaje = oModelo.eliminarClienteActual();
    alert(oMensaje);
    login();
}
function altaCliente(){
    ocultarTodo();
    document.getElementById("div_NIF_empresa").style.display="none";
    document.getElementById("div_nombre_empresa").style.display="none";
    document.getElementById("altaCliente").style.display="block";

    if(tipoUsuario == "Admin"){
        document.getElementById("volver_altaCliente").addEventListener("click",cargarDatosClienteAdmin,false);
    }else{
        document.getElementById("volver_altaCliente").addEventListener("click",login,false);
    }
    document.getElementById("radioParticular").addEventListener("click", radioParticular, false);
    document.getElementById("radioEmpresa").addEventListener("click", radioEmpresa, false);

    function radioParticular(){
        document.getElementById("div_NIF_empresa").style.display = "none";
        document.getElementById("div_nombre_empresa").style.display = "none";
        document.getElementById("DNICliente").style.display = "block";
        document.getElementById("nombreCliente").style.display = "block";
        document.getElementById("apellidosCliente").style.display = "block";
        document.getElementById("NIF_empresa").value = "";
        document.getElementById("nombre_empresa").value = "";
    }
    function radioEmpresa(){
        document.getElementById("div_NIF_empresa").style.display = "block";
        document.getElementById("div_nombre_empresa").style.display = "block";
        document.getElementById("DNICliente").style.display = "none";
        document.getElementById("nombreCliente").style.display = "none";
        document.getElementById("apellidosCliente").style.display = "none";
        document.getElementById("DNI_cliente").value = "";
        document.getElementById("nombre_cliente").value = "";
        document.getElementById("apellidos_cliente").value = "";
    }

    document.getElementById("enviarCliente").addEventListener("click",validarAltaCliente,false);

    //Vaciar campos
    for(i=0;i<document.querySelectorAll("#formCliente input").length;i++){
        document.querySelectorAll("#formCliente input")[i].value="";
    }
}
function validarAltaCliente(){
    var error="";
    var abortar = false;
    var focus = false;
    var nombre;

    /********RECOGER DATOS*********/
    if(document.getElementById("radioParticular").checked) {
        var DNI = document.getElementById("DNI_cliente");
        nombre = document.getElementById("nombre_cliente");
        var apellidos = document.getElementById("apellidos_cliente");
    }else{
        var NIF = document.getElementById("NIF_empresa");
        nombre = document.getElementById("nombre_empresa");
    }
    var direccion = document.getElementById("direccion_cliente");
    var telefono = document.getElementById("telefono_cliente");
    var email = document.getElementById("email_cliente");
    var contraseña = document.getElementById("contraseña_cliente");

    //VALIDAMOS LOS DATOS INTRODUCIDOS

    //Commprobamos que exista la variable DNI primero para que no de errores
    if(DNI){
        if (/[0-9]{8}[A-z]/.test(DNI.value)) {
            DNI.setAttribute("class", "form-control");
            DNI = DNI.value;
        } else {
            error += "Error en el formato del DNI, debe estar compuesto de 8 números y 1 letra\n";
            DNI.setAttribute("class", "form-control error");
            abortar = true;
            DNI.focus();
            focus = true;
        }
    }
    if(NIF){
        if(/[0-9]{8}[A-z]/.test(NIF.value)){
            NIF.setAttribute("class","form-control");
            NIF = NIF.value;
        }else{
            error+="Error en el formato del NIF, debe estar compuesto de 8 números y 1 letra\n";
            NIF.setAttribute("class","form-control error");
            abortar = true;
            NIF.focus();
            focus = true;
        }
    }

    if(/^[a-z0-9_ -]{2,40}$/.test(nombre.value)) {
        nombre.setAttribute("class", "form-control");
        nombre = nombre.value;
    }else{
        error+="El nombre no tiene un formato válido\n";
        nombre.setAttribute("class","form-control error");
        abortar = true;
        nombre.focus();
        focus = true;
    }
    if(apellidos) {
        if (/^[a-z0-9_ -]{2,40}$/.test(apellidos.value)) {
            apellidos.setAttribute("class", "form-control");
            apellidos = apellidos.value;
        } else {
            error += "El apellido no tiene un formato válido\n";
            apellidos.setAttribute("class", "form-control error");
            abortar = true;
            apellidos.focus();
            focus = true;
        }
    }
    if(/^[a-z0-9_ -]{2,40}$/.test(direccion.value)){
        direccion.setAttribute("class","form-control");
        direccion = direccion.value;
    }else{
        error+="La dirección no tiene un formato válido\n";
        direccion.setAttribute("class","form-control error");
        abortar = true;
        direccion.focus();
        focus = true;
    }
    if(/^[9|6|7][0-9]{8}$/.test(telefono.value)){
        telefono.setAttribute("class","form-control");
        telefono = telefono.value;
    }else{
        error+="El teléfono no tiene un formato válido. Debe estar compuesto de 9 números y comenzar por 9, 6 ó 7.\n";
        telefono.setAttribute("class","form-control error");
        abortar = true;
        telefono.focus();
        focus = true;
    }
    //email
    if(/[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(email.value)){
        email.setAttribute("class","form-control");
        email = email.value;
    }else{
        error += "Debe introducir un email válido\n";
        email.setAttribute("class","form-control error");
        abortar = true;
        email.focus();
        focus = true;
    }

    if(/^[a-z_-]{2,40}$/.test(contraseña.value)){
        contraseña.setAttribute("class","form-control");
        contraseña = contraseña.value;
    }else{
        error+="La contraseña no tiene un formato válido\n";
        contraseña.setAttribute("class","form-control error");
        abortar = true;
        contraseña.focus();
        focus = true;
    }

    if (abortar){
        alert(error)
        event.preventDefault(); //Anula el envio
    }else{
        var sCadena;
        if(document.getElementById("radioParticular").checked) {
            sCadena = oModelo.altaClienteParticular(DNI, nombre, apellidos, direccion, telefono, email, contraseña);
        }else{
            sCadena = oModelo.altaClienteEmpresa(NIF, nombre, direccion, telefono, email, contraseña);
        }
        alert(sCadena);
    }
}

//*********************** FUNCIONES PARA EL ADMIN *****************************//
/////// CLIENTES ////////
function cargarDatosClienteAdmin() {
    //oculto formularios
    ocultarTodo();
    //TOCULTAR TODOS LOS DIV MENOS EL DE EMAIL
    var ocultarDivs = document.querySelectorAll("#formDatosCliente div");
    for(var i = 0; i < ocultarDivs.length; i++){
        ocultarDivs[i].style.display = "none";
    }
    //Muestro el div de email para buscar al cliente
    document.querySelector("#email_DatosCliente").parentNode.style.display = "block";
    //muestro lo que quiero
    document.getElementById("datosCliente").style.display = "block";
    document.getElementById("cargarDatosClienteAdmin").style.display = "block";
    document.getElementById("crearClienteAdmin").style.display = "block";
    document.getElementById("listarClientes").style.display = "block";

    //añado los eventos a los botones del menu de Cliente
    document.getElementById("cargarDatosClienteAdmin").addEventListener("click", datosClientePorEmail, false);
    document.getElementById("crearClienteAdmin").addEventListener("click", altaCliente, false);
    document.querySelector("#datosCliente .volver").addEventListener("click", mostrarMenuAdmin, false);
    document.getElementById("listarClientes").addEventListener("click", listarClientes, false);

    //Los eventos de actualizae y eliminar cliente los creo una vez que haya cargado el cliente con datosClientePorEmail
    document.getElementById("actualizarDatosCliente").setAttribute("disabled", "disabled");
    document.getElementById("eliminarCliente").setAttribute("disabled", "disabled");

}
function datosClientePorEmail() {
    var email_DatosCliente = document.getElementById("email_DatosCliente");
    var abortar = false;
    var error="";
    var focus = false
    //VALIDAMOS EL CAMPO email
    if(email_DatosCliente){
        if(/[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(email_DatosCliente.value)){
            email_DatosCliente.setAttribute("class","form-control");
        }else{
            error += "Debe introducir un email válido\n";
            email_DatosCliente.setAttribute("class","form-control error");
            abortar = true;
            email_DatosCliente.focus();
            focus = true;
        }
    }
    if (abortar){
        alert(error)
    }else {
        var clienteEncontrado = oModelo.cargarClienteEncontrado(email_DatosCliente.value);
        var oForm = document.formDatosCliente;
        var inputs = oForm.querySelectorAll("input");
        var oTexto;
        if (clienteEncontrado != null) {
            if (clienteEncontrado.tipoUsuario == "Particular") {
                document.getElementById("div_NIF_DatosEmpresa").style.display = "none";
                document.getElementById("div_nombre_DatosEmpresa").style.display = "none";
                document.getElementById("DNIDatosCliente").style.display = "block";
                document.getElementById("nombreDatosCliente").style.display = "block";
                document.getElementById("apellidosDatosCliente").style.display = "block";
                oTexto = document.createTextNode(clienteEncontrado.DNI);
                inputs[0].setAttribute("value", oTexto.nodeValue);
                oTexto = document.createTextNode(clienteEncontrado.nombre);
                inputs[2].setAttribute("value", oTexto.nodeValue);
                oTexto = document.createTextNode(clienteEncontrado.apellidos);
                inputs[4].setAttribute("value", oTexto.nodeValue);
            } else {
                document.getElementById("div_NIF_DatosEmpresa").style.display = "block";
                document.getElementById("div_nombre_DatosEmpresa").style.display = "block";
                document.getElementById("DNIDatosCliente").style.display = "none";
                document.getElementById("nombreDatosCliente").style.display = "none";
                document.getElementById("apellidosDatosCliente").style.display = "none";
                oTexto = document.createTextNode(clienteEncontrado.NIF);
                inputs[1].setAttribute("value", oTexto.nodeValue);
                oTexto = document.createTextNode(clienteEncontrado.nombre);
                inputs[3].setAttribute("value", oTexto.nodeValue);
            }
            document.getElementById("direccion_DatosCliente").parentNode.style.display = "block";
            oTexto = document.createTextNode(clienteEncontrado.direccion);
            inputs[5].setAttribute("value", oTexto.nodeValue);
            document.getElementById("telefono_DatosCliente").parentNode.style.display = "block";
            oTexto = document.createTextNode(clienteEncontrado.telefono);
            inputs[6].setAttribute("value", oTexto.nodeValue);
            document.getElementById("email_DatosCliente").parentNode.style.display = "block";
            oTexto = document.createTextNode(clienteEncontrado.email);
            inputs[7].setAttribute("value", oTexto.nodeValue);
            document.getElementById("contraseña_DatosCliente").parentNode.style.display = "block";
            oTexto = document.createTextNode(clienteEncontrado.contraseña);
            inputs[8].setAttribute("value", oTexto.nodeValue);
            //habilito los botones de actualizar y eliminar y les asigno sus eventos
            document.getElementById("actualizarDatosCliente").removeAttribute("disabled");
            document.getElementById("eliminarCliente").removeAttribute("disabled");
            document.getElementById("actualizarDatosCliente").addEventListener("click", actualizarClienteAdmin, false);
            document.getElementById("eliminarCliente").addEventListener("click", eliminarClienteAdmin, false);
        }else{
            alert("No se ha encontrado ningún cliente con ese email");
        }
    }
}
function actualizarClienteAdmin(){
    var clienteEncontrado = oModelo.getClienteEncontrado();
    var error="";
    var abortar = false;
    var focus = false;
    var nombre;

    /********RECOGER DATOS*********/
    if(tipoUsuario == "Particular") {
        var DNI = document.getElementById("DNI_DatosCliente");
        nombre = document.getElementById("nombre_DatosCliente");
        var apellidos = document.getElementById("apellidos_DatosClient");
    }else{
        var NIF = document.getElementById("NIF_DatosEmpresa");
        nombre = document.getElementById("nombre_DatosEmpresa");
    }
    var direccion = document.getElementById("direccion_DatosCliente");
    var telefono = document.getElementById("telefono_DatosCliente");
    var email = document.getElementById("email_DatosCliente");
    var contraseña = document.getElementById("contraseña_DatosCliente");

    //VALIDAMOS LOS DATOS INTRODUCIDOS

    //Commprobamos que exista la variable DNI primero para que no de errores
    if(tipoUsuario == "Particular"){
        if (/[0-9]{8}[A-z]/.test(DNI.value)) {
            DNI.setAttribute("class", "form-control");
            DNI = DNI.value;
        } else {
            error += "Error en el formato del DNI, debe estar compuesto de 8 números y 1 letra\n";
            DNI.setAttribute("class", "form-control error");
            abortar = true;
            DNI.focus();
            focus = true;
        }
    }
    if(tipoUsuario == "Empresa"){
        if(/[0-9]{8}[A-z]/.test(NIF.value)){
            NIF.setAttribute("class","form-control");
            NIF = NIF.value;
        }else{
            error+="Error en el formato del NIF, debe estar compuesto de 8 números y 1 letra\n";
            NIF.setAttribute("class","form-control error");
            abortar = true;
            NIF.focus();
            focus = true;
        }
    }

    if(/^[a-z0-9_ -]{2,40}$/.test(nombre.value)) {
        nombre.setAttribute("class", "form-control");
        nombre = nombre.value;
    }else{
        error+="El nombre no tiene un formato válido\n";
        nombre.setAttribute("class","form-control error");
        abortar = true;
        nombre.focus();
        focus = true;
    }
    if(tipoUsuario == "Particular") {
        if (/^[a-z0-9_ -]{2,40}$/.test(apellidos.value)) {
            apellidos.setAttribute("class", "form-control");
            apellidos = apellidos.value;
        } else {
            error += "El apellido no tiene un formato válido\n";
            apellidos.setAttribute("class", "form-control error");
            abortar = true;
            apellidos.focus();
            focus = true;
        }
    }
    if(/^[a-z0-9_ -]{2,40}$/.test(direccion.value)){
        direccion.setAttribute("class","form-control");
        direccion = direccion.value;
    }else{
        error+="La dirección no tiene un formato válido\n";
        direccion.setAttribute("class","form-control error");
        abortar = true;
        direccion.focus();
        focus = true;
    }
    if(/^[9|6|7][0-9]{8}$/.test(telefono.value)){
        telefono.setAttribute("class","form-control");
        telefono = telefono.value;
    }else{
        error+="El teléfono no tiene un formato válido. Debe estar compuesto de 9 números y comenzar por 9, 6 ó 7.\n";
        telefono.setAttribute("class","form-control error");
        abortar = true;
        telefono.focus();
        focus = true;
    }
    //email
    if(/[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(email.value)){
        email.setAttribute("class","form-control");
        email = email.value;
    }else{
        error += "Debe introducir un email válido\n";
        email.setAttribute("class","form-control error");
        abortar = true;
        email.focus();
        focus = true;
    }

    if(/^[a-z_-]{2,40}$/.test(contraseña.value)){
        contraseña.setAttribute("class","form-control");
        contraseña = contraseña.value;
    }else{
        error+="La contraseña no tiene un formato válido\n";
        contraseña.setAttribute("class","form-control error");
        abortar = true;
        contraseña.focus();
        focus = true;
    }

    if (abortar){
        alert(error)
    }else {
        var oForm = document.formDatosCliente;
        var inputs = oForm.querySelectorAll("input");
        var datosNuevos = [];
        for (var i = 0; i < inputs.length; i++) {
            datosNuevos[i] = inputs[i].value;
        }
        var oMensaje = oModelo.actualizarClienteEncontrado(email, datosNuevos);
        alert(oMensaje);
    }
}
function eliminarClienteAdmin(){
    var email = document.getElementById("email_DatosCliente");
    var error="";
    var abortar = false;
    var focus = false

    //email
    if(/[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(email.value)){
        email.setAttribute("class","form-control");
    }else{
        error += "Debe introducir un email válido\n";
        email.setAttribute("class","form-control error");
        abortar = true;
        email.focus();
        focus = true;
    }
    if (abortar){
        alert(error)
        event.preventDefault(); //Anula el envio
    }else {
        var oMensaje = oModelo.eliminarClienteEncontrado(email.value);
        alert(oMensaje);
    }
}
function listarClientes(){
    ocultarTodo();
    document.getElementById("mostrarListadoClientes").style.display = "block";
    var oTablaListarClientesParticular = oModelo.listarClientesParticular();
    var oTablaListarClientesEmpresa = oModelo.listarClientesEmpresa();
    var oDivListados = document.getElementById("mostrarListadoClientes");
    var oBtnVolverListados = document.querySelector("#mostrarListadoClientes .volver");
    //Borramos las tablas previas, sera null si antes no habia ninguna
    var oFieldSet = document.querySelectorAll("#mostrarListadoClientes table");
    for(var i = 0; i < oFieldSet.length; i++) {
        if (oFieldSet[i] != null) {
            while (oFieldSet[i].hasChildNodes()) {
                oFieldSet[i].removeChild(oFieldSet[i].lastChild);
            }
        }
    }
    //insertamos la tabla antes que el boton volver
    oDivListados.insertBefore(oTablaListarClientesParticular, oBtnVolverListados);
    oDivListados.insertBefore(oTablaListarClientesEmpresa, oBtnVolverListados);
    oDivListados.style.display = "block";
    oBtnVolverListados.addEventListener("click", cargarDatosClienteAdmin, false);
}
/////// PROYECTOS ////////
function mostrarProyectos() {
    ocultarTodo();
    document.getElementById("datosProyecto").style.display = "block";

    document.getElementById("cargar_proyecto").addEventListener("click", cargarProyecto, false);
    document.getElementById("crear_proyecto").addEventListener("click", crearProyecto, false);
    document.getElementById("actualizar_proyecto").addEventListener("click", actualizarProyecto, false);
    document.getElementById("eliminar_proyecto").addEventListener("click", eliminarProyecto, false);
    document.getElementById("asignarPersonal_proyecto").addEventListener("click", mostrarAsignarEmpleado, false);
    document.getElementById("listar_proyectos").addEventListener("click", listarProyectos, false);
    document.getElementById("volver_proyecto").addEventListener("click", mostrarMenuAdmin, false);
}
function cargarProyecto(nombre) {
    var nombre_proyecto = document.getElementById("nombre_proyecto");
    var abortar = false;
    var error="";
    var focus = false;
    //VALIDAMOS EL CAMPO nombre
    if(nombre_proyecto){
        if(/^[a-z0-9_ -]{2,40}$/.test(nombre_proyecto.value)) {
            nombre_proyecto.setAttribute("class", "form-control");
        }else{
            error+="El nombre no tiene un formato válido\n";
            nombre_proyecto.setAttribute("class","form-control error");
            abortar = true;
            nombre_proyecto.focus();
            focus = true;
        }
    }
    if (abortar){
        alert(error)
    }else {
        var proyectoEncontrado = oModelo.cargarProyectoEncontrado(nombre_proyecto.value);
        var oForm = document.formProyecto;
        var inputs = oForm.querySelectorAll("input");
        var textArea = oForm.querySelector("textarea");
        var oTexto;
        if (proyectoEncontrado != null) {
            oTexto = document.createTextNode(proyectoEncontrado.nombre);
            inputs[0].value = oTexto.nodeValue;
            oTexto = document.createTextNode(proyectoEncontrado.descripcion);
            textArea.value = oTexto.nodeValue;
            oTexto = document.createTextNode(proyectoEncontrado.fecha_inicio);
            inputs[1].value = oTexto.nodeValue;
            oTexto = document.createTextNode(proyectoEncontrado.fecha_fin);
            inputs[2].value = oTexto.nodeValue;
            if(proyectoEncontrado.estado == "aprobado"){
                inputs[3].checked = true;
                inputs[4].checked = false;
            }else{
                inputs[4].checked = true;
                inputs[3].checked = false;
            }
            oTexto = document.createTextNode(proyectoEncontrado.COD_almacen);
            inputs[5].value = oTexto.nodeValue;
        }else{
            alert("No se ha encontrado ningún proyecto con ese nombre");
        }
    }
}
function crearProyecto() {
    var error="";
    var abortar = false;
    var focus = false;

    /********RECOGER DATOS*********/

    var nombre = document.getElementById("nombre_proyecto");
    var descripcion = document.getElementById("descripcion_proyecto");
    var fecha_inicio = document.getElementById("fecha_inicio_proyecto");
    var fecha_fin = document.getElementById("fecha_final_proyecto");
    var estado;
    if(document.getElementById("radioAprobado").checked){
        estado = "aprobado";
    }else {
        estado = "pendiente";
    }
    var COD_almacen = document.getElementById("COD_almacen");


    //VALIDAMOS LOS DATOS INTRODUCIDOS

    if(/^[a-z0-9_ -]{2,40}$/.test(nombre.value)) {
        nombre.setAttribute("class", "form-control");
        nombre = nombre.value;
        12-12-1234}else{
        error+="El nombre no tiene un formato válido\n";
        nombre.setAttribute("class","form-control error");
        abortar = true;
        nombre.focus();
        focus = true;
    }

    if(/^.{2,120}$/.test(descripcion.value)){
        descripcion.setAttribute("class","form-control");
        descripcion = descripcion.value;
    }else{
        error+="Debe escribir una descripción del proyecto\n";
        descripcion.setAttribute("class","form-control error");
        abortar = true;
        descripcion.focus();
        focus = true;
    }
    if(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(fecha_inicio.value)){
        fecha_inicio.setAttribute("class","form-control");
        fecha_inicio = fecha_inicio.value;
    }else{
        error+="La fecha de inicio no tiene un formato válido\n";
        fecha_inicio.setAttribute("class","form-control error");
        abortar = true;
        fecha_inicio.focus();
        focus = true;
    }
    if(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(fecha_fin.value)){
        fecha_fin.setAttribute("class","form-control");
        fecha_fin = fecha_fin.value;
    }else{
        error+="La fecha de finalización no tiene un formato válido\n";
        fecha_fin.setAttribute("class","form-control error");
        abortar = true;
        fecha_fin.focus();
        focus = true;
    }

    if(/^[0-9]{3}$/.test(COD_almacen.value)){
        COD_almacen.setAttribute("class","form-control");
        COD_almacen = COD_almacen.value;
    }else{
        error+="El código de almacen debe estar compuesto por 3 números\n";
        COD_almacen.setAttribute("class","form-control error");
        abortar = true;
        COD_almacen.focus();
        focus = true;
    }

    if (abortar){
        alert(error)
        event.preventDefault(); //Anula el envio
    }else{
        var oMesanje = oModelo.crearProyecto(nombre, descripcion, fecha_inicio, fecha_fin, estado, COD_almacen);
        if(oMesanje == "existe"){
            if(confirm("Ya existe un proyecto con ese nombre. ¿Desea cargar los datos?")){
                cargarProyecto(nombre);
            }
        }else{
            alert(oMesanje);
        }
    }
}
function actualizarProyecto() {
    var error="";
    var abortar = false;
    var focus = false;

    /********RECOGER DATOS*********/

    var nombre = document.getElementById("nombre_proyecto");
    var descripcion = document.getElementById("descripcion_proyecto");
    var fecha_inicio = document.getElementById("fecha_inicio_proyecto");
    var fecha_fin = document.getElementById("fecha_final_proyecto");
    var estado;
    if(document.getElementById("radioAprobado").checked){
        estado = "aprobado";
    }else {
        estado = "pendiente";
    }
    var COD_almacen = document.getElementById("COD_almacen");


    //VALIDAMOS LOS DATOS INTRODUCIDOS

    if(/^[a-z0-9_ -]{2,40}$/.test(nombre.value)) {
        nombre.setAttribute("class", "form-control");
        nombre = nombre.value;
    }else{
        error+="El nombre no tiene un formato válido\n";
        nombre.setAttribute("class","form-control error");
        abortar = true;
        nombre.focus();
        focus = true;
    }

    if(/^.{2,120}$/.test(descripcion.value)){
        descripcion.setAttribute("class","form-control");
        descripcion = descripcion.value;
    }else{
        error+="Debe escribir una descripción del proyecto\n";
        descripcion.setAttribute("class","form-control error");
        abortar = true;
        descripcion.focus();
        focus = true;
    }
    if(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(fecha_inicio.value)){
        fecha_inicio.setAttribute("class","form-control");
        fecha_inicio = fecha_inicio.value;
    }else{
        error+="La fecha de inicio no tiene un formato válido\n";
        fecha_inicio.setAttribute("class","form-control error");
        abortar = true;
        fecha_inicio.focus();
        focus = true;
    }
    if(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(fecha_fin.value)){
        fecha_fin.setAttribute("class","form-control");
        fecha_fin = fecha_fin.value;
    }else{
        error+="La fecha de finalización no tiene un formato válido\n";
        fecha_fin.setAttribute("class","form-control error");
        abortar = true;
        fecha_fin.focus();
        focus = true;
    }

    if(/^[0-9]{3}$/.test(COD_almacen.value)){
        COD_almacen.setAttribute("class","form-control");
        COD_almacen = COD_almacen.value;
    }else{
        error+="El código de almacen debe estar compuesto por 3 números\n";
        COD_almacen.setAttribute("class","form-control error");
        abortar = true;
        COD_almacen.focus();
        focus = true;
    }

    if (abortar){
        alert(error)
    }else{
        var oMensaje = oModelo.actualizarProyectoEncontrado(nombre, descripcion, fecha_inicio, fecha_fin, estado, COD_almacen);
        alert(oMensaje);
    }
}
function eliminarProyecto() {
    var nombre_proyecto = document.getElementById("nombre_proyecto");
    var abortar = false;
    var error="";
    var focus = false;
    //VALIDAMOS EL CAMPO nombre
    if(nombre_proyecto){
        if(/^[a-z0-9_ -]{2,40}$/.test(nombre_proyecto.value)) {
            nombre_proyecto.setAttribute("class", "form-control");
        }else{
            error+="El nombre no tiene un formato válido\n";
            nombre_proyecto.setAttribute("class","form-control error");
            abortar = true;
            nombre_proyecto.focus();
            focus = true;
        }
    }
    if (abortar){
        alert(error)
    }else {
        var oMensaje = oModelo.eliminarProyectoEncontrado(nombre_proyecto.value);
        alert(oMensaje);
    }
}
function listarProyectos() {
    ocultarTodo();
    document.getElementById("mostrarListadoProyectos").style.display = "block";
    var oTablaListarProyectosAprobados = oModelo.listarProyectosAprobados();
    var oTablaListarProyectosPendientes = oModelo.listarProyectosPendientes();
    var oDivListados = document.getElementById("mostrarListadoProyectos");
    var oBtnVolverListados = document.querySelector("#mostrarListadoProyectos button");
    //Borramos las tablas previas, sera null si antes no habia ninguna
    var oFieldSet = document.querySelectorAll("#mostrarListadoProyectos table");
    for(var i = 0; i < oFieldSet.length; i++) {
        if (oFieldSet[i] != null) {
            while (oFieldSet[i].hasChildNodes()) {
                oFieldSet[i].removeChild(oFieldSet[i].lastChild);
            }
        }
    }
    //insertamos la tabla antes que el boton volver
    oDivListados.insertBefore(oTablaListarProyectosAprobados, oBtnVolverListados);
    oDivListados.insertBefore(oTablaListarProyectosPendientes, oBtnVolverListados);
    oDivListados.style.display = "block";
    oBtnVolverListados.addEventListener("click", mostrarProyectos, false);
}
//TODO EN ESTE SE AÑADIRAN A UN PROYECTO LOS EMPLEADOS CREADOS ANTERIORMENTE
function mostrarAsignarEmpleado() {
    ocultarTodo();
}
/////// PRESUPUESTOS ////////
function mostrarPresupuestos() {
    ocultarTodo();
    document.getElementById("datosPresupuesto").style.display = "block";

    document.getElementById("cargar_presupuesto").addEventListener("click", cargarPresupuesto, false);
    document.getElementById("crear_presupuesto").addEventListener("click", crearPresupuesto, false);
    document.getElementById("actualizar_presupuesto").addEventListener("click", actualizarPresupuesto, false);
    document.getElementById("eliminar_presupuesto").addEventListener("click", eliminarPresupuesto, false);
    document.getElementById("listar_presupuestoproyectos").addEventListener("click", listarPresupuesto, false);
    document.getElementById("volver_presupuesto").addEventListener("click", mostrarMenuAdmin, false);
}
function cargarPresupuesto(COD) {
    var COD = document.getElementById("COD_presupuesto");
    var abortar = false;
    var error="";
    var focus = false;
    //VALIDAMOS EL CAMPO nombre
    if(COD){
        if(/^[0-9]{3}$/.test(COD.value)) {
            COD.setAttribute("class", "form-control");
        }else{
            error+="El código de presupuesto debe estar compuesto por 3 números\n";
            COD.setAttribute("class","form-control error");
            abortar = true;
            COD.focus();
            focus = true;
        }
    }
    if (abortar){
        alert(error)
    }else {
        var presupuesoEncontrado = oModelo.cargarPresupuestoEncontrado(COD.value);
        var oForm = document.formPresupuesto;
        var inputs = oForm.querySelectorAll("input");
        var oTexto;
        if (presupuesoEncontrado != null) {
            oTexto = document.createTextNode(presupuesoEncontrado.COD);
            inputs[0].value = oTexto.nodeValue;
            oTexto = document.createTextNode(presupuesoEncontrado.total);
            inputs[1].value = oTexto.nodeValue;
            if(presupuesoEncontrado.estado == "aprobado"){
                inputs[2].checked = true;
                inputs[3].checked = false;
            }else{
                inputs[3].checked = true;
                inputs[2].checked = false;
            }
            oTexto = document.createTextNode(presupuesoEncontrado.fecha);
            inputs[4].value = oTexto.nodeValue;
            oTexto = document.createTextNode(presupuesoEncontrado.email_cliente);
            inputs[5].value = oTexto.nodeValue;
            oTexto = document.createTextNode(presupuesoEncontrado.nombre_proyecto);
            inputs[6].value = oTexto.nodeValue;
            oTexto = document.createTextNode(presupuesoEncontrado.COD_factura);
            inputs[7].value = oTexto.nodeValue;
        }else{
            alert("No se ha encontrado ningún presupuesto con ese código");
        }
    }
}
function crearPresupuesto(){
    var error="";
    var abortar = false;
    var focus = false;

    /********RECOGER DATOS*********/

    var COD = document.getElementById("COD_presupuesto");
    var total = document.getElementById("total_presupuesto");
    var fecha = document.getElementById("fecha_presupuesto");
    var email_cliente = document.getElementById("email_cliente_presupuesto");
    var estado;
    if(document.getElementById("radioPresupuestoAprobado").checked){
        estado = "aprobado";
    }else {
        estado = "pendiente";
    }
    var proyecto = document.getElementById("nombreProyecto_presupuesto");
    var factura = document.getElementById("COD_factura_presupuesto");


    //VALIDAMOS LOS DATOS INTRODUCIDOS

    if(/^[0-9]{3}$/.test(COD.value)) {
        COD.setAttribute("class", "form-control");
        COD = COD.value;
    }else{
        error+="El código de presupuesto debe estar compuesto por 3 números\n";
        COD.setAttribute("class","form-control error");
        abortar = true;
        COD.focus();
        focus = true;
    }

    if(/^[0-9]{1,},[0-9]{1,2}$/.test(total.value)){
        total.setAttribute("class","form-control");
        total = total.value;
    }else{
        error+="El total no tiene un formato valido: X,X\n";
        total.setAttribute("class","form-control error");
        abortar = true;
        total.focus();
        focus = true;
    }
    if(/[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(email_cliente.value)){
        email_cliente.setAttribute("class","form-control");
        email_cliente = email_cliente.value;
    }else{
        error += "Debe introducir un email válido\n";
        email_cliente.setAttribute("class","form-control error");
        abortar = true;
        email_cliente.focus();
        focus = true;
    }
    if(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(fecha.value)){
        fecha.setAttribute("class","form-control");
        fecha = fecha.value;
    }else{
        error+="La fecha no tiene un formato válido\n";
        fecha.setAttribute("class","form-control error");
        abortar = true;
        fecha.focus();
        focus = true;
    }

    if(/^[a-z0-9_ -]{2,40}$/.test(proyecto.value)) {
        proyecto.setAttribute("class", "form-control");
        proyecto = proyecto.value;

    }else{
        error+="El nombre de proyecto no tiene un formato válido\n";
        proyecto.setAttribute("class","form-control error");
        abortar = true;
        proyecto.focus();
        focus = true;
    }

    if(factura.value != "") {
        if (/^[0-9]{3}$/.test(factura.value)) {
            factura.setAttribute("class", "form-control");
            factura = factura.value;
        } else {
            error += "El código de factura debe estar compuesto por 3 números\n";
            factura.setAttribute("class", "form-control error");
            abortar = true;
            factura.focus();
            focus = true;
        }
    }else{
        factura = "000";
    }

    if (abortar){
        alert(error)
    }else{
        var oMesanje = oModelo.crearPresupuesto(COD, total, estado, fecha, email_cliente, proyecto, factura);
        if(oMesanje == "existePresupuesto"){
            if(confirm("Ya existe un presupuesto con ese código. ¿Desea cargar los datos?")){
                cargarPresupuesto(COD);
            }
        }else{
            alert(oMesanje);
        }
    }
}
function actualizarPresupuesto() {
    var error="";
    var abortar = false;
    var focus = false;

    /********RECOGER DATOS*********/

    var COD = document.getElementById("COD_presupuesto");
    var total = document.getElementById("total_presupuesto");
    var fecha = document.getElementById("fecha_presupuesto");
    var email_cliente = document.getElementById("email_cliente_presupuesto");
    var estado;
    if(document.getElementById("radioPresupuestoAprobado").checked){
        estado = "aprobado";
    }else {
        estado = "pendiente";
    }
    var proyecto = document.getElementById("nombreProyecto_presupuesto");
    var factura = document.getElementById("COD_factura_presupuesto");


    //VALIDAMOS LOS DATOS INTRODUCIDOS

    if(/^[0-9]{3}$/.test(COD.value)) {
        COD.setAttribute("class", "form-control");
        COD = COD.value;
    }else{
        error+="El código de presupuesto debe estar compuesto por 3 números\n";
        COD.setAttribute("class","form-control error");
        abortar = true;
        COD.focus();
        focus = true;
    }

    if(/^[0-9]{1,},[0-9]{1,2}$/.test(total.value)){
        total.setAttribute("class","form-control");
        total = total.value;
    }else{
        error+="El total no tiene un formato valido: X,X\n";
        total.setAttribute("class","form-control error");
        abortar = true;
        total.focus();
        focus = true;
    }
    if(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(fecha.value)){
        fecha.setAttribute("class","form-control");
        fecha = fecha.value;
    }else{
        error+="La fecha no tiene un formato válido\n";
        fecha.setAttribute("class","form-control error");
        abortar = true;
        fecha.focus();
        focus = true;
    }
    if(/[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/.test(email_cliente.value)){
        email_cliente.setAttribute("class","form-control");
        email_cliente = email_cliente.value;
    }else{
        error += "Debe introducir un email válido\n";
        email_cliente.setAttribute("class","form-control error");
        abortar = true;
        email_cliente.focus();
        focus = true;
    }

    if(/^[a-z0-9_ -]{2,40}$/.test(proyecto.value)) {
        proyecto.setAttribute("class", "form-control");
        proyecto = proyecto.value;
    }else{
        error+="El nombre de proyecto no tiene un formato válido\n";
        proyecto.setAttribute("class","form-control error");
        abortar = true;
        proyecto.focus();
        focus = true;
    }

    if(factura.value != "") {
        if (/^[0-9]{3}$/.test(factura.value)) {
            factura.setAttribute("class", "form-control");
            factura = factura.value;
        } else {
            error += "El código de factura debe estar compuesto por 3 números\n";
            factura.setAttribute("class", "form-control error");
            abortar = true;
            factura.focus();
            focus = true;
        }
    }else{
        factura = "000";
    }

    if (abortar){
        alert(error);
    }else{
        var oMensaje = oModelo.actualizarPresupuestoEncontrado(COD, total, estado, fecha, email_cliente, proyecto, factura);
        alert(oMensaje);
    }
}
function eliminarPresupuesto() {
    var COD = document.getElementById("COD_presupuesto");
    var abortar = false;
    var error="";
    var focus = false;
    //VALIDAMOS EL CAMPO COD_presupuesto
    if(COD){
        if(/^[0-9]{3}$/.test(COD.value)) {
            COD.setAttribute("class", "form-control");
        }else{
            error+="El código de presupuesto debe estar compuesto por 3 números\n";
            COD.setAttribute("class","form-control error");
            abortar = true;
            COD.focus();
            focus = true;
        }
    }
    if (abortar){
        alert(error)
    }else {
        var oMensaje = oModelo.eliminarPresupuestoEncontrado(COD.value);
        alert(oMensaje);
    }
}
function listarPresupuesto() {
    ocultarTodo();
    document.getElementById("mostrarListadoPresupuesto").style.display = "block";
    var oTablaListarPresupuestosAprobados = oModelo.listarPresupuestosAprobados();
    var oTablaListarPresupuestosPendientes = oModelo.listarPresupuestosPendientes();
    var oDivListados = document.getElementById("mostrarListadoPresupuesto");
    var oBtnVolverListados = document.querySelector("#mostrarListadoPresupuesto button");
    //Borramos las tablas previas, sera null si antes no habia ninguna
    var oFieldSet = document.querySelectorAll("#mostrarListadoPresupuesto table");
    for(var i = 0; i < oFieldSet.length; i++) {
        if (oFieldSet[i] != null) {
            while (oFieldSet[i].hasChildNodes()) {
                oFieldSet[i].removeChild(oFieldSet[i].lastChild);
            }
        }
    }
    //insertamos la tabla antes que el boton volver
    oDivListados.insertBefore(oTablaListarPresupuestosAprobados, oBtnVolverListados);
    oDivListados.insertBefore(oTablaListarPresupuestosPendientes, oBtnVolverListados);
    oDivListados.style.display = "block";
    oBtnVolverListados.addEventListener("click", mostrarPresupuestos, false);
}
//***** FUNCIONES GENERICAS *****//
function ocultarTodo(){
    for(var i = 0; i< document.body.children.length; i++){
        var hijo = document.body.children[i].style.display = "none";
    }
    document.getElementById("logo").style.display = "block";
}
