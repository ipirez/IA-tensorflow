//datos no  utiles hata integracion de tensorflow
// import * as tf from "@tensorflow/tfjs"
// import { cosineProximity } from "./node_modules/@tensorflow/tfjs-layers/dist/exports_metrics";
// import { promises } from "fs";
// import { resolve } from "url";
// import  "@tensorflow/tfjs-node"
import {findValues,sortByShortAges,linealCore} from "./math";
const data = require("./collection");

const linearRegressionGraphic = async (value) =>{
  return await findValues(data,value).then(res=>{
    var trainX = res.map(z => z.age_max)
    var trainY = res.map(z => z.age_now)
    return {
      x:trainX,
      y:trainY
    } 
  })
}
const linearRegressionData = async (value) =>{
  return await findValues(data,value).then(res =>{
    var x = res.map(z => z.age_max)
    var y = res.map(z => z.age_now)
    return linealCore(y,x)
  })
}
  const variance = async () =>{
    const universe =  data.map(({market}) => market).sort()
    var universeLength = universe.length
    const R = universe[universe.length-1] - universe[0]
    const media = (universe.reduce((x, a) => x + a))/universeLength
    const desviacion = Math.sqrt(universe.map(x => Math.pow(media - x ,2)).reduce((x,a) => x + a) / universeLength)
    const varianza  = Math.pow(desviacion,2)
    const coeficiente = desviacion / media 
    return await{
      R,
      media,
      desviacion,
      varianza,
      coeficiente
    }
  }
  const find = async (value) =>{
    return await findValues(data,value).then(data=>{
      return sortByShortAges(data)
    })
  }
module.exports.find = find
module.exports.linearRegressionGraphic = linearRegressionGraphic
module.exports.linearRegressionData = linearRegressionData
module.exports.variance = variance
