"use strict";let gssharelist=document.getElementsByClassName("gs-share-link");for(let i=0;i<gssharelist.length;i++)gssharelist[i].addEventListener("click",t=>{t.preventDefault();let e=t.currentTarget.getAttribute("data-href"),r=t.currentTarget.getAttribute("data-service");if("copy"==r){GSwriteClipboardText(e);GSshowSnackbar(t.currentTarget.getAttribute("data-snackbar"))}else{let s="pinterest"===r?750:650,a="twitter"===r||"linkedin"===r?500:"pinterest"===r?320:300,l,n="top="+(screen.height/2-a/2)+",left="+(screen.width/2-s/2)+",width="+s+",height="+a;window.open(e,r,n)}},!1);