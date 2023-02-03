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
        arrayFinal.push(Number(dataArrayTemp[counter][i]));
      }

      if (i === dataArrayTemp.length - 1) {
        arrayRealFinal.push(arrayFinal);
        arrayFinal = [];
        counter++;
      }
    }
  }

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
      } else {
        arrayTemp.push(''); // Kan ta bort
      }
    }
    arrayNow.push(arrayTemp);
  }
  return arrayNow;
}

const solotion = (sortedArrayMap, sortedArrayPlayGround) => {
  const sortedArrayMapTemp = sortedArrayMap.slice();
  const sortedArrayPlayGroundTemp = sortedArrayPlayGround.slice();

  for (let i = 0; i < sortedArrayMapTemp.length; i++) {
    // Row
    let isValue = false;
    for (let j = 0; j < sortedArrayMapTemp[i].length; j++) {
      console.log(
        'sortedArrayPlayGroundTemp[i][j]: ',
        typeof sortedArrayPlayGroundTemp[i][j]
      );
      if (sortedArrayPlayGroundTemp[i][j] !== '') {
        // console.log(
        //   'sortedArrayPlayGroundTemp[i][j]: ',
        //   sortedArrayPlayGroundTemp[i][j]
        // );
        Calculation(i, j, sortedArrayPlayGroundTemp[i][j], sortedArrayMapTemp); // Calculation för varje index!
      }
    }
  }
};

function isBackwardGreater(indexLengthBackward, array, valueNow) {
  // Vänster om en rad!
  // console.log('indexLengthBackward: ', indexLengthBackward - 1); // Korrekt
  let isGreater = false;
  for (let i = 0; i < indexLengthBackward; i++) {
    if (array[i] >= valueNow) {
      isGreater = true;
    }
    // console.log('valueNow: ', valueNow);
    // console.log('array[i]: ', array[i]);
  }
  if (isGreater === true) {
    return 0;
  } else {
    return 1;
  }
}

function SearchingWholeRow(arrayIndexes, mapArray) {
  let countSum = 0;

  // console.log(
  //   'mapArray[arrayIndexes.rowIndex][arrayIndexes.columnIndex]: ',
  //   mapArray[arrayIndexes.rowIndex][arrayIndexes.columnIndex]
  // );

  for (let i = 0; i < mapArray.length; i++) {
    if (arrayIndexes.rowIndex === i) {
      for (let j = 0; j < mapArray[i].length; j++) {
        if (arrayIndexes.columnIndex === j) {
          // Kollar att den value som finns är det rätta
          let counter = 0;
          let isGreater = false;
          while (counter < mapArray.length) {
            // Här loppar igenom hela rowen!
            if (counter === j) {
              countSum += isBackwardGreater(
                counter,
                mapArray[i],
                mapArray[i][j]
              );
              // console.log('countSum RÄTT INGE NULL: ', countSum);
              // console.log('countSum HÄÄÄÄÄÄR: ', countSum);
            } else if (counter > j) {
              if (
                mapArray[i][counter] >=
                mapArray[arrayIndexes.rowIndex][arrayIndexes.columnIndex]
              ) {
                // Höger om raden
                isGreater = true;
                break;
              }
            }
            counter++;
          }
          if (isGreater === true) {
            // console.log('Finns inte något på raden! ');
          } else {
            // console.log('Finns något på raden HÄÄÄÄR! RÄÄÄÄTTT');
            countSum += 1;
            // console.log('countSum: ', countSum);
          }
        }
      }
    }
  }
  // console.log('counterSum', countSum);
  return countSum;
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

const SortedArrayMap = arrayFilterWithString(dataArrayFinal);

const SortedArrayPlayGround = playGroundSorted(SortedArrayMap);

solotion(dataArrayFinal, SortedArrayPlayGround, SortedArrayPlayGround);

console.log('counterHowMany: ', counterHowMany); // RÄTT!!!
console.log('SortedArrayMap: ', SortedArrayMap); // Gör en counter här som räknar hur månge E som finns! addera detta sedan med counterHowMany!

let counter = 0;
for (let i = 0; i < SortedArrayMap.length; i++) {
  for (let j = 0; j < SortedArrayMap[i].length; j++) {
    if (SortedArrayMap[i][j] === 'E') {
      counter++;
    }
  }
}

const RealTotal = counterHowMany + counter;
console.log('RealTotal: ', RealTotal);
