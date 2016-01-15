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
                   sails.log.error("Error", err);
                   return res.serverError("Error Occured", err);
               }
               sails.log.verbose("Subscription created succesfully", result);
               return res.ok("Subscription created succesfully",result);
            });
        }
	
};

