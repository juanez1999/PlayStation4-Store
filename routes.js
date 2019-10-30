const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

function createRoutes(app, db) {

    app.get('/', (request, response) => {
        console.log('alguien entró a la ruta inicial');
        response.sendFile(__dirname + '/public/index.html');
    });

    app.get('/tienda', (request, response) => {
        console.log('alguien entró a la ruta de tienda');
        response.render('store');
    });

    app.get('/api/carItemss', (request, response) => {
        const products = db.collection('carItems');

        //buscamos todos los productos
        products.find({})
            //transformamos el cursor a una arreglo
            .toArray((err, result) => {
                //aseguramos de que no hay error
                assert.equal(null, err);

                response.send(result);
            });
    });

    app.post('/api/carItems', (request, response) => {
        const products = db.collection('carItems');
        //buscamos todos los productos
        products.find({}).toArray((err, result) => {
            //aseguramos de que no hay error
            assert.equal(null, err);
            var car = result[0];
            car.products.push(request.body.idProduct);
            console.log(car);

            products.updateOne({ _id: new ObjectID(car._id) },
                {
                    $set: { products: car.products }
                }
            );

            response.send({
                message: 'ok',
                car
            });
        });

        //push para meter el arreglo de id y update para actualizarlo
        //products.push(request.body);

    });

    app.get('/producto/:id', (request, response) => {
        console.log('alguien entró al producto');

        const products = db.collection('products');

        //buscamos todos los productos
        products.find({ _id: new ObjectID(request.params.id) }).toArray((err, result) => {

            assert.equal(null, err);

            var context = {
                product: result[0],
            };

            console.log(result);
            response.render('product', context);
        });


    });

    app.get('/api/productsItems', (request, response) => {
        const products = db.collection('products');

        //buscamos todos los productos
        products.find({})
            //transformamos el cursor a una arreglo
            .toArray((err, result) => {
                //aseguramos de que no hay error
                assert.equal(null, err);

                response.send(result);
            });
    });

    app.get('/api/products', (request, response) => {
        const products = db.collection('products');

        if (request.query.orderType == 'priceAscending') {
            products.find().sort({ price: 1 })
                .toArray((err, result) => {
                    assert.equal(null, err);

                    response.send(result);
                });
            return;
        }

        if (request.query.orderType == 'priceFalling') {
            products.find().sort({ price: -1 })
                .toArray((err, result) => {
                    assert.equal(null, err);

                    response.send(result);
                });
            return;

        }

        if (request.query.orderType == 'Offers') {
            products.find().sort({ price: -1 })
                .toArray((err, result) => {
                    assert.equal(null, err);

                    response.send(result);
                });
            return;
        }

        if (request.query.orderType == 'Popularity') {
            products.find().sort({ popularity: -1 })
                .toArray((err, result) => {
                    assert.equal(null, err);

                    response.send(result);
                });
            return;
        }

        products.find({})
            //transformamos el cursor a una arreglo
            .toArray((err, result) => {
                //aseguramos de que no hay error
                assert.equal(null, err);

                response.send(result);
            });
    });


}

module.exports = createRoutes;
