<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\FileHelper;
use App\Helpers\TelegramHelper;
use App\Http\Controllers\Controller;
use App\Models\Career;
use App\Models\CareerSubmit;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CareerSubmitController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:career_submit view', only: ['index', 'show']),
            new Middleware('permission:career_submit delete', only: ['destroy']),
        ];
    }

    /** ==========================
     *  INDEX (LIST PAGE)
     *  ========================== */
    public function index(Request $request)
    {
        $query = CareerSubmit::query()->with('career');

        // Filters
        $perPage        = $request->input('perPage', 10);
        $search         = $request->input('search', '');
        $sortBy         = $request->input('sortBy', 'id');
        $sortDirection  = $request->input('sortDirection', 'desc');
        $trashed        = $request->input('trashed');

        // Trashed filter
        if ($trashed === 'with') {
            $query->withTrashed();
        } elseif ($trashed === 'only') {
            $query->onlyTrashed();
        }

        // Search filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        // Sorting
        $query->orderBy($sortBy, $sortDirection);

        // Pagination
        $tableData = $query->paginate($perPage)->onEachSide(1);

        return Inertia::render('Admin/CareerSubmit/Index', [
            'tableData' => $tableData,
            'career'    => Career::select('id', 'position')->get(),
        ]);
    }

    /** ==========================
     *  STORE (CREATE SUBMISSION)
     *  ========================== */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'career_id'    => 'required|exists:careers,id',
            'email'        => 'required|email|max:255',
            'phone_number' => 'required|string|max:50',
            'file'         => 'required|file|mimes:pdf|max:20480',
        ]);

        DB::beginTransaction();
        try {
            // File upload
            if ($request->hasFile('file')) {
                $file_name = FileHelper::uploadFile(
                    $request->file('file'),
                    'assets/files/career_submits',
                    false
                );

                $validated['file'] = $file_name;
            }

            $created_data = CareerSubmit::create($validated);

            $testData = (object) [
                'name' => $created_data->name ?? '---',
                'position' => $created_data->career->position ?? '---',
                'email' => $created_data->email ?? '---',
                'phone_number' => $created_data->phone_number ?? '---',
                'file_path' => 'assets/files/career_submits' . $file_name,
            ];

            TelegramHelper::sentCareerSubmit($testData);

            DB::commit();

            return redirect()->back()->with('success', 'Career submission created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('error', 'Telegram Career Submit Error: ' . $e->getMessage());
        }
    }

    /** ==========================
     *  SHOW (READ-ONLY VIEW)
     *  ========================== */
    public function show(CareerSubmit $careerSubmit)
    {
        return Inertia::render('Admin/CareerSubmit/Create', [
            'editData' => $careerSubmit->load('career'),
            'readOnly' => true,
            'careers'  => Career::select('id', 'position')->get(),
        ]);
    }

    /** ==========================
     *  DESTROY (SOFT DELETE)
     *  ========================== */
    public function destroy(CareerSubmit $careerSubmit)
    {
        $careerSubmit->delete();

        return redirect()->back()->with('success', 'Career submit deleted successfully!');
    }
}
