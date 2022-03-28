// eslint-disable-next-line @typescript-eslint/no-var-requires
const util = require('util');

export const objectInspect = (obj: any) =>
  console.log(
    util.inspect(obj, { showHidden: false, depth: null, colors: true }),
  );
export const timer = (ms: number) =>
  new Promise<void>((res) => setTimeout(res, ms));
