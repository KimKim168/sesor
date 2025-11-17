<?php

namespace App\Helpers;

use App\Models\OrderItem;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramHelper
{
    public static function sentInquiryForm($sent_data)
    {
        $token  = env('TELEGRAM_BOT_TOKEN');
        $chatId = env('TELEGRAM_GROUP_CHAT_ID');
        // dd($chatId);

        if (!$token || !$chatId) {
            return ['success' => false, 'message' => 'Telegram configuration is missing.'];
        }

        try {
            // Construct the message text
            $text = "📩 *Inquiry Lead Form:*\n\n"
                . "*Name:* " . ($sent_data->name ?? '-') . "\n"
                . "*Phone:* " . $sent_data->phone . "\n"
                . "*Email:* " . ($sent_data->email ?? '-') . "\n"
                . "*Contact Method:* " . ($sent_data->contact_method ?? '-') . "\n"
                . "*Business/Store Name:* " . ($sent_data->business_or_store_name ?? '-') . "\n"
                . "*Message:* " . ($sent_data->message ?? '-') . "\n";
            // dd($text);

            // Send message via Telegram Bot API
            $response = Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                'chat_id'    => $chatId,
                'text'       => $text,
                'parse_mode' => 'Markdown',
            ]);

            if ($response->successful()) {
                return ['success' => true, 'message' => 'Message sent successfully!'];
            } else {
                Log::error('Telegram Message failed: ' . $response->body());
                return ['success' => false, 'message' => 'Failed to send message. ' . $response->body()];
            }
        } catch (\Exception $e) {
            Log::error('Telegram Message exception: ' . $e->getMessage());
            return ['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()];
        }
    }

    // public static function sendOrderItems($order)
    // {
    //     $token = env('TELEGRAM_BOT_TOKEN');
    //     $chatId = env('TELEGRAM_GROUP_CHAT_ID');
    //     $isLocalhost = env('TETELGRAM_LOCALHOST');

    //     if (!$token || !$chatId) {
    //         return ['success' => false, 'message' => 'Telegram configuration is missing.'];
    //     }

    //     try {
    //         $orderItems = OrderItem::where('order_id', $order->id)->get();
    //         $media = [];

    //         foreach ($orderItems as $index => $orderItem) {
    //             $item = Item::with('images')->find($orderItem->item_id);

    //             if (!$item || $item->images->isEmpty()) {
    //                 continue;
    //             }

    //             // Assuming images are stored in /assets/images/items/thumb/ accessible via your public URL
    //             $imageUrl = url('/assets/images/items/thumb/' . $item->images[0]->image);

    //             $photo = [
    //                 'type'  => 'photo',
    //                 'media' => !$isLocalhost ? $imageUrl : 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Card-Model-S-Desktop.png',
    //             ];

    //             if ($index === 0) {
    //                 $caption  = "🚀 <b>New order ID: {$order->id} placed!</b>\n\n";
    //                 $caption .= "<b>Name:</b> " . (Auth::user()->name ?? '-') . "\n";
    //                 $caption .= "<b>Phone:</b> " . Auth::user()->phone . "\n";
    //                 $caption .= "<b>Note:</b> " . ($order->note ?? '-') . "\n\n";

    //                 $caption .= "<b>Amount:</b> " .  '$ ' . ($order->total_amount ?? '-') . "\n";
    //                 $caption .= "<b>Status:</b> " . 'Pending' . "\n";

    //                 $caption .= "<b>Shop:</b> " . ($order->shop?->name ?? '-') . "\n";

    //                 $photo['caption']     = $caption;
    //                 $photo['parse_mode']  = 'HTML';
    //             }

    //             $media[] = $photo;
    //         }

    //         if (empty($media)) {
    //             return ['success' => false, 'message' => 'No images found to send.'];
    //         }

    //         $response = Http::post("https://api.telegram.org/bot{$token}/sendMediaGroup", [
    //             'chat_id' => $chatId,
    //             'media'   => json_encode($media),
    //         ]);

    //         // Send button message
    //         Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
    //             'chat_id' => $chatId,
    //             'text' => "View Order Detail!",
    //             'reply_markup' => json_encode([
    //                 'inline_keyboard' => [
    //                     [
    //                         ['text' => 'View Order', 'url' => config('app.url') . "/admin/orders/" . $order->id]
    //                     ]
    //                 ]
    //             ])
    //         ]);

    //         if ($response->successful()) {
    //             return ['success' => true, 'message' => 'Album sent!'];
    //         } else {
    //             Log::error('Telegram sendMediaGroup failed: ' . $response->body());
    //             return ['success' => false, 'message' => 'Failed to send album. ' . $response->body()];
    //         }
    //     } catch (\Exception $e) {
    //         Log::error('Telegram sendOrderItems exception: ' . $e->getMessage());
    //         return ['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()];
    //     }
    // }

    public static function sentCareerSubmit($sent_data)
    {
        try {
            $token  = env('TELEGRAM_BOT_TOKEN');
            $chatId = env('TELEGRAM_GROUP_CHAT_ID');
            $appUrl = env('APP_URL');

            if (!$token || !$chatId) {
                throw new \Exception('Telegram configuration is missing.');
            }

            // Build file URL
            // $pdfUrl = 'https://elibrary-rule.com/stream_pdf/thesis/646/LAW2020%20%2847%29.pdf';
            $pdfUrl = $appUrl . '/' . $sent_data->file_path;
            // dd($pdfUrl);

            // Caption message
            $caption  = "🔥<b>New Career Submit!</b>\n\n";
            $caption .= "<b>Name</b>: {$sent_data->name}\n";
            $caption .= "<b>Position</b>: {$sent_data->position}\n";
            $caption .= "<b>Email</b>: {$sent_data->email}\n";
            $caption .= "<b>Phone</b>: {$sent_data->phone_number}\n";

            // Send to Telegram
            $response = Http::post("https://api.telegram.org/bot{$token}/sendDocument", [
                'chat_id'    => $chatId,
                'document'   => $pdfUrl,
                'caption'    => $caption,
                'parse_mode' => 'HTML',
            ]);

            if (!$response->successful()) {
                throw new \Exception('Telegram API Error: ' . $response->body());
            }

            return [
                'success' => true,
                'message' => 'Success sent to Telegram group.'
            ];
        } catch (\Exception $e) {
            // You said "just throw the error", so here it is
            throw $e;
        }
    }
}
