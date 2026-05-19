import type { Metadata } from 'next'

import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: '5. İncele ve onayla',
  description:
    'Otomatik değerlendirme sonuçlarını kontrol edip soruları onaylama.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'incele', title: 'İncele' },
  { id: 'onayla', title: 'Onayla' },
]

export default function DegerlendirmePage() {
  return (
    <DocPage title="5. İncele ve onayla" tableOfContents={tableOfContents}>
      <p className="lead">
        Otomatik değerlendirme bittikten sonra düşük güvenli cevapları hızlıca
        gözden geçirin. Gerekli düzeltmeleri yaptıktan sonra her soruyu
        onaylayarak sonuçları yayınlamaya hazır hale getirin.
      </p>

      <ScreenSection
        id="incele"
        title="İncele"
        intro="İnceleme ekranında solda öğrencinin kağıdı, sağda AI'ın seçtiği kriter, gerekçe ve güven oranı görünür. Öneri doğruysa incelemeyi bitirin; değilse doğru kriteri seçip puanı düzeltin."
        image="/screenshots/grading-submission-review.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="İnceleme ekranı; solda öğrencinin Q1 cevabının taranmış görüntüsü ve üstte zoom/çizim araçları; sağda 'Sorular' panelinde Q1 Homojen ve Heterojen Karışım Örnekleri (0/20 puan) açılmış, 'Gerekçe: İki doğru heterojen örnek açıkça mevcut, homojen kısmı belirsiz', %58 güven; altta 6 kriter listesi, 3. kriter (İki doğru heterojen karışım örneği verilmiş, +10 puan) seçilmiş ve 'Yapay zeka önerisi' rozetli; sağ altta 'İncelemeyi Bitir' düğmesi, alt çubukta 'Önceki', 'Sonraki', 'Sonraki (İncelenmemiş)' düğmeleri."
        caption="Tek bir gönderimi inceleme ekranı"
      >
        <ul>
          <li>
            <strong>Gerekçe</strong> ve <strong>Güven</strong> alanları, AI
            kararını hızlı kontrol etmenizi sağlar.
          </li>
          <li>
            <strong>Yapay zeka önerisi</strong> rozeti seçili kriteri gösterir;
            yanlışsa başka kriter seçebilirsiniz.
          </li>
          <li>
            <strong>Sonraki (İncelenmemiş)</strong> düğmesi sizi sıradaki
            kontrol bekleyen cevaba götürür.
          </li>
          <li>
            Tüm düşük güvenli cevaplar kapandığında soru onaya hazır hale
            gelir.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="onayla"
        title="Onayla"
        intro="Bir sorudaki tüm cevaplar Hazır veya İncelendi durumuna geldiğinde alt çubukta Onay için hazır rozeti çıkar. Onayla düğmesine basarak o soruyu kapatın."
        image="/screenshots/grading-question-ready.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Q2 Çözeltilerin Donma Noktası soru detayı; öğrenci tablosunda 12 öğrenci, çoğunda 'Hazır', üç öğrencide (Zeynep Aydın, Emre Öztürk, Seda Polat) 'İncelendi' rozeti; sağ üstte yeşil 'Gruplar: Tamamlandı' yazısı; alt çubuk: %100 incelendi, 3/3 İncelendi ilerleme çubuğu, yeşil 'Onay için hazır' rozeti, yeşil 'Onayla' düğmesi; sağda soruyu inceleme, ilk notlandırılmamıştan başlama ve baştan başlama düğmeleri."
        caption="Tüm gönderimler incelendi — soru onaya hazır"
      >
        <ul>
          <li>
            <strong>Hazır</strong> otomatik olarak kabul edilebilir cevabı,
            <strong> İncelendi</strong> ise manuel kontrol edilmiş cevabı
            gösterir.
          </li>
          <li>
            İlerleme %100 olmadan <strong>Onayla</strong> düğmesi aktif olmaz.
          </li>
          <li>
            Tüm sorular onaylandıktan sonra <strong>Notları Yayınla</strong>{' '}
            ile sonuç ekranı hazırlanır.
          </li>
          <li>
            Notları yayınladıktan sonra sonuçları ve sınıf istatistiklerini
            görüntüleyin.
          </li>
        </ul>
      </ScreenSection>
    </DocPage>
  )
}
