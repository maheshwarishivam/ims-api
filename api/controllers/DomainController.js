/**
 * DomainController
 *
 * @description :: Server-side logic for managing domains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addDomain: function(req, res) {
            var name = req.param('name',null);
            var mobile = req.param('mobile',null);
            var email = req.param('email',null);
            var subscription = req.param('subscription',null);
            var startDate = req.param('startDate',null);
            var endDate = req.param('endDate',null);
            
            
            //TODO: Validate
            //return res.badRequest("message", data);
            var domain = {
              name: name,
              mobile:mobile,
              email:email,
              subscription:subscription,
              startDate:startDate,
              endDate:endDate
            };
            
            sails.models.domain.create(domain, function(err, result) {
              if(err) {
                  if (err.ValidationError) {
                      var domain=sails.models.domain;
                      errors = sails.services.handlevalidation.transformValidation(domain, err.ValidationError);
                      return res.badRequest("Error Occured", errors);
                  } else {
                     sails.log.error("Error", err);
                     return res.badRequest("Error Occured", err);
                  }
              }
              sails.log.verbose("Domain created succesfully", result);
              return res.ok("Domain created succesfully",result);
            });
        }
	
};

