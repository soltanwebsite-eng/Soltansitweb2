# SULTAN – موقع السلطان لصيانة الهواتف وبيع الإكسسوارات

موقع Next.js مستقل بواجهة عربية RTL وتصميم أسود/ذهبي، ومتصل بمشروع Supabase الجديد المحدد أدناه.

## المزايا
- متجر عام يعرض **صورة السلعة واسمها ووصفها وسعرها** والمخزون.
- لوحة الإدارة: إضافة السلع وتعديلها وحذفها ورفع صورها وتحديد السعر والمخزون.
- سلة وطلب شراء بالدفع عند الاستلام، مع حساب السعر والتحقق من المخزون داخل قاعدة البيانات بواسطة `place_store_order`.
- طلب صيانة مع معلومات الزبون والجهاز والعطل وصورة اختيارية خاصة.
- رقم متابعة فريد لكل جهاز.
- صفحة متابعة لا تعرض بيانات الطلب إلا عند تطابق **رقم الطلب ورقم الهاتف** معاً عبر `track_repair`؛ لا توجد قائمة عامة للهواتف أو طلبات الصيانة.
- لوحة إدارة تعرض طلبات الصيانة للموظفين فقط، وتتيح التشخيص والحالة والسعر التقديري.
- حالات الصيانة: تم الاستلام، تحت الصيانة، تم التصليح، تم التسليم.
- صور الصيانة خاصة وتُعرض للموظف عبر Signed URL قصير المدة.

## المشروع المرتبط
- Supabase URL: `https://hpkaqrvyphljvyfkitwj.supabase.co`
- Project ref: `hpkaqrvyphljvyfkitwj`
- GitHub المقصود: `https://github.com/soltanwebsite-eng/Soltansitweb`
- Render workspace المقصود: `Hano's workspace`

## تشغيل محلياً
1. ثبّت Node.js 20 أو أحدث.
2. انسخ `.env.example` إلى `.env.local` وضع مفتاح Supabase Publishable الحالي في `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. نفّذ `npm install` ثم `npm run dev`.
4. افتح `http://localhost:3000`.

## إعداد Render
- Runtime: Node
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL=https://hpkaqrvyphljvyfkitwj.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable key>`

## صلاحيات الإدارة
سجّل المستخدم في Supabase Auth ثم امنحه `app_metadata.role` بقيمة `owner` أو `staff` من مكان إداري موثوق. لا تستخدم `user_metadata` للصلاحيات. بعد تعديل app_metadata يجب تسجيل الخروج والدخول لتجديد JWT.

## قواعد الخصوصية المهمة
- لا تعرض جدول `repairs` للزائر ولا تمنح anon SELECT عليه.
- التتبع العام يتم حصراً عبر RPC `track_repair(p_ticket,p_phone)`، الذي يرجع حقول الجهاز والحالة وسجل الحالة فقط عند تطابق الرقمين.
- صور `repair-intake` خاصة، بينما `product-images` عام لعرض صور السلع.
- لا تضع `service_role` في متغيرات `NEXT_PUBLIC_` أو في المتصفح.

## ملاحظة قاعدة البيانات
هذا التطبيق يستخدم الجداول الموجودة مسبقاً: `products`, `repairs`, `repair_status_history`, `store_orders`, `store_order_items`، والدوال الموجودة: `track_repair`, `place_store_order`, `update_repair_admin`. لا يحتوي المشروع على بيانات تجريبية لزبائن حقيقيين.

## تكاملات خارجية
لم يتم ربط WhatsApp API أو البريد أو Facebook لعدم توفر بيانات اعتمادها. خيار التواصل في طلب الصيانة يسجل الوسيلة المفضلة فقط.


## التواصل عبر Facebook
رابط صفحة المحل: https://www.facebook.com/profile.php?id=61596877222106 (يظهر في تذييل الموقع).
