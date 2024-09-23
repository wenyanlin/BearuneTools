import{_,o as r,c as i,a as e,u as H,b as L,r as p,w as D,d as O,e as M,F as C,f as B,g as o,h,i as v,t as S,j as P,n as I,k as V,T as W,l as T,R as z}from"./page1-Ci1vpW3Z.js";import"./preload-helper-BxaVoaJg.js";const F={},N={id:"uuid-a1341c30-676c-4456-831a-e2a9539aef89",class:"h-[1em] w-[1em]",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32"};function Z(m,s){return r(),i("svg",N,s[0]||(s[0]=[e("path",{d:"m16,0C7.16,0,0,7.16,0,16s7.16,16,16,16,16-7.16,16-16S24.84,0,16,0Zm11.17,21.51c0,1.11-.9,2-2,2H6.83c-1.1,0-2-.89-2-2v-11.02c0-1.11.9-2,2-2h18.34c1.1,0,2,.89,2,2v11.02Z",style:{fill:"currentColor","stroke-width":"0px"}},null,-1),e("polygon",{points:"23.4 10.49 16 14.84 8.6 10.49 23.4 10.49",style:{fill:"currentColor","stroke-width":"0px"}},null,-1),e("path",{d:"m25.17,11.77v9.74H6.83v-9.74l8.66,5.09c.16.09.34.14.51.14s.35-.05.51-.14l8.66-5.09Z",style:{fill:"currentColor","stroke-width":"0px"}},null,-1)]))}const A=_(F,[["render",Z]]),G="/assets/LOGO-BKt5otUs.webp",q="/assets/LOGO-dark-liTJHzva.webp",$="/assets/bmc-button-DJHoD4kZ.svg",J={class:"themeSwitch"},K=["checked"],Q={__name:"SwitchButton",props:{runEvent:Function,defaultChecked:{type:Boolean,default:!0}},setup(m){const s=m;return(l,a)=>(r(),i("label",J,[e("input",{type:"checkbox",onClick:a[0]||(a[0]=(...f)=>s.runEvent&&s.runEvent(...f)),checked:s.defaultChecked},null,8,K),a[1]||(a[1]=e("div",null,[e("div")],-1))]))}},R=_(Q,[["__scopeId","data-v-c8897faf"]]),U={class:"w-full h-16 flex justify-center backdrop-blur-lg sticky top-0 z-40 border-b border-greyBlue xl:px-4"},X={class:"w-innerWidth flex justify-between items-center h-full xl:w-full"},Y={class:"flex justify-between items-center gap-4 sm:hidden"},ee={class:"flex navigation_links desktopMenu"},te={class:"hidden justify-between items-center gap-8 sm:flex"},se={key:0,class:"fixed top-16 left-0 w-full h-screen bg-white z-50 columns py-16"},ne={class:"col-span-4 col-start-3 flex flex-col navigation_links xs:col-span-2 xs:col-start-2"},oe={class:"flex justify-between items-center bg-greyBlue mt-4 p-4 rounded-lg"},le={__name:"SiteHeader",setup(m){const s=[{title:"QR碼產生器",path:"/qrcode-generator"},{title:"在線轉換圖像",path:"/convert-image"},{title:"一鍵轉WebP",path:"/convert-image-to-webp"}],l=()=>{window.location.href="/wenyan/"},a=H(),f=L(),E=()=>{f.push("/")},g=p(),b=p(),u=p(),d=p(!1),j=(n,t)=>n.value!==null?n.value:t.value.matches?"dark":"light",y=n=>{document.querySelector("html").setAttribute("data-theme",n)},k=()=>{const n=u.value==="dark"?"light":"dark";localStorage.setItem("theme",n),y(n),u.value=n},x=()=>{d.value=!d.value;const n=()=>/Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);d.value?(document.documentElement.style.overflow="hidden",n()||(document.documentElement.style.paddingRight="17px")):(document.documentElement.style.overflow="",document.documentElement.style.paddingRight="0")};return D(()=>a.fullPath,()=>{d.value&&x()}),O(()=>{g.value=window.matchMedia("(prefers-color-scheme: dark)"),b.value=localStorage.getItem("theme"),u.value=j(b,g),y(u.value)}),(n,t)=>{const w=M("RouterLink");return r(),i("div",U,[e("div",X,[e("div",{class:"h-4/6 cursor-pointer py-1 px-2 flex gap-2 rounded-lg text-info hover:bg-greyBlue50",onClick:E},t[0]||(t[0]=[e("img",{src:G,alt:"",class:"dark:hidden"},null,-1),e("img",{src:q,alt:"",class:"hidden dark:block"},null,-1)])),e("div",Y,[e("div",ee,[(r(),i(C,null,B(s,c=>o(w,{key:c.path,to:c.path,class:"navigation_link no-style-a"},{default:h(()=>[v(S(c.title),1)]),_:2},1032,["to"])),64))]),e("button",{onClick:l,class:"border-primary text-primary hover:bg-shade1 hover:text-white"},"熊語清風"),o(R,{"default-checked":u.value=="dark","run-event":k},null,8,["default-checked"]),t[1]||(t[1]=e("a",{href:"https://buymeacoffee.com/bearune",class:"no-style-a hover:bg-transparent hover:brightness-75",target:"_blank"},[e("img",{src:$,alt:""})],-1))]),e("div",te,[e("button",{class:"p-0 border-none",onClick:P(x,["prevent"])},[e("span",{class:I([{"is-active":d.value},"hamburger-container"])},t[2]||(t[2]=[e("span",{class:"hamburger-top"},null,-1),e("span",{class:"hamburger-middle"},null,-1),e("span",{class:"hamburger-bottom"},null,-1)]),2)]),o(W,{name:"fade"},{default:h(()=>[d.value?(r(),i("div",se,[e("div",ne,[(r(),i(C,null,B(s,c=>o(w,{key:c.path,to:c.path,class:"navigation_link border-b !rounded-none border-sliver !border-solid !py-4 no-style-a"},{default:h(()=>[v(S(c.title),1)]),_:2},1032,["to"])),64)),e("button",{onClick:l,class:"border-primary text-primary hover:bg-shade1 hover:text-white"},"熊語清風"),e("div",oe,[t[3]||(t[3]=e("span",null,"外觀",-1)),o(R,{"default-checked":u.value=="dark","run-event":k},null,8,["default-checked"])]),t[4]||(t[4]=e("a",{href:"https://buymeacoffee.com/bearune",class:"no-style-a hover:bg-transparent hover:brightness-75 w-full mt-4",target:"_blank"},[e("img",{src:$,alt:""})],-1))])])):V("",!0)]),_:1})])])])}}},ae=_(le,[["__scopeId","data-v-bda5cf24"]]),re={class:"w-full h-fit py-8 flex justify-center border-t border-transparent bg-related3 xl:px-4 dark:border-greyBlue"},ie={class:"w-innerWidth flex gap-4 justify-between items-center xl:w-full"},ce={href:"mailto:bearune.official@gmail.com",class:"no-style-a hover:bg-transparent text-4xl text-black"},ue={class:"flex gap-4"},de={__name:"SiteFooter",setup(m){return(s,l)=>{const a=M("RouterLink");return r(),i("div",re,[e("div",ie,[e("span",null,[e("a",ce,[o(T(A))])]),e("div",ue,[l[1]||(l[1]=e("span",null,"© 2024 熊語清風 版權所有",-1)),o(a,{to:"/privacy-policy-statement",class:"text-dGrey border-none"},{default:h(()=>l[0]||(l[0]=[v("隱私權宣告 ")])),_:1})])])])}}},me={class:"min-h-screen"},fe={__name:"MainLayout",setup(m){return(s,l)=>(r(),i("div",me,[o(ae),o(T(z),{class:"min-h-[calc(100vh-8rem)]"}),o(de)]))}};export{fe as default};
