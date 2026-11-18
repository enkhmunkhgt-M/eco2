const C = window.SITE, $ = s => document.querySelector(s);
const LS = { get: (k, d) => { try { return JSON.parse(localStorage[k]) ?? d } catch { return d } }, set: (k, v) => localStorage[k] = JSON.stringify(v) };
let lang = LS.get("lang", "mn");
const T = {
  mn: { flash: "СУПЕР хямдрал", today: "Өнөөдрийн хямдрал", blog: "Нийтлэл", brands: "Брэнд", all: "Бүх ангилал", cats: "Ангилал", cart: "Сагс", empty: "Таны сагс хоосон байна", search: "Бүтээгдэхүүн хайх...", add: "Сагсанд нэмэх", total: "Нийт", order: "Захиалга илгээх", name: "Нэр", phone: "Утас", addr: "Хүргэлтийн хаяг", note: "Нэмэлт тайлбар", none: "Олдсонгүй", sort: "Эрэмбэлэх", nw: "Шинэ", lo: "Үнэ ↑", hi: "Үнэ ↓", sent: "Захиалга хүлээн авлаа. Бид тантай холбогдоно.", contact: "Холбоо барих", follow: "Манай сувгуудыг дагаарай", related: "Төстэй бүтээгдэхүүн", back: "← Буцах", seeall: "Бүгдийг харах", news: "Сүүлийн нийтлэл" },
  en: { flash: "SUPER deals", today: "Today's deal", blog: "Blog", brands: "Brands", all: "All categories", cats: "Categories", cart: "Cart", empty: "Your cart is empty", search: "Search products...", add: "Add to cart", total: "Total", order: "Place order", name: "Name", phone: "Phone", addr: "Delivery address", note: "Notes", none: "Nothing found", sort: "Sort", nw: "Newest", lo: "Price ↑", hi: "Price ↓", sent: "Order received. We will contact you.", contact: "Contact", follow: "Follow us", related: "Related products", back: "← Back", seeall: "See all", news: "Latest posts" }
};
const t = k => T[lang][k], nm = o => o[lang] || o.mn;
const fmt = n => Number(n).toLocaleString("en-US").replace(/,/g, " ") + " ₮";
const price = p => p.sale || p.price;
const byId = id => C.products.find(p => p.id === id);
const cart = () => LS.get("cart", {});
const total = () => Object.entries(cart()).reduce((s, [id, q]) => s + price(byId(id)) * q, 0);
const count = () => Object.values(cart()).reduce((s, q) => s + q, 0);
const params = new URLSearchParams(location.search);
const ph = txt => "data:image/svg+xml," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='#e8f3ec'/><text x='50%' y='50%' text-anchor='middle' fill='#2f7d4f' font-family='sans-serif' font-size='20'>${txt}</text></svg>`);
const img = p => p.img || ph(nm(p));

function addToCart(id, q = 1) { const c = cart(); c[id] = (c[id] || 0) + q; LS.set("cart", c); renderChrome(); const cl = document.querySelector(".cartlink"); if (cl) cl.classList.add("bump"); toast(lang === "mn" ? "Сагсанд нэмэгдлээ ✓" : "Added to cart ✓"); }
function setQty(id, q) { const c = cart(); q > 0 ? c[id] = q : delete c[id]; LS.set("cart", c); renderChrome(); render(); }
window.addToCart = addToCart; window.setQty = setQty;

function card(p) {
  return `<article class="card"><a href="product.html?id=${p.id}"><img src="${img(p)}" alt=""><h3>${nm(p)}</h3></a>
  <div class="price">${p.sale ? `<s>${fmt(p.price)}</s> ` : ""}<b>${fmt(price(p))}</b></div>
  <button class="btn" onclick="addToCart('${p.id}')">${t("add")}</button></article>`;
}
const grid = list => list.length ? `<div class="grid">${list.map(card).join("")}</div>` : `<p>${t("none")}</p>`;
const section = (title, body, link) => `<section><div class="sh"><h2>${title}</h2>${link ? `<a href="${link}">${t("seeall")}</a>` : ""}</div>${body}</section>`;
const catTile = c => `<a class="tile" href="shop.html?cat=${c.id}"><img src="${ph(nm(c))}" alt=""><span>${nm(c)}</span></a>`;

function renderChrome() {
  $("#hdr").innerHTML = `<div class="top wrap"><span></span><select id="lang"><option value="mn">Монгол</option><option value="en">English</option></select></div>
  <header class="wrap hd"><a class="logo" href="index.html">${C.name}<small>${C.tagline}</small></a>
  <form action="shop.html"><input name="q" placeholder="${t("search")}" value="${params.get("q") || ""}"><button>🔍</button></form>
  <a class="cartlink" href="cart.html">🛒 ${fmt(total())} (${count()})</a></header>
  <nav class="wrap nav"><a href="shop.html?deal=flash">${t("flash")}</a><a href="shop.html?deal=today">${t("today")}</a><a href="blog.html">${t("blog")}</a><a href="brands.html">${t("brands")}</a><a href="categories.html">${t("all")}</a></nav>
  <nav class="wrap cats">${C.categories.map(c => `<a href="shop.html?cat=${c.id}">${nm(c)}</a>`).join("")}</nav>`;
  $("#lang").value = lang; $("#lang").onchange = e => { LS.set("lang", e.target.value); location.reload(); };
  const pol = Object.entries(C.policies).map(([k, v]) => `<a href="policy.html?p=${k}">${nm(v)}</a>`).join("");
  const s = C.social;
  $("#ftr").innerHTML = `<footer><div class="wrap fgrid"><div><h3>${C.name}</h3><p>${C.tagline}</p>${pol}</div>
  <div><h3>${t("contact")}</h3><p>${C.address}</p><p>${C.phone}</p><p><a href="mailto:${C.email}">${C.email}</a></p></div>
  <div><h3>${t("follow")}</h3><a href="${s.facebook}">Facebook</a><a href="${s.instagram}">Instagram</a><a href="${s.youtube}">YouTube</a></div></div>
  <p class="copy">© ${new Date().getFullYear()} ${C.name}</p></footer>`;
}

const pages = {
  home() {
    const banners = [["shop.html?deal=flash", t("flash")], ["categories.html", t("cats")], ["shop.html?deal=today", t("today")]];
    return `<div class="hero">${banners.map(([h, x]) => `<a href="${h}"><img src="${ph(x)}" alt=""><span>${x}</span></a>`).join("")}</div>`
      + section(t("cats"), `<div class="tiles">${C.categories.map(catTile).join("")}</div>`, "categories.html")
      + section(t("flash"), grid(C.products.filter(p => p.flash)), "shop.html?deal=flash")
      + section(t("today"), grid(C.products.filter(p => p.today)), "shop.html?deal=today")
      + section(t("brands"), `<div class="tiles">${C.brands.map(b => `<a class="tile" href="shop.html?brand=${b.id}"><span>${b.name}</span></a>`).join("")}</div>`, "brands.html")
      + section(t("news"), pages.blogList(2), "blog.html");
  },
  shop() {
    let l = [...C.products], q = (params.get("q") || "").toLowerCase(), cat = params.get("cat"), br = params.get("brand"), d = params.get("deal"), sort = params.get("sort");
    if (q) l = l.filter(p => (p.mn + p.en).toLowerCase().includes(q));
    if (cat) l = l.filter(p => p.cat === cat);
    if (br) l = l.filter(p => p.brand === br);
    if (d) l = l.filter(p => p[d]);
    if (sort === "lo") l.sort((a, b) => price(a) - price(b)); if (sort === "hi") l.sort((a, b) => price(b) - price(a));
    const title = d ? t(d) : cat ? nm(C.categories.find(c => c.id === cat) || { mn: cat }) : br ? (C.brands.find(b => b.id === br) || {}).name : t("all");
    const keep = [...params].filter(([k]) => k !== "sort").map(([k, v]) => `<input type=hidden name="${k}" value="${v}">`).join("");
    return `<div class="sh"><h1>${title}</h1><form>${keep}<select name="sort" onchange="this.form.submit()"><option value="">${t("sort")}</option><option value="lo">${t("lo")}</option><option value="hi">${t("hi")}</option></select></form></div>` + grid(l);
  },
  cats() { return `<h1>${t("all")}</h1><div class="tiles">${C.categories.map(catTile).join("")}</div>`; },
  brands() { return `<h1>${t("brands")}</h1><div class="tiles">${C.brands.map(b => `<a class="tile" href="shop.html?brand=${b.id}"><span>${b.name}</span></a>`).join("")}</div>`; },
  blogList(n) { return `<div class="posts">${[...C.posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n || 99).map(p => `<a class="post" href="blog.html?id=${p.id}"><img src="${ph(nm(p))}" alt=""><div><small>${p.date}</small><h3>${nm(p)}</h3></div></a>`).join("")}</div>`; },
  blog() {
    const p = C.posts.find(x => x.id === params.get("id"));
    return p ? `<a href="blog.html">${t("back")}</a><article class="doc"><small>${p.date}</small><h1>${nm(p)}</h1><p>${p.body}</p></article>` : `<h1>${t("blog")}</h1>` + pages.blogList();
  },
  product() {
    const p = byId(params.get("id")); if (!p) return `<p>${t("none")}</p>`;
    const cat = C.categories.find(c => c.id === p.cat), br = C.brands.find(b => b.id === p.brand);
    return `<div class="pd"><img src="${img(p)}" alt=""><div><h1>${nm(p)}</h1>
    <p><a href="shop.html?cat=${p.cat}">${nm(cat)}</a> · <a href="shop.html?brand=${p.brand}">${br ? br.name : ""}</a></p>
    <div class="price big">${p.sale ? `<s>${fmt(p.price)}</s> ` : ""}<b>${fmt(price(p))}</b></div><p>${p.desc || ""}</p>
    <input id="qty" type="number" min="1" value="1"> <button class="btn" onclick="addToCart('${p.id}', Math.max(1, +qty.value||1))">${t("add")}</button></div></div>`
      + section(t("related"), grid(C.products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4)));
  },
  cart() {
    const rows = Object.entries(cart());
    if (!rows.length) return `<h1>${t("cart")}</h1><p>${t("empty")}</p>`;
    return `<h1>${t("cart")}</h1><table class="ct">${rows.map(([id, q]) => { const p = byId(id); return `<tr><td>${nm(p)}</td><td>${fmt(price(p))}</td>
      <td><button onclick="setQty('${id}',${q - 1})">−</button> ${q} <button onclick="setQty('${id}',${q + 1})">+</button></td><td>${fmt(price(p) * q)}</td><td><button onclick="setQty('${id}',0)">✕</button></td></tr>`; }).join("")}</table>
    <h2>${t("total")}: ${fmt(total())}</h2>
    <form id="order" class="form"><input name="name" placeholder="${t("name")}" required><input name="phone" placeholder="${t("phone")}" required><input name="addr" placeholder="${t("addr")}" required><textarea name="note" placeholder="${t("note")}"></textarea><button class="btn">${t("order")}</button></form>`;
  },
  policy() { const p = C.policies[params.get("p")]; return p ? `<article class="doc"><h1>${nm(p)}</h1><p>${p.body}</p></article>` : `<p>${t("none")}</p>`; }
};

async function submitOrder(e) {
  e.preventDefault(); const f = new FormData(e.target);
  const lines = Object.entries(cart()).map(([id, q]) => `${nm(byId(id))} x${q} = ${fmt(price(byId(id)) * q)}`);
  const body = `${lines.join("\n")}\n${t("total")}: ${fmt(total())}\n\n${f.get("name")} | ${f.get("phone")} | ${f.get("addr")}\n${f.get("note")}`;
  if (C.orderEndpoint) {
    const r = await fetch(C.orderEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name: f.get("name"), phone: f.get("phone"), message: body }) });
    if (r.ok) { LS.set("cart", {}); alert(t("sent")); location.href = "index.html"; } else alert("Error");
  } else location.href = `mailto:${C.email}?subject=${encodeURIComponent("Order")}&body=${encodeURIComponent(body)}`;
}

function render() { $("#app").innerHTML = pages[document.body.dataset.page](); const o = $("#order"); if (o) o.onsubmit = submitOrder; fx(); }

// ===== Animation =====
function toast(msg) {
  let el = $("#toast"); if (!el) { el = document.createElement("div"); el.id = "toast"; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add("show"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 1600);
}
function fx() {
  if (!window.__fx) {
    window.__fx = 1;
    const b = document.createElement("button"); b.id = "totop"; b.textContent = "↑"; b.onclick = () => scrollTo({ top: 0, behavior: "smooth" }); document.body.appendChild(b);
    addEventListener("scroll", () => { $("#hdr").classList.toggle("stuck", scrollY > 10); b.classList.toggle("show", scrollY > 500); }, { passive: true });
  }
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const el = e.target; el.classList.add("in"); io.unobserve(el); setTimeout(() => { el.classList.remove("rv", "in"); el.style.transitionDelay = ""; }, 900); } }), { threshold: 0.1 });
  document.querySelectorAll(".card,.tile,.post,.hero a,section>.sh,.pd>*,.doc").forEach((el, i) => { el.classList.add("rv"); el.style.transitionDelay = (i % 6) * 70 + "ms"; io.observe(el); });
}
renderChrome(); render();
