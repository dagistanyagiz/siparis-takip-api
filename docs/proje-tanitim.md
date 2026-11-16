# Proje Tanıtım Dokümanı: Sipariş Takip API

## Projenin Amacı

Bu proje, Node.js ile Backend Programlama eğitimi kapsamında öğrenilen
bilgilerin uygulamalı olarak gösterilmesi için geliştirilmiştir. Amaç, gerçek
hayatta kullanılabilecek, REST mimarisinde çalışan bir sipariş yönetim
API'si tasarlamak ve geliştirmektir.

## Senaryo

Bir mağaza, müşterilerinden gelen siparişleri takip etmek istemektedir.
Sistem; siparişlerin oluşturulmasını, listelenmesini, tek tek görüntülenmesini,
durumlarının güncellenmesini ve silinmesini desteklemelidir. Sistem tamamen
REST API mantığıyla çalışır.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- JSON dosyası ile veri saklama (fs modülü)
- Postman (test)

## Veri Modeli

| Alan | Tür | Açıklama |
|---|---|---|
| id | sayı | Otomatik atanan benzersiz numara |
| musteri | metin | Müşteri adı (zorunlu) |
| urun | metin | Ürün adı (zorunlu) |
| marka | metin | Ürün markası |
| model | metin | Ürün modeli |
| adet | sayı | Sipariş adedi (zorunlu) |
| fiyat | sayı | Birim fiyat (zorunlu) |
| durum | metin | beklemede, hazirlaniyor veya teslim edildi |
| tarih | metin | Sipariş tarihi (YYYY-AA-GG) |

## Sistem Özellikleri

- Sipariş ekleme (POST): id ve tarih otomatik atanır.
- Sipariş listeleme (GET): duruma göre filtrelenebilir.
- Sipariş detayı (GET /:id): yoksa 404 döner.
- Sipariş güncelleme (PUT): durum, adet, fiyat ve tarih güncellenebilir.
- Sipariş silme (DELETE): sipariş sistemden kaldırılır.
- Logger middleware: her isteğin zamanı, yöntemi ve adresi konsola yazılır.
- Doğrulama: zorunlu alanlar eksikse 400 hatası döner.
- Kalıcı veri: veriler siparisler.json dosyasında saklanır.

## Mimari

İstekler önce logger middleware'inden geçer, ardından ilgili route'a
yönlendirilir. Route, veriyi oku() ile dosyadan alır, işlemi yapar,
değişiklik varsa yaz() ile dosyaya kaydeder ve JSON cevap döner.

## Test

Tüm uçlar Postman ile test edilmiştir. Ekran görüntüleri screenshots/
klasöründedir.

## Sonuç

Proje; CRUD operasyonlarını, routing yapısını, temel middleware kullanımını
ve JSON ile veri yönetimini kapsayan çalışan bir REST API sunmaktadır.