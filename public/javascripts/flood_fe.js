function floodSwitch (id) {
	var lamp_status = '';
	if($('#floodCheck' + id).prop("checked") == true){
        lamp_status = '1';
    } else {
    	lamp_status = '0';
    }
	$.ajax({
        url: '/flood/update?lamp_id=' + id + '&lamp_status=' + lamp_status,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        	console.log(data)
        },
    });
}