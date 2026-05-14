import type { Metadata } from 'next'

import { Callout } from '@/components/Callout'
import { DocPage, type DocSection } from '@/components/DocPage'
import { ScreenSection } from '@/components/ScreenSection'

export const metadata: Metadata = {
  title: 'Kağıtları değerlendirme',
  description:
    'Soru bazında değerlendirme akışı; otomatik notlandırma sonuçlarını gözden geçirme, manuel inceleme gerektiren gönderimler ve notları yayınlama.',
}

const tableOfContents: Array<DocSection> = [
  { id: 'soru-listesi', title: 'Soru listesi' },
  { id: 'soru-detay', title: 'Bir soruyu inceleme' },
  { id: 'inceleme-gerekli', title: '“İnceleme Gerekli” gönderimler' },
  { id: 'yayinla', title: 'Notları yayınlama' },
]

export default function DegerlendirmePage() {
  return (
    <DocPage
      title="Kağıtları değerlendirme"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Kağıtları Değerlendir adımı, otomatik notlandırma sonuçlarını
        soru soru gözden geçirip gerektiğinde elle düzeltme yapmanızı
        sağlar. Yeterli güvene sahip notlar otomatik &quot;Hazır&quot;
        olarak işaretlenir; düşük güvenli olanlar &quot;İnceleme
        Gerekli&quot; olarak listelenir ve sizin onayınızı bekler.
      </p>

      <hr />

      <ScreenSection
        id="soru-listesi"
        title="Soru listesi"
        intro="Kağıtları Değerlendir adımının ana ekranı, ödev/sınavın tüm sorularını ve her birinin notlandırma durumunu özetler. Üstte 'Otomatik Notlandırma: Tamamlandı' rozeti otomatik akışın bittiğini doğrular."
        image="/screenshots/grading-overview.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Sorular listesi; Q1-Q6 satırları, her birinin yanında '12 Notlandırılmamış' turuncu rozet ve %0 Notlandı ilerleme; sağ üstte 'Otomatik Notlandırma: Tamamlandı' yeşil yazı; alt kısımda turuncu 'Notlandırmayan gönderimler var.' uyarısı ve sağda yeşil 'Notları Yayınla' düğmesi."
        caption="Sorular listesi — soru başına ilerleme"
      >
        <ul>
          <li>
            Her satır <strong>kaç gönderimin notlandırılmadığını</strong>{' '}
            (örnek: <code>12 Notlandırılmamış</code>) ve toplam ilerleme
            yüzdesini gösterir.
          </li>
          <li>
            Bir soru üzerine tıkladığınızda sorunun tüm öğrenci
            kağıtlarının listelendiği detay sayfasına geçersiniz.
          </li>
          <li>
            <strong>Tüm soruları değerlendir</strong> bağlantısı sağ
            üstte yer alır ve toplu inceleme akışını başlatır.
          </li>
          <li>
            Sayfa altındaki <strong>Notları Yayınla</strong> düğmesi
            tüm sorular tamamlanmadıkça uyarı verir; tamamlanmamış
            gönderimler &quot;Hazır&quot; sayılmazsa uyarıyı görmezden
            gelmek not yayınlamayı eksik bırakır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="soru-detay"
        title="Bir soruyu inceleme"
        intro="Bir soruya tıkladığınızda öğrencilerin tek tek listelendiği bir tablo açılır. Her satırın sağındaki rozet o öğrencinin gönderiminin durumunu gösterir: 'Hazır' otomatik notu kabul edilebilir, 'İnceleme Gerekli' ise sizin onayınız bekleniyordur."
        image="/screenshots/grading-question-students.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Q1 Homojen ve Heterojen Karışım Örnekleri detayı; öğrenci tablosu (Zeynep Aydın, Mustafa Çelik, Mehmet Yılmaz, Ayşe Demir, Ahmet Kaya, Fatma Koç, Emre Öztürk, Elif Şahin, Can Yıldırım, Esra Acar, Burak Arslan, Seda Polat); çoğunda 'Hazır' yazıyor, Esra Acar'ın yanında turuncu 'İnceleme Gerekli' rozeti; sağ üstte 'Gruplar: Tamamlandı' yeşil etiketi; alt çubuk: 0% incelendi, 0/1 incelendi, 1 gönderim inceleme bekliyor; sağda 'Review This Question', 'İlk Notlandırılmamıştan Başla', 'Baştan Başla' düğmeleri."
        caption="Bir soruda öğrenci başına notlandırma durumu"
      >
        <ul>
          <li>
            <strong>Hazır</strong>: AI otomatik bir not vermiş ve güven
            eşiğinin üzerinde olduğu için onaylanabilir.
          </li>
          <li>
            <strong>İnceleme Gerekli</strong>: AI emin olamamış,
            cevabın okunabilir olmadığını ya da kriterlere uymadığını
            tespit etmiş; manuel olarak gözden geçirilmelidir.
          </li>
          <li>
            <strong>İlk Notlandırılmamıştan Başla</strong> sizi sıradaki
            incelemeye geçirir; her cevabı tek tek görüntüleyip
            puanı veya kriteri değiştirebilirsiniz.
          </li>
          <li>
            <strong>Baştan Başla</strong> tüm gönderimleri sırasıyla
            yeniden açar; manuel kontrolden geçirmek istediğiniz
            durumlar için kullanışlıdır.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="inceleme-gerekli"
        title="“İnceleme Gerekli” gönderimler"
        intro="Tüm soruların başlangıçta 'Notlandırılmamış' olduğu bir görünüm. Üstte 'Otomatik Notlandırma: Başlamadı' yazısı varken, alt çubukta 'Notlandırmayan gönderimler var.' uyarısı yer alır. Otomatik notlandırma çalıştırıldıkça bu rakamlar düşer."
        image="/screenshots/grading-questions-list.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Sorular listesi; Q1-Q6 satırları, her birinin yanında '2 Notlandırılmamış' rozeti, %0 Notlandı; sağ üstte 'Otomatik Notlandırma: Başlamadı' ve 'Tüm soruları değerlendir' bağlantısı; alt çubukta turuncu 'Notlandırmayan gönderimler var.' ve 'Notları Yayınla' düğmesi."
        caption="Otomatik notlandırma henüz çalıştırılmamış görünüm"
      >
        <ul>
          <li>
            Soru başına notlandırma sırasını <strong>öğrenci sırasına</strong>{' '}
            göre takip etmek tercih edilir; bu sayede aynı kağıdın
            farklı sorularını birbirinin ardına inceleyebilirsiniz.
          </li>
          <li>
            Bir kriteri elle değiştirdiğinizde sistem değişikliği
            kaydeder ve gönderimi <strong>Hazır</strong> olarak
            işaretler; sıradaki gönderime otomatik geçiş için sağ üstteki
            ileri ok düğmesini kullanın.
          </li>
          <li>
            Hatalı bir not vermiş AI&apos;ı yeniden çalıştırmak istiyorsanız{' '}
            <a href="/docs/notlandirma-ayarlari">otomatik notlandırma
            ayarları</a> sayfasına dönüp talimatı güncelleyip yeniden
            başlatabilirsiniz.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <section className="scroll-mt-28">
        <h2 id="yayinla">Notları yayınlama</h2>
        <p>
          Tüm sorular için inceleme bittikten sonra alt çubuktaki yeşil{' '}
          <strong>Notları Yayınla</strong> düğmesine basın. Bu işlem:
        </p>
        <ul>
          <li>
            Öğrencilerin notlarını sistemde kalıcı olarak kaydeder.
          </li>
          <li>
            Öğrencilere not düzeltme isteği gönderme hakkı tanır.
          </li>
          <li>
            Sonuçları <a href="/docs/sonuclar">Sonuçları Görüntüle</a>{' '}
            sayfasında istatistiklerle birlikte görünür hale getirir.
          </li>
        </ul>
        <Callout type="warning" title="Yayın öncesi son kontrol">
          Yayınlamadan önce her sorunun ilerleme yüzdesinin %100 olduğundan
          ve hiç &quot;İnceleme Gerekli&quot; gönderimin kalmadığından
          emin olun. Yayın sonrası bir notu değiştirmek mümkündür ama
          öğrencinin notu değiştiğinde bilgilendirilmesi gerekir.
        </Callout>
      </section>
    </DocPage>
  )
}
