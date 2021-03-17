//la constante api se puede cambiar entre apimock y apiclient
const api = apiclient
app = (function () {

    //Retorna el plano consultado por autor y por nombre
    function getBlueprintsByNameAndAuthor(author, bpName) {
        $("#current").text(bpName);
        return api.getBlueprintsByNameAndAuthor(author, bpName, dibujar);
    }

    //Ejecuta la aplicación
    function run() {
        var autor = $('#autor').val();
        api.getBlueprintsByAuthor(autor, generarTabla);
    }

    //Agrega el canvas al html
    function agregarCanvas() {
        $("#canvasContainer").empty();
        $('#canvasContainer')
            .append(
                "<label for='myCanvas'>"
                + "Current Blueprint: <b id='current'></b>"
                + "</label>"
                + "<canvas id='myCanvas' width='500px' height='300px' style='border:1px solid #000000;'>"
                + "</canvas>"
                + "&nbsp;&nbsp;<button id='delete' onclick='app.deleteBlueprint()'>Delete</button>"
                + "&nbsp;&nbsp;<button id='update' onclick='app.update()'>Update/save</button>"
            );
    }

    //Agrega el canvas para crear un nuevo planoal html
    function agregarCanvasCreate() {
        $("#canvasContainer").empty();
        $('#canvasContainer')
            .append(
                "<h2>Blueprint creator</h2>"
                +"<input type='text' id='name' placeholder='Name'></br>"
                + "<label for='myCanvas'>"
                + "Draw your blueprint: "
                + "</label>"
                + "<canvas id='myCanvas' width='500px' height='300px' style='border:1px solid #000000;'>"
                + "</canvas>"
                + "&nbsp;&nbsp;<button id='create' onclick='app.postNew()'>Create</button>"
                + "&nbsp;&nbsp;<button id='cancel' onclick='app.cancelacion()'>Cancel</button>"
            );
    }

    //Quita el canvas del html
    function quitarCanvas() {
        $("#canvasContainer").empty();
    }

    //Inicia el proceso para crear un nuevo plano
    function create() {
        dibujarNuevo([]);
    }

    //Actualiza el plano con los puntos nuevos PUT
    function update() {
        api.putFunction(updatedBlueprint, confirmacion);
    }

    var toDeleteBlueprint = null; 
    //Delete
    function deleteBlueprint(){
        console.log(toDeleteBlueprint);
        if(confirm('You are about to delete the blueprint, are you sure?')){
            api.deleteFunction(toDeleteBlueprint, confirmacion);
        }else{
            cancelacion(toDeleteBlueprint);
        }
    }

    //Confirma que la actualización de puntos se hizo y actualiza la tabla
    function confirmacion(funcion) {
        alert("The blueprint was successfully updated.");
        quitarCanvas();
        api.getBlueprintsByAuthor(funcion.author, generarTabla);
    }

    //Confirma que la operación de crear se canceló
    function cancelacion(funcion) {
        alert("Canceled.");
        quitarCanvas();
        api.getBlueprintsByAuthor(funcion.author, generarTabla);
    }

    //Hace la petición POST para el plano nuevo
    function postNew(){
        if(newpoints.length === 0 || $("#name").val() === ""){
            alert("Name field is empty or you haven't draw yet");
        }else{
            api.postFunction({"author": $('#autor').val(),"points": newpoints,"name": $("#name").val()}, confirmacion);
        }
    }

    var updatedBlueprint = null;
    //Agrega los puntos nuevos en el canvas y lo redibuja
    function dibujar(funcion) {
        toDeleteBlueprint = funcion;
        quitarCanvas();
        agregarCanvas();
        var c = canvas(funcion.points);
        var xPos = $("#myCanvas").offset().left + window.screenX;
        var yPos = $("#myCanvas").offset().top + window.screenY;
        if (window.PointerEvent) {
            c.addEventListener("pointerdown", function (event) {
                funcion.points.push({ "x": event.pageX - xPos, "y": event.pageY - yPos });
                c = canvas(funcion.points);
                updatedBlueprint = funcion;
            });
        } else {
            c.addEventListener("mousedown", function (event) {
                funcion.points.push({ "x": event.pageX - xPos, "y": event.pageY - yPos });
                c = canvas(funcion.points);
                updatedBlueprint = funcion;
            });
        }
    }

    var newpoints = null;
    //Agrega los puntos nuevos de un nuevo plano desde el canvas y lo va dibujando
    function dibujarNuevo(funcion) {
        quitarCanvas();
        agregarCanvasCreate();
        var c = canvas(funcion);
        var xPos = $("#myCanvas").offset().left + window.screenX;
        var yPos = $("#myCanvas").offset().top + window.screenY;
        if (window.PointerEvent) {
            c.addEventListener("pointerdown", function (event) {
                funcion.push({ "x": event.pageX - xPos, "y": event.pageY - yPos });
                c = canvas(funcion);
                newpoints = funcion;
            });
        } else {
            c.addEventListener("mousedown", function (event) {
                funcion.push({ "x": event.pageX - xPos, "y": event.pageY - yPos });
                c = canvas(funcion);
                newpoints = funcion;
            });
        }
    }
    
    //Crea el canvas y dibuja los puntos existentes
    function canvas(funcion) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.clearRect(0, 0, c.width, c.height);
        funcion.map(function (f) {
            ctx.lineTo(f.x, f.y);
            ctx.stroke();
        })
        ctx.closePath();
        return c;
    }

    //Crea o actualiza la tabla de planos
    function generarTabla(funcion) {
        $("#nombre").text($('#autor').val() + "'s")
        $("#cuerpo").empty();
        $("#botoncrear").empty();
        var total = 0;
        $('#botoncrear')
                .append(
                    "<button id='create' onclick='app.create()'>Create New Blueprint</button>"
                );
        funcion.map(function (f) {
            $('#cuerpo')
                .append(
                    "<tr>" +
                    "<td>" + f.name + "</td>" +
                    "<td>" + f.points.length + "</td>" +
                    "<td><form><button type='button' onclick='onclick=app.getBlueprintsByNameAndAuthor( \"" + f.author + '" , "' + f.name + "\")')'>Open</button></form></td>" +
                    "</tr>"
                );
            total += f.points.length;
        });
        $("#total").text(total)
    }

    return {
        run: run,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
        update: update,
        create: create,
        postNew: postNew,
        cancelacion: cancelacion,
        deleteBlueprint: deleteBlueprint
    }
})();