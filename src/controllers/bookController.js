const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {
    function getIndex(req, res) {
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
    }
    function getById(req, res) {
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

                book.details = await bookService.getBookById(book.bookId);
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
        }());
    }
    function middleware(req, res, next){
        next();
        // if (req.user) {
        //     next();
        // }
        // else {
        //     res.redirect('/');
        // }
    }

    return {
        getIndex,
        getById, 
        middleware
    }
}
module.exports = bookController;