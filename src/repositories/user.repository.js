'use strict'

const pool = require('../db/database').getPool();


exports.createUser = (newUser) => new Promise(function (callback, reject) {
    pool.getConnection(function (err, connection) {        
        connection.query("Insert into users (name, email, phone) VALUES (?, ?, ?)", [newUser.name, newUser.email, newUser.phone], function (err, result) {
            connection.release();
            console.log("user: ",result);
            if (err)
                reject(err);
            else
                callback(result)
        });
    })
});

exports.findById = (userId) => new Promise(function (callback, reject) {
    pool.getConnection (function (err, connection) {
        connection.query(`SELECT * FROM users WHERE user_id = ${userId}`, function(err, user, fields) {
            if (err) { 
                connection.release();
                reject(err);
            }
            else {
                var data = (user)[0];
                connection.query(`SELECT * FROM address WHERE user_id = ${userId}`, function(err, address, fields){
                    if(err) {
                        connection.release();
                        reject(err);
                    }
                    else {                        
                        data.address = (address)[0];
                        callback(data)
                    }
                })
                //callback(data); 
            }                
        });
    })
});
  
exports.getAllUsers = () => new Promise(function (callback, reject) {
    pool.getConnection(function (err, connection) {
        const sql = "SELECT * FROM users JOIN address ON users.user_id = address.user_id";
        connection.query(sql, function(err, result, fields) {
            connection.release();
            if (err)
                reject(err)
            else
                callback(result)
        });
    })
});

exports.updateUserById = (user,id) => new Promise(function (callback, reject) {
    pool.getConnection(function (err, connection) {
        connection.query("UPDATE users SET email = ?, name = ?, phone = ?  WHERE user_id = ?",
              [user.email, user.name, user.phone, id], function(err, result, fields) {
            console.log("users: ", result)
            connection.release();
            if (err)
                reject(err)
            else
                callback(result)
        });
    })
});

exports.deleteUser = (userId) => new Promise(function (callback, reject) {
    pool.getConnection(function (err, connection) {
        connection.query(`DELETE FROM address WHERE user_id = ${userId}`, function(err, result) {
            if (err){
                connection.release();
                reject(err)
            } else{
                connection.query(`DELETE FROM users WHERE user_id = ${userId}`, function(err, result) {
                    connection.release()
                    if (err) {
                        reject(err)
                    } else {
                        callback("User deleted successfully")
                    }
                })
            }

        })
    })
})

exports.createAddress = (newAddress, id) => new Promise(function(callback, reject){
    console.log(id);
    pool.getConnection(function (err, connection){
        connection.query("Insert into address (city, state, country, profile_pic, user_id) VALUES (?, ?, ?, ?, ?)",
         [newAddress.city, newAddress.state, newAddress.country, newAddress.profilePic, id], function (err, result, fields){
            connection.release();
            if(err)
                reject(err)
            else
                callback(result)
        })
    }) 
})

