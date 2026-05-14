import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Ödev/sınav oluşturma',
  description:
    'Bir ders içinde yeni ödev veya sınav oluşturma; başlık, açıklama ve öğrencilere atama seçenekleri. Sonradan temel bilgileri düzenleme.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'baslamadan', title: 'Başlamadan önce' },
  { id: 'olustur-dialog', title: 'Yeni ödev/sınav dialogu' },
  { id: 'temel-bilgileri-duzenleme', title: 'Temel bilgileri düzenleme' },
  { id: 'sonraki-adim', title: 'Sonraki adım' },
]

export default function OdevOlusturmaPage() {
  return (
    <DocPage
      title="Ödev/sınav oluşturma"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Ödev ve sınavlar her zaman bir dersin içinde oluşturulur. Bu
        sayfa, derse yeni bir ödev/sınav eklemenin ilk adımını —
        başlık ve açıklama girip öğrencilere atamayı — anlatır. Soruların
        eklenmesi ve sayfa bölgelerinin işaretlenmesi sonraki bölümlerde
        ele alınır.
      </p>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="baslamadan">Başlamadan önce</h2>
        <p>
          Bir ödev/sınav oluşturmak için önce ilgili dersin detay
          sayfasında olmanız gerekir. Sol menüden{' '}
          <code>Ödevler/Sınavlar</code> sekmesine geçin ve sağ üstteki{' '}
          <strong>Oluştur</strong> düğmesine tıklayın.
        </p>
        <Callout title="Öğretmen yetkisi yeterlidir">
          Bir ödev/sınav oluşturmak için koordinatör olmanıza gerek yok;
          derse atanmış herhangi bir öğretmen oluşturabilir. Koordinatör
          de aynı arayüzü kullanır.
        </Callout>
      </section>

      <hr />

      <ScreenSection
        id="olustur-dialog"
        title="Yeni ödev/sınav dialogu"
        intro="Açılan dialogda iki adımlık bir ilerleme çubuğu görünür: 'Ödev/Sınav Oluştur' ve 'Öğrencilere Ata'. İlk adımda başlık, açıklama ve isteğe bağlı olarak 'Derse kayıtlı tüm öğrencilere ata' seçeneği yer alır."
        image="/screenshots/assignment-create-dialog.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yeni ödev/sınav oluştur dialogu; İsim alanına 'Birinci Dönem Sınavı', Açıklama alanına '14 Mart 2026' yazılmış; 'Derse kayıtlı tüm öğrencilere ata' seçeneği açık."
        caption="Adım 1 — Ödev/Sınav Oluştur"
      >
        <ul>
          <li>
            <strong>İsim</strong> alanı zorunludur. Öğrencilerin
            görüntüleyeceği başlık burada belirlenir
            (örnek: <code>Birinci Dönem Sınavı</code>,{' '}
            <code>Performans Ödevi</code>).
          </li>
          <li>
            <strong>Açıklama</strong> kısa bir açıklama veya tarih
            (örnek: <code>14 Mart 2026</code>) için kullanılır. Yine
            isteğe bağlıdır.
          </li>
          <li>
            <strong>Derse kayıtlı tüm öğrencilere ata</strong> anahtarı
            açıkken bu ödev/sınav otomatik olarak ders rosterindeki tüm
            öğrencilere atanır ve onlar için boş gönderim yer tutucuları
            oluşturulur. Daha sonra eklenen öğrenciler de bu listeye
            otomatik dahil olur.
          </li>
          <li>
            <strong>Oluştur</strong> düğmesine bastığınızda Adım 2
            (Öğrencilere Ata) açılır. Eğer &quot;tüm öğrencilere
            ata&quot; anahtarını açık bıraktıysanız bu adım hızlıca
            otomatik tamamlanır; isterseniz tek tek öğrenci de
            seçebilirsiniz.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="temel-bilgileri-duzenleme"
        title="Temel bilgileri düzenleme"
        intro="Ödev/sınav oluşturulduktan sonra her zaman 'Ödev/Sınav Oluştur' adımına geri dönüp başlık, açıklama veya öğrenci atama ayarlarını güncelleyebilirsiniz. Aynı sayfanın altında ödev/sınavı tamamen silmek için tehlike alanı yer alır."
        image="/screenshots/assignment-edit-info.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Birinci Dönem Sınavı ödev/sınav düzenleme sayfası; sol menüde sihirbaz adımları (Ödev/Sınav Oluştur seçili), Görünür anahtarı kapalı, 'Derse kayıtlı tüm öğrencilere ata' açık; alt kısımda kırmızı 'Sınavı Sil' bölümü."
        caption="Ödev/sınav temel bilgilerini düzenleme"
      >
        <ul>
          <li>
            Sol menüde ödev/sınava özel bir sihirbaz görünür: Ödev/Sınav
            Oluştur, Taslak ve soruları ekleyin, Yüklemeleri Yönet,
            Kağıtları Değerlendir, Sonuçları Görüntüle, Not Düzeltme
            İsteklerini Değerlendir. İlerlerken bu adımlar tek tek
            işaretlenir.
          </li>
          <li>
            <strong>Görünür</strong> anahtarı kapalıyken ödev/sınav
            sadece size görünür; tüm hazırlıklar tamamlanınca açın.
            Açıldığında öğrencilere atanmış kağıtlar gönderilebilir.
          </li>
          <li>
            <strong>Sınavı Sil</strong> bölümü sayfanın en altında
            tehlike alanı olarak yer alır. Bir kez silinen ödev/sınav ve
            ona ait tüm öğrenci gönderimleri geri getirilemez.
          </li>
          <li>
            Sayfanın üst kısmındaki ekmek kırıntıları
            (<em>breadcrumb</em>) ile dersin ana sayfasına dönebilirsiniz:
            <code> Türkçe Dersi &gt; Birinci Dönem Sınavı</code>.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="sonraki-adim">Sonraki adım</h2>
        <p>
          Temel bilgileri kaydettikten sonra sıra bir taslak yükleyip
          soruları tanımlamaya gelir. Sol menüden{' '}
          <strong>Taslak ve soruları ekleyin</strong> adımına geçin veya
          doğrudan{' '}
          <a href="/docs/taslak-hazirlama">Taslak ve soruları ekleme</a>{' '}
          bölümüne ilerleyin.
        </p>
      </section>
    </DocPage>
  )
}
