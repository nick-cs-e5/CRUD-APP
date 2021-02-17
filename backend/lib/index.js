'use strict';

const HauteCouture = require('haute-couture');
const Package = require('../package.json');
const BranchController =  require('../controllers/branch');
const Joi = require('joi');

exports.plugin = {
    pkg: Package,
    register: async (server, options) => {

        // POST request for creating branch
        server.route({
            method: 'POST',
            path: '/create-branch',
            handler: BranchController.create
        });

        // Get request for Getting all the branchs information
        server.route({
            method: 'GET',
            path: '/get-all-branch',
            handler: BranchController.getAll,
            
        })

        // Get request for Getting branch information by Id
        server.route({
            method: 'GET',
            path: '/get-branch/{id}',
            handler: BranchController.get
        })

        // PUT request for Updating branch information by Id
        server.route({
            method: 'PUT',
            path: '/update-branch/{id}',
            handler: BranchController.update
        })

        // Delete requst to delete branch 
        server.route({
            method: 'DELETE',
            path: '/delete-branch/{id}',
            handler: BranchController.remove
        })
        
        await HauteCouture.using()(server, options);
    }
};
