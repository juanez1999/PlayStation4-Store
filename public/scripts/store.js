window.addEventListener('load', function(){
    
    var orderList = document.querySelector(".orderType");
    var checkBoxes = document.querySelectorAll('.filter__inputCheckbox');

    //console.log(orderList);

    function displayList(order) {
        fetch('/api/products'+order)
        .then(function(response) {
            return response.json();
        })
        .then(function(listItems) {
            var container = document.querySelector('.mainStore__products');
            
            
            container.innerHTML = "";
            
            listItems.forEach(element => {
                var product = document.createElement('div');
                product.className= 'mainStore__productsItem';
                product.innerHTML = '<a href="/producto/'+element._id+'"><img class="mainStore__productsImg" src='+element.image+'></img></a><div class="mainStore__productsItemBuy"><h3>'+element.name+'</h3><h3 style="color: #FF5247;">$'+element.price+'</h3><div class="mainStore__productsItemBtnBuy"><button class="mainStore__addToCart"></button><h4>Agregar al carrito</h4></div><div class="mainStore__productsPopularity"><h3>'+element.popularity+'</h3><img class="mainStore__productsStar" src="./recursos/star.png"></img></div></div>';
                container.appendChild(product);
                product.style.backgroundColor=element.color;

                var addToCart = product.querySelector(".mainStore__addToCart");

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
                        console.log(info);
                    });
                });


    
            });
            console.log(listItems);
        });
    }
    
    displayList("");

    orderList.addEventListener("change", function() {
        console.log(orderList.value);
        displayList("?orderType="+orderList.value);
    });

    function handleChange() {
        var order = '?orderType='+orderList.value;

        checkBoxes.forEach((checkBox) => {
            if(checkBox.checked) {
                order = order.concat('&type='+checkBox.value);
            }
        });
        
        displayList(order);
    };

    checkBoxes.forEach((checkBox) => {
        checkBox.addEventListener('change', handleChange);
    });

});