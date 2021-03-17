const Url = 'http://localhost:8080/blueprints/';
apiclient = (function () {

    return {
        getBlueprintsByAuthor: function (author, callback) {
            $.get(Url + author, function (data) {
                callback(data);
            });
        },

        getBlueprintsByNameAndAuthor: function (author, name, callback) {
            $.get(Url + author + "/" + name, function (data) {
                callback(data);
            });
        },
        
        putFunction: function (blueprint, callback) {
            const promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: Url + blueprint.author + "/" + blueprint.name,
                    type: 'PUT',
                    data: JSON.stringify(blueprint),
                    contentType: "application/json",
                }).done(function () {
                    resolve('SUCCESS');
                }).fail(function (msg) {
                    reject('FAIL');
                });
            });
            promise
                .then(res => {
                    callback(blueprint);
                });
        },

        postFunction: function (blueprint, callback) {
            const promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: Url,
                    type: 'POST',
                    data: JSON.stringify(blueprint),
                    contentType: "application/json"
                }).done(function () {
                    resolve('SUCCESS');
                }).fail(function (msg) {
                    reject('FAIL');
                });
            });
            promise
                .then(res => {
                    callback(blueprint);
                });
        },

        deleteFunction: function(blueprint, callback){
            const promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: Url + blueprint.name ,
                    type: 'DELETE',
                    data: JSON.stringify(blueprint),
                    contentType: "application/json"
                }).done(function () {
                    resolve('SUCCESS');
                }).fail(function (msg) {
                    reject('FAIL');
                });
            });
            promise
                .then(res => {
                    callback(blueprint);
                });
         }
    }
})();