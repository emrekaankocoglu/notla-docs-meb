import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Sayfa bölgelerini işaretleme',
  description:
    'Adım 3 — Kimlik, soru ve cevap bölgelerini işaretleme; AI tarafından otomatik bölge önerileri ve elle düzeltme.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'neden-bolgeler', title: 'Neden bölge işaretliyoruz?' },
  { id: 'isleniyor', title: 'Bölgeler işleniyor' },
  { id: 'otomatik-isimler', title: 'AI tarafından isimlendirilmiş bölgeler' },
  { id: 'bolge-secimi', title: 'Bölgeleri sorulara eşleme' },
  { id: 'bolge-secimi-2', title: 'Eşleme sonrası — gerçek soru adları' },
  { id: 'kimlik', title: 'Kimlik bölgesi ekleme' },
  { id: 'tamamlandi', title: 'Tüm bölgeler tamam' },
]

export default function SayfaBolgeleriPage() {
  return (
    <DocPage
      title="Sayfa bölgelerini işaretleme"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Sihirbazın üçüncü adımı, taslak üzerindeki her bir alanın hangi
        amaca hizmet ettiğini belirlemenizdir. Sistem üç tür bölge
        tanır: <strong>Kimlik</strong> (öğrencinin adının yazılacağı
        yer), <strong>Soru</strong> (sorunun metni) ve{' '}
        <strong>Cevap</strong> (öğrencinin yazacağı boşluk).
      </p>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="neden-bolgeler">Neden bölge işaretliyoruz?</h2>
        <p>
          Bölgeleri işaretlemek üç amaca hizmet eder:
        </p>
        <ul>
          <li>
            <strong>Kimlik bölgesi</strong>, öğrenci kağıtları
            yüklendiğinde her sayfayı doğru öğrenciye otomatik
            eşleştirmek için kullanılır.
          </li>
          <li>
            <strong>Soru bölgeleri</strong>, AI&apos;a hangi sorunun nerede
            olduğunu söyler; öğrenci kağıtlarını sayfa sayfa
            okuduğunda hangi cevabın hangi soruya ait olduğunu bilir.
          </li>
          <li>
            <strong>Cevap bölgeleri</strong>, sadece o alandaki
            yazıların değerlendirilmesini garanti eder; başka yere
            yapılmış notlar değerlendirmeyi karıştırmaz.
          </li>
        </ul>
        <Callout title="En az bir kimlik bölgesi gerekli">
          Devam edebilmek için tüm sayfalarda en az bir kimlik bölgesi
          tanımlanmış olmalıdır. Bir veya daha fazla isimlendirme
          bölgesi eksikse sistem ekranda turuncu uyarı gösterir ve
          ilerlemenize izin vermez.
        </Callout>
      </section>

      <hr />

      <ScreenSection
        id="isleniyor"
        title="Bölgeler işleniyor"
        intro="Soruları onayladıktan sonra otomatik olarak Adım 3'e geçersiniz. Sistem önce taslak üzerinde olası bölgeleri bulmaya çalışır; bu birkaç dakika sürebilir."
        image="/screenshots/step3-regions-loading.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Adım 03 Bölgeleri seçin; sol tarafta 'Gerekli Bölgeler' listesi (Sayfa 1 Kimlik Bölgesi, Soru 1-3 Soru ve Cevap Bölgeleri turuncu üçgenli, henüz tamamlanmamış); ortada 'Bölgeler işleniyor' yükleniyor mesajı; alt kısımda iki turuncu uyarı."
        caption="Bölgeler analiz ediliyor"
      >
        <ul>
          <li>
            Sol kısımdaki <strong>Gerekli Bölgeler</strong> listesi, sistemin
            beklediği tüm bölgelerin durumunu gösterir. Turuncu üçgen
            henüz oluşturulmadığı, yeşil onay ise hazır olduğu
            anlamına gelir.
          </li>
          <li>
            <strong>Analizi İptal Et</strong> bağlantısı, beklemek istemiyorsanız
            tüm bölgeleri elle çizmenize olanak tanır.
          </li>
          <li>
            Aşağıdaki ikinci uyarı, otomatik değerlendirmenin
            çalışabilmesi için tüm soru ve cevap bölgelerinin
            işaretlenmiş olması gerektiğini hatırlatır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="otomatik-isimler"
        title="AI tarafından isimlendirilmiş bölgeler"
        intro="Analiz tamamlanınca sistem her bölgeyi otomatik olarak Soru/Cevap olarak etiketler. Yeşil renk Cevap Bölgesi (CB), mavi renk Soru Bölgesi (SB) içindir. Henüz Kimlik bölgesi olmadığı için sol panel üst kısmı turuncu uyarı içerir."
        image="/screenshots/step3-regions-named.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Adım 03; sayfa üzerinde mavi (Soru 1 - SB, Soru 2 - SB, vb.) ve yeşil (Soru 1 - CB, Soru 2 - CB, vb.) bölge etiketleri; sol panelde Soru 1-3 için Soru ve Cevap Bölgeleri yeşil onayla, Sayfa 1 Kimlik Bölgesi turuncu uyarıyla görünüyor."
        caption="Otomatik etiketlenmiş bölgeler — soru/cevap ayrımı renkle"
      >
        <ul>
          <li>
            <strong>SB (Soru Bölgesi)</strong> mavi çerçeveyle gösterilir;
            sorunun metnini içerir.
          </li>
          <li>
            <strong>CB (Cevap Bölgesi)</strong> yeşil çerçeveyle gösterilir;
            öğrencinin yazacağı boşluğu kapsar.
          </li>
          <li>
            Bölge çerçevelerinin kenarlarından sürükleyerek boyutlandırma
            yapabilir, ortasından tutarak yer değiştirebilirsiniz.
          </li>
          <li>
            Bir bölgeyi silmek için sağ üstteki <code>×</code> simgesini
            kullanın; yanlış bölge oluştuysa silip yeniden çizmek
            mümkündür.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="bolge-secimi"
        title="Bölgeleri sorulara eşleme"
        intro="Bir bölgeyi tıkladığınızda 'Bölge Seç' küçük dialogu açılır. Bu dialogdan bölgenin hangi soruya/kimliğe ait olduğunu seçebilirsiniz. AI bunu çoğunlukla doğru tahmin eder; uyumsuzluk varsa elle düzeltebilirsiniz."
        image="/screenshots/step3-regions-naming-dialog.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Adım 03; sol panelde Gerekli Bölgeler listesi, sayfa üzerinde küçük 'Bölge Seç' dialogu açık; içinde 'İsim - Sayfa 1' seçili, Kaydet ve Vazgeç düğmeleri görünüyor."
        caption="Bir bölgeyi seçilen göreve eşleme dialogu"
      >
        <ul>
          <li>
            <strong>Bölge Seç</strong> açılır menüsünde tüm sorular ve
            kimlik seçenekleri listelenir; bölgeyi seçtiğiniz adla
            yeniden etiketler.
          </li>
          <li>
            Üstteki boş kutu yeni bir kimlik bölgesi oluşturmak için
            ipucu olarak görünür; ileride değineceğiz.
          </li>
          <li>
            <strong>Kaydet</strong> bölgenin yeni atamasını uygular;{' '}
            <strong>Vazgeç</strong> dialogu kapatır ve bölge önceki
            atanmasıyla kalır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="bolge-secimi-2"
        title="Eşleme sonrası — gerçek soru adları"
        intro="Bir bölgeyi belirli bir soruya eşledikten sonra etiketi 'Soru 1 - SB' yerine sorunun gerçek başlığına dönüşür: 'Q1 Homojen ve Heterojen Karışımlar - SB' / 'CB' gibi."
        image="/screenshots/step3-regions-mapped-grid.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Adım 03; sayfa üzerinde Q1 Homojen ve Heterojen Karışımlar - SB, Q1 - CB, Q2 Çözeltilerin Donma Noktası - SB, Q5 Kabartma Tozu Formülü ve Adı - SB, Q6 Polimerlerin Kullanım Nedenleri - SB gibi soru başlıklarıyla etiketlenmiş bölgeler; sol panelde tüm soru bölgeleri yeşil tikli."
        caption="Bölgeler her soruya eşlendikten sonra"
      >
        <ul>
          <li>
            Bir soru bölgesi (SB) ile cevap bölgesi (CB) çiftinin aynı
            soruya bağlı olması gerekir. Sistem aksi durumda hata
            vermez ama notlandırma sırasında kafa karıştırıcı sonuçlar
            doğabilir.
          </li>
          <li>
            Birden fazla bölgenin aynı soruya bağlanması mümkündür;
            örneğin uzun bir cevap alanı iki ayrı CB olarak
            tanımlanabilir.
          </li>
          <li>
            Sol paneldeki yeşil tikler eşlemenin başarıyla
            kaydedildiğini doğrular.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="kimlik"
        title="Kimlik bölgesi ekleme"
        intro="Sayfa üzerinde boş bir alanı sürükleyerek yeni bir bölge çizip 'İsim - Sayfa 1' olarak işaretleyin. Bu bölge öğrencinin adını yazacağı yerdir ve sistem yüklenen kağıtları otomatik olarak doğru öğrenciye eşleyebilmek için bunu kullanır."
        image="/screenshots/step3-regions-success.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Adım 03; sayfanın sağ üstünde turuncu 'İsim - Sayfa 1' etiketli boş kutu, diğer Soru ve Cevap bölgeleri olduğu gibi; sol panelde tüm gerekli bölgelerin yanında yeşil tik, altta 'Tamamlandı! İsimlendirme ve sorular için tüm bölgeler eklenmiştir.' mesajı."
        caption="Kimlik bölgesi eklendi — sayfanın üst kısmında"
      >
        <ul>
          <li>
            <strong>İsim bölgesi</strong> kağıdın üst kısmında, öğrencinin
            adını yazdığı yere konumlandırılmalıdır. Çok büyük tutmak
            okumayı zorlaştırabilir; çok küçük tutmak ise eşlemeyi
            başarısız kılabilir.
          </li>
          <li>
            Birden fazla sayfanız varsa <strong>her sayfa için ayrı bir
            isim bölgesi</strong> tanımlamanız gerekir. Sayfaların
            sırasını yine de takip edebilirsiniz, ancak isim bölgeleri
            karışmaması için ayrıdır.
          </li>
          <li>
            Sol paneldeki <strong>Tamamlandı!</strong> mesajı, devam
            etmek için tüm gerekli bölgelerin hazır olduğunu doğrular.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="tamamlandi"
        title="Tüm bölgeler tamam — başka türlü düzenleme"
        intro="Bölge düzenini istediğinizde değiştirebilirsiniz; AI tarafından bulunan bölgeleri silmek, taşımak veya yeniden adlandırmak istediğiniz zaman mümkündür."
        image="/screenshots/step3-regions-naming-dialog2.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Adım 03; sayfa üzerinde küçük 'Bölge Seç' dialogu açık (İsim - Sayfa 1 seçili), arkada Soru 1 SB ve CB ile diğer bölgeler görünüyor."
        caption="Bir bölgenin atamasını sonradan değiştirme"
      >
        <ul>
          <li>
            Bölge etiketinin üzerine tıklayıp <strong>Bölge Seç</strong>{' '}
            dialogunu yeniden açabilir, başka bir soru/kimlik
            tanımlayabilirsiniz.
          </li>
          <li>
            Yanlış bir bölge oluştursanız bile{' '}
            <strong>AI ile Yeniden Analiz Et</strong> bağlantısıyla
            sıfırdan başlayabilirsiniz; bu işlem mevcut bölgeleri
            silebilir, dikkatli olun.
          </li>
          <li>
            Tüm bölgeler tamam olduğunda sağ alttaki{' '}
            <strong>Devam et</strong> düğmesi yeşile döner ve sizi bir
            sonraki ana adıma —{' '}
            <a href="/docs/kagit-yukleme">Öğrenci kağıtlarını yükleme</a>{' '}
            — götürür.
          </li>
        </ul>
      </ScreenSection>
    </DocPage>
  )
}
