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

  console.log('sortedArrayMapTemp: ', sortedArrayMapTemp);
  console.log('sortedArrayPlayGroundTemp', sortedArrayPlayGroundTemp);

  for (let i = 0; i < sortedArrayMapTemp.length; i++) {
    // Row
    isValue = false;
    for (let j = 0; j < sortedArrayMapTemp[i].length; j++) {
      console.log(
        'sortedArrayPlayGroundTemp[i][j]: ',
        sortedArrayMapTemp[i][j]
      );
      if (sortedArrayPlayGroundTemp[i][j] !== '') {
        console.log('sant');
        Calculation(i, j, sortedArrayPlayGroundTemp[i][j], sortedArrayMapTemp);
        isValue = true;
        break;
      }
    }
    if (isValue) {
      break;
    }
  }
};

function Calculation(rowIndex, columnIndex, value, mapArray) {
  console.log('rowIndex: ', rowIndex);
  console.log('columnIndex: ', columnIndex);
  console.log('value: ', value);

  arrayIndexes = {
    rowIndex: rowIndex,
    columnIndex: columnIndex,
    value: value
  };

  console.log('arrayIndexes: ', arrayIndexes);

  console.log('mapArray: ', mapArray); // map array

  /**
   *  Kolla hela rowen alltså alla index på rowen samt valuet där, detta blir då horizontellt
   *  Kolla sedan Verticalt uppifrån och ner och detta gör jag med vilket row index den har och tar alla på den columnen
   */
  // for (let i = 0; i < array.length; i++) {
  //   const element = array[i];
  // }
  // console.log(mapArray[rowIndex][columnIndex]);

  for (let i = 0; i < mapArray.length; i++) {
    // Denna rowen
    // if(arrayIndexes[0])
    if (arrayIndexes.rowIndex === i) {
      for (let j = 0; j < mapArray[i].length; j++) {
        if (arrayIndexes.columnIndex === j) {
          let counter = 0;
          let isGreater = true;
          while (counter < mapArray.length) {
            console.log('mapArray[i][j]: ', mapArray[i][j]);
            console.log('mapArray[i][counter]: ', mapArray[i][counter]);
            if (mapArray[i][j] > mapArray[i][counter]) {
              isGreater = false;
            }
            counter++;
          }
        }
      }
    }

    // for (let j = 0; j < mapArray[i].length; j++) {
    // }
  }
}

function isGreater() {}

const dataTemp = deletingEmptyText(dataInput);
const dataArray = dataSortColumnArray(dataTemp); // Sortings
const dataArrayFinal = dataSortRowTempArray(dataArray);

const SortedArrayMap = arrayFilterWithString(dataArrayFinal);
const SortedArrayPlayGround = playGroundSorted(SortedArrayMap);

solotion(dataArrayFinal, SortedArrayPlayGround);
