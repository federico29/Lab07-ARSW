//la constante api se puede cambiar entre apimock y apiclient
const api=apiclient
app = (function () {
    function getByAuthor(funcion) {
        return funcion.map(function(f){
            return {name:f.name,points:Object.keys(f.points).length};
        });
    }

    function getBlueprintsByNameAndAuthor(author, bpName){
        $("#current").text(bpName)
        return api.getBlueprintsByNameAndAuthor(author, bpName, pintar);
    }

    function run() {
        var nameAutor = $('#autor').val();
        generarTable(nameAutor,api.getBlueprintsByAuthor(nameAutor,getByAuthor));
    }

    function pintar(funcion) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.clearRect(0, 0, c.width, c.height);
        console.log(c.width, c.height)
        funcion.points.map(function(f){
            console.log(f.x)
            ctx.lineTo(f.x,f.y);
            ctx.stroke();
        })
        ctx.closePath()
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