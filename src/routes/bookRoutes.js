const express = require('express');
const bookRouter = express.Router();
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
    bookRouter.route('/')
        .get((req, res) => {

            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Conectado ao servidor');

                    const db = client.db(dbName);
                    const books = await db.collection('books').find().toArray();
                    res.render(
                        'booksListView',
                        {
                            nav,
                            title: 'Books',
                            books
                        });
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Conectado ao servidor');
                    const db = client.db(dbName);
                    const book = await db.collection('books').findOne({ _id: new ObjectID(id) });
                    debug(book);
                    res.render(
                        'bookView',
                        {
                            nav,
                            title: 'Book',
                            book
                        });
                } catch (err) {
                    debug(err.stack);
                }
            }())
        });
    return bookRouter;
}

module.exports = router;