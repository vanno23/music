declare module 'colorthief' {
  export default class ColorThief {
    constructor();
    getColor(sourceImage: string | HTMLImageElement, quality?: number): [number, number, number];
    getPalette(sourceImage: string | HTMLImageElement, colorCount?: number, quality?: number): Array<[number, number, number]>;
  }
}
