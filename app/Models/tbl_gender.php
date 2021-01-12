<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\tbl_patient;

class tbl_gender extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'initial'];

    public function patient()
    {
        return $this->hasMany(tbl_patient::class);
    }
}
