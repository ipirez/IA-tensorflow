const getValue = document.getElementsByClassName('getValue')[0]
const getLinealGraphic = document.getElementsByClassName('getLinealGraphic')[0]
const getLinealData = document.getElementsByClassName('getLinealData')[0]
const getVariance = document.getElementsByClassName('getVariance')[0]
var trainX = []
var trainY = []
var m = []
var b = []


//event listeners
getValue.addEventListener("click", function(){
  let value = validateInput()
  if(!!value){
    triggerFind(value)
  }
})
getLinealGraphic.addEventListener("click", function(){
  let value = validateInput()
  if(!!value){
    triggerLinealGraphic(value)
  } 
})
getLinealData.addEventListener("click",function(){
  let value = validateInput()
  if(!!value){
    triggerLinealData(value)
  }   
})
getVariance.addEventListener('click',function(){
  let value = validateInput()
  if(!!value){
    triggerVariance(value)
  }   
})
function triggerVariance(value){
  fetch('/v1/tensorflow/variance/'+value).then(res=>{
    res.json().then(dataObj =>{
      document.getElementsByClassName('dataHolder')[0].innerHTML = JSON.stringify(dataObj, undefined, 2);
    })
  })
}
//triggers
function triggerLinealData(value){
  fetch('/v1/tensorflow/regression/data/'+value).then(res=>{
    res.json().then(dataObj =>{
      document.getElementsByClassName('dataHolder')[0].innerHTML = JSON.stringify(dataObj, undefined, 2);
    })
  })
}
function triggerLinealGraphic(value){
  fetch('/v1/tensorflow/regression/graphic/'+value).then(res=>{
    res.json().then(dataObj =>{
      trainX = dataObj.x
      trainY = dataObj.y
      m = tf.variable(tf.scalar(Math.random()));
      b = tf.variable(tf.scalar(Math.random()));
      plot()
    })
  })
}
function triggerFind(value){
  fetch('/v1/tensorflow/'+value).then(res=>{
    res.json().then(dataObj =>{
      document.getElementsByClassName('dataHolder')[0].innerHTML = JSON.stringify(dataObj, undefined, 2);
    })
  })
}
//validations
function validateInput(){
  let value = document.getElementsByClassName('inputValue')[0].value
  if(!!value){
    return value
  }
  else{
    alert('input vacio')
    return null
  }
}
/*
//NOTE: this sections would not live here is just for speed development has to live in the backend 
*/
    function predict(x) {
      return tf.tidy(function() {
        return m.mul(x).add(b);
      });
    }
    
    function loss(prediction, labels) {
      //subtracts the two arrays & squares each element of the tensor then finds the mean.
      const error = prediction
        .sub(labels)
        .square()
        .mean();
      return error;
    }
    // const predictionsBefore = predict(tf.tensor1d(trainX));

    //train trigger
  function train() {
    const learningRate = 0.005;
    const optimizer = tf.train.sgd(learningRate);
  
    optimizer.minimize(function() {
      const predsYs = predict(tf.tensor1d(trainX));
      console.log(predsYs);
      stepLoss = loss(predsYs, tf.tensor1d(trainY));
      console.log(stepLoss.dataSync()[0]);
      return stepLoss;
    });
    plot();
  }
//plot stuff
    async function plot() {
      let plotData = [];
    
      for (let i = 0; i < trainY.length; i++) {
        plotData.push({ x: trainX[i], y: trainY[i] });
      }
    
      var ctx = document.getElementById("myChart").getContext("2d");
    
      var scatterChart = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Training Data",
              showLine: false,
              data: plotData,
              fill: false
            },
            {
              label: "Y = " + m.dataSync()[0] + "X + " + b.dataSync()[0],
              data: [
                {
                  x: 0,
                  y: b.dataSync()[0]
                },
                {
                  x: 11,
                  y: 11 * m.dataSync()[0] + b.dataSync()[0]
                }
              ],
    
              // Changes this dataset to become a line
              type: "line",
              borderColor: "red",
              fill: false
            }
          ]
        },
        options: {
          animation: false,
          scales: {
              yAxes: [
               {
                  ticks: {
                    max: 20
                  }
                }
              ],
            xAxes: [
              {
                type: "linear",
                position: "bottom"
              }
            ]
          }
        }
      });
    }