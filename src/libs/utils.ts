const util = require('util');

export function inspectorMode(obj: any){
  console.log(util.inspect(obj, false, null, true));
}