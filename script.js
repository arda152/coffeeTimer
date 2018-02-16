$(function() {
    $("#submitButton").click(function(){
        let totalWater = Number($("#coffee").val() * (1000 / 60));
        $("#display").html("You need " + parseInt($("#coffee").val() * 2) + " grams of water.");
        totalWater -= parseInt($("#coffee").val() * 2);
        let increment = totalWater / 120;
        console.log(increment);
        let i = 0;
        let j = 0;
        let timer = setInterval(function(){
            $("#timerDisplay").html(doublify(Math.floor(j / 60)) + ":" + doublify((j % 60)));
            console.log(doublify(Math.floor(j / 60)) + ":" + doublify((j % 60)));
            j++;
            if (j == 180)
            {
                clearInterval(timer);
            }
        }, 1000);
        setTimeout(function() {
            let counter = setInterval(function(){
            $("#display").html("You need " + parseInt(parseInt($("#coffee").val() * 2) + parseInt(increment * i)) + " grams of water.");
            if (i == 120)
            {
                clearInterval(counter);
            }
            i++;
        }, 1000);}, 30000);
    });
});

function doublify(data)
{
    if (data < 10)
        {
            return "0" + data;
        }
    else
        {
            return data;
        }
}
