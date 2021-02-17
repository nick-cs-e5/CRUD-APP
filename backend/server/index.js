'use strict';

const mongoose = require('mongoose');
const Glue = require('@hapi/glue');
const Manifest = require('./manifest');

exports.deployment = async (start) => {

    const manifest = Manifest.get('/');
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    await server.initialize();

    if (!start) {
        return server;
    }

    await server.start();

    // Mongoose Connection build with Robo3T, on the path defined in .env
    mongoose.connect(process.env.DB,{
        useCreateIndex:true,
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(()=>{
        console.log("DB CONNECTED");
    });

    console.log(`Server started at ${server.info.uri}`);

    
    return server;
};

if (!module.parent) {

    exports.deployment(true);

    process.on('unhandledRejection', (err) => {
        throw err;
    });
}
