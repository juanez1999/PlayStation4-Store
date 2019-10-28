window.addEventListener('load', function(){

    var orderList = document.querySelector(".orderType");
    console.log(orderList);

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
    
            });
            console.log(listItems);
        });
    }
    
    displayList("");

    orderList.addEventListener("change", function() {
        console.log(orderList.value);
        displayList("?orderType="+orderList.value);
    });
 
});

// intente esto para hacer que cada cosa tuviera su contenedor
/*function displayList() {
        fetch('/api/productsItems')
        .then(function(response) {
            return response.json();
        })
        .then(function(listItems) {
            var containerImg = document.querySelector('.mainStore__productsImg');
            var containerInfo = document.querySelector('.mainStore__productsInfo');
            var container = document.querySelector('.mainStore__products')

            
            container.innerHTML = "";
            
            listItems.forEach(element => {
                var productImg = document.createElement('ul');
                var productInfo = document.createElement('ul');
                productInfo.innerHTML = '<h3>'+element.name+'</h3><h3>$'+element.price+'</h3>';
                productImg.innerHTML = '<img src='+element.image+'></img>';
                containerImg.appendChild(productImg);
                containerInfo.appendChild(productInfo);
                container.appendChild(containerImg);
                container.appendChild(containerInfo);
                product.style.backgroundColor=element.color;
            });
            console.log(listItems);
    
        });
    }*/