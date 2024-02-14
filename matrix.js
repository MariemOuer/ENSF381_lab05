function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; 
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); 
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; 
    if (typeof dataArray === 'string') {
        let paragraph = document.createElement('p');
        paragraph.textContent = dataArray;
        container.appendChild(paragraph);
        return;
    }
    let table = document.createElement('table');
    let caption = table.createCaption();
    caption.textContent = title;
    for (let i = 0; i < dataArray.length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < dataArray[i].length; j++) {
            let cell = document.createElement('td');
            cell.textContent = dataArray[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);
};


function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    let result = [1, 2, 3, 4, 5, 6, 7, 8];
    switch(operation) {
        case 'add':
            result = addMatrices(matrix1, matrix2);
            break;
        case 'subtract':
            result = subtractMatrices(matrix1, matrix2);
            break;
        case 'multiply':
            result = multiplyMatrices(matrix1, matrix2);
            break;
        default:
            alert("Error");
    }
    if (result !== null) {
        showResult2D('The Result', 'matrix3', result);
    } else {
        alert("Error: Operation is not performed due invalid dimentions.");
    }

}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); 
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculations added
function addMatrices(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.log("Error, unable to complete addition");
        return null;
    }

    return matrix1.map((row, i) => 
        row.map((value, j) => value + matrix2[i][j])
    );
}

const subtractMatrices = function (matrix1, matrix2) { 
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        console.log("Error, unable to complete subtraction");
        return null;
    }

    return matrix1.map((row, i) =>
        row.map((value, j) => value - matrix2[i][j])
    );
}
const multiplyMatrices = (matrix1, matrix2) => { 
    if (matrix1[0].length !== matrix2.length) {
        console.log("Error, unable to complete multiplication");
        return null;
    }

    return matrix1.map((row, i) => {
        return matrix2[0].map((_, j) => {
            let sum = 0;
            for (let k = 0; k < matrix1[0].length; k++) {
                sum += row[k] * matrix2[k][j];
            }
            return sum;
        });
    });
}