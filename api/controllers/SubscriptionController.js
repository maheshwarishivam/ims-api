/**
 * PackageController
 *
 * @description :: Server-side logic for managing packages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addSubscription: function(req, res) {
            var label = req.param('label',null);
            var description = req.param('description',null);
            var features = req.param('features',null);
            var maxUserLimit= req.param('maxUserLimit',null);
            
            //TODO: Validate
            //return res.badRequest("message", data);
            var subscription = {
             	label: label,
               	description: description,
                features: features,
                maxUserLimit: maxUserLimit,
            };
            
            sails.models.subscription.create(subscription, function(err, result) {
               if(err) {
                  if (err.ValidationError) {
                      var subscription=sails.models.subscription;
                      errors = sails.services.handlevalidation.transformValidation(subscription, err.ValidationError);
                      return res.badRequest("Error Occured", errors);
                  } else {
                     sails.log.error("Error", err);
                     return res.badRequest("Error Occured", err);
                  }
               }
               sails.log.verbose("Subscription created succesfully", result);
               return res.ok("Subscription created succesfully",result);
            });
        }
	
};

