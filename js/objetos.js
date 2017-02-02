/*********************DECLARACION DE OBJETOS*************************/

//////////////////////// Objeto Proyecto ////////////////////////
function Proyecto(nombre, descripcion, fecha_inicio, fecha_fin, estado, COD_almacen){
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.estado = estado;//aprobado o pendiente
    this.COD_almacen = COD_almacen;
    //El proyecto se inicializa sin personal. Estos se añadiran con la opcion "añadir empleado a un proyecto"
    this.personal = []; //array personal[]
}
Proyecto.prototype.toHTMLRow = function(){
    return "<tr><td>"+this.nombre+"</td><td>"+this.descripcion+"</td><td>"+this.fecha_inicio+"</td>" +
        "<td>"+this.fecha_fin+"</td><td>"+this.estado+"</td><td>"+this.COD_almacen+"</td><td>"+this.personal+"</td></tr>";
}

//////////////////////// Objeto Cliente ////////////////////////
function Cliente(direccion, telefono, email, contraseña, tipoUsuario){
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.contraseña = contraseña;
    this.tipoUsuario = tipoUsuario;
    //El cliente se crea sin presupuestos asociados. Estos se añadiran con la opcion "Realizar presupuesto"
    this.presupuesto = []; //array presupuestos[]
}
Cliente.prototype.toHTMLRow = function(){
    return "<tr><td>"+this.direccion+"</td><td>"+this.telefono+"</td><td>"+this.email+"</td><td>"+this.contraseña+"</td><td>"+this.presupuesto+"</td></tr>";
}

//////////////////////// Objeto Particular ////////////////////////
function Particular(direccion, telefono, email, contraseña,tipoUsuario, DNI, nombre, apellidos){
    Cliente.call(this, direccion, telefono, email, contraseña, tipoUsuario);
    this.DNI = DNI;
    this.nombre = nombre;
    this.apellidos = apellidos;
}
Particular.prototype = Object.create(Cliente.prototype);
Particular.prototype.constructor = Particular;
Particular.prototype.toHTMLRow = function (){
    return "<tr><td>"+this.DNI+"</td><td>"+this.nombre+"</td><td>"+this.apellidos+"</td><td>"+this.direccion+"</td>" +
        "<td>"+this.telefono+"</td><td>"+this.email+"</td><td>"+this.contraseña+"</td><td>"+this.presupuesto+"</td></tr>";
}

//////////////////////// Objeto Empresa ////////////////////////
function Empresa(direccion, telefono, email, contraseña, tipoUsuario, NIF, nombre){
    Cliente.call(this, direccion, telefono, email, contraseña, tipoUsuario);
    this.NIF = NIF;
    this.nombre = nombre;

}
// Aqui es donde heredamos propiedades y metodos
Empresa.prototype = Object.create(Cliente.prototype);
Empresa.prototype.constructor = Empresa;
Empresa.prototype.toHTMLRow = function (){
    return "<tr><td>"+this.NIF+"</td><td>"+this.nombre+"</td><td>"+this.direccion+"</td>" +
        "<td>"+this.telefono+"</td><td>"+this.email+"</td><td>"+this.contraseña+"</td><td>"+this.presupuesto+"</td></tr>";
}

//////////////////////// Objeto Factura ////////////////////////
function Factura(COD){
    this.COD = COD;
}
Factura.prototype.toHTMLRow = function(){
    return "<tr><td>"+this.COD+"</td></tr>";
}

//////////////////////// Objeto Presupuesto ////////////////////////
function Presupuesto(COD, total, estado, fecha, email_cliente, nombre_proyecto, COD_factura){
    this.COD = COD;
    this.total = total;
    this.estado = estado;
    this.fecha = fecha;
    this.email_cliente = email_cliente;
    this.nombre_proyecto = nombre_proyecto;
    this.COD_factura = COD_factura;
}
Presupuesto.prototype.toHTMLRow = function(){
    return "<tr><td>"+this.COD+"</td><td>"+this.total+"</td><td>"+this.estado+"</td><td>"+this.fecha_inicio+"</td>" +
        "<td>"+this.fecha_fin+"</td><td>"+this.nombre_Proyecto+"</td><td>"+this.COD_factura+"</td></tr>";
}

//////////////////////// Objeto Modelo ////////////////////////
function Modelo(){
    this.empleados = [];
    this.proyectos = [];
    this.clientes = [];
    this.pedidos = [];
    this.proveedores = [];
    this.presupuesto = [];
}

//************************ FUNCIONES **************************//
var usuarioActual = "";//se usa en comprobarLogin, getUsuarioActual,actualizarCliente y eliminarCliente
Modelo.prototype.getUsuarioActual = function(){
    return usuarioActual;
}
var clienteEncontrado = ""; //lo usamos para cuando buscamos el cliente como admin
Modelo.prototype.getClienteEncontrado = function(){
    return clienteEncontrado;
}
var proyectoEncontrado = "";//lo usamos para cuando buscamos el proyecto como admin
Modelo.prototype.getProyectoEncontrado = function(){
    return proyectoEncontrado;
}
var presupuestoEncontrado = "";//lo usamos para cuando buscamos el presupuesto como admin
Modelo.prototype.getPresupuestoEncontrado = function(){
    return presupuestoEncontrado;
}

Modelo.prototype.comprobarLogin = function (email_login, contraseña_login){
    var usuarioEncontrado = false;
    var clientesLength = this.clientes.length;
    var tipoUsuario = "";
    if(clientesLength != 0) {
        for (var i = 0; i < clientesLength && usuarioEncontrado == false; i++) {
            if (email_login == this.clientes[i].email && contraseña_login == this.clientes[i].contraseña) {
                usuarioEncontrado = true;
                usuarioActual = this.clientes[i];
                tipoUsuario = this.clientes[i].tipoUsuario;//Admin, Particular o Empresa
            }
        }
    }
    return tipoUsuario;
}

//***** FUNCIONES CLIENTES *****//
Modelo.prototype.altaClienteParticular = function (DNI, nombre, apellidos, direccion, telefono, email, contraseña){
    var clienteEncontrado = false;
    var clientesLength = this.clientes.length;
    if(clientesLength != 0) {
        for (var i = 0; i < clientesLength && clienteEncontrado == false; i++) {
            if (email == this.clientes[i].email) {
                clienteEncontrado = true;
            }
        }
    }
    if(!clienteEncontrado){
        var oClienteParticular = new Particular(direccion, telefono, email, contraseña, "Particular",DNI, nombre, apellidos);
        this.clientes.push(oClienteParticular);
        return "Cliente añadido correctamente";
    }else {
        return "El cliente introducido ya estaba registrado con anterioridad";
    }
}
Modelo.prototype.altaClienteEmpresa = function (NIF, nombre, direccion, telefono, email, contraseña){
    var clienteEncontrado = false;
    var clientesLength = this.clientes.length;
    if(clientesLength != 0) {
        for (var i = 0; i < clientesLength && clienteEncontrado == false; i++) {
            if (email == this.clientes[i].email) {
                clienteEncontrado = true;
            }
        }
    }
    if(!clienteEncontrado){
        var oClienteEmpresa = new Empresa(direccion, telefono, email, contraseña, "Empresa", NIF, nombre);
        this.clientes.push(oClienteEmpresa);
        return "Cliente añadido correctamente";
    }else {
        return "La empresa introducida ya estaba registrada con anterioridad";
    }
}
Modelo.prototype.actualizarCliente = function(datosNuevos){
    if(usuarioActual.tipoUsuario == "Particular"){
        usuarioActual.DNI = datosNuevos[0];
        usuarioActual.nombre = datosNuevos[2];
        usuarioActual.apellidos = datosNuevos[4];
        usuarioActual.direccion = datosNuevos[5];
        usuarioActual.telefono = datosNuevos[6];
        usuarioActual.email = datosNuevos[7];
        usuarioActual.contraseña = datosNuevos[8];
    }else{
        usuarioActual.NIF = datosNuevos[1];
        usuarioActual.nombre = datosNuevos[3];
        usuarioActual.direccion = datosNuevos[5];
        usuarioActual.telefono = datosNuevos[6];
        usuarioActual.email = datosNuevos[7];
        usuarioActual.contraseña = datosNuevos[8];
    }
    return "Cliente actualizado";
}
Modelo.prototype.eliminarClienteActual = function(){
    var clienteEncontrado = false;
    for(var i = 0; i < this.clientes.length && clienteEncontrado == false; i++){
        if(usuarioActual.email == this.clientes[i].email){
            this.clientes.splice(i, 1);
            clienteEncontrado = true;
        }
    }
    return "Cliente eliminado con exito";
}
//***** FUNCIONES ADMIN *****//
/////// CLIENTES ////////
Modelo.prototype.cargarClienteEncontrado = function(email_DatosCliente){
    var encontrado = false;
    var clientesLength = this.clientes.length;
    for (var i = 0; i < clientesLength && encontrado == false; i++) {
        if (email_DatosCliente == this.clientes[i].email) {
            encontrado = true;
            clienteEncontrado = this.clientes[i];
        }
    }
    if(encontrado){
        return clienteEncontrado;
    }else{
        return null;
    }
}
Modelo.prototype.actualizarClienteEncontrado = function(email, datosNuevos){
    var encontrado = false;
    for(var i = 0; i < this.clientes.length && encontrado == false; i++){
        if(email == this.clientes[i].email){
            encontrado = true;
            clienteEncontrado = this.clientes[i];
        }
    }
    if(encontrado) {
        if(clienteEncontrado.tipoUsuario == "Particular"){
            clienteEncontrado.DNI = datosNuevos[0];
            clienteEncontrado.nombre = datosNuevos[2];
            clienteEncontrado.apellidos = datosNuevos[4];
            clienteEncontrado.direccion = datosNuevos[5];
            clienteEncontrado.telefono = datosNuevos[6];
            clienteEncontrado.email = datosNuevos[7];
            clienteEncontrado.contraseña = datosNuevos[8];
        }else{
            clienteEncontrado.NIF = datosNuevos[1];
            clienteEncontrado.nombre = datosNuevos[3];
            clienteEncontrado.direccion = datosNuevos[5];
            clienteEncontrado.telefono = datosNuevos[6];
            clienteEncontrado.email = datosNuevos[7];
            clienteEncontrado.contraseña = datosNuevos[8];
            return "Cliente con email:"+email+" actualizado";
        }
    }else{
        return "El email indicado no se encuentra dado de alta";
    }
}
Modelo.prototype.eliminarClienteEncontrado = function(email){
    var encontrado = false;
    for(var i = 0; i < this.clientes.length && encontrado == false; i++){
        if(email == this.clientes[i].email){
            this.clientes.splice(i, 1);
            encontrado = true;
            clienteEncontrado = "";
        }
    }
    if(encontrado) {
        return "Cliente eliminado con exito";
    }else{
        return "El email indicado no se encuentra dado de alta";
    }
}
Modelo.prototype.listarClientesParticular = function(){

    var arrayClientesParticular = [];
    for(var i = 0; i < this.clientes.length; i++){
        if(this.clientes[i] instanceof Particular){
            arrayClientesParticular.push(this.clientes[i]);
        }
    }
    //CREAMOS LA TABLA CLIENTE PARTICULAR
    var oTable = document.createElement("table");
    // Cabecera
    var oTHeadPrincipal = oTable.createTHead();
    var oTHead = oTable.createTHead();
    // Fila nombre tabla
    var oFila = oTHeadPrincipal.insertRow(-1);
    //Columna nombre tabla
    var oThPrincipal = document.createElement("th");
    oThPrincipal.setAttribute("colspan", "8");
    oThPrincipal.setAttribute("class", "text-center");
    var oTexto = document.createTextNode("CLIENTE PARTICULAR");
    oThPrincipal.appendChild(oTexto);
    oFila.appendChild(oThPrincipal);

    //Fila cabecera
    oFila = oTHead.insertRow(-1);
    //Columna DNI
    var oTh6 = document.createElement("th");
    oTexto = document.createTextNode("DNI");
    oTh6.appendChild(oTexto);
    oFila.appendChild(oTh6);
    //Columna Nombre
    var oTh7 = document.createElement("th");
    oTexto = document.createTextNode("Nombre");
    oTh7.appendChild(oTexto);
    oFila.appendChild(oTh7);
    //Columna Apellidos
    var oTh8 = document.createElement("th");
    oTexto = document.createTextNode("Apellidos");
    oTh8.appendChild(oTexto);
    oFila.appendChild(oTh8);
    //Columna direccion
    var oTh2 = document.createElement("th");
    oTexto = document.createTextNode("Dirección");
    oTh2.appendChild(oTexto);
    oFila.appendChild(oTh2);
    //Columna Teléfono
    var oTh3 = document.createElement("th");
    oTexto = document.createTextNode("Teléfono");
    oTh3.appendChild(oTexto);
    oFila.appendChild(oTh3);
    //Columna Email
    var oTh4 = document.createElement("th");
    oTexto = document.createTextNode("Email");
    oTh4.appendChild(oTexto);
    oFila.appendChild(oTh4);
    //Columna Contraseña
    var oTh5 = document.createElement("th");
    oTexto = document.createTextNode("Contraseña");
    oTh5.appendChild(oTexto);
    oFila.appendChild(oTh5);

    //Creamos el TBody
    var oTBody = oTable.createTBody();

    //SI EXISTEN CLIENTES LOS LISTAMOS
    if(arrayClientesParticular.length != 0) {
        for(var i = 0; i < arrayClientesParticular.length; i++) {
            //Fila 1
            oFila = oTBody.insertRow(-1);

            //Celda DNI
            oTexto = document.createTextNode(arrayClientesParticular[i].DNI);
            var oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda nombre
            oTexto = document.createTextNode(arrayClientesParticular[i].nombre);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda apellidos
            oTexto = document.createTextNode(arrayClientesParticular[i].apellidos);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda direccion
            oTexto = document.createTextNode(arrayClientesParticular[i].direccion);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda telefono
            oTexto = document.createTextNode(arrayClientesParticular[i].telefono);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda email
            oTexto = document.createTextNode(arrayClientesParticular[i].email);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda contraseña
            oTexto = document.createTextNode(arrayClientesParticular[i].contraseña);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
        }
    }else{
        //Fila
        oFila = oTBody.insertRow(-1);
        //Celda
        oTexto = document.createTextNode("NO HAY NINGUN CLIENTE PARTICURAR REGISTRADO");
        var oCelda = oFila.insertCell(-1);
        oCelda.appendChild(oTexto);
        oFila.appendChild(oCelda);
        oCelda.setAttribute("colspan", "8");
        oCelda.setAttribute("class", "text-center")
    }

    oTable.setAttribute("class", "table table-hover")

    return oTable;
}
Modelo.prototype.listarClientesEmpresa = function(){

    var arrayClientesEmpresa = [];
    for(var i = 0; i < this.clientes.length; i++){
        if(this.clientes[i] instanceof Empresa){
            arrayClientesEmpresa.push(this.clientes[i]);
        }
    }

    //CREAMOS LA TABLA CLIENTE EMPRESA
    var oTable = document.createElement("table");
    // Cabecera
    var oTHeadPrincipal = oTable.createTHead();
    var oTHead = oTable.createTHead();
    // Fila nombre tabla
    var oFila = oTHeadPrincipal.insertRow(-1);
    //Columna nombre tabla
    var oThPrincipal = document.createElement("th");
    oThPrincipal.setAttribute("colspan", "8");
    oThPrincipal.setAttribute("class", "text-center");
    var oTexto = document.createTextNode("CLIENTE EMPRESA");
    oThPrincipal.appendChild(oTexto);
    oFila.appendChild(oThPrincipal);

    //Fila cabecera
    oFila = oTHead.insertRow(-1);

    //Columna NIF
    var oTh6 = document.createElement("th");
    oTexto = document.createTextNode("NIF");
    oTh6.appendChild(oTexto);
    oFila.appendChild(oTh6);
    //Columna Nombre
    var oTh7 = document.createElement("th");
    oTexto = document.createTextNode("Nombre");
    oTh7.appendChild(oTexto);
    oFila.appendChild(oTh7);
    //Columna direccion
    var oTh2 = document.createElement("th");
    oTexto = document.createTextNode("Dirección");
    oTh2.appendChild(oTexto);
    oFila.appendChild(oTh2);
    //Columna Teléfono
    var oTh3 = document.createElement("th");
    oTexto = document.createTextNode("Teléfono");
    oTh3.appendChild(oTexto);
    oFila.appendChild(oTh3);
    //Columna Email
    var oTh4 = document.createElement("th");
    oTexto = document.createTextNode("Email");
    oTh4.appendChild(oTexto);
    oFila.appendChild(oTh4);
    //Columna Contraseña
    var oTh5 = document.createElement("th");
    oTexto = document.createTextNode("Contraseña");
    oTh5.appendChild(oTexto);
    oFila.appendChild(oTh5);


    //Creamos el TBody
    var oTBody = oTable.createTBody();

    //SI EXISTEN CLIENTES LOS LISTAMOS
    if(arrayClientesEmpresa.length != 0) {
        for(var i = 0; i < arrayClientesEmpresa.length; i++) {
            //Fila 1
            oFila = oTBody.insertRow(-1);

            //Celda NIF
            oTexto = document.createTextNode(arrayClientesEmpresa[i].NIF);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda nombre
            oTexto = document.createTextNode(arrayClientesEmpresa[i].nombre);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda direccion
            oTexto = document.createTextNode(arrayClientesEmpresa[i].direccion);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda telefono
            oTexto = document.createTextNode(arrayClientesEmpresa[i].telefono);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda email
            oTexto = document.createTextNode(arrayClientesEmpresa[i].email);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda contraseña
            oTexto = document.createTextNode(arrayClientesEmpresa[i].contraseña);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);

        }
    }else{
        //Fila
        oFila = oTBody.insertRow(-1);
        //Celda
        oTexto = document.createTextNode("NO HAY NINGUN CLIENTE EMPRESA REGISTRADO");
        var oCelda = oFila.insertCell(-1);
        oCelda.appendChild(oTexto);
        oFila.appendChild(oCelda);
        oCelda.setAttribute("colspan", "8");
        oCelda.setAttribute("class", "text-center")
    }

    oTable.setAttribute("class", "table table-hover")
    return oTable;
}
/////// PROYECTOS ////////
Modelo.prototype.crearProyecto = function(nombre, descripcion, fecha_inicio, fecha_fin, estado, COD_almacen){
    var encontrado = false;
    for (var i = 0; i < this.proyectos.length && encontrado == false; i++) {
        if (nombre == this.proyectos[i].nombre) {
            encontrado = true;
            proyectoEncontrado = this.proyectos[i];
        }
    }
    if(encontrado){
        return "existe";
    }else{
        var oProyecto = new Proyecto(nombre, descripcion, fecha_inicio, fecha_fin, estado, COD_almacen);
        this.proyectos.push(oProyecto);
        proyectoEncontrado = oProyecto;
        return "Proyecto creado";
    }
}
Modelo.prototype.cargarProyectoEncontrado = function(nombre_proyecto){
    var encontrado = false;
    for (var i = 0; i < this.proyectos.length && encontrado == false; i++) {
        if (nombre_proyecto == this.proyectos[i].nombre) {
            encontrado = true;
            proyectoEncontrado = this.proyectos[i];
        }
    }
    if(encontrado){
        return proyectoEncontrado;
    }else{
        return null;
    }
}
Modelo.prototype.actualizarProyectoEncontrado = function(nombre, descripcion, fecha_inicio, fecha_fin, estado, COD_almacen){
    var encontrado = false;
    for (var i = 0; i < this.proyectos.length && encontrado == false; i++) {
        if (nombre == this.proyectos[i].nombre) {
            encontrado = true;
            proyectoEncontrado = this.proyectos[i];
        }
    }
    if(encontrado) {
        proyectoEncontrado.nombre = nombre;
        proyectoEncontrado.descripcion = descripcion;
        proyectoEncontrado.fecha_inicio = fecha_inicio;
        proyectoEncontrado.fecha_fin = fecha_fin;
        proyectoEncontrado.estado = estado;
        proyectoEncontrado.COD_almacen = COD_almacen;
            return "Proyecto " + nombre + " actualizado";
    }else{
        return "No se ha encontrado ningún proyecto con ese nombre";
    }
}
Modelo.prototype.eliminarProyectoEncontrado = function(nombre_proyecto){
    var encontrado = false;
    for (var i = 0; i < this.proyectos.length && encontrado == false; i++) {
        if (nombre_proyecto == this.proyectos[i].nombre) {
            this.proyectos.splice(i, 1);
            encontrado = true;
            proyectoEncontrado = "";
        }
    }
    if(encontrado){
        return "Proyecto eliminado";
    }else{
        return "No hay ningún proyecto con ese nombre";
    }
}
Modelo.prototype.listarProyectosAprobados = function(){
    var arrayProyectosAprobados = [];
    for(var i = 0; i < this.proyectos.length; i++){
        if(this.proyectos[i].estado == "aprobado"){
            arrayProyectosAprobados.push(this.proyectos[i]);
        }
    }
    //CREAMOS LA TABLA CLIENTE PARTICULAR
    var oTable = document.createElement("table");
    // Cabecera
    var oTHeadPrincipal = oTable.createTHead();
    var oTHead = oTable.createTHead();
    // Fila nombre tabla
    var oFila = oTHeadPrincipal.insertRow(-1);
    //Columna nombre tabla
    var oThPrincipal = document.createElement("th");
    oThPrincipal.setAttribute("colspan", "5");
    oThPrincipal.setAttribute("class", "text-center");
    var oTexto = document.createTextNode("PROYECTOS APROBADOS");
    oThPrincipal.appendChild(oTexto);
    oFila.appendChild(oThPrincipal);

    //Fila cabecera
    oFila = oTHead.insertRow(-1);
    //Columna nombre
    var oTh6 = document.createElement("th");
    oTexto = document.createTextNode("NOMBRE");
    oTh6.appendChild(oTexto);
    oFila.appendChild(oTh6);
    //Columna descripcion
    var oTh7 = document.createElement("th");
    oTexto = document.createTextNode("DESCRIPCIÓN");
    oTh7.appendChild(oTexto);
    oFila.appendChild(oTh7);
    //Columna fecha_inicio
    var oTh8 = document.createElement("th");
    oTexto = document.createTextNode("FECHA INICIO");
    oTh8.appendChild(oTexto);
    oFila.appendChild(oTh8);
    //Columna fecha_fin
    var oTh2 = document.createElement("th");
    oTexto = document.createTextNode("FECHA FINALIZACIÓN");
    oTh2.appendChild(oTexto);
    oFila.appendChild(oTh2);
    //Columna Almacen
    var oTh4 = document.createElement("th");
    oTexto = document.createTextNode("ALMACÉN ASIGNADO");
    oTh4.appendChild(oTexto);
    oFila.appendChild(oTh4);

    //Creamos el TBody
    var oTBody = oTable.createTBody();

    //SI EXISTEN CLIENTES LOS LISTAMOS
    if(arrayProyectosAprobados.length != 0) {
        for(var i = 0; i < arrayProyectosAprobados.length; i++) {
            //Fila 1
            oFila = oTBody.insertRow(-1);

            //Celda nombre
            oTexto = document.createTextNode(arrayProyectosAprobados[i].nombre);
            var oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda descripcion
            oTexto = document.createTextNode(arrayProyectosAprobados[i].descripcion);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda fecha inicio
            oTexto = document.createTextNode(arrayProyectosAprobados[i].fecha_inicio);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda fecha fin
            oTexto = document.createTextNode(arrayProyectosAprobados[i].fecha_fin);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda almacen
            oTexto = document.createTextNode(arrayProyectosAprobados[i].COD_almacen);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
        }
    }else{
        //Fila
        oFila = oTBody.insertRow(-1);
        //Celda
        oTexto = document.createTextNode("NO HAY NINGUN PROYECTO APROBADO");
        var oCelda = oFila.insertCell(-1);
        oCelda.appendChild(oTexto);
        oFila.appendChild(oCelda);
        oCelda.setAttribute("colspan", "5");
        oCelda.setAttribute("class", "text-center")
    }

    oTable.setAttribute("class", "table table-hover")

    return oTable;
}
Modelo.prototype.listarProyectosPendientes = function(){
    var arrayProyectosAprobados = [];
    for(var i = 0; i < this.proyectos.length; i++){
        if(this.proyectos[i].estado == "pendiente"){
            arrayProyectosAprobados.push(this.proyectos[i]);
        }
    }
    //CREAMOS LA TABLA CLIENTE PARTICULAR
    var oTable = document.createElement("table");
    // Cabecera
    var oTHeadPrincipal = oTable.createTHead();
    var oTHead = oTable.createTHead();
    // Fila nombre tabla
    var oFila = oTHeadPrincipal.insertRow(-1);
    //Columna nombre tabla
    var oThPrincipal = document.createElement("th");
    oThPrincipal.setAttribute("colspan", "5");
    oThPrincipal.setAttribute("class", "text-center");
    var oTexto = document.createTextNode("PROYECTOS PENDIENTES DE APROBACIÓN");
    oThPrincipal.appendChild(oTexto);
    oFila.appendChild(oThPrincipal);

    //Fila cabecera
    oFila = oTHead.insertRow(-1);
    //Columna nombre
    var oTh6 = document.createElement("th");
    oTexto = document.createTextNode("NOMBRE");
    oTh6.appendChild(oTexto);
    oFila.appendChild(oTh6);
    //Columna descripcion
    var oTh7 = document.createElement("th");
    oTexto = document.createTextNode("DESCRIPCIÓN");
    oTh7.appendChild(oTexto);
    oFila.appendChild(oTh7);
    //Columna fecha_inicio
    var oTh8 = document.createElement("th");
    oTexto = document.createTextNode("FECHA INICIO");
    oTh8.appendChild(oTexto);
    oFila.appendChild(oTh8);
    //Columna fecha_fin
    var oTh2 = document.createElement("th");
    oTexto = document.createTextNode("FECHA FINALIZACIÓN");
    oTh2.appendChild(oTexto);
    oFila.appendChild(oTh2);
    //Columna Almacen
    var oTh4 = document.createElement("th");
    oTexto = document.createTextNode("ALMACÉN ASIGNADO");
    oTh4.appendChild(oTexto);
    oFila.appendChild(oTh4);

    //Creamos el TBody
    var oTBody = oTable.createTBody();

    //SI EXISTEN CLIENTES LOS LISTAMOS
    if(arrayProyectosAprobados.length != 0) {
        for(var i = 0; i < arrayProyectosAprobados.length; i++) {
            //Fila 1
            oFila = oTBody.insertRow(-1);

            //Celda nombre
            oTexto = document.createTextNode(arrayProyectosAprobados[i].nombre);
            var oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda descripcion
            oTexto = document.createTextNode(arrayProyectosAprobados[i].descripcion);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda fecha inicio
            oTexto = document.createTextNode(arrayProyectosAprobados[i].fecha_inicio);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda fecha fin
            oTexto = document.createTextNode(arrayProyectosAprobados[i].fecha_fin);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda almacen
            oTexto = document.createTextNode(arrayProyectosAprobados[i].COD_almacen);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
        }
    }else{
        //Fila
        oFila = oTBody.insertRow(-1);
        //Celda
        oTexto = document.createTextNode("NO HAY NINGUN PROYECTO PENDIENTE DE APROBACIÓN");
        var oCelda = oFila.insertCell(-1);
        oCelda.appendChild(oTexto);
        oFila.appendChild(oCelda);
        oCelda.setAttribute("colspan", "5");
        oCelda.setAttribute("class", "text-center")
    }

    oTable.setAttribute("class", "table table-hover")

    return oTable;
}
/////// PRESUPUESTOS ////////
Modelo.prototype.crearPresupuesto = function(COD, total, estado, fecha, email_cliente, nombre_proyecto, COD_factura){
    var presupuesto_encontrado = false;
    //Busco si ya existe el presupuesto para no crearlo
    for (var i = 0; i < this.presupuesto.length && presupuesto_encontrado == false; i++) {
        if (COD == this.presupuesto[i].COD) {
            presupuesto_encontrado = true;
            presupuestoEncontrado = this.presupuesto[i];
        }
    }
    if(presupuesto_encontrado){
        return "existePresupuesto";
    }else{
        //Compruebo si existe el cliente al que se quiere añadir el presupuesto
        var cliente_presupuestoEncontrado = false;
        for (var i = 0; i < this.clientes.length && cliente_presupuestoEncontrado == false; i++) {
            if (email_cliente == this.clientes[i].email) {
                cliente_presupuestoEncontrado = true;
                clienteEncontrado = this.clientes[i];
            }
        }
        if(cliente_presupuestoEncontrado){
            var oPresupuesto = new Presupuesto(COD, total, estado, fecha, email_cliente, nombre_proyecto, COD_factura);
            this.presupuesto.push(oPresupuesto);
            clienteEncontrado.presupuesto.push(oPresupuesto);
            return "Presupuesto creado";
        }else {
            return "El cliente introducido no existe";
        }
    }
}
Modelo.prototype.cargarPresupuestoEncontrado = function(COD){
    var encontrado = false;
    for (var i = 0; i < this.presupuesto.length && encontrado == false; i++) {
        if (COD == this.presupuesto[i].COD) {
            encontrado = true;
            presupuestoEncontrado = this.presupuesto[i];
        }
    }
    if(encontrado){
        return presupuestoEncontrado;
    }else{
        return null;
    }
}
Modelo.prototype.actualizarPresupuestoEncontrado = function(COD, total, estado, fecha, email_cliente, nombre_proyecto, COD_factura){
    var encontrado = false;
    for (var i = 0; i < this.presupuesto.length && encontrado == false; i++) {
        if (COD == this.presupuesto[i].COD) {
            encontrado = true;
            presupuestoEncontrado = this.presupuesto[i];
        }
    }
    if(encontrado) {
        presupuestoEncontrado.COD = COD;
        presupuestoEncontrado.total = total;
        presupuestoEncontrado.estado = estado;
        presupuestoEncontrado.fecha = fecha;
        presupuestoEncontrado.email_cliente = email_cliente;
        presupuestoEncontrado.nombre_proyecto = nombre_proyecto;
        presupuestoEncontrado.COD_factura = COD_factura;

        return "Presupuesto " + COD + " actualizado";
    }else{
        return "No se ha encontrado ningún presupuesto con ese código";
    }
}
Modelo.prototype.eliminarPresupuestoEncontrado = function(COD){
    var encontrado = false;
    for (var i = 0; i < this.presupuesto.length && encontrado == false; i++) {
        if (COD == this.presupuesto[i].COD) {
            this.presupuesto.splice(i, 1);
            encontrado = true;
            presupuestoEncontrado = "";
        }
    }
    if(encontrado){
        return "Presupuesto eliminado";
    }else{
        return "No hay ningún presupuesto con ese código";
    }
}
Modelo.prototype.listarPresupuestosAprobados = function(){
    var arrayPresupuestosAprobados = [];
    for(var i = 0; i < this.presupuesto.length; i++){
        if(this.presupuesto[i].estado == "aprobado"){
            arrayPresupuestosAprobados.push(this.presupuesto[i]);
        }
    }
    //CREAMOS LA TABLA CLIENTE PARTICULAR
    var oTable = document.createElement("table");
    // Cabecera
    var oTHeadPrincipal = oTable.createTHead();
    var oTHead = oTable.createTHead();
    // Fila nombre tabla
    var oFila = oTHeadPrincipal.insertRow(-1);
    //Columna nombre tabla
    var oThPrincipal = document.createElement("th");
    oThPrincipal.setAttribute("colspan", "5");
    oThPrincipal.setAttribute("class", "text-center");
    var oTexto = document.createTextNode("PRESUPUESTOS APROBADOS");
    oThPrincipal.appendChild(oTexto);
    oFila.appendChild(oThPrincipal);

    //Fila cabecera
    oFila = oTHead.insertRow(-1);
    //Columna COD
    var oTh6 = document.createElement("th");
    oTexto = document.createTextNode("Código de presupuesto");
    oTh6.appendChild(oTexto);
    oFila.appendChild(oTh6);
    //Columna total
    var oTh7 = document.createElement("th");
    oTexto = document.createTextNode("Total");
    oTh7.appendChild(oTexto);
    oFila.appendChild(oTh7);
    //Columna fecha
    var oTh8 = document.createElement("th");
    oTexto = document.createTextNode("FECHA");
    oTh8.appendChild(oTexto);
    oFila.appendChild(oTh8);
    //Columna email
    var oTh2 = document.createElement("th");
    oTexto = document.createTextNode("EMAIL DE CLIENTE");
    oTh2.appendChild(oTexto);
    oFila.appendChild(oTh2);
    //Columna proyecto
    var oTh4 = document.createElement("th");
    oTexto = document.createTextNode("NOMBRE DEL PROYECTO");
    oTh4.appendChild(oTexto);
    oFila.appendChild(oTh4);
    //Columna factura
    var oTh4 = document.createElement("th");
    oTexto = document.createTextNode("CÓDIGO DE FACTURA");
    oTh4.appendChild(oTexto);
    oFila.appendChild(oTh4);

    //Creamos el TBody
    var oTBody = oTable.createTBody();

    //SI EXISTEN CLIENTES LOS LISTAMOS
    if(arrayPresupuestosAprobados.length != 0) {
        for(var i = 0; i < arrayPresupuestosAprobados.length; i++) {
            //Fila 1
            oFila = oTBody.insertRow(-1);

            //Celda COD
            oTexto = document.createTextNode(arrayPresupuestosAprobados[i].COD);
            var oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda total
            oTexto = document.createTextNode(arrayPresupuestosAprobados[i].total);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda fecha
            oTexto = document.createTextNode(arrayPresupuestosAprobados[i].fecha);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda email
            oTexto = document.createTextNode(arrayPresupuestosAprobados[i].email_cliente);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda proyecto
            oTexto = document.createTextNode(arrayPresupuestosAprobados[i].nombre_proyecto);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda factura
            oTexto = document.createTextNode(arrayPresupuestosAprobados[i].COD_factura);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
        }
    }else{
        //Fila
        oFila = oTBody.insertRow(-1);
        //Celda
        oTexto = document.createTextNode("NO HAY NINGUN PRESUPUESTO APROBADO");
        var oCelda = oFila.insertCell(-1);
        oCelda.appendChild(oTexto);
        oFila.appendChild(oCelda);
        oCelda.setAttribute("colspan", "5");
        oCelda.setAttribute("class", "text-center")
    }

    oTable.setAttribute("class", "table table-hover")

    return oTable;
}
Modelo.prototype.listarPresupuestosPendientes = function(){
    var arrayPresupuestosPendientes = [];
    for(var i = 0; i < this.presupuesto.length; i++){
        if(this.presupuesto[i].estado == "pendiente"){
            arrayPresupuestosPendientes.push(this.presupuesto[i]);
        }
    }
    //CREAMOS LA TABLA CLIENTE PARTICULAR
    var oTable = document.createElement("table");
    // Cabecera
    var oTHeadPrincipal = oTable.createTHead();
    var oTHead = oTable.createTHead();
    // Fila nombre tabla
    var oFila = oTHeadPrincipal.insertRow(-1);
    //Columna nombre tabla
    var oThPrincipal = document.createElement("th");
    oThPrincipal.setAttribute("colspan", "5");
    oThPrincipal.setAttribute("class", "text-center");
    var oTexto = document.createTextNode("PRESUPUESTOS PENDIENTES");
    oThPrincipal.appendChild(oTexto);
    oFila.appendChild(oThPrincipal);

    //Fila cabecera
    oFila = oTHead.insertRow(-1);
    //Columna COD
    var oTh6 = document.createElement("th");
    oTexto = document.createTextNode("Código de presupuesto");
    oTh6.appendChild(oTexto);
    oFila.appendChild(oTh6);
    //Columna total
    var oTh7 = document.createElement("th");
    oTexto = document.createTextNode("Total");
    oTh7.appendChild(oTexto);
    oFila.appendChild(oTh7);
    //Columna fecha
    var oTh8 = document.createElement("th");
    oTexto = document.createTextNode("FECHA");
    oTh8.appendChild(oTexto);
    oFila.appendChild(oTh8);
    //Columna email
    var oTh2 = document.createElement("th");
    oTexto = document.createTextNode("EMAIL DE CLIENTE");
    oTh2.appendChild(oTexto);
    oFila.appendChild(oTh2);
    //Columna proyecto
    var oTh4 = document.createElement("th");
    oTexto = document.createTextNode("NOMBRE DEL PROYECTO");
    oTh4.appendChild(oTexto);
    oFila.appendChild(oTh4);
    //Columna factura
    var oTh4 = document.createElement("th");
    oTexto = document.createTextNode("CÓDIGO DE FACTURA");
    oTh4.appendChild(oTexto);
    oFila.appendChild(oTh4);

    //Creamos el TBody
    var oTBody = oTable.createTBody();

    //SI EXISTEN CLIENTES LOS LISTAMOS
    if(arrayPresupuestosPendientes.length != 0) {
        for(var i = 0; i < arrayPresupuestosPendientes.length; i++) {
            //Fila 1
            oFila = oTBody.insertRow(-1);

            //Celda COD
            oTexto = document.createTextNode(arrayPresupuestosPendientes[i].COD);
            var oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda total
            oTexto = document.createTextNode(arrayPresupuestosPendientes[i].total);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda fecha
            oTexto = document.createTextNode(arrayPresupuestosPendientes[i].fecha);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda email
            oTexto = document.createTextNode(arrayPresupuestosPendientes[i].email_cliente);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda proyecto
            oTexto = document.createTextNode(arrayPresupuestosPendientes[i].nombre_proyecto);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
            //Celda factura
            oTexto = document.createTextNode(arrayPresupuestosPendientes[i].COD_factura);
            oCelda = oFila.insertCell(-1);
            oCelda.appendChild(oTexto);
            oFila.appendChild(oCelda);
        }
    }else{
        //Fila
        oFila = oTBody.insertRow(-1);
        //Celda
        oTexto = document.createTextNode("NO HAY NINGUN PRESUPUESTO PENDIENTE");
        var oCelda = oFila.insertCell(-1);
        oCelda.appendChild(oTexto);
        oFila.appendChild(oCelda);
        oCelda.setAttribute("colspan", "5");
        oCelda.setAttribute("class", "text-center")
    }

    oTable.setAttribute("class", "table table-hover")

    return oTable;
}
