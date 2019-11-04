window.addEventListener('load', function(){

    var addToCart = document.querySelector(".productDetail__featuresAddToCart");

   function displayList() {
        fetch('/api/products')
        .then(function(response) {
            return response.json();
        })
        .then(function(listItems) {
            
            listItems.forEach(element => {

                addToCart.addEventListener("click",function() {
                    console.log("sirve el boton",element);

                    var data= new URLSearchParams();
                    data.append("idProduct",element._id);

                    var promise= fetch('/api/carItems', {
                        method : 'POST', 
                        body : data
                    });

                    promise.then((raw) => {
                        return raw.json();
                    }).then((info) => {
                        displayCar();
                    });
                });


    
            });
        });
    }
    
    displayList();

});