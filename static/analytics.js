// Dominic Cerquetti, Magfest ubersystem, Aug 2012
// show some stats about our registration numbers in neato google charts form.

google.load("visualization", "1", {packages:["corechart", "table"]});
google.setOnLoadCallback(drawChart);

function drawChart() {

    // -------------------------------------
    // scrub the data
    // -------------------------------------

    // the database returns values in the future of the current magfest
    // as the same attendance. we need to remove those values or else
    // we'll get a straight line to the right from today's date onwards

    // loop over it backwards, stop when we hit an attendance number that is
    // not zero
    var newest_magfest_index = attendance_data[0].length - 1;
    var current_total = -1;
    for (var day = attendance_data.length-1; day >= 0; day--)
    {
        var total_attendance = attendance_data[day][newest_magfest_index]

        if (current_total == -1)
        {
            current_total = total_attendance;
            continue;
        }


        if (total_attendance != current_total)
            break;

        // it's unchanged, so remove this value and keep searching backwards
        attendance_data[day][newest_magfest_index] = null; // total_attendance
    }

    // -------------------------------------
    // looking good. now, render the data
    // -------------------------------------

    var data = google.visualization.arrayToDataTable(attendance_data);
	
	// draw the graph
    var chart = new google.visualization.LineChart(document.getElementById('graph'));
    chart.draw(
        data,
        {
            height: 600,
            title: 'Magfest attendance by year [days til start of magfest]'
        }
    );
	
	// draw the table breakdown below it
	var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(
		data, 
		{
			showRowNumber: false
		}
	);
}

