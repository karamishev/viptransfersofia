/* VIP Transfer Sofia - small vanilla JS: mobile menu, sticky header, slider, car gallery */
(function () {
  "use strict";

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });
  }
  // Submenu buttons (Transfers / Services): click to open on touch and mobile
  document.querySelectorAll(".main-menu button[aria-haspopup]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sub = btn.nextElementSibling;
      var open = sub.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".sub-menu.is-open").forEach(function (s) { s.classList.remove("is-open"); });
      if (nav) nav.classList.remove("is-open");
    }
  });

  /* ---- Sticky header: becomes fixed and compact after scrolling ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-fixed", window.scrollY > 120); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Home slider (arrows + bullets, no autoplay, like the original) ---- */
  var slider = document.querySelector(".slider");
  if (slider) {
    var slides = slider.querySelectorAll(".slide");
    var bulletBox = slider.querySelector(".slider-bullets");
    var current = 0;
    var bullets = [];
    slides.forEach(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Slide " + (i + 1));
      b.addEventListener("click", function () { show(i); });
      bulletBox.appendChild(b);
      bullets.push(b);
    });
    var show = function (n) {
      current = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("is-active", i === current); });
      bullets.forEach(function (b, i) { b.setAttribute("aria-current", i === current); });
    };
    slider.querySelector(".prev").addEventListener("click", function () { show(current - 1); });
    slider.querySelector(".next").addEventListener("click", function () { show(current + 1); });
    // Swipe on touch screens
    var startX = null;
    slider.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });
    show(0);
  }

  /* ---- Car gallery (thumbnails switch the large photo) ---- */
  var gallery = document.querySelector(".gallery");
  if (gallery) {
    var photos = gallery.querySelectorAll(".gallery-main img");
    var thumbs = gallery.querySelectorAll(".gallery-thumbs button");
    thumbs.forEach(function (t, i) {
      t.addEventListener("click", function () {
        photos.forEach(function (p, j) { p.classList.toggle("is-active", i === j); });
        thumbs.forEach(function (b, j) { b.setAttribute("aria-current", i === j); });
      });
    });
  }
})();
