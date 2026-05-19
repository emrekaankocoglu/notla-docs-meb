import type { Metadata } from 'next'

import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: '2. Taslak yükle ve AI ile analiz et',
  description:
    'Cevap anahtarı veya çözüm içeren taslağı yükleyip soruları AI ile analiz etme.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'taslak-yukle', title: 'Taslak / cevap anahtarı yükle' },
  { id: 'ai-analiz', title: 'AI ile analiz et' },
]

export default function TaslakHazirlamaPage() {
  return (
    <DocPage
      title="2. Taslak yükle ve AI ile analiz et"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Ödev/sınav oluşturulduktan sonra boş kağıdı, cevap anahtarını veya
        çözüm içeren taslağı yükleyin. AI bu dosyadan soruları, puanları ve
        değerlendirme kriterlerini çıkarır.
      </p>

      <ScreenSection
        id="taslak-yukle"
        title="Taslak / cevap anahtarı yükle"
        intro="Sihirbazın ilk ekranında kağıdın PDF ya da görsel halini yükleyin. Dosya mümkünse cevap anahtarını veya örnek çözümü içermelidir; AI kriterleri bu referansa göre daha doğru üretir."
        image="/screenshots/wizard-step1-upload.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Adım 01 Dosya Yükle ekranı; iki ayrı sürükle-bırak kartı: solda görsel (JPG/JPEG/PNG, 10 MB), sağda PDF (100 MB); sağ altta 'Seç ve Devam Et' düğmesi."
        caption="Adım 1 — Dosyaları Yükle"
      >
        <ul>
          <li>
            <strong>Görsel kartı</strong> tek sayfalık JPG/PNG dosyaları için
            uygundur.
          </li>
          <li>
            <strong>PDF kartı</strong> çok sayfalı sınav, cevap anahtarı veya
            çözüm dokümanı için kullanılır.
          </li>
          <li>
            <strong>Seç ve Devam Et</strong> düğmesi dosyayı kaydeder ve AI
            analiz ekranına geçer.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="ai-analiz"
        title="AI ile soru analizi"
        intro="Yükleme tamamlandığında Notla taslağı analiz eder; soru başlıklarını, puanları ve rubric kriterlerini otomatik çıkarır. Analiz bittiğinde soru kartlarını hızlıca kontrol edip eksik ya da yanlış kriterleri düzeltebilirsiniz."
        image="/screenshots/step2-questions-analyzing-toast.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Adım 02 Soruları Ekle; sol tarafta yüklenen kağıdın önizlemesi, sağda 'Sorular işleniyor' yükleniyor mesajı, sağ üstte 'Başarılı: Şablon analizi başlatıldı' bildirimi."
        caption="AI soru analizi başlatıldı"
      >
        <ul>
          <li>
            Analiz sırasında panelde <em>Sorular işleniyor</em> mesajı
            görünür.
          </li>
          <li>
            AI çıktısı tamamlanınca her soru için önerilen puanı ve kriterleri
            kontrol edin.
          </li>
          <li>
            Bir soru eksikse elle ekleyebilir; kriterler yetersizse otomatik
            değerlendirmeye geçmeden önce düzenleyebilirsiniz.
          </li>
          <li>
            Sorular ve kriterler hazır olduğunda öğrenci taramalarını yükleme
            adımına geçin.
          </li>
        </ul>
      </ScreenSection>
    </DocPage>
  )
}
