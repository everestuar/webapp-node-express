const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectId } = require('mongodb');
const sessions = require('../data/sessions.json');

const sessionsRouter = express.Router();

sessionsRouter.route('/').get((req, res) => {
    const url = 
    'mongodb+srv://dbUser:0TCw1OX1p4NyGBgD@globomantics.vtaua.mongodb.net?retryWrites=true&w=majority';
const dbName = 'globomantics';

(async function mongo(){
    let client;
    try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongo DB');

        const db = client.db(dbName);

        const sessions = await db.collection('session').find().toArray();
        res.render('sessions', {sessions});
    } catch (error) {
        debug(error.stack);
    }
    client.close();
}());
});

sessionsRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    const url = 
    'mongodb+srv://dbUser:0TCw1OX1p4NyGBgD@globomantics.vtaua.mongodb.net?retryWrites=true&w=majority';
const dbName = 'globomantics';

(async function mongo(){
    let client;
    try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongo DB');

        const db = client.db(dbName);

        const session = await db.collection('session').findOne( {_id: new ObjectId(id) });
        
        res.render('session', {
            session,
        });
    } catch (error) {
        debug(error.stack);
    }
    client.close();
}());
    
});

module.exports = sessionsRouter;
