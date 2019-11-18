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
    
    app.get('/api/carItems', (request, response) => {
        const products = db.collection('carItems');
        
        //buscamos todos los productos
        products.find({})
        //transformamos el cursor a una arreglo
        .toArray((err, result) => {
            //aseguramos de que no hay error
            assert.equal(null, err);
            
            
            
            response.send(result[0]);
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
    
    app.delete('/api/carItems', (request, response) => {
        const products = db.collection('carItems');

        products.find({}).toArray((err, result) => {
            //aseguramos de que no hay error
            assert.equal(null, err);
            var car = result[0];
     
            var index = car.products.indexOf(request.body.indexToDelete);
            car.products.splice(index,1);
            
            products.updateOne({ _id: new ObjectID(car._id) },
            {
                $set: { products: car.products }
            }
            );
            
            response.send({
                message: 'delete'
            });
    });
});

    app.post('/api/orders',(request,response) => {
        const carItems = db.collection('carItems');
        const orders = db.collection('orders');

        carItems.find({}).toArray((err, result) => {
            assert.equal(null, err);

            var car = result[0];
            //request.body.products ---> products es la nueva variable que le quiero agregar a la información que llega
            //a través del body y que es la info del formulario, luego el igual es el valor de esa variable que es car.products
            //que es los productos en la colección del carrito
            //de esta manera con el punto .variable se agregan nuevas cosas a un objecto
            request.body.products = car.products;
            console.log("esta es la wea:"+request.body.products);

            orders.insertOne(request.body);
        });

        response.send({
            message: 'ok'
        });
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
            response.render('productDetails', context);
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
        var type = request.query.type;

        if(Array.isArray(type)) {
            filters.type = { $in: type };
        } else if(type != undefined) {
            filters.type = type;
        }   

        
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
    
    app.get('/compra', (request, response) => {
        const carItems = db.collection('carItems');
        const products = db.collection ('products');
        //buscamos todos los productos
        carItems.find({})
        //transformamos el cursor a una arreglo
        .toArray((err, result) => {
            //aseguramos de que no hay error
            assert.equal(null, err);
            
            
            var ids = [];
            
            //console.log(result[0]);
            
            //arreglo de ids
            result[0].products.forEach(id => {
                ids.push(new ObjectID (id));
            });
            
            
            
            products.find({ _id: {$in: ids}})
            //transformamos el cursor a una arreglo
            .toArray((err, resultProducts) => {
                //console.log(resultProducts);
                
                
                //arreglo de productos 
                resultProducts.forEach( product => {
                    
                    var count = 0;
                    
                    
                    result[0].products.forEach( resultId => {
                        
                        
                        if(resultId == product._id){
                            count += 1;
                        }
                    });
                    
                    
                    
                    product.count = count;
                    
                });
                
                var context = {
                    products: resultProducts,
                };
                
                response.render('car', context);
            });
               
            app.get('/pago', (request, response) => { 
                response.render('payPurchase');
            });
            
        });
    });
    
}

module.exports = createRoutes;
