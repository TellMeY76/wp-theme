"use strict";const gspbaosObserves=document.querySelectorAll("[data-aos]");let gspbaosobserve=new IntersectionObserver(s=>{s.forEach(s=>{let e=s.target,a=e.getAttribute("data-aos-once");s.isIntersecting?(e.classList.add("aos-animate"),a&&gspbaosobserve.unobserve(e)):!a&&e.classList.contains("aos-animate")&&!e.classList.contains("aos-init")&&e.classList.remove("aos-animate")})},{threshold:.3});gspbaosObserves.forEach(s=>{gspbaosobserve.observe(s)});