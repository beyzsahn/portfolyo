# Beyza — Kişisel Portfolyo

Türkçe, mobil uyumlu ve yalnızca HTML, CSS, JavaScript ile hazırlanmış statik portfolyo. Backend, paket kurulumu veya derleme gerektirmez. Tüm görseller CSS ve satır içi SVG ile oluşturulmuştur; harici font, kütüphane veya görsel servisine bağımlılık yoktur.

## Dosyalar

- `index.html`: Sayfa yapısı, dört cümlelik hakkımda metni ve örnek içerikler.
- `style.css`: Renkler, sayfa düzeni, bileşenler ve mobil görünüm.
- `script.js`: Mobil menü, bölüm vurgusu, proje filtreleri, proje detayları ve mesaj taslağı.

## Yerel kullanım

`index.html` dosyasını tarayıcıda açın. İnternet bağlantısı gerekmez. Pano izni yoksa kopyalama düğmesi metni seçer ve elle kopyalamanızı sağlar.

## Kişiselleştirme

1. `script.js` başındaki `CONTACT_EMAIL` değerine kendi gerçek e-posta adresinizi yazın. Boş bırakılırsa iletişim formu yalnızca ekranda taslak oluşturur; herhangi bir yere göndermez. Adres eklendiğinde `mailto:` ile ziyaretçinin e-posta uygulamasını açar. Gönderim için cihazda bir e-posta uygulaması ayarlanmış olmalıdır; taslak her durumda ekranda da gösterilir.
2. Proje kartları **örnek konseptlerdir**. Gerçek projeleriniz hazır olduğunda `index.html` içindeki kartları ve `script.js` içindeki `projects` açıklamalarını değiştirin. Ekrandaki küçük proje çizimleri etkileşimli uygulamalar değildir.
3. Yetenekler bölümündeki başlangıç etiketlerini kendi teknoloji ve deneyimlerinize göre güncelleyin.
4. Renkler `style.css` dosyasının başındaki `:root` değişkenleriyle düzenlenir.

## GitHub Pages

Dosyaları bir GitHub deposunun aynı klasörüne yükleyin. Depoda **Settings → Pages** bölümünden **Deploy from a branch** seçeneğini, dosyaların bulunduğu dalı ve kök klasörü (`/ (root)`) seçerek kaydedin. `index.html`, `style.css` ve `script.js` birlikte tutulmalıdır. Bağlantılar göreli olduğu için hem kullanıcı hem proje Pages adreslerinde çalışır. Site henüz GitHub'a yüklenmiş veya yayımlanmış değildir.

## Erişilebilirlik ve gizlilik

Anlamsal HTML, klavye odakları, içeriğe atlama bağlantısı, etiketli form, erişilebilir modal ve hareket azaltma desteği bulunur. JavaScript kapalıyken ana içerik ve gezinme bağlantıları görünür kalır. Form verileri sunucuya gönderilmez veya tarayıcı depolamasına kaydedilmez.
