import * as tf from "@tensorflow/tfjs"
import  "@tensorflow/tfjs-node"
import { promises } from "fs";
import {findValues,sortByShortAges} from "./math";
import { resolve } from "url";
import { cosineProximity } from "./node_modules/@tensorflow/tfjs-layers/dist/exports_metrics";
const data = require("./collection");
//const dataLearning = require("./collection-test")


// const linearRegression = async () =>{
//   //no entiendo como necesitas los parametros type supongo que son coordenadas x,y 
//     var trainX = data.map(z => [z.type[0],z.type[1]]).reduce((a,b) => a.concat(b));
//     var trainY = data.map(z => [z.type[2],z.type[3]]).reduce((a,b)=>a.concat(b));
//     return await {
//       x:trainX,
//       y:trainY
//     }
//   }
  
//   //-> datos estadisticos de la colleccion 
//   const variance = async () =>{
//     const universe =  data.map(({market}) => market).sort()
//     var universeLength = universe.length
//     const R = universe[universe.length-1] - universe[0]
//     const media = (universe.reduce((x, a) => x + a))/universeLength
//     const desviacion = Math.sqrt(universe.map(x => Math.pow(media - x ,2)).reduce((x,a) => x + a) / universeLength)
//     const varianza  = Math.pow(desviacion,2)
//     const coeficiente = desviacion / media 
//     return await{
//       R,
//       media,
//       desviacion,
//       varianza,
//       coeficiente
//     }
//   }
  const init = async (value) =>{
    return await findValues(data,value).then(data=>{
      return sortByShortAges(data)
    })
  }
  

  // const init = () => Promise.all([linearRegression(),variance()]).then(data=>{
  //   return  {
  //     linearRegression: data[0],
  //     variance : data[1]
  //   }
  // })
 
module.exports.init = init

