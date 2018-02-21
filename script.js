$(function () {
    var timer, counter, i, j, offset, tempOffset;
    var isNavbarExpanded = false;
    $("#navbarToggler").click(function () {
        offset = isNavbarExpanded ? 120 : -120;
        isNavbarExpanded = !isNavbarExpanded;
        $("html, body").animate({
            scrollTop: ($(document).scrollTop() + offset)
        }, 300);
    });

    $("#submitButton").click(function () {
        if ($("#coffee").val() <= 5) {
            alert("Please enter more than 5 grams");
            return false;
        }

        if ($("#coffee").val() >= 150) {
            alert("That is too much coffee!");
            return false;
        }
        let totalWater = Number($("#coffee").val() * (1000 / 60));
        $("#screen").show();
        $("#timerDisplay").html("00:00");

        // Clear all timers and reset all counting variables to start again.
        clearInterval(timer);
        clearInterval(counter);
        i = 0;
        j = 0;
        $("#display").html(parseInt($("#coffee").val() * 2));
        $("#progressbartag").html("Bloom");
        $(".progress").show();
        $(".progress-bar").css("width", "12%");
        totalWater -= parseInt($("#coffee").val() * 2);
        let increment = totalWater / 120;
        $("html, body").animate({
            scrollTop: $(document).height()
        }, 1000);
        // The bloom begins, water is 12 percent (two times the ground coffee) and timer begins counting
        timer = setInterval(function () {
            //Start timer
            $("#timerDisplay").html(doublify(Math.floor((j / 60)) + ":" + doublify(j % 60)));
            if (j == 150) {
                clearInterval(timer);
            }
            j++;
        }, 1000);

        // The pour begins 30 seconds later
        setTimeout(function () {
            counter = setInterval(function () {
                $("#progressbartag").html("Pour");
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
        }, 29000);
    });
});

function doublify(data) {
    if (data < 10) {
        return "0" + data;
    } else {
        return data;
    }
}
