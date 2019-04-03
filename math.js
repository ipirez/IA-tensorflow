export async function  findValues(arr,value){
  return await arr.filter((x)=>{
    if(typeof x.type === "object"){
      if(x.type.indexOf(parseInt(value)) !== -1){
        return x
      } 
    }
    else{
      if(x.type == value){
        return x
      }
    }
  })
}
export function sortByShortAges(data){
  return data.sort((a,b)=>{
    if ((a.age_max - a.age_now ) > (b.age_max - b.age_now )) {
      return 1;
    }
    if ((a.age_max - a.age_now ) < (b.age_max - b.age_now )) {
      return -1;
    }
    return 0;
  })
}

export function linealCore(y,x){
    var lr = {};
    var n = y.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;
    var cantidad = y.length;
    var varianzaX = 0.0;
    var varianzaY = 0.0;
    var varianza = 0.0
    var promedioX = 0.0;
    var promedioY = 0.0;

    for (var i = 0; i < n; i++) {
        sum_x += parseFloat(x[i]);
        sum_y += parseFloat(y[i]);
        sum_xy += (parseFloat(x[i])*parseFloat(y[i]));
        sum_xx += (parseFloat(x[i])*parseFloat(x[i]));
        sum_yy += (parseFloat(y[i])*parseFloat(y[i]));
    }

    lr['slope'] = (n*sum_xy - sum_x*sum_y) / (n*sum_xx - sum_x*sum_x);
    lr['intercept'] = (sum_y - lr.slope*sum_x)/n;
    lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy - sum_y*sum_y)),2).toFixed(2);
    lr['p'] = 0;
    
    //
    promedioX = sum_x / cantidad;
    promedioY = sum_y / cantidad;
    
    // Calculo de varianzas
    for (i = 0; i < cantidad; i++) {
      varianzaX = varianzaX + Math.pow(x[i] - promedioX, 2);
      varianzaY = varianzaY + Math.pow(y[i] - promedioY, 2);
      varianza += ((x[i] - promedioX) * (y[i] - promedioY));
    }
    
    // P-value
    var SLP = varianza / varianzaX;
    var SSEF = (varianzaY - SLP * SLP * varianzaX);
    var SSRF = SLP * SLP * varianzaX;
    var MSEF = SSEF / (cantidad - 2);
    var FVAL1 = SSRF/MSEF;
    var Fp = FVAL1 + "";
    var fDesde = 1;
    var fHasta = cantidad - 2;
    var p = Fmt(FishF(FVAL1,fDesde,fHasta));
    if ((FVAL1 + "").indexOf("Infinity") == -1) {
      if ((p + "").indexOf("e") != -1) {
        lr['p'] = "Almost Zero";
      }
      else {  
        lr['p'] = p;
      }
    } 

    return lr;
}

function FishF(f, n1, n2) {
    var x = n2 / (n1 * f + n2)
    if ((n1 % 2) == 0) {
        return StatCom(1 - x, n2, n1 + n2 - 4, n2 - 2) * Math.pow(x, n2 / 2);
    }
    if ((n2 % 2) == 0) {
        return 1 - StatCom(x, n1, n1 + n2 - 4, n1 - 2) * Math.pow(1 - x, n1 / 2);
    }
    var th = Math.atan(Math.sqrt(n1 * f / n2));
    var a = th / (Math.PI / 2);
    var sth = Math.sin(th);
    var cth = Math.cos(th);
    if (n2 > 1) {
        a = a + sth * cth * StatCom(cth * cth, 2, n2 - 3, -1) / (Math.PI / 2);
    }
    if (n1 == 1) {
        return 1 - a;
    }
    var c = 4 * StatCom(sth * sth, n2 + 1, n1 + n2 - 4, n2 - 2) * sth * Math.pow(cth, n2) / Pi;
    if (n2 == 1) {
        return 1 - a + c / 2;
    }
    var k = 2;
    while (k <= (n2 - 1) / 2) {
        c = c * k / (k - .5);
        k = k + 1;
    }
    return 1 - a + c;
}

function StatCom(q, i, j, b) {
    var zz = 1;
    var z = zz;
    var k = i;
    while (k <= j) {
        zz = zz * q * k / (k - b);
        z = z + zz;
        k = k + 2;
    }
    return z
}

/* FMT: Redondea a 4 decimales */
function Fmt(x) {
    var v;
    if (x >= 0) {
      v = '' + (x + 0.00005);
    } else {
      v = '' + (x - 0.00005);
    }
    return v.substring(0, v.indexOf('.') + 5);
}