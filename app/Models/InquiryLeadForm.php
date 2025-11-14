<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class InquiryLeadForm extends Model
{
    use HasFactory;
    protected $table = 'inquiry_lead_forms';
    protected $guarded = [];
}
