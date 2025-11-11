<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Faq;
use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\Link;
use App\Models\Page;
use App\Models\Post;
use App\Models\Type;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class SesorFrontPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $campaignPromotion = Page::where('code', 'campaign-promotion')
            ->with('images')
            ->first();
        $slides = Banner::where('type_code', 'home-banner-first')->orderBy('id', 'desc')->get();
        // FirstHero
        $backgroundSecound = Banner::where('type_code', 'home-banner-second')->orderBy('id', 'desc')->first();
        $firstHero = Page::where('code', 'download-the-sesor-express-apps')->orderBy('id', 'desc')->with('images')->first();
        $playStorAndroid = Type::where('code', 'sesor-driver-and-express-android')
            ->with('links')->get();
        $AppStorIOS = Type::where('code', 'sesor-driver-and-express-ios')
            ->with('links')->get();
        // FirstHero
        // SecondHero
        $secondHero = Page::where('code', 'track-trace')->orderBy('id', 'desc')->with('images')->first();
        // SecondHero
        // thirdHero
        $backgroundThird = Banner::where('type_code', 'home-banner-third')->orderBy('id', 'desc')->first();
        $thirdHero = Page::where('code', 'deliver-smarter')->orderBy('id', 'desc')->with('images')->first();
        // thirdHero
        // thirdHero
        $ourServices = Page::where('code', 'our-services')->orderBy('id', 'desc')->with('children')->first();

        // fourthdHero
        $backgroundFourth = Banner::where('type_code', 'home-banner-fourth')->orderBy('id', 'desc')->first();
        $fourthHero = Page::where('code', 'set-your-delivery-plan')->orderBy('id', 'desc')->with('images')->first();
        // fifthdHero
        $backgroundFifth = Banner::where('type_code', 'home-banner-fifth')->orderBy('id', 'desc')->first();
        $fifthHero = Page::where('code', 'faqs')->orderBy('id', 'desc')->with('images')->first();
        $faqs = Faq::where('type_code', 'faq-1')->orderBy('order_index', 'desc')->get();
        // return $faqs;
        return Inertia::render('Sesor/Index', [
            'slides' => $slides,
            'campaignPromotion' => $campaignPromotion,
            'backgroundSecound' => $backgroundSecound,
            'firstHero' => $firstHero,
            'playStorAndroid' => $playStorAndroid,
            'AppStorIOS' => $AppStorIOS,
            'secondHero' => $secondHero,
            'backgroundThird' => $backgroundThird,
            'thirdHero' => $thirdHero,
            'ourServices' => $ourServices,
            'backgroundFourth' => $backgroundFourth,
            'fourthHero' => $fourthHero,
            'backgroundFifth' => $backgroundFifth,
            'fifthHero' => $fifthHero,
            'faqs' => $faqs,
        ]);
    }

    public function about()
    {
        $whoWeAre = Page::where('code', 'who-we-are')->first();
        $vision = Page::where('code', 'vision')->with(['children', 'children.images'])->get();
        $mission = Page::where('code', 'mission')->with(['children', 'children.images'])->get();
        $coreValues = Page::where('code', 'core-values')
            ->with(['children' => function ($query) {
                $query->orderBy('order_index', 'desc')
                    ->with('images'); // eager load images for children
            }])
            ->get();

        $ourTeam = Page::where('code', 'our-team')
            ->with(['children' => function ($query) {
                $query->orderBy('order_index', 'desc')
                    ->with('images'); // eager load images for children
            }])
            ->get();

        $whoWeDeliverFor = Page::where('code', 'who-we-deliver-for')->with('images')->first();
        // return $whoWeDeliverFor;
        return Inertia::render('Sesor/AboutUs/Index', [
            'whoWeAre' => $whoWeAre,
            'vision' => $vision,
            'mission' => $mission,
            'coreValues' => $coreValues,
            'ourTeam' => $ourTeam,
            'whoWeDeliverFor' => $whoWeDeliverFor,
        ]);
    }

    public function campaign_promotion()
    {
        $campaignPromotion = Page::where('code', 'campaign-promotion')
            ->with('images')
            ->first();

        return Inertia::render('Sesor/AboutUs/CampaignPromotion', [
            'campaignPromotion' => $campaignPromotion,
        ]);
    }
    public function service()
    {
        $ourServices = Page::where('code', 'our-services')->orderBy('id', 'desc')->with('children')->first();
        $whatWeDeliver = Page::where('code', 'what-we-deliver')
            ->with(['children' => function ($query) {
                $query->orderBy('order_index', 'desc')
                    ->with('images'); // eager load images for children
            }])
            ->get();
        // return $whatWeDeliver;
        return Inertia::render('Sesor/Service/Index', [
            'whatWeDeliver' => $whatWeDeliver,
            'ourServices' => $ourServices,
        ]);
    }
}
