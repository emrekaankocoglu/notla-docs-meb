import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { MobileScreens } from '@/components/MobileScreens'

export const metadata: Metadata = {
  title: 'Notla Tarayıcı',
  description:
    'Notla Tarayıcı mobil uygulaması — kağıtları telefonla tarayıp doğrudan ödev/sınava yüklemek için.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'tanitim', title: 'Notla Tarayıcı nedir?' },
  { id: 'giris', title: 'Giriş ve dersler' },
  { id: 'ders-detayi', title: 'Ders detayı' },
  { id: 'odev-detayi', title: 'Ödev/sınav detayı' },
  { id: 'sablon', title: 'Şablon yükleme' },
  { id: 'tarama', title: 'Kamerayla tarama' },
  { id: 'inceleme', title: 'Tarama yığını incelemesi' },
  { id: 'yuklemeler', title: 'Yüklemeler — Taramalar' },
  { id: 'ogrenciler', title: 'Yüklemeler — Öğrenciler' },
]

export default function NotlaTarayiciPage() {
  return (
    <DocPage title="Notla Tarayıcı" tableOfContents={tableOfContents}>
      <p className="lead">
        Notla Tarayıcı, öğretmenlerin öğrenci kağıtlarını telefonlarıyla
        tarayıp doğrudan ilgili ödev/sınava göndermesini sağlayan iOS ve
        Android uygulamasıdır. Kamerayla tarama, sayfa düzeltme ve
        gönderim eşitleme tek bir akışta yapılır; sonuçlar saniyeler
        içinde web arayüzündeki <strong>Yüklemeleri Yönet</strong>{' '}
        sekmesinde görünür.
      </p>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="tanitim">Notla Tarayıcı nedir?</h2>
        <p>
          Tarayıcı uygulaması, web yükleme akışına göre üç ek avantaj
          sağlar:
        </p>
        <ul>
          <li>
            <strong>Optimize edilmiş tarama.</strong> Kağıt kenarları
            otomatik algılanır, perspektif düzeltilir ve fiziksel ortamdan
            gelen kalite kayıpları için ek filtre uygulanır.
          </li>
          <li>
            <strong>Yığın taramaları.</strong> Birden fazla öğrencinin
            kağıdını tek bir akışta arka arkaya tarayıp tek bir
            <em> Yükle</em> dokunuşuyla gönderebilirsiniz.
          </li>
          <li>
            <strong>Eksik öğrencileri kapatma.</strong> &quot;Eksik&quot;
            filtresiyle yalnızca henüz gönderim alınmamış öğrencileri
            görüp her birinin kağıdını ayrı ayrı yükleyebilirsiniz.
          </li>
        </ul>
        <Callout title="Web ile aynı hesap">
          Aynı kullanıcı adı ve şifre ile giriş yapın; uygulamada
          gördükleriniz web&apos;deki rolünüzle aynıdır. Kurum seçimi de
          giriş sonrasında yapılır.
        </Callout>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="giris">Giriş ve dersler</h2>
        <p>
          Uygulamayı açıp giriş yaptıktan sonra ana ekranda size
          atanmış aktif derslerin listesi gelir. Her ders kartı, web
          arayüzünde olduğu gibi sınıf adı, ders adı ve{' '}
          <em>Dersi Görüntüle</em> bağlantısını içerir. Alt çubuktaki{' '}
          <strong>Dersler</strong> sekmesi her zaman buraya geri dönmenizi
          sağlar; sağdaki avatar düğmesi profil ve oturum ayarlarını açar.
        </p>
        <MobileScreens
          single
          screens={[
            {
              src: '/screenshots/scanner/courses.png',
              alt: 'Notla Tarayıcı uygulamasının Dersler ekranı; tek bir ders kartı (6. Sınıf Fen Bilimleri Dersi - Fen Bilimleri) ve "Dersi Görüntüle" bağlantısı görülüyor.',
              caption: 'Ana ekran — Dersler',
            },
          ]}
        />
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="ders-detayi">Ders detayı</h2>
        <p>
          Bir derse dokunduğunuzda, dersin temel istatistikleri (kaç
          ödev/sınav var, toplam kaç gönderim alındı) ve aktif
          ödev/sınavların listesi açılır. Her ödev/sınav satırında
          başlık, açıklama, mevcut yükleme durumu (örnek:{' '}
          <code>Ready to upload</code>) ve gönderim sayısı yer alır. Sağa
          yaslı ok simgesine dokunarak ödev/sınav detayına geçersiniz.
        </p>
        <MobileScreens
          single
          screens={[
            {
              src: '/screenshots/scanner/course-detail.png',
              alt: 'Fen Bilimleri ders detayı; Aktif rozeti, 3 Ödev/Sınav, 10/25 Gönderildi, Performans Ödevi (7/9 gönderildi), 2. Yazılı Sınavı (2/8 gönderildi) ve 1. Yazılı Sınavı satırları görülüyor; alt menüde Detaylar ve Ödevler/Sınavlar sekmeleri.',
              caption: 'Ders detayı — Ödevler/Sınavlar listesi',
            },
          ]}
        />
        <ul>
          <li>
            <strong>Aktif</strong> rozeti dersin yayında olduğunu
            doğrular; pasif derslerde yeni gönderim alınamaz.
          </li>
          <li>
            <strong>Gönderildi</strong> sayacı (örn.{' '}
            <code>10/25</code>) dersteki tüm ödev/sınavların kümülatif
            gönderim oranını gösterir.
          </li>
          <li>
            Alt çubuktaki <strong>Detaylar</strong> ve{' '}
            <strong>Ödevler/Sınavlar</strong> sekmeleri sayfa içinde
            hızlı geçiş için kullanılır.
          </li>
        </ul>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="odev-detayi">Ödev/sınav detayı</h2>
        <p>
          Ödev/sınav detayı, sayfanın üstünde dairesel ilerleme göstergesi
          ile özet (kaç gönderim/kaç toplam) verir. Hemen altında iki
          büyük kart bulunur: <strong>Taslak</strong> (boş şablonun
          durumu) ve <strong>Yüklemeler</strong> (öğrenci kağıtlarını
          tarayıp gönderme ekranı). Şablon durumu, ödev/sınavın hangi
          kurulum aşamasında olduğunu özetler.
        </p>
        <MobileScreens
          screens={[
            {
              src: '/screenshots/scanner/assignment-template-ready.png',
              alt: 'Performans Ödevi detayı; 7/9 ilerleme, Taslak kartında "Şablon yüklendi" yeşil rozeti, Yüklemeler kartında "7/9 gönderildi" rozeti.',
              caption: 'Şablon hazır — yüklemeye devam edilebilir',
            },
            {
              src: '/screenshots/scanner/assignment-template-needed.png',
              alt: '1. Yazılı Sınavı detayı; 1/8 ilerleme, Taslak kartında turuncu "Şablon gerekli" uyarısı ve "Taramaları kabul etmeden önce ödev şablonunu yükle" mesajı.',
              caption: 'Şablon gerekli — önce şablon yüklenmeli',
            },
          ]}
        />
        <ul>
          <li>
            <strong>Şablon yüklendi</strong> rozeti, web&apos;de hazırlanan
            taslağın eşleşme için hazır olduğunu söyler. Bu durumda
            doğrudan kağıt taramaya geçebilirsiniz.
          </li>
          <li>
            <strong>Şablon gerekli</strong> rozeti, ödev/sınavın henüz
            web&apos;de bir taslakla eşleştirilmediğini gösterir. Önce
            telefondan veya web&apos;den şablonu yüklemeniz gerekir;
            şablon olmadan taramalar eşleştirilemez.
          </li>
          <li>
            Üstteki <strong>dairesel ilerleme</strong> (örn.{' '}
            <code>7/9</code>) bu ödev/sınavda kaç öğrencinin gönderiminin
            tamamlandığını anlık olarak gösterir.
          </li>
        </ul>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="sablon">Şablon yükleme</h2>
        <p>
          <strong>Taslak</strong> kartına dokunduğunuzda şablon yükleme
          ekranı açılır. Boş bir sınav/ödev kağıdını kameranızla tarayıp
          gönderebilir veya cihazınızdaki bir PDF/görsel dosyasını
          seçebilirsiniz. Yükleme tamamlandıktan sonra şablonun kurulumu
          (sayfa bölgelerinin tanımlanması) için web arayüzünde devam
          etmeniz gerekir.
        </p>
        <MobileScreens
          single
          screens={[
            {
              src: '/screenshots/scanner/template-upload.png',
              alt: 'Taslak ekranı; "Şablonu hazırla — Kamerayla tara veya PDF/görsel seç" sürükle-bırak alanı ve mavi bilgi kutusunda "Yükledikten sonra şablon kurulumunu tamamlamak için bu ödevi web uygulamasında aç" mesajı.',
              caption: 'Şablon yükleme — boş kağıdı tara veya seç',
            },
          ]}
        />
        <Callout title="Sayfa bölgeleri web arayüzünde">
          Şablonu tarayıcıdan yükleseniz bile, sayfa üzerindeki{' '}
          <em>kimlik / soru / cevap</em> bölgelerini web arayüzündeki{' '}
          <a href="/docs/sayfa-bolgeleri">Sayfa bölgelerini işaretleme</a>{' '}
          adımından tanımlamanız gerekir. Bu adım tamamlanmadan öğrenci
          kağıtları otomatik olarak öğrencilere eşleşmez.
        </Callout>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="tarama">Kamerayla tarama</h2>
        <p>
          <strong>Yüklemeler</strong> kartından açılan ekrandaki{' '}
          <em>Taramaları Yükle</em> alanına dokunduğunuzda kamera açılır.
          Uygulama kağıdın kenarlarını otomatik tespit eder; deklanşöre
          basmak için <strong>Shutter</strong> düğmesine veya alttaki
          büyük beyaz daireye dokunun. <strong>Flash</strong> ile flaşı,{' '}
          <strong>Filters</strong> ile renk filtresini açıp
          kapatabilirsiniz.
        </p>
        <MobileScreens
          single
          screens={[
            {
              src: '/screenshots/scanner/camera-capture.png',
              alt: 'Kamera ekranı; tek bir kâğıdı çerçeveleyen tarama görüntüsü; alt kısımda Flash, Filters ve Shutter düğmeleri ile büyük beyaz çekim butonu.',
              caption: 'Kamera taraması — kenarlar otomatik algılanır',
            },
          ]}
        />
        <ul>
          <li>
            Bir kâğıt çekildikten sonra uygulama otomatik olarak{' '}
            <em>Tarama yığınını gözden geçir</em> ekranına geçer; oradan
            <strong> + Sayfa ekle</strong> ile başka kâğıtları aynı
            yığına ekleyebilirsiniz.
          </li>
          <li>
            <strong>Flaş</strong> kapalı tutulursa daha doğal bir
            aydınlatma elde edilir; çok parlak kağıtlarda ise{' '}
            <em>Filters</em> menüsünden kontrast artırıcı bir filtre
            seçmek okumayı iyileştirir.
          </li>
          <li>
            Sol üstteki <code>×</code> simgesi taramayı iptal eder ve
            sizi yüklemeler ekranına geri götürür.
          </li>
        </ul>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="inceleme">Tarama yığını incelemesi</h2>
        <p>
          Bir veya daha fazla sayfa tarandıktan sonra önizleme ekranı
          açılır. Her küçük resim taranan bir sayfayı temsil eder; sağ
          alttaki çöp simgesi o sayfayı yığından çıkarır. Sağ üstteki{' '}
          <strong>+ Sayfa ekle</strong> ile aynı yığına yeni kâğıtlar
          eklemek üzere kameraya dönebilirsiniz. Hazır olduğunuzda
          alttaki <strong>Yükle</strong> düğmesine basın; tüm sayfalar
          tek bir tarama olarak buluta gönderilir.
        </p>
        <MobileScreens
          single
          screens={[
            {
              src: '/screenshots/scanner/scan-review.png',
              alt: '"Tarama yığınını gözden geçir" ekranı; "2 Sayfalar" yazısı, Vazgeç ve "+ Sayfa ekle" düğmeleri; Sayfa 1 ve Sayfa 2 küçük resimleri yan yana, her birinin üzerinde silme simgesi; alt çubukta büyük "Yükle" düğmesi.',
              caption: 'Tarama yığını önizleme — silme ve sayfa ekleme',
            },
          ]}
        />
        <Callout title="Birden fazla öğrenci aynı yığında olabilir">
          Tarama yığını sisteme tek bir gönderim olarak yüklenir, ancak
          arka planda her sayfa kendi <em>kimlik bölgesi</em> üzerinden
          okunup ilgili öğrenciye otomatik eşlenir. Bu sayede sınıftaki
          tüm öğrencilerin kağıtlarını arka arkaya tek seferde tarayıp
          tek <strong>Yükle</strong> dokunuşuyla gönderebilirsiniz.
        </Callout>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="yuklemeler">Yüklemeler — Taramalar sekmesi</h2>
        <p>
          Yükleme sonrası ekranın üstünde <em>Başarılı: Yükleme
          başarılı.</em> bildirimi belirir ve gönderdiğiniz tarama,
          listenin en üstünde <strong>Tamamlanması bekleniyor</strong>{' '}
          rozetiyle görünür. Buluttaki OCR ve eşleme adımları
          tamamlandıkça rozet <strong>Tamamlandı</strong> olarak
          güncellenir; eşleşme istatistikleri (başarılı/eşleşme
          gerekiyor/başarısız sayfalar) satır içinde özetlenir.
        </p>
        <MobileScreens
          single
          screens={[
            {
              src: '/screenshots/scanner/uploads-scans.png',
              alt: 'Yüklemeler ekranı; üstte 7/9 ilerleme, "1 tarama işleniyor" rozeti, sağ üstte yeşil "Başarılı: Yükleme başarılı" toast; sekmeler: Öğrenciler 9, Taramalar 8 (1 işleniyor); listede en üstte Performans_Ödevi_s... taraması "Tamamlanması bekleniyor", altında iki ceng334-anonim-mt-short-1-2.pdf taraması "Tamamlandı" rozetli.',
              caption: 'Yüklemeler — Taramalar sekmesi',
            },
          ]}
        />
        <ul>
          <li>
            Üstteki <strong>1 tarama işleniyor</strong> rozeti, en az bir
            taramanın hâlâ buluttta işlendiğini gösterir; tüm rozetler
            <em> Tamamlandı</em> olunca öğrenci tablosu da güncellenmiş
            olur.
          </li>
          <li>
            <strong>Taramayı Sil</strong> bağlantısı, yanlış yüklenmiş
            bir taramayı tüm sayfalarıyla birlikte sistemden tamamen
            kaldırır.
          </li>
          <li>
            Üstteki <strong>Taramaları Yükle</strong> alanına dokunarak
            doğrudan yeni bir tarama akışı başlatabilirsiniz; gerek
            yoksa bu sayfada beklemeniz gerekmez, tarayıcı arka planda
            çalışmaya devam eder.
          </li>
        </ul>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="ogrenciler">Yüklemeler — Öğrenciler sekmesi</h2>
        <p>
          <strong>Öğrenciler</strong> sekmesi, derse atanmış her öğrencinin
          gönderim durumunu listeler. Sağ üstteki açılır menüden{' '}
          <strong>Eksik</strong> filtresini seçtiğinizde sadece henüz
          gönderim alınmamış öğrenciler kalır; bu, &quot;sınıfta
          eksik kim var?&quot; sorusunun en hızlı cevabıdır. Her satırın
          sağındaki mor <strong>Yükle</strong> düğmesi, yalnızca o
          öğrenci için tarama akışını başlatır.
        </p>
        <MobileScreens
          single
          screens={[
            {
              src: '/screenshots/scanner/uploads-students.png',
              alt: 'Yüklemeler ekranı - Öğrenciler sekmesi; üstte Taramaları Yükle alanı, Öğrenciler 9 / Taramalar 8 sekmeleri; arama kutusu, yanında "Eksik (2)" filtre; listede Aydın Doğan (2380293) ve Altay Kılıç (263337) satırları, her birinin sağında mor Yükle düğmesi.',
              caption: 'Eksik filtresi — gönderimi olmayan öğrencileri görme',
            },
          ]}
        />
        <ul>
          <li>
            <strong>Arama kutusu</strong> isim veya kimlik numarasıyla
            anlık filtreleme yapar; büyük sınıflarda hızlı erişim için
            kullanışlıdır.
          </li>
          <li>
            <strong>Eksik</strong> dışında <em>Tümü</em> ve{' '}
            <em>Tamamlanan</em> seçenekleri de mevcuttur; gönderimi olan
            öğrencileri kontrol etmek için kullanılır.
          </li>
          <li>
            Bir öğrencinin satırındaki <strong>Yükle</strong> düğmesi,
            doğrudan o öğrenciye atanmış bir tarama akışı açar; kimlik
            okumasıyla uğraşmak istemediğinizde işleri hızlandırır.
          </li>
        </ul>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="sonraki-adim">Sonraki adım</h2>
        <p>
          Tarayıcıdan yapılan tüm gönderimler web arayüzündeki{' '}
          <a href="/docs/kagit-yukleme">Yüklemeleri Yönet</a>{' '}
          sekmesinde görünür. Buradan otomatik notlandırmayı başlatmak
          için <a href="/docs/notlandirma-ayarlari">Otomatik notlandırma
          ayarları</a> bölümüne geçin.
        </p>
      </section>
    </DocPage>
  )
}
