import{d as y,u as I,r as g,a as B,s as b,b as V,o,c as i,e as s,t as u,f as t,F as k,g as C,w as z,v as L,h as N,i as M,j as T,k as F,p as H,l as A,_ as D}from"./index-VrkWM7w8.js";const v=l=>(H("data-v-584ca0b5"),l=l(),A(),l),U={class:"main-body"},j={class:"main-body-header"},E={class:"title"},R=v(()=>s("b",null,"online friends",-1)),$={class:"header-content"},q={class:"main-body-content"},G={class:"title"},J=v(()=>s("b",null,"Messages",-1)),K={class:"searchbox"},O={class:"search active"},P=v(()=>s("div",{class:"searchicon"},[s("div",{class:"nav-icon"},[s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"ionicon s-ion-icon",viewBox:"0 0 512 512"},[s("title",null,"Search"),s("path",{d:"M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"})])])],-1)),Q={class:"body-content"},W={class:"friends"},X=["onClick"],Y={class:"friend-avatar"},Z={class:"friend-info"},ss={class:"friend-name"},es={class:"friend-message"},ts=["innerHTML"],as={key:0,class:"unread-message"},ns=y({__name:"home",setup(l){I(a=>({cef30dd8:t(S)}));const p=g(""),{userStore:m,chatStore:d}=B(),{userInfo:_,bgColor:S}=b(m),{chatMap:h,chatNumMap:f}=b(d),w=a=>{let n;if(h.value[a]){const c=h.value[a][h.value[a].length-1];if(n=c.chat_message[c.chat_message.length-1],n)return n.msg}},x=a=>{d.setFriendInfo(a)};let r=g([]);return m.friends().then(()=>{d.getAllChatHistory(_.value.user_id,_.value.friends),r.value=_.value.friends}),(a,n)=>{const c=V("el-avatar");return o(),i("div",U,[s("div",j,[s("div",E,[R,s("span",null,u(t(r).length),1)]),s("div",$,[(o(!0),i(k,null,C(t(r),e=>(o(),N(c,{key:e,size:45,src:t(M)(e.avatar)},null,8,["src"]))),128))])]),s("div",q,[s("div",G,[J,s("div",K,[s("div",O,[z(s("input",{class:"serachInput","onUpdate:modelValue":n[0]||(n[0]=e=>p.value=e),ref:"serachInput"},null,512),[[L,p.value]]),P])])]),s("div",Q,[s("div",W,[(o(!0),i(k,null,C(t(r),e=>(o(),i("div",{class:"friend",onClick:os=>x(e)},[s("div",Y,[T(c,{size:45,src:t(M)(e.avatar)},null,8,["src"])]),s("div",Z,[s("div",null,[s("div",ss,[s("span",null,u(e.nickname),1)]),s("div",es,[s("span",{innerHTML:w(e.user_id)},null,8,ts)])]),t(f)[e.user_id]>0?(o(),i("div",as,u(t(f)[e.user_id]),1)):F("",!0)])],8,X))),256))])])])])}}}),is=D(ns,[["__scopeId","data-v-584ca0b5"]]);export{is as default};