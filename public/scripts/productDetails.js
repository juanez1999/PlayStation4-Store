window.addEventListener('load', function(){
    
    var addToCart = document.querySelector(".productDetail__featuresAddToCart");
    
    var tl = gsap.timeline({});
    tl.to(".navGlobal__shop",{scale: .6 , duration: 0.3,});
    tl.to(".navGlobal__shop",{scale: 1 , duration: 0.5, ease: "bounce"}, "-=.1");
    tl.pause();
    
    function playAnimation(){
        tl.play();
    }
    
    function rewindAnimation(){
        
        tl.restart();
    }
    
    
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
    
    addToCart.addEventListener("mousedown",function() {
        playAnimation();
    });
    
    addToCart.addEventListener("mouseup",function() {
        rewindAnimation();
    });
    
    
});