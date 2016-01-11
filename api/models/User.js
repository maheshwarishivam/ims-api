/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: false,
            minLength: 3
        },
        mobile: {
            type: 'integer',
            required: true,
            unique: true
        },
        email: {
            type: 'email',
            required: false
        },
        isBlocked: {
            type: 'boolean',
            required: true,
            defaultsTo: false
        },
        domainUser: {
            required: true,
            collection: 'DomainUser',
            via: 'user'
        }
    }
   
};

