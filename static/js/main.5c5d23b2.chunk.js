(this["webpackJsonpgame-informer-replay"]=this["webpackJsonpgame-informer-replay"]||[]).push([[0],{24:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var i=n(1),r=n.n(i),s=n(14),a=n.n(s),c=(n(24),n(4));n(25),n(26);var o=n(0);var l=function(){var e=function(){var e="(prefers-color-scheme: dark)",t=Object(i.useState)((function(){return window.localStorage.getItem("colorMode")||(window.matchMedia(e).matches?"dark":"light")})),n=Object(c.a)(t,2),r=n[0],s=n[1];return Object(i.useEffect)((function(){var t=window.matchMedia(e),n=function(){return s(t.matches?"dark":"light")};return t.addEventListener("change",n),function(){return t.removeEventListener("change",n)}}),[]),Object(i.useLayoutEffect)((function(){document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("colorMode",r)}),[r]),[r,s]}(),t=Object(c.a)(e,2),n=t[0],r=t[1];Object(i.useEffect)((function(){}),[]);var s=Object(o.jsxs)("div",{className:"switch-container",children:[Object(o.jsxs)("label",{className:"switch",children:[Object(o.jsx)("input",{type:"checkbox",id:"dark-mode-checkbox",checked:"dark"===n,onChange:function(){r((function(e){return"light"===e?"dark":"light"}))}}),Object(o.jsx)("span",{className:"slider round"})]}),Object(o.jsx)("em",{htmlFor:"dark-mode-checkbox",children:"Dark Mode"})]});return window.matchMedia("(prefers-color-scheme: dark)").matches?null:s};n(28);var d=function(){return Object(o.jsxs)("footer",{className:"App-footer",children:[Object(o.jsx)("p",{children:Object(o.jsxs)("small",{children:["Source Code \xa9 ",Object(o.jsx)("time",{id:"copyright-current-year",children:function(){var e=(new Date).getFullYear();return 2021===e?2021:"2021-".concat(e)}()})," Todd Brentlinger, Santa Cruz, CA, USA. All Rights Reserved."]})}),Object(o.jsx)("p",{children:Object(o.jsxs)("small",{children:["Last modified on ",Object(o.jsx)("time",{id:"lastModifiedDate"})]})})]})},u=n(10),h=n(15),g=n(16);function A(e){if(!e)return null;if(Array.isArray(e)){for(var t="",n=0,i=e.length;n<i;n++)t+=e[n],i>1&&n!==i-1&&(t+=2===i?" and ":n===i-2?", and ":", ");return t}return"string"===typeof e?e:void 0}function m(e){return isNaN(parseInt(e,10))||(e=e.toString()),"string"===typeof e&&e.length>3?e.replace(/\B(?=(\d{3})+(?!\d))/g,","):e}var j=function(){function e(t){Object(h.a)(this,e),this.number=t.episodeNumber,this.title=t.episodeTitle,this.mainSegmentGames=t.mainSegmentGamesAdv,this.videoLength=t.details.runtime,this.thumbnails=t.youtube.thumbnails;var n=t.details.airdate;n&&0!=n.length?n.includes("/")||n.includes(",")?this.airdate=new Date(n):this.airdate=n:this.airdate=null,t.details.host&&(this.host=t.details.host),t.details.featuring&&(this.featuring=t.details.featuring),Array.isArray(t.details.description)&&t.details.description.length&&(this.description=t.details.description),t.middleSegment&&t.middleSegment.replace(/-/gi,"").length&&(this.middleSegment=t.middleSegment),t.middleSegmentContent&&t.middleSegmentContent.replace(/-/gi,"").length&&(this.middleSegmentContent=t.middleSegmentContent),t.secondSegment&&t.secondSegment.replace(/-/gi,"").length&&(this.secondSegment=t.secondSegment),t.secondSegmentGames&&Array.isArray(t.secondSegmentGames)&&t.secondSegmentGames.length&&t.secondSegmentGames[0].replace(/-/gi,"").length&&(this.secondSegmentGames=t.secondSegmentGames),t.youtube&&(t.youtube.views&&(this.views=parseInt(t.youtube.views,10)),t.youtube.likes&&(this.likes=parseInt(t.youtube.likes,10)),t.youtube.dislikes&&(this.dislikes=parseInt(t.youtube.dislikes,10)));var i="";if(t.details&&t.details.external_links){var r=t.details.external_links.find((function(e){return e.href.includes("youtube")}));r&&(i=r.href.split("=")[1].slice(0,11))}i&&(this.youtubeVideoID=i),t.article&&(this.giArticle=t.article),this.externalLinks=[],t.details.external_links&&(this.externalLinks=t.details.external_links),t.fandomWikiURL&&this.externalLinks.unshift({href:"https://replay.fandom.com".concat(t.fandomWikiURL),title:this.title});for(var s=["description","external_links","image","system","gamedate","airdate","runtime","host","featuring"],a={},o=0,l=Object.entries(t.details);o<l.length;o++){var d=Object(c.a)(l[o],2),u=d[0],g=d[1];s.includes(u)||(Array.isArray(g)&&!g.length||(a[u]=g))}(function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0})(a)||(this.otherHeadings=a),e.collection.push(this),e.totalTimeSeconds+=this.videoLengthInSeconds,this.views&&(e.totalViews+=this.views),this.likes&&(e.totalLikes+=this.likes),this.dislikes&&(e.totalDislikes+=this.dislikes),e.checkGamesInEpisode(this),e.addCrewToGICrew(this.host),e.addCrewToGICrew(this.featuring),e.checkSegmentsInEpisode(this)}return Object(g.a)(e,[{key:"videoLengthInSeconds",get:function(){return function(e){var t=e.split(":");return t.forEach((function(e,t,n){n[t]=parseInt(e,10)})),t[t.length-1]+(t.length>1?60*t[t.length-2]:0)+(t.length>2?3600*t[t.length-3]:0)}(this.videoLength)}},{key:"airDateAsDateTimeAttribute",get:function(){return"".concat(this.airdate.getFullYear(),"-").concat(this.airdate.getMonth()+1,"-").concat(this.airdate.getDate())}},{key:"likeRatio",get:function(){if(this.likes&&this.dislikes)return(100*this.likes/(this.likes+this.dislikes)).toFixed(1)}},{key:"createEpisodeNumberStr",value:function(){var e=this.getReplaySeason();return e[0]?"S".concat(e[0],":E").concat(e[1]," (#").concat(this.number,")"):"Unofficial #".concat(Math.floor(100*this.number))}},{key:"getReplaySeason",value:function(){for(var e=[1,107,268,385,443,499],t=0,n=0;n<e.length;n++){if(this.number<e[n]){t=n;break}n==e.length-1&&(t=e.length)}return[t,t>1?this.number-e[t-1]+1:this.number]}},{key:"getDateString",value:function(){return["January","February","March","April","May","June","July","August","September","October","November","December"][this.airdate.getMonth()]+" "+this.airdate.getDate()+", "+this.airdate.getFullYear()}},{key:"containsCrew",value:function(e){return!(!this.host||!this.host.includes(e))||!(!this.featuring||!this.featuring.includes(e))}},{key:"containsSegment",value:function(e){if(this.middleSegment||this.middleSegmentContent){var t=this.middleSegment||this.middleSegmentContent;if(t.endsWith("Ad")&&(t="Ad"),t===e)return!0}return!(!this.secondSegment||this.secondSegment!==e)}},{key:"containsSearchTerm",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this;return"string"===typeof n?n.toLowerCase().includes(e.toLowerCase()):"number"===typeof n?n.toString().includes(e.toLowerCase()):Array.isArray(n)?n.some((function(n){return t.containsSearchTerm(e,n)})):"object"===typeof n&&null!==n&&Array.from(Object.values(n)).some((function(n){return t.containsSearchTerm(e,n)}))}}],[{key:"getLinkSource",value:function(e){var t={gameinformer:"Game Informer",youtube:"YouTube",fandom:"Fandom",wikipedia:"Wikipedia",gamespot:"GameSpot",steampowered:"Steam"},n=Object.keys(t).find((function(t){return e.includes(t)}));return n?" on ".concat(t[n]):null}},{key:"getSegmentTitle",value:function(e){if(e&&"string"===typeof e&&0===e.length)return null;switch(e){case"RR":return"Replay Roulette";case"SRS":return"Super Replay Showdown";case"YDIW":return"You're Doing It Wrong";case"ST":return"Stress Test";case"RP":return"RePorted";case"DP":return"Developer Pick";case"2037":return"Replay 2037";case"HF":return"Horror Fest";case"RRL":return"Replay Real Life";default:return e}}},{key:"addGameToGamesPlayed",value:function(e){this.gamesPlayed.has(e)?this.gamesPlayed.get(e).count++:this.gamesPlayed.set(e,{count:1})}},{key:"checkGamesInEpisode",value:function(e){if(e.mainSegmentGames){var t,n=Object(u.a)(e.mainSegmentGames);try{for(n.s();!(t=n.n()).done;){var i=t.value;this.addGameToGamesPlayed(i.title)}}catch(c){n.e(c)}finally{n.f()}}if(e.secondSegmentGames){var r,s=Object(u.a)(e.secondSegmentGames);try{for(s.s();!(r=s.n()).done;){var a=r.value;this.addGameToGamesPlayed(a)}}catch(c){s.e(c)}finally{s.f()}}if(e.middleSegmentContent){if(e.middleSegment&&["A Poor Retelling of Gaming History","Reflections","Embarassing Moments"].includes(e.middleSegment))return;if([" Ad"," Reel"," Skit"," Buttz"," Pamphlet"].some((function(t){return e.middleSegmentContent.endsWith(t)})))return;this.addGameToGamesPlayed(e.middleSegmentContent)}}},{key:"addCrewToGICrew",value:function(e){if(void 0!==e){var t,n=Object(u.a)(e);try{for(n.s();!(t=n.n()).done;){var i=t.value;this.giCrew.has(i)?this.giCrew.set(i,this.giCrew.get(i)+1):this.giCrew.set(i,1)}}catch(r){n.e(r)}finally{n.f()}}}},{key:"getGICrewForFilterForm",value:function(){return Array.from(this.giCrew,(function(e){return{name:e[0],count:e[1]}})).filter((function(e){return e.count>1})).sort((function(e,t){return e.name<t.name?-1:e.name>t.name?1:0}))}},{key:"addSegment",value:function(e){this.segments.has(e)?this.segments.set(e,this.segments.get(e)+1):this.segments.set(e,1)}},{key:"checkSegmentsInEpisode",value:function(e){if(e.middleSegment||e.middleSegmentContent){var t=e.middleSegment||e.middleSegmentContent;t.endsWith("Ad")&&(t="Ad"),this.addSegment(t)}e.secondSegment&&this.addSegment(e.secondSegment)}},{key:"getSegmentsForFilterForm",value:function(){var e=this;return Array.from(this.segments,(function(e){return{name:e[0],count:e[1]}})).filter((function(e){return e.count>1})).sort((function(t,n){var i=e.getSegmentTitle(t.name),r=e.getSegmentTitle(n.name);return i<r?-1:i>r?1:0}))}},{key:"compareReplayEpisodesByProperty",value:function(e,t,n){return void 0!==e[n]&&void 0!==t[n]?e[n]-t[n]:void 0!==e[n]?1:void 0!==t[n]?-1:void 0}}]),e}();j.collection=[],j.totalTimeSeconds=0,j.totalViews=0,j.totalLikes=0,j.totalDislikes=0,j.gamesPlayed=new Map,j.giCrew=new Map,j.segments=new Map;var b=n(7),p=n(3);n(29),n(30);var f=function(e){var t=Object(i.useState)(d()),n=Object(c.a)(t,2),r=n[0],s=n[1],a=Math.ceil(e.maxResults/e.resultsPerPage),l=Math.ceil(r/2);function d(){return window.matchMedia("(max-width: 480px)").matches?3:window.matchMedia("(max-width: 750px)").matches?5:7}function u(t){e.scrollToTop&&document.getElementById("top-page").scrollIntoView({behavior:"smooth"}),e.setCurrPage(t)}Object(i.useEffect)((function(){var e=function(e,t){var n;return function(){var i=arguments,r=this;clearTimeout(n),n=setTimeout((function(){return e.apply(r,i)}),t)}}((function(){var e=d();e!==r&&s(e)}),1e3);return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}));var h=Object(o.jsxs)("div",{className:"page-button-container",children:[Object(o.jsx)("button",{className:"custom-button",onClick:function(){1!==e.currPage&&u(e.currPage-1)},disabled:1===e.currPage,type:"button",value:"prev",children:"PREV"}),Object(o.jsx)("button",{className:"custom-button",onClick:function(){return u(1)},disabled:a<=r||e.currPage<=l,type:"button",value:"first",children:"FIRST"}),Object(o.jsx)("div",{className:"page-number-container",children:function(){var t,n,i=[];a>r?e.currPage>a-l?(t=a-r+1,n=a):e.currPage>l?(t=e.currPage-l+1,n=e.currPage+l-1):(t=1,n=r):(t=1,n=a);for(var s=function(t){i.push(Object(o.jsx)("button",{className:"custom-button"+(t===e.currPage?" active":""),onClick:function(){return u(t)},children:t},t))},c=t;c<=n;c++)s(c);return i}()}),Object(o.jsx)("button",{className:"custom-button",onClick:function(){return u(a)},disabled:a<=r||e.currPage>=a-l+1,type:"button",value:"last",children:"LAST"}),Object(o.jsx)("button",{className:"custom-button",onClick:function(){e.currPage!==a&&u(e.currPage+1)},disabled:e.currPage===a,type:"button",value:"next",children:"NEXT"})]});return a>1?h:null},O=(n(31),n(5)),v=n(6);var y=function(e){var t=e.thumbnails.hasOwnProperty("standard")?e.thumbnails.standard:e.thumbnails.default;return Object(o.jsx)("img",{className:e.className,alt:e.alt,width:t.width,height:t.height,src:t.url,srcSet:Object.values(e.thumbnails).reduce((function(e,t,n,i){return e+="".concat(t.url," ").concat(t.width,"w"),n<i.length-1&&(e+=", "),e}),""),sizes:"50vw"})};n(36);var x=function(e){return Object(o.jsxs)("div",{className:"article",children:[Object(o.jsxs)("div",{className:"article-heading",children:[Object(o.jsx)("h4",{className:"article-title",children:e.article.title}),Object(o.jsx)("div",{className:"article-author",children:"by ".concat(e.article.author).concat(e.article.date)})]}),function(){if(e.article.content)return e.article.content.map((function(e,t){if(e.replace(/\s/g,"").length)return Object(o.jsx)("p",{children:e},t)}))}()]})};var S=function(e){function t(e,t,n,i){if(i)return Object(o.jsxs)("div",{className:t,children:[Object(o.jsx)("b",{children:"".concat(e,": ")}),j.getSegmentTitle(n)+(i?" - ".concat(A(i)):null)]})}function n(e){if(e)return e.map((function(e,t){return Array.isArray(e)?Object(o.jsx)("ul",{children:e.map((function(e,t){return Object(o.jsx)("li",{children:e},t)}))},t):Object(o.jsx)("p",{children:e},t)}))}function i(e,t,n){if(!t.length)return null;var i=t.map((function(e,t){return Object(o.jsxs)("li",{children:[Object(o.jsx)("i",{children:Object(o.jsx)("a",{href:n?n+e.href:e.href,target:"_blank",rel:"noopener",children:e.title})}),j.getLinkSource(e.href)]},t)}));return Object(o.jsxs)("div",{children:[Object(o.jsx)("h4",{children:e}),Object(o.jsx)("ul",{children:i})]})}return Object(o.jsxs)("section",{className:"episode",children:[Object(o.jsxs)("div",{className:"episodeMain",children:[Object(o.jsxs)("div",{className:"episodeHeader",children:[Object(o.jsx)("h3",{className:"episodeTitle",children:e.replayEpisode.title}),Object(o.jsx)("div",{className:"episodeNumber",children:e.replayEpisode.createEpisodeNumberStr()})]}),Object(o.jsx)("div",{className:"thumbnail-container",children:Object(o.jsx)("div",{className:"episodeThumbnail",children:Object(o.jsxs)("a",{title:"",children:[Object(o.jsx)(y,{className:"episodeImage",thumbnails:e.replayEpisode.thumbnails,alt:'YouTube thumbnail for episode "'.concat(e.replayEpisode.title,'"')}),Object(o.jsx)("time",{className:"episodeLength",dateTime:"",children:e.replayEpisode.videoLength}),Object(o.jsx)("div",{className:"playOverlay",children:Object(o.jsx)("img",{alt:"Play video icon",width:"256",height:"256",src:"data:image/png;base64,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"})})]})})}),Object(o.jsxs)("div",{className:"episodeDetails",children:[Object(o.jsxs)("div",{className:"episodeAirDate",children:[Object(o.jsx)("b",{children:"Air Date: "}),Object(o.jsx)("time",{dateTime:e.replayEpisode.airDateAsDateTimeAttribute,children:e.replayEpisode.getDateString()})]}),Object(o.jsxs)("div",{className:"views-likes-container",children:[Object(o.jsxs)("div",{className:"views",title:"Views",children:[Object(o.jsx)("b",{children:Object(o.jsx)(O.a,{icon:v.b})}),e.replayEpisode.views?m(e.replayEpisode.views):null]}),Object(o.jsxs)("div",{className:"likes",title:"Likes (Like Ratio)",children:[Object(o.jsx)("b",{children:Object(o.jsx)(O.a,{icon:v.h})}),e.replayEpisode.likes?"".concat(m(e.replayEpisode.likes)," (").concat(e.replayEpisode.likeRatio,")"):null]})]}),Object(o.jsxs)("div",{className:"gi-crew",children:[Object(o.jsxs)("div",{className:"episodeHosts",children:[Object(o.jsx)("b",{children:"Host: "}),A(e.replayEpisode.host)]}),Object(o.jsxs)("div",{className:"episodeFeaturing",children:[Object(o.jsx)("b",{children:"Featuring: "}),A(e.replayEpisode.featuring)]})]}),Object(o.jsxs)("div",{className:"segments",children:[Object(o.jsxs)("div",{className:"mainSegment",children:[Object(o.jsx)("b",{children:"Main Segment: "}),A(e.replayEpisode.mainSegmentGames.map((function(e){return e.title})))]}),t("Middle Segment","middleSegment",e.replayEpisode.middleSegment,e.replayEpisode.middleSegmentContent),t("Second Segment","secondSegment",e.replayEpisode.secondSegment,e.replayEpisode.secondSegmentGames)]})]})]}),Object(o.jsx)("hr",{}),Object(o.jsxs)("div",{className:"episodeMoreInfo",children:[Object(o.jsx)("div",{className:"description",children:n(e.replayEpisode.description)}),Object(o.jsx)(x,{article:e.replayEpisode.giArticle}),e.replayEpisode.otherHeadings?Object.entries(e.replayEpisode.otherHeadings).map((function(e){return function(e,t){switch(e){case"see_also":return i("see also",t,"https://replay.fandom.com");case"gallery":return Object(o.jsxs)("div",{children:[Object(o.jsx)("h4",{children:"gallery"}),Object(o.jsx)("div",{className:"gallery-container",children:t.map((function(e,t){return Object(o.jsx)("div",{className:"gallery-item",children:Object(o.jsxs)("figure",{children:[Object(o.jsx)("figcaption",{children:e.caption}),Object(o.jsx)("a",{href:e.link,target:"_blank",rel:"noopener",children:Object(o.jsx)("img",{src:e.src,width:e.width,height:e.height,title:e.title})})]})},t)}))})]});default:return Object(o.jsxs)("div",{children:[Object(o.jsx)("h4",{children:e.replace(/_/g," ")}),n(t)]})}}(e[0],e[1])})):null,i("external links",e.replayEpisode.externalLinks)]})]})};n(37);var E=function(e){var t=Object(i.useRef)(null),n=Object(i.useRef)(null);function r(e,t,n){return void 0===n&&(n=t),Object(o.jsx)("li",{children:Object(o.jsxs)("label",{children:[n,Object(o.jsx)("input",{type:"checkbox",name:e,value:t}),Object(o.jsx)("span",{className:"checkmark"})]})},t)}return Object(o.jsxs)("div",{id:"search-filter-container",children:[Object(o.jsxs)("div",{id:"search-container",children:[Object(o.jsx)("input",{ref:n,type:"text",placeholder:"Search...",required:!0,onKeyUp:function(t){13===t.keyCode&&(t.preventDefault(),e.onSearch(n.current.value))}}),Object(o.jsx)("button",{className:"custom-button",type:"button","aria-label":"search",onClick:function(){e.onSearch(n.current.value)},children:Object(o.jsx)(O.a,{icon:v.d})})]}),Object(o.jsxs)("button",{id:"filter-display-toggle-button",className:"custom-button collapsible",onClick:function(e){return function(e){e.target.classList.toggle("active"),t.current.style.maxHeight=t.current.style.maxHeight?null:t.current.scrollHeight+12+"px"}(e)},children:[Object(o.jsx)(O.a,{icon:v.e,"aria-hidden":"true"}),"FILTER"]}),Object(o.jsxs)("form",{id:"filterForm",ref:t,onChange:e.onChange,onReset:e.onReset,children:[Object(o.jsx)("div",{id:"filterSubmitButton",children:Object(o.jsx)("button",{type:"button",className:"custom-button",id:"filter-toggle-select-button",onClick:function(){return t.current.reset()},children:"CLEAR ALL"})}),Object(o.jsxs)("fieldset",{form:"filterForm",id:"seasonField",children:[Object(o.jsx)("legend",{children:"Season: "}),function(){for(var e=[],t=1;t<=6;t++)e.push(r("season",t.toString()),void 0,undefined);return e.push(r("season",0,"Special")),Object(o.jsx)("ul",{children:e})}()]}),Object(o.jsxs)("fieldset",{form:"filterForm",id:"year-field",children:[Object(o.jsx)("legend",{children:"Year: "}),function(){for(var e=(new Date).getFullYear(),t=[],n=2010;n<=e;n++)t.push(r("year",n.toString()));return Object(o.jsx)("ul",{children:t})}()]}),Object(o.jsxs)("fieldset",{form:"filterForm",id:"segment-field",children:[Object(o.jsx)("legend",{children:"Segment: "}),function(){var e=j.getSegmentsForFilterForm().map((function(e){return r("segment",e.name,"".concat(j.getSegmentTitle(e.name)," (").concat(e.count,")"))}));return Object(o.jsx)("ul",{children:e})}()]}),Object(o.jsxs)("fieldset",{form:"filterForm",id:"gi-crew-field",children:[Object(o.jsx)("legend",{children:"GI Crew: "}),function(){var e=j.getGICrewForFilterForm().map((function(e){return r("giCrew",e.name,"".concat(e.name," (").concat(e.count,")"))}));return Object(o.jsx)("ul",{children:e})}()]})]})]})};j.collection.slice(),new Set,new Set,new Set,new Set;var w=function(){var e=Object(i.useState)(j.collection),t=Object(c.a)(e,2),n=t[0],r=t[1],s=Object(i.useState)(1),a=Object(c.a)(s,2),l=a[0],d=a[1],u=Object(i.useState)(10),h=Object(c.a)(u,2),g=h[0],A=h[1],y=Object(i.useState)({isAscending:!1,type:"airdate"}),x=Object(c.a)(y,2),w=x[0],k=x[1],I=Object(i.useState)({search:null,season:new Set,year:new Set,segment:new Set,giCrew:new Set}),C=Object(c.a)(I,2),R=C[0],B=C[1];function P(e){switch(w.type){case"none":break;case"video-length":e.sort((function(e,t){return e.videoLengthInSeconds-t.videoLengthInSeconds}));break;case"number":e.sort((function(e,t){return e.number-t.number}));break;case"views":e.sort((function(e,t){return j.compareReplayEpisodesByProperty(e,t,"views")}));break;case"likes":e.sort((function(e,t){return j.compareReplayEpisodesByProperty(e,t,"likes")}));break;case"like-ratio":e.sort((function(e,t){return j.compareReplayEpisodesByProperty(e,t,"likeRatio")}));break;case"dislikes":e.sort((function(e,t){return j.compareReplayEpisodesByProperty(e,t,"dislikes")}));break;case"airdate":default:e.sort((function(e,t){return e.airdate-t.airdate}))}w.isAscending||e.reverse()}function N(){console.log("handleFilterFormReset() starts"),B({search:null,season:new Set,year:new Set,segment:new Set,giCrew:new Set})}return Object(i.useEffect)((function(){if("none"!==w.type){var e=n.slice();P(e),r(e),console.log("selectedEpisodes is changed after sort")}}),[w]),Object(i.useEffect)((function(){var e=j.collection.slice();P(e),Object.values(R).every((function(e){return!e||("string"===typeof e?!e.length:e instanceof Set?!e.size:void 0)}))?r(e):r(e.filter((function(e){return!(R.search&&!e.containsSearchTerm(R.search))&&!(R.season.size&&!R.season.has(e.getReplaySeason()[0].toString()))&&!(R.year.size&&!R.year.has(e.airdate.getFullYear().toString()))&&!(R.segment.size&&!Array.from(R.segment.values()).some((function(t){return e.containsSegment(t)})))&&!(R.giCrew.size&&!Array.from(R.giCrew.values()).some((function(t){return e.containsCrew(t)})))}))),console.log("selectedEpisodes is changed after filter")}),[R]),Object(o.jsxs)("div",{className:"row",children:[Object(o.jsx)("nav",{id:"sidenav",className:"column left",children:Object(o.jsx)(E,{onChange:function(e){var t=e.target.name,n=e.target.value,i=e.target.checked;console.log("Name: ".concat(t,"\nValue: ").concat(n,"\nChecked: ").concat(i)),B((function(e){if(console.log("filter prev: ",e[t]),i&&!e[t].has(n)){var r=new Set(e[t]);return console.log("filter new: ",r.add(n)),Object(p.a)(Object(p.a)({},e),{},Object(b.a)({},t,r.add(n)))}if(!i&&e[t].has(n)){var s=new Set(e[t]);return s.delete(n),console.log("filter new: ",s),Object(p.a)(Object(p.a)({},e),{},Object(b.a)({},t,s))}return e}))},onReset:N,onSearch:function(e){B((function(t){return Object(p.a)(Object(p.a)({},t),{},{search:e})}))}})}),Object(o.jsxs)("main",{children:[Object(o.jsxs)("div",{id:"misc-buttons-container",children:[Object(o.jsxs)("button",{className:"custom-button",type:"button",id:"button-shuffle",onClick:function(){var e=n.slice();!function(e){for(var t,n,i=e.length-1;i>0;i--)t=Math.floor(Math.random()*(i+1)),n=e[i],e[i]=e[t],e[t]=n}(e),k(Object(p.a)(Object(p.a)({},w),{},{type:"none"})),r(e)},children:[Object(o.jsx)(O.a,{icon:v.c,"aria-hidden":"true"}),"SHUFFLE"]}),Object(o.jsxs)("button",{className:"custom-button",type:"button",id:"button-reset-list",onClick:function(){k({isAscending:!1,type:"airdate"}),d(1),N(),document.getElementById("filterForm").reset(),document.querySelector("#search-container > input").value=""},children:[Object(o.jsx)(O.a,{icon:v.g,"aria-hidden":"true"}),"RESET LIST"]})]}),Object(o.jsx)(f,{currPage:l,resultsPerPage:g,setCurrPage:d,maxResults:n.length}),Object(o.jsxs)("div",{id:"sort-main",children:[Object(o.jsx)("div",{id:"number-displayed-container",children:function(){var e=(l-1)*g,t=Math.min(e+g,n.length);return"Showing ".concat(e+1," - ").concat(t," of ").concat(n.length," Replay episodes")}()}),Object(o.jsxs)("div",{id:"sort-container",children:[Object(o.jsxs)("label",{htmlFor:"sort-type-select",children:["Sort:",Object(o.jsxs)("select",{name:"sort-type",id:"sort-type-select",value:w.type,onChange:function(e){k(Object(p.a)(Object(p.a)({},w),{},{type:e.target.value}))},children:[Object(o.jsx)("option",{value:"none",children:"-- Sort By --"}),Object(o.jsx)("option",{value:"airdate",children:"Air Date"}),Object(o.jsx)("option",{value:"number",children:"Ep. Number"}),Object(o.jsx)("option",{value:"views",children:"Views"}),Object(o.jsx)("option",{value:"likes",children:"Likes"}),Object(o.jsx)("option",{value:"like-ratio",children:"Like Ratio"}),Object(o.jsx)("option",{value:"video-length",children:"Video Length"})]})]}),Object(o.jsxs)("label",{htmlFor:"sort-direction-select",children:["Direction:",Object(o.jsxs)("select",{name:"sort-direction",id:"sort-direction-select",value:w.isAscending?"ascending":"descending",onChange:function(e){k(Object(p.a)(Object(p.a)({},w),{},{isAscending:"ascending"===e.target.value}))},children:[Object(o.jsx)("option",{value:"descending",children:"Descending"}),Object(o.jsx)("option",{value:"ascending",children:"Ascending"})]})]}),Object(o.jsxs)("label",{htmlFor:"max-displayed-select",children:["Per Page:",Object(o.jsxs)("select",{name:"max-displayed",id:"max-displayed-select",value:g,onChange:function(e){A(parseInt(e.target.value,10))},children:[Object(o.jsx)("option",{children:"5"}),Object(o.jsx)("option",{children:"10"}),Object(o.jsx)("option",{children:"25"}),Object(o.jsx)("option",{children:"50"}),Object(o.jsx)("option",{children:"100"})]})]})]})]}),function(){if(n.length){for(var e=(l-1)*g,t=Math.min(e+g,n.length),i=[],r=e;r<t;r++)i.push(Object(o.jsx)(S,{replayEpisode:n[r]},r));return i}}(),Object(o.jsx)(f,{currPage:l,resultsPerPage:g,setCurrPage:d,maxResults:n.length,scrollToTop:!0})]}),Object(o.jsxs)("div",{id:"stats",children:[Object(o.jsx)("h2",{children:"Stats:"}),Object(o.jsxs)("div",{id:"stats-total-time",children:[Object(o.jsx)("b",{children:"Total time of all Replay episodes: "}),function(){var e=j.totalTimeSeconds,t=Math.floor(e/86400),n=Math.floor((e-86400*t)/3600),i=Math.floor((e-86400*t-3600*n)/60),r=e-86400*t-3600*n-60*i;return"".concat(t," days, ").concat(n," hours, ").concat(i," minutes, and ").concat(r," seconds! (Total seconds: ").concat(m(e),")")}()]}),Object(o.jsxs)("div",{id:"stats-total-views",children:[Object(o.jsx)("b",{children:"Total views of all Replay episodes: "}),m(j.totalViews)]}),Object(o.jsxs)("div",{id:"stats-total-likes",children:[Object(o.jsx)("b",{children:"Total likes of all Replay episodes: "}),"".concat(m(j.totalLikes)," (").concat((100*j.totalLikes/(j.totalLikes+j.totalDislikes)).toFixed(1),"%)")]}),Object(o.jsxs)("div",{id:"stats-games-played",children:[Object(o.jsx)("b",{children:"Games played: "}),"".concat(m(j.gamesPlayed.size+50)," (estimate)")]})]})]})};n(38);var k=function(){return Object(o.jsxs)("div",{className:"loading-container",children:[Object(o.jsx)("div",{className:"icon",children:Object(o.jsx)(O.a,{icon:v.f})}),Object(o.jsx)("h2",{children:"Loading..."})]})};n(39);var I=function(){var e=Object(i.useRef)(null);return Object(i.useEffect)((function(){var t=document.getElementById("top-page");window.addEventListener("scroll",(function(){e.current.style.display=t.getBoundingClientRect().top<0?"block":"none"}))}),[]),Object(o.jsx)("div",{id:"jump-top-page-container",title:"Jump To Top",style:{display:"none"},onClick:function(){return document.getElementById("top-page").scrollIntoView({behavior:"smooth"})},ref:e,children:Object(o.jsx)("div",{children:Object(o.jsx)(O.a,{icon:v.a,"aria-hidden":"true"})})})},C=n(17);n(51);var R=function(e){var t=Object(i.useRef)(null);return Object(o.jsx)("div",{ref:t,id:"videoPlayer",className:"hide",children:Object(o.jsx)(C.a,{className:"iframeWrapper",opts:{height:360,width:640,playerVars:{playlist:["0ZtEkX8m6yg"],iv_load_policy:3,modestbranding:1,enablejsapi:1,loop:0,origin:"https://toddbrentlinger.github.io"}},onReady:function(){t.current.classList.remove("hide")}})})};var B=function(){var e=Object(i.useState)({replay:!0,superReplay:!1,testChamber:!1}),t=Object(c.a)(e,2),n=t[0],r=(t[1],Object(i.useState)(!0)),s=Object(c.a)(r,2),a=s[0],u=s[1];function h(){return n.replay?"Game Informer Replay":n.superReplay?"Game Informer Super Replay":n.testChamber?"Game Informer Test Chamber":void 0}return Object(i.useEffect)((function(){u(!0),fetch("data/gameInformerReplayFandomWikiData.json",{headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){e.forEach((function(e){return new j(e)})),u(!1)}))}),[]),Object(o.jsxs)("div",{className:"App",children:[Object(o.jsxs)("nav",{id:"topnav",children:[Object(o.jsxs)("div",{id:"category-select-btn-container",children:[Object(o.jsx)("button",{className:n.replay?"active":null,children:"Replay"}),Object(o.jsx)("button",{children:"Super Replay"}),Object(o.jsx)("button",{children:"Test Chamber"})]}),Object(o.jsx)(l,{})]}),Object(o.jsx)("header",{children:Object(o.jsx)("h1",{children:h()})}),function(){var e,t;if(n.replay)e="./images/replay-logo-alpha(2)_300.png 300w, ./images/replay-logo-alpha(2).png 610w",t="./images/replay-logo-alpha(2).png";else if(n.superReplay);else if(!n.testChamber)return;return Object(o.jsx)("img",{srcSet:e,sizes:"(max-width: 900px) 300px, 610px",src:t,alt:h()+" Logo",width:"610",height:"214"})}(),Object(o.jsx)("div",{id:"video-player-container",children:Object(o.jsx)(R,{})}),Object(o.jsx)("div",{id:"top-page"}),a?Object(o.jsx)(k,{}):Object(o.jsx)(w,{}),Object(o.jsx)(I,{}),Object(o.jsx)(d,{})]})},P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),i(e),r(e),s(e),a(e)}))};window.ReplayEpisode=j,a.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(B,{})}),document.getElementById("root")),P()}},[[52,1,2]]]);
//# sourceMappingURL=main.5c5d23b2.chunk.js.map