/**
* Contacts.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	attributes: {
        sender: {
            model: 'User',
            required: true
        },
        receiver: {
            model: 'User',
            required: true
        },
        sender_name: {                  // sender name is not used for search . only for showing sender appuserid in api
            type: 'string',
            required: false
        },
        receiver_name: {                // reciver name  is not used for search .only for showing receiver appuserid in api
            type: 'string',
            required: false
        },
        senderUnreadCount: {
            type: 'integer',
            required: false,
            defaultsTo: 0
        },
        receiverUnreadCount: {
            type: 'integer',
            required: false,
            defaultsTo: 0
        },
        lastMsg: {
            type: 'string',
            required: false,
            defaultsTo: null
        },
        lastMsgTimestamp: {
            type: 'datetime',
            required: false,
            defaultsTo: null
        },
        lastMsgDirection: {
            type: 'boolean',
            required: false,
            defaultsTo: false
        }
    }
};


