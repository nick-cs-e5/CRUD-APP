'use strict';

const HauteCouture = require('haute-couture');
const Package = require('../package.json');
const BranchController =  require('../controllers/branch');
const Joi = require('joi');

exports.plugin = {
    pkg: Package,
    register: async (server, options) => {

        // Custom plugin code can go here

        server.route({
            method: 'POST',
            path: '/create-branch',
            handler: BranchController.create,
            options: {
                validate: {
                    payload: Joi.object({
                        branchName: Joi.string().min(3).max(10),
                        addressLine1: Joi.string().min(5).max(30),
                        addressLine2: Joi.string().min(5).max(30),
                        city: Joi.string().min(1).max(30),
                        state: Joi.string().min(1).max(30),
                        pincode: Joi.string().min(5).max(10),
                        phone: Joi.string().max(10),
                        headquarter: Joi.string().max(11),
                        branch: Joi.string().max(6),
                        contactPerson: Joi.string().max(6)
                    })
                }
            },
        });

        server.route({
            method: 'GET',
            path: '/get-all-branch',
            handler: BranchController.getAll
        })

        server.route({
            method: 'GET',
            path: '/get-branch/{id}',
            handler: BranchController.get
        })

        server.route({
            method: 'PUT',
            path: '/update-branch/{id}',
            options: {
                validate: {
                    payload: Joi.object({
                        branchName: Joi.string().min(3).max(10),
                        addressLine1: Joi.string().min(5).max(30),
                        addressLine2: Joi.string().min(5).max(30),
                        city: Joi.string().min(1).max(30),
                        state: Joi.string().min(1).max(30),
                        pincode: Joi.string().min(5).max(10),
                        phone: Joi.string().max(10),
                        headquarter: Joi.string().max(11),
                        branch: Joi.string().max(6),
                        contactPerson: Joi.string()
                    })
                }
            },
            handler: BranchController.update
        })

        server.route({
            method: 'DELETE',
            path: '/delete-branch/{id}',
            handler: BranchController.remove
        })
        

        await HauteCouture.using()(server, options);
    }
};
