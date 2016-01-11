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
        },
        email: {
            type: 'string',
            email: true,
            required: false
        },
        isFree: {
            type: 'boolean',
            required: true,
            defaultsTo: true
        },
        package:{
            model:'Packages'
        },
        startDate: {
            type: 'datetime',
            required: false
        },
        endDate: {
            type: 'datetime',
            required: false
        },
        secretKey: {
            type: 'string',
            required: false
        },
        authKey: {
            type: 'string',
            required: false
        },
        status: {
            type: 'boolean',
            required: true,
            defaultsTo: true
        },
        domainUser : {
            collection: 'DomainUser',
            via: 'domain'
        }
    }
};

