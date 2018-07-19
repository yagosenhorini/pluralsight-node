const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes')

function router(nav) {
    const books = [{
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Les Miserables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    }];
    bookRouter.route('/')
        .get((req, res) => {
            (async function query() {
                const request = new sql.Request();
                const result = await request.query('select * from books where id= @id')
                    .then((result) => {
                        debug(result);
                        res.render(
                            'booksListView',
                            {
                                title: 'Books',
                                nav,
                                books
                            });
                    });
            }());
        });
    bookRouter.route('/:id')
        .all((req, res, next) => {
            (async function query() {
                const { id } = req.params;
                const request = new sql.Request();
                const { recordSet } =
                    await request.input('id', sql.Int, id)
                        .query('select * from books where id=@id');
                [req.book] = recordSet;
                next();
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