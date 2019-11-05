window.addEventListener('load', function(){

    var addToCart = document.querySelector(".productDetail__featuresAddToCart");


            addToCart.addEventListener("click",function() {
                    console.log("sirve el boton");
                    console.log(addToCart.getAttribute("data-id"));

                    var data= new URLSearchParams();
                    data.append("idProduct",addToCart.getAttribute("data-id"));

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