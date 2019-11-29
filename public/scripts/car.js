window.addEventListener('load', function(){

    var btns = document.querySelectorAll('.carItem__importantDelete');

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
    
    btns.forEach(function(elem,index) {
        elem.addEventListener('click',function () {
            console.log(elem.getAttribute("data-id"));
            console.log(index);
            
            var data= new URLSearchParams();
            data.append('indexToDelete',elem.getAttribute("data-id"));
            
            var promise = fetch('/api/carItems', {
                method: 'DELETE',
                body: data
            });
            
            promise.then(function(response) {
                return response.json();
            }).then(function(info) {
                location.reload();
            });
        });
    });
});
