import{d as x,u as I,r as p,a as M,s as f,b as y,o as c,c as i,e as s,w as V,v as B,m as F,F as L,g as N,f as r,j as T,i as b,t as m,k as z,p as K,l as D,_ as H}from"./index-VrkWM7w8.js";const U=n=>(K("data-v-32573c55"),n=n(),D(),n),j={class:"friends"},A={class:"searchbox"},E={class:"search active"},R=["onKeydown"],$=U(()=>s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"ionicon s-ion-icon",viewBox:"0 0 512 512"},[s("title",null,"Search"),s("path",{d:"M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"})],-1)),q=[$],G={class:"friends-list"},J=["onClick"],O={class:"friend-avatar"},P={class:"friend-info"},Q={class:"friend-name"},W={class:"friend-message"},X=["innerHTML"],Y={key:0,class:"unread-message"},Z=x({__name:"friends",setup(n){I(a=>({"0f196c57":r(w)}));const l=p(""),{userStore:_,chatStore:u}=M(),{userInfo:g,bgColor:w}=f(_),{chatMap:d,chatNumMap:h}=f(u),C=a=>{let t;if(d.value[a]){const o=d.value[a][d.value[a].length-1];if(t=o.chat_message[o.chat_message.length-1],t)return t.msg}},k=a=>{u.setFriendInfo(a)},S=p(g.value.friends),v=()=>{_.search(l.value)};return(a,t)=>{const o=y("el-avatar");return c(),i("div",j,[s("div",A,[s("div",E,[V(s("input",{class:"serachInput","onUpdate:modelValue":t[0]||(t[0]=e=>l.value=e),ref:"serachInput",onKeydown:F(v,["enter"])},null,40,R),[[B,l.value]]),s("div",{class:"searchicon"},[s("div",{class:"nav-icon",onClick:v},q)])])]),s("div",G,[(c(!0),i(L,null,N(S.value,e=>(c(),i("div",{class:"friend",onClick:ss=>k(e)},[s("div",O,[T(o,{size:45,src:r(b)(e.avatar)},null,8,["src"])]),s("div",P,[s("div",null,[s("div",Q,[s("span",null,m(e.nickname),1)]),s("div",W,[s("span",{innerHTML:C(e.user_id)},null,8,X)])]),r(h)[e.user_id]>0?(c(),i("div",Y,m(r(h)[e.user_id]),1)):z("",!0)])],8,J))),256))])])}}}),as=H(Z,[["__scopeId","data-v-32573c55"]]);export{as as default};
