$(function () {
    $("#submitButton").click(function () {
        if ($("#coffee").val() <= 0) {
            alert("Please enter coffee amount!");
            return false;
        }
        let totalWater = Number($("#coffee").val() * (1000 / 60));
        $("#display").html(parseInt($("#coffee").val() * 2));
        $("#progressbartag").html("Bloom");
        $(".progress-bar").css("width", "12%");
        totalWater -= parseInt($("#coffee").val() * 2);
        let increment = totalWater / 120;
        console.log(increment);
        let i = 0;
        let j = 0;
        
        // The bloom begins, water is 12 percent (two times the ground coffee) and timer begins counting
        let timer = setInterval(function () {
            //Start timer
            $("#timerDisplay").html(doublify(Math.floor((j + 1) / 60)) + ":" + doublify(((j + 1) % 60)));
            j++;
            if (j == 150) {
                clearInterval(timer);
            }
        }, 1000);
        
        // The pour begins 30 seconds later
        setTimeout(function () {
            let counter = setInterval(function () {
                $("#progressbartag").html("Brew");
                $("#display").html(parseInt($("#coffee").val() * 2 + increment * i));
                // Bloom is 12% of total water
                // Map the value of i (0, 120) to percentage (12, 100)
                $(".progress-bar").css("width", parseInt(12 + (i * (88 / 120))) + "%");
                
                // Stop brewing after two minutes of pour
                if (i == 120) {
                    $("#progressbartag").html("Done!");
                    clearInterval(counter);
                }
                i++;
            }, 1000);
        }, 30000);
    });
});

function doublify(data) {
    if (data < 10) {
        return "0" + data;
    } else {
        return data;
    }
}
