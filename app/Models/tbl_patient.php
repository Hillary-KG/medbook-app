<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\tbl_gender;
use App\Models\tbl_service;

class tbl_patient extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'dob', 'comments'];

    public function gender()
    {
        return $this->belongsTo(tbl_gender::class);
    }

    public function service()
    {
        return $this->belongsTo(tbl_service::class);
    }
}
