import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Otomatik notlandırma ayarları',
  description:
    'AI talimatları, güven eşiği, önizleme limiti ve hangi soruların otomatik notlandırılacağını seçme.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'genel-bakis', title: 'Genel bakış' },
  { id: 'talimatlar', title: 'AI talimatları' },
  { id: 'guven-onizleme', title: 'Güven eşiği ve önizleme limiti' },
  { id: 'soru-secimi', title: 'Hangi sorular otomatik notlandırılacak?' },
  { id: 'calistirma', title: 'Otomatik notlandırmayı çalıştırma' },
  { id: 'sonraki-adim', title: 'Sonraki adım' },
]

export default function NotlandirmaAyarlariPage() {
  return (
    <DocPage
      title="Otomatik notlandırma ayarları"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Notla&apos;nın yapay zekâ destekli notlandırması her soru için
        ayrı ayrı yapılandırılır. Bu sayfada AI&apos;a verilen
        talimatları, güven eşiklerini ve önizleme limitlerini nasıl
        ayarlayacağınızı, hangi soruların otomatik notlandırılacağını
        nasıl seçeceğinizi göreceksiniz.
      </p>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="genel-bakis">Genel bakış</h2>
        <p>
          Otomatik notlandırma sayfasına ulaşmak için sol menüdeki{' '}
          <strong>Kağıtları Değerlendir</strong> adımına geçin ve sağ
          üstte yer alan{' '}
          <em>Otomatik Notlandırma: Başlamadı</em> bağlantısına tıklayın.
          Açılan sayfa iki bölüme ayrılır: AI yapılandırma alanı ve
          otomatik notlandırılacak soruların seçim listesi.
        </p>
      </section>

      <hr />

      <ScreenSection
        id="talimatlar"
        title="AI talimatları"
        intro="Talimatlar bölümü, AI'a o sorunun nasıl değerlendirileceğine dair açık bir komut yazmanızı sağlar. Soruda kabul edilebilecek alternatif yanıtlar, hangi durumlarda kısmi puan verileceği veya gözardı edilmesi gereken yazım hataları gibi ipuçlarını burada belirtin."
        image="/screenshots/autograde-settings.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Otomatik Değerlendirici Ayarları sayfası; üstte 'Bu soru için otomatik değerlendirme ayarlarını yapılandırın' açıklaması, ortada büyük 'Talimatlar' metin alanı (boş), altında 'Bu soruyu değerlendirmesi için AI'ya net talimatlar verin' yazısı; aşağıda Güven Eşiği slider'ı (0.70 değerinde) ve 'Önizleme Limiti' slider'ı."
        caption="Bir soru için otomatik değerlendirme yapılandırma sayfası"
      >
        <ul>
          <li>
            <strong>Talimatlar</strong> alanı boş bırakılırsa AI yalnızca
            soru başlığını ve değerlendirme kriterlerini referans olarak
            alır.
          </li>
          <li>
            Net, kısa ve örnek odaklı talimatlar tutarlı sonuçlar üretir
            (örnek: <em>&quot;Heterojen örnekleri kontrol et; çay-su,
            yağ-su gibi cevaplar kabul edilir; sınıf adı yazılmışsa
            geçersiz say.&quot;</em>).
          </li>
          <li>
            <strong>Değerlendirme Durumu</strong> kutusu, ayarın o anki
            durumunu (Başlamadı, İşlem Devam Ediyor, Tamamlandı)
            gösterir. <strong>Otomatik Değerlendirici Durumu: Onaylandı</strong>{' '}
            ise modelin kullanıma hazır olduğunu doğrular.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="guven-onizleme">Güven eşiği ve önizleme limiti</h2>
        <p>
          Aynı sayfada talimatın altında iki slider yer alır:
        </p>
        <ul>
          <li>
            <strong>Güven Eşiği</strong> (0–1 arası, varsayılan 0.70):
            AI&apos;ın bir notlandırmaya bu eşiğin altında güveniyorsa
            onu &quot;İnceleme Gerekli&quot; olarak işaretler ve elle
            kontrol bekletir. Yüksek eşik daha çok manuel inceleme,
            düşük eşik daha çok otomatik karar demektir.
          </li>
          <li>
            <strong>Önizleme Limiti</strong> (0–100 arası, kapatılabilir):
            otomatik notlandırma çalıştırılmadan önce kaç tane grup
            öğesinin önizlenmesine izin verileceğini sınırlar; küçük
            sınıflarda hızlı bir doğrulama için yararlıdır.
          </li>
        </ul>
        <Callout title="Önizleme limiti devre dışı">
          Aynı bölümde küçük bir anahtar bulunur; kapatıldığında bu
          özellik devre dışı kalır ve önizleme yapılmaksızın doğrudan
          tüm gönderimler değerlendirilir.
        </Callout>
      </section>

      <hr />

      <ScreenSection
        id="soru-secimi"
        title="Hangi sorular otomatik notlandırılacak?"
        intro="Sayfanın alt bölümünde 'Otomatik Notlandırılacak Soruları Seçin' başlığı altında ödev/sınavın tüm soruları listelenir. Her birinin yanında bir onay kutusu ve mevcut durumu (Başlamadı, İşlem Devam Ediyor, Tamamlandı) görünür."
        image="/screenshots/autograde-questions-select.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Aynı sayfanın alt yarısı; 'Otomatik Notlandırılacak Soruları Seçin' başlığı altında Q1, Q2, Q3, Q4 soruları işaretli ve hepsinin yanında 'Başlamadı' rozeti; sağda 'Tümünü Seç / Tümünün Seçimini Kaldır' bağlantıları; alt sağda 'Otomatik Notlandırmayı Yeniden Çalıştır (6 Soru)' yeşil düğmesi; sol altta 'Ayarları Kaydet' düğmesi."
        caption="Otomatik notlandırılacak soruları seçim listesi"
      >
        <ul>
          <li>
            <strong>Tümünü Seç</strong> ve{' '}
            <strong>Tümünün Seçimini Kaldır</strong> bağlantıları toplu
            seçim yapar.
          </li>
          <li>
            Her sorunun sağındaki <strong>durum rozeti</strong> önceki
            denemenin sonucunu özetler:{' '}
            <code>Başlamadı</code>, <code>İşlem Devam Ediyor</code>,{' '}
            <code>Tamamlandı</code>.
          </li>
          <li>
            <strong>Ayarları Kaydet</strong> değişiklikleri çalıştırmadan
            saklar; ileride hatırlamak için tercih edilir.
          </li>
          <li>
            <strong>Otomatik Notlandırmayı Yeniden Çalıştır (N Soru)</strong>{' '}
            seçili soruları yeniden işler; mevcut notlandırma sonuçları
            üzerine yazılır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="calistirma"
        title="Otomatik notlandırmayı çalıştırma"
        intro="Otomatik notlandırma başlatıldığında sayfada turuncu bir 'Otomatik değerlendirici ayarları işleniyor. Lütfen bekleyin.' uyarısı görünür ve seçilen soruların durumu 'İşlem Devam Ediyor' olarak güncellenir."
        image="/screenshots/autograde-running.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Aynı sayfa; üstte güven eşiği slider'ları, sonra mavi 'Değerlendirme Durumu: İşlem Devam Ediyor / Otomatik Değerlendirici Durumu: Onaylandı' kutusu, hemen altında turuncu 'Otomatik değerlendirici ayarları işleniyor. Lütfen bekleyin.' uyarısı; soru listesinde Q1 'İşlem Devam Ediyor' rozeti, diğerleri 'Başlamadı'."
        caption="Otomatik notlandırma çalışıyor"
      >
        <ul>
          <li>
            İşlem süresi soru sayısı ve gönderim sayısına göre değişir;
            büyük sınıflarda birkaç dakikadan fazla sürebilir.
          </li>
          <li>
            İşlem sırasında diğer ayarları değiştirmek mümkündür ama
            yeni çalıştırma denemesi mevcut çalışmanın bitmesini
            bekler.
          </li>
          <li>
            Tamamlanan her soru için durum <code>Tamamlandı</code>{' '}
            olarak güncellenir; Kağıtları Değerlendir sayfasına
            döndüğünüzde notlandırılan kağıtların ön izlemesini
            görebilirsiniz.
          </li>
        </ul>
        <Callout type="warning" title="Önemli">
          Otomatik notlandırma sadece gönderim alınmış öğrenciler için
          çalışır. &quot;Gönderim yok&quot; durumundaki öğrenciler
          etkilenmez.
        </Callout>
      </ScreenSection>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="sonraki-adim">Sonraki adım</h2>
        <p>
          Otomatik notlandırma tamamlandığında sıra sonuçları gözden
          geçirip elle düzeltme yapmaya gelir.{' '}
          <a href="/docs/degerlendirme">Kağıtları değerlendirme</a>{' '}
          bölümünden devam edin.
        </p>
      </section>
    </DocPage>
  )
}
