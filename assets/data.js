// ===== Сайтын бүх агуулга энд байна. Энэ файлыг засаад л сайт өөрчлөгдөнө. =====
window.SITE = {
  name: "Eco Square", tagline: "New Energy Options",
  email: "info@example.mn", phone: "976 00000000", address: "УБ, ... хороо, ... байр",
  orderEndpoint: "", // Formspree зэрэг URL тавивал захиалга шууд илгээгдэнэ. Хоосон бол имэйл нээгдэнэ.
  social: { facebook: "#", instagram: "#", youtube: "#" },
  categories: [
    { id: "solar", mn: "Нарны хавтан, хэрэгсэл", en: "Solar panels & accessories" },
    { id: "inverter", mn: "Инвертер", en: "Inverter" },
    { id: "battery", mn: "Баттерей", en: "Battery" },
    { id: "aio", mn: "Инвертер+Баттерей All in One", en: "All in One" },
    { id: "hvac", mn: "Халаалт-Хөргөлт-Агааржуулалт", en: "Heating-Cooling-Ventilation" },
    { id: "ev", mn: "EV charger", en: "EV charger" }
  ],
  brands: [{ id: "brand-a", name: "Brand A" }, { id: "brand-b", name: "Brand B" }],
  // price: үндсэн үнэ, sale: хямдралтай үнэ (заавал биш), flash/today: хямдралын хуудсанд гарна
  products: [
    { id: "p1", mn: "Нарны хавтан 550W", en: "Solar panel 550W", cat: "solar", brand: "brand-a", price: 420000, sale: 380000, flash: true, desc: "Өндөр үр ашигтай монокристал хавтан." },
    { id: "p2", mn: "Hybrid инвертер 5kW", en: "Hybrid inverter 5kW", cat: "inverter", brand: "brand-b", price: 2900000, today: true, desc: "Сүлжээнд холбогдох болон автономд ажиллана." },
    { id: "p3", mn: "Lithium баттерей 5kWh", en: "Lithium battery 5kWh", cat: "battery", brand: "brand-b", price: 4500000, sale: 4200000, flash: true, desc: "LiFePO4, 6000+ цикл." },
    { id: "p4", mn: "All in One 5kW/10kWh", en: "All in One 5kW/10kWh", cat: "aio", brand: "brand-a", price: 12500000, desc: "Инвертер ба баттерей нэг иж бүрдэлд." },
    { id: "p5", mn: "Агаар-усны дулааны насос", en: "Air-to-water heat pump", cat: "hvac", brand: "brand-a", price: 8900000, today: true, desc: "Хүйтэн жавартай хаврын нөхцөлд тохирсон." },
    { id: "p6", mn: "EV цэнэглэгч 7kW", en: "EV charger 7kW", cat: "ev", brand: "brand-b", price: 1800000, desc: "Гэрийн хананд суурилуулна." }
  ],
  posts: [
    { id: "n1", date: "2026-11-01", mn: "Нарны систем сонгох заавар", en: "How to choose a solar system", body: "Нийтлэлийн бүтэн агуулга энд орно." },
    { id: "n2", date: "2026-10-15", mn: "Дулааны насосны давуу тал", en: "Benefits of heat pumps", body: "Нийтлэлийн бүтэн агуулга энд орно." }
  ],
  policies: {
    terms: { mn: "Үйлчилгээний нөхцөл", en: "Terms of service", body: "Үйлчилгээний нөхцлөө энд бичнэ." },
    ret: { mn: "Буцаалт", en: "Return policy", body: "Буцаалтын журмаа энд бичнэ." },
    help: { mn: "Хэрхэн тусламж авах вэ?", en: "How to get help", body: "Тусламжийн мэдээллээ энд бичнэ." },
    priv: { mn: "Нууцлалын тухай", en: "Privacy policy", body: "Нууцлалын бодлогоо энд бичнэ." }
  }
};
