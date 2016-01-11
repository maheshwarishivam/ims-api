/**
 * UserController
 *
 * @description :: Server-side logic for managing Tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addUser: function(req, res) {
            sails.log.silly("Entering addUser of User Controller");
            var name = req.param('name',null);
            
            
            //TODO: Validate
            //return res.badRequest("message", data);
            var user = {
              name: name,
              
            };
            
            console.log();
            sails.models.user.create(user, function(err, result) {
               if(err) {
                   sails.log.error("Error in blah...", err);
                   console.log(err);
                   return res.serverError("Error Occured", err);
               }
               sails.log.verbose("user created succesfully", result);
               return res.ok("User created succesfully",result);
            });
        }

    
};

