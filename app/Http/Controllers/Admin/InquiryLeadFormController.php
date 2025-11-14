<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InquiryLeadForm;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InquiryLeadFormController extends Controller implements HasMiddleware
{
    /**
     * Register permissions middleware for this controller
     * Only users with proper permissions can view or delete inquiry forms
     */
    public static function middleware(): array
    {
        return [
            new Middleware('permission:inquiry_lead_form view', only: ['index', 'show']),
            new Middleware('permission:inquiry_lead_form delete', only: ['destroy']),
        ];
    }

    /**
     * Display all inquiry submissions (no pagination)
     */
    public function index(Request $request)
    {
        // Get search and sorting parameters from query string
        $search        = $request->input('search', '');
        $sortBy        = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status        = $request->input('status');

        // Start a base query
        $query = InquiryLeadForm::query();

        // Filter by status if provided
        if ($status) {
            $query->where('status', $status);
        }

        // Handle search filtering
        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                $sub_query->where('name', 'LIKE', "%{$search}%")
                          ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        // Sorting
        $query->orderBy($sortBy, $sortDirection);

        // Get all results (no pagination)
        $tableData = $query->get();
        // Return data to Inertia page
        return Inertia::render('Admin/InquiryLeadForm/Index', [
            'tableData' => $tableData,
        ]);
    }

    /**
     * Store a new inquiry submission from the frontend form
     */
  
    public function store(Request $request)
    {
        // Validate input data from the form
        $validated = $request->validate([
            'name'                   => 'required|string|max:255',
            'contact_number'         => 'required|string|min:8|max:20',
            'business_or_store_name' => 'nullable|string|max:255',
            'email'                  => 'nullable|email|max:255',
            'message'                => 'required|string|max:500',
            'contact_method'         => 'required|string|max:255',
        ]);

        try {
            // Start database transaction
            DB::beginTransaction();

            // Insert inquiry into database
            InquiryLeadForm::create($validated);

            // Commit database changes
            DB::commit();

            // Return success message
            return back()->with('success', 'Message placed successfully!');

        } catch (\Exception $e) {

            // Rollback if an error occurs
            DB::rollback();

            // Return error message
            return back()->withErrors([
                'general' => 'Failed to place message. ' . $e->getMessage()
            ]);
        }
    }

     public function show($id)
    {
        $editData = InquiryLeadForm::findOrFail(id: $id);

        return Inertia::render('Admin/InquiryLeadForm/Create', [
            'editData' => $editData,
        ]);
    }

    /**
     * Delete an inquiry submission
     */
    public function destroy($id)
    {
        $inquiry = InquiryLeadForm::findOrFail($id);

        try {
            $inquiry->delete();
            return back()->with('success', 'Inquiry deleted successfully!');
        } catch (\Exception $e) {
            return back()->withErrors([
                'general' => 'Failed to delete inquiry. ' . $e->getMessage()
            ]);
        }
    }
}
