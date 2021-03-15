//la constante api se puede cambiar entre apimock y apiclient
const api=apimock
app = (function () {
    function getByAuthor(funcion) {
        return funcion.map(function(f){
            return {name:f.name,points:Object.keys(f.points).length};
        });
    }

    function getBlueprintsByNameAndAuthor(author, bpName){
        $("#canvasContainer").empty();
        addCanvas();
        $("#current").text(bpName);
        return api.getBlueprintsByNameAndAuthor(author, bpName, pintar);
    }

    function run() {
        var nameAutor = $('#autor').val();
        generarTable(nameAutor,api.getBlueprintsByAuthor(nameAutor,getByAuthor));
    }

    function addCanvas() {
        $('#canvasContainer')
        .append(
            "<label for='myCanvas'>Current Blueprint: <b id='current'></b></label><canvas id='myCanvas' width='500px' height='300px' style='border:1px solid #000000;'></canvas>"
        );
    }

    function pintar(funcion) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.clearRect(0, 0, c.width, c.height);
        funcion.points.map(function(f){
            ctx.lineTo(f.x,f.y);
            ctx.stroke();
        })
        ctx.closePath();

        api.prueba();

        var xPos = $("#myCanvas").offset().left + window.screenX;
        var yPos = $("#myCanvas").offset().top + window.screenY;

        if(window.PointerEvent) {
          c.addEventListener("pointerdown", function(event){
            alert('pointerdown at ' + (event.pageX - xPos) + ',' + (event.pageY - yPos));
          });
        }else {
            c.addEventListener("mousedown", function(event){
            alert('mousedown at ' + (event.clientX - xPos) + ',' + (event.clientY - yPos));
          });
        }
    }

    function generarTable(name,funcion) {
        $("#nombre").text(name+"'s")
        $("#cuerpo").html("");
        var total=0
        funcion.map(function(f) {
            $('#cuerpo')
                .append(
                  `<tr>
                    <td>`+f.name+`</td>
                    <td>`+f.points+`</td>`+
                    "<td><form><button type='button' onclick='onclick=app.getBlueprintsByNameAndAuthor( \"" +name +'" , "' +f.name +"\")')'>Open</button></form></td>"+
                  `</tr>`
                );
                total+=f.points
        });
        $("#total").text(total)
    }

    return {
        run: run,
        getBlueprintsByNameAndAuthor:getBlueprintsByNameAndAuthor
    }
})();