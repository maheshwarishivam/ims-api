/**
 * Domain.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        name: {
            type: 'alpha',
            required: true
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
    },
    validation_messages: { 
        name: {
            required : 'name is required',
            alpha    : 'name can contains only letters'
        },
        mobile: {
            required : 'mobile is required',
            integer  : 'mobile number should be numeric'
        },
        email: {
           email    : 'invalid email address'
        },
        startDate: {
            datetime : 'invalid start date'
        },
        endDate: {
           datetime : 'invalid end date'
        }
    }
};

