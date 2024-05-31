export const MAXIMUM_AGE = 120;

// rmd starts from 76,
const arr = 
[28.2,27.1,26.1,25.1,24.2,23.2,22.2,21.2,20.3,19.4,18.5,17.5,16.6,15.7,14.8,14.1,13.2,12.4,11.6,10.9,10.1,9.5,8.8,8.2,7.6,7.0,6.5,6.0,5.6,5.2,4.7,4.4,4.1,3.7,3.5,3.3,3.1,2.9,2.7,2.6,2.4,2.3,2.2,2.1,2.0,1.8,1.5,1.2];

const map = new Map();
arr.forEach((value, index) => {
      map.set(76 + index, value);
    });

export const RMD_MAP = map;