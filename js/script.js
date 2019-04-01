(function(){
    /* -------------------------- */
    /* VARIABLES Y OBJETOS GENERALEZ */
    /* -------------------------- */

    var app = document.getElementById('app');
    var inputCaracteres = document.getElementById('numero-caracteres')
    var configuracion = {
        caracteres: parseInt(inputCaracteres.value),//parseInt para convertir en numero
        simbolos: true,
        numeros: true,
        mayuscula: true,
        minuscula:true
    }
    //OBJETOS - SE DEJA UN ESPACION PORQUE 
    //SERA CONVERTIDO EN ARRAY
    var caracteres = {
        numeros: '0 1 2 3 4 5 6 7 8 9',
        simbolos: '¬ \ ~ ^  °  # $ % & / ( ) = ? ¡ ¿ @ + - * [ ] - _ . , { } : ; < >',
        mayuscula: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        minuscula: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }
    
    /* -------------------------- */
    /*            EVENTOS         */
    /* -------------------------- */
    //EVENTO PARA EVITAR QUE CUANDO HAGAN SUBMIT NO SE RECARGUE 
    //QUE SERIA LO DEFAULT 
    app.addEventListener('submit', function(e){
        e.preventDefault(); //Previniendo el comportamiento por defecto

    });
    app.elements.namedItem('btn-mas-uno').addEventListener('click', function(){
        configuracion.caracteres++;
        inputCaracteres.value =    configuracion.caracteres;
    })
    app.elements.namedItem('btn-menos-uno').addEventListener('click', function(){
        if(configuracion.caracteres > 1){
        configuracion.caracteres--;
        inputCaracteres.value =    configuracion.caracteres;
        }
    })
    app.elements.namedItem('btn-simbolos').addEventListener('click', function(){
        btnToggle(this);
        configuracion.simbolos = !configuracion.simbolos;//invertir valor de true a false
       //console.log(configuracion.simbolos);
    })   
    app.elements.namedItem('btn-numeros').addEventListener('click', function(){
        btnToggle(this);
        configuracion.numeros = !configuracion.numeros;
        //console.log(configuracion.simbolos);
    }) 
    app.elements.namedItem('btn-mayuscula').addEventListener('click', function(){
        btnToggle(this);
        configuracion.mayuscula = !configuracion.mayuscula;
        //console.log(configuracion.simbolos);
    }) 
    app.elements.namedItem('btn-generar').addEventListener('click', function(){
        generarPassword();
    })
    app.elements.namedItem('input-password').addEventListener('click', function(){
        copiarPassword();
    })

    /* -------------------------- */
    /*            FUNCIONEs        */
    /* -------------------------- */

    function btnToggle(elemento){
        elemento.classList.toggle('false');//el elemento hace referencia al boton seleccionado y classlist para acceder a la clase de ese boton 
        elemento.childNodes[0].classList.toggle('fa-check');   //toggle poner y quitar childNodes es para acceder a los elementos hijos de donde estamos  estamos en <button><i> el siguiente el hijo es <i>                                      
        elemento.childNodes[0].classList.toggle('fa-times')
    }
    function generarPassword(){
        var caracteresFinales = '';
        var password = '';

        for(propiedad in configuracion){ //recorrera cada propiedad de configuracion o sea del objeto
            if(configuracion[propiedad] == true){
                caracteresFinales += caracteres[propiedad] + ' ';
                
            }
        }
        caracteresFinales = caracteresFinales.trim();//elimina los espacios entre los elementos
        caracteresFinales = caracteresFinales.split(' ');//el split convierte a los caractereres finales en un array
        for(var i = 0; i < configuracion.caracteres;i++){//hasta que sea menor que el numero del input
            password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)]//math. floor lo redondea y ramdom aleatorio
            
        }
        app.elements.namedItem('input-password').value = password;
        
    }
    function copiarPassword(){
        app.elements.namedItem('input-password').select();//cuando den click con el select se le seleccionara
        document.execCommand('copy');//copiar texto
        document.getElementById('alerta-copiado').classList.add('active');
        setTimeout(function(){
            document.getElementById('alerta-copiado').classList.remove('active');
        }, 2000)
    }
    
    generarPassword();
}())