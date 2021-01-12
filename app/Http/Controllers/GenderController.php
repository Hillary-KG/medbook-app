<?php

namespace App\Http\Controllers;

use App\Models\tbl_gender;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;

class GenderController extends Controller
{
    public function index()
    {
        try {
            $genders = tbl_gender::all();

            if ($genders->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'error' => "No genders found"
                ], 404);
            }
            return response()->json([
                'success' => true,
                'msg' => "genders found",
                'data' => $genders
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
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'initial' => 'required|string'
                // 'level' => 'required|exists:levels,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => $validator->errors()
                ], 400);
            }
            
            // $level = Level::find($request->level);
            $gender = new tbl_gender();
            $gender->name = $request->name;
            $gender->initial = $request->initial;
            // $gender->level()->associate($level);

            if (!$gender->save()) {
                return response()->json([
                    'success' => false,
                    'error' => "failed to save gender, try again."
                ], 400);
            }
            return response()->json([
                'success' => true,
                'msg' => "gender created successfuly",
                'data' => $gender
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
     * @param  \App\Models\tbl_gender  $tbl_gender
     * @return \Illuminate\Http\Response
     */
    public function show($gender)
    {
        try {
            $gender = tbl_gender::find($tbl_gender);

            if (!$gender) {
                return response()->json([
                    'success' => false,
                    'error' => "gender not found"
                ], 404);
            }
            return response()->json([
                'success' => true,
                'msg' => "gender found",
                'data' => $gender
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
     * @param  \App\Models\tbl_gender  $tbl_gender
     * @return \Illuminate\Http\Response
     */
    public function edit(tbl_gender $tbl_gender)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\tbl_gender  $tbl_gender
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            $id = $request->gender_id;
            $validator = Validator::make($request->all(), [
                'name' => 'string',
                'initial' => 'string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => $validator->errors()
                ], 400);
            }
            $gender = tbl_gender::find($id);

            if (!$gender) {
                return response()->json([
                    'success' => false,
                    'error' => "gender not found"
                ], 404);
            }
        
            if (!$gender->update($request->all())) {
                return response()->json([
                    'success' => false,
                    'error' => "gender could not be updated"
                ], 400);
            }
            return response()->json([
                'success' => true,
                'msg' => "gender updated",
                'data' => $gender
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
     * @param  \App\Models\tbl_gender  $tbl_gender
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $gender = tbl_gender::find($id);

            if (!$gender) {
                return response()->json([
                    'success' => false,
                    'error' => "gender not found"
                ], 404);
            }
            if (!$gender->delete()) {
                return response()->json([
                    'success' => false,
                    'error' => "gender could not be destroyed"
                ], 400);
            }
            return response()->json([
                'success' => true,
                'msg' => "gender destroyed",
                'data' => $gender
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'success' => false,
                'error' => "Failed, an exception occured >>" . $ex->getMessage()
            ], 500);
        }
    }
}
