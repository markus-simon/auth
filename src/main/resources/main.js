var MongoAuth   = require("vertx-auth-mongo-js/mongo_auth");
var MongoClient = require("vertx-mongo-js/mongo_client");

var mongoConfig = {
    "db_name" : "auth_test2"
};
var client      = MongoClient.createShared(vertx, mongoConfig);
var authProvider = MongoAuth.create(client, {});


var authInfo = {
    "username" : "tim",
    "password" : "mypassword"
};


var roles        = [];
var permission   = [];

client.remove('user', {username: 'tim'}, function (res, res_err) {
    if (res_err == null) {
        console.log('cleaned up users');

        authProvider.insertUser(authInfo.username, authInfo.password, roles, permission, function(res) {
            console.log('created user with _id ' + res);

            authProvider.authenticate(authInfo, function (res, res_err) {
                if (res_err == null) {
                    var user = res;
                    console.log("User " + user.principal() + " is now authenticated");
                } else {
                    res_err.printStackTrace();
                }
            });
        });

    } else {
        res_err.printStackTrace();
    }
});


