/**
 * CronController
 *
 * @description :: Server-side logic for managing crons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	cronDeleteMessage : function(req, res) {
		var day=sails.config.cronConstants.msgTime;

		var date = new Date();
		console.log(date);
		date.setDate(date.getDate() - day);
		console.log(date);

		
		sails.models.message.destroy({
		    	sentOn: {'<=': date},
		   		readOn : {'!': null}
			}).exec(function(err){
			if(err) {
               sails.log.error("Error", err);
               return res.serverError("Error Occured", err);
            }
			console.log('The record has been deleted');
			return res.ok("The record has been deleted",date);
		});
		/*var condition = {
			sentOn: {'<=': date} ,
			readOn : {'!=': null}
		}*/	
		/*sails.models.message.destroy(condition).exec(function deleteCB(err){
			if(err) {
               sails.log.error("Error", err);
               return res.serverError("Error Occured", err);
            }
			console.log('The record has been deleted');
			return res.ok("The record has been deleted",date);
		});*/
		
	}
	
};

