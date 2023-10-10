

type player = { //establecemos el tipo player que usaremos más adelante
  name: string
  numquest: number //variable que indica el número de preguntas que quiere responder el jugador
  punct: number //puntuación
}


async function Datos() { //función asíncrona que nos servirá para pedirle los datos a la API hacemos un try and catch en caso de que se produzca algun error con el fetch
  try {
    const respuesta = await fetch(`https://opentdb.com/api.php?amount=10&type=boolean`);
    
    if (!respuesta.ok) {
      throw new Error('Se ha producido un error con la API');
    }

    const datos = await respuesta.json();
    return datos;

  } catch (error) {
    console.error('Error:', error);
  }
}

async function answer(S: string|null, datos) { //función answer que nos devolverá un booleano en función de si la respuesta es correcta o no
  
  if(S === '1' && datos.results[0].correct_answer === 'True'){
    console.log("Respuesta correcta!");
    return true;
    
  }else if(S === '2' && datos.results[0].correct_answer === 'False'){
    console.log('Respuesta correcta!');
    return true;
   
  }else{
    console.log('Respuesta errónea!');
    return false;
    
  }

}


function encontrarMaximo(players: player[]): number { //función simple para poder encontrar el maximo entre las puntuaciones de todos los jugadores
  if (players.length === 0) {
    console.log("no existen jugadores");
  }

  let maximo = players[0].punct;

  for (let i = 1; i < players.length; i++) {
    if (players[i].punct > maximo) {
      maximo = players[i].punct;
    }
  }

  return maximo;
}


async function main() { //función main donde se ejecuta la mayor parte del programa

  const players:player [] = [] //array de objetos tipo player
  let numplayers: number = 0; //variable en la que guardamos el numero de jugadores

  //distintas variables que necesitaremos más adelante
  let numb: number= 0;
  let totalquest: number = 0;
  const numberst: string = "";

  //le pedimos la información que necesitamos al usuario por teclado
  const resp0 = prompt("Bienvenido al trivial, introduce el numero de jugadores: ");
  resp0? numplayers=parseInt(resp0): console.log("error");
  
  for(let i=0; i<numplayers;i++){
    const p: player = {name : "",numquest : 0, punct : 0};
    const name = prompt("introduce tu nombre");
    name? p.name = name: console.error("error");
    const numberst = prompt("¿cuantas preguntas quieres responder?")
    numberst?  numb=parseInt(numberst): console.error("error");
    totalquest = totalquest + numb;
    numb? p.numquest = numb: console.error("error");
    players.push(p);
  }
  
    //bucle while (mientras sigan quedando preguntas por responder se cumplirá lo de dentro)
    while (totalquest > 0) {
      
      for (let i = 0; i < numplayers; i++) {
        //para cada jugador le daremos una pregunta y en función de su respuesta aumentaremos su puntuación o no
        
      
        if(players[i].numquest>0){
          console.log("Es el turno de: "+players[i].name);
          const datos = await Datos();
          console.log("Escribe 1 si crees que es verdad y 2 si crees que es mentira: ");
          const ans = prompt(`${datos.results[0].question}`);
          const par = await answer(ans, datos);
          
          if (par === true) {
            console.log(`${players[i].name} ha respondido correctamente.`);
            players[i].punct++;
            players[i].numquest--;
          } else {
            console.log(`${players[i].name} ha respondido incorrectamente`);
            players[i].numquest--;
          }
          
          console.log('Corrección: ', datos.results[0].correct_answer);
          totalquest--;
        }else{
          console.log(players[i].name+" te has quedado sin preguntas");
        }
      }
    }
    console.log("Puntuaciones: ");
    
    players.forEach(player => {
      if(encontrarMaximo(players)=== player.punct){
        console.log("El ganador es: "+player.name+" con "+player.punct+" puntos");
      }
    });

   
  


}






main();