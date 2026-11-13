const at = globalThis, vt = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wt = /* @__PURE__ */ Symbol(), It = /* @__PURE__ */ new WeakMap();
let te = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (vt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = It.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && It.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ue = (n) => new te(typeof n == "string" ? n : n + "", void 0, wt), L = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new te(e, n, wt);
}, pe = (n, t) => {
  if (vt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = at.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, Bt = vt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ue(e);
})(n) : n;
const { is: fe, defineProperty: me, getOwnPropertyDescriptor: ge, getOwnPropertyNames: be, getOwnPropertySymbols: $e, getPrototypeOf: ye } = Object, ut = globalThis, Ft = ut.trustedTypes, ve = Ft ? Ft.emptyScript : "", we = ut.reactiveElementPolyfillSupport, et = (n, t) => n, ht = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? ve : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, xt = (n, t) => !fe(n, t), Ht = { attribute: !0, type: String, converter: ht, reflect: !1, useDefault: !1, hasChanged: xt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ut.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let W = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ht) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && me(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = ge(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const a = s?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(et("elementProperties"))) return;
    const t = ye(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(et("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(et("properties"))) {
      const e = this.properties, i = [...be(e), ...$e(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(Bt(s));
    } else t !== void 0 && e.push(Bt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return pe(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : ht).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : ht;
      this._$Em = s;
      const a = r.fromAttribute(e, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? xt)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: r } = o, a = this[s];
        r !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
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
W.elementStyles = [], W.shadowRootOptions = { mode: "open" }, W[et("elementProperties")] = /* @__PURE__ */ new Map(), W[et("finalized")] = /* @__PURE__ */ new Map(), we?.({ ReactiveElement: W }), (ut.reactiveElementVersions ??= []).push("2.1.2");
const _t = globalThis, Vt = (n) => n, ct = _t.trustedTypes, Wt = ct ? ct.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ee = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, ie = "?" + j, xe = `<${ie}>`, B = document, it = () => B.createComment(""), nt = (n) => n === null || typeof n != "object" && typeof n != "function", kt = Array.isArray, _e = (n) => kt(n) || typeof n?.[Symbol.iterator] == "function", gt = `[ 	
\f\r]`, J = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qt = /-->/g, Yt = />/g, U = RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Kt = /'/g, Zt = /"/g, ne = /^(?:script|style|textarea|title)$/i, ke = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), f = ke(1), q = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), Gt = /* @__PURE__ */ new WeakMap(), R = B.createTreeWalker(B, 129);
function se(n, t) {
  if (!kt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Wt !== void 0 ? Wt.createHTML(t) : t;
}
const Ae = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = J;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let p, c, d = -1, h = 0;
    for (; h < l.length && (r.lastIndex = h, c = r.exec(l), c !== null); ) h = r.lastIndex, r === J ? c[1] === "!--" ? r = qt : c[1] !== void 0 ? r = Yt : c[2] !== void 0 ? (ne.test(c[2]) && (s = RegExp("</" + c[2], "g")), r = U) : c[3] !== void 0 && (r = U) : r === U ? c[0] === ">" ? (r = s ?? J, d = -1) : c[1] === void 0 ? d = -2 : (d = r.lastIndex - c[2].length, p = c[1], r = c[3] === void 0 ? U : c[3] === '"' ? Zt : Kt) : r === Zt || r === Kt ? r = U : r === qt || r === Yt ? r = J : (r = U, s = void 0);
    const g = r === U && n[a + 1].startsWith("/>") ? " " : "";
    o += r === J ? l + xe : d >= 0 ? (i.push(p), l.slice(0, d) + ee + l.slice(d) + j + g) : l + j + (d === -2 ? a : g);
  }
  return [se(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class st {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [p, c] = Ae(t, e);
    if (this.el = st.createElement(p, i), R.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = R.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(ee)) {
          const h = c[r++], g = s.getAttribute(d).split(j), $ = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: o, name: $[2], strings: g, ctor: $[1] === "." ? Me : $[1] === "?" ? Ce : $[1] === "@" ? Ee : pt }), s.removeAttribute(d);
        } else d.startsWith(j) && (l.push({ type: 6, index: o }), s.removeAttribute(d));
        if (ne.test(s.tagName)) {
          const d = s.textContent.split(j), h = d.length - 1;
          if (h > 0) {
            s.textContent = ct ? ct.emptyScript : "";
            for (let g = 0; g < h; g++) s.append(d[g], it()), R.nextNode(), l.push({ type: 2, index: ++o });
            s.append(d[h], it());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ie) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(j, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += j.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = B.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Y(n, t, e = n, i) {
  if (t === q) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = nt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = Y(n, s._$AS(n, t.values), s, i)), t;
}
class Se {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? B).importNode(e, !0);
    R.currentNode = s;
    let o = R.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let p;
        l.type === 2 ? p = new ot(o, o.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (p = new Te(o, this, t)), this._$AV.push(p), l = i[++a];
      }
      r !== l?.index && (o = R.nextNode(), r++);
    }
    return R.currentNode = B, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class ot {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = Y(this, t, e), nt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== q && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : _e(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && nt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(B.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = st.createElement(se(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new Se(s, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Gt.get(t.strings);
    return e === void 0 && Gt.set(t.strings, e = new st(t)), e;
  }
  k(t) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new ot(this.O(it()), this.O(it()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Vt(t).nextSibling;
      Vt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = Y(this, t, e, 0), r = !nt(t) || t !== this._$AH && t !== q, r && (this._$AH = t);
    else {
      const a = t;
      let l, p;
      for (t = o[0], l = 0; l < o.length - 1; l++) p = Y(this, a[i + l], e, l), p === q && (p = this._$AH[l]), r ||= !nt(p) || p !== this._$AH[l], p === m ? t = m : t !== m && (t += (p ?? "") + o[l + 1]), this._$AH[l] = p;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Me extends pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class Ce extends pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class Ee extends pt {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Y(this, t, e, 0) ?? m) === q) return;
    const i = this._$AH, s = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Te {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Y(this, t);
  }
}
const ze = _t.litHtmlPolyfillSupport;
ze?.(st, ot), (_t.litHtmlVersions ??= []).push("3.3.3");
const Ne = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new ot(t.insertBefore(it(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
const At = globalThis;
class z extends W {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ne(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return q;
  }
}
z._$litElement$ = !0, z.finalized = !0, At.litElementHydrateSupport?.({ LitElement: z });
const Pe = At.litElementPolyfillSupport;
Pe?.({ LitElement: z });
(At.litElementVersions ??= []).push("4.2.2");
const De = { attribute: !0, type: String, converter: ht, reflect: !1, hasChanged: xt }, Oe = (n = De, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(e.name, n), i === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, n, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function u(n) {
  return (t, e) => typeof e == "object" ? Oe(n, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(n, t, e);
}
function D(n) {
  return u({ ...n, state: !0, attribute: !1 });
}
var je = Object.defineProperty, K = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && je(t, e, s), s;
};
const Ct = class Ct extends z {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, i = (t - e) / 2, s = 2 * Math.PI * i, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), r = t / 2;
    return f`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
      <svg viewBox="0 0 ${t} ${t}" aria-hidden="true">
        <circle class="track" cx=${r} cy=${r} r=${i} fill="none" stroke-width=${e}></circle>
        <circle
          class="fill"
          cx=${r}
          cy=${r}
          r=${i}
          fill="none"
          stroke-width=${e}
          stroke-linecap="round"
          stroke-dasharray="${(s * o).toFixed(1)} ${s.toFixed(1)}"
          transform="rotate(-90 ${r} ${r})"
        ></circle>
      </svg>
      ${this.num ? f`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? f`<span class="unit">${this.unit}</span>` : m}` : m}
    </div>`;
  }
};
Ct.styles = L`
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
let P = Ct;
K([
  u({ type: Number })
], P.prototype, "fraction");
K([
  u({ type: Number })
], P.prototype, "size");
K([
  u({ type: Number })
], P.prototype, "stroke");
K([
  u()
], P.prototype, "num");
K([
  u()
], P.prototype, "unit");
K([
  u()
], P.prototype, "label");
class ft {
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
    const i = this.pressing, s = this.fired;
    return this.pressing = !1, this.fired = !1, !i || s ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
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
class St {
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
const mt = L`
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
var Le = Object.defineProperty, S = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Le(t, e, s), s;
};
const Et = class Et extends z {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new St(this), this.nudgeIndex = 0, this.gesture = new ft(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((a) => a.value === this.value), e = this.options.filter((a) => !a.disabled), i = this.options[t]?.value ?? e[0]?.value, s = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !s ? Math.sign(this.nudgeIndex - t) * 14 : 0, r = this._dragging ? this._dx : o;
    return f`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((a) => a.detail) ? "tall" : ""}"
        role="radiogroup"
        aria-label=${this.label}
        style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)};--dx:${r}px"
        @keydown=${this.onKey}
        @pointerdown=${this.onDown}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onCancel}
        @contextmenu=${(a) => this.guarded && a.preventDefault()}
      >
        <span class="thumb" aria-hidden="true" ?hidden=${t < 0}></span>
        ${this.options.map(
      (a, l) => f`<button
            type="button"
            role="radio"
            aria-checked=${a.value === this.value ? "true" : "false"}
            tabindex=${a.value === i ? 0 : -1}
            ?disabled=${this.disabled || a.disabled}
            data-value=${a.value}
            data-index=${l}
            @click=${(p) => this.onClick(p, a.value, l)}
          >
            <span>${a.label}</span>${a.detail ? f`<span class="detail">${a.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? f`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  select(t) {
    this.disabled || t === this.value || (this.gesture.release(), this.hints.hide(), this.dispatchEvent(new CustomEvent("hdk-select", { detail: { value: t }, bubbles: !0, composed: !0 })));
  }
  onClick(t, e, i) {
    if (this.disabled || e === this.value) return;
    if (!this.guarded) {
      this.select(e);
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.select(e);
      return;
    }
    const s = this.gesture.tap(String(i), t.timeStamp);
    if (this.swallowClick || s === "none") {
      this.swallowClick = !1;
      return;
    }
    s === "double" ? this.select(e) : (this.nudgeIndex = i, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, i = this.options.findIndex((a) => a.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: i, moved: !1, id: t.pointerId };
    const s = t.target.closest("button[data-index]"), o = s ? Number(s.dataset.index) : -1, r = o >= 0 && o !== i && !this.options[o]?.disabled;
    this.gesture.start(() => {
      r && (this.drag = void 0, this.select(this.options[o].value));
    });
  }
  onMove(t) {
    const e = this.drag;
    if (!e || e.id !== t.pointerId) return;
    const i = t.clientX - e.x;
    if (!e.moved && Math.abs(i) < 6) return;
    e.moved || (e.moved = !0, this.gesture.release(), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const s = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((s - e.index) * e.width, i)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (this.gesture.release(), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const i = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const s = this.options[i];
    s && !s.disabled && i !== e.index && this.select(s.value);
  }
  onCancel() {
    this.gesture.cancel(), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const i = this.options.filter((a) => !a.disabled);
    if (!i.length) return;
    const s = i.findIndex((a) => a.value === this.value), o = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, r = i[(s + o + i.length) % i.length];
    t.preventDefault(), this.select(r.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${r.value}"]`)?.focus());
  }
};
Et.styles = [
  mt,
  L`
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
let x = Et;
S([
  u({ attribute: !1 })
], x.prototype, "options");
S([
  u()
], x.prototype, "value");
S([
  u()
], x.prototype, "label");
S([
  u({ type: Boolean })
], x.prototype, "disabled");
S([
  u({ type: Boolean })
], x.prototype, "compact");
S([
  u({ type: Boolean })
], x.prototype, "guarded");
S([
  u({ type: Number })
], x.prototype, "holdMs");
S([
  u({ type: Number })
], x.prototype, "doubleTapMs");
S([
  u({ type: Number })
], x.prototype, "hintSeconds");
S([
  u()
], x.prototype, "hint");
S([
  D()
], x.prototype, "_dx");
S([
  D()
], x.prototype, "_dragging");
var Ue = Object.defineProperty, M = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Ue(t, e, s), s;
};
const Tt = class Tt extends z {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, s = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, o = this.tickStep || this.step || 1, r = Math.floor(e / o + 1e-9) + 1, a = r >= 2 && r <= 40 ? Array.from({ length: r }, (l, p) => f`<i style="left:${(p * o / e * 100).toFixed(2)}%"></i>`) : [];
    return f`<div class="wrap">
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(t)}
          aria-label=${this.label}
          aria-valuetext=${this.valueText || String(t)}
          ?disabled=${this.disabled}
          style="--fill: ${s}"
          @input=${this.onInput}
          @change=${this.onChange}
        />
        <div class="ticks" aria-hidden="true">${a}</div>
      </div>
      ${this.minLabel || this.maxLabel ? f`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
Tt.styles = L`
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
let _ = Tt;
M([
  u({ type: Number })
], _.prototype, "min");
M([
  u({ type: Number })
], _.prototype, "max");
M([
  u({ type: Number })
], _.prototype, "step");
M([
  u({ type: Number })
], _.prototype, "tickStep");
M([
  u({ type: Number })
], _.prototype, "value");
M([
  u()
], _.prototype, "label");
M([
  u()
], _.prototype, "valueText");
M([
  u()
], _.prototype, "minLabel");
M([
  u()
], _.prototype, "maxLabel");
M([
  u({ type: Boolean })
], _.prototype, "disabled");
M([
  D()
], _.prototype, "_drag");
var Re = Object.defineProperty, O = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Re(t, e, s), s;
};
const zt = class zt extends z {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new St(this), this.gesture = new ft(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return f`<button
        type="button"
        role="switch"
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${this.checked ? "true" : "false"}
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
      ${this.hints.hint ? f`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
zt.styles = [
  mt,
  L`
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
let A = zt;
O([
  u({ type: Boolean })
], A.prototype, "checked");
O([
  u({ type: Boolean })
], A.prototype, "disabled");
O([
  u()
], A.prototype, "label");
O([
  u({ type: Boolean })
], A.prototype, "guarded");
O([
  u({ type: Number })
], A.prototype, "holdMs");
O([
  u({ type: Number })
], A.prototype, "doubleTapMs");
O([
  u({ type: Number })
], A.prototype, "hintSeconds");
O([
  u()
], A.prototype, "hintPlacement");
O([
  u()
], A.prototype, "hint");
var Ie = Object.defineProperty, k = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Ie(t, e, s), s;
};
const Nt = class Nt extends z {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new St(this), this.gesture = new ft(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.kind === "toggle", e = this.count === void 0 ? null : f`<span class="count">${this.count}</span>`;
    return f`<button
        type="button"
        role=${t ? "switch" : "button"}
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${t ? this.state === "on" ? "true" : "false" : m}
        aria-haspopup=${this.kind === "open" ? "dialog" : m}
        aria-label=${this.label || m}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(i) => this.protected && i.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? f`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : f`<span class="text">${this.text}${e}</span>`}</button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? f`<div class="hint above ${this.hintAlign}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
Nt.styles = [
  mt,
  L`
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
let v = Nt;
k([
  u()
], v.prototype, "name");
k([
  u()
], v.prototype, "text");
k([
  u({ reflect: !0 })
], v.prototype, "state");
k([
  u()
], v.prototype, "kind");
k([
  u({ type: Number })
], v.prototype, "count");
k([
  u({ type: Boolean, reflect: !0 })
], v.prototype, "centered");
k([
  u({ type: Boolean })
], v.prototype, "disabled");
k([
  u()
], v.prototype, "label");
k([
  u({ type: Boolean })
], v.prototype, "guarded");
k([
  u({ type: Number })
], v.prototype, "holdMs");
k([
  u({ type: Number })
], v.prototype, "doubleTapMs");
k([
  u({ type: Number })
], v.prototype, "hintSeconds");
k([
  u()
], v.prototype, "hint");
k([
  u()
], v.prototype, "hintAlign");
function Be(n) {
  const t = [
    [`${n}-switch`, A],
    [`${n}-segmented`, x],
    [`${n}-slider`, _],
    [`${n}-ring`, P],
    [`${n}-tile`, v]
  ];
  for (const [e, i] of t)
    customElements.get(e) || customElements.define(e, i);
}
const Fe = ["cs", "en", "sv"];
class oe extends Error {
}
function b(n) {
  throw new oe(n);
}
function He(n, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof oe ? new Error(`${n}: ${e.message}`) : e;
  }
}
function I(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function H(n, t) {
  return n == null ? {} : (I(n) || b(`"${t}" must be a mapping of keys.`), n);
}
function C(n, t, e) {
  for (const i of Object.keys(n))
    t.includes(i) || b(`${e}: unknown key "${i}" (allowed: ${t.join(", ")}).`);
}
function w(n, t, e = {}) {
  if (n == null)
    return;
  const i = typeof n == "string" ? n.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(i) || b(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !i.startsWith(`${e.domain}.`) && b(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${i}.`), i;
}
function Ve(n, t) {
  if (n != null)
    return (typeof n != "string" || !n.trim()) && b(`${t} must be a non-empty text.`), n.trim();
}
function lt(n, t) {
  if (n != null) {
    if (typeof n == "string" && n.trim())
      return n.trim();
    if (I(n) && Object.keys(n).length > 0) {
      const e = Object.entries(n);
      if (e.every(([i, s]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(i) && typeof s == "string" && s.trim()))
        return Object.fromEntries(e.map(([i, s]) => [i, s.trim()]));
    }
    return b(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function We(n, t) {
  if (n === void 0 || typeof n == "string")
    return n;
  const e = t.toLowerCase();
  return n[e] ?? n[e.split("-")[0]] ?? n.en ?? Object.values(n)[0];
}
const Xt = ["auto", ...Fe];
function qe(n) {
  const t = n ?? "auto";
  return Xt.includes(t) || b(`language must be one of ${Xt.join(", ")}.`), t;
}
const Ye = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function yt(n) {
  return Ye.has(n);
}
function T(n, t) {
  return t ? n?.states?.[t] : void 0;
}
function E(n, t) {
  const e = T(n, t)?.state;
  return e === void 0 || yt(e) ? void 0 : e;
}
function bt(n, t) {
  const e = E(n, t);
  if (e === void 0)
    return;
  const i = Number(e);
  return Number.isFinite(i) ? i : void 0;
}
function dt(n, t = {}) {
  return n.length < 2 ? f`${n[0] ?? m}` : f`<span class="joined ${t.whole ? "whole" : ""}">${n.map(
    (e, i) => f`${i ? f`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : m}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function Jt(n, t = {}) {
  return dt(n.split(" · "), t);
}
function Ke(n, t) {
  n.querySelectorAll(".joined").forEach((e) => {
    const i = `${t}|${e.textContent}`;
    if (e.dataset.fit === i) return;
    e.classList.remove("stacked", "flow", "probe");
    const s = [...e.querySelectorAll(":scope > .joined-sep")];
    s.forEach((l) => l.classList.remove("break"));
    const o = [...e.querySelectorAll(":scope > .joined-part")], r = o.map((l) => l.getBoundingClientRect());
    if (!r.length || !r[0].width) {
      delete e.dataset.fit;
      return;
    }
    e.dataset.fit = i;
    const a = s.filter((l, p) => r[p + 1].top > r[p].top + 1);
    if (a.length) {
      if (!e.classList.contains("whole")) {
        e.classList.add("probe");
        const l = o.some((p) => p.scrollWidth > p.clientWidth + 0.5);
        if (e.classList.remove("probe"), l) {
          e.classList.add("flow");
          return;
        }
      }
      e.classList.add("stacked"), a.forEach((l) => l.classList.add("break"));
    }
  });
}
const Ze = L`
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

  .joined.flow .joined-sep {
    white-space: nowrap;
  }
`, Ge = 168 * 36e5;
function re(n) {
  if (n == null) return;
  const t = typeof n == "number" ? n < 1e11 ? n * 1e3 : n : Date.parse(n);
  return Number.isFinite(t) ? t : void 0;
}
function Xe(n) {
  let t;
  for (const e of n ?? []) {
    const i = e.s ?? e.state, s = re(e.lu ?? e.last_updated);
    i === void 0 || s === void 0 || i === "unavailable" || i === "unknown" || i === "" || (t === void 0 || t.state !== i) && (t = { state: i, start: s });
  }
  return t;
}
class Je {
  constructor(t, e = Date.now) {
    this.onChange = t, this.now = e, this.known = /* @__PURE__ */ new Map(), this.wanted = /* @__PURE__ */ new Map(), this.pending = /* @__PURE__ */ new Map(), this.scheduled = !1;
  }
  /** The moment (ms) the entity got its current state; undefined when the entity is missing or has no time. */
  of(t, e) {
    const i = T(t, e);
    if (!t || !e || !i) return;
    const s = re(i.last_changed), o = `${i.state}|${i.last_changed ?? ""}`, r = this.known.get(e);
    return r?.key === o ? r.start === void 0 ? s : Math.min(r.start, s ?? r.start) : (this.hass = t, this.wanted.get(e) !== o && this.pending.get(e) !== o && (this.wanted.set(e, o), this.schedule()), s);
  }
  schedule() {
    this.scheduled || (this.scheduled = !0, Promise.resolve().then(() => this.flush()));
  }
  async flush() {
    this.scheduled = !1;
    const t = this.hass, e = new Map(this.wanted);
    if (this.wanted.clear(), !t || !e.size) return;
    for (const [o, r] of e) this.pending.set(o, r);
    const i = this.now();
    let s;
    try {
      s = await t.callWS({
        type: "history/history_during_period",
        start_time: new Date(i - Ge).toISOString(),
        end_time: new Date(i).toISOString(),
        entity_ids: [...e.keys()],
        include_start_time_state: !0,
        significant_changes_only: !1,
        minimal_response: !0,
        no_attributes: !0
      });
    } catch {
      s = void 0;
    }
    for (const [o, r] of e) {
      if (this.pending.get(o) === r && this.pending.delete(o), this.wanted.has(o)) continue;
      const a = Xe(s?.[o]), l = T(this.hass, o)?.state;
      this.known.set(o, { key: r, start: a && a.state === l ? a.start : void 0 });
    }
    this.onChange();
  }
}
const Qe = [
  { name: { cs: "Den", en: "Day", sv: "Dag" }, position: 100, tilt: 100 },
  { name: { cs: "Stín", en: "Shade", sv: "Skugga" }, position: 0, tilt: 100 },
  { name: { cs: "Tma", en: "Dark", sv: "Mörker" }, position: 0, tilt: 0 }
];
function tt(n, t) {
  return n == null ? [] : (Array.isArray(n) || b(`"${t}" must be a list.`), n);
}
function V(n, t, e, i, s) {
  return n == null ? e : ((typeof n != "number" || !Number.isFinite(n) || n < i || n > s) && b(`${t} must be a number from ${i} to ${s}.`), n);
}
function Q(n, t, e) {
  return tt(n, t).map((i, s) => {
    const o = `${t}[${s}]`;
    I(i) || b(`${o} must be a mapping with name and entity.`), C(i, ["name", "entity"], o);
    const r = lt(i.name, `${o}.name`) ?? b(`${o}.name is missing.`), a = w(i.entity, `${o}.entity`, { example: `${e[0]}.example` }) ?? b(`${o}.entity is missing.`);
    return e.includes(a.split(".")[0]) || b(`${o}.entity must be one of ${e.join(", ")}, not ${a}.`), { name: r, entity: a };
  });
}
function ti(n) {
  I(n) || b("the configuration must be a mapping of keys.");
  const t = H(n.covers, "covers");
  C(t, ["script", "entities", "presets", "tolerance"], "covers");
  const e = H(n.ventilation, "ventilation");
  C(e, ["mode", "fans"], "ventilation");
  const i = H(n.heating, "heating");
  C(i, ["resume", "rooms"], "heating");
  const s = H(n.cooling, "cooling");
  C(s, ["rooms"], "cooling");
  const o = H(n.guard, "guard");
  C(o, ["hold_ms", "double_tap_ms", "hint_seconds"], "guard");
  const r = H(n.house_modes, "house_modes");
  C(r, ["winter", "summer"], "house_modes");
  const a = tt(t.presets, "covers.presets").map((c, d) => {
    const h = `covers.presets[${d}]`;
    return I(c) || b(`${h} must be a mapping with name, position and tilt.`), C(c, ["name", "position", "tilt"], h), {
      name: lt(c.name, `${h}.name`) ?? b(`${h}.name is missing.`),
      position: V(c.position, `${h}.position`, 0, 0, 100),
      tilt: V(c.tilt, `${h}.tilt`, 0, 0, 100)
    };
  }), l = tt(n.batteries, "batteries").map((c, d) => {
    const h = `batteries[${d}]`;
    return I(c) || b(`${h} must be a mapping with name and low.`), C(c, ["name", "low", "level", "type"], h), {
      name: lt(c.name, `${h}.name`) ?? b(`${h}.name is missing.`),
      low: w(c.low, `${h}.low`, { domain: "binary_sensor" }) ?? b(`${h}.low is missing.`),
      level: w(c.level, `${h}.level`, { domain: "sensor" }),
      type: w(c.type, `${h}.type`, { domain: "sensor" })
    };
  }), p = tt(n.filters, "filters").map((c, d) => {
    const h = `filters[${d}]`;
    return I(c) || b(`${h} must be a mapping with name, hours and threshold.`), C(c, ["name", "hours", "threshold"], h), {
      name: lt(c.name, `${h}.name`) ?? b(`${h}.name is missing.`),
      hours: w(c.hours, `${h}.hours`, { domain: "input_number" }) ?? b(`${h}.hours is missing.`),
      threshold: w(c.threshold, `${h}.threshold`, { domain: "select" }) ?? b(`${h}.threshold is missing.`)
    };
  });
  return {
    language: qe(n.language),
    houseMode: w(n.house_mode_entity, "house_mode_entity", { domain: "input_select" }),
    summer: Ve(r.summer, "house_modes.summer") ?? "Léto",
    failedActions: w(n.failed_actions, "failed_actions", { domain: "sensor" }),
    clearFailed: w(n.clear_failed_script, "clear_failed_script", { domain: "script" }),
    snoozed: w(n.snoozed, "snoozed", { domain: "sensor" }),
    snoozeScript: w(n.snooze_script, "snooze_script", { domain: "script" }),
    batteries: l,
    filters: p,
    laundry: Q(n.laundry, "laundry", ["input_boolean"]),
    running: Q(n.running, "running", ["input_boolean", "binary_sensor", "switch", "vacuum"]),
    covers: {
      script: w(t.script, "covers.script", { domain: "script" }) ?? "script.zaluzie_posun",
      entities: tt(t.entities, "covers.entities").map(
        (c, d) => w(c, `covers.entities[${d}]`, { domain: "cover" }) ?? b(`covers.entities[${d}] is missing.`)
      ),
      presets: a.length ? a : Qe,
      tolerance: V(t.tolerance, "covers.tolerance", 5, 0, 20)
    },
    ventilation: {
      mode: w(e.mode, "ventilation.mode", { domain: "input_boolean" }),
      fans: Q(e.fans, "ventilation.fans", ["switch", "fan"])
    },
    heating: {
      resume: w(i.resume, "heating.resume", { domain: "button" }),
      rooms: Q(i.rooms, "heating.rooms", ["climate"])
    },
    cooling: { rooms: Q(s.rooms, "cooling.rooms", ["climate"]) },
    guard: {
      holdMs: V(o.hold_ms, "guard.hold_ms", 550, 200, 3e3),
      doubleTapMs: V(o.double_tap_ms, "guard.double_tap_ms", 400, 150, 1500),
      hintSeconds: V(o.hint_seconds, "guard.hint_seconds", 3, 1, 10)
    }
  };
}
function ei(n) {
  return He("Dům Dashboard", () => ti(n));
}
function ae(n) {
  return (n?.locale?.language || n?.language || "").trim();
}
function Mt(n) {
  const t = n.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function ii(n, t) {
  return n === "auto" ? Mt(ae(t)) : n;
}
function ni() {
  return Mt(document.documentElement.lang || navigator.language || "");
}
const Qt = /* @__PURE__ */ new WeakMap(), si = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, oi = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), ri = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function $t(n, t) {
  const e = n?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function ai(n, t, e) {
  const i = ae(e).replace("_", "-"), s = i !== "" && Mt(i) === t ? i : si[t], o = $t(e, "number_format"), r = $t(e, "time_format"), a = $t(e, "date_format"), l = [t, s, o, r, a].join("|");
  let p = Qt.get(n);
  p || (p = /* @__PURE__ */ new Map(), Qt.set(n, p));
  let c = p.get(l);
  return c || (c = hi(n[t], t, s, o, r, a), p.set(l, c)), c;
}
function li(n) {
  try {
    return new Intl.NumberFormat(n), n;
  } catch {
    return "en";
  }
}
function di(n, t) {
  if (n === "12")
    return !0;
  if (n === "24")
    return !1;
  const e = n === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function hi(n, t, e, i, s, o) {
  const r = li(e), a = i === "system" ? void 0 : i === "none" ? "en-US" : ri[i] ?? r, l = i === "none" ? { useGrouping: !1 } : {}, p = new Intl.NumberFormat(a, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), c = new Intl.NumberFormat(a, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), d = new Intl.NumberFormat(a, { maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(a, { maximumFractionDigits: 0, ...l }), g = di(s, r), $ = g ? "h12" : "h23", Z = new Intl.DateTimeFormat(r, { hour: g ? "numeric" : "2-digit", minute: "2-digit", hourCycle: $ }), rt = new Intl.DateTimeFormat(r, g ? { hour: "numeric", hourCycle: $ } : { hour: "2-digit", minute: "2-digit", hourCycle: $ }), de = o === "system" ? void 0 : r, Dt = new Intl.DateTimeFormat(de, { day: "numeric", month: "numeric" }), he = (y) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return Dt.format(y);
    const G = Dt.formatToParts(y), Ot = G.find((X) => X.type === "literal")?.value ?? "/", jt = G[G.length - 1], Lt = jt?.type === "literal" ? jt.value : "", Ut = G.find((X) => X.type === "day")?.value ?? "", Rt = G.find((X) => X.type === "month")?.value ?? "";
    return o === "DMY" ? `${Ut}${Ot}${Rt}${Lt}` : `${Rt}${Ot}${Ut}${Lt}`;
  }, ce = oi.has(r.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: r,
    t: n,
    one: (y) => p.format(y),
    two: (y) => c.format(y),
    half: (y) => d.format(Math.round(y * 2) / 2),
    tick: (y) => d.format(y),
    whole: (y) => h.format(y),
    percent: (y) => `${y}${ce}%`,
    time: (y) => Z.format(y),
    hour: (y) => rt.format(y),
    day: he
  };
}
const ci = {
  cardDescription: "Řídicí centrum domu: co tě potřebuje a ovládání na jednom místě.",
  title: "Dům",
  needsYou: "Potřebuje tebe",
  nothingWaits: "Nic na tebe nečeká",
  retry: "Zkusit znovu",
  snooze: "Odložit",
  snoozeFor: { day: "O den", weekend: "Na víkend", week: "O týden", month: "O měsíc" },
  done: "Hotovo",
  battery: (n) => n ? `Baterie ${n}` : "Slabá baterie",
  filter: (n, t) => `Vyčistit filtr · ${n} z ${t}`,
  laundry: (n) => n ? `Prádlo čeká · od ${n}` : "Prádlo čeká",
  running: "Teď běží",
  nothingRuns: "Nic neběží",
  minutes: (n) => `${n} min`,
  hours: (n, t) => t ? `${n} h ${t} min` : `${n} h`,
  covers: "Žaluzie",
  ventilation: "Větrání",
  ventilationMode: "Větrací režim",
  heating: "Topení",
  cooling: "Klimatizace",
  off: "Vypnuto",
  on: "Zapnuto",
  runs: (n) => `Běží ${n}`,
  unavailable: "Nedostupné",
  schedule: "Plán",
  manual: "Ručně",
  manualCount: (n) => `${n} ručně`,
  resume: "Zpět na plán",
  allOff: "Vypnout vše",
  hint: "Podrž nebo klepni dvakrát",
  mode: { cool: "Chlazení", wind_free: "WindFree", heat: "Topení", fan_only: "Větrání", dry: "Sušení", auto: "Auto" },
  failed: "Nepodařilo se"
}, ui = {
  cardDescription: "The control centre of the house: what needs you and the controls in one place.",
  title: "House",
  needsYou: "Needs you",
  nothingWaits: "Nothing is waiting for you",
  retry: "Try again",
  snooze: "Later",
  snoozeFor: { day: "A day", weekend: "To the weekend", week: "A week", month: "A month" },
  done: "Done",
  battery: (n) => n ? `Battery ${n}` : "Low battery",
  filter: (n, t) => `Clean the filter · ${n} of ${t}`,
  laundry: (n) => n ? `Laundry waiting · since ${n}` : "Laundry waiting",
  running: "Running now",
  nothingRuns: "Nothing is running",
  minutes: (n) => `${n} min`,
  hours: (n, t) => t ? `${n} h ${t} min` : `${n} h`,
  covers: "Blinds",
  ventilation: "Ventilation",
  ventilationMode: "Airing mode",
  heating: "Heating",
  cooling: "Air conditioning",
  off: "Off",
  on: "On",
  runs: (n) => `Running ${n}`,
  unavailable: "Unavailable",
  schedule: "Schedule",
  manual: "Manual",
  manualCount: (n) => `${n} manual`,
  resume: "Back to schedule",
  allOff: "Turn all off",
  hint: "Hold or tap twice",
  mode: { cool: "Cooling", wind_free: "WindFree", heat: "Heating", fan_only: "Fan", dry: "Drying", auto: "Auto" },
  failed: "It did not work"
}, pi = {
  cardDescription: "Husets kontrollcenter: vad som behöver dig och styrningen på ett ställe.",
  title: "Hus",
  needsYou: "Behöver dig",
  nothingWaits: "Inget väntar på dig",
  retry: "Försök igen",
  snooze: "Senare",
  snoozeFor: { day: "En dag", weekend: "Till helgen", week: "En vecka", month: "En månad" },
  done: "Klart",
  battery: (n) => n ? `Batteri ${n}` : "Svagt batteri",
  filter: (n, t) => `Rengör filtret · ${n} av ${t}`,
  laundry: (n) => n ? `Tvätt väntar · sedan ${n}` : "Tvätt väntar",
  running: "Körs nu",
  nothingRuns: "Inget körs",
  minutes: (n) => `${n} min`,
  hours: (n, t) => t ? `${n} h ${t} min` : `${n} h`,
  covers: "Persienner",
  ventilation: "Ventilation",
  ventilationMode: "Vädringsläge",
  heating: "Värme",
  cooling: "Luftkonditionering",
  off: "Av",
  on: "På",
  runs: (n) => `Går ${n}`,
  unavailable: "Otillgänglig",
  schedule: "Schema",
  manual: "Manuellt",
  manualCount: (n) => `${n} manuellt`,
  resume: "Tillbaka till schemat",
  allOff: "Stäng av alla",
  hint: "Håll eller tryck två gånger",
  mode: { cool: "Kyla", wind_free: "WindFree", heat: "Värme", fan_only: "Fläkt", dry: "Torkning", auto: "Auto" },
  failed: "Det gick inte"
}, fi = { cs: ci, en: ui, sv: pi };
function le(n, t) {
  return ai(fi, n, t);
}
const mi = L`
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
`;
var gi = Object.defineProperty, F = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && gi(t, e, s), s;
};
const bi = f`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="8" width="16" height="8" rx="2"></rect><path d="M21 11v2" stroke-linecap="round"></path><rect x="5" y="10" width="3" height="4" fill="currentColor" stroke="none"></rect></svg>`, $i = f`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 8v8M12 8v8M16 8v8"></path></svg>`, yi = f`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2.5"></rect><circle cx="12" cy="13" r="4.5"></circle><path d="M7.5 6.5h2" stroke-linecap="round"></path></svg>`, Pt = class Pt extends z {
  constructor() {
    super(...arguments), this._error = "", this._now = Date.now(), this._fit = "", this.starts = new Je(() => this.requestUpdate()), this.gesture = new ft(() => ({
      holdMs: this._config?.guard.holdMs ?? 550,
      doubleTapMs: this._config?.guard.doubleTapMs ?? 400
    })), this.closeMenu = (t) => {
      this._menu && (t instanceof KeyboardEvent ? t.key === "Escape" : !t.composedPath().some((e) => e instanceof Element && e.classList.contains("snooze"))) && (this._menu = void 0);
    };
  }
  setConfig(t) {
    this._config = ei(t);
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this.timer = window.setInterval(() => this._now = Date.now(), 3e4), window.addEventListener("pointerdown", this.closeMenu), window.addEventListener("keydown", this.closeMenu), this.resize = new ResizeObserver(() => this._fit = `${Math.round(this.getBoundingClientRect().width)}|${this._fit.split("|")[1] ?? ""}`), this.resize.observe(this), document.fonts?.ready.then(() => this._fit = `${this._fit.split("|")[0] ?? ""}|${document.fonts.size}`);
  }
  updated() {
    Ke(this.renderRoot, this._fit);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer), window.clearTimeout(this.hintTimer), window.removeEventListener("pointerdown", this.closeMenu), window.removeEventListener("keydown", this.closeMenu), this.resize?.disconnect(), this.gesture.dispose();
  }
  willUpdate(t) {
    t.has("hass") && (this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1), this._now = Date.now());
  }
  get i18n() {
    return le(ii(this._config?.language ?? "auto", this.hass), this.hass);
  }
  name(t) {
    return We(t, this.i18n.language) ?? "";
  }
  render() {
    const t = this._config;
    if (!t) return m;
    const e = this.i18n, s = t.houseMode !== void 0 && E(this.hass, t.houseMode) === t.summer ? [this.renderCooling(t, e), this.renderHeating(t, e)] : [this.renderHeating(t, e), this.renderCooling(t, e)];
    return f`<ha-card>
      ${this.renderQueue(t, e)} ${this.renderRunning(t, e)} ${this.renderCovers(t, e)}
      ${this.renderVentilation(t, e)} ${s}
      ${this._error ? f`<div class="error" role="alert">${this._error}</div>` : m}
    </ha-card>`;
  }
  /* ---------- Potřebuje tebe ---------- */
  failed(t) {
    const e = T(this.hass, t.failedActions)?.attributes.polozky;
    return Array.isArray(e) ? e.filter((i) => typeof i == "object" && i !== null && typeof i.entita == "string") : [];
  }
  renderQueue(t, e) {
    if (!t.failedActions && !t.batteries.length && !t.filters.length && !t.laundry.length) return m;
    const i = e.t, s = this.failed(t), o = this.snoozed(t), r = t.batteries.filter((d) => E(this.hass, d.low) === "on" && !o.has(`battery:${d.low}`)), a = this.dirtyFilters(t).filter(({ filter: d }) => !o.has(`filter:${d.hours}`)), l = t.laundry.filter((d) => E(this.hass, d.entity) === "on" && !o.has(`laundry:${d.entity}`)), p = s.length + r.length + a.length + l.length, c = [
      ...s.map((d, h) => {
        const g = T(this.hass, d.entita)?.attributes.friendly_name, $ = d.cas ? Date.parse(d.cas) : NaN, Z = dt([d.duvod || d.akce, Number.isFinite($) ? e.time($) : void 0].filter(Boolean)), rt = this.retryOf(t, d);
        return f`<div class="row" data-row="failed">
          <span class="mark warn" aria-hidden="true">!</span>
          <span class="main">${typeof g == "string" ? g : d.entita}<small>${Z}</small></span>
          ${rt ? f`<button class="button ${h === 0 ? "primary" : ""}" type="button" @click=${rt}>${i.retry}</button>` : t.clearFailed ? f`<button class="button" type="button" @click=${() => this.call("script", t.clearFailed.split(".")[1], { entita: d.entita })}>${i.done}</button>` : m}
        </div>`;
      }),
      ...r.map((d) => {
        const h = bt(this.hass, d.level), g = E(this.hass, d.type), $ = dt([i.battery(h === void 0 ? void 0 : e.percent(Math.round(h))), g].filter(Boolean));
        return f`<div class="row" data-row="battery">
          <span class="mark">${bi}</span>
          <span class="main">${this.name(d.name)}<small>${$}</small></span>
          ${this.snoozeButton(t, `battery:${d.low}`, e)}
        </div>`;
      }),
      ...a.map(({ filter: d, hours: h, threshold: g }) => {
        const $ = (Z) => `${e.whole(Math.floor(Z))} h`;
        return f`<div class="row two" data-row="filter">
          <span class="mark">${$i}</span>
          <span class="main">${this.name(d.name)}<small>${Jt(i.filter($(h), $(g)))}</small></span>
          <span class="actions">
            ${this.snoozeButton(t, `filter:${d.hours}`, e)}
            <button class="button" type="button" @click=${() => this.call("input_number", "set_value", { entity_id: d.hours, value: 0 })}>${i.done}</button>
          </span>
        </div>`;
      }),
      ...l.map((d) => {
        const h = this.starts.of(this.hass, d.entity), g = h !== void 0 && new Date(h).toDateString() === new Date(this._now).toDateString(), $ = h === void 0 ? "" : g ? e.time(h) : e.day(h);
        return f`<div class="row two" data-row="laundry">
          <span class="mark">${yi}</span>
          <span class="main">${this.name(d.name)}<small>${Jt(i.laundry($))}</small></span>
          <span class="actions">
            ${this.snoozeButton(t, `laundry:${d.entity}`, e)}
            <button class="button" type="button" @click=${() => this.call("input_boolean", "turn_off", { entity_id: d.entity })}>${i.done}</button>
          </span>
        </div>`;
      })
    ];
    return f`<h2><span>${p ? `${i.needsYou} · ${p}` : i.needsYou}</span></h2>
      <div class="group" data-part="queue">
        ${c.length ? c : f`<div class="row"><span class="main">${i.nothingWaits}</span></div>`}
      </div>`;
  }
  /** Air conditioners that ran at least their threshold since the filter was cleaned; a missing value is no task. */
  dirtyFilters(t) {
    return t.filters.flatMap((e) => {
      const i = bt(this.hass, e.hours), s = bt(this.hass, e.threshold);
      return i !== void 0 && s !== void 0 && s > 0 && i >= s ? [{ filter: e, hours: i, threshold: s }] : [];
    });
  }
  /* ---------- Odložit ---------- */
  day(t) {
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }
  /** The keys of the items postponed to a later day than today. */
  snoozed(t) {
    const e = T(this.hass, t.snoozed)?.attributes.polozky, i = this.day(new Date(this._now)), s = /* @__PURE__ */ new Set();
    if (Array.isArray(e))
      for (const o of e)
        typeof o?.klic == "string" && typeof o.do == "string" && o.do > i && s.add(o.klic);
    return s;
  }
  /** "Odložit" with its menu (a day, to the weekend, a week, a month; without a time, it is no alarm). The menu only covers what is under it. */
  snoozeButton(t, e, i) {
    if (!t.snoozed || !t.snoozeScript) return m;
    const s = i.t, o = new Date(this._now), r = (h) => new Date(o.getFullYear(), o.getMonth(), o.getDate() + h), a = (6 - o.getDay() + 7) % 7 || 7, l = new Date(o.getFullYear(), o.getMonth() + 1, o.getDate()), p = [[s.snoozeFor.day, r(1)], [s.snoozeFor.weekend, r(a)], [s.snoozeFor.week, r(7)], [s.snoozeFor.month, l]], c = this._menu === e, d = (h) => {
      this._menu = void 0, this.call("script", t.snoozeScript.split(".")[1], { klic: e, do: this.day(h) });
    };
    return f`<span class="snooze">
      <button class="button" type="button" aria-haspopup="menu" aria-expanded=${c ? "true" : "false"} @click=${() => this._menu = c ? void 0 : e}>${s.snooze}</button>
      ${c ? f`<div class="menu" role="menu">
            ${p.map(([h, g]) => f`<button type="button" role="menuitem" @click=${() => d(g)}><span>${h}</span><span class="until">${i.day(g.getTime())}</span></button>`)}
          </div>` : m}
    </span>`;
  }
  /** A failed command of a blind can be sent again when the sensor kept its target. */
  retryOf(t, e) {
    const i = e.cil;
    if (!e.entita.startsWith("cover.") || !i || i.pos === void 0 || i.tilt === void 0) return;
    const s = Number(i.pos), o = Number(i.tilt);
    if (!(!Number.isFinite(s) || !Number.isFinite(o)))
      return () => this.call("script", t.covers.script.split(".")[1], { entity: e.entita, pos: s, tilt: o });
  }
  /* ---------- Teď běží ---------- */
  duration(t, e) {
    const i = this.starts.of(this.hass, t);
    if (i === void 0) return "";
    const s = Math.max(0, Math.floor((this._now - i) / 6e4));
    return s < 60 ? e.t.minutes(s) : e.t.hours(Math.floor(s / 60), s % 60);
  }
  renderRunning(t, e) {
    if (!t.running.length) return m;
    const i = t.running.filter((o) => ["on", "cleaning", "returning"].includes(E(this.hass, o.entity) ?? "")), s = i.map((o) => `${this.name(o.name)} ${this.duration(o.entity, e)}`.trim());
    return f`<h2><span>${e.t.running}</span></h2>
      <div class="group" data-part="running"><div class="row now ${i.length ? "" : "none"}"><span class="main" style="font-size:inherit;line-height:inherit">${s.length ? dt(s) : e.t.nothingRuns}</span></div></div>`;
  }
  /* ---------- Žaluzie ---------- */
  /** How many blinds are in the preset, and how many report their position at all. */
  inPreset(t, e) {
    let i = 0, s = 0;
    for (const o of t.covers.entities) {
      const r = T(this.hass, o);
      if (!r || yt(r.state)) continue;
      const a = Number(r.attributes.current_position), l = Number(r.attributes.current_tilt_position);
      !Number.isFinite(a) || !Number.isFinite(l) || (s += 1, Math.abs(a - e.position) <= t.covers.tolerance && Math.abs(l - e.tilt) <= t.covers.tolerance && (i += 1));
    }
    return { count: i, known: s };
  }
  renderCovers(t, e) {
    if (!t.covers.entities.length) return m;
    const i = t.covers.presets.length - 1;
    return f`<h2><span>${e.t.covers}</span></h2>
      <div class="tiles" data-part="covers">
        ${t.covers.presets.map((s, o) => {
      const { count: r, known: a } = this.inPreset(t, s), l = a === t.covers.entities.length && r === a, p = l ? "on" : r > 0 ? "mixed" : "idle";
      return f`<dd-tile
            kind="action"
            centered
            guarded
            .name=${this.name(s.name)}
            .state=${p}
            .count=${r > 0 && !l ? r : void 0}
            .hint=${e.t.hint}
            .hintAlign=${o === 0 ? "start" : o === i ? "end" : "center"}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            @hdk-press=${() => this.setCovers(t, s)}
          ></dd-tile>`;
    })}
      </div>`;
  }
  setCovers(t, e) {
    const i = t.covers.script.split(".")[1];
    for (const s of t.covers.entities)
      this.call("script", i, { entity: s, pos: e.position, tilt: e.tilt });
  }
  /* ---------- Větrání ---------- */
  align(t) {
    return t % 3 === 0 ? "start" : t % 3 === 2 ? "end" : "center";
  }
  renderVentilation(t, e) {
    const i = e.t, s = [...t.ventilation.mode ? [{ name: i.ventilationMode, entity: t.ventilation.mode }] : [], ...t.ventilation.fans];
    return s.length ? f`<h2><span>${i.ventilation}</span></h2>
      <div class="tiles" data-part="ventilation">
        ${s.map((o, r) => {
      const a = T(this.hass, o.entity), l = !a || yt(a.state), p = a?.state === "on";
      return f`<dd-tile
            kind="toggle"
            guarded
            data-entity=${o.entity}
            .name=${this.name(o.name)}
            .text=${l ? i.unavailable : p ? i.runs(this.duration(o.entity, e)).trim() : i.off}
            .state=${p ? "on" : "off"}
            .disabled=${l}
            .hint=${i.hint}
            .hintAlign=${this.align(r)}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            @hdk-toggle=${(c) => this.call("homeassistant", c.detail.checked ? "turn_on" : "turn_off", { entity_id: o.entity })}
          ></dd-tile>`;
    })}
      </div>` : m;
  }
  /* ---------- Topení a Klimatizace ---------- */
  target(t, e, i) {
    const s = Number(T(this.hass, t)?.attributes.temperature);
    return Number.isFinite(s) ? `${i ? e.half(s) : e.whole(s)}°` : "";
  }
  renderHeating(t, e) {
    if (!t.heating.rooms.length) return m;
    const i = e.t, s = t.heating.rooms.filter((o) => E(this.hass, o.entity) === "heat").length;
    return f`<h2>
        <span>${i.heating}</span>
        ${s && t.heating.resume ? this.link(
      "resume",
      f`<span class="count">${i.manualCount(s)} · </span>${i.resume}`,
      () => this.call("button", "press", { entity_id: t.heating.resume })
    ) : m}
      </h2>
      <div class="tiles" data-part="heating">
        ${t.heating.rooms.map((o) => {
      const r = E(this.hass, o.entity), a = r === void 0 ? i.unavailable : r === "off" ? i.off : [r === "auto" ? i.schedule : i.manual, this.target(o.entity, e, !0)].filter(Boolean).join(" · "), l = r === void 0 || r === "off" ? "off" : r === "auto" ? "idle" : "on";
      return this.openTile(o, a, l, r === void 0);
    })}
      </div>`;
  }
  renderCooling(t, e) {
    if (!t.cooling.rooms.length) return m;
    const i = e.t, s = t.cooling.rooms.filter((o) => !["off", void 0].includes(E(this.hass, o.entity)));
    return f`<h2>
        <span>${i.cooling}</span>
        ${s.length ? this.link("alloff", i.allOff, () => this.call("climate", "turn_off", { entity_id: s.map((o) => o.entity) })) : m}
      </h2>
      <div class="tiles" data-part="cooling">
        ${t.cooling.rooms.map((o) => {
      const r = E(this.hass, o.entity), a = String(T(this.hass, o.entity)?.attributes.preset_mode ?? ""), l = r === "cool" && a === "wind_free" ? "wind_free" : r === "heat_cool" ? "auto" : r ?? "", p = r === void 0 ? i.unavailable : r === "off" ? i.off : [i.mode[l] ?? i.on, r === "fan_only" ? "" : this.target(o.entity, e, !1)].filter(Boolean).join(" · ");
      return this.openTile(o, p, r === void 0 || r === "off" ? "off" : "on", r === void 0);
    })}
      </div>`;
  }
  /** A tile that opens the detail of its device: one tap, it changes nothing by itself. */
  openTile(t, e, i, s) {
    return f`<dd-tile
      kind="open"
      data-entity=${t.entity}
      .name=${this.name(t.name)}
      .text=${e}
      .state=${i}
      .disabled=${s}
      @hdk-open=${() => this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: t.entity }, bubbles: !0, composed: !0 }))}
    ></dd-tile>`;
  }
  /* ---------- Chráněný odkaz v nadpisu oddílu ---------- */
  link(t, e, i) {
    const s = (a) => {
      if (a.detail === 0) {
        this.gesture.cancel(), i();
        return;
      }
      const l = this.gesture.tap(t, a.timeStamp);
      l === "double" ? (this._hint = void 0, i()) : l === "single" && (this._hint = t, window.clearTimeout(this.hintTimer), this.hintTimer = window.setTimeout(() => this._hint = void 0, (this._config?.guard.hintSeconds ?? 3) * 1e3));
    }, o = (a) => {
      a.button > 0 || this.gesture.start(() => {
        this._hint = void 0, i();
      });
    }, r = () => this.gesture.release();
    return f`<button class="link" type="button" data-link=${t} @click=${s} @pointerdown=${o} @pointerup=${r} @pointerleave=${r} @pointercancel=${r} @contextmenu=${(a) => a.preventDefault()}>
      ${e}${this._hint === t ? f`<div class="hint above end" aria-hidden="true"><i></i><span style="position: relative">${this.i18n.t.hint}</span></div>` : m}
    </button>`;
  }
  /* ---------- Volání Home Assistantu ---------- */
  call(t, e, i) {
    this._error = "", this.hass?.callService(t, e, i).catch((s) => {
      this._error = `${this.i18n.t.failed}: ${s instanceof Error ? s.message : String(s)}`;
    });
  }
};
Pt.styles = [mt, Ze, mi];
let N = Pt;
F([
  u({ attribute: !1 })
], N.prototype, "hass");
F([
  D()
], N.prototype, "_config");
F([
  D()
], N.prototype, "_error");
F([
  D()
], N.prototype, "_hint");
F([
  D()
], N.prototype, "_now");
F([
  D()
], N.prototype, "_menu");
F([
  D()
], N.prototype, "_fit");
Be("dd");
customElements.get("ha-dum-dashboard") || customElements.define("ha-dum-dashboard", N);
window.customCards = window.customCards ?? [];
window.customCards.some((n) => n.type === "ha-dum-dashboard") || window.customCards.push({
  type: "ha-dum-dashboard",
  name: "Dům Dashboard",
  description: le(ni()).t.cardDescription,
  preview: !1
});
console.info("%c DUM-DASHBOARD %c 0.4.0 · 2026-11-13 08:21 UTC · po 5ffec3f ", "color:#fff;background:#0A6ED1;font-weight:700", "color:inherit");
