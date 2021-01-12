@extends('dashboard.master')
@section('content')
<!-- BEGIN: Content-->
<!-- Nav Justified Starts -->
<section id="nav-justified">
    <div class="row">
        <div class="col-sm-12">
            <div class="card overflow-hidden">
                <!-- <div class="card-header">
                    <h4 class="card-title">Justified</h4>
                </div> -->
                <div class="card-content">
                    <div class="card-body">
                        <ul class="nav nav-tabs nav-justified" id="myTab2" role="tablist">
                            <li class="nav-item" style="background-color: #efb2e2;">
                                <a class="nav-link active" id="patients-tab-justified" data-toggle="tab" href="#patients-just" role="tab" aria-controls="patients-just" aria-selected="true">Patients</a>
                            </li>
                            <li class="nav-item" style="background: #fdbbbb;">
                                <a class="nav-link" id="services-tab-justified" data-toggle="tab" href="#services-just" role="tab" aria-controls="services-just" aria-selected="false">Services</a>
                            </li>
                            <li class="nav-item" style="background: #7fffd4;">
                                <a class="nav-link" id="genders-tab-justified" data-toggle="tab" href="#genders-just" role="tab" aria-controls="genders-just" aria-selected="true">Genders</a>
                            </li>
                            
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content pt-1">
                            <div class="tab-pane active" id="patients-just" role="tabpanel" aria-labelledby="patients-tab-justified">
                                <!-- Add rows table -->
                                <section id="add-row">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card">
                                                <div class="card-header">
                                                    <h4 class="card-title">Patients</h4>
                                                </div>
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <button id="addpatients" class="btn btn-primary mb-2" data-toggle="modal" data-target="#addpatientsModalCenter"><i class="feather icon-plus"></i>&nbsp; Add Patient</button>
                                                        <div class="table-responsive">
                                                            <table class="table patients-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Date Of Birth</th>
                                                                        <th>Gender</th>
                                                                        <th>Type Of Service</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @foreach($patients as $patient)
                                                                    <tr>
                                                                        <th>{{ $patient->name }}</th>
                                                                        <th>{{ $patient->dob }}</th>
                                                                        <th>{{ $patient->gender->name }}</th>
                                                                        <th>{{ $patient->service->name }}</th>
                                                                        <th>
                                                                            <button class="btn btn-primary mb-2 view-patient" data-patientId="{{ $patient->id }}">
                                                                                View/Edit
                                                                            </button>
                                                                        </th>
                                                                    </tr>
                                                                    @endforeach
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                    <th>Name</th>
                                                                        <th>Date Of Birth</th>
                                                                        <th>Gender</th>
                                                                        <th>Type Of Service</th>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <!--/ Add rows table -->
                            </div>
                           
                            <div class="tab-pane" id="services-just" role="tabpanel" aria-labelledby="services-tab-justified">
                                <!-- Add rows table -->
                                <section id="add-row">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card">
                                                <div class="card-header">
                                                    <h4 class="card-title">services</h4>
                                                </div>
                                                <div class="card-content">
                                                    <div class="card-body">

                                                        <button id="addRow" class="btn btn-primary mb-2" data-toggle="modal" data-target="#addserviceModalCenter"><i class="feather icon-plus"></i>&nbsp; Add new service</button>
                                                        <div class="table-responsive">
                                                            <table class="table services-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @foreach($services as $service)
                                                                    <tr>
                                                                        <th>{{ $service->name }}</th>
                                                                        <th>
                                                                            <button class="btn btn-primary mb-2 view-service" data-serviceId="{{ $service->id }}">
                                                                                View/Edit
                                                                            </button>
                                                                        </th>
                                                                    </tr>
                                                                    @endforeach
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <!--/ Add rows table -->
                            </div>
                            <div class="tab-pane" id="genders-just" role="tabpanel" aria-labelledby="genders-tab-justified">
                                <!-- Add rows table -->
                                <section id="add-row">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card">
                                                <div class="card-header">
                                                    <h4 class="card-title">genders</h4>
                                                </div>
                                                <div class="card-content">
                                                    <div class="card-body">

                                                        <button id="addRow" class="btn btn-primary mb-2" data-toggle="modal" data-target="#addserviceModalCenter"><i class="feather icon-plus"></i>&nbsp; Add new service</button>
                                                        <div class="table-responsive">
                                                            <table class="table genders-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @foreach($genders as $gender)
                                                                    <tr>
                                                                        <th>{{ $gender->name }}</th>
                                                                        <th>
                                                                            <button class="btn btn-primary mb-2 view-gender" data-genderId="{{ $gender->id }}">
                                                                                View/Edit
                                                                            </button>
                                                                        </th>
                                                                    </tr>
                                                                    @endforeach
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <!--/ Add rows table -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- Add patients Modal -->
<div class="modal fade" id="addpatientsModalCenter" tabindex="-1" role="dialog" aria-labelledby="addpatientsModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addpatientsModal">Add patient</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert alert-success" role="alert" id="patientsMsg" style="display: none;">
                    <h4 class="alert-heading"></h4>
                    <p class="mb-0">

                    </p>
                </div>
                <form class="form form-vertical" id="patientsForm" enctype="multipart/form-data">
                    <div class="form-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="text-bold-600 font-medium-2">
                                    Select Service
                                </div>
                                <div class="form-group">
                                    <select class="select2 form-control" name="subject">
                                        @foreach($services as $service)
                                        <option value="{{ $service->id }}">{{ $service->name }}</strong></option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="form-group">
                                    <label for="comments">Comments</label>
                                    <div class="position-relative has-icon-left">
                                        <textarea id="comments" class="form-control" name="comments" placeholder=" Add Comments"></textarea>
                                        <div class="form-control-position">
                                            <i class="feather icon-edit"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary mr-1 mb-1">Submit</button>
                                <button type="reset" class="btn btn-outline-warning mr-1 mb-1">Reset</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- edit patients modal -->
<div class="modal fade" id="editpatientsModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">

        </div>
    </div>
</div>

<!-- Add service Modal -->
<div class="modal fade" id="addserviceModalCenter" tabindex="-1" role="dialog" aria-labelledby="addserviceModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addserviceModal">Add service</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert alert-success" role="alert" id="serviceMsg" style="display: none;">
                    <h4 class="alert-heading">Success</h4>
                    <p class="mb-0">

                    </p>
                </div>
                <form class="form form-vertical" id="serviceForm">
                    <div class="form-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="service-name">Name</label>
                                    <div class="position-relative has-icon-left">
                                        <input type="text" id="service-name" class="form-control" name="name" placeholder="service Name">
                                        <div class="form-control-position">
                                            <i class="feather icon-edit"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary mr-1 mb-1">Submit</button>
                                <button type="reset" class="btn btn-outline-warning mr-1 mb-1">Reset</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- edit service modal -->
<div class="modal fade" id="editserviceModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            
        </div>
    </div>
</div>

<!-- Add service Modal -->
<div class="modal fade" id="addserviceModalCenter" tabindex="-1" role="dialog" aria-labelledby="addserviceModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addserviceModal">Add service</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert alert-success" role="alert" id="serviceMsg" style="display: none;">
                    <h4 class="alert-heading">Success</h4>
                    <p class="mb-0">

                    </p>
                </div>
                <form class="form form-vertical" id="serviceForm">
                    <div class="form-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="service-name">Name</label>
                                    <div class="position-relative has-icon-left">
                                        <input type="text" id="service-name" class="form-control" name="name" placeholder="service Name">
                                        <div class="form-control-position">
                                            <i class="feather icon-edit"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary mr-1 mb-1">Submit</button>
                                <button type="reset" class="btn btn-outline-warning mr-1 mb-1">Reset</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- edit service modal -->
<div class="modal fade" id="editserviceModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            
        </div>
    </div>
</div>


<!-- END: Content-->
@endsection('content')

@section('scripts')
<script src="{{ asset ('js/custom/dashboard.js') }}"></script>
@endsection('scripts')