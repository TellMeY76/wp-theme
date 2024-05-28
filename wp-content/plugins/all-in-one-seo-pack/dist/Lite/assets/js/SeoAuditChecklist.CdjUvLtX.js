import{q as k,o as R,p as L,a as O,u as M,f as B,e as D}from"./links.C2upUfsO.js";import{C as x}from"./Card.BF8YEwxA.js";import{C as H}from"./Tabs.CzBLxKs2.js";import{C as E}from"./SeoSiteAnalysisResults.pGWYAHRf.js";import{p as G}from"./popup.6pJEdp0g.js";import"./default-i18n.Bd0Z306Z.js";import{u as T,S as w}from"./SeoSiteScore.C1NEr60R.js";import{x as s,o as i,c as u,C as n,d as _,a as r,t as c,F as j,K as I,l as g,m as l,D as b,G as N,H as P}from"./vue.esm-bundler.CWQFYt9y.js";import{_ as v}from"./_plugin-vue_export-helper.BN1snXvA.js";import{C as U}from"./Blur.DNVDismY.js";import{C as V}from"./Index.D86wwOWh.js";import{S as W}from"./Book.BwJHPER-.js";import{S as q}from"./Lab.BYidFZVq.js";import{C as F}from"./Tooltip.Jp05nfCy.js";import{S as K}from"./Refresh.Cok1AepX.js";import{a as Y}from"./index.BQgiQQKQ.js";import"./helpers.D2xRWOvn.js";import"./Caret.iRBf3wcH.js";import"./Slide.CRIn0kdn.js";import"./TruSeoScore.TjofuHRQ.js";import"./Ellipse.DXUYYFQW.js";import"./Information.CESrgQJV.js";import"./Tags.1IW4s5wg.js";import"./postSlug.aEbF4K7B.js";import"./metabox.Ddeb-6g9.js";import"./cleanForSlug.o2RefBn0.js";import"./toString.XwB3Xa5p.js";import"./_baseTrim.BYZhh0MR.js";import"./_stringToArray.DnK4tKcY.js";import"./get.BT85ybc8.js";import"./_baseSet.DALGekmy.js";import"./GoogleSearchPreview.B5TbsCJn.js";import"./constants.DpuIWwJ9.js";import"./Gear.aQH8e4fl.js";import"./params.B3T1WKlC.js";const Q={setup(){const e=T();return{analyzerStore:k(),composableStrings:e.strings,errorObject:e.errorObject}},components:{CoreSiteScore:V,SvgBook:W,SvgDannieLab:q},props:{score:Number,loading:Boolean,description:String,summary:{type:Object,default(){return{}}}},data(){return{strings:R({yourOverallSiteScore:this.$t.__("Your Overall Site Score",this.$td),goodResult:this.$t.sprintf(this.$t.__("A very good score is between %1$s%3$d and %4$d%2$s.",this.$td),"<strong>","</strong>",50,75),forBestResults:this.$t.sprintf(this.$t.__("For best results, you should strive for %1$s%3$d and above%2$s.",this.$td),"<strong>","</strong>",70),readUltimateSeoGuide:this.$t.__("Read the Ultimate WordPress SEO Guide",this.$td)},this.composableStrings)}}},J={class:"aioseo-seo-analysis"},X={key:0,class:"seo-analysis-score"},Z={key:1,class:"seo-analysis-description"},ee=["innerHTML"],te=["innerHTML"],oe={class:"d-flex"},se=["href"],re={key:2,class:"seo-analysis-error"},ne={class:"error-title"},ie=["innerHTML"],ae={class:"error-action-buttons"};function le(e,S,h,t,a,d){const m=s("core-site-score"),p=s("svg-book"),y=s("svg-dannie-lab"),f=s("base-button");return i(),u("div",J,[t.analyzerStore.analyzeError?_("",!0):(i(),u("div",X,[n(m,{loading:h.loading,score:h.score,description:h.description,strokeWidth:1.75},null,8,["loading","score","description"])])),t.analyzerStore.analyzeError?_("",!0):(i(),u("div",Z,[r("h2",null,c(a.strings.yourOverallSiteScore),1),r("div",{innerHTML:a.strings.goodResult},null,8,ee),r("div",{innerHTML:a.strings.forBestResults},null,8,te),r("div",oe,[n(p),r("a",{href:e.$links.getDocUrl("ultimateGuide"),target:"_blank"},c(a.strings.readUltimateSeoGuide),9,se)])])),t.analyzerStore.analyzeError&&t.errorObject?(i(),u("div",re,[n(y),r("p",ne,c(a.strings.anErrorOccurred),1),r("p",{class:"error-description",innerHTML:t.errorObject.description},null,8,ie),r("div",ae,[(i(!0),u(j,null,I(t.errorObject.buttons,(o,C)=>(i(),g(f,{key:C,type:o.type,tag:o.tag?o.tag:"button",target:"_blank",href:o.url?o.url:"",size:"medium",loading:(o==null?void 0:o.runAgain)&&t.analyzerStore.analyzing,onClick:A=>o!=null&&o.runAgain?t.analyzerStore.runSiteAnalyzer():""},{default:l(()=>[b(c(o.text),1)]),_:2},1032,["type","tag","href","loading","onClick"]))),128))])])):_("",!0)])}const ce=v(Q,[["render",le]]),ue={setup(){const{strings:e}=T();return{analyzerStore:k(),connectStore:L(),optionsStore:O(),rootStore:M(),strings:e}},components:{CoreBlur:U,CoreSiteScoreAnalyze:ce},mixins:[w],data(){return{score:0}},watch:{"optionsStore.internalOptions.internal.siteAnalysis.score"(e){this.score=e}},computed:{getSummary(){return{recommended:this.analyzerStore.recommendedCount(),critical:this.analyzerStore.criticalCount(),good:this.analyzerStore.goodCount()}}},methods:{openPopup(e){G(e,this.connectWithAioseo,600,630,!0,["token"],this.completedCallback,this.closedCallback)},completedCallback(e){return this.connectStore.saveConnectToken(e.token)},closedCallback(e){e&&this.analyzerStore.runSiteAnalyzer(),this.analyzerStore.analyzing=!0}},mounted(){!this.optionsStore.internalOptions.internal.siteAnalysis.score&&this.optionsStore.internalOptions.internal.siteAnalysis.connectToken&&(this.analyzerStore.analyzing=!0,this.analyzerStore.runSiteAnalyzer()),this.score=this.optionsStore.internalOptions.internal.siteAnalysis.score}},de={class:"aioseo-seo-site-score"},_e={key:1,class:"aioseo-seo-site-score-cta"};function me(e,S,h,t,a,d){const m=s("core-site-score-analyze"),p=s("core-blur");return i(),u("div",de,[t.optionsStore.internalOptions.internal.siteAnalysis.connectToken?_("",!0):(i(),g(p,{key:0},{default:l(()=>[n(m,{score:85,description:e.description},null,8,["description"])]),_:1})),t.optionsStore.internalOptions.internal.siteAnalysis.connectToken?_("",!0):(i(),u("div",_e,[r("a",{href:"#",onClick:S[0]||(S[0]=N(y=>d.openPopup(t.rootStore.aioseo.urls.connect),["prevent"]))},c(e.connectWithAioseo),1),b(" "+c(t.strings.toSeeYourSiteScore),1)])),t.optionsStore.internalOptions.internal.siteAnalysis.connectToken?(i(),g(m,{key:2,score:a.score,description:e.description,loading:e.analyzing,summary:d.getSummary},null,8,["score","description","loading","summary"])):_("",!0)])}const pe=v(ue,[["render",me]]),he={setup(){return{analyzerStore:k(),licenseStore:B(),optionsStore:O(),settingsStore:D()}},components:{CoreCard:x,CoreMainTabs:H,CoreSeoSiteAnalysisResults:E,CoreSeoSiteScoreAnalyze:pe,CoreTooltip:F,SvgCircleQuestionMark:Y,SvgRefresh:K},data(){return{internalDebounce:!1,strings:{completeSeoChecklist:this.$t.__("Complete SEO Checklist",this.$td),refreshResults:this.$t.__("Refresh Results",this.$td),cardDescription:this.$t.__("These are the results our SEO Analzyer has generated after analyzing the homepage of your website.",this.$td)+" "+this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore,"seoAnalyzer",!0)}}},computed:{tabs(){const e=this.optionsStore.internalOptions.internal.siteAnalysis;return[{slug:"all-items",label:this.$t.__("All Items",this.$td),analyze:{classColor:"black",count:e.score?this.analyzerStore.allItemsCount():0}},{slug:"critical",label:this.$t.__("Important Issues",this.$td),analyze:{classColor:"red",count:e.score?this.analyzerStore.criticalCount():0}},{slug:"recommended-improvements",label:this.$t.__("Recommended Improvements",this.$td),analyze:{classColor:"blue",count:e.score?this.analyzerStore.recommendedCount():0}},{slug:"good-results",label:this.$t.__("Good Results",this.$td),analyze:{classColor:"green",count:e.score?this.analyzerStore.goodCount():0}}]}},methods:{processChangeTab(e){this.internalDebounce||(this.internalDebounce=!0,this.settingsStore.changeTab({slug:"seoAuditChecklist",value:e}),setTimeout(()=>{this.internalDebounce=!1},50))},refresh(){this.analyzerStore.analyzing=!0,this.analyzerStore.runSiteAnalyzer({refresh:!0})}}},Se={class:"aioseo-seo-audit-checklist"},ye=["innerHTML"],ge={class:"label"};function fe(e,S,h,t,a,d){const m=s("core-seo-site-score-analyze"),p=s("core-card"),y=s("svg-circle-question-mark"),f=s("core-tooltip"),o=s("svg-refresh"),C=s("base-button"),A=s("core-main-tabs"),$=s("core-seo-site-analysis-results");return i(),u("div",Se,[n(p,{slug:"connectOrScore","hide-header":"","no-slide":"",toggles:!1},{default:l(()=>[n(m)]),_:1}),(e.$isPro&&t.licenseStore.licenseKey||t.optionsStore.internalOptions.internal.siteAnalysis.connectToken)&&t.optionsStore.internalOptions.internal.siteAnalysis.score?(i(),g(p,{key:0,slug:"completeSeoChecklist","no-slide":"",toggles:!1},{header:l(()=>[r("span",null,c(a.strings.completeSeoChecklist),1),n(f,null,{tooltip:l(()=>[r("span",{innerHTML:a.strings.cardDescription},null,8,ye)]),default:l(()=>[n(y)]),_:1})]),"header-extra":l(()=>[n(C,{class:"refresh-results",type:"gray",size:"small",onClick:d.refresh,loading:t.analyzerStore.analyzing},{default:l(()=>[n(o),b(" "+c(a.strings.refreshResults),1)]),_:1},8,["onClick","loading"])]),tabs:l(()=>[n(A,{tabs:d.tabs,showSaveButton:!1,active:t.settingsStore.settings.internalTabs.seoAuditChecklist,internal:"",onChanged:d.processChangeTab,"skinny-tabs":""},{"var-tab":l(({tab:z})=>[r("span",{class:P(["round",z.analyze.classColor])},c(z.analyze.count||0),3),r("span",ge,c(z.label),1)]),_:1},8,["tabs","active","onChanged"])]),default:l(()=>[n($,{section:t.settingsStore.settings.internalTabs.seoAuditChecklist,"all-results":t.analyzerStore.getSiteAnalysisResults,"show-instructions":""},null,8,["section","all-results"])]),_:1})):_("",!0)])}const tt=v(he,[["render",fe]]);export{tt as default};
