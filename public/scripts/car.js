window.addEventListener('load', function(){
    var btns = document.querySelectorAll('.carItem__importantDelete');

    function displayList() {
        fetch('/api/carItems')
        .then(function(response) {
            return response.json();
        })
        .then(function(listItems) {
            
            btns.forEach(function(elem,index) {
                elem.addEventListener('click',function () {
                    console.log(index);
                    listItems[index];
                    console.log(listItems[0].index);

                    var data= new URLSearchParams();
                    data.append('indexToDelete',listItems[index]._id);
                    
                    var promise = fetch('/api/carItems', {
                        method: 'DELETE',
                        body: data
                    });
                    
                    promise.then(function(response) {
                        return response.json();
                    }).then(function(info) {
                        console.log(info);
                        displayList();
                    });
                });
            });
        });
    }
    
    displayList();
});
