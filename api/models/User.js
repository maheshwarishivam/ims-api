/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        domain: {
            model: 'Domain',
            required: true
        },
        appUserId: {
            type: 'alphanumericdashed',
            required: true
        }
    },
    validation_messages: { 
        appUserId: {
            required: 'name is required',
            alphanumericdashed : 'appUserId can contains only numbers,letters or dashes'
        }
    },
    beforeValidate: function(values, callback) {
      sails.models.domain.count({id : values.domain} , function(err, result){
            if(err) {
              sails.log.error("Error", err);
              return callback(err);
            }

            if(!result){
              var error={};
              error['domain']=[];
              error.domain.push(
                { nonExistent : 'invalid domain'}
              );
              return callback(error);
            }
            var condition = {
              domain : values.domain ,
              appUserId : values.appUserId
            }
        
            sails.models.user.count( condition , function(err, result){
               if(err) {
                  sails.log.error("Error", err);
                  return callback(err);
                }
                if(result){
                  var error={};
                  error['appUserId']=[];
                  error.appUserId.push(
                    { alreadyExists : 'appUserId already exists'}
                  );
                  return callback(error);
                }
                
               return callback();
              
            });
       });
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

