javaRest.response.readResponse = function (id, data, callback) {
    javaRest.get("response/" + id, null, function (response) {
        if (callback) {
            callback(response)
        }
    }, function (jqXHR, textStatus) {

        if (callback) {
            callback(jqXHR)
        }
    })
};

javaRest.respondent.readRespondent = function(id, data, callback) {

    javaRest.get("respondent/" + id , null, function (response) {
        if (callback) {
            callback(response)
        }
    }, function (jqXHR, textStatus) {

        if (callback) {
            callback(jqXHR)
        }
    })
};
javaRest.respondent.readRespondentCustomData = function(id, callback) {

    javaRest.get("respondent/" + id + "/metadata", null, function (response) {
        if (callback) {
            callback(response)
        }
    }, function (jqXHR, textStatus) {

        if (callback) {
            callback(jqXHR)
        }
    })
};


CEClient.prototype =  {
    readRespondentCustomData: function (responsendentId, data, cb) {
        javaRest.respondent.readRespondentCustomData(responsendentId, data, function (res) {
            if (cb) cb(res);
        })
    },
    readFacevideos: function (responseid, data, cb) {
        javaRest.respondent.readRespondentCustomData(responsendentId, data, function (res) {
            if (cb) cb(res);
        })
    },
    searchResponseIN: function (key, value, cb) {
        var url = 'response';
        var data = '?where={"' + key + '":"' + value + '"}'; // this.props.url

        javaRest.get(url + data, null,
            function (res) {
                if (cb) {
                    cb(res);
                }
            }, function (res) {
                if (cb) {
                    cb(res);
                }
            }
        )
    }
};
