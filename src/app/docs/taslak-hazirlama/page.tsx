import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Taslak ve soruları ekleme',
  description:
    'Taslak yükleme, AI ile soruları otomatik analiz etme, soru gruplarını ve değerlendirme kriterlerini düzenleme.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'genel-akis', title: 'Adımın genel akışı' },
  { id: 'dosya-yukle', title: 'Adım 1 — Dosyaları yükle' },
  { id: 'analiz', title: 'AI ile soru analizi' },
  { id: 'soru-listesi', title: 'Sorular ve puan dağılımı' },
  { id: 'kriterler', title: 'Soru bazlı kriterler' },
  { id: 'kriterler-q2', title: 'İkinci soru — sayısal değerlendirme' },
  { id: 'tamamlama', title: 'Adımı tamamlama' },
]

export default function TaslakHazirlamaPage() {
  return (
    <DocPage
      title="Taslak ve soruları ekleme"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Bu adımda ödev/sınavın boş kağıdını sisteme yüklersiniz; AI
        kağıttaki soruları otomatik olarak çıkartır ve her soru için
        öneri puan ile değerlendirme kriterleri (rubric) hazırlar. Siz
        de bunları gözden geçirip dilediğinizce düzenleyebilirsiniz.
      </p>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="genel-akis">Adımın genel akışı</h2>
        <ol>
          <li>
            <strong>Dosyaları yükle.</strong> Soru kağıdının görüntü
            (JPG/PNG) ya da PDF taslağını sisteme aktarın.
          </li>
          <li>
            <strong>AI analizi.</strong> Sistem soruları, alt soruları
            ve önerilen puanları otomatik çıkarır.
          </li>
          <li>
            <strong>Soruları gözden geçir.</strong> Her sorunun başlığını,
            puanını ve değerlendirme kriterlerini ihtiyaca göre
            düzenleyin; gerekirse yeni soru ekleyin.
          </li>
          <li>
            <strong>Bir sonraki adıma geç.</strong> Sayfa bölgelerinin
            işaretleneceği aşamaya ilerleyin.
          </li>
        </ol>
        <Callout title="Neden taslak gerekli?">
          Taslak, hem AI&apos;ın soruları otomatik bulması hem de daha
          sonra öğrenci kağıtlarını sayfa sayfa eşleştirebilmesi için
          referans noktasıdır. Taslak yüklenmeden bir sonraki adıma
          geçemezsiniz.
        </Callout>
      </section>

      <hr />

      <ScreenSection
        id="dosya-yukle"
        title="Adım 1 — Dosyaları yükle"
        intro="Sihirbazın ilk adımı, soru kağıdının görsel ve/veya PDF formundaki halini sisteme yüklemenizdir. Sol kart resim (JPG, JPEG, PNG; en fazla 10 MB), sağ kart PDF (en fazla 100 MB) içindir."
        image="/screenshots/wizard-step1-upload.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Adım 01 Dosya Yükle ekranı; iki ayrı sürükle-bırak kartı: solda görsel (JPG/JPEG/PNG, 10 MB), sağda PDF (100 MB); sağ altta 'Seç ve Devam Et' düğmesi."
        caption="Adım 1 — Dosyaları Yükle"
      >
        <ul>
          <li>
            <strong>Görsel kartı</strong> kağıdın taranmış veya
            fotoğraflanmış halini içindir; tek bir sayfa için en uygun
            seçimdir.
          </li>
          <li>
            <strong>PDF kartı</strong> birden fazla sayfa içeren
            dokümanlar için kullanılır. Her iki kartı aynı anda da
            doldurabilirsiniz.
          </li>
          <li>
            <strong>Seç ve Devam Et</strong> düğmesi, en az bir dosya
            yüklendiğinde aktifleşir ve sizi 02. adıma yönlendirir.
          </li>
          <li>
            Sol kenardaki dikey simgeler sihirbazın kısayollarıdır;
            ilerledikçe yeşil onay rozetleriyle işaretlenirler.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="analiz"
        title="AI ile soru analizi"
        intro="Dosyalar yüklendikten sonra sistem otomatik olarak şablonu analiz eder ve soruları çıkarmaya başlar. Bu birkaç dakika sürebilir; sağ üstte küçük bir 'Şablon analizi başlatıldı' bildirimi belirir."
        image="/screenshots/step2-questions-analyzing-toast.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Adım 02 Soruları Ekle; sol tarafta yüklenen kağıdın önizlemesi, sağda 'Sorular işleniyor' yükleniyor mesajı, sağ üstte 'Başarılı: Şablon analizi başlatıldı' bildirimi."
        caption="AI soru analizi başlatıldı"
      >
        <ul>
          <li>
            Analiz tamamlanana kadar sağdaki panel{' '}
            <em>&quot;Sorular işleniyor&quot;</em> mesajını ve döner
            simgesini gösterir.
          </li>
          <li>
            Beklemek istemiyorsanız sol alttaki{' '}
            <strong>İptal et ve manuel yap</strong> bağlantısı analizi
            durdurur ve soruları elle eklemenize olanak tanır.
          </li>
          <li>
            Soldaki <strong>kağıt önizlemesi</strong> üzerinde tarama
            sonrası soruların sınırları görünür hale gelir; alt kısımdaki
            zoom düğmeleriyle yakınlaştırabilirsiniz.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="soru-listesi"
        title="Sorular ve puan dağılımı"
        intro="Analiz bitince sağda her soru için kapanmış bir kart çıkar. Her satırda sorunun başlığı ve önerilen puanı görünür; toplam puan üstte özetlenir."
        image="/screenshots/step2-questions-collapsed.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Adım 02 Soruları Ekle; sağ panelde Q1 Homojen ve Heterojen Karışımlar (20 puan), Q2 Çözeltilerin Donma Noktası (20 puan), Q3 Mıknatısla Ayırma Yöntemi (20 puan), Q4 Tepkime ve Gaz Çıkışı (20 puan), Q5 Kabartma Tozu Formülü ve Adı (10 puan), Q6 Polimerlerin Kullanım Nedenleri (10 puan); toplam 100 puan; altta 'AI ile Yeniden Analiz Et' bağlantısı."
        caption="Soruların özet listesi — toplam 100 puan"
      >
        <ul>
          <li>
            Her sorunun yanındaki <strong>puan rozeti</strong> sorunun
            ağırlığını gösterir. Toplam puan otomatik hesaplanır.
          </li>
          <li>
            Sağ üstteki <strong>+</strong> düğmesi yeni bir soru
            ekleyerek listeye dahil eder; AI&apos;ın atladığı bir soru
            varsa elle ekleyebilirsiniz.
          </li>
          <li>
            Bir soruya tıklamak onun{' '}
            <a href="#kriterler">değerlendirme kriterlerini</a>{' '}
            görüntüler.
          </li>
          <li>
            Sol alttaki <strong>AI ile Yeniden Analiz Et</strong>{' '}
            bağlantısı, listede sorun varsa AI&apos;ı tekrar
            çalıştırır. Bu işlem mevcut elle düzenlemeleri silebilir.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="kriterler"
        title="Soru bazlı kriterler"
        intro="Bir soruya tıkladığınızda, o soru için AI'ın hazırladığı değerlendirme kriterleri (rubric) listelenir. Her kriter ayrı bir puana sahiptir ve eklediğiniz/sildiğiniz kriterler otomatik notlandırma sırasında doğrudan kullanılır."
        image="/screenshots/step2-q1-expanded.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Q1 Homojen ve Heterojen Karışımlar (20 puan) açılmış; 5 kriter: 'İki doğru homojen karışım örneği' (10), 'Bir doğru homojen karışım örneği' (5), 'İki doğru heterojen karışım örneği' (10), 'Bir doğru heterojen karışım örneği' (5), 'Boş veya alakasız cevap' (0); altta 'Grup Oluştur' ve 'Kriter Ekle' düğmeleri."
        caption="Q1 için AI'ın önerdiği değerlendirme kriterleri"
      >
        <ul>
          <li>
            <strong>Kriter</strong>: Belirli bir cevap durumunu
            (&quot;İki doğru örnek&quot;, &quot;Boş veya alakasız
            cevap&quot; gibi) tanımlar ve ona ait puanı belirler.
          </li>
          <li>
            <strong>Grup Oluştur</strong> düğmesi seçilen kriterleri bir
            grup içinde toplayarak çoktan seçmeli karşılıklarda
            (örnek: &quot;Aşağıdakilerden hangisi doğrudur&quot;) tek
            bir gruptan tek seçim yapılmasını sağlar.
          </li>
          <li>
            <strong>Kriter Ekle</strong> düğmesi yeni bir kriter satırı
            açar; aynı işlem her sorunun altında tekrar edilebilir.
          </li>
          <li>
            Soru başlığı, açıklaması ve toplam puanı üstte yer alır;
            puanı değiştirdiğinizde toplam puan otomatik güncellenir.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="kriterler-q2"
        title="İkinci soru — sayısal değerlendirme"
        intro="Farklı bir soru için AI'ın oluşturduğu kriterler. Sayısal cevap içeren sorularda 'gerekçeyi doğru şekilde açıklama' veya 'sadece doğru cevap, gerekçe yok' gibi kademeli kriterler tipik olarak otomatik üretilir."
        image="/screenshots/step2-q2-expanded.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Q2 Çözeltilerin Donma Noktası açılmış; 4 kriter: 'I. çözeltinin en önce donacağını doğru bir şekilde belirtme' (10), 'Gerekçeyi doğru bir şekilde açıklama' (10), 'Sadece doğru cevap, gerekçe yok veya yanlış' (10), 'Boş veya alakasız cevap' (0)."
        caption="Q2 için kademeli kriterler"
      >
        <ul>
          <li>
            Aynı soruda birden çok kriter aynı puana sahip olabilir;
            bunlar bağımsız olarak değerlendirilir, biri seçilmez ise
            diğeri seçilebilir.
          </li>
          <li>
            Bir kriteri silmek için satırın sağındaki üç nokta menüsünü
            kullanın; bu işlem geri alınabilir bir taslak değişikliğidir
            ve kaydetmediğiniz sürece sistemde kalıcı olmaz.
          </li>
          <li>
            Kriterler kısa ve anlaşılır tutulduğunda otomatik notlandırma
            daha tutarlı sonuçlar üretir; uzun, çok kapsamlı kriterler
            yerine birden çok küçük kriter eklemek tercih edilir.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="tamamlama">Adımı tamamlama</h2>
        <p>
          Tüm sorular ve kriterler hazır olduğunda sağ alttaki{' '}
          <strong>Soru ekleme tamamlandı, sonraki adım</strong> düğmesine
          basın. Sistem sizi otomatik olarak{' '}
          <a href="/docs/sayfa-bolgeleri">Sayfa bölgelerini işaretleme</a>{' '}
          adımına geçirecektir.
        </p>
        <Callout type="warning" title="AI'ı yeniden çalıştırma uyarısı">
          AI ile yeniden analiz etmek kriterlerde yaptığınız tüm elle
          düzenlemeleri silebilir. Manuel değişiklik yaptıysanız
          analizi yenilemek yerine kriterleri tek tek elle güncellemek
          daha güvenlidir.
        </Callout>
      </section>
    </DocPage>
  )
}
