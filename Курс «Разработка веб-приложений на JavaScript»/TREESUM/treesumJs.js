"use strict"

let array =
    [ 5, 7,
        [ 4, [2], 8, [1,3], 2 ], 
        [ 9, [] ], 
    1, 8];

alert(theeSum(array));

function theeSum (array)
{
    let sum = 0;
    if(array instanceof Array)
    {
        for(let i = 0; i<array.length; i++)
        {
            sum+=theeSum(array[i]);
        }
        return sum;
    }
    return array;
}   

