var Digs = [0, 0, 0];
var correctCodeInserted = 0;
var incorrectCodeInserted = 0;

var topPos = [-300, 0, 300];
var curTop = [[-300, 0, 300], [-300, 0, 300], [-300, 0, 300]];
var nums = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];
var nextNum = [3, 3, 3];
var prevNum = [9, 9, 9];

var pass = "";

var canBePressed = true;

var correctSound = new Audio('sounds/correct.mp3');
var incorrectSound = new Audio('sounds/incorrect.mp3');

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if (this.responseText == "error")
        {
            alert("Server error, try later.");            
        }
        else
        {
            pass = this.responseText;
        }
    }
};
xmlhttp.open("POST", "connect.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("q=true");

function ScrollNum(curDig)
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

    if (Digs.join('') == pass) 
    {
        curIDs.forEach(Digit => {
            Digit.style.color = "#64FF64";
        });

        correctSound.play();
        correctCodeInserted++;
        document.getElementById('CorrectCodeCounter').innerHTML = correctCodeInserted;
        SendMessage("Correct Code! You logged in.", true);
        canBePressed = false;

        var lockDiv = document.getElementById('lock');
        var unlockButton = document.getElementById('Submit');

        lockDiv.classList.remove('return');
        lockDiv.classList.add('quit');
        unlockButton.classList.add('reload-come');
        unlockButton.classList.remove('reload-back');
    }
    else
    {
        curIDs.forEach(Digit => {
            Digit.style.color = "#FF6464";
        });

        incorrectSound.play();
        incorrectCodeInserted++;
        document.getElementById('IncorrectCodeCounter').innerHTML = incorrectCodeInserted;
        SendMessage("Incorrect Code. Try again.", false);

        setTimeout(function()
        {
            curIDs.forEach(Digit => {
                Digit.style.color = "#FFF";
            });
        }, 300);
    }
}

function Reload()
{
    var curIDs = [
        document.getElementById('D_1_N_0'), document.getElementById('D_2_N_0'), document.getElementById('D_3_N_0'),
        document.getElementById('D_1_N_1'), document.getElementById('D_2_N_1'), document.getElementById('D_3_N_1'),
        document.getElementById('D_1_N_2'), document.getElementById('D_2_N_2'), document.getElementById('D_3_N_2')
    ];
    var unlockButton = document.getElementById('Submit');
    var lockDiv = document.getElementById('lock');

    var beginValues = [1, 1, 1, 0, 0, 0, 9, 9, 9];

    lockDiv.classList.add('return');
    lockDiv.classList.remove('quit');
    unlockButton.classList.add('reload-back');
    unlockButton.classList.remove('reload-come');
    unlockButton.setAttribute("onclick", "CheckIfGood();");
    unlockButton.innerHTML = "Unlock";

    curIDs.forEach(Digit => {
        Digit.style.color = "#FFF";
        Digit.style.opacity = "0";
    });

    setTimeout(function ()
    {
        curTop = [-300, -300, -300, 0, 0, 0, 300, 300, 300];

        for (var i = 0; i < curIDs.length; i++)
        {
            curIDs[i].innerHTML = beginValues[i];
            curIDs[i].style.top = curTop[i] + "px";
        }
    }, 300);

    nextNum = [3, 3, 3];
    prevNum = [9, 9, 9];
    Digs = [0, 0, 0];

    canBePressed = true;
    
    setTimeout(function ()
    {
        curIDs.forEach(Digit => {
            Digit.style.opacity = "1";
            curTop = [[-300, 0, 300], [-300, 0, 300], [-300, 0, 300]];
        });
    }, 600);
}

function SendMessage(msg, ok)
{
    var box = document.getElementById('MessageBox');
    var message = document.getElementById('Message');
    var unlockButton = document.getElementById('Submit');

    message.innerHTML = msg;
    unlockButton.removeAttribute("onclick");
    unlockButton.innerHTML = '<img src="images/loading.gif" width="29px" height="29px"/>';

    box.style.top = "10px";

    setTimeout(function ()
    {
        box.style.top = "-80px";
    }, 2550);

    setTimeout(function ()
    {
        message.innerHTML = "";
        if (ok)
        {
            unlockButton.innerHTML = '<img src="images/ok.png" width="29px" height="29px" align="top"/> Reload';
            unlockButton.setAttribute("onclick", "Reload();");
        }
        else
        {
            unlockButton.setAttribute("onclick", "CheckIfGood();");
            unlockButton.innerHTML = "Unlock";
        }
    }, 3550);
}