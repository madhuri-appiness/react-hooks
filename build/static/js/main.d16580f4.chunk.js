(this.webpackJsonphooksapp=this.webpackJsonphooksapp||[]).push([[0],{29:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),o=n(23),s=n.n(o),a=(n(29),n(6)),r=n(7),u=n(9),l=n(8),j=n(11),h=n(1),d=n(2),b=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return Object(d.jsx)("div",{className:"Welcome",children:Object(d.jsx)("p",{children:"This is your public-facing component."})})}}]),n}(c.Component),p=n(24),O=n.n(p),f=n(13),k=n.n(f),x=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var c;return Object(a.a)(this,n),(c=t.call(this,e)).state={keycloak:null,authenticated:!1},c}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=O()("./keycloak.json");t.init({onLoad:"check-sso",checkLoginIframe:!1}).success((function(n){n?-1!==t.realmAccess.roles.indexOf("ROLE_ADMIN")?e.setState({keycloak:t,authenticated:n}):t.logout():t.login()})),k.a.interceptors.request.use((function(e){return e.headers=Object.assign({},e.headers,{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+t.token}),e})),k.a.interceptors.response.use((function(e){return e}),(function(e){return 401===e.response.status&&(t.redirectUri="http://localhost:3000",t.logout()),e}))}},{key:"render",value:function(){return console.log(this.state.keycloak,this.state.authenticated),this.state.keycloak?this.state.authenticated?Object(d.jsx)("div",{children:Object(d.jsx)("p",{children:"This is a Keycloak-secured component of your application. You shouldn't be able to see this unless you've authenticated with Keycloak."})}):Object(d.jsx)("div",{children:"Unable to authenticate!"}):Object(d.jsx)("div",{children:"Initializing Keycloak..."})}}]),n}(c.Component),y=(n(52),function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return Object(d.jsx)(j.a,{children:Object(d.jsxs)("div",{className:"container",children:[Object(d.jsxs)("ul",{children:[Object(d.jsx)("li",{children:Object(d.jsx)(j.b,{to:"/",children:"public component"})}),Object(d.jsx)("li",{children:Object(d.jsx)(j.b,{to:"/secured",children:"secured component"})})]}),Object(d.jsxs)(h.c,{children:[Object(d.jsx)(h.a,{exact:!0,path:"/",element:Object(d.jsx)(b,{})}),Object(d.jsx)(h.a,{path:"/secured",element:Object(d.jsx)(x,{})})]})]})})}}]),n}(c.Component)),m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,54)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),c(e),i(e),o(e),s(e)}))};s.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(y,{})}),document.getElementById("root")),m()}},[[53,1,2]]]);
//# sourceMappingURL=main.d16580f4.chunk.js.map