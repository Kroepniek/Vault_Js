var Digs = [0, 0, 0];

var topPos = [-300, 0, 300];
var curTop = [[-300, 0, 300], [-300, 0, 300], [-300, 0, 300]];
var nums = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];
var nextNum = [3, 3, 3];
var prevNum = [9, 9, 9];

var canBePressed = true;

function ScrollNum(curDig, dir)
{
    if (canBePressed) 
    {
        canBePressed = false;

        var curIDs = [
            document.getElementById('D_' + curDig + '_N_0'), document.getElementById('D_' + curDig + '_N_1'), document.getElementById('D_' + curDig + '_N_2')
        ];

        if (event.clientY > 220 && event.clientY < 370)
        {
            for (var i = 0; i < 3; i++)
            {
                var newTopIndx = topPos.indexOf(curTop[curDig - 1][i]) + 1;
                if (newTopIndx > topPos.length - 1) 
                {
                    newTopIndx = 0;
                    curIDs[i].innerHTML = nums[nextNum[curDig - 1]];
                    nextNum[curDig - 1]++;
                    nextNum[curDig - 1] = (nextNum[curDig - 1] == 10 ? 0 : nextNum[curDig - 1]);
                    prevNum[curDig - 1]++;
                    prevNum[curDig - 1] = (prevNum[curDig - 1] == 10 ? 0 : prevNum[curDig - 1]);
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
        }
        else if (event.clientY > 370 && event.clientY < 520)
        {
            for (var i = 0; i < 3; i++)
            {
                var newTopIndx = topPos.indexOf(curTop[curDig - 1][i]) - 1;
                if (newTopIndx < 0) 
                {
                    newTopIndx = topPos.length - 1;
                    curIDs[i].innerHTML = nums[prevNum[curDig - 1]];
                    prevNum[curDig - 1]--;
                    prevNum[curDig - 1] = (prevNum[curDig - 1] == -1 ? 9 : prevNum[curDig - 1]);
                    nextNum[curDig - 1]--;
                    nextNum[curDig - 1] = (nextNum[curDig - 1] == -1 ? 9 : nextNum[curDig - 1]);
                }

                if (curTop[curDig - 1][i] == -300) 
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
            Digs[curDig - 1]--;
            Digs[curDig - 1] = (Digs[curDig - 1] <= -1 ? 9 : Digs[curDig - 1]);
        }

        setTimeout(function ()
        {
            curIDs[0].style.display = "block";
            curIDs[1].style.display = "block";
            curIDs[2].style.display = "block";

            canBePressed = true;
        }, 250);
    }
}

function CheckIfGood() 
{
    var curIDs = [
        document.getElementById('D_1_N_0'), document.getElementById('D_2_N_0'), document.getElementById('D_3_N_0'),
        document.getElementById('D_1_N_1'), document.getElementById('D_2_N_1'), document.getElementById('D_3_N_1'),
        document.getElementById('D_1_N_2'), document.getElementById('D_2_N_2'), document.getElementById('D_3_N_2')
    ];

    if (Digs.join('') == correctCode) 
    {
        curIDs.forEach(Digit => {
            Digit.style.color = "#64FF64";
        });
    }
    else
    {
        curIDs.forEach(Digit => {
            Digit.style.color = "#FF6464";
        });
    }

    setTimeout(function ()
    {
        curIDs.forEach(Digit => {
            Digit.style.color = "#FFF";
        });
    }, 300);
}