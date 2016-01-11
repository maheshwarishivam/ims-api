/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        contact: {
            model: 'Contacts'
        },
        message: {
            type: 'string',
            required: true
        },
        isReverse: {
            type: 'boolean',
            required: false,
            defaultsTo: false
        },
        sentOn: {
            type: 'datetime',
            required: false,
            defaultsTo: null
        },
        deliverdOn: {
            type: 'datetime',
            required: false,
            defaultsTo: null
        },
        readOn: {
            type: 'datetime',
            required: false,
            defaultsTo: null
        },
        getDeliveryStatus: function() {
            //TODO: Implement this
            return 1;
        } 
    }
};

