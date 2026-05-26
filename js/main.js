/* WOOD 상품권 — main.js v3 */
(function () {
  "use strict";

  /* Sticky header */
  var header = document.getElementById("header");
  function onScroll(){ if(window.scrollY>20) header.classList.add("scrolled"); else header.classList.remove("scrolled"); }
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();

  /* Mobile nav */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("headerMenu");
  function closeMenu(){ menu.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); toggle.setAttribute("aria-label","메뉴 열기"); }
  toggle.addEventListener("click", function(){
    var open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open?"true":"false");
    toggle.setAttribute("aria-label", open?"메뉴 닫기":"메뉴 열기");
  });
  menu.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", closeMenu); });

  /* Reveal on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var el=e.target, delay=0, parent=el.parentElement;
          if(parent){
            var sibs=Array.prototype.slice.call(parent.children).filter(function(c){return c.classList.contains("reveal");});
            delay=Math.min(sibs.indexOf(el),6)*80;
          }
          setTimeout(function(){ el.classList.add("is-in"); }, delay);
          io.unobserve(el);
        }
      });
    }, {threshold:0.12, rootMargin:"0px 0px -8% 0px"});
    reveals.forEach(function(el){ io.observe(el); });
  } else { reveals.forEach(function(el){ el.classList.add("is-in"); }); }

  /* Count-up (hero stats + live stats) */
  function animateCount(el){
    var target=parseFloat(el.getAttribute("data-count"))||0;
    var suffix=el.getAttribute("data-suffix")||"";
    var dur=1500, start=null;
    function tick(t){
      if(!start)start=t;
      var p=Math.min((t-start)/dur,1);
      var e=1-Math.pow(1-p,3);
      var v=Math.round(target*e);
      el.textContent=v.toLocaleString("ko-KR")+suffix;
      if(p<1) requestAnimationFrame(tick);
      else el.textContent=target.toLocaleString("ko-KR")+suffix;
    }
    requestAnimationFrame(tick);
  }
  var counters=document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window){
    var cio=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ animateCount(e.target); cio.unobserve(e.target); } });
    }, {threshold:0.5});
    counters.forEach(function(el){ cio.observe(el); });
  } else { counters.forEach(animateCount); }

  /* ====== 카카오톡 상담 링크 (★여기 한 줄만 바꾸면 모든 카카오 버튼이 연결됩니다) ====== */
  /* 예: var KAKAO_URL = "https://open.kakao.com/o/내오픈톡주소"; */
  var KAKAO_URL = "https://open.kakao.com/o/sImx4dwi";

  /* ====== CS 상담 전화번호 (★여기 한 줄만 바꾸면 메인의 모든 전화상담 버튼이 연결됩니다) ====== */
  /* 예: var PHONE = "1600-1234";  ← 하이픈 포함해서 입력 (비우면 기존 placeholder 유지) */
  /* ※ 개인정보 처리방침의 '개인정보 보호책임자' 번호는 이 설정과 무관하며 privacy.html에서 따로 관리합니다. */
  var PHONE = "01029692842";
  if(PHONE){
    var telHref = "tel:" + PHONE.replace(/[^0-9+]/g, "");
    document.querySelectorAll("[data-phone]").forEach(function(btn){
      btn.setAttribute("href", telHref);
    });
  }

  var kakaoBtns = document.querySelectorAll("[data-kakao]");
  kakaoBtns.forEach(function(btn){
    if(KAKAO_URL){
      btn.setAttribute("href", KAKAO_URL);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener noreferrer");
    } else {
      /* 주소 미설정 시: 페이지 내 문의 영역(#contact)으로 부드럽게 이동 */
      btn.setAttribute("href", "#contact");
    }
  });
})();
