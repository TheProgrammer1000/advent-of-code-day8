const dataInput = `
30373
25512
65332
33549
35390
`;
const deletingEmptyText = (dataInput) => {
  const dataTemp = dataInput.slice();
  for (let i = 0; i < dataTemp.length; i++) {
    while (dataTemp[i] === '') {
      dataTemp.splice(i, 1);
    }
  }
  return dataTemp;
};

const dataSortColumnArray = (dataTemp) => {
  const data = dataTemp.slice();
  const dataArrayTemp = [data];
  const dataArray = dataArrayTemp[0].split('\n');

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i] === '') {
      dataArray.splice(i, 1);
    }
  }
  return dataArray;
};

const dataSortRowTempArray = (dataArray) => {
  let arrayTemp = [];
  let arrayFinal = [];

  for (let i = 0; i < dataArray.length; i++) {
    for (let j = 0; j < dataArray[i].length; j++) {
      arrayTemp.push(dataArray[i][j]);
      if (j === dataArray[i].length - 1) {
        arrayFinal.push(arrayTemp);
        arrayTemp = [];
      }
    }
  }
  return arrayFinal;
};

const arrayFilterWithString = (dataArray) => {
  const dataArrayTemp = dataArray.slice();
  // const dataArrayFinal = dataArray.slice();

  let arrayFinal = [];
  let arrayRealFinal = [];

  let counter = 0;
  while (counter < 5) {
    for (let i = 0; i < dataArrayTemp.length; i++) {
      if (counter === 0) {
        arrayFinal.push('E');
      } else if (counter === 4) {
        arrayFinal.push('E');
      } else {
        arrayFinal.push(dataArrayTemp[counter][i]);
      }

      if (i === dataArrayTemp.length - 1) {
        arrayRealFinal.push(arrayFinal);
        arrayFinal = [];
        counter++;
      }
    }
  }
  let arrayNewFinal = [];

  for (let i = 0; i < arrayRealFinal.length; i++) {
    arrayRealFinal[i][0] = 'E';
    arrayRealFinal[i][arrayRealFinal.length - 1] = 'E';
  }

  return arrayRealFinal;
};

function playGroundSorted(arrayRealFinal) {
  let arrayNow = [];
  for (let i = 0; i < arrayRealFinal.length; i++) {
    // console.log('arrayRealFinal: ', arrayRealFinal[i]);
    let arrayTemp = [];
    for (let j = 0; j < arrayRealFinal[i].length; j++) {
      if (arrayRealFinal[i][j] !== 'E') {
        arrayTemp.push(arrayRealFinal[i][j]);
      }
    }
    arrayNow.push(arrayTemp);
  }
  return arrayNow;
}

const solotion = (sortedArrayMap, sortedArrayPlayGround) => {
  const sortedArrayMapTemp = sortedArrayMap.slice();
  const sortedArrayPlayGroundTemp = sortedArrayPlayGround.slice();

  console.log('sortedArrayMapTemp: ', sortedArrayMapTemp);
  console.log('sortedArrayPlayGroundTemp', sortedArrayPlayGroundTemp);
};

const dataTemp = deletingEmptyText(dataInput);
const dataArray = dataSortColumnArray(dataTemp); // Sortings
const dataArrayFinal = dataSortRowTempArray(dataArray);

const SortedArrayMap = arrayFilterWithString(dataArrayFinal);
const SortedArrayPlayGround = playGroundSorted(SortedArrayMap);

solotion(SortedArrayMap, SortedArrayPlayGround);
