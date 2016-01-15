/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	sentMessage: function(req, res) {
			var message = req.param('message',null);
            var sender 	= req.param('sender',null);
            var receiver= req.param('receiver',null);
            var sentOn 	= req.param('senton',null);
            var domain	= req.headers['api_key'];
           
            //TODO: Validate
            //return res.badRequest("message", data);
            var condition = 
            	[
	            	{domain : domain ,appUserId : sender},
	            	{domain : domain ,appUserId : receiver}
            	]

            
           
            sails.models.user.getUserDetail(condition, function(err,result){
            	if(err) {
            		sails.log.error("Error", err);
					return res.serverError("Error Occured", err);
				}
				if(result.length==2){
					if(result[0].appUserId == sender  && result[1].appUserId == receiver) {
						sender=result[0].id;
						receiver=result[1].id;
					} else {
						sender=result[1].id;
						receiver=result[0].id;
					}
					var msg = {
						sender: sender,
						receiver:receiver,
						message: message,
						sentOn: sentOn
					};
					sails.models.message.create(msg, function(err_msg, result_msg) {
							if(err_msg) {
								sails.log.error("Error", err_msg);
								return res.serverError("Error Occured", err_msg);
							}
							sails.log.verbose("Message created succesfully");
							return res.ok("Message inserted succesfully",result_msg);
					});
				} else {
					sails.log.verbose("Invalid Sender Or Receiver User");
					return res.badRequest("Invalid Sender Or Receiver User");
				}
            });
           
           
		},

	readMessage: function(req, res) {
            var msg_ids = req.param('msg_ids',null);
            var readOn = req.param('readon',null);

            msg_ids = msg_ids.split(",");
           
            //TODO: Validate
            //return res.badRequest("message", data);
            

            sails.models.message.find({id : msg_ids}, function(err,result){
        		if(err) {
					console.log(err);
					return res.serverError("Error Occured", err);
				}
				if(result == undefined) {
					console.log("Record not found");
					return res.badRequest("Record not found",result);
				} else {
					sails.models.message.update({id : msg_ids} , {readOn : readOn} , function(err1,result1){
						if(err1) {
							sails.log.error("Error", err1);
							return res.serverError("Error Occured", err1);
						}
						sails.log.verbose("Records updated succesfully");
						return res.ok("Records updated  succesfully",result1);
					});

				}
		});
	},


	/*conversationList: function(req, res) {
            var uuid = req.param('uuid',null);
            var condition = {
            	or :[
            			{sender : uuid },
            			{receiver : uuid}
            		]
			}
			var conversationArr = new Array();

			sails.models.message.find({groupBy:'customer_id'}).populate('message', {where: {readOn:null}}).exec(function(err, result){

				if(err) {
					return res.serverError("Error Occured", err);
				}
				console.log(result);

                sails.log.verbose("user created succesfully");
                return res.ok("user created succesfully",result);

			});

	},*/


	conversation: function(req, res) {
            var sender 	= req.param('uuid1',null);
            var receiver= req.param('uuid2',null);
            var page    = req.param('page',1);
            var limit	= req.param('limit',10);
            var domain	= req.headers['api_key'];
           
			var condition = 
            	[
	            	{domain : domain ,appUserId : sender},
	            	{domain : domain ,appUserId : receiver}
            	]

            var conversationArr = {};
            sails.models.user.getUserDetail(condition, function(err,users){
            	if(err) {
            		sails.log.error("Error", err);
					return res.serverError("Error Occured", err);
				}
				if(users.length==2){
					var condition = [
			            	{sender : users[0].id ,receiver : users[1].id},
			            	{sender : users[1].id ,receiver : users[0].id}
		            	]
		            if(users[0].appUserId == sender  && users[1].appUserId == receiver) {
						sender=users[0].id;
						receiver=users[1].id;
					} else {
						sender=users[1].id;
						receiver=users[0].id;
					}
		            var isReverse = false;
		            var skip=(page-1)*limit;;
		            
		            
		            sails.models.message.find(condition,{skip: skip, limit: limit, sort: 'id ASC' },
						function(err_msg, result_msg) {
							if(err_msg) {
								sails.log.error("Error", err_msg);
								return res.serverError("Error Occured", err_msg);
							}
							var data=[];
							result_msg.forEach(function(res) {
								if(res.sender == sender){
									res.isReverse = false;
									res.sender_name=req.param('uuid1');
									res.receiver_name=req.param('uuid2');
									
								} else {
									res.isReverse = true;
									res.sender_name=req.param('uuid2');
									res.receiver_name=req.param('uuid1');
								}
								
								data.push(res);
							});
							conversationArr= data;
							sails.log.verbose("Conversation List");
							return res.ok("Conversation List",conversationArr);
					});
				} else {
					sails.log.verbose("Invalid Sender Or Receiver User");
					return res.badRequest("Invalid Sender Or Receiver User");
				}
            });
		}
	
};

