/**
 * Domain.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: false
        },
        mobile: {
            type: 'integer',
            required: true
            //unique: true
        },
        email: {
            type: 'string',
            email: true,
            required: false
        },
        subscription:{ 
            model:'Subscription',
            required: false
        },
        startDate: {
            type: 'datetime',
            required: false
        },
        endDate: {
            type: 'datetime',
            required: false
        },
        status: {
            type: 'boolean',
            required: true,
            defaultsTo: true
        }
    }
};

