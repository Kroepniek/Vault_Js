var Digs = [0, 0, 0];
var correctCode = "513";

var topPos = [-300, 0, 300];
var curTop = [[-300, 0, 300], [-300, 0, 300], [-300, 0, 300]];
var nums = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];
var nextNum = [3, 3, 3];

var canBePressed = true;

function ScrollNum(curDig) 
{
    if (canBePressed) 
    {
        canBePressed = false;

        var curIDs = [
            document.getElementById('D_' + curDig + '_N_0'), document.getElementById('D_' + curDig + '_N_1'), document.getElementById('D_' + curDig + '_N_2')
        ];
        for (var i = 0; i < 3; i++) {
            var newTopIndx = topPos.indexOf(curTop[curDig - 1][i]) + 1;
            if (newTopIndx > topPos.length - 1) 
            {
                newTopIndx = 0;
                curIDs[i].innerHTML = nums[nextNum[curDig - 1]];
                nextNum[curDig - 1]++;
                nextNum[curDig - 1] = (nextNum[curDig - 1] == 10 ? 0 : nextNum[curDig - 1]);
            }

            if (curTop[curDig - 1][i] == 300) 
            {
                curIDs[i].style.display = "none";
            }
            else 
            {
                curIDs[i].style.display = "block";
            }
            curIDs[i].style.top = topPos[newTopIndx] + "px";
            curTop[curDig - 1][i] = topPos[newTopIndx];
        }

        Digs[curDig - 1]++;
        Digs[curDig - 1] = (Digs[curDig - 1] >= 10 ? 0 : Digs[curDig - 1]);

        console.log(Digs.join(''));

        setTimeout(function () {
            curIDs[0].style.display = "block";
            curIDs[1].style.display = "block";
            curIDs[2].style.display = "block";

            canBePressed = true;
            CheckIfGood();
        }, 300);
    }
}

function CheckIfGood() 
{
    if (Digs.join('') == correctCode) 
    {
        alert("ok");
    }
}