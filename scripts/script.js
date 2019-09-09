
var btnchangeBlack = document.querySelector('.changeColor__black');
var changed = document.querySelector('.product__salient');
var firstChange = changed.querySelector('.product__salientImg');
var btnChange= document.querySelectorAll('btnchangeColor');


function clickColor(){
    console.log("hola");
    firstChange.setAttribute('src','https://media.playstation.com/is/image/SCEA/playstation-accessories-hub-dualshock-4-jet-black-01-ps4-us-10may18?$native_md_t$')
}

btnchangeBlack.addEventListener('click',clickColor);

for(i=0; i<btnChange.length ; i++){
    var btn=btnChange[i];
    btn.addEventListener('click',function(event, i){

    });
}

var btnArrowDer = document.querySelector('.change__Der');
var slider = document.querySelector('.gallery');
var tape = document.querySelector('.gallery__tape');
var count = 0;

var first = tape.querySelector('.gallery__img');
var newImg = document.createElement('img');
newImg.setAttribute('src', first.getAttribute('src'));
newImg.classList.add('slider__img');
tape.append(newImg);


function handleLast(){
    tape.classList.add('gallery__tape--inactive');
    tape.style.transform = 'translate(0px, 0px)';
}

function handleClickDer(event) {
    count++;
    
    if(count == 1){
        tape.classList.remove('gallery__tape--inactive');
    }
    
    var mov = slider.offsetWidth * -1 * count;
    tape.style.transform = 'translate(' + mov + 'px, 0px)';
    
    if(count > tape.childElementCount - 2){
        setTimeout(handleLast, 300);
        count = 0;
    }
}

btnArrowDer.addEventListener('click', handleClickDer);

var btnArrowIzq = document.querySelector('.change__Izq');

function handleClickIzq(event) {
    if(count > 0){
        count--;
    }
    

    var mov = slider.offsetWidth * -1 * -count;
    tape.style.transform = 'translate(' + mov + 'px, 0px)';
    
    if(count > tape.childElementCount - 2){
        setTimeout(handleLast, 300);
        count = 0;
    }
}

btnArrowIzq.addEventListener('click', handleClickIzq);



