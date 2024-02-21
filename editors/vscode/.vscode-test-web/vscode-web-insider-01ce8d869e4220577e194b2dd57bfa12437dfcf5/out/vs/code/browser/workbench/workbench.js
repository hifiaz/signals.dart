/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/(function(){var v=["vs/code/browser/workbench/workbench","require","exports","vs/base/browser/browser","vs/base/browser/window","vs/base/common/buffer","vs/base/common/event","vs/base/common/lifecycle","vs/base/common/marshalling","vs/base/common/network","vs/base/common/path","vs/base/common/resources","vs/base/common/strings","vs/base/common/uri","vs/platform/product/common/product","vs/platform/window/common/window","vs/workbench/workbench.web.main"],E=function(g){for(var u=[],d=0,o=g.length;d<o;d++)u[d]=v[g[d]];return u};define(v[0],E([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]),function(g,u,d,o,$,P,A,R,f,b,S,C,h,U,l,T){"use strict";Object.defineProperty(u,"__esModule",{value:!0}),u.LocalStorageSecretStorageProvider=void 0;class O{async seal(e){return e}async unseal(e){return e}}var w;(function(n){n.ALGORITHM="AES-GCM",n[n.KEY_LENGTH=256]="KEY_LENGTH",n[n.IV_LENGTH=12]="IV_LENGTH"})(w||(w={}));class I{static supported(){return!!crypto.subtle}constructor(e){this.b=e}async seal(e){const t=o.$$P.crypto.getRandomValues(new Uint8Array(12)),r=await o.$$P.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt"]),s=new Uint8Array(await o.$$P.crypto.subtle.exportKey("raw",r)),i=await this.c(s),c=new TextEncoder().encode(e),y=await o.$$P.crypto.subtle.encrypt({name:"AES-GCM",iv:t},i,c),m=new Uint8Array([...s,...t,...new Uint8Array(y)]);return(0,$.$Me)($.$se.wrap(m))}async unseal(e){const t=(0,$.$Le)(e);if(t.byteLength<60)throw Error("Invalid length for the value for credentials.crypto");const r=256/8,s=t.slice(0,r),i=t.slice(r,r+12),c=t.slice(r+12),y=await this.c(s.buffer),m=await o.$$P.crypto.subtle.decrypt({name:"AES-GCM",iv:i.buffer},y,c.buffer);return new TextDecoder().decode(new Uint8Array(m))}async c(e){if(!e||e.byteLength!==256/8)throw Error("Invalid length for clientKey");const t=await this.d(),r=new Uint8Array(256/8);for(let s=0;s<r.byteLength;s++)r[s]=e[s]^t[s];return o.$$P.crypto.subtle.importKey("raw",r,{name:"AES-GCM",length:256},!0,["encrypt","decrypt"])}async d(){if(this.a)return this.a;let e=0,t;for(;e<=3;)try{const r=await fetch(this.b,{credentials:"include",method:"POST"});if(!r.ok)throw new Error(r.statusText);const s=new Uint8Array(await await r.arrayBuffer());if(s.byteLength!==256/8)throw Error("The key retrieved by the server is not 256 bit long.");return this.a=s,this.a}catch(r){t=r,e++,await new Promise(s=>setTimeout(s,e*e*100))}throw t}}class k{constructor(e){this.c=e,this.a="secrets.provider",this.b=this.d(),this.type="persisted"}async d(){const e=this.f(),t=localStorage.getItem(this.a);if(t)try{const r=JSON.parse(await this.c.unseal(t));return{...e,...r}}catch(r){console.error("Failed to decrypt secrets from localStorage",r),localStorage.removeItem(this.a)}return e}f(){let e;const t=o.$$P.document.getElementById("vscode-workbench-auth-session"),r=t?t.getAttribute("data-settings"):void 0;if(r)try{e=JSON.parse(r)}catch{}if(!e)return{};const s={};if(s[`${U.default.urlProtocol}.loginAccount`]=JSON.stringify(e),e.providerId!=="github")return console.error(`Unexpected auth provider: ${e.providerId}. Expected 'github'.`),s;const i=JSON.stringify({extensionId:"vscode.github-authentication",key:"github.auth"});return s[i]=JSON.stringify(e.scopes.map(c=>({id:e.id,scopes:c,accessToken:e.accessToken}))),s}async get(e){return(await this.b)[e]}async set(e,t){const r=await this.b;r[e]=t,this.b=Promise.resolve(r),this.g()}async delete(e){const t=await this.b;delete t[e],this.b=Promise.resolve(t),this.g()}async g(){try{const e=await this.c.seal(JSON.stringify(await this.b));localStorage.setItem(this.a,e)}catch(e){console.error(e)}}}u.LocalStorageSecretStorageProvider=k;class p extends A.$Tc{static{this.a=0}static{this.b=["scheme","authority","path","query","fragment"]}constructor(e){super(),this.m=e,this.c=this.B(new P.$5d),this.onCallback=this.c.event,this.f=new Set,this.g=Date.now(),this.h=void 0}create(e={}){const t=++p.a,r=[`vscode-reqid=${t}`];for(const s of p.b){const i=e[s];i&&r.push(`vscode-${s}=${encodeURIComponent(i)}`)}if(!(e.authority==="vscode.github-authentication"&&e.path==="/dummy")){const s=`vscode-web.url-callbacks[${t}]`;localStorage.removeItem(s),this.f.add(t),this.n()}return h.URI.parse(o.$$P.location.href).with({path:this.m,query:r.join("&")})}n(){if(this.j)return;const e=()=>this.s();o.$$P.addEventListener("storage",e),this.j={dispose:()=>o.$$P.removeEventListener("storage",e)}}r(){this.j?.dispose(),this.j=void 0}async s(){const e=Date.now()-this.g;e>1e3?this.t():this.h===void 0&&(this.h=setTimeout(()=>{this.h=void 0,this.t()},1e3-e))}t(){let e;for(const t of this.f){const r=`vscode-web.url-callbacks[${t}]`,s=localStorage.getItem(r);if(s!==null){try{this.c.fire(h.URI.revive(JSON.parse(s)))}catch(i){console.error(i)}e=e??new Set(this.f),e.delete(t),localStorage.removeItem(r)}}e&&(this.f=e,this.f.size===0&&this.r()),this.g=Date.now()}}class a{static{this.a="ew"}static{this.b="folder"}static{this.c="workspace"}static{this.d="payload"}static create(e){let t=!1,r,s=Object.create(null);return new URL(document.location.href).searchParams.forEach((c,y)=>{switch(y){case a.b:e.remoteAuthority&&c.startsWith(b.$gc.sep)?r={folderUri:h.URI.from({scheme:f.Schemas.vscodeRemote,path:c,authority:e.remoteAuthority})}:r={folderUri:h.URI.parse(c)},t=!0;break;case a.c:e.remoteAuthority&&c.startsWith(b.$gc.sep)?r={workspaceUri:h.URI.from({scheme:f.Schemas.vscodeRemote,path:c,authority:e.remoteAuthority})}:r={workspaceUri:h.URI.parse(c)},t=!0;break;case a.a:r=void 0,t=!0;break;case a.d:try{s=(0,R.$Mh)(c)}catch(m){console.error(m)}break}}),t||(e.folderUri?r={folderUri:h.URI.revive(e.folderUri)}:e.workspaceUri&&(r={workspaceUri:h.URI.revive(e.workspaceUri)})),new a(r,s,e)}constructor(e,t,r){this.workspace=e,this.payload=t,this.f=r,this.trusted=!0}async open(e,t){if(t?.reuse&&!t.payload&&this.j(this.workspace,e))return!0;const r=this.g(e,t);if(r){if(t?.reuse)return o.$$P.location.href=r,!0;{let s;return(0,d.$sQ)()?s=o.$$P.open(r,"_blank","toolbar=no"):s=o.$$P.open(r),!!s}}return!1}g(e,t){let r;if(!e)r=`${document.location.origin}${document.location.pathname}?${a.a}=true`;else if((0,l.$3C)(e)){const s=this.h(e.folderUri);r=`${document.location.origin}${document.location.pathname}?${a.b}=${s}`}else if((0,l.$2C)(e)){const s=this.h(e.workspaceUri);r=`${document.location.origin}${document.location.pathname}?${a.c}=${s}`}return t?.payload&&(r+=`&${a.d}=${encodeURIComponent(JSON.stringify(t.payload))}`),r}h(e){return this.f.remoteAuthority&&e.scheme===f.Schemas.vscodeRemote?encodeURIComponent(`${b.$gc.sep}${(0,C.$3e)(e.path,b.$gc.sep)}`).replaceAll("%2F","/"):encodeURIComponent(e.toString(!0))}j(e,t){return!e||!t?e===t:(0,l.$3C)(e)&&(0,l.$3C)(t)?(0,S.$Kg)(e.folderUri,t.folderUri):(0,l.$2C)(e)&&(0,l.$2C)(t)?(0,S.$Kg)(e.workspaceUri,t.workspaceUri):!1}hasRemote(){if(this.workspace){if((0,l.$3C)(this.workspace))return this.workspace.folderUri.scheme===f.Schemas.vscodeRemote;if((0,l.$2C)(this.workspace))return this.workspace.workspaceUri.scheme===f.Schemas.vscodeRemote}return!0}}function L(n){const e=document.cookie.split("; ");for(const t of e)if(t.startsWith(n+"="))return t.substring(n.length+1)}(function(){const n=o.$$P.document.getElementById("vscode-workbench-web-configuration"),e=n?n.getAttribute("data-settings"):void 0;if(!n||!e)throw new Error("Missing web configuration element");const t=JSON.parse(e),r=L("vscode-secret-key-path"),s=r&&I.supported()?new I(r):new O;(0,T.create)(o.$$P.document.body,{...t,windowIndicator:t.windowIndicator??{label:"$(remote)",tooltip:`${U.default.nameShort} Web`},settingsSyncOptions:t.settingsSyncOptions?{enabled:t.settingsSyncOptions.enabled}:void 0,workspaceProvider:a.create(t),urlCallbackProvider:new p(t.callbackRoute),secretStorageProvider:t.remoteAuthority&&!r?void 0:new k(s)})})()})}).call(this);

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/01ce8d869e4220577e194b2dd57bfa12437dfcf5/core/vs/code/browser/workbench/workbench.js.map
