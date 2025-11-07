// src/pages/OfertaRent.jsx
import { useEffect } from "react";
import "../styles/register-theme.css"; // mavjud global theme / Calvero uslubi

export default function OfertaRent() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "CALVERO PLATFORM — Ommaviy Oferta";
  }, []);

  return (
    <main className="reg-wrapper" style={{ paddingBottom: 80 }}>
      <div className="reg-box" style={{ maxWidth: 980 }}>
        <header style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "var(--accent)",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                color: "var(--accent-ink)",
                boxShadow: "0 10px 24px rgba(246,199,0,.18)",
              }}
            >
              
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, letterSpacing: 0.2 }}>
                CALVERO PLATFORM
              </h1>
              <div style={{ color: "var(--subtext)", fontSize: 13 }}>
                Kvartira ijarasi bo‘yicha Ommaviy Oferta va Foydalanuvchi Ma'lumotlari Siyosati
              </div>
            </div>
          </div>
        </header>

        <section className="card" style={{ marginBottom: 14 }}>
          <div className="callout" style={{ padding: 12 }}>
            <strong>Diqqat:</strong> Ushbu hujjat — CALVERO PLATFORM (keyingi o‘rinlarda “Platforma”) foydalanuvchilari uchun ommaviy oferta hisoblanadi.
            Platformadan foydalanish bilan foydalanuvchi ushbu oferta shartlarini o‘qib, tushunib, qabul qilgan hisoblanadi.
          </div>
        </section>

        <section className="card" id="umumiy" style={{ marginBottom: 12 }}>
          <h2>1. Umumiy qoidalar</h2>
          <p>
            1.1. CALVERO PLATFORM — onlayn vositachilik xizmati bo‘lib, u <strong>ijara beruvchilar</strong> (uy egasi)
            bilan <strong>ijara oluvchilar</strong>ni bog‘lashga mo‘ljallangan. Platforma o‘z foydalanuvchilari o‘rtasida
            aloqa yaratish va e'lon joylashtirish imkoniyatini taqdim etadi.
          </p>
          <p>
            1.2. Platforma xizmatlari <strong>mutlaqo bepul</strong>. Platforma e’lonlarni joylashtirish, qidiruv va bog‘lash
            xizmatlari uchun foydalanuvchilardan to‘lov olmaydi.
          </p>
          <p>
            1.3. Ushbu oferta barcha foydalanuvchilarga nisbatan umumiy (ommaviy) shart sifatida amal qiladi.
          </p>
        </section>

        <section className="card" id="rol" style={{ marginBottom: 12 }}>
          <h2>2. Platformaning roli va javobgarlikni cheklash</h2>
          <ol>
            <li>
              2.1. Platforma <strong>faqat vositachi</strong> hisoblanadi: e’lon joylashtirish, kontaktlar taqdim etish va
              foydalanuvchilarni bir-biri bilan bog‘lash imkoniyatini yaratadi. Platforma hech qanday vaqtda uy egasi yoki
              ijarachi o‘rnida vakillik qilmaydi va tomonlar orasidagi kelishuvlarga aralashmaydi.
            </li>
            <li>
              2.2. E’lonlarda (obyavleniyalarda) berilgan ma’lumotlarning to‘g‘riligi, mulk huquqi, narx, holat, hujjatlar va
              to‘lov shartlari haqida to‘liq mas'uliyat <strong>e’lon beruvchi</strong> (uy egasi) zimmasidadir.
            </li>
            <li>
              2.3. Platforma quyidagilar uchun javobgar emas: moliyaviy yo‘qotishlar, aldov (firibgarlik), e'lon ma'lumotlarining
              mos kelmasligi, uyning holati, shartnoma buzilishi yoki tomonlar o‘rtasidagi nizolar.
            </li>
            <li>
              2.4. Platforma to‘lovlarni qabul qilmaydi va o‘tkazmaydi (agar alohida servislar keyinchalik joriy etilsa, bu alohida
              shartlarda ko‘rsatiladi). Platforma orqali amalga oshirilgan shaxsiy to‘lovlar yoki kelishuvlar uchun platforma
              kafolat bermaydi.
            </li>
          </ol>
        </section>

        <section className="card" id="elon" style={{ marginBottom: 12 }}>
          <h2>3. E’lonlarni joylashtirish va foydalanuvchi majburiyatlari</h2>
          <ol>
            <li>
              3.1. E’lonlarni faqat uy egasi (yoki uning ishonchli vakili) joylashtirishi mumkin. E’lon beruvchi o‘z ma’lumotlari
              va mulk huquqi haqida rostini aytishga majburdir.
            </li>
            <li>
              3.2. E’lon beruvchi quyidagilarni kafolatlaydi va ular uchun to‘liq javobgar hisoblanadi:
              <ul>
                <li>taqdim etilgan ma’lumotlar to‘liq va haqiqatga mos;</li>
                <li>mulkni ijaraga berish uchun kerakli huquqiy asos (hukm, ruxsatnoma, egalik hujjati va h.k.) mavjud;</li>
                <li>obyavleniya uchinchi shaxs huquqlarini buzmaydi.</li>
              </ul>
            </li>
            <li>3.3. Platformada noqonuniy, qonundan chet bo‘lgan yoki noqonuniy maqsadga yo‘naltirilgan e’lonlarni joylashtirish taqiqlanadi.</li>
          </ol>
        </section>

        <section className="card" id="privacy" style={{ marginBottom: 12 }}>
          <h2>4. Shaxsiy ma’lumotlarni yig‘ish, saqlash va foydalanish</h2>

          <p>
            4.1. Platforma quyidagi foydalanuvchi ma’lumotlarini tizimda saqlashi mumkin:
          </p>
          <ul>
            <li><strong>Ism</strong> (foydalanuvchi ismi);</li>
            <li><strong>Telefon raqam</strong> (aloqa uchun);</li>
            <li><strong>Manzil</strong> (foydalanuvchining umumiy yashash manzili — profil uchun);</li>
            <li><strong>Uy manzili</strong> (e’lonlarda ko‘rsatiladigan mulk manzili);</li>
          </ul>

          <p>
            4.2. Ma’lumotlardan foydalanish maqsadlari:
            <ul>
              <li>foydalanuvchilarni bir-biri bilan bog‘lash (aloqa taqdim etish);</li>
              <li>e’lonlarni ko‘rsatish va qidiruvni ta’minlash;</li>
              <li>xizmatlar uchun ichki xavfsizlik va texnik audit;</li>
              <li>foydalanuvchi so‘rovlari (masalan, ma’lumotlarni o‘chirish yoki tuzatish)ni bajarish.</li>
            </ul>
          </p>

          <p>
            4.3. Platforma shaxsiy ma’lumotlarni <strong>uchinchi shaxslarga sotmaydi, bermaydi va reklama maqsadida tarqatmaydi</strong>.
            Ma’lumotlar faqat quyidagi hollarda uchinchi shaxslarga uzatilishi mumkin:
            <ul>
              <li>qonuniy talab yoki sud hujjati bo‘lgan holatlar;</li>
              <li>foydalanuvchining o‘z roziligi bilan (aniq va ravshan so‘rov asosida);</li>
              <li>platformaning ichki xavfsizlik yoki insident tekshiruvlari doirasida, ammo bunday uzatishlar minimal ma'lumot bilan cheklanadi.</li>
            </ul>
          </p>

          <p>
            4.4. Foydalanuvchi o‘z ma’lumotlarini ko‘rish, yangilash yoki o‘chirib tashlashni so‘rashi mumkin. Asosli so‘rov bo‘yicha Platforma ma’lumotlarni oqilona muddat ichida o‘chiradi yoki anonimlashtiradi, lekin ba’zi ma’lumotlarni texnik yoki qonuniy talablar tufayli saqlash majburiyati bo‘lishi mumkin (masalan, xavfsizlik yozuvlari).
          </p>

          <p style={{ fontWeight: 700 }}>
            4.5. Platforma e’lonlarni <em>platforma ichida</em> boshqa faol foydalanuvchilarga ko‘rsatishi mumkin; biroq tashqi (3-shaxs) tashkilotlarga ma’lumot uzatilmaydi, agar ustavda yoki qonunda boshqacha talab bo‘lmasa.
          </p>
        </section>

        <section className="card" id="nizolar" style={{ marginBottom: 12 }}>
          <h2>5. Nizolar, yolg‘on e’lonlar va mas’uliyat</h2>
          <ol>
            <li>
              5.1. Platforma hech qanday tarzda uy egasi va ijarachi o‘rtasidagi shartnoma yoki kelishuvning bajarilishini kafolatlamaydi.
            </li>
            <li>
              5.2. Har qanday kelishmovchilik, bahs yoki davolanish tomonlar o‘zaro hal qilishlari kerak. Platforma bu jarayonlarga aralashmaydi va taraflarning manfaatlarini himoya qilmaydi.
            </li>
            <li>
              5.3. Yolg‘on, chalg‘ituvchi yoki qonunga xilof e’lonlarni joylashtirish qat'iyan taqiqlanadi. Bunday holatlarda Platforma e’lonni o‘chirish, foydalanuvchini bloklash yoki qonuniy tashkilotlarga xabar berish huquqiga ega.
            </li>
            <li>
              5.4. Platforma moliyaviy yo‘qotishlar, undiruv, firibgarlik yoki uchinchi tomon tomonidan yetkazilgan zarar uchun javobgar emas.
            </li>
          </ol>
        </section>

        <section className="card" id="foydalanish" style={{ marginBottom: 12 }}>
          <h2>6. Xizmatlardan foydalanish qoidalari</h2>
          <ul>
            <li>6.1. Platformadan faqat qonuniy maqsadlarda foydalanish talab etiladi.</li>
            <li>6.2. Qonundan tashqari, jamiyat uchun xavfli yoki noqonuniy mazmundagi e’lonlarni joylashtirish man etiladi va bunday holatlar platforma tomonidan olib tashlanadi.</li>
            <li>6.3. Platforma foydalanuvchilari o‘zaro teng va hurmatli munosabatda bo‘lishlari lozim.</li>
          </ul>
        </section>

        <section className="card" id="maxfiy" style={{ marginBottom: 12 }}>
          <h2>7. Maxfiylik, xavfsizlik va texnik chora-tadbirlar</h2>
          <p>
            7.1. Platforma ma’lumotlarni himoyalash uchun sanoat standartlariga mos texnik va tashkiliy chora-tadbirlarni qo‘llaydi:
            (masalan, ma’lumotlar bazasida xavfsiz saqlash, HTTPS, parollarni xeshlash, kirish huquqlarini cheklash va audit yozuvlari).
          </p>
          <p>
            7.2. Platforma xavfsizlik insidenti yuz bergan taqdirda foydalanuvchilarga tegishli ogohlantirishlarni berish va vaziyatni o‘rganish uchun choralar ko‘radi.
          </p>
        </section>

        <section className="card" id="ozgartirish" style={{ marginBottom: 12 }}>
          <h2>8. Ofertaning o‘zgarishi va yangilanish</h2>
          <p>
            8.1. Platforma ushbu ofertani istalgan vaqtda yangilash yoki o‘zgartirish huquqiga ega. Yangilangan shartlar
            e’lon qilingandan so‘ng, Platformadan foydalanishda foydalanuvchi avtomatik ravishda yangilangan shartlarni qabul
            qilgan hisoblanadi.
          </p>
        </section>

        <section className="card" id="aloqa" style={{ marginBottom: 12 }}>
          <h2>9. Murojaat va aloqa</h2>
          <p>
            Agar sizda savol, da'vo yoki huquqiy talab bo‘lsa, iltimos biz bilan quyidagi manzil orqali bog‘laning:
          </p>
          <p>
            <strong>Elektron pochta:</strong> <a href="mailto:operatorcalvero@gmail.com">operatorcalvero@gmail.com</a>
          </p>
        </section>

        <section className="card" style={{ marginBottom: 12 }}>
          <h2>10. Yakuniy bandlar (talab va tavsiyalar)</h2>
          <ul>
            <li>10.1. Ushbu oferta Platforma va foydalanuvchilar o‘rtasidagi munosabatlarni tartibga soladi; har qanday aloqalar va kelishuvlar
            tomonlar o‘rtasida shakllanadi va Platforma tarafidan moderatsiya qilinadi, lekin unga kafolat berilmaydi.</li>

            <li>
              10.2. Platforma sizning profil va e’lon ma’lumotlaringizni Platforma ichida ko‘rsatishi mumkin (masalan, boshqalar sizni topishi uchun).
              Biroq ushbu ma’lumotlar hech qanday tashqi tashkilotlarga sotilmaydi yoki reklama maqsadida tarqatilmaydi, qonuniy talab bo‘lgan holatlar bundan mustasno.
            </li>

            <li>
              10.3. Agar siz ushbu shartlarga rozi bo‘lmasangiz, iltimos Platformadan foydalanishni darhol to‘xtating.
            </li>

            
          </ul>
        </section>

        <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ color: "var(--subtext)", fontSize: 13 }}>
            © {new Date().getFullYear()} CALVERO PLATFORM — Barchamiz uchun halollik va xavfsizlik.
          </div>
          <div>
            <a
              className="reg-btn"
              href="/register"
              style={{ textDecoration: "none", display: "inline-block", marginRight: 8 }}
            >
              Orqaga
            </a>
            <a
              className="reg-btn"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Boshiga
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
