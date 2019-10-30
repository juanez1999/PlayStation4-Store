window.addEventListener('load', function(){
    var cartCount = document.querySelector('.cartCount');

    function displayCar() {
        fetch('/api/carItems')
        .then(function(response) {
            return response.json();
        }).then(function(carList) {
            console.log(carList);
            cartCount.innerText = carList.products.length;
        });

    }

    displayCar();
    this.window.displayCar = displayCar;
    

});
