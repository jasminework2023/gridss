export type CalcResult = { id: string; title: string; value: string; [k: string]: any };
let last: CalcResult | null = null;
export const setLastResult = (r: CalcResult) => { last = r; };
export const getLastResult = () => last;
