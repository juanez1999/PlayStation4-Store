window.addEventListener('load', function(){

    var form= document.querySelector('.paymentForm');
    var btn = document.querySelector('.sendInfo');

    var tl = gsap.timeline({});
    tl.to(".sendInfo",{ scale: 0.5, duration: 0.4, background: 'linear-gradient(180deg, rgba(76, 233, 153, 0) 0%, rgba(76, 233, 153, 0) 0%, rgba(252, 94, 84, 0) 0%, #4CE999 0.01%, #3BD787 23.11%, #17AE61 100%)'});
    tl.to(".sendInfoText",{display:'none', duration:0.1});
    tl.to(".sendInfoTextSuccess",{ display:'block', ease: "slow", duration: 0.1});
    tl.to(".sendInfo",{ scale: 1, background: 'linear-gradient(180deg, rgba(76, 233, 153, 0) 0%, rgba(76, 233, 153, 0) 0%, rgba(252, 94, 84, 0) 0%, #4CE999 0.01%, #3BD787 23.11%, #17AE61 100%)', duration: 0.5, ease: "bounce"}, "-=.2");
    tl.pause();

    function playAnimation(){
        tl.play();
    }

    form.addEventListener('submit',function(event){
        event.preventDefault();
        playAnimation();
        var formInfo= new FormData(form);
        var data= new URLSearchParams(formInfo);
        
        var promise = fetch('/api/orders', {
            method : 'POST', 
            body : data
        });
        
        promise.then((raw) => {
            return raw.json();
        }).then((info) => {
            form.reset();
            console.log(info);
        });
    });

   

    
});