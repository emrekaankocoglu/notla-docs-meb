import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Sonuçları görüntüleme',
  description:
    'Ödev/sınav istatistiklerini, soru başına ortalama performansı ve dışa aktarım seçeneklerini inceleme.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'genel-bakis', title: 'Sonuçlar ekranı' },
  { id: 'soru-detay', title: 'Soru başına detay' },
  { id: 'disa-aktarim', title: 'Dışa aktarım' },
  { id: 'duzeltme', title: 'Not düzeltme istekleri' },
]

export default function SonuclarPage() {
  return (
    <DocPage
      title="Sonuçları görüntüleme"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Notlar yayınlandıktan sonra Sonuçları Görüntüle sayfası, sınıfın
        genel performansını grafik ve özet istatistiklerle gösterir.
        Buradan notları CSV olarak veya notlandırılmış kağıtları PDF
        olarak dışa aktarabilirsiniz.
      </p>

      <hr />

      <ScreenSection
        id="genel-bakis"
        title="Sonuçlar ekranı"
        intro="Sayfanın üst yarısı 'Ödev/Sınav İstatistikleri' grafiğini içerir; her sorunun ortalama yüzdesi gri çubukla, ödev/sınav genel ortalaması ise yeşil kesik çizgiyle gösterilir. Hemen altında temel özet kutuları yer alır: en düşük, ortanca, en yüksek, ortalama ve standart sapma."
        image="/screenshots/results-overview.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Ödev/Sınav İstatistikleri sayfası; üstte 'Notları CSV'ye Aktar' ve 'Notlandırılmış PDF'leri Dışa Aktar' düğmeleri; ortada bar chart (Q1-Q6 için soru ortalaması ve ödev/sınav ortalaması); altta beş özet kutusu (En Düşük 0.0%, Ortanca 20.0%, En Yüksek 20.0%, Ortalama 14.2%, Std Sapma 7.6%)."
        caption="Performans Ödevi sonuçları — özet istatistikler"
      >
        <ul>
          <li>
            <strong>Soru ortalaması</strong> (gri çubuklar) hangi soruda
            sınıfın ne kadar iyi olduğunu görselleştirir; düşük çubuklar
            zorlandığı konuları işaret eder.
          </li>
          <li>
            <strong>Ödev/sınav ortalaması</strong> (kesik yeşil çizgi)
            tüm sorular boyunca sınıf genel ortalamasıdır.
          </li>
          <li>
            Beş özet kutu (En Düşük, Ortanca, En Yüksek, Ortalama, Std
            Sapma) sınıf dağılımını rakamla özetler.
          </li>
          <li>
            Sağ üstteki <strong>Notları CSV&apos;ye Aktar</strong> ve{' '}
            <strong>Notlandırılmış PDF&apos;leri Dışa Aktar</strong>{' '}
            düğmeleri dışa aktarım için kullanılır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="soru-detay"
        title="Soru başına detay"
        intro="Özet kutularının altında her sorunun ayrıntılı satırı yer alır. Her satır sorunun başlığını, puanını ve sınıf ortalamasını yatay bir bar üzerinde gösterir."
        image="/screenshots/results-detail.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Sonuçlar sayfasının alt yarısı; soru tablosu - 1. Q1 Homojen ve Heterojen Karışım Örnekleri 20.00 Puan, sağında yeşil bar 'Ortalama 70.8%'; 2. Q2 Çözeltilerin Donma Noktası 20.00 Puan, ortalama 0.0% gri."
        caption="Soru başına ortalama puan dağılımı"
      >
        <ul>
          <li>
            <strong>Yeşil bar</strong> sınıfın o sorudaki ortalama
            başarısını yüzde olarak gösterir; çubuk ne kadar uzunsa o
            kadar yüksek başarı.
          </li>
          <li>
            <strong>Gri / boş bar</strong>, sorunun henüz hiç
            notlandırılmadığı veya cevaplanmadığı durumları temsil
            eder.
          </li>
          <li>
            Soru başlığına tıklayarak doğrudan o sorunun değerlendirme
            sayfasına dönebilir, gerekiyorsa düzeltme yapabilirsiniz.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="disa-aktarim">Dışa aktarım</h2>
        <p>
          Sayfanın sağ üstündeki iki düğme, sınıf sonuçlarını
          paylaşmak için kullanılır:
        </p>
        <ul>
          <li>
            <strong>Notları CSV&apos;ye Aktar</strong>: Her satırı bir
            öğrenci ve her sütunu bir soru olan bir <code>.csv</code>{' '}
            dosyası indirir. Excel ve Google Sheets ile uyumludur.
          </li>
          <li>
            <strong>Notlandırılmış PDF&apos;leri Dışa Aktar</strong>: Her
            öğrencinin kağıdını puan ve kriterlerle işaretlenmiş halde
            tek bir PDF olarak indirir; öğrencilerle paylaşırken
            kullanışlıdır.
          </li>
        </ul>
        <Callout title="Büyük sınıflarda">
          Çok sayıda öğrenci için PDF dışa aktarımı birkaç dakika
          sürebilir. Hazır olduğunda otomatik olarak indirme başlatılır;
          sayfayı kapatmamanız önerilir.
        </Callout>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="duzeltme">Not düzeltme istekleri</h2>
        <p>
          Notlar yayınlandıktan sonra öğrenciler herhangi bir notu için{' '}
          <strong>Not Düzeltme İsteği</strong> gönderebilir. Bu
          istekler sol menüdeki <strong>Not Düzeltme İsteklerini
          Değerlendir</strong> adımı altında listelenir; tek tek inceleyip
          kabul edebilir veya reddedebilirsiniz. Kabul edilen istekler
          o anda yeni notla yayınlanır ve öğrenci güncellemeyi otomatik
          olarak görür.
        </p>
      </section>
    </DocPage>
  )
}
