var trainX = []
var trainY = []
var m = []
var b = []
function getNumber(){
  let value = dom.getElementsByClass('totalPick').value
  fetch('v1/tensorUpdate/'+value).then(res=>{
    res.json().then(dataObj =>{
      m = tf.variable(tf.scalar(Math.random()));
      b = tf.variable(tf.scalar(Math.random()));
      plot()
    })
  })
}
function trigger(){
  fetch('/v1/tensor/2').then(res=>{
    res.json().then(dataObj =>{
      trainX = dataObj.linearRegression.x
      trainY = dataObj.linearRegression.y
      m = tf.variable(tf.scalar(Math.random()));
      b = tf.variable(tf.scalar(Math.random()));
      plot()
    })
  })
}

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
                    max: 5000
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