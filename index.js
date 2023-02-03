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
  let countColumns = 0;
  for (let i = 0; i < dataArray.length; i++) {
    countColumns++;
  }

  return dataArray;
};

const dataTemp = deletingEmptyText(dataInput);
const dataArray = dataSortColumnArray(dataTemp);
const dataArrayFinal = dataSortRowTempArray(dataArray);

console.log('dataArrayFinal: ', dataArrayFinal);
