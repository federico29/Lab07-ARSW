const Url = 'http://localhost:8080/blueprints/';
apiclient = (function () {
    var f=[]
    return {
        getBlueprintsByAuthor: function (author, callback) {
            $.get(Url + author, function (data) {
                f = data;
            });
            return callback(f)
        },

        getBlueprintsByNameAndAuthor: function (author, name, callback) {
            $.get(Url + author + "/" + name, function (data) {
                f = data;
            });
            return callback(f)
        },
        putFunction: function (name, new_function, callback) {

            var blueprintsFunction = JSON.stringify(new_function);

            const promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: Url + name,
                    type: 'PUT',
                    data: blueprintsFunction,
                    contentType: "application/json"
                }).done(function () {
                    resolve('SUCCESS');

                }).fail(function (msg) {
                    reject('FAIL');
                });
            });

            promise
                .then(res => {
                    callback();
                });

        },

        postFunction: function (name, f, callback) {
            var blueprintsFunction = JSON.stringify(f);
            const promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: Url + name,
                    type: 'PUT',
                    data: blueprintsFunction,
                    contentType: "application/json"
                }).done(function () {
                    resolve('SUCCESS');
                }).fail(function (msg) {
                    reject('FAIL');
                });
            });
            promise
                .then(res => {
                    callback();
                });
        },

        deleteFunction: function (name, f, callback) {
            var blueprintsFunction = JSON.stringify(f);
            console.log(blueprintsFunction);
            const promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: Url+ name,
                    type: 'DELETE',
                    data: blueprintsFunction,
                    contentType: "application/json"
                }).done(function () {
                    resolve('SUCCESS');
                }).fail(function (msg) {
                    reject('FAIL');
                });
            });
            promise
                .then(res => {
                    callback();
                });
        }
    }
})();