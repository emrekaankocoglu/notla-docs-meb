import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Başlarken',
  description:
    'Notla nedir, kimler kullanır ve arayüzün ana bölümleri. Sisteme giriş yaptıktan sonra göreceğiniz ekranlara genel bakış.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'notla-nedir', title: 'Notla nedir?' },
  { id: 'sisteme-giris', title: 'Sisteme giriş' },
  { id: 'dersler-ekrani', title: 'Dersler ekranı' },
  { id: 'roller', title: 'Roller ve görünüm' },
  { id: 'sonraki-adim', title: 'Sonraki adım' },
]

export default function BaslarkenPage() {
  return (
    <DocPage title="Başlarken" tableOfContents={tableOfContents}>
      <p className="lead">
        Notla; ders ve kullanıcı yönetiminden ödev/sınav oluşturmaya, öğrenci
        kağıtlarını yapay zekâ destekli olarak değerlendirmeye kadar tüm
        süreci tek bir platformda toplayan bir eğitim aracıdır. Bu sayfa,
        sisteme ilk girişten sonra göreceğiniz ekranları tanıtır.
      </p>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="notla-nedir">Notla nedir?</h2>
        <p>
          Notla, kurum koordinatörlerinin ders ve kullanıcı oluşturup
          öğretmenlere yetki verdiği; öğretmenlerin ise ödev/sınav hazırlayıp
          öğrenci kağıtlarını otomatik olarak değerlendirebildiği bir
          platformdur. Tipik kullanıcı yolculuğu üç ana parçadan oluşur:
        </p>
        <ol>
          <li>
            <strong>Kurulum.</strong> Koordinatör kullanıcıları sisteme
            ekler, dersleri oluşturur ve öğretmen/öğrencileri atar.
          </li>
          <li>
            <strong>Hazırlık.</strong> Öğretmen ders içinde bir ödev veya
            sınav oluşturur, taslağı yükler ve soruları/değerlendirme
            kriterlerini tanımlar.
          </li>
          <li>
            <strong>Değerlendirme.</strong> Öğrenci kağıtları yüklenir,
            otomatik notlandırma çalıştırılır ve sonuçlar yayınlanır.
          </li>
        </ol>
      </section>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="sisteme-giris">Sisteme giriş</h2>
        <p>
          Notla&apos;ya kurumunuza ait bağlantı üzerinden (örnek:{' '}
          <code>app.notla.net</code>) erişip kullanıcı adınız ve parolanız
          ile giriş yapabilirsiniz. Birden fazla kurumda yetkiniz varsa,
          giriş sonrasında sağ üstteki kullanıcı menüsünden aktif kurumu
          seçebilirsiniz.
        </p>
        <Callout title="Demo hesap">
          Bu kılavuzdaki ekran görüntüleri <strong>Başkent Demo</strong>{' '}
          (koordinatör) ve <strong>ETKİM Ortaokulu</strong> (öğretmen)
          kurumlarına aittir. Ekranlarda gördüğünüz isimler test
          verisidir.
        </Callout>
      </section>

      <hr />

      <ScreenSection
        id="dersler-ekrani"
        title="Dersler ekranı"
        intro="Sisteme giriş yaptıktan sonra karşınıza Dersler ekranı çıkar. Sol menü her sayfada yanınızda olur; ana alanda kurumdaki dersler ve yeni ders ekleme kartı listelenir."
        image="/screenshots/dashboard-courses.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Notla'nın Dersler ekranı; sol menüde Dersler ve Kişiler, ortada mevcut ders kartları ve yeni ders ekleme kutusu görülüyor."
        caption="Koordinatör görünümü — Dersler"
      >
        <ul>
          <li>
            <strong>Sol menü</strong> her sayfada görünür ve sizi{' '}
            <code>Dersler</code> ile <code>Kişiler</code> bölümlerine
            götürür. Sağ alt köşedeki <code>Yardım</code> bağlantısı bu
            kılavuzu açar.
          </li>
          <li>
            <strong>Hoş geldiniz mesajı</strong> hangi kullanıcıyla giriş
            yaptığınızı ve hangi kurumda çalıştığınızı doğrular.
          </li>
          <li>
            <strong>Ders kartları</strong> mevcut dersleri gösterir; en
            soldaki kesik çizgili kart ise <code>Yeni ders ekle</code>{' '}
            sihirbazını başlatır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="roller"
        title="Roller ve görünüm"
        intro="Notla'da iki temel rol vardır: koordinatör ve öğretmen. Hangi rolde olduğunuza göre gördüğünüz menüler ve yapabileceğiniz işlemler farklılaşır, ancak temel iş akışı aynı kalır."
        image="/screenshots/dashboard-courses-en.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="İngilizce arayüzde Notla'nın Courses ekranı; sol menüde Courses ve Users seçenekleri yer alıyor."
        caption="Aynı ekran — kullanıcı dili İngilizce olarak seçilmiş"
      >
        <ul>
          <li>
            <strong>Koordinatör</strong> sol menüde hem{' '}
            <code>Dersler</code> hem de <code>Kişiler</code>&apos;i görür.
            Kullanıcı ekleme, ders oluşturma ve öğretmen/öğrenci atama
            işlemleri yalnızca koordinatör tarafından yapılır.
          </li>
          <li>
            <strong>Öğretmen</strong> yalnızca kendisine atanmış dersleri
            görür ve doğrudan ödev/sınav oluşturma adımına geçebilir.
          </li>
          <li>
            <strong>Arayüz dili</strong> hesap ayarlarınızdan Türkçe veya
            İngilizce olarak değiştirilebilir; içerik aynı kalır,
            yalnızca etiketler tercüme edilir.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="sonraki-adim">Sonraki adım</h2>
        <p>
          Koordinatörseniz öğretmen ve öğrencilerinizi sisteme eklemek için{' '}
          <a href="/docs/kullanicilar">Kullanıcıları yönetme</a>{' '}
          bölümünden devam edin. Eğer doğrudan bir ders oluşturmak
          istiyorsanız <a href="/docs/ders-olusturma">Ders oluşturma</a>{' '}
          adımına geçebilirsiniz.
        </p>
        <p>
          Öğretmenseniz ve size atanmış bir ders zaten varsa,{' '}
          <a href="/docs/odev-olusturma">Ödev/sınav oluşturma</a>{' '}
          bölümünden başlayabilirsiniz.
        </p>
      </section>
    </DocPage>
  )
}
