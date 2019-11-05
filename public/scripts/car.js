window.addEventListener('load', function(){
    var btns = document.querySelectorAll('.carItem__importantDelete');
            
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
                        console.log(info);
                        location.reload();
                    });
                });
            });
});
