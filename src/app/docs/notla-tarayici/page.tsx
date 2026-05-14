import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'

export const metadata: Metadata = {
  title: 'Notla Tarayıcı',
  description:
    'Notla Tarayıcı mobil uygulaması — kağıtları telefonla tarayıp doğrudan ödev/sınava yüklemek için.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'tanitim', title: 'Notla Tarayıcı nedir?' },
  { id: 'kurulum', title: 'Kurulum ve giriş' },
  { id: 'tarama', title: 'Kağıt tarama akışı' },
  { id: 'esitleme', title: 'Yükleme ve eşitleme' },
]

export default function NotlaTarayiciPage() {
  return (
    <DocPage title="Notla Tarayıcı" tableOfContents={tableOfContents}>
      <p className="lead">
        Notla Tarayıcı, öğretmenlerin öğrenci kağıtlarını telefonlarıyla
        tarayıp doğrudan web arayüzündeki ilgili ödev/sınava
        gönderebilmesi için tasarlanmış bir mobil uygulamadır. Bu sayfa,
        uygulamanın kullanımına ait detaylı rehber için yer tutucudur.
      </p>

      <Callout title="Bu bölüm henüz hazırlanıyor">
        Notla Tarayıcı uygulamasının ekran görüntüleri ve adım adım
        kurulum/kullanım talimatları yakında eklenecek. Şimdilik web
        arayüzündeki yükleme akışı için{' '}
        <a href="/docs/kagit-yukleme">Öğrenci kağıtlarını yükleme</a>{' '}
        bölümüne göz atabilirsiniz.
      </Callout>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="tanitim">Notla Tarayıcı nedir?</h2>
        <p>
          Tarayıcı uygulaması, kağıtların tarama kalitesini iyileştirmek
          ve doğru sayfa eşlemesi için optimize edilmiş bir kameradır.
          Tek bir akışta birden fazla sayfa tarayıp tek bir ödev/sınava
          gönderebilirsiniz. Web arayüzünden farklı olarak, taramaların
          fiziksel medyadan gelen olası kalite kayıplarını telafi
          etmek için ek bir filtre uygular.
        </p>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="kurulum">Kurulum ve giriş</h2>
        <p>
          Notla Tarayıcı, App Store ve Google Play&apos;de bulunur.
          Kurulumdan sonra Notla web hesabınızla aynı kullanıcı adı ve
          şifre ile giriş yapın. Birden fazla kurumda yetkiniz varsa
          uygulama açılışta hangi kurumda çalışmak istediğinizi
          sorar.
        </p>
        <p>
          <em>(Bu bölümün ekran görüntüleri yakında eklenecek.)</em>
        </p>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="tarama">Kağıt tarama akışı</h2>
        <p>
          Uygulamada bir ödev/sınav seçildikten sonra kağıtları sırayla
          tarayabilirsiniz. Uygulama her sayfa için kenarları
          otomatik algılar; gerekirse manuel olarak ayarlamanız için
          kareler gösterir. Bir öğrencinin tüm sayfalarını arka arkaya
          tarayıp tek bir kitapçık olarak gönderebilir veya sayfaları
          ayrı ayrı yükleyebilirsiniz.
        </p>
        <p>
          <em>(Detaylı adımlar ve ekran görüntüleri yakında.)</em>
        </p>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="esitleme">Yükleme ve eşitleme</h2>
        <p>
          Tüm sayfalar tarandıktan sonra <em>Gönder</em> düğmesine
          basın; uygulama dosyaları buluta yükler ve web arayüzünden
          ulaşılabilir hale getirir. Web&apos;de Yüklemeleri Yönet
          sekmesindeki <strong>Yükleme tamamlandı mı?</strong>{' '}
          düğmesine basıldığında yeni gönderimler ekrana düşer.
        </p>
        <p>
          Yükleme tamamlandıktan sonra geri kalan akış (otomatik
          notlandırma, inceleme, yayınlama) web arayüzünden devam
          eder.
        </p>
      </section>
    </DocPage>
  )
}
