import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Öğrenci kağıtlarını yükleme',
  description:
    'Yüklemeleri Yönet ekranı; web üzerinden PDF yükleme, Notla Tarayıcı mobil uygulamasıyla tarama ve gönderim eşleştirme.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'genel-bakis', title: 'Yüklemeleri Yönet' },
  { id: 'tab-ogrenciler', title: 'Öğrenciler sekmesi' },
  { id: 'tab-taramalar', title: 'Taramalar sekmesi' },
  { id: 'web-yukleme', title: 'Web üzerinden PDF yükleme' },
  { id: 'mobil-yukleme', title: 'Notla Tarayıcı ile yükleme' },
  { id: 'islem-durumlari', title: 'İşleme durumları' },
  { id: 'sonraki-adim', title: 'Sonraki adım' },
]

export default function KagitYuklemePage() {
  return (
    <DocPage
      title="Öğrenci kağıtlarını yükleme"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Taslak ve sayfa bölgeleri tamamlandıktan sonra sıra öğrenci
        kağıtlarını sisteme yüklemeye gelir. Notla iki yöntem sunar:
        web üzerinden doğrudan PDF yükleme veya Notla Tarayıcı mobil
        uygulamasıyla taranan kağıtların otomatik aktarımı. Yüklenen
        her kağıt, üzerindeki kimlik bölgesi okunarak ilgili öğrenciyle
        eşleştirilir.
      </p>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="genel-bakis">Yüklemeleri Yönet</h2>
        <p>
          Sol menüdeki <strong>Yüklemeleri Yönet</strong> adımına
          geçtiğinizde iki sekmeli bir ekranla karşılaşırsınız:
        </p>
        <ul>
          <li>
            <strong>Öğrenciler</strong> — derse atanmış tüm öğrencilerin
            ödev/sınav durumunu satır satır gösterir.
          </li>
          <li>
            <strong>Taramalar</strong> — sisteme yüklenmiş ham PDF/JPG
            taramaları ve eşleştirme durumlarını listeler.
          </li>
        </ul>
        <p>
          Sağ üstteki <strong>Taramaları Yükle</strong> düğmesi her iki
          sekmeden de erişilebilir ve yeni bir taramayı yüklemenizi
          sağlar.
        </p>
      </section>

      <hr />

      <ScreenSection
        id="tab-ogrenciler"
        title="Öğrenciler sekmesi"
        intro="Öğrenciler sekmesi, ödev/sınava atanmış her öğrencinin gönderim durumunu gösterir. Henüz hiçbir kağıt yüklenmediyse her satırda 'Gönderim yok' görünür ve isim yanında turuncu uyarı simgesi yer alır."
        image="/screenshots/uploads-students-empty.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yüklemeleri Yönet - Öğrenciler sekmesi; Zeynep Aydın, Mustafa Çelik, Mehmet Yılmaz, Ayşe Demir, Ahmet Kaya, Fatma Koç, Emre Öztürk, Elif Şahin satırları, hepsinin sağında 'Gönderim yok' yazıyor."
        caption="Henüz hiçbir gönderim alınmamış öğrenciler"
      >
        <ul>
          <li>
            <strong>Arama kutusu</strong> öğrenci adı veya numarasıyla
            filtreleme yapar; büyük sınıflarda hızlıca aradığınız
            kişiye ulaşmak için kullanışlıdır.
          </li>
          <li>
            <strong>Turuncu uyarı simgesi</strong>, o öğrencinin henüz bir
            kağıt yüklemediğini gösterir.
          </li>
          <li>
            Bir satırı tıkladığınızda o öğrencinin kağıdının ön
            izlemesi açılır; gönderim henüz yoksa yüklenmesi
            beklenir.
          </li>
          <li>
            Sayfanın alt kısmındaki <strong>sayfa numaralandırması</strong>{' '}
            büyük sınıflarda gezinmeyi kolaylaştırır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="ogrenciler-eslemis"
        title="Eşlemiş gönderimler"
        intro="Bir tarama yüklenip işlendikten sonra her sayfa, üzerindeki kimlik bölgesi otomatik okunarak ilgili öğrencinin satırına eklenir. Eşlemenin başarısı; isim sütununda 'Mehmet Yılmaz - 3847294' gibi okunan adın küçük resim olarak gösterilmesiyle anlaşılır."
        image="/screenshots/uploads-students-matched.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yüklemeleri Yönet - Öğrenciler sekmesi; Zeynep Aydın, Mehmet Yılmaz, Ahmet Kaya, Fatma Koç, Emre Öztürk, Elif Şahin için isim alanlarının taranan halleri gösteriliyor; Mustafa Çelik ve Ayşe Demir hâlâ 'Gönderim yok' durumunda."
        caption="Bazı öğrencilerin gönderimleri eşleşmiş — diğerleri hâlâ bekliyor"
      >
        <ul>
          <li>
            Eşleşen öğrencilerde <strong>gönderim ve oluşturulma
            tarihleri</strong> sağda görünür.
          </li>
          <li>
            <strong>Kalan öğrenciler</strong> hâlâ &quot;Gönderim
            yok&quot; durumunda kalır; bu kağıtlar sonradan
            yüklendiğinde otomatik olarak doğru satıra düşer.
          </li>
          <li>
            Yanlış öğrenciye eşleşmiş bir kağıdı manuel olarak
            doğrultmak gerekirse, ilgili gönderimi tıklayıp{' '}
            <em>Öğrenciyi değiştir</em> seçeneğini kullanabilirsiniz.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="tab-taramalar"
        title="Taramalar sekmesi — boş"
        intro="Taramalar sekmesi yüklediğiniz dosyaların ham listesini gösterir. Henüz bir tarama yüklenmediyse 'Tarama yok.' mesajı görünür."
        image="/screenshots/uploads-empty.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yüklemeleri Yönet - Taramalar sekmesi; alt kısımda 'Tarama yok.' yazıyor; sağ üstte Taramaları Yükle düğmesi var."
        caption="Henüz tarama yüklenmemiş"
      >
        <ul>
          <li>
            Bu sekme, bir taramanın hangi dosyadan geldiğini ve hangi
            kullanıcının yüklediğini gösterir.
          </li>
          <li>
            <strong>Taramaları Yükle</strong> düğmesi yeni bir PDF
            yükleme dialogunu açar.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="tab-taramalar-tamamlandi"
        title="Taramalar sekmesi — tamamlanmış tarama"
        intro="Bir tarama yüklenip işleme bitirilince satırın sağında 'Tamamlandı' rozeti görünür. Detayları açtığınızda kaç sayfanın başarılı eşleştiği, kaç sayfanın hâlâ eşleşme beklediği ve atanmamış kitapçık veya gevşek sayfa olup olmadığı görüntülenir."
        image="/screenshots/uploads-tarama-completed.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yüklemeleri Yönet - Taramalar sekmesi; salih5_tagged-10.pdf adlı bir tarama 'Tamamlandı' rozetiyle, açılmış tarama detaylarında 8 başarılı, 0 eşleştirme gerekiyor, 0 başarısız sayfa, toplam 10 sayfa; 'Atanmamış Kitapçık yok' ve 'Atanmamış Gevşek sayfa yok' yazıyor; sağda kırmızı 'Taramayı Sil' bağlantısı."
        caption="Tamamlanmış bir tarama — istatistikler ve eşleştirme özeti"
      >
        <ul>
          <li>
            <strong>Başarılı</strong>: kimlik okunup ilgili öğrenciye
            eşlenen sayfa sayısı.
          </li>
          <li>
            <strong>Eşleştirme Gerekiyor</strong>: kimlik okunamadığı
            için manuel eşleme bekleyen sayfalar.
          </li>
          <li>
            <strong>Başarısız Sayfalar</strong>: tarama kalitesi
            yetersiz olduğu veya kimlik bölgesi bulunamadığı için
            eşlenemeyen sayfalar.
          </li>
          <li>
            <strong>Atanmamış Kitapçık / Gevşek Sayfa</strong>: hangi
            öğrenciye ait olduğu belirlenemeyen kitapçıklar veya tek
            sayfalar; bunları manuel olarak ilgili öğrenciye
            atayabilirsiniz.
          </li>
          <li>
            <strong>Taramayı Sil</strong>, dosyanın tüm sayfalarıyla
            birlikte sistemden tamamen silinmesini sağlar.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="web-yukleme"
        title="Web üzerinden PDF yükleme"
        intro="Taramaları Yükle düğmesi açtığı dialog ile bilgisayarınızdan doğrudan PDF dosyalarını sürükleyip bırakabilirsiniz. Sınır 100 MB'tır. Aynı dialogun alt sol köşesinde Notla Tarayıcı mobil uygulaması seçeneği de yer alır."
        image="/screenshots/uploads-dialog-empty.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yüklemeleri Yönet üzerinde dialog açık; üstte yeşil 'Tamamlandı! İsimlendirme ve sorular için tüm bölgeler eklenmiştir. Kağıtlar istenen şekilde yüklenebilir.' bildirimi; sürükle-bırak alanı, 'Dosya Seç' düğmesi ve sol altta 'Notla Tarayıcı uygulamasını kullan' düğmesi, sağ altta 'Gönder' düğmesi."
        caption="Yükleme dialogu — boş hali"
      >
        <ul>
          <li>
            Dialogun üstündeki yeşil bildirim, sayfa bölgelerinin
            tamamlanmış olduğunu doğrular; bu bildirim olmadan kağıt
            yüklemek anlamlı sonuç vermeyebilir.
          </li>
          <li>
            <strong>Dosya Seç</strong> düğmesi yerel diskten dosya
            seçer; sürükle-bırak da desteklenir.
          </li>
          <li>
            Sol altta yer alan <strong>Notla Tarayıcı uygulamasını
            kullan</strong> düğmesi, mobil tarama akışına geçiş için
            kullanılır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="web-yukleme-pdf-secili"
        title="Yüklenecek PDF seçildikten sonra"
        intro="Bir veya birden fazla PDF dosyası eklendiğinde dialogun altında 'Dosyalar' bölümü çıkar ve her dosya silme simgesiyle birlikte listelenir. 'Gönder' düğmesi aktif hale gelir."
        image="/screenshots/uploads-dialog-with-pdf.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yükleme dialogu; üstte yeşil tamamlandı bildirimi; ortada sürükle-bırak alanı; altta 'Dosyalar' başlığı altında salih5_tagged-10.pdf satırı (sağda kırmızı silme x); sol altta Notla Tarayıcı düğmesi, sağ altta mavi Gönder düğmesi."
        caption="Yükleme öncesi son onay"
      >
        <ul>
          <li>
            Birden fazla dosyayı aynı anda yüklemek için art arda
            sürükleyip bırakın; hepsi tek bir <em>Gönder</em>{' '}
            işlemiyle gönderilir.
          </li>
          <li>
            Yanlış eklenmiş bir dosyayı sağdaki kırmızı{' '}
            <code>×</code> simgesiyle listeden çıkarabilirsiniz.
          </li>
          <li>
            <strong>Gönder</strong> düğmesi yüklemeyi başlatır; sonra
            dialog kapanır ve dosya Taramalar sekmesinde işleme alınmış
            olarak görünür.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="mobil-yukleme"
        title="Notla Tarayıcı ile yükleme"
        intro="Telefonla tarama yapmak için yükleme dialogundaki 'Notla Tarayıcı uygulamasını kullan' düğmesine basın. Açılan ekran iki kısa adımı özetler: uygulamayı açın, ödevi seçip sayfaları tarayın. Tarama biter bitmez 'Yükleme tamamlandı mı?' düğmesine dönün."
        image="/screenshots/uploads-dialog-mobile.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yükleme dialogu; üstte yeşil bildirim; 'Notla Tarayıcı uygulamasını kullan' başlığı; iki adımlık özet (1: Uygulamayı aç ve aynı hesapla giriş yap, 2: Bu ödevi seç, sayfaları tara, gönder); sağ altta 'Yükleme tamamlandı mı?' düğmesi, sol altta 'Geri dön' düğmesi."
        caption="Notla Tarayıcı mobil tarama akışına geçiş"
      >
        <ul>
          <li>
            Telefonunuzdaki Notla Tarayıcı uygulamasını açıp aynı
            hesabınızla giriş yapın. Uygulama otomatik olarak aktif
            ödev/sınavları listeler.
          </li>
          <li>
            Uygulamadan ilgili ödev/sınavı seçin, kağıtları sırayla
            tarayın ve <em>Gönder</em>&apos;e basın. Taramalar bulutta
            işlenip web arayüzüne otomatik düşer.
          </li>
          <li>
            Web&apos;de <strong>Yükleme tamamlandı mı?</strong> düğmesine
            bastığınızda dialog kapanır ve Taramalar sekmesi
            tazelenir.
          </li>
          <li>
            Mobil uygulama hakkında daha fazla bilgi için{' '}
            <a href="/docs/notla-tarayici">Notla Tarayıcı</a>{' '}
            bölümüne göz atın.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="islem-durumlari"
        title="İşleme durumları"
        intro="Yüklenen bir tarama önce 'Tamamlanması bekleniyor' durumunda görünür; arka planda her sayfa OCR ve eşleme adımlarından geçer. İşleme bittikten sonra durumu 'Tamamlandı' olur."
        image="/screenshots/uploads-processing.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yüklemeleri Yönet - Taramalar sekmesi; salih5_tagged-10.pdf 'Tamamlanması bekleniyor' durumunda; üstte turuncu uyarı: 'Bazı taramalar işleniyor. Taramalar tamamen işlenene kadar öğrenci tablosunda görünmezler.'"
        caption="Yüklenmiş ama henüz işlenmemiş bir tarama"
      >
        <ul>
          <li>
            <strong>Bazı taramalar işleniyor.</strong> uyarısı, sayfaların
            henüz Öğrenciler sekmesinde görünmediğini hatırlatır.
          </li>
          <li>
            İşleme süresi sayfa sayısına ve tarama kalitesine göre
            değişir; çoğunlukla birkaç dakikadır.
          </li>
          <li>
            <strong>Tamamlandı</strong> rozeti görüntülendiğinde
            taramanın detaylarına bakıp olası eşleme sorunlarını
            çözebilirsiniz.
          </li>
        </ul>
        <Callout type="warning" title="Eşlenememiş sayfalar">
          Kimlik bölgesi okunamayan sayfalar &quot;Atanmamış Kitapçık&quot;
          veya &quot;Atanmamış Gevşek Sayfa&quot; başlıkları altında
          listelenir. Bu sayfaları açıp manuel olarak doğru öğrenciye
          atayabilirsiniz.
        </Callout>
      </ScreenSection>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="sonraki-adim">Sonraki adım</h2>
        <p>
          Tüm öğrenci kağıtları yüklenip eşlendikten sonra sıra otomatik
          notlandırma ayarlarını gözden geçirip değerlendirmeyi
          başlatmaya gelir. Sol menüdeki{' '}
          <strong>Kağıtları Değerlendir</strong> adımına geçin veya{' '}
          <a href="/docs/notlandirma-ayarlari">Otomatik notlandırma
          ayarları</a> bölümüne ilerleyin.
        </p>
      </section>
    </DocPage>
  )
}
