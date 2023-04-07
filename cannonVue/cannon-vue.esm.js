import { defineComponent as k, toRefs as P, computed as m, openBlock as u, createElementBlock as d, createElementVNode as i, toDisplayString as l, createCommentVNode as _, resolveComponent as w, renderSlot as p, createBlock as y, Fragment as B } from "vue";
const f = (e) => {
  const s = "chihuoui-" + e;
  return {
    componentName: s,
    create: function(o) {
      return o.baseName = e, o.name = s, o.install = (r) => {
        r.component(o.name, o);
      }, k(o);
    }
  };
}, { componentName: Y, create: D } = f("price"), H = D({
  props: {
    thousand: {
      type: Boolean,
      default: !0
    },
    needSymbol: {
      type: Boolean,
      default: !0
    },
    symbol: {
      type: String,
      default: "¥"
    },
    price: {
      type: [String, Number],
      default: 0
    },
    decimalPoint: {
      type: Number,
      default: 2
    }
  },
  emits: [],
  setup(e) {
    const { thousand: s, needSymbol: o, symbol: r, price: c, decimalPoint: h } = P(e), a = (n) => String(n).indexOf(".") > -1, g = m(() => r.value || "¥"), b = m(() => N(c.value)), S = m(() => $(c.value)), $ = (n) => {
      let t = Number(n);
      return a(n) && (t = Number(t).toFixed(h.value), t = t.split(".")[1]), a(n) || (t = String(0)), t = `0.${t}`, t = Number(t).toFixed(h.value), t = t.substring(2, t.length), t;
    }, N = (n) => {
      if (Number(n) == 0)
        return 0;
      let t = Number(n);
      return a(t) && (t = String(t).split(".")[0]), s.value && (t = String(t || 0).replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")), t;
    };
    return {
      getDecimal: S,
      getSymbol: g,
      getThousand: b
    };
  }
});
const v = (e, s) => {
  const o = e.__vccOpts || e;
  for (const [r, c] of s)
    o[r] = c;
  return o;
}, F = { class: "chihuoui-price" }, T = {
  key: 0,
  class: "chihuoui-price__symbol"
}, E = { class: "chihuoui-price__number" }, I = {
  key: 1,
  class: "chihuoui-price__point"
}, O = { class: "chihuoui-price__decimal" };
function U(e, s, o, r, c, h) {
  return u(), d("view", F, [
    i("view", null, [
      e.needSymbol ? (u(), d("view", T, l(e.getSymbol), 1)) : _("", !0),
      i("view", E, l(e.getThousand), 1),
      e.decimalPoint !== 0 ? (u(), d("view", I, " . ")) : _("", !0),
      i("view", O, l(e.getDecimal), 1)
    ])
  ]);
}
const V = /* @__PURE__ */ v(H, [["render", U], ["__scopeId", "data-v-4cb656f5"]]), { componentName: Z, create: G } = f("card"), R = G({
  components: { Price: V },
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    symbol: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: ""
    },
    vipPrice: {
      type: String,
      default: ""
    },
    shopDesc: {
      type: String,
      default: ""
    },
    delivery: {
      type: String,
      default: ""
    },
    shopName: {
      type: String,
      default: ""
    },
    isNeedPrice: {
      type: Boolean,
      default: !0
    }
  },
  emits: [],
  setup(e, { emit: s, slots: o }) {
    return {
      isHaveSlot: (c) => o[c]
    };
  }
});
const j = { class: "chihuoui-card" }, q = { class: "chihuoui-card__left" }, z = ["src"], A = { class: "chihuoui-card__right" }, J = { class: "chihuoui-card__right-title" }, K = {
  key: 0,
  class: "chihuoui-card__right-price"
}, L = { class: "chihuoui-card__right-other" }, M = { class: "chihuoui-card__right-shop" }, Q = { class: "chihuoui-card__right-shop-name" };
function W(e, s, o, r, c, h) {
  const a = w("Price");
  return u(), d("div", j, [
    i("div", q, [
      i("img", {
        src: e.imgUrl,
        alt: ""
      }, null, 8, z)
    ]),
    i("div", A, [
      i("div", J, l(e.title), 1),
      p(e.$slots, "prolist", {}, void 0, !0),
      e.isNeedPrice ? (u(), d("div", K, [
        e.isHaveSlot("price") ? p(e.$slots, "price", { key: 0 }, void 0, !0) : (u(), y(a, {
          key: 1,
          symbol: e.symbol,
          price: e.price
        }, null, 8, ["symbol", "price"])),
        e.isHaveSlot("origin") ? p(e.$slots, "origin", { key: 2 }, void 0, !0) : (u(), y(a, {
          key: 3,
          class: "chihuoui-card__right-price-origin",
          price: e.vipPrice,
          symbol: e.symbol
        }, null, 8, ["price", "symbol"]))
      ])) : _("", !0),
      i("div", L, [
        e.isHaveSlot("shop-custom-desc") ? p(e.$slots, "shop-custom-desc", { key: 0 }, void 0, !0) : (u(), d(B, { key: 1 }, [
          i("span", null, l(e.shopDesc), 1),
          i("span", null, l(e.delivery), 1)
        ], 64))
      ]),
      i("div", M, [
        i("div", Q, l(e.shopName), 1),
        e.isHaveSlot("footer") ? p(e.$slots, "footer", { key: 0 }, void 0, !0) : _("", !0)
      ])
    ])
  ]);
}
const C = /* @__PURE__ */ v(R, [["render", W], ["__scopeId", "data-v-f37ff1eb"]]);
export {
  C as Card
};
