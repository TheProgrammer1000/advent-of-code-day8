const dataInput = `
30373
25512
65332
33549
35390
`;

let finalDoesExist = false;

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
      arrayTemp.push(Number(dataArray[i][j]));
      if (j === dataArray[i].length - 1) {
        arrayFinal.push(arrayTemp);
        arrayTemp = [];
      }
    }
  }

  // console.log('arrayFinal: ', arrayFinal); // Denna är rätt!
  return arrayFinal;
};

const arrayFilterWithString = (dataArray) => {
  const dataArrayTemp = dataArray.slice();
  for (let i = 0; i < dataArrayTemp[0].length; i++) {
    // E på ovanför och under!
    dataArrayTemp[0][i] = 'E';
    dataArrayTemp[dataArrayTemp.length - 1][i] = 'E';
  }

  for (let i = 0; i < dataArrayTemp.length; i++) {
    dataArrayTemp[i][0] = 'E';
    dataArrayTemp[i][dataArrayTemp[0].length - 1] = 'E';
  }
  return dataArrayTemp;
};

function playGroundSorted(arrayRealFinal) {
  let arrayNow = [];
  for (let i = 0; i < arrayRealFinal.length; i++) {
    // console.log('arrayRealFinal: ', arrayRealFinal[i]);
    let arrayTemp = [];
    for (let j = 0; j < arrayRealFinal[i].length; j++) {
      if (arrayRealFinal[i][j] !== 'E') {
        arrayTemp.push(arrayRealFinal[i][j]);
      } else {
        arrayTemp.push(''); // Kan ta bort
      }
    }
    arrayNow.push(arrayTemp);
  }
  return arrayNow;
}

const solotion = (dataArrayFinal, sortedArrayMap) => {
  const sortedArrayMapTemp = sortedArrayMap.slice();
  // console.log('dataArrayFinal: ', dataArrayFinal);
  // console.log('sortedArrayMapTemp: ', sortedArrayMapTemp);

  for (let i = 0; i < sortedArrayMapTemp.length; i++) {
    // Row
    for (let j = 0; j < sortedArrayMapTemp[i].length; j++) {
      if (sortedArrayMap[i][j] !== '') {
        // Rätt!!!
        // console.log('sortedArrayMap[i][j]: ', sortedArrayMap[i][j]);
        Calculation(i, j, sortedArrayMap[i][j], dataArrayFinal); // Calculation för varje index!
      }
    }
  }
};

function WholeRowSearch(backwardArray, indexesObject) {
  for (let i = 0; i < backwardArray.length; i++) {
    if (
      backwardArray[indexesObject.rowIndex][i] >=
        backwardArray[indexesObject.rowIndex][indexesObject.columnIndex] &&
      backwardArray[indexesObject.rowIndex][i] !==
        backwardArray[indexesObject.rowIndex][indexesObject.columnIndex] &&
      i === indexesObject.rowIndex
    ) {
      return 0;
    }
  }
  return 1;
}

function SearchingWholeColumn(mapArray, arrayIndexes) {
  for (let i = 0; i < mapArray.length; i++) {
    if (
      mapArray[i][arrayIndexes.columnIndex] >=
        mapArray[arrayIndexes.rowIndex][arrayIndexes.columnIndex] &&
      mapArray[i][arrayIndexes.columnIndex] !==
        mapArray[arrayIndexes.rowIndex][arrayIndexes.columnIndex] &&
      i === arrayIndexes.rowIndex
    ) {
      return 0;
    }
  }
  return 1;
}

let totalResult = 0;

function Calculation(rowIndex, columnIndex, value, mapArray) {
  // console.log('value: ', value);
  arrayIndexes = {
    rowIndex: rowIndex,
    columnIndex: columnIndex,
    value: value
  };

  let searchTotal = 0;

  // ROW, WHOLE Row!!!!
  searchTotal += WholeRowSearch(mapArray, arrayIndexes);
  searchTotal += SearchingWholeColumn(
    // KLAR!!!!
    mapArray,
    arrayIndexes
  );

  if (searchTotal > 0) {
    totalResult += 1;
  }
  //----------------------------------------------------------------------------------------------
}

const dataTemp = deletingEmptyText(dataInput);
const dataArray = dataSortColumnArray(dataTemp); // Sortings
const dataArrayFinal = dataSortRowTempArray(dataArray);
const dataArrayFinalTemp = dataSortRowTempArray(dataArray);

const SortedArrayMap = arrayFilterWithString(dataArrayFinalTemp);

const SortedArrayPlayGround = playGroundSorted(SortedArrayMap); // This one needs help!
solotion(dataArrayFinal, SortedArrayPlayGround);
