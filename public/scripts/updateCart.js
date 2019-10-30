window.addEventListener('load', function(){
    
    function displayCar() {
        fetch('/api/carItems')
        .then(function(response) {
            return response.json();
        }).then(function(carList) {
            console.log(carList);
        });

    }

    displayCar();
    

});
