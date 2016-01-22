/**
 * UserController
 *
 * @description :: Server-side logic for managing Tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addUser: function(req, res) {
            var domain = req.param('domain',null);
            var appUserId = req.param('app_user_id',null);
            
            //TODO: Validate
            //return res.badRequest("message", data);
            var user = {
              domain: domain,
              appUserId:appUserId      
            };
            
            sails.models.user.create(user , function(err, result){
              if(err) {
                  if (err.ValidationError) {
                      var User=sails.models.user;
                      errors = sails.services.handlevalidation.transformValidation(User, err.ValidationError);
                      return res.badRequest("Error Occured", errors);
                  } else {
                     sails.log.error("Error", err);
                     return res.badRequest("Error Occured", err);
                  }
                }
                sails.log.verbose("user created succesfully");
                return res.ok("user created succesfully",result);
              
          });
        }


    
};

