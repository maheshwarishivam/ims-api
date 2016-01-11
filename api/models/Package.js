/**
 * Package.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        label: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
            required: true
        },
        features: {
            type: 'array',
            required: false
        },
        maxUserLimit: {
            type: 'integer',
            required: true
        },
        isEnabled: {
            type: 'boolean',
            defaultsTo: true
        },
        domains: {
            collection: 'domain',
            via: 'package'
        }
    }
};

