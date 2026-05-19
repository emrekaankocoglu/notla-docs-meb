import type { Metadata } from 'next'

import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: '4. Otomatik değerlendirmeyi başlat',
  description:
    'Soruları seçip otomatik değerlendirme çalıştırmasını başlatma.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'soru-listesi', title: 'Sorular listesinden aç' },
  { id: 'calistirma', title: 'Soruları seç ve başlat' },
]

export default function NotlandirmaAyarlariPage() {
  return (
    <DocPage
      title="4. Otomatik değerlendirmeyi başlat"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Taramalar hazır olduğunda Notla&apos;nın AI değerlendirmesini
        çalıştırın. Genellikle tüm soruları seçip varsayılan ayarlarla
        başlamak yeterlidir.
      </p>

      <ScreenSection
        id="soru-listesi"
        title="Sorular listesinden aç"
        intro="Otomatik değerlendiriciye Kağıtları Değerlendir sayfasındaki soru listesinden gidilir. Sağ üstteki Otomatik Notlandırma bağlantısı, seçili ödev/sınav için AI değerlendirme ayarlarını ve çalıştırma ekranını açar."
        image="/screenshots/grading-overview.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Kağıtları Değerlendir soru listesi; Q1-Q6 satırları ve sağ üstte Otomatik Notlandırma durumu bağlantısı görünüyor."
        caption="Kağıtları Değerlendir — otomatik notlandırmaya giriş"
      >
        <ul>
          <li>
            Soru listesi, her sorunun değerlendirme durumunu ve ilerlemesini
            gösterir.
          </li>
          <li>
            Sağ üstteki <strong>Otomatik Notlandırma</strong> bağlantısından
            AI çalıştırma ekranına geçilir.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="calistirma"
        title="Soruları seç ve başlat"
        intro="Otomatik notlandırma ekranında değerlendirilecek soruları işaretleyin. Tüm sorular hazırsa Tümünü Seç bağlantısını kullanıp yeşil çalıştırma düğmesiyle süreci başlatın."
        image="/screenshots/autograde-questions-select.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Aynı sayfanın alt yarısı; 'Otomatik Notlandırılacak Soruları Seçin' başlığı altında Q1, Q2, Q3, Q4 soruları işaretli ve hepsinin yanında 'Başlamadı' rozeti; sağda 'Tümünü Seç / Tümünün Seçimini Kaldır' bağlantıları; alt sağda 'Otomatik Notlandırmayı Yeniden Çalıştır (6 Soru)' yeşil düğmesi; sol altta 'Ayarları Kaydet' düğmesi."
        caption="Otomatik notlandırılacak soruları seçim listesi"
      >
        <ul>
          <li>
            <strong>Tümünü Seç</strong> ve{' '}
            <strong>Tümünün Seçimini Kaldır</strong> bağlantıları toplu seçim
            yapar.
          </li>
          <li>
            Durum rozetleri sorunun daha önce işlenip işlenmediğini gösterir:
            <code> Başlamadı</code>, <code>İşlem Devam Ediyor</code> veya{' '}
            <code>Tamamlandı</code>.
          </li>
          <li>
            Gerekirse özel talimat ve güven eşiği ayarlarını kaydedebilirsiniz;
            kısa akışta varsayılan ayarlar yeterlidir.
          </li>
          <li>
            <strong>Otomatik Notlandırmayı Yeniden Çalıştır (N Soru)</strong>{' '}
            seçili soruları işler ve sonuçları inceleme adımına hazırlar.
          </li>
          <li>
            İşlem tamamlanınca düşük güvenli cevapları inceleyip soruları
            onaylayın.
          </li>
        </ul>
      </ScreenSection>
    </DocPage>
  )
}
