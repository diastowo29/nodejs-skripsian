setInterval(function() {
	console.log('hai')

	$.ajax({
        url: '/lamp/all',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	console.log(data)
        	for (var i=0; i<data.length; i++) {
        		$('#lamp_' + data[i].lamp_id).html(data[i].lamp_current + ' Amp')
        	}
        },
    });

	$.ajax({
        url: '/lamp/volt/all',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	console.log(data)

        	for (var i=0; i<data.length; i++) {
        		$('#volt_' + data[i].volt_id).html(data[i].volt + ' Volt')
        	}
        },
    });
}, 5000)