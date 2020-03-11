const fs = require('fs');

//At the bottom the breedDetailsFormFile function was called with Bombay as the breed and the printOutCatBreed function as second parameter.

const breedDetailsFromFile = function(breed, toRunOnceFinished) {
  console.log('breedDetailsFromFile: Calling readFile...');
  fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
    // CHANGE: Pass data into callback instead of returning it directly
    console.log("In readFile's Callback: it has the data.");

    // ISSUE: Returning from *inner* callback function, not breedDetailsFromFile.
    // Bug Fix: breedDetailsFromFile func would require a if error statement in order to return undefined, if you dont specify then nothing will happen in that instance.
    if (error) toRunOnceFinished(undefined);

    // if no errors, then call the callback func (printOutCatBreed) passing in the data as the argument. 
    if (!error) toRunOnceFinished(data);
  });
};

// CHANGE 1: Moved the console.log into a new function:
// fileContents = data (parameter passed from the breedDetalsFromFile function)
const printOutCatBreed = fileContents => {
  console.log("Return Value: ", fileContents)
};

// CHANGE 2: we're now passing two arguments into breedDetailsFromFile: breed string and a callback function
breedDetailsFromFile("Bombay", printOutCatBreed);

module.exports = breedDetailsFromFile;
;
