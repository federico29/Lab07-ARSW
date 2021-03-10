apimock=(function(){
    var mockdata=[];
    mockdata["johnconnor"]= [{author: "johnconnor",points: [{"x": 150,"y": 120},{"x": 215,"y": 115}],name: "house"},{author: "johnconnor",points: [{"x": 340,"y": 240},{"x": 15,"y": 215}],name: "gear"}];
    mockdata["maryweyland"]= [{author: "maryweyland",points: [{"x": 140,"y": 140},{"x": 115,"y": 115}],name: "house2"},{author: "maryweyland",points: [{"x": 140,"y": 140},{"x": 115,"y": 115}],name: "gear2"}];
    mockdata["federico"]= [{author: "federico",points: [{"x": 140,"y": 140},{"x": 115,"y": 115}],name: "house3"},{author: "federico",points: [{"x": 140,"y": 140},{"x": 115,"y": 115}],name: "gear3"}];
    mockdata["guillermo"]= [{author: "guillermo",points: [{"x": 140,"y": 140},{"x": 280,"y": 140},{"x": 280,"y": 280},{"x": 140,"y": 280},{"x": 140,"y": 140}],name: "house4"},{author: "guillermo",points: [{"x": 140,"y": 140},{"x": 115,"y": 115}],name: "gear4"}];

    function getBlueprintsByAuthor(name,callback){
        return callback(
            mockdata[name]
        );
    }

    function getBlueprintsByNameAndAuthor(name,bpname,callback){
         return callback(
             mockdata[name].find(function(e){return e.name===bpname})
         );
     }

    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
    };
})();