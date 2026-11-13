const st = globalThis, gt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bt = /* @__PURE__ */ Symbol(), Ut = /* @__PURE__ */ new WeakMap();
let Zt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (gt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Ut.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Ut.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const le = (n) => new Zt(typeof n == "string" ? n : n + "", void 0, bt), L = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new Zt(e, n, bt);
}, he = (n, t) => {
  if (gt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = st.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, Rt = gt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return le(e);
})(n) : n;
const { is: de, defineProperty: ce, getOwnPropertyDescriptor: ue, getOwnPropertyNames: pe, getOwnPropertySymbols: fe, getPrototypeOf: me } = Object, lt = globalThis, It = lt.trustedTypes, ge = It ? It.emptyScript : "", be = lt.reactiveElementPolyfillSupport, X = (n, t) => n, rt = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? ge : null;
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
} }, $t = (n, t) => !de(n, t), Lt = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), lt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let F = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Lt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && ce(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = ue(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(X("elementProperties"))) return;
    const t = me(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(X("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(X("properties"))) {
      const e = this.properties, i = [...pe(e), ...fe(e)];
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
      for (const s of i) e.unshift(Rt(s));
    } else t !== void 0 && e.push(Rt(t));
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
    return he(t, this.constructor.elementStyles), t;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : rt).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : rt;
      this._$Em = s;
      const a = r.fromAttribute(e, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? $t)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
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
F.elementStyles = [], F.shadowRootOptions = { mode: "open" }, F[X("elementProperties")] = /* @__PURE__ */ new Map(), F[X("finalized")] = /* @__PURE__ */ new Map(), be?.({ ReactiveElement: F }), (lt.reactiveElementVersions ??= []).push("2.1.2");
const vt = globalThis, jt = (n) => n, at = vt.trustedTypes, Bt = at ? at.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Gt = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, Xt = "?" + O, $e = `<${Xt}>`, I = document, J = () => I.createComment(""), Q = (n) => n === null || typeof n != "object" && typeof n != "function", yt = Array.isArray, ve = (n) => yt(n) || typeof n?.[Symbol.iterator] == "function", ut = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ht = /-->/g, Ft = />/g, U = RegExp(`>|${ut}(?:([^\\s"'>=/]+)(${ut}*=${ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, Wt = /"/g, Jt = /^(?:script|style|textarea|title)$/i, ye = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), p = ye(1), W = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), qt = /* @__PURE__ */ new WeakMap(), R = I.createTreeWalker(I, 129);
function Qt(n, t) {
  if (!yt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Bt !== void 0 ? Bt.createHTML(t) : t;
}
const xe = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = G;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let h, u, c = -1, w = 0;
    for (; w < l.length && (r.lastIndex = w, u = r.exec(l), u !== null); ) w = r.lastIndex, r === G ? u[1] === "!--" ? r = Ht : u[1] !== void 0 ? r = Ft : u[2] !== void 0 ? (Jt.test(u[2]) && (s = RegExp("</" + u[2], "g")), r = U) : u[3] !== void 0 && (r = U) : r === U ? u[0] === ">" ? (r = s ?? G, c = -1) : u[1] === void 0 ? c = -2 : (c = r.lastIndex - u[2].length, h = u[1], r = u[3] === void 0 ? U : u[3] === '"' ? Wt : Vt) : r === Wt || r === Vt ? r = U : r === Ht || r === Ft ? r = G : (r = U, s = void 0);
    const $ = r === U && n[a + 1].startsWith("/>") ? " " : "";
    o += r === G ? l + $e : c >= 0 ? (i.push(h), l.slice(0, c) + Gt + l.slice(c) + O + $) : l + O + (c === -2 ? a : $);
  }
  return [Qt(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class tt {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [h, u] = xe(t, e);
    if (this.el = tt.createElement(h, i), R.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = R.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(Gt)) {
          const w = u[r++], $ = s.getAttribute(c).split(O), P = /([.?@])?(.*)/.exec(w);
          l.push({ type: 1, index: o, name: P[2], strings: $, ctor: P[1] === "." ? _e : P[1] === "?" ? ke : P[1] === "@" ? Ae : ht }), s.removeAttribute(c);
        } else c.startsWith(O) && (l.push({ type: 6, index: o }), s.removeAttribute(c));
        if (Jt.test(s.tagName)) {
          const c = s.textContent.split(O), w = c.length - 1;
          if (w > 0) {
            s.textContent = at ? at.emptyScript : "";
            for (let $ = 0; $ < w; $++) s.append(c[$], J()), R.nextNode(), l.push({ type: 2, index: ++o });
            s.append(c[w], J());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Xt) l.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(O, c + 1)) !== -1; ) l.push({ type: 7, index: o }), c += O.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = I.createElement("template");
    return i.innerHTML = t, i;
  }
}
function q(n, t, e = n, i) {
  if (t === W) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = Q(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = q(n, s._$AS(n, t.values), s, i)), t;
}
class we {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? I).importNode(e, !0);
    R.currentNode = s;
    let o = R.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let h;
        l.type === 2 ? h = new et(o, o.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (h = new Ce(o, this, t)), this._$AV.push(h), l = i[++a];
      }
      r !== l?.index && (o = R.nextNode(), r++);
    }
    return R.currentNode = I, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class et {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = q(this, t, e), Q(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== W && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ve(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && Q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(I.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = tt.createElement(Qt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new we(s, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = qt.get(t.strings);
    return e === void 0 && qt.set(t.strings, e = new tt(t)), e;
  }
  k(t) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new et(this.O(J()), this.O(J()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = jt(t).nextSibling;
      jt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ht {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = q(this, t, e, 0), r = !Q(t) || t !== this._$AH && t !== W, r && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++) h = q(this, a[i + l], e, l), h === W && (h = this._$AH[l]), r ||= !Q(h) || h !== this._$AH[l], h === f ? t = f : t !== f && (t += (h ?? "") + o[l + 1]), this._$AH[l] = h;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class _e extends ht {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class ke extends ht {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Ae extends ht {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = q(this, t, e, 0) ?? f) === W) return;
    const i = this._$AH, s = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ce {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    q(this, t);
  }
}
const Se = vt.litHtmlPolyfillSupport;
Se?.(tt, et), (vt.litHtmlVersions ??= []).push("3.3.3");
const Ee = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new et(t.insertBefore(J(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
const xt = globalThis;
class S extends F {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ee(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return W;
  }
}
S._$litElement$ = !0, S.finalized = !0, xt.litElementHydrateSupport?.({ LitElement: S });
const Me = xt.litElementPolyfillSupport;
Me?.({ LitElement: S });
(xt.litElementVersions ??= []).push("4.2.2");
const Te = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: $t }, Ne = (n = Te, t, e) => {
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
function d(n) {
  return (t, e) => typeof e == "object" ? Ne(n, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(n, t, e);
}
function j(n) {
  return d({ ...n, state: !0, attribute: !1 });
}
var Pe = Object.defineProperty, Y = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Pe(t, e, s), s;
};
const kt = class kt extends S {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, i = (t - e) / 2, s = 2 * Math.PI * i, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), r = t / 2;
    return p`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
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
      ${this.num ? p`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? p`<span class="unit">${this.unit}</span>` : f}` : f}
    </div>`;
  }
};
kt.styles = L`
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
let T = kt;
Y([
  d({ type: Number })
], T.prototype, "fraction");
Y([
  d({ type: Number })
], T.prototype, "size");
Y([
  d({ type: Number })
], T.prototype, "stroke");
Y([
  d()
], T.prototype, "num");
Y([
  d()
], T.prototype, "unit");
Y([
  d()
], T.prototype, "label");
class dt {
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
class wt {
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
const ct = L`
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
var De = Object.defineProperty, k = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && De(t, e, s), s;
};
const At = class At extends S {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new wt(this), this.nudgeIndex = 0, this.gesture = new dt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((a) => a.value === this.value), e = this.options.filter((a) => !a.disabled), i = this.options[t]?.value ?? e[0]?.value, s = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !s ? Math.sign(this.nudgeIndex - t) * 14 : 0, r = this._dragging ? this._dx : o;
    return p`<div
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
      (a, l) => p`<button
            type="button"
            role="radio"
            aria-checked=${a.value === this.value ? "true" : "false"}
            tabindex=${a.value === i ? 0 : -1}
            ?disabled=${this.disabled || a.disabled}
            data-value=${a.value}
            data-index=${l}
            @click=${(h) => this.onClick(h, a.value, l)}
          >
            <span>${a.label}</span>${a.detail ? p`<span class="detail">${a.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? p`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
At.styles = [
  ct,
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
let v = At;
k([
  d({ attribute: !1 })
], v.prototype, "options");
k([
  d()
], v.prototype, "value");
k([
  d()
], v.prototype, "label");
k([
  d({ type: Boolean })
], v.prototype, "disabled");
k([
  d({ type: Boolean })
], v.prototype, "compact");
k([
  d({ type: Boolean })
], v.prototype, "guarded");
k([
  d({ type: Number })
], v.prototype, "holdMs");
k([
  d({ type: Number })
], v.prototype, "doubleTapMs");
k([
  d({ type: Number })
], v.prototype, "hintSeconds");
k([
  d()
], v.prototype, "hint");
k([
  j()
], v.prototype, "_dx");
k([
  j()
], v.prototype, "_dragging");
var Oe = Object.defineProperty, C = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Oe(t, e, s), s;
};
const Ct = class Ct extends S {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, s = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, o = this.tickStep || this.step || 1, r = Math.floor(e / o + 1e-9) + 1, a = r >= 2 && r <= 40 ? Array.from({ length: r }, (l, h) => p`<i style="left:${(h * o / e * 100).toFixed(2)}%"></i>`) : [];
    return p`<div class="wrap">
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
      ${this.minLabel || this.maxLabel ? p`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
Ct.styles = L`
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
let y = Ct;
C([
  d({ type: Number })
], y.prototype, "min");
C([
  d({ type: Number })
], y.prototype, "max");
C([
  d({ type: Number })
], y.prototype, "step");
C([
  d({ type: Number })
], y.prototype, "tickStep");
C([
  d({ type: Number })
], y.prototype, "value");
C([
  d()
], y.prototype, "label");
C([
  d()
], y.prototype, "valueText");
C([
  d()
], y.prototype, "minLabel");
C([
  d()
], y.prototype, "maxLabel");
C([
  d({ type: Boolean })
], y.prototype, "disabled");
C([
  j()
], y.prototype, "_drag");
var ze = Object.defineProperty, N = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && ze(t, e, s), s;
};
const St = class St extends S {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new wt(this), this.gesture = new dt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return p`<button
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
      ${this.hints.hint ? p`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
St.styles = [
  ct,
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
let _ = St;
N([
  d({ type: Boolean })
], _.prototype, "checked");
N([
  d({ type: Boolean })
], _.prototype, "disabled");
N([
  d()
], _.prototype, "label");
N([
  d({ type: Boolean })
], _.prototype, "guarded");
N([
  d({ type: Number })
], _.prototype, "holdMs");
N([
  d({ type: Number })
], _.prototype, "doubleTapMs");
N([
  d({ type: Number })
], _.prototype, "hintSeconds");
N([
  d()
], _.prototype, "hintPlacement");
N([
  d()
], _.prototype, "hint");
var Ue = Object.defineProperty, x = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Ue(t, e, s), s;
};
const Et = class Et extends S {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new wt(this), this.gesture = new dt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.kind === "toggle", e = this.count === void 0 ? null : p`<span class="count">${this.count}</span>`;
    return p`<button
        type="button"
        role=${t ? "switch" : "button"}
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${t ? this.state === "on" ? "true" : "false" : f}
        aria-haspopup=${this.kind === "open" ? "dialog" : f}
        aria-label=${this.label || f}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(i) => this.protected && i.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? p`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : p`<span class="text">${this.text}${e}</span>`}</button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? p`<div class="hint above ${this.hintAlign}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
Et.styles = [
  ct,
  L`
      :host {
        position: relative;
        display: block;
        min-width: 0;
      }
      button {
        position: relative;
        display: block;
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
        display: flex;
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
let b = Et;
x([
  d()
], b.prototype, "name");
x([
  d()
], b.prototype, "text");
x([
  d({ reflect: !0 })
], b.prototype, "state");
x([
  d()
], b.prototype, "kind");
x([
  d({ type: Number })
], b.prototype, "count");
x([
  d({ type: Boolean, reflect: !0 })
], b.prototype, "centered");
x([
  d({ type: Boolean })
], b.prototype, "disabled");
x([
  d()
], b.prototype, "label");
x([
  d({ type: Boolean })
], b.prototype, "guarded");
x([
  d({ type: Number })
], b.prototype, "holdMs");
x([
  d({ type: Number })
], b.prototype, "doubleTapMs");
x([
  d({ type: Number })
], b.prototype, "hintSeconds");
x([
  d()
], b.prototype, "hint");
x([
  d()
], b.prototype, "hintAlign");
function Re(n) {
  const t = [
    [`${n}-switch`, _],
    [`${n}-segmented`, v],
    [`${n}-slider`, y],
    [`${n}-ring`, T],
    [`${n}-tile`, b]
  ];
  for (const [e, i] of t)
    customElements.get(e) || customElements.define(e, i);
}
const Ie = ["cs", "en", "sv"];
class te extends Error {
}
function m(n) {
  throw new te(n);
}
function Le(n, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof te ? new Error(`${n}: ${e.message}`) : e;
  }
}
function V(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function B(n, t) {
  return n == null ? {} : (V(n) || m(`"${t}" must be a mapping of keys.`), n);
}
function E(n, t, e) {
  for (const i of Object.keys(n))
    t.includes(i) || m(`${e}: unknown key "${i}" (allowed: ${t.join(", ")}).`);
}
function A(n, t, e = {}) {
  if (n == null)
    return;
  const i = typeof n == "string" ? n.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(i) || m(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !i.startsWith(`${e.domain}.`) && m(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${i}.`), i;
}
function je(n, t) {
  if (n != null)
    return (typeof n != "string" || !n.trim()) && m(`${t} must be a non-empty text.`), n.trim();
}
function ft(n, t) {
  if (n != null) {
    if (typeof n == "string" && n.trim())
      return n.trim();
    if (V(n) && Object.keys(n).length > 0) {
      const e = Object.entries(n);
      if (e.every(([i, s]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(i) && typeof s == "string" && s.trim()))
        return Object.fromEntries(e.map(([i, s]) => [i, s.trim()]));
    }
    return m(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Be(n, t) {
  if (n === void 0 || typeof n == "string")
    return n;
  const e = t.toLowerCase();
  return n[e] ?? n[e.split("-")[0]] ?? n.en ?? Object.values(n)[0];
}
const Yt = ["auto", ...Ie];
function He(n) {
  const t = n ?? "auto";
  return Yt.includes(t) || m(`language must be one of ${Yt.join(", ")}.`), t;
}
const Fe = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function mt(n) {
  return Fe.has(n);
}
function D(n, t) {
  return t ? n?.states?.[t] : void 0;
}
function M(n, t) {
  const e = D(n, t)?.state;
  return e === void 0 || mt(e) ? void 0 : e;
}
function Ve(n, t) {
  const e = M(n, t);
  if (e === void 0)
    return;
  const i = Number(e);
  return Number.isFinite(i) ? i : void 0;
}
const We = [
  { name: { cs: "Den", en: "Day", sv: "Dag" }, position: 100, tilt: 100 },
  { name: { cs: "Stín", en: "Shade", sv: "Skugga" }, position: 0, tilt: 100 },
  { name: { cs: "Tma", en: "Dark", sv: "Mörker" }, position: 0, tilt: 0 }
];
function ot(n, t) {
  return n == null ? [] : (Array.isArray(n) || m(`"${t}" must be a list.`), n);
}
function H(n, t, e, i, s) {
  return n == null ? e : ((typeof n != "number" || !Number.isFinite(n) || n < i || n > s) && m(`${t} must be a number from ${i} to ${s}.`), n);
}
function nt(n, t, e) {
  return ot(n, t).map((i, s) => {
    const o = `${t}[${s}]`;
    V(i) || m(`${o} must be a mapping with name and entity.`), E(i, ["name", "entity"], o);
    const r = ft(i.name, `${o}.name`) ?? m(`${o}.name is missing.`), a = A(i.entity, `${o}.entity`, { example: `${e[0]}.example` }) ?? m(`${o}.entity is missing.`);
    return e.includes(a.split(".")[0]) || m(`${o}.entity must be one of ${e.join(", ")}, not ${a}.`), { name: r, entity: a };
  });
}
function qe(n) {
  V(n) || m("the configuration must be a mapping of keys.");
  const t = B(n.covers, "covers");
  E(t, ["script", "entities", "presets", "tolerance"], "covers");
  const e = B(n.ventilation, "ventilation");
  E(e, ["mode", "fans"], "ventilation");
  const i = B(n.heating, "heating");
  E(i, ["resume", "rooms"], "heating");
  const s = B(n.cooling, "cooling");
  E(s, ["rooms"], "cooling");
  const o = B(n.guard, "guard");
  E(o, ["hold_ms", "double_tap_ms", "hint_seconds"], "guard");
  const r = B(n.house_modes, "house_modes");
  E(r, ["winter", "summer"], "house_modes");
  const a = ot(t.presets, "covers.presets").map((h, u) => {
    const c = `covers.presets[${u}]`;
    return V(h) || m(`${c} must be a mapping with name, position and tilt.`), E(h, ["name", "position", "tilt"], c), {
      name: ft(h.name, `${c}.name`) ?? m(`${c}.name is missing.`),
      position: H(h.position, `${c}.position`, 0, 0, 100),
      tilt: H(h.tilt, `${c}.tilt`, 0, 0, 100)
    };
  }), l = ot(n.batteries, "batteries").map((h, u) => {
    const c = `batteries[${u}]`;
    return V(h) || m(`${c} must be a mapping with name and low.`), E(h, ["name", "low", "level", "type"], c), {
      name: ft(h.name, `${c}.name`) ?? m(`${c}.name is missing.`),
      low: A(h.low, `${c}.low`, { domain: "binary_sensor" }) ?? m(`${c}.low is missing.`),
      level: A(h.level, `${c}.level`, { domain: "sensor" }),
      type: A(h.type, `${c}.type`, { domain: "sensor" })
    };
  });
  return {
    language: He(n.language),
    houseMode: A(n.house_mode_entity, "house_mode_entity", { domain: "input_select" }),
    summer: je(r.summer, "house_modes.summer") ?? "Léto",
    failedActions: A(n.failed_actions, "failed_actions", { domain: "sensor" }),
    clearFailed: A(n.clear_failed_script, "clear_failed_script", { domain: "script" }),
    batteries: l,
    running: nt(n.running, "running", ["input_boolean", "binary_sensor", "switch", "vacuum"]),
    covers: {
      script: A(t.script, "covers.script", { domain: "script" }) ?? "script.zaluzie_posun",
      entities: ot(t.entities, "covers.entities").map(
        (h, u) => A(h, `covers.entities[${u}]`, { domain: "cover" }) ?? m(`covers.entities[${u}] is missing.`)
      ),
      presets: a.length ? a : We,
      tolerance: H(t.tolerance, "covers.tolerance", 5, 0, 20)
    },
    ventilation: {
      mode: A(e.mode, "ventilation.mode", { domain: "input_boolean" }),
      fans: nt(e.fans, "ventilation.fans", ["switch", "fan"])
    },
    heating: {
      resume: A(i.resume, "heating.resume", { domain: "button" }),
      rooms: nt(i.rooms, "heating.rooms", ["climate"])
    },
    cooling: { rooms: nt(s.rooms, "cooling.rooms", ["climate"]) },
    guard: {
      holdMs: H(o.hold_ms, "guard.hold_ms", 550, 200, 3e3),
      doubleTapMs: H(o.double_tap_ms, "guard.double_tap_ms", 400, 150, 1500),
      hintSeconds: H(o.hint_seconds, "guard.hint_seconds", 3, 1, 10)
    }
  };
}
function Ye(n) {
  return Le("Dům Dashboard", () => qe(n));
}
function ee(n) {
  return (n?.locale?.language || n?.language || "").trim();
}
function _t(n) {
  const t = n.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Ke(n, t) {
  return n === "auto" ? _t(ee(t)) : n;
}
function Ze() {
  return _t(document.documentElement.lang || navigator.language || "");
}
const Kt = /* @__PURE__ */ new WeakMap(), Ge = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Xe = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Je = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function pt(n, t) {
  const e = n?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function Qe(n, t, e) {
  const i = ee(e).replace("_", "-"), s = i !== "" && _t(i) === t ? i : Ge[t], o = pt(e, "number_format"), r = pt(e, "time_format"), a = pt(e, "date_format"), l = [t, s, o, r, a].join("|");
  let h = Kt.get(n);
  h || (h = /* @__PURE__ */ new Map(), Kt.set(n, h));
  let u = h.get(l);
  return u || (u = ii(n[t], t, s, o, r, a), h.set(l, u)), u;
}
function ti(n) {
  try {
    return new Intl.NumberFormat(n), n;
  } catch {
    return "en";
  }
}
function ei(n, t) {
  if (n === "12")
    return !0;
  if (n === "24")
    return !1;
  const e = n === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function ii(n, t, e, i, s, o) {
  const r = ti(e), a = i === "system" ? void 0 : i === "none" ? "en-US" : Je[i] ?? r, l = i === "none" ? { useGrouping: !1 } : {}, h = new Intl.NumberFormat(a, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), u = new Intl.NumberFormat(a, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), c = new Intl.NumberFormat(a, { maximumFractionDigits: 1, ...l }), w = new Intl.NumberFormat(a, { maximumFractionDigits: 0, ...l }), $ = ei(s, r), P = $ ? "h12" : "h23", ne = new Intl.DateTimeFormat(r, { hour: $ ? "numeric" : "2-digit", minute: "2-digit", hourCycle: P }), se = new Intl.DateTimeFormat(r, $ ? { hour: "numeric", hourCycle: P } : { hour: "2-digit", minute: "2-digit", hourCycle: P }), oe = o === "system" ? void 0 : r, Tt = new Intl.DateTimeFormat(oe, { day: "numeric", month: "numeric" }), re = (g) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return Tt.format(g);
    const K = Tt.formatToParts(g), Nt = K.find((Z) => Z.type === "literal")?.value ?? "/", Pt = K[K.length - 1], Dt = Pt?.type === "literal" ? Pt.value : "", Ot = K.find((Z) => Z.type === "day")?.value ?? "", zt = K.find((Z) => Z.type === "month")?.value ?? "";
    return o === "DMY" ? `${Ot}${Nt}${zt}${Dt}` : `${zt}${Nt}${Ot}${Dt}`;
  }, ae = Xe.has(r.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: r,
    t: n,
    one: (g) => h.format(g),
    two: (g) => u.format(g),
    half: (g) => c.format(Math.round(g * 2) / 2),
    tick: (g) => c.format(g),
    whole: (g) => w.format(g),
    percent: (g) => `${g}${ae}%`,
    time: (g) => ne.format(g),
    hour: (g) => se.format(g),
    day: re
  };
}
const ni = {
  cardDescription: "Řídicí centrum domu: co tě potřebuje a ovládání na jednom místě.",
  title: "Dům",
  needsYou: "Potřebuje tebe",
  nothingWaits: "Nic na tebe nečeká",
  retry: "Zkusit znovu",
  done: "Hotovo",
  battery: (n) => n ? `Baterie ${n}` : "Slabá baterie",
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
}, si = {
  cardDescription: "The control centre of the house: what needs you and the controls in one place.",
  title: "House",
  needsYou: "Needs you",
  nothingWaits: "Nothing is waiting for you",
  retry: "Try again",
  done: "Done",
  battery: (n) => n ? `Battery ${n}` : "Low battery",
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
}, oi = {
  cardDescription: "Husets kontrollcenter: vad som behöver dig och styrningen på ett ställe.",
  title: "Hus",
  needsYou: "Behöver dig",
  nothingWaits: "Inget väntar på dig",
  retry: "Försök igen",
  done: "Klart",
  battery: (n) => n ? `Batteri ${n}` : "Svagt batteri",
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
}, ri = { cs: ni, en: si, sv: oi };
function ie(n, t) {
  return Qe(ri, n, t);
}
const ai = L`
  :host {
    display: block;
    --dd-page: #000000;
    --dd-card: #1c1c1e;
    --dd-el: #2c2c2e;
    --dd-text: #ffffff;
    --dd-secondary: #98989f;
    --dd-sep: rgb(84 84 88 / 65%);
    --dd-button: rgb(118 118 128 / 24%);
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
var li = Object.defineProperty, it = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && li(t, e, s), s;
};
const hi = p`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="8" width="16" height="8" rx="2"></rect><path d="M21 11v2" stroke-linecap="round"></path><rect x="5" y="10" width="3" height="4" fill="currentColor" stroke="none"></rect></svg>`, Mt = class Mt extends S {
  constructor() {
    super(...arguments), this._error = "", this._now = Date.now(), this.gesture = new dt(() => ({
      holdMs: this._config?.guard.holdMs ?? 550,
      doubleTapMs: this._config?.guard.doubleTapMs ?? 400
    }));
  }
  setConfig(t) {
    this._config = Ye(t);
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this.timer = window.setInterval(() => this._now = Date.now(), 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer), window.clearTimeout(this.hintTimer), this.gesture.dispose();
  }
  willUpdate(t) {
    t.has("hass") && (this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1), this._now = Date.now());
  }
  get i18n() {
    return ie(Ke(this._config?.language ?? "auto", this.hass), this.hass);
  }
  name(t) {
    return Be(t, this.i18n.language) ?? "";
  }
  render() {
    const t = this._config;
    if (!t) return f;
    const e = this.i18n, s = t.houseMode !== void 0 && M(this.hass, t.houseMode) === t.summer ? [this.renderCooling(t, e), this.renderHeating(t, e)] : [this.renderHeating(t, e), this.renderCooling(t, e)];
    return p`<ha-card>
      ${this.renderQueue(t, e)} ${this.renderRunning(t, e)} ${this.renderCovers(t, e)}
      ${this.renderVentilation(t, e)} ${s}
      ${this._error ? p`<div class="error" role="alert">${this._error}</div>` : f}
    </ha-card>`;
  }
  /* ---------- Potřebuje tebe ---------- */
  failed(t) {
    const e = D(this.hass, t.failedActions)?.attributes.polozky;
    return Array.isArray(e) ? e.filter((i) => typeof i == "object" && i !== null && typeof i.entita == "string") : [];
  }
  renderQueue(t, e) {
    if (!t.failedActions && !t.batteries.length) return f;
    const i = e.t, s = this.failed(t), o = t.batteries.filter((l) => M(this.hass, l.low) === "on"), r = s.length + o.length, a = [
      ...s.map((l, h) => {
        const u = D(this.hass, l.entita)?.attributes.friendly_name, c = l.cas ? Date.parse(l.cas) : NaN, w = [l.duvod || l.akce, Number.isFinite(c) ? e.time(c) : void 0].filter(Boolean).join(" · "), $ = this.retryOf(t, l);
        return p`<div class="row" data-row="failed">
          <span class="mark warn" aria-hidden="true">!</span>
          <span class="main">${typeof u == "string" ? u : l.entita}<small>${w}</small></span>
          ${$ ? p`<button class="button ${h === 0 ? "primary" : ""}" type="button" @click=${$}>${i.retry}</button>` : t.clearFailed ? p`<button class="button" type="button" @click=${() => this.call("script", t.clearFailed.split(".")[1], { entita: l.entita })}>${i.done}</button>` : f}
        </div>`;
      }),
      ...o.map((l) => {
        const h = Ve(this.hass, l.level), u = M(this.hass, l.type), c = [i.battery(h === void 0 ? void 0 : e.percent(Math.round(h))), u].filter(Boolean).join(" · ");
        return p`<div class="row" data-row="battery">
          <span class="mark">${hi}</span>
          <span class="main">${this.name(l.name)}<small>${c}</small></span>
        </div>`;
      })
    ];
    return p`<h2><span>${r ? `${i.needsYou} · ${r}` : i.needsYou}</span></h2>
      <div class="group" data-part="queue">
        ${a.length ? a : p`<div class="row"><span class="main">${i.nothingWaits}</span></div>`}
      </div>`;
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
    const i = t ? Date.parse(t) : NaN;
    if (!Number.isFinite(i)) return "";
    const s = Math.max(0, Math.floor((this._now - i) / 6e4));
    return s < 60 ? e.t.minutes(s) : e.t.hours(Math.floor(s / 60), s % 60);
  }
  renderRunning(t, e) {
    if (!t.running.length) return f;
    const i = t.running.filter((o) => ["on", "cleaning", "returning"].includes(M(this.hass, o.entity) ?? "")), s = i.map((o) => `${this.name(o.name)} ${this.duration(D(this.hass, o.entity)?.last_changed, e)}`.trim()).join(" · ");
    return p`<h2><span>${e.t.running}</span></h2>
      <div class="group" data-part="running"><div class="row now ${i.length ? "" : "none"}"><span class="main" style="font-size:inherit;line-height:inherit">${s || e.t.nothingRuns}</span></div></div>`;
  }
  /* ---------- Žaluzie ---------- */
  /** How many blinds are in the preset, and how many report their position at all. */
  inPreset(t, e) {
    let i = 0, s = 0;
    for (const o of t.covers.entities) {
      const r = D(this.hass, o);
      if (!r || mt(r.state)) continue;
      const a = Number(r.attributes.current_position), l = Number(r.attributes.current_tilt_position);
      !Number.isFinite(a) || !Number.isFinite(l) || (s += 1, Math.abs(a - e.position) <= t.covers.tolerance && Math.abs(l - e.tilt) <= t.covers.tolerance && (i += 1));
    }
    return { count: i, known: s };
  }
  renderCovers(t, e) {
    if (!t.covers.entities.length) return f;
    const i = t.covers.presets.length - 1;
    return p`<h2><span>${e.t.covers}</span></h2>
      <div class="tiles" data-part="covers">
        ${t.covers.presets.map((s, o) => {
      const { count: r, known: a } = this.inPreset(t, s), l = a === t.covers.entities.length && r === a, h = l ? "on" : r > 0 ? "mixed" : "idle";
      return p`<dd-tile
            kind="action"
            centered
            guarded
            .name=${this.name(s.name)}
            .state=${h}
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
    return s.length ? p`<h2><span>${i.ventilation}</span></h2>
      <div class="tiles" data-part="ventilation">
        ${s.map((o, r) => {
      const a = D(this.hass, o.entity), l = !a || mt(a.state), h = a?.state === "on";
      return p`<dd-tile
            kind="toggle"
            guarded
            data-entity=${o.entity}
            .name=${this.name(o.name)}
            .text=${l ? i.unavailable : h ? i.runs(this.duration(a?.last_changed, e)).trim() : i.off}
            .state=${h ? "on" : "off"}
            .disabled=${l}
            .hint=${i.hint}
            .hintAlign=${this.align(r)}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            @hdk-toggle=${(u) => this.call("homeassistant", u.detail.checked ? "turn_on" : "turn_off", { entity_id: o.entity })}
          ></dd-tile>`;
    })}
      </div>` : f;
  }
  /* ---------- Topení a Klimatizace ---------- */
  target(t, e, i) {
    const s = Number(D(this.hass, t)?.attributes.temperature);
    return Number.isFinite(s) ? `${i ? e.half(s) : e.whole(s)}°` : "";
  }
  renderHeating(t, e) {
    if (!t.heating.rooms.length) return f;
    const i = e.t, s = t.heating.rooms.filter((o) => M(this.hass, o.entity) === "heat").length;
    return p`<h2>
        <span>${i.heating}</span>
        ${s && t.heating.resume ? this.link(
      "resume",
      p`<span class="count">${i.manualCount(s)} · </span>${i.resume}`,
      () => this.call("button", "press", { entity_id: t.heating.resume })
    ) : f}
      </h2>
      <div class="tiles" data-part="heating">
        ${t.heating.rooms.map((o) => {
      const r = M(this.hass, o.entity), a = r === void 0 ? i.unavailable : r === "off" ? i.off : [r === "auto" ? i.schedule : i.manual, this.target(o.entity, e, !0)].filter(Boolean).join(" · "), l = r === void 0 || r === "off" ? "off" : r === "auto" ? "idle" : "on";
      return this.openTile(o, a, l, r === void 0);
    })}
      </div>`;
  }
  renderCooling(t, e) {
    if (!t.cooling.rooms.length) return f;
    const i = e.t, s = t.cooling.rooms.filter((o) => !["off", void 0].includes(M(this.hass, o.entity)));
    return p`<h2>
        <span>${i.cooling}</span>
        ${s.length ? this.link("alloff", i.allOff, () => this.call("climate", "turn_off", { entity_id: s.map((o) => o.entity) })) : f}
      </h2>
      <div class="tiles" data-part="cooling">
        ${t.cooling.rooms.map((o) => {
      const r = M(this.hass, o.entity), a = String(D(this.hass, o.entity)?.attributes.preset_mode ?? ""), l = r === "cool" && a === "wind_free" ? "wind_free" : r === "heat_cool" ? "auto" : r ?? "", h = r === void 0 ? i.unavailable : r === "off" ? i.off : [i.mode[l] ?? i.on, r === "fan_only" ? "" : this.target(o.entity, e, !1)].filter(Boolean).join(" · ");
      return this.openTile(o, h, r === void 0 || r === "off" ? "off" : "on", r === void 0);
    })}
      </div>`;
  }
  /** A tile that opens the detail of its device: one tap, it changes nothing by itself. */
  openTile(t, e, i, s) {
    return p`<dd-tile
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
    return p`<button class="link" type="button" data-link=${t} @click=${s} @pointerdown=${o} @pointerup=${r} @pointerleave=${r} @pointercancel=${r} @contextmenu=${(a) => a.preventDefault()}>
      ${e}${this._hint === t ? p`<div class="hint above end" aria-hidden="true"><i></i><span style="position: relative">${this.i18n.t.hint}</span></div>` : f}
    </button>`;
  }
  /* ---------- Volání Home Assistantu ---------- */
  call(t, e, i) {
    this._error = "", this.hass?.callService(t, e, i).catch((s) => {
      this._error = `${this.i18n.t.failed}: ${s instanceof Error ? s.message : String(s)}`;
    });
  }
};
Mt.styles = [ct, ai];
let z = Mt;
it([
  d({ attribute: !1 })
], z.prototype, "hass");
it([
  j()
], z.prototype, "_config");
it([
  j()
], z.prototype, "_error");
it([
  j()
], z.prototype, "_hint");
it([
  j()
], z.prototype, "_now");
Re("dd");
customElements.get("ha-dum-dashboard") || customElements.define("ha-dum-dashboard", z);
window.customCards = window.customCards ?? [];
window.customCards.some((n) => n.type === "ha-dum-dashboard") || window.customCards.push({
  type: "ha-dum-dashboard",
  name: "Dům Dashboard",
  description: ie(Ze()).t.cardDescription,
  preview: !1
});
console.info("%c DUM-DASHBOARD %c 0.1.0 · 2026-11-13 02:17 UTC · po unknown ", "color:#fff;background:#0A6ED1;font-weight:700", "color:inherit");
