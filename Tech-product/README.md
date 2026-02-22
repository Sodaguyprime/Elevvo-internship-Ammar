# Nova Phantom X – Landing Page

A premium dark-themed React + Tailwind product landing page for **Nova** selling the **Phantom X** phone.

## Setup

```bash
npm install
npm run dev
```

## ⚠️ Image Setup (Required)

Place your 4 images inside `public/phone-Images/` with these **exact filenames**:

```
public/
└── phone-Images/
    ├── fictional phone blue.jpg     ← used in Hero (right side) + Colors tab
    ├── fictional phone front.jpg    ← used in PhoneShowcase (left side, with specs)
    ├── fictional phone pink.jpg     ← used in Colors tab
    └── fictional phone green.jpg   ← used in Colors tab
```

## Page Sections

| Component | Section |
|---|---|
| `Navbar` | Fixed nav with Order Now button |
| `Hero` | Big headline left · Blue phone right |
| `PhoneShowcase` | Front phone left · Full specs right |
| `Colors` | Tab switcher: Blue / Pink / Green |
| `Pricing` | 3 cards: Phantom X / Pro / Ultra with different specs & prices |
| `OrderCTA` | Big "ORDER NOW" call to action |
| `Footer` | Links + copyright |

## File Structure

```
src/
├── App.jsx
├── index.css
├── main.jsx
└── components/
    ├── Navbar/    Navbar.jsx + Navbar.css
    ├── Hero/      Hero.jsx + Hero.css
    ├── PhoneShowcase/  PhoneShowcase.jsx + PhoneShowcase.css
    ├── Colors/    Colors.jsx + Colors.css
    ├── Pricing/   Pricing.jsx + Pricing.css
    ├── OrderCTA/  OrderCTA.jsx + OrderCTA.css
    └── Footer/    Footer.jsx + Footer.css
```
