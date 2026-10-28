# Kalkulator Finansial — Gemah Ripah Indonesia Syariah

9 kalkulator (Check-Up, KPR, Pendidikan, Pensiun, Warisan, Haji, Zakat & Wakaf, Investasi, Asuransi).
Formula dipindahkan persis dari `src/pages/FinancialCalculator.tsx` project personal-wealthplanner (tidak diubah).

## Jalankan
    npm install
    npm run dev        # lokal
    npm run build      # hasil di dist/ (siap deploy ke Vercel/Netlify)

## Yang perlu diganti (opsional)
`src/config.ts` → link CTA (`CTA_LINK`), label tombol, teks "Tahukah kamu?" per kalkulator, disclaimer.

## Cetak PDF
Tombol "Cetak PDF" memakai dialog cetak browser → pilih "Save as PDF".
