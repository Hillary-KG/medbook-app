<?php

namespace App\Http\Controllers;

use App\Models\tbl_gender;
use App\Models\tbl_patient;
use App\Models\tbl_service;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;

class PatientController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $patients = tbl_patient::all();

            if ($patients->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'error' => "No patients found"
                ], 404);
            }
            return response()->json([
                'success' => true,
                'msg' => "patients found",
                'data' => $patients
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'success' => false,
                'error' => "Failed, an exception occured >>" . $ex->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // ['name', 'dob', 'gender', 'comments']
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'gender' => 'required|exists:tbl_genders,id',
                // 'service' => 'exists:tbl_services,id'
                // 'comments' => 'string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => $validator->errors()
                ], 400);
            }
            $patient = new tbl_patient();
            $gender = tbl_gender::find($request->gender);
            $patient->name = $request->name;
            $patient->gender()->associate($gender);

            if (!$patient->save()) {
                return response()->json([
                    'success' => false,
                    'error' => "failed to save patient, try again."
                ], 400);
            }
            return response()->json([
                'success' => true,
                'msg' => "patient created successfuly",
                'data' => $patient
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'success' => false,
                'error' => "Failed, an exception occured >>" . $ex->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function show($patient_id)
    {
        try {
            $patient = tbl_patient::find($patient_id);

            if (!$patient) {
                return response()->json([
                    'success' => false,
                    'error' => "patient not found"
                ], 404);
            }
            return response()->json([
                'success' => true,
                'msg' => "patient found",
                'data' => $patient,
                'tbl_genders' => Level::orderBy('name')->get()
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'success' => false,
                'error' => "Failed, an exception occured >>" . $ex->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function edit(tbl_patient $patient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            $id = $request->patient_id;
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'gender' => 'required|exists:tbl_genders,id',
                'service' => 'exists:tbl_services,id',
                'comments' => 'string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => $validator->errors()
                ], 400);
            }
            $patient = tbl_patient::find($id);
            
            if (!$patient) {
                return response()->json([
                    'success' => false,
                    'error' => "patient not found"
                ], 404);
            }
            
            $service = tbl_service::find($request->service);
            $patient->service()->associate($service);
            
            $patient->fill($request->all());

            if (!$patient->save()) {
                return response()->json([
                    'success' => false,
                    'error' => "patient could not be updated"
                ], 400);
            }
            return response()->json([
                'success' => true,
                'msg' => "patient updated",
                'data' => $patient
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'success' => false,
                'error' => "Failed, an exception occured >>" . $ex->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function destroy($patient_id)
    {
        try {
            $patient = tbl_patient::find($patient_id);

            if (!$patient) {
                return response()->json([
                    'success' => false,
                    'error' => "patient not found"
                ], 404);
            }
            if (!$patient->delete()) {
                return response()->json([
                    'success' => false,
                    'error' => "patient could not be destroyed"
                ], 400);
            }
            return response()->json([
                'success' => true,
                'msg' => "patient destroyed",
                'data' => $patient
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'success' => false,
                'error' => "Failed, an exception occured >>" . $ex->getMessage()
            ], 500);
        }
    }
}
