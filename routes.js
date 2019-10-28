const assert = require('assert');
const ObjectID = require ('mongodb').ObjectID;

function createRoutes (app, db) {

    app.get('/', (request, response) => {
        console.log('alguien entró a la ruta inicial');
        response.sendFile(__dirname + '/public/index.html');
    });

    app.get('/tienda', (request, response) => {
        console.log('alguien entró a la ruta de tienda');
        response.render('store');
    });

    app.get('/producto', (request, response) => {
        console.log('alguien entró a la ruta de tienda');
        response.render('product');
    });

    app.get('/api/productsItems', (request, response) => {
        const products = db.collection('products');
        
        //buscamos todos los productos
        products.find({})
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    app.get('/api/products', (request, response) => {
        const products = db.collection('products');

        if(request.query.orderType == 'priceAscending'){
            products.find().sort({price:1})
            .toArray((err,result)=>{
                assert.equal(null,err);
            
                response.send(result);
            });
        }

        if(request.query.orderType == 'priceFalling'){
            products.find().sort({price:-1})
            .toArray((err,result)=>{
                assert.equal(null,err);
            
                response.send(result);
            });
        }

        if(request.query.orderType == 'Offers'){
            products.find().sort({price:-1})
            .toArray((err,result)=>{
                assert.equal(null,err);
            
                response.send(result);
            });
        }

        if(request.query.orderType == 'Popularity'){
            products.find().sort({popularity:-1})
            .toArray((err,result)=>{
                assert.equal(null,err);
            
                response.send(result);
            });
        }
    });


}

module.exports = createRoutes;
