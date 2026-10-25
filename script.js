"use strict";

// Kişiselleştirme: gerçek e-posta adresinizi buraya ekleyin.
// Boşken form yalnızca kopyalanabilir bir taslak oluşturur; mesaj göndermez.
const CONTACT_EMAIL = "";

document.documentElement.classList.add("js-ready");
document.querySelector("#year").textContent = new Date().getFullYear();

// Mobil menü: bağlantı seçilince, Escape ile veya ekran büyüyünce kapanır.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#nav-links");
const mobileScreen = window.matchMedia("(max-width: 760px)");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
  navigation.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});
mobileScreen.addEventListener("change", (event) => {
  if (!event.matches) setMenu(false);
});

// Görünen bölüme göre menüdeki ilgili bağlantıyı vurgula.
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigation.querySelectorAll("a").forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
  document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
}

// Proje filtreleri: gizlenen kartlar klavye sırasından da çıkarılır.
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    let visibleCount = 0;
    projectCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    document.querySelector("#filter-status").textContent = `${visibleCount} örnek proje gösteriliyor.`;
  });
});

// Gerçek projeler eklendiğinde bu örnek başlık ve açıklamaları değiştirin.
const projects = {
  rota: {
    title: "Rota — Doğayı keşfet",
    description: "Kamp ve doğa yürüyüşü ilgisinden ilham alan bir web arayüzü konsepti. Amaç, farklı rotaları anlaşılır kartlarla sunmak ve yeni keşiflere alan açmak.",
    features: ["Zorluk seviyesine göre rota filtreleme", "Rota süresi ve mesafe bilgileri", "Telefon ve masaüstüne uyumlu tasarım"]
  },
  odak: {
    title: "Odak — Zamanın sana ait",
    description: "Odaklanma ve dinlenme aralıklarını dengeleyen bir zamanlayıcı konsepti. Sade bir ekranla dikkat dağıtan öğeleri azaltmayı hedefler.",
    features: ["Ayarlanabilir çalışma ve mola süreleri", "Başlatma, duraklatma ve sıfırlama", "Tercihleri tarayıcıda saklama"]
  },
  notlar: {
    title: "Küçük Notlar — Fikri yakala",
    description: "Gün içinde akla gelen fikirleri renkli kartlarda bir araya getiren bir not panosu konsepti. Hızlı ve anlaşılır bir kişisel çalışma alanı sunmayı hedefler.",
    features: ["Not ekleme, düzenleme ve silme", "Renklerle notları gruplama", "Notları tarayıcıda saklama"]
  }
};

const projectDialog = document.querySelector("#project-dialog");
let lastProjectButton = null;

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    lastProjectButton = button;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-description").textContent = project.description;
    const featureList = document.querySelector("#dialog-features");
    featureList.replaceChildren();
    project.features.forEach((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      featureList.append(item);
    });
    projectDialog.showModal();
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => {
  const bounds = projectDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (event.target === projectDialog && outside) projectDialog.close();
});
projectDialog.addEventListener("close", () => lastProjectButton?.focus());

// Backend yoktur. Yapılandırılmış adres varsa kullanıcının e-posta uygulaması açılır.
// Taslak her durumda ekranda kalır; gönderimin gerçekleştiği iddia edilmez.
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const draftField = document.querySelector("#message-draft");
const configuredEmail = CONTACT_EMAIL.trim();

if (configuredEmail) {
  const emailLink = document.querySelector("#contact-email");
  emailLink.href = `mailto:${configuredEmail}`;
  emailLink.textContent = configuredEmail;
  emailLink.hidden = false;
  document.querySelector("#contact-note").textContent = "Mesajın, göndermen için e-posta uygulamanda açılır. Bu site mesajları saklamaz.";
  document.querySelector(".form-submit").firstChild.textContent = "E-posta taslağı hazırla ";
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameField = contactForm.elements.namedItem("name");
  const messageField = contactForm.elements.namedItem("message");
  // Yalnızca boşluk girilen zorunlu alanları da doğrula.
  [nameField, messageField].forEach((field) => {
    field.setCustomValidity(field.value.trim() ? "" : "Lütfen bu alanı doldurun.");
  });
  if (!contactForm.reportValidity()) return;
  const name = nameField.value.trim();
  const email = contactForm.elements.namedItem("email").value.trim();
  const message = messageField.value.trim();
  const draft = `Merhaba Beyza,\n\n${message}\n\n${name}\n${email}`;
  draftField.value = draft;
  document.querySelector("#draft-result").hidden = false;
  if (configuredEmail) {
    formStatus.textContent = "Taslağın hazır. E-posta uygulamandan gönderebilir veya aşağıdan kopyalayabilirsin.";
    window.location.href = `mailto:${configuredEmail}?subject=${encodeURIComponent(`Portfolyo üzerinden merhaba — ${name}`)}&body=${encodeURIComponent(draft)}`;
  } else {
    formStatus.textContent = "Taslağın hazır; henüz gönderilmedi. İletişim adresi eklendiğinde e-posta ile gönderebilirsin.";
  }
});

contactForm.querySelectorAll("input, textarea:not([readonly])").forEach((field) => {
  field.addEventListener("input", () => field.setCustomValidity(""));
});

// JavaScript kapalıysa formun tarayıcının varsayılan GET isteğini göndermesini önle.
document.querySelector(".form-submit").disabled = false;

document.querySelector("#copy-draft").addEventListener("click", async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(draftField.value);
    formStatus.textContent = "Mesaj taslağı panoya kopyalandı.";
  } catch {
    draftField.focus();
    draftField.select();
    formStatus.textContent = "Taslak seçildi. Ctrl+C veya cihazının kopyalama seçeneğiyle kopyalayabilirsin.";
  }
});
