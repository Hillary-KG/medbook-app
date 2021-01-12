$(function() {
    $('.patients-table').DataTable();
    $('.services-table').DataTable();
    $('.genders-table').DataTable();
    $('.levels-table').DataTable();
    // $('.patients-table').DataTable();
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
                var $doc_files = '';
                const $fi = ''
                res.item.urls.forEach(element =>{
                    const $re = /uploads.+_/;
                    
                    var $file_name = element.replace(element.match($re)[0], '');
                    // console.log($file_name);

                    var $file_name = element.replace(element.match($re)[0], '');
                    // console.log($file_name);
                    $doc_files += '<div class="row">'+
                                        '<div class="col-10 position-relative has-icon-left">'+
                                            '<input type="text" class="form-control" name="title" placeholder="Content Title" value="'+$file_name+'">'+
                                            '<div class="form-control-position">'+
                                                '<i class="feather icon-file"></i>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="col-2">' +
                                            '<button type="button" class="btn btn-icon rounded-circle btn-outline-danger mb-1 float-right delete-doc" data-docName="'+$file_name+'" data-patientId="'+res.item.id+'"><i class="feather icon-x"></i></button>' +
                                        '</div>' +
                                    '</div>';
                });
                var $genders = '';
                res.genders.forEach(element => {
                    if (element.id === res.item.service.id) {
                        $genders += '<option value="'+element.id+'" selected>'+element.name+'</option>';
                    }
                    $genders += '<option value="'+element.id+'">'+element.name+'</option>';
                });

                var $subjects = '';
                res.subjects.forEach(element => {
                    if (element.id === res.item.subject.id) {
                        $subjects += '<option value="'+element.id+'" selected>'+element.name+'/<strong>'+element.cls.name+'</strong></option>';
                    }
                    $subjects += '<option value="'+element.id+'">'+element.name+'/<strong>'+element.cls.name+'</strong></option>';
                });
                var $modal_content = '<div class="modal-header">'+
                                        '<h5 class="modal-title" id="addpatientsModal">Editing Content</h5>'+
                                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                            '<span aria-hidden="true">&times;</span>'+
                                        '</button>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                        '<div class="alert alert-success" role="alert" id="editpatientsMsg" style="display: none;">'+
                                            '<h4 class="alert-heading">Success</h4>'+
                                        '</div>'+
                                        '<form class="form form-vertical" id="editpatientsForm" enctype="multipart/form-data">'+
                                            '<div class="form-body">'+
                                                '<div class="row">'+
                                                    '<input type="text" id="patientId" name="patient_id" value="'+res.item.id+'" hidden>'+
                                                    '<div class="col-12">'+
                                                        '<div class="form-group">'+
                                                            '<label for="title-icon">Title</label>'+
                                                            '<div class="position-relative has-icon-left">'+
                                                                '<input type="text" id="title-icon" class="form-control" name="title" placeholder="Content Title" value="'+res.item.title+'">'+
                                                                '<div class="form-control-position">'+
                                                                    '<i class="feather icon-edit"></i>'+
                                                                '</div>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="col-12">'+
                                                        '<div class="form-group">'+
                                                            '<label for="price-icon">Price</label>'+
                                                            '<div class="position-relative has-icon-left">'+
                                                                '<input type="text" id="price-icon" class="form-control" name="price" placeholder="Content price" value="'+res.item.price+'">'+
                                                                '<div class="form-control-position">'+
                                                                    '<i class="feather icon-edit"></i>'+
                                                                '</div>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    
                                                    '<div class="col-12">'+
                                                        '<div class="text-bold-600 font-medium-2">'+
                                                            'Select Subject/Class'+
                                                        '</div>'+
                                                        '<div class="form-group">'+
                                                            '<select class="select2 form-control" name="subject" selected="'+res.item.subject.name+'">'+
                                                                $subjects+
                                                            '</select>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="col-12">'+
                                                        '<div class="text-bold-600 font-medium-2">'+
                                                            'Select service'+
                                                        '</div>'+
                                                        '<div class="form-group">'+
                                                            '<select class="select2 form-control" name="service">'+
                                                                $genders+
                                                            '</select>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="col-12">'+
                                                        '<div class="text-bold-600 font-medium-2">'+
                                                            'Express Shop Content'+
                                                        '</div>'+
                                                        '<div class="form-group">'+
                                                            '<select class="select2 form-control" name="express">'+
                                                                '<option value="yes">Yes</option>'+
                                                                '<option value="no">No</option>'+
                                                            '</select>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="col-12">'+
                                                        '<h6 id="addpatientsModal">Documents*</h6>'+
                                                        $doc_files+
                                                    '</div>'+
                                                    '<div class="col-12 file-field">'+
                                                        '<fieldset class="form-group">'+
                                                            '<label for="basicInputFile">Add patients documents</label>'+
                                                            '<div class="custom-file">'+
                                                                '<input type="file" class="custom-file-input" name="documents[]" multiple>'+
                                                                '<label class="custom-file-label" for="patientsFile">Choose file</label>'+
                                                            '</div>'+
                                                        '</fieldset>'+
                                                    '</div>'+
                                                    '<div class="col-12 add-file">'+
                                                        '<button type="button" class="btn btn-icon rounded-circle btn-outline-primary mr-1 mb-1 float-right" id="addFile"><i class="feather icon-file-plus"></i></button>'+
                                                    '</div>'+
                                                    '<div class="col-12">'+
                                                        '<button type="submit" class="btn btn-primary mr-1 mb-1" id="updatepatients" data-patientId="'+$patient_id+'">Submit</button>'+
                                                        '<button type="reset" class="btn btn-outline-warning mr-1 mb-1">Reset</button>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</form>'+
                                    '</div>'+
                                    '<div class="modal-footer">'+
                                        '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'+
                                    '</div>';
            $("#editpatientsModal > .modal-dialog > .modal-content").html($modal_content);
            $("#editpatientsModal").modal('show');
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                console.log(err.Message);
            }

        });
    });


    $(document).on("click", ".delete-doc", function(e){
        e.preventDefault();
        var $patient_id = $(this).data('patientid');
        var $doc_name = $(this).data('docname');
        var $modal_content = '<div class="modal-header">'+
                                        '<h5 class="modal-title" id="addpatientsModal">Confirm Delete</h5>'+
                                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                            '<span aria-hidden="true">&times;</span>'+
                                        '</button>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                        '<div class="alert alert-success" role="alert" id="deleteMsg" style="display: none;">'+
                                            '<h4 class="alert-heading">Success</h4>'+
                                        '</div>'+
                                        
                                    '</div>'+
                                    '<div class="modal-footer">'+
                                        '<button type="button" class="btn btn-warning right" data-dismiss="modal">Cancel</button>'+
                                        '<button type="button" class="btn btn-success left" id="confirmDelete" data-docName="'+$doc_name+'" data-patientId="'+$patient_id+'">Ok</button>'+
                                    '</div>';
        $("#confirmDeleteModal > .modal-dialog > .modal-content").html($modal_content);
        $("#confirmDeleteModal").modal('show');
    });

    $(document).on("click", "#confirmDelete", function(e){
        e.preventDefault();
        // console.log("I was clicked, CCCCC");
        var $patient_id = $(this).data('patientid');
        var $doc_name = $(this).data('docname');
        var $data = [];
        $data.push({
            name: 'patient_id',
            value: $patient_id
        },
        {
            name: 'doc_name', 
            value: $doc_name
        });
        // console.log("In Data>>>", $data);
        $.ajax({
            type:'POST',
            url: '/patients/deleteFile/',
            data: $data,
            dataType: 'json',
            cache: false,
            success: function(res){
                // console.log("In success >>>", res);
                if (!res.success) {
                    var $msg = '<h4 class="alert-heading">Failed! '+res.msg+', Please try again.</h4>';
                    $("#deleteMsg").html($msg).attr('class', 'alert alert-danger mb-2').css('display', 'block').delay(5000).fadeOut();
                }
                var $msg = '<h4 class="alert-heading">Success!</h4>';
                $("#deleteMsg").html($msg).attr('class', 'alert alert-success mb-2').css('display', 'block').delay(5000).fadeOut();
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

    //subjects 
    $(".view-subject").click(function(e){
        // console.log("sub clikkii");
        e.preventDefault();
        var $subject_id = $(this).data('subjectid');

        $.ajax({
            type:'GET',
            url: '/subject/get/'+$subject_id,
            cache: false,
            dataType: 'json',

            success: function(res){
                // console.log("get data>>>", res);

                var $classes = '';
                res.classes.forEach(element => {
                    if (element.id === res.data.cls.id) {
                        $classes += '<option value="'+element.id+'" selected>'+element.name+'/<strong>'+element.level.name+'</strong></option>';
                    }
                    $classes += '<option value="'+element.id+'">'+element.name+'/<strong>'+element.level.name+'</strong></option>';
                });
                var $modal_content = '<div class="modal-header">'+
                                        '<h5 class="modal-title">Edit Subject</h5>'+
                                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                            '<span aria-hidden="true">&times;</span>'+
                                        '</button>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                        '<div class="alert alert-success" role="alert" id="editSubjectMsg" style="display: none;">'+
                                            '<h4 class="alert-heading">Success</h4>'+
                                        '</div>'+
                                        '<form class="form form-vertical" id="editSubjectForm">'+
                                            '<div class="form-body">'+
                                                '<div class="row">'+
                                                    '<input type="text" id="subjectId" name="subject_id" value="'+res.data.id+'" hidden>'+
                                                    '<div class="col-12">'+
                                                        '<div class="form-group">'+
                                                            '<label for="subject-name">Name</label>'+
                                                            '<div class="position-relative has-icon-left">'+
                                                                '<input type="text" id="subject-name" class="form-control" name="name" placeholder="Subject Name" value="'+res.data.name+'">'+
                                                                '<div class="form-control-position">'+
                                                                    '<i class="feather icon-edit"></i>'+
                                                                '</div>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="col-12">'+
                                                        '<div class="text-bold-600 font-medium-2">'+
                                                            'Select Class/Level'+
                                                        '</div>'+
                                                        '<div class="form-group">'+
                                                            '<select class="select2 form-control" name="cls">'+
                                                                $classes+
                                                            '</select>'+
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
                
                                    
            $("#editSubjectModal > .modal-dialog > .modal-content").html($modal_content);
            $("#editSubjectModal").modal('show');
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                console.log(err.Message);
            }

        });
    });

    $(document).on('submit',"#editSubjectForm", function(e){
        e.preventDefault();
        // console.log("I was submited, E FORM");

        var $data = $(this).serializeArray();
        // console.log("form Data>>>", $data);
        $.ajax({
            type:'PUT',
            url: '/subject/update',
            data: $data,
            dataType: 'json',
            // contentType:false,
            // processData: false,
            cache: false,
            success: function(res){
                // console.log("In success >>>", res);
                if (!res.success) {
                    var $msg = '<h4 class="alert-heading">Failed! '+res.error+', Please try again.</h4>';
                    $("#editSubjectMsg").html($msg).attr('class', 'alert alert-danger mb-2').css('display', 'block').delay(5000).fadeOut();
                }
                var $msg = '<h4 class="alert-heading">Success! '+res.msg+'</h4>';
                $("#editSubjectMsg").html($msg).attr('class', 'alert alert-success mb-2').css('display', 'block').delay(5000).fadeOut();
                // setTimeout(location.reload(), 8000);
                return true;
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                console.log(err.Message);
            }

        });
    });

    //CLASSES   
    $(".view-cls").click(function(e){
        e.preventDefault();
        var $cls_id = $(this).data('clsid');

        $.ajax({
            type:'GET',
            url: '/class/get/'+$cls_id,
            cache: false,
            dataType: 'json',

            success: function(res){
                // console.log("get data>>>", res);

                var $levels = '';
                res.levels.forEach(element => {
                    if (element.id === res.data.level.id) {
                        $levels += '<option value="'+element.id+'" selected>'+element.name+'</strong></option>';
                    }
                    $levels += '<option value="'+element.id+'">'+element.name+'</strong></option>';
                });
                var $modal_content = '<div class="modal-header">'+
                                        '<h5 class="modal-title">Edit Class/Form</h5>'+
                                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                            '<span aria-hidden="true">&times;</span>'+
                                        '</button>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                        '<div class="alert alert-success" role="alert" id="editClsMsg" style="display: none;">'+
                                            '<h4 class="alert-heading">Success</h4>'+
                                        '</div>'+
                                        '<form class="form form-vertical" id="editClsForm">'+
                                            '<div class="form-body">'+
                                                '<div class="row">'+
                                                    '<input type="text" id="clsId" name="cls_id" value="'+res.data.id+'" hidden>'+
                                                    '<div class="col-12">'+
                                                        '<div class="form-group">'+
                                                            '<label for="cls-name">Class/Form Name</label>'+
                                                            '<div class="position-relative has-icon-left">'+
                                                                '<input type="text" id="cls-name" class="form-control" name="name" placeholder="Class/Form Name" value="'+res.data.name+'">'+
                                                                '<div class="form-control-position">'+
                                                                    '<i class="feather icon-edit"></i>'+
                                                                '</div>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="col-12">'+
                                                        '<div class="text-bold-600 font-medium-2">'+
                                                            'Select Class/Level'+
                                                        '</div>'+
                                                        '<div class="form-group">'+
                                                            '<select class="select2 form-control" name="level">'+
                                                                $levels+
                                                            '</select>'+
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
                
                                    
            $("#editClsModal > .modal-dialog > .modal-content").html($modal_content);
            $("#editClsModal").modal('show');
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                console.log(err.Message);
            }

        });
    });

    $(document).on('submit',"#editClsForm", function(e){
        e.preventDefault();
        // console.log("I was submited, E FORM");

        var $data = $(this).serializeArray();
        // console.log("form Data>>>", $data);
        $.ajax({
            type:'PUT',
            url: '/class/update',
            data: $data,
            dataType: 'json',
            // contentType:false,
            // processData: false,
            cache: false,
            success: function(res){
                // console.log("In success >>>", res);
                if (!res.success) {
                    var $msg = '<h4 class="alert-heading">Failed! '+res.error+', Please try again.</h4>';
                    $("#editClsMsg").html($msg).attr('class', 'alert alert-danger mb-2').css('display', 'block').delay(5000).fadeOut();
                }
                var $msg = '<h4 class="alert-heading">Success! '+res.msg+'</h4>';
                $("#editClsMsg").html($msg).attr('class', 'alert alert-success mb-2').css('display', 'block').delay(5000).fadeOut();
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

    //Levels
    $(".view-level").click(function(e){
        e.preventDefault();
        var $level_id = $(this).data('levelid');

        $.ajax({
            type:'GET',
            url: '/level/get/'+$level_id,
            cache: false,
            dataType: 'json',

            success: function(res){
                // console.log("get data>>>", res);

                var $modal_content = '<div class="modal-header">'+
                                        '<h5 class="modal-title">Edit Level</h5>'+
                                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                            '<span aria-hidden="true">&times;</span>'+
                                        '</button>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                        '<div class="alert alert-success" role="alert" id="editLevelMsg" style="display: none;">'+
                                            '<h4 class="alert-heading">Success</h4>'+
                                        '</div>'+
                                        '<form class="form form-vertical" id="editLevelForm">'+
                                            '<div class="form-body">'+
                                                '<div class="row">'+
                                                    '<input type="text" id="levelId" name="level_id" value="'+res.data.id+'" hidden>'+
                                                    '<div class="col-12">'+
                                                        '<div class="form-group">'+
                                                            '<label for="level-name">Level Name</label>'+
                                                            '<div class="position-relative has-icon-left">'+
                                                                '<input type="text" id="level-name" class="form-control" name="name" placeholder="Level Name" value="'+res.data.name+'">'+
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
                
                                    
            $("#editLevelModal > .modal-dialog > .modal-content").html($modal_content);
            $("#editLevelModal").modal('show');
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                // console.log(err.Message);
            }

        });
    });

    $(document).on('submit',"#editLevelForm", function(e){
        e.preventDefault();
        // console.log("I was submited, E FORM");

        var $data = $(this).serializeArray();
        // console.log("form Data>>>", $data);
        $.ajax({
            type:'PUT',
            url: '/level/update',
            data: $data,
            dataType: 'json',
            // contentType:false,
            // processData: false,
            cache: false,
            success: function(res){
                // console.log("In success >>>", res);
                if (!res.success) {
                    var $msg = '<h4 class="alert-heading">Failed! '+res.error+', Please try again.</h4>';
                    $("#editLevelMsg").html($msg).attr('class', 'alert alert-danger mb-2').css('display', 'block').delay(5000).fadeOut();
                }
                var $msg = '<h4 class="alert-heading">Success! '+res.msg+'</h4>';
                $("#editLevelMsg").html($msg).attr('class', 'alert alert-success mb-2').css('display', 'block').delay(5000).fadeOut();
                // setTimeout(location.reload(), 8000);
                return true;
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                // console.log(err.Message);
            }

        });
    });
    
});