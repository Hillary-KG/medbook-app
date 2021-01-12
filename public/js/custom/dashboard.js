$(function() {
    $('.patients-table').DataTable();
    $('.services-table').DataTable();
    $('.genders-table').DataTable();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#patientsForm').submit(function(e) {
        e.preventDefault();
        var $data = new FormData($(this)[0]);
        $.ajax({
            type: "POST",
            url: '/patients/add',
            cache: false,
            // dataType: 'json',
            processData: false,
            contentType: false,
            data: $data,
            beforeSend: function() {
                var $html = '<h4 class="alert-heading">Processing request ... </h4>' +
                    '<p class="mb-0">adding patients ...</p>';
                $('#patientsMsg').html($html).attr('class', 'alert alert-primary mb-2').css('display', 'block');
            },
            success: function(res) {
                if (!res.success) {
                    var $html = '<h4 class="alert-heading">Failed! </h4>' +
                        '<p class="mb-0">The following errors occured: <br>' + res.error + '</p>';
                    $('#patientsMsg').html($html).attr('class', 'alert alert-danger mb-2').css('display', 'block').delay(5000).fadeOut();
                    $('#patientsForm')[0].reset();
                    return false;
                }
                var $html = '<h4 class="alert-heading">Success! </h4>' +
                    '<p class="mb-0">patients added successfully!</p>';
                $('#patientsMsg').html($html).attr('class', 'alert alert-success mb-2').css('display', 'block').delay(5000).fadeOut();
                $('#patientsForm')[0].reset();
                // setTimeout(location.reload(), 8000);
                return true;
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                console.log(err.Message);
            }
        });
    });

   
    

    $('#serviceForm').submit(function(e) {
        e.preventDefault();
        var $data = new FormData($(this)[0]);
        $.ajax({
            type: "POST",
            url: '/service/add',
            cache: false,
            // dataType: 'json',
            processData: false,
            contentType: false,
            data: $data,
            beforeSend: function() {
                var $html = '<h4 class="alert-heading">Processing request ...</h4>' +
                    '<p class="mb-0">adding service ...</p>';
                $('#serviceMsg').html($html).attr('class', 'alert alert-primary mb-2').css('display', 'block');
            },
            success: function(res) {
                if (!res.success) {
                    var $html = '<h4 class="alert-heading">Failed! </h4>' +
                        '<p class="mb-0">The following errors occured: <br>' + res.error + '</p>';
                    $('#serviceMsg').html($html).attr('class', 'alert alert-danger mb-2').css('display', 'block').delay(5000).fadeOut();
                    $('#serviceForm')[0].reset();
                    return false;
                }
                var $html = '<h4 class="alert-heading">Success! </h4>' +
                    '<p class="mb-0">service added successfully!</p>';
                $('#serviceMsg').html($html).attr('class', 'alert alert-success mb-2').css('display', 'block').delay(5000).fadeOut();
                $('#serviceForm')[0].reset();
                // setTimeout(location.reload(), 8000);
                return true;
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                console.log(err.Message);
            }
        });
    });

   
    $(".view-patient").click(function(e){
        e.preventDefault();
        var $patient_id = $(this).data('patientid');

        $.ajax({
            type:'GET',
            url: '/patients/get/'+$patient_id,
            cache: false,
            dataType: 'json',

            success: function(res){
                // console.log("get data>>>", res.item);
                var $genders = '';
                res.genders.forEach(element => {
                    if (element.id === res.item.service.id) {
                        $genders += '<option value="'+element.id+'" selected>'+element.name+'</option>';
                    }
                    $genders += '<option value="'+element.id+'">'+element.name+'</option>';
                });

                var $modal_content = "";
            $("#editpatientsModal > .modal-dialog > .modal-content").html($modal_content);
            $("#editpatientsModal").modal('show');
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                console.log(err.Message);
            }

        });
    });


    $(document).on('submit',"#editpatientsForm", function(e){
        e.preventDefault();
        // console.log("I was submited, E FORM");
        // var $patient_id = $(this).data('patientid');
        // var $doc_name = $(this).data('docname');
        // var $data = new FormData($(this)[0]);
        var $data = $(this).serializeArray();
        // $data.push({
        //     name: 'patient_id',
        //     value: $patient_id
        // },
        // {
        //     name: 'doc_name', 
        //     value: $doc_name
        // });
        // console.log("form Data>>>", $data);
        $.ajax({
            type:'POST',
            url: '/patients/update',
            data: $data,
            dataType: 'json',
            // contentType:false,
            // processData: false,
            cache: false,
            success: function(res){
                // console.log("In success >>>", res);
                if (!res.success) {
                    var $msg = '<h4 class="alert-heading">Failed! '+res.error+', Please try again.</h4>';
                    $("#editpatientsMsg").html($msg).attr('class', 'alert alert-danger mb-2').css('display', 'block').delay(5000).fadeOut();
                }
                var $msg = '<h4 class="alert-heading">Success!'+res.msg+'</h4>';
                $("#editpatientsMsg").html($msg).attr('class', 'alert alert-success mb-2').css('display', 'block').delay(5000).fadeOut();
                // setTimeout(location.reload(), 8000);
                return true;
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                console.log(err.Message);
            }

        });
    });

    //genders
    $(".view-service").click(function(e){
        e.preventDefault();
        var $service_id = $(this).data('serviceid');

        $.ajax({
            type:'GET',
            url: '/service/get/'+$service_id,
            cache: false,
            dataType: 'json',

            success: function(res){
                // console.log("get data>>>", res);

                var $modal_content = '<div class="modal-header">'+
                                        '<h5 class="modal-title">Edit service</h5>'+
                                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                            '<span aria-hidden="true">&times;</span>'+
                                        '</button>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                        '<div class="alert alert-success" role="alert" id="editserviceMsg" style="display: none;">'+
                                            '<h4 class="alert-heading">Success</h4>'+
                                        '</div>'+
                                        '<form class="form form-vertical" id="editserviceForm">'+
                                            '<div class="form-body">'+
                                                '<div class="row">'+
                                                    '<input type="text" id="serviceId" name="service_id" value="'+res.data.id+'" hidden>'+
                                                    '<div class="col-12">'+
                                                        '<div class="form-group">'+
                                                            '<label for="service-name">service Name</label>'+
                                                            '<div class="position-relative has-icon-left">'+
                                                                '<input type="text" id="service-name" class="form-control" name="name" placeholder="service Name" value="'+res.data.name+'">'+
                                                                '<div class="form-control-position">'+
                                                                    '<i class="feather icon-edit"></i>'+
                                                                '</div>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="col-12">'+
                                                        '<button type="submit" class="btn btn-primary mr-1 mb-1">Save</button>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</form>'+
                                    '</div>'+
                                    '<div class="modal-footer">'+
                                        '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'+
                                    '</div>';
                
                                    
            $("#editserviceModal > .modal-dialog > .modal-content").html($modal_content);
            $("#editserviceModal").modal('show');
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                console.log(err.Message);
            }

        });
    });

    $(document).on('submit',"#editserviceForm", function(e){
        e.preventDefault();
        // console.log("I was submited, E FORM");

        var $data = $(this).serializeArray();
        // console.log("form Data>>>", $data);
        $.ajax({
            type:'PUT',
            url: '/service/update',
            data: $data,
            dataType: 'json',
            // contentType:false,
            // processData: false,
            cache: false,
            success: function(res){
                // console.log("In success >>>", res);
                if (!res.success) {
                    var $msg = '<h4 class="alert-heading">Failed! '+res.error+', Please try again.</h4>';
                    $("#editserviceMsg").html($msg).attr('class', 'alert alert-danger mb-2').css('display', 'block').delay(5000).fadeOut();
                }
                var $msg = '<h4 class="alert-heading">Success! '+res.msg+'</h4>';
                $("#editserviceMsg").html($msg).attr('class', 'alert alert-success mb-2').css('display', 'block').delay(5000).fadeOut();
                // setTimeout(location.reload(), 8000);
                return true;
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                console.log(err.Message);
            }

        });
    });
});