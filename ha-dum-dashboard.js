const Tt = globalThis, Ht = Tt.ShadowRoot && (Tt.ShadyCSS === void 0 || Tt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Wt = /* @__PURE__ */ Symbol(), ce = /* @__PURE__ */ new WeakMap();
let Te = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ht && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = ce.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ce.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ee = (i) => new Te(typeof i == "string" ? i : i + "", void 0, Wt), Y = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, s, o) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[o + 1], i[0]);
  return new Te(e, i, Wt);
}, We = (i, t) => {
  if (Ht) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), s = Tt.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = e.cssText, i.appendChild(n);
  }
}, ue = Ht ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return Ee(e);
})(i) : i;
const { is: Ve, defineProperty: Ye, getOwnPropertyDescriptor: Ke, getOwnPropertyNames: qe, getOwnPropertySymbols: Ge, getPrototypeOf: Ze } = Object, Lt = globalThis, pe = Lt.trustedTypes, Xe = pe ? pe.emptyScript : "", Je = Lt.reactiveElementPolyfillSupport, wt = (i, t) => i, Nt = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Xe : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, Vt = (i, t) => !Ve(i, t), me = { attribute: !0, type: String, converter: Nt, reflect: !1, useDefault: !1, hasChanged: Vt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Lt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ut = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = me) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, n, e);
      s !== void 0 && Ye(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: s, set: o } = Ke(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: s, set(a) {
      const r = s?.call(this);
      o?.call(this, a), this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? me;
  }
  static _$Ei() {
    if (this.hasOwnProperty(wt("elementProperties"))) return;
    const t = Ze(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(wt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(wt("properties"))) {
      const e = this.properties, n = [...qe(e), ...Ge(e)];
      for (const s of n) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [n, s] of e) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const s = this._$Eu(e, n);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n) e.unshift(ue(s));
    } else t !== void 0 && e.push(ue(t));
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
    return We(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : Nt).toAttribute(e, n.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = n.getPropertyOptions(s), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Nt;
      this._$Em = s;
      const r = a.fromAttribute(e, o.type);
      this[s] = r ?? this._$Ej?.get(s) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, s = !1, o) {
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? Vt)(o, e) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: n, reflect: s, wrapped: o }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [s, o] of n) {
        const { wrapped: a } = o, r = this[s];
        a !== !0 || this._$AL.has(s) || r === void 0 || this.C(s, void 0, o, r);
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
ut.elementStyles = [], ut.shadowRootOptions = { mode: "open" }, ut[wt("elementProperties")] = /* @__PURE__ */ new Map(), ut[wt("finalized")] = /* @__PURE__ */ new Map(), Je?.({ ReactiveElement: ut }), (Lt.reactiveElementVersions ??= []).push("2.1.2");
const Yt = globalThis, fe = (i) => i, zt = Yt.trustedTypes, ge = zt ? zt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ne = "$lit$", nt = `lit$${Math.random().toFixed(9).slice(2)}$`, ze = "?" + nt, Qe = `<${ze}>`, lt = document, kt = () => lt.createComment(""), _t = (i) => i === null || typeof i != "object" && typeof i != "function", Kt = Array.isArray, tn = (i) => Kt(i) || typeof i?.[Symbol.iterator] == "function", Ut = `[ 	
\f\r]`, xt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, be = /-->/g, ve = />/g, it = RegExp(`>|${Ut}(?:([^\\s"'>=/]+)(${Ut}*=${Ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), $e = /'/g, ye = /"/g, Oe = /^(?:script|style|textarea|title)$/i, en = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), c = en(1), ft = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), xe = /* @__PURE__ */ new WeakMap(), at = lt.createTreeWalker(lt, 129);
function Pe(i, t) {
  if (!Kt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ge !== void 0 ? ge.createHTML(t) : t;
}
const nn = (i, t) => {
  const e = i.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = xt;
  for (let r = 0; r < e; r++) {
    const d = i[r];
    let h, u, l = -1, m = 0;
    for (; m < d.length && (a.lastIndex = m, u = a.exec(d), u !== null); ) m = a.lastIndex, a === xt ? u[1] === "!--" ? a = be : u[1] !== void 0 ? a = ve : u[2] !== void 0 ? (Oe.test(u[2]) && (s = RegExp("</" + u[2], "g")), a = it) : u[3] !== void 0 && (a = it) : a === it ? u[0] === ">" ? (a = s ?? xt, l = -1) : u[1] === void 0 ? l = -2 : (l = a.lastIndex - u[2].length, h = u[1], a = u[3] === void 0 ? it : u[3] === '"' ? ye : $e) : a === ye || a === $e ? a = it : a === be || a === ve ? a = xt : (a = it, s = void 0);
    const p = a === it && i[r + 1].startsWith("/>") ? " " : "";
    o += a === xt ? d + Qe : l >= 0 ? (n.push(h), d.slice(0, l) + Ne + d.slice(l) + nt + p) : d + nt + (l === -2 ? r : p);
  }
  return [Pe(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class St {
  constructor({ strings: t, _$litType$: e }, n) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const r = t.length - 1, d = this.parts, [h, u] = nn(t, e);
    if (this.el = St.createElement(h, n), at.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = at.nextNode()) !== null && d.length < r; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const l of s.getAttributeNames()) if (l.endsWith(Ne)) {
          const m = u[a++], p = s.getAttribute(l).split(nt), $ = /([.?@])?(.*)/.exec(m);
          d.push({ type: 1, index: o, name: $[2], strings: p, ctor: $[1] === "." ? on : $[1] === "?" ? an : $[1] === "@" ? rn : Ft }), s.removeAttribute(l);
        } else l.startsWith(nt) && (d.push({ type: 6, index: o }), s.removeAttribute(l));
        if (Oe.test(s.tagName)) {
          const l = s.textContent.split(nt), m = l.length - 1;
          if (m > 0) {
            s.textContent = zt ? zt.emptyScript : "";
            for (let p = 0; p < m; p++) s.append(l[p], kt()), at.nextNode(), d.push({ type: 2, index: ++o });
            s.append(l[m], kt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ze) d.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = s.data.indexOf(nt, l + 1)) !== -1; ) d.push({ type: 7, index: o }), l += nt.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const n = lt.createElement("template");
    return n.innerHTML = t, n;
  }
}
function gt(i, t, e = i, n) {
  if (t === ft) return t;
  let s = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const o = _t(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(i), s._$AT(i, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = s : e._$Cl = s), s !== void 0 && (t = gt(i, s._$AS(i, t.values), s, n)), t;
}
class sn {
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
    const { el: { content: e }, parts: n } = this._$AD, s = (t?.creationScope ?? lt).importNode(e, !0);
    at.currentNode = s;
    let o = at.nextNode(), a = 0, r = 0, d = n[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let h;
        d.type === 2 ? h = new At(o, o.nextSibling, this, t) : d.type === 1 ? h = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (h = new ln(o, this, t)), this._$AV.push(h), d = n[++r];
      }
      a !== d?.index && (o = at.nextNode(), a++);
    }
    return at.currentNode = lt, s;
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
  constructor(t, e, n, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = gt(this, t, e), _t(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== ft && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : tn(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && _t(this._$AH) ? this._$AA.nextSibling.data = t : this.T(lt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = St.createElement(Pe(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new sn(s, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = xe.get(t.strings);
    return e === void 0 && xe.set(t.strings, e = new St(t)), e;
  }
  k(t) {
    Kt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, s = 0;
    for (const o of t) s === e.length ? e.push(n = new At(this.O(kt()), this.O(kt()), this, this.options)) : n = e[s], n._$AI(o), s++;
    s < e.length && (this._$AR(n && n._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = fe(t).nextSibling;
      fe(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ft {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, s, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = f;
  }
  _$AI(t, e = this, n, s) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = gt(this, t, e, 0), a = !_t(t) || t !== this._$AH && t !== ft, a && (this._$AH = t);
    else {
      const r = t;
      let d, h;
      for (t = o[0], d = 0; d < o.length - 1; d++) h = gt(this, r[n + d], e, d), h === ft && (h = this._$AH[d]), a ||= !_t(h) || h !== this._$AH[d], h === f ? t = f : t !== f && (t += (h ?? "") + o[d + 1]), this._$AH[d] = h;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class on extends Ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class an extends Ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class rn extends Ft {
  constructor(t, e, n, s, o) {
    super(t, e, n, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = gt(this, t, e, 0) ?? f) === ft) return;
    const n = this._$AH, s = t === f && n !== f || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== f && (n === f || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ln {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    gt(this, t);
  }
}
const dn = Yt.litHtmlPolyfillSupport;
dn?.(St, At), (Yt.litHtmlVersions ??= []).push("3.3.3");
const hn = (i, t, e) => {
  const n = e?.renderBefore ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    n._$litPart$ = s = new At(t.insertBefore(kt(), o), o, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
const qt = globalThis;
class W extends ut {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = hn(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ft;
  }
}
W._$litElement$ = !0, W.finalized = !0, qt.litElementHydrateSupport?.({ LitElement: W });
const cn = qt.litElementPolyfillSupport;
cn?.({ LitElement: W });
(qt.litElementVersions ??= []).push("4.2.2");
const De = /* @__PURE__ */ Symbol.for(""), un = (i) => {
  if (i?.r === De) return i?._$litStatic$;
}, Gt = (i) => ({ _$litStatic$: i, r: De }), we = /* @__PURE__ */ new Map(), pn = (i) => (t, ...e) => {
  const n = e.length;
  let s, o;
  const a = [], r = [];
  let d, h = 0, u = !1;
  for (; h < n; ) {
    for (d = t[h]; h < n && (o = e[h], (s = un(o)) !== void 0); ) d += s + t[++h], u = !0;
    h !== n && r.push(o), a.push(d), h++;
  }
  if (h === n && a.push(t[n]), u) {
    const l = a.join("$$lit$$");
    (t = we.get(l)) === void 0 && (a.raw = a, we.set(l, t = a)), e = r;
  }
  return i(t, ...e);
}, Zt = pn(c);
const mn = { attribute: !0, type: String, converter: Nt, reflect: !1, hasChanged: Vt }, fn = (i = mn, t, e) => {
  const { kind: n, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), n === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), n === "accessor") {
    const { name: a } = e;
    return { set(r) {
      const d = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, d, i, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, i, r), r;
    } };
  }
  if (n === "setter") {
    const { name: a } = e;
    return function(r) {
      const d = this[a];
      t.call(this, r), this.requestUpdate(a, d, i, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function v(i) {
  return (t, e) => typeof e == "object" ? fn(i, t, e) : ((n, s, o) => {
    const a = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), a ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(i, t, e);
}
function E(i) {
  return v({ ...i, state: !0, attribute: !1 });
}
function pt(i, t = {}) {
  return i.length < 2 ? c`${i[0] ?? f}` : c`<span class="joined ${t.whole ? "whole" : ""}">${i.map(
    (e, n) => c`${n ? c`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : f}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function mt(i, t = {}) {
  return pt(i.split(" · "), t);
}
function Ot(i, t) {
  i.querySelectorAll(".joined").forEach((e) => {
    const n = `${t}|${e.textContent}`;
    if (e.dataset.fit === n) return;
    e.classList.remove("stacked", "flow", "probe");
    const s = [...e.querySelectorAll(":scope > .joined-sep")];
    s.forEach((d) => d.classList.remove("break"));
    const o = [...e.querySelectorAll(":scope > .joined-part")], a = o.map((d) => d.getBoundingClientRect());
    if (!a.length || !a[0].width) {
      delete e.dataset.fit;
      return;
    }
    e.dataset.fit = n;
    const r = s.filter((d, h) => a[h + 1].top > a[h].top + 1);
    if (r.length) {
      if (!e.classList.contains("whole")) {
        e.classList.add("probe");
        const d = o.some((h) => h.scrollWidth > h.clientWidth + 0.5);
        if (e.classList.remove("probe"), d) {
          e.classList.add("flow");
          return;
        }
      }
      e.classList.add("stacked"), r.forEach((d) => d.classList.add("break"));
    }
  });
}
const Xt = Y`
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
`, gn = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif', Le = Y`
  :host {
    font-family: ${Ee(gn)};
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
`, Fe = 25, Pt = 5, je = 21, Jt = ["off", "cool", "wind_free", "heat", "fan_only", "dry", "auto", "sleep"], bn = ["plan", "manual", "boost", "off"];
function Qt(i) {
  return i === void 0 || i === "" || i === "unavailable" || i === "unknown";
}
function st(i) {
  return Array.isArray(i) ? i.filter((t) => typeof t == "string") : [];
}
function dt(i) {
  const t = typeof i == "string" ? Number.parseFloat(i) : i;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function rt(i, t) {
  const e = t?.state;
  if (!t || Qt(e)) return;
  if (i === "heating") {
    if (e === "auto") return "plan";
    if (e === "off") return "off";
    if (e === "heat") {
      const s = dt(t.attributes.temperature);
      return s !== void 0 && s <= Pt ? "off" : s === Fe ? "boost" : "manual";
    }
    return;
  }
  const n = String(t.attributes.preset_mode ?? "");
  return e === "off" ? "off" : e === "cool" && n === "wind_free" ? "wind_free" : n === "sleep" ? "sleep" : e === "heat_cool" ? "auto" : Jt.includes(e) ? e : void 0;
}
function Dt(i, t) {
  const e = rt(i, t);
  return e === void 0 ? void 0 : e !== "off";
}
function vn(i, t, e, n, s) {
  if (n.includes(s)) return n.length > 1 ? n.filter((a) => a !== s) : n;
  const o = Dt(i, t?.states[s]);
  return o === void 0 ? n : e.filter((a) => Dt(i, t?.states[a.entity]) === o).map((a) => a.entity);
}
function $n(i, t) {
  return t.flatMap((e) => {
    const n = dt(i?.states[e]?.attributes.temperature);
    return n === void 0 ? [] : [{ entity: e, value: n }];
  });
}
function yn(i, t, e) {
  const n = new Set(e.map((s) => rt(i, t?.states[s])).filter((s) => s !== void 0));
  return n.size === 1 ? [...n][0] : void 0;
}
function xn(i, t) {
  const e = i === "heating" ? 0.5 : 1, n = dt(t?.attributes.min_temp) ?? (i === "heating" ? 5 : 16), s = dt(t?.attributes.max_temp) ?? (i === "heating" ? 25 : 30);
  return { min: Math.ceil(n / e) * e, max: Math.floor(s / e) * e, step: e };
}
function wn(i) {
  const t = st(i?.attributes.hvac_modes), e = st(i?.attributes.preset_modes);
  return Jt.filter((n) => n === "wind_free" ? t.includes("cool") && e.includes("wind_free") : n === "sleep" ? e.includes("sleep") : n === "auto" ? t.includes("auto") || t.includes("heat_cool") : t.includes(n));
}
function kn(i, t, e) {
  const n = t.map((s) => st(i?.states[s]?.attributes[e])).filter((s) => s.length);
  return n.length ? n[0].filter((s) => n.every((o) => o.includes(s))) : [];
}
function _n(i, t, e) {
  const n = new Set(t.map((s) => i?.states[s]?.attributes[e]).filter((s) => typeof s == "string"));
  return n.size === 1 ? [...n][0] : void 0;
}
function Bt(i) {
  return !!i?.services?.tado_ce?.set_climate_timer;
}
function ke(i) {
  return `${String(Math.floor(i / 60)).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}:00`;
}
function Sn(i, t, e, n) {
  const s = e.mode ?? (e.temperature !== void 0 ? "manual" : rt("heating", t));
  if (s === void 0) return [];
  if (s === "plan") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "auto" } }];
  if (s === "off") {
    const h = e.manualFor ?? "forever";
    if (!n || h === "forever") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "off" } }];
    const u = { entity_id: i, temperature: Pt };
    return h === "next" ? u.overlay = "next_time_block" : u.time_period = ke(Number(h)), [{ domain: "tado_ce", service: "set_climate_timer", data: u }];
  }
  const o = dt(t?.attributes.temperature), a = s === "boost" ? Fe : e.temperature ?? (o !== void 0 && o > Pt ? o : je);
  if (!n)
    return s === "manual" ? [{ domain: "climate", service: "set_temperature", data: { entity_id: i, temperature: a, hvac_mode: "heat" } }] : [];
  const r = e.manualFor ?? (s === "boost" ? "30" : "next"), d = { entity_id: i, temperature: a };
  return r === "next" ? d.overlay = "next_time_block" : r === "forever" ? d.overlay = "manual" : d.time_period = ke(Number(r)), [{ domain: "tado_ce", service: "set_climate_timer", data: d }];
}
function An(i, t, e) {
  const n = [], s = { entity_id: i }, o = st(t?.attributes.hvac_modes), a = st(t?.attributes.preset_modes), r = String(t?.attributes.preset_mode ?? ""), d = e.mode;
  if (d !== void 0) {
    const h = (l) => n.push({ domain: "climate", service: "set_hvac_mode", data: { ...s, hvac_mode: l } }), u = (l) => n.push({ domain: "climate", service: "set_preset_mode", data: { ...s, preset_mode: l } });
    d === "wind_free" ? (h("cool"), u("wind_free")) : d === "sleep" ? ((t?.state === "off" || Qt(t?.state)) && h("cool"), u("sleep")) : (h(d === "auto" ? o.includes("auto") ? "auto" : "heat_cool" : d), d !== "off" && (r === "wind_free" || r === "sleep") && a.includes("none") && u("none"));
  }
  return e.temperature !== void 0 && d !== "off" && n.push({ domain: "climate", service: "set_temperature", data: { ...s, temperature: Math.round(e.temperature) } }), e.fan !== void 0 && st(t?.attributes.fan_modes).includes(e.fan) && n.push({ domain: "climate", service: "set_fan_mode", data: { ...s, fan_mode: e.fan } }), e.swing !== void 0 && st(t?.attributes.swing_modes).includes(e.swing) && n.push({ domain: "climate", service: "set_swing_mode", data: { ...s, swing_mode: e.swing } }), n;
}
function Mn(i, t) {
  const e = t.mode;
  return e === void 0 ? i?.state : e === "wind_free" || e === "sleep" && (i?.state === "off" || Qt(i?.state)) ? "cool" : e === "sleep" ? i?.state : e === "auto" ? st(i?.attributes.hvac_modes).includes("auto") ? "auto" : "heat_cool" : e;
}
function Cn(i, t, e) {
  const n = Math.round(t * 60), s = [{ delay: { hours: Math.floor(n / 3600), minutes: Math.floor(n % 3600 / 60), seconds: n % 60 } }];
  return e !== void 0 && s.push({ condition: "state", entity_id: i, state: e }), s.push({ action: "climate.set_hvac_mode", target: { entity_id: i }, data: { hvac_mode: "off" } }), { type: "execute_script", sequence: s };
}
var Tn = Object.defineProperty, K = (i, t, e, n) => {
  for (var s = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (s = a(t, e, s) || s);
  return s && Tn(t, e, s), s;
};
const En = ["next", "30", "60", "180", "forever"], Nn = [0, 60, 180, 480], ne = class ne extends W {
  constructor() {
    super(...arguments), this.system = "heating", this.rooms = [], this.selected = [], this.prefix = "hdk", this.delayMs = 2e3, this.draft = {}, this.busy = !1, this.error = "";
  }
  updated() {
    Ot(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
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
    const s = this.hass;
    if (!s) return;
    this.busy = !0;
    const o = Bt(s);
    try {
      for (const a of e) {
        const r = s.states[a];
        if (!r || rt(n, r) === void 0) continue;
        const d = n === "heating" ? Sn(a, r, t, o) : An(a, r, t);
        for (const l of d) await s.callService(l.domain, l.service, l.data);
        const h = t.offAfter ?? 0, u = n === "cooling" ? Mn(r, t) : void 0;
        h > 0 && u !== void 0 && u !== "off" && await s.callWS(Cn(a, h, u));
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
    const e = this.texts, n = this.hass?.states[t], s = rt(this.system, n);
    if (s === void 0) return e.unavailable;
    const o = dt(n?.attributes.temperature);
    return s !== "off" && s !== "boost" && s !== "fan_only" && o !== void 0 ? `${e.modes[s]} · ${this.degrees(o)}` : e.modes[s];
  }
  selectRoom(t) {
    const e = vn(this.system, this.hass, this.rooms, this.selected, t);
    e.join() !== this.selected.join() && (this.flush(this.selected), this.selected = e, this.dispatchEvent(new CustomEvent("hdk-select-rooms", { detail: { selected: e }, bubbles: !0, composed: !0 })));
  }
  render() {
    const t = this.texts, e = this.i18n;
    if (!t || !e) return f;
    const n = this.hass, s = n?.states[this.selected[0]], { min: o, max: a, step: r } = xn(this.system, s), d = $n(n, this.selected), h = [...new Set(d.map((x) => x.value))], u = yn(this.system, n, this.selected), l = this.draft.mode ?? u, m = this.draft.temperature === void 0 && h.length > 1, p = h[0], $ = this.draft.temperature ?? (l === "boost" ? 25 : l === "manual" && p !== void 0 && p <= Pt ? je : p), b = l === "off" || l === "fan_only", w = b && l !== void 0 ? t.modes[l] : m ? `${this.degrees(Math.min(...h)).replace(/°$/, "")}–${this.degrees(Math.max(...h))}` : $ !== void 0 ? this.degrees($) : "––", g = this.selected.flatMap((x) => {
      const F = dt(n?.states[x]?.attributes.current_temperature);
      return F === void 0 ? [] : [{ id: x, text: `${e.one(F)} °C` }];
    }), y = this.system === "heating" && this.selected.length === 1 && n?.states[this.selected[0]]?.attributes.hvac_action === "heating", S = m ? t.targets(d.map((x) => `${this.name(x.entity)} ${this.degrees(x.value)}`).join(" · ")) : g.length ? t.now(this.selected.length === 1 ? `${g[0].text}${y ? ` · ${t.heats}` : ""}` : g.map((x) => `${this.name(x.id)} ${x.text}`).join(" · ")) : "", T = this.system === "heating" ? bn.filter((x) => x !== "boost" || Bt(n)) : Jt.filter((x) => this.selected.some((F) => wn(n?.states[F]).includes(x))), _ = this.draft.mode === void 0 && u === void 0 && this.selected.length > 1, D = this.system === "cooling" && (l === "off" || l === "fan_only");
    return c`
      <div class="rooms" role="group" aria-label=${t.rooms}>
        ${this.rooms.map((x) => {
      const F = n?.states[x.entity], vt = Dt(this.system, F), $t = this.selected.includes(x.entity);
      return _e(this.prefix, {
        name: x.name,
        text: this.roomText(x.entity),
        state: $t ? "on" : vt ? "idle" : "off",
        disabled: vt === void 0,
        pressed: $t,
        onPress: () => this.selectRoom(x.entity)
      });
    })}
      </div>
      <div class="target">
        <div class="big ${b ? "word" : ""}" aria-live="polite">${w}</div>
        <div class="sub">${S}</div>
        ${this.busy ? c`<span class="busy" role="status" aria-label=${t.sending}
              ><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 2.5a7.5 7.5 0 1 1-7.5 7.5"></path></svg
            ></span>` : f}
      </div>
      <div class="slider">
        ${zn(this.prefix, {
      min: o,
      max: a,
      step: r,
      value: $ ?? o,
      mixed: m,
      marks: m ? h : [],
      label: t.temperature,
      valueText: $ !== void 0 ? this.degrees($) : "",
      minLabel: this.degrees(o),
      maxLabel: this.degrees(a),
      disabled: D || !this.selected.length,
      onChange: (x) => (
        // Moving the temperature of the heating is Ručně (spec: „Posunutí teploty přepne Plán na Ručně“).
        this.change(this.system === "heating" && l !== "manual" ? { temperature: x, mode: "manual" } : { temperature: x })
      )
    })}
      </div>
      <h3>${t.mode}</h3>
      ${this.system === "heating" ? Mt(this.prefix, {
      label: t.mode,
      options: T.map((x) => ({ value: x, label: t.modes[x] })),
      value: l ?? "",
      onSelect: (x) => this.change({ mode: x, ...x === "plan" || x === "off" ? { temperature: void 0 } : {} })
    }) : c`<div class="modes" role="group" aria-label=${t.mode}>
            ${T.map(
      (x) => _e(this.prefix, {
        centered: !0,
        name: t.modes[x],
        state: l === x ? "on" : "idle",
        pressed: l === x,
        onPress: () => this.change({ mode: x })
      })
    )}
          </div>`}
      ${_ ? c`<div class="note">${mt(t.mixedModes(this.selected.map((x) => `${this.name(x)} ${t.modes[rt(this.system, n?.states[x]) ?? "off"] ?? ""}`).join(" · ")))}</div>` : f}
      ${(m || _) && !Object.keys(this.draft).length ? c`<div class="note">${t.firstChange}</div>` : f}
      ${this.system === "heating" ? this.renderManualFor(l) : [this.renderAttribute("fan"), this.renderAttribute("swing"), this.renderOffAfter(l)]}
      ${this.error ? c`<div class="error" role="alert">${this.error}</div>` : f}
      ${this.selected.length === 1 ? c`<button
            class="detail"
            type="button"
            @click=${() => this.dispatchEvent(new CustomEvent("hdk-more-info", { detail: { entityId: this.selected[0] }, bubbles: !0, composed: !0 }))}
          >
            ${t.detail}<span aria-hidden="true"> ›</span>
          </button>` : f}
    `;
  }
  renderManualFor(t) {
    const e = this.texts;
    if (!Bt(this.hass)) return f;
    const n = t === "off", s = t === "manual" || t === "boost" || n, o = this.draft.manualFor ?? (t === "boost" ? "30" : n ? "forever" : "next"), a = Number(o), r = () => this.i18n.time(Date.now() + a * 6e4), d = s ? n ? o === "next" ? e.offUntilNextPlan : o === "forever" ? e.offUntilChanged : e.offUntilTime(r()) : o === "next" ? e.untilNextPlan : o === "forever" ? e.untilChanged : e.untilTime(r()) : "", h = n ? e.offFor : e.manualFor;
    return c`<h3>${h}</h3>
      ${Mt(this.prefix, {
      label: h,
      options: En.map((u) => ({ value: u, label: e.manualForChoices[u] })),
      value: o,
      disabled: !s,
      wrap: !0,
      onSelect: (u) => this.change({ manualFor: u, ...this.draft.mode === void 0 && t ? { mode: t } : {} })
    })}
      <div class="footer">${d}</div>`;
  }
  /** Síla větru or Směr proudění: the choices every selected air conditioner offers; none, no section. */
  renderAttribute(t) {
    const e = this.texts, n = kn(this.hass, this.selected, t === "fan" ? "fan_modes" : "swing_modes");
    if (!n.length) return f;
    const s = t === "fan" ? e.fanModes : e.swingModes, o = this.draft[t] ?? _n(this.hass, this.selected, t === "fan" ? "fan_mode" : "swing_mode") ?? "", a = t === "fan" ? e.fan : e.swing;
    return c`<h3>${a}</h3>
      ${Mt(this.prefix, {
      label: a,
      options: n.map((r) => ({ value: r, label: s[r] ?? r })),
      value: o,
      onSelect: (r) => this.change(t === "fan" ? { fan: r } : { swing: r })
    })}`;
  }
  renderOffAfter(t) {
    const e = this.texts, n = this.draft.offAfter ?? 0, s = t !== void 0 ? t !== "off" : this.selected.length > 0 && this.selected.every((a) => Dt(this.system, this.hass?.states[a]) === !0), o = s ? n === 0 ? e.runsUntilOff : e.offAt(this.i18n.time(Date.now() + n * 6e4)) : "";
    return c`<h3>${e.offAfter}</h3>
      ${Mt(this.prefix, {
      label: e.offAfter,
      options: Nn.map((a) => ({ value: String(a), label: e.offAfterChoices[String(a)] })),
      value: String(n),
      disabled: !s,
      onSelect: (a) => this.change({ offAfter: Number(a) })
    })}
      <div class="footer">${o}</div>`;
  }
};
ne.styles = [Le, Xt, Y`
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
      /* Four in a row on a phone, three on the narrowest one: a mode never gets a tile too narrow for its name. */
      grid-template-columns: repeat(auto-fill, minmax(78px, 1fr));
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
let R = ne;
K([
  v({ attribute: !1 })
], R.prototype, "hass");
K([
  v({ attribute: !1 })
], R.prototype, "i18n");
K([
  v({ attribute: !1 })
], R.prototype, "texts");
K([
  v()
], R.prototype, "system");
K([
  v({ attribute: !1 })
], R.prototype, "rooms");
K([
  v({ attribute: !1 })
], R.prototype, "selected");
K([
  v()
], R.prototype, "prefix");
K([
  v({ type: Number })
], R.prototype, "delayMs");
K([
  E()
], R.prototype, "draft");
K([
  E()
], R.prototype, "busy");
K([
  E()
], R.prototype, "error");
function _e(i, t) {
  const e = Gt(`${i}-tile`);
  return Zt`<${e}
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
function Mt(i, t) {
  const e = Gt(`${i}-segmented`);
  return Zt`<${e}
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
function zn(i, t) {
  const e = Gt(`${i}-slider`);
  return Zt`<${e}
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
function On(i) {
  if (!customElements.get(`${i}-climate`)) {
    const t = class extends R {
      constructor() {
        super(), this.prefix = i;
      }
    };
    customElements.define(`${i}-climate`, t);
  }
}
var Pn = Object.defineProperty, bt = (i, t, e, n) => {
  for (var s = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (s = a(t, e, s) || s);
  return s && Pn(t, e, s), s;
};
const se = class se extends W {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, n = (t - e) / 2, s = 2 * Math.PI * n, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), a = t / 2;
    return c`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
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
          stroke-dasharray="${(s * o).toFixed(1)} ${s.toFixed(1)}"
          transform="rotate(-90 ${a} ${a})"
        ></circle>
      </svg>
      ${this.num ? c`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? c`<span class="unit">${this.unit}</span>` : f}` : f}
    </div>`;
  }
};
se.styles = Y`
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
let tt = se;
bt([
  v({ type: Number })
], tt.prototype, "fraction");
bt([
  v({ type: Number })
], tt.prototype, "size");
bt([
  v({ type: Number })
], tt.prototype, "stroke");
bt([
  v()
], tt.prototype, "num");
bt([
  v()
], tt.prototype, "unit");
bt([
  v()
], tt.prototype, "label");
class jt {
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
    const n = this.pressing, s = this.fired;
    return this.pressing = !1, this.fired = !1, !n || s ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
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
class te {
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
const Rt = Y`
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
var Dn = Object.defineProperty, U = (i, t, e, n) => {
  for (var s = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (s = a(t, e, s) || s);
  return s && Dn(t, e, s), s;
};
const ie = class ie extends W {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.pending = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new te(this), this.nudgeIndex = 0, this.gesture = new jt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), n = this.options[t]?.value ?? e[0]?.value, s = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !s ? Math.sign(this.nudgeIndex - t) * 14 : 0, a = this._dragging ? this._dx : o;
    return c`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) ? "tall" : ""} ${this.wrap ? "wrap" : !this.compact && this.options.length >= 5 ? "many" : ""} ${this.disabled ? "off" : ""}"
        role="radiogroup"
        aria-busy=${this.pending ? "true" : f}
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
      (r, d) => c`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === n ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${d}
            @click=${(h) => this.onClick(h, r.value, d)}
          >
            <span>${r.label}</span>${r.detail ? c`<span class="detail">${r.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? c`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
    const s = this.gesture.tap(String(n), t.timeStamp);
    if (this.swallowClick || s === "none") {
      this.swallowClick = !1;
      return;
    }
    s === "double" ? this.select(e) : (this.nudgeIndex = n, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, n = this.options.findIndex((r) => r.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: n, moved: !1, id: t.pointerId };
    const s = t.target.closest("button[data-index]"), o = s ? Number(s.dataset.index) : -1, a = o >= 0 && o !== n && !this.options[o]?.disabled;
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
    const s = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((s - e.index) * e.width, n)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (this.gesture.release(), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const n = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const s = this.options[n];
    s && !s.disabled && n !== e.index && this.select(s.value);
  }
  onCancel() {
    this.gesture.cancel(), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const n = this.options.filter((r) => !r.disabled);
    if (!n.length) return;
    const s = n.findIndex((r) => r.value === this.value), o = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, a = n[(s + o + n.length) % n.length];
    t.preventDefault(), this.select(a.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${a.value}"]`)?.focus());
  }
};
ie.styles = [
  Rt,
  Y`
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
        line-height: 16px;
        text-align: center;
      }
      /* Five and more options: a smaller text and a narrower padding, so neighbouring labels do not touch („Střední“, „Vysoká“). */
      .track.many button {
        padding: 0 4px;
        font-size: 15px;
        line-height: 20px;
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
let z = ie;
U([
  v({ attribute: !1 })
], z.prototype, "options");
U([
  v()
], z.prototype, "value");
U([
  v()
], z.prototype, "label");
U([
  v({ type: Boolean })
], z.prototype, "disabled");
U([
  v({ type: Boolean, reflect: !0 })
], z.prototype, "pending");
U([
  v({ type: Boolean })
], z.prototype, "compact");
U([
  v({ type: Boolean })
], z.prototype, "wrap");
U([
  v({ type: Boolean })
], z.prototype, "guarded");
U([
  v({ type: Number })
], z.prototype, "holdMs");
U([
  v({ type: Number })
], z.prototype, "doubleTapMs");
U([
  v({ type: Number })
], z.prototype, "hintSeconds");
U([
  v()
], z.prototype, "hint");
U([
  E()
], z.prototype, "_dx");
U([
  E()
], z.prototype, "_dragging");
var Ln = Object.defineProperty, ht = (i, t, e, n) => {
  for (var s = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (s = a(t, e, s) || s);
  return s && Ln(t, e, s), s;
};
const Fn = 100, jn = 0.6, Rn = 6, oe = class oe extends W {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.wide = !1, this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.close();
        return;
      }
      if (t.key !== "Tab") return;
      const e = this.focusable();
      if (!e.length) return;
      const n = t.composedPath(), s = e.findIndex((a) => n.includes(a)), o = t.shiftKey ? e[s <= 0 ? e.length - 1 : s - 1] : e[s === -1 || s === e.length - 1 ? 0 : s + 1];
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
        if (n < Rn) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, n);
    }, this.dragEnd = (t) => {
      const e = this.drag;
      if (this.drag = void 0, !e || !this.dragging) return;
      this.dragging = !1;
      const n = Math.max(0, t.clientY - e.startY), s = n / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (n > Fn || s > jn) ? this.close() : this.dragY = 0;
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
    const t = 'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), [tabindex]:not([tabindex="-1"])', e = (s) => [...s.querySelectorAll("*")].flatMap((o) => [
      ...o.matches(t) ? [o] : [],
      ...o.shadowRoot ? e(o.shadowRoot) : []
    ]), n = this.renderRoot.querySelector(".close");
    return [...n ? [n] : [], ...e(this).filter((s) => s.getClientRects().length > 0)];
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. Outside the sheet nothing scrolls. */
  cannotScroll(t, e) {
    const n = this.renderRoot.querySelector(".panel");
    return !n || !t.composedPath().includes(n) ? !0 : !(n.scrollHeight > n.clientHeight + 1) || e > 0 && n.scrollTop <= 0 || e < 0 && n.scrollTop + n.clientHeight >= n.scrollHeight - 1;
  }
  render() {
    return this.open ? c`<div
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
              ${this.sub ? c`<div class="sub">${this.sub}</div>` : f}
            </div>
            <button type="button" class="close" aria-label=${this.closeLabel} @click=${() => this.close()}>
              <span aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"></path></svg></span>
            </button>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>` : f;
  }
};
oe.styles = [Le, Y`
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
let G = oe;
ht([
  v({ type: Boolean, reflect: !0 })
], G.prototype, "open");
ht([
  v()
], G.prototype, "heading");
ht([
  v()
], G.prototype, "sub");
ht([
  v()
], G.prototype, "closeLabel");
ht([
  v({ type: Boolean })
], G.prototype, "wide");
ht([
  E()
], G.prototype, "dragY");
ht([
  E()
], G.prototype, "dragging");
var Un = Object.defineProperty, B = (i, t, e, n) => {
  for (var s = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (s = a(t, e, s) || s);
  return s && Un(t, e, s), s;
};
const ae = class ae extends W {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [], this.track = "";
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, n = Math.max(0, Math.min(1, (t - this.min) / e)), s = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${n})`, o = this.mixed && this._drag === void 0 ? this.marks.map((h) => c`<i style="left:${(Math.max(0, Math.min(1, (h - this.min) / e)) * 100).toFixed(2)}%"></i>`) : [], a = this.tickStep || this.step || 1, r = Math.floor(e / a + 1e-9) + 1, d = r >= 2 && r <= 40 ? Array.from({ length: r }, (h, u) => c`<i style="left:${(u * a / e * 100).toFixed(2)}%"></i>`) : [];
    return c`<div class="wrap">
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(t)}
          aria-label=${this.label}
          aria-valuetext=${this.valueText || String(t)}
          ?disabled=${this.disabled}
          class=${this.track ? "painted" : ""}
          style="--fill: ${s}${this.track ? `; --track: ${this.track}` : ""}"
          @input=${this.onInput}
          @change=${this.onChange}
        />
        <div class="ticks" aria-hidden="true">${d}</div>
        ${o.length ? c`<div class="marks" aria-hidden="true">${o}</div>` : null}
      </div>
      ${this.minLabel || this.maxLabel ? c`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
ae.styles = Y`
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
    input.painted::-webkit-slider-runnable-track {
      background: var(--track);
    }
    input.painted::-moz-range-track {
      background: var(--track);
    }
    input.painted::-moz-range-progress {
      background: transparent;
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
let O = ae;
B([
  v({ type: Number })
], O.prototype, "min");
B([
  v({ type: Number })
], O.prototype, "max");
B([
  v({ type: Number })
], O.prototype, "step");
B([
  v({ type: Number })
], O.prototype, "tickStep");
B([
  v({ type: Number })
], O.prototype, "value");
B([
  v()
], O.prototype, "label");
B([
  v()
], O.prototype, "valueText");
B([
  v()
], O.prototype, "minLabel");
B([
  v()
], O.prototype, "maxLabel");
B([
  v({ type: Boolean })
], O.prototype, "disabled");
B([
  v({ type: Boolean, reflect: !0 })
], O.prototype, "mixed");
B([
  v({ attribute: !1 })
], O.prototype, "marks");
B([
  v()
], O.prototype, "track");
B([
  E()
], O.prototype, "_drag");
var Bn = Object.defineProperty, Z = (i, t, e, n) => {
  for (var s = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (s = a(t, e, s) || s);
  return s && Bn(t, e, s), s;
};
const re = class re extends W {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new te(this), this.gesture = new jt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return c`<button
        type="button"
        role="switch"
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${this.checked ? "true" : "false"}
        aria-busy=${this.pending ? "true" : f}
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
      ${this.hints.hint ? c`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
re.styles = [
  Rt,
  Y`
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
let I = re;
Z([
  v({ type: Boolean })
], I.prototype, "checked");
Z([
  v({ type: Boolean })
], I.prototype, "disabled");
Z([
  v({ type: Boolean, reflect: !0 })
], I.prototype, "pending");
Z([
  v()
], I.prototype, "label");
Z([
  v({ type: Boolean })
], I.prototype, "guarded");
Z([
  v({ type: Number })
], I.prototype, "holdMs");
Z([
  v({ type: Number })
], I.prototype, "doubleTapMs");
Z([
  v({ type: Number })
], I.prototype, "hintSeconds");
Z([
  v()
], I.prototype, "hintPlacement");
Z([
  v()
], I.prototype, "hint");
var In = Object.defineProperty, P = (i, t, e, n) => {
  for (var s = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (s = a(t, e, s) || s);
  return s && In(t, e, s), s;
};
const le = class le extends W {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.corner = "", this.centered = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new te(this), this.gesture = new jt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  /** The state line is text from parts („WindFree · 24°“): it breaks only at the dot, and the dot goes (Text z částí). */
  updated() {
    Ot(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.kind === "toggle", e = this.count === void 0 ? null : c`<span class="count">${this.count}</span>`;
    return c`<button
        type="button"
        role=${t ? "switch" : "button"}
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${t ? this.state === "on" ? "true" : "false" : f}
        aria-pressed=${this.kind === "action" && this.pressed !== void 0 ? this.pressed ? "true" : "false" : f}
        aria-busy=${this.pending ? "true" : f}
        aria-haspopup=${this.kind === "open" ? "dialog" : f}
        aria-label=${this.label || f}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(n) => this.protected && n.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? c`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : c`<span class="text">${mt(this.text)}${e}${this.corner ? c`<span class="corner">${this.corner}</span>` : null}</span>`}</button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? c`<div class="hint above ${this.hintAlign}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
le.styles = [
  Rt,
  Xt,
  Y`
      :host {
        position: relative;
        display: block;
        min-width: 0;
        container-type: inline-size;
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
      .corner {
        float: right;
        margin-inline-start: 8px;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        color: var(--hdk-secondary, #98989f);
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
      :host([state="on"]) .corner,
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
        flex: 0 1 auto;
      }
      /* A narrow centred tile (four modes in a row on a phone): a smaller name and less padding, so „Chlazení“ and „WindFree“ keep clear of the edges. */
      @container (max-width: 100px) {
        :host([centered]) button {
          padding: 10px 6px;
        }
        :host([centered]) .name {
          font-size: 15px;
          line-height: 20px;
        }
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
let C = le;
P([
  v()
], C.prototype, "name");
P([
  v()
], C.prototype, "text");
P([
  v({ reflect: !0 })
], C.prototype, "state");
P([
  v()
], C.prototype, "kind");
P([
  v()
], C.prototype, "corner");
P([
  v({ type: Number })
], C.prototype, "count");
P([
  v({ type: Boolean, reflect: !0 })
], C.prototype, "centered");
P([
  v({ type: Boolean })
], C.prototype, "disabled");
P([
  v({ type: Boolean, reflect: !0 })
], C.prototype, "pending");
P([
  v({ type: Boolean })
], C.prototype, "pressed");
P([
  v()
], C.prototype, "label");
P([
  v({ type: Boolean })
], C.prototype, "guarded");
P([
  v({ type: Number })
], C.prototype, "holdMs");
P([
  v({ type: Number })
], C.prototype, "doubleTapMs");
P([
  v({ type: Number })
], C.prototype, "hintSeconds");
P([
  v()
], C.prototype, "hint");
P([
  v()
], C.prototype, "hintAlign");
function Hn(i) {
  const t = [
    [`${i}-switch`, I],
    [`${i}-segmented`, z],
    [`${i}-slider`, O],
    [`${i}-ring`, tt],
    [`${i}-tile`, C],
    [`${i}-sheet`, G]
  ];
  for (const [e, n] of t)
    customElements.get(e) || customElements.define(e, n);
}
const Wn = ["cs", "en", "sv"];
class Re extends Error {
}
function k(i) {
  throw new Re(i);
}
function Vn(i, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Re ? new Error(`${i}: ${e.message}`) : e;
  }
}
function H(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function ot(i, t) {
  return i == null ? {} : (H(i) || k(`"${t}" must be a mapping of keys.`), i);
}
function L(i, t, e) {
  for (const n of Object.keys(i))
    t.includes(n) || k(`${e}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function M(i, t, e = {}) {
  if (i == null)
    return;
  const n = typeof i == "string" ? i.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(n) || k(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !n.startsWith(`${e.domain}.`) && k(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${n}.`), n;
}
function Yn(i, t) {
  if (i != null)
    return (typeof i != "string" || !i.trim()) && k(`${t} must be a non-empty text.`), i.trim();
}
function et(i, t) {
  if (i != null) {
    if (typeof i == "string" && i.trim())
      return i.trim();
    if (H(i) && Object.keys(i).length > 0) {
      const e = Object.entries(i);
      if (e.every(([n, s]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(n) && typeof s == "string" && s.trim()))
        return Object.fromEntries(e.map(([n, s]) => [n, s.trim()]));
    }
    return k(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Kn(i, t) {
  if (i === void 0 || typeof i == "string")
    return i;
  const e = t.toLowerCase();
  return i[e] ?? i[e.split("-")[0]] ?? i.en ?? Object.values(i)[0];
}
const Se = ["auto", ...Wn];
function qn(i) {
  const t = i ?? "auto";
  return Se.includes(t) || k(`language must be one of ${Se.join(", ")}.`), t;
}
const Gn = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function J(i) {
  return Gn.has(i);
}
function A(i, t) {
  return t ? i?.states?.[t] : void 0;
}
function N(i, t) {
  const e = A(i, t)?.state;
  return e === void 0 || J(e) ? void 0 : e;
}
function ct(i, t) {
  const e = N(i, t);
  if (e === void 0)
    return;
  const n = Number(e);
  return Number.isFinite(n) ? n : void 0;
}
const Zn = 168 * 36e5;
function Ue(i) {
  if (i == null) return;
  const t = typeof i == "number" ? i < 1e11 ? i * 1e3 : i : Date.parse(i);
  return Number.isFinite(t) ? t : void 0;
}
function Xn(i) {
  let t;
  for (const e of i ?? []) {
    const n = e.s ?? e.state, s = Ue(e.lu ?? e.last_updated);
    n === void 0 || s === void 0 || n === "unavailable" || n === "unknown" || n === "" || (t === void 0 || t.state !== n) && (t = { state: n, start: s });
  }
  return t;
}
class Jn {
  constructor(t, e = Date.now) {
    this.onChange = t, this.now = e, this.known = /* @__PURE__ */ new Map(), this.wanted = /* @__PURE__ */ new Map(), this.pending = /* @__PURE__ */ new Map(), this.scheduled = !1;
  }
  /** The moment (ms) the entity got its current state; undefined when the entity is missing or has no time. */
  of(t, e) {
    const n = A(t, e);
    if (!t || !e || !n) return;
    const s = Ue(n.last_changed), o = `${n.state}|${n.last_changed ?? ""}`, a = this.known.get(e);
    return a?.key === o ? a.start === void 0 ? s : Math.min(a.start, s ?? a.start) : (this.hass = t, this.wanted.get(e) !== o && this.pending.get(e) !== o && (this.wanted.set(e, o), this.schedule()), s);
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
    let s;
    try {
      s = await t.callWS({
        type: "history/history_during_period",
        start_time: new Date(n - Zn).toISOString(),
        end_time: new Date(n).toISOString(),
        entity_ids: [...e.keys()],
        include_start_time_state: !0,
        significant_changes_only: !1,
        minimal_response: !0,
        no_attributes: !0
      });
    } catch {
      s = void 0;
    }
    for (const [o, a] of e) {
      if (this.pending.get(o) === a && this.pending.delete(o), this.wanted.has(o)) continue;
      const r = Xn(s?.[o]), d = A(this.hass, o)?.state;
      this.known.set(o, { key: a, start: r && r.state === d ? r.start : void 0 });
    }
    this.onChange();
  }
}
class Qn {
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
    const s = { ...n, signature: Ae(e, n.entities) };
    this.watches.set(t, s), this.arm(t, s), this.changed();
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
        const s = Ae(t, n.entities);
        s !== n.signature && (n.signature = s, this.arm(e, n));
      }
  }
  clear() {
    for (const t of [...this.watches.keys()]) this.stop(t, !1);
  }
  arm(t, e) {
    clearTimeout(e.timer), e.timer = setTimeout(() => this.stop(t), this.stallMs);
  }
}
function Ae(i, t) {
  return t.map((e) => {
    const n = i?.states[e];
    return n ? `${n.state}|${JSON.stringify(n.attributes)}` : "";
  }).join("§");
}
const ts = [
  { name: { cs: "Den", en: "Day", sv: "Dag" }, position: 100, tilt: 100 },
  { name: { cs: "Stín", en: "Shade", sv: "Skugga" }, position: 0, tilt: 100 },
  { name: { cs: "Tma", en: "Dark", sv: "Mörker" }, position: 0, tilt: 0 }
];
function Q(i, t) {
  return i == null ? [] : (Array.isArray(i) || k(`"${t}" must be a list.`), i);
}
function X(i, t, e, n, s) {
  return i == null ? e : ((typeof i != "number" || !Number.isFinite(i) || i < n || i > s) && k(`${t} must be a number from ${n} to ${s}.`), i);
}
function q(i, t, e) {
  return Q(i, t).map((n, s) => {
    const o = `${t}[${s}]`;
    H(n) || k(`${o} must be a mapping with name and entity.`), L(n, ["name", "entity"], o);
    const a = et(n.name, `${o}.name`) ?? k(`${o}.name is missing.`), r = M(n.entity, `${o}.entity`, { example: `${e[0]}.example` }) ?? k(`${o}.entity is missing.`);
    return e.includes(r.split(".")[0]) || k(`${o}.entity must be one of ${e.join(", ")}, not ${r}.`), { name: a, entity: r };
  });
}
function es(i) {
  H(i) || k("the configuration must be a mapping of keys.");
  const t = ot(i.covers, "covers");
  L(t, ["script", "entities", "last_action", "presets", "tolerance"], "covers");
  const e = {}, n = Q(t.entities, "covers.entities").map((b, w) => {
    const g = `covers.entities[${w}]`;
    if (!H(b)) return M(b, g, { domain: "cover" }) ?? k(`${g} is missing.`);
    L(b, ["name", "entity"], g);
    const y = M(b.entity, `${g}.entity`, { domain: "cover" }) ?? k(`${g}.entity is missing.`), S = et(b.name, `${g}.name`);
    return S !== void 0 && (e[y] = S), y;
  }), s = ot(i.ventilation, "ventilation");
  L(s, ["mode", "fans"], "ventilation");
  const o = ot(i.heating, "heating");
  L(o, ["resume", "rooms"], "heating");
  const a = ot(i.cooling, "cooling");
  L(a, ["rooms"], "cooling");
  const r = ot(i.guard, "guard");
  L(r, ["hold_ms", "double_tap_ms", "hint_seconds"], "guard");
  const d = ot(i.house_modes, "house_modes");
  L(d, ["winter", "summer"], "house_modes");
  const h = Q(t.presets, "covers.presets").map((b, w) => {
    const g = `covers.presets[${w}]`;
    return H(b) || k(`${g} must be a mapping with name, position and tilt.`), L(b, ["name", "position", "tilt"], g), {
      name: et(b.name, `${g}.name`) ?? k(`${g}.name is missing.`),
      position: X(b.position, `${g}.position`, 0, 0, 100),
      tilt: X(b.tilt, `${g}.tilt`, 0, 0, 100)
    };
  }), u = Q(i.batteries, "batteries").map((b, w) => {
    const g = `batteries[${w}]`;
    return H(b) || k(`${g} must be a mapping with name and low.`), L(b, ["name", "low", "level", "type"], g), {
      name: et(b.name, `${g}.name`) ?? k(`${g}.name is missing.`),
      low: M(b.low, `${g}.low`, { domain: "binary_sensor" }) ?? k(`${g}.low is missing.`),
      level: M(b.level, `${g}.level`, { domain: "sensor" }),
      type: M(b.type, `${g}.type`, { domain: "sensor" })
    };
  }), l = Q(i.filters, "filters").map((b, w) => {
    const g = `filters[${w}]`;
    return H(b) || k(`${g} must be a mapping with name, hours and threshold.`), L(b, ["name", "hours", "threshold"], g), {
      name: et(b.name, `${g}.name`) ?? k(`${g}.name is missing.`),
      hours: M(b.hours, `${g}.hours`, { domain: "input_number" }) ?? k(`${g}.hours is missing.`),
      threshold: M(b.threshold, `${g}.threshold`, { domain: "select" }) ?? k(`${g}.threshold is missing.`)
    };
  }), m = Q(i.maintenance, "maintenance").map((b, w) => {
    const g = `maintenance[${w}]`;
    return H(b) || k(`${g} must be a mapping with name, task, counter and every.`), L(b, ["name", "task", "counter", "every"], g), {
      name: et(b.name, `${g}.name`) ?? k(`${g}.name is missing.`),
      task: et(b.task, `${g}.task`) ?? k(`${g}.task is missing.`),
      counter: M(b.counter, `${g}.counter`, { domain: "counter" }) ?? k(`${g}.counter is missing.`),
      every: X(b.every, `${g}.every`, 30, 1, 1e3)
    };
  }), p = Q(i.devices, "devices").map((b, w) => {
    const g = `devices[${w}]`;
    return H(b) || k(`${g} must be a mapping with name and entities.`), L(b, ["name", "entities"], g), {
      name: et(b.name, `${g}.name`) ?? k(`${g}.name is missing.`),
      entities: Q(b.entities, `${g}.entities`).map((y, S) => {
        const T = `${g}.entities[${S}]`;
        H(y) || k(`${T} must be a mapping with name and entity.`), L(y, ["name", "entity", "startup_brightness", "map"], T);
        const [_] = q([{ name: y.name, entity: y.entity }], `${g}.entities`, ["light", "switch", "fan", "input_boolean", "vacuum"]), D = _.entity.split(".")[0];
        y.startup_brightness != null && D !== "light" && k(`${T}.startup_brightness is only for a light.`), y.map != null && D !== "vacuum" && k(`${T}.map is only for a vacuum.`);
        const x = M(y.startup_brightness, `${T}.startup_brightness`, { domain: "input_number" }), F = M(y.map, `${T}.map`, { example: "camera.example" });
        return F && !["camera", "image"].includes(F.split(".")[0]) && k(`${T}.map must be a camera or an image, not ${F}.`), { ..._, ...x ? { startupBrightness: x } : {}, ...F ? { map: F } : {} };
      })
    };
  }), $ = ot(i.health, "health");
  return L($, ["battery_low", "batteries", "connections", "system", "updates"], "health"), $.updates !== void 0 && typeof $.updates != "boolean" && k("health.updates must be true or false."), {
    language: qn(i.language),
    houseMode: M(i.house_mode_entity, "house_mode_entity", { domain: "input_select" }),
    summer: Yn(d.summer, "house_modes.summer") ?? "Léto",
    failedActions: M(i.failed_actions, "failed_actions", { domain: "sensor" }),
    clearFailed: M(i.clear_failed_script, "clear_failed_script", { domain: "script" }),
    snoozed: M(i.snoozed, "snoozed", { domain: "sensor" }),
    snoozeScript: M(i.snooze_script, "snooze_script", { domain: "script" }),
    batteries: u,
    filters: l,
    laundry: q(i.laundry, "laundry", ["input_boolean"]),
    leaks: q(i.leaks, "leaks", ["binary_sensor"]),
    maintenance: m,
    running: q(i.running, "running", ["input_boolean", "binary_sensor", "switch", "vacuum"]),
    covers: {
      script: M(t.script, "covers.script", { domain: "script" }) ?? "script.zaluzie_posun",
      entities: n,
      names: e,
      lastAction: M(t.last_action, "covers.last_action", { domain: "sensor" }),
      presets: h.length ? h : ts,
      tolerance: X(t.tolerance, "covers.tolerance", 5, 0, 20)
    },
    ventilation: {
      mode: M(s.mode, "ventilation.mode", { domain: "input_boolean" }),
      fans: q(s.fans, "ventilation.fans", ["switch", "fan"])
    },
    heating: {
      resume: M(o.resume, "heating.resume", { domain: "button" }),
      rooms: q(o.rooms, "heating.rooms", ["climate"])
    },
    cooling: { rooms: q(a.rooms, "cooling.rooms", ["climate"]) },
    devices: p,
    health: {
      batteryLow: X($.battery_low, "health.battery_low", 20, 1, 99),
      batteries: q($.batteries, "health.batteries", ["sensor"]),
      connections: q($.connections, "health.connections", ["binary_sensor"]),
      system: Q($.system, "health.system").map((b, w) => {
        const g = `health.system[${w}]`;
        H(b) || k(`${g} must be a mapping with name and entity.`), L(b, ["name", "entity", "max"], g);
        const [y] = q([{ name: b.name, entity: b.entity }], g, ["sensor", "binary_sensor"]);
        return b.max !== void 0 && (typeof b.max != "number" || !Number.isFinite(b.max)) && k(`${g}.max must be a number.`), { ...y, max: b.max };
      }),
      updates: $.updates === !0
    },
    sendDelaySeconds: X(i.send_delay_seconds, "send_delay_seconds", 2, 0, 30),
    guard: {
      holdMs: X(r.hold_ms, "guard.hold_ms", 550, 200, 3e3),
      doubleTapMs: X(r.double_tap_ms, "guard.double_tap_ms", 400, 150, 1500),
      hintSeconds: X(r.hint_seconds, "guard.hint_seconds", 3, 1, 10)
    }
  };
}
function ns(i) {
  return Vn("Dům Dashboard", () => es(i));
}
function Be(i) {
  return (i?.locale?.language || i?.language || "").trim();
}
function ee(i) {
  const t = i.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function ss(i, t) {
  return i === "auto" ? ee(Be(t)) : i;
}
function is() {
  return ee(document.documentElement.lang || navigator.language || "");
}
const Me = /* @__PURE__ */ new WeakMap(), os = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, as = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), rs = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function It(i, t) {
  const e = i?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function ls(i, t, e) {
  const n = Be(e).replace("_", "-"), s = n !== "" && ee(n) === t ? n : os[t], o = It(e, "number_format"), a = It(e, "time_format"), r = It(e, "date_format"), d = [t, s, o, a, r].join("|");
  let h = Me.get(i);
  h || (h = /* @__PURE__ */ new Map(), Me.set(i, h));
  let u = h.get(d);
  return u || (u = cs(i[t], t, s, o, a, r), h.set(d, u)), u;
}
function ds(i) {
  try {
    return new Intl.NumberFormat(i), i;
  } catch {
    return "en";
  }
}
function hs(i, t) {
  if (i === "12")
    return !0;
  if (i === "24")
    return !1;
  const e = i === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function cs(i, t, e, n, s, o) {
  const a = ds(e), r = n === "system" ? void 0 : n === "none" ? "en-US" : rs[n] ?? a, d = n === "none" ? { useGrouping: !1 } : {}, h = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...d }), u = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...d }), l = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...d }), m = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...d }), p = hs(s, a), $ = p ? "h12" : "h23", b = new Intl.DateTimeFormat(a, { hour: p ? "numeric" : "2-digit", minute: "2-digit", hourCycle: $ }), w = new Intl.DateTimeFormat(a, p ? { hour: "numeric", hourCycle: $ } : { hour: "2-digit", minute: "2-digit", hourCycle: $ }), g = o === "system" ? void 0 : a, y = new Intl.DateTimeFormat(g, { day: "numeric", month: "numeric" }), S = (_) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return y.format(_);
    const D = y.formatToParts(_), x = D.find((yt) => yt.type === "literal")?.value ?? "/", F = D[D.length - 1], vt = F?.type === "literal" ? F.value : "", $t = D.find((yt) => yt.type === "day")?.value ?? "", he = D.find((yt) => yt.type === "month")?.value ?? "";
    return o === "DMY" ? `${$t}${x}${he}${vt}` : `${he}${x}${$t}${vt}`;
  }, T = as.has(a.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: a,
    t: i,
    one: (_) => h.format(_),
    two: (_) => u.format(_),
    half: (_) => l.format(Math.round(_ * 2) / 2),
    tick: (_) => l.format(_),
    whole: (_) => m.format(_),
    percent: (_) => `${_}${T}%`,
    time: (_) => b.format(_),
    hour: (_) => w.format(_),
    day: S
  };
}
const us = {
  cardDescription: "Řídicí centrum domu: co tě potřebuje a ovládání na jednom místě.",
  title: "Dům",
  needsYou: "Potřebuje tebe",
  nothingWaits: "Nic na tebe nečeká",
  retry: "Zkusit znovu",
  snooze: "Odložit",
  snoozeFor: { day: "O den", weekend: "Na víkend", week: "O týden", month: "O měsíc" },
  done: "Hotovo",
  battery: (i) => i ? `Baterie ${i}` : "Slabá baterie",
  filter: (i, t) => `Vyčistit filtr · ${i} z ${t}`,
  laundry: (i) => i ? `Prádlo čeká · od ${i}` : "Prádlo čeká",
  /** A leak sensor reports water (the first row of „Potřebuje tebe“): "Únik vody · od 14:32". */
  leak: (i) => i ? `Únik vody · od ${i}` : "Únik vody",
  cycles: (i, t) => `${i} z ${t} cyklů`,
  running: "Teď běží",
  nothingRuns: "Nic neběží",
  minutes: (i) => `${i} min`,
  hours: (i, t) => t ? `${i} h ${t} min` : `${i} h`,
  covers: "Žaluzie",
  coversDetail: "Podrobnosti žaluzií",
  close: "Zavřít",
  log: "Co se stalo",
  logNew: (i, t) => `${i} ${i === 1 ? "nová událost" : i < 5 ? "nové události" : "nových událostí"} od ${t}`,
  logToday: (i) => `${i} ${i === 1 ? "událost" : i < 5 ? "události" : "událostí"} dnes`,
  logNothingNew: "Nic nového",
  logSince: "Od minulého otevření",
  logEarlier: "Dříve dnes",
  logEmpty: "Dnes se nic nestalo.",
  logFailed: "Deník se nepodařilo načíst.",
  rules: "Pravidla domu",
  rulesCount: (i) => `${i} ${i === 1 || i < 5 ? "automatizace" : "automatizací"}`,
  rulesLoading: "Načítám…",
  rulesFailed: "Pravidla se nepodařilo načíst.",
  health: "Zdraví",
  healthAttention: "Vyžaduje pozornost",
  healthBatteries: "Baterie čidel",
  healthLowest: (i) => `Nejslabší ${i}`,
  healthConnections: "Připojení",
  healthAllOnline: "Vše připojeno",
  healthOfflineCount: (i) => `${i} ${i === 1 ? "odpojeno" : "odpojeny"}`,
  healthOnline: "Připojeno",
  healthOffline: "Odpojeno",
  healthSystem: "Systém",
  healthOk: "V pořádku",
  healthProblem: "Problém",
  healthUpdates: "Aktualizace",
  healthUpdatesCount: (i) => `${i} ${i === 1 ? "dostupná" : i < 5 ? "dostupné" : "dostupných"}`,
  healthUpToDate: "Vše aktuální",
  logRuns: "Běží",
  logFinished: "Doběhla",
  logLaundryWaits: "Prádlo čeká",
  logLaundryOut: "Prádlo vyndáno",
  logLeak: "Únik vody",
  logLeakOver: "Sucho",
  climate: {
    rooms: "Místnosti",
    temperature: "Cílová teplota",
    mode: "Režim",
    modes: { plan: "Plán", manual: "Ručně", boost: "Boost", off: "Vypnuto", cool: "Chlazení", wind_free: "WindFree", heat: "Topení", fan_only: "Větrání", dry: "Sušení", auto: "Auto", sleep: "Spánek" },
    unavailable: "Nedostupné",
    now: (i) => `Teď ${i}`,
    heats: "topí",
    targets: (i) => `Cíl: ${i}`,
    mixedModes: (i) => `Různé režimy: ${i}`,
    firstChange: "První změna nastaví všechny vybrané stejně.",
    manualFor: "Ručně platí",
    offFor: "Vypnuto platí",
    manualForChoices: { next: "Do plánu", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Trvale" },
    offAfter: "Vypnout za",
    offAfterChoices: { 0: "Nevypínat", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Do další změny plánu, potom zpět na plán.",
    untilTime: (i) => `Do ${i}, potom zpět na plán.`,
    untilChanged: "Platí, dokud ho nezměníš.",
    offUntilNextPlan: "Vypnuto do další změny plánu, potom zpět na plán.",
    offUntilTime: (i) => `Vypnuto do ${i}, potom zpět na plán.`,
    offUntilChanged: "Vypnuto, dokud ho nezapneš.",
    runsUntilOff: "Běží, dokud ji nevypneš.",
    offAt: (i) => `Běží do ${i}, potom se vypne.`,
    fan: "Síla větru",
    swing: "Směr proudění",
    fanModes: { auto: "Auto", low: "Nízká", medium: "Střední", high: "Vysoká", turbo: "Turbo", quiet: "Tichá" },
    swingModes: { off: "Pevně", vertical: "Svisle", horizontal: "Vodorovně", both: "Vše" },
    detail: "Detail a historie",
    sending: "Odesílá se",
    failed: "Nepodařilo se"
  },
  who: { morning: "Ranní fáze", noon: "Polední fáze", evening: "Večerní fáze", night: "Noční fáze", vetrani: "Větrací režim", aplikace: "Aplikace", automatika: "Automatika", rucne: "Ručně" },
  notArrived: (i) => `Nedojela ${i}`,
  notArrivedTo: (i) => `Nedojela do ${i}`,
  ventilation: "Větrání",
  ventilationMode: "Větrací režim",
  heating: "Topení",
  cooling: "Klimatizace",
  off: "Vypnuto",
  on: "Zapnuto",
  runs: (i) => `Běží ${i}`,
  unavailable: "Nedostupné",
  schedule: "Plán",
  manual: "Ručně",
  manualCount: (i) => `${i} ručně`,
  resume: "Zpět na plán",
  allOff: "Vypnout vše",
  hint: "Podrž nebo klepni dvakrát",
  mode: { cool: "Chlazení", wind_free: "WindFree", heat: "Topení", fan_only: "Větrání", dry: "Sušení", auto: "Auto" },
  failed: "Nepodařilo se",
  device: {
    light: "Svítí",
    brightness: "Jas",
    colour: "Barva",
    temperature: "Teplota barvy",
    warm: "Teplá",
    cold: "Studená",
    startup: "Jas po zapnutí",
    unchanged: "Neměnit",
    startupNote: "Platí pro zapnutí tlačítkem na lampě a z aplikace Xiaomi; odsud se lampa zapne rovnou tímto jasem.",
    map: "Mapa",
    noMap: "Mapa není dostupná",
    battery: "Baterie",
    lastClean: "Poslední úklid",
    clean: "Uklidit",
    pause: "Pozastavit",
    dock: "Do doku",
    suction: "Sací výkon",
    speeds: { Silent: "Tichý", Basic: "Standardní", Strong: "Silný", "Full Speed": "Maximum" }
  }
}, ps = {
  cardDescription: "The control centre of the house: what needs you and the controls in one place.",
  title: "House",
  needsYou: "Needs you",
  nothingWaits: "Nothing is waiting for you",
  retry: "Try again",
  snooze: "Later",
  snoozeFor: { day: "A day", weekend: "To the weekend", week: "A week", month: "A month" },
  done: "Done",
  battery: (i) => i ? `Battery ${i}` : "Low battery",
  filter: (i, t) => `Clean the filter · ${i} of ${t}`,
  laundry: (i) => i ? `Laundry waiting · since ${i}` : "Laundry waiting",
  /** A leak sensor reports water (the first row of „Potřebuje tebe“): "Únik vody · od 14:32". */
  leak: (i) => i ? `Water leak · since ${i}` : "Water leak",
  cycles: (i, t) => `${i} of ${t} cycles`,
  running: "Running now",
  nothingRuns: "Nothing is running",
  minutes: (i) => `${i} min`,
  hours: (i, t) => t ? `${i} h ${t} min` : `${i} h`,
  covers: "Blinds",
  coversDetail: "Blinds in detail",
  close: "Close",
  log: "What happened",
  logNew: (i, t) => `${i} new ${i === 1 ? "event" : "events"} since ${t}`,
  logToday: (i) => `${i} ${i === 1 ? "event" : "events"} today`,
  logNothingNew: "Nothing new",
  logSince: "Since you last looked",
  logEarlier: "Earlier today",
  logEmpty: "Nothing happened today.",
  logFailed: "The logbook could not be loaded.",
  rules: "House rules",
  rulesCount: (i) => `${i} ${i === 1 ? "automation" : "automations"}`,
  rulesLoading: "Loading…",
  rulesFailed: "The rules could not be loaded.",
  health: "Health",
  healthAttention: "Needs attention",
  healthBatteries: "Sensor batteries",
  healthLowest: (i) => `Lowest ${i}`,
  healthConnections: "Connections",
  healthAllOnline: "All connected",
  healthOfflineCount: (i) => `${i} offline`,
  healthOnline: "Connected",
  healthOffline: "Offline",
  healthSystem: "System",
  healthOk: "OK",
  healthProblem: "Problem",
  healthUpdates: "Updates",
  healthUpdatesCount: (i) => `${i} available`,
  healthUpToDate: "All up to date",
  logRuns: "Running",
  logFinished: "Finished",
  logLaundryWaits: "Laundry waiting",
  logLaundryOut: "Laundry taken out",
  logLeak: "Water leak",
  logLeakOver: "Dry",
  climate: {
    rooms: "Rooms",
    temperature: "Target temperature",
    mode: "Mode",
    modes: { plan: "Schedule", manual: "Manual", boost: "Boost", off: "Off", cool: "Cooling", wind_free: "WindFree", heat: "Heating", fan_only: "Fan", dry: "Drying", auto: "Auto", sleep: "Sleep" },
    unavailable: "Unavailable",
    now: (i) => `Now ${i}`,
    heats: "heating",
    targets: (i) => `Target: ${i}`,
    mixedModes: (i) => `Different modes: ${i}`,
    firstChange: "The first change sets all selected rooms the same.",
    manualFor: "Manual holds",
    offFor: "Off holds",
    manualForChoices: { next: "Until schedule", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Always" },
    offAfter: "Turn off in",
    offAfterChoices: { 0: "Never", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Until the next change of the schedule, then back to the schedule.",
    untilTime: (i) => `Until ${i}, then back to the schedule.`,
    untilChanged: "Holds until you change it.",
    offUntilNextPlan: "Off until the next change of the schedule, then back to the schedule.",
    offUntilTime: (i) => `Off until ${i}, then back to the schedule.`,
    offUntilChanged: "Off until you turn it on.",
    runsUntilOff: "Runs until you turn it off.",
    offAt: (i) => `Runs until ${i}, then turns off.`,
    fan: "Fan speed",
    swing: "Air direction",
    fanModes: { auto: "Auto", low: "Low", medium: "Medium", high: "High", turbo: "Turbo", quiet: "Quiet" },
    swingModes: { off: "Fixed", vertical: "Vertical", horizontal: "Horizontal", both: "Both" },
    detail: "Details and history",
    sending: "Sending",
    failed: "It did not work"
  },
  who: { morning: "Morning phase", noon: "Noon phase", evening: "Evening phase", night: "Night phase", vetrani: "Airing mode", aplikace: "App", automatika: "Automation", rucne: "By hand" },
  notArrived: (i) => `Did not arrive ${i}`,
  notArrivedTo: (i) => `Did not reach ${i}`,
  ventilation: "Ventilation",
  ventilationMode: "Airing mode",
  heating: "Heating",
  cooling: "Air conditioning",
  off: "Off",
  on: "On",
  runs: (i) => `Running ${i}`,
  unavailable: "Unavailable",
  schedule: "Schedule",
  manual: "Manual",
  manualCount: (i) => `${i} manual`,
  resume: "Back to schedule",
  allOff: "Turn all off",
  hint: "Hold or tap twice",
  mode: { cool: "Cooling", wind_free: "WindFree", heat: "Heating", fan_only: "Fan", dry: "Drying", auto: "Auto" },
  failed: "It did not work",
  device: {
    light: "On",
    brightness: "Brightness",
    colour: "Colour",
    temperature: "Colour temperature",
    warm: "Warm",
    cold: "Cool",
    startup: "Brightness when switched on",
    unchanged: "Unchanged",
    startupNote: "Applies when switched on by its button or from the Xiaomi app; here it comes on at this brightness at once.",
    map: "Map",
    noMap: "Map not available",
    battery: "Battery",
    lastClean: "Last cleaning",
    clean: "Clean",
    pause: "Pause",
    dock: "Dock",
    suction: "Suction",
    speeds: { Silent: "Quiet", Basic: "Standard", Strong: "Strong", "Full Speed": "Max" }
  }
}, ms = {
  cardDescription: "Husets kontrollcenter: vad som behöver dig och styrningen på ett ställe.",
  title: "Hus",
  needsYou: "Behöver dig",
  nothingWaits: "Inget väntar på dig",
  retry: "Försök igen",
  snooze: "Senare",
  snoozeFor: { day: "En dag", weekend: "Till helgen", week: "En vecka", month: "En månad" },
  done: "Klart",
  battery: (i) => i ? `Batteri ${i}` : "Svagt batteri",
  filter: (i, t) => `Rengör filtret · ${i} av ${t}`,
  laundry: (i) => i ? `Tvätt väntar · sedan ${i}` : "Tvätt väntar",
  /** A leak sensor reports water (the first row of „Potřebuje tebe“): "Únik vody · od 14:32". */
  leak: (i) => i ? `Vattenläcka · sedan ${i}` : "Vattenläcka",
  cycles: (i, t) => `${i} av ${t} cykler`,
  running: "Körs nu",
  nothingRuns: "Inget körs",
  minutes: (i) => `${i} min`,
  hours: (i, t) => t ? `${i} h ${t} min` : `${i} h`,
  covers: "Persienner",
  coversDetail: "Persienner i detalj",
  close: "Stäng",
  log: "Vad hände",
  logNew: (i, t) => `${i} ${i === 1 ? "ny händelse" : "nya händelser"} sedan ${t}`,
  logToday: (i) => `${i} ${i === 1 ? "händelse" : "händelser"} i dag`,
  logNothingNew: "Inget nytt",
  logSince: "Sedan du tittade senast",
  logEarlier: "Tidigare i dag",
  logEmpty: "Inget har hänt i dag.",
  logFailed: "Loggboken kunde inte läsas in.",
  rules: "Husets regler",
  rulesCount: (i) => `${i} ${i === 1 ? "automation" : "automationer"}`,
  rulesLoading: "Läser in…",
  rulesFailed: "Reglerna kunde inte läsas in.",
  health: "Hälsa",
  healthAttention: "Kräver uppmärksamhet",
  healthBatteries: "Sensorbatterier",
  healthLowest: (i) => `Lägst ${i}`,
  healthConnections: "Anslutningar",
  healthAllOnline: "Allt anslutet",
  healthOfflineCount: (i) => `${i} frånkopplade`,
  healthOnline: "Ansluten",
  healthOffline: "Frånkopplad",
  healthSystem: "System",
  healthOk: "OK",
  healthProblem: "Problem",
  healthUpdates: "Uppdateringar",
  healthUpdatesCount: (i) => `${i} tillgängliga`,
  healthUpToDate: "Allt är uppdaterat",
  logRuns: "Kör",
  logFinished: "Klar",
  logLaundryWaits: "Tvätten väntar",
  logLaundryOut: "Tvätten urtagen",
  logLeak: "Vattenläcka",
  logLeakOver: "Torrt",
  climate: {
    rooms: "Rum",
    temperature: "Måltemperatur",
    mode: "Läge",
    modes: { plan: "Schema", manual: "Manuellt", boost: "Boost", off: "Av", cool: "Kylning", wind_free: "WindFree", heat: "Värme", fan_only: "Fläkt", dry: "Avfuktning", auto: "Auto", sleep: "Sömn" },
    unavailable: "Ej tillgänglig",
    now: (i) => `Nu ${i}`,
    heats: "värmer",
    targets: (i) => `Mål: ${i}`,
    mixedModes: (i) => `Olika lägen: ${i}`,
    firstChange: "Första ändringen ställer alla valda rum lika.",
    manualFor: "Manuellt gäller",
    offFor: "Av gäller",
    manualForChoices: { next: "Till schemat", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Alltid" },
    offAfter: "Stäng av om",
    offAfterChoices: { 0: "Aldrig", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Till nästa ändring i schemat, sedan tillbaka till schemat.",
    untilTime: (i) => `Till ${i}, sedan tillbaka till schemat.`,
    untilChanged: "Gäller tills du ändrar det.",
    offUntilNextPlan: "Av till nästa ändring i schemat, sedan tillbaka till schemat.",
    offUntilTime: (i) => `Av till ${i}, sedan tillbaka till schemat.`,
    offUntilChanged: "Av tills du slår på den.",
    runsUntilOff: "Går tills du stänger av den.",
    offAt: (i) => `Går till ${i}, stängs sedan av.`,
    fan: "Fläkthastighet",
    swing: "Luftriktning",
    fanModes: { auto: "Auto", low: "Låg", medium: "Medel", high: "Hög", turbo: "Turbo", quiet: "Tyst" },
    swingModes: { off: "Fast", vertical: "Vertikalt", horizontal: "Horisontellt", both: "Båda" },
    detail: "Detaljer och historik",
    sending: "Skickar",
    failed: "Det gick inte"
  },
  who: { morning: "Morgonfas", noon: "Middagsfas", evening: "Kvällsfas", night: "Nattfas", vetrani: "Vädringsläge", aplikace: "Appen", automatika: "Automatik", rucne: "För hand" },
  notArrived: (i) => `Kom inte fram ${i}`,
  notArrivedTo: (i) => `Nådde inte ${i}`,
  ventilation: "Ventilation",
  ventilationMode: "Vädringsläge",
  heating: "Värme",
  cooling: "Luftkonditionering",
  off: "Av",
  on: "På",
  runs: (i) => `Går ${i}`,
  unavailable: "Otillgänglig",
  schedule: "Schema",
  manual: "Manuellt",
  manualCount: (i) => `${i} manuellt`,
  resume: "Tillbaka till schemat",
  allOff: "Stäng av alla",
  hint: "Håll eller tryck två gånger",
  mode: { cool: "Kyla", wind_free: "WindFree", heat: "Värme", fan_only: "Fläkt", dry: "Torkning", auto: "Auto" },
  failed: "Det gick inte",
  device: {
    light: "Tänd",
    brightness: "Ljusstyrka",
    colour: "Färg",
    temperature: "Färgtemperatur",
    warm: "Varm",
    cold: "Kall",
    startup: "Ljusstyrka vid tändning",
    unchanged: "Oförändrad",
    startupNote: "Gäller när den tänds med knappen eller i Xiaomi-appen; här tänds den direkt med denna ljusstyrka.",
    map: "Karta",
    noMap: "Kartan är inte tillgänglig",
    battery: "Batteri",
    lastClean: "Senaste städning",
    clean: "Städa",
    pause: "Pausa",
    dock: "Till dockan",
    suction: "Sugkraft",
    speeds: { Silent: "Tyst", Basic: "Standard", Strong: "Stark", "Full Speed": "Max" }
  }
}, fs = { cs: us, en: ps, sv: ms };
function Ie(i, t) {
  return ls(fs, i, t);
}
const gs = Y`
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
    --dd-alert: #ff6961;
    --dd-alert-bg: rgb(255 66 69 / 18%);
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
    /* Selected segment: grey #636366 with white text in the dark, white with black in the light (uživatel 16. 11. 2026: „Q289 dark V4, light V0“). */
    --hdk-seg-thumb: #636366;
    --hdk-seg-text: #ebebf5;
    --hdk-seg-selected: #ffffff;
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
    --dd-alert: #c4001a;
    --dd-alert-bg: rgb(196 0 26 / 10%);
    --hdk-tile-on: #d8e8f8;
    --hdk-tile-on-text: #000000;
    --hdk-tile-on-sub: #0a5cb0;
    --hdk-tile-on-border: #0a6ed1;
    --hdk-tile-mixed: #e6eff9;
    --hdk-tile-badge: rgb(60 60 67 / 14%);
    --hdk-track: #f2f2f7;
    --hdk-track-compact: #e5e5ea;
    --hdk-seg-thumb: #ffffff;
    --hdk-seg-selected: #000000;
    --hdk-bar: rgb(60 60 67 / 18%);
    --hdk-tick: rgb(60 60 67 / 30%);
    --hdk-seg-text: #000000;
  }
  ha-card {
    /* Never wider than the screen: whatever does not fit wraps inside (overflow-wrap) or is clipped, the page never scrolls sideways. */
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: clip;
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
  /* Popup of a light or a vacuum (CURRENT_SPEC.md, Popupy zařízení): rows of settings, each a name and value over a slider. */
  .device-detail {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 44px;
    font-size: 17px;
    line-height: 22px;
  }
  .setting {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .setting-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    font-size: 17px;
    line-height: 22px;
  }
  .setting-value {
    color: var(--dd-secondary);
    font-variant-numeric: tabular-nums;
  }
  /* A setting that does not change the light now (Jas po zapnutí) stands apart from the live ones. */
  .setting.apart {
    padding-top: 16px;
    border-top: 0.5px solid var(--dd-sep);
  }
  .swatch {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 20%);
    vertical-align: middle;
  }
  .setting small {
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .vacuum-map {
    display: block;
    width: 100%;
    max-height: 360px;
    margin: 0;
    object-fit: contain;
    border-radius: 12px;
    background: var(--dd-card);
  }
  .vacuum-map.empty {
    display: grid;
    place-items: center;
    min-height: 120px;
    color: var(--dd-secondary);
    font-size: 15px;
  }
  .vacuum-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
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
    overflow-wrap: anywhere;
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
    /* A long reason wraps, never pushes the card wider than the screen (iPhone). */
    overflow-wrap: anywhere;
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
  .mark.alert {
    background: var(--dd-alert-bg);
    color: var(--dd-alert);
  }
  .row small.alert {
    color: var(--dd-alert);
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
  /* An icon button (Zkusit znovu): a 44 px circle. */
  .button.icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    padding: 0;
  }
  .button.icon svg {
    width: 22px;
    height: 22px;
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
`, bs = ["unavailable", "unknown", ""], vs = ["opening", "closing"], $s = 6e4;
function Et(i) {
  return typeof i.when == "number" ? i.when * 1e3 : Date.parse(i.when);
}
function Ce(i) {
  return i.context_name || i.context_entity_id_name || (i.context_user_id ? "app" : "");
}
function ys(i, t) {
  const e = i.filter((a) => typeof a.entity_id == "string" && a.state !== void 0).sort((a, r) => Et(a) - Et(r)), n = /* @__PURE__ */ new Map(), s = [];
  for (const a of e) {
    const r = String(a.state);
    if (vs.includes(r)) {
      const h = Ce(a);
      h && n.set(a.entity_id, h);
      continue;
    }
    const d = Ce(a) || n.get(a.entity_id) || "";
    n.delete(a.entity_id), !bs.includes(r) && s.push({ entry: a, time: Et(a), state: r, reason: d, kind: t(a.entity_id) });
  }
  const o = [];
  for (const a of s) {
    const r = o.at(-1), d = a.reason === "app" && r?.some((h) => h.reason === "app");
    r && !d && a.time - r[r.length - 1].time <= $s ? r.push(a) : o.push([a]);
  }
  return o.map((a) => {
    const r = /* @__PURE__ */ new Map();
    for (const l of a)
      r.delete(l.entry.entity_id), r.set(l.entry.entity_id, l);
    const d = [...r.values()].sort((l, m) => l.time - m.time), h = d.find((l) => l.reason === "app") ?? d[0], u = [];
    for (const l of d) {
      if (l === h) continue;
      const m = l.kind || l.entry.entity_id, p = u.find(($) => ($.kind || $.items[0].entry.entity_id) === m && $.state === l.state);
      p ? p.items.push(l) : u.push({ kind: l.kind, state: l.state, items: [l] });
    }
    return { time: h.time, head: h, groups: u };
  }).sort((a, r) => r.time - a.time);
}
function xs(i) {
  const t = i.map((n) => n.split(" "));
  let e = 0;
  for (; t.every((n) => n.length > e + 1 && n[e] === t[0][e]); ) e += 1;
  return t.map((n) => {
    const s = n.slice(e).join(" ");
    return s.charAt(0).toLocaleUpperCase() + s.slice(1);
  });
}
var ws = Object.defineProperty, V = (i, t, e, n) => {
  for (var s = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (s = a(t, e, s) || s);
  return s && ws(t, e, s), s;
};
const He = "dum-dashboard.log-seen";
function ks() {
  try {
    return Number(localStorage.getItem(He)) || 0;
  } catch {
    return 0;
  }
}
function _s(i) {
  try {
    localStorage.setItem(He, String(i));
  } catch {
  }
}
const Ss = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="8" width="16" height="8" rx="2"></rect><path d="M21 11v2" stroke-linecap="round"></path><rect x="5" y="10" width="3" height="4" fill="currentColor" stroke="none"></rect></svg>`, As = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.34-5.66"></path><path d="M20 4v5h-5"></path></svg>`, Ct = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>`, Ms = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7.5V12l3 2"></path></svg>`, Cs = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 8v8M12 8v8M16 8v8"></path></svg>`, Ts = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2.5"></rect><circle cx="12" cy="13" r="4.5"></circle><path d="M7.5 6.5h2" stroke-linecap="round"></path></svg>`, Es = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3.5c3 4 5.5 7 5.5 10.2a5.5 5.5 0 0 1-11 0C6.5 10.5 9 7.5 12 3.5z" stroke-linejoin="round"></path></svg>`, Ns = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.6-.6-2.6z"></path></svg>`, de = class de extends W {
  constructor() {
    super(...arguments), this._error = "", this._now = Date.now(), this.coverHistory = {}, this._seen = ks(), this.pending = new Qn(() => this.requestUpdate()), this._climateSelected = [], this._fit = "", this.starts = new Jn(() => this.requestUpdate()), this.gesture = new jt(() => ({
      holdMs: this._config?.guard.holdMs ?? 550,
      doubleTapMs: this._config?.guard.doubleTapMs ?? 400
    })), this.closeMenu = (t) => {
      this._menu && (t instanceof KeyboardEvent ? t.key === "Escape" : !t.composedPath().some((e) => e instanceof Element && e.classList.contains("snooze"))) && (this._menu = void 0);
    };
  }
  setConfig(t) {
    this._config = ns(t);
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
    Ot(this.renderRoot, this._fit), t.has("_detail") && this._detail && this.renderRoot.querySelector("dd-sheet")?.updateComplete?.then(() => Ot(this.renderRoot, this._fit));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer), window.clearInterval(this.logTimer), this.pending.clear(), window.clearTimeout(this.hintTimer), window.removeEventListener("pointerdown", this.closeMenu), window.removeEventListener("keydown", this.closeMenu), this.resize?.disconnect(), this.gesture.dispose();
  }
  willUpdate(t) {
    t.has("hass") && (this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1), this._now = Date.now(), t.get("hass") || this.loadLog(), this.pending.check(this.hass));
  }
  get i18n() {
    return Ie(ss(this._config?.language ?? "auto", this.hass), this.hass);
  }
  name(t) {
    return Kn(t, this.i18n.language) ?? "";
  }
  render() {
    const t = this._config;
    if (!t) return f;
    const e = this.i18n, s = t.houseMode !== void 0 && N(this.hass, t.houseMode) === t.summer ? [this.renderCooling(t, e), this.renderHeating(t, e)] : [this.renderHeating(t, e), this.renderCooling(t, e)];
    return c`<ha-card>
      ${this.renderQueue(t, e)} ${this.renderRunning(t, e)} ${this.renderCovers(t, e)}
      ${this.renderVentilation(t, e)} ${s} ${this.renderDevices(t, e)} ${this.renderHealth(t, e)} ${this.renderLogRow(t, e)}
      ${this._error ? c`<div class="error" role="alert">${this._error}</div>` : f}
    </ha-card>
    ${this.renderCoversDetail(t, e)} ${this.renderClimate(t, e)} ${this.renderLog(t, e)} ${this.renderHealthDetail(t, e)} ${this.renderRules(e)} ${this.renderDeviceDetail(t, e)}`;
  }
  /* ---------- Zdraví ---------- */
  /** The state of each part of Zdraví: what needs attention first, then one summary line per part. */
  healthState(t, e) {
    const n = e.t, s = t.health, o = s.batteries.map((l) => ({ item: l, level: ct(this.hass, l.entity) })).sort((l, m) => (l.level ?? -1) - (m.level ?? -1)), a = s.connections.map((l) => ({ item: l, state: N(this.hass, l.entity) })), r = s.system.map((l) => {
      const m = A(this.hass, l.entity), p = l.entity.startsWith("binary_sensor."), $ = this.hass, b = !m || J(m.state) ? n.unavailable : p ? m.state === "on" ? n.healthProblem : n.healthOk : $?.formatEntityState ? $.formatEntityState(m) : m.state, w = !p && l.entity.endsWith("_status") && m !== void 0 && !J(m.state) && m.state !== "normal", g = l.max !== void 0 && m !== void 0 && Number.isFinite(Number(m.state)) && Number(m.state) > l.max;
      return { item: l, value: b, problem: p && m?.state === "on" || w || g };
    }), d = s.updates ? Object.entries(this.hass?.states ?? {}).filter(([l, m]) => l.startsWith("update.") && m.state === "on").map(([l, m]) => ({ id: l, name: typeof m.attributes.friendly_name == "string" ? m.attributes.friendly_name : l, version: String(m.attributes.latest_version ?? "") })).sort((l, m) => l.name.localeCompare(m.name)) : [], h = this.snoozed(t), u = [
      // A weak battery the queue „Potřebuje tebe“ already shows is not said twice (uživatel 14. 11. 2026: „Q224 A“).
      ...o.filter(({ item: l, level: m }) => m !== void 0 && m < s.batteryLow && !t.batteries.some((p) => p.level === l.entity && N(this.hass, p.low) === "on")).map(({ item: l, level: m }) => ({ entity: l.entity, name: this.name(l.name), detail: n.battery(e.percent(Math.round(m))) })),
      ...a.filter(({ state: l }) => l !== "on").map(({ item: l }) => ({ entity: l.entity, name: this.name(l.name), detail: n.healthOffline })),
      ...r.filter(({ problem: l }) => l).map(({ item: l, value: m }) => ({ entity: l.entity, name: this.name(l.name), detail: m }))
    ].filter((l) => !h.has(`health:${l.entity}`));
    return { batteries: o, connections: a, system: r, updates: d, attention: u };
  }
  renderHealth(t, e) {
    const n = t.health;
    if (!n.batteries.length && !n.connections.length && !n.system.length && !n.updates) return f;
    const s = e.t, o = this.healthState(t, e), a = o.batteries.find(({ level: l }) => l !== void 0), r = o.connections.filter(({ state: l }) => l !== "on").length, d = o.system.filter(({ problem: l }) => l).length, h = (l) => o.attention.some((m) => l.some((p) => p.entity === m.entity)), u = (l, m, p, $ = !1) => c`<button class="row link-row" type="button" aria-haspopup="dialog" data-health=${l} @click=${() => this._detail = `health:${l}`}>
      <span class="main">${m}<small class=${$ ? "warn" : ""}>${p}</small></span>
      <span class="chevron-mark" aria-hidden="true">›</span>
    </button>`;
    return c`<h2><span>${s.health}</span></h2>
      <div class="group" data-part="health">
        ${o.attention.map(
      (l) => c`<div class="row" data-row="attention" data-entity=${l.entity}>
            <span class="mark warn" aria-hidden="true">!</span>
            <span class="main">${l.name}<small class="warn">${pt([s.healthAttention, l.detail])}</small></span>
            ${this.snoozeButton(t, `health:${l.entity}`, e, l.name)}
          </div>`
    )}
        ${n.batteries.length ? a ? u("batteries", s.healthBatteries, s.healthLowest(`${this.name(a.item.name)} ${e.percent(Math.round(a.level))}`), a.level < n.batteryLow) : u("batteries", s.healthBatteries, s.unavailable, !0) : f}
        ${n.connections.length ? u("connections", s.healthConnections, r ? s.healthOfflineCount(r) : s.healthAllOnline, h(n.connections)) : f}
        ${n.system.length ? u("system", s.healthSystem, d ? s.healthProblem : s.healthOk, h(n.system)) : f}
        ${n.updates ? u("updates", s.healthUpdates, o.updates.length ? s.healthUpdatesCount(o.updates.length) : s.healthUpToDate) : f}
      </div>`;
  }
  renderHealthDetail(t, e) {
    const n = e.t, s = this._detail?.startsWith("health:") ? this._detail.slice(7) : void 0, o = { batteries: n.healthBatteries, connections: n.healthConnections, system: n.healthSystem, updates: n.healthUpdates }, a = s ? this.healthState(t, e) : void 0, r = (h, u, l, m) => c`<div class="health-row ${m ? "tap" : ""}" @click=${m ? () => this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: !0, composed: !0, detail: { entityId: m } })) : void 0}>
        <span class="main">${h}</span><span class="value ${l ? "warn" : ""}">${u}</span>
      </div>`, d = () => !a || !s ? f : s === "batteries" ? a.batteries.map(({ item: h, level: u }) => r(this.name(h.name), u === void 0 ? n.unavailable : e.percent(Math.round(u)), u !== void 0 && u < t.health.batteryLow)) : s === "connections" ? a.connections.map(({ item: h, state: u }) => r(this.name(h.name), u === "on" ? n.healthOnline : n.healthOffline, u !== "on")) : s === "system" ? a.system.map(({ item: h, value: u, problem: l }) => r(this.name(h.name), u, l)) : a.updates.length ? a.updates.map((h) => r(h.name, h.version, !1, h.id)) : c`<p class="log-empty">${n.healthUpToDate}</p>`;
    return c`<dd-sheet .open=${s !== void 0} .heading=${s ? o[s] : ""} .closeLabel=${n.close} @hdk-close=${() => this._detail = void 0}>
      ${s ? c`<div class="detail" data-part="health-detail">${d()}</div>` : f}
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
      ...t.leaks.map((e) => e.entity),
      ...t.devices.flatMap((e) => e.entities.map((n) => n.entity))
    ];
  }
  async loadLog() {
    const t = this._config, e = this.hass;
    if (!t || !e?.callWS) return;
    const n = this.logEntities(t);
    if (!n.length) return;
    const s = /* @__PURE__ */ new Date();
    s.setHours(0, 0, 0, 0);
    try {
      const o = await e.callWS({ type: "logbook/get_events", start_time: s.toISOString(), entity_ids: n });
      await this.loadCoverHistory(t, s), this._log = Array.isArray(o) ? o : [];
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
        }), s = {};
        for (const [o, a] of Object.entries(n ?? {})) {
          let r;
          s[o] = (Array.isArray(a) ? a : []).flatMap((d) => {
            const h = Number(d.a?.current_position ?? r?.position), u = Number(d.a?.current_tilt_position ?? r?.tilt), l = Number(d.lu ?? d.lc) * 1e3;
            return !Number.isFinite(h) || !Number.isFinite(u) || !Number.isFinite(l) ? [] : (r = { position: h, tilt: u }, [{ time: l, position: h, tilt: u }]);
          });
        }
        this.coverHistory = s;
      } catch {
      }
  }
  /** The preset a blind was in at `time` (from the recorder), or undefined. */
  presetAt(t, e, n) {
    const s = this.coverHistory[e] ?? [];
    let o;
    for (const a of s) a.time <= n + 6e4 && (o = a);
    if (o)
      return t.covers.presets.find((a) => Math.abs(o.position - a.position) <= t.covers.tolerance && Math.abs(o.tilt - a.tilt) <= t.covers.tolerance);
  }
  /** Which entities are one kind: one action on several of them is one row. */
  logKind(t) {
    const e = /* @__PURE__ */ new Map();
    return t.covers.entities.forEach((n) => e.set(n, "covers")), t.ventilation.fans.forEach((n) => e.set(n.entity, "ventilation")), t.heating.rooms.forEach((n) => e.set(n.entity, "heating")), t.cooling.rooms.forEach((n) => e.set(n.entity, "cooling")), t.devices.forEach((n, s) => n.entities.forEach((o) => e.set(o.entity, `devices-${s}`))), (n) => e.get(n) ?? "";
  }
  /** Pračka, sušička, myčka in words („Sušička · Doběhla“), not their helpers („Sušička běží · Vypnuto“). */
  logTitle(t, e, n, s) {
    const o = s.t, a = t.running.find((h) => h.entity === e.entity_id);
    if (a) return `${this.name(a.name)} · ${n === "on" ? o.logRuns : o.logFinished}`;
    const r = t.laundry.find((h) => h.entity === e.entity_id);
    if (r) return `${this.name(r.name)} · ${n === "on" ? o.logLaundryWaits : o.logLaundryOut}`;
    const d = t.leaks.find((h) => h.entity === e.entity_id);
    return d ? `${this.name(d.name)} · ${n === "on" ? o.logLeak : o.logLeakOver}` : `${this.logName(e)} · ${this.logState(e, n)}`;
  }
  /**
   * The reason of a blind when the logbook has none: the helper of the last action of each blind says who sent it
   * (the same source as the detail of the blinds), when its time is just before the entry.
   */
  coverReason(t, e, n) {
    if (e.reason || e.kind !== "covers") return e.reason === "app" ? n.t.who.aplikace : e.reason;
    const s = A(this.hass, t.covers.lastAction)?.attributes.polozky, o = s && typeof s == "object" ? s[e.entry.entity_id] : void 0, a = typeof o?.cas == "string" ? Date.parse(o.cas) : NaN;
    return !o || typeof o.kdo != "string" || !(a <= e.time && e.time - a <= 3 * 6e4) ? "" : n.t.who[o.kdo] ?? o.kdo;
  }
  /** „Sušička - konec cyklu“ under „Sušička · Doběhla“ says the name twice: the reason without it („Konec cyklu“). */
  withoutName(t, e, n) {
    const s = e.entry.entity_id, o = [...n.running, ...n.laundry, ...n.leaks].find((d) => d.entity === s), a = o ? this.name(o.name) : this.logName(e.entry);
    if (!t.toLocaleLowerCase().startsWith(a.toLocaleLowerCase())) return t;
    const r = t.slice(a.length).replace(/^[\s\-–—·:]+/, "");
    return r ? r.charAt(0).toLocaleUpperCase() + r.slice(1) : t;
  }
  /** Where an entity is in the configuration (its section and its place in it), for the order of lists. */
  configIndex(t, e) {
    const n = [
      t.covers.entities,
      [t.ventilation.mode ?? "", ...t.ventilation.fans.map((s) => s.entity)],
      t.heating.rooms.map((s) => s.entity),
      t.cooling.rooms.map((s) => s.entity),
      ...t.devices.map((s) => s.entities.map((o) => o.entity))
    ];
    for (const s of n) {
      const o = s.indexOf(e);
      if (o >= 0) return o;
    }
    return 999;
  }
  /** The name the card uses for an entity (Větrací režim, the room of a blind or a fan), else Home Assistant's. */
  shortName(t, e) {
    const n = e.entity_id;
    if (n === t.ventilation.mode) return this.i18n.t.ventilationMode;
    if (t.covers.names[n] !== void 0) return this.name(t.covers.names[n]);
    const s = [...t.ventilation.fans, ...t.heating.rooms, ...t.cooling.rooms, ...t.running, ...t.laundry, ...t.leaks, ...t.devices.flatMap((o) => o.entities)].find(
      (o) => o.entity === n
    );
    return s ? this.name(s.name) : void 0;
  }
  logName(t) {
    if (this._config && t.entity_id === this._config.ventilation.mode) return this.i18n.t.ventilationMode;
    const e = A(this.hass, t.entity_id);
    return t.name || (typeof e?.attributes.friendly_name == "string" ? e.attributes.friendly_name : t.entity_id);
  }
  logState(t, e) {
    const n = e.startsWith("preset:") ? this._config?.covers.presets[Number(e.slice(7))] : void 0;
    if (n) return this.name(n.name);
    const s = this.hass, o = A(this.hass, t.entity_id);
    return o && s?.formatEntityState ? s.formatEntityState(o, e) : e;
  }
  /** A blind in the journal says its preset („Žaluzie · Tma“, uživatel 13. 11. 2026: „Q220 zatím A“), else its state. */
  logRows(t) {
    const e = (this._log ?? []).map((n) => {
      if (!t.covers.entities.includes(n.entity_id) || ["opening", "closing"].includes(String(n.state))) return n;
      const s = this.presetAt(t, n.entity_id, Et(n));
      return s ? { ...n, state: `preset:${t.covers.presets.indexOf(s)}` } : n;
    });
    return ys(e, this.logKind(t));
  }
  renderLogRow(t, e) {
    if (!this.logEntities(t).length) return f;
    const n = e.t, s = this.logRows(t).filter((d) => d.time > this._seen).length, o = /* @__PURE__ */ new Date();
    o.setHours(0, 0, 0, 0);
    const a = this._seen < o.getTime(), r = this._log === void 0 ? "" : s ? a ? n.logToday(s) : n.logNew(s, e.time(this._seen)) : n.logNothingNew;
    return c`<div class="group" data-part="log">
      <button class="row link-row" type="button" aria-haspopup="dialog" @click=${() => this.openLog()}>
        <span class="main">${n.log}${r ? c`<small>${r}</small>` : f}</span>
        <span class="chevron-mark" aria-hidden="true">›</span>
      </button>
      ${this.isAdmin ? c`<button class="row link-row" type="button" aria-haspopup="dialog" data-row="rules" @click=${() => this.openRules()}>
            <span class="main">${n.rules}</span>
            <span class="chevron-mark" aria-hidden="true">›</span>
          </button>` : f}
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
    const e = Object.entries(t.states).filter(([s]) => s.startsWith("automation."));
    this._rules = void 0;
    let n = 0;
    try {
      const s = await Promise.all(
        e.map(async ([o, a]) => {
          const r = await t.callWS({ type: "automation/config", entity_id: o }).catch(() => {
            n += 1;
          }), d = r?.config?.alias ?? (typeof a.attributes.friendly_name == "string" ? a.attributes.friendly_name : o);
          return { id: o, name: d, description: (r?.config?.description ?? "").trim(), on: a.state === "on" };
        })
      );
      this._rules = e.length && n === e.length ? "failed" : s.sort((o, a) => o.name.localeCompare(a.name, this.i18n.language));
    } catch {
      this._rules = "failed";
    }
  }
  renderRules(t) {
    if (!this.isAdmin) return f;
    const e = t.t, n = this._detail === "rules", s = this._rules;
    return c`<dd-sheet .open=${n} .heading=${e.rules} .sub=${Array.isArray(s) ? e.rulesCount(s.length) : ""} .closeLabel=${e.close} @hdk-close=${() => this._detail = void 0}>
      ${n ? c`<div class="detail" data-part="rules-detail">
            ${s === "failed" ? c`<p class="log-empty">${e.rulesFailed}</p>` : s === void 0 ? c`<p class="log-empty">${e.rulesLoading}</p>` : s.map(
      (o) => c`<button type="button" class="rule" @click=${() => this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: !0, composed: !0, detail: { entityId: o.id } }))}>
                      <span class="main">${o.name}${o.on ? f : c` <span class="rule-off">· ${e.off}</span>`}${o.description ? c`<small>${o.description}</small>` : f}</span>
                      <span class="chevron-mark" aria-hidden="true">›</span>
                    </button>`
    )}
          </div>` : f}
    </dd-sheet>`;
  }
  openLog() {
    this._detail = "log", this.loadLog();
  }
  closeLog() {
    this._detail = void 0, this._seen = Date.now(), _s(this._seen);
  }
  renderLog(t, e) {
    if (!this.logEntities(t).length) return f;
    const n = e.t, s = this._detail === "log", o = this.logRows(t), a = o.filter((u) => u.time > this._seen), r = o.filter((u) => u.time <= this._seen), d = {
      covers: n.covers,
      ventilation: n.ventilation,
      heating: n.heating,
      cooling: n.cooling,
      ...Object.fromEntries(t.devices.map((u, l) => [`devices-${l}`, this.name(u.name)]))
    }, h = (u) => u.map((l) => {
      const m = l.head, p = this.withoutName(this.coverReason(t, m, e), m, t), $ = (y) => {
        const S = [...y].sort((_, D) => this.configIndex(t, _.entry.entity_id) - this.configIndex(t, D.entry.entity_id)), T = S.map((_) => this.shortName(t, _.entry));
        return (T.every((_) => _ !== void 0) ? T : xs(S.map((_) => this.logName(_.entry)))).join(", ");
      }, b = m.kind ? l.groups.find((y) => y.kind === m.kind && y.state === m.state) : void 0, w = b ? `${d[m.kind] ?? ""} · ${this.logState(m.entry, m.state)}` : this.logTitle(t, m.entry, m.state, e), g = l.groups.map((y) => {
        if (y === b) return $([m, ...y.items]);
        const S = this.logState(y.items[0].entry, y.state);
        return y.kind ? `${d[y.kind] ?? ""} · ${S}: ${$(y.items)}` : `${this.logName(y.items[0].entry)} · ${S}`;
      });
      return c`<div class="log-row"><span class="log-time">${e.time(l.time)}</span><span class="main"
            >${w}${p ? c`<small>${p}</small>` : f}${g.map((y) => c`<span class="log-members">${y}</span>`)}</span
          ></div>`;
    });
    return c`<dd-sheet .open=${s} .heading=${n.log} .closeLabel=${n.close} @hdk-close=${() => this.closeLog()}>
      ${s ? c`<div class="detail" data-part="log-detail">
            ${this._log === void 0 ? c`<p class="log-empty">${n.logFailed}</p>` : o.length ? c`${a.length ? c`<h3>${n.logSince}</h3>${h(a)}` : f}${r.length ? c`<h3>${n.logEarlier}</h3>${h(r)}` : f}` : c`<p class="log-empty">${n.logEmpty}</p>`}
          </div>` : f}
    </dd-sheet>`;
  }
  /* ---------- Potřebuje tebe ---------- */
  failed(t) {
    const e = A(this.hass, t.failedActions)?.attributes.polozky;
    return Array.isArray(e) ? e.filter((n) => typeof n == "object" && n !== null && typeof n.entita == "string") : [];
  }
  renderQueue(t, e) {
    if (!t.failedActions && !t.batteries.length && !t.filters.length && !t.laundry.length && !t.maintenance.length && !t.leaks.length) return f;
    const n = e.t, s = this.failed(t), o = this.snoozed(t), a = t.batteries.filter((p) => N(this.hass, p.low) === "on" && !o.has(`battery:${p.low}`)), r = this.dirtyFilters(t).filter(({ filter: p }) => !o.has(`filter:${p.hours}`)), d = t.laundry.filter((p) => N(this.hass, p.entity) === "on"), h = t.maintenance.flatMap((p) => {
      const $ = ct(this.hass, p.counter);
      return $ !== void 0 && $ >= p.every && !o.has(`maintenance:${p.counter}`) ? [{ item: p, cycles: $ }] : [];
    }), u = t.leaks.filter((p) => N(this.hass, p.entity) === "on"), l = u.length + s.length + a.length + r.length + d.length + h.length, m = [
      ...u.map((p) => {
        const $ = this.starts.of(this.hass, p.entity), b = $ !== void 0 && new Date($).toDateString() === new Date(this._now).toDateString(), w = $ === void 0 ? "" : b ? e.time($) : `${e.day($)} ${e.time($)}`;
        return c`<div class="row" data-row="leak" role="alert">
          <span class="mark alert" aria-hidden="true">${Es}</span>
          <span class="main">${this.name(p.name)}<small class="alert">${mt(n.leak(w))}</small></span>
        </div>`;
      }),
      ...s.map((p) => {
        const $ = t.covers.names[p.entita], b = A(this.hass, p.entita)?.attributes.friendly_name, w = typeof b == "string" ? b : $ !== void 0 ? this.name($) : void 0, g = p.cas ? Date.parse(p.cas) : NaN, y = this.failedGoal(t, p), S = y ? n.notArrivedTo(this.name(y.name)) : p.duvod || p.akce, T = pt([S ? S.charAt(0).toLocaleUpperCase(e.language) + S.slice(1) : void 0, Number.isFinite(g) ? e.time(g) : void 0].filter(Boolean)), _ = this.retryOf(t, p), D = typeof w == "string" ? w : p.entita, x = t.clearFailed ? this.iconButton(Ct, n.done, D, () => this.call("script", t.clearFailed.split(".")[1], { entita: p.entita })) : f;
        return c`<div class="row" data-row="failed">
          <span class="mark warn" aria-hidden="true">!</span>
          <span class="main">${D}<small>${T}</small></span>
          ${_ ? c`<span class="actions">
                <button class="button icon ${this.pending.has(`retry:${p.entita}`) ? "pending" : ""}" type="button" title=${n.retry} aria-label=${`${n.retry}: ${D}`} aria-busy=${this.pending.has(`retry:${p.entita}`) ? "true" : f} @click=${_}>${As}</button>
                ${x}
              </span>` : x}
        </div>`;
      }),
      ...a.map((p) => {
        const $ = ct(this.hass, p.level), b = N(this.hass, p.type), w = pt([n.battery($ === void 0 ? void 0 : e.percent(Math.round($))), b].filter(Boolean));
        return c`<div class="row" data-row="battery">
          <span class="mark">${Ss}</span>
          <span class="main">${this.name(p.name)}<small>${w}</small></span>
          ${this.snoozeButton(t, `battery:${p.low}`, e, this.name(p.name))}
        </div>`;
      }),
      ...r.map(({ filter: p, hours: $, threshold: b }) => {
        const w = (g) => `${e.whole(Math.floor(g))} h`;
        return c`<div class="row" data-row="filter">
          <span class="mark">${Cs}</span>
          <span class="main">${this.name(p.name)}<small>${mt(n.filter(w($), w(b)))}</small></span>
          <span class="actions">
            ${this.snoozeButton(t, `filter:${p.hours}`, e, this.name(p.name))}
            ${this.iconButton(Ct, n.done, this.name(p.name), () => this.call("input_number", "set_value", { entity_id: p.hours, value: 0 }))}
          </span>
        </div>`;
      }),
      ...h.map(({ item: p, cycles: $ }) => c`<div class="row" data-row="maintenance">
        <span class="mark">${Ns}</span>
        <span class="main">${this.name(p.name)}<small>${pt([this.name(p.task), n.cycles($, p.every)])}</small></span>
        <span class="actions">
          ${this.snoozeButton(t, `maintenance:${p.counter}`, e, this.name(p.name))}
          ${this.iconButton(Ct, n.done, this.name(p.name), () => this.call("counter", "reset", { entity_id: p.counter }))}
        </span>
      </div>`),
      ...d.map((p) => {
        const $ = this.starts.of(this.hass, p.entity), b = $ !== void 0 && new Date($).toDateString() === new Date(this._now).toDateString(), w = $ === void 0 ? "" : b ? e.time($) : e.day($);
        return c`<div class="row" data-row="laundry">
          <span class="mark">${Ts}</span>
          <span class="main">${this.name(p.name)}<small>${mt(n.laundry(w))}</small></span>
          ${this.iconButton(Ct, n.done, this.name(p.name), () => this.call("input_boolean", "turn_off", { entity_id: p.entity }))}
        </div>`;
      })
    ];
    return c`<h2><span>${l ? `${n.needsYou} · ${l}` : n.needsYou}</span></h2>
      <div class="group" data-part="queue">
        ${m.length ? m : c`<div class="row"><span class="main">${n.nothingWaits}</span></div>`}
      </div>`;
  }
  /** Air conditioners that ran at least their threshold since the filter was cleaned; a missing value is no task. */
  dirtyFilters(t) {
    return t.filters.flatMap((e) => {
      const n = ct(this.hass, e.hours), s = ct(this.hass, e.threshold);
      return n !== void 0 && s !== void 0 && s > 0 && n >= s ? [{ filter: e, hours: n, threshold: s }] : [];
    });
  }
  /* ---------- Odložit ---------- */
  day(t) {
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }
  /** The keys of the items postponed to a later day than today. */
  snoozed(t) {
    const e = A(this.hass, t.snoozed)?.attributes.polozky, n = this.day(new Date(this._now)), s = /* @__PURE__ */ new Set();
    if (Array.isArray(e))
      for (const o of e)
        typeof o?.klic == "string" && typeof o.do == "string" && o.do > n && s.add(o.klic);
    return s;
  }
  /** "Odložit" with its menu (a day, to the weekend, a week, a month; without a time, it is no alarm). The menu only covers what is under it. */
  /**
   * A 44 px round button with an icon (uživatel 14. 11. 2026: „Hotovo i odložit udělej taky jako ikony. Vymysli jasne a
   * profi ikony“): its word is the tooltip and, with the name of the item, what a screen reader says.
   */
  iconButton(t, e, n, s, o = "") {
    return c`<button class="button icon ${o}" type="button" title=${e} aria-label=${`${e}: ${n}`} @click=${s}>${t}</button>`;
  }
  snoozeButton(t, e, n, s) {
    if (!t.snoozed || !t.snoozeScript) return f;
    const o = n.t, a = new Date(this._now), r = (p) => new Date(a.getFullYear(), a.getMonth(), a.getDate() + p), d = (6 - a.getDay() + 7) % 7 || 7, h = new Date(a.getFullYear(), a.getMonth() + 1, a.getDate()), u = [[o.snoozeFor.day, r(1)], [o.snoozeFor.weekend, r(d)], [o.snoozeFor.week, r(7)], [o.snoozeFor.month, h]], l = this._menu === e, m = (p) => {
      this._menu = void 0, this.call("script", t.snoozeScript.split(".")[1], { klic: e, do: this.day(p) });
    };
    return c`<span class="snooze">
      <button class="button icon" type="button" title=${o.snooze} aria-label=${`${o.snooze}: ${s}`} aria-haspopup="menu" aria-expanded=${l ? "true" : "false"} @click=${() => this._menu = l ? void 0 : e}>${Ms}</button>
      ${l ? c`<div class="menu" role="menu">
            ${u.map(([p, $]) => c`<button type="button" role="menuitem" @click=${() => m($)}><span>${p}</span><span class="until">${n.day($.getTime())}</span></button>`)}
          </div>` : f}
    </span>`;
  }
  /** The preset a blind did not arrive at (its target matches one), when it moved but stopped elsewhere. */
  failedGoal(t, e) {
    const n = e.cil;
    if (!(!e.entita.startsWith("cover.") || !/^(nedojela|nepohnula)/i.test(e.duvod ?? "")))
      return t.covers.presets.find((s) => Math.abs(Number(n?.pos) - s.position) <= t.covers.tolerance && Math.abs(Number(n?.tilt) - s.tilt) <= t.covers.tolerance);
  }
  /** A failed command of a blind can be sent again when the sensor kept its target. */
  retryOf(t, e) {
    const n = e.cil;
    if (!e.entita.startsWith("cover.") || !n || n.pos === void 0 || n.tilt === void 0) return;
    const s = Number(n.pos), o = Number(n.tilt);
    if (!Number.isFinite(s) || !Number.isFinite(o)) return;
    const a = { name: "", position: s, tilt: o };
    return () => this.send(
      `retry:${e.entita}`,
      { entities: [e.entita], done: () => this.coverDone(t, e.entita, a) },
      "script",
      t.covers.script.split(".")[1],
      { entity: e.entita, pos: s, tilt: o }
    );
  }
  /* ---------- Teď běží ---------- */
  duration(t, e) {
    const n = this.starts.of(this.hass, t);
    if (n === void 0) return "";
    const s = Math.max(0, Math.floor((this._now - n) / 6e4));
    return s < 60 ? e.t.minutes(s) : e.t.hours(Math.floor(s / 60), s % 60);
  }
  renderRunning(t, e) {
    if (!t.running.length) return f;
    const n = new Set(t.devices.flatMap((a) => a.entities.map((r) => r.entity))), s = t.running.filter((a) => !n.has(a.entity) && ["on", "cleaning", "returning"].includes(N(this.hass, a.entity) ?? "")), o = s.map((a) => `${this.name(a.name)} ${this.duration(a.entity, e)}`.trim());
    return c`<h2><span>${e.t.running}</span></h2>
      <div class="group" data-part="running"><div class="row now ${s.length ? "" : "none"}"><span class="main" style="font-size:inherit;line-height:inherit">${o.length ? pt(o) : e.t.nothingRuns}</span></div></div>`;
  }
  /* ---------- Žaluzie ---------- */
  /** Whether one blind is in the preset: undefined when it does not report its position. */
  coverIn(t, e, n) {
    const s = A(this.hass, e);
    if (!s || J(s.state)) return;
    const o = Number(s.attributes.current_position), a = Number(s.attributes.current_tilt_position);
    if (!(!Number.isFinite(o) || !Number.isFinite(a)))
      return Math.abs(o - n.position) <= t.covers.tolerance && Math.abs(a - n.tilt) <= t.covers.tolerance;
  }
  /** How many blinds are in the preset, and how many report their position at all. */
  inPreset(t, e) {
    let n = 0, s = 0;
    for (const o of t.covers.entities) {
      const a = this.coverIn(t, o, e);
      a !== void 0 && (s += 1, a && (n += 1));
    }
    return { count: n, known: s };
  }
  renderCovers(t, e) {
    if (!t.covers.entities.length) return f;
    const n = t.covers.presets.length - 1;
    return c`<h2>
        <span>${e.t.covers}</span>
        <button class="chevron" type="button" data-open="covers" aria-haspopup="dialog" aria-label=${e.t.coversDetail} @click=${() => this._detail = "covers"}>
          <span aria-hidden="true">›</span>
        </button>
      </h2>
      <div class="tiles" data-part="covers">
        ${t.covers.presets.map((s, o) => {
      const { count: a, known: r } = this.inPreset(t, s), d = r === t.covers.entities.length && a === r, h = d ? "on" : a > 0 ? "mixed" : "idle";
      return c`<dd-tile
            kind="action"
            centered
            guarded
            .name=${this.name(s.name)}
            .state=${h}
            .count=${a > 0 && !d ? a : void 0}
            .hint=${e.t.hint}
            .hintAlign=${o === 0 ? "start" : o === n ? "end" : "center"}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            .pending=${this.pending.has(`covers:${o}`)}
            @hdk-press=${() => this.setCovers(t, s, `covers:${o}`)}
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
    const s = n.t, o = this.failed(t).find((h) => h.entita === e);
    if (o) {
      const h = o.cas ? Date.parse(o.cas) : NaN, u = this.failedGoal(t, o);
      return u ? { text: [s.notArrivedTo(this.name(u.name)), Number.isFinite(h) ? this.when(h, n) : ""].filter(Boolean).join(" "), warn: !0 } : { text: [Number.isFinite(h) ? s.notArrived(this.when(h, n)) : s.notArrived("").trim(), o.duvod].filter(Boolean).join(" · "), warn: !0 };
    }
    const a = A(this.hass, t.covers.lastAction)?.attributes.polozky, r = a && typeof a == "object" ? a[e] : void 0;
    if (!r || typeof r.kdo != "string") return;
    const d = typeof r.cas == "string" ? Date.parse(r.cas) : NaN;
    return { text: [s.who[r.kdo] ?? r.kdo, Number.isFinite(d) ? this.when(d, n) : ""].filter(Boolean).join(" "), warn: !1 };
  }
  /** Detail of the blinds: every room with its last action and the three presets just for it (one tap: the sheet was opened on purpose). */
  renderCoversDetail(t, e) {
    if (!t.covers.entities.length) return f;
    const n = e.t, s = this._detail === "covers";
    return c`<dd-sheet .open=${s} .heading=${n.covers} .closeLabel=${n.close} @hdk-close=${() => this._detail = void 0}>
      ${s ? c`<div class="detail" data-part="covers-detail">
            ${t.covers.entities.map((o) => {
      const a = A(this.hass, o), r = t.covers.names[o], d = a?.attributes.friendly_name, h = r !== void 0 ? this.name(r) : typeof d == "string" ? d : o, u = this.coverAction(t, o, e);
      return c`<div class="cover-row" data-cover=${o}>
                <span class="main">${h}${u ? c`<small class=${u.warn ? "warn" : ""}>${mt(u.text)}</small>` : f}</span>
                <span class="presets">
                  ${t.covers.presets.map(
        (l, m) => c`<dd-tile
                      kind="action"
                      centered
                      .name=${this.name(l.name)}
                      .label=${`${h}: ${this.name(l.name)}`}
                      .state=${this.coverIn(t, o, l) ? "on" : "idle"}
                      .pending=${this.pending.has(`cover:${o}:${m}`)}
                      @hdk-press=${() => this.send(`cover:${o}:${m}`, { entities: [o], done: () => this.coverDone(t, o, l) }, "script", t.covers.script.split(".")[1], {
          entity: o,
          pos: l.position,
          tilt: l.tilt
        })}
                    ></dd-tile>`
      )}
                </span>
              </div>`;
    })}
          </div>` : f}
    </dd-sheet>`;
  }
  setCovers(t, e, n) {
    const s = t.covers.script.split(".")[1];
    if (!this.pending.has(n)) {
      this.pending.start(n, this.hass, { entities: t.covers.entities, done: () => t.covers.entities.every((o) => this.coverDone(t, o, e)) });
      for (const o of t.covers.entities)
        this.call("script", s, { entity: o, pos: e.position, tilt: e.tilt }, n);
    }
  }
  /* ---------- Větrání ---------- */
  align(t) {
    return t % 3 === 0 ? "start" : t % 3 === 2 ? "end" : "center";
  }
  renderVentilation(t, e) {
    const n = e.t, s = [...t.ventilation.mode ? [{ name: n.ventilationMode, entity: t.ventilation.mode }] : [], ...t.ventilation.fans];
    return s.length ? c`<h2><span>${n.ventilation}</span></h2>
      <div class="tiles" data-part="ventilation">
        ${s.map((o, a) => {
      const r = A(this.hass, o.entity), d = !r || J(r.state), h = r?.state === "on";
      return c`<dd-tile
            kind="toggle"
            guarded
            data-entity=${o.entity}
            .name=${this.name(o.name)}
            .text=${d ? n.unavailable : h ? n.runs(this.duration(o.entity, e)).trim() : n.off}
            .state=${h ? "on" : "off"}
            .disabled=${d}
            .hint=${n.hint}
            .hintAlign=${this.align(a)}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            .pending=${this.pending.has(`toggle:${o.entity}`)}
            @hdk-toggle=${(u) => {
        const l = u.detail.checked ? "on" : "off";
        this.send(`toggle:${o.entity}`, { entities: [o.entity], done: () => N(this.hass, o.entity) === l }, "homeassistant", u.detail.checked ? "turn_on" : "turn_off", {
          entity_id: o.entity
        });
      }}
          ></dd-tile>`;
    })}
      </div>` : f;
  }
  /* ---------- Další zařízení (Světla, Zásuvky, Vysavače …) ---------- */
  /**
   * One section per kind from the configuration („Q218 zatím A“). A switch, a fan and a light that only switches are a
   * guarded toggle like a fan of Větrání; a vacuum and a light with brightness or colour open their popup.
   */
  renderDevices(t, e) {
    const n = e.t;
    return t.devices.filter((s) => s.entities.length).map(
      (s, o) => c`<h2><span>${this.name(s.name)}</span></h2>
          <div class="tiles" data-part=${`devices-${o}`}>
            ${s.entities.map((a, r) => {
        const d = A(this.hass, a.entity), h = !d || J(d.state);
        if (a.entity.startsWith("vacuum.") || this.lightOptions(a, d) !== void 0) {
          const l = a.entity.startsWith("vacuum."), m = l ? d?.state === "cleaning" : d?.state === "on", p = h ? n.unavailable : l ? this.vacuumText(a, d, e) : this.lightText(d, e);
          return c`<dd-tile
                  kind="open"
                  data-entity=${a.entity}
                  .name=${this.name(a.name)}
                  .text=${p}
                  .label=${`${this.name(a.name)}. ${p}`}
                  .state=${m ? "on" : h ? "off" : l ? "idle" : "off"}
                  @hdk-open=${() => this._detail = `device:${a.entity}`}
                ></dd-tile>`;
        }
        const u = d?.state === "on";
        return c`<dd-tile
                kind="toggle"
                guarded
                data-entity=${a.entity}
                .name=${this.name(a.name)}
                .text=${h ? n.unavailable : u ? n.on : n.off}
                .state=${u ? "on" : "off"}
                .disabled=${h}
                .hint=${n.hint}
                .hintAlign=${this.align(r)}
                .holdMs=${t.guard.holdMs}
                .doubleTapMs=${t.guard.doubleTapMs}
                .hintSeconds=${t.guard.hintSeconds}
                .pending=${this.pending.has(`toggle:${a.entity}`)}
                @hdk-toggle=${(l) => {
          const m = l.detail.checked ? "on" : "off";
          this.send(`toggle:${a.entity}`, { entities: [a.entity], done: () => N(this.hass, a.entity) === m }, "homeassistant", l.detail.checked ? "turn_on" : "turn_off", {
            entity_id: a.entity
          });
        }}
              ></dd-tile>`;
      })}
          </div>`
    );
  }
  /* ---------- Popupy zařízení: světlo a vysavač ---------- */
  /** What a light can do besides on and off (its colour modes); undefined when it only switches and has no startup brightness. */
  lightOptions(t, e) {
    if (!t.entity.startsWith("light.")) return;
    const n = e?.attributes.supported_color_modes, s = Array.isArray(n) ? n.map(String) : [], o = s.some((d) => ["hs", "rgb", "rgbw", "rgbww", "xy"].includes(d)), a = s.includes("color_temp"), r = o || a || s.includes("brightness") || s.includes("white");
    if (!(!r && !t.startupBrightness))
      return { brightness: r, hue: o, temperature: a };
  }
  /** Brightness of a light in % (Home Assistant keeps 0–255). */
  lightPercent(t) {
    const e = Number(t?.attributes.brightness);
    return t?.state === "on" && Number.isFinite(e) ? Math.max(1, Math.round(e / 255 * 100)) : void 0;
  }
  lightText(t, e) {
    const n = this.lightPercent(t);
    return t.state !== "on" ? e.t.off : n === void 0 ? e.t.on : `${e.t.on} · ${e.percent(n)}`;
  }
  /** The vacuum in words as Home Assistant says it, with the time it cleans; the battery when it is not full and not cleaning. */
  vacuumText(t, e, n) {
    const s = this.hass, o = s?.formatEntityState ? s.formatEntityState(e) : e.state;
    return e.state === "cleaning" ? [o, this.duration(t.entity, n)].filter(Boolean).join(" · ") : o;
  }
  findDevice(t, e) {
    for (const n of t.devices) for (const s of n.entities) if (s.entity === e) return s;
  }
  /** The popup of a light or a vacuum (one tap everywhere in it: the popup was opened on purpose, „Q188“). */
  renderDeviceDetail(t, e) {
    const n = this._detail?.startsWith("device:") ? this._detail.slice(7) : void 0, s = n ? this.findDevice(t, n) : void 0, o = s ? A(this.hass, s.entity) : void 0, a = !o || J(o.state), r = s ? a ? e.t.unavailable : s.entity.startsWith("vacuum.") ? this.vacuumText(s, o, e) : this.lightText(o, e) : "";
    return c`<dd-sheet .open=${s !== void 0} .heading=${s ? this.name(s.name) : ""} .sub=${r} .closeLabel=${e.t.close} @hdk-close=${() => this._detail = void 0}>
      ${s ? c`<div class="detail device-detail" data-part="device-detail" data-entity=${s.entity}>
            ${s.entity.startsWith("vacuum.") ? this.renderVacuum(s, o, a, e) : this.renderLight(s, o, a, e)}
          </div>` : f}
    </dd-sheet>`;
  }
  /** One setting of a popup: its name and value above, the slider of the kit under it. */
  setting(t, e, n, s, o = !1) {
    return c`<div class="setting ${o ? "apart" : ""}">
      <div class="setting-head"><span>${t}</span><span class="setting-value">${e}</span></div>
      ${n}
      ${s ? c`<small>${s}</small>` : f}
    </div>`;
  }
  /**
   * The light (uživatel 21. 11. 2026: „u lampy bedside nastavovat barvu a jas. Při spuštění potřebuji nastavit konkrétní
   * jas“): on and off, brightness, colour (a rainbow bar), colour temperature (warm to cold) and the brightness after
   * switching on, which an automation of Home Assistant applies (`startup_brightness`, 0 = unchanged).
   */
  renderLight(t, e, n, s) {
    const o = s.t, a = this.lightOptions(t, e) ?? { brightness: !1, hue: !1, temperature: !1 }, r = e?.state === "on", d = this.lightPercent(e), h = e?.attributes.hs_color, u = Array.isArray(h) && Number.isFinite(Number(h[0])) ? Math.round(Number(h[0])) : void 0, l = Number(e?.attributes.color_temp_kelvin), m = Number(e?.attributes.min_color_temp_kelvin) || 2700, p = Number(e?.attributes.max_color_temp_kelvin) || 6500, $ = String(e?.attributes.color_mode ?? ""), b = (y) => `${s.whole(y)} K`, w = (y) => this.call("light", "turn_on", { entity_id: t.entity, ...y }), g = t.startupBrightness ? ct(this.hass, t.startupBrightness) : void 0;
    return c`<div class="setting-row">
        <span>${o.device.light}</span>
        <dd-switch
          .checked=${r}
          .disabled=${n}
          .label=${`${this.name(t.name)}: ${o.device.light}`}
          .pending=${this.pending.has(`toggle:${t.entity}`)}
          @hdk-toggle=${(y) => {
      const S = y.detail.checked ? "on" : "off", T = y.detail.checked && g !== void 0 && g > 0 ? { brightness_pct: Math.round(g) } : {};
      this.send(`toggle:${t.entity}`, { entities: [t.entity], done: () => N(this.hass, t.entity) === S }, "light", y.detail.checked ? "turn_on" : "turn_off", { entity_id: t.entity, ...T });
    }}
        ></dd-switch>
      </div>
      ${a.brightness ? this.setting(
      o.device.brightness,
      d === void 0 ? o.off : s.percent(d),
      c`<dd-slider
              min="5"
              max="100"
              step="5"
              .value=${d ?? 5}
              .disabled=${n}
              .label=${o.device.brightness}
              .valueText=${d === void 0 ? o.off : s.percent(d)}
              .minLabel=${s.percent(5)}
              .maxLabel=${s.percent(100)}
              @hdk-change=${(y) => w({ brightness_pct: y.detail.value })}
            ></dd-slider>`
    ) : f}
      ${a.hue ? this.setting(
      o.device.colour,
      // The colour as a dot of that colour, not a number of degrees (a number would mean nothing here).
      $ === "color_temp" || u === void 0 ? "" : c`<span class="swatch" style=${`background: hsl(${u} 100% 50%)`}></span>`,
      c`<dd-slider
              min="0"
              max="360"
              step="5"
              .value=${u ?? 0}
              .disabled=${n}
              .label=${o.device.colour}
              .valueText=${u === void 0 ? "" : `${u}°`}
              .track=${"linear-gradient(to right, hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(360 100% 50%))"}
              @hdk-change=${(y) => w({ hs_color: [y.detail.value, 100] })}
            ></dd-slider>`
    ) : f}
      ${a.temperature ? this.setting(
      o.device.temperature,
      $ === "color_temp" && Number.isFinite(l) ? b(l) : "",
      c`<dd-slider
              min=${m}
              max=${p}
              step="100"
              .value=${Number.isFinite(l) ? l : m}
              .disabled=${n}
              .label=${o.device.temperature}
              .valueText=${Number.isFinite(l) ? b(l) : ""}
              .minLabel=${o.device.warm}
              .maxLabel=${o.device.cold}
              .track=${"linear-gradient(to right, #ff9f3a, #ffd9a8, #ffffff, #cddcff)"}
              @hdk-change=${(y) => w({ color_temp_kelvin: y.detail.value })}
            ></dd-slider>`
    ) : f}
      ${t.startupBrightness ? this.setting(
      o.device.startup,
      g === void 0 ? o.unavailable : g > 0 ? s.percent(Math.round(g)) : o.device.unchanged,
      c`<dd-slider
              min="0"
              max="100"
              step="5"
              .value=${g ?? 0}
              .disabled=${g === void 0}
              .label=${o.device.startup}
              .valueText=${g === void 0 ? o.unavailable : g > 0 ? s.percent(Math.round(g)) : o.device.unchanged}
              .minLabel=${o.device.unchanged}
              .maxLabel=${s.percent(100)}
              @hdk-change=${(y) => this.call("input_number", "set_value", { entity_id: t.startupBrightness, value: y.detail.value })}
            ></dd-slider>`,
      o.device.startupNote,
      !0
    ) : f}`;
  }
  /**
   * The vacuum (uživatel 21. 11. 2026: „u vysavačů potřebuji kartu vysavačů s mapou, baterii atd.“): its map (`map`, a camera
   * or an image entity), the state, the battery, the last cleaning, suction and the actions start or pause and dock.
   */
  renderVacuum(t, e, n, s) {
    const o = s.t, a = e?.attributes ?? {}, r = e?.state === "cleaning", d = t.map ? A(this.hass, t.map) : void 0, h = d && !J(d.state) && typeof d.attributes.entity_picture == "string" ? d.attributes.entity_picture : void 0, u = Number(a.battery_level), l = Number(a.clean_area), m = Number(a.clean_time), p = Array.isArray(a.fan_speed_list) ? a.fan_speed_list.map(String) : [], $ = typeof a.fan_speed == "string" ? a.fan_speed : "", b = [];
    b.push([o.device.battery, Number.isFinite(u) ? s.percent(Math.round(u)) : "––"]), !r && Number.isFinite(l) && Number.isFinite(m) && (l > 0 || m > 0) && b.push([o.device.lastClean, `${s.whole(l)} m² · ${o.minutes(Math.round(m))}`]);
    const w = `vacuum:${t.entity}`, g = `vacuum-home:${t.entity}`;
    return c`${t.map ? h ? c`<img class="vacuum-map" src=${h} alt=${o.device.map} />` : c`<p class="vacuum-map empty">${o.device.noMap}</p>` : f}
      <div class="vacuum-actions">
        <dd-tile
          kind="action"
          centered
          .name=${r ? o.device.pause : o.device.clean}
          .disabled=${n}
          .pending=${this.pending.has(w)}
          @hdk-press=${() => r ? this.send(w, { entities: [t.entity], done: () => N(this.hass, t.entity) !== "cleaning" }, "vacuum", "pause", { entity_id: t.entity }) : this.send(w, { entities: [t.entity], done: () => N(this.hass, t.entity) === "cleaning" }, "vacuum", "start", { entity_id: t.entity })}
        ></dd-tile>
        <dd-tile
          kind="action"
          centered
          .name=${o.device.dock}
          .disabled=${n || e?.state === "docked"}
          .pending=${this.pending.has(g)}
          @hdk-press=${() => this.send(g, { entities: [t.entity], done: () => ["returning", "docked"].includes(N(this.hass, t.entity) ?? "") }, "vacuum", "return_to_base", { entity_id: t.entity })}
        ></dd-tile>
      </div>
      ${p.length ? c`<div class="setting">
            <div class="setting-head"><span>${o.device.suction}</span></div>
            <dd-segmented
              wrap
              .label=${o.device.suction}
              .value=${$}
              .disabled=${n}
              .pending=${this.pending.has(`speed:${t.entity}`)}
              .options=${p.map((y) => ({ value: y, label: o.device.speeds[y] ?? y }))}
              @hdk-select=${(y) => this.send(`speed:${t.entity}`, { entities: [t.entity], done: () => A(this.hass, t.entity)?.attributes.fan_speed === y.detail.value }, "vacuum", "set_fan_speed", { entity_id: t.entity, fan_speed: y.detail.value })}
            ></dd-segmented>
          </div>` : f}
      ${b.length ? c`<div class="group">${b.map(([y, S]) => c`<div class="health-row"><span class="main">${y}</span><span class="value">${S}</span></div>`)}</div>` : f}`;
  }
  /* ---------- Topení a Klimatizace ---------- */
  target(t, e, n) {
    const s = Number(A(this.hass, t)?.attributes.temperature);
    return Number.isFinite(s) ? `${n ? e.half(s) : e.whole(s)}°` : "";
  }
  renderHeating(t, e) {
    if (!t.heating.rooms.length) return f;
    const n = e.t, s = (r) => rt("heating", A(this.hass, r.entity)), o = (r) => ["manual", "boost"].includes(s(r) ?? ""), a = t.heating.rooms.filter(o).length;
    return c`<h2>
        <span>${n.heating}</span>
        ${a && t.heating.resume ? this.link(
      "resume",
      c`<span class="count">${n.manualCount(a)} · </span>${n.resume}`,
      () => this.send(
        "resume",
        { entities: t.heating.rooms.map((r) => r.entity), done: () => !t.heating.rooms.some(o) },
        "button",
        "press",
        { entity_id: t.heating.resume }
      )
    ) : f}
      </h2>
      <div class="tiles" data-part="heating">
        ${t.heating.rooms.map((r) => {
      const d = s(r), h = d === void 0 ? n.unavailable : d === "off" ? n.off : [d === "plan" ? n.schedule : n.manual, this.target(r.entity, e, !0)].filter(Boolean).join(" · "), u = d === void 0 || d === "off" ? "off" : d === "plan" ? "idle" : "on";
      return this.openTile("heating", r, h, u, d === void 0);
    })}
      </div>`;
  }
  renderCooling(t, e) {
    if (!t.cooling.rooms.length) return f;
    const n = e.t, s = t.cooling.rooms.filter((o) => !["off", void 0].includes(N(this.hass, o.entity)));
    return c`<h2>
        <span>${n.cooling}</span>
        ${s.length ? this.link(
      "alloff",
      n.allOff,
      () => this.send(
        "alloff",
        { entities: s.map((o) => o.entity), done: () => s.every((o) => ["off", void 0].includes(N(this.hass, o.entity))) },
        "climate",
        "turn_off",
        { entity_id: s.map((o) => o.entity) }
      )
    ) : f}
      </h2>
      <div class="tiles" data-part="cooling">
        ${t.cooling.rooms.map((o) => {
      const a = N(this.hass, o.entity), r = String(A(this.hass, o.entity)?.attributes.preset_mode ?? ""), d = a === "cool" && r === "wind_free" ? "wind_free" : a === "heat_cool" ? "auto" : a ?? "", h = a === void 0 ? n.unavailable : a === "off" ? n.off : [n.mode[d] ?? n.on, a === "fan_only" ? "" : this.target(o.entity, e, !1)].filter(Boolean).join(" · ");
      return this.openTile("cooling", o, h, a === void 0 || a === "off" ? "off" : "on", a === void 0);
    })}
      </div>`;
  }
  /** A tile that opens the popup Topení / Klimatizace with its room selected: one tap, it changes nothing by itself. */
  openTile(t, e, n, s, o) {
    return c`<dd-tile
      kind="open"
      data-entity=${e.entity}
      .name=${this.name(e.name)}
      .text=${n}
      .state=${s}
      .disabled=${o}
      @hdk-open=${() => {
      this._climateSelected = [e.entity], this._detail = t;
    }}
    ></dd-tile>`;
  }
  /** The shared popup of the kit for one system (spec of the kit: in the card Dům only one system, no switch). */
  renderClimate(t, e) {
    const n = this._detail === "heating" || this._detail === "cooling" ? this._detail : void 0, s = (n ?? "heating") === "heating" ? t.heating.rooms : t.cooling.rooms;
    if (!t.heating.rooms.length && !t.cooling.rooms.length) return f;
    const o = async () => {
      await this.renderRoot.querySelector("dd-climate")?.flush(), this._detail = void 0;
    };
    return c`<dd-sheet .open=${n !== void 0} .heading=${n === "cooling" ? e.t.cooling : e.t.heating} .closeLabel=${e.t.close} @hdk-close=${o}>
      ${n ? c`<dd-climate
            .hass=${this.hass}
            .i18n=${e}
            .texts=${e.t.climate}
            .system=${n}
            .rooms=${s.map((a) => ({ name: this.name(a.name), entity: a.entity }))}
            .selected=${this._climateSelected}
            .delayMs=${t.sendDelaySeconds * 1e3}
            @hdk-select-rooms=${(a) => this._climateSelected = a.detail.selected}
            @hdk-error=${(a) => this._error = a.detail.message}
            @hdk-more-info=${async (a) => {
      await o(), this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: a.detail.entityId }, bubbles: !0, composed: !0 }));
    }}
          ></dd-climate>` : f}
    </dd-sheet>`;
  }
  /* ---------- Chráněný odkaz v nadpisu oddílu ---------- */
  link(t, e, n) {
    const s = (r) => {
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
    return c`<button class="link ${this.pending.has(t) ? "pending" : ""}" type="button" data-link=${t} aria-busy=${this.pending.has(t) ? "true" : f} @click=${s} @pointerdown=${o} @pointerup=${a} @pointerleave=${a} @pointercancel=${a} @contextmenu=${(r) => r.preventDefault()}>
      ${e}${this._hint === t ? c`<div class="hint above end" aria-hidden="true"><i></i><span style="position: relative">${this.i18n.t.hint}</span></div>` : f}
    </button>`;
  }
  /* ---------- Volání Home Assistantu ---------- */
  call(t, e, n, s) {
    this._error = "", this.hass?.callService(t, e, n).catch((o) => {
      s && this.pending.stop(s), this._error = `${this.i18n.t.failed}: ${o instanceof Error ? o.message : String(o)}`;
    });
  }
  /** Sends and pulses the control `key` until `command` is done (or nothing changes for a while, or the call fails). */
  send(t, e, n, s, o) {
    this.pending.has(t) || (this.pending.start(t, this.hass, e), this.call(n, s, o, t));
  }
  /** A blind in a preset and still (its way is over). */
  coverDone(t, e, n) {
    const s = A(this.hass, e)?.state;
    return s === void 0 || J(s) || this.coverIn(t, e, n) === !0 && s !== "opening" && s !== "closing";
  }
};
de.styles = [Rt, Xt, gs];
let j = de;
V([
  v({ attribute: !1 })
], j.prototype, "hass");
V([
  E()
], j.prototype, "_config");
V([
  E()
], j.prototype, "_error");
V([
  E()
], j.prototype, "_hint");
V([
  E()
], j.prototype, "_now");
V([
  E()
], j.prototype, "_detail");
V([
  E()
], j.prototype, "_rules");
V([
  E()
], j.prototype, "_log");
V([
  E()
], j.prototype, "_seen");
V([
  E()
], j.prototype, "_climateSelected");
V([
  E()
], j.prototype, "_menu");
V([
  E()
], j.prototype, "_fit");
Hn("dd");
On("dd");
customElements.get("ha-dum-dashboard") || customElements.define("ha-dum-dashboard", j);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-dum-dashboard") || window.customCards.push({
  type: "ha-dum-dashboard",
  name: "Dům Dashboard",
  description: Ie(is()).t.cardDescription,
  preview: !1
});
console.info("%c DUM-DASHBOARD %c 0.21.0 · 2026-11-21 22:09 UTC · po 06fdacc ", "color:#fff;background:#0A6ED1;font-weight:700", "color:inherit");
