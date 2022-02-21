const util = require('util');

export const objectInspect = (obj: any) => console.log(util.inspect(obj, {showHidden: false, depth: null, colors: true}))