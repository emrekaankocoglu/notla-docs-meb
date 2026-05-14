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
  { id: 'soruyu-onayla', title: 'Soruyu onaylama' },
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
        intro="Bir gönderimi açtığınızda iki bölmeli inceleme ekranı belirir: solda öğrencinin taranmış kağıdı, sağda o soru için AI'ın seçtiği kriter, gerekçesi ve güven yüzdesi. Yapay zekânın önerisini onaylayabilir, başka bir kriteri seçebilir veya manuel olarak puanı değiştirebilirsiniz."
        image="/screenshots/grading-submission-review.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="İnceleme ekranı; solda öğrencinin Q1 cevabının taranmış görüntüsü ve üstte zoom/çizim araçları; sağda 'Sorular' panelinde Q1 Homojen ve Heterojen Karışım Örnekleri (0/20 puan) açılmış, 'Gerekçe: İki doğru heterojen örnek açıkça mevcut, homojen kısmı belirsiz', %58 güven; altta 6 kriter listesi, 3. kriter (İki doğru heterojen karışım örneği verilmiş, +10 puan) seçilmiş ve 'Yapay zeka önerisi' rozetli; sağ altta 'İncelemeyi Bitir' düğmesi, alt çubukta 'Önceki', 'Sonraki', 'Sonraki (İncelenmemiş)' düğmeleri."
        caption="Tek bir gönderimi inceleme ekranı"
      >
        <ul>
          <li>
            Sağ paneldeki <strong>Gerekçe</strong> kutusu AI&apos;ın
            seçimini neden yaptığını kısaca özetler. Yan taraftaki{' '}
            <strong>Güven</strong> çubuğu (örnek: <code>%58</code>) bu
            kararına ne kadar emin olduğunu gösterir; düşük güvenli
            kararları daha dikkatli incelemek faydalıdır.
          </li>
          <li>
            <strong>Yapay zeka önerisi</strong> rozeti, AI&apos;ın seçtiği
            kriteri işaretler. Onayladığınızda{' '}
            <strong>İncelemeyi Bitir</strong> düğmesine basmanız yeterli;
            farklı bir kriteri tıklayarak seçimi anında değiştirebilirsiniz.
          </li>
          <li>
            Soldaki kâğıt görselinin üst çubuğundaki araçlarla{' '}
            <em>yakınlaştırma</em>, <em>kalem</em>, <em>metin</em> ve
            <em> el</em> simgelerini kullanarak inceleme yapabilir;
            okunmayan bir bölgeyi vurgulamak veya ek not düşmek için
            çizim araçlarını kullanabilirsiniz.
          </li>
          <li>
            Üstteki <strong>Not: 0.0 / 100.0</strong> sayacı kâğıdın o
            anki toplam notunu yansıtır; kriter seçimi değiştikçe
            otomatik güncellenir.
          </li>
          <li>
            Sağ alttaki <strong>Sonraki (İncelenmemiş)</strong> düğmesi,
            sıradaki &quot;İnceleme Gerekli&quot; gönderime atlar; bu,
            yalnızca düşük güvenli vakaları sırayla işlemenin en hızlı
            yoludur.
          </li>
          <li>
            Hatalı not veren AI&apos;ı yeniden çalıştırmak istiyorsanız{' '}
            <a href="/docs/notlandirma-ayarlari">otomatik notlandırma
            ayarları</a> sayfasına dönüp talimatı güncelleyip yeniden
            başlatabilirsiniz.
          </li>
        </ul>
      </ScreenSection>

      <hr />

      <ScreenSection
        id="soruyu-onayla"
        title="Soruyu onaylama"
        intro="Bir sorudaki tüm 'İnceleme Gerekli' gönderimleri inceledikten sonra öğrenci tablosuna geri dönersiniz. Tüm satırlar 'Hazır' veya 'İncelendi' olduğunda alt çubukta yeşil 'Onay için hazır' rozeti ve 'Onayla' düğmesi belirir; bu düğmeye basmak o soruyu nihai olarak kapatır ve sonuçların yayınlanmaya hazır olmasını sağlar."
        image="/screenshots/grading-question-ready.png"
        imageWidth={3420}
        imageHeight={1850}
        alt="Q2 Çözeltilerin Donma Noktası soru detayı; öğrenci tablosunda 12 öğrenci, çoğunda 'Hazır', üç öğrencide (Zeynep Aydın, Emre Öztürk, Seda Polat) 'İncelendi' rozeti; sağ üstte yeşil 'Gruplar: Tamamlandı' yazısı; alt çubuk: %100 incelendi, 3/3 İncelendi ilerleme çubuğu, yeşil 'Onay için hazır' rozeti, yeşil 'Onayla' düğmesi; sağda 'Review This Question', 'İlk Notlandırılmamıştan Başla', 'Baştan Başla' düğmeleri."
        caption="Tüm gönderimler incelendi — soru onaya hazır"
      >
        <ul>
          <li>
            <strong>Hazır</strong>: AI&apos;ın güven eşiğini geçmiş ve
            elle değişiklik gerektirmeyen gönderim.{' '}
            <strong>İncelendi</strong>: önce &quot;İnceleme Gerekli&quot;
            iken sizin onayınız ile sonuca bağlanmış gönderim.
          </li>
          <li>
            Sağ üstteki <strong>Gruplar: Tamamlandı</strong> rozeti, bu
            sorudaki tüm kriter gruplarının tutarlı şekilde
            kapatıldığını doğrular; rozet sarı ise hâlâ eksik kalmış
            grup vardır.
          </li>
          <li>
            <strong>Onay için hazır</strong> rozeti yalnızca tüm
            gönderimler ele alındığında (ilerleme çubuğu %100) görünür.
            Eksik bırakılan gönderim varsa <em>Onayla</em> düğmesi
            pasif kalır.
          </li>
          <li>
            <strong>Onayla</strong> düğmesi, o sorunun tüm gönderimlerini
            nihai olarak kilitler ve <em>Sorulara Dön</em> sayfasında o
            satırı yeşil onayla işaretler. Onaydan sonra notları
            yayınlamadan önce hâlâ değişiklik yapabilirsiniz, ancak her
            değişiklik soruyu yeniden onaylamayı gerektirir.
          </li>
          <li>
            Sağdaki <strong>Baştan Başla</strong> düğmesi tüm
            gönderimleri sırasıyla yeniden açar; <strong>Review This
            Question</strong> ise inceleme akışını özet kontrol için
            kullanılır.
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
