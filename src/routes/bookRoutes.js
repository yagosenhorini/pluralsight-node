const express = require('express');
const bookRouter = express.Router();
const { MongoClient } = require('mongodb');
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
        .get((req, res, next) => {
            (async function query() {
                const { id } = req.params;
            }());
        })
        .get((req, res) => {
            res.render(
                'bookView',
                {
                    nav,
                    title: 'Book',
                    book: req.book
                });
        });
    return bookRouter;
}

module.exports = router;