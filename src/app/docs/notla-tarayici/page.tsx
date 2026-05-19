import type { Metadata } from 'next'

import { DocPage, type DocSection } from '@/components/DocPage'
import { MobileScreens } from '@/components/MobileScreens'

export const metadata: Metadata = {
  title: 'Appendix — Notla Tarayıcı',
  description:
    'Notla Tarayıcı mobil uygulamasıyla öğrenci kağıtlarını hızlıca tarayıp web arayüzüne aktarma.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'ne-zaman', title: 'Ne zaman kullanılır?' },
  { id: 'tarama-akisi', title: 'Tarama akışı' },
]

export default function NotlaTarayiciPage() {
  return (
    <DocPage
      title="Appendix — Notla Tarayıcı"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Notla Tarayıcı, öğrenci kağıtlarını bilgisayarda PDF hazırlamadan
        telefonla tarayıp doğrudan aynı ödev/sınava göndermek içindir. Web
        akışındaki <strong>Taramaları Yükle</strong> seçeneğine alternatiftir.
      </p>

      <section className="scroll-mt-28">
        <h2 id="ne-zaman">Ne zaman kullanılır?</h2>
        <p>
          Kağıtlar fiziksel olarak elinizdeyse ve hızlıca sınıf yığını
          taramak istiyorsanız mobil uygulama daha pratiktir. Aynı hesapla
          giriş yaparsınız; uygulamada gördüğünüz ders ve ödev/sınavlar web
          arayüzündeki yetkinizle aynıdır.
        </p>
        <MobileScreens
          screens={[
            {
              src: '/screenshots/scanner/courses.png',
              alt: 'Notla Tarayıcı Dersler ekranı; atanmış ders kartı ve Dersi Görüntüle bağlantısı.',
              caption: 'Dersler — aynı hesap ve aynı yetkiler',
            },
            {
              src: '/screenshots/scanner/assignment-template-ready.png',
              alt: 'Performans Ödevi detayı; Taslak kartında Şablon yüklendi, Yüklemeler kartında gönderim durumu.',
              caption: 'Ödev/sınav detayı — yüklemeye hazır',
            },
          ]}
        />
        <ul>
          <li>
            <strong>Şablon yüklendi</strong> rozeti varsa doğrudan öğrenci
            kağıdı tarayabilirsiniz.
          </li>
          <li>
            Şablon eksikse önce web akışındaki taslak/AI analizi adımını
            tamamlayın.
          </li>
        </ul>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="tarama-akisi">Tarama akışı</h2>
        <p>
          Yüklemeler kartından kamerayı açın, sayfaları art arda tarayın ve
          önizleme ekranında kontrol ettikten sonra <strong>Yükle</strong>{' '}
          düğmesine basın. Gönderimler web arayüzündeki
          <strong> Yüklemeleri Yönet</strong> ekranına düşer.
        </p>
        <MobileScreens
          screens={[
            {
              src: '/screenshots/scanner/camera-capture.png',
              alt: 'Kamera ekranı; kağıt çerçevesi ve çekim düğmeleri.',
              caption: 'Kamerayla tara',
            },
            {
              src: '/screenshots/scanner/scan-review.png',
              alt: 'Tarama yığınını gözden geçir ekranı; sayfa küçük resimleri, Sayfa ekle ve Yükle düğmeleri.',
              caption: 'Yığını kontrol et ve yükle',
            },
          ]}
        />
        <ul>
          <li>
            Birden fazla öğrencinin kağıdını tek yığında tarayabilirsiniz;
            Notla sayfaları kimlik bölgelerinden otomatik eşler.
          </li>
          <li>
            Eksik öğrenci varsa uygulamadaki <strong>Eksik</strong> filtresiyle
            yalnızca gönderimi olmayan öğrencileri görüp tek tek yükleme
            başlatabilirsiniz.
          </li>
        </ul>
      </section>
    </DocPage>
  )
}
