/* ===================================
   SOFIA YUSSUPOVA — LAMIBROWS v2
   script.js
=================================== */

// ╔══════════════════════════════════════════╗
// ║        КОНФИГ — ЗАПОЛНИ СВОИ ДАННЫЕ      ║
// ╠══════════════════════════════════════════╣
// ║ Токен: получить у @BotFather в Telegram   ║
// ║ Chat IDs: получить у @userinfobot         ║
// ║ Можно добавить несколько получателей!     ║
// ╚══════════════════════════════════════════╝
const TG_BOT_TOKEN = '8932431035:AAEgwfU4CLaDR4lrNRXR_GeuW863v73ZWK8';

// === WHATSAPP CONFIG ===
const WA_PHONE = '77075227137';  // Номер без + и пробелов

// Заготовленные тексты для каждого тарифа.
// Ключ совпадает со значением value в <select> и data-course на кнопках.
const WA_MESSAGES = {
    // Ресницы
    'Ламинирование ресниц (офлайн, 80 000 ₸)':
        'Здравствуйте, Софья! Я на вашем сайте, всё изучила, выбрала курс: Ламинирование ресниц (офлайн, 80 000 ₸). Хочу учиться. Напишите, пожалуйста, какие даты свободны и как внести предоплату. С нетерпением жду старта 🌸',

    'Ламинирование ресниц (офлайн) — 80 000 ₸':
        'Здравствуйте, Софья! Я на вашем сайте, всё изучила, выбрала курс: Ламинирование ресниц (офлайн, 80 000 ₸). Хочу учиться. Напишите, пожалуйста, какие даты свободны и как внести предоплату. С нетерпением жду старта 🌸',

    'Ламинирование ресниц (онлайн) — 60 000 ₸':
        'Здравствуйте, Софья! Я на вашем сайте, всё изучила, выбрала курс: Ламинирование ресниц (онлайн, 60 000 ₸). Хочу учиться в онлайн-формате. Напишите, пожалуйста, как получить доступ к материалам и как внести оплату. С нетерпением жду старта 🌸',

    // Брови
    'Ламинирование бровей (офлайн, 120 000 ₸)':
        'Здравствуйте, Софья! Я на вашем сайте, всё изучила, выбрала курс: Ламинирование бровей (офлайн, 120 000 ₸). Хочу учиться. Напишите, пожалуйста, какие даты свободны и как внести предоплату. С нетерпением жду старта 🌸',

    'Ламинирование бровей (офлайн) — 120 000 ₸':
        'Здравствуйте, Софья! Я на вашем сайте, всё изучила, выбрала курс: Ламинирование бровей (офлайн, 120 000 ₸). Хочу учиться. Напишите, пожалуйста, какие даты свободны и как внести предоплату. С нетерпением жду старта 🌸',

    'Ламинирование бровей (онлайн) — 90 000 ₸':
        'Здравствуйте, Софья! Я на вашем сайте, всё изучила, выбрала курс: Ламинирование бровей (онлайн, 90 000 ₸). Хочу учиться в онлайн-формате. Напишите, пожалуйста, как получить доступ к материалам и как внести оплату. С нетерпением жду старта 🌸',

    // Комбо
    'Комбо-курс: Брови + Ресницы (офлайн, 180 000 ₸)':
        'Здравствуйте, Софья! Я на вашем сайте, всё изучила, выбрала курс: Комбо-курс «Брови + Ресницы» (офлайн, 180 000 ₸). Хочу учиться и получить сразу два навыка! Напишите, пожалуйста, какие даты свободны и как внести предоплату. С нетерпением жду старта 🌸',

    'Комбо Брови+Ресницы (офлайн) — 180 000 ₸':
        'Здравствуйте, Софья! Я на вашем сайте, всё изучила, выбрала курс: Комбо-курс «Брови + Ресницы» (офлайн, 180 000 ₸). Хочу учиться и получить сразу два навыка! Напишите, пожалуйста, какие даты свободны и как внести предоплату. С нетерпением жду старта 🌸',

    'Комбо Брови+Ресницы (онлайн) — 150 000 ₸':
        'Здравствуйте, Софья! Я на вашем сайте, всё изучила, выбрала курс: Комбо-курс «Брови + Ресницы» (онлайн, 150 000 ₸). Хочу учиться в онлайн-формате и получить два навыка! Напишите, пожалуйста, как получить доступ к материалам и как внести оплату. С нетерпением жду старта 🌸',
};

// Дефолтный текст если курс не нашёлся
const WA_DEFAULT =
    'Здравствуйте, Софья! Я на вашем сайте, всё изучила и хочу записаться на обучение. Напишите, пожалуйста, какие даты свободны и как внести предоплату. С нетерпением жду старта 🌸';

function waUrl(course) {
    const msg = WA_MESSAGES[course] || WA_DEFAULT;
    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
}

function openWhatsApp(course) {
    window.open(waUrl(course), '_blank');
}

// Список получателей — добавь нужные chat_id
// Каждый из них получит уведомление о новой заявке
const TG_RECIPIENTS = [
    '978732421',
    '938919176',
];


// === COURSE CARD BUTTONS → WHATSAPP DIRECT ===
// Кнопки "Записаться" на карточках курсов сразу открывают WhatsApp
document.querySelectorAll('.wa-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const course = btn.dataset.course || '';
        openWhatsApp(course);
    });
});


// === CURSOR GLOW ===
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
});


// === NAV ===
const nav    = document.getElementById('nav');
const burger = document.getElementById('burger');
const links  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

burger.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
});

links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
    });
});


// === SCROLL REVEAL ===
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            // Stagger siblings
            const siblings = [...e.target.parentElement.querySelectorAll('[data-reveal]')];
            const idx = siblings.indexOf(e.target);
            setTimeout(() => {
                e.target.classList.add('visible');
            }, Math.min(idx * 80, 320));
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));


// === FAQ ACCORDION ===
document.querySelectorAll('.faq__q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item   = btn.closest('.faq__item');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.faq__item.open').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});


// === REVIEW STARS ===
document.querySelectorAll('.review-card__stars[data-rating]').forEach(el => {
    const rating = parseInt(el.dataset.rating, 10);
    el.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star' + (i > rating ? ' empty' : '');
        star.textContent = '★';
        el.appendChild(star);
    }
});


// === BOOKING FORM → TELEGRAM ===
const form      = document.getElementById('bookingForm');
const submitBtn = document.getElementById('submitBtn');
const btnText   = submitBtn.querySelector('.btn-text');
const btnLoad   = submitBtn.querySelector('.btn-loading');
const successEl = document.getElementById('successMsg');
const errorEl   = document.getElementById('errorMsg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    successEl.hidden = true;
    errorEl.hidden   = true;

    const name   = form.name.value.trim();
    const phone  = form.phone.value.trim();
    const course = form.course.value;

    if (!name || !phone) {
        showFieldError(name ? form.phone : form.name);
        return;
    }

    setLoading(true);

    const now = new Date().toLocaleString('ru-RU', {
        timeZone: 'Asia/Oral',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    const text =
        `🌸 <b>Новая заявка на обучение!</b>\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 <b>Имя:</b> ${esc(name)}\n` +
        `📱 <b>Телефон:</b> ${esc(phone)}\n` +
        `📚 <b>Курс:</b> ${esc(course)}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `⏰ <i>${now}</i>`;

    // Отправляем всем получателям параллельно
    const results = await Promise.allSettled(
        TG_RECIPIENTS.map(chatId => sendTelegram(chatId, text))
    );

    setLoading(false);

    const anyOk = results.some(r => r.status === 'fulfilled' && r.value === true);

    if (anyOk) {
        form.reset();
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        // Открываем WhatsApp с текстом выбранного курса
        setTimeout(() => openWhatsApp(course), 600);
    } else {
        errorEl.hidden = false;
    }
});

async function sendTelegram(chatId, text) {
    try {
        const res = await fetch(
            `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id:    chatId,
                    text:       text,
                    parse_mode: 'HTML'
                })
            }
        );
        const data = await res.json();
        return data.ok === true;
    } catch {
        return false;
    }
}

function setLoading(loading) {
    submitBtn.disabled = loading;
    btnText.hidden     = loading;
    btnLoad.hidden     = !loading;
}

function showFieldError(input) {
    input.style.borderColor = '#e53935';
    input.focus();
    input.addEventListener('input', () => {
        input.style.borderColor = '';
    }, { once: true });
}

function esc(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}


// ═══════════════════════════════════════════════════════
//  CAROUSEL ENGINE
//  — auto-scrolls slowly, pauses on hover/touch/drag,
//    resumes after 4.5s of inactivity
// ═══════════════════════════════════════════════════════

function makeCarousel(trackId, opts = {}) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const carousel   = track.closest('.carousel');
    const dotsWrap   = carousel.querySelector('.carousel__dots');
    const speed      = opts.speed  || 0.6;   // px per frame
    const pauseMs    = opts.pause  || 4500;   // ms before auto-resume
    const gapPx      = 24;

    let offset       = 0;
    let paused       = false;
    let pauseTimer   = null;
    let rafId        = null;
    let isGrabbing   = false;
    let grabStartX   = 0;
    let grabStartOff = 0;

    // ── Build infinite clone loop ──────────────────────
    // Clone all children and append so seamless loop works
    const items = [...track.children];
    if (items.length === 0) return;

    // Only loop if there are real items (not just placeholder)
    const hasRealItems = items.some(el => !el.classList.contains('sw-placeholder'));
    if (!hasRealItems && items.length === 1) {
        // Single placeholder — don't animate, just show
        return;
    }

    items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    // Total width of ONE set of items
    function setWidth() {
        let w = 0;
        items.forEach(item => { w += item.offsetWidth + gapPx; });
        return w;
    }

    // ── Dots (based on original items count, max 9) ───
    if (dotsWrap && items.length > 1) {
        const dotCount = Math.min(items.length, 9);
        dotsWrap.innerHTML = '';
        for (let i = 0; i < dotCount; i++) {
            const d = document.createElement('button');
            d.className = 'carousel__dot' + (i === 0 ? ' active' : '');
            d.setAttribute('aria-label', `Слайд ${i + 1}`);
            d.addEventListener('click', () => {
                const w  = setWidth();
                const iw = w / items.length;
                offset   = i * iw;
                applyTransform();
                updateDots();
                resumeAfterDelay();
            });
            dotsWrap.appendChild(d);
        }
    }

    function updateDots() {
        if (!dotsWrap) return;
        const dots = dotsWrap.querySelectorAll('.carousel__dot');
        if (!dots.length) return;
        const w      = setWidth();
        const iw     = w / items.length;
        const active = Math.floor((offset % w) / iw) % dots.length;
        dots.forEach((d, i) => d.classList.toggle('active', i === active));
    }

    function applyTransform() {
        track.style.transform = `translateX(${-offset}px)`;
    }

    function pause(restart = true) {
        paused = true;
        clearTimeout(pauseTimer);
        if (restart) resumeAfterDelay();
    }

    function resume() {
        paused = false;
    }

    function resumeAfterDelay() {
        clearTimeout(pauseTimer);
        pauseTimer = setTimeout(resume, pauseMs);
    }

    // ── RAF loop ───────────────────────────────────────
    function tick() {
        if (!paused) {
            const totalW = setWidth();
            offset += speed;
            if (offset >= totalW) offset -= totalW;
            applyTransform();
            updateDots();
        }
        rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    // ── Hover ──────────────────────────────────────────
    carousel.addEventListener('mouseenter', () => pause(false));
    carousel.addEventListener('mouseleave', () => { if (!isGrabbing) resumeAfterDelay(); });

    // ── Drag (mouse) ───────────────────────────────────
    carousel.addEventListener('mousedown', (e) => {
        isGrabbing   = true;
        grabStartX   = e.clientX;
        grabStartOff = offset;
        track.classList.add('is-grabbing');
        pause(false);
    });
    window.addEventListener('mousemove', (e) => {
        if (!isGrabbing) return;
        const dx = e.clientX - grabStartX;
        offset = grabStartOff - dx;
        // wrap
        const totalW = setWidth();
        if (offset < 0) offset += totalW;
        if (offset >= totalW) offset -= totalW;
        applyTransform();
        updateDots();
    });
    window.addEventListener('mouseup', () => {
        if (!isGrabbing) return;
        isGrabbing = false;
        track.classList.remove('is-grabbing');
        resumeAfterDelay();
    });

    // ── Touch ──────────────────────────────────────────
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX  = e.touches[0].clientX;
        grabStartOff = offset;
        pause(false);
    }, { passive: true });
    carousel.addEventListener('touchmove', (e) => {
        const dx = e.touches[0].clientX - touchStartX;
        const totalW = setWidth();
        offset = grabStartOff - dx;
        if (offset < 0) offset += totalW;
        if (offset >= totalW) offset -= totalW;
        applyTransform();
        updateDots();
    }, { passive: true });
    carousel.addEventListener('touchend', () => resumeAfterDelay(), { passive: true });
}

// ── LIGHTBOX (for students photos) ────────────────────
(function () {
    const lb = document.createElement('div');
    lb.className = 'sw-lightbox';
    lb.innerHTML = `
        <button class="sw-lightbox__close" aria-label="Закрыть">✕</button>
        <img src="" alt="">
        <span class="sw-lightbox__caption"></span>
    `;
    document.body.appendChild(lb);

    const lbImg     = lb.querySelector('img');
    const lbCaption = lb.querySelector('.sw-lightbox__caption');
    const lbClose   = lb.querySelector('.sw-lightbox__close');

    function open(src, caption) {
        lbImg.src = src;
        lbCaption.textContent = caption || '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { lbImg.src = ''; }, 300);
    }

    document.addEventListener('click', (e) => {
        // Don't open if dragging
        const item = e.target.closest('.sw-item');
        if (!item) return;
        const img     = item.querySelector('img');
        const caption = item.querySelector('.sw-item__caption');
        if (img && !item.closest('.carousel__track')?.classList.contains('is-grabbing')) {
            open(img.src, caption ? caption.textContent : '');
        }
    });

    lbClose.addEventListener('click', close);
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// ── Init carousels after DOM ready ────────────────────
makeCarousel('reviewsTrack',  { speed: 0.5, pause: 4500 });
makeCarousel('studentsTrack', { speed: 0.55, pause: 4500 });
