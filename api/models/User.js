/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        domain: {
            type: 'integer',
            required: true
        },
        appUserId: {
            type: 'string',
            required: true
        }
    },
    getUserDetail: function(data, callback) {
            sails.models.user.find(data , function(err, result){
               if(err) {
                   sails.log.error("Error", err);
                   console.log(err);
                   return callback(err);
                   //return res.serverError("Error Occured", err);
                }
                return callback(null,result);
           });
        } 
   
};

