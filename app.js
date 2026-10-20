// =========================================================================
// SERVICE PROVIDER MASTER TEMPLATE: CONFIG
// Edit everything in the CONFIG block below. You do not need to touch
// index.html or style.css.
//
// Your SERVICES and REVIEWS live in Airtable and sync here automatically.
// You never paste a secret token into this file. Never.
// =========================================================================

const CONFIG = {
    // ---------- Brand ----------
    businessName: "Sample Nail Studio",
    metaDescription: "A demo of The Stress-Free Setup: Nail Tech Edition. Sample content only.",

    // Brand colors. Use any hex color. The rest of the design adjusts to match.
    brandColor: "#B84B6E",      // buttons and highlights
    brandColorDark: "#933857",  // button hover
    softColor: "#FCEEF3",       // soft background sections
    pageColor: "#FFFFFF",       // main background

    // Photos. Put image files in the /images folder and type the file name.
    // Leave blank to show a soft placeholder box.
    heroImage: "",              // example: "images/hero.jpg"
    aboutImage: "",             // example: "images/about.jpg"

    // ---------- Hero ----------
    heroEyebrow: "DEMO SITE: Nail Tech Edition",
    heroHeadlineLine1: "Fresh sets.",
    heroHeadlineLine2: "Booked in minutes.",
    heroSubtext: "Custom nails by appointment. Pick your set, send a request, and I will confirm your time.",
    trustBullets: ["By appointment only", "Custom nail art", "Easy online requests"],

    // ---------- Sections ----------
    servicesLabel: "Services",          // small label above the headline and in the menu bar
    servicesHeadline: "The menu",

    // Gallery (optional). Add photos in your Airtable Gallery table.
    // It hides itself when you have no published photos. Set to false to hide it always.
    showGallery: true,
    galleryLabel: "Gallery",
    galleryHeadline: "Recent sets",

    bookButtonLabel: "Book a set",        // the main button text, like Book now or Request a quote

    aboutHeadline: "Meet your nail tech",
    aboutLead: "Tell your story in two or three short sentences. Why you started doing nails, and what clients can expect when they sit in your chair.",
    aboutBullets: ["Clear pricing before we start", "Designs made just for you", "Easy rescheduling when life happens"],

    serviceAreaHeadline: "Serving Your City and nearby",
    serviceAreaList: ["Your City", "Nearby Town", "Another Town"],

    bookHeadline: "Ready for a fresh set?",
    bookSubtext: "Try it! This form is live. Send a sample request and watch it land in the back office.",

    // ---------- Booking and contact ----------
    // BOOKING FORM: In Airtable, open your Inquiries table, create a Form view,
    // click Share form, and copy the link that looks like
    //    https://airtable.com/shrXXXXXXXXXXXXXX
    // Paste it here. It is safe to show publicly and needs no secret key.
    // Leave blank to show a "call or email" message instead.
    bookingFormUrl: "https://airtable.com/appe85f6F6FjqHoXB/shryFLcHEc0f9N9rR",

    // Optional: already use another booking site? Paste its link for a button.
    existingBookingLink: "",
    existingBookingLabel: "Book on my calendar",

    // Optional ADD-ON: online payment. Paste a Payhip, PayPal or Stripe link.
    checkoutLink: "",
    checkoutLabel: "Pay a deposit",

    phoneNumber: "(555) 123-4567",
    phoneNumberLink: "+15551234567",   // digits only with country code
    email: "hello@example.com",
    hours: "Tue to Sat, 10am to 6pm",
    address: "",                       // optional. Leave blank to hide.

    footerYear: "2026"
};

// =========================================================================
// Rendering. You should not need to edit anything below this line.
// =========================================================================

function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Only allow normal web links in buttons and the form frame.
function safeUrl(url, mustStartWith) {
    if (!url) return '';
    try {
        const u = new URL(url, window.location.href);
        if (u.protocol !== 'https:' && u.protocol !== 'http:') return '';
        if (mustStartWith && !u.href.startsWith(mustStartWith)) return '';
        return u.href;
    } catch (e) {
        return '';
    }
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function applyBrand() {
    const root = document.documentElement.style;
    if (CONFIG.brandColor) root.setProperty('--brand', CONFIG.brandColor);
    if (CONFIG.brandColorDark) root.setProperty('--brand-dark', CONFIG.brandColorDark);
    if (CONFIG.softColor) root.setProperty('--soft', CONFIG.softColor);
    if (CONFIG.pageColor) root.setProperty('--page', CONFIG.pageColor);
    document.title = CONFIG.businessName;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', CONFIG.metaDescription || '');
}

function placeImage(id, src) {
    const box = document.getElementById(id);
    const url = safeUrl(src);
    if (!box || !url) return;
    box.innerHTML = '';
    box.classList.add('has-image');
    const img = document.createElement('img');
    img.src = url;
    img.alt = '';
    img.loading = 'lazy';
    box.appendChild(img);
}

function renderBusinessInfo() {
    document.querySelectorAll('.js-business-name').forEach(el => { el.textContent = CONFIG.businessName; });

    document.querySelectorAll('.js-phone-link').forEach(el => {
        if (!CONFIG.phoneNumber) { el.style.display = 'none'; return; }
        el.href = `tel:+${String(CONFIG.phoneNumberLink).replace(/[^0-9]/g, '')}`;
        el.textContent = el.dataset.labelPrefix
            ? `${el.dataset.labelPrefix} ${CONFIG.phoneNumber}`
            : CONFIG.phoneNumber;
    });
    document.querySelectorAll('.js-email-link').forEach(el => {
        if (!CONFIG.email) { el.style.display = 'none'; return; }
        el.href = `mailto:${CONFIG.email}`;
        el.textContent = CONFIG.email;
    });

    setText('hero-eyebrow', CONFIG.heroEyebrow);
    setText('hero-headline-1', CONFIG.heroHeadlineLine1);
    setText('hero-headline-2', CONFIG.heroHeadlineLine2);
    setText('hero-subtext', CONFIG.heroSubtext);
    placeImage('hero-photo', CONFIG.heroImage);
    placeImage('about-photo', CONFIG.aboutImage);

    const trustRow = document.getElementById('trust-row');
    if (trustRow) {
        trustRow.innerHTML = CONFIG.trustBullets
            .map(t => `<span><span class="dot"></span>${escapeHTML(t)}</span>`).join('');
    }

    setText('services-headline', CONFIG.servicesHeadline);
    setText('services-label', CONFIG.servicesLabel);
    setText('nav-services', CONFIG.servicesLabel);
    setText('gallery-label', CONFIG.galleryLabel);
    setText('gallery-headline', CONFIG.galleryHeadline);
    setText('nav-gallery', CONFIG.galleryLabel);
    document.querySelectorAll('.js-book-btn').forEach(el => { el.textContent = CONFIG.bookButtonLabel; });
    setText('about-headline', CONFIG.aboutHeadline);
    setText('about-lead', CONFIG.aboutLead);
    const aboutBullets = document.getElementById('about-bullets');
    if (aboutBullets) {
        aboutBullets.innerHTML = CONFIG.aboutBullets
            .map(b => `<li><span class="check">✓</span>${escapeHTML(b)}</li>`).join('');
    }

    setText('area-headline', CONFIG.serviceAreaHeadline);
    const areaList = document.getElementById('area-list');
    if (areaList) {
        areaList.innerHTML = CONFIG.serviceAreaList.map(a => `<span>${escapeHTML(a)}</span>`).join('');
    }
    const areaSection = document.getElementById('area');
    if (areaSection && (!CONFIG.serviceAreaList || CONFIG.serviceAreaList.length === 0)) {
        areaSection.style.display = 'none';
    }

    setText('book-headline', CONFIG.bookHeadline);
    setText('book-subtext', CONFIG.bookSubtext);
    setText('contact-hours', CONFIG.hours ? `Hours: ${CONFIG.hours}` : '');
    setText('contact-address', CONFIG.address || '');

    const footerDetails = document.getElementById('footer-details');
    if (footerDetails) footerDetails.innerHTML = `<strong>${escapeHTML(CONFIG.businessName)}</strong>`;
    setText('footer-hours', CONFIG.hours || '');
    setText('footer-year', `© ${CONFIG.footerYear} ${CONFIG.businessName}`);
}

function renderBooking() {
    // Buttons
    const actions = document.getElementById('book-actions');
    if (actions) {
        const parts = [];
        const existing = safeUrl(CONFIG.existingBookingLink);
        const checkout = safeUrl(CONFIG.checkoutLink);
        if (existing) {
            parts.push(`<a class="btn btn-primary" href="${escapeHTML(existing)}" target="_blank" rel="noopener noreferrer">${escapeHTML(CONFIG.existingBookingLabel)}</a>`);
        }
        if (checkout) {
            parts.push(`<a class="btn btn-ghost" href="${escapeHTML(checkout)}" target="_blank" rel="noopener noreferrer">${escapeHTML(CONFIG.checkoutLabel)}</a>`);
        }
        actions.innerHTML = parts.join('');
    }

    // Form (Airtable shared form, no secret key needed)
    const wrap = document.getElementById('form-wrap');
    if (!wrap) return;
    const formUrl = safeUrl(CONFIG.bookingFormUrl, 'https://airtable.com/');
    if (formUrl) {
        // Works with both link styles:
        //   https://airtable.com/shrXXXX  and  https://airtable.com/appXXXX/shrXXXX
        const parsed = new URL(formUrl);
        const embed = parsed.pathname.startsWith('/embed/')
            ? formUrl
            : `https://airtable.com/embed${parsed.pathname}`;
        wrap.innerHTML =
            `<p class="muted small form-loading">Loading your booking form. This takes a few seconds.</p>` +
            `<iframe class="airtable-embed" title="Booking request form" src="${escapeHTML(embed)}" loading="eager"></iframe>` +
            `<p class="muted small">Form slow or not loading? <a href="${escapeHTML(formUrl)}" target="_blank" rel="noopener noreferrer">Open it in a new tab</a>.</p>`;
        const frame = wrap.querySelector('iframe');
        const note = wrap.querySelector('.form-loading');
        if (frame && note) frame.addEventListener('load', () => note.remove());
    } else {
        setText('book-subtext', 'Call, text or email and I will get you on the calendar.');
        wrap.innerHTML =
            `<div class="form-fallback"><h3>Request an appointment</h3>` +
            `<p>Call, text or email and I will get you on the calendar.</p></div>`;
    }
}

async function loadData(file) {
    const response = await fetch(file, { cache: 'no-store' });
    if (!response.ok) return null;
    return response.json();
}

async function fetchServices() {
    const container = document.getElementById('service-grid');
    if (!container) return;
    try {
        const data = await loadData('data/services.json');
        if (!data) {
            container.innerHTML = `<p class="loading">Your services will appear here after the first sync runs.</p>`;
            return;
        }
        if (!data.records || data.records.length === 0) {
            container.innerHTML = `<p class="loading">No published services yet. Set a row's Status to "Published" in your Services table.</p>`;
            return;
        }
        container.innerHTML = data.records.map(record => {
            const f = record.fields || {};
            const name = escapeHTML(f['Service Name'] || 'Service');
            const desc = escapeHTML(f['Description'] || '');
            const price = escapeHTML(f['Price'] || '');
            const duration = escapeHTML(f['Duration'] || '');
            const meta = [price, duration].filter(Boolean).join(' · ');
            return `
                <div class="service-card">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    ${meta ? `<p class="service-meta">${meta}</p>` : ''}
                </div>`;
        }).join('');
    } catch (error) {
        console.error('Services load error:', error);
        container.innerHTML = `<p class="loading">Could not load services right now.</p>`;
    }
}

async function fetchTestimonials() {
    const container = document.getElementById('t-grid');
    if (!container) return;
    try {
        const data = await loadData('data/testimonials.json');
        if (!data) {
            container.innerHTML = `<p class="loading">Your reviews will appear here after the first sync runs.</p>`;
            return;
        }
        if (!data.records || data.records.length === 0) {
            const section = document.getElementById('reviews');
            if (section) section.style.display = 'none';
            return;
        }
        container.innerHTML = data.records.map(record => {
            const f = record.fields || {};
            const quote = escapeHTML(f['Quote'] || '');
            const name = escapeHTML(f['Customer Name'] || 'A happy client');
            const place = escapeHTML(f['Neighborhood'] || '');
            return `
                <div class="t-card">
                    <p class="quote">${quote}</p>
                    <p class="attr">${place ? `${name}, ${place}` : name}</p>
                </div>`;
        }).join('');
    } catch (error) {
        console.error('Testimonials load error:', error);
        container.innerHTML = `<p class="loading">Could not load reviews right now.</p>`;
    }
}

// Gallery photos: type the file name from your images folder (like nails-1.jpg)
// or a full https:// link to a photo you host somewhere else.
function gallerySrc(value) {
    const v = String(value || '').trim();
    if (/^https:\/\//i.test(v)) return safeUrl(v);
    if (/^[A-Za-z0-9][A-Za-z0-9._-]*\.(jpe?g|png|webp|gif)$/i.test(v)) return 'images/' + v;
    return '';
}

function hideGallery() {
    const section = document.getElementById('gallery');
    if (section) section.style.display = 'none';
    const nav = document.getElementById('nav-gallery');
    if (nav) nav.style.display = 'none';
}

async function fetchGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    if (CONFIG.showGallery === false) { hideGallery(); return; }
    try {
        const data = await loadData('data/gallery.json');
        const items = ((data && data.records) || [])
            .map(r => ({ src: gallerySrc((r.fields || {})['Image File']), caption: (r.fields || {})['Caption'] || '' }))
            .filter(i => i.src);
        if (items.length === 0) { hideGallery(); return; }
        grid.innerHTML = items.map(i => `
            <figure class="gallery-item">
                <img src="${escapeHTML(i.src)}" alt="${escapeHTML(i.caption)}" loading="lazy">
                ${i.caption ? `<figcaption>${escapeHTML(i.caption)}</figcaption>` : ''}
            </figure>`).join('');
    } catch (error) {
        console.error('Gallery load error:', error);
        hideGallery();
    }
}

function init() {
    applyBrand();
    renderBusinessInfo();
    renderBooking();
    fetchServices();
    fetchGallery();
    fetchTestimonials();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
