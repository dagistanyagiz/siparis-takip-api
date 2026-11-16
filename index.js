const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});
const DOSYA = 'siparisler.json';

function oku() {
  return JSON.parse(fs.readFileSync(DOSYA, 'utf8'));
}

function yaz(veri) {
  fs.writeFileSync(DOSYA, JSON.stringify(veri, null, 2));
}

app.get('/siparisler', (req, res) => {
  res.json(oku());
});

app.get('/siparisler/:id', (req, res) => {
  const siparisler = oku();
  const siparis = siparisler.find(s => s.id === Number(req.params.id));
  if (!siparis) {
    return res.status(404).json({ hata: 'Sipariş Bulunamadı' });
  }
  res.json(siparis);
});

app.post('/siparisler', (req, res) => {
  const siparisler = oku();
    const { musteri, urun, adet, fiyat } = req.body;
  if (!musteri || !urun || !adet || !fiyat) {
    return res.status(400).json({ hata: 'musteri, urun, adet ve fiyat zorunlu' });
  }
  const yeniSiparis = {
    id: siparisler.length > 0 ? Math.max(...siparisler.map(s => s.id)) + 1 : 1,
    musteri: req.body.musteri,
    urun: req.body.urun,
    marka: req.body.marka,
    model: req.body.model,
    adet: req.body.adet,
    fiyat: req.body.fiyat,
    durum: 'beklemede',
    tarih: new Date().toISOString().slice(0, 10)
  };
  siparisler.push(yeniSiparis);
  yaz(siparisler);
  res.status(201).json(yeniSiparis);
});
app.put('/siparisler/:id', (req, res) => {
  const siparisler = oku();
  const siparis = siparisler.find(s => s.id === Number(req.params.id));
  if (!siparis) {
    return res.status(404).json({ hata: 'Sipariş Bulunamadı' });
  }
  if (req.body.durum !== undefined) siparis.durum = req.body.durum;
  if (req.body.adet !== undefined) siparis.adet = req.body.adet;
  if (req.body.fiyat !== undefined) siparis.fiyat = req.body.fiyat;
  if (req.body.tarih !== undefined) siparis.tarih = req.body.tarih;
  yaz(siparisler);
  res.json(siparis);
});

app.delete('/siparisler/:id', (req, res) => {
  const siparisler = oku();
  const index = siparisler.findIndex(s => s.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ hata: 'Sipariş Bulunamadı' });
  }
  const silinen = siparisler.splice(index, 1)[0];
  yaz(siparisler);
  res.json({ mesaj: 'Sipariş silindi', silinen: silinen });
});

app.listen(3000, () => {
  console.log('Sunucu çalışıyor: http://localhost:3000');
});