import type { Metadata } from 'next'

import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: '3. Taramaları yükle',
  description:
    'Öğrenci kağıtlarını PDF olarak yükleyip işleme alınmasını takip etme.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'web-yukleme', title: 'Web üzerinden PDF yükleme' },
]

export default function KagitYuklemePage() {
  return (
    <DocPage title="3. Taramaları yükle" tableOfContents={tableOfContents}>
      <p className="lead">
        Taslak ve soru analizi hazır olduğunda öğrenci kağıtlarını sisteme
        aktarın. Notla yüklenen PDF&apos;leri işler, sayfaları okur ve
        gönderimleri öğrencilerle eşleştirir.
      </p>

      <ScreenSection
        id="web-yukleme"
        title="Taramaları yükle"
        intro="Yüklemeleri Yönet adımında Taramaları Yükle düğmesine basın. Öğrenci kağıtlarını içeren PDF'yi seçin; dosya listede göründüğünde Gönder ile işleme alın."
        image="/screenshots/uploads-dialog-with-pdf.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yükleme dialogu; üstte yeşil tamamlandı bildirimi; ortada sürükle-bırak alanı; altta 'Dosyalar' başlığı altında salih5_tagged-10.pdf satırı; sol altta Notla Tarayıcı düğmesi, sağ altta mavi Gönder düğmesi."
        caption="Yüklenecek PDF seçildi — Gönder düğmesi aktif"
      >
        <ul>
          <li>
            PDF sınırı 100 MB&apos;tır; birden fazla dosyayı aynı dialogdan
            ekleyebilirsiniz.
          </li>
          <li>
            <strong>Gönder</strong> düğmesi yüklemeyi başlatır; işlem bitince
            tarama öğrencilerle otomatik eşleşir.
          </li>
          <li>
            Mobil tarama gerekiyorsa sol alttaki <strong>Notla Tarayıcı</strong>{' '}
            seçeneğini kullanabilirsiniz; detaylar appendix bölümünde kalır.
          </li>
          <li>
            Taramalar işlenip öğrencilerle eşleştikten sonra otomatik
            değerlendirme adımına geçin.
          </li>
        </ul>
      </ScreenSection>
    </DocPage>
  )
}
