import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Ders yönetimi',
  description:
    'Bir dersin detay sayfasındaki sekmeler, kayıtlı öğrenci ve öğretmen listeleri, ders ayarları ve ödev/sınav listesi.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'detay-sayfasi', title: 'Ders detay sayfası' },
  { id: 'odev-sinav-listesi', title: 'Ödev/sınav listesi' },
  { id: 'kayitli-ogrenciler', title: 'Kayıtlı öğrenciler ve öğretmenler' },
  { id: 'ayarlar', title: 'Ayarlar' },
]

export default function DersYonetimiPage() {
  return (
    <DocPage title="Ders yönetimi" tableOfContents={tableOfContents}>
      <p className="lead">
        Bir derse girdiğinizde sol menü, o dersle ilgili tüm bölümleri
        gösteren bir alt menüye dönüşür. Buradan dersin temel
        bilgilerine, ödev/sınavlarına, kayıtlı öğrencilerine ve
        öğretmenlerine kolayca ulaşabilirsiniz.
      </p>

      <hr />

      <ScreenSection
        id="detay-sayfasi"
        title="Ders detay sayfası"
        intro="Detaylar sekmesi, dersin genel durumunu özetler: kayıtlı öğrenci sayısı, ödev/sınav sayısı ve dersin etkin olup olmadığı. Sol menüde dersin atanmış öğretmenleri ayrı bir başlık altında listelenir."
        image="/screenshots/course-detail.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Türkçe Dersi detay sayfası; Detaylar sekmesinde Kayıtlı Öğrenciler 2, Ödevler/Sınavlar 0 olarak gözüküyor; sağ üstte Aktif rozeti var; sol menüde Detaylar, Ödevler/Sınavlar, Kayıtlı Öğrenciler, Öğretmenler ve atanmış öğretmenler listeleniyor."
        caption="Ders detay sayfası — Detaylar sekmesi"
      >
        <ul>
          <li>
            Üst kısımdaki <strong>Aktif</strong> rozeti dersin yayında
            olduğunu gösterir; kapatıldığında öğrenciler yeni
            ödev/sınavları göremez.
          </li>
          <li>
            <strong>Kayıtlı Öğrenciler</strong> ve{' '}
            <strong>Ödevler/Sınavlar</strong> sayaçları dersin mevcut
            durumunu özetler. Sayaçlara tıklamak ilgili sekmeyi açar.
          </li>
          <li>
            Sol menü dört ana sekme içerir:{' '}
            <code>Detaylar</code>, <code>Ödevler/Sınavlar</code>,{' '}
            <code>Kayıtlı Öğrenciler</code>, <code>Öğretmenler</code>.
            Bu sayfa boyunca hep yanınızda olur.
          </li>
          <li>
            Sol alttaki <strong>Ayarlar</strong> bağlantısı dersin
            adını/açıklamasını değiştirme veya dersi silme gibi
            işlemleri içerir.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="odev-sinav-listesi"
        title="Ödev/sınav listesi"
        intro="Ödevler/Sınavlar sekmesi, derse ait tüm ödev ve sınavları arama kutusu ve sayfalama ile birlikte listeler. Sağ üstteki Oluştur düğmesi yeni bir ödev/sınav eklemek için kullanılır."
        image="/screenshots/course-assignments-empty.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Türkçe Dersi - Ödevler/Sınavlar sekmesi; üstte arama kutusu ve Oluştur düğmesi, listede 'Ödev/Sınav yok.' mesajı görünüyor."
        caption="Boş Ödevler/Sınavlar sekmesi"
      >
        <ul>
          <li>
            <strong>Arama kutusu</strong> mevcut ödev/sınavları başlığa
            göre filtreler.
          </li>
          <li>
            Henüz ödev/sınav oluşturmadıysanız liste{' '}
            <em>&quot;Ödev/Sınav yok.&quot;</em> mesajı gösterir.
          </li>
          <li>
            Yeni bir ödev/sınav oluşturmak için{' '}
            <a href="/docs/odev-olusturma">Ödev/sınav oluşturma</a>{' '}
            adımına geçin.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="kayitli-ogrenciler">
          Kayıtlı öğrenciler ve öğretmenler
        </h2>
        <p>
          <strong>Kayıtlı Öğrenciler</strong> sekmesi derse kayıtlı
          öğrencilerin tablosunu, <strong>Öğretmenler</strong> sekmesi ise
          derse atanmış öğretmenlerin tablosunu gösterir. Her iki
          tabloda da:
        </p>
        <ul>
          <li>
            Yeni bir kullanıcı eklemek için sağ üstteki{' '}
            <code>+ Ekle</code> düğmesini kullanabilirsiniz.
          </li>
          <li>
            Mevcut bir kullanıcıyı dersten çıkarmak için satırın
            sağındaki menüyü açıp <em>Dersten çıkar</em> seçeneğini
            seçebilirsiniz; bu işlem kullanıcıyı kurumdan silmez,
            yalnızca bu dersle bağlantısını koparır.
          </li>
          <li>
            Aynı anda birden çok kullanıcı eklemek için CSV içe aktarma
            akışı kullanılabilir; bu, ders oluşturma sihirbazındaki
            mantıkla aynıdır.
          </li>
        </ul>
        <Callout title="Yeni öğrenci eklendiğinde">
          Yeni bir öğrenci kayıt edildiğinde, derse ait mevcut
          ödev/sınavlar otomatik olarak ona da atanır. Aynı şekilde,
          ödev/sınav oluştururken &quot;Derse kayıtlı tüm öğrencilere
          ata&quot; açıksa, sonradan eklenen öğrenciler de bu
          ödev/sınavı görür.
        </Callout>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="ayarlar">Ayarlar</h2>
        <p>
          Ders ayarları, sol alttaki <strong>Ayarlar</strong> bağlantısı
          ile açılır. Buradan dersin adını, açıklamasını ve görünürlüğünü
          güncelleyebilir veya dersi tamamen silebilirsiniz.
        </p>
        <Callout type="warning" title="Silme işlemi geri alınamaz">
          Bir dersi sildiğinizde, dersle ilgili tüm ödev/sınavlar,
          öğrenci kayıtları ve değerlendirme verileri kalıcı olarak
          silinir. Silmeden önce verileri dışa aktardığınızdan emin
          olun.
        </Callout>
      </section>
    </DocPage>
  )
}
