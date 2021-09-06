/// <reference types="react-scripts" />
interface DrizzleOptions {
    contracts : array[],
    web3: {
      fallback : {
        type : string,
        url: string
      }
    }
}