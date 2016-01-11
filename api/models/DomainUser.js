/**
 * DomainUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        domain: {
            model: 'Domain'
        },
        user:{
            model: 'User'
        },
        isBlocked: {
            type: 'boolean',
            required: true,
            defaultsTo: false
        }
    }
};

