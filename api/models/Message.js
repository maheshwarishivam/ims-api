/**
 * Message.js
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
        message: {
            type: 'string',
            required: true
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
        }
    }
};

