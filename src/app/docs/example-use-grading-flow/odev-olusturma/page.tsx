import type { Metadata } from 'next'

import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: '1. Ödev oluştur',
  description:
    'Bir ders içinde yeni ödev veya sınav oluşturup öğrencilerle ilişkilendirme.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'olustur-dialog', title: 'Ödev/sınav oluştur' },
]

export default function OdevOlusturmaPage() {
  return (
    <DocPage title="1. Ödev oluştur" tableOfContents={tableOfContents}>
      <p className="lead">
        Akış, ilgili dersin içinde yeni bir ödev/sınav oluşturarak başlar. Bu
        kayıt daha sonra taslak, öğrenci taramaları, otomatik değerlendirme ve
        sonuç sayfalarını birbirine bağlar.
      </p>

      <ScreenSection
        id="olustur-dialog"
        title="Ödev/sınav oluştur"
        intro="Ders sayfasında Ödevler/Sınavlar bölümünden Oluştur düğmesine basın. Açılan pencerede başlık, kısa açıklama ve öğrenci atama tercihini girin."
        image="/screenshots/assignment-create-dialog.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Yeni ödev/sınav oluştur dialogu; İsim alanına 'Birinci Dönem Sınavı', Açıklama alanına '14 Mart 2026' yazılmış; 'Derse kayıtlı tüm öğrencilere ata' seçeneği açık."
        caption="Adım 1 — Ödev/Sınav Oluştur"
      >
        <ul>
          <li>
            <strong>İsim</strong> alanı zorunludur; öğretmen ve öğrencilerin
            göreceği ana başlık burada belirlenir.
          </li>
          <li>
            <strong>Açıklama</strong> alanına sınav tarihi, ünite adı veya kısa
            not gibi ayırt edici bir bilgi yazabilirsiniz.
          </li>
          <li>
            <strong>Derse kayıtlı tüm öğrencilere ata</strong> anahtarı açıksa
            sınıftaki tüm öğrenciler için gönderim kayıtları otomatik
            hazırlanır.
          </li>
          <li>
            <strong>Oluştur</strong> düğmesine bastıktan sonra bu ödev/sınavın
            hazırlık sihirbazına geçersiniz.
          </li>
          <li>
            Sıradaki adımda cevap anahtarı veya çözüm içeren taslağı yükleyip
            AI analizini başlatın.
          </li>
        </ul>
      </ScreenSection>
    </DocPage>
  )
}
