import type { Metadata } from 'next'

import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: '6. Sonuçları gör',
  description:
    'Ödev/sınav sonuçlarını, sınıf ortalamalarını ve dışa aktarım seçeneklerini görme.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'sonuclar', title: 'Sonuçlar ekranı' },
]

export default function SonuclarPage() {
  return (
    <DocPage title="6. Sonuçları gör" tableOfContents={tableOfContents}>
      <p className="lead">
        Notlar yayınlandıktan sonra Sonuçları Görüntüle sayfası sınıfın genel
        performansını özetler. Buradan hem istatistikleri inceleyebilir hem de
        notları dışa aktarabilirsiniz.
      </p>

      <ScreenSection
        id="sonuclar"
        title="Sonuçlar ekranı"
        intro="Grafikte soru ortalamaları ve ödev/sınav genel ortalaması birlikte görünür. Özet kutuları en düşük, ortanca, en yüksek, ortalama ve standart sapma değerlerini hızlıca verir."
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
    </DocPage>
  )
}
