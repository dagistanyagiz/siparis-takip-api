
# Sipariş Takip API

Node.js ve Express ile geliştirilmiş, REST mimarisinde bir sipariş yönetim API'si.
Veriler `siparisler.json` dosyasında kalıcı olarak saklanır.

## Gereksinimler

- Node.js (v18 veya üzeri)
- npm
- Postman (test için)

## Kurulum

```bash
git clone https://github.com/dagistanyagiz/siparis-takip-api.git
cd siparis-takip-api
npm install
```

## Çalıştırma

```bash
node index.js
```

Geliştirme sırasında dosya değişince otomatik yeniden başlatmak için:

```bash
node --watch index.js
```

Sunucu `http://localhost:3000` adresinde çalışır. Terminalde
"Sunucu çalışıyor: http://localhost:3000" yazısını görmelisiniz.

## Endpoint Listesi

| Yöntem | Adres | Açıklama |
|---|---|---|
| GET | `/siparisler` | Tüm siparişleri listeler |
| GET | `/siparisler?durum=beklemede` | Duruma göre filtreler |
| GET | `/siparisler/:id` | Tek siparişi getirir (yoksa 404) |
| POST | `/siparisler` | Yeni sipariş ekler (201) |
| PUT | `/siparisler/:id` | Siparişi günceller |
| DELETE | `/siparisler/:id` | Siparişi siler |

## Örnek İstek (POST /siparisler)

Body → raw → JSON:

```json
{
  "musteri": "Ayşe Yılmaz",
  "urun": "Laptop",
  "marka": "MSI",
  "model": "Cyborg 15",
  "adet": 1,
  "fiyat": 56000
}
```

`musteri`, `urun`, `adet` ve `fiyat` zorunludur. Eksik olursa API `400 Bad Request` döner.
`id`, `durum` (başlangıçta `beklemede`) ve `tarih` sunucu tarafından otomatik atanır.

## Örnek İstek (PUT /siparisler/1)

```json
{ "durum": "hazirlaniyor" }
```

Güncellenebilen alanlar: `durum`, `adet`, `fiyat`, `tarih`.

## HTTP Durum Kodları

| Kod | Anlamı |
|---|---|
| 200 | Başarılı |
| 201 | Kayıt oluşturuldu |
| 400 | Eksik veya hatalı veri |
| 404 | Sipariş bulunamadı |

## Middleware

Tüm istekler bir logger middleware'inden geçer. Her istek için zaman damgası,
yöntem ve adres konsola yazılır:

```
2026-11-16T17:05:12.345Z GET /siparisler
```

## Proje Yapısı

```
index.js            Sunucu, middleware ve tüm uçlar
siparisler.json     Kalıcı veri dosyası
docs/               Proje tanıtım dokümanı
screenshots/        Postman test ekran görüntüleri
```