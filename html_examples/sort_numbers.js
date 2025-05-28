function insertionSort(numbers) {
    for(let i = 1; i < numbers.length; i++) {
        j = i-1
        ele = numbers[i]
        while(j >= 0 && numbers[j] > ele) {
            numbers[j+1] = numbers[j]
            j--
        }
        numbers[j+1] = ele
    }
}

function sortNumbers() {
    inputString = idNumbers.value.trim()
    stringArray = inputString.split(' ')
    // We got an Array of Strings
    
    numbers = [] // Empty array to store the strings in stringArray as numbers/integers
    
    for (let i = 0; i < stringArray.length; i++) {
        numbers.push(parseInt(stringArray[i]))
    }

    insertionSort(numbers) // Call by Reference
    outputStr = numbers.join(' ');
    /*
    outputString = ""
    for(let i = 0; i < numbers.length; i++)
        outputString += numbers[i]
    */
    idSortedNumbers.innerHTML = outputStr
}

function sortNumbers2() {
    var numbers = idNumbers.value.split(',').map(Number);
}

