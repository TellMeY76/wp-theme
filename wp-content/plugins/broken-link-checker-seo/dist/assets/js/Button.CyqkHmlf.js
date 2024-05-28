import{_ as i}from"./dynamic-import-helper._aqDH9xp.js";import{o as a,c as b,I as r,C as u,v as l,x as _,H as s,y,r as f,f as p}from"./index.MAPGMl_Z.js";const k={props:{dark:Boolean}},B=u("div",{class:"double-bounce1"},null,-1),v=u("div",{class:"double-bounce2"},null,-1),C=[B,v];function S(t,n,e,c,d,g){return a(),b("div",{class:r(["aioseo-loading-spinner",{dark:e.dark}])},C,2)}const h=i(k,[["render",S]]),x={name:"base-button",components:{CoreLoader:h},props:{color:String,tag:{type:String,default:"button",description:"Button html tag"},block:Boolean,loading:Boolean,wide:Boolean,disabled:Boolean,type:{type:String,default:"default",description:"Button type (blue|black|green|red|gray|wp-blue)"},nativeType:{type:String,default:"button",description:"Button native type (e.g button, input etc)"},size:{type:String,default:"",description:"Button size (small-table|small|medium|large)"},link:{type:Boolean,description:"Whether button is a link (no borders or background)"},to:{type:[Object,String],description:"The router link object or string"}}};function z(t,n,e,c,d,g){const m=f("core-loader");return a(),l(y(e.tag),{type:e.tag==="button"?e.nativeType:"",disabled:e.disabled||e.loading,to:e.tag==="router-link"?e.to:"",onMouseenter:n[0]||(n[0]=o=>t.$emit("mouseenter",o)),onMouseleave:n[1]||(n[1]=o=>t.$emit("mouseleave",o)),class:r(["aioseo-button",[{[e.type]:e.type},{[e.size]:e.size},{"btn-link":e.link},{disabled:e.disabled&&e.tag!=="button"},{color:e.color},{loading:e.loading}]])},{default:_(()=>[s(t.$slots,"loading",{},()=>[e.loading?(a(),l(m,{key:0,dark:e.type==="gray"},null,8,["dark"])):p("",!0)]),s(t.$slots,"default")]),_:3},40,["type","disabled","to","class"])}const L=i(x,[["render",z]]);export{L as B,h as C};