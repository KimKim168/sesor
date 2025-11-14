<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Career;
use App\Models\Faq;
use App\Models\Link;
use App\Models\Page;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SesorFrontPageController extends Controller
{
    /**
     * Display the homepage.
     */
    public function index()
    {
        // Campaign Promotion
        $campaignPromotion = Page::where('code', 'campaign-promotion')
            ->with('images')->first();

        // Banners
        $slides = Banner::where('type_code', 'home-banner-first')
            ->orderByDesc('id')->get();
        $backgroundSecond = Banner::where('type_code', 'home-banner-second')
            ->orderByDesc('id')->first();
        $backgroundThird = Banner::where('type_code', 'home-banner-third')
            ->orderByDesc('id')->first();
        $backgroundFourth = Banner::where('type_code', 'home-banner-fourth')
            ->orderByDesc('id')->first();
        $backgroundFifth = Banner::where('type_code', 'home-banner-fifth')
            ->orderByDesc('id')->first();

        // Heroes
        $firstHero = Page::where('code', 'download-the-sesor-express-apps')
            ->with('images')->first();
        $playStoreAndroid = Type::where('code', 'sesor-driver-and-express-android')
            ->with('links')->get();
        $appStoreIOS = Type::where('code', 'sesor-driver-and-express-ios')
            ->with('links')->get();
        $secondHero = Page::where('code', 'track-trace')
            ->with('images')->first();
        $thirdHero = Page::where('code', 'deliver-smarter')
            ->with('images')->first();
        $fourthHero = Page::where('code', 'set-your-delivery-plan')
            ->with('images')->first();
        $fifthHero = Page::where('code', 'faqs')
            ->with('images')->first();

        // Services and FAQs
        $ourServices = Page::where('code', 'our-services')
            ->with('children')->first();
        $faqs = Faq::where('type_code', 'faq-1')
            ->orderByDesc('order_index')->get();

        return Inertia::render('Sesor/Index', [
            'slides' => $slides,
            'campaignPromotion' => $campaignPromotion,
            'backgroundSecond' => $backgroundSecond,
            'firstHero' => $firstHero,
            'playStoreAndroid' => $playStoreAndroid,
            'appStoreIOS' => $appStoreIOS,
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

    /**
     * Display About Us page.
     */
    public function about()
    {
        $whoWeAre = Page::where('code', 'who-we-are')->first();
        $vision = Page::where('code', 'vision')->with(['children.images'])->get();
        $mission = Page::where('code', 'mission')->with(['children.images'])->get();
        $coreValues = Page::where('code', 'core-values')
            ->with(['children' => fn($q) => $q->orderByDesc('order_index')->with('images')])
            ->get();
        $ourTeam = Page::where('code', 'our-team')
            ->with(['children' => fn($q) => $q->orderByDesc('order_index')->with('images')])
            ->get();
        $whoWeDeliverFor = Page::where('code', 'who-we-deliver-for')->with('images')->first();

      $career = Career::orderBy('id', 'desc')->get();
// return $career;
        return Inertia::render('Sesor/AboutUs/Index', [
            'whoWeAre' => $whoWeAre,
            'vision' => $vision,
            'mission' => $mission,
            'coreValues' => $coreValues,
            'ourTeam' => $ourTeam,
            'whoWeDeliverFor' => $whoWeDeliverFor,
            'career' => $career,
        ]);
    }

    /**
     * Display Campaign Promotion page.
     */
    public function campaign_promotion()
    {
        $campaignPromotion = Page::where('code', 'campaign-promotion')
            ->with('images')->first();

        return Inertia::render('Sesor/AboutUs/CampaignPromotion', [
            'campaignPromotion' => $campaignPromotion,
        ]);
    }

    /**
     * Display Services page.
     */
    public function service()
    {
        $ourServices = Page::where('code', 'our-services')->with('children')->first();

        $whatWeDeliver = Page::where('code', 'what-we-deliver')
            ->with(['children' => fn($q) => $q->orderByDesc('order_index')->with('images')])
            ->get();

        $prohibitedItems = Page::where('code', 'prohibited-items')
            ->with(['children' => fn($q) => $q->orderByDesc('order_index')->with('images')])
            ->get();

        $restrictedItems = Page::where('code', 'restricted-items')
            ->with(['children' => fn($q) => $q->orderByDesc('order_index')->with('images')])
            ->get();

        $chargesRates = Page::where('code', 'charges-rates')
            ->with('images')->first();

        $benefits = Page::where('code', 'benefits')
            ->with(['children' => fn($q) => $q->orderByDesc('order_index')->with('images')])
            ->get();

        $inquiryLeadFormHeader = Page::where('code', 'inquiry-lead-form')
            ->with('images')->first();

        return Inertia::render('Sesor/Service/Index', [
            'whatWeDeliver' => $whatWeDeliver,
            'ourServices' => $ourServices,
            'prohibitedItems' => $prohibitedItems,
            'restrictedItems' => $restrictedItems,
            'chargesRates' => $chargesRates,
            'benefits' => $benefits,
            'inquiryLeadFormHeader' => $inquiryLeadFormHeader,
        ]);
    }
}
