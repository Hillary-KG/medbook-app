<?php

namespace App\Http\Controllers;

use App\Models\tbl_service;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;
use Validator;

class ServiceController extends Controller
{
    public function index()
    {
        try {
            $services = tbl_service::all();

            if ($services->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'error' => "No services found"
                ], 404);
            }
            return response()->json([
                'success' => true,
                'msg' => "services found",
                'data' => $services
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
                // 'level' => 'required|exists:levels,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => $validator->errors()
                ], 400);
            }
            
            // $level = Level::find($request->level);
            $tbl_service = new tbl_service();
            $tbl_service->name = $request->name;
            // $tbl_service->level()->associate($level);

            if (!$tbl_service->save()) {
                return response()->json([
                    'success' => false,
                    'error' => "failed to save tbl_service, try again."
                ], 400);
            }
            return response()->json([
                'success' => true,
                'msg' => "tbl_service created successfuly",
                'data' => $tbl_service
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
     * @param  \App\Models\tbl_service  $tbl_service
     * @return \Illuminate\Http\Response
     */
    public function show($service)
    {
        try {
            $service = tbl_service::find($service);

            if (!$service) {
                return response()->json([
                    'success' => false,
                    'error' => "service not found"
                ], 404);
            }
            return response()->json([
                'success' => true,
                'msg' => "service found",
                'data' => $service
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
     * @param  \App\Models\tbl_service  $tbl_service
     * @return \Illuminate\Http\Response
     */
    public function edit(tbl_service $tbl_service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\tbl_service  $tbl_service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            $id = $request->service_id;
            $validator = Validator::make($request->all(), [
                'name' => 'string',
                // 'level' => 'exists:levels,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => $validator->errors()
                ], 400);
            }
            $service = tbl_service::find($id);

            if (!$service) {
                return response()->json([
                    'success' => false,
                    'error' => "service not found"
                ], 404);
            }
            // if ($request->level) {
            //     $level = Level::find($request->level);
            //     $service->level()->associate($level);
            // }

            $service->name = $request->name;
            
            if (!$service->save()) {
                return response()->json([
                    'success' => false,
                    'error' => "service could not be updated"
                ], 400);
            }
            return response()->json([
                'success' => true,
                'msg' => "service updated",
                'data' => $service
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
     * @param  \App\Models\tbl_service  $tbl_service
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $service = tbl_service::find($id);

            if (!$service) {
                return response()->json([
                    'success' => false,
                    'error' => "service not found"
                ], 404);
            }
            if (!$service->delete()) {
                return response()->json([
                    'success' => false,
                    'error' => "service could not be destroyed"
                ], 400);
            }
            return response()->json([
                'success' => true,
                'msg' => "service destroyed",
                'data' => $service
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'success' => false,
                'error' => "Failed, an exception occured >>" . $ex->getMessage()
            ], 500);
        }
    }
}
