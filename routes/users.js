var sendResponse = require('../utils/sendResponse');
var md5 = require('md5');

exports.userList = function(req, res) {
    var userListSql = "SELECT * FROM `users` WHERE 1";
    connection.query(userListSql, [], function(err, userListRes) {
        if (err) {
            sendResponse.sendErrorFlagResponse(3, 151, err, res);
        } else {
            var response = {
                UserList: userListRes
            };
            sendResponse.sendSuccessFlagResponseWithData(103, response, res);
        }
    });
};

exports.userDelete = function(req, res) {
    var userDeleteSql = "DELETE FROM `users` WHERE `id` = ?";
    connection.query(userDeleteSql, [req.body.id], function(err, userDeleteRes) {
        if (err) {
            sendResponse.sendErrorFlagResponse(3, 151, err, res);
        } else {
            var response = {
                user: userDeleteRes
            };
            sendResponse.sendSuccessFlagResponseWithData(103, response, res);
        }
    });
};

exports.userInsert = function(req, res) {
    var userInsertSql = "INSERT INTO `users`(`user_name`, `password`, `email`, `mobile`, `address`, `status`) VALUES (?,?,?,?,?,?)";
    connection.query(userInsertSql, [req.body.user_name,md5(req.body.password),req.body.email,req.body.mobile,req.body.address,1], function(err, userInsertResult) {
        if (err) {
            sendResponse.sendErrorFlagResponse(3, 151, err, res);
        } else {
            var response = {
                userInsert: userInsertResult
            };
            sendResponse.sendSuccessFlagResponseWithData(103, response, res);
        }
    });
};

exports.checkUserLogin = function(req, res) {
    var getLoginSql = "SELECT * FROM `users` WHERE `password` = ? AND `user_name` = ?";
    connection.query(getStates, [md5(req.body.password),req.body.user_name], function(err, getLoginSqlRes) {
        if (err) {
            sendResponse.sendErrorFlagResponse(3, 151, err, res);
        } else if (getLoginSqlRes.length == 0) {
            res.send({
                error: "Username and password doesn't match"
            });
        } else {
          res.send({
              log: "Logged in successfully"
          });
        }
    });
};


// var sql = "INSERT INTO `resellers` (`reseller_email`, `reseller_mobile`, `reseller_name`, `bank_added`, `access_token`, `reseller_image`, `state_id`, `password`, `referral_code`, `stripe_customer_id`, `date_registered`, `last_login`) values(?,?,?,?,?,?,?,?,?,?,NOW(),NOW())";
// connection.query(sql, [body.reseller_email.value, body.reseller_mobile.value, body.reseller_name.value, 1, access_token, '', body.state_id.value, passwordHash.generate(body.reseller_password.value), results[0], customer_id], function(err, result) {
//     if (err) {
//         sendResponse.sendErrorFlagResponse(3, 54, err, res);
//     } else {
//         var reseller_id = result.insertId;
//         var insertReferral = "INSERT INTO `reseller_referrals` (`reseller_id`, `referral_code`, `parent_id`, `referred_at`) VALUES (?,?,?,NOW())";
//         connection.query(insertReferral, [reseller_id, results[0], results[1]], function(err, insertResult) {});
//         var sql = "INSERT INTO `reseller_bank` (`reseller_id`, `stripe_bank_id`, `last_updated`) VALUES (?,?,NOW())";
//         connection.query(sql, [reseller_id, results[2]], function(err, result) {
//             if (err) {
//                 sendResponse.sendErrorFlagResponse(3, 55, err, res);
//             } else {
//                 sendResponse.sendSuccessFlagResponse(100, res);
//             }
//         })
//     }
// });
