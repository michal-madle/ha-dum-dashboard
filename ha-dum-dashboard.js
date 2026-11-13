const wt = globalThis, Ft = wt.ShadowRoot && (wt.ShadyCSS === void 0 || wt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Rt = /* @__PURE__ */ Symbol(), re = /* @__PURE__ */ new WeakMap();
let we = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ft && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = re.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && re.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pe = (s) => new we(typeof s == "string" ? s : s + "", void 0, Rt), R = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[o + 1], s[0]);
  return new we(e, s, Rt);
}, De = (s, t) => {
  if (Ft) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = wt.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, ae = Ft ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Pe(e);
})(s) : s;
const { is: Oe, defineProperty: je, getOwnPropertyDescriptor: Le, getOwnPropertyNames: Fe, getOwnPropertySymbols: Re, getPrototypeOf: Ue } = Object, St = globalThis, le = St.trustedTypes, Be = le ? le.emptyScript : "", Ie = St.reactiveElementPolyfillSupport, pt = (s, t) => s, _t = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Be : null;
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
} }, Ut = (s, t) => !Oe(s, t), de = { attribute: !0, type: String, converter: _t, reflect: !1, useDefault: !1, hasChanged: Ut };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), St.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let tt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = de) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && je(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: o } = Le(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? de;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pt("elementProperties"))) return;
    const t = Ue(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pt("properties"))) {
      const e = this.properties, i = [...Fe(e), ...Re(e)];
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
      for (const n of i) e.unshift(ae(n));
    } else t !== void 0 && e.push(ae(t));
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
    return De(t, this.constructor.elementStyles), t;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : _t).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : _t;
      this._$Em = n;
      const a = r.fromAttribute(e, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? Ut)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
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
tt.elementStyles = [], tt.shadowRootOptions = { mode: "open" }, tt[pt("elementProperties")] = /* @__PURE__ */ new Map(), tt[pt("finalized")] = /* @__PURE__ */ new Map(), Ie?.({ ReactiveElement: tt }), (St.reactiveElementVersions ??= []).push("2.1.2");
const Bt = globalThis, he = (s) => s, At = Bt.trustedTypes, ce = At ? At.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, ke = "$lit$", V = `lit$${Math.random().toFixed(9).slice(2)}$`, _e = "?" + V, He = `<${_e}>`, Z = document, ft = () => Z.createComment(""), mt = (s) => s === null || typeof s != "object" && typeof s != "function", It = Array.isArray, Ye = (s) => It(s) || typeof s?.[Symbol.iterator] == "function", Tt = `[ 	
\f\r]`, dt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ue = /-->/g, pe = />/g, W = RegExp(`>|${Tt}(?:([^\\s"'>=/]+)(${Tt}*=${Tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), fe = /'/g, me = /"/g, Ae = /^(?:script|style|textarea|title)$/i, Ve = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), c = Ve(1), it = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), ge = /* @__PURE__ */ new WeakMap(), G = Z.createTreeWalker(Z, 129);
function Se(s, t) {
  if (!It(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ce !== void 0 ? ce.createHTML(t) : t;
}
const qe = (s, t) => {
  const e = s.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = dt;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let h, f, d = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, f = r.exec(l), f !== null); ) p = r.lastIndex, r === dt ? f[1] === "!--" ? r = ue : f[1] !== void 0 ? r = pe : f[2] !== void 0 ? (Ae.test(f[2]) && (n = RegExp("</" + f[2], "g")), r = W) : f[3] !== void 0 && (r = W) : r === W ? f[0] === ">" ? (r = n ?? dt, d = -1) : f[1] === void 0 ? d = -2 : (d = r.lastIndex - f[2].length, h = f[1], r = f[3] === void 0 ? W : f[3] === '"' ? me : fe) : r === me || r === fe ? r = W : r === ue || r === pe ? r = dt : (r = W, n = void 0);
    const v = r === W && s[a + 1].startsWith("/>") ? " " : "";
    o += r === dt ? l + He : d >= 0 ? (i.push(h), l.slice(0, d) + ke + l.slice(d) + V + v) : l + V + (d === -2 ? a : v);
  }
  return [Se(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class gt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [h, f] = qe(t, e);
    if (this.el = gt.createElement(h, i), G.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = G.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(ke)) {
          const p = f[r++], v = n.getAttribute(d).split(V), m = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: m[2], strings: v, ctor: m[1] === "." ? Ke : m[1] === "?" ? Ge : m[1] === "@" ? Ze : Mt }), n.removeAttribute(d);
        } else d.startsWith(V) && (l.push({ type: 6, index: o }), n.removeAttribute(d));
        if (Ae.test(n.tagName)) {
          const d = n.textContent.split(V), p = d.length - 1;
          if (p > 0) {
            n.textContent = At ? At.emptyScript : "";
            for (let v = 0; v < p; v++) n.append(d[v], ft()), G.nextNode(), l.push({ type: 2, index: ++o });
            n.append(d[p], ft());
          }
        }
      } else if (n.nodeType === 8) if (n.data === _e) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(V, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += V.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = Z.createElement("template");
    return i.innerHTML = t, i;
  }
}
function st(s, t, e = s, i) {
  if (t === it) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = mt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = st(s, n._$AS(s, t.values), n, i)), t;
}
class We {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? Z).importNode(e, !0);
    G.currentNode = n;
    let o = G.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let h;
        l.type === 2 ? h = new vt(o, o.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (h = new Xe(o, this, t)), this._$AV.push(h), l = i[++a];
      }
      r !== l?.index && (o = G.nextNode(), r++);
    }
    return G.currentNode = Z, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class vt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = st(this, t, e), mt(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== it && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ye(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && mt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = gt.createElement(Se(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new We(n, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ge.get(t.strings);
    return e === void 0 && ge.set(t.strings, e = new gt(t)), e;
  }
  k(t) {
    It(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const o of t) n === e.length ? e.push(i = new vt(this.O(ft()), this.O(ft()), this, this.options)) : i = e[n], i._$AI(o), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = he(t).nextSibling;
      he(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, o) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = g;
  }
  _$AI(t, e = this, i, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = st(this, t, e, 0), r = !mt(t) || t !== this._$AH && t !== it, r && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++) h = st(this, a[i + l], e, l), h === it && (h = this._$AH[l]), r ||= !mt(h) || h !== this._$AH[l], h === g ? t = g : t !== g && (t += (h ?? "") + o[l + 1]), this._$AH[l] = h;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ke extends Mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Ge extends Mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Ze extends Mt {
  constructor(t, e, i, n, o) {
    super(t, e, i, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = st(this, t, e, 0) ?? g) === it) return;
    const i = this._$AH, n = t === g && i !== g || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== g && (i === g || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Xe {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    st(this, t);
  }
}
const Je = Bt.litHtmlPolyfillSupport;
Je?.(gt, vt), (Bt.litHtmlVersions ??= []).push("3.3.3");
const Qe = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = n = new vt(t.insertBefore(ft(), o), o, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
const Ht = globalThis;
class z extends tt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Qe(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return it;
  }
}
z._$litElement$ = !0, z.finalized = !0, Ht.litElementHydrateSupport?.({ LitElement: z });
const ti = Ht.litElementPolyfillSupport;
ti?.({ LitElement: z });
(Ht.litElementVersions ??= []).push("4.2.2");
const Me = /* @__PURE__ */ Symbol.for(""), ei = (s) => {
  if (s?.r === Me) return s?._$litStatic$;
}, Yt = (s) => ({ _$litStatic$: s, r: Me }), be = /* @__PURE__ */ new Map(), ii = (s) => (t, ...e) => {
  const i = e.length;
  let n, o;
  const r = [], a = [];
  let l, h = 0, f = !1;
  for (; h < i; ) {
    for (l = t[h]; h < i && (o = e[h], (n = ei(o)) !== void 0); ) l += n + t[++h], f = !0;
    h !== i && a.push(o), r.push(l), h++;
  }
  if (h === i && r.push(t[i]), f) {
    const d = r.join("$$lit$$");
    (t = be.get(d)) === void 0 && (r.raw = r, be.set(d, t = r)), e = a;
  }
  return s(t, ...e);
}, Vt = ii(c);
const si = { attribute: !0, type: String, converter: _t, reflect: !1, hasChanged: Ut }, ni = (s = si, t, e) => {
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
function u(s) {
  return (t, e) => typeof e == "object" ? ni(s, t, e) : ((i, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(s, t, e);
}
function _(s) {
  return u({ ...s, state: !0, attribute: !1 });
}
const Ce = 25, qt = ["off", "cool", "wind_free", "heat", "fan_only", "dry", "auto", "sleep"], oi = ["plan", "manual", "boost", "off"];
function Wt(s) {
  return s === void 0 || s === "" || s === "unavailable" || s === "unknown";
}
function bt(s) {
  return Array.isArray(s) ? s.filter((t) => typeof t == "string") : [];
}
function X(s) {
  const t = typeof s == "string" ? Number.parseFloat(s) : s;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function et(s, t) {
  const e = t?.state;
  if (!t || Wt(e)) return;
  if (s === "heating")
    return e === "auto" ? "plan" : e === "off" ? "off" : e === "heat" ? X(t.attributes.temperature) === Ce ? "boost" : "manual" : void 0;
  const i = String(t.attributes.preset_mode ?? "");
  return e === "off" ? "off" : e === "cool" && i === "wind_free" ? "wind_free" : i === "sleep" ? "sleep" : e === "heat_cool" ? "auto" : qt.includes(e) ? e : void 0;
}
function jt(s, t) {
  const e = et(s, t);
  return e === void 0 ? void 0 : e !== "off";
}
function ri(s, t, e, i, n) {
  if (i.includes(n)) return i.length > 1 ? i.filter((r) => r !== n) : i;
  const o = jt(s, t?.states[n]);
  return o === void 0 ? i : e.filter((r) => jt(s, t?.states[r.entity]) === o).map((r) => r.entity);
}
function ai(s, t) {
  return t.flatMap((e) => {
    const i = X(s?.states[e]?.attributes.temperature);
    return i === void 0 ? [] : [{ entity: e, value: i }];
  });
}
function li(s, t, e) {
  const i = new Set(e.map((n) => et(s, t?.states[n])).filter((n) => n !== void 0));
  return i.size === 1 ? [...i][0] : void 0;
}
function di(s, t) {
  const e = s === "heating" ? 0.5 : 1, i = X(t?.attributes.min_temp) ?? (s === "heating" ? 5 : 16), n = X(t?.attributes.max_temp) ?? (s === "heating" ? 25 : 30);
  return { min: Math.ceil(i / e) * e, max: Math.floor(n / e) * e, step: e };
}
function hi(s) {
  const t = bt(s?.attributes.hvac_modes), e = bt(s?.attributes.preset_modes);
  return qt.filter((i) => i === "wind_free" ? t.includes("cool") && e.includes("wind_free") : i === "sleep" ? e.includes("sleep") : i === "auto" ? t.includes("auto") || t.includes("heat_cool") : t.includes(i));
}
function zt(s) {
  return !!s?.services?.tado_ce?.set_climate_timer;
}
function ci(s) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}:00`;
}
function ui(s, t, e, i) {
  const n = e.mode ?? (e.temperature !== void 0 ? "manual" : et("heating", t));
  if (n === void 0) return [];
  if (n === "plan") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: s, hvac_mode: "auto" } }];
  if (n === "off") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: s, hvac_mode: "off" } }];
  const o = n === "boost" ? Ce : e.temperature ?? X(t?.attributes.temperature) ?? 21;
  if (!i)
    return n === "manual" ? [{ domain: "climate", service: "set_temperature", data: { entity_id: s, temperature: o, hvac_mode: "heat" } }] : [];
  const r = e.manualFor ?? (n === "boost" ? "60" : "next"), a = { entity_id: s, temperature: o };
  return r === "next" ? a.overlay = "next_time_block" : r === "forever" ? a.overlay = "manual" : a.time_period = ci(Number(r)), [{ domain: "tado_ce", service: "set_climate_timer", data: a }];
}
function pi(s, t, e) {
  const i = [], n = { entity_id: s }, o = bt(t?.attributes.hvac_modes), r = bt(t?.attributes.preset_modes), a = String(t?.attributes.preset_mode ?? ""), l = e.mode;
  if (l !== void 0) {
    const h = (d) => i.push({ domain: "climate", service: "set_hvac_mode", data: { ...n, hvac_mode: d } }), f = (d) => i.push({ domain: "climate", service: "set_preset_mode", data: { ...n, preset_mode: d } });
    l === "wind_free" ? (h("cool"), f("wind_free")) : l === "sleep" ? ((t?.state === "off" || Wt(t?.state)) && h("cool"), f("sleep")) : (h(l === "auto" ? o.includes("auto") ? "auto" : "heat_cool" : l), l !== "off" && (a === "wind_free" || a === "sleep") && r.includes("none") && f("none"));
  }
  return e.temperature !== void 0 && l !== "off" && i.push({ domain: "climate", service: "set_temperature", data: { ...n, temperature: Math.round(e.temperature) } }), i;
}
function fi(s, t) {
  const e = t.mode;
  return e === void 0 ? s?.state : e === "wind_free" || e === "sleep" && (s?.state === "off" || Wt(s?.state)) ? "cool" : e === "sleep" ? s?.state : e === "auto" ? bt(s?.attributes.hvac_modes).includes("auto") ? "auto" : "heat_cool" : e;
}
function mi(s, t, e) {
  const i = Math.round(t * 60), n = [{ delay: { hours: Math.floor(i / 3600), minutes: Math.floor(i % 3600 / 60), seconds: i % 60 } }];
  return e !== void 0 && n.push({ condition: "state", entity_id: s, state: e }), n.push({ action: "climate.set_hvac_mode", target: { entity_id: s }, data: { hvac_mode: "off" } }), { type: "execute_script", sequence: n };
}
var gi = Object.defineProperty, j = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && gi(t, e, n), n;
};
const bi = ["next", "60", "180", "forever"], vi = [0, 60, 180, 480], Zt = class Zt extends z {
  constructor() {
    super(...arguments), this.system = "heating", this.rooms = [], this.selected = [], this.prefix = "hdk", this.delayMs = 2e3, this.draft = {}, this.busy = !1, this.error = "";
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.flush();
  }
  willUpdate(t) {
    (t.has("system") && t.get("system") !== void 0 || t.has("rooms") && t.get("rooms") !== void 0) && this.flush(t.get("selected") ?? this.selected);
  }
  /** Sends what waits at once (the sheet closes). */
  async flush(t = this.selected) {
    window.clearTimeout(this.timer), this.timer = void 0;
    const e = this.draft;
    Object.keys(e).length && (this.draft = {}, await this.send(e, t));
  }
  change(t) {
    this.draft = { ...this.draft, ...t }, this.error = "", this.busy = !0, window.clearTimeout(this.timer), this.timer = window.setTimeout(() => {
      this.flush();
    }, this.delayMs);
  }
  async send(t, e) {
    const i = this.hass;
    if (!i) return;
    this.busy = !0;
    const n = zt(i);
    try {
      for (const o of e) {
        const r = i.states[o];
        if (!r || et(this.system, r) === void 0) continue;
        const a = this.system === "heating" ? ui(o, r, t, n) : pi(o, r, t);
        for (const f of a) await i.callService(f.domain, f.service, f.data);
        const l = t.offAfter ?? 0, h = this.system === "cooling" ? fi(r, t) : void 0;
        l > 0 && h !== void 0 && h !== "off" && await i.callWS(mi(o, l, h));
      }
      this.dispatchEvent(new CustomEvent("hdk-sent", { bubbles: !0, composed: !0 }));
    } catch (o) {
      this.error = `${this.texts?.failed ?? "Failed"}: ${o instanceof Error ? o.message : String(o)}`, this.dispatchEvent(new CustomEvent("hdk-error", { detail: { message: this.error }, bubbles: !0, composed: !0 }));
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
    const e = this.texts, i = this.hass?.states[t], n = et(this.system, i);
    if (n === void 0) return e.unavailable;
    const o = X(i?.attributes.temperature);
    return n !== "off" && n !== "boost" && n !== "fan_only" && o !== void 0 ? `${e.modes[n]} · ${this.degrees(o)}` : e.modes[n];
  }
  selectRoom(t) {
    const e = ri(this.system, this.hass, this.rooms, this.selected, t);
    e.join() !== this.selected.join() && (this.flush(this.selected), this.selected = e, this.dispatchEvent(new CustomEvent("hdk-select-rooms", { detail: { selected: e }, bubbles: !0, composed: !0 })));
  }
  render() {
    const t = this.texts, e = this.i18n;
    if (!t || !e) return g;
    const i = this.hass, n = i?.states[this.selected[0]], { min: o, max: r, step: a } = di(this.system, n), l = ai(i, this.selected), h = [...new Set(l.map((b) => b.value))], f = li(this.system, i, this.selected), d = this.draft.mode ?? f, p = this.draft.temperature === void 0 && h.length > 1, v = this.draft.temperature ?? (d === "boost" ? 25 : h[0]), m = d === "off" || d === "fan_only", E = m && d !== void 0 ? t.modes[d] : p ? `${this.degrees(Math.min(...h)).replace(/°$/, "")}–${this.degrees(Math.max(...h))}` : v !== void 0 ? this.degrees(v) : "––", L = this.selected.flatMap((b) => {
      const U = X(i?.states[b]?.attributes.current_temperature);
      return U === void 0 ? [] : [{ id: b, text: `${e.one(U)} °C` }];
    }), J = this.system === "heating" && this.selected.length === 1 && i?.states[this.selected[0]]?.attributes.hvac_action === "heating", $t = p ? t.targets(l.map((b) => `${this.name(b.entity)} ${this.degrees(b.value)}`).join(" · ")) : L.length ? t.now(this.selected.length === 1 ? `${L[0].text}${J ? ` · ${t.heats}` : ""}` : L.map((b) => `${this.name(b.id)} ${b.text}`).join(" · ")) : "", yt = this.system === "heating" ? oi.filter((b) => b !== "boost" || zt(i)) : qt.filter((b) => this.selected.some((U) => hi(i?.states[U]).includes(b))), xt = this.draft.mode === void 0 && f === void 0 && this.selected.length > 1, y = this.system === "cooling" && (d === "off" || d === "fan_only");
    return c`
      <div class="rooms" role="group" aria-label=${t.rooms}>
        ${this.rooms.map((b) => {
      const U = i?.states[b.entity], rt = jt(this.system, U), at = this.selected.includes(b.entity);
      return ve(this.prefix, {
        name: b.name,
        text: this.roomText(b.entity),
        state: at ? "on" : rt ? "idle" : "off",
        disabled: rt === void 0,
        pressed: at,
        onPress: () => this.selectRoom(b.entity)
      });
    })}
      </div>
      <div class="target">
        <div class="big ${m ? "word" : ""}" aria-live="polite">${E}</div>
        <div class="sub">${$t}</div>
        ${this.busy ? c`<span class="busy" role="status" aria-label=${t.sending}
              ><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 2.5a7.5 7.5 0 1 1-7.5 7.5"></path></svg
            ></span>` : g}
      </div>
      <div class="slider">
        ${$i(this.prefix, {
      min: o,
      max: r,
      step: a,
      value: v ?? o,
      mixed: p,
      marks: p ? h : [],
      label: t.temperature,
      valueText: v !== void 0 ? this.degrees(v) : "",
      minLabel: this.degrees(o),
      maxLabel: this.degrees(r),
      disabled: y || !this.selected.length,
      onChange: (b) => (
        // Moving the temperature of the heating is Ručně (spec: „Posunutí teploty přepne Plán na Ručně“).
        this.change(this.system === "heating" && d !== "manual" ? { temperature: b, mode: "manual" } : { temperature: b })
      )
    })}
      </div>
      <h3>${t.mode}</h3>
      ${this.system === "heating" ? Nt(this.prefix, {
      label: t.mode,
      options: yt.map((b) => ({ value: b, label: t.modes[b] })),
      value: d ?? "",
      onSelect: (b) => this.change({ mode: b, ...b === "plan" || b === "off" ? { temperature: void 0 } : {} })
    }) : c`<div class="modes" role="group" aria-label=${t.mode}>
            ${yt.map(
      (b) => ve(this.prefix, {
        centered: !0,
        name: t.modes[b],
        state: d === b ? "on" : "idle",
        pressed: d === b,
        onPress: () => this.change({ mode: b })
      })
    )}
          </div>`}
      ${xt ? c`<div class="note">${t.mixedModes(this.selected.map((b) => `${this.name(b)} ${t.modes[et(this.system, i?.states[b]) ?? "off"] ?? ""}`).join(" · "))}</div>` : p || xt ? c`<div class="note">${t.firstChange}</div>` : g}
      ${this.system === "heating" ? this.renderManualFor(d) : this.renderOffAfter(d)}
      ${this.error ? c`<div class="error" role="alert">${this.error}</div>` : g}
    `;
  }
  renderManualFor(t) {
    const e = this.texts, i = (t === "manual" || t === "boost") && zt(this.hass), n = this.draft.manualFor ?? (t === "boost" ? "60" : "next"), o = Number(n), r = i ? n === "next" ? e.untilNextPlan : n === "forever" ? e.untilChanged : e.untilTime(this.i18n.time(Date.now() + o * 6e4)) : "";
    return c`<h3>${e.manualFor}</h3>
      ${Nt(this.prefix, {
      label: e.manualFor,
      options: bi.map((a) => ({ value: a, label: e.manualForChoices[a] })),
      value: n,
      disabled: !i,
      onSelect: (a) => this.change({ manualFor: a, ...this.draft.mode === void 0 && t ? { mode: t } : {} })
    })}
      <div class="footer">${r}</div>`;
  }
  renderOffAfter(t) {
    const e = this.texts, i = this.draft.offAfter ?? 0, n = t !== void 0 && t !== "off", o = n ? i === 0 ? e.runsUntilOff : e.offAt(this.i18n.time(Date.now() + i * 6e4)) : "";
    return c`<h3>${e.offAfter}</h3>
      ${Nt(this.prefix, {
      label: e.offAfter,
      options: vi.map((r) => ({ value: String(r), label: e.offAfterChoices[String(r)] })),
      value: String(i),
      disabled: !n,
      onSelect: (r) => this.change({ offAfter: Number(r) })
    })}
      <div class="footer">${o}</div>`;
  }
};
Zt.styles = R`
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
    .error {
      margin: 8px 4px 0;
      color: var(--hdk-error, #ff6961);
      font-size: 15px;
      line-height: 20px;
    }
  `;
let M = Zt;
j([
  u({ attribute: !1 })
], M.prototype, "hass");
j([
  u({ attribute: !1 })
], M.prototype, "i18n");
j([
  u({ attribute: !1 })
], M.prototype, "texts");
j([
  u()
], M.prototype, "system");
j([
  u({ attribute: !1 })
], M.prototype, "rooms");
j([
  u({ attribute: !1 })
], M.prototype, "selected");
j([
  u()
], M.prototype, "prefix");
j([
  u({ type: Number })
], M.prototype, "delayMs");
j([
  _()
], M.prototype, "draft");
j([
  _()
], M.prototype, "busy");
j([
  _()
], M.prototype, "error");
function ve(s, t) {
  const e = Yt(`${s}-tile`);
  return Vt`<${e}
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
function Nt(s, t) {
  const e = Yt(`${s}-segmented`);
  return Vt`<${e}
    .label=${t.label}
    .options=${t.options}
    .value=${t.value}
    .disabled=${t.disabled ?? !1}
    @hdk-select=${(i) => {
    i.stopPropagation(), t.onSelect(i.detail.value);
  }}
  ></${e}>`;
}
function $i(s, t) {
  const e = Yt(`${s}-slider`);
  return Vt`<${e}
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
function yi(s) {
  if (!customElements.get(`${s}-climate`)) {
    const t = class extends M {
      constructor() {
        super(), this.prefix = s;
      }
    };
    customElements.define(`${s}-climate`, t);
  }
}
var xi = Object.defineProperty, nt = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && xi(t, e, n), n;
};
const Xt = class Xt extends z {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, i = (t - e) / 2, n = 2 * Math.PI * i, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), r = t / 2;
    return c`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
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
      ${this.num ? c`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? c`<span class="unit">${this.unit}</span>` : g}` : g}
    </div>`;
  }
};
Xt.styles = R`
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
let B = Xt;
nt([
  u({ type: Number })
], B.prototype, "fraction");
nt([
  u({ type: Number })
], B.prototype, "size");
nt([
  u({ type: Number })
], B.prototype, "stroke");
nt([
  u()
], B.prototype, "num");
nt([
  u()
], B.prototype, "unit");
nt([
  u()
], B.prototype, "label");
class Ct {
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
class Kt {
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
const Et = R`
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
var wi = Object.defineProperty, D = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && wi(t, e, n), n;
};
const Jt = class Jt extends z {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new Kt(this), this.nudgeIndex = 0, this.gesture = new Ct(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((a) => a.value === this.value), e = this.options.filter((a) => !a.disabled), i = this.options[t]?.value ?? e[0]?.value, n = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !n ? Math.sign(this.nudgeIndex - t) * 14 : 0, r = this._dragging ? this._dx : o;
    return c`<div
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
      (a, l) => c`<button
            type="button"
            role="radio"
            aria-checked=${a.value === this.value ? "true" : "false"}
            tabindex=${a.value === i ? 0 : -1}
            ?disabled=${this.disabled || a.disabled}
            data-value=${a.value}
            data-index=${l}
            @click=${(h) => this.onClick(h, a.value, l)}
          >
            <span>${a.label}</span>${a.detail ? c`<span class="detail">${a.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? c`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
Jt.styles = [
  Et,
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
let A = Jt;
D([
  u({ attribute: !1 })
], A.prototype, "options");
D([
  u()
], A.prototype, "value");
D([
  u()
], A.prototype, "label");
D([
  u({ type: Boolean })
], A.prototype, "disabled");
D([
  u({ type: Boolean })
], A.prototype, "compact");
D([
  u({ type: Boolean })
], A.prototype, "guarded");
D([
  u({ type: Number })
], A.prototype, "holdMs");
D([
  u({ type: Number })
], A.prototype, "doubleTapMs");
D([
  u({ type: Number })
], A.prototype, "hintSeconds");
D([
  u()
], A.prototype, "hint");
D([
  _()
], A.prototype, "_dx");
D([
  _()
], A.prototype, "_dragging");
var ki = Object.defineProperty, ot = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && ki(t, e, n), n;
};
const _i = 100, Ai = 0.6, Si = 6, Qt = class Qt extends z {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
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
      this.touchY = t.touches[0]?.clientY, this.touchOnSlider = t.composedPath().some((e) => e instanceof HTMLElement && (e.localName.endsWith("-slider") || e instanceof HTMLInputElement && e.type === "range"));
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
        if (i < Si) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, i);
    }, this.dragEnd = (t) => {
      const e = this.drag;
      if (this.drag = void 0, !e || !this.dragging) return;
      this.dragging = !1;
      const i = Math.max(0, t.clientY - e.startY), n = i / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (i > _i || n > Ai) ? this.close() : this.dragY = 0;
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
    t.has("open") && (this.open ? this.renderRoot.querySelector(".sheet")?.focus() : t.get("open") && (this.returnFocus?.focus?.(), this.returnFocus = void 0));
  }
  close() {
    this.dispatchEvent(new CustomEvent("hdk-close", { bubbles: !0, composed: !0 }));
  }
  /** The focusable elements of the sheet: its ✕ and the slotted content. */
  focusable() {
    const t = this.renderRoot.querySelector(".close"), e = [...this.querySelectorAll("*")].flatMap((i) => {
      const n = i.shadowRoot?.querySelector("button:not([disabled]), input:not([disabled])") ?? i;
      return n.matches("button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])") ? [n] : [];
    });
    return [...t ? [t] : [], ...e];
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. Outside the sheet nothing scrolls. */
  cannotScroll(t, e) {
    const i = this.renderRoot.querySelector(".sheet");
    return !i || !t.composedPath().includes(i) ? !0 : !(i.scrollHeight > i.clientHeight + 1) || e > 0 && i.scrollTop <= 0 || e < 0 && i.scrollTop + i.clientHeight >= i.scrollHeight - 1;
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
        class="sheet ${this.dragging ? "dragging" : ""}"
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
              ${this.sub ? c`<div class="sub">${this.sub}</div>` : g}
            </div>
            <button type="button" class="close" aria-label=${this.closeLabel} @click=${() => this.close()}>
              <span aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"></path></svg></span>
            </button>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>` : g;
  }
};
Qt.styles = R`
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
    .sheet {
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
    .sheet:focus {
      outline: none;
    }
    .sheet.dragging {
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
    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 26px;
    }
    .sub {
      color: var(--hdk-secondary, #9a9aa0);
      font-size: 14px;
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
      .sheet {
        animation: none;
        transition: none;
      }
    }
    @media (min-width: 600px) {
      .backdrop {
        align-items: center;
      }
      .sheet {
        border-bottom: 1px solid var(--hdk-sheet-border, rgb(255 255 255 / 10%));
        border-radius: 24px;
      }
      .grabber {
        display: none;
      }
    }
  `;
let I = Qt;
ot([
  u({ type: Boolean, reflect: !0 })
], I.prototype, "open");
ot([
  u()
], I.prototype, "heading");
ot([
  u()
], I.prototype, "sub");
ot([
  u()
], I.prototype, "closeLabel");
ot([
  _()
], I.prototype, "dragY");
ot([
  _()
], I.prototype, "dragging");
var Mi = Object.defineProperty, C = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && Mi(t, e, n), n;
};
const te = class te extends z {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [];
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, i = Math.max(0, Math.min(1, (t - this.min) / e)), n = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${i})`, o = this.mixed && this._drag === void 0 ? this.marks.map((h) => c`<i style="left:${(Math.max(0, Math.min(1, (h - this.min) / e)) * 100).toFixed(2)}%"></i>`) : [], r = this.tickStep || this.step || 1, a = Math.floor(e / r + 1e-9) + 1, l = a >= 2 && a <= 40 ? Array.from({ length: a }, (h, f) => c`<i style="left:${(f * r / e * 100).toFixed(2)}%"></i>`) : [];
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
          style="--fill: ${n}"
          @input=${this.onInput}
          @change=${this.onChange}
        />
        <div class="ticks" aria-hidden="true">${l}</div>
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
te.styles = R`
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
let k = te;
C([
  u({ type: Number })
], k.prototype, "min");
C([
  u({ type: Number })
], k.prototype, "max");
C([
  u({ type: Number })
], k.prototype, "step");
C([
  u({ type: Number })
], k.prototype, "tickStep");
C([
  u({ type: Number })
], k.prototype, "value");
C([
  u()
], k.prototype, "label");
C([
  u()
], k.prototype, "valueText");
C([
  u()
], k.prototype, "minLabel");
C([
  u()
], k.prototype, "maxLabel");
C([
  u({ type: Boolean })
], k.prototype, "disabled");
C([
  u({ type: Boolean, reflect: !0 })
], k.prototype, "mixed");
C([
  u({ attribute: !1 })
], k.prototype, "marks");
C([
  _()
], k.prototype, "_drag");
var Ci = Object.defineProperty, H = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && Ci(t, e, n), n;
};
const ee = class ee extends z {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new Kt(this), this.gesture = new Ct(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
ee.styles = [
  Et,
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
let N = ee;
H([
  u({ type: Boolean })
], N.prototype, "checked");
H([
  u({ type: Boolean })
], N.prototype, "disabled");
H([
  u()
], N.prototype, "label");
H([
  u({ type: Boolean })
], N.prototype, "guarded");
H([
  u({ type: Number })
], N.prototype, "holdMs");
H([
  u({ type: Number })
], N.prototype, "doubleTapMs");
H([
  u({ type: Number })
], N.prototype, "hintSeconds");
H([
  u()
], N.prototype, "hintPlacement");
H([
  u()
], N.prototype, "hint");
var Ei = Object.defineProperty, S = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && Ei(t, e, n), n;
};
const ie = class ie extends z {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new Kt(this), this.gesture = new Ct(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
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
        aria-checked=${t ? this.state === "on" ? "true" : "false" : g}
        aria-pressed=${this.kind === "action" && this.pressed !== void 0 ? this.pressed ? "true" : "false" : g}
        aria-haspopup=${this.kind === "open" ? "dialog" : g}
        aria-label=${this.label || g}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(i) => this.protected && i.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? c`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : c`<span class="text">${this.text}${e}</span>`}</button>
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
ie.styles = [
  Et,
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
let x = ie;
S([
  u()
], x.prototype, "name");
S([
  u()
], x.prototype, "text");
S([
  u({ reflect: !0 })
], x.prototype, "state");
S([
  u()
], x.prototype, "kind");
S([
  u({ type: Number })
], x.prototype, "count");
S([
  u({ type: Boolean, reflect: !0 })
], x.prototype, "centered");
S([
  u({ type: Boolean })
], x.prototype, "disabled");
S([
  u({ type: Boolean })
], x.prototype, "pressed");
S([
  u()
], x.prototype, "label");
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
  u()
], x.prototype, "hintAlign");
function Ti(s) {
  const t = [
    [`${s}-switch`, N],
    [`${s}-segmented`, A],
    [`${s}-slider`, k],
    [`${s}-ring`, B],
    [`${s}-tile`, x],
    [`${s}-sheet`, I]
  ];
  for (const [e, i] of t)
    customElements.get(e) || customElements.define(e, i);
}
const zi = ["cs", "en", "sv"];
class Ee extends Error {
}
function $(s) {
  throw new Ee(s);
}
function Ni(s, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Ee ? new Error(`${s}: ${e.message}`) : e;
  }
}
function q(s) {
  return typeof s == "object" && s !== null && !Array.isArray(s);
}
function Q(s, t) {
  return s == null ? {} : (q(s) || $(`"${t}" must be a mapping of keys.`), s);
}
function O(s, t, e) {
  for (const i of Object.keys(s))
    t.includes(i) || $(`${e}: unknown key "${i}" (allowed: ${t.join(", ")}).`);
}
function w(s, t, e = {}) {
  if (s == null)
    return;
  const i = typeof s == "string" ? s.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(i) || $(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !i.startsWith(`${e.domain}.`) && $(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${i}.`), i;
}
function Pi(s, t) {
  if (s != null)
    return (typeof s != "string" || !s.trim()) && $(`${t} must be a non-empty text.`), s.trim();
}
function ct(s, t) {
  if (s != null) {
    if (typeof s == "string" && s.trim())
      return s.trim();
    if (q(s) && Object.keys(s).length > 0) {
      const e = Object.entries(s);
      if (e.every(([i, n]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(i) && typeof n == "string" && n.trim()))
        return Object.fromEntries(e.map(([i, n]) => [i, n.trim()]));
    }
    return $(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Di(s, t) {
  if (s === void 0 || typeof s == "string")
    return s;
  const e = t.toLowerCase();
  return s[e] ?? s[e.split("-")[0]] ?? s.en ?? Object.values(s)[0];
}
const $e = ["auto", ...zi];
function Oi(s) {
  const t = s ?? "auto";
  return $e.includes(t) || $(`language must be one of ${$e.join(", ")}.`), t;
}
const ji = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function Lt(s) {
  return ji.has(s);
}
function T(s, t) {
  return t ? s?.states?.[t] : void 0;
}
function F(s, t) {
  const e = T(s, t)?.state;
  return e === void 0 || Lt(e) ? void 0 : e;
}
function Pt(s, t) {
  const e = F(s, t);
  if (e === void 0)
    return;
  const i = Number(e);
  return Number.isFinite(i) ? i : void 0;
}
function kt(s, t = {}) {
  return s.length < 2 ? c`${s[0] ?? g}` : c`<span class="joined ${t.whole ? "whole" : ""}">${s.map(
    (e, i) => c`${i ? c`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : g}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function Dt(s, t = {}) {
  return kt(s.split(" · "), t);
}
function ye(s, t) {
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
    const a = n.filter((l, h) => r[h + 1].top > r[h].top + 1);
    if (a.length) {
      if (!e.classList.contains("whole")) {
        e.classList.add("probe");
        const l = o.some((h) => h.scrollWidth > h.clientWidth + 0.5);
        if (e.classList.remove("probe"), l) {
          e.classList.add("flow");
          return;
        }
      }
      e.classList.add("stacked"), a.forEach((l) => l.classList.add("break"));
    }
  });
}
const Li = R`
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
`, Fi = 168 * 36e5;
function Te(s) {
  if (s == null) return;
  const t = typeof s == "number" ? s < 1e11 ? s * 1e3 : s : Date.parse(s);
  return Number.isFinite(t) ? t : void 0;
}
function Ri(s) {
  let t;
  for (const e of s ?? []) {
    const i = e.s ?? e.state, n = Te(e.lu ?? e.last_updated);
    i === void 0 || n === void 0 || i === "unavailable" || i === "unknown" || i === "" || (t === void 0 || t.state !== i) && (t = { state: i, start: n });
  }
  return t;
}
class Ui {
  constructor(t, e = Date.now) {
    this.onChange = t, this.now = e, this.known = /* @__PURE__ */ new Map(), this.wanted = /* @__PURE__ */ new Map(), this.pending = /* @__PURE__ */ new Map(), this.scheduled = !1;
  }
  /** The moment (ms) the entity got its current state; undefined when the entity is missing or has no time. */
  of(t, e) {
    const i = T(t, e);
    if (!t || !e || !i) return;
    const n = Te(i.last_changed), o = `${i.state}|${i.last_changed ?? ""}`, r = this.known.get(e);
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
        start_time: new Date(i - Fi).toISOString(),
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
      const a = Ri(n?.[o]), l = T(this.hass, o)?.state;
      this.known.set(o, { key: r, start: a && a.state === l ? a.start : void 0 });
    }
    this.onChange();
  }
}
const Bi = [
  { name: { cs: "Den", en: "Day", sv: "Dag" }, position: 100, tilt: 100 },
  { name: { cs: "Stín", en: "Shade", sv: "Skugga" }, position: 0, tilt: 100 },
  { name: { cs: "Tma", en: "Dark", sv: "Mörker" }, position: 0, tilt: 0 }
];
function ut(s, t) {
  return s == null ? [] : (Array.isArray(s) || $(`"${t}" must be a list.`), s);
}
function K(s, t, e, i, n) {
  return s == null ? e : ((typeof s != "number" || !Number.isFinite(s) || s < i || s > n) && $(`${t} must be a number from ${i} to ${n}.`), s);
}
function ht(s, t, e) {
  return ut(s, t).map((i, n) => {
    const o = `${t}[${n}]`;
    q(i) || $(`${o} must be a mapping with name and entity.`), O(i, ["name", "entity"], o);
    const r = ct(i.name, `${o}.name`) ?? $(`${o}.name is missing.`), a = w(i.entity, `${o}.entity`, { example: `${e[0]}.example` }) ?? $(`${o}.entity is missing.`);
    return e.includes(a.split(".")[0]) || $(`${o}.entity must be one of ${e.join(", ")}, not ${a}.`), { name: r, entity: a };
  });
}
function Ii(s) {
  q(s) || $("the configuration must be a mapping of keys.");
  const t = Q(s.covers, "covers");
  O(t, ["script", "entities", "last_action", "presets", "tolerance"], "covers");
  const e = {}, i = ut(t.entities, "covers.entities").map((p, v) => {
    const m = `covers.entities[${v}]`;
    if (!q(p)) return w(p, m, { domain: "cover" }) ?? $(`${m} is missing.`);
    O(p, ["name", "entity"], m);
    const E = w(p.entity, `${m}.entity`, { domain: "cover" }) ?? $(`${m}.entity is missing.`), L = ct(p.name, `${m}.name`);
    return L !== void 0 && (e[E] = L), E;
  }), n = Q(s.ventilation, "ventilation");
  O(n, ["mode", "fans"], "ventilation");
  const o = Q(s.heating, "heating");
  O(o, ["resume", "rooms"], "heating");
  const r = Q(s.cooling, "cooling");
  O(r, ["rooms"], "cooling");
  const a = Q(s.guard, "guard");
  O(a, ["hold_ms", "double_tap_ms", "hint_seconds"], "guard");
  const l = Q(s.house_modes, "house_modes");
  O(l, ["winter", "summer"], "house_modes");
  const h = ut(t.presets, "covers.presets").map((p, v) => {
    const m = `covers.presets[${v}]`;
    return q(p) || $(`${m} must be a mapping with name, position and tilt.`), O(p, ["name", "position", "tilt"], m), {
      name: ct(p.name, `${m}.name`) ?? $(`${m}.name is missing.`),
      position: K(p.position, `${m}.position`, 0, 0, 100),
      tilt: K(p.tilt, `${m}.tilt`, 0, 0, 100)
    };
  }), f = ut(s.batteries, "batteries").map((p, v) => {
    const m = `batteries[${v}]`;
    return q(p) || $(`${m} must be a mapping with name and low.`), O(p, ["name", "low", "level", "type"], m), {
      name: ct(p.name, `${m}.name`) ?? $(`${m}.name is missing.`),
      low: w(p.low, `${m}.low`, { domain: "binary_sensor" }) ?? $(`${m}.low is missing.`),
      level: w(p.level, `${m}.level`, { domain: "sensor" }),
      type: w(p.type, `${m}.type`, { domain: "sensor" })
    };
  }), d = ut(s.filters, "filters").map((p, v) => {
    const m = `filters[${v}]`;
    return q(p) || $(`${m} must be a mapping with name, hours and threshold.`), O(p, ["name", "hours", "threshold"], m), {
      name: ct(p.name, `${m}.name`) ?? $(`${m}.name is missing.`),
      hours: w(p.hours, `${m}.hours`, { domain: "input_number" }) ?? $(`${m}.hours is missing.`),
      threshold: w(p.threshold, `${m}.threshold`, { domain: "select" }) ?? $(`${m}.threshold is missing.`)
    };
  });
  return {
    language: Oi(s.language),
    houseMode: w(s.house_mode_entity, "house_mode_entity", { domain: "input_select" }),
    summer: Pi(l.summer, "house_modes.summer") ?? "Léto",
    failedActions: w(s.failed_actions, "failed_actions", { domain: "sensor" }),
    clearFailed: w(s.clear_failed_script, "clear_failed_script", { domain: "script" }),
    snoozed: w(s.snoozed, "snoozed", { domain: "sensor" }),
    snoozeScript: w(s.snooze_script, "snooze_script", { domain: "script" }),
    batteries: f,
    filters: d,
    laundry: ht(s.laundry, "laundry", ["input_boolean"]),
    running: ht(s.running, "running", ["input_boolean", "binary_sensor", "switch", "vacuum"]),
    covers: {
      script: w(t.script, "covers.script", { domain: "script" }) ?? "script.zaluzie_posun",
      entities: i,
      names: e,
      lastAction: w(t.last_action, "covers.last_action", { domain: "sensor" }),
      presets: h.length ? h : Bi,
      tolerance: K(t.tolerance, "covers.tolerance", 5, 0, 20)
    },
    ventilation: {
      mode: w(n.mode, "ventilation.mode", { domain: "input_boolean" }),
      fans: ht(n.fans, "ventilation.fans", ["switch", "fan"])
    },
    heating: {
      resume: w(o.resume, "heating.resume", { domain: "button" }),
      rooms: ht(o.rooms, "heating.rooms", ["climate"])
    },
    cooling: { rooms: ht(r.rooms, "cooling.rooms", ["climate"]) },
    sendDelaySeconds: K(s.send_delay_seconds, "send_delay_seconds", 2, 0, 30),
    guard: {
      holdMs: K(a.hold_ms, "guard.hold_ms", 550, 200, 3e3),
      doubleTapMs: K(a.double_tap_ms, "guard.double_tap_ms", 400, 150, 1500),
      hintSeconds: K(a.hint_seconds, "guard.hint_seconds", 3, 1, 10)
    }
  };
}
function Hi(s) {
  return Ni("Dům Dashboard", () => Ii(s));
}
function ze(s) {
  return (s?.locale?.language || s?.language || "").trim();
}
function Gt(s) {
  const t = s.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Yi(s, t) {
  return s === "auto" ? Gt(ze(t)) : s;
}
function Vi() {
  return Gt(document.documentElement.lang || navigator.language || "");
}
const xe = /* @__PURE__ */ new WeakMap(), qi = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Wi = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Ki = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Ot(s, t) {
  const e = s?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function Gi(s, t, e) {
  const i = ze(e).replace("_", "-"), n = i !== "" && Gt(i) === t ? i : qi[t], o = Ot(e, "number_format"), r = Ot(e, "time_format"), a = Ot(e, "date_format"), l = [t, n, o, r, a].join("|");
  let h = xe.get(s);
  h || (h = /* @__PURE__ */ new Map(), xe.set(s, h));
  let f = h.get(l);
  return f || (f = Ji(s[t], t, n, o, r, a), h.set(l, f)), f;
}
function Zi(s) {
  try {
    return new Intl.NumberFormat(s), s;
  } catch {
    return "en";
  }
}
function Xi(s, t) {
  if (s === "12")
    return !0;
  if (s === "24")
    return !1;
  const e = s === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function Ji(s, t, e, i, n, o) {
  const r = Zi(e), a = i === "system" ? void 0 : i === "none" ? "en-US" : Ki[i] ?? r, l = i === "none" ? { useGrouping: !1 } : {}, h = new Intl.NumberFormat(a, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), f = new Intl.NumberFormat(a, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), d = new Intl.NumberFormat(a, { maximumFractionDigits: 1, ...l }), p = new Intl.NumberFormat(a, { maximumFractionDigits: 0, ...l }), v = Xi(n, r), m = v ? "h12" : "h23", E = new Intl.DateTimeFormat(r, { hour: v ? "numeric" : "2-digit", minute: "2-digit", hourCycle: m }), L = new Intl.DateTimeFormat(r, v ? { hour: "numeric", hourCycle: m } : { hour: "2-digit", minute: "2-digit", hourCycle: m }), J = o === "system" ? void 0 : r, $t = new Intl.DateTimeFormat(J, { day: "numeric", month: "numeric" }), yt = (y) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return $t.format(y);
    const b = $t.formatToParts(y), U = b.find((lt) => lt.type === "literal")?.value ?? "/", rt = b[b.length - 1], at = rt?.type === "literal" ? rt.value : "", ne = b.find((lt) => lt.type === "day")?.value ?? "", oe = b.find((lt) => lt.type === "month")?.value ?? "";
    return o === "DMY" ? `${ne}${U}${oe}${at}` : `${oe}${U}${ne}${at}`;
  }, xt = Wi.has(r.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: r,
    t: s,
    one: (y) => h.format(y),
    two: (y) => f.format(y),
    half: (y) => d.format(Math.round(y * 2) / 2),
    tick: (y) => d.format(y),
    whole: (y) => p.format(y),
    percent: (y) => `${y}${xt}%`,
    time: (y) => E.format(y),
    hour: (y) => L.format(y),
    day: yt
  };
}
const Qi = {
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
  running: "Teď běží",
  nothingRuns: "Nic neběží",
  minutes: (s) => `${s} min`,
  hours: (s, t) => t ? `${s} h ${t} min` : `${s} h`,
  covers: "Žaluzie",
  coversDetail: "Podrobnosti žaluzií",
  close: "Zavřít",
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
    manualForChoices: { next: "Do změny plánu", 60: "1 h", 180: "3 h", forever: "Trvale" },
    offAfter: "Vypnout za",
    offAfterChoices: { 0: "Nevypínat", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Do další změny plánu, potom zpět na plán.",
    untilTime: (s) => `Do ${s}, potom zpět na plán.`,
    untilChanged: "Platí, dokud ho nezměníš.",
    runsUntilOff: "Běží, dokud ji nevypneš.",
    offAt: (s) => `Běží do ${s}, potom se vypne.`,
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
}, ts = {
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
  running: "Running now",
  nothingRuns: "Nothing is running",
  minutes: (s) => `${s} min`,
  hours: (s, t) => t ? `${s} h ${t} min` : `${s} h`,
  covers: "Blinds",
  coversDetail: "Blinds in detail",
  close: "Close",
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
    manualForChoices: { next: "Until schedule", 60: "1 h", 180: "3 h", forever: "Always" },
    offAfter: "Turn off in",
    offAfterChoices: { 0: "Never", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Until the next change of the schedule, then back to the schedule.",
    untilTime: (s) => `Until ${s}, then back to the schedule.`,
    untilChanged: "Holds until you change it.",
    runsUntilOff: "Runs until you turn it off.",
    offAt: (s) => `Runs until ${s}, then turns off.`,
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
}, es = {
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
  running: "Körs nu",
  nothingRuns: "Inget körs",
  minutes: (s) => `${s} min`,
  hours: (s, t) => t ? `${s} h ${t} min` : `${s} h`,
  covers: "Persienner",
  coversDetail: "Persienner i detalj",
  close: "Stäng",
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
    manualForChoices: { next: "Till schemat", 60: "1 h", 180: "3 h", forever: "Alltid" },
    offAfter: "Stäng av om",
    offAfterChoices: { 0: "Aldrig", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Till nästa ändring i schemat, sedan tillbaka till schemat.",
    untilTime: (s) => `Till ${s}, sedan tillbaka till schemat.`,
    untilChanged: "Gäller tills du ändrar det.",
    runsUntilOff: "Går tills du stänger av den.",
    offAt: (s) => `Går till ${s}, stängs sedan av.`,
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
}, is = { cs: Qi, en: ts, sv: es };
function Ne(s, t) {
  return Gi(is, s, t);
}
const ss = R`
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
    --hdk-sheet-backdrop: 35%;
    --hdk-sheet-border: rgb(0 0 0 / 8%);
    --hdk-sheet-grabber: rgb(60 60 67 / 30%);
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
`;
var ns = Object.defineProperty, Y = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = r(t, e, n) || n);
  return n && ns(t, e, n), n;
};
const os = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="8" width="16" height="8" rx="2"></rect><path d="M21 11v2" stroke-linecap="round"></path><rect x="5" y="10" width="3" height="4" fill="currentColor" stroke="none"></rect></svg>`, rs = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 8v8M12 8v8M16 8v8"></path></svg>`, as = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2.5"></rect><circle cx="12" cy="13" r="4.5"></circle><path d="M7.5 6.5h2" stroke-linecap="round"></path></svg>`, se = class se extends z {
  constructor() {
    super(...arguments), this._error = "", this._now = Date.now(), this._climateSelected = [], this._fit = "", this.starts = new Ui(() => this.requestUpdate()), this.gesture = new Ct(() => ({
      holdMs: this._config?.guard.holdMs ?? 550,
      doubleTapMs: this._config?.guard.doubleTapMs ?? 400
    })), this.closeMenu = (t) => {
      this._menu && (t instanceof KeyboardEvent ? t.key === "Escape" : !t.composedPath().some((e) => e instanceof Element && e.classList.contains("snooze"))) && (this._menu = void 0);
    };
  }
  setConfig(t) {
    this._config = Hi(t);
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this.timer = window.setInterval(() => this._now = Date.now(), 3e4), window.addEventListener("pointerdown", this.closeMenu), window.addEventListener("keydown", this.closeMenu), this.resize = new ResizeObserver(() => this._fit = `${Math.round(this.getBoundingClientRect().width)}|${this._fit.split("|")[1] ?? ""}`), this.resize.observe(this), document.fonts?.ready.then(() => this._fit = `${this._fit.split("|")[0] ?? ""}|${document.fonts.size}`);
  }
  updated(t) {
    ye(this.renderRoot, this._fit), t.has("_detail") && this._detail && this.renderRoot.querySelector("dd-sheet")?.updateComplete?.then(() => ye(this.renderRoot, this._fit));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer), window.clearTimeout(this.hintTimer), window.removeEventListener("pointerdown", this.closeMenu), window.removeEventListener("keydown", this.closeMenu), this.resize?.disconnect(), this.gesture.dispose();
  }
  willUpdate(t) {
    t.has("hass") && (this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1), this._now = Date.now());
  }
  get i18n() {
    return Ne(Yi(this._config?.language ?? "auto", this.hass), this.hass);
  }
  name(t) {
    return Di(t, this.i18n.language) ?? "";
  }
  render() {
    const t = this._config;
    if (!t) return g;
    const e = this.i18n, n = t.houseMode !== void 0 && F(this.hass, t.houseMode) === t.summer ? [this.renderCooling(t, e), this.renderHeating(t, e)] : [this.renderHeating(t, e), this.renderCooling(t, e)];
    return c`<ha-card>
      ${this.renderQueue(t, e)} ${this.renderRunning(t, e)} ${this.renderCovers(t, e)}
      ${this.renderVentilation(t, e)} ${n}
      ${this._error ? c`<div class="error" role="alert">${this._error}</div>` : g}
    </ha-card>
    ${this.renderCoversDetail(t, e)} ${this.renderClimate(t, e)}`;
  }
  /* ---------- Potřebuje tebe ---------- */
  failed(t) {
    const e = T(this.hass, t.failedActions)?.attributes.polozky;
    return Array.isArray(e) ? e.filter((i) => typeof i == "object" && i !== null && typeof i.entita == "string") : [];
  }
  renderQueue(t, e) {
    if (!t.failedActions && !t.batteries.length && !t.filters.length && !t.laundry.length) return g;
    const i = e.t, n = this.failed(t), o = this.snoozed(t), r = t.batteries.filter((d) => F(this.hass, d.low) === "on" && !o.has(`battery:${d.low}`)), a = this.dirtyFilters(t).filter(({ filter: d }) => !o.has(`filter:${d.hours}`)), l = t.laundry.filter((d) => F(this.hass, d.entity) === "on" && !o.has(`laundry:${d.entity}`)), h = n.length + r.length + a.length + l.length, f = [
      ...n.map((d, p) => {
        const v = T(this.hass, d.entita)?.attributes.friendly_name, m = d.cas ? Date.parse(d.cas) : NaN, E = d.duvod || d.akce, L = kt([E ? E.charAt(0).toLocaleUpperCase(e.language) + E.slice(1) : void 0, Number.isFinite(m) ? e.time(m) : void 0].filter(Boolean)), J = this.retryOf(t, d);
        return c`<div class="row" data-row="failed">
          <span class="mark warn" aria-hidden="true">!</span>
          <span class="main">${typeof v == "string" ? v : d.entita}<small>${L}</small></span>
          ${J ? c`<button class="button ${p === 0 ? "primary" : ""}" type="button" @click=${J}>${i.retry}</button>` : t.clearFailed ? c`<button class="button" type="button" @click=${() => this.call("script", t.clearFailed.split(".")[1], { entita: d.entita })}>${i.done}</button>` : g}
        </div>`;
      }),
      ...r.map((d) => {
        const p = Pt(this.hass, d.level), v = F(this.hass, d.type), m = kt([i.battery(p === void 0 ? void 0 : e.percent(Math.round(p))), v].filter(Boolean));
        return c`<div class="row" data-row="battery">
          <span class="mark">${os}</span>
          <span class="main">${this.name(d.name)}<small>${m}</small></span>
          ${this.snoozeButton(t, `battery:${d.low}`, e)}
        </div>`;
      }),
      ...a.map(({ filter: d, hours: p, threshold: v }) => {
        const m = (E) => `${e.whole(Math.floor(E))} h`;
        return c`<div class="row two" data-row="filter">
          <span class="mark">${rs}</span>
          <span class="main">${this.name(d.name)}<small>${Dt(i.filter(m(p), m(v)))}</small></span>
          <span class="actions">
            ${this.snoozeButton(t, `filter:${d.hours}`, e)}
            <button class="button" type="button" @click=${() => this.call("input_number", "set_value", { entity_id: d.hours, value: 0 })}>${i.done}</button>
          </span>
        </div>`;
      }),
      ...l.map((d) => {
        const p = this.starts.of(this.hass, d.entity), v = p !== void 0 && new Date(p).toDateString() === new Date(this._now).toDateString(), m = p === void 0 ? "" : v ? e.time(p) : e.day(p);
        return c`<div class="row two" data-row="laundry">
          <span class="mark">${as}</span>
          <span class="main">${this.name(d.name)}<small>${Dt(i.laundry(m))}</small></span>
          <span class="actions">
            ${this.snoozeButton(t, `laundry:${d.entity}`, e)}
            <button class="button" type="button" @click=${() => this.call("input_boolean", "turn_off", { entity_id: d.entity })}>${i.done}</button>
          </span>
        </div>`;
      })
    ];
    return c`<h2><span>${h ? `${i.needsYou} · ${h}` : i.needsYou}</span></h2>
      <div class="group" data-part="queue">
        ${f.length ? f : c`<div class="row"><span class="main">${i.nothingWaits}</span></div>`}
      </div>`;
  }
  /** Air conditioners that ran at least their threshold since the filter was cleaned; a missing value is no task. */
  dirtyFilters(t) {
    return t.filters.flatMap((e) => {
      const i = Pt(this.hass, e.hours), n = Pt(this.hass, e.threshold);
      return i !== void 0 && n !== void 0 && n > 0 && i >= n ? [{ filter: e, hours: i, threshold: n }] : [];
    });
  }
  /* ---------- Odložit ---------- */
  day(t) {
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }
  /** The keys of the items postponed to a later day than today. */
  snoozed(t) {
    const e = T(this.hass, t.snoozed)?.attributes.polozky, i = this.day(new Date(this._now)), n = /* @__PURE__ */ new Set();
    if (Array.isArray(e))
      for (const o of e)
        typeof o?.klic == "string" && typeof o.do == "string" && o.do > i && n.add(o.klic);
    return n;
  }
  /** "Odložit" with its menu (a day, to the weekend, a week, a month; without a time, it is no alarm). The menu only covers what is under it. */
  snoozeButton(t, e, i) {
    if (!t.snoozed || !t.snoozeScript) return g;
    const n = i.t, o = new Date(this._now), r = (p) => new Date(o.getFullYear(), o.getMonth(), o.getDate() + p), a = (6 - o.getDay() + 7) % 7 || 7, l = new Date(o.getFullYear(), o.getMonth() + 1, o.getDate()), h = [[n.snoozeFor.day, r(1)], [n.snoozeFor.weekend, r(a)], [n.snoozeFor.week, r(7)], [n.snoozeFor.month, l]], f = this._menu === e, d = (p) => {
      this._menu = void 0, this.call("script", t.snoozeScript.split(".")[1], { klic: e, do: this.day(p) });
    };
    return c`<span class="snooze">
      <button class="button" type="button" aria-haspopup="menu" aria-expanded=${f ? "true" : "false"} @click=${() => this._menu = f ? void 0 : e}>${n.snooze}</button>
      ${f ? c`<div class="menu" role="menu">
            ${h.map(([p, v]) => c`<button type="button" role="menuitem" @click=${() => d(v)}><span>${p}</span><span class="until">${i.day(v.getTime())}</span></button>`)}
          </div>` : g}
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
    if (!t.running.length) return g;
    const i = t.running.filter((o) => ["on", "cleaning", "returning"].includes(F(this.hass, o.entity) ?? "")), n = i.map((o) => `${this.name(o.name)} ${this.duration(o.entity, e)}`.trim());
    return c`<h2><span>${e.t.running}</span></h2>
      <div class="group" data-part="running"><div class="row now ${i.length ? "" : "none"}"><span class="main" style="font-size:inherit;line-height:inherit">${n.length ? kt(n) : e.t.nothingRuns}</span></div></div>`;
  }
  /* ---------- Žaluzie ---------- */
  /** Whether one blind is in the preset: undefined when it does not report its position. */
  coverIn(t, e, i) {
    const n = T(this.hass, e);
    if (!n || Lt(n.state)) return;
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
    if (!t.covers.entities.length) return g;
    const i = t.covers.presets.length - 1;
    return c`<h2>
        <span>${e.t.covers}</span>
        <button class="chevron" type="button" data-open="covers" aria-haspopup="dialog" aria-label=${e.t.coversDetail} @click=${() => this._detail = "covers"}>
          <span aria-hidden="true">›</span>
        </button>
      </h2>
      <div class="tiles" data-part="covers">
        ${t.covers.presets.map((n, o) => {
      const { count: r, known: a } = this.inPreset(t, n), l = a === t.covers.entities.length && r === a, h = l ? "on" : r > 0 ? "mixed" : "idle";
      return c`<dd-tile
            kind="action"
            centered
            guarded
            .name=${this.name(n.name)}
            .state=${h}
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
    const n = i.t, o = this.failed(t).find((h) => h.entita === e);
    if (o) {
      const h = o.cas ? Date.parse(o.cas) : NaN;
      return { text: [Number.isFinite(h) ? n.notArrived(this.when(h, i)) : n.notArrived("").trim(), o.duvod].filter(Boolean).join(" · "), warn: !0 };
    }
    const r = T(this.hass, t.covers.lastAction)?.attributes.polozky, a = r && typeof r == "object" ? r[e] : void 0;
    if (!a || typeof a.kdo != "string") return;
    const l = typeof a.cas == "string" ? Date.parse(a.cas) : NaN;
    return { text: [n.who[a.kdo] ?? a.kdo, Number.isFinite(l) ? this.when(l, i) : ""].filter(Boolean).join(" "), warn: !1 };
  }
  /** Detail of the blinds: every room with its last action and the three presets just for it (one tap: the sheet was opened on purpose). */
  renderCoversDetail(t, e) {
    if (!t.covers.entities.length) return g;
    const i = e.t, n = this._detail === "covers";
    return c`<dd-sheet .open=${n} .heading=${i.covers} .closeLabel=${i.close} @hdk-close=${() => this._detail = void 0}>
      ${n ? c`<div class="detail" data-part="covers-detail">
            ${t.covers.entities.map((o) => {
      const r = T(this.hass, o), a = t.covers.names[o], l = r?.attributes.friendly_name, h = a !== void 0 ? this.name(a) : typeof l == "string" ? l : o, f = this.coverAction(t, o, e);
      return c`<div class="cover-row" data-cover=${o}>
                <span class="main">${h}${f ? c`<small class=${f.warn ? "warn" : ""}>${Dt(f.text)}</small>` : g}</span>
                <span class="presets">
                  ${t.covers.presets.map(
        (d) => c`<dd-tile
                      kind="action"
                      centered
                      .name=${this.name(d.name)}
                      .label=${`${h}: ${this.name(d.name)}`}
                      .state=${this.coverIn(t, o, d) ? "on" : "idle"}
                      @hdk-press=${() => this.call("script", t.covers.script.split(".")[1], { entity: o, pos: d.position, tilt: d.tilt })}
                    ></dd-tile>`
      )}
                </span>
              </div>`;
    })}
          </div>` : g}
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
    return n.length ? c`<h2><span>${i.ventilation}</span></h2>
      <div class="tiles" data-part="ventilation">
        ${n.map((o, r) => {
      const a = T(this.hass, o.entity), l = !a || Lt(a.state), h = a?.state === "on";
      return c`<dd-tile
            kind="toggle"
            guarded
            data-entity=${o.entity}
            .name=${this.name(o.name)}
            .text=${l ? i.unavailable : h ? i.runs(this.duration(o.entity, e)).trim() : i.off}
            .state=${h ? "on" : "off"}
            .disabled=${l}
            .hint=${i.hint}
            .hintAlign=${this.align(r)}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            @hdk-toggle=${(f) => this.call("homeassistant", f.detail.checked ? "turn_on" : "turn_off", { entity_id: o.entity })}
          ></dd-tile>`;
    })}
      </div>` : g;
  }
  /* ---------- Topení a Klimatizace ---------- */
  target(t, e, i) {
    const n = Number(T(this.hass, t)?.attributes.temperature);
    return Number.isFinite(n) ? `${i ? e.half(n) : e.whole(n)}°` : "";
  }
  renderHeating(t, e) {
    if (!t.heating.rooms.length) return g;
    const i = e.t, n = t.heating.rooms.filter((o) => F(this.hass, o.entity) === "heat").length;
    return c`<h2>
        <span>${i.heating}</span>
        ${n && t.heating.resume ? this.link(
      "resume",
      c`<span class="count">${i.manualCount(n)} · </span>${i.resume}`,
      () => this.call("button", "press", { entity_id: t.heating.resume })
    ) : g}
      </h2>
      <div class="tiles" data-part="heating">
        ${t.heating.rooms.map((o) => {
      const r = F(this.hass, o.entity), a = r === void 0 ? i.unavailable : r === "off" ? i.off : [r === "auto" ? i.schedule : i.manual, this.target(o.entity, e, !0)].filter(Boolean).join(" · "), l = r === void 0 || r === "off" ? "off" : r === "auto" ? "idle" : "on";
      return this.openTile("heating", o, a, l, r === void 0);
    })}
      </div>`;
  }
  renderCooling(t, e) {
    if (!t.cooling.rooms.length) return g;
    const i = e.t, n = t.cooling.rooms.filter((o) => !["off", void 0].includes(F(this.hass, o.entity)));
    return c`<h2>
        <span>${i.cooling}</span>
        ${n.length ? this.link("alloff", i.allOff, () => this.call("climate", "turn_off", { entity_id: n.map((o) => o.entity) })) : g}
      </h2>
      <div class="tiles" data-part="cooling">
        ${t.cooling.rooms.map((o) => {
      const r = F(this.hass, o.entity), a = String(T(this.hass, o.entity)?.attributes.preset_mode ?? ""), l = r === "cool" && a === "wind_free" ? "wind_free" : r === "heat_cool" ? "auto" : r ?? "", h = r === void 0 ? i.unavailable : r === "off" ? i.off : [i.mode[l] ?? i.on, r === "fan_only" ? "" : this.target(o.entity, e, !1)].filter(Boolean).join(" · ");
      return this.openTile("cooling", o, h, r === void 0 || r === "off" ? "off" : "on", r === void 0);
    })}
      </div>`;
  }
  /** A tile that opens the popup Topení / Klimatizace with its room selected: one tap, it changes nothing by itself. */
  openTile(t, e, i, n, o) {
    return c`<dd-tile
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
    if (!t.heating.rooms.length && !t.cooling.rooms.length) return g;
    const o = async () => {
      await this.renderRoot.querySelector("dd-climate")?.flush(), this._detail = void 0;
    };
    return c`<dd-sheet .open=${i !== void 0} .heading=${i === "cooling" ? e.t.cooling : e.t.heating} .closeLabel=${e.t.close} @hdk-close=${o}>
      ${i ? c`<dd-climate
            .hass=${this.hass}
            .i18n=${e}
            .texts=${e.t.climate}
            .system=${i}
            .rooms=${n.map((r) => ({ name: this.name(r.name), entity: r.entity }))}
            .selected=${this._climateSelected}
            .delayMs=${t.sendDelaySeconds * 1e3}
            @hdk-select-rooms=${(r) => this._climateSelected = r.detail.selected}
            @hdk-error=${(r) => this._error = r.detail.message}
          ></dd-climate>` : g}
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
    return c`<button class="link" type="button" data-link=${t} @click=${n} @pointerdown=${o} @pointerup=${r} @pointerleave=${r} @pointercancel=${r} @contextmenu=${(a) => a.preventDefault()}>
      ${e}${this._hint === t ? c`<div class="hint above end" aria-hidden="true"><i></i><span style="position: relative">${this.i18n.t.hint}</span></div>` : g}
    </button>`;
  }
  /* ---------- Volání Home Assistantu ---------- */
  call(t, e, i) {
    this._error = "", this.hass?.callService(t, e, i).catch((n) => {
      this._error = `${this.i18n.t.failed}: ${n instanceof Error ? n.message : String(n)}`;
    });
  }
};
se.styles = [Et, Li, ss];
let P = se;
Y([
  u({ attribute: !1 })
], P.prototype, "hass");
Y([
  _()
], P.prototype, "_config");
Y([
  _()
], P.prototype, "_error");
Y([
  _()
], P.prototype, "_hint");
Y([
  _()
], P.prototype, "_now");
Y([
  _()
], P.prototype, "_detail");
Y([
  _()
], P.prototype, "_climateSelected");
Y([
  _()
], P.prototype, "_menu");
Y([
  _()
], P.prototype, "_fit");
Ti("dd");
yi("dd");
customElements.get("ha-dum-dashboard") || customElements.define("ha-dum-dashboard", P);
window.customCards = window.customCards ?? [];
window.customCards.some((s) => s.type === "ha-dum-dashboard") || window.customCards.push({
  type: "ha-dum-dashboard",
  name: "Dům Dashboard",
  description: Ne(Vi()).t.cardDescription,
  preview: !1
});
console.info("%c DUM-DASHBOARD %c 0.6.0 · 2026-11-13 13:03 UTC · po 2810f33 ", "color:#fff;background:#0A6ED1;font-weight:700", "color:inherit");
