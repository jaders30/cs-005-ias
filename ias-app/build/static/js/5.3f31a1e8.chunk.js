(this["webpackJsonporbit-app"]=this["webpackJsonporbit-app"]||[]).push([[5],{134:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){var t=e.title;return r.a.createElement("div",{className:"my-1 sm:my-4"},r.a.createElement("h2",{className:"text-gray-800 font-bold text-2xl"},t))}},140:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=function(e){return"$".concat(e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,"))}},269:function(e,t,a){"use strict";a.r(t);var n=a(77);var r=a(86);function c(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var m=a(42),l=a.n(m),i=a(60),s=a(7),u=a(0),o=a.n(u),d=a(134),b=a(83),f=a(140),v=a(29),p=a(25),x=a(36),E=a(38),N=a(43),h=p.a().shape({name:p.b().required("Name is required"),itemNumber:p.b().required("Item number is required"),unitPrice:p.b().required("Unit price is required")}),y=function(e){var t=e.onSubmit;return o.a.createElement(v.c,{initialValues:{name:"",itemNumber:"",unitPrice:""},onSubmit:function(e,a){var n=a.resetForm;return t(e,n)},validationSchema:h,validateOnBlur:!1},(function(){return o.a.createElement(v.b,null,o.a.createElement("div",{className:"flex flex-col md:flex-row"},o.a.createElement("div",{className:"w-full md:w-1/3 mr-2 mb-2 sm:mb-0"},o.a.createElement("div",{className:"mb-1"},o.a.createElement(x.a,{text:"Item Name"})),o.a.createElement(E.a,{ariaLabel:"Name",name:"name",type:"text",placeholder:"Item Name"})),o.a.createElement("div",{className:"w-full md:w-1/3 mr-2 mb-2 sm:mb-0"},o.a.createElement("div",{className:"mb-1"},o.a.createElement(x.a,{text:"Item Number"})),o.a.createElement(E.a,{ariaLabel:"Item Number",name:"itemNumber",type:"text",placeholder:"Item Number"})),o.a.createElement("div",{className:"w-full md:w-1/3 mr-2 mb-2 sm:mb-0"},o.a.createElement("div",{className:"mb-1"},o.a.createElement(x.a,{text:"Unit Price"})),o.a.createElement(E.a,{ariaLabel:"Unit Price",name:"unitPrice",type:"number",placeholder:"Unit Price"}))),o.a.createElement("div",{className:"flex"},o.a.createElement("div",{className:"w-full sm:w-1/4 mt-4"},o.a.createElement(N.a,{type:"submit",text:"Submit"}))))}))},w=function(e){var t=e.text,a=e.onClick;return o.a.createElement("button",{onClick:a,className:"text-red-600 text-sm rounded border border-red-600 px-2 hover:text-white hover:bg-red-600"},t)},g=a(63),j=a(62),O=function(e){var t=e.children;return o.a.createElement("div",{className:"bg-white rounded shadow-md mb-4 p-4"},t)},I=function(e){var t=e.item,a=e.onDelete;return o.a.createElement("div",{className:"flex"},o.a.createElement("img",{className:"rounded w-32 h-full",src:t.image,alt:"inventory"}),o.a.createElement("div",{className:"flex justify-between w-full"},o.a.createElement("div",{className:"flex flex-col ml-4 justify-between"},o.a.createElement("div",null,o.a.createElement("p",{className:"font-bold text-xl text-gray-900"},t.name),o.a.createElement("p",{className:"text-sm text-gray-600"},t.itemNumber)),o.a.createElement("div",null,o.a.createElement("p",{className:"text-gray-700 text-xl"},Object(f.a)(t.unitPrice)))),o.a.createElement("div",{className:"self-end"},o.a.createElement(w,{text:"Delete",onClick:function(){return a(t)}}))))},S=function(e){var t=e.onSubmit;return o.a.createElement("section",{className:"bg-white p-4 shadow-md rounded-md"},o.a.createElement("p",{className:"font-bold mb-2"},"New Inventory Item"),o.a.createElement(y,{onSubmit:t}))};t.default=function(){var e=Object(u.useContext)(b.a),t=Object(u.useState)([]),a=Object(s.a)(t,2),n=a[0],r=a[1],m=Object(u.useState)(),f=Object(s.a)(m,2),v=f[0],p=f[1],x=Object(u.useState)(),E=Object(s.a)(x,2),N=E[0],h=E[1];Object(u.useEffect)((function(){(function(){var t=Object(i.a)(l.a.mark((function t(){var a,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.authAxios.get("inventory");case 3:a=t.sent,n=a.data,r(n),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log("the err",t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(){return t.apply(this,arguments)}})()()}),[e]);var y=function(){var t=Object(i.a)(l.a.mark((function t(a,m){var i,s,u;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.authAxios.post("inventory",a);case 3:i=t.sent,s=i.data,r([].concat(c(n),[s.inventoryItem])),m(),p(s.message),h(null),t.next=16;break;case 11:t.prev=11,t.t0=t.catch(0),u=t.t0.response.data,p(null),h(u.message);case 16:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e,a){return t.apply(this,arguments)}}(),w=function(){var t=Object(i.a)(l.a.mark((function t(a){var c,m,i;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!window.confirm("Are you sure you want to delete this item?")){t.next=7;break}return t.next=4,e.authAxios.delete("inventory/".concat(a._id));case 4:c=t.sent,m=c.data,r(n.filter((function(e){return e._id!==m.deletedItem._id})));case 7:t.next=13;break;case 9:t.prev=9,t.t0=t.catch(0),i=t.t0.response.data,h(i.message);case 13:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}();return o.a.createElement(o.a.Fragment,null,o.a.createElement(d.a,{title:"Inventory"}),v&&o.a.createElement(j.a,{text:v}),N&&o.a.createElement(g.a,{text:N}),o.a.createElement("div",{className:"mb-4"},o.a.createElement(S,{onSubmit:y})),n&&n.length?n.map((function(e){return o.a.createElement(O,{key:e._id},o.a.createElement(I,{item:e,onDelete:w}))})):"No Inventory Items")}}}]);
//# sourceMappingURL=5.3f31a1e8.chunk.js.map