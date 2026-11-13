const At = globalThis, Ut = At.ShadowRoot && (At.ShadyCSS === void 0 || At.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, It = /* @__PURE__ */ Symbol(), de = /* @__PURE__ */ new WeakMap();
let Se = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== It) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ut && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = de.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && de.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ae = (s) => new Se(typeof s == "string" ? s : s + "", void 0, It), R = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[o + 1], s[0]);
  return new Se(e, s, It);
}, je = (s, t) => {
  if (Ut) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = At.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, he = Ut ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ae(e);
})(s) : s;
const { is: Ue, defineProperty: Ie, getOwnPropertyDescriptor: Be, getOwnPropertyNames: He, getOwnPropertySymbols: Ye, getPrototypeOf: Ve } = Object, Nt = globalThis, ce = Nt.trustedTypes, We = ce ? ce.emptyScript : "", qe = Nt.reactiveElementPolyfillSupport, gt = (s, t) => s, Mt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? We : null;
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
} }, Bt = (s, t) => !Ue(s, t), ue = { attribute: !0, type: String, converter: Mt, reflect: !1, useDefault: !1, hasChanged: Bt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Nt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let nt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ue) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Ie(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: o } = Be(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(gt("elementProperties"))) return;
    const t = Ve(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(gt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(gt("properties"))) {
      const e = this.properties, i = [...He(e), ...Ye(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(he(n));
    } else t !== void 0 && e.push(he(t));
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
    return je(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : Mt).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Mt;
      this._$Em = n;
      const a = r.fromAttribute(e, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? Bt)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: o }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: r } = o, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
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
nt.elementStyles = [], nt.shadowRootOptions = { mode: "open" }, nt[gt("elementProperties")] = /* @__PURE__ */ new Map(), nt[gt("finalized")] = /* @__PURE__ */ new Map(), qe?.({ ReactiveElement: nt }), (Nt.reactiveElementVersions ??= []).push("2.1.2");
const Ht = globalThis, pe = (s) => s, Et = Ht.trustedTypes, fe = Et ? Et.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Me = "$lit$", K = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + K, Ke = `<${Ee}>`, tt = document, vt = () => tt.createComment(""), $t = (s) => s === null || typeof s != "object" && typeof s != "function", Yt = Array.isArray, Ge = (s) => Yt(s) || typeof s?.[Symbol.iterator] == "function", Ot = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, me = /-->/g, ge = />/g, X = RegExp(`>|${Ot}(?:([^\\s"'>=/]+)(${Ot}*=${Ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, ve = /"/g, Ce = /^(?:script|style|textarea|title)$/i, Ze = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), h = Ze(1), at = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), $e = /* @__PURE__ */ new WeakMap(), Q = tt.createTreeWalker(tt, 129);
function Te(s, t) {
  if (!Yt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fe !== void 0 ? fe.createHTML(t) : t;
}
const Xe = (s, t) => {
  const e = s.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = pt;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let d, g, c = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, g = r.exec(l), g !== null); ) p = r.lastIndex, r === pt ? g[1] === "!--" ? r = me : g[1] !== void 0 ? r = ge : g[2] !== void 0 ? (Ce.test(g[2]) && (n = RegExp("</" + g[2], "g")), r = X) : g[3] !== void 0 && (r = X) : r === X ? g[0] === ">" ? (r = n ?? pt, c = -1) : g[1] === void 0 ? c = -2 : (c = r.lastIndex - g[2].length, d = g[1], r = g[3] === void 0 ? X : g[3] === '"' ? ve : be) : r === ve || r === be ? r = X : r === me || r === ge ? r = pt : (r = X, n = void 0);
    const u = r === X && s[a + 1].startsWith("/>") ? " " : "";
    o += r === pt ? l + Ke : c >= 0 ? (i.push(d), l.slice(0, c) + Me + l.slice(c) + K + u) : l + K + (c === -2 ? a : u);
  }
  return [Te(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class yt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, g] = Xe(t, e);
    if (this.el = yt.createElement(d, i), Q.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = Q.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(Me)) {
          const p = g[r++], u = n.getAttribute(c).split(K), $ = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: $[2], strings: u, ctor: $[1] === "." ? Qe : $[1] === "?" ? ti : $[1] === "@" ? ei : zt }), n.removeAttribute(c);
        } else c.startsWith(K) && (l.push({ type: 6, index: o }), n.removeAttribute(c));
        if (Ce.test(n.tagName)) {
          const c = n.textContent.split(K), p = c.length - 1;
          if (p > 0) {
            n.textContent = Et ? Et.emptyScript : "";
            for (let u = 0; u < p; u++) n.append(c[u], vt()), Q.nextNode(), l.push({ type: 2, index: ++o });
            n.append(c[p], vt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ee) l.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = n.data.indexOf(K, c + 1)) !== -1; ) l.push({ type: 7, index: o }), c += K.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = tt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function lt(s, t, e = s, i) {
  if (t === at) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = $t(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = lt(s, n._$AS(s, t.values), n, i)), t;
}
class Je {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? tt).importNode(e, !0);
    Q.currentNode = n;
    let o = Q.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new xt(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new ii(o, this, t)), this._$AV.push(d), l = i[++a];
      }
      r !== l?.index && (o = Q.nextNode(), r++);
    }
    return Q.currentNode = tt, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class xt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = lt(this, t, e), $t(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== at && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ge(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && $t(this._$AH) ? this._$AA.nextSibling.data = t : this.T(tt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = yt.createElement(Te(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new Je(n, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = $e.get(t.strings);
    return e === void 0 && $e.set(t.strings, e = new yt(t)), e;
  }
  k(t) {
    Yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const o of t) n === e.length ? e.push(i = new xt(this.O(vt()), this.O(vt()), this, this.options)) : i = e[n], i._$AI(o), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = pe(t).nextSibling;
      pe(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class zt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = lt(this, t, e, 0), r = !$t(t) || t !== this._$AH && t !== at, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = lt(this, a[i + l], e, l), d === at && (d = this._$AH[l]), r ||= !$t(d) || d !== this._$AH[l], d === m ? t = m : t !== m && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Qe extends zt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class ti extends zt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class ei extends zt {
  constructor(t, e, i, n, o) {
    super(t, e, i, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = lt(this, t, e, 0) ?? m) === at) return;
    const i = this._$AH, n = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== m && (i === m || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ii {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    lt(this, t);
  }
}
const si = Ht.litHtmlPolyfillSupport;
si?.(yt, xt), (Ht.litHtmlVersions ??= []).push("3.3.3");
const ni = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = n = new xt(t.insertBefore(vt(), o), o, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
const Vt = globalThis;
class O extends nt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ni(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return at;
  }
}
O._$litElement$ = !0, O.finalized = !0, Vt.litElementHydrateSupport?.({ LitElement: O });
const oi = Vt.litElementPolyfillSupport;
oi?.({ LitElement: O });
(Vt.litElementVersions ??= []).push("4.2.2");
const Ne = /* @__PURE__ */ Symbol.for(""), ri = (s) => {
  if (s?.r === Ne) return s?._$litStatic$;
}, Wt = (s) => ({ _$litStatic$: s, r: Ne }), ye = /* @__PURE__ */ new Map(), ai = (s) => (t, ...e) => {
  const i = e.length;
  let n, o;
  const r = [], a = [];
  let l, d = 0, g = !1;
  for (; d < i; ) {
    for (l = t[d]; d < i && (o = e[d], (n = ri(o)) !== void 0); ) l += n + t[++d], g = !0;
    d !== i && a.push(o), r.push(l), d++;
  }
  if (d === i && r.push(t[i]), g) {
    const c = r.join("$$lit$$");
    (t = ye.get(c)) === void 0 && (r.raw = r, ye.set(c, t = r)), e = a;
  }
  return s(t, ...e);
}, qt = ai(h);
const li = { attribute: !0, type: String, converter: Mt, reflect: !1, hasChanged: Bt }, di = (s = li, t, e) => {
  const { kind: i, metadata: n } = e;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function f(s) {
  return (t, e) => typeof e == "object" ? di(s, t, e) : ((i, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(s, t, e);
}
function _(s) {
  return f({ ...s, state: !0, attribute: !1 });
}
function mt(s, t = {}) {
  return s.length < 2 ? h`${s[0] ?? m}` : h`<span class="joined ${t.whole ? "whole" : ""}">${s.map(
    (e, i) => h`${i ? h`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : m}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function bt(s, t = {}) {
  return mt(s.split(" · "), t);
}
function Ct(s, t) {
  s.querySelectorAll(".joined").forEach((e) => {
    const i = `${t}|${e.textContent}`;
    if (e.dataset.fit === i) return;
    e.classList.remove("stacked", "flow", "probe");
    const n = [...e.querySelectorAll(":scope > .joined-sep")];
    n.forEach((l) => l.classList.remove("break"));
    const o = [...e.querySelectorAll(":scope > .joined-part")], r = o.map((l) => l.getBoundingClientRect());
    if (!r.length || !r[0].width) {
      delete e.dataset.fit;
      return;
    }
    e.dataset.fit = i;
    const a = n.filter((l, d) => r[d + 1].top > r[d].top + 1);
    if (a.length) {
      if (!e.classList.contains("whole")) {
        e.classList.add("probe");
        const l = o.some((d) => d.scrollWidth > d.clientWidth + 0.5);
        if (e.classList.remove("probe"), l) {
          e.classList.add("flow");
          return;
        }
      }
      e.classList.add("stacked"), a.forEach((l) => l.classList.add("break"));
    }
  });
}
const Kt = R`
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
`, hi = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif', ze = R`
  :host {
    font-family: ${Ae(hi)};
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
`, De = 25, Gt = ["off", "cool", "wind_free", "heat", "fan_only", "dry", "auto", "sleep"], ci = ["plan", "manual", "boost", "off"];
function Zt(s) {
  return s === void 0 || s === "" || s === "unavailable" || s === "unknown";
}
function G(s) {
  return Array.isArray(s) ? s.filter((t) => typeof t == "string") : [];
}
function et(s) {
  const t = typeof s == "string" ? Number.parseFloat(s) : s;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function rt(s, t) {
  const e = t?.state;
  if (!t || Zt(e)) return;
  if (s === "heating")
    return e === "auto" ? "plan" : e === "off" ? "off" : e === "heat" ? et(t.attributes.temperature) === De ? "boost" : "manual" : void 0;
  const i = String(t.attributes.preset_mode ?? "");
  return e === "off" ? "off" : e === "cool" && i === "wind_free" ? "wind_free" : i === "sleep" ? "sleep" : e === "heat_cool" ? "auto" : Gt.includes(e) ? e : void 0;
}
function Tt(s, t) {
  const e = rt(s, t);
  return e === void 0 ? void 0 : e !== "off";
}
function ui(s, t, e, i, n) {
  if (i.includes(n)) return i.length > 1 ? i.filter((r) => r !== n) : i;
  const o = Tt(s, t?.states[n]);
  return o === void 0 ? i : e.filter((r) => Tt(s, t?.states[r.entity]) === o).map((r) => r.entity);
}
function pi(s, t) {
  return t.flatMap((e) => {
    const i = et(s?.states[e]?.attributes.temperature);
    return i === void 0 ? [] : [{ entity: e, value: i }];
  });
}
function fi(s, t, e) {
  const i = new Set(e.map((n) => rt(s, t?.states[n])).filter((n) => n !== void 0));
  return i.size === 1 ? [...i][0] : void 0;
}
function mi(s, t) {
  const e = s === "heating" ? 0.5 : 1, i = et(t?.attributes.min_temp) ?? (s === "heating" ? 5 : 16), n = et(t?.attributes.max_temp) ?? (s === "heating" ? 25 : 30);
  return { min: Math.ceil(i / e) * e, max: Math.floor(n / e) * e, step: e };
}
function gi(s) {
  const t = G(s?.attributes.hvac_modes), e = G(s?.attributes.preset_modes);
  return Gt.filter((i) => i === "wind_free" ? t.includes("cool") && e.includes("wind_free") : i === "sleep" ? e.includes("sleep") : i === "auto" ? t.includes("auto") || t.includes("heat_cool") : t.includes(i));
}
function bi(s, t, e) {
  const i = t.map((n) => G(s?.states[n]?.attributes[e])).filter((n) => n.length);
  return i.length ? i[0].filter((n) => i.every((o) => o.includes(n))) : [];
}
function vi(s, t, e) {
  const i = new Set(t.map((n) => s?.states[n]?.attributes[e]).filter((n) => typeof n == "string"));
  return i.size === 1 ? [...i][0] : void 0;
}
function Lt(s) {
  return !!s?.services?.tado_ce?.set_climate_timer;
}
function $i(s) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}:00`;
}
function yi(s, t, e, i) {
  const n = e.mode ?? (e.temperature !== void 0 ? "manual" : rt("heating", t));
  if (n === void 0) return [];
  if (n === "plan") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: s, hvac_mode: "auto" } }];
  if (n === "off") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: s, hvac_mode: "off" } }];
  const o = n === "boost" ? De : e.temperature ?? et(t?.attributes.temperature) ?? 21;
  if (!i)
    return n === "manual" ? [{ domain: "climate", service: "set_temperature", data: { entity_id: s, temperature: o, hvac_mode: "heat" } }] : [];
  const r = e.manualFor ?? (n === "boost" ? "30" : "next"), a = { entity_id: s, temperature: o };
  return r === "next" ? a.overlay = "next_time_block" : r === "forever" ? a.overlay = "manual" : a.time_period = $i(Number(r)), [{ domain: "tado_ce", service: "set_climate_timer", data: a }];
}
function xi(s, t, e) {
  const i = [], n = { entity_id: s }, o = G(t?.attributes.hvac_modes), r = G(t?.attributes.preset_modes), a = String(t?.attributes.preset_mode ?? ""), l = e.mode;
  if (l !== void 0) {
    const d = (c) => i.push({ domain: "climate", service: "set_hvac_mode", data: { ...n, hvac_mode: c } }), g = (c) => i.push({ domain: "climate", service: "set_preset_mode", data: { ...n, preset_mode: c } });
    l === "wind_free" ? (d("cool"), g("wind_free")) : l === "sleep" ? ((t?.state === "off" || Zt(t?.state)) && d("cool"), g("sleep")) : (d(l === "auto" ? o.includes("auto") ? "auto" : "heat_cool" : l), l !== "off" && (a === "wind_free" || a === "sleep") && r.includes("none") && g("none"));
  }
  return e.temperature !== void 0 && l !== "off" && i.push({ domain: "climate", service: "set_temperature", data: { ...n, temperature: Math.round(e.temperature) } }), e.fan !== void 0 && G(t?.attributes.fan_modes).includes(e.fan) && i.push({ domain: "climate", service: "set_fan_mode", data: { ...n, fan_mode: e.fan } }), e.swing !== void 0 && G(t?.attributes.swing_modes).includes(e.swing) && i.push({ domain: "climate", service: "set_swing_mode", data: { ...n, swing_mode: e.swing } }), i;
}
function wi(s, t) {
  const e = t.mode;
  return e === void 0 ? s?.state : e === "wind_free" || e === "sleep" && (s?.state === "off" || Zt(s?.state)) ? "cool" : e === "sleep" ? s?.state : e === "auto" ? G(s?.attributes.hvac_modes).includes("auto") ? "auto" : "heat_cool" : e;
}
function ki(s, t, e) {
  const i = Math.round(t * 60), n = [{ delay: { hours: Math.floor(i / 3600), minutes: Math.floor(i % 3600 / 60), seconds: i % 60 } }];
  return e !== void 0 && n.push({ condition: "state", entity_id: s, state: e }), n.push({ action: "climate.set_hvac_mode", target: { entity_id: s }, data: { hvac_mode: "off" } }), { type: "execute_script", sequence: n };
}
var _i = Object.defineProperty, F = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && _i(t, e, n), n;
};
const Si = ["next", "30", "60", "180", "forever"], Ai = [0, 60, 180, 480], Qt = class Qt extends O {
  constructor() {
    super(...arguments), this.system = "heating", this.rooms = [], this.selected = [], this.prefix = "hdk", this.delayMs = 2e3, this.draft = {}, this.busy = !1, this.error = "";
  }
  updated() {
    Ct(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
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
    const i = this.draft;
    Object.keys(i).length && (this.draft = {}, await this.send(i, t, e));
  }
  change(t) {
    this.draft = { ...this.draft, ...t }, this.error = "", this.busy = !0, window.clearTimeout(this.timer), this.timer = window.setTimeout(() => {
      this.flush();
    }, this.delayMs);
  }
  /** Sends a draft to the rooms it was made for, with the system it was made in (the popup may have switched since). */
  async send(t, e, i) {
    const n = this.hass;
    if (!n) return;
    this.busy = !0;
    const o = Lt(n);
    try {
      for (const r of e) {
        const a = n.states[r];
        if (!a || rt(i, a) === void 0) continue;
        const l = i === "heating" ? yi(r, a, t, o) : xi(r, a, t);
        for (const c of l) await n.callService(c.domain, c.service, c.data);
        const d = t.offAfter ?? 0, g = i === "cooling" ? wi(a, t) : void 0;
        d > 0 && g !== void 0 && g !== "off" && await n.callWS(ki(r, d, g));
      }
      this.dispatchEvent(new CustomEvent("hdk-sent", { bubbles: !0, composed: !0 }));
    } catch (r) {
      this.error = `${this.texts?.failed ?? "Failed"}: ${r instanceof Error ? r.message : String(r)}`, this.dispatchEvent(new CustomEvent("hdk-error", { detail: { message: this.error }, bubbles: !0, composed: !0 }));
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
    const e = this.texts, i = this.hass?.states[t], n = rt(this.system, i);
    if (n === void 0) return e.unavailable;
    const o = et(i?.attributes.temperature);
    return n !== "off" && n !== "boost" && n !== "fan_only" && o !== void 0 ? `${e.modes[n]} · ${this.degrees(o)}` : e.modes[n];
  }
  selectRoom(t) {
    const e = ui(this.system, this.hass, this.rooms, this.selected, t);
    e.join() !== this.selected.join() && (this.flush(this.selected), this.selected = e, this.dispatchEvent(new CustomEvent("hdk-select-rooms", { detail: { selected: e }, bubbles: !0, composed: !0 })));
  }
  render() {
    const t = this.texts, e = this.i18n;
    if (!t || !e) return m;
    const i = this.hass, n = i?.states[this.selected[0]], { min: o, max: r, step: a } = mi(this.system, n), l = pi(i, this.selected), d = [...new Set(l.map((v) => v.value))], g = fi(this.system, i, this.selected), c = this.draft.mode ?? g, p = this.draft.temperature === void 0 && d.length > 1, u = this.draft.temperature ?? (c === "boost" ? 25 : d[0]), $ = c === "off" || c === "fan_only", b = $ && c !== void 0 ? t.modes[c] : p ? `${this.degrees(Math.min(...d)).replace(/°$/, "")}–${this.degrees(Math.max(...d))}` : u !== void 0 ? this.degrees(u) : "––", S = this.selected.flatMap((v) => {
      const B = et(i?.states[v]?.attributes.current_temperature);
      return B === void 0 ? [] : [{ id: v, text: `${e.one(B)} °C` }];
    }), W = this.system === "heating" && this.selected.length === 1 && i?.states[this.selected[0]]?.attributes.hvac_action === "heating", Z = p ? t.targets(l.map((v) => `${this.name(v.entity)} ${this.degrees(v.value)}`).join(" · ")) : S.length ? t.now(this.selected.length === 1 ? `${S[0].text}${W ? ` · ${t.heats}` : ""}` : S.map((v) => `${this.name(v.id)} ${v.text}`).join(" · ")) : "", wt = this.system === "heating" ? ci.filter((v) => v !== "boost" || Lt(i)) : Gt.filter((v) => this.selected.some((B) => gi(i?.states[B]).includes(v))), kt = this.draft.mode === void 0 && g === void 0 && this.selected.length > 1, x = this.system === "cooling" && (c === "off" || c === "fan_only");
    return h`
      <div class="rooms" role="group" aria-label=${t.rooms}>
        ${this.rooms.map((v) => {
      const B = i?.states[v.entity], ht = Tt(this.system, B), ct = this.selected.includes(v.entity);
      return xe(this.prefix, {
        name: v.name,
        text: this.roomText(v.entity),
        state: ct ? "on" : ht ? "idle" : "off",
        disabled: ht === void 0,
        pressed: ct,
        onPress: () => this.selectRoom(v.entity)
      });
    })}
      </div>
      <div class="target">
        <div class="big ${$ ? "word" : ""}" aria-live="polite">${b}</div>
        <div class="sub">${Z}</div>
        ${this.busy ? h`<span class="busy" role="status" aria-label=${t.sending}
              ><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 2.5a7.5 7.5 0 1 1-7.5 7.5"></path></svg
            ></span>` : m}
      </div>
      <div class="slider">
        ${Mi(this.prefix, {
      min: o,
      max: r,
      step: a,
      value: u ?? o,
      mixed: p,
      marks: p ? d : [],
      label: t.temperature,
      valueText: u !== void 0 ? this.degrees(u) : "",
      minLabel: this.degrees(o),
      maxLabel: this.degrees(r),
      disabled: x || !this.selected.length,
      onChange: (v) => (
        // Moving the temperature of the heating is Ručně (spec: „Posunutí teploty přepne Plán na Ručně“).
        this.change(this.system === "heating" && c !== "manual" ? { temperature: v, mode: "manual" } : { temperature: v })
      )
    })}
      </div>
      <h3>${t.mode}</h3>
      ${this.system === "heating" ? _t(this.prefix, {
      label: t.mode,
      options: wt.map((v) => ({ value: v, label: t.modes[v] })),
      value: c ?? "",
      onSelect: (v) => this.change({ mode: v, ...v === "plan" || v === "off" ? { temperature: void 0 } : {} })
    }) : h`<div class="modes" role="group" aria-label=${t.mode}>
            ${wt.map(
      (v) => xe(this.prefix, {
        centered: !0,
        name: t.modes[v],
        state: c === v ? "on" : "idle",
        pressed: c === v,
        onPress: () => this.change({ mode: v })
      })
    )}
          </div>`}
      ${kt ? h`<div class="note">${bt(t.mixedModes(this.selected.map((v) => `${this.name(v)} ${t.modes[rt(this.system, i?.states[v]) ?? "off"] ?? ""}`).join(" · ")))}</div>` : m}
      ${(p || kt) && !Object.keys(this.draft).length ? h`<div class="note">${t.firstChange}</div>` : m}
      ${this.system === "heating" ? this.renderManualFor(c) : [this.renderAttribute("fan"), this.renderAttribute("swing"), this.renderOffAfter(c)]}
      ${this.error ? h`<div class="error" role="alert">${this.error}</div>` : m}
      ${this.selected.length === 1 ? h`<button
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
    if (!Lt(this.hass)) return m;
    const i = t === "manual" || t === "boost", n = this.draft.manualFor ?? (t === "boost" ? "30" : "next"), o = Number(n), r = i ? n === "next" ? e.untilNextPlan : n === "forever" ? e.untilChanged : e.untilTime(this.i18n.time(Date.now() + o * 6e4)) : "";
    return h`<h3>${e.manualFor}</h3>
      ${_t(this.prefix, {
      label: e.manualFor,
      options: Si.map((a) => ({ value: a, label: e.manualForChoices[a] })),
      value: n,
      disabled: !i,
      wrap: !0,
      onSelect: (a) => this.change({ manualFor: a, ...this.draft.mode === void 0 && t ? { mode: t } : {} })
    })}
      <div class="footer">${r}</div>`;
  }
  /** Síla větru or Směr proudění: the choices every selected air conditioner offers; none, no section. */
  renderAttribute(t) {
    const e = this.texts, i = bi(this.hass, this.selected, t === "fan" ? "fan_modes" : "swing_modes");
    if (!i.length) return m;
    const n = t === "fan" ? e.fanModes : e.swingModes, o = this.draft[t] ?? vi(this.hass, this.selected, t === "fan" ? "fan_mode" : "swing_mode") ?? "", r = t === "fan" ? e.fan : e.swing;
    return h`<h3>${r}</h3>
      ${_t(this.prefix, {
      label: r,
      options: i.map((a) => ({ value: a, label: n[a] ?? a })),
      value: o,
      onSelect: (a) => this.change(t === "fan" ? { fan: a } : { swing: a })
    })}`;
  }
  renderOffAfter(t) {
    const e = this.texts, i = this.draft.offAfter ?? 0, n = t !== void 0 ? t !== "off" : this.selected.length > 0 && this.selected.every((r) => Tt(this.system, this.hass?.states[r]) === !0), o = n ? i === 0 ? e.runsUntilOff : e.offAt(this.i18n.time(Date.now() + i * 6e4)) : "";
    return h`<h3>${e.offAfter}</h3>
      ${_t(this.prefix, {
      label: e.offAfter,
      options: Ai.map((r) => ({ value: String(r), label: e.offAfterChoices[String(r)] })),
      value: String(i),
      disabled: !n,
      onSelect: (r) => this.change({ offAfter: Number(r) })
    })}
      <div class="footer">${o}</div>`;
  }
};
Qt.styles = [ze, Kt, R`
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
let T = Qt;
F([
  f({ attribute: !1 })
], T.prototype, "hass");
F([
  f({ attribute: !1 })
], T.prototype, "i18n");
F([
  f({ attribute: !1 })
], T.prototype, "texts");
F([
  f()
], T.prototype, "system");
F([
  f({ attribute: !1 })
], T.prototype, "rooms");
F([
  f({ attribute: !1 })
], T.prototype, "selected");
F([
  f()
], T.prototype, "prefix");
F([
  f({ type: Number })
], T.prototype, "delayMs");
F([
  _()
], T.prototype, "draft");
F([
  _()
], T.prototype, "busy");
F([
  _()
], T.prototype, "error");
function xe(s, t) {
  const e = Wt(`${s}-tile`);
  return qt`<${e}
    kind="action"
    ?centered=${t.centered ?? !1}
    .name=${t.name}
    .text=${t.text ?? ""}
    .state=${t.state}
    .disabled=${t.disabled ?? !1}
    .label=${t.label ?? ""}
    .pressed=${t.pressed}
    @hdk-press=${(i) => {
    i.stopPropagation(), t.onPress();
  }}
  ></${e}>`;
}
function _t(s, t) {
  const e = Wt(`${s}-segmented`);
  return qt`<${e}
    .label=${t.label}
    .options=${t.options}
    .value=${t.value}
    .disabled=${t.disabled ?? !1}
    ?wrap=${t.wrap ?? !1}
    @hdk-select=${(i) => {
    i.stopPropagation(), t.onSelect(i.detail.value);
  }}
  ></${e}>`;
}
function Mi(s, t) {
  const e = Wt(`${s}-slider`);
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
    @hdk-input=${(i) => i.stopPropagation()}
    @hdk-change=${(i) => {
    i.stopPropagation(), t.onChange(i.detail.value);
  }}
  ></${e}>`;
}
function Ei(s) {
  if (!customElements.get(`${s}-climate`)) {
    const t = class extends T {
      constructor() {
        super(), this.prefix = s;
      }
    };
    customElements.define(`${s}-climate`, t);
  }
}
var Ci = Object.defineProperty, dt = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && Ci(t, e, n), n;
};
const te = class te extends O {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, i = (t - e) / 2, n = 2 * Math.PI * i, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), r = t / 2;
    return h`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
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
          stroke-dasharray="${(n * o).toFixed(1)} ${n.toFixed(1)}"
          transform="rotate(-90 ${r} ${r})"
        ></circle>
      </svg>
      ${this.num ? h`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? h`<span class="unit">${this.unit}</span>` : m}` : m}
    </div>`;
  }
};
te.styles = R`
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
let Y = te;
dt([
  f({ type: Number })
], Y.prototype, "fraction");
dt([
  f({ type: Number })
], Y.prototype, "size");
dt([
  f({ type: Number })
], Y.prototype, "stroke");
dt([
  f()
], Y.prototype, "num");
dt([
  f()
], Y.prototype, "unit");
dt([
  f()
], Y.prototype, "label");
class Dt {
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
    const i = this.pressing, n = this.fired;
    return this.pressing = !1, this.fired = !1, !i || n ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
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
const Pt = R`
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
var Ti = Object.defineProperty, z = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && Ti(t, e, n), n;
};
const ee = class ee extends O {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new Xt(this), this.nudgeIndex = 0, this.gesture = new Dt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((a) => a.value === this.value), e = this.options.filter((a) => !a.disabled), i = this.options[t]?.value ?? e[0]?.value, n = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !n ? Math.sign(this.nudgeIndex - t) * 14 : 0, r = this._dragging ? this._dx : o;
    return h`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((a) => a.detail) || this.wrap ? "tall" : ""} ${this.wrap ? "wrap" : ""} ${this.disabled ? "off" : ""}"
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
      (a, l) => h`<button
            type="button"
            role="radio"
            aria-checked=${a.value === this.value ? "true" : "false"}
            tabindex=${a.value === i ? 0 : -1}
            ?disabled=${this.disabled || a.disabled}
            data-value=${a.value}
            data-index=${l}
            @click=${(d) => this.onClick(d, a.value, l)}
          >
            <span>${a.label}</span>${a.detail ? h`<span class="detail">${a.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? h`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
    const n = this.gesture.tap(String(i), t.timeStamp);
    if (this.swallowClick || n === "none") {
      this.swallowClick = !1;
      return;
    }
    n === "double" ? this.select(e) : (this.nudgeIndex = i, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, i = this.options.findIndex((a) => a.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: i, moved: !1, id: t.pointerId };
    const n = t.target.closest("button[data-index]"), o = n ? Number(n.dataset.index) : -1, r = o >= 0 && o !== i && !this.options[o]?.disabled;
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
    const n = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((n - e.index) * e.width, i)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (this.gesture.release(), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const i = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const n = this.options[i];
    n && !n.disabled && i !== e.index && this.select(n.value);
  }
  onCancel() {
    this.gesture.cancel(), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const i = this.options.filter((a) => !a.disabled);
    if (!i.length) return;
    const n = i.findIndex((a) => a.value === this.value), o = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, r = i[(n + o + i.length) % i.length];
    t.preventDefault(), this.select(r.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${r.value}"]`)?.focus());
  }
};
ee.styles = [
  Pt,
  R`
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
let A = ee;
z([
  f({ attribute: !1 })
], A.prototype, "options");
z([
  f()
], A.prototype, "value");
z([
  f()
], A.prototype, "label");
z([
  f({ type: Boolean })
], A.prototype, "disabled");
z([
  f({ type: Boolean })
], A.prototype, "compact");
z([
  f({ type: Boolean })
], A.prototype, "wrap");
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
  _()
], A.prototype, "_dx");
z([
  _()
], A.prototype, "_dragging");
var Ni = Object.defineProperty, it = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && Ni(t, e, n), n;
};
const zi = 100, Di = 0.6, Pi = 6, ie = class ie extends O {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.wide = !1, this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.close();
        return;
      }
      if (t.key !== "Tab") return;
      const e = this.focusable();
      if (!e.length) return;
      const i = t.composedPath(), n = e.findIndex((r) => i.includes(r)), o = t.shiftKey ? e[n <= 0 ? e.length - 1 : n - 1] : e[n === -1 || n === e.length - 1 ? 0 : n + 1];
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
      const i = t.clientY - e.startY;
      if (!this.dragging) {
        if (i < Pi) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, i);
    }, this.dragEnd = (t) => {
      const e = this.drag;
      if (this.drag = void 0, !e || !this.dragging) return;
      this.dragging = !1;
      const i = Math.max(0, t.clientY - e.startY), n = i / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (i > zi || n > Di) ? this.close() : this.dragY = 0;
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
    const t = 'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), [tabindex]:not([tabindex="-1"])', e = (n) => [...n.querySelectorAll("*")].flatMap((o) => [
      ...o.matches(t) ? [o] : [],
      ...o.shadowRoot ? e(o.shadowRoot) : []
    ]), i = this.renderRoot.querySelector(".close");
    return [...i ? [i] : [], ...e(this).filter((n) => n.getClientRects().length > 0)];
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. Outside the sheet nothing scrolls. */
  cannotScroll(t, e) {
    const i = this.renderRoot.querySelector(".panel");
    return !i || !t.composedPath().includes(i) ? !0 : !(i.scrollHeight > i.clientHeight + 1) || e > 0 && i.scrollTop <= 0 || e < 0 && i.scrollTop + i.clientHeight >= i.scrollHeight - 1;
  }
  render() {
    return this.open ? h`<div
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
              ${this.sub ? h`<div class="sub">${this.sub}</div>` : m}
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
ie.styles = [ze, R`
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
let I = ie;
it([
  f({ type: Boolean, reflect: !0 })
], I.prototype, "open");
it([
  f()
], I.prototype, "heading");
it([
  f()
], I.prototype, "sub");
it([
  f()
], I.prototype, "closeLabel");
it([
  f({ type: Boolean })
], I.prototype, "wide");
it([
  _()
], I.prototype, "dragY");
it([
  _()
], I.prototype, "dragging");
var Oi = Object.defineProperty, D = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && Oi(t, e, n), n;
};
const se = class se extends O {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [];
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, i = Math.max(0, Math.min(1, (t - this.min) / e)), n = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${i})`, o = this.mixed && this._drag === void 0 ? this.marks.map((d) => h`<i style="left:${(Math.max(0, Math.min(1, (d - this.min) / e)) * 100).toFixed(2)}%"></i>`) : [], r = this.tickStep || this.step || 1, a = Math.floor(e / r + 1e-9) + 1, l = a >= 2 && a <= 40 ? Array.from({ length: a }, (d, g) => h`<i style="left:${(g * r / e * 100).toFixed(2)}%"></i>`) : [];
    return h`<div class="wrap">
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(t)}
          aria-label=${this.label}
          aria-valuetext=${this.valueText || String(t)}
          ?disabled=${this.disabled}
          style="--fill: ${n}"
          @input=${this.onInput}
          @change=${this.onChange}
        />
        <div class="ticks" aria-hidden="true">${l}</div>
        ${o.length ? h`<div class="marks" aria-hidden="true">${o}</div>` : null}
      </div>
      ${this.minLabel || this.maxLabel ? h`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
se.styles = R`
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
let M = se;
D([
  f({ type: Number })
], M.prototype, "min");
D([
  f({ type: Number })
], M.prototype, "max");
D([
  f({ type: Number })
], M.prototype, "step");
D([
  f({ type: Number })
], M.prototype, "tickStep");
D([
  f({ type: Number })
], M.prototype, "value");
D([
  f()
], M.prototype, "label");
D([
  f()
], M.prototype, "valueText");
D([
  f()
], M.prototype, "minLabel");
D([
  f()
], M.prototype, "maxLabel");
D([
  f({ type: Boolean })
], M.prototype, "disabled");
D([
  f({ type: Boolean, reflect: !0 })
], M.prototype, "mixed");
D([
  f({ attribute: !1 })
], M.prototype, "marks");
D([
  _()
], M.prototype, "_drag");
var Li = Object.defineProperty, V = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && Li(t, e, n), n;
};
const ne = class ne extends O {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new Xt(this), this.gesture = new Dt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return h`<button
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
      ${this.hints.hint ? h`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
ne.styles = [
  Pt,
  R`
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
let L = ne;
V([
  f({ type: Boolean })
], L.prototype, "checked");
V([
  f({ type: Boolean })
], L.prototype, "disabled");
V([
  f()
], L.prototype, "label");
V([
  f({ type: Boolean })
], L.prototype, "guarded");
V([
  f({ type: Number })
], L.prototype, "holdMs");
V([
  f({ type: Number })
], L.prototype, "doubleTapMs");
V([
  f({ type: Number })
], L.prototype, "hintSeconds");
V([
  f()
], L.prototype, "hintPlacement");
V([
  f()
], L.prototype, "hint");
var Ri = Object.defineProperty, E = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && Ri(t, e, n), n;
};
const oe = class oe extends O {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new Xt(this), this.gesture = new Dt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  /** The state line is text from parts („WindFree · 24°“): it breaks only at the dot, and the dot goes (Text z částí). */
  updated() {
    Ct(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.kind === "toggle", e = this.count === void 0 ? null : h`<span class="count">${this.count}</span>`;
    return h`<button
        type="button"
        role=${t ? "switch" : "button"}
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${t ? this.state === "on" ? "true" : "false" : m}
        aria-pressed=${this.kind === "action" && this.pressed !== void 0 ? this.pressed ? "true" : "false" : m}
        aria-haspopup=${this.kind === "open" ? "dialog" : m}
        aria-label=${this.label || m}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(i) => this.protected && i.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? h`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : h`<span class="text">${bt(this.text)}${e}</span>`}</button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? h`<div class="hint above ${this.hintAlign}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
  Pt,
  Kt,
  R`
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
let k = oe;
E([
  f()
], k.prototype, "name");
E([
  f()
], k.prototype, "text");
E([
  f({ reflect: !0 })
], k.prototype, "state");
E([
  f()
], k.prototype, "kind");
E([
  f({ type: Number })
], k.prototype, "count");
E([
  f({ type: Boolean, reflect: !0 })
], k.prototype, "centered");
E([
  f({ type: Boolean })
], k.prototype, "disabled");
E([
  f({ type: Boolean })
], k.prototype, "pressed");
E([
  f()
], k.prototype, "label");
E([
  f({ type: Boolean })
], k.prototype, "guarded");
E([
  f({ type: Number })
], k.prototype, "holdMs");
E([
  f({ type: Number })
], k.prototype, "doubleTapMs");
E([
  f({ type: Number })
], k.prototype, "hintSeconds");
E([
  f()
], k.prototype, "hint");
E([
  f()
], k.prototype, "hintAlign");
function Fi(s) {
  const t = [
    [`${s}-switch`, L],
    [`${s}-segmented`, A],
    [`${s}-slider`, M],
    [`${s}-ring`, Y],
    [`${s}-tile`, k],
    [`${s}-sheet`, I]
  ];
  for (const [e, i] of t)
    customElements.get(e) || customElements.define(e, i);
}
const ji = ["cs", "en", "sv"];
class Pe extends Error {
}
function y(s) {
  throw new Pe(s);
}
function Ui(s, t) {
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
  return s == null ? {} : (H(s) || y(`"${t}" must be a mapping of keys.`), s);
}
function P(s, t, e) {
  for (const i of Object.keys(s))
    t.includes(i) || y(`${e}: unknown key "${i}" (allowed: ${t.join(", ")}).`);
}
function w(s, t, e = {}) {
  if (s == null)
    return;
  const i = typeof s == "string" ? s.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(i) || y(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !i.startsWith(`${e.domain}.`) && y(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${i}.`), i;
}
function Ii(s, t) {
  if (s != null)
    return (typeof s != "string" || !s.trim()) && y(`${t} must be a non-empty text.`), s.trim();
}
function J(s, t) {
  if (s != null) {
    if (typeof s == "string" && s.trim())
      return s.trim();
    if (H(s) && Object.keys(s).length > 0) {
      const e = Object.entries(s);
      if (e.every(([i, n]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(i) && typeof n == "string" && n.trim()))
        return Object.fromEntries(e.map(([i, n]) => [i, n.trim()]));
    }
    return y(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Bi(s, t) {
  if (s === void 0 || typeof s == "string")
    return s;
  const e = t.toLowerCase();
  return s[e] ?? s[e.split("-")[0]] ?? s.en ?? Object.values(s)[0];
}
const we = ["auto", ...ji];
function Hi(s) {
  const t = s ?? "auto";
  return we.includes(t) || y(`language must be one of ${we.join(", ")}.`), t;
}
const Yi = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function jt(s) {
  return Yi.has(s);
}
function C(s, t) {
  return t ? s?.states?.[t] : void 0;
}
function U(s, t) {
  const e = C(s, t)?.state;
  return e === void 0 || jt(e) ? void 0 : e;
}
function St(s, t) {
  const e = U(s, t);
  if (e === void 0)
    return;
  const i = Number(e);
  return Number.isFinite(i) ? i : void 0;
}
const Vi = 168 * 36e5;
function Oe(s) {
  if (s == null) return;
  const t = typeof s == "number" ? s < 1e11 ? s * 1e3 : s : Date.parse(s);
  return Number.isFinite(t) ? t : void 0;
}
function Wi(s) {
  let t;
  for (const e of s ?? []) {
    const i = e.s ?? e.state, n = Oe(e.lu ?? e.last_updated);
    i === void 0 || n === void 0 || i === "unavailable" || i === "unknown" || i === "" || (t === void 0 || t.state !== i) && (t = { state: i, start: n });
  }
  return t;
}
class qi {
  constructor(t, e = Date.now) {
    this.onChange = t, this.now = e, this.known = /* @__PURE__ */ new Map(), this.wanted = /* @__PURE__ */ new Map(), this.pending = /* @__PURE__ */ new Map(), this.scheduled = !1;
  }
  /** The moment (ms) the entity got its current state; undefined when the entity is missing or has no time. */
  of(t, e) {
    const i = C(t, e);
    if (!t || !e || !i) return;
    const n = Oe(i.last_changed), o = `${i.state}|${i.last_changed ?? ""}`, r = this.known.get(e);
    return r?.key === o ? r.start === void 0 ? n : Math.min(r.start, n ?? r.start) : (this.hass = t, this.wanted.get(e) !== o && this.pending.get(e) !== o && (this.wanted.set(e, o), this.schedule()), n);
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
    let n;
    try {
      n = await t.callWS({
        type: "history/history_during_period",
        start_time: new Date(i - Vi).toISOString(),
        end_time: new Date(i).toISOString(),
        entity_ids: [...e.keys()],
        include_start_time_state: !0,
        significant_changes_only: !1,
        minimal_response: !0,
        no_attributes: !0
      });
    } catch {
      n = void 0;
    }
    for (const [o, r] of e) {
      if (this.pending.get(o) === r && this.pending.delete(o), this.wanted.has(o)) continue;
      const a = Wi(n?.[o]), l = C(this.hass, o)?.state;
      this.known.set(o, { key: r, start: a && a.state === l ? a.start : void 0 });
    }
    this.onChange();
  }
}
const Ki = [
  { name: { cs: "Den", en: "Day", sv: "Dag" }, position: 100, tilt: 100 },
  { name: { cs: "Stín", en: "Shade", sv: "Skugga" }, position: 0, tilt: 100 },
  { name: { cs: "Tma", en: "Dark", sv: "Mörker" }, position: 0, tilt: 0 }
];
function ot(s, t) {
  return s == null ? [] : (Array.isArray(s) || y(`"${t}" must be a list.`), s);
}
function q(s, t, e, i, n) {
  return s == null ? e : ((typeof s != "number" || !Number.isFinite(s) || s < i || s > n) && y(`${t} must be a number from ${i} to ${n}.`), s);
}
function ft(s, t, e) {
  return ot(s, t).map((i, n) => {
    const o = `${t}[${n}]`;
    H(i) || y(`${o} must be a mapping with name and entity.`), P(i, ["name", "entity"], o);
    const r = J(i.name, `${o}.name`) ?? y(`${o}.name is missing.`), a = w(i.entity, `${o}.entity`, { example: `${e[0]}.example` }) ?? y(`${o}.entity is missing.`);
    return e.includes(a.split(".")[0]) || y(`${o}.entity must be one of ${e.join(", ")}, not ${a}.`), { name: r, entity: a };
  });
}
function Gi(s) {
  H(s) || y("the configuration must be a mapping of keys.");
  const t = st(s.covers, "covers");
  P(t, ["script", "entities", "last_action", "presets", "tolerance"], "covers");
  const e = {}, i = ot(t.entities, "covers.entities").map((u, $) => {
    const b = `covers.entities[${$}]`;
    if (!H(u)) return w(u, b, { domain: "cover" }) ?? y(`${b} is missing.`);
    P(u, ["name", "entity"], b);
    const S = w(u.entity, `${b}.entity`, { domain: "cover" }) ?? y(`${b}.entity is missing.`), W = J(u.name, `${b}.name`);
    return W !== void 0 && (e[S] = W), S;
  }), n = st(s.ventilation, "ventilation");
  P(n, ["mode", "fans"], "ventilation");
  const o = st(s.heating, "heating");
  P(o, ["resume", "rooms"], "heating");
  const r = st(s.cooling, "cooling");
  P(r, ["rooms"], "cooling");
  const a = st(s.guard, "guard");
  P(a, ["hold_ms", "double_tap_ms", "hint_seconds"], "guard");
  const l = st(s.house_modes, "house_modes");
  P(l, ["winter", "summer"], "house_modes");
  const d = ot(t.presets, "covers.presets").map((u, $) => {
    const b = `covers.presets[${$}]`;
    return H(u) || y(`${b} must be a mapping with name, position and tilt.`), P(u, ["name", "position", "tilt"], b), {
      name: J(u.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      position: q(u.position, `${b}.position`, 0, 0, 100),
      tilt: q(u.tilt, `${b}.tilt`, 0, 0, 100)
    };
  }), g = ot(s.batteries, "batteries").map((u, $) => {
    const b = `batteries[${$}]`;
    return H(u) || y(`${b} must be a mapping with name and low.`), P(u, ["name", "low", "level", "type"], b), {
      name: J(u.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      low: w(u.low, `${b}.low`, { domain: "binary_sensor" }) ?? y(`${b}.low is missing.`),
      level: w(u.level, `${b}.level`, { domain: "sensor" }),
      type: w(u.type, `${b}.type`, { domain: "sensor" })
    };
  }), c = ot(s.filters, "filters").map((u, $) => {
    const b = `filters[${$}]`;
    return H(u) || y(`${b} must be a mapping with name, hours and threshold.`), P(u, ["name", "hours", "threshold"], b), {
      name: J(u.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      hours: w(u.hours, `${b}.hours`, { domain: "input_number" }) ?? y(`${b}.hours is missing.`),
      threshold: w(u.threshold, `${b}.threshold`, { domain: "select" }) ?? y(`${b}.threshold is missing.`)
    };
  }), p = ot(s.maintenance, "maintenance").map((u, $) => {
    const b = `maintenance[${$}]`;
    return H(u) || y(`${b} must be a mapping with name, task, counter and every.`), P(u, ["name", "task", "counter", "every"], b), {
      name: J(u.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      task: J(u.task, `${b}.task`) ?? y(`${b}.task is missing.`),
      counter: w(u.counter, `${b}.counter`, { domain: "counter" }) ?? y(`${b}.counter is missing.`),
      every: q(u.every, `${b}.every`, 30, 1, 1e3)
    };
  });
  return {
    language: Hi(s.language),
    houseMode: w(s.house_mode_entity, "house_mode_entity", { domain: "input_select" }),
    summer: Ii(l.summer, "house_modes.summer") ?? "Léto",
    failedActions: w(s.failed_actions, "failed_actions", { domain: "sensor" }),
    clearFailed: w(s.clear_failed_script, "clear_failed_script", { domain: "script" }),
    snoozed: w(s.snoozed, "snoozed", { domain: "sensor" }),
    snoozeScript: w(s.snooze_script, "snooze_script", { domain: "script" }),
    batteries: g,
    filters: c,
    laundry: ft(s.laundry, "laundry", ["input_boolean"]),
    maintenance: p,
    running: ft(s.running, "running", ["input_boolean", "binary_sensor", "switch", "vacuum"]),
    covers: {
      script: w(t.script, "covers.script", { domain: "script" }) ?? "script.zaluzie_posun",
      entities: i,
      names: e,
      lastAction: w(t.last_action, "covers.last_action", { domain: "sensor" }),
      presets: d.length ? d : Ki,
      tolerance: q(t.tolerance, "covers.tolerance", 5, 0, 20)
    },
    ventilation: {
      mode: w(n.mode, "ventilation.mode", { domain: "input_boolean" }),
      fans: ft(n.fans, "ventilation.fans", ["switch", "fan"])
    },
    heating: {
      resume: w(o.resume, "heating.resume", { domain: "button" }),
      rooms: ft(o.rooms, "heating.rooms", ["climate"])
    },
    cooling: { rooms: ft(r.rooms, "cooling.rooms", ["climate"]) },
    sendDelaySeconds: q(s.send_delay_seconds, "send_delay_seconds", 2, 0, 30),
    guard: {
      holdMs: q(a.hold_ms, "guard.hold_ms", 550, 200, 3e3),
      doubleTapMs: q(a.double_tap_ms, "guard.double_tap_ms", 400, 150, 1500),
      hintSeconds: q(a.hint_seconds, "guard.hint_seconds", 3, 1, 10)
    }
  };
}
function Zi(s) {
  return Ui("Dům Dashboard", () => Gi(s));
}
function Le(s) {
  return (s?.locale?.language || s?.language || "").trim();
}
function Jt(s) {
  const t = s.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Xi(s, t) {
  return s === "auto" ? Jt(Le(t)) : s;
}
function Ji() {
  return Jt(document.documentElement.lang || navigator.language || "");
}
const ke = /* @__PURE__ */ new WeakMap(), Qi = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, ts = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), es = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Rt(s, t) {
  const e = s?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function is(s, t, e) {
  const i = Le(e).replace("_", "-"), n = i !== "" && Jt(i) === t ? i : Qi[t], o = Rt(e, "number_format"), r = Rt(e, "time_format"), a = Rt(e, "date_format"), l = [t, n, o, r, a].join("|");
  let d = ke.get(s);
  d || (d = /* @__PURE__ */ new Map(), ke.set(s, d));
  let g = d.get(l);
  return g || (g = os(s[t], t, n, o, r, a), d.set(l, g)), g;
}
function ss(s) {
  try {
    return new Intl.NumberFormat(s), s;
  } catch {
    return "en";
  }
}
function ns(s, t) {
  if (s === "12")
    return !0;
  if (s === "24")
    return !1;
  const e = s === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function os(s, t, e, i, n, o) {
  const r = ss(e), a = i === "system" ? void 0 : i === "none" ? "en-US" : es[i] ?? r, l = i === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(a, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), g = new Intl.NumberFormat(a, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), c = new Intl.NumberFormat(a, { maximumFractionDigits: 1, ...l }), p = new Intl.NumberFormat(a, { maximumFractionDigits: 0, ...l }), u = ns(n, r), $ = u ? "h12" : "h23", b = new Intl.DateTimeFormat(r, { hour: u ? "numeric" : "2-digit", minute: "2-digit", hourCycle: $ }), S = new Intl.DateTimeFormat(r, u ? { hour: "numeric", hourCycle: $ } : { hour: "2-digit", minute: "2-digit", hourCycle: $ }), W = o === "system" ? void 0 : r, Z = new Intl.DateTimeFormat(W, { day: "numeric", month: "numeric" }), wt = (x) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return Z.format(x);
    const v = Z.formatToParts(x), B = v.find((ut) => ut.type === "literal")?.value ?? "/", ht = v[v.length - 1], ct = ht?.type === "literal" ? ht.value : "", ae = v.find((ut) => ut.type === "day")?.value ?? "", le = v.find((ut) => ut.type === "month")?.value ?? "";
    return o === "DMY" ? `${ae}${B}${le}${ct}` : `${le}${B}${ae}${ct}`;
  }, kt = ts.has(r.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: r,
    t: s,
    one: (x) => d.format(x),
    two: (x) => g.format(x),
    half: (x) => c.format(Math.round(x * 2) / 2),
    tick: (x) => c.format(x),
    whole: (x) => p.format(x),
    percent: (x) => `${x}${kt}%`,
    time: (x) => b.format(x),
    hour: (x) => S.format(x),
    day: wt
  };
}
const rs = {
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
}, as = {
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
}, ls = {
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
}, ds = { cs: rs, en: as, sv: ls };
function Re(s, t) {
  return is(ds, s, t);
}
const hs = R`
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
`, cs = ["unavailable", "unknown", ""], us = ["opening", "closing"], ps = 2 * 6e4;
function Ft(s) {
  return typeof s.when == "number" ? s.when * 1e3 : Date.parse(s.when);
}
function _e(s) {
  return s.context_name || s.context_entity_id_name || (s.context_user_id ? "app" : "");
}
function fs(s, t) {
  const e = s.filter((r) => typeof r.entity_id == "string" && r.state !== void 0).sort((r, a) => Ft(r) - Ft(a)), i = /* @__PURE__ */ new Map(), n = [];
  for (const r of e) {
    const a = String(r.state);
    if (us.includes(a)) {
      const d = _e(r);
      d && i.set(r.entity_id, d);
      continue;
    }
    const l = _e(r) || i.get(r.entity_id) || "";
    i.delete(r.entity_id), !cs.includes(a) && n.push({ time: Ft(r), entries: [r], state: a, reason: l, kind: t(r.entity_id) });
  }
  const o = [];
  for (const r of n) {
    const a = o.find(
      (l) => l.kind === r.kind && l.state === r.state && l.reason === r.reason && r.time - l.time <= ps && !l.entries.some((d) => d.entity_id === r.entries[0].entity_id)
    );
    a && r.kind ? (a.entries.push(r.entries[0]), a.time = r.time) : o.push(r);
  }
  return o.sort((r, a) => a.time - r.time);
}
function ms(s) {
  const t = s.map((i) => i.split(" "));
  let e = 0;
  for (; t.every((i) => i.length > e + 1 && i[e] === t[0][e]); ) e += 1;
  return t.map((i) => {
    const n = i.slice(e).join(" ");
    return n.charAt(0).toLocaleUpperCase() + n.slice(1);
  });
}
var gs = Object.defineProperty, j = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && gs(t, e, n), n;
};
const Fe = "dum-dashboard.log-seen";
function bs() {
  try {
    return Number(localStorage.getItem(Fe)) || 0;
  } catch {
    return 0;
  }
}
function vs(s) {
  try {
    localStorage.setItem(Fe, String(s));
  } catch {
  }
}
const $s = h`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="8" width="16" height="8" rx="2"></rect><path d="M21 11v2" stroke-linecap="round"></path><rect x="5" y="10" width="3" height="4" fill="currentColor" stroke="none"></rect></svg>`, ys = h`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 8v8M12 8v8M16 8v8"></path></svg>`, xs = h`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2.5"></rect><circle cx="12" cy="13" r="4.5"></circle><path d="M7.5 6.5h2" stroke-linecap="round"></path></svg>`, ws = h`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.6-.6-2.6z"></path></svg>`, re = class re extends O {
  constructor() {
    super(...arguments), this._error = "", this._now = Date.now(), this._seen = bs(), this._climateSelected = [], this._fit = "", this.starts = new qi(() => this.requestUpdate()), this.gesture = new Dt(() => ({
      holdMs: this._config?.guard.holdMs ?? 550,
      doubleTapMs: this._config?.guard.doubleTapMs ?? 400
    })), this.closeMenu = (t) => {
      this._menu && (t instanceof KeyboardEvent ? t.key === "Escape" : !t.composedPath().some((e) => e instanceof Element && e.classList.contains("snooze"))) && (this._menu = void 0);
    };
  }
  setConfig(t) {
    this._config = Zi(t);
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
    Ct(this.renderRoot, this._fit), t.has("_detail") && this._detail && this.renderRoot.querySelector("dd-sheet")?.updateComplete?.then(() => Ct(this.renderRoot, this._fit));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer), window.clearInterval(this.logTimer), window.clearTimeout(this.hintTimer), window.removeEventListener("pointerdown", this.closeMenu), window.removeEventListener("keydown", this.closeMenu), this.resize?.disconnect(), this.gesture.dispose();
  }
  willUpdate(t) {
    t.has("hass") && (this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1), this._now = Date.now(), t.get("hass") || this.loadLog());
  }
  get i18n() {
    return Re(Xi(this._config?.language ?? "auto", this.hass), this.hass);
  }
  name(t) {
    return Bi(t, this.i18n.language) ?? "";
  }
  render() {
    const t = this._config;
    if (!t) return m;
    const e = this.i18n, n = t.houseMode !== void 0 && U(this.hass, t.houseMode) === t.summer ? [this.renderCooling(t, e), this.renderHeating(t, e)] : [this.renderHeating(t, e), this.renderCooling(t, e)];
    return h`<ha-card>
      ${this.renderQueue(t, e)} ${this.renderRunning(t, e)} ${this.renderCovers(t, e)}
      ${this.renderVentilation(t, e)} ${n} ${this.renderLogRow(t, e)}
      ${this._error ? h`<div class="error" role="alert">${this._error}</div>` : m}
    </ha-card>
    ${this.renderCoversDetail(t, e)} ${this.renderClimate(t, e)} ${this.renderLog(t, e)}`;
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
      ...t.laundry.map((e) => e.entity)
    ];
  }
  async loadLog() {
    const t = this._config, e = this.hass;
    if (!t || !e?.callWS) return;
    const i = this.logEntities(t);
    if (!i.length) return;
    const n = /* @__PURE__ */ new Date();
    n.setHours(0, 0, 0, 0);
    try {
      const o = await e.callWS({ type: "logbook/get_events", start_time: n.toISOString(), entity_ids: i });
      this._log = Array.isArray(o) ? o : [];
    } catch {
    }
  }
  /** Which entities are one kind: one action on several of them is one row. */
  logKind(t) {
    const e = /* @__PURE__ */ new Map();
    return t.covers.entities.forEach((i) => e.set(i, "covers")), [t.ventilation.mode, ...t.ventilation.fans.map((i) => i.entity)].forEach((i) => i && e.set(i, "ventilation")), t.heating.rooms.forEach((i) => e.set(i.entity, "heating")), t.cooling.rooms.forEach((i) => e.set(i.entity, "cooling")), (i) => e.get(i) ?? "";
  }
  logName(t) {
    const e = C(this.hass, t.entity_id);
    return t.name || (typeof e?.attributes.friendly_name == "string" ? e.attributes.friendly_name : t.entity_id);
  }
  logState(t, e) {
    const i = this.hass, n = C(this.hass, t.entity_id);
    return n && i?.formatEntityState ? i.formatEntityState(n, e) : e;
  }
  logRows(t) {
    return fs(this._log ?? [], this.logKind(t));
  }
  renderLogRow(t, e) {
    if (!this.logEntities(t).length) return m;
    const i = e.t, n = this.logRows(t).filter((l) => l.time > this._seen).length, o = /* @__PURE__ */ new Date();
    o.setHours(0, 0, 0, 0);
    const r = this._seen < o.getTime(), a = this._log === void 0 ? "" : n ? r ? i.logToday(n) : i.logNew(n, e.time(this._seen)) : i.logNothingNew;
    return h`<div class="group" data-part="log">
      <button class="row link-row" type="button" aria-haspopup="dialog" @click=${() => this.openLog()}>
        <span class="main">${i.log}${a ? h`<small>${a}</small>` : m}</span>
        <span class="chevron-mark" aria-hidden="true">›</span>
      </button>
    </div>`;
  }
  openLog() {
    this._detail = "log", this.loadLog();
  }
  closeLog() {
    this._detail = void 0, this._seen = Date.now(), vs(this._seen);
  }
  renderLog(t, e) {
    if (!this.logEntities(t).length) return m;
    const i = e.t, n = this._detail === "log", o = this.logRows(t), r = o.filter((g) => g.time > this._seen), a = o.filter((g) => g.time <= this._seen), l = { covers: i.covers, ventilation: i.ventilation, heating: i.heating, cooling: i.cooling }, d = (g) => g.map((c) => {
      const p = c.reason === "app" ? i.who.aplikace : c.reason, u = this.logState(c.entries[0], c.state), $ = c.entries.length > 1, b = $ ? `${l[c.kind] ?? ""} · ${u}` : `${this.logName(c.entries[0])} · ${u}`;
      return h`<div class="log-row"><span class="log-time">${e.time(c.time)}</span><span class="main"
            >${b}${$ ? h`<span class="log-members">${ms(c.entries.map((S) => this.logName(S))).join(", ")}</span>` : m}${p ? h`<small>${p}</small>` : m}</span
          ></div>`;
    });
    return h`<dd-sheet .open=${n} .heading=${i.log} .closeLabel=${i.close} @hdk-close=${() => this.closeLog()}>
      ${n ? h`<div class="detail" data-part="log-detail">
            ${this._log === void 0 ? h`<p class="log-empty">${i.logFailed}</p>` : o.length ? h`${r.length ? h`<h3>${i.logSince}</h3>${d(r)}` : m}${a.length ? h`<h3>${i.logEarlier}</h3>${d(a)}` : m}` : h`<p class="log-empty">${i.logEmpty}</p>`}
          </div>` : m}
    </dd-sheet>`;
  }
  /* ---------- Potřebuje tebe ---------- */
  failed(t) {
    const e = C(this.hass, t.failedActions)?.attributes.polozky;
    return Array.isArray(e) ? e.filter((i) => typeof i == "object" && i !== null && typeof i.entita == "string") : [];
  }
  renderQueue(t, e) {
    if (!t.failedActions && !t.batteries.length && !t.filters.length && !t.laundry.length && !t.maintenance.length) return m;
    const i = e.t, n = this.failed(t), o = this.snoozed(t), r = t.batteries.filter((p) => U(this.hass, p.low) === "on" && !o.has(`battery:${p.low}`)), a = this.dirtyFilters(t).filter(({ filter: p }) => !o.has(`filter:${p.hours}`)), l = t.laundry.filter((p) => U(this.hass, p.entity) === "on"), d = t.maintenance.flatMap((p) => {
      const u = St(this.hass, p.counter);
      return u !== void 0 && u >= p.every && !o.has(`maintenance:${p.counter}`) ? [{ item: p, cycles: u }] : [];
    }), g = n.length + r.length + a.length + l.length + d.length, c = [
      ...n.map((p, u) => {
        const $ = C(this.hass, p.entita)?.attributes.friendly_name, b = p.cas ? Date.parse(p.cas) : NaN, S = p.duvod || p.akce, W = mt([S ? S.charAt(0).toLocaleUpperCase(e.language) + S.slice(1) : void 0, Number.isFinite(b) ? e.time(b) : void 0].filter(Boolean)), Z = this.retryOf(t, p);
        return h`<div class="row" data-row="failed">
          <span class="mark warn" aria-hidden="true">!</span>
          <span class="main">${typeof $ == "string" ? $ : p.entita}<small>${W}</small></span>
          ${Z ? h`<button class="button ${u === 0 ? "primary" : ""}" type="button" @click=${Z}>${i.retry}</button>` : t.clearFailed ? h`<button class="button" type="button" @click=${() => this.call("script", t.clearFailed.split(".")[1], { entita: p.entita })}>${i.done}</button>` : m}
        </div>`;
      }),
      ...r.map((p) => {
        const u = St(this.hass, p.level), $ = U(this.hass, p.type), b = mt([i.battery(u === void 0 ? void 0 : e.percent(Math.round(u))), $].filter(Boolean));
        return h`<div class="row" data-row="battery">
          <span class="mark">${$s}</span>
          <span class="main">${this.name(p.name)}<small>${b}</small></span>
          ${this.snoozeButton(t, `battery:${p.low}`, e)}
        </div>`;
      }),
      ...a.map(({ filter: p, hours: u, threshold: $ }) => {
        const b = (S) => `${e.whole(Math.floor(S))} h`;
        return h`<div class="row two" data-row="filter">
          <span class="mark">${ys}</span>
          <span class="main">${this.name(p.name)}<small>${bt(i.filter(b(u), b($)))}</small></span>
          <span class="actions">
            ${this.snoozeButton(t, `filter:${p.hours}`, e)}
            <button class="button" type="button" @click=${() => this.call("input_number", "set_value", { entity_id: p.hours, value: 0 })}>${i.done}</button>
          </span>
        </div>`;
      }),
      ...d.map(({ item: p, cycles: u }) => h`<div class="row two" data-row="maintenance">
        <span class="mark">${ws}</span>
        <span class="main">${this.name(p.name)}<small>${mt([this.name(p.task), i.cycles(u, p.every)])}</small></span>
        <span class="actions">
          ${this.snoozeButton(t, `maintenance:${p.counter}`, e)}
          <button class="button" type="button" @click=${() => this.call("counter", "reset", { entity_id: p.counter })}>${i.done}</button>
        </span>
      </div>`),
      ...l.map((p) => {
        const u = this.starts.of(this.hass, p.entity), $ = u !== void 0 && new Date(u).toDateString() === new Date(this._now).toDateString(), b = u === void 0 ? "" : $ ? e.time(u) : e.day(u);
        return h`<div class="row" data-row="laundry">
          <span class="mark">${xs}</span>
          <span class="main">${this.name(p.name)}<small>${bt(i.laundry(b))}</small></span>
          <button class="button" type="button" @click=${() => this.call("input_boolean", "turn_off", { entity_id: p.entity })}>${i.done}</button>
        </div>`;
      })
    ];
    return h`<h2><span>${g ? `${i.needsYou} · ${g}` : i.needsYou}</span></h2>
      <div class="group" data-part="queue">
        ${c.length ? c : h`<div class="row"><span class="main">${i.nothingWaits}</span></div>`}
      </div>`;
  }
  /** Air conditioners that ran at least their threshold since the filter was cleaned; a missing value is no task. */
  dirtyFilters(t) {
    return t.filters.flatMap((e) => {
      const i = St(this.hass, e.hours), n = St(this.hass, e.threshold);
      return i !== void 0 && n !== void 0 && n > 0 && i >= n ? [{ filter: e, hours: i, threshold: n }] : [];
    });
  }
  /* ---------- Odložit ---------- */
  day(t) {
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }
  /** The keys of the items postponed to a later day than today. */
  snoozed(t) {
    const e = C(this.hass, t.snoozed)?.attributes.polozky, i = this.day(new Date(this._now)), n = /* @__PURE__ */ new Set();
    if (Array.isArray(e))
      for (const o of e)
        typeof o?.klic == "string" && typeof o.do == "string" && o.do > i && n.add(o.klic);
    return n;
  }
  /** "Odložit" with its menu (a day, to the weekend, a week, a month; without a time, it is no alarm). The menu only covers what is under it. */
  snoozeButton(t, e, i) {
    if (!t.snoozed || !t.snoozeScript) return m;
    const n = i.t, o = new Date(this._now), r = (p) => new Date(o.getFullYear(), o.getMonth(), o.getDate() + p), a = (6 - o.getDay() + 7) % 7 || 7, l = new Date(o.getFullYear(), o.getMonth() + 1, o.getDate()), d = [[n.snoozeFor.day, r(1)], [n.snoozeFor.weekend, r(a)], [n.snoozeFor.week, r(7)], [n.snoozeFor.month, l]], g = this._menu === e, c = (p) => {
      this._menu = void 0, this.call("script", t.snoozeScript.split(".")[1], { klic: e, do: this.day(p) });
    };
    return h`<span class="snooze">
      <button class="button" type="button" aria-haspopup="menu" aria-expanded=${g ? "true" : "false"} @click=${() => this._menu = g ? void 0 : e}>${n.snooze}</button>
      ${g ? h`<div class="menu" role="menu">
            ${d.map(([p, u]) => h`<button type="button" role="menuitem" @click=${() => c(u)}><span>${p}</span><span class="until">${i.day(u.getTime())}</span></button>`)}
          </div>` : m}
    </span>`;
  }
  /** A failed command of a blind can be sent again when the sensor kept its target. */
  retryOf(t, e) {
    const i = e.cil;
    if (!e.entita.startsWith("cover.") || !i || i.pos === void 0 || i.tilt === void 0) return;
    const n = Number(i.pos), o = Number(i.tilt);
    if (!(!Number.isFinite(n) || !Number.isFinite(o)))
      return () => this.call("script", t.covers.script.split(".")[1], { entity: e.entita, pos: n, tilt: o });
  }
  /* ---------- Teď běží ---------- */
  duration(t, e) {
    const i = this.starts.of(this.hass, t);
    if (i === void 0) return "";
    const n = Math.max(0, Math.floor((this._now - i) / 6e4));
    return n < 60 ? e.t.minutes(n) : e.t.hours(Math.floor(n / 60), n % 60);
  }
  renderRunning(t, e) {
    if (!t.running.length) return m;
    const i = t.running.filter((o) => ["on", "cleaning", "returning"].includes(U(this.hass, o.entity) ?? "")), n = i.map((o) => `${this.name(o.name)} ${this.duration(o.entity, e)}`.trim());
    return h`<h2><span>${e.t.running}</span></h2>
      <div class="group" data-part="running"><div class="row now ${i.length ? "" : "none"}"><span class="main" style="font-size:inherit;line-height:inherit">${n.length ? mt(n) : e.t.nothingRuns}</span></div></div>`;
  }
  /* ---------- Žaluzie ---------- */
  /** Whether one blind is in the preset: undefined when it does not report its position. */
  coverIn(t, e, i) {
    const n = C(this.hass, e);
    if (!n || jt(n.state)) return;
    const o = Number(n.attributes.current_position), r = Number(n.attributes.current_tilt_position);
    if (!(!Number.isFinite(o) || !Number.isFinite(r)))
      return Math.abs(o - i.position) <= t.covers.tolerance && Math.abs(r - i.tilt) <= t.covers.tolerance;
  }
  /** How many blinds are in the preset, and how many report their position at all. */
  inPreset(t, e) {
    let i = 0, n = 0;
    for (const o of t.covers.entities) {
      const r = this.coverIn(t, o, e);
      r !== void 0 && (n += 1, r && (i += 1));
    }
    return { count: i, known: n };
  }
  renderCovers(t, e) {
    if (!t.covers.entities.length) return m;
    const i = t.covers.presets.length - 1;
    return h`<h2>
        <span>${e.t.covers}</span>
        <button class="chevron" type="button" data-open="covers" aria-haspopup="dialog" aria-label=${e.t.coversDetail} @click=${() => this._detail = "covers"}>
          <span aria-hidden="true">›</span>
        </button>
      </h2>
      <div class="tiles" data-part="covers">
        ${t.covers.presets.map((n, o) => {
      const { count: r, known: a } = this.inPreset(t, n), l = a === t.covers.entities.length && r === a, d = l ? "on" : r > 0 ? "mixed" : "idle";
      return h`<dd-tile
            kind="action"
            centered
            guarded
            .name=${this.name(n.name)}
            .state=${d}
            .count=${r > 0 && !l ? r : void 0}
            .hint=${e.t.hint}
            .hintAlign=${o === 0 ? "start" : o === i ? "end" : "center"}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            @hdk-press=${() => this.setCovers(t, n)}
          ></dd-tile>`;
    })}
      </div>`;
  }
  /** When something happened: the time today, else the day. */
  when(t, e) {
    return new Date(t).toDateString() === new Date(this._now).toDateString() ? e.time(t) : e.day(t);
  }
  /** The last action of one blind: a failed command first (warning), else who moved it and when. */
  coverAction(t, e, i) {
    const n = i.t, o = this.failed(t).find((d) => d.entita === e);
    if (o) {
      const d = o.cas ? Date.parse(o.cas) : NaN;
      return { text: [Number.isFinite(d) ? n.notArrived(this.when(d, i)) : n.notArrived("").trim(), o.duvod].filter(Boolean).join(" · "), warn: !0 };
    }
    const r = C(this.hass, t.covers.lastAction)?.attributes.polozky, a = r && typeof r == "object" ? r[e] : void 0;
    if (!a || typeof a.kdo != "string") return;
    const l = typeof a.cas == "string" ? Date.parse(a.cas) : NaN;
    return { text: [n.who[a.kdo] ?? a.kdo, Number.isFinite(l) ? this.when(l, i) : ""].filter(Boolean).join(" "), warn: !1 };
  }
  /** Detail of the blinds: every room with its last action and the three presets just for it (one tap: the sheet was opened on purpose). */
  renderCoversDetail(t, e) {
    if (!t.covers.entities.length) return m;
    const i = e.t, n = this._detail === "covers";
    return h`<dd-sheet .open=${n} .heading=${i.covers} .closeLabel=${i.close} @hdk-close=${() => this._detail = void 0}>
      ${n ? h`<div class="detail" data-part="covers-detail">
            ${t.covers.entities.map((o) => {
      const r = C(this.hass, o), a = t.covers.names[o], l = r?.attributes.friendly_name, d = a !== void 0 ? this.name(a) : typeof l == "string" ? l : o, g = this.coverAction(t, o, e);
      return h`<div class="cover-row" data-cover=${o}>
                <span class="main">${d}${g ? h`<small class=${g.warn ? "warn" : ""}>${bt(g.text)}</small>` : m}</span>
                <span class="presets">
                  ${t.covers.presets.map(
        (c) => h`<dd-tile
                      kind="action"
                      centered
                      .name=${this.name(c.name)}
                      .label=${`${d}: ${this.name(c.name)}`}
                      .state=${this.coverIn(t, o, c) ? "on" : "idle"}
                      @hdk-press=${() => this.call("script", t.covers.script.split(".")[1], { entity: o, pos: c.position, tilt: c.tilt })}
                    ></dd-tile>`
      )}
                </span>
              </div>`;
    })}
          </div>` : m}
    </dd-sheet>`;
  }
  setCovers(t, e) {
    const i = t.covers.script.split(".")[1];
    for (const n of t.covers.entities)
      this.call("script", i, { entity: n, pos: e.position, tilt: e.tilt });
  }
  /* ---------- Větrání ---------- */
  align(t) {
    return t % 3 === 0 ? "start" : t % 3 === 2 ? "end" : "center";
  }
  renderVentilation(t, e) {
    const i = e.t, n = [...t.ventilation.mode ? [{ name: i.ventilationMode, entity: t.ventilation.mode }] : [], ...t.ventilation.fans];
    return n.length ? h`<h2><span>${i.ventilation}</span></h2>
      <div class="tiles" data-part="ventilation">
        ${n.map((o, r) => {
      const a = C(this.hass, o.entity), l = !a || jt(a.state), d = a?.state === "on";
      return h`<dd-tile
            kind="toggle"
            guarded
            data-entity=${o.entity}
            .name=${this.name(o.name)}
            .text=${l ? i.unavailable : d ? i.runs(this.duration(o.entity, e)).trim() : i.off}
            .state=${d ? "on" : "off"}
            .disabled=${l}
            .hint=${i.hint}
            .hintAlign=${this.align(r)}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            @hdk-toggle=${(g) => this.call("homeassistant", g.detail.checked ? "turn_on" : "turn_off", { entity_id: o.entity })}
          ></dd-tile>`;
    })}
      </div>` : m;
  }
  /* ---------- Topení a Klimatizace ---------- */
  target(t, e, i) {
    const n = Number(C(this.hass, t)?.attributes.temperature);
    return Number.isFinite(n) ? `${i ? e.half(n) : e.whole(n)}°` : "";
  }
  renderHeating(t, e) {
    if (!t.heating.rooms.length) return m;
    const i = e.t, n = t.heating.rooms.filter((o) => U(this.hass, o.entity) === "heat").length;
    return h`<h2>
        <span>${i.heating}</span>
        ${n && t.heating.resume ? this.link(
      "resume",
      h`<span class="count">${i.manualCount(n)} · </span>${i.resume}`,
      () => this.call("button", "press", { entity_id: t.heating.resume })
    ) : m}
      </h2>
      <div class="tiles" data-part="heating">
        ${t.heating.rooms.map((o) => {
      const r = U(this.hass, o.entity), a = r === void 0 ? i.unavailable : r === "off" ? i.off : [r === "auto" ? i.schedule : i.manual, this.target(o.entity, e, !0)].filter(Boolean).join(" · "), l = r === void 0 || r === "off" ? "off" : r === "auto" ? "idle" : "on";
      return this.openTile("heating", o, a, l, r === void 0);
    })}
      </div>`;
  }
  renderCooling(t, e) {
    if (!t.cooling.rooms.length) return m;
    const i = e.t, n = t.cooling.rooms.filter((o) => !["off", void 0].includes(U(this.hass, o.entity)));
    return h`<h2>
        <span>${i.cooling}</span>
        ${n.length ? this.link("alloff", i.allOff, () => this.call("climate", "turn_off", { entity_id: n.map((o) => o.entity) })) : m}
      </h2>
      <div class="tiles" data-part="cooling">
        ${t.cooling.rooms.map((o) => {
      const r = U(this.hass, o.entity), a = String(C(this.hass, o.entity)?.attributes.preset_mode ?? ""), l = r === "cool" && a === "wind_free" ? "wind_free" : r === "heat_cool" ? "auto" : r ?? "", d = r === void 0 ? i.unavailable : r === "off" ? i.off : [i.mode[l] ?? i.on, r === "fan_only" ? "" : this.target(o.entity, e, !1)].filter(Boolean).join(" · ");
      return this.openTile("cooling", o, d, r === void 0 || r === "off" ? "off" : "on", r === void 0);
    })}
      </div>`;
  }
  /** A tile that opens the popup Topení / Klimatizace with its room selected: one tap, it changes nothing by itself. */
  openTile(t, e, i, n, o) {
    return h`<dd-tile
      kind="open"
      data-entity=${e.entity}
      .name=${this.name(e.name)}
      .text=${i}
      .state=${n}
      .disabled=${o}
      @hdk-open=${() => {
      this._climateSelected = [e.entity], this._detail = t;
    }}
    ></dd-tile>`;
  }
  /** The shared popup of the kit for one system (spec of the kit: in the card Dům only one system, no switch). */
  renderClimate(t, e) {
    const i = this._detail === "heating" || this._detail === "cooling" ? this._detail : void 0, n = (i ?? "heating") === "heating" ? t.heating.rooms : t.cooling.rooms;
    if (!t.heating.rooms.length && !t.cooling.rooms.length) return m;
    const o = async () => {
      await this.renderRoot.querySelector("dd-climate")?.flush(), this._detail = void 0;
    };
    return h`<dd-sheet .open=${i !== void 0} .heading=${i === "cooling" ? e.t.cooling : e.t.heating} .closeLabel=${e.t.close} @hdk-close=${o}>
      ${i ? h`<dd-climate
            .hass=${this.hass}
            .i18n=${e}
            .texts=${e.t.climate}
            .system=${i}
            .rooms=${n.map((r) => ({ name: this.name(r.name), entity: r.entity }))}
            .selected=${this._climateSelected}
            .delayMs=${t.sendDelaySeconds * 1e3}
            @hdk-select-rooms=${(r) => this._climateSelected = r.detail.selected}
            @hdk-error=${(r) => this._error = r.detail.message}
            @hdk-more-info=${async (r) => {
      await o(), this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: r.detail.entityId }, bubbles: !0, composed: !0 }));
    }}
          ></dd-climate>` : m}
    </dd-sheet>`;
  }
  /* ---------- Chráněný odkaz v nadpisu oddílu ---------- */
  link(t, e, i) {
    const n = (a) => {
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
    return h`<button class="link" type="button" data-link=${t} @click=${n} @pointerdown=${o} @pointerup=${r} @pointerleave=${r} @pointercancel=${r} @contextmenu=${(a) => a.preventDefault()}>
      ${e}${this._hint === t ? h`<div class="hint above end" aria-hidden="true"><i></i><span style="position: relative">${this.i18n.t.hint}</span></div>` : m}
    </button>`;
  }
  /* ---------- Volání Home Assistantu ---------- */
  call(t, e, i) {
    this._error = "", this.hass?.callService(t, e, i).catch((n) => {
      this._error = `${this.i18n.t.failed}: ${n instanceof Error ? n.message : String(n)}`;
    });
  }
};
re.styles = [Pt, Kt, hs];
let N = re;
j([
  f({ attribute: !1 })
], N.prototype, "hass");
j([
  _()
], N.prototype, "_config");
j([
  _()
], N.prototype, "_error");
j([
  _()
], N.prototype, "_hint");
j([
  _()
], N.prototype, "_now");
j([
  _()
], N.prototype, "_detail");
j([
  _()
], N.prototype, "_log");
j([
  _()
], N.prototype, "_seen");
j([
  _()
], N.prototype, "_climateSelected");
j([
  _()
], N.prototype, "_menu");
j([
  _()
], N.prototype, "_fit");
Fi("dd");
Ei("dd");
customElements.get("ha-dum-dashboard") || customElements.define("ha-dum-dashboard", N);
window.customCards = window.customCards ?? [];
window.customCards.some((s) => s.type === "ha-dum-dashboard") || window.customCards.push({
  type: "ha-dum-dashboard",
  name: "Dům Dashboard",
  description: Re(Ji()).t.cardDescription,
  preview: !1
});
console.info("%c DUM-DASHBOARD %c 0.9.1 · 2026-11-13 21:15 UTC · po ef4b285 ", "color:#fff;background:#0A6ED1;font-weight:700", "color:inherit");
