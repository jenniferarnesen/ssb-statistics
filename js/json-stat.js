/*

JSON-stat Javascript Toolkit v. 0.9.9 (JSON-stat v. 2.0 ready)
http://json-stat.com
https://github.com/badosa/JSON-stat

Copyright 2016 Xavier Badosa (http://xavierbadosa.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied. See the License for the specific language governing
permissions and limitations under the License.

*/

function JSONstat(t,e){return window===this?new JSONstat.jsonstat(t,e):void 0}var JSONstat=JSONstat||{};JSONstat.version="0.9.9",function(){"use strict";function t(t){return"[object Array]"===Object.prototype.toString.call(t)}function e(e,n){var i,s,r,l,a=function(t,e){var n,i,s=e!==!1;if(window.XDomainRequest&&/^(http(s)?:)?\/\//.test(t)){if(!s)return;i=new XDomainRequest,i.onload=function(){n=JSON.parse(i.responseText),e.call(JSONstat(n))},i.open("GET",t),i.send()}else if(i=new XMLHttpRequest,i.onreadystatechange=function(){if(4===i.readyState){var t=i.status;n=t&&i.responseText&&(t>=200&&300>t||304===t)?JSON.parse(i.responseText):null,s&&e.call(JSONstat(n))}},i.open("GET",t,s),i.send(null),!s)return n},o=function(e,n){var i,s=[];if("string"==typeof e&&(e=[e]),t(e)){if(e.length===n)return e;if(1===e.length){for(i=0;n>i;i++)s.push(e[0]);return s}}for(i=0;n>i;i++){var r=void 0===e[i]?null:e[i];s.push(r)}return s};if(this.length=0,this.id=[],null!==e&&void 0!==e)switch(this["class"]=e["class"]||"bundle",this["class"]){case"bundle":var u=[],h=0;if(this.error=null,this.length=0,"string"==typeof e&&e.length>0&&(e=a(e,"function"==typeof n?n:!1)),null===e||"object"!=typeof e)return this["class"]=null,void(void 0===e&&(delete this.id,delete this["class"],delete this.error,delete this.length));if(e.hasOwnProperty("error"))return void(this.error=e.error);if("dataset"===e["class"]||"collection"===e["class"])return JSONstat(e);for(s in e)h++,u.push(s);this.__tree__=e,this.length=h,this.id=u;break;case"dataset":e.hasOwnProperty("__tree__")?this.__tree__=i=e.__tree__:this.__tree__=i=e,this.label=i.label||null,this.note=i.note||null,this.link=i.link||null,this.href=i.href||null,this.updated=i.updated||null,this.source=i.source||null,this.extension=i.extension||null;var f,c=0,d=i.size||i.dimension&&i.dimension.size;if(i.hasOwnProperty("value")&&t(i.value))c=i.value.length;else{var p=1;for(f=d.length;f--;)p*=d[f];c=p}if(this.value=o(i.value,c),this.status=i.hasOwnProperty("status")?o(i.status,c):null,i.hasOwnProperty("dimension")){var v=i.dimension,g=i.role||!i.version&&v.role||null,y=i.id||v.id,_=d.length,b=function(t){g.hasOwnProperty(t)||(g[t]=null)};if(!t(y)||!t(d)||y.length!=_)return;if(this.length=_,this.id=y,g&&(b("time"),b("geo"),b("metric"),b("classification")),g&&null===g.classification){var m=[],w=["time","geo","metric"],O=function(t,e){for(var n=e.length;n--;)if(t===e[n])return!0;return!1};for(f=0;3>f;f++){var x=g[w[f]];null!==x&&(m=m.concat(x))}for(g.classification=[],f=0;_>f;f++)O(y[f],m)||g.classification.push(y[f]);0===g.classification.length&&(g.classification=null)}this.role=g,this.n=c;for(var S=0,k=this.length;k>S;S++)if(v[y[S]].category.hasOwnProperty("index")){if(t(v[y[S]].category.index)){var J={},N=v[y[S]].category.index;for(r=N.length,l=0;r>l;l++)J[N[l]]=l;v[y[S]].category.index=J}}else{var D=0;v[y[S]].category.index={};for(s in v[y[S]].category.label)v[y[S]].category.index[s]=D++}}else this.length=0;break;case"dimension":i=e.__tree__;var P=[],j=i.category;if(!e.hasOwnProperty("__tree__")||!i.hasOwnProperty("category"))return;if(!j.hasOwnProperty("label")){j.label={};for(s in j.index)j.label[s]=s}for(s in j.index)P[j.index[s]]=s;this.__tree__=i,this.label=i.label||null,this.note=i.note||null,this.link=i.link||null,this.href=i.href||null,this.id=P,this.length=P.length,this.role=e.role,this.hierarchy=j.hasOwnProperty("child"),this.extension=i.extension||null;break;case"category":var z=e.child;this.id=z,this.length=null===z?0:z.length,this.index=e.index,this.label=e.label,this.note=e.note||null,this.unit=e.unit,this.coordinates=e.coord;break;case"collection":if(this.length=0,this.label=e.label||null,this.note=e.note||null,this.link=e.link||null,this.href=e.href||null,this.updated=e.updated||null,this.source=e.source||null,this.extension=e.extension||null,null!==this.link&&e.link.item){var T=e.link.item;if(this.length=t(T)?T.length:0,this.length)for(l=0;l<this.length;l++)this.id[l]=T[l].href}}}e.prototype.Item=function(t){if(null===this||"collection"!==this["class"]||!this.length)return null;if("number"==typeof t)return t>this.length||0>t?null:this.link.item[t];var e,n=[];if("object"==typeof t){if(!t["class"]&&!t.follow)return null;t["class"]?e="dataset"===t["class"]&&"boolean"==typeof t.embedded?t.embedded===!0?function(t,e,i){var s=t.link.item[e];i["class"]===s["class"]&&s.id&&s.size&&s.dimension&&n.push(s)}:function(t,e,i){var s=t.link.item[e];i["class"]!==s["class"]||s.id&&s.size&&s.dimension||n.push(s)}:function(t,e,i){i["class"]===t.link.item[e]["class"]&&n.push(t.link.item[e])}:t.follow&&(e=function(t,e){n.push(JSONstat(t.id[e]))})}else e=function(t,e){n.push(t.link.item[e])};for(var i=0;i<this.length;i++)e(this,i,t);return n},e.prototype.Dataset=function(t){if(null===this)return null;if("dataset"===this["class"])return void 0!==t?this:[this];var n,i=[],s=0;if("collection"===this["class"]){var r=this.Item({"class":"dataset",embedded:!0});if(void 0===t){for(n=r.length;n>s;s++)i.push(JSONstat(r[s]));return i}if("number"==typeof t&&t>=0&&t<r.length)return JSONstat(r[t]);if("string"==typeof t)for(n=r.length;n>s;s++)if(r[s].href===t)return JSONstat(r[s]);return null}if("bundle"!==this["class"])return null;if(void 0===t){for(n=this.id.length;n>s;s++)i.push(this.Dataset(this.id[s]));return i}if("number"==typeof t){var l=this.id[t];return void 0!==l?this.Dataset(l):null}var a=this.__tree__[t];return void 0===a?null:new e({"class":"dataset",__tree__:a})},e.prototype.Dimension=function(t){var n,i=[],s=this.id.length,r=function(t,e){if(null!==t)for(var n in t)for(var i=null!==t[n]?t[n].length:0;i--;)if(t[n][i]===e)return n;return null};if(null===this||"dataset"!==this["class"])return null;if(void 0===t){for(n=0;s>n;n++)i.push(this.Dimension(this.id[n]));return i}if("number"==typeof t){var l=this.id[t];return void 0!==l?this.Dimension(l):null}var a=this.role;if("object"==typeof t){if(t.hasOwnProperty("role")){for(n=0;s>n;n++){var o=this.id[n];r(a,o)===t.role&&i.push(this.Dimension(o))}return void 0===i[0]?null:i}return null}var u=this.__tree__.dimension;if(void 0===u)return null;var h=u[t];return void 0===h?null:new e({"class":"dimension",__tree__:h,role:r(a,t)})},e.prototype.Category=function(t){if(null===this||"dimension"!==this["class"])return null;if(void 0===t){for(var n=[],i=0,s=this.id.length;s>i;i++)n.push(this.Category(this.id[i]));return n}if("number"==typeof t){var r=this.id[t];return void 0!==r?this.Category(r):null}var l=this.__tree__.category;if(void 0===l)return null;var a=l.index[t];if(void 0===a)return null;var o=l.unit&&l.unit[t]||null,u=l.coordinates&&l.coordinates[t]||null,h=l.child&&l.child[t]||null,f=l.note&&l.note[t]||null;return new e({"class":"category",index:a,label:l.label[t],note:f,child:h,unit:o,coord:u})},e.prototype.Data=function(e){var n,i,s=[],r=function(t){for(var e in t)if(t.hasOwnProperty(e))return e},l=function(t,e){for(var n=[],i=t.dimension,s=t.id||i.id,l=t.size||i&&i.size,a=0,o=s.length;o>a;a++){var u=s[a],h=e[u];n.push("string"==typeof h?h:1===l[a]?r(i[u].category.index):null)}return n};if(null===this||"dataset"!==this["class"])return null;if(void 0===e){for(i=this.value.length,n=0;i>n;n++)s.push(this.Data(n));return s}if("number"==typeof e){var a=this.value[e];return void 0!==a?{value:a,status:this.status?this.status[e]:null}:null}var o=this.__tree__,u=o.size||o.dimension&&o.dimension.size,h=u.length;if(t(e)){if(this.length!==e.length)return null;var f=1,c=0,d=[],p=[];for(n=0;h>n;n++)if(void 0!==e[n]){if("number"!=typeof e[n]||e[n]>=u[n])return null;f*=n>0?u[h-n]:1,c+=f*e[h-n-1]}else d.push(n),p.push(u[n]);if(d.length>1)return null;if(1===d.length){for(var v=0,g=p[0];g>v;v++){var y=[];for(n=0;h>n;n++)n!==d[0]?y.push(e[n]):y.push(v);s.push(this.Data(y))}return s}return{value:this.value[c],status:this.status?this.status[c]:null}}var _=l(o,e),b=[],m=o.dimension,w=o.id||m.id;for(n=0,i=_.length;i>n;n++)b.push(m[w[n]].category.index[_[n]]);return this.Data(b)},e.prototype.toTable=function(t,e){if(null===this||"dataset"!==this["class"])return null;1==arguments.length&&"function"==typeof t&&(e=t,t=null);var n,i,s,r,l,a=this.__tree__;if(t=t||{field:"label",content:"label",vlabel:"Value",slabel:"Status",type:"array",status:!1},"function"==typeof e){n=this.toTable(t);var o=[],u="array"!==t.type?0:1,h="object"!==t.type?n.slice(u):n.rows.slice(0);for(l=h.length,i=0;l>i;i++){var f=e.call(this,h[i],i);void 0!==f&&o.push(f)}return"object"===t.type?{cols:n.cols,rows:o}:("array"===t.type&&o.unshift(n[0]),o)}if("arrobj"===t.type){n=this.toTable({field:"id",content:t.content,status:t.status});var c=[],d=n.shift();for(l=n.length,i=0;l>i;i++){var p={};for(s=n[i].length;s--;)p[d[s]]=n[i][s];c.push(p)}return c}var v,g,y,_,b="id"===t.field;if("object"===t.type){var m="number"==typeof this.value[0]||null===this.value[0]?"number":"string";v=function(t,e){var n=b&&t||e||t;T.push({id:t,label:n,type:"string"})},g=function(t,e,n){var i=b&&"value"||t||"Value",s=b&&"status"||e||"Status";n&&T.push({id:"status",label:s,type:"string"}),T.push({id:"value",label:i,type:m})},y=function(t){B.push({v:t})},_=function(t){B.push({v:t}),V.push({c:B})}}else v=function(t,e){var n=b&&t||e||t;T.push(n)},g=function(t,e,n){var i=b&&"value"||t||"Value",s=b&&"status"||e||"Status";n&&T.push(s),T.push(i),z.push(T)},y=function(t){B.push(t)},_=function(t){B.push(t),z.push(B)};var w=a.dimension,O=a.id||w.id,x=a.size||w.size,S=O.length;if(S!=x.length)return!1;var k=[],J=1,N=1,D=[],P=[],j=[],z=[],T=[],V=[];for(i=0;S>i;i++){var q=O[i],C=w[q].label;v(q,C),J*=x[i],N*=x[i];var R=[];for(s=0;s<x[i];s++)for(var X in w[O[i]].category.index)if(w[O[i]].category.index[X]===s){var E="id"!==t.content&&w[O[i]].category.label?w[O[i]].category.label[X]:X;R.push(E)}k.push(R),D.push(N)}for(g(t.vlabel,t.slabel,t.status),l=k.length,i=0;l>i;i++){for(var G=[],I=0,A=k[i].length;A>I;I++)for(var H=0;H<J/D[i];H++)G.push(k[i][I]);P.push(G)}for(l=P.length,i=0;l>i;i++){var L=[],M=0;for(r=0;J>r;r++)L.push(P[i][M]),M++,M===P[i].length&&(M=0);j.push(L)}for(r=0;J>r;r++){var B=[];l=P.length;for(var F=0;l>F;F++)y(j[F][r]);t.status&&y(this.status?this.status[r]:null),_(this.value[r])}return"object"===t.type?{cols:T,rows:V}:z},e.prototype.node=function(){return this.__tree__},e.prototype.toString=function(){return this["class"]},e.prototype.toValue=function(){return this.length},JSONstat.jsonstat=e}();