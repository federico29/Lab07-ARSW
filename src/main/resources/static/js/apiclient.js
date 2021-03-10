const Url = 'http://localhost:8080/blueprints/';
apiclient = (function () {
    var f=[]
    return {
        getBlueprintsByAuthor: function (author, callback) {
                $.get(Url+author,function(data){
                    f=data;
                });
                return callback(f)
        },

        getBlueprintsByNameAndAuthor: function (author, name, callback) {
                $.get(Url+author+"/"+name,function(data){
                    f=data;
                });
                return callback(f)
        }
    };
})();