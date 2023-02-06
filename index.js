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
  console.log('dataArrayFinal: ', dataArrayFinal);

  for (let i = 0; i < sortedArrayMapTemp.length; i++) {
    // Row
    for (let j = 0; j < sortedArrayMapTemp[i].length; j++) {
      if (sortedArrayMap[i][j] !== '') {
        // console.log('sortedArrayMap[i][j]: ', sortedArrayMap[i][j]);
        Calculation(i, j, sortedArrayMap[i][j], dataArrayFinal); // Calculation för varje index!
      }
    }
  }
};

function isBackwardGreater(indexLengthBackward, array, valueNow) {
  // Vänster om en rad!
  let isGreater = false;
  for (let i = 0; i < indexLengthBackward; i++) {
    if (array[i] >= valueNow) {
      isGreater = true;
    }
  }
  if (isGreater === true) {
    return 0;
  } else {
    return 1;
  }
}

function SearchingWholeRow(arrayIndexes, mapArray) {
  console.log('mapArray: ', mapArray);
  // console.log('arrayIndexes: ', arrayIndexes);
  for (let i = 0; i < mapArray.length; i++) {
    // console.log('mapArray[i]: ', mapArray[i]);
    for (let j = 0; j < mapArray[i].length; j++) {
      if (mapArray[i][j] !== 'E') {
        // console.log('mapArray[i][j]: ', mapArray[i][j]);
        RowBackwardsLoop(mapArray, arrayIndexes);
      }
    }
  }
}

function RowBackwardsLoop(backwardArray, indexesObject) {
  console.log('backwardArray: ', backwardArray);
  console.log('indexesObject: ', indexesObject);
}

function SearchingWholeColumn(arrayIndexes, mapArray) {
  // Column 1 Backward
  let counterTotal = 0;
  let counterColumn = 0;

  for (let i = 0; i < mapArray.length; i++) {
    // Column
    counterColumn++;
  }

  let arrayBackward = [];
  let arrayForward = [];
  for (let i = 0; i < mapArray.length; i++) {
    if (i === arrayIndexes.rowIndex) {
      counterTotal += ColumnBackward(
        // Column Bakåt
        mapArray[arrayIndexes.rowIndex][arrayIndexes.columnIndex],
        arrayBackward
      );
    } else if (i < arrayIndexes.rowIndex) {
      arrayBackward.push(mapArray[i][arrayIndexes.columnIndex]);
    } else {
      arrayForward.push(mapArray[i][arrayIndexes.columnIndex]);
    }
  }
  counterTotal += ColumnForward(
    // Column forward
    // Column Framåt
    arrayForward,
    mapArray[arrayIndexes.rowIndex][arrayIndexes.columnIndex]
  );

  return counterTotal;
}

function ColumnForward(arrayForward, value) {
  let isGreater = false;
  for (let i = 0; i < arrayForward.length; i++) {
    if (arrayForward[i] >= value) {
      isGreater = true;
    }
  }
  if (isGreater === false) {
    return 1;
  } else {
    return 0;
  }
}

function ColumnBackward(theFinalValue, backWardArray) {
  // console.log('backWardArray: ', backWardArray);
  // console.log('theFinalValue: ', theFinalValue);

  let isGreater = false;
  for (let i = 0; i < backWardArray.length; i++) {
    if (backWardArray[i] >= theFinalValue) {
      isGreater = true;
    }
  }
  if (isGreater === false) {
    return 1;
  } else {
    return 0;
  }
}

let counterHowMany = 0;

let counterFinal = 0;
function Calculation(rowIndex, columnIndex, value, mapArray) {
  // console.log('value: ', value);

  let RowValue = 0;
  let ColumnValue = 0;

  arrayIndexes = {
    rowIndex: rowIndex,
    columnIndex: columnIndex,
    value: value
  };

  // ROW, WHOLE Row!!!!
  RowValue += SearchingWholeRow(arrayIndexes, mapArray);
  ColumnValue += SearchingWholeColumn(arrayIndexes, mapArray);

  // console.log('RowValue: ', RowValue);
  // console.log('ColumnValue: ', ColumnValue);

  if (RowValue > 0 || ColumnValue > 0) {
    counterHowMany += 1;
    // console.log('SAAAAANNNNNTTTT ADDDDEEERRRRAAAAA!');
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

// console.log('counterHowMany: ', counterHowMany); // RÄTT!!!
// console.log('SortedArrayMap: ', SortedArrayMap); // Gör en counter här som räknar hur månge E som finns! addera detta sedan med counterHowMany!

let counter = 0;
for (let i = 0; i < SortedArrayMap.length; i++) {
  for (let j = 0; j < SortedArrayMap[i].length; j++) {
    if (SortedArrayMap[i][j] === 'E') {
      counter++;
    }
  }
}
// console.log('SortedArrayMap: ', SortedArrayMap);

const RealTotal = counterHowMany + counter;
// console.log('RealTotal: ', RealTotal);
