import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Ders oluşturma',
  description:
    'Üç adımlı ders oluşturma sihirbazı: ders bilgilerini girme, öğretmen ekleme ve öğrencileri kaydetme.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'genel-bakis', title: 'Genel bakış' },
  { id: 'adim-1', title: 'Adım 1 — Ders bilgileri' },
  { id: 'adim-2', title: 'Adım 2 — Öğretmen ekle' },
  { id: 'adim-3', title: 'Adım 3 — Öğrencileri kaydet' },
  { id: 'adim-3-bos', title: 'Adım 3 — Hiç seçim yok' },
  { id: 'sonra-ne-olur', title: 'Sonra ne olur?' },
]

export default function DersOlusturmaPage() {
  return (
    <DocPage title="Ders oluşturma" tableOfContents={tableOfContents}>
      <p className="lead">
        Yeni bir ders, üç adımlı bir sihirbaz aracılığıyla oluşturulur:
        önce dersin temel bilgileri girilir, ardından bir veya birden çok
        öğretmen atanır ve son olarak derse kayıtlı öğrenciler seçilir.
        Her adım otomatik olarak kaydedilir; ortada bırakırsanız sonradan
        kaldığınız yerden devam edebilirsiniz.
      </p>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="genel-bakis">Genel bakış</h2>
        <p>
          Ders oluşturma sihirbazını başlatmak için <code>Dersler</code>{' '}
          sayfasındaki <strong>Yeni ders ekle</strong> kartına
          tıklayın. Açılan dialog üst kısmında üç adımlık ilerleme
          çubuğunu görürsünüz: <em>Ders oluştur</em>,{' '}
          <em>Öğretmen ekle</em>, <em>Öğrencileri kaydet</em>.
        </p>
        <Callout title="Önce kullanıcılarınızı ekleyin">
          Sihirbazın 2. ve 3. adımlarında öğretmen ve öğrenciler kurum
          kullanıcıları arasından seçilir. Henüz kullanıcı eklemediyseniz
          önce <a href="/docs/kullanicilar">Kişiler</a> ekranından
          tanımlamanız gerekir.
        </Callout>
      </section>

      <hr />

      <ScreenSection
        id="adim-1"
        title="Adım 1 — Ders bilgileri"
        intro="İlk adımda dersin adını ve kısa bir açıklamasını girin. Bu bilgiler hem koordinatörlerin gördüğü ders kartında hem de derse kayıtlı kullanıcıların listesinde görünür."
        image="/screenshots/course-create-step1.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Step 1 Ders oluştur dialogu; İsim ve Açıklama alanları boş, sağ altta Oluştur düğmesi yer alıyor."
        caption="Adım 1 — Ders oluştur formu"
      >
        <ul>
          <li>
            <strong>İsim</strong> alanına dersin görünen adını yazın
            (örnek: <code>Türkçe Dersi</code>, <code>Fen Bilimleri</code>).
          </li>
          <li>
            <strong>Açıklama</strong> kısmı isteğe bağlıdır; sınıf,
            dönem veya konu gibi bilgileri eklemek için kullanışlıdır.
          </li>
          <li>
            <strong>Oluştur</strong> düğmesine bastığınızda ders kaydedilir
            ve sihirbaz otomatik olarak Adım 2&apos;ye geçer.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="adim-2"
        title="Adım 2 — Öğretmen ekle"
        intro="İkinci adımda derse en az bir öğretmen atamanız gerekir. Açılan tabloda kurumdaki tüm kullanıcılar listelenir; öğretmen olarak eklemek istediğiniz kişileri işaretleyip Ekle düğmesine basın."
        image="/screenshots/course-create-step2-teachers.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Step 2 Öğretmen ekle dialogu; Fatma Koç ve Emre Öztürk seçilmiş, sağ üstte +Ekle düğmesi aktif, alt kısımda 16 kişiden 2 kişi seçildi yazıyor."
        caption="Adım 2 — Kuruluşunuzdaki kullanıcıları öğretmen olarak ekleyin"
      >
        <ul>
          <li>
            <strong>Arama kutusu</strong> isim, kurumsal kimlik, e-posta
            veya kullanıcı adına göre filtreleme yapar.
          </li>
          <li>
            <strong>Profile Git</strong> bağlantısı bir kullanıcının
            ayrıntılarını ayrı bir sekmede açar; emin değilseniz seçimden
            önce profili kontrol edin.
          </li>
          <li>
            Sayfalı tablonun altında <strong>kaç kişi seçildi</strong>{' '}
            bilgisi görünür. Birden fazla öğretmen seçebilirsiniz.
          </li>
          <li>
            <strong>Tabloya geri dön</strong> düğmesi seçimi temizlemeden
            tabloya geri döner. <strong>+ Başka bir kaynaktan otomatik
            seç</strong> dış sistemlerden (CSV vb.) toplu seçim yapmaya
            olanak tanır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="adim-3"
        title="Adım 3 — Öğrencileri kaydet"
        intro="Üçüncü ve son adımda derse kaydolacak öğrencileri seçin. Tablo Adım 2 ile aynı arayüzü kullanır; bu adımda işaretlenen kullanıcılar 'Kayıtlı Öğrenciler' listesine eklenir."
        image="/screenshots/course-create-step3-students.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Step 3 Öğrencileri kaydet dialogu; Zeynep Aydın ve Serkan Çoban seçilmiş, alt kısımda 14 kişiden 2 Kişi seçildi yazıyor."
        caption="Adım 3 — Bu derse kaydolmaları için kullanıcıları seçin"
      >
        <ul>
          <li>
            Bir kullanıcı hem öğretmen hem öğrenci olarak aynı anda
            seçilemez. Adım 2&apos;de öğretmen olarak eklediğiniz
            kişiler bu listede de görünür ancak işaretlemenize izin
            verilmez.
          </li>
          <li>
            Listede yer almayan bir öğrenci varsa,{' '}
            <strong>+ Başka bir kaynaktan otomatik seç</strong> ile
            CSV&apos;den hızlıca içe aktarabilir veya{' '}
            <a href="/docs/kullanicilar">Kişiler</a> sayfasından önce
            kullanıcı olarak ekleyebilirsiniz.
          </li>
          <li>
            <strong>Ekle</strong> düğmesine bastığınızda dersin kurulumu
            tamamlanır ve doğrudan ders detay sayfasına yönlendirilirsiniz.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="adim-3-bos"
        title="Adım 3 — Hiçbir öğrenci seçilmemiş"
        intro="Henüz hiçbir öğrenci işaretlemediğinizde Ekle düğmesi pasif kalır. İlerlemek istemiyorsanız 'Tabloya geri dön' ile kapatabilir veya bu dersi ileride öğrenci eklemeye açık olarak bırakabilirsiniz."
        image="/screenshots/course-create-step3-empty.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Step 3 Öğrencileri kaydet dialogu; hiçbir kullanıcı seçilmemiş, sağ üstte +Ekle düğmesi pasif görünüyor, altta '14 kişiden 0 kişi seçildi' yazıyor."
        caption="Adım 3 — Hiçbir kullanıcı seçilmediğinde Ekle pasiftir"
      >
        <ul>
          <li>
            Sıfır öğrenci ile dersi oluşturmaya devam etmek isterseniz
            sihirbazı sağ üstteki <code>×</code> ile kapatın; ders
            kaydedilmiş halde kalır ve daha sonra ders ayarlarından
            öğrenci ekleyebilirsiniz.
          </li>
          <li>
            Aynı tablo üzerinden birden fazla sayfada öğrenci
            arayabilirsiniz; sayfa numaralandırma alt kısımda yer alır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="sonra-ne-olur">Sonra ne olur?</h2>
        <p>
          Üçüncü adımı tamamladıktan sonra otomatik olarak yeni dersin{' '}
          <a href="/docs/ders-yonetimi">detay sayfasına</a>{' '}
          yönlendirilirsiniz. Buradan derse ödev/sınav ekleyebilir,
          mevcut öğrenci ve öğretmen listesini güncelleyebilir veya ders
          bilgilerini düzenleyebilirsiniz.
        </p>
      </section>
    </DocPage>
  )
}
