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