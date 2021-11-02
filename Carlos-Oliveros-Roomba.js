/* CARLOS OLIVEROS - ROOMBA INTERVIEW ASSIGNMENT 
-- Takes in input file of coordinates. Marks grid limit, Roomba starting position, and takes in location of trash
    through (X,Y) coordinates
    ** IMPORTANT ** to insert Test file, MUST change File Path in line: var array = fs.readFileSync"...." line: 134
-- Output:
    - Roomba starting position
    - Trash positions
    - Moving directions
    - total number of spots cleaned
    - rooba position while moving
==============================================================================================*/


// const trash = ["2,2", "3,4", "5,5", "5,4", "1,1"];
/* -------GET initial DATA FROM INPUT FILE -----------------*/
const inputArraycoords = inputFiletoArray();                    // Parse data from input file and insert in an array.

const gridLimits = getCoordinates(inputArraycoords[0]);  
const maxX = gridLimits[0];    
const maxY = gridLimits[1];                  // grid limits from first input value from file.
const initPosition = getCoordinates(inputArraycoords[1]);      // get initial position of Roomba from second input value.
                                                              // calls custom function getCoordinates to transform string to array and get X/Y coord.

// roomba has X counter and Y counter to track postion coordinates.
let Xr =initPosition[0];
let Yr =initPosition[1];

let trashSpots=[]
let trashCount = 0;                                             // store trash spots that Roomba also passes through
let alreadyCleaned=[];                                          // Store cleaned coords that Roomba has cleaned in this Array, so it only counts ONCE.



/* ---- Look for trash coordinates in input. -*/

var regExp = /[a-zA-Z]/g;                                    // filter out values without letters.
for (let i = 2; i < inputArraycoords.length; i++) {         // for the whole file, if not the first 2 rows, or letters, add to array trashSpots

    if(!regExp.test(inputArraycoords[i])){
        trashSpots.push(inputArraycoords[i]);
    }
}

console.log("Roomba start at: " + Xr +" , "+ Yr);
console.log("Trash Spots are at: " + trashSpots);

/* ---- Lfind driving directons in input. -*/
// find driving directons
let dirArray = ["directions"];
inputArraycoords.forEach(x => {                                 // Find row in input Array with N-S-E-W
if(regExp.test(x)){
    dirArray = x;
}
    });

const moveBymove=dirArray.split("");                           // Turn string with Cardinal directions into an ARRAY.
console.log("Roomba will move in the following directions: "+ moveBymove);

/* ---- Look for trash coordinates in input.
>> move the roomba and record positions
>> everytime the roomba matches a coordinate, count it.
-*/

// ******** MOVE ROOMBA **********************

    moveBymove.forEach(m => {                                               // parse through each NSEW direcion, add onto Roomba postion counter
           
            if (m == 'N'){  // if N add 1 to Y
                if (Yr + 1*1 > maxY){                                      // Make sure Roomba doesnt move past Grid limits
                    Yr= Yr *1;                                             // If direction causes roomba to exceed limit, dont move, move to next direction input.
                    console.log("Roomba can't move past grid limits! Moving to next direction");
                } else{
                    Yr++;
                    console.log("Roomba Position: ("+ Xr + " , "+ Yr+" )");
                }
            }
            if (m == 'S'){  // S subtract 1 to Y                        
                if (Yr - 1*1 < 0){                                      // Make sure Roomba doesnt move past Grid limits
                    Yr= Yr *1;                                          // If direction causes roomba to exceed limit, dont move, move to next direction input.
                    console.log("Roomba can't move past grid limits! Moving to next direction");
                } else{
                Yr--;
                }
                console.log("Roomba Position: ("+ Xr + " , "+ Yr+" )");
            }
            if (m == 'E'){   //  E add 1 too X
                if (Xr + 1*1 > maxX){                                       // Make sure Roomba doesnt move past Grid limits
                    Xr= Xr *1;                                              // If direction causes roomba to exceed limit, dont move, move to next direction input.
                    console.log("Roomba can't move past grid limits! Moving to next direction");
                } else{
                Xr++;
               console.log("Roomba Position: ("+ Xr + " , "+ Yr+" )");
                }
           }
           if (m == 'W'){   // if W subtract 1 to X
            if (Xr - 1*1 < 0){                                               // Make sure Roomba doesnt move past Grid limits
                Xr= Xr *1;                                                     // If direction causes roomba to exceed limit, dont move, move to next direction input.
                console.log("Roomba can't move past grid limits! Moving to next direction");
            } else{
               Xr--;
               console.log("Roomba Position: ("+ Xr + " , "+ Yr+" )");
            }
           }
    
           let currentPos= Xr+" "+Yr;
           if (trashSpots.includes(currentPos)){                               // If current Position is found in known trash spots...
            console.log("Trash Cleaned in : ("+ Xr + " , "+ Yr+" ) !");
            if (!alreadyCleaned.includes(currentPos)){                          //if havent went through this spot, add to array and count
                alreadyCleaned.push(currentPos)
                trashCount++;
            }
           }

    });

    console.log("Total cleaned: "+ trashCount);                          // output total spots cleaned by driving directions



/* ---- External Custom function called: ------*/

// get first coordinate from list
function getCoordinates (coord){                                                    //take in string, turn into an array/

    const trashCoord = coord.split(" ");                                            // X Y --> ["X","Y"]
    
    return trashCoord;                                                              // return array
}


function inputFiletoArray(){                                                        // PARSE input File and turn into an ARRAY.

    var fs = require('fs');
    var array = fs.readFileSync('/Users/carlos.oliveros/Downloads/fileTrey.txt').toString().split("\n"); // *** EDIT PATH ***
    for(i in array) {
      console.log(array[i]);
    }
    return array;
}
