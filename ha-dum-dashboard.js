const Mt = globalThis, Ut = Mt.ShadowRoot && (Mt.ShadyCSS === void 0 || Mt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Bt = /* @__PURE__ */ Symbol(), de = /* @__PURE__ */ new WeakMap();
let Se = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ut && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = de.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && de.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Me = (s) => new Se(typeof s == "string" ? s : s + "", void 0, Bt), W = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((n, i, o) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[o + 1], s[0]);
  return new Se(e, s, Bt);
}, Ue = (s, t) => {
  if (Ut) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), i = Mt.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = e.cssText, s.appendChild(n);
  }
}, he = Ut ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return Me(e);
})(s) : s;
const { is: Be, defineProperty: Ie, getOwnPropertyDescriptor: He, getOwnPropertyNames: We, getOwnPropertySymbols: Ve, getPrototypeOf: Ye } = Object, Ot = globalThis, ce = Ot.trustedTypes, qe = ce ? ce.emptyScript : "", Ke = Ot.reactiveElementPolyfillSupport, $t = (s, t) => s, Et = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? qe : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, It = (s, t) => !Be(s, t), ue = { attribute: !0, type: String, converter: Et, reflect: !1, useDefault: !1, hasChanged: It };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ot.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let dt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ue) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, n, e);
      i !== void 0 && Ie(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: i, set: o } = He(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: i, set(a) {
      const r = i?.call(this);
      o?.call(this, a), this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty($t("elementProperties"))) return;
    const t = Ye(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($t("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($t("properties"))) {
      const e = this.properties, n = [...We(e), ...Ve(e)];
      for (const i of n) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [n, i] of e) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const i = this._$Eu(e, n);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) e.unshift(he(i));
    } else t !== void 0 && e.push(he(t));
    return e;
  }
  static _$Eu(t, e) {
    const n = e.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const n of e.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ue(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$ET(t, e) {
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : Et).toAttribute(e, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = n.getPropertyOptions(i), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Et;
      this._$Em = i;
      const r = a.fromAttribute(e, o.type);
      this[i] = r ?? this._$Ej?.get(i) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, i = !1, o) {
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (o = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? It)(o, e) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: n, reflect: i, wrapped: o }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, o] of n) {
        const { wrapped: a } = o, r = this[i];
        a !== !0 || this._$AL.has(i) || r === void 0 || this.C(i, void 0, o, r);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
dt.elementStyles = [], dt.shadowRootOptions = { mode: "open" }, dt[$t("elementProperties")] = /* @__PURE__ */ new Map(), dt[$t("finalized")] = /* @__PURE__ */ new Map(), Ke?.({ ReactiveElement: dt }), (Ot.reactiveElementVersions ??= []).push("2.1.2");
const Ht = globalThis, pe = (s) => s, Tt = Ht.trustedTypes, me = Tt ? Tt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ce = "$lit$", tt = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + tt, Ge = `<${Ee}>`, at = document, wt = () => at.createComment(""), kt = (s) => s === null || typeof s != "object" && typeof s != "function", Wt = Array.isArray, Ze = (s) => Wt(s) || typeof s?.[Symbol.iterator] == "function", jt = `[ 	
\f\r]`, vt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fe = /-->/g, ge = />/g, nt = RegExp(`>|${jt}(?:([^\\s"'>=/]+)(${jt}*=${jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, ve = /"/g, Te = /^(?:script|style|textarea|title)$/i, Xe = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), u = Xe(1), ut = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), ye = /* @__PURE__ */ new WeakMap(), ot = at.createTreeWalker(at, 129);
function Ne(s, t) {
  if (!Wt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return me !== void 0 ? me.createHTML(t) : t;
}
const Je = (s, t) => {
  const e = s.length - 1, n = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = vt;
  for (let r = 0; r < e; r++) {
    const d = s[r];
    let c, p, l = -1, h = 0;
    for (; h < d.length && (a.lastIndex = h, p = a.exec(d), p !== null); ) h = a.lastIndex, a === vt ? p[1] === "!--" ? a = fe : p[1] !== void 0 ? a = ge : p[2] !== void 0 ? (Te.test(p[2]) && (i = RegExp("</" + p[2], "g")), a = nt) : p[3] !== void 0 && (a = nt) : a === nt ? p[0] === ">" ? (a = i ?? vt, l = -1) : p[1] === void 0 ? l = -2 : (l = a.lastIndex - p[2].length, c = p[1], a = p[3] === void 0 ? nt : p[3] === '"' ? ve : be) : a === ve || a === be ? a = nt : a === fe || a === ge ? a = vt : (a = nt, i = void 0);
    const b = a === nt && s[r + 1].startsWith("/>") ? " " : "";
    o += a === vt ? d + Ge : l >= 0 ? (n.push(c), d.slice(0, l) + Ce + d.slice(l) + tt + b) : d + tt + (l === -2 ? r : b);
  }
  return [Ne(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class _t {
  constructor({ strings: t, _$litType$: e }, n) {
    let i;
    this.parts = [];
    let o = 0, a = 0;
    const r = t.length - 1, d = this.parts, [c, p] = Je(t, e);
    if (this.el = _t.createElement(c, n), ot.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = ot.nextNode()) !== null && d.length < r; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(Ce)) {
          const h = p[a++], b = i.getAttribute(l).split(tt), $ = /([.?@])?(.*)/.exec(h);
          d.push({ type: 1, index: o, name: $[2], strings: b, ctor: $[1] === "." ? tn : $[1] === "?" ? en : $[1] === "@" ? nn : Dt }), i.removeAttribute(l);
        } else l.startsWith(tt) && (d.push({ type: 6, index: o }), i.removeAttribute(l));
        if (Te.test(i.tagName)) {
          const l = i.textContent.split(tt), h = l.length - 1;
          if (h > 0) {
            i.textContent = Tt ? Tt.emptyScript : "";
            for (let b = 0; b < h; b++) i.append(l[b], wt()), ot.nextNode(), d.push({ type: 2, index: ++o });
            i.append(l[h], wt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ee) d.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(tt, l + 1)) !== -1; ) d.push({ type: 7, index: o }), l += tt.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const n = at.createElement("template");
    return n.innerHTML = t, n;
  }
}
function pt(s, t, e = s, n) {
  if (t === ut) return t;
  let i = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const o = kt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(s), i._$AT(s, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = i : e._$Cl = i), i !== void 0 && (t = pt(s, i._$AS(s, t.values), i, n)), t;
}
class Qe {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: n } = this._$AD, i = (t?.creationScope ?? at).importNode(e, !0);
    ot.currentNode = i;
    let o = ot.nextNode(), a = 0, r = 0, d = n[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let c;
        d.type === 2 ? c = new At(o, o.nextSibling, this, t) : d.type === 1 ? c = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (c = new sn(o, this, t)), this._$AV.push(c), d = n[++r];
      }
      a !== d?.index && (o = ot.nextNode(), a++);
    }
    return ot.currentNode = at, i;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class At {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, i) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = pt(this, t, e), kt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== ut && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ze(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && kt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(at.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = _t.createElement(Ne(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const o = new Qe(i, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ye.get(t.strings);
    return e === void 0 && ye.set(t.strings, e = new _t(t)), e;
  }
  k(t) {
    Wt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, i = 0;
    for (const o of t) i === e.length ? e.push(n = new At(this.O(wt()), this.O(wt()), this, this.options)) : n = e[i], n._$AI(o), i++;
    i < e.length && (this._$AR(n && n._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = pe(t).nextSibling;
      pe(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, i, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = m;
  }
  _$AI(t, e = this, n, i) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = pt(this, t, e, 0), a = !kt(t) || t !== this._$AH && t !== ut, a && (this._$AH = t);
    else {
      const r = t;
      let d, c;
      for (t = o[0], d = 0; d < o.length - 1; d++) c = pt(this, r[n + d], e, d), c === ut && (c = this._$AH[d]), a ||= !kt(c) || c !== this._$AH[d], c === m ? t = m : t !== m && (t += (c ?? "") + o[d + 1]), this._$AH[d] = c;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class tn extends Dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class en extends Dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class nn extends Dt {
  constructor(t, e, n, i, o) {
    super(t, e, n, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = pt(this, t, e, 0) ?? m) === ut) return;
    const n = this._$AH, i = t === m && n !== m || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== m && (n === m || i);
    i && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class sn {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    pt(this, t);
  }
}
const on = Ht.litHtmlPolyfillSupport;
on?.(_t, At), (Ht.litHtmlVersions ??= []).push("3.3.3");
const an = (s, t, e) => {
  const n = e?.renderBefore ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const o = e?.renderBefore ?? null;
    n._$litPart$ = i = new At(t.insertBefore(wt(), o), o, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
const Vt = globalThis;
class B extends dt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = an(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ut;
  }
}
B._$litElement$ = !0, B.finalized = !0, Vt.litElementHydrateSupport?.({ LitElement: B });
const rn = Vt.litElementPolyfillSupport;
rn?.({ LitElement: B });
(Vt.litElementVersions ??= []).push("4.2.2");
const ze = /* @__PURE__ */ Symbol.for(""), ln = (s) => {
  if (s?.r === ze) return s?._$litStatic$;
}, Yt = (s) => ({ _$litStatic$: s, r: ze }), $e = /* @__PURE__ */ new Map(), dn = (s) => (t, ...e) => {
  const n = e.length;
  let i, o;
  const a = [], r = [];
  let d, c = 0, p = !1;
  for (; c < n; ) {
    for (d = t[c]; c < n && (o = e[c], (i = ln(o)) !== void 0); ) d += i + t[++c], p = !0;
    c !== n && r.push(o), a.push(d), c++;
  }
  if (c === n && a.push(t[n]), p) {
    const l = a.join("$$lit$$");
    (t = $e.get(l)) === void 0 && (a.raw = a, $e.set(l, t = a)), e = r;
  }
  return s(t, ...e);
}, qt = dn(u);
const hn = { attribute: !0, type: String, converter: Et, reflect: !1, hasChanged: It }, cn = (s = hn, t, e) => {
  const { kind: n, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), n === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), n === "accessor") {
    const { name: a } = e;
    return { set(r) {
      const d = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, d, s, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, s, r), r;
    } };
  }
  if (n === "setter") {
    const { name: a } = e;
    return function(r) {
      const d = this[a];
      t.call(this, r), this.requestUpdate(a, d, s, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function f(s) {
  return (t, e) => typeof e == "object" ? cn(s, t, e) : ((n, i, o) => {
    const a = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, n), a ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(s, t, e);
}
function S(s) {
  return f({ ...s, state: !0, attribute: !1 });
}
function ht(s, t = {}) {
  return s.length < 2 ? u`${s[0] ?? m}` : u`<span class="joined ${t.whole ? "whole" : ""}">${s.map(
    (e, n) => u`${n ? u`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : m}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function xt(s, t = {}) {
  return ht(s.split(" · "), t);
}
function Nt(s, t) {
  s.querySelectorAll(".joined").forEach((e) => {
    const n = `${t}|${e.textContent}`;
    if (e.dataset.fit === n) return;
    e.classList.remove("stacked", "flow", "probe");
    const i = [...e.querySelectorAll(":scope > .joined-sep")];
    i.forEach((d) => d.classList.remove("break"));
    const o = [...e.querySelectorAll(":scope > .joined-part")], a = o.map((d) => d.getBoundingClientRect());
    if (!a.length || !a[0].width) {
      delete e.dataset.fit;
      return;
    }
    e.dataset.fit = n;
    const r = i.filter((d, c) => a[c + 1].top > a[c].top + 1);
    if (r.length) {
      if (!e.classList.contains("whole")) {
        e.classList.add("probe");
        const d = o.some((c) => c.scrollWidth > c.clientWidth + 0.5);
        if (e.classList.remove("probe"), d) {
          e.classList.add("flow");
          return;
        }
      }
      e.classList.add("stacked"), r.forEach((d) => d.classList.add("break"));
    }
  });
}
const Kt = W`
  .joined {
    min-width: 0;
  }

  .joined-part {
    white-space: nowrap;
  }

  .joined-only {
    display: none;
  }

  .joined.stacked .joined-only {
    display: inline;
  }

  /* Where the line breaks the dot goes; the space stays, so a copied or read text keeps its words apart. */
  .joined.stacked .joined-sep.break .joined-dot {
    display: none;
  }

  .joined.stacked .joined-sep.break::after {
    content: "\\A";
    white-space: pre;
  }

  /* Measuring only: every part on its own line. */
  .joined.probe {
    display: block;
  }

  .joined.probe .joined-part {
    display: block;
  }

  .joined.flow .joined-part {
    white-space: normal;
  }

  /* A part on its own line that is still too long (measured before the font or the width settled, iPhone) wraps
     rather than pushing the card wider than the screen. */
  .joined.stacked .joined-part {
    white-space: normal;
  }

  .joined.flow .joined-sep {
    white-space: nowrap;
  }
`, un = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif', Oe = W`
  :host {
    font-family: ${Me(un)};
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
`, De = 25, Gt = ["off", "cool", "wind_free", "heat", "fan_only", "dry", "auto", "sleep"], pn = ["plan", "manual", "boost", "off"];
function Zt(s) {
  return s === void 0 || s === "" || s === "unavailable" || s === "unknown";
}
function et(s) {
  return Array.isArray(s) ? s.filter((t) => typeof t == "string") : [];
}
function rt(s) {
  const t = typeof s == "string" ? Number.parseFloat(s) : s;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function ct(s, t) {
  const e = t?.state;
  if (!t || Zt(e)) return;
  if (s === "heating")
    return e === "auto" ? "plan" : e === "off" ? "off" : e === "heat" ? rt(t.attributes.temperature) === De ? "boost" : "manual" : void 0;
  const n = String(t.attributes.preset_mode ?? "");
  return e === "off" ? "off" : e === "cool" && n === "wind_free" ? "wind_free" : n === "sleep" ? "sleep" : e === "heat_cool" ? "auto" : Gt.includes(e) ? e : void 0;
}
function zt(s, t) {
  const e = ct(s, t);
  return e === void 0 ? void 0 : e !== "off";
}
function mn(s, t, e, n, i) {
  if (n.includes(i)) return n.length > 1 ? n.filter((a) => a !== i) : n;
  const o = zt(s, t?.states[i]);
  return o === void 0 ? n : e.filter((a) => zt(s, t?.states[a.entity]) === o).map((a) => a.entity);
}
function fn(s, t) {
  return t.flatMap((e) => {
    const n = rt(s?.states[e]?.attributes.temperature);
    return n === void 0 ? [] : [{ entity: e, value: n }];
  });
}
function gn(s, t, e) {
  const n = new Set(e.map((i) => ct(s, t?.states[i])).filter((i) => i !== void 0));
  return n.size === 1 ? [...n][0] : void 0;
}
function bn(s, t) {
  const e = s === "heating" ? 0.5 : 1, n = rt(t?.attributes.min_temp) ?? (s === "heating" ? 5 : 16), i = rt(t?.attributes.max_temp) ?? (s === "heating" ? 25 : 30);
  return { min: Math.ceil(n / e) * e, max: Math.floor(i / e) * e, step: e };
}
function vn(s) {
  const t = et(s?.attributes.hvac_modes), e = et(s?.attributes.preset_modes);
  return Gt.filter((n) => n === "wind_free" ? t.includes("cool") && e.includes("wind_free") : n === "sleep" ? e.includes("sleep") : n === "auto" ? t.includes("auto") || t.includes("heat_cool") : t.includes(n));
}
function yn(s, t, e) {
  const n = t.map((i) => et(s?.states[i]?.attributes[e])).filter((i) => i.length);
  return n.length ? n[0].filter((i) => n.every((o) => o.includes(i))) : [];
}
function $n(s, t, e) {
  const n = new Set(t.map((i) => s?.states[i]?.attributes[e]).filter((i) => typeof i == "string"));
  return n.size === 1 ? [...n][0] : void 0;
}
function Ft(s) {
  return !!s?.services?.tado_ce?.set_climate_timer;
}
function xn(s) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}:00`;
}
function wn(s, t, e, n) {
  const i = e.mode ?? (e.temperature !== void 0 ? "manual" : ct("heating", t));
  if (i === void 0) return [];
  if (i === "plan") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: s, hvac_mode: "auto" } }];
  if (i === "off") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: s, hvac_mode: "off" } }];
  const o = i === "boost" ? De : e.temperature ?? rt(t?.attributes.temperature) ?? 21;
  if (!n)
    return i === "manual" ? [{ domain: "climate", service: "set_temperature", data: { entity_id: s, temperature: o, hvac_mode: "heat" } }] : [];
  const a = e.manualFor ?? (i === "boost" ? "30" : "next"), r = { entity_id: s, temperature: o };
  return a === "next" ? r.overlay = "next_time_block" : a === "forever" ? r.overlay = "manual" : r.time_period = xn(Number(a)), [{ domain: "tado_ce", service: "set_climate_timer", data: r }];
}
function kn(s, t, e) {
  const n = [], i = { entity_id: s }, o = et(t?.attributes.hvac_modes), a = et(t?.attributes.preset_modes), r = String(t?.attributes.preset_mode ?? ""), d = e.mode;
  if (d !== void 0) {
    const c = (l) => n.push({ domain: "climate", service: "set_hvac_mode", data: { ...i, hvac_mode: l } }), p = (l) => n.push({ domain: "climate", service: "set_preset_mode", data: { ...i, preset_mode: l } });
    d === "wind_free" ? (c("cool"), p("wind_free")) : d === "sleep" ? ((t?.state === "off" || Zt(t?.state)) && c("cool"), p("sleep")) : (c(d === "auto" ? o.includes("auto") ? "auto" : "heat_cool" : d), d !== "off" && (r === "wind_free" || r === "sleep") && a.includes("none") && p("none"));
  }
  return e.temperature !== void 0 && d !== "off" && n.push({ domain: "climate", service: "set_temperature", data: { ...i, temperature: Math.round(e.temperature) } }), e.fan !== void 0 && et(t?.attributes.fan_modes).includes(e.fan) && n.push({ domain: "climate", service: "set_fan_mode", data: { ...i, fan_mode: e.fan } }), e.swing !== void 0 && et(t?.attributes.swing_modes).includes(e.swing) && n.push({ domain: "climate", service: "set_swing_mode", data: { ...i, swing_mode: e.swing } }), n;
}
function _n(s, t) {
  const e = t.mode;
  return e === void 0 ? s?.state : e === "wind_free" || e === "sleep" && (s?.state === "off" || Zt(s?.state)) ? "cool" : e === "sleep" ? s?.state : e === "auto" ? et(s?.attributes.hvac_modes).includes("auto") ? "auto" : "heat_cool" : e;
}
function An(s, t, e) {
  const n = Math.round(t * 60), i = [{ delay: { hours: Math.floor(n / 3600), minutes: Math.floor(n % 3600 / 60), seconds: n % 60 } }];
  return e !== void 0 && i.push({ condition: "state", entity_id: s, state: e }), i.push({ action: "climate.set_hvac_mode", target: { entity_id: s }, data: { hvac_mode: "off" } }), { type: "execute_script", sequence: i };
}
var Sn = Object.defineProperty, V = (s, t, e, n) => {
  for (var i = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = a(t, e, i) || i);
  return i && Sn(t, e, i), i;
};
const Mn = ["next", "30", "60", "180", "forever"], Cn = [0, 60, 180, 480], Qt = class Qt extends B {
  constructor() {
    super(...arguments), this.system = "heating", this.rooms = [], this.selected = [], this.prefix = "hdk", this.delayMs = 2e3, this.draft = {}, this.busy = !1, this.error = "";
  }
  updated() {
    Nt(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.flush();
  }
  willUpdate(t) {
    (t.has("system") && t.get("system") !== void 0 || t.has("rooms") && t.get("rooms") !== void 0) && this.flush(t.get("selected") ?? this.selected, t.get("system") ?? this.system);
  }
  /** Sends what waits at once (the sheet closes). */
  async flush(t = this.selected, e = this.system) {
    window.clearTimeout(this.timer), this.timer = void 0;
    const n = this.draft;
    Object.keys(n).length && (this.draft = {}, await this.send(n, t, e));
  }
  change(t) {
    this.draft = { ...this.draft, ...t }, this.error = "", this.busy = !0, window.clearTimeout(this.timer), this.timer = window.setTimeout(() => {
      this.flush();
    }, this.delayMs);
  }
  /** Sends a draft to the rooms it was made for, with the system it was made in (the popup may have switched since). */
  async send(t, e, n) {
    const i = this.hass;
    if (!i) return;
    this.busy = !0;
    const o = Ft(i);
    try {
      for (const a of e) {
        const r = i.states[a];
        if (!r || ct(n, r) === void 0) continue;
        const d = n === "heating" ? wn(a, r, t, o) : kn(a, r, t);
        for (const l of d) await i.callService(l.domain, l.service, l.data);
        const c = t.offAfter ?? 0, p = n === "cooling" ? _n(r, t) : void 0;
        c > 0 && p !== void 0 && p !== "off" && await i.callWS(An(a, c, p));
      }
      this.dispatchEvent(new CustomEvent("hdk-sent", { bubbles: !0, composed: !0 }));
    } catch (a) {
      this.error = `${this.texts?.failed ?? "Failed"}: ${a instanceof Error ? a.message : String(a)}`, this.dispatchEvent(new CustomEvent("hdk-error", { detail: { message: this.error }, bubbles: !0, composed: !0 }));
    } finally {
      this.busy = this.timer !== void 0;
    }
  }
  name(t) {
    return this.rooms.find((e) => e.entity === t)?.name ?? t;
  }
  degrees(t) {
    const e = this.i18n;
    return `${e ? this.system === "heating" ? e.half(t) : e.whole(t) : String(t)}°`;
  }
  /** The state of a room in words for its tile ("Chlazení · 22°", "Plán · 21°", "Vypnuto"). */
  roomText(t) {
    const e = this.texts, n = this.hass?.states[t], i = ct(this.system, n);
    if (i === void 0) return e.unavailable;
    const o = rt(n?.attributes.temperature);
    return i !== "off" && i !== "boost" && i !== "fan_only" && o !== void 0 ? `${e.modes[i]} · ${this.degrees(o)}` : e.modes[i];
  }
  selectRoom(t) {
    const e = mn(this.system, this.hass, this.rooms, this.selected, t);
    e.join() !== this.selected.join() && (this.flush(this.selected), this.selected = e, this.dispatchEvent(new CustomEvent("hdk-select-rooms", { detail: { selected: e }, bubbles: !0, composed: !0 })));
  }
  render() {
    const t = this.texts, e = this.i18n;
    if (!t || !e) return m;
    const n = this.hass, i = n?.states[this.selected[0]], { min: o, max: a, step: r } = bn(this.system, i), d = fn(n, this.selected), c = [...new Set(d.map((y) => y.value))], p = gn(this.system, n, this.selected), l = this.draft.mode ?? p, h = this.draft.temperature === void 0 && c.length > 1, b = this.draft.temperature ?? (l === "boost" ? 25 : c[0]), $ = l === "off" || l === "fan_only", g = $ && l !== void 0 ? t.modes[l] : h ? `${this.degrees(Math.min(...c)).replace(/°$/, "")}–${this.degrees(Math.max(...c))}` : b !== void 0 ? this.degrees(b) : "––", k = this.selected.flatMap((y) => {
      const K = rt(n?.states[y]?.attributes.current_temperature);
      return K === void 0 ? [] : [{ id: y, text: `${e.one(K)} °C` }];
    }), v = this.system === "heating" && this.selected.length === 1 && n?.states[this.selected[0]]?.attributes.hvac_action === "heating", w = h ? t.targets(d.map((y) => `${this.name(y.entity)} ${this.degrees(y.value)}`).join(" · ")) : k.length ? t.now(this.selected.length === 1 ? `${k[0].text}${v ? ` · ${t.heats}` : ""}` : k.map((y) => `${this.name(y.id)} ${y.text}`).join(" · ")) : "", O = this.system === "heating" ? pn.filter((y) => y !== "boost" || Ft(n)) : Gt.filter((y) => this.selected.some((K) => vn(n?.states[K]).includes(y))), F = this.draft.mode === void 0 && p === void 0 && this.selected.length > 1, _ = this.system === "cooling" && (l === "off" || l === "fan_only");
    return u`
      <div class="rooms" role="group" aria-label=${t.rooms}>
        ${this.rooms.map((y) => {
      const K = n?.states[y.entity], ft = zt(this.system, K), gt = this.selected.includes(y.entity);
      return xe(this.prefix, {
        name: y.name,
        text: this.roomText(y.entity),
        state: gt ? "on" : ft ? "idle" : "off",
        disabled: ft === void 0,
        pressed: gt,
        onPress: () => this.selectRoom(y.entity)
      });
    })}
      </div>
      <div class="target">
        <div class="big ${$ ? "word" : ""}" aria-live="polite">${g}</div>
        <div class="sub">${w}</div>
        ${this.busy ? u`<span class="busy" role="status" aria-label=${t.sending}
              ><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 2.5a7.5 7.5 0 1 1-7.5 7.5"></path></svg
            ></span>` : m}
      </div>
      <div class="slider">
        ${En(this.prefix, {
      min: o,
      max: a,
      step: r,
      value: b ?? o,
      mixed: h,
      marks: h ? c : [],
      label: t.temperature,
      valueText: b !== void 0 ? this.degrees(b) : "",
      minLabel: this.degrees(o),
      maxLabel: this.degrees(a),
      disabled: _ || !this.selected.length,
      onChange: (y) => (
        // Moving the temperature of the heating is Ručně (spec: „Posunutí teploty přepne Plán na Ručně“).
        this.change(this.system === "heating" && l !== "manual" ? { temperature: y, mode: "manual" } : { temperature: y })
      )
    })}
      </div>
      <h3>${t.mode}</h3>
      ${this.system === "heating" ? St(this.prefix, {
      label: t.mode,
      options: O.map((y) => ({ value: y, label: t.modes[y] })),
      value: l ?? "",
      onSelect: (y) => this.change({ mode: y, ...y === "plan" || y === "off" ? { temperature: void 0 } : {} })
    }) : u`<div class="modes" role="group" aria-label=${t.mode}>
            ${O.map(
      (y) => xe(this.prefix, {
        centered: !0,
        name: t.modes[y],
        state: l === y ? "on" : "idle",
        pressed: l === y,
        onPress: () => this.change({ mode: y })
      })
    )}
          </div>`}
      ${F ? u`<div class="note">${xt(t.mixedModes(this.selected.map((y) => `${this.name(y)} ${t.modes[ct(this.system, n?.states[y]) ?? "off"] ?? ""}`).join(" · ")))}</div>` : m}
      ${(h || F) && !Object.keys(this.draft).length ? u`<div class="note">${t.firstChange}</div>` : m}
      ${this.system === "heating" ? this.renderManualFor(l) : [this.renderAttribute("fan"), this.renderAttribute("swing"), this.renderOffAfter(l)]}
      ${this.error ? u`<div class="error" role="alert">${this.error}</div>` : m}
      ${this.selected.length === 1 ? u`<button
            class="detail"
            type="button"
            @click=${() => this.dispatchEvent(new CustomEvent("hdk-more-info", { detail: { entityId: this.selected[0] }, bubbles: !0, composed: !0 }))}
          >
            ${t.detail}<span aria-hidden="true"> ›</span>
          </button>` : m}
    `;
  }
  renderManualFor(t) {
    const e = this.texts;
    if (!Ft(this.hass)) return m;
    const n = t === "manual" || t === "boost", i = this.draft.manualFor ?? (t === "boost" ? "30" : "next"), o = Number(i), a = n ? i === "next" ? e.untilNextPlan : i === "forever" ? e.untilChanged : e.untilTime(this.i18n.time(Date.now() + o * 6e4)) : "";
    return u`<h3>${e.manualFor}</h3>
      ${St(this.prefix, {
      label: e.manualFor,
      options: Mn.map((r) => ({ value: r, label: e.manualForChoices[r] })),
      value: i,
      disabled: !n,
      wrap: !0,
      onSelect: (r) => this.change({ manualFor: r, ...this.draft.mode === void 0 && t ? { mode: t } : {} })
    })}
      <div class="footer">${a}</div>`;
  }
  /** Síla větru or Směr proudění: the choices every selected air conditioner offers; none, no section. */
  renderAttribute(t) {
    const e = this.texts, n = yn(this.hass, this.selected, t === "fan" ? "fan_modes" : "swing_modes");
    if (!n.length) return m;
    const i = t === "fan" ? e.fanModes : e.swingModes, o = this.draft[t] ?? $n(this.hass, this.selected, t === "fan" ? "fan_mode" : "swing_mode") ?? "", a = t === "fan" ? e.fan : e.swing;
    return u`<h3>${a}</h3>
      ${St(this.prefix, {
      label: a,
      options: n.map((r) => ({ value: r, label: i[r] ?? r })),
      value: o,
      onSelect: (r) => this.change(t === "fan" ? { fan: r } : { swing: r })
    })}`;
  }
  renderOffAfter(t) {
    const e = this.texts, n = this.draft.offAfter ?? 0, i = t !== void 0 ? t !== "off" : this.selected.length > 0 && this.selected.every((a) => zt(this.system, this.hass?.states[a]) === !0), o = i ? n === 0 ? e.runsUntilOff : e.offAt(this.i18n.time(Date.now() + n * 6e4)) : "";
    return u`<h3>${e.offAfter}</h3>
      ${St(this.prefix, {
      label: e.offAfter,
      options: Cn.map((a) => ({ value: String(a), label: e.offAfterChoices[String(a)] })),
      value: String(n),
      disabled: !i,
      onSelect: (a) => this.change({ offAfter: Number(a) })
    })}
      <div class="footer">${o}</div>`;
  }
};
Qt.styles = [Oe, Kt, W`
    :host {
      display: block;
    }
    .rooms {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
    .target {
      position: relative;
      margin: 18px 0 4px;
      text-align: center;
    }
    .big {
      font-size: 64px;
      font-weight: 600;
      line-height: 72px;
      letter-spacing: -1px;
      font-variant-numeric: tabular-nums;
    }
    .big.word {
      font-size: 40px;
      line-height: 72px;
    }
    .sub,
    .note,
    .footer {
      color: var(--hdk-secondary, #98989f);
      font-size: 15px;
      line-height: 20px;
    }
    .sub {
      min-height: 20px;
    }
    .busy {
      position: absolute;
      top: 6px;
      right: 0;
      width: 20px;
      height: 20px;
      color: var(--hdk-secondary, #98989f);
    }
    .busy svg {
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .busy svg {
        animation: none;
      }
    }
    .slider {
      margin: 12px 0 0;
    }
    h3 {
      margin: 20px 4px 8px;
      color: var(--hdk-secondary, #98989f);
      font-size: 13px;
      font-weight: 400;
      line-height: 18px;
      text-transform: uppercase;
    }
    .modes {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }
    .note,
    .footer {
      margin: 8px 4px 0;
      min-height: 20px;
    }
    .detail {
      display: block;
      min-height: 44px;
      margin: 12px 0 0;
      padding: 0 4px;
      border: 0;
      background: none;
      color: var(--hdk-accent, #0a84ff);
      font: inherit;
      font-size: 17px;
      line-height: 22px;
      cursor: pointer;
    }
    .detail:focus-visible {
      outline: 2px solid var(--hdk-accent, #0a84ff);
      outline-offset: -2px;
      border-radius: 8px;
    }
    .error {
      margin: 8px 4px 0;
      color: var(--hdk-error, #ff6961);
      font-size: 15px;
      line-height: 20px;
    }
  `];
let L = Qt;
V([
  f({ attribute: !1 })
], L.prototype, "hass");
V([
  f({ attribute: !1 })
], L.prototype, "i18n");
V([
  f({ attribute: !1 })
], L.prototype, "texts");
V([
  f()
], L.prototype, "system");
V([
  f({ attribute: !1 })
], L.prototype, "rooms");
V([
  f({ attribute: !1 })
], L.prototype, "selected");
V([
  f()
], L.prototype, "prefix");
V([
  f({ type: Number })
], L.prototype, "delayMs");
V([
  S()
], L.prototype, "draft");
V([
  S()
], L.prototype, "busy");
V([
  S()
], L.prototype, "error");
function xe(s, t) {
  const e = Yt(`${s}-tile`);
  return qt`<${e}
    kind="action"
    ?centered=${t.centered ?? !1}
    .name=${t.name}
    .text=${t.text ?? ""}
    .state=${t.state}
    .disabled=${t.disabled ?? !1}
    .label=${t.label ?? ""}
    .pressed=${t.pressed}
    @hdk-press=${(n) => {
    n.stopPropagation(), t.onPress();
  }}
  ></${e}>`;
}
function St(s, t) {
  const e = Yt(`${s}-segmented`);
  return qt`<${e}
    .label=${t.label}
    .options=${t.options}
    .value=${t.value}
    .disabled=${t.disabled ?? !1}
    ?wrap=${t.wrap ?? !1}
    @hdk-select=${(n) => {
    n.stopPropagation(), t.onSelect(n.detail.value);
  }}
  ></${e}>`;
}
function En(s, t) {
  const e = Yt(`${s}-slider`);
  return qt`<${e}
    .min=${t.min}
    .max=${t.max}
    .step=${t.step}
    .tickStep=${1}
    .value=${t.value}
    ?mixed=${t.mixed}
    .marks=${t.marks}
    .label=${t.label}
    .valueText=${t.valueText}
    .minLabel=${t.minLabel}
    .maxLabel=${t.maxLabel}
    .disabled=${t.disabled}
    @hdk-input=${(n) => n.stopPropagation()}
    @hdk-change=${(n) => {
    n.stopPropagation(), t.onChange(n.detail.value);
  }}
  ></${e}>`;
}
function Tn(s) {
  if (!customElements.get(`${s}-climate`)) {
    const t = class extends L {
      constructor() {
        super(), this.prefix = s;
      }
    };
    customElements.define(`${s}-climate`, t);
  }
}
var Nn = Object.defineProperty, mt = (s, t, e, n) => {
  for (var i = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = a(t, e, i) || i);
  return i && Nn(t, e, i), i;
};
const te = class te extends B {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, n = (t - e) / 2, i = 2 * Math.PI * n, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), a = t / 2;
    return u`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
      <svg viewBox="0 0 ${t} ${t}" aria-hidden="true">
        <circle class="track" cx=${a} cy=${a} r=${n} fill="none" stroke-width=${e}></circle>
        <circle
          class="fill"
          cx=${a}
          cy=${a}
          r=${n}
          fill="none"
          stroke-width=${e}
          stroke-linecap="round"
          stroke-dasharray="${(i * o).toFixed(1)} ${i.toFixed(1)}"
          transform="rotate(-90 ${a} ${a})"
        ></circle>
      </svg>
      ${this.num ? u`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? u`<span class="unit">${this.unit}</span>` : m}` : m}
    </div>`;
  }
};
te.styles = W`
    :host {
      display: inline-block;
      position: relative;
      flex: none;
      line-height: 0;
    }
    .ring {
      position: relative;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .track {
      stroke: var(--hdk-ring-track, rgb(118 118 128 / 24%));
    }
    .fill {
      stroke: var(--hdk-ring-fill, var(--hdk-accent, #0a84ff));
    }
    .num,
    .unit {
      position: absolute;
      inset: 50% 0 auto;
      text-align: center;
    }
    .num {
      transform: translateY(-50%);
      color: var(--hdk-ring-text, currentColor);
      font-weight: 700;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    /* With a unit the number rises a little to make room for it under the number. */
    .num.with-unit {
      transform: translateY(-62%);
    }
    .unit {
      margin-top: 8px;
      color: var(--hdk-ring-sub, var(--hdk-secondary, #98989f));
      font-size: 10px;
      line-height: 1;
    }
  `;
let X = te;
mt([
  f({ type: Number })
], X.prototype, "fraction");
mt([
  f({ type: Number })
], X.prototype, "size");
mt([
  f({ type: Number })
], X.prototype, "stroke");
mt([
  f()
], X.prototype, "num");
mt([
  f()
], X.prototype, "unit");
mt([
  f()
], X.prototype, "label");
class Pt {
  /** `times` is read at every press, so changed properties apply at once. */
  constructor(t) {
    this.times = t, this.pressing = !1, this.fired = !1;
  }
  /** A press began: `onHold` runs when it lasts `holdMs`. */
  start(t) {
    window.clearTimeout(this.timer), this.pressing = !0, this.fired = !1, this.timer = window.setTimeout(() => {
      this.fired = !0, this.last = void 0, t();
    }, this.times().holdMs);
  }
  /** The pointer was lifted or left: a hold that has not fired yet is cancelled. */
  release() {
    window.clearTimeout(this.timer);
  }
  /** The press was interrupted (pointercancel, leaving the control): nothing follows. */
  cancel() {
    window.clearTimeout(this.timer), this.pressing = !1, this.fired = !1;
  }
  /**
   * The press ended in a tap on `key` at `time` (ms, monotonic). "none": the press was a hold that
   * has fired already (or no press began); "double": the second tap of `key` within `doubleTapMs`;
   * "single": the first tap, remembered for a following second one.
   */
  tap(t, e) {
    window.clearTimeout(this.timer);
    const n = this.pressing, i = this.fired;
    return this.pressing = !1, this.fired = !1, !n || i ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
  }
  /** Whether `key` was tapped once and no second tap has followed yet. */
  pending(t) {
    return this.last?.key === t;
  }
  /** Forget the remembered first tap (a hint was shown, the action was sent …). */
  forget() {
    this.last = void 0;
  }
  dispose() {
    window.clearTimeout(this.timer), this.pressing = !1, this.fired = !1, this.last = void 0;
  }
}
class Xt {
  constructor(t) {
    this.host = t, this.nudge = !1, this.hint = !1;
  }
  show(t) {
    this.nudge = !0, this.hint = !0, window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer), this.nudgeTimer = window.setTimeout(() => {
      this.nudge = !1, this.host.requestUpdate();
    }, 450), this.hintTimer = window.setTimeout(() => {
      this.hint = !1, this.host.requestUpdate();
    }, t * 1e3), this.host.requestUpdate();
  }
  hide() {
    window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer), this.nudge = !1, this.hint = !1, this.host.requestUpdate();
  }
  dispose() {
    window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer);
  }
}
const Lt = W`
  .hint {
    position: absolute;
    z-index: 6;
    right: 0;
    padding: 8px 12px;
    border-radius: 12px;
    background: var(--hdk-bubble, #3a3a3c);
    color: var(--hdk-bubble-text, #ffffff);
    box-shadow: 0 6px 20px rgb(0 0 0 / 55%);
    font-size: 13px;
    line-height: 18px;
    width: max-content;
    max-width: 240px;
    pointer-events: none;
    animation: hint-in 0.18s ease-out;
  }
  .hint.below {
    top: calc(100% + 10px);
  }
  .hint.above {
    bottom: calc(100% + 4px);
  }
  .hint.center {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    animation-name: hint-in-center;
  }
  .hint i {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: var(--hdk-bubble, #3a3a3c);
    transform: rotate(45deg);
  }
  .hint.below i {
    top: -5px;
  }
  .hint.above i {
    bottom: -5px;
  }
  .hint.end i {
    right: var(--arrow, 25px);
  }
  .hint.center i {
    left: 50%;
    margin-left: -5px;
  }
  @keyframes hint-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
    }
  }
  @keyframes hint-in-center {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateX(-50%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hint {
      animation: none;
    }
  }
`;
var zn = Object.defineProperty, j = (s, t, e, n) => {
  for (var i = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = a(t, e, i) || i);
  return i && zn(t, e, i), i;
};
const ee = class ee extends B {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.pending = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new Xt(this), this.nudgeIndex = 0, this.gesture = new Pt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), n = this.options[t]?.value ?? e[0]?.value, i = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !i ? Math.sign(this.nudgeIndex - t) * 14 : 0, a = this._dragging ? this._dx : o;
    return u`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) || this.wrap ? "tall" : ""} ${this.wrap ? "wrap" : ""} ${this.disabled ? "off" : ""}"
        role="radiogroup"
        aria-busy=${this.pending ? "true" : m}
        aria-label=${this.label}
        style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)};--dx:${a}px"
        @keydown=${this.onKey}
        @pointerdown=${this.onDown}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onCancel}
        @contextmenu=${(r) => this.guarded && r.preventDefault()}
      >
        <span class="thumb" aria-hidden="true" ?hidden=${t < 0}></span>
        ${this.options.map(
      (r, d) => u`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === n ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${d}
            @click=${(c) => this.onClick(c, r.value, d)}
          >
            <span>${r.label}</span>${r.detail ? u`<span class="detail">${r.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? u`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  select(t) {
    this.disabled || t === this.value || (this.gesture.release(), this.hints.hide(), this.dispatchEvent(new CustomEvent("hdk-select", { detail: { value: t }, bubbles: !0, composed: !0 })));
  }
  onClick(t, e, n) {
    if (this.disabled || e === this.value) return;
    if (!this.guarded) {
      this.select(e);
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.select(e);
      return;
    }
    const i = this.gesture.tap(String(n), t.timeStamp);
    if (this.swallowClick || i === "none") {
      this.swallowClick = !1;
      return;
    }
    i === "double" ? this.select(e) : (this.nudgeIndex = n, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, n = this.options.findIndex((r) => r.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: n, moved: !1, id: t.pointerId };
    const i = t.target.closest("button[data-index]"), o = i ? Number(i.dataset.index) : -1, a = o >= 0 && o !== n && !this.options[o]?.disabled;
    this.gesture.start(() => {
      a && (this.drag = void 0, this.select(this.options[o].value));
    });
  }
  onMove(t) {
    const e = this.drag;
    if (!e || e.id !== t.pointerId) return;
    const n = t.clientX - e.x;
    if (!e.moved && Math.abs(n) < 6) return;
    e.moved || (e.moved = !0, this.gesture.release(), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const i = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((i - e.index) * e.width, n)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (this.gesture.release(), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const n = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const i = this.options[n];
    i && !i.disabled && n !== e.index && this.select(i.value);
  }
  onCancel() {
    this.gesture.cancel(), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const n = this.options.filter((r) => !r.disabled);
    if (!n.length) return;
    const i = n.findIndex((r) => r.value === this.value), o = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, a = n[(i + o + n.length) % n.length];
    t.preventDefault(), this.select(a.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${a.value}"]`)?.focus());
  }
};
ee.styles = [
  Lt,
  W`
      :host {
        position: relative;
        display: block;
      }
      .track {
        position: relative;
        display: grid;
        grid-template-columns: repeat(var(--n), minmax(0, 1fr));
        box-sizing: border-box;
        min-height: 48px;
        padding: 3px;
        border-radius: 999px;
        background: var(--hdk-track, #2c2c2e);
        user-select: none;
        -webkit-user-select: none;
      }
      .track.guarded {
        touch-action: pan-y;
      }
      .track.compact {
        min-height: 40px;
        background: var(--hdk-track-compact, #3a3a3c);
      }
      .track.tall {
        min-height: 66px;
      }
      .track.wrap button {
        padding: 0 4px;
        font-size: 13px;
        line-height: 17px;
        text-align: center;
      }
      /* A control that cannot be used now does not look chosen: the thumb fades with the labels. */
      .track.off .thumb {
        opacity: 0.5;
        box-shadow: none;
      }
      .thumb {
        position: absolute;
        top: 3px;
        bottom: 3px;
        left: 3px;
        width: calc((100% - 6px) / var(--n));
        box-sizing: border-box;
        border-radius: 999px;
        background: var(--hdk-seg-thumb, #fff);
        box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
        transform: translateX(calc(var(--i) * 100% + var(--dx, 0px)));
        transition: transform 0.28s cubic-bezier(0.3, 1.2, 0.5, 1);
      }
      .track.dragging .thumb {
        transition: none;
      }
      :host([pending]) .thumb {
        animation: hdk-seg-pending 1.3s ease-in-out infinite alternate;
      }
      @keyframes hdk-seg-pending {
        to {
          opacity: 0.45;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([pending]) .thumb {
          animation: none;
          outline: 1.5px dashed var(--hdk-accent, #0a84ff);
          outline-offset: -1.5px;
        }
      }
      .thumb[hidden] {
        display: none;
      }
      button {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 0;
        min-height: 44px;
        padding: 0 8px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--hdk-seg-text, #ebebf5);
        font: inherit;
        font-size: 17px;
        font-weight: 400;
        line-height: 22px;
        cursor: pointer;
        transition: color 0.2s;
        touch-action: manipulation;
        -webkit-touch-callout: none;
      }
      .track.compact button {
        min-height: 34px;
        padding: 0 2px;
        font-size: 14px;
        line-height: 20px;
      }
      .track.guarded button {
        touch-action: pan-y;
      }
      button .detail {
        font-size: 13px;
        line-height: 18px;
      }
      button[aria-checked="true"] {
        color: var(--hdk-seg-selected, #000);
        font-weight: 600;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: -3px;
      }
      button:disabled {
        cursor: default;
        opacity: 0.5;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      @media (prefers-reduced-motion: reduce) {
        .thumb,
        button {
          transition: none;
        }
      }
    `
];
let T = ee;
j([
  f({ attribute: !1 })
], T.prototype, "options");
j([
  f()
], T.prototype, "value");
j([
  f()
], T.prototype, "label");
j([
  f({ type: Boolean })
], T.prototype, "disabled");
j([
  f({ type: Boolean, reflect: !0 })
], T.prototype, "pending");
j([
  f({ type: Boolean })
], T.prototype, "compact");
j([
  f({ type: Boolean })
], T.prototype, "wrap");
j([
  f({ type: Boolean })
], T.prototype, "guarded");
j([
  f({ type: Number })
], T.prototype, "holdMs");
j([
  f({ type: Number })
], T.prototype, "doubleTapMs");
j([
  f({ type: Number })
], T.prototype, "hintSeconds");
j([
  f()
], T.prototype, "hint");
j([
  S()
], T.prototype, "_dx");
j([
  S()
], T.prototype, "_dragging");
var On = Object.defineProperty, lt = (s, t, e, n) => {
  for (var i = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = a(t, e, i) || i);
  return i && On(t, e, i), i;
};
const Dn = 100, Pn = 0.6, Ln = 6, ne = class ne extends B {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.wide = !1, this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.close();
        return;
      }
      if (t.key !== "Tab") return;
      const e = this.focusable();
      if (!e.length) return;
      const n = t.composedPath(), i = e.findIndex((a) => n.includes(a)), o = t.shiftKey ? e[i <= 0 ? e.length - 1 : i - 1] : e[i === -1 || i === e.length - 1 ? 0 : i + 1];
      t.preventDefault(), o.focus();
    }, this.touchStart = (t) => {
      this.touchY = t.touches[0]?.clientY, this.touchOnSlider = t.composedPath().some((e) => e instanceof HTMLElement && (e.localName.endsWith("-slider") || "drag" in e.dataset || e instanceof HTMLInputElement && e.type === "range"));
    }, this.touchMove = (t) => {
      !this.touchOnSlider && t.cancelable && this.cannotScroll(t, (t.touches[0]?.clientY ?? 0) - (this.touchY ?? 0)) && t.preventDefault();
    }, this.wheel = (t) => {
      t.cancelable && !t.ctrlKey && this.cannotScroll(t, -t.deltaY) && t.preventDefault();
    }, this.dragStart = (t) => {
      t.button === 0 && (this.drag = { pointerId: t.pointerId, startY: t.clientY, startTime: performance.now() });
    }, this.dragMove = (t) => {
      const e = this.drag;
      if (!e || e.pointerId !== t.pointerId) return;
      const n = t.clientY - e.startY;
      if (!this.dragging) {
        if (n < Ln) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const e = this.drag;
      if (this.drag = void 0, !e || !this.dragging) return;
      this.dragging = !1;
      const n = Math.max(0, t.clientY - e.startY), i = n / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (n > Dn || i > Pn) ? this.close() : this.dragY = 0;
    };
  }
  willUpdate(t) {
    if (t.has("open") && this.open && !t.get("open")) {
      let e = document.activeElement;
      for (; e?.shadowRoot?.activeElement; ) e = e.shadowRoot.activeElement;
      this.returnFocus = e, this.dragY = 0;
    }
  }
  updated(t) {
    t.has("open") && (this.open ? this.renderRoot.querySelector(".panel")?.focus() : t.get("open") && (this.returnFocus?.focus?.(), this.returnFocus = void 0));
  }
  close() {
    this.dispatchEvent(new CustomEvent("hdk-close", { bubbles: !0, composed: !0 }));
  }
  /** The focusable elements of the sheet: its ✕ and the slotted content, inside shadow roots too (the controls of the kit). */
  focusable() {
    const t = 'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), [tabindex]:not([tabindex="-1"])', e = (i) => [...i.querySelectorAll("*")].flatMap((o) => [
      ...o.matches(t) ? [o] : [],
      ...o.shadowRoot ? e(o.shadowRoot) : []
    ]), n = this.renderRoot.querySelector(".close");
    return [...n ? [n] : [], ...e(this).filter((i) => i.getClientRects().length > 0)];
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. Outside the sheet nothing scrolls. */
  cannotScroll(t, e) {
    const n = this.renderRoot.querySelector(".panel");
    return !n || !t.composedPath().includes(n) ? !0 : !(n.scrollHeight > n.clientHeight + 1) || e > 0 && n.scrollTop <= 0 || e < 0 && n.scrollTop + n.clientHeight >= n.scrollHeight - 1;
  }
  render() {
    return this.open ? u`<div
      class="backdrop"
      part="backdrop"
      style=${`--backdrop-opacity: ${Math.max(0, 1 - this.dragY / 400).toFixed(2)}`}
      @click=${() => this.close()}
      @keydown=${this.keydown}
      @touchstart=${this.touchStart}
      @touchmove=${this.touchMove}
      @wheel=${this.wheel}
    >
      <div
        class="panel ${this.wide ? "wide" : ""} ${this.dragging ? "dragging" : ""}"
        part="sheet"
        style=${this.dragY > 0 ? `transform: translateY(${this.dragY}px)` : ""}
        role="dialog"
        aria-modal="true"
        aria-labelledby="title"
        tabindex="-1"
        @click=${(t) => t.stopPropagation()}
      >
        <div class="top" @pointerdown=${this.dragStart} @pointermove=${this.dragMove} @pointerup=${this.dragEnd} @pointercancel=${this.dragEnd}>
          <div class="grabber" aria-hidden="true"></div>
          <div class="head">
            <div>
              <h2 id="title">${this.heading}</h2>
              ${this.sub ? u`<div class="sub">${this.sub}</div>` : m}
            </div>
            <button type="button" class="close" aria-label=${this.closeLabel} @click=${() => this.close()}>
              <span aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"></path></svg></span>
            </button>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>` : m;
  }
};
ne.styles = [Oe, W`
    :host {
      display: contents;
    }
    .backdrop {
      position: fixed;
      z-index: 9;
      inset: 0;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background: rgb(0 0 0 / calc(var(--hdk-sheet-backdrop, 60%) * var(--backdrop-opacity, 1)));
      overscroll-behavior: contain;
      touch-action: none;
    }
    .panel {
      box-sizing: border-box;
      width: 100%;
      max-width: 460px;
      max-height: 90vh;
      overflow: auto;
      overscroll-behavior: contain;
      padding: 16px 16px max(16px, env(safe-area-inset-bottom));
      border: 1px solid var(--hdk-sheet-border, rgb(255 255 255 / 10%));
      border-bottom: 0;
      border-radius: 24px 24px 0 0;
      background: var(--hdk-sheet-bg, #1c1c1e);
      color: var(--hdk-sheet-text, #ffffff);
      animation: rise 220ms ease-out;
      transition: transform 220ms ease-out;
    }
    .panel:focus {
      outline: none;
    }
    .panel.dragging {
      transition: none;
    }
    .top {
      margin: -8px -16px 0;
      padding: 8px 16px 0;
      touch-action: none;
      cursor: grab;
    }
    .grabber {
      width: 36px;
      height: 5px;
      margin: 0 auto 10px;
      border-radius: 3px;
      background: var(--hdk-sheet-grabber, rgb(255 255 255 / 28%));
    }
    .head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
    }
    /* The type scale of DASHBOARD_UX_SYSTEM.md (Písmo): Title 2 22/28 and Subhead 15/20 (uživatel 13. 11. 2026: „Q209 ano“). */
    h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      line-height: 28px;
    }
    .sub {
      color: var(--hdk-secondary, #9a9aa0);
      font-size: 15px;
      line-height: 20px;
    }
    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 44px;
      width: 44px;
      height: 44px;
      margin: -8px -8px 0 0;
      padding: 0;
      border: 0;
      background: none;
      color: var(--hdk-secondary, #9a9aa0);
      cursor: pointer;
    }
    .close span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--hdk-sheet-button, rgb(118 118 128 / 24%));
    }
    .close svg {
      width: 12px;
      height: 12px;
    }
    .close:focus-visible {
      border-radius: 50%;
      outline: 2px solid var(--hdk-accent, #0a84ff);
      outline-offset: -2px;
    }
    @keyframes rise {
      from {
        transform: translateY(24px);
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .panel {
        animation: none;
        transition: none;
      }
    }
    @media (min-width: 600px) {
      .backdrop {
        align-items: center;
      }
      .panel {
        border-bottom: 1px solid var(--hdk-sheet-border, rgb(255 255 255 / 10%));
        border-radius: 24px;
      }
      .grabber {
        display: none;
      }
    }
    @media (orientation: landscape) and (max-height: 600px) {
      .panel.wide {
        max-width: min(960px, calc(100% - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)));
        max-height: calc(100% - 16px);
      }
    }
  `];
let Y = ne;
lt([
  f({ type: Boolean, reflect: !0 })
], Y.prototype, "open");
lt([
  f()
], Y.prototype, "heading");
lt([
  f()
], Y.prototype, "sub");
lt([
  f()
], Y.prototype, "closeLabel");
lt([
  f({ type: Boolean })
], Y.prototype, "wide");
lt([
  S()
], Y.prototype, "dragY");
lt([
  S()
], Y.prototype, "dragging");
var jn = Object.defineProperty, U = (s, t, e, n) => {
  for (var i = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = a(t, e, i) || i);
  return i && jn(t, e, i), i;
};
const se = class se extends B {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [];
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, n = Math.max(0, Math.min(1, (t - this.min) / e)), i = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${n})`, o = this.mixed && this._drag === void 0 ? this.marks.map((c) => u`<i style="left:${(Math.max(0, Math.min(1, (c - this.min) / e)) * 100).toFixed(2)}%"></i>`) : [], a = this.tickStep || this.step || 1, r = Math.floor(e / a + 1e-9) + 1, d = r >= 2 && r <= 40 ? Array.from({ length: r }, (c, p) => u`<i style="left:${(p * a / e * 100).toFixed(2)}%"></i>`) : [];
    return u`<div class="wrap">
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(t)}
          aria-label=${this.label}
          aria-valuetext=${this.valueText || String(t)}
          ?disabled=${this.disabled}
          style="--fill: ${i}"
          @input=${this.onInput}
          @change=${this.onChange}
        />
        <div class="ticks" aria-hidden="true">${d}</div>
        ${o.length ? u`<div class="marks" aria-hidden="true">${o}</div>` : null}
      </div>
      ${this.minLabel || this.maxLabel ? u`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
se.styles = W`
    :host {
      display: block;
    }
    .wrap {
      position: relative;
      height: 52px;
    }
    input {
      -webkit-appearance: none;
      appearance: none;
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 52px;
      margin: 0;
      padding: 0 14px;
      border-radius: 26px;
      background: var(--hdk-track, #2c2c2e);
      cursor: pointer;
      touch-action: pan-y;
    }
    input:disabled {
      cursor: default;
      opacity: 0.45;
    }
    input::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(to right, var(--hdk-accent, #0a84ff) 0%, var(--hdk-accent, #0a84ff) var(--fill), var(--hdk-bar, rgb(255 255 255 / 14%)) var(--fill), var(--hdk-bar, rgb(255 255 255 / 14%)) 100%);
    }
    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      box-sizing: border-box;
      width: 38px;
      height: 24px;
      margin-top: -9px;
      border: 0;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
    }
    input::-moz-range-track {
      height: 6px;
      border-radius: 3px;
      background: var(--hdk-bar, rgb(255 255 255 / 14%));
    }
    input::-moz-range-progress {
      height: 6px;
      border-radius: 3px;
      background: var(--hdk-accent, #0a84ff);
    }
    input::-moz-range-thumb {
      box-sizing: border-box;
      width: 38px;
      height: 24px;
      border: 0;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
    }
    :host([mixed]) input::-webkit-slider-thumb {
      opacity: 0;
    }
    :host([mixed]) input::-moz-range-thumb {
      opacity: 0;
    }
    :host([mixed]) input::-moz-range-progress {
      background: transparent;
    }
    .marks {
      position: absolute;
      left: 33px;
      right: 33px;
      top: 16px;
      height: 20px;
      pointer-events: none;
    }
    .marks i {
      position: absolute;
      top: 0;
      margin-left: -1.5px;
      width: 3px;
      height: 20px;
      border-radius: 1.5px;
      background: var(--hdk-accent, #0a84ff);
    }
    input:focus-visible {
      outline: 2px solid var(--hdk-accent, #0a84ff);
      outline-offset: 2px;
    }
    /* Ticks at the steps, between the thumb centres at both ends. */
    .ticks {
      position: absolute;
      left: 33px;
      right: 33px;
      bottom: 7px;
      height: 5px;
      pointer-events: none;
    }
    .ticks i {
      position: absolute;
      top: 0;
      margin-left: -1px;
      width: 2px;
      height: 5px;
      border-radius: 1px;
      background: var(--hdk-tick, rgb(255 255 255 / 28%));
    }
    .ends {
      display: flex;
      justify-content: space-between;
      padding: 4px 14px 0;
      color: var(--hdk-secondary, #98989f);
      font-size: 13px;
      line-height: 18px;
    }
  `;
let N = se;
U([
  f({ type: Number })
], N.prototype, "min");
U([
  f({ type: Number })
], N.prototype, "max");
U([
  f({ type: Number })
], N.prototype, "step");
U([
  f({ type: Number })
], N.prototype, "tickStep");
U([
  f({ type: Number })
], N.prototype, "value");
U([
  f()
], N.prototype, "label");
U([
  f()
], N.prototype, "valueText");
U([
  f()
], N.prototype, "minLabel");
U([
  f()
], N.prototype, "maxLabel");
U([
  f({ type: Boolean })
], N.prototype, "disabled");
U([
  f({ type: Boolean, reflect: !0 })
], N.prototype, "mixed");
U([
  f({ attribute: !1 })
], N.prototype, "marks");
U([
  S()
], N.prototype, "_drag");
var Fn = Object.defineProperty, q = (s, t, e, n) => {
  for (var i = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = a(t, e, i) || i);
  return i && Fn(t, e, i), i;
};
const ie = class ie extends B {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new Xt(this), this.gesture = new Pt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return u`<button
        type="button"
        role="switch"
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${this.checked ? "true" : "false"}
        aria-busy=${this.pending ? "true" : m}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(t) => this.guarded && t.preventDefault()}
      ><span class="thumb"></span></button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? u`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  emit() {
    this.hints.hide(), this.dispatchEvent(new CustomEvent("hdk-toggle", { detail: { checked: !this.checked }, bubbles: !0, composed: !0 }));
  }
  onDown(t) {
    !this.guarded || this.disabled || t.button > 0 || this.gesture.start(() => this.emit());
  }
  onClick(t) {
    if (this.disabled) return;
    if (!this.guarded) {
      this.emit();
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.emit();
      return;
    }
    const e = this.gesture.tap("switch", t.timeStamp);
    e === "double" ? this.emit() : e === "single" && this.hints.show(this.hintSeconds);
  }
};
ie.styles = [
  Lt,
  W`
      :host {
        position: relative;
        display: inline-block;
        flex: none;
      }
      button {
        position: relative;
        display: block;
        box-sizing: border-box;
        width: 60px;
        height: 32px;
        padding: 0;
        border: 0;
        border-radius: 16px;
        background: var(--hdk-switch-off, rgb(120 120 128 / 36%));
        cursor: pointer;
        transition: background 0.2s;
        touch-action: manipulation;
        -webkit-touch-callout: none;
        user-select: none;
        -webkit-user-select: none;
      }
      button[aria-checked="true"] {
        background: var(--hdk-accent, #0a84ff);
      }
      :host([pending]) button {
        animation: hdk-switch-pending 1.3s ease-in-out infinite alternate;
      }
      @keyframes hdk-switch-pending {
        to {
          opacity: 0.5;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([pending]) button {
          animation: none;
          outline: 1.5px dashed var(--hdk-accent, #0a84ff);
          outline-offset: 2px;
        }
      }
      /* Invisible extension of the touch target to 44 px. */
      button::after {
        content: "";
        position: absolute;
        inset: -6px -4px;
      }
      .thumb {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 40px;
        height: 26px;
        box-sizing: border-box;
        border-radius: 13px;
        background: #fff;
        box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
        transition: left 0.25s cubic-bezier(0.3, 1.2, 0.5, 1);
      }
      button[aria-checked="true"] .thumb {
        left: 17px;
      }
      /* One tap on a protected switch: the thumb moves toward the new position and back. */
      button.nudge[aria-checked="false"] .thumb {
        left: 9px;
      }
      button.nudge[aria-checked="true"] .thumb {
        left: 11px;
      }
      button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: 3px;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      @media (prefers-reduced-motion: reduce) {
        button,
        .thumb {
          transition: none;
        }
        button.nudge[aria-checked="false"] .thumb {
          left: 3px;
        }
        button.nudge[aria-checked="true"] .thumb {
          left: 17px;
        }
      }
    `
];
let R = ie;
q([
  f({ type: Boolean })
], R.prototype, "checked");
q([
  f({ type: Boolean })
], R.prototype, "disabled");
q([
  f({ type: Boolean, reflect: !0 })
], R.prototype, "pending");
q([
  f()
], R.prototype, "label");
q([
  f({ type: Boolean })
], R.prototype, "guarded");
q([
  f({ type: Number })
], R.prototype, "holdMs");
q([
  f({ type: Number })
], R.prototype, "doubleTapMs");
q([
  f({ type: Number })
], R.prototype, "hintSeconds");
q([
  f()
], R.prototype, "hintPlacement");
q([
  f()
], R.prototype, "hint");
var Rn = Object.defineProperty, z = (s, t, e, n) => {
  for (var i = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = a(t, e, i) || i);
  return i && Rn(t, e, i), i;
};
const oe = class oe extends B {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new Xt(this), this.gesture = new Pt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  /** The state line is text from parts („WindFree · 24°“): it breaks only at the dot, and the dot goes (Text z částí). */
  updated() {
    Nt(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.kind === "toggle", e = this.count === void 0 ? null : u`<span class="count">${this.count}</span>`;
    return u`<button
        type="button"
        role=${t ? "switch" : "button"}
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${t ? this.state === "on" ? "true" : "false" : m}
        aria-pressed=${this.kind === "action" && this.pressed !== void 0 ? this.pressed ? "true" : "false" : m}
        aria-busy=${this.pending ? "true" : m}
        aria-haspopup=${this.kind === "open" ? "dialog" : m}
        aria-label=${this.label || m}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(n) => this.protected && n.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? u`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : u`<span class="text">${xt(this.text)}${e}</span>`}</button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? u`<div class="hint above ${this.hintAlign}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  /** Opening a popup changes nothing, so an `open` tile is never protected. */
  get protected() {
    return this.guarded && this.kind !== "open";
  }
  emit() {
    this.hints.hide();
    const [t, e] = this.kind === "toggle" ? ["hdk-toggle", { checked: this.state !== "on" }] : this.kind === "open" ? ["hdk-open", {}] : ["hdk-press", {}];
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  onDown(t) {
    !this.protected || this.disabled || t.button > 0 || this.gesture.start(() => this.emit());
  }
  onClick(t) {
    if (this.disabled) return;
    if (!this.protected) {
      this.emit();
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.emit();
      return;
    }
    const e = this.gesture.tap("tile", t.timeStamp);
    e === "double" ? this.emit() : e === "single" && this.hints.show(this.hintSeconds);
  }
};
oe.styles = [
  Lt,
  Kt,
  W`
      :host {
        position: relative;
        display: block;
        min-width: 0;
      }
      button {
        position: relative;
        /* The name starts at the top in every tile of a row, whatever the height of the tallest one. */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        min-height: 60px;
        margin: 0;
        padding: 10px 12px;
        border: 0;
        border-radius: 12px;
        background: var(--hdk-tile, #1c1c1e);
        color: var(--hdk-tile-text, #fff);
        font: inherit;
        text-align: start;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-touch-callout: none;
        user-select: none;
        -webkit-user-select: none;
      }
      :host([state="off"]) button {
        background: transparent;
        box-shadow: inset 0 0 0 1px var(--hdk-tile-border, rgb(84 84 88 / 65%));
      }
      :host([state="on"]) button {
        background: var(--hdk-tile-on, #0a6ed1);
        color: var(--hdk-tile-on-text, #fff);
        box-shadow: inset 0 0 0 1.5px var(--hdk-tile-on-border, transparent);
      }
      :host([state="mixed"]) button {
        background: var(--hdk-tile-mixed, #17395d);
      }
      /* Sent and on its way: the fill goes between its own and the accent until Home Assistant reports the result. */
      :host([pending]) button {
        animation: hdk-pending 1.3s ease-in-out infinite alternate;
      }
      @keyframes hdk-pending {
        to {
          background: var(--hdk-tile-on, #0a6ed1);
          color: var(--hdk-tile-on-text, #fff);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([pending]) button {
          animation: none;
          background: var(--hdk-tile-mixed, #17395d);
          /* Not by colour alone: a dashed accent outline marks the command on its way. */
          outline: 1.5px dashed var(--hdk-tile-on, #0a6ed1);
          outline-offset: -1.5px;
        }
      }
      .name {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        font-size: 15px;
        line-height: 20px;
        font-weight: 600;
        overflow-wrap: anywhere;
      }
      .name > span:first-child {
        flex: 1;
        min-width: 0;
      }
      .chevron {
        flex: none;
        font-weight: 400;
        color: var(--hdk-secondary, #98989f);
      }
      .text {
        display: block;
        font-size: 13px;
        line-height: 18px;
        color: var(--hdk-secondary, #98989f);
      }
      :host([state="on"]) .text,
      :host([state="on"]) .chevron {
        color: var(--hdk-tile-on-sub, #fff);
      }
      :host([centered]) button {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 52px;
        text-align: center;
      }
      :host([centered]) .name {
        font-size: 17px;
        line-height: 22px;
      }
      :host([centered]) .name > span:first-child {
        flex: none;
      }
      .count {
        flex: none;
        display: grid;
        place-items: center;
        min-width: 22px;
        height: 22px;
        box-sizing: border-box;
        padding: 0 6px;
        border-radius: 11px;
        background: var(--hdk-tile-badge, rgb(255 255 255 / 16%));
        font-size: 13px;
        line-height: 18px;
        font-weight: 600;
      }
      button:active:not(:disabled),
      button.nudge {
        filter: brightness(1.18);
      }
      button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: 2px;
      }
      .hint.start {
        right: auto;
        left: 0;
      }
      .hint.start i {
        left: 25px;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
    `
];
let A = oe;
z([
  f()
], A.prototype, "name");
z([
  f()
], A.prototype, "text");
z([
  f({ reflect: !0 })
], A.prototype, "state");
z([
  f()
], A.prototype, "kind");
z([
  f({ type: Number })
], A.prototype, "count");
z([
  f({ type: Boolean, reflect: !0 })
], A.prototype, "centered");
z([
  f({ type: Boolean })
], A.prototype, "disabled");
z([
  f({ type: Boolean, reflect: !0 })
], A.prototype, "pending");
z([
  f({ type: Boolean })
], A.prototype, "pressed");
z([
  f()
], A.prototype, "label");
z([
  f({ type: Boolean })
], A.prototype, "guarded");
z([
  f({ type: Number })
], A.prototype, "holdMs");
z([
  f({ type: Number })
], A.prototype, "doubleTapMs");
z([
  f({ type: Number })
], A.prototype, "hintSeconds");
z([
  f()
], A.prototype, "hint");
z([
  f()
], A.prototype, "hintAlign");
function Un(s) {
  const t = [
    [`${s}-switch`, R],
    [`${s}-segmented`, T],
    [`${s}-slider`, N],
    [`${s}-ring`, X],
    [`${s}-tile`, A],
    [`${s}-sheet`, Y]
  ];
  for (const [e, n] of t)
    customElements.get(e) || customElements.define(e, n);
}
const Bn = ["cs", "en", "sv"];
class Pe extends Error {
}
function x(s) {
  throw new Pe(s);
}
function In(s, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Pe ? new Error(`${s}: ${e.message}`) : e;
  }
}
function H(s) {
  return typeof s == "object" && s !== null && !Array.isArray(s);
}
function st(s, t) {
  return s == null ? {} : (H(s) || x(`"${t}" must be a mapping of keys.`), s);
}
function D(s, t, e) {
  for (const n of Object.keys(s))
    t.includes(n) || x(`${e}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function M(s, t, e = {}) {
  if (s == null)
    return;
  const n = typeof s == "string" ? s.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(n) || x(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !n.startsWith(`${e.domain}.`) && x(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${n}.`), n;
}
function Hn(s, t) {
  if (s != null)
    return (typeof s != "string" || !s.trim()) && x(`${t} must be a non-empty text.`), s.trim();
}
function J(s, t) {
  if (s != null) {
    if (typeof s == "string" && s.trim())
      return s.trim();
    if (H(s) && Object.keys(s).length > 0) {
      const e = Object.entries(s);
      if (e.every(([n, i]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(n) && typeof i == "string" && i.trim()))
        return Object.fromEntries(e.map(([n, i]) => [n, i.trim()]));
    }
    return x(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Wn(s, t) {
  if (s === void 0 || typeof s == "string")
    return s;
  const e = t.toLowerCase();
  return s[e] ?? s[e.split("-")[0]] ?? s.en ?? Object.values(s)[0];
}
const we = ["auto", ...Bn];
function Vn(s) {
  const t = s ?? "auto";
  return we.includes(t) || x(`language must be one of ${we.join(", ")}.`), t;
}
const Yn = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function it(s) {
  return Yn.has(s);
}
function E(s, t) {
  return t ? s?.states?.[t] : void 0;
}
function C(s, t) {
  const e = E(s, t)?.state;
  return e === void 0 || it(e) ? void 0 : e;
}
function yt(s, t) {
  const e = C(s, t);
  if (e === void 0)
    return;
  const n = Number(e);
  return Number.isFinite(n) ? n : void 0;
}
const qn = 168 * 36e5;
function Le(s) {
  if (s == null) return;
  const t = typeof s == "number" ? s < 1e11 ? s * 1e3 : s : Date.parse(s);
  return Number.isFinite(t) ? t : void 0;
}
function Kn(s) {
  let t;
  for (const e of s ?? []) {
    const n = e.s ?? e.state, i = Le(e.lu ?? e.last_updated);
    n === void 0 || i === void 0 || n === "unavailable" || n === "unknown" || n === "" || (t === void 0 || t.state !== n) && (t = { state: n, start: i });
  }
  return t;
}
class Gn {
  constructor(t, e = Date.now) {
    this.onChange = t, this.now = e, this.known = /* @__PURE__ */ new Map(), this.wanted = /* @__PURE__ */ new Map(), this.pending = /* @__PURE__ */ new Map(), this.scheduled = !1;
  }
  /** The moment (ms) the entity got its current state; undefined when the entity is missing or has no time. */
  of(t, e) {
    const n = E(t, e);
    if (!t || !e || !n) return;
    const i = Le(n.last_changed), o = `${n.state}|${n.last_changed ?? ""}`, a = this.known.get(e);
    return a?.key === o ? a.start === void 0 ? i : Math.min(a.start, i ?? a.start) : (this.hass = t, this.wanted.get(e) !== o && this.pending.get(e) !== o && (this.wanted.set(e, o), this.schedule()), i);
  }
  schedule() {
    this.scheduled || (this.scheduled = !0, Promise.resolve().then(() => this.flush()));
  }
  async flush() {
    this.scheduled = !1;
    const t = this.hass, e = new Map(this.wanted);
    if (this.wanted.clear(), !t || !e.size) return;
    for (const [o, a] of e) this.pending.set(o, a);
    const n = this.now();
    let i;
    try {
      i = await t.callWS({
        type: "history/history_during_period",
        start_time: new Date(n - qn).toISOString(),
        end_time: new Date(n).toISOString(),
        entity_ids: [...e.keys()],
        include_start_time_state: !0,
        significant_changes_only: !1,
        minimal_response: !0,
        no_attributes: !0
      });
    } catch {
      i = void 0;
    }
    for (const [o, a] of e) {
      if (this.pending.get(o) === a && this.pending.delete(o), this.wanted.has(o)) continue;
      const r = Kn(i?.[o]), d = E(this.hass, o)?.state;
      this.known.set(o, { key: a, start: r && r.state === d ? r.start : void 0 });
    }
    this.onChange();
  }
}
class Zn {
  /** `changed` is called whenever a control starts or stops pulsing (the card re-renders). */
  constructor(t, e = 5e3) {
    this.changed = t, this.stallMs = e, this.watches = /* @__PURE__ */ new Map();
  }
  has(t) {
    return this.watches.has(t);
  }
  /** The command was sent. A state that is already there pulses not at all. */
  start(t, e, n) {
    if (this.stop(t, !1), e && n.done(e)) {
      this.changed();
      return;
    }
    const i = { ...n, signature: ke(e, n.entities) };
    this.watches.set(t, i), this.arm(t, i), this.changed();
  }
  /** The call failed, or the card goes away. */
  stop(t, e = !0) {
    const n = this.watches.get(t);
    n && (clearTimeout(n.timer), this.watches.delete(t), e && this.changed());
  }
  /** On every update of Home Assistant: arrived ones stop, moving ones get the full stall time again. */
  check(t) {
    if (t)
      for (const [e, n] of [...this.watches]) {
        if (n.done(t)) {
          this.stop(e);
          continue;
        }
        const i = ke(t, n.entities);
        i !== n.signature && (n.signature = i, this.arm(e, n));
      }
  }
  clear() {
    for (const t of [...this.watches.keys()]) this.stop(t, !1);
  }
  arm(t, e) {
    clearTimeout(e.timer), e.timer = setTimeout(() => this.stop(t), this.stallMs);
  }
}
function ke(s, t) {
  return t.map((e) => {
    const n = s?.states[e];
    return n ? `${n.state}|${JSON.stringify(n.attributes)}` : "";
  }).join("§");
}
const Xn = [
  { name: { cs: "Den", en: "Day", sv: "Dag" }, position: 100, tilt: 100 },
  { name: { cs: "Stín", en: "Shade", sv: "Skugga" }, position: 0, tilt: 100 },
  { name: { cs: "Tma", en: "Dark", sv: "Mörker" }, position: 0, tilt: 0 }
];
function Q(s, t) {
  return s == null ? [] : (Array.isArray(s) || x(`"${t}" must be a list.`), s);
}
function G(s, t, e, n, i) {
  return s == null ? e : ((typeof s != "number" || !Number.isFinite(s) || s < n || s > i) && x(`${t} must be a number from ${n} to ${i}.`), s);
}
function Z(s, t, e) {
  return Q(s, t).map((n, i) => {
    const o = `${t}[${i}]`;
    H(n) || x(`${o} must be a mapping with name and entity.`), D(n, ["name", "entity"], o);
    const a = J(n.name, `${o}.name`) ?? x(`${o}.name is missing.`), r = M(n.entity, `${o}.entity`, { example: `${e[0]}.example` }) ?? x(`${o}.entity is missing.`);
    return e.includes(r.split(".")[0]) || x(`${o}.entity must be one of ${e.join(", ")}, not ${r}.`), { name: a, entity: r };
  });
}
function Jn(s) {
  H(s) || x("the configuration must be a mapping of keys.");
  const t = st(s.covers, "covers");
  D(t, ["script", "entities", "last_action", "presets", "tolerance"], "covers");
  const e = {}, n = Q(t.entities, "covers.entities").map((g, k) => {
    const v = `covers.entities[${k}]`;
    if (!H(g)) return M(g, v, { domain: "cover" }) ?? x(`${v} is missing.`);
    D(g, ["name", "entity"], v);
    const w = M(g.entity, `${v}.entity`, { domain: "cover" }) ?? x(`${v}.entity is missing.`), O = J(g.name, `${v}.name`);
    return O !== void 0 && (e[w] = O), w;
  }), i = st(s.ventilation, "ventilation");
  D(i, ["mode", "fans"], "ventilation");
  const o = st(s.heating, "heating");
  D(o, ["resume", "rooms"], "heating");
  const a = st(s.cooling, "cooling");
  D(a, ["rooms"], "cooling");
  const r = st(s.guard, "guard");
  D(r, ["hold_ms", "double_tap_ms", "hint_seconds"], "guard");
  const d = st(s.house_modes, "house_modes");
  D(d, ["winter", "summer"], "house_modes");
  const c = Q(t.presets, "covers.presets").map((g, k) => {
    const v = `covers.presets[${k}]`;
    return H(g) || x(`${v} must be a mapping with name, position and tilt.`), D(g, ["name", "position", "tilt"], v), {
      name: J(g.name, `${v}.name`) ?? x(`${v}.name is missing.`),
      position: G(g.position, `${v}.position`, 0, 0, 100),
      tilt: G(g.tilt, `${v}.tilt`, 0, 0, 100)
    };
  }), p = Q(s.batteries, "batteries").map((g, k) => {
    const v = `batteries[${k}]`;
    return H(g) || x(`${v} must be a mapping with name and low.`), D(g, ["name", "low", "level", "type"], v), {
      name: J(g.name, `${v}.name`) ?? x(`${v}.name is missing.`),
      low: M(g.low, `${v}.low`, { domain: "binary_sensor" }) ?? x(`${v}.low is missing.`),
      level: M(g.level, `${v}.level`, { domain: "sensor" }),
      type: M(g.type, `${v}.type`, { domain: "sensor" })
    };
  }), l = Q(s.filters, "filters").map((g, k) => {
    const v = `filters[${k}]`;
    return H(g) || x(`${v} must be a mapping with name, hours and threshold.`), D(g, ["name", "hours", "threshold"], v), {
      name: J(g.name, `${v}.name`) ?? x(`${v}.name is missing.`),
      hours: M(g.hours, `${v}.hours`, { domain: "input_number" }) ?? x(`${v}.hours is missing.`),
      threshold: M(g.threshold, `${v}.threshold`, { domain: "select" }) ?? x(`${v}.threshold is missing.`)
    };
  }), h = Q(s.maintenance, "maintenance").map((g, k) => {
    const v = `maintenance[${k}]`;
    return H(g) || x(`${v} must be a mapping with name, task, counter and every.`), D(g, ["name", "task", "counter", "every"], v), {
      name: J(g.name, `${v}.name`) ?? x(`${v}.name is missing.`),
      task: J(g.task, `${v}.task`) ?? x(`${v}.task is missing.`),
      counter: M(g.counter, `${v}.counter`, { domain: "counter" }) ?? x(`${v}.counter is missing.`),
      every: G(g.every, `${v}.every`, 30, 1, 1e3)
    };
  }), b = Q(s.devices, "devices").map((g, k) => {
    const v = `devices[${k}]`;
    return H(g) || x(`${v} must be a mapping with name and entities.`), D(g, ["name", "entities"], v), {
      name: J(g.name, `${v}.name`) ?? x(`${v}.name is missing.`),
      entities: Z(g.entities, `${v}.entities`, ["light", "switch", "fan", "input_boolean", "vacuum"])
    };
  }), $ = st(s.health, "health");
  return D($, ["battery_low", "batteries", "connections", "system", "updates"], "health"), $.updates !== void 0 && typeof $.updates != "boolean" && x("health.updates must be true or false."), {
    language: Vn(s.language),
    houseMode: M(s.house_mode_entity, "house_mode_entity", { domain: "input_select" }),
    summer: Hn(d.summer, "house_modes.summer") ?? "Léto",
    failedActions: M(s.failed_actions, "failed_actions", { domain: "sensor" }),
    clearFailed: M(s.clear_failed_script, "clear_failed_script", { domain: "script" }),
    snoozed: M(s.snoozed, "snoozed", { domain: "sensor" }),
    snoozeScript: M(s.snooze_script, "snooze_script", { domain: "script" }),
    batteries: p,
    filters: l,
    laundry: Z(s.laundry, "laundry", ["input_boolean"]),
    maintenance: h,
    running: Z(s.running, "running", ["input_boolean", "binary_sensor", "switch", "vacuum"]),
    covers: {
      script: M(t.script, "covers.script", { domain: "script" }) ?? "script.zaluzie_posun",
      entities: n,
      names: e,
      lastAction: M(t.last_action, "covers.last_action", { domain: "sensor" }),
      presets: c.length ? c : Xn,
      tolerance: G(t.tolerance, "covers.tolerance", 5, 0, 20)
    },
    ventilation: {
      mode: M(i.mode, "ventilation.mode", { domain: "input_boolean" }),
      fans: Z(i.fans, "ventilation.fans", ["switch", "fan"])
    },
    heating: {
      resume: M(o.resume, "heating.resume", { domain: "button" }),
      rooms: Z(o.rooms, "heating.rooms", ["climate"])
    },
    cooling: { rooms: Z(a.rooms, "cooling.rooms", ["climate"]) },
    devices: b,
    health: {
      batteryLow: G($.battery_low, "health.battery_low", 20, 1, 99),
      batteries: Z($.batteries, "health.batteries", ["sensor"]),
      connections: Z($.connections, "health.connections", ["binary_sensor"]),
      system: Q($.system, "health.system").map((g, k) => {
        const v = `health.system[${k}]`;
        H(g) || x(`${v} must be a mapping with name and entity.`), D(g, ["name", "entity", "max"], v);
        const [w] = Z([{ name: g.name, entity: g.entity }], v, ["sensor", "binary_sensor"]);
        return g.max !== void 0 && (typeof g.max != "number" || !Number.isFinite(g.max)) && x(`${v}.max must be a number.`), { ...w, max: g.max };
      }),
      updates: $.updates === !0
    },
    sendDelaySeconds: G(s.send_delay_seconds, "send_delay_seconds", 2, 0, 30),
    guard: {
      holdMs: G(r.hold_ms, "guard.hold_ms", 550, 200, 3e3),
      doubleTapMs: G(r.double_tap_ms, "guard.double_tap_ms", 400, 150, 1500),
      hintSeconds: G(r.hint_seconds, "guard.hint_seconds", 3, 1, 10)
    }
  };
}
function Qn(s) {
  return In("Dům Dashboard", () => Jn(s));
}
function je(s) {
  return (s?.locale?.language || s?.language || "").trim();
}
function Jt(s) {
  const t = s.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function ts(s, t) {
  return s === "auto" ? Jt(je(t)) : s;
}
function es() {
  return Jt(document.documentElement.lang || navigator.language || "");
}
const _e = /* @__PURE__ */ new WeakMap(), ns = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, ss = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), is = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Rt(s, t) {
  const e = s?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function os(s, t, e) {
  const n = je(e).replace("_", "-"), i = n !== "" && Jt(n) === t ? n : ns[t], o = Rt(e, "number_format"), a = Rt(e, "time_format"), r = Rt(e, "date_format"), d = [t, i, o, a, r].join("|");
  let c = _e.get(s);
  c || (c = /* @__PURE__ */ new Map(), _e.set(s, c));
  let p = c.get(d);
  return p || (p = ls(s[t], t, i, o, a, r), c.set(d, p)), p;
}
function as(s) {
  try {
    return new Intl.NumberFormat(s), s;
  } catch {
    return "en";
  }
}
function rs(s, t) {
  if (s === "12")
    return !0;
  if (s === "24")
    return !1;
  const e = s === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function ls(s, t, e, n, i, o) {
  const a = as(e), r = n === "system" ? void 0 : n === "none" ? "en-US" : is[n] ?? a, d = n === "none" ? { useGrouping: !1 } : {}, c = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...d }), p = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...d }), l = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...d }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...d }), b = rs(i, a), $ = b ? "h12" : "h23", g = new Intl.DateTimeFormat(a, { hour: b ? "numeric" : "2-digit", minute: "2-digit", hourCycle: $ }), k = new Intl.DateTimeFormat(a, b ? { hour: "numeric", hourCycle: $ } : { hour: "2-digit", minute: "2-digit", hourCycle: $ }), v = o === "system" ? void 0 : a, w = new Intl.DateTimeFormat(v, { day: "numeric", month: "numeric" }), O = (_) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return w.format(_);
    const y = w.formatToParts(_), K = y.find((bt) => bt.type === "literal")?.value ?? "/", ft = y[y.length - 1], gt = ft?.type === "literal" ? ft.value : "", re = y.find((bt) => bt.type === "day")?.value ?? "", le = y.find((bt) => bt.type === "month")?.value ?? "";
    return o === "DMY" ? `${re}${K}${le}${gt}` : `${le}${K}${re}${gt}`;
  }, F = ss.has(a.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: a,
    t: s,
    one: (_) => c.format(_),
    two: (_) => p.format(_),
    half: (_) => l.format(Math.round(_ * 2) / 2),
    tick: (_) => l.format(_),
    whole: (_) => h.format(_),
    percent: (_) => `${_}${F}%`,
    time: (_) => g.format(_),
    hour: (_) => k.format(_),
    day: O
  };
}
const ds = {
  cardDescription: "Řídicí centrum domu: co tě potřebuje a ovládání na jednom místě.",
  title: "Dům",
  needsYou: "Potřebuje tebe",
  nothingWaits: "Nic na tebe nečeká",
  retry: "Zkusit znovu",
  snooze: "Odložit",
  snoozeFor: { day: "O den", weekend: "Na víkend", week: "O týden", month: "O měsíc" },
  done: "Hotovo",
  battery: (s) => s ? `Baterie ${s}` : "Slabá baterie",
  filter: (s, t) => `Vyčistit filtr · ${s} z ${t}`,
  laundry: (s) => s ? `Prádlo čeká · od ${s}` : "Prádlo čeká",
  cycles: (s, t) => `${s} z ${t} cyklů`,
  running: "Teď běží",
  nothingRuns: "Nic neběží",
  minutes: (s) => `${s} min`,
  hours: (s, t) => t ? `${s} h ${t} min` : `${s} h`,
  covers: "Žaluzie",
  coversDetail: "Podrobnosti žaluzií",
  close: "Zavřít",
  log: "Co se stalo",
  logNew: (s, t) => `${s} ${s === 1 ? "nová událost" : s < 5 ? "nové události" : "nových událostí"} od ${t}`,
  logToday: (s) => `${s} ${s === 1 ? "událost" : s < 5 ? "události" : "událostí"} dnes`,
  logNothingNew: "Nic nového",
  logSince: "Od minulého otevření",
  logEarlier: "Dříve dnes",
  logEmpty: "Dnes se nic nestalo.",
  logFailed: "Deník se nepodařilo načíst.",
  rules: "Pravidla domu",
  rulesCount: (s) => `${s} ${s === 1 || s < 5 ? "automatizace" : "automatizací"}`,
  rulesLoading: "Načítám…",
  rulesFailed: "Pravidla se nepodařilo načíst.",
  health: "Zdraví",
  healthAttention: "Vyžaduje pozornost",
  healthBatteries: "Baterie čidel",
  healthLowest: (s) => `Nejslabší ${s}`,
  healthConnections: "Připojení",
  healthAllOnline: "Vše připojeno",
  healthOfflineCount: (s) => `${s} ${s === 1 ? "odpojeno" : "odpojeny"}`,
  healthOnline: "Připojeno",
  healthOffline: "Odpojeno",
  healthSystem: "Systém",
  healthOk: "V pořádku",
  healthProblem: "Problém",
  healthUpdates: "Aktualizace",
  healthUpdatesCount: (s) => `${s} ${s === 1 ? "dostupná" : s < 5 ? "dostupné" : "dostupných"}`,
  healthUpToDate: "Vše aktuální",
  logRuns: "Běží",
  logFinished: "Doběhla",
  logLaundryWaits: "Prádlo čeká",
  logLaundryOut: "Prádlo vyndáno",
  climate: {
    rooms: "Místnosti",
    temperature: "Cílová teplota",
    mode: "Režim",
    modes: { plan: "Plán", manual: "Ručně", boost: "Boost", off: "Vypnuto", cool: "Chlazení", wind_free: "WindFree", heat: "Topení", fan_only: "Větrání", dry: "Sušení", auto: "Auto", sleep: "Spánek" },
    unavailable: "Nedostupné",
    now: (s) => `Teď ${s}`,
    heats: "topí",
    targets: (s) => `Cíl: ${s}`,
    mixedModes: (s) => `Různé režimy: ${s}`,
    firstChange: "První změna nastaví všechny vybrané stejně.",
    manualFor: "Ručně platí",
    manualForChoices: { next: "Do změny plánu", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Trvale" },
    offAfter: "Vypnout za",
    offAfterChoices: { 0: "Nevypínat", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Do další změny plánu, potom zpět na plán.",
    untilTime: (s) => `Do ${s}, potom zpět na plán.`,
    untilChanged: "Platí, dokud ho nezměníš.",
    runsUntilOff: "Běží, dokud ji nevypneš.",
    offAt: (s) => `Běží do ${s}, potom se vypne.`,
    fan: "Síla větru",
    swing: "Směr proudění",
    fanModes: { auto: "Auto", low: "Nízká", medium: "Střední", high: "Vysoká", turbo: "Turbo", quiet: "Tichá" },
    swingModes: { off: "Pevně", vertical: "Svisle", horizontal: "Vodorovně", both: "Vše" },
    detail: "Detail a historie",
    sending: "Odesílá se",
    failed: "Nepodařilo se"
  },
  who: { morning: "Ranní fáze", noon: "Polední fáze", evening: "Večerní fáze", night: "Noční fáze", vetrani: "Větrací režim", aplikace: "Aplikace", automatika: "Automatika", rucne: "Ručně" },
  notArrived: (s) => `Nedojela ${s}`,
  notArrivedTo: (s) => `Nedojela do ${s}`,
  ventilation: "Větrání",
  ventilationMode: "Větrací režim",
  heating: "Topení",
  cooling: "Klimatizace",
  off: "Vypnuto",
  on: "Zapnuto",
  runs: (s) => `Běží ${s}`,
  unavailable: "Nedostupné",
  schedule: "Plán",
  manual: "Ručně",
  manualCount: (s) => `${s} ručně`,
  resume: "Zpět na plán",
  allOff: "Vypnout vše",
  hint: "Podrž nebo klepni dvakrát",
  mode: { cool: "Chlazení", wind_free: "WindFree", heat: "Topení", fan_only: "Větrání", dry: "Sušení", auto: "Auto" },
  failed: "Nepodařilo se"
}, hs = {
  cardDescription: "The control centre of the house: what needs you and the controls in one place.",
  title: "House",
  needsYou: "Needs you",
  nothingWaits: "Nothing is waiting for you",
  retry: "Try again",
  snooze: "Later",
  snoozeFor: { day: "A day", weekend: "To the weekend", week: "A week", month: "A month" },
  done: "Done",
  battery: (s) => s ? `Battery ${s}` : "Low battery",
  filter: (s, t) => `Clean the filter · ${s} of ${t}`,
  laundry: (s) => s ? `Laundry waiting · since ${s}` : "Laundry waiting",
  cycles: (s, t) => `${s} of ${t} cycles`,
  running: "Running now",
  nothingRuns: "Nothing is running",
  minutes: (s) => `${s} min`,
  hours: (s, t) => t ? `${s} h ${t} min` : `${s} h`,
  covers: "Blinds",
  coversDetail: "Blinds in detail",
  close: "Close",
  log: "What happened",
  logNew: (s, t) => `${s} new ${s === 1 ? "event" : "events"} since ${t}`,
  logToday: (s) => `${s} ${s === 1 ? "event" : "events"} today`,
  logNothingNew: "Nothing new",
  logSince: "Since you last looked",
  logEarlier: "Earlier today",
  logEmpty: "Nothing happened today.",
  logFailed: "The logbook could not be loaded.",
  rules: "House rules",
  rulesCount: (s) => `${s} ${s === 1 ? "automation" : "automations"}`,
  rulesLoading: "Loading…",
  rulesFailed: "The rules could not be loaded.",
  health: "Health",
  healthAttention: "Needs attention",
  healthBatteries: "Sensor batteries",
  healthLowest: (s) => `Lowest ${s}`,
  healthConnections: "Connections",
  healthAllOnline: "All connected",
  healthOfflineCount: (s) => `${s} offline`,
  healthOnline: "Connected",
  healthOffline: "Offline",
  healthSystem: "System",
  healthOk: "OK",
  healthProblem: "Problem",
  healthUpdates: "Updates",
  healthUpdatesCount: (s) => `${s} available`,
  healthUpToDate: "All up to date",
  logRuns: "Running",
  logFinished: "Finished",
  logLaundryWaits: "Laundry waiting",
  logLaundryOut: "Laundry taken out",
  climate: {
    rooms: "Rooms",
    temperature: "Target temperature",
    mode: "Mode",
    modes: { plan: "Schedule", manual: "Manual", boost: "Boost", off: "Off", cool: "Cooling", wind_free: "WindFree", heat: "Heating", fan_only: "Fan", dry: "Drying", auto: "Auto", sleep: "Sleep" },
    unavailable: "Unavailable",
    now: (s) => `Now ${s}`,
    heats: "heating",
    targets: (s) => `Target: ${s}`,
    mixedModes: (s) => `Different modes: ${s}`,
    firstChange: "The first change sets all selected rooms the same.",
    manualFor: "Manual holds",
    manualForChoices: { next: "Until schedule", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Always" },
    offAfter: "Turn off in",
    offAfterChoices: { 0: "Never", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Until the next change of the schedule, then back to the schedule.",
    untilTime: (s) => `Until ${s}, then back to the schedule.`,
    untilChanged: "Holds until you change it.",
    runsUntilOff: "Runs until you turn it off.",
    offAt: (s) => `Runs until ${s}, then turns off.`,
    fan: "Fan speed",
    swing: "Air direction",
    fanModes: { auto: "Auto", low: "Low", medium: "Medium", high: "High", turbo: "Turbo", quiet: "Quiet" },
    swingModes: { off: "Fixed", vertical: "Vertical", horizontal: "Horizontal", both: "Both" },
    detail: "Details and history",
    sending: "Sending",
    failed: "It did not work"
  },
  who: { morning: "Morning phase", noon: "Noon phase", evening: "Evening phase", night: "Night phase", vetrani: "Airing mode", aplikace: "App", automatika: "Automation", rucne: "By hand" },
  notArrived: (s) => `Did not arrive ${s}`,
  notArrivedTo: (s) => `Did not reach ${s}`,
  ventilation: "Ventilation",
  ventilationMode: "Airing mode",
  heating: "Heating",
  cooling: "Air conditioning",
  off: "Off",
  on: "On",
  runs: (s) => `Running ${s}`,
  unavailable: "Unavailable",
  schedule: "Schedule",
  manual: "Manual",
  manualCount: (s) => `${s} manual`,
  resume: "Back to schedule",
  allOff: "Turn all off",
  hint: "Hold or tap twice",
  mode: { cool: "Cooling", wind_free: "WindFree", heat: "Heating", fan_only: "Fan", dry: "Drying", auto: "Auto" },
  failed: "It did not work"
}, cs = {
  cardDescription: "Husets kontrollcenter: vad som behöver dig och styrningen på ett ställe.",
  title: "Hus",
  needsYou: "Behöver dig",
  nothingWaits: "Inget väntar på dig",
  retry: "Försök igen",
  snooze: "Senare",
  snoozeFor: { day: "En dag", weekend: "Till helgen", week: "En vecka", month: "En månad" },
  done: "Klart",
  battery: (s) => s ? `Batteri ${s}` : "Svagt batteri",
  filter: (s, t) => `Rengör filtret · ${s} av ${t}`,
  laundry: (s) => s ? `Tvätt väntar · sedan ${s}` : "Tvätt väntar",
  cycles: (s, t) => `${s} av ${t} cykler`,
  running: "Körs nu",
  nothingRuns: "Inget körs",
  minutes: (s) => `${s} min`,
  hours: (s, t) => t ? `${s} h ${t} min` : `${s} h`,
  covers: "Persienner",
  coversDetail: "Persienner i detalj",
  close: "Stäng",
  log: "Vad hände",
  logNew: (s, t) => `${s} ${s === 1 ? "ny händelse" : "nya händelser"} sedan ${t}`,
  logToday: (s) => `${s} ${s === 1 ? "händelse" : "händelser"} i dag`,
  logNothingNew: "Inget nytt",
  logSince: "Sedan du tittade senast",
  logEarlier: "Tidigare i dag",
  logEmpty: "Inget har hänt i dag.",
  logFailed: "Loggboken kunde inte läsas in.",
  rules: "Husets regler",
  rulesCount: (s) => `${s} ${s === 1 ? "automation" : "automationer"}`,
  rulesLoading: "Läser in…",
  rulesFailed: "Reglerna kunde inte läsas in.",
  health: "Hälsa",
  healthAttention: "Kräver uppmärksamhet",
  healthBatteries: "Sensorbatterier",
  healthLowest: (s) => `Lägst ${s}`,
  healthConnections: "Anslutningar",
  healthAllOnline: "Allt anslutet",
  healthOfflineCount: (s) => `${s} frånkopplade`,
  healthOnline: "Ansluten",
  healthOffline: "Frånkopplad",
  healthSystem: "System",
  healthOk: "OK",
  healthProblem: "Problem",
  healthUpdates: "Uppdateringar",
  healthUpdatesCount: (s) => `${s} tillgängliga`,
  healthUpToDate: "Allt är uppdaterat",
  logRuns: "Kör",
  logFinished: "Klar",
  logLaundryWaits: "Tvätten väntar",
  logLaundryOut: "Tvätten urtagen",
  climate: {
    rooms: "Rum",
    temperature: "Måltemperatur",
    mode: "Läge",
    modes: { plan: "Schema", manual: "Manuellt", boost: "Boost", off: "Av", cool: "Kylning", wind_free: "WindFree", heat: "Värme", fan_only: "Fläkt", dry: "Avfuktning", auto: "Auto", sleep: "Sömn" },
    unavailable: "Ej tillgänglig",
    now: (s) => `Nu ${s}`,
    heats: "värmer",
    targets: (s) => `Mål: ${s}`,
    mixedModes: (s) => `Olika lägen: ${s}`,
    firstChange: "Första ändringen ställer alla valda rum lika.",
    manualFor: "Manuellt gäller",
    manualForChoices: { next: "Till schemat", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Alltid" },
    offAfter: "Stäng av om",
    offAfterChoices: { 0: "Aldrig", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Till nästa ändring i schemat, sedan tillbaka till schemat.",
    untilTime: (s) => `Till ${s}, sedan tillbaka till schemat.`,
    untilChanged: "Gäller tills du ändrar det.",
    runsUntilOff: "Går tills du stänger av den.",
    offAt: (s) => `Går till ${s}, stängs sedan av.`,
    fan: "Fläkthastighet",
    swing: "Luftriktning",
    fanModes: { auto: "Auto", low: "Låg", medium: "Medel", high: "Hög", turbo: "Turbo", quiet: "Tyst" },
    swingModes: { off: "Fast", vertical: "Vertikalt", horizontal: "Horisontellt", both: "Båda" },
    detail: "Detaljer och historik",
    sending: "Skickar",
    failed: "Det gick inte"
  },
  who: { morning: "Morgonfas", noon: "Middagsfas", evening: "Kvällsfas", night: "Nattfas", vetrani: "Vädringsläge", aplikace: "Appen", automatika: "Automatik", rucne: "För hand" },
  notArrived: (s) => `Kom inte fram ${s}`,
  notArrivedTo: (s) => `Nådde inte ${s}`,
  ventilation: "Ventilation",
  ventilationMode: "Vädringsläge",
  heating: "Värme",
  cooling: "Luftkonditionering",
  off: "Av",
  on: "På",
  runs: (s) => `Går ${s}`,
  unavailable: "Otillgänglig",
  schedule: "Schema",
  manual: "Manuellt",
  manualCount: (s) => `${s} manuellt`,
  resume: "Tillbaka till schemat",
  allOff: "Stäng av alla",
  hint: "Håll eller tryck två gånger",
  mode: { cool: "Kyla", wind_free: "WindFree", heat: "Värme", fan_only: "Fläkt", dry: "Torkning", auto: "Auto" },
  failed: "Det gick inte"
}, us = { cs: ds, en: hs, sv: cs };
function Fe(s, t) {
  return os(us, s, t);
}
const ps = W`
  :host {
    display: block;
    --dd-page: #000000;
    --dd-card: #1c1c1e;
    --dd-el: #2c2c2e;
    --dd-text: #ffffff;
    --dd-secondary: #98989f;
    --dd-sep: rgb(84 84 88 / 65%);
    --dd-button: rgb(118 118 128 / 24%);
    --dd-menu: #2c2c2e;
    --dd-accent: #0a84ff;
    --dd-warning: #ff9230;
    --dd-warning-bg: rgb(255 146 48 / 16%);
    --hdk-accent: var(--dd-accent);
    --hdk-secondary: var(--dd-secondary);
    --hdk-tile: var(--dd-card);
    --hdk-tile-text: var(--dd-text);
    --hdk-tile-border: var(--dd-sep);
    --hdk-tile-on: #0a6ed1;
    --hdk-tile-on-text: #ffffff;
    --hdk-tile-on-sub: #ffffff;
    --hdk-tile-on-border: transparent;
    --hdk-tile-mixed: #17395d;
    --hdk-tile-badge: rgb(255 255 255 / 16%);
    /* Slider and segmented control of the popup Topení / Klimatizace: the values of Energie (one visual language). */
    --hdk-track: #2c2c2e;
    --hdk-track-compact: #3a3a3c;
    --hdk-bar: rgb(255 255 255 / 14%);
    --hdk-tick: rgb(255 255 255 / 28%);
    --hdk-seg-thumb: #ffffff;
    --hdk-seg-text: #ebebf5;
    --hdk-seg-selected: #000000;
    --hdk-bubble: #3a3a3c;
    --hdk-bubble-text: #ffffff;
    color: var(--dd-text);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif;
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
  :host([data-light]) {
    --dd-page: #f2f2f7;
    --dd-card: #ffffff;
    --dd-el: #f2f2f7;
    --dd-text: #000000;
    --dd-secondary: #5f5f66;
    --dd-sep: rgb(60 60 67 / 29%);
    --dd-button: rgb(118 118 128 / 16%);
    --dd-menu: #ffffff;
    --dd-accent: #0a6ed1;
    --dd-warning: #8f4a12;
    --dd-warning-bg: rgb(168 82 0 / 12%);
    --hdk-tile-on: #d8e8f8;
    --hdk-tile-on-text: #000000;
    --hdk-tile-on-sub: #0a5cb0;
    --hdk-tile-on-border: #0a6ed1;
    --hdk-tile-mixed: #e6eff9;
    --hdk-tile-badge: rgb(60 60 67 / 14%);
    --hdk-track: #f2f2f7;
    --hdk-track-compact: #e5e5ea;
    --hdk-bar: rgb(60 60 67 / 18%);
    --hdk-tick: rgb(60 60 67 / 30%);
    --hdk-seg-text: #000000;
  }
  ha-card {
    padding: 4px 16px 20px;
    background: var(--dd-page);
    border: 0;
    box-shadow: none;
    color: inherit;
  }
  h2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    min-height: 44px;
    margin: 4px 4px 0;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .chevron {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    margin: 0 -10px 0 0;
    padding: 0;
    border: 0;
    border-radius: 22px;
    background: none;
    color: var(--dd-secondary);
    font: inherit;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
  }
  .chevron:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
  }
  dd-sheet {
    --hdk-sheet-bg: var(--dd-card);
    --hdk-sheet-text: var(--dd-text);
    --hdk-sheet-button: var(--dd-button);
    --hdk-tile: var(--dd-el);
  }
  :host([data-light]) dd-sheet {
    --hdk-sheet-button: rgb(118 118 128 / 12%);
    --hdk-sheet-backdrop: 35%;
    --hdk-sheet-border: rgb(0 0 0 / 8%);
    --hdk-sheet-grabber: rgb(60 60 67 / 30%);
  }
  /* „Co se stalo“ has no heading: the gap of a section heading keeps it apart from the tiles above. */
  .group[data-part="log"] {
    margin-top: 24px;
  }
  .link-row {
    width: 100%;
    border: 0;
    background: none;
    color: var(--dd-text);
    font: inherit;
    text-align: start;
    cursor: pointer;
  }
  .link-row:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
    border-radius: 12px;
  }
  .chevron-mark {
    flex: none;
    color: var(--dd-secondary);
    font-size: 24px;
  }
  .detail h3 {
    margin: 16px 0 4px;
    color: var(--dd-secondary);
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    text-transform: uppercase;
  }
  .log-row {
    display: flex;
    gap: 12px;
    padding: 8px 0;
    border-top: 0.5px solid var(--dd-sep);
  }
  .log-time {
    flex: none;
    width: 48px;
    color: var(--dd-secondary);
    font-size: 15px;
    line-height: 22px;
  }
  .log-row .main {
    flex: 1;
    min-width: 0;
    font-size: 17px;
    line-height: 22px;
  }
  .log-members {
    display: block;
    font-size: 15px;
    line-height: 20px;
    color: var(--dd-secondary);
  }
  .log-row small {
    display: block;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .log-empty {
    color: var(--dd-secondary);
    font-size: 15px;
  }
  .rule {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 44px;
    padding: 8px 0;
    border: 0;
    border-top: 0.5px solid var(--dd-sep);
    background: none;
    color: var(--dd-text);
    font: inherit;
    font-size: 17px;
    line-height: 22px;
    text-align: start;
    cursor: pointer;
  }
  .rule .main {
    flex: 1;
    min-width: 0;
  }
  .rule:active,
  .link-row:active {
    background: var(--dd-sep);
  }
  .rule small {
    display: block;
    color: var(--dd-secondary);
    font-size: 15px;
    line-height: 20px;
  }
  .rule-off {
    color: var(--dd-secondary);
  }
  .rule:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
  }
  .health-row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    border-top: 0.5px solid var(--dd-sep);
    font-size: 17px;
    line-height: 22px;
  }
  .health-row.tap {
    cursor: pointer;
  }
  .health-row .main {
    flex: 1;
    min-width: 0;
  }
  .health-row .value {
    flex: none;
    color: var(--dd-secondary);
    font-size: 15px;
  }
  .health-row .value.warn {
    color: var(--dd-warning);
  }
  .cover-row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 64px;
    padding: 8px 0;
    border-top: 0.5px solid var(--dd-sep);
  }
  .cover-row:first-child {
    border-top: 0;
  }
  .cover-row .main {
    flex: 1;
    min-width: 0;
    font-size: 17px;
    line-height: 22px;
  }
  .cover-row small {
    display: block;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .row small.warn,
  .cover-row small.warn {
    color: var(--dd-warning);
  }
  .presets {
    display: grid;
    grid-template-columns: repeat(3, 64px);
    gap: 6px;
    flex: none;
  }
  @media (max-width: 359px) {
    .presets {
      grid-template-columns: repeat(3, 52px);
      gap: 4px;
    }
  }
  .link {
    position: relative;
    min-height: 44px;
    margin: 0 -4px 0 0;
    padding: 0 4px;
    border: 0;
    background: none;
    color: var(--dd-accent);
    font: inherit;
    font-size: 15px;
    line-height: 20px;
    text-transform: none;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-touch-callout: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .link .count {
    color: var(--dd-secondary);
  }
  .link:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
    border-radius: 8px;
  }
  .group {
    border-radius: 12px;
    background: var(--dd-card);
  }
  .row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 60px;
    box-sizing: border-box;
    padding: 8px 12px;
    border-top: 0.5px solid var(--dd-sep);
  }
  .row:first-child {
    border-top: 0;
  }
  .row .main {
    flex: 1;
    min-width: 0;
    font-size: 17px;
    line-height: 22px;
  }
  /* A row with two buttons: they go under the text when the text would have less than about 160 px. */
  .row.two {
    flex-wrap: wrap;
    row-gap: 8px;
  }
  .row.two .main {
    flex: 1 1 160px;
  }
  /* The menu "Odložit" keeps to the right edge of the row, so it never leaves the card. */
  .actions {
    position: relative;
    display: flex;
    gap: 8px;
    margin-inline-start: auto;
  }
  .actions .snooze {
    position: static;
  }
  .row small {
    display: block;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .mark {
    display: grid;
    place-items: center;
    flex: none;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--dd-el);
    color: var(--dd-secondary);
    font-size: 17px;
    font-weight: 700;
  }
  .mark.warn {
    background: var(--dd-warning-bg);
    color: var(--dd-warning);
  }
  .mark svg {
    width: 24px;
    height: 24px;
  }
  .button {
    flex: none;
    min-height: 44px;
    padding: 0 16px;
    border: 0;
    border-radius: 22px;
    background: var(--dd-button);
    color: var(--dd-text);
    font: inherit;
    font-size: 17px;
    line-height: 22px;
    cursor: pointer;
    white-space: nowrap;
  }
  /* Sent and on its way (spec kitu, Odezva): like a tile, the fill (button) or the colour (link) goes between its
     own and the accent until Home Assistant reports the result; with reduced motion a dashed accent outline. */
  .button.pending {
    animation: dd-pending-fill 1.3s ease-in-out infinite alternate;
  }
  .button.primary.pending {
    animation-name: dd-pending-primary;
  }
  .link.pending {
    animation: dd-pending-text 1.3s ease-in-out infinite alternate;
  }
  @keyframes dd-pending-fill {
    to {
      background: var(--dd-accent);
      color: #fff;
    }
  }
  @keyframes dd-pending-primary {
    to {
      background: var(--dd-button);
      color: var(--dd-text);
    }
  }
  @keyframes dd-pending-text {
    to {
      color: var(--dd-secondary);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .button.pending,
    .link.pending {
      animation: none;
      outline: 1.5px dashed var(--dd-accent);
      outline-offset: 2px;
    }
  }
  /* The quiet button of a row (Zkusit znovu, „Q219 A“): grey and 15 px, still 44 px high. */
  .button.small {
    padding: 0 12px;
    font-size: 15px;
    line-height: 20px;
  }
  .button.primary {
    background: #0a6ed1;
    color: #ffffff;
    font-weight: 600;
  }
  .button:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: 2px;
  }
  .snooze {
    position: relative;
    flex: none;
  }
  .menu {
    position: absolute;
    z-index: 5;
    top: calc(100% + 6px);
    right: 0;
    width: 230px;
    border-radius: 14px;
    background: var(--dd-menu);
    box-shadow: 0 8px 30px rgb(0 0 0 / 45%);
    overflow: hidden;
  }
  .menu button {
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    padding: 11px 16px;
    border: 0;
    border-top: 0.5px solid var(--dd-sep);
    background: none;
    color: var(--dd-text);
    font: inherit;
    font-size: 17px;
    line-height: 22px;
    text-align: start;
    cursor: pointer;
  }
  .menu button:first-child {
    border-top: 0;
  }
  .menu .until {
    color: var(--dd-secondary);
  }
  .menu button:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
  }
  .now {
    min-height: 52px;
    font-size: 15px;
    line-height: 20px;
  }
  .now.none {
    color: var(--dd-secondary);
  }
  .tiles {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }
  .error {
    margin: 8px 4px 0;
    color: var(--dd-warning);
    font-size: 13px;
    line-height: 18px;
  }
`, ms = ["unavailable", "unknown", ""], fs = ["opening", "closing"], gs = 6e4;
function Ct(s) {
  return typeof s.when == "number" ? s.when * 1e3 : Date.parse(s.when);
}
function Ae(s) {
  return s.context_name || s.context_entity_id_name || (s.context_user_id ? "app" : "");
}
function bs(s, t) {
  const e = s.filter((a) => typeof a.entity_id == "string" && a.state !== void 0).sort((a, r) => Ct(a) - Ct(r)), n = /* @__PURE__ */ new Map(), i = [];
  for (const a of e) {
    const r = String(a.state);
    if (fs.includes(r)) {
      const c = Ae(a);
      c && n.set(a.entity_id, c);
      continue;
    }
    const d = Ae(a) || n.get(a.entity_id) || "";
    n.delete(a.entity_id), !ms.includes(r) && i.push({ entry: a, time: Ct(a), state: r, reason: d, kind: t(a.entity_id) });
  }
  const o = [];
  for (const a of i) {
    const r = o.at(-1), d = a.reason === "app" && r?.some((c) => c.reason === "app");
    r && !d && a.time - r[r.length - 1].time <= gs ? r.push(a) : o.push([a]);
  }
  return o.map((a) => {
    const r = /* @__PURE__ */ new Map();
    for (const l of a)
      r.delete(l.entry.entity_id), r.set(l.entry.entity_id, l);
    const d = [...r.values()].sort((l, h) => l.time - h.time), c = d.find((l) => l.reason === "app") ?? d[0], p = [];
    for (const l of d) {
      if (l === c) continue;
      const h = l.kind || l.entry.entity_id, b = p.find(($) => ($.kind || $.items[0].entry.entity_id) === h && $.state === l.state);
      b ? b.items.push(l) : p.push({ kind: l.kind, state: l.state, items: [l] });
    }
    return { time: c.time, head: c, groups: p };
  }).sort((a, r) => r.time - a.time);
}
function vs(s) {
  const t = s.map((n) => n.split(" "));
  let e = 0;
  for (; t.every((n) => n.length > e + 1 && n[e] === t[0][e]); ) e += 1;
  return t.map((n) => {
    const i = n.slice(e).join(" ");
    return i.charAt(0).toLocaleUpperCase() + i.slice(1);
  });
}
var ys = Object.defineProperty, I = (s, t, e, n) => {
  for (var i = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (i = a(t, e, i) || i);
  return i && ys(t, e, i), i;
};
const Re = "dum-dashboard.log-seen";
function $s() {
  try {
    return Number(localStorage.getItem(Re)) || 0;
  } catch {
    return 0;
  }
}
function xs(s) {
  try {
    localStorage.setItem(Re, String(s));
  } catch {
  }
}
const ws = u`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="8" width="16" height="8" rx="2"></rect><path d="M21 11v2" stroke-linecap="round"></path><rect x="5" y="10" width="3" height="4" fill="currentColor" stroke="none"></rect></svg>`, ks = u`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 8v8M12 8v8M16 8v8"></path></svg>`, _s = u`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2.5"></rect><circle cx="12" cy="13" r="4.5"></circle><path d="M7.5 6.5h2" stroke-linecap="round"></path></svg>`, As = u`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.6-.6-2.6z"></path></svg>`, ae = class ae extends B {
  constructor() {
    super(...arguments), this._error = "", this._now = Date.now(), this.coverHistory = {}, this._seen = $s(), this.pending = new Zn(() => this.requestUpdate()), this._climateSelected = [], this._fit = "", this.starts = new Gn(() => this.requestUpdate()), this.gesture = new Pt(() => ({
      holdMs: this._config?.guard.holdMs ?? 550,
      doubleTapMs: this._config?.guard.doubleTapMs ?? 400
    })), this.closeMenu = (t) => {
      this._menu && (t instanceof KeyboardEvent ? t.key === "Escape" : !t.composedPath().some((e) => e instanceof Element && e.classList.contains("snooze"))) && (this._menu = void 0);
    };
  }
  setConfig(t) {
    this._config = Qn(t);
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this.timer = window.setInterval(() => this._now = Date.now(), 3e4), window.addEventListener("pointerdown", this.closeMenu), window.addEventListener("keydown", this.closeMenu), this.resize = new ResizeObserver(() => this._fit = `${Math.round(this.getBoundingClientRect().width)}|${this._fit.split("|")[1] ?? ""}`), this.resize.observe(this), document.fonts?.ready.then(() => this._fit = `${this._fit.split("|")[0] ?? ""}|${document.fonts.size}`), this.logTimer = window.setInterval(() => {
      this.loadLog();
    }, 5 * 6e4);
  }
  updated(t) {
    Nt(this.renderRoot, this._fit), t.has("_detail") && this._detail && this.renderRoot.querySelector("dd-sheet")?.updateComplete?.then(() => Nt(this.renderRoot, this._fit));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer), window.clearInterval(this.logTimer), this.pending.clear(), window.clearTimeout(this.hintTimer), window.removeEventListener("pointerdown", this.closeMenu), window.removeEventListener("keydown", this.closeMenu), this.resize?.disconnect(), this.gesture.dispose();
  }
  willUpdate(t) {
    t.has("hass") && (this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1), this._now = Date.now(), t.get("hass") || this.loadLog(), this.pending.check(this.hass));
  }
  get i18n() {
    return Fe(ts(this._config?.language ?? "auto", this.hass), this.hass);
  }
  name(t) {
    return Wn(t, this.i18n.language) ?? "";
  }
  render() {
    const t = this._config;
    if (!t) return m;
    const e = this.i18n, i = t.houseMode !== void 0 && C(this.hass, t.houseMode) === t.summer ? [this.renderCooling(t, e), this.renderHeating(t, e)] : [this.renderHeating(t, e), this.renderCooling(t, e)];
    return u`<ha-card>
      ${this.renderQueue(t, e)} ${this.renderRunning(t, e)} ${this.renderCovers(t, e)}
      ${this.renderVentilation(t, e)} ${i} ${this.renderDevices(t, e)} ${this.renderHealth(t, e)} ${this.renderLogRow(t, e)}
      ${this._error ? u`<div class="error" role="alert">${this._error}</div>` : m}
    </ha-card>
    ${this.renderCoversDetail(t, e)} ${this.renderClimate(t, e)} ${this.renderLog(t, e)} ${this.renderHealthDetail(t, e)} ${this.renderRules(e)}`;
  }
  /* ---------- Zdraví ---------- */
  /** The state of each part of Zdraví: what needs attention first, then one summary line per part. */
  healthState(t, e) {
    const n = e.t, i = t.health, o = i.batteries.map((l) => ({ item: l, level: yt(this.hass, l.entity) })).sort((l, h) => (l.level ?? -1) - (h.level ?? -1)), a = i.connections.map((l) => ({ item: l, state: C(this.hass, l.entity) })), r = i.system.map((l) => {
      const h = E(this.hass, l.entity), b = l.entity.startsWith("binary_sensor."), $ = this.hass, g = !h || it(h.state) ? n.unavailable : b ? h.state === "on" ? n.healthProblem : n.healthOk : $?.formatEntityState ? $.formatEntityState(h) : h.state, k = !b && l.entity.endsWith("_status") && h !== void 0 && !it(h.state) && h.state !== "normal", v = l.max !== void 0 && h !== void 0 && Number.isFinite(Number(h.state)) && Number(h.state) > l.max;
      return { item: l, value: g, problem: b && h?.state === "on" || k || v };
    }), d = i.updates ? Object.entries(this.hass?.states ?? {}).filter(([l, h]) => l.startsWith("update.") && h.state === "on").map(([l, h]) => ({ id: l, name: typeof h.attributes.friendly_name == "string" ? h.attributes.friendly_name : l, version: String(h.attributes.latest_version ?? "") })).sort((l, h) => l.name.localeCompare(h.name)) : [], c = this.snoozed(t), p = [
      // A weak battery the queue „Potřebuje tebe“ already shows is not said twice (uživatel 14. 11. 2026: „Q224 A“).
      ...o.filter(({ item: l, level: h }) => h !== void 0 && h < i.batteryLow && !t.batteries.some((b) => b.level === l.entity && C(this.hass, b.low) === "on")).map(({ item: l, level: h }) => ({ entity: l.entity, name: this.name(l.name), detail: n.battery(e.percent(Math.round(h))) })),
      ...a.filter(({ state: l }) => l !== "on").map(({ item: l }) => ({ entity: l.entity, name: this.name(l.name), detail: n.healthOffline })),
      ...r.filter(({ problem: l }) => l).map(({ item: l, value: h }) => ({ entity: l.entity, name: this.name(l.name), detail: h }))
    ].filter((l) => !c.has(`health:${l.entity}`));
    return { batteries: o, connections: a, system: r, updates: d, attention: p };
  }
  renderHealth(t, e) {
    const n = t.health;
    if (!n.batteries.length && !n.connections.length && !n.system.length && !n.updates) return m;
    const i = e.t, o = this.healthState(t, e), a = o.batteries.find(({ level: l }) => l !== void 0), r = o.connections.filter(({ state: l }) => l !== "on").length, d = o.system.filter(({ problem: l }) => l).length, c = (l) => o.attention.some((h) => l.some((b) => b.entity === h.entity)), p = (l, h, b, $ = !1) => u`<button class="row link-row" type="button" aria-haspopup="dialog" data-health=${l} @click=${() => this._detail = `health:${l}`}>
      <span class="main">${h}<small class=${$ ? "warn" : ""}>${b}</small></span>
      <span class="chevron-mark" aria-hidden="true">›</span>
    </button>`;
    return u`<h2><span>${i.health}</span></h2>
      <div class="group" data-part="health">
        ${o.attention.map(
      (l) => u`<div class="row" data-row="attention" data-entity=${l.entity}>
            <span class="mark warn" aria-hidden="true">!</span>
            <span class="main">${l.name}<small class="warn">${ht([i.healthAttention, l.detail])}</small></span>
            ${this.snoozeButton(t, `health:${l.entity}`, e)}
          </div>`
    )}
        ${n.batteries.length ? a ? p("batteries", i.healthBatteries, i.healthLowest(`${this.name(a.item.name)} ${e.percent(Math.round(a.level))}`), a.level < n.batteryLow) : p("batteries", i.healthBatteries, i.unavailable, !0) : m}
        ${n.connections.length ? p("connections", i.healthConnections, r ? i.healthOfflineCount(r) : i.healthAllOnline, c(n.connections)) : m}
        ${n.system.length ? p("system", i.healthSystem, d ? i.healthProblem : i.healthOk, c(n.system)) : m}
        ${n.updates ? p("updates", i.healthUpdates, o.updates.length ? i.healthUpdatesCount(o.updates.length) : i.healthUpToDate) : m}
      </div>`;
  }
  renderHealthDetail(t, e) {
    const n = e.t, i = this._detail?.startsWith("health:") ? this._detail.slice(7) : void 0, o = { batteries: n.healthBatteries, connections: n.healthConnections, system: n.healthSystem, updates: n.healthUpdates }, a = i ? this.healthState(t, e) : void 0, r = (c, p, l, h) => u`<div class="health-row ${h ? "tap" : ""}" @click=${h ? () => this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: !0, composed: !0, detail: { entityId: h } })) : void 0}>
        <span class="main">${c}</span><span class="value ${l ? "warn" : ""}">${p}</span>
      </div>`, d = () => !a || !i ? m : i === "batteries" ? a.batteries.map(({ item: c, level: p }) => r(this.name(c.name), p === void 0 ? n.unavailable : e.percent(Math.round(p)), p !== void 0 && p < t.health.batteryLow)) : i === "connections" ? a.connections.map(({ item: c, state: p }) => r(this.name(c.name), p === "on" ? n.healthOnline : n.healthOffline, p !== "on")) : i === "system" ? a.system.map(({ item: c, value: p, problem: l }) => r(this.name(c.name), p, l)) : a.updates.length ? a.updates.map((c) => r(c.name, c.version, !1, c.id)) : u`<p class="log-empty">${n.healthUpToDate}</p>`;
    return u`<dd-sheet .open=${i !== void 0} .heading=${i ? o[i] : ""} .closeLabel=${n.close} @hdk-close=${() => this._detail = void 0}>
      ${i ? u`<div class="detail" data-part="health-detail">${d()}</div>` : m}
    </dd-sheet>`;
  }
  /* ---------- Co se stalo ---------- */
  /** The entities the card shows or switches: what happened to them today is the journal (uživatel 13. 11. 2026: „Q212 a“). */
  logEntities(t) {
    return [
      ...t.covers.entities,
      ...t.ventilation.mode ? [t.ventilation.mode] : [],
      ...t.ventilation.fans.map((e) => e.entity),
      ...t.heating.rooms.map((e) => e.entity),
      ...t.cooling.rooms.map((e) => e.entity),
      ...t.running.map((e) => e.entity),
      ...t.laundry.map((e) => e.entity),
      ...t.devices.flatMap((e) => e.entities.map((n) => n.entity))
    ];
  }
  async loadLog() {
    const t = this._config, e = this.hass;
    if (!t || !e?.callWS) return;
    const n = this.logEntities(t);
    if (!n.length) return;
    const i = /* @__PURE__ */ new Date();
    i.setHours(0, 0, 0, 0);
    try {
      const o = await e.callWS({ type: "logbook/get_events", start_time: i.toISOString(), entity_ids: n });
      await this.loadCoverHistory(t, i), this._log = Array.isArray(o) ? o : [];
    } catch {
    }
  }
  async loadCoverHistory(t, e) {
    if (!(!t.covers.entities.length || !this.hass))
      try {
        const n = await this.hass.callWS({
          type: "history/history_during_period",
          start_time: e.toISOString(),
          entity_ids: t.covers.entities,
          include_start_time_state: !0,
          significant_changes_only: !1,
          minimal_response: !1,
          no_attributes: !1
        }), i = {};
        for (const [o, a] of Object.entries(n ?? {})) {
          let r;
          i[o] = (Array.isArray(a) ? a : []).flatMap((d) => {
            const c = Number(d.a?.current_position ?? r?.position), p = Number(d.a?.current_tilt_position ?? r?.tilt), l = Number(d.lu ?? d.lc) * 1e3;
            return !Number.isFinite(c) || !Number.isFinite(p) || !Number.isFinite(l) ? [] : (r = { position: c, tilt: p }, [{ time: l, position: c, tilt: p }]);
          });
        }
        this.coverHistory = i;
      } catch {
      }
  }
  /** The preset a blind was in at `time` (from the recorder), or undefined. */
  presetAt(t, e, n) {
    const i = this.coverHistory[e] ?? [];
    let o;
    for (const a of i) a.time <= n + 6e4 && (o = a);
    if (o)
      return t.covers.presets.find((a) => Math.abs(o.position - a.position) <= t.covers.tolerance && Math.abs(o.tilt - a.tilt) <= t.covers.tolerance);
  }
  /** Which entities are one kind: one action on several of them is one row. */
  logKind(t) {
    const e = /* @__PURE__ */ new Map();
    return t.covers.entities.forEach((n) => e.set(n, "covers")), t.ventilation.fans.forEach((n) => e.set(n.entity, "ventilation")), t.heating.rooms.forEach((n) => e.set(n.entity, "heating")), t.cooling.rooms.forEach((n) => e.set(n.entity, "cooling")), t.devices.forEach((n, i) => n.entities.forEach((o) => e.set(o.entity, `devices-${i}`))), (n) => e.get(n) ?? "";
  }
  /** Pračka, sušička, myčka in words („Sušička · Doběhla“), not their helpers („Sušička běží · Vypnuto“). */
  logTitle(t, e, n, i) {
    const o = i.t, a = t.running.find((d) => d.entity === e.entity_id);
    if (a) return `${this.name(a.name)} · ${n === "on" ? o.logRuns : o.logFinished}`;
    const r = t.laundry.find((d) => d.entity === e.entity_id);
    return r ? `${this.name(r.name)} · ${n === "on" ? o.logLaundryWaits : o.logLaundryOut}` : `${this.logName(e)} · ${this.logState(e, n)}`;
  }
  /**
   * The reason of a blind when the logbook has none: the helper of the last action of each blind says who sent it
   * (the same source as the detail of the blinds), when its time is just before the entry.
   */
  coverReason(t, e, n) {
    if (e.reason || e.kind !== "covers") return e.reason === "app" ? n.t.who.aplikace : e.reason;
    const i = E(this.hass, t.covers.lastAction)?.attributes.polozky, o = i && typeof i == "object" ? i[e.entry.entity_id] : void 0, a = typeof o?.cas == "string" ? Date.parse(o.cas) : NaN;
    return !o || typeof o.kdo != "string" || !(a <= e.time && e.time - a <= 3 * 6e4) ? "" : n.t.who[o.kdo] ?? o.kdo;
  }
  /** „Sušička - konec cyklu“ under „Sušička · Doběhla“ says the name twice: the reason without it („Konec cyklu“). */
  withoutName(t, e, n) {
    const i = e.entry.entity_id, o = [...n.running, ...n.laundry].find((d) => d.entity === i), a = o ? this.name(o.name) : this.logName(e.entry);
    if (!t.toLocaleLowerCase().startsWith(a.toLocaleLowerCase())) return t;
    const r = t.slice(a.length).replace(/^[\s\-–—·:]+/, "");
    return r ? r.charAt(0).toLocaleUpperCase() + r.slice(1) : t;
  }
  /** The name the card uses for an entity (Větrací režim, the room of a blind or a fan), else Home Assistant's. */
  shortName(t, e) {
    const n = e.entity_id;
    if (n === t.ventilation.mode) return this.i18n.t.ventilationMode;
    if (t.covers.names[n] !== void 0) return this.name(t.covers.names[n]);
    const i = [...t.ventilation.fans, ...t.heating.rooms, ...t.cooling.rooms, ...t.running, ...t.laundry, ...t.devices.flatMap((o) => o.entities)].find(
      (o) => o.entity === n
    );
    return i ? this.name(i.name) : void 0;
  }
  logName(t) {
    if (this._config && t.entity_id === this._config.ventilation.mode) return this.i18n.t.ventilationMode;
    const e = E(this.hass, t.entity_id);
    return t.name || (typeof e?.attributes.friendly_name == "string" ? e.attributes.friendly_name : t.entity_id);
  }
  logState(t, e) {
    const n = e.startsWith("preset:") ? this._config?.covers.presets[Number(e.slice(7))] : void 0;
    if (n) return this.name(n.name);
    const i = this.hass, o = E(this.hass, t.entity_id);
    return o && i?.formatEntityState ? i.formatEntityState(o, e) : e;
  }
  /** A blind in the journal says its preset („Žaluzie · Tma“, uživatel 13. 11. 2026: „Q220 zatím A“), else its state. */
  logRows(t) {
    const e = (this._log ?? []).map((n) => {
      if (!t.covers.entities.includes(n.entity_id) || ["opening", "closing"].includes(String(n.state))) return n;
      const i = this.presetAt(t, n.entity_id, Ct(n));
      return i ? { ...n, state: `preset:${t.covers.presets.indexOf(i)}` } : n;
    });
    return bs(e, this.logKind(t));
  }
  renderLogRow(t, e) {
    if (!this.logEntities(t).length) return m;
    const n = e.t, i = this.logRows(t).filter((d) => d.time > this._seen).length, o = /* @__PURE__ */ new Date();
    o.setHours(0, 0, 0, 0);
    const a = this._seen < o.getTime(), r = this._log === void 0 ? "" : i ? a ? n.logToday(i) : n.logNew(i, e.time(this._seen)) : n.logNothingNew;
    return u`<div class="group" data-part="log">
      <button class="row link-row" type="button" aria-haspopup="dialog" @click=${() => this.openLog()}>
        <span class="main">${n.log}${r ? u`<small>${r}</small>` : m}</span>
        <span class="chevron-mark" aria-hidden="true">›</span>
      </button>
      ${this.isAdmin ? u`<button class="row link-row" type="button" aria-haspopup="dialog" data-row="rules" @click=${() => this.openRules()}>
            <span class="main">${n.rules}</span>
            <span class="chevron-mark" aria-hidden="true">›</span>
          </button>` : m}
    </div>`;
  }
  /* ---------- Kniha pravidel ---------- */
  /** Only an administrator sees the rules (uživatel 13. 11. 2026: „Q213a“: z popisů automatizací, jen pro správce). */
  get isAdmin() {
    return this.hass?.user?.is_admin === !0;
  }
  async openRules() {
    this._detail = "rules";
    const t = this.hass;
    if (!t?.callWS) return;
    const e = Object.entries(t.states).filter(([i]) => i.startsWith("automation."));
    this._rules = void 0;
    let n = 0;
    try {
      const i = await Promise.all(
        e.map(async ([o, a]) => {
          const r = await t.callWS({ type: "automation/config", entity_id: o }).catch(() => {
            n += 1;
          }), d = r?.config?.alias ?? (typeof a.attributes.friendly_name == "string" ? a.attributes.friendly_name : o);
          return { id: o, name: d, description: (r?.config?.description ?? "").trim(), on: a.state === "on" };
        })
      );
      this._rules = e.length && n === e.length ? "failed" : i.sort((o, a) => o.name.localeCompare(a.name, this.i18n.language));
    } catch {
      this._rules = "failed";
    }
  }
  renderRules(t) {
    if (!this.isAdmin) return m;
    const e = t.t, n = this._detail === "rules", i = this._rules;
    return u`<dd-sheet .open=${n} .heading=${e.rules} .sub=${Array.isArray(i) ? e.rulesCount(i.length) : ""} .closeLabel=${e.close} @hdk-close=${() => this._detail = void 0}>
      ${n ? u`<div class="detail" data-part="rules-detail">
            ${i === "failed" ? u`<p class="log-empty">${e.rulesFailed}</p>` : i === void 0 ? u`<p class="log-empty">${e.rulesLoading}</p>` : i.map(
      (o) => u`<button type="button" class="rule" @click=${() => this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: !0, composed: !0, detail: { entityId: o.id } }))}>
                      <span class="main">${o.name}${o.on ? m : u` <span class="rule-off">· ${e.off}</span>`}${o.description ? u`<small>${o.description}</small>` : m}</span>
                      <span class="chevron-mark" aria-hidden="true">›</span>
                    </button>`
    )}
          </div>` : m}
    </dd-sheet>`;
  }
  openLog() {
    this._detail = "log", this.loadLog();
  }
  closeLog() {
    this._detail = void 0, this._seen = Date.now(), xs(this._seen);
  }
  renderLog(t, e) {
    if (!this.logEntities(t).length) return m;
    const n = e.t, i = this._detail === "log", o = this.logRows(t), a = o.filter((p) => p.time > this._seen), r = o.filter((p) => p.time <= this._seen), d = {
      covers: n.covers,
      ventilation: n.ventilation,
      heating: n.heating,
      cooling: n.cooling,
      ...Object.fromEntries(t.devices.map((p, l) => [`devices-${l}`, this.name(p.name)]))
    }, c = (p) => p.map((l) => {
      const h = l.head, b = this.withoutName(this.coverReason(t, h, e), h, t), $ = (w) => {
        const O = w.map((F) => this.shortName(t, F.entry));
        return (O.every((F) => F !== void 0) ? O : vs(w.map((F) => this.logName(F.entry)))).join(", ");
      }, g = h.kind ? l.groups.find((w) => w.kind === h.kind && w.state === h.state) : void 0, k = g ? `${d[h.kind] ?? ""} · ${this.logState(h.entry, h.state)}` : this.logTitle(t, h.entry, h.state, e), v = l.groups.map((w) => {
        if (w === g) return $([h, ...w.items]);
        const O = this.logState(w.items[0].entry, w.state);
        return w.kind ? `${d[w.kind] ?? ""} · ${O}: ${$(w.items)}` : `${this.logName(w.items[0].entry)} · ${O}`;
      });
      return u`<div class="log-row"><span class="log-time">${e.time(l.time)}</span><span class="main"
            >${k}${b ? u`<small>${b}</small>` : m}${v.map((w) => u`<span class="log-members">${w}</span>`)}</span
          ></div>`;
    });
    return u`<dd-sheet .open=${i} .heading=${n.log} .closeLabel=${n.close} @hdk-close=${() => this.closeLog()}>
      ${i ? u`<div class="detail" data-part="log-detail">
            ${this._log === void 0 ? u`<p class="log-empty">${n.logFailed}</p>` : o.length ? u`${a.length ? u`<h3>${n.logSince}</h3>${c(a)}` : m}${r.length ? u`<h3>${n.logEarlier}</h3>${c(r)}` : m}` : u`<p class="log-empty">${n.logEmpty}</p>`}
          </div>` : m}
    </dd-sheet>`;
  }
  /* ---------- Potřebuje tebe ---------- */
  failed(t) {
    const e = E(this.hass, t.failedActions)?.attributes.polozky;
    return Array.isArray(e) ? e.filter((n) => typeof n == "object" && n !== null && typeof n.entita == "string") : [];
  }
  renderQueue(t, e) {
    if (!t.failedActions && !t.batteries.length && !t.filters.length && !t.laundry.length && !t.maintenance.length) return m;
    const n = e.t, i = this.failed(t), o = this.snoozed(t), a = t.batteries.filter((h) => C(this.hass, h.low) === "on" && !o.has(`battery:${h.low}`)), r = this.dirtyFilters(t).filter(({ filter: h }) => !o.has(`filter:${h.hours}`)), d = t.laundry.filter((h) => C(this.hass, h.entity) === "on"), c = t.maintenance.flatMap((h) => {
      const b = yt(this.hass, h.counter);
      return b !== void 0 && b >= h.every && !o.has(`maintenance:${h.counter}`) ? [{ item: h, cycles: b }] : [];
    }), p = i.length + a.length + r.length + d.length + c.length, l = [
      ...i.map((h) => {
        const b = t.covers.names[h.entita], $ = E(this.hass, h.entita)?.attributes.friendly_name, g = typeof $ == "string" ? $ : b !== void 0 ? this.name(b) : void 0, k = h.cas ? Date.parse(h.cas) : NaN, v = this.failedGoal(t, h), w = v ? n.notArrivedTo(this.name(v.name)) : h.duvod || h.akce, O = ht([w ? w.charAt(0).toLocaleUpperCase(e.language) + w.slice(1) : void 0, Number.isFinite(k) ? e.time(k) : void 0].filter(Boolean)), F = this.retryOf(t, h);
        return u`<div class="row" data-row="failed">
          <span class="mark warn" aria-hidden="true">!</span>
          <span class="main">${typeof g == "string" ? g : h.entita}<small>${O}</small></span>
          ${F ? u`<button class="button small ${this.pending.has(`retry:${h.entita}`) ? "pending" : ""}" type="button" aria-label=${`${n.retry}: ${typeof g == "string" ? g : h.entita}`} aria-busy=${this.pending.has(`retry:${h.entita}`) ? "true" : m} @click=${F}>${n.retry}</button>` : t.clearFailed ? u`<button class="button" type="button" @click=${() => this.call("script", t.clearFailed.split(".")[1], { entita: h.entita })}>${n.done}</button>` : m}
        </div>`;
      }),
      ...a.map((h) => {
        const b = yt(this.hass, h.level), $ = C(this.hass, h.type), g = ht([n.battery(b === void 0 ? void 0 : e.percent(Math.round(b))), $].filter(Boolean));
        return u`<div class="row" data-row="battery">
          <span class="mark">${ws}</span>
          <span class="main">${this.name(h.name)}<small>${g}</small></span>
          ${this.snoozeButton(t, `battery:${h.low}`, e)}
        </div>`;
      }),
      ...r.map(({ filter: h, hours: b, threshold: $ }) => {
        const g = (k) => `${e.whole(Math.floor(k))} h`;
        return u`<div class="row two" data-row="filter">
          <span class="mark">${ks}</span>
          <span class="main">${this.name(h.name)}<small>${xt(n.filter(g(b), g($)))}</small></span>
          <span class="actions">
            ${this.snoozeButton(t, `filter:${h.hours}`, e)}
            <button class="button" type="button" @click=${() => this.call("input_number", "set_value", { entity_id: h.hours, value: 0 })}>${n.done}</button>
          </span>
        </div>`;
      }),
      ...c.map(({ item: h, cycles: b }) => u`<div class="row two" data-row="maintenance">
        <span class="mark">${As}</span>
        <span class="main">${this.name(h.name)}<small>${ht([this.name(h.task), n.cycles(b, h.every)])}</small></span>
        <span class="actions">
          ${this.snoozeButton(t, `maintenance:${h.counter}`, e)}
          <button class="button" type="button" @click=${() => this.call("counter", "reset", { entity_id: h.counter })}>${n.done}</button>
        </span>
      </div>`),
      ...d.map((h) => {
        const b = this.starts.of(this.hass, h.entity), $ = b !== void 0 && new Date(b).toDateString() === new Date(this._now).toDateString(), g = b === void 0 ? "" : $ ? e.time(b) : e.day(b);
        return u`<div class="row" data-row="laundry">
          <span class="mark">${_s}</span>
          <span class="main">${this.name(h.name)}<small>${xt(n.laundry(g))}</small></span>
          <button class="button" type="button" @click=${() => this.call("input_boolean", "turn_off", { entity_id: h.entity })}>${n.done}</button>
        </div>`;
      })
    ];
    return u`<h2><span>${p ? `${n.needsYou} · ${p}` : n.needsYou}</span></h2>
      <div class="group" data-part="queue">
        ${l.length ? l : u`<div class="row"><span class="main">${n.nothingWaits}</span></div>`}
      </div>`;
  }
  /** Air conditioners that ran at least their threshold since the filter was cleaned; a missing value is no task. */
  dirtyFilters(t) {
    return t.filters.flatMap((e) => {
      const n = yt(this.hass, e.hours), i = yt(this.hass, e.threshold);
      return n !== void 0 && i !== void 0 && i > 0 && n >= i ? [{ filter: e, hours: n, threshold: i }] : [];
    });
  }
  /* ---------- Odložit ---------- */
  day(t) {
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }
  /** The keys of the items postponed to a later day than today. */
  snoozed(t) {
    const e = E(this.hass, t.snoozed)?.attributes.polozky, n = this.day(new Date(this._now)), i = /* @__PURE__ */ new Set();
    if (Array.isArray(e))
      for (const o of e)
        typeof o?.klic == "string" && typeof o.do == "string" && o.do > n && i.add(o.klic);
    return i;
  }
  /** "Odložit" with its menu (a day, to the weekend, a week, a month; without a time, it is no alarm). The menu only covers what is under it. */
  snoozeButton(t, e, n) {
    if (!t.snoozed || !t.snoozeScript) return m;
    const i = n.t, o = new Date(this._now), a = (h) => new Date(o.getFullYear(), o.getMonth(), o.getDate() + h), r = (6 - o.getDay() + 7) % 7 || 7, d = new Date(o.getFullYear(), o.getMonth() + 1, o.getDate()), c = [[i.snoozeFor.day, a(1)], [i.snoozeFor.weekend, a(r)], [i.snoozeFor.week, a(7)], [i.snoozeFor.month, d]], p = this._menu === e, l = (h) => {
      this._menu = void 0, this.call("script", t.snoozeScript.split(".")[1], { klic: e, do: this.day(h) });
    };
    return u`<span class="snooze">
      <button class="button" type="button" aria-haspopup="menu" aria-expanded=${p ? "true" : "false"} @click=${() => this._menu = p ? void 0 : e}>${i.snooze}</button>
      ${p ? u`<div class="menu" role="menu">
            ${c.map(([h, b]) => u`<button type="button" role="menuitem" @click=${() => l(b)}><span>${h}</span><span class="until">${n.day(b.getTime())}</span></button>`)}
          </div>` : m}
    </span>`;
  }
  /** The preset a blind did not arrive at (its target matches one), when it moved but stopped elsewhere. */
  failedGoal(t, e) {
    const n = e.cil;
    if (!(!e.entita.startsWith("cover.") || !/^nedojela/i.test(e.duvod ?? "")))
      return t.covers.presets.find((i) => Math.abs(Number(n?.pos) - i.position) <= t.covers.tolerance && Math.abs(Number(n?.tilt) - i.tilt) <= t.covers.tolerance);
  }
  /** A failed command of a blind can be sent again when the sensor kept its target. */
  retryOf(t, e) {
    const n = e.cil;
    if (!e.entita.startsWith("cover.") || !n || n.pos === void 0 || n.tilt === void 0) return;
    const i = Number(n.pos), o = Number(n.tilt);
    if (!Number.isFinite(i) || !Number.isFinite(o)) return;
    const a = { name: "", position: i, tilt: o };
    return () => this.send(
      `retry:${e.entita}`,
      { entities: [e.entita], done: () => this.coverDone(t, e.entita, a) },
      "script",
      t.covers.script.split(".")[1],
      { entity: e.entita, pos: i, tilt: o }
    );
  }
  /* ---------- Teď běží ---------- */
  duration(t, e) {
    const n = this.starts.of(this.hass, t);
    if (n === void 0) return "";
    const i = Math.max(0, Math.floor((this._now - n) / 6e4));
    return i < 60 ? e.t.minutes(i) : e.t.hours(Math.floor(i / 60), i % 60);
  }
  renderRunning(t, e) {
    if (!t.running.length) return m;
    const n = new Set(t.devices.flatMap((a) => a.entities.map((r) => r.entity))), i = t.running.filter((a) => !n.has(a.entity) && ["on", "cleaning", "returning"].includes(C(this.hass, a.entity) ?? "")), o = i.map((a) => `${this.name(a.name)} ${this.duration(a.entity, e)}`.trim());
    return u`<h2><span>${e.t.running}</span></h2>
      <div class="group" data-part="running"><div class="row now ${i.length ? "" : "none"}"><span class="main" style="font-size:inherit;line-height:inherit">${o.length ? ht(o) : e.t.nothingRuns}</span></div></div>`;
  }
  /* ---------- Žaluzie ---------- */
  /** Whether one blind is in the preset: undefined when it does not report its position. */
  coverIn(t, e, n) {
    const i = E(this.hass, e);
    if (!i || it(i.state)) return;
    const o = Number(i.attributes.current_position), a = Number(i.attributes.current_tilt_position);
    if (!(!Number.isFinite(o) || !Number.isFinite(a)))
      return Math.abs(o - n.position) <= t.covers.tolerance && Math.abs(a - n.tilt) <= t.covers.tolerance;
  }
  /** How many blinds are in the preset, and how many report their position at all. */
  inPreset(t, e) {
    let n = 0, i = 0;
    for (const o of t.covers.entities) {
      const a = this.coverIn(t, o, e);
      a !== void 0 && (i += 1, a && (n += 1));
    }
    return { count: n, known: i };
  }
  renderCovers(t, e) {
    if (!t.covers.entities.length) return m;
    const n = t.covers.presets.length - 1;
    return u`<h2>
        <span>${e.t.covers}</span>
        <button class="chevron" type="button" data-open="covers" aria-haspopup="dialog" aria-label=${e.t.coversDetail} @click=${() => this._detail = "covers"}>
          <span aria-hidden="true">›</span>
        </button>
      </h2>
      <div class="tiles" data-part="covers">
        ${t.covers.presets.map((i, o) => {
      const { count: a, known: r } = this.inPreset(t, i), d = r === t.covers.entities.length && a === r, c = d ? "on" : a > 0 ? "mixed" : "idle";
      return u`<dd-tile
            kind="action"
            centered
            guarded
            .name=${this.name(i.name)}
            .state=${c}
            .count=${a > 0 && !d ? a : void 0}
            .hint=${e.t.hint}
            .hintAlign=${o === 0 ? "start" : o === n ? "end" : "center"}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            .pending=${this.pending.has(`covers:${o}`)}
            @hdk-press=${() => this.setCovers(t, i, `covers:${o}`)}
          ></dd-tile>`;
    })}
      </div>`;
  }
  /** When something happened: the time today, else the day. */
  when(t, e) {
    return new Date(t).toDateString() === new Date(this._now).toDateString() ? e.time(t) : e.day(t);
  }
  /** The last action of one blind: a failed command first (warning), else who moved it and when. */
  coverAction(t, e, n) {
    const i = n.t, o = this.failed(t).find((c) => c.entita === e);
    if (o) {
      const c = o.cas ? Date.parse(o.cas) : NaN, p = this.failedGoal(t, o);
      return p ? { text: [i.notArrivedTo(this.name(p.name)), Number.isFinite(c) ? this.when(c, n) : ""].filter(Boolean).join(" "), warn: !0 } : { text: [Number.isFinite(c) ? i.notArrived(this.when(c, n)) : i.notArrived("").trim(), o.duvod].filter(Boolean).join(" · "), warn: !0 };
    }
    const a = E(this.hass, t.covers.lastAction)?.attributes.polozky, r = a && typeof a == "object" ? a[e] : void 0;
    if (!r || typeof r.kdo != "string") return;
    const d = typeof r.cas == "string" ? Date.parse(r.cas) : NaN;
    return { text: [i.who[r.kdo] ?? r.kdo, Number.isFinite(d) ? this.when(d, n) : ""].filter(Boolean).join(" "), warn: !1 };
  }
  /** Detail of the blinds: every room with its last action and the three presets just for it (one tap: the sheet was opened on purpose). */
  renderCoversDetail(t, e) {
    if (!t.covers.entities.length) return m;
    const n = e.t, i = this._detail === "covers";
    return u`<dd-sheet .open=${i} .heading=${n.covers} .closeLabel=${n.close} @hdk-close=${() => this._detail = void 0}>
      ${i ? u`<div class="detail" data-part="covers-detail">
            ${t.covers.entities.map((o) => {
      const a = E(this.hass, o), r = t.covers.names[o], d = a?.attributes.friendly_name, c = r !== void 0 ? this.name(r) : typeof d == "string" ? d : o, p = this.coverAction(t, o, e);
      return u`<div class="cover-row" data-cover=${o}>
                <span class="main">${c}${p ? u`<small class=${p.warn ? "warn" : ""}>${xt(p.text)}</small>` : m}</span>
                <span class="presets">
                  ${t.covers.presets.map(
        (l, h) => u`<dd-tile
                      kind="action"
                      centered
                      .name=${this.name(l.name)}
                      .label=${`${c}: ${this.name(l.name)}`}
                      .state=${this.coverIn(t, o, l) ? "on" : "idle"}
                      .pending=${this.pending.has(`cover:${o}:${h}`)}
                      @hdk-press=${() => this.send(`cover:${o}:${h}`, { entities: [o], done: () => this.coverDone(t, o, l) }, "script", t.covers.script.split(".")[1], {
          entity: o,
          pos: l.position,
          tilt: l.tilt
        })}
                    ></dd-tile>`
      )}
                </span>
              </div>`;
    })}
          </div>` : m}
    </dd-sheet>`;
  }
  setCovers(t, e, n) {
    const i = t.covers.script.split(".")[1];
    if (!this.pending.has(n)) {
      this.pending.start(n, this.hass, { entities: t.covers.entities, done: () => t.covers.entities.every((o) => this.coverDone(t, o, e)) });
      for (const o of t.covers.entities)
        this.call("script", i, { entity: o, pos: e.position, tilt: e.tilt }, n);
    }
  }
  /* ---------- Větrání ---------- */
  align(t) {
    return t % 3 === 0 ? "start" : t % 3 === 2 ? "end" : "center";
  }
  renderVentilation(t, e) {
    const n = e.t, i = [...t.ventilation.mode ? [{ name: n.ventilationMode, entity: t.ventilation.mode }] : [], ...t.ventilation.fans];
    return i.length ? u`<h2><span>${n.ventilation}</span></h2>
      <div class="tiles" data-part="ventilation">
        ${i.map((o, a) => {
      const r = E(this.hass, o.entity), d = !r || it(r.state), c = r?.state === "on";
      return u`<dd-tile
            kind="toggle"
            guarded
            data-entity=${o.entity}
            .name=${this.name(o.name)}
            .text=${d ? n.unavailable : c ? n.runs(this.duration(o.entity, e)).trim() : n.off}
            .state=${c ? "on" : "off"}
            .disabled=${d}
            .hint=${n.hint}
            .hintAlign=${this.align(a)}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            .pending=${this.pending.has(`toggle:${o.entity}`)}
            @hdk-toggle=${(p) => {
        const l = p.detail.checked ? "on" : "off";
        this.send(`toggle:${o.entity}`, { entities: [o.entity], done: () => C(this.hass, o.entity) === l }, "homeassistant", p.detail.checked ? "turn_on" : "turn_off", {
          entity_id: o.entity
        });
      }}
          ></dd-tile>`;
    })}
      </div>` : m;
  }
  /* ---------- Další zařízení (Světla, Zásuvky, Vysavače …) ---------- */
  /**
   * One section per kind from the configuration („Q218 zatím A“). A light, a switch or a fan is a guarded toggle like
   * a fan of Větrání; a vacuum starts cleaning, or goes home while it cleans („Q221 A“).
   */
  renderDevices(t, e) {
    const n = e.t;
    return t.devices.filter((i) => i.entities.length).map(
      (i, o) => u`<h2><span>${this.name(i.name)}</span></h2>
          <div class="tiles" data-part=${`devices-${o}`}>
            ${i.entities.map((a, r) => {
        const d = E(this.hass, a.entity), c = !d || it(d.state);
        if (a.entity.startsWith("vacuum.")) {
          const l = d?.state === "cleaning", h = this.hass, b = d && h?.formatEntityState ? h.formatEntityState(d) : d?.state ?? "", $ = c ? n.unavailable : l ? [b, this.duration(a.entity, e)].filter(Boolean).join(" · ") : b, g = `vacuum:${a.entity}`;
          return u`<dd-tile
                  kind="action"
                  guarded
                  data-entity=${a.entity}
                  .name=${this.name(a.name)}
                  .text=${$}
                  .state=${l ? "on" : c ? "off" : "idle"}
                  .disabled=${c}
                  .hint=${n.hint}
                  .hintAlign=${this.align(r)}
                  .holdMs=${t.guard.holdMs}
                  .doubleTapMs=${t.guard.doubleTapMs}
                  .hintSeconds=${t.guard.hintSeconds}
                  .pending=${this.pending.has(g)}
                  @hdk-press=${() => l ? this.send(g, { entities: [a.entity], done: () => ["returning", "docked"].includes(C(this.hass, a.entity) ?? "") }, "vacuum", "return_to_base", { entity_id: a.entity }) : this.send(g, { entities: [a.entity], done: () => C(this.hass, a.entity) === "cleaning" }, "vacuum", "start", { entity_id: a.entity })}
                ></dd-tile>`;
        }
        const p = d?.state === "on";
        return u`<dd-tile
                kind="toggle"
                guarded
                data-entity=${a.entity}
                .name=${this.name(a.name)}
                .text=${c ? n.unavailable : p ? n.on : n.off}
                .state=${p ? "on" : "off"}
                .disabled=${c}
                .hint=${n.hint}
                .hintAlign=${this.align(r)}
                .holdMs=${t.guard.holdMs}
                .doubleTapMs=${t.guard.doubleTapMs}
                .hintSeconds=${t.guard.hintSeconds}
                .pending=${this.pending.has(`toggle:${a.entity}`)}
                @hdk-toggle=${(l) => {
          const h = l.detail.checked ? "on" : "off";
          this.send(`toggle:${a.entity}`, { entities: [a.entity], done: () => C(this.hass, a.entity) === h }, "homeassistant", l.detail.checked ? "turn_on" : "turn_off", {
            entity_id: a.entity
          });
        }}
              ></dd-tile>`;
      })}
          </div>`
    );
  }
  /* ---------- Topení a Klimatizace ---------- */
  target(t, e, n) {
    const i = Number(E(this.hass, t)?.attributes.temperature);
    return Number.isFinite(i) ? `${n ? e.half(i) : e.whole(i)}°` : "";
  }
  renderHeating(t, e) {
    if (!t.heating.rooms.length) return m;
    const n = e.t, i = t.heating.rooms.filter((o) => C(this.hass, o.entity) === "heat").length;
    return u`<h2>
        <span>${n.heating}</span>
        ${i && t.heating.resume ? this.link(
      "resume",
      u`<span class="count">${n.manualCount(i)} · </span>${n.resume}`,
      () => this.send(
        "resume",
        { entities: t.heating.rooms.map((o) => o.entity), done: () => !t.heating.rooms.some((o) => C(this.hass, o.entity) === "heat") },
        "button",
        "press",
        { entity_id: t.heating.resume }
      )
    ) : m}
      </h2>
      <div class="tiles" data-part="heating">
        ${t.heating.rooms.map((o) => {
      const a = C(this.hass, o.entity), r = a === void 0 ? n.unavailable : a === "off" ? n.off : [a === "auto" ? n.schedule : n.manual, this.target(o.entity, e, !0)].filter(Boolean).join(" · "), d = a === void 0 || a === "off" ? "off" : a === "auto" ? "idle" : "on";
      return this.openTile("heating", o, r, d, a === void 0);
    })}
      </div>`;
  }
  renderCooling(t, e) {
    if (!t.cooling.rooms.length) return m;
    const n = e.t, i = t.cooling.rooms.filter((o) => !["off", void 0].includes(C(this.hass, o.entity)));
    return u`<h2>
        <span>${n.cooling}</span>
        ${i.length ? this.link(
      "alloff",
      n.allOff,
      () => this.send(
        "alloff",
        { entities: i.map((o) => o.entity), done: () => i.every((o) => ["off", void 0].includes(C(this.hass, o.entity))) },
        "climate",
        "turn_off",
        { entity_id: i.map((o) => o.entity) }
      )
    ) : m}
      </h2>
      <div class="tiles" data-part="cooling">
        ${t.cooling.rooms.map((o) => {
      const a = C(this.hass, o.entity), r = String(E(this.hass, o.entity)?.attributes.preset_mode ?? ""), d = a === "cool" && r === "wind_free" ? "wind_free" : a === "heat_cool" ? "auto" : a ?? "", c = a === void 0 ? n.unavailable : a === "off" ? n.off : [n.mode[d] ?? n.on, a === "fan_only" ? "" : this.target(o.entity, e, !1)].filter(Boolean).join(" · ");
      return this.openTile("cooling", o, c, a === void 0 || a === "off" ? "off" : "on", a === void 0);
    })}
      </div>`;
  }
  /** A tile that opens the popup Topení / Klimatizace with its room selected: one tap, it changes nothing by itself. */
  openTile(t, e, n, i, o) {
    return u`<dd-tile
      kind="open"
      data-entity=${e.entity}
      .name=${this.name(e.name)}
      .text=${n}
      .state=${i}
      .disabled=${o}
      @hdk-open=${() => {
      this._climateSelected = [e.entity], this._detail = t;
    }}
    ></dd-tile>`;
  }
  /** The shared popup of the kit for one system (spec of the kit: in the card Dům only one system, no switch). */
  renderClimate(t, e) {
    const n = this._detail === "heating" || this._detail === "cooling" ? this._detail : void 0, i = (n ?? "heating") === "heating" ? t.heating.rooms : t.cooling.rooms;
    if (!t.heating.rooms.length && !t.cooling.rooms.length) return m;
    const o = async () => {
      await this.renderRoot.querySelector("dd-climate")?.flush(), this._detail = void 0;
    };
    return u`<dd-sheet .open=${n !== void 0} .heading=${n === "cooling" ? e.t.cooling : e.t.heating} .closeLabel=${e.t.close} @hdk-close=${o}>
      ${n ? u`<dd-climate
            .hass=${this.hass}
            .i18n=${e}
            .texts=${e.t.climate}
            .system=${n}
            .rooms=${i.map((a) => ({ name: this.name(a.name), entity: a.entity }))}
            .selected=${this._climateSelected}
            .delayMs=${t.sendDelaySeconds * 1e3}
            @hdk-select-rooms=${(a) => this._climateSelected = a.detail.selected}
            @hdk-error=${(a) => this._error = a.detail.message}
            @hdk-more-info=${async (a) => {
      await o(), this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: a.detail.entityId }, bubbles: !0, composed: !0 }));
    }}
          ></dd-climate>` : m}
    </dd-sheet>`;
  }
  /* ---------- Chráněný odkaz v nadpisu oddílu ---------- */
  link(t, e, n) {
    const i = (r) => {
      if (r.detail === 0) {
        this.gesture.cancel(), n();
        return;
      }
      const d = this.gesture.tap(t, r.timeStamp);
      d === "double" ? (this._hint = void 0, n()) : d === "single" && (this._hint = t, window.clearTimeout(this.hintTimer), this.hintTimer = window.setTimeout(() => this._hint = void 0, (this._config?.guard.hintSeconds ?? 3) * 1e3));
    }, o = (r) => {
      r.button > 0 || this.gesture.start(() => {
        this._hint = void 0, n();
      });
    }, a = () => this.gesture.release();
    return u`<button class="link ${this.pending.has(t) ? "pending" : ""}" type="button" data-link=${t} aria-busy=${this.pending.has(t) ? "true" : m} @click=${i} @pointerdown=${o} @pointerup=${a} @pointerleave=${a} @pointercancel=${a} @contextmenu=${(r) => r.preventDefault()}>
      ${e}${this._hint === t ? u`<div class="hint above end" aria-hidden="true"><i></i><span style="position: relative">${this.i18n.t.hint}</span></div>` : m}
    </button>`;
  }
  /* ---------- Volání Home Assistantu ---------- */
  call(t, e, n, i) {
    this._error = "", this.hass?.callService(t, e, n).catch((o) => {
      i && this.pending.stop(i), this._error = `${this.i18n.t.failed}: ${o instanceof Error ? o.message : String(o)}`;
    });
  }
  /** Sends and pulses the control `key` until `command` is done (or nothing changes for a while, or the call fails). */
  send(t, e, n, i, o) {
    this.pending.has(t) || (this.pending.start(t, this.hass, e), this.call(n, i, o, t));
  }
  /** A blind in a preset and still (its way is over). */
  coverDone(t, e, n) {
    const i = E(this.hass, e)?.state;
    return i === void 0 || it(i) || this.coverIn(t, e, n) === !0 && i !== "opening" && i !== "closing";
  }
};
ae.styles = [Lt, Kt, ps];
let P = ae;
I([
  f({ attribute: !1 })
], P.prototype, "hass");
I([
  S()
], P.prototype, "_config");
I([
  S()
], P.prototype, "_error");
I([
  S()
], P.prototype, "_hint");
I([
  S()
], P.prototype, "_now");
I([
  S()
], P.prototype, "_detail");
I([
  S()
], P.prototype, "_rules");
I([
  S()
], P.prototype, "_log");
I([
  S()
], P.prototype, "_seen");
I([
  S()
], P.prototype, "_climateSelected");
I([
  S()
], P.prototype, "_menu");
I([
  S()
], P.prototype, "_fit");
Un("dd");
Tn("dd");
customElements.get("ha-dum-dashboard") || customElements.define("ha-dum-dashboard", P);
window.customCards = window.customCards ?? [];
window.customCards.some((s) => s.type === "ha-dum-dashboard") || window.customCards.push({
  type: "ha-dum-dashboard",
  name: "Dům Dashboard",
  description: Fe(es()).t.cardDescription,
  preview: !1
});
console.info("%c DUM-DASHBOARD %c 0.16.0 · 2026-11-14 08:14 UTC · po 8bd3893 ", "color:#fff;background:#0A6ED1;font-weight:700", "color:inherit");
