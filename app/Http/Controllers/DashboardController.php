<?php

namespace App\Http\Controllers;

use App\Models\tbl_gender;
use App\Models\tbl_patient;
use App\Models\tbl_service;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function home(Request $request)
    {
       $patients = tbl_patient::orderBy('name')->get();
       $services = tbl_service::orderBy('name')->get();
       $genders = tbl_gender::orderBy('name')->get();

       return view('dashboard/dashboard', ['patients' => $patients, 'services' => $services, 'genders' => $genders]);
    }
}
