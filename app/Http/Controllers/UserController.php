<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use Exception;
use App\Models\User;

class UserController extends Controller
{
    public function login(Request $request)
    {
        switch ($request->method()) {
            case 'POST':
                $validator = Validator::make($request->all(), [
                    // 'phone_number' => ['required', 'regex:/^(254|0)[0-9]{9}/'],
                    'email' => 'required|email',
                    'password' => 'required',
                    // 'remember_me' => 'boolean'
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'success' => false,
                        'error' => $validator->errors()
                    ], 200);
                }

                try {
                    $credentials = request(['email', 'password']);
                    $remember_me = false;

                    if ($request->remember_me == "on") {
                        $remember_me = true;
                    }
                    if (!Auth::attempt($credentials, $remember_me)) {
                        return response()->json([
                            'success' => false,
                            'error' => "Authorization failed. wrong phone or password"
                        ], 200);
                    }
                    $user = Auth::user();
                    error_log("user email 0101>>>>".$user->email);


                    // $token = Auth::user()->createToken('authToken')->accessToken;

                    return response()->json([
                        "success" => true,
                        "user" => Auth::user(),
                        // "access_token" => $token
                    ], 200);
                } catch (Exception $ex) {
                    return response()->json([
                        'success' => false,
                        'error' => "An error occured ==>" . $ex->getMessage()
                    ], 500);
                }
                break;
            case 'GET':
                return view('auth/login');
                break;
            default:
                return response()->json([
                    'success' => false,
                    'error' => "BAD REQUEST"
                ], 500);
                break;
        }
    }

    public function register(Request $request)
    {
        switch ($request->method()) {
            case 'POST':
                $validator = Validator::make($request->all(), [
                    'username' => 'required|string|max:255',
                    'email' => 'required|email',
                    'phone_number' => ['required', 'regex:/^(254|0)[0-9]{9}/'],
                    'password' => 'required',
                    'confirm_password' => 'required|same:password'
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'success' => false,
                        'error' => $validator->errors()
                    ], 400);
                }
                error_log("\n\nUsername".$request->username."\n\n");
                $phone = preg_replace("/^(0|\+254)/", '254', $request->phone_number);
                $user = new User([
                    'username' => $request->username,
                    'phone_number' => $phone,
                    'email' => $request->email,
                    'password' => bcrypt($request->password)
                ]);
                try {
                    if (!$user->save()) {
                        return response()->json([
                            'success' => false,
                            'error' => "An error occured, user could not be saved. Please try again"
                        ], 400);
                    }

                    return response()->json([
                        'success' => true,
                        'message' => "User created successfully",
                        'user' => $user,
                        // 'access_token' => $user->createToken('authToken')->accessToken,
                    ], 201);
                } catch (Exception $ex) {
                    return response()->json([
                        'success' => false,
                        'error' => "Failed.An error occured >>" . $ex->getMessage(),
                    ], 500);
                }
                break;
            case 'GET':
                return view('auth/register');
                break;
            default:
                return response()->json([
                    'success' => false,
                    'error' => "BAD REQUEST"
                ], 500);
                break;
        }
    }

    public function verify(Request $request)
    {
        return view('auth/verify');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/auth/login');
    }
}
