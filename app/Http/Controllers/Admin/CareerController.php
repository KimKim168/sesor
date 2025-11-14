<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Career;
use App\Models\Page;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class CareerController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:career view', only: ['index', 'show']),
            new Middleware('permission:career create', only: ['create', 'store']),
            new Middleware('permission:career update', only: ['edit', 'update', 'recover']),
            new Middleware('permission:career delete', only: ['destroy']),
        ];
    }

    /** Display a listing of careers */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $trashed = $request->input('trashed'); // '', 'with', 'only'
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $trashed = $request->input('trashed'); // '', 'with', 'only'

        $query = Career::query();

        if ($trashed === 'with') {
            $query->withTrashed();
        } elseif ($trashed === 'only') {
            $query->onlyTrashed();
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('name_kh', 'LIKE', "%{$search}%")
                    ->orWhere('position', 'LIKE', "%{$search}%")
                    ->orWhere('position_kh', 'LIKE', "%{$search}%")
                    ->orWhere('short_description', 'LIKE', "%{$search}%")
                    ->orWhere('short_description_kh', 'LIKE', "%{$search}%");
            });
        }
        $query->orderBy('id', 'desc');

        $query->orderBy($sortBy, $sortDirection);
        $tableData = $query->paginate($perPage)->onEachSide(1);

        return Inertia::render('Admin/Career/Index', [
            'tableData' => $tableData,
            'types' => Type::where('group_code', 'page-type-group')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get(),
        ]);
    }

    /** Show create form */
    public function create()
    {
        return Inertia::render('Admin/Career/Create');
    }

    /** Store new career */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'position_kh' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'short_description_kh' => 'nullable|string',
            'long_description' => 'nullable|string',
            'long_description_kh' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        try {
            if ($request->hasFile('image')) {
                $validated['image'] = ImageHelper::uploadAndResizeImageWebp(
                    $request->file('image'),
                    'assets/images/careers',
                    600
                );
            }

            Career::create($validated);
            return redirect()->back()->with('success', 'Career created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to create Career: ' . $e->getMessage());
        }
    }

    /** Show career in read-only mode */


    public function show($career)
    {
        $career = Career::findOrFail($career);
        $career->image = $career->image ? [['image' => $career->image]] : [];
        return Inertia::render('Admin/Career/Create', [
            'editData' => $career,
            'readOnly' => true,
        ]);
    }

    /** Show edit form */
    public function edit(Career $career)
    {
        // Transform image for frontend
        $career->image = $career->image ? [['image' => $career->image]] : [];

        return Inertia::render('Admin/Career/Create', [
            'editData' => $career,
        ]);
    }

    /** Update career */
    public function update(Request $request, Career $career)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'position_kh' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'short_description_kh' => 'nullable|string',
            'long_description' => 'nullable|string',
            'long_description_kh' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if (trim($validated['long_description'] ?? '') === '<p>&nbsp;</p>') {
            $validated['long_description'] = null;
        }
        if (trim($validated['long_description_kh'] ?? '') === '<p>&nbsp;</p>') {
            $validated['long_description_kh'] = null;
        }

        try {
            if ($request->hasFile('image')) {
                // upload new image
                $validated['image'] = ImageHelper::uploadAndResizeImageWebp(
                    $request->file('image'),
                    'assets/images/careers',
                    600
                );
            } else {
                // keep old image
                $validated['image'] = $career->image;
            }

            $career->update($validated);

            return redirect()->back()->with('success', 'Career updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to update Career: ' . $e->getMessage());
        }
    }

    /** Recover soft-deleted career */
    // public function recover($id)
    // {
    //     $career = Career::withTrashed()->findOrFail($id);
    //     $career->restore();
    //     return redirect()->back()->with('success', 'Career recovered successfully.');
    // }
    public function recover($id)
    {
        $page = Career::withTrashed()->findOrFail($id); // 👈 include soft-deleted Page
        $page->restore(); // restores deleted_at to null
        return redirect()->back()->with('success', 'Page recovered successfully.');
    }
    /** Soft-delete career */
    public function destroy(Career $career)
    {
        $career->delete();
        return redirect()->back()->with('success', 'Career deleted successfully.');
    }
}
