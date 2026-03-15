# 💬 Real-Time Chat Application

Moderní full-stack chatovací aplikace s podporou historie zpráv a indikátorem psaní v reálném čase. Projekt byl vytvořen s důrazem na čistou architekturu, škálovatelnost a uživatelskou zkušenost.

![Chat App Preview](https://via.placeholder.com/800x450?text=Chat+App+Preview+Coming+Soon)

## 🚀 Hlavní Funkce

- **Real-time komunikace:** Okamžité doručování zpráv pomocí WebSockets.
- **Indikátor psaní:** Vizuální zpětná vazba, když jiný uživatel píše zprávu.
- **Historie zpráv:** Trvalé ukládání zpráv v PostgreSQL databázi (načte se i po restartu).
- **Identifikace uživatelů:** Unikátní ID uživatele uložené v LocalStorage.
- **Moderní UI/UX:** Responzivní design postavený na Tailwind CSS s temným režimem.

## 🛠️ Technologický Stack

### Frontend
- **React (Vite):** UI knihovna a bleskově rychlý build nástroj.
- **Tailwind CSS:** Utility-first framework pro styling.
- **Socket.io-client:** Komunikace se serverem v reálném čase.
- **Lucide React:** Moderní set ikon.

### Backend
- **Node.js & Express:** Serverové prostředí a API framework.
- **Socket.io:** Serverová implementace WebSocketů.
- **Prisma ORM:** Moderní nástroj pro typově bezpečnou práci s databází.
- **PostgreSQL:** Relační databáze běžící v Dockeru.

### Infrastruktura
- **Docker:** Kontejnerizace databáze pro snadné nasazení a konzistentní vývojové prostředí.

## 📦 Instalace a spuštění

### Prerekvizity
- Node.js (v18+)
- Docker Desktop

### 1. Klonování repozitáře
git clone [https://github.com/IchHabeNicht05/Fullstack-chat-app.git](https://github.com/IchHabeNicht05/Fullstack-chat-app.git)
cd chat-app

### 2. Nastavení Backendu
cd server
npm install
# Vytvoř .env soubor a přidej DATABASE_URL
npx prisma db push
docker compose up -d
npm run dev

### 3. Nastavení Frontendu
cd ../client
npm install
npm run dev
