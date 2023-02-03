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
  const arrayRows = dataArray.length; // Rows
  const arrayColumn = dataArray[0].length; // Columns

  console.log(dataArray);

  let arrayTemp = [];
  let arrayFinal = [];

  for (let i = 0; i < dataArray.length; i++) {
    for (let j = 0; j < dataArray[i].length; j++) {
      console.log(dataArray[i][j]);
      arrayTemp.push(dataArray[i][j]);
      if (j === dataArray[i].length - 1) {
        console.log('arrayTemp: ', arrayTemp);
        arrayFinal.push(arrayTemp);
        arrayTemp = [];
      }
    }
  }

  console.log('arrayFinal: ', arrayFinal);
  console.log('arrayFinal[0][0]: ', arrayFinal[0][0]);
};

const dataTemp = deletingEmptyText(dataInput);
const dataArray = dataSortColumnArray(dataTemp);
const dataArrayFinal = dataSortRowTempArray(dataArray);
