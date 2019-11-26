
WIDTH = window.innerWidth; // Ancho de pantalla
HEIGHT = window.innerHeight; // Alto de pantalla

// Lienzo u objeto encargado del renderizado
var lienzo = new THREE.WebGLRenderer({antialias: true});

// Establecemos las dimensiones del lienzo
lienzo.setSize(
    WIDTH,
    HEIGHT
);
    
lienzo.setClearColor (0xffffff, 1);
    
// Añadimos el lienzo a la página
document.body.appendChild(lienzo.domElement);
    
// Creamos la escena
var escena = new THREE.Scene;


// Creamos un poligono
var geometriaCubo = new THREE.CubeGeometry(
100, // Dimensiones en eje X
140, // Dimensiones en eje Y
100 // Dimensiones en eje Z
);

// Creamos una apariencia (de lila claro)
var aparienciaLila = new THREE.MeshLambertMaterial({
color: 0x9999FF // Color hexadecimal
});

// Generamos el polígino y le aplicamos la apariencia
// var cubo = new THREE.Mesh(geometriaCubo, aparienciaLila);

// Añadimos el cubo a la escena
//escena.add(cubo);
console.log(THREE);

var camara = new THREE.PerspectiveCamera(
45,
(WIDTH / HEIGHT),
0.1,
10000
);

var controls = new THREE.OrbitControls( camara, lienzo.domElement);

var loader = new THREE.GLTFLoader();

loader.load( '/recursos/render/scene.gltf', function ( gltf ) {
    
    console.log(gltf.scene);
    escena.add( gltf.scene );
    
    
    // Situamos la cámara
    camara.position.y = 0;
    camara.position.z = 3;
    
    // Centramos la vista en el cubo
    camara.lookAt(gltf.scene.position);
    
    escena.add(camara);
    
}, // called while loading is progressing
function ( xhr ) {
    
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
},
undefined, function ( error ) {
    
    console.error( error );
    
} );

camara.position.set( 0, 20, 100 );
controls.update();

function animate() {
    
    requestAnimationFrame( animate );
    
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    
    renderer.render( escena, camara );
    
}    
            
// Creamos una par de focos de luz
var luz1 = new THREE.AmbientLight(0xffffff,0.3); // Ambiental
                
var luz2 = new THREE.PointLight(0xffffff,0.8); // Azulado
luz2.position.set(
    -100, // Posición en eje X
    100, // Posición en eje Y
    200	 // Posición en eje Z
    );
    
    // Añadimos las luces
    escena.add(luz1);
    escena.add(luz2);
    
    x=0;
                    
function renderizar(){
    // Renderizamos la escena
    lienzo.render(escena, camara);
    // Volvemos a renderizar
    requestAnimationFrame(renderizar);
}
                    
// Empezamos a renderizar
renderizar();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    lienzo.setSize( window.innerWidth, window.innerHeight );
}