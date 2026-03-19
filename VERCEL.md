# Vercel — Root Directory nerede?

**Root Directory**, Vercel’de **General** sekmesinde değil.

## Doğru yer

1. [Dashboard](https://vercel.com/dashboard) → projeni aç.
2. Üstte **Settings** (Ayarlar).
3. Solda veya üstte sekmelerden **Build and Deployment** seç  
   (Türkçe arayüzde: **Derleme ve dağıtım** / **Build & Deployment** gibi görünebilir).
4. Sayfayı **aşağı kaydır** — **Root Directory** genelde bu sayfanın alt kısımlarında.
5. **Edit** → **`web`** yaz → **Save**.

Sonra **Deployments** → **Redeploy**.

## Hâlâ yoksa

- Tarayıcı dilini İngilizce yapıp tekrar bak (menü isimleri farklı olabiliyor).
- Projeyi **silmeden** GitHub bağlantısını kontrol et: bazen ayar **Import** sırasında verilir; o zaman:
  - **Add New…** → **Project** → aynı repoyu tekrar import et,
  - **Configure Project** ekranında **Root Directory** alanına **`web`** yaz.

## Özet

| Aradığın        | Olduğu yer                    |
|-----------------|-------------------------------|
| Root Directory  | **Settings → Build and Deployment** (General değil) |
