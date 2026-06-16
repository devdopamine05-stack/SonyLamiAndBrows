# 🌸 LamiBrows — Инструкция по запуску

---

## Файлы проекта

```
lamibrows/
├── index.html        — сайт
├── style.css         — стили
├── script.js         — логика сайта (запись → Telegram)
├── myphoto.PNG       — твоё фото (добавь сама!)
├── README.md         — эта инструкция
└── bot/
    ├── bot.py        — Telegram-бот для управления заявками
    └── requirements.txt
```

---

## ШАГ 1 — Создать Telegram-бота

1. Открой Telegram → найди **@BotFather** → напиши `/newbot`
2. Придумай имя: `LamiBrowsBot` и username: `sofia_lamibrows_bot`
3. **Скопируй токен** — он выглядит так: `7234567890:AAF...abc`

4. Узнай свой **chat_id** — напиши **@userinfobot** что угодно. Он ответит числом вида `987654321`

---

## ШАГ 2 — Настроить токены в файлах

### script.js (уведомления с сайта)
Открой `script.js` и замени в начале файла:
```js
const TG_BOT_TOKEN = '7234567890:AAF...abc';  // ← твой токен
const TG_RECIPIENTS = [
    '987654321',   // ← твой chat_id
    // '111222333', // ← второй получатель (раскомментируй если нужно)
];
```

### bot/bot.py (Telegram-бот)
Открой `bot/bot.py` и замени:
```python
BOT_TOKEN = "7234567890:AAF...abc"   # ← твой токен

ALLOWED_USERS = [
    987654321,   # ← твой chat_id (число без кавычек!)
]
```

---

## ШАГ 3 — Добавить своё фото

Положи файл `myphoto.PNG` в корень папки `lamibrows/`.
Это имя уже прописано в коде, ничего менять не нужно.

---

## ШАГ 4 — Загрузить на GitHub Pages

### 4.1 Создать репозиторий
1. Зайди на [github.com](https://github.com) → **New repository**
2. Назови ровно: `lamibrows` → Public → **Create repository**

### 4.2 Загрузить файлы
1. В репозитории → **Add file → Upload files**
2. Перетащи: `index.html`, `style.css`, `script.js`, `myphoto.PNG`
3. Папку `bot/` загружать НЕ нужно (она работает у тебя на компьютере/сервере)
4. Нажми **Commit changes**

### 4.3 Включить GitHub Pages
1. **Settings → Pages → Branch: main → / (root) → Save**
2. Подожди 1–3 минуты

**Сайт будет доступен по адресу:**
`https://yussofia.github.io/lamibrows/`

---

## ШАГ 5 — Добавить свои работы (портфолио)

Открой `index.html`, найди секцию `<!-- PORTFOLIO -->` и раскомментируй блоки:
```html
<div class="portfolio__item" data-reveal>
    <img src="work1.jpg" alt="Ламинирование ресниц">
    <div class="portfolio__overlay">
        <span>Ламинирование ресниц</span>
    </div>
</div>
```
Загрузи фото в репозиторий и укажи их имена вместо `work1.jpg`.
Как добавишь хотя бы одну работу — удали блок с заглушкой `portfolio__placeholder`.

---

## ШАГ 6 — Добавить отзывы

В `index.html` найди секцию `<!-- REVIEWS -->` и раскомментируй блоки:
```html
<div class="review-card" data-reveal>
    <div class="review-card__stars" data-rating="5"></div>
    <p class="review-card__text">«Текст отзыва...»</p>
    <div class="review-card__author">
        <div class="review-card__avatar">А</div>
        <div>
            <div class="review-card__name">Имя</div>
            <div class="review-card__course">Курс</div>
        </div>
    </div>
</div>
```
- `data-rating="5"` — количество звёзд от 1 до 5
- В `review-card__avatar` — первая буква имени
- Как добавишь отзывы — удали блок `reviews__placeholder`

---

## ШАГ 7 — Запустить Telegram-бота

Бот нужен для **управления заявками** (просмотр, статусы, удаление).
Уведомления о новых заявках также дублируются ботом.

### Установка (нужен Python 3.10+)
```bash
cd lamibrows/bot
pip install -r requirements.txt
python bot.py
```

### Что умеет бот
- `/list` — список всех заявок с инлайн-кнопками
- `/stats` — статистика по статусам
- Нажать на заявку → открыть карточку
- Сменить статус: 🆕 Новая → 🔄 В работе → ✅ Завершена
- 🗑 Удалить с подтверждением
- Фильтры: все / новые / в работе / завершены

### Где запускать бота?
Варианты от простого к сложному:
1. **На своём компьютере** — просто запусти `python bot.py` когда нужно
2. **Бесплатно на Railway.app** — загрузи папку `bot/`, он сам установит зависимости
3. **На VPS сервере** — любой хостинг с Python

> **Важно:** Сайт (`index.html`) и бот работают **независимо**.
> Сайт сразу шлёт уведомление в Telegram через API.
> Бот нужен только для удобного управления заявками.

---

## Безопасность токена

Токен в `script.js` виден в коде браузера — это особенность статических сайтов.
Защита: бот принимает сообщения **только от chat_id из списка ALLOWED_USERS**.
Даже если кто-то найдёт токен — он не сможет управлять заявками.

---

## Ссылка в Instagram

Вставь в профиль:
```
https://yussofia.github.io/lamibrows/
```

---

## Вопросы?
Спрашивай у Claude 💛
