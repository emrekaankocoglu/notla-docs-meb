import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Kullanıcıları yönetme',
  description:
    'Kişiler ekranında kurum kullanıcılarını görüntüleme, tek tek veya CSV ile toplu kullanıcı ekleme ve düzenleme adımları.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'kisiler-ekrani', title: 'Kişiler ekranı' },
  { id: 'yeni-kullanici', title: 'Tek tek kullanıcı ekleme' },
  { id: 'csv-import', title: 'CSV ile toplu içe aktarma' },
  { id: 'duzenleme', title: 'Kullanıcıları düzenleme' },
]

export default function KullanicilarPage() {
  return (
    <DocPage
      title="Kullanıcıları yönetme"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Kişiler ekranı, kurumunuzdaki tüm kullanıcıları (öğretmen ve
        öğrenciler dahil) görüntüleme ve yönetme yeridir. Kullanıcıları
        tek tek ekleyebilir, CSV gibi bir kaynaktan toplu olarak içe
        aktarabilir veya mevcut kayıtları düzenleyebilirsiniz.
      </p>

      <Callout title="Sadece koordinatörler">
        Kullanıcı oluşturma ve silme işlemleri yalnızca koordinatör
        rolündeki hesaplar tarafından yapılabilir. Öğretmenler bu menüyü
        görmez.
      </Callout>

      <hr />

      <ScreenSection
        id="kisiler-ekrani"
        title="Kişiler ekranı"
        intro="Sol menüden Kişiler'e tıkladığınızda kurumunuzdaki tüm kullanıcıların bulunduğu tabloya ulaşırsınız. Tabloda isim, e-posta ve kurum kimliği bilgileri yer alır; geçici kullanıcılar 'geçici' rozetiyle işaretlenir."
        image="/screenshots/users-list.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Kişiler ekranı; Coordinator User, Mustafa Çelik, Fatma Koç, Emre Öztürk, Hatice Arslan ve diğer kullanıcılar listeleniyor."
        caption="Koordinatör görünümü — Kişiler"
      >
        <ul>
          <li>
            <strong>Arama kutusu</strong> isim, e-posta veya kurum kimliği
            ile filtreleme yapmanızı sağlar.
          </li>
          <li>
            Sağ üstteki <strong>Tümü</strong> menüsü ile yalnızca
            öğrenciler veya öğretmenler gibi belirli rollere göre liste
            daraltılabilir.
          </li>
          <li>
            <strong>Geçici</strong> rozetli kullanıcılar, sisteme henüz
            kalıcı olarak kaydolmamış (örneğin davet bekleyen) kişilerdir.
          </li>
          <li>
            Sağdaki <code>Düzenle</code> bağlantısı her satırın bilgilerini
            güncellemenize olanak tanır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="yeni-kullanici"
        title="Tek tek kullanıcı ekleme"
        intro="Sağ üstteki '+ Yeni kullanıcı ekle' düğmesi açılan kısa bir form aracılığıyla tek bir kullanıcıyı sisteme ekler. Ad, soyad ve kurum kimliği zorunlu; e-posta ise isteğe bağlıdır."
        image="/screenshots/users-add-dialog.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yeni kullanıcı ekle dialogu; Ad, Soyad, Kurum Kimliği ve E-posta alanları, ayrıca 'Koordinatör yap' ve 'Kullanıcıya kayıt e-postası gönder' seçenekleri görülüyor."
        caption="Yeni kullanıcı ekle dialogu"
      >
        <ul>
          <li>
            <strong>Kurum Kimliği</strong> (örneğin TC kimlik veya okul
            numarası) sistemde her kullanıcı için benzersiz olmalıdır.
          </li>
          <li>
            <strong>E-posta</strong> alanı boş bırakılırsa kullanıcıya
            otomatik davet e-postası gönderilemez (uyarı dialogun altında
            belirtilir).
          </li>
          <li>
            <strong>Kullanıcıya kayıt e-postası gönder</strong> kutusu
            işaretlenirse, kullanıcı şifresini belirleyebileceği bir
            bağlantı alır.
          </li>
          <li>
            <strong>Koordinatör yap</strong> seçeneği, eklenen kullanıcıya
            sizinkiyle aynı yetkileri verir; dikkatle kullanın.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="csv-import"
        title="CSV ile toplu içe aktarma"
        intro="Çok sayıda kullanıcıyı tek tek girmek yerine 'Başka bir kaynaktan otomatik seç' düğmesi ile CSV dosyası gibi mevcut kaynaklardan toplu içe aktarım yapabilirsiniz."
        image="/screenshots/users-csv-import.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Bir Entegrasyon Seçin dialogu; Mevcut Entegrasyonlar açılır menüsünde 'CSV'den İçe Aktar' seçeneği ve dosya seçim bölgesi görülüyor."
        caption="CSV'den İçe Aktar entegrasyonu"
      >
        <ul>
          <li>
            <strong>Mevcut Entegrasyonlar</strong> açılır menüsü,
            kurumunuza tanımlı veri kaynaklarını listeler. Varsayılan
            olarak <code>CSV&apos;den İçe Aktar</code> seçeneği bulunur.
          </li>
          <li>
            <strong>Dosya Seç</strong> alanına PDF&apos;e kadar 100 MB
            boyutunda CSV dosyalarını sürükleyebilir veya tıklayarak
            seçebilirsiniz.
          </li>
          <li>
            CSV içe aktarımı tamamlandığında yeni kullanıcılar otomatik
            olarak <strong>Geçici</strong> olarak işaretlenir; davet
            e-postaları sonradan tek tek veya toplu olarak gönderilebilir.
          </li>
        </ul>
        <Callout type="warning" title="CSV biçimi">
          Sütun adları ve sıralama kurumunuza özel olabilir. Geçerli bir
          şablon için kurum yöneticinize danışın; hatalı sütunlu bir
          dosya yüklerseniz içe aktarım başlamadan iptal edilir.
        </Callout>
      </ScreenSection>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="duzenleme">Kullanıcıları düzenleme</h2>
        <p>
          Tablodaki herhangi bir satırın sağındaki <code>Düzenle</code>{' '}
          bağlantısı, o kullanıcının ad, e-posta ve kurum kimliği
          bilgilerini güncellemenize izin verir. Aynı pencereden bir
          kullanıcıyı koordinatöre yükseltebilir veya yetkilerini geri
          alabilirsiniz.
        </p>
        <p>
          Bir kullanıcı sistemden silinmek isteniyorsa düzenleme
          penceresinin alt bölümündeki tehlike alanından kalıcı silme
          işlemi yapılabilir; bu işlem geri alınamaz.
        </p>
      </section>
    </DocPage>
  )
}
