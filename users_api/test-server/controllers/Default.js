'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.apiV1GET = function apiV1GET (req, res, next) {
  Default.apiV1GET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiV1UsersDELETE = function apiV1UsersDELETE (req, res, next) {
  Default.apiV1UsersDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiV1UsersForgot_passwordPOST = function apiV1UsersForgot_passwordPOST (req, res, next, body) {
  Default.apiV1UsersForgot_passwordPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiV1UsersGET = function apiV1UsersGET (req, res, next, page, limit) {
  Default.apiV1UsersGET(page, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiV1UsersLoginPOST = function apiV1UsersLoginPOST (req, res, next, body) {
  Default.apiV1UsersLoginPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiV1UsersPATCH = function apiV1UsersPATCH (req, res, next, body) {
  Default.apiV1UsersPATCH(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiV1UsersPOST = function apiV1UsersPOST (req, res, next, body) {
  Default.apiV1UsersPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiV1UsersPUT = function apiV1UsersPUT (req, res, next, body) {
  Default.apiV1UsersPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiV1UsersUser_idGET = function apiV1UsersUser_idGET (req, res, next, user_id) {
  Default.apiV1UsersUser_idGET(user_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
