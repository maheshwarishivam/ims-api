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
				var sender_name='';
				var receiver_name='';
				if(result.length==2){
					if(result[0].appUserId == sender  && result[1].appUserId == receiver) {
						sender 	= result[0].id;
						receiver= result[1].id;
						sender_name = result[0].appUserId;
						receiver_name = result[1].appUserId;
					} else {
						sender 	= result[1].id;
						receiver= result[0].id;
						sender_name = result[1].appUserId;
						receiver_name = result[0].appUserId;
					}
					var msg = {
						sender 	: sender,
						receiver: receiver,
						message : message,
						sentOn 	: sentOn
					};


					async.auto({
						createMessage: function(callback) {
							sails.models.message.create(msg, function(err_msg, result_msg) {
								if(err_msg) {
									sails.log.error("Error", err_msg);
									callback(err_msg);
								}
								sails.log.verbose("Message created succesfully");
								callback(null,result_msg);
							});	
						},
						findContact: ['createMessage',function(callback, results) {

						 //results.createMessage
							var condition = {
				            	or : [
				            			{sender : sender , receiver : receiver},
				            			{sender : receiver ,receiver : sender}
				            	]
							}
							var data = {
				            	sender 				: sender,
								receiver 			: receiver,
								lastMsg 			: message,
								receiverUnreadCount	: 0,
								senderUnreadCount 	: 0,
								lastMsgTimestamp 	: sentOn,
								lastMsgDirection 	: false,
								sender_name			: sender_name ,
								receiver_name 		: receiver_name
							}
							
							sails.models.contact.findOrCreate(condition , data , 
								function(err_contact, res_contact) {
									if(err_contact) {
										sails.log.error("Error", err_contact);
										callback(err_contact);
									}
									if(res_contact.sender == sender ){
										res_contact.receiverUnreadCount = res_contact.receiverUnreadCount +1;
										res_contact.lastMsgDirection	= false;
									} else {
										res_contact.senderUnreadCount 	= res_contact.senderUnreadCount +1;
										res_contact.lastMsgDirection	= true;
									}
									res_contact.lastMsg = message;
									res_contact.lastMsgTimestamp = sentOn;
									res_contact.save(function(err_contact,res_contact) {
								        if(err_contact) {
											sails.log.error("Error", err_contact);
											callback(err_contact);
										}
										sails.log.verbose("contact updated succesfully");
										callback(null,res_contact);	
									});
							});
						}]
					}, function(err, results) {
						    if(err) {
								if (err.ValidationError) {
									var message=sails.models.message;
									errors = sails.services.handlevalidation.transformValidation(message, err.ValidationError);
									return res.badRequest("Error Occured", errors);
								} else {
									sails.log.error("Error", err);
									return res.badRequest("Error Occured", err);
								}
							}
							sails.log.verbose("Message created succesfully");
							return res.ok("Message created succesfully",results.createMessage);
					});
				} else {
					var error={};
					error['user']=[];
					error.user.push({ invalidUser : 'invalid sender Or receiver appUserId'});
					sails.log.verbose("Invalid Sender Or Receiver User");
					return res.badRequest("Error Occured",error);
				}
	        });
		},

	readMessage: function(req, res) {
            var sender 		= req.param('uuid1',null);
            var receiver 	= req.param('uuid2',null);
            var readOn 		= req.param('readon',null);
            var domain		= req.headers['api_key'];
            
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
						sender 	= result[0].id;
						receiver= result[1].id;
					} else {
						sender 	= result[1].id;
						receiver= result[0].id;
					}

					condition = {
				            sender   : sender , 
				            receiver : receiver ,
				            readOn 	 : null
					}
					async.auto({
						findMessage: function(callback) {
							sails.models.message.find(condition, function(err,result){
								if(err) {
									callback(err);
								}
								callback(null,result);
							});
						},
						updateMessage: ['findMessage',function(callback,result) {
							sails.models.message.update(condition , {readOn : readOn} ,
								function(err1,result1){
									if(err) {
									callback(err);
								}
								callback(null,result);
							});
						}],

						findContact: ['updateMessage','findMessage',function(callback, results) {
							var contact_condition = {
			            		or : [
			            			{sender : sender , receiver : receiver},
			            			{sender : receiver ,receiver : sender}
			            		]
							}
					
					
							sails.models.contact.findOne(contact_condition , 
								function(err_contact, res_contact) {
									if(err_contact) {
										callback(err);	
									}
									if(res_contact.sender == sender ){
										res_contact.senderUnreadCount   = 0;
									} else {
										res_contact.receiverUnreadCount = 0;
									}
									res_contact.save(function(err_contact,res_contact) {
								        if(err_contact) {
											callback(err_contact);	
										}
										callback(null,res_contact);
									});
								});
						}]
				}, function(err, results) {
				    if(err) {
						sails.log.error("Error", err);
						return res.serverError("Error Occured", err);
					}
					sails.log.verbose("Message status updated succesfully");
					return res.ok("Message status updated succesfully");
				});
			} else {
				var error={};
				error['user']=[];
				error.user.push({ invalidUser : 'invalid sender Or receiver appUserId'});
				sails.log.verbose("Invalid Sender Or Receiver User");
				return res.badRequest("Error Occured",error);
			}
        });
	},


	conversationList: function(req, res) {
		    var uuid 		= req.param('uuid',null);
            var domain		= req.headers['api_key'];
            var page    	= req.param('page',1);
            var limit		= req.param('limit',10);
            //TODO: Validate
            //return res.badRequest("message", data);
            var condition = {
            		domain : domain ,
            		appUserId : uuid
            	}
           sails.models.user.getUserDetail(condition, function(err,result){
            	if(err) {
            		sails.log.error("Error", err);
					return res.serverError("Error Occured", err);
				}
				if(result.length>0){
					var condition = {
		            	or :[
		            			{sender : result[0].id},
		            			{receiver : result[0].id}
		            		]
					}
					var id=result[0].id;
					var conversationArr = [];
					var skip=(page-1)*limit;
		            sails.models.contact.find(condition,{skip: skip, limit: limit, sort: 'updatedAt DESC' },
					 function(err, result){
						if(err) {
							return res.serverError("Error Occured", err);
						}

							result.forEach(function(res) {
								var data={};
								if(res.sender == id){
									data.id=res.id;
									data.isReverse = false;
									data.sender_name=res.sender_name;
									data.receiver_name=res.receiver_name;
									data.UnreadCount=res.senderUnreadCount;
									data.msg=res.lastMsg;
									data.lastMsgTimestamp=res.lastMsgTimestamp;
								} else {
									data.id=res.id;
									data.isReverse = true;
									data.sender_name=res.receiver_name;
									data.receiver_name=res.sender_name;
									data.UnreadCount=res.receiverUnreadCount;
									data.msg=res.lastMsg;
									data.lastMsgTimestamp=res.lastMsgTimestamp;
								}
								
								conversationArr.push(data);
							});
						sails.log.verbose("Chat List");
		                return res.ok("Chat List",conversationArr);
					});
				} else {
					var error={};
					error['user']=[];
					error.user.push({ invalidUser : 'invalid sender appUserId'});
					sails.log.verbose("Invalid Sender User");
					return res.badRequest("Error Occured",error);
				}
			});
	},


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
		            var skip=(page-1)*limit;
		            
		            
		            sails.models.message.find(condition,{skip: skip, limit: limit, sort: 'updatedAt DESC' },
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
					var error={};
					error['user']=[];
					error.user.push({ invalidUser : 'invalid sender Or receiver appUserId'});
					sails.log.verbose("Invalid Sender Or Receiver User");
					return res.badRequest("Error Occured",error);
				}
            });
		}
	
};

