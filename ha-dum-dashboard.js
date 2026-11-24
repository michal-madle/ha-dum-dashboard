const Dt = globalThis, qt = Dt.ShadowRoot && (Dt.ShadyCSS === void 0 || Dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Gt = /* @__PURE__ */ Symbol(), ve = /* @__PURE__ */ new WeakMap();
let je = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (qt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ve.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ve.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const $t = (i) => new je(typeof i == "string" ? i : i + "", void 0, Gt), K = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, n, o) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + i[o + 1], i[0]);
  return new je(e, i, Gt);
}, Xe = (i, t) => {
  if (qt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = Dt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, i.appendChild(s);
  }
}, $e = qt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return $t(e);
})(i) : i;
const { is: Je, defineProperty: Qe, getOwnPropertyDescriptor: ts, getOwnPropertyNames: es, getOwnPropertySymbols: ss, getPrototypeOf: ns } = Object, Bt = globalThis, ye = Bt.trustedTypes, is = ye ? ye.emptyScript : "", os = Bt.reactiveElementPolyfillSupport, Mt = (i, t) => i, Lt = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? is : null;
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
} }, Zt = (i, t) => !Je(i, t), xe = { attribute: !0, type: String, converter: Lt, reflect: !1, useDefault: !1, hasChanged: Zt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Bt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let vt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = xe) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && Qe(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: o } = ts(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: n, set(a) {
      const r = n?.call(this);
      o?.call(this, a), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? xe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Mt("elementProperties"))) return;
    const t = ns(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Mt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Mt("properties"))) {
      const e = this.properties, s = [...es(e), ...ss(e)];
      for (const n of s) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, n] of e) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const n = this._$Eu(e, s);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) e.unshift($e(n));
    } else t !== void 0 && e.push($e(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Xe(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : Lt).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Lt;
      this._$Em = n;
      const r = a.fromAttribute(e, o.type);
      this[n] = r ?? this._$Ej?.get(n) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, n = !1, o) {
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (o = this[t]), s ??= a.getPropertyOptions(t), !((s.hasChanged ?? Zt)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: n, wrapped: o }, a) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, o] of s) {
        const { wrapped: a } = o, r = this[n];
        a !== !0 || this._$AL.has(n) || r === void 0 || this.C(n, void 0, o, r);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
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
vt.elementStyles = [], vt.shadowRootOptions = { mode: "open" }, vt[Mt("elementProperties")] = /* @__PURE__ */ new Map(), vt[Mt("finalized")] = /* @__PURE__ */ new Map(), os?.({ ReactiveElement: vt }), (Bt.reactiveElementVersions ??= []).push("2.1.2");
const Xt = globalThis, ke = (i) => i, Pt = Xt.trustedTypes, we = Pt ? Pt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ue = "$lit$", lt = `lit$${Math.random().toFixed(9).slice(2)}$`, Be = "?" + lt, as = `<${Be}>`, pt = document, Ct = () => pt.createComment(""), Tt = (i) => i === null || typeof i != "object" && typeof i != "function", Jt = Array.isArray, rs = (i) => Jt(i) || typeof i?.[Symbol.iterator] == "function", Wt = `[ 	
\f\r]`, St = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _e = /-->/g, Ae = />/g, ht = RegExp(`>|${Wt}(?:([^\\s"'>=/]+)(${Wt}*=${Wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Se = /'/g, Me = /"/g, Re = /^(?:script|style|textarea|title)$/i, ls = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), c = ls(1), xt = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Ce = /* @__PURE__ */ new WeakMap(), ct = pt.createTreeWalker(pt, 129);
function Ie(i, t) {
  if (!Jt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return we !== void 0 ? we.createHTML(t) : t;
}
const ds = (i, t) => {
  const e = i.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = St;
  for (let r = 0; r < e; r++) {
    const l = i[r];
    let d, u, h = -1, p = 0;
    for (; p < l.length && (a.lastIndex = p, u = a.exec(l), u !== null); ) p = a.lastIndex, a === St ? u[1] === "!--" ? a = _e : u[1] !== void 0 ? a = Ae : u[2] !== void 0 ? (Re.test(u[2]) && (n = RegExp("</" + u[2], "g")), a = ht) : u[3] !== void 0 && (a = ht) : a === ht ? u[0] === ">" ? (a = n ?? St, h = -1) : u[1] === void 0 ? h = -2 : (h = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? ht : u[3] === '"' ? Me : Se) : a === Me || a === Se ? a = ht : a === _e || a === Ae ? a = St : (a = ht, n = void 0);
    const x = a === ht && i[r + 1].startsWith("/>") ? " " : "";
    o += a === St ? l + as : h >= 0 ? (s.push(d), l.slice(0, h) + Ue + l.slice(h) + lt + x) : l + lt + (h === -2 ? r : x);
  }
  return [Ie(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Nt {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const r = t.length - 1, l = this.parts, [d, u] = ds(t, e);
    if (this.el = Nt.createElement(d, s), ct.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = ct.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Ue)) {
          const p = u[a++], x = n.getAttribute(h).split(lt), m = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: m[2], strings: x, ctor: m[1] === "." ? cs : m[1] === "?" ? us : m[1] === "@" ? ps : Rt }), n.removeAttribute(h);
        } else h.startsWith(lt) && (l.push({ type: 6, index: o }), n.removeAttribute(h));
        if (Re.test(n.tagName)) {
          const h = n.textContent.split(lt), p = h.length - 1;
          if (p > 0) {
            n.textContent = Pt ? Pt.emptyScript : "";
            for (let x = 0; x < p; x++) n.append(h[x], Ct()), ct.nextNode(), l.push({ type: 2, index: ++o });
            n.append(h[p], Ct());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Be) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(lt, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += lt.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = pt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function kt(i, t, e = i, s) {
  if (t === xt) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = Tt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(i), n._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = n : e._$Cl = n), n !== void 0 && (t = kt(i, n._$AS(i, t.values), n, s)), t;
}
class hs {
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
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? pt).importNode(e, !0);
    ct.currentNode = n;
    let o = ct.nextNode(), a = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new Et(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new ms(o, this, t)), this._$AV.push(d), l = s[++r];
      }
      a !== l?.index && (o = ct.nextNode(), a++);
    }
    return ct.currentNode = pt, n;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class Et {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = kt(this, t, e), Tt(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== xt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : rs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && Tt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(pt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Nt.createElement(Ie(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new hs(n, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ce.get(t.strings);
    return e === void 0 && Ce.set(t.strings, e = new Nt(t)), e;
  }
  k(t) {
    Jt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const o of t) n === e.length ? e.push(s = new Et(this.O(Ct()), this.O(Ct()), this, this.options)) : s = e[n], s._$AI(o), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = ke(t).nextSibling;
      ke(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Rt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, n, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = f;
  }
  _$AI(t, e = this, s, n) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = kt(this, t, e, 0), a = !Tt(t) || t !== this._$AH && t !== xt, a && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = kt(this, r[s + l], e, l), d === xt && (d = this._$AH[l]), a ||= !Tt(d) || d !== this._$AH[l], d === f ? t = f : t !== f && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class cs extends Rt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class us extends Rt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class ps extends Rt {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = kt(this, t, e, 0) ?? f) === xt) return;
    const s = this._$AH, n = t === f && s !== f || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== f && (s === f || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ms {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    kt(this, t);
  }
}
const fs = Xt.litHtmlPolyfillSupport;
fs?.(Nt, Et), (Xt.litHtmlVersions ??= []).push("3.3.3");
const gs = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = n = new Et(t.insertBefore(Ct(), o), o, void 0, e ?? {});
  }
  return n._$AI(i), n;
};
const Qt = globalThis;
class V extends vt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = gs(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return xt;
  }
}
V._$litElement$ = !0, V.finalized = !0, Qt.litElementHydrateSupport?.({ LitElement: V });
const bs = Qt.litElementPolyfillSupport;
bs?.({ LitElement: V });
(Qt.litElementVersions ??= []).push("4.2.2");
const He = /* @__PURE__ */ Symbol.for(""), vs = (i) => {
  if (i?.r === He) return i?._$litStatic$;
}, te = (i) => ({ _$litStatic$: i, r: He }), Te = /* @__PURE__ */ new Map(), $s = (i) => (t, ...e) => {
  const s = e.length;
  let n, o;
  const a = [], r = [];
  let l, d = 0, u = !1;
  for (; d < s; ) {
    for (l = t[d]; d < s && (o = e[d], (n = vs(o)) !== void 0); ) l += n + t[++d], u = !0;
    d !== s && r.push(o), a.push(l), d++;
  }
  if (d === s && a.push(t[s]), u) {
    const h = a.join("$$lit$$");
    (t = Te.get(h)) === void 0 && (a.raw = a, Te.set(h, t = a)), e = r;
  }
  return i(t, ...e);
}, ee = $s(c);
const ys = { attribute: !0, type: String, converter: Lt, reflect: !1, hasChanged: Zt }, xs = (i = ys, t, e) => {
  const { kind: s, metadata: n } = e;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: a } = e;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, i, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, i, r), r;
    } };
  }
  if (s === "setter") {
    const { name: a } = e;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, i, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function v(i) {
  return (t, e) => typeof e == "object" ? xs(i, t, e) : ((s, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(i, t, e);
}
function O(i) {
  return v({ ...i, state: !0, attribute: !1 });
}
function G(i, t = {}) {
  return i.length < 2 ? c`${i[0] ?? f}` : c`<span class="joined ${t.whole ? "whole" : ""}">${i.map(
    (e, s) => c`${s ? c`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : f}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function yt(i, t = {}) {
  return G(i.split(" · "), t);
}
function Ft(i, t) {
  i.querySelectorAll(".joined").forEach((e) => {
    const s = `${t}|${e.textContent}`;
    if (e.dataset.fit === s) return;
    e.classList.remove("stacked", "flow", "probe");
    const n = [...e.querySelectorAll(":scope > .joined-sep")];
    n.forEach((l) => l.classList.remove("break"));
    const o = [...e.querySelectorAll(":scope > .joined-part")], a = o.map((l) => l.getBoundingClientRect());
    if (!a.length || !a[0].width) {
      delete e.dataset.fit;
      return;
    }
    e.dataset.fit = s;
    const r = n.filter((l, d) => a[d + 1].top > a[d].top + 1);
    if (r.length) {
      if (!e.classList.contains("whole")) {
        e.classList.add("probe");
        const l = o.some((d) => d.scrollWidth > d.clientWidth + 0.5);
        if (e.classList.remove("probe"), l) {
          e.classList.add("flow");
          return;
        }
      }
      e.classList.add("stacked"), r.forEach((l) => l.classList.add("break"));
    }
  });
}
const se = K`
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
`, ks = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif', It = K`
  :host {
    font-family: ${$t(ks)};
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
`, Ve = 25, jt = 5, We = 21, ne = ["off", "cool", "wind_free", "heat", "fan_only", "dry", "auto", "sleep"], ws = ["plan", "manual", "boost", "off"];
function ie(i) {
  return i === void 0 || i === "" || i === "unavailable" || i === "unknown";
}
function dt(i) {
  return Array.isArray(i) ? i.filter((t) => typeof t == "string") : [];
}
function mt(i) {
  const t = typeof i == "string" ? Number.parseFloat(i) : i;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function ut(i, t) {
  const e = t?.state;
  if (!t || ie(e)) return;
  if (i === "heating") {
    if (e === "auto") return "plan";
    if (e === "off") return "off";
    if (e === "heat") {
      const n = mt(t.attributes.temperature);
      return n !== void 0 && n <= jt ? "off" : n === Ve ? "boost" : "manual";
    }
    return;
  }
  const s = String(t.attributes.preset_mode ?? "");
  return e === "off" ? "off" : e === "cool" && s === "wind_free" ? "wind_free" : s === "sleep" ? "sleep" : e === "heat_cool" ? "auto" : ne.includes(e) ? e : void 0;
}
function Ut(i, t) {
  const e = ut(i, t);
  return e === void 0 ? void 0 : e !== "off";
}
function _s(i, t, e, s, n) {
  if (s.includes(n)) return s.length > 1 ? s.filter((a) => a !== n) : s;
  const o = Ut(i, t?.states[n]);
  return o === void 0 ? s : e.filter((a) => Ut(i, t?.states[a.entity]) === o).map((a) => a.entity);
}
function As(i, t) {
  return t.flatMap((e) => {
    const s = mt(i?.states[e]?.attributes.temperature);
    return s === void 0 ? [] : [{ entity: e, value: s }];
  });
}
function Ss(i, t, e) {
  const s = new Set(e.map((n) => ut(i, t?.states[n])).filter((n) => n !== void 0));
  return s.size === 1 ? [...s][0] : void 0;
}
function Ms(i, t) {
  const e = i === "heating" ? 0.5 : 1, s = mt(t?.attributes.min_temp) ?? (i === "heating" ? 5 : 16), n = mt(t?.attributes.max_temp) ?? (i === "heating" ? 25 : 30);
  return { min: Math.ceil(s / e) * e, max: Math.floor(n / e) * e, step: e };
}
function Cs(i) {
  const t = dt(i?.attributes.hvac_modes), e = dt(i?.attributes.preset_modes);
  return ne.filter((s) => s === "wind_free" ? t.includes("cool") && e.includes("wind_free") : s === "sleep" ? e.includes("sleep") : s === "auto" ? t.includes("auto") || t.includes("heat_cool") : t.includes(s));
}
function Ts(i, t, e) {
  const s = t.map((n) => dt(i?.states[n]?.attributes[e])).filter((n) => n.length);
  return s.length ? s[0].filter((n) => s.every((o) => o.includes(n))) : [];
}
function Ns(i, t, e) {
  const s = new Set(t.map((n) => i?.states[n]?.attributes[e]).filter((n) => typeof n == "string"));
  return s.size === 1 ? [...s][0] : void 0;
}
function Kt(i) {
  return !!i?.services?.tado_ce?.set_climate_timer;
}
function Ne(i) {
  return `${String(Math.floor(i / 60)).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}:00`;
}
function Es(i, t, e, s) {
  const n = e.mode ?? (e.temperature !== void 0 ? "manual" : ut("heating", t));
  if (n === void 0) return [];
  if (n === "plan") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "auto" } }];
  if (n === "off") {
    const d = e.manualFor ?? "forever";
    if (!s || d === "forever") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: i, hvac_mode: "off" } }];
    const u = { entity_id: i, temperature: jt };
    return d === "next" ? u.overlay = "next_time_block" : u.time_period = Ne(Number(d)), [{ domain: "tado_ce", service: "set_climate_timer", data: u }];
  }
  const o = mt(t?.attributes.temperature), a = n === "boost" ? Ve : e.temperature ?? (o !== void 0 && o > jt ? o : We);
  if (!s)
    return n === "manual" ? [{ domain: "climate", service: "set_temperature", data: { entity_id: i, temperature: a, hvac_mode: "heat" } }] : [];
  const r = e.manualFor ?? (n === "boost" ? "30" : "next"), l = { entity_id: i, temperature: a };
  return r === "next" ? l.overlay = "next_time_block" : r === "forever" ? l.overlay = "manual" : l.time_period = Ne(Number(r)), [{ domain: "tado_ce", service: "set_climate_timer", data: l }];
}
function zs(i, t, e) {
  const s = [], n = { entity_id: i }, o = dt(t?.attributes.hvac_modes), a = dt(t?.attributes.preset_modes), r = String(t?.attributes.preset_mode ?? ""), l = e.mode;
  if (l !== void 0) {
    const d = (h) => s.push({ domain: "climate", service: "set_hvac_mode", data: { ...n, hvac_mode: h } }), u = (h) => s.push({ domain: "climate", service: "set_preset_mode", data: { ...n, preset_mode: h } });
    l === "wind_free" ? (d("cool"), u("wind_free")) : l === "sleep" ? ((t?.state === "off" || ie(t?.state)) && d("cool"), u("sleep")) : (d(l === "auto" ? o.includes("auto") ? "auto" : "heat_cool" : l), l !== "off" && (r === "wind_free" || r === "sleep") && a.includes("none") && u("none"));
  }
  return e.temperature !== void 0 && l !== "off" && s.push({ domain: "climate", service: "set_temperature", data: { ...n, temperature: Math.round(e.temperature) } }), e.fan !== void 0 && dt(t?.attributes.fan_modes).includes(e.fan) && s.push({ domain: "climate", service: "set_fan_mode", data: { ...n, fan_mode: e.fan } }), e.swing !== void 0 && dt(t?.attributes.swing_modes).includes(e.swing) && s.push({ domain: "climate", service: "set_swing_mode", data: { ...n, swing_mode: e.swing } }), s;
}
function Ds(i, t) {
  const e = t.mode;
  return e === void 0 ? i?.state : e === "wind_free" || e === "sleep" && (i?.state === "off" || ie(i?.state)) ? "cool" : e === "sleep" ? i?.state : e === "auto" ? dt(i?.attributes.hvac_modes).includes("auto") ? "auto" : "heat_cool" : e;
}
function Os(i, t, e) {
  const s = Math.round(t * 60), n = [{ delay: { hours: Math.floor(s / 3600), minutes: Math.floor(s % 3600 / 60), seconds: s % 60 } }];
  return e !== void 0 && n.push({ condition: "state", entity_id: i, state: e }), n.push({ action: "climate.set_hvac_mode", target: { entity_id: i }, data: { hvac_mode: "off" } }), { type: "execute_script", sequence: n };
}
var Ls = Object.defineProperty, Z = (i, t, e, s) => {
  for (var n = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (n = a(t, e, n) || n);
  return n && Ls(t, e, n), n;
};
const Ps = ["next", "30", "60", "180", "forever"], Fs = [0, 60, 180, 480], de = class de extends V {
  constructor() {
    super(...arguments), this.system = "heating", this.rooms = [], this.selected = [], this.prefix = "hdk", this.delayMs = 2e3, this.draft = {}, this.busy = !1, this.error = "";
  }
  updated() {
    Ft(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
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
    const s = this.draft;
    Object.keys(s).length && (this.draft = {}, await this.send(s, t, e));
  }
  change(t) {
    this.draft = { ...this.draft, ...t }, this.error = "", this.busy = !0, window.clearTimeout(this.timer), this.timer = window.setTimeout(() => {
      this.flush();
    }, this.delayMs);
  }
  /** Sends a draft to the rooms it was made for, with the system it was made in (the popup may have switched since). */
  async send(t, e, s) {
    const n = this.hass;
    if (!n) return;
    this.busy = !0;
    const o = Kt(n);
    try {
      for (const a of e) {
        const r = n.states[a];
        if (!r || ut(s, r) === void 0) continue;
        const l = s === "heating" ? Es(a, r, t, o) : zs(a, r, t);
        for (const h of l) await n.callService(h.domain, h.service, h.data);
        const d = t.offAfter ?? 0, u = s === "cooling" ? Ds(r, t) : void 0;
        d > 0 && u !== void 0 && u !== "off" && await n.callWS(Os(a, d, u));
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
    const e = this.texts, s = this.hass?.states[t], n = ut(this.system, s);
    if (n === void 0) return e.unavailable;
    const o = mt(s?.attributes.temperature);
    return n !== "off" && n !== "boost" && n !== "fan_only" && o !== void 0 ? `${e.modes[n]} · ${this.degrees(o)}` : e.modes[n];
  }
  selectRoom(t) {
    const e = _s(this.system, this.hass, this.rooms, this.selected, t);
    e.join() !== this.selected.join() && (this.flush(this.selected), this.selected = e, this.dispatchEvent(new CustomEvent("hdk-select-rooms", { detail: { selected: e }, bubbles: !0, composed: !0 })));
  }
  render() {
    const t = this.texts, e = this.i18n;
    if (!t || !e) return f;
    const s = this.hass, n = s?.states[this.selected[0]], { min: o, max: a, step: r } = Ms(this.system, n), l = As(s, this.selected), d = [...new Set(l.map(($) => $.value))], u = Ss(this.system, s, this.selected), h = this.draft.mode ?? u, p = this.draft.temperature === void 0 && d.length > 1, x = d[0], m = this.draft.temperature ?? (h === "boost" ? 25 : h === "manual" && x !== void 0 && x <= jt ? We : x), k = h === "off" || h === "fan_only", _ = k && h !== void 0 ? t.modes[h] : p ? `${this.degrees(Math.min(...d)).replace(/°$/, "")}–${this.degrees(Math.max(...d))}` : m !== void 0 ? this.degrees(m) : "––", g = this.selected.flatMap(($) => {
      const E = mt(s?.states[$]?.attributes.current_temperature);
      return E === void 0 ? [] : [{ id: $, text: `${e.one(E)} °C` }];
    }), y = this.system === "heating" && this.selected.length === 1 && s?.states[this.selected[0]]?.attributes.hvac_action === "heating", b = p ? t.targets(l.map(($) => `${this.name($.entity)} ${this.degrees($.value)}`).join(" · ")) : g.length ? t.now(this.selected.length === 1 ? `${g[0].text}${y ? ` · ${t.heats}` : ""}` : g.map(($) => `${this.name($.id)} ${$.text}`).join(" · ")) : "", M = this.system === "heating" ? ws.filter(($) => $ !== "boost" || Kt(s)) : ne.filter(($) => this.selected.some((E) => Cs(s?.states[E]).includes($))), w = this.draft.mode === void 0 && u === void 0 && this.selected.length > 1, T = this.system === "cooling" && (h === "off" || h === "fan_only");
    return c`
      <div class="rooms" role="group" aria-label=${t.rooms}>
        ${this.rooms.map(($) => {
      const E = s?.states[$.entity], z = Ut(this.system, E), S = this.selected.includes($.entity);
      return Ee(this.prefix, {
        name: $.name,
        text: this.roomText($.entity),
        state: S ? "on" : z ? "idle" : "off",
        disabled: z === void 0,
        pressed: S,
        onPress: () => this.selectRoom($.entity)
      });
    })}
      </div>
      <div class="target">
        <div class="big ${k ? "word" : ""}" aria-live="polite">${_}</div>
        <div class="sub">${b}</div>
        ${this.busy ? c`<span class="busy" role="status" aria-label=${t.sending}
              ><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 2.5a7.5 7.5 0 1 1-7.5 7.5"></path></svg
            ></span>` : f}
      </div>
      <div class="slider">
        ${js(this.prefix, {
      min: o,
      max: a,
      step: r,
      value: m ?? o,
      mixed: p,
      marks: p ? d : [],
      label: t.temperature,
      valueText: m !== void 0 ? this.degrees(m) : "",
      minLabel: this.degrees(o),
      maxLabel: this.degrees(a),
      disabled: T || !this.selected.length,
      onChange: ($) => (
        // Moving the temperature of the heating is Ručně (spec: „Posunutí teploty přepne Plán na Ručně“).
        this.change(this.system === "heating" && h !== "manual" ? { temperature: $, mode: "manual" } : { temperature: $ })
      )
    })}
      </div>
      <h3>${t.mode}</h3>
      ${this.system === "heating" ? zt(this.prefix, {
      label: t.mode,
      options: M.map(($) => ({ value: $, label: t.modes[$] })),
      value: h ?? "",
      onSelect: ($) => this.change({ mode: $, ...$ === "plan" || $ === "off" ? { temperature: void 0 } : {} })
    }) : c`<div class="modes" role="group" aria-label=${t.mode}>
            ${M.map(
      ($) => Ee(this.prefix, {
        centered: !0,
        name: t.modes[$],
        state: h === $ ? "on" : "idle",
        pressed: h === $,
        onPress: () => this.change({ mode: $ })
      })
    )}
          </div>`}
      ${w ? c`<div class="note">${yt(t.mixedModes(this.selected.map(($) => `${this.name($)} ${t.modes[ut(this.system, s?.states[$]) ?? "off"] ?? ""}`).join(" · ")))}</div>` : f}
      ${(p || w) && !Object.keys(this.draft).length ? c`<div class="note">${t.firstChange}</div>` : f}
      ${this.system === "heating" ? this.renderManualFor(h) : [this.renderAttribute("fan"), this.renderAttribute("swing"), this.renderOffAfter(h)]}
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
    if (!Kt(this.hass)) return f;
    const s = t === "off", n = t === "manual" || t === "boost" || s, o = this.draft.manualFor ?? (t === "boost" ? "30" : s ? "forever" : "next"), a = Number(o), r = () => this.i18n.time(Date.now() + a * 6e4), l = n ? s ? o === "next" ? e.offUntilNextPlan : o === "forever" ? e.offUntilChanged : e.offUntilTime(r()) : o === "next" ? e.untilNextPlan : o === "forever" ? e.untilChanged : e.untilTime(r()) : "", d = s ? e.offFor : e.manualFor;
    return c`<h3>${d}</h3>
      ${zt(this.prefix, {
      label: d,
      options: Ps.map((u) => ({ value: u, label: e.manualForChoices[u] })),
      value: o,
      disabled: !n,
      wrap: !0,
      onSelect: (u) => this.change({ manualFor: u, ...this.draft.mode === void 0 && t ? { mode: t } : {} })
    })}
      <div class="footer">${l}</div>`;
  }
  /** Síla větru or Směr proudění: the choices every selected air conditioner offers; none, no section. */
  renderAttribute(t) {
    const e = this.texts, s = Ts(this.hass, this.selected, t === "fan" ? "fan_modes" : "swing_modes");
    if (!s.length) return f;
    const n = t === "fan" ? e.fanModes : e.swingModes, o = this.draft[t] ?? Ns(this.hass, this.selected, t === "fan" ? "fan_mode" : "swing_mode") ?? "", a = t === "fan" ? e.fan : e.swing;
    return c`<h3>${a}</h3>
      ${zt(this.prefix, {
      label: a,
      options: s.map((r) => ({ value: r, label: n[r] ?? r })),
      value: o,
      onSelect: (r) => this.change(t === "fan" ? { fan: r } : { swing: r })
    })}`;
  }
  renderOffAfter(t) {
    const e = this.texts, s = this.draft.offAfter ?? 0, n = t !== void 0 ? t !== "off" : this.selected.length > 0 && this.selected.every((a) => Ut(this.system, this.hass?.states[a]) === !0), o = n ? s === 0 ? e.runsUntilOff : e.offAt(this.i18n.time(Date.now() + s * 6e4)) : "";
    return c`<h3>${e.offAfter}</h3>
      ${zt(this.prefix, {
      label: e.offAfter,
      options: Fs.map((a) => ({ value: String(a), label: e.offAfterChoices[String(a)] })),
      value: String(s),
      disabled: !n,
      onSelect: (a) => this.change({ offAfter: Number(a) })
    })}
      <div class="footer">${o}</div>`;
  }
};
de.styles = [It, se, K`
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
let R = de;
Z([
  v({ attribute: !1 })
], R.prototype, "hass");
Z([
  v({ attribute: !1 })
], R.prototype, "i18n");
Z([
  v({ attribute: !1 })
], R.prototype, "texts");
Z([
  v()
], R.prototype, "system");
Z([
  v({ attribute: !1 })
], R.prototype, "rooms");
Z([
  v({ attribute: !1 })
], R.prototype, "selected");
Z([
  v()
], R.prototype, "prefix");
Z([
  v({ type: Number })
], R.prototype, "delayMs");
Z([
  O()
], R.prototype, "draft");
Z([
  O()
], R.prototype, "busy");
Z([
  O()
], R.prototype, "error");
function Ee(i, t) {
  const e = te(`${i}-tile`);
  return ee`<${e}
    kind="action"
    ?centered=${t.centered ?? !1}
    .name=${t.name}
    .text=${t.text ?? ""}
    .state=${t.state}
    .disabled=${t.disabled ?? !1}
    .label=${t.label ?? ""}
    .pressed=${t.pressed}
    @hdk-press=${(s) => {
    s.stopPropagation(), t.onPress();
  }}
  ></${e}>`;
}
function zt(i, t) {
  const e = te(`${i}-segmented`);
  return ee`<${e}
    .label=${t.label}
    .options=${t.options}
    .value=${t.value}
    .disabled=${t.disabled ?? !1}
    ?wrap=${t.wrap ?? !1}
    @hdk-select=${(s) => {
    s.stopPropagation(), t.onSelect(s.detail.value);
  }}
  ></${e}>`;
}
function js(i, t) {
  const e = te(`${i}-slider`);
  return ee`<${e}
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
    @hdk-input=${(s) => s.stopPropagation()}
    @hdk-change=${(s) => {
    s.stopPropagation(), t.onChange(s.detail.value);
  }}
  ></${e}>`;
}
function Us(i) {
  if (!customElements.get(`${i}-climate`)) {
    const t = class extends R {
      constructor() {
        super(), this.prefix = i;
      }
    };
    customElements.define(`${i}-climate`, t);
  }
}
var Bs = Object.defineProperty, oe = (i, t, e, s) => {
  for (var n = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (n = a(t, e, n) || n);
  return n && Bs(t, e, n), n;
};
let ot;
const he = class he extends V {
  constructor() {
    super(...arguments), this.label = "", this.text = "", this.open = !1, this.onKey = (t) => {
      this.open && t.key === "Escape" && (this.open = !1);
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keydown", this.onKey);
  }
  disconnectedCallback() {
    document.removeEventListener("keydown", this.onKey), ot === this && (ot = void 0), this.open = !1, super.disconnectedCallback();
  }
  /** Closes the bubble (the card can close it, e.g. when it switches a tab). */
  close() {
    this.open = !1;
  }
  updated(t) {
    t.has("open") && (this.open ? (ot && ot !== this && ot.close(), ot = this) : ot === this && (ot = void 0));
  }
  render() {
    return c`<button type="button" aria-label=${this.label} aria-expanded=${this.open ? "true" : "false"} @click=${() => {
      this.open = !this.open;
    }}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2"></circle><path d="M12 11v5.2"></path><circle cx="12" cy="7.6" r="0.7"></circle></svg>
      </button>${this.open ? c`<div class="note" role="note" @click=${() => {
      this.open = !1;
    }}>${this.text}</div>` : f}`;
  }
};
he.styles = [
  It,
  K`
      :host {
        display: inline-flex;
        flex: none;
      }
      button {
        display: inline-flex;
        flex: none;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        margin: -13px -13px -13px 0;
        padding: 0;
        border: 0;
        border-radius: 22px;
        background: none;
        cursor: pointer;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: -6px;
      }
      svg {
        width: 18px;
        height: 18px;
        fill: none;
        stroke: var(--hdk-secondary, #98989f);
        stroke-width: 1.8;
        stroke-linecap: round;
      }
      svg circle:last-child {
        fill: var(--hdk-secondary, #98989f);
        stroke: none;
      }
      .note {
        position: absolute;
        z-index: 5;
        inset: 48px 12px auto;
        padding: 12px 14px;
        border-radius: 14px;
        background: var(--hdk-bubble, #3a3a3c);
        box-shadow: 0 8px 24px var(--hdk-pop-shadow, rgb(0 0 0 / 55%));
        color: var(--hdk-bubble-text, #ffffff);
        font-size: 13px;
        line-height: 19px;
        text-align: left;
        cursor: pointer;
      }
    `
];
let wt = he;
oe([
  v()
], wt.prototype, "label");
oe([
  v()
], wt.prototype, "text");
oe([
  O()
], wt.prototype, "open");
var Rs = Object.defineProperty, _t = (i, t, e, s) => {
  for (var n = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (n = a(t, e, n) || n);
  return n && Rs(t, e, n), n;
};
const ce = class ce extends V {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, s = (t - e) / 2, n = 2 * Math.PI * s, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), a = t / 2;
    return c`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
      <svg viewBox="0 0 ${t} ${t}" aria-hidden="true">
        <circle class="track" cx=${a} cy=${a} r=${s} fill="none" stroke-width=${e}></circle>
        <circle
          class="fill"
          cx=${a}
          cy=${a}
          r=${s}
          fill="none"
          stroke-width=${e}
          stroke-linecap="round"
          stroke-dasharray="${(n * o).toFixed(1)} ${n.toFixed(1)}"
          transform="rotate(-90 ${a} ${a})"
        ></circle>
      </svg>
      ${this.num ? c`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? c`<span class="unit">${this.unit}</span>` : f}` : f}
    </div>`;
  }
};
ce.styles = K`
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
let it = ce;
_t([
  v({ type: Number })
], it.prototype, "fraction");
_t([
  v({ type: Number })
], it.prototype, "size");
_t([
  v({ type: Number })
], it.prototype, "stroke");
_t([
  v()
], it.prototype, "num");
_t([
  v()
], it.prototype, "unit");
_t([
  v()
], it.prototype, "label");
class Ht {
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
    const s = this.pressing, n = this.fired;
    return this.pressing = !1, this.fired = !1, !s || n ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
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
class ae {
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
const Vt = K`
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
var Is = Object.defineProperty, I = (i, t, e, s) => {
  for (var n = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (n = a(t, e, n) || n);
  return n && Is(t, e, n), n;
};
const ue = class ue extends V {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.pending = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new ae(this), this.nudgeIndex = 0, this.gesture = new Ht(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), s = this.options[t]?.value ?? e[0]?.value, n = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !n ? Math.sign(this.nudgeIndex - t) * 14 : 0, a = this._dragging ? this._dx : o;
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
      (r, l) => c`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === s ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${l}
            @click=${(d) => this.onClick(d, r.value, l)}
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
  onClick(t, e, s) {
    if (this.disabled || e === this.value) return;
    if (!this.guarded) {
      this.select(e);
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.select(e);
      return;
    }
    const n = this.gesture.tap(String(s), t.timeStamp);
    if (this.swallowClick || n === "none") {
      this.swallowClick = !1;
      return;
    }
    n === "double" ? this.select(e) : (this.nudgeIndex = s, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, s = this.options.findIndex((r) => r.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: s, moved: !1, id: t.pointerId };
    const n = t.target.closest("button[data-index]"), o = n ? Number(n.dataset.index) : -1, a = o >= 0 && o !== s && !this.options[o]?.disabled;
    this.gesture.start(() => {
      a && (this.drag = void 0, this.select(this.options[o].value));
    });
  }
  onMove(t) {
    const e = this.drag;
    if (!e || e.id !== t.pointerId) return;
    const s = t.clientX - e.x;
    if (!e.moved && Math.abs(s) < 6) return;
    e.moved || (e.moved = !0, this.gesture.release(), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const n = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((n - e.index) * e.width, s)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (this.gesture.release(), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const s = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const n = this.options[s];
    n && !n.disabled && s !== e.index && this.select(n.value);
  }
  onCancel() {
    this.gesture.cancel(), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const s = this.options.filter((r) => !r.disabled);
    if (!s.length) return;
    const n = s.findIndex((r) => r.value === this.value), o = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, a = s[(n + o + s.length) % s.length];
    t.preventDefault(), this.select(a.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${a.value}"]`)?.focus());
  }
};
ue.styles = [
  Vt,
  K`
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
let F = ue;
I([
  v({ attribute: !1 })
], F.prototype, "options");
I([
  v()
], F.prototype, "value");
I([
  v()
], F.prototype, "label");
I([
  v({ type: Boolean })
], F.prototype, "disabled");
I([
  v({ type: Boolean, reflect: !0 })
], F.prototype, "pending");
I([
  v({ type: Boolean })
], F.prototype, "compact");
I([
  v({ type: Boolean })
], F.prototype, "wrap");
I([
  v({ type: Boolean })
], F.prototype, "guarded");
I([
  v({ type: Number })
], F.prototype, "holdMs");
I([
  v({ type: Number })
], F.prototype, "doubleTapMs");
I([
  v({ type: Number })
], F.prototype, "hintSeconds");
I([
  v()
], F.prototype, "hint");
I([
  O()
], F.prototype, "_dx");
I([
  O()
], F.prototype, "_dragging");
var Hs = Object.defineProperty, ft = (i, t, e, s) => {
  for (var n = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (n = a(t, e, n) || n);
  return n && Hs(t, e, n), n;
};
const Vs = 100, Ws = 0.6, Ks = 6, pe = class pe extends V {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.wide = !1, this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.close();
        return;
      }
      if (t.key !== "Tab") return;
      const e = this.focusable();
      if (!e.length) return;
      const s = t.composedPath(), n = e.findIndex((a) => s.includes(a)), o = t.shiftKey ? e[n <= 0 ? e.length - 1 : n - 1] : e[n === -1 || n === e.length - 1 ? 0 : n + 1];
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
      const s = t.clientY - e.startY;
      if (!this.dragging) {
        if (s < Ks) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, s);
    }, this.dragEnd = (t) => {
      const e = this.drag;
      if (this.drag = void 0, !e || !this.dragging) return;
      this.dragging = !1;
      const s = Math.max(0, t.clientY - e.startY), n = s / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (s > Vs || n > Ws) ? this.close() : this.dragY = 0;
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
    ]), s = this.renderRoot.querySelector(".close");
    return [...s ? [s] : [], ...e(this).filter((n) => n.getClientRects().length > 0)];
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. Outside the sheet nothing scrolls. */
  cannotScroll(t, e) {
    const s = this.renderRoot.querySelector(".panel");
    return !s || !t.composedPath().includes(s) ? !0 : !(s.scrollHeight > s.clientHeight + 1) || e > 0 && s.scrollTop <= 0 || e < 0 && s.scrollTop + s.clientHeight >= s.scrollHeight - 1;
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
pe.styles = [It, K`
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
let tt = pe;
ft([
  v({ type: Boolean, reflect: !0 })
], tt.prototype, "open");
ft([
  v()
], tt.prototype, "heading");
ft([
  v()
], tt.prototype, "sub");
ft([
  v()
], tt.prototype, "closeLabel");
ft([
  v({ type: Boolean })
], tt.prototype, "wide");
ft([
  O()
], tt.prototype, "dragY");
ft([
  O()
], tt.prototype, "dragging");
var Ys = Object.defineProperty, H = (i, t, e, s) => {
  for (var n = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (n = a(t, e, n) || n);
  return n && Ys(t, e, n), n;
};
const me = class me extends V {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [], this.track = "";
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, s = Math.max(0, Math.min(1, (t - this.min) / e)), n = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${s})`, o = this.mixed && this._drag === void 0 ? this.marks.map((d) => c`<i style="left:${(Math.max(0, Math.min(1, (d - this.min) / e)) * 100).toFixed(2)}%"></i>`) : [], a = this.tickStep || this.step || 1, r = Math.floor(e / a + 1e-9) + 1, l = r >= 2 && r <= 40 ? Array.from({ length: r }, (d, u) => c`<i style="left:${(u * a / e * 100).toFixed(2)}%"></i>`) : [];
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
          style="--fill: ${n}${this.track ? `; --track: ${this.track}` : ""}"
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
me.styles = K`
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
    /* A painted bar has a thin outline, so its light end stays visible on the light capsule. */
    input.painted::-webkit-slider-runnable-track {
      background: var(--track);
      box-shadow: inset 0 0 0 1px var(--hdk-track-outline, rgb(128 128 128 / 45%));
    }
    input.painted::-moz-range-track {
      background: var(--track);
      box-shadow: inset 0 0 0 1px var(--hdk-track-outline, rgb(128 128 128 / 45%));
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
let j = me;
H([
  v({ type: Number })
], j.prototype, "min");
H([
  v({ type: Number })
], j.prototype, "max");
H([
  v({ type: Number })
], j.prototype, "step");
H([
  v({ type: Number })
], j.prototype, "tickStep");
H([
  v({ type: Number })
], j.prototype, "value");
H([
  v()
], j.prototype, "label");
H([
  v()
], j.prototype, "valueText");
H([
  v()
], j.prototype, "minLabel");
H([
  v()
], j.prototype, "maxLabel");
H([
  v({ type: Boolean })
], j.prototype, "disabled");
H([
  v({ type: Boolean, reflect: !0 })
], j.prototype, "mixed");
H([
  v({ attribute: !1 })
], j.prototype, "marks");
H([
  v()
], j.prototype, "track");
H([
  O()
], j.prototype, "_drag");
var qs = Object.defineProperty, et = (i, t, e, s) => {
  for (var n = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (n = a(t, e, n) || n);
  return n && qs(t, e, n), n;
};
const fe = class fe extends V {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new ae(this), this.gesture = new Ht(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
fe.styles = [
  Vt,
  K`
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
let W = fe;
et([
  v({ type: Boolean })
], W.prototype, "checked");
et([
  v({ type: Boolean })
], W.prototype, "disabled");
et([
  v({ type: Boolean, reflect: !0 })
], W.prototype, "pending");
et([
  v()
], W.prototype, "label");
et([
  v({ type: Boolean })
], W.prototype, "guarded");
et([
  v({ type: Number })
], W.prototype, "holdMs");
et([
  v({ type: Number })
], W.prototype, "doubleTapMs");
et([
  v({ type: Number })
], W.prototype, "hintSeconds");
et([
  v()
], W.prototype, "hintPlacement");
et([
  v()
], W.prototype, "hint");
var Gs = Object.defineProperty, U = (i, t, e, s) => {
  for (var n = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (n = a(t, e, n) || n);
  return n && Gs(t, e, n), n;
};
const ge = class ge extends V {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.corner = "", this.centered = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new ae(this), this.gesture = new Ht(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  /** The state line is text from parts („WindFree · 24°“): it breaks only at the dot, and the dot goes (Text z částí). */
  updated() {
    Ft(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
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
        @contextmenu=${(s) => this.protected && s.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? c`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : c`<span class="text">${yt(this.text)}${e}${this.corner ? c`<span class="corner">${this.corner}</span>` : null}</span>`}</button>
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
ge.styles = [
  Vt,
  se,
  K`
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
let D = ge;
U([
  v()
], D.prototype, "name");
U([
  v()
], D.prototype, "text");
U([
  v({ reflect: !0 })
], D.prototype, "state");
U([
  v()
], D.prototype, "kind");
U([
  v()
], D.prototype, "corner");
U([
  v({ type: Number })
], D.prototype, "count");
U([
  v({ type: Boolean, reflect: !0 })
], D.prototype, "centered");
U([
  v({ type: Boolean })
], D.prototype, "disabled");
U([
  v({ type: Boolean, reflect: !0 })
], D.prototype, "pending");
U([
  v({ type: Boolean })
], D.prototype, "pressed");
U([
  v()
], D.prototype, "label");
U([
  v({ type: Boolean })
], D.prototype, "guarded");
U([
  v({ type: Number })
], D.prototype, "holdMs");
U([
  v({ type: Number })
], D.prototype, "doubleTapMs");
U([
  v({ type: Number })
], D.prototype, "hintSeconds");
U([
  v()
], D.prototype, "hint");
U([
  v()
], D.prototype, "hintAlign");
function Zs(i) {
  const t = [
    [`${i}-switch`, W],
    [`${i}-segmented`, F],
    [`${i}-slider`, j],
    [`${i}-ring`, it],
    [`${i}-tile`, D],
    [`${i}-sheet`, tt],
    [`${i}-info`, wt]
  ];
  for (const [e, s] of t)
    customElements.get(e) || customElements.define(e, s);
}
const Xs = ["cs", "en", "sv"];
class Ke extends Error {
}
function A(i) {
  throw new Ke(i);
}
function Js(i, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Ke ? new Error(`${i}: ${e.message}`) : e;
  }
}
function Y(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function at(i, t) {
  return i == null ? {} : (Y(i) || A(`"${t}" must be a mapping of keys.`), i);
}
function P(i, t, e) {
  for (const s of Object.keys(i))
    t.includes(s) || A(`${e}: unknown key "${s}" (allowed: ${t.join(", ")}).`);
}
function N(i, t, e = {}) {
  if (i == null)
    return;
  const s = typeof i == "string" ? i.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(s) || A(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !s.startsWith(`${e.domain}.`) && A(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${s}.`), s;
}
function Qs(i, t) {
  if (i != null)
    return (typeof i != "string" || !i.trim()) && A(`${t} must be a non-empty text.`), i.trim();
}
function rt(i, t) {
  if (i != null) {
    if (typeof i == "string" && i.trim())
      return i.trim();
    if (Y(i) && Object.keys(i).length > 0) {
      const e = Object.entries(i);
      if (e.every(([s, n]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(s) && typeof n == "string" && n.trim()))
        return Object.fromEntries(e.map(([s, n]) => [s, n.trim()]));
    }
    return A(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function tn(i, t) {
  if (i === void 0 || typeof i == "string")
    return i;
  const e = t.toLowerCase();
  return i[e] ?? i[e.split("-")[0]] ?? i.en ?? Object.values(i)[0];
}
const ze = ["auto", ...Xs];
function en(i) {
  const t = i ?? "auto";
  return ze.includes(t) || A(`language must be one of ${ze.join(", ")}.`), t;
}
const sn = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function nt(i) {
  return sn.has(i);
}
function C(i, t) {
  return t ? i?.states?.[t] : void 0;
}
function L(i, t) {
  const e = C(i, t)?.state;
  return e === void 0 || nt(e) ? void 0 : e;
}
function gt(i, t) {
  const e = L(i, t);
  if (e === void 0)
    return;
  const s = Number(e);
  return Number.isFinite(s) ? s : void 0;
}
function re(i) {
  if (i == null) return;
  if (typeof i == "number")
    return Number.isFinite(i) ? i < 1e11 ? i * 1e3 : i : void 0;
  const t = Date.parse(i);
  return Number.isNaN(t) ? void 0 : t;
}
async function Ye(i, t, e, s, n = {}) {
  if (t.length === 0) return {};
  const o = n.attributes === !0;
  return await i.callWS({
    type: "history/history_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(s).toISOString(),
    entity_ids: t,
    include_start_time_state: !0,
    significant_changes_only: !1,
    // With attributes every row has them; the minimal response would leave them out of the rows in between.
    minimal_response: !o,
    no_attributes: !o
  }) ?? {};
}
function nn(i, t) {
  const e = {};
  for (const [s, n] of Object.entries(i ?? {})) {
    if (!Array.isArray(n)) continue;
    const o = [];
    let a;
    n.forEach((r, l) => {
      const d = r.s ?? r.state, u = re(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed) ?? (l === 0 ? t : void 0);
      a = r.a ?? r.attributes ?? a, !(d === void 0 || u === void 0) && o.push(a === void 0 ? { time: Math.max(u, t), state: d } : { time: Math.max(u, t), state: d, attributes: a });
    }), o.sort((r, l) => r.time - l.time), e[s] = o;
  }
  return e;
}
async function on(i, t, e, s, n = {}) {
  return nn(await Ye(i, t, e, s, n), e);
}
function qe(i) {
  return (i?.locale?.language || i?.language || "").trim();
}
function le(i) {
  const t = i.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function an(i, t) {
  return i === "auto" ? le(qe(t)) : i;
}
function rn() {
  return le(document.documentElement.lang || navigator.language || "");
}
function De(i) {
  const t = Math.max(0, Math.floor(Number.isFinite(i) ? i : 0));
  if (t < 1) return "< 1 min";
  if (t < 60) return `${t} min`;
  if (t < 1440) {
    const [n, o] = [Math.floor(t / 60), t % 60];
    return o === 0 ? `${n} h` : `${n} h ${o} min`;
  }
  const [e, s] = [Math.floor(t / 1440), Math.floor(t % 1440 / 60)];
  return s === 0 ? `${e} d` : `${e} d ${s} h`;
}
const Oe = /* @__PURE__ */ new WeakMap(), ln = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, dn = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), hn = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Yt(i, t) {
  const e = i?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function cn(i, t, e) {
  const s = qe(e).replace("_", "-"), n = s !== "" && le(s) === t ? s : ln[t], o = Yt(e, "number_format"), a = Yt(e, "time_format"), r = Yt(e, "date_format"), l = [t, n, o, a, r].join("|");
  let d = Oe.get(i);
  d || (d = /* @__PURE__ */ new Map(), Oe.set(i, d));
  let u = d.get(l);
  return u || (u = mn(i[t], t, n, o, a, r), d.set(l, u)), u;
}
function un(i) {
  try {
    return new Intl.NumberFormat(i), i;
  } catch {
    return "en";
  }
}
function pn(i, t) {
  if (i === "12")
    return !0;
  if (i === "24")
    return !1;
  const e = i === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function mn(i, t, e, s, n, o) {
  const a = un(e), r = s === "system" ? void 0 : s === "none" ? "en-US" : hn[s] ?? a, l = s === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), u = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), p = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), x = pn(n, a), m = x ? "h12" : "h23", k = new Intl.DateTimeFormat(a, { hour: x ? "numeric" : "2-digit", minute: "2-digit", hourCycle: m }), _ = new Intl.DateTimeFormat(a, x ? { hour: "numeric", hourCycle: m } : { hour: "2-digit", minute: "2-digit", hourCycle: m }), g = o === "system" ? void 0 : a, y = new Intl.DateTimeFormat(g, { day: "numeric", month: "numeric" }), b = (w) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return y.format(w);
    const T = y.formatToParts(w), $ = T.find((At) => At.type === "literal")?.value ?? "/", E = T[T.length - 1], z = E?.type === "literal" ? E.value : "", S = T.find((At) => At.type === "day")?.value ?? "", X = T.find((At) => At.type === "month")?.value ?? "";
    return o === "DMY" ? `${S}${$}${X}${z}` : `${X}${$}${S}${z}`;
  }, M = dn.has(a.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: a,
    t: i,
    one: (w) => d.format(w),
    two: (w) => u.format(w),
    half: (w) => h.format(Math.round(w * 2) / 2),
    tick: (w) => h.format(w),
    whole: (w) => p.format(w),
    percent: (w) => `${w}${M}%`,
    time: (w) => k.format(w),
    hour: (w) => _.format(w),
    day: b
  };
}
const fn = `
  --hdk-page: #000000;
  --hdk-card: #1c1c1e;
  --hdk-el: #2c2c2e;
  --hdk-sep: rgb(84 84 88 / 65%);
  --hdk-text: #ffffff;
  --hdk-secondary: #98989f;
  --hdk-nodata: #8e8e93;
  --hdk-blue: #0a84ff;
  --hdk-primary: #0a6ed1;
  --hdk-button: rgb(118 118 128 / 24%);
  --hdk-pop-shadow: rgb(0 0 0 / 55%);
  --hdk-accent: var(--hdk-blue);
  --hdk-switch-off: rgb(120 120 128 / 36%);
  --hdk-track: var(--hdk-el);
  --hdk-track-compact: #3a3a3c;
  --hdk-bar: rgb(255 255 255 / 14%);
  --hdk-tick: rgb(255 255 255 / 28%);
  --hdk-seg-thumb: #636366;
  --hdk-seg-text: #ebebf5;
  --hdk-seg-selected: #ffffff;
  --hdk-bubble: #3a3a3c;
  --hdk-bubble-text: #ffffff;
  --hdk-tile: var(--hdk-card);
  --hdk-tile-text: var(--hdk-text);
  --hdk-tile-border: var(--hdk-sep);
  --hdk-tile-on: var(--hdk-primary);
  --hdk-tile-on-text: #ffffff;
  --hdk-tile-on-sub: #ffffff;
  --hdk-tile-on-border: transparent;
  --hdk-tile-mixed: #17395d;
  --hdk-tile-badge: rgb(255 255 255 / 16%);
  --hdk-sheet-bg: var(--hdk-card);
  --hdk-sheet-text: var(--hdk-text);
  --hdk-sheet-border: rgb(255 255 255 / 10%);
  --hdk-sheet-grabber: rgb(255 255 255 / 28%);
  --hdk-sheet-backdrop: 60%;
  --hdk-sheet-button: var(--hdk-button);
  --hdk-ring-track: rgb(118 118 128 / 24%);
  --hdk-ring-text: var(--hdk-text);
  --hdk-ring-sub: var(--hdk-secondary);
`, gn = `
  --hdk-page: #f2f2f7;
  --hdk-card: #ffffff;
  --hdk-el: #f2f2f7;
  --hdk-sep: rgb(60 60 67 / 29%);
  --hdk-text: #000000;
  --hdk-secondary: #5f5f66;
  --hdk-nodata: #6e6e73;
  --hdk-blue: #0a6ed1;
  --hdk-button: rgb(118 118 128 / 12%);
  --hdk-pop-shadow: rgb(0 0 0 / 22%);
  --hdk-switch-off: rgb(120 120 128 / 32%);
  --hdk-track-compact: #e5e5ea;
  --hdk-bar: rgb(60 60 67 / 18%);
  --hdk-tick: rgb(60 60 67 / 30%);
  --hdk-seg-thumb: #ffffff;
  --hdk-seg-text: #000000;
  --hdk-seg-selected: #000000;
  --hdk-bubble: #1c1c1e;
  --hdk-tile-on: #d8e8f8;
  --hdk-tile-on-text: #000000;
  --hdk-tile-on-sub: #0a5cb0;
  --hdk-tile-on-border: #0a6ed1;
  --hdk-tile-mixed: #e6eff9;
  --hdk-tile-badge: rgb(60 60 67 / 14%);
  --hdk-sheet-border: rgb(0 0 0 / 8%);
  --hdk-sheet-grabber: rgb(60 60 67 / 30%);
  --hdk-sheet-backdrop: 35%;
`;
function bn(i) {
  const t = $t(`${i}-sheet`), e = $t(`${i}-climate`);
  return K`
    :host {
      ${$t(fn)}
    }
    :host(:where([data-light])) {
      ${$t(gn)}
    }
    ${t},
    ${e} {
      --hdk-tile: var(--hdk-el);
    }
    ${e} {
      --hdk-accent: var(--hdk-blue);
    }
  `;
}
class vn {
  constructor(t, e = () => {
  }) {
    this.host = t, this.changed = e, this.prefersDark = !0, this.onChange = (s) => {
      this.prefersDark = s.matches, this.changed();
    };
  }
  connect() {
    this.query = typeof window.matchMedia == "function" ? window.matchMedia("(prefers-color-scheme: dark)") : void 0, this.prefersDark = this.query?.matches ?? !0, this.query?.addEventListener?.("change", this.onChange);
  }
  disconnect() {
    this.query?.removeEventListener?.("change", this.onChange), this.query = void 0;
  }
  /** True in the light mode. */
  light(t) {
    const e = t?.themes?.darkMode;
    return !(typeof e == "boolean" ? e : this.prefersDark);
  }
  /** Sets `data-light` on the card; returns the light mode. */
  apply(t) {
    const e = this.light(t);
    return this.host.toggleAttribute("data-light", e), e;
  }
}
const $n = 168 * 36e5;
function yn(i) {
  let t;
  for (const e of i ?? []) {
    const s = e.s ?? e.state, n = re(e.lu ?? e.last_updated);
    s === void 0 || n === void 0 || s === "unavailable" || s === "unknown" || s === "" || (t === void 0 || t.state !== s) && (t = { state: s, start: n });
  }
  return t;
}
class xn {
  constructor(t, e = Date.now) {
    this.onChange = t, this.now = e, this.known = /* @__PURE__ */ new Map(), this.wanted = /* @__PURE__ */ new Map(), this.pending = /* @__PURE__ */ new Map(), this.scheduled = !1;
  }
  /** The moment (ms) the entity got its current state; undefined when the entity is missing or has no time. */
  of(t, e) {
    const s = C(t, e);
    if (!t || !e || !s) return;
    const n = re(s.last_changed), o = `${s.state}|${s.last_changed ?? ""}`, a = this.known.get(e);
    return a?.key === o ? a.start === void 0 ? n : Math.min(a.start, n ?? a.start) : (this.hass = t, this.wanted.get(e) !== o && this.pending.get(e) !== o && (this.wanted.set(e, o), this.schedule()), n);
  }
  schedule() {
    this.scheduled || (this.scheduled = !0, Promise.resolve().then(() => this.flush()));
  }
  async flush() {
    this.scheduled = !1;
    const t = this.hass, e = new Map(this.wanted);
    if (this.wanted.clear(), !t || !e.size) return;
    for (const [o, a] of e) this.pending.set(o, a);
    const s = this.now();
    let n;
    try {
      n = await Ye(t, [...e.keys()], s - $n, s);
    } catch {
      n = void 0;
    }
    for (const [o, a] of e) {
      if (this.pending.get(o) === a && this.pending.delete(o), this.wanted.has(o)) continue;
      const r = yn(n?.[o]), l = C(this.hass, o)?.state;
      this.known.set(o, { key: a, start: r && r.state === l ? r.start : void 0 });
    }
    this.onChange();
  }
}
class kn {
  /** `changed` is called whenever a control starts or stops pulsing (the card re-renders). */
  constructor(t, e = 5e3) {
    this.changed = t, this.stallMs = e, this.watches = /* @__PURE__ */ new Map();
  }
  has(t) {
    return this.watches.has(t);
  }
  /** The command was sent. A state that is already there pulses not at all. */
  start(t, e, s) {
    if (this.stop(t, !1), e && s.done(e)) {
      this.changed();
      return;
    }
    const n = { ...s, signature: Le(e, s.entities) };
    this.watches.set(t, n), this.arm(t, n), this.changed();
  }
  /** The call failed, or the card goes away. */
  stop(t, e = !0) {
    const s = this.watches.get(t);
    s && (clearTimeout(s.timer), this.watches.delete(t), e && this.changed());
  }
  /** On every update of Home Assistant: arrived ones stop, moving ones get the full stall time again. */
  check(t) {
    if (t)
      for (const [e, s] of [...this.watches]) {
        if (s.done(t)) {
          this.stop(e);
          continue;
        }
        const n = Le(t, s.entities);
        n !== s.signature && (s.signature = n, this.arm(e, s));
      }
  }
  clear() {
    for (const t of [...this.watches.keys()]) this.stop(t, !1);
  }
  arm(t, e) {
    clearTimeout(e.timer), e.timer = setTimeout(() => this.stop(t), e.stallMs ?? this.stallMs);
  }
}
function Le(i, t) {
  return t.map((e) => {
    const s = i?.states[e];
    return s ? `${s.state}|${JSON.stringify(s.attributes)}` : "";
  }).join("§");
}
const wn = [
  { name: { cs: "Den", en: "Day", sv: "Dag" }, position: 100, tilt: 100 },
  { name: { cs: "Stín", en: "Shade", sv: "Skugga" }, position: 0, tilt: 100 },
  { name: { cs: "Tma", en: "Dark", sv: "Mörker" }, position: 0, tilt: 0 }
];
function Q(i, t) {
  return i == null ? [] : (Array.isArray(i) || A(`"${t}" must be a list.`), i);
}
function st(i, t, e, s, n) {
  return i == null ? e : ((typeof i != "number" || !Number.isFinite(i) || i < s || i > n) && A(`${t} must be a number from ${s} to ${n}.`), i);
}
function J(i, t, e) {
  return Q(i, t).map((s, n) => {
    const o = `${t}[${n}]`;
    Y(s) || A(`${o} must be a mapping with name and entity.`), P(s, ["name", "entity"], o);
    const a = rt(s.name, `${o}.name`) ?? A(`${o}.name is missing.`), r = N(s.entity, `${o}.entity`, { example: `${e[0]}.example` }) ?? A(`${o}.entity is missing.`);
    return e.includes(r.split(".")[0]) || A(`${o}.entity must be one of ${e.join(", ")}, not ${r}.`), { name: a, entity: r };
  });
}
function _n(i) {
  Y(i) || A("the configuration must be a mapping of keys.");
  const t = at(i.covers, "covers");
  P(t, ["script", "entities", "last_action", "presets", "tolerance"], "covers");
  const e = {}, s = Q(t.entities, "covers.entities").map((g, y) => {
    const b = `covers.entities[${y}]`;
    if (!Y(g)) return N(g, b, { domain: "cover" }) ?? A(`${b} is missing.`);
    P(g, ["name", "entity"], b);
    const M = N(g.entity, `${b}.entity`, { domain: "cover" }) ?? A(`${b}.entity is missing.`), w = rt(g.name, `${b}.name`);
    return w !== void 0 && (e[M] = w), M;
  }), n = at(i.ventilation, "ventilation");
  P(n, ["mode", "fans"], "ventilation");
  const o = at(i.heating, "heating");
  P(o, ["resume", "rooms"], "heating");
  const a = at(i.cooling, "cooling");
  P(a, ["rooms"], "cooling");
  const r = at(i.guard, "guard"), l = at(i.orders, "orders");
  P(l, ["entity", "update", "check"], "orders");
  const d = N(l.entity, "orders.entity", { domain: "sensor" });
  P(r, ["hold_ms", "double_tap_ms", "hint_seconds"], "guard");
  const u = at(i.house_modes, "house_modes");
  P(u, ["winter", "summer"], "house_modes");
  const h = Q(t.presets, "covers.presets").map((g, y) => {
    const b = `covers.presets[${y}]`;
    return Y(g) || A(`${b} must be a mapping with name, position and tilt.`), P(g, ["name", "position", "tilt"], b), {
      name: rt(g.name, `${b}.name`) ?? A(`${b}.name is missing.`),
      position: st(g.position, `${b}.position`, 0, 0, 100),
      tilt: st(g.tilt, `${b}.tilt`, 0, 0, 100)
    };
  }), p = Q(i.batteries, "batteries").map((g, y) => {
    const b = `batteries[${y}]`;
    return Y(g) || A(`${b} must be a mapping with name and low.`), P(g, ["name", "low", "level", "type"], b), {
      name: rt(g.name, `${b}.name`) ?? A(`${b}.name is missing.`),
      low: N(g.low, `${b}.low`, { domain: "binary_sensor" }) ?? A(`${b}.low is missing.`),
      level: N(g.level, `${b}.level`, { domain: "sensor" }),
      type: N(g.type, `${b}.type`, { domain: "sensor" })
    };
  }), x = Q(i.filters, "filters").map((g, y) => {
    const b = `filters[${y}]`;
    return Y(g) || A(`${b} must be a mapping with name, hours and threshold.`), P(g, ["name", "hours", "threshold"], b), {
      name: rt(g.name, `${b}.name`) ?? A(`${b}.name is missing.`),
      hours: N(g.hours, `${b}.hours`, { domain: "input_number" }) ?? A(`${b}.hours is missing.`),
      threshold: N(g.threshold, `${b}.threshold`, { domain: "select" }) ?? A(`${b}.threshold is missing.`)
    };
  }), m = Q(i.maintenance, "maintenance").map((g, y) => {
    const b = `maintenance[${y}]`;
    return Y(g) || A(`${b} must be a mapping with name, task, counter and every.`), P(g, ["name", "task", "counter", "every"], b), {
      name: rt(g.name, `${b}.name`) ?? A(`${b}.name is missing.`),
      task: rt(g.task, `${b}.task`) ?? A(`${b}.task is missing.`),
      counter: N(g.counter, `${b}.counter`, { domain: "counter" }) ?? A(`${b}.counter is missing.`),
      every: st(g.every, `${b}.every`, 30, 1, 1e3)
    };
  }), k = Q(i.devices, "devices").map((g, y) => {
    const b = `devices[${y}]`;
    return Y(g) || A(`${b} must be a mapping with name and entities.`), P(g, ["name", "entities"], b), {
      name: rt(g.name, `${b}.name`) ?? A(`${b}.name is missing.`),
      entities: Q(g.entities, `${b}.entities`).map((M, w) => {
        const T = `${b}.entities[${w}]`;
        Y(M) || A(`${T} must be a mapping with name and entity.`), P(M, ["name", "entity", "startup_brightness", "map"], T);
        const [$] = J([{ name: M.name, entity: M.entity }], `${b}.entities`, ["light", "switch", "fan", "input_boolean", "vacuum"]), E = $.entity.split(".")[0];
        M.startup_brightness != null && E !== "light" && A(`${T}.startup_brightness is only for a light.`), M.map != null && E !== "vacuum" && A(`${T}.map is only for a vacuum.`);
        const z = N(M.startup_brightness, `${T}.startup_brightness`, { domain: "input_number" }), S = N(M.map, `${T}.map`, { example: "camera.example" });
        return S && !["camera", "image"].includes(S.split(".")[0]) && A(`${T}.map must be a camera or an image, not ${S}.`), { ...$, ...z ? { startupBrightness: z } : {}, ...S ? { map: S } : {} };
      })
    };
  }), _ = at(i.health, "health");
  return P(_, ["battery_low", "batteries", "connections", "system", "updates"], "health"), _.updates !== void 0 && typeof _.updates != "boolean" && A("health.updates must be true or false."), {
    language: en(i.language),
    houseMode: N(i.house_mode_entity, "house_mode_entity", { domain: "input_select" }),
    summer: Qs(u.summer, "house_modes.summer") ?? "Léto",
    failedActions: N(i.failed_actions, "failed_actions", { domain: "sensor" }),
    clearFailed: N(i.clear_failed_script, "clear_failed_script", { domain: "script" }),
    snoozed: N(i.snoozed, "snoozed", { domain: "sensor" }),
    snoozeScript: N(i.snooze_script, "snooze_script", { domain: "script" }),
    batteries: p,
    filters: x,
    laundry: J(i.laundry, "laundry", ["input_boolean"]),
    leaks: J(i.leaks, "leaks", ["binary_sensor"]),
    orders: d ? { entity: d, update: N(l.update, "orders.update", { domain: "input_button" }), check: N(l.check, "orders.check", { domain: "input_button" }) } : void 0,
    tasks: Q(i.tasks, "tasks").map((g, y) => N(g, `tasks[${y}]`, { domain: "sensor" }) ?? A(`tasks[${y}] is missing.`)),
    maintenance: m,
    running: J(i.running, "running", ["input_boolean", "binary_sensor", "switch", "vacuum"]),
    covers: {
      script: N(t.script, "covers.script", { domain: "script" }) ?? "script.zaluzie_posun",
      entities: s,
      names: e,
      lastAction: N(t.last_action, "covers.last_action", { domain: "sensor" }),
      presets: h.length ? h : wn,
      tolerance: st(t.tolerance, "covers.tolerance", 5, 0, 20)
    },
    ventilation: {
      mode: N(n.mode, "ventilation.mode", { domain: "input_boolean" }),
      fans: J(n.fans, "ventilation.fans", ["switch", "fan"])
    },
    heating: {
      resume: N(o.resume, "heating.resume", { domain: "button" }),
      rooms: J(o.rooms, "heating.rooms", ["climate"])
    },
    cooling: { rooms: J(a.rooms, "cooling.rooms", ["climate"]) },
    devices: k,
    health: {
      batteryLow: st(_.battery_low, "health.battery_low", 20, 1, 99),
      batteries: J(_.batteries, "health.batteries", ["sensor"]),
      connections: J(_.connections, "health.connections", ["binary_sensor"]),
      system: Q(_.system, "health.system").map((g, y) => {
        const b = `health.system[${y}]`;
        Y(g) || A(`${b} must be a mapping with name and entity.`), P(g, ["name", "entity", "max"], b);
        const [M] = J([{ name: g.name, entity: g.entity }], b, ["sensor", "binary_sensor"]);
        return g.max !== void 0 && (typeof g.max != "number" || !Number.isFinite(g.max)) && A(`${b}.max must be a number.`), { ...M, max: g.max };
      }),
      updates: _.updates === !0
    },
    sendDelaySeconds: st(i.send_delay_seconds, "send_delay_seconds", 2, 0, 30),
    guard: {
      holdMs: st(r.hold_ms, "guard.hold_ms", 550, 200, 3e3),
      doubleTapMs: st(r.double_tap_ms, "guard.double_tap_ms", 400, 150, 1500),
      hintSeconds: st(r.hint_seconds, "guard.hint_seconds", 3, 1, 10)
    }
  };
}
function An(i) {
  return Js("Dům Dashboard", () => _n(i));
}
const Sn = {
  cardDescription: "Řídicí centrum domu: co tě potřebuje a ovládání na jednom místě.",
  title: "Dům",
  orders: "Limitní ordery",
  ordersUpdate: "Aktualizovat ordery",
  ordersUpdateDry: "Vyzkoušet aktualizaci",
  ordersCancel: "zrušit",
  ordersCheck: "Zkontrolovat",
  ordersChecked: (i) => `Zkontrolováno ${i}`,
  ordersTried: (i) => `Vyzkoušeno ${i} · ordery se nemění`,
  ordersApplied: (i) => `Ordery upraveny ${i}`,
  ordersApplyFailed: (i) => `Úprava se nepovedla ${i}`,
  ordersStillDiffer: (i) => `${i} stále nesedí`,
  ordersPricesFrom: (i) => `ceny z ${i}`,
  ordersChecking: "Probíhá kontrola…",
  ordersFailed: "Kontrola selhala",
  ordersDryRun: "zkušební režim, ordery se nemění",
  ordersNoData: "Zatím nezkontrolováno",
  ordersNow: "teď",
  ordersNew: "nově",
  ordersMissing: "chybí",
  ordersSame: "sedí",
  ordersPosition: "Pozice",
  ordersValue: "Hodnota",
  ordersTarget: (i) => `proti cíli ${i}`,
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
    lightMode: "Režim světla",
    white: "Bílá",
    coloured: "Barevná",
    colour: "Barva",
    temperature: "Teplota barvy",
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
}, Mn = {
  cardDescription: "The control centre of the house: what needs you and the controls in one place.",
  title: "House",
  orders: "Limit orders",
  ordersUpdate: "Update orders",
  ordersUpdateDry: "Try the update",
  ordersCancel: "cancel",
  ordersCheck: "Check",
  ordersChecked: (i) => `Checked ${i}`,
  ordersTried: (i) => `Tried ${i} · orders unchanged`,
  ordersApplied: (i) => `Orders updated ${i}`,
  ordersApplyFailed: (i) => `Update failed ${i}`,
  ordersStillDiffer: (i) => `${i} still differ`,
  ordersPricesFrom: (i) => `prices from ${i}`,
  ordersChecking: "Checking…",
  ordersFailed: "Check failed",
  ordersDryRun: "dry run, orders are not changed",
  ordersNoData: "Not checked yet",
  ordersNow: "now",
  ordersNew: "new",
  ordersMissing: "missing",
  ordersSame: "matches",
  ordersPosition: "Position",
  ordersValue: "Value",
  ordersTarget: (i) => `vs target ${i}`,
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
    lightMode: "Light mode",
    white: "White",
    coloured: "Colour",
    colour: "Colour",
    temperature: "Colour temperature",
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
}, Cn = {
  cardDescription: "Husets kontrollcenter: vad som behöver dig och styrningen på ett ställe.",
  title: "Hus",
  orders: "Limitordrar",
  ordersUpdate: "Uppdatera ordrar",
  ordersUpdateDry: "Prova uppdateringen",
  ordersCancel: "ta bort",
  ordersCheck: "Kontrollera",
  ordersChecked: (i) => `Kontrollerat ${i}`,
  ordersTried: (i) => `Testkört ${i} · ordrarna ändras inte`,
  ordersApplied: (i) => `Ordrar uppdaterade ${i}`,
  ordersApplyFailed: (i) => `Uppdateringen misslyckades ${i}`,
  ordersStillDiffer: (i) => `${i} skiljer sig fortfarande`,
  ordersPricesFrom: (i) => `priser från ${i}`,
  ordersChecking: "Kontrollerar…",
  ordersFailed: "Kontrollen misslyckades",
  ordersDryRun: "testläge, ordrarna ändras inte",
  ordersNoData: "Inte kontrollerat än",
  ordersNow: "nu",
  ordersNew: "ny",
  ordersMissing: "saknas",
  ordersSame: "stämmer",
  ordersPosition: "Position",
  ordersValue: "Värde",
  ordersTarget: (i) => `mot målet ${i}`,
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
    lightMode: "Ljusläge",
    white: "Vitt",
    coloured: "Färg",
    colour: "Färg",
    temperature: "Färgtemperatur",
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
}, Tn = { cs: Sn, en: Mn, sv: Cn };
function Ge(i, t) {
  return cn(Tn, i, t);
}
const Nn = [
  It,
  bn("dd"),
  K`
  :host {
    display: block;
    /* The shared surfaces and texts are the kit's (paletteStyles, CURRENT_SPEC.md kitu, Barvy); only what is the card's own is set here. */
    --dd-page: var(--hdk-page);
    --dd-card: var(--hdk-card);
    --dd-el: var(--hdk-el);
    --dd-text: var(--hdk-text);
    --dd-secondary: var(--hdk-secondary);
    --dd-sep: var(--hdk-sep);
    --dd-button: var(--hdk-button);
    --dd-menu: #2c2c2e;
    --dd-accent: var(--hdk-blue);
    --dd-warning: #ff9230;
    --dd-warning-bg: rgb(255 146 48 / 16%);
    --dd-alert: #ff6961;
    --dd-alert-bg: rgb(255 66 69 / 18%);
    color: var(--dd-text);
  }
  :host([data-light]) {
    --dd-button: rgb(118 118 128 / 16%);
    --dd-menu: #ffffff;
    --dd-warning: #8f4a12;
    --dd-warning-bg: rgb(168 82 0 / 12%);
    --dd-alert: #c4001a;
    --dd-alert-bg: rgb(196 0 26 / 10%);
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
    width: 22px;
    height: 22px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1.5px rgb(128 128 128 / 50%);
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
  /* Limitní ordery: the update under the list and in the detail, the whole width. */
  .orders-update {
    width: 100%;
    margin-top: 12px;
  }
  .health-row .main small {
    display: block;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .orders-head {
    color: var(--dd-secondary);
    font-size: 13px;
  }
  .detail-actions {
    padding-top: 4px;
  }
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
`
], En = ["unavailable", "unknown", ""], zn = ["opening", "closing"], Dn = 6e4;
function Ot(i) {
  return typeof i.when == "number" ? i.when * 1e3 : Date.parse(i.when);
}
function Pe(i) {
  return i.context_name || i.context_entity_id_name || (i.context_user_id ? "app" : "");
}
function On(i, t) {
  const e = i.filter((a) => typeof a.entity_id == "string" && a.state !== void 0).sort((a, r) => Ot(a) - Ot(r)), s = /* @__PURE__ */ new Map(), n = [];
  for (const a of e) {
    const r = String(a.state);
    if (zn.includes(r)) {
      const d = Pe(a);
      d && s.set(a.entity_id, d);
      continue;
    }
    const l = Pe(a) || s.get(a.entity_id) || "";
    s.delete(a.entity_id), !En.includes(r) && n.push({ entry: a, time: Ot(a), state: r, reason: l, kind: t(a.entity_id) });
  }
  const o = [];
  for (const a of n) {
    const r = o.at(-1), l = a.reason === "app" && r?.some((d) => d.reason === "app");
    r && !l && a.time - r[r.length - 1].time <= Dn ? r.push(a) : o.push([a]);
  }
  return o.map((a) => {
    const r = /* @__PURE__ */ new Map();
    for (const h of a)
      r.delete(h.entry.entity_id), r.set(h.entry.entity_id, h);
    const l = [...r.values()].sort((h, p) => h.time - p.time), d = l.find((h) => h.reason === "app") ?? l[0], u = [];
    for (const h of l) {
      if (h === d) continue;
      const p = h.kind || h.entry.entity_id, x = u.find((m) => (m.kind || m.items[0].entry.entity_id) === p && m.state === h.state);
      x ? x.items.push(h) : u.push({ kind: h.kind, state: h.state, items: [h] });
    }
    return { time: d.time, head: d, groups: u };
  }).sort((a, r) => r.time - a.time);
}
function Ln(i) {
  const t = i.map((s) => s.split(" "));
  let e = 0;
  for (; t.every((s) => s.length > e + 1 && s[e] === t[0][e]); ) e += 1;
  return t.map((s) => {
    const n = s.slice(e).join(" ");
    return n.charAt(0).toLocaleUpperCase() + n.slice(1);
  });
}
var Pn = Object.defineProperty, q = (i, t, e, s) => {
  for (var n = void 0, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (n = a(t, e, n) || n);
  return n && Pn(t, e, n), n;
};
const Ze = "dum-dashboard.log-seen";
function Fn() {
  try {
    return Number(localStorage.getItem(Ze)) || 0;
  } catch {
    return 0;
  }
}
function jn(i) {
  try {
    localStorage.setItem(Ze, String(i));
  } catch {
  }
}
const Un = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="8" width="16" height="8" rx="2"></rect><path d="M21 11v2" stroke-linecap="round"></path><rect x="5" y="10" width="3" height="4" fill="currentColor" stroke="none"></rect></svg>`, Fe = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.34-5.66"></path><path d="M20 4v5h-5"></path></svg>`, bt = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>`, Bn = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7.5V12l3 2"></path></svg>`, Rn = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 8v8M12 8v8M16 8v8"></path></svg>`, In = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2.5"></rect><circle cx="12" cy="13" r="4.5"></circle><path d="M7.5 6.5h2" stroke-linecap="round"></path></svg>`, Hn = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3.5c3 4 5.5 7 5.5 10.2a5.5 5.5 0 0 1-11 0C6.5 10.5 9 7.5 12 3.5z" stroke-linejoin="round"></path></svg>`, Vn = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7l1.5 1.5L8 6M4 15l1.5 1.5L8 14M11 7.5h9M11 15.5h9"></path></svg>`, Wn = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.6-.6-2.6z"></path></svg>`, be = class be extends V {
  constructor() {
    super(...arguments), this._error = "", this._now = Date.now(), this.coverHistory = {}, this._seen = Fn(), this.pending = new kn(() => this.requestUpdate()), this.appearance = new vn(this, () => this.appearance.apply(this.hass)), this._climateSelected = [], this._fit = "", this.starts = new xn(() => this.requestUpdate()), this.gesture = new Ht(() => ({
      holdMs: this._config?.guard.holdMs ?? 550,
      doubleTapMs: this._config?.guard.doubleTapMs ?? 400
    })), this.closeMenu = (t) => {
      this._menu && (t instanceof KeyboardEvent ? t.key === "Escape" : !t.composedPath().some((e) => e instanceof Element && e.classList.contains("snooze"))) && (this._menu = void 0);
    };
  }
  setConfig(t) {
    this._config = An(t);
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this.appearance.connect(), this.timer = window.setInterval(() => this._now = Date.now(), 3e4), window.addEventListener("pointerdown", this.closeMenu), window.addEventListener("keydown", this.closeMenu), this.resize = new ResizeObserver(() => this._fit = `${Math.round(this.getBoundingClientRect().width)}|${this._fit.split("|")[1] ?? ""}`), this.resize.observe(this), document.fonts?.ready.then(() => this._fit = `${this._fit.split("|")[0] ?? ""}|${document.fonts.size}`), this.logTimer = window.setInterval(() => {
      this.loadLog();
    }, 5 * 6e4);
  }
  updated(t) {
    Ft(this.renderRoot, this._fit), t.has("_detail") && this._detail && this.renderRoot.querySelector("dd-sheet")?.updateComplete?.then(() => Ft(this.renderRoot, this._fit));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.appearance.disconnect(), window.clearInterval(this.timer), window.clearInterval(this.logTimer), this.pending.clear(), window.clearTimeout(this.hintTimer), window.removeEventListener("pointerdown", this.closeMenu), window.removeEventListener("keydown", this.closeMenu), this.resize?.disconnect(), this.gesture.dispose();
  }
  willUpdate(t) {
    t.has("hass") && (this.appearance.apply(this.hass), this._now = Date.now(), t.get("hass") || this.loadLog(), this.pending.check(this.hass));
  }
  get i18n() {
    return Ge(an(this._config?.language ?? "auto", this.hass), this.hass);
  }
  name(t) {
    return tn(t, this.i18n.language) ?? "";
  }
  render() {
    const t = this._config;
    if (!t) return f;
    const e = this.i18n, n = t.houseMode !== void 0 && L(this.hass, t.houseMode) === t.summer ? [this.renderCooling(t, e), this.renderHeating(t, e)] : [this.renderHeating(t, e), this.renderCooling(t, e)];
    return c`<ha-card>
      ${this.renderOrders(t, e)} ${this.renderQueue(t, e)} ${this.renderRunning(t, e)} ${this.renderCovers(t, e)}
      ${this.renderVentilation(t, e)} ${n} ${this.renderDevices(t, e)} ${this.renderHealth(t, e)} ${this.renderLogRow(t, e)}
      ${this._error ? c`<div class="error" role="alert">${this._error}</div>` : f}
    </ha-card>
    ${this.renderOrdersDetail(t, e)} ${this.renderCoversDetail(t, e)} ${this.renderClimate(t, e)} ${this.renderLog(t, e)} ${this.renderHealthDetail(t, e)} ${this.renderRules(e)} ${this.renderDeviceDetail(t, e)}`;
  }
  /* ---------- Zdraví ---------- */
  /** The state of each part of Zdraví: what needs attention first, then one summary line per part. */
  healthState(t, e) {
    const s = e.t, n = t.health, o = n.batteries.map((h) => ({ item: h, level: gt(this.hass, h.entity) })).sort((h, p) => (h.level ?? -1) - (p.level ?? -1)), a = n.connections.map((h) => ({ item: h, state: L(this.hass, h.entity) })), r = n.system.map((h) => {
      const p = C(this.hass, h.entity), x = h.entity.startsWith("binary_sensor."), m = this.hass, k = !p || nt(p.state) ? s.unavailable : x ? p.state === "on" ? s.healthProblem : s.healthOk : m?.formatEntityState ? m.formatEntityState(p) : p.state, _ = !x && h.entity.endsWith("_status") && p !== void 0 && !nt(p.state) && p.state !== "normal", g = h.max !== void 0 && p !== void 0 && Number.isFinite(Number(p.state)) && Number(p.state) > h.max;
      return { item: h, value: k, problem: x && p?.state === "on" || _ || g };
    }), l = n.updates ? Object.entries(this.hass?.states ?? {}).filter(([h, p]) => h.startsWith("update.") && p.state === "on").map(([h, p]) => ({ id: h, name: typeof p.attributes.friendly_name == "string" ? p.attributes.friendly_name : h, version: String(p.attributes.latest_version ?? "") })).sort((h, p) => h.name.localeCompare(p.name)) : [], d = this.snoozed(t), u = [
      // A weak battery the queue „Potřebuje tebe“ already shows is not said twice (uživatel 14. 11. 2026: „Q224 A“).
      ...o.filter(({ item: h, level: p }) => p !== void 0 && p < n.batteryLow && !t.batteries.some((x) => x.level === h.entity && L(this.hass, x.low) === "on")).map(({ item: h, level: p }) => ({ entity: h.entity, name: this.name(h.name), detail: s.battery(e.percent(Math.round(p))) })),
      ...a.filter(({ state: h }) => h !== "on").map(({ item: h }) => ({ entity: h.entity, name: this.name(h.name), detail: s.healthOffline })),
      ...r.filter(({ problem: h }) => h).map(({ item: h, value: p }) => ({ entity: h.entity, name: this.name(h.name), detail: p }))
    ].filter((h) => !d.has(`health:${h.entity}`));
    return { batteries: o, connections: a, system: r, updates: l, attention: u };
  }
  renderHealth(t, e) {
    const s = t.health;
    if (!s.batteries.length && !s.connections.length && !s.system.length && !s.updates) return f;
    const n = e.t, o = this.healthState(t, e), a = o.batteries.find(({ level: h }) => h !== void 0), r = o.connections.filter(({ state: h }) => h !== "on").length, l = o.system.filter(({ problem: h }) => h).length, d = (h) => o.attention.some((p) => h.some((x) => x.entity === p.entity)), u = (h, p, x, m = !1) => c`<button class="row link-row" type="button" aria-haspopup="dialog" data-health=${h} @click=${() => this._detail = `health:${h}`}>
      <span class="main">${p}<small class=${m ? "warn" : ""}>${x}</small></span>
      <span class="chevron-mark" aria-hidden="true">›</span>
    </button>`;
    return c`<h2><span>${n.health}</span></h2>
      <div class="group" data-part="health">
        ${o.attention.map(
      (h) => c`<div class="row" data-row="attention" data-entity=${h.entity}>
            <span class="mark warn" aria-hidden="true">!</span>
            <span class="main">${h.name}<small class="warn">${G([n.healthAttention, h.detail])}</small></span>
            ${this.snoozeButton(t, `health:${h.entity}`, e, h.name)}
          </div>`
    )}
        ${s.batteries.length ? a ? u("batteries", n.healthBatteries, n.healthLowest(`${this.name(a.item.name)} ${e.percent(Math.round(a.level))}`), a.level < s.batteryLow) : u("batteries", n.healthBatteries, n.unavailable, !0) : f}
        ${s.connections.length ? u("connections", n.healthConnections, r ? n.healthOfflineCount(r) : n.healthAllOnline, d(s.connections)) : f}
        ${s.system.length ? u("system", n.healthSystem, l ? n.healthProblem : n.healthOk, d(s.system)) : f}
        ${s.updates ? u("updates", n.healthUpdates, o.updates.length ? n.healthUpdatesCount(o.updates.length) : n.healthUpToDate) : f}
      </div>`;
  }
  renderHealthDetail(t, e) {
    const s = e.t, n = this._detail?.startsWith("health:") ? this._detail.slice(7) : void 0, o = { batteries: s.healthBatteries, connections: s.healthConnections, system: s.healthSystem, updates: s.healthUpdates }, a = n ? this.healthState(t, e) : void 0, r = (d, u, h, p) => c`<div class="health-row ${p ? "tap" : ""}" @click=${p ? () => this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: !0, composed: !0, detail: { entityId: p } })) : void 0}>
        <span class="main">${d}</span><span class="value ${h ? "warn" : ""}">${u}</span>
      </div>`, l = () => !a || !n ? f : n === "batteries" ? a.batteries.map(({ item: d, level: u }) => r(this.name(d.name), u === void 0 ? s.unavailable : e.percent(Math.round(u)), u !== void 0 && u < t.health.batteryLow)) : n === "connections" ? a.connections.map(({ item: d, state: u }) => r(this.name(d.name), u === "on" ? s.healthOnline : s.healthOffline, u !== "on")) : n === "system" ? a.system.map(({ item: d, value: u, problem: h }) => r(this.name(d.name), u, h)) : a.updates.length ? a.updates.map((d) => r(d.name, d.version, !1, d.id)) : c`<p class="log-empty">${s.healthUpToDate}</p>`;
    return c`<dd-sheet .open=${n !== void 0} .heading=${n ? o[n] : ""} .closeLabel=${s.close} @hdk-close=${() => this._detail = void 0}>
      ${n ? c`<div class="detail" data-part="health-detail">${l()}</div>` : f}
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
      ...t.devices.flatMap((e) => e.entities.map((s) => s.entity))
    ];
  }
  async loadLog() {
    const t = this._config, e = this.hass;
    if (!t || !e?.callWS) return;
    const s = this.logEntities(t);
    if (!s.length) return;
    const n = /* @__PURE__ */ new Date();
    n.setHours(0, 0, 0, 0);
    try {
      const o = await e.callWS({ type: "logbook/get_events", start_time: n.toISOString(), entity_ids: s });
      await this.loadCoverHistory(t, n), this._log = Array.isArray(o) ? o : [];
    } catch {
    }
  }
  async loadCoverHistory(t, e) {
    if (!(!t.covers.entities.length || !this.hass))
      try {
        const s = await on(this.hass, t.covers.entities, e.getTime(), Date.now(), { attributes: !0 }), n = {};
        for (const [o, a] of Object.entries(s))
          n[o] = a.flatMap((r) => {
            const l = Number(r.attributes?.current_position), d = Number(r.attributes?.current_tilt_position);
            return !Number.isFinite(l) || !Number.isFinite(d) ? [] : [{ time: r.time, position: l, tilt: d }];
          });
        this.coverHistory = n;
      } catch {
      }
  }
  /** The preset a blind was in at `time` (from the recorder), or undefined. */
  presetAt(t, e, s) {
    const n = this.coverHistory[e] ?? [];
    let o;
    for (const a of n) a.time <= s + 6e4 && (o = a);
    if (o)
      return t.covers.presets.find((a) => Math.abs(o.position - a.position) <= t.covers.tolerance && Math.abs(o.tilt - a.tilt) <= t.covers.tolerance);
  }
  /** Which entities are one kind: one action on several of them is one row. */
  logKind(t) {
    const e = /* @__PURE__ */ new Map();
    return t.covers.entities.forEach((s) => e.set(s, "covers")), t.ventilation.fans.forEach((s) => e.set(s.entity, "ventilation")), t.heating.rooms.forEach((s) => e.set(s.entity, "heating")), t.cooling.rooms.forEach((s) => e.set(s.entity, "cooling")), t.devices.forEach((s, n) => s.entities.forEach((o) => e.set(o.entity, `devices-${n}`))), (s) => e.get(s) ?? "";
  }
  /** Pračka, sušička, myčka in words („Sušička · Doběhla“), not their helpers („Sušička běží · Vypnuto“). */
  logTitle(t, e, s, n) {
    const o = n.t, a = t.running.find((d) => d.entity === e.entity_id);
    if (a) return `${this.name(a.name)} · ${s === "on" ? o.logRuns : o.logFinished}`;
    const r = t.laundry.find((d) => d.entity === e.entity_id);
    if (r) return `${this.name(r.name)} · ${s === "on" ? o.logLaundryWaits : o.logLaundryOut}`;
    const l = t.leaks.find((d) => d.entity === e.entity_id);
    return l ? `${this.name(l.name)} · ${s === "on" ? o.logLeak : o.logLeakOver}` : `${this.logName(e)} · ${this.logState(e, s)}`;
  }
  /**
   * The reason of a blind when the logbook has none: the helper of the last action of each blind says who sent it
   * (the same source as the detail of the blinds), when its time is just before the entry.
   */
  coverReason(t, e, s) {
    if (e.reason || e.kind !== "covers") return e.reason === "app" ? s.t.who.aplikace : e.reason;
    const n = C(this.hass, t.covers.lastAction)?.attributes.polozky, o = n && typeof n == "object" ? n[e.entry.entity_id] : void 0, a = typeof o?.cas == "string" ? Date.parse(o.cas) : NaN;
    return !o || typeof o.kdo != "string" || !(a <= e.time && e.time - a <= 3 * 6e4) ? "" : s.t.who[o.kdo] ?? o.kdo;
  }
  /** „Sušička - konec cyklu“ under „Sušička · Doběhla“ says the name twice: the reason without it („Konec cyklu“). */
  withoutName(t, e, s) {
    const n = e.entry.entity_id, o = [...s.running, ...s.laundry, ...s.leaks].find((l) => l.entity === n), a = o ? this.name(o.name) : this.logName(e.entry);
    if (!t.toLocaleLowerCase().startsWith(a.toLocaleLowerCase())) return t;
    const r = t.slice(a.length).replace(/^[\s\-–—·:]+/, "");
    return r ? r.charAt(0).toLocaleUpperCase() + r.slice(1) : t;
  }
  /** Where an entity is in the configuration (its section and its place in it), for the order of lists. */
  configIndex(t, e) {
    const s = [
      t.covers.entities,
      [t.ventilation.mode ?? "", ...t.ventilation.fans.map((n) => n.entity)],
      t.heating.rooms.map((n) => n.entity),
      t.cooling.rooms.map((n) => n.entity),
      ...t.devices.map((n) => n.entities.map((o) => o.entity))
    ];
    for (const n of s) {
      const o = n.indexOf(e);
      if (o >= 0) return o;
    }
    return 999;
  }
  /** The name the card uses for an entity (Větrací režim, the room of a blind or a fan), else Home Assistant's. */
  shortName(t, e) {
    const s = e.entity_id;
    if (s === t.ventilation.mode) return this.i18n.t.ventilationMode;
    if (t.covers.names[s] !== void 0) return this.name(t.covers.names[s]);
    const n = [...t.ventilation.fans, ...t.heating.rooms, ...t.cooling.rooms, ...t.running, ...t.laundry, ...t.leaks, ...t.devices.flatMap((o) => o.entities)].find(
      (o) => o.entity === s
    );
    return n ? this.name(n.name) : void 0;
  }
  logName(t) {
    if (this._config && t.entity_id === this._config.ventilation.mode) return this.i18n.t.ventilationMode;
    const e = C(this.hass, t.entity_id);
    return t.name || (typeof e?.attributes.friendly_name == "string" ? e.attributes.friendly_name : t.entity_id);
  }
  logState(t, e) {
    const s = e.startsWith("preset:") ? this._config?.covers.presets[Number(e.slice(7))] : void 0;
    if (s) return this.name(s.name);
    const n = this.hass, o = C(this.hass, t.entity_id);
    return o && n?.formatEntityState ? n.formatEntityState(o, e) : e;
  }
  /** A blind in the journal says its preset („Žaluzie · Tma“, uživatel 13. 11. 2026: „Q220 zatím A“), else its state. */
  logRows(t) {
    const e = (this._log ?? []).map((s) => {
      if (!t.covers.entities.includes(s.entity_id) || ["opening", "closing"].includes(String(s.state))) return s;
      const n = this.presetAt(t, s.entity_id, Ot(s));
      return n ? { ...s, state: `preset:${t.covers.presets.indexOf(n)}` } : s;
    });
    return On(e, this.logKind(t));
  }
  renderLogRow(t, e) {
    if (!this.logEntities(t).length) return f;
    const s = e.t, n = this.logRows(t).filter((l) => l.time > this._seen).length, o = /* @__PURE__ */ new Date();
    o.setHours(0, 0, 0, 0);
    const a = this._seen < o.getTime(), r = this._log === void 0 ? "" : n ? a ? s.logToday(n) : s.logNew(n, e.time(this._seen)) : s.logNothingNew;
    return c`<div class="group" data-part="log">
      <button class="row link-row" type="button" aria-haspopup="dialog" @click=${() => this.openLog()}>
        <span class="main">${s.log}${r ? c`<small>${r}</small>` : f}</span>
        <span class="chevron-mark" aria-hidden="true">›</span>
      </button>
      ${this.isAdmin ? c`<button class="row link-row" type="button" aria-haspopup="dialog" data-row="rules" @click=${() => this.openRules()}>
            <span class="main">${s.rules}</span>
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
    const e = Object.entries(t.states).filter(([n]) => n.startsWith("automation."));
    this._rules = void 0;
    let s = 0;
    try {
      const n = await Promise.all(
        e.map(async ([o, a]) => {
          const r = await t.callWS({ type: "automation/config", entity_id: o }).catch(() => {
            s += 1;
          }), l = r?.config?.alias ?? (typeof a.attributes.friendly_name == "string" ? a.attributes.friendly_name : o);
          return { id: o, name: l, description: (r?.config?.description ?? "").trim(), on: a.state === "on" };
        })
      );
      this._rules = e.length && s === e.length ? "failed" : n.sort((o, a) => o.name.localeCompare(a.name, this.i18n.language));
    } catch {
      this._rules = "failed";
    }
  }
  renderRules(t) {
    if (!this.isAdmin) return f;
    const e = t.t, s = this._detail === "rules", n = this._rules;
    return c`<dd-sheet .open=${s} .heading=${e.rules} .sub=${Array.isArray(n) ? e.rulesCount(n.length) : ""} .closeLabel=${e.close} @hdk-close=${() => this._detail = void 0}>
      ${s ? c`<div class="detail" data-part="rules-detail">
            ${n === "failed" ? c`<p class="log-empty">${e.rulesFailed}</p>` : n === void 0 ? c`<p class="log-empty">${e.rulesLoading}</p>` : n.map(
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
    this._detail = void 0, this._seen = Date.now(), jn(this._seen);
  }
  renderLog(t, e) {
    if (!this.logEntities(t).length) return f;
    const s = e.t, n = this._detail === "log", o = this.logRows(t), a = o.filter((u) => u.time > this._seen), r = o.filter((u) => u.time <= this._seen), l = {
      covers: s.covers,
      ventilation: s.ventilation,
      heating: s.heating,
      cooling: s.cooling,
      ...Object.fromEntries(t.devices.map((u, h) => [`devices-${h}`, this.name(u.name)]))
    }, d = (u) => u.map((h) => {
      const p = h.head, x = this.withoutName(this.coverReason(t, p, e), p, t), m = (y) => {
        const b = [...y].sort((w, T) => this.configIndex(t, w.entry.entity_id) - this.configIndex(t, T.entry.entity_id)), M = b.map((w) => this.shortName(t, w.entry));
        return (M.every((w) => w !== void 0) ? M : Ln(b.map((w) => this.logName(w.entry)))).join(", ");
      }, k = p.kind ? h.groups.find((y) => y.kind === p.kind && y.state === p.state) : void 0, _ = k ? `${l[p.kind] ?? ""} · ${this.logState(p.entry, p.state)}` : this.logTitle(t, p.entry, p.state, e), g = h.groups.map((y) => {
        if (y === k) return m([p, ...y.items]);
        const b = this.logState(y.items[0].entry, y.state);
        return y.kind ? `${l[y.kind] ?? ""} · ${b}: ${m(y.items)}` : `${this.logName(y.items[0].entry)} · ${b}`;
      });
      return c`<div class="log-row"><span class="log-time">${e.time(h.time)}</span><span class="main"
            >${_}${x ? c`<small>${x}</small>` : f}${g.map((y) => c`<span class="log-members">${y}</span>`)}</span
          ></div>`;
    });
    return c`<dd-sheet .open=${n} .heading=${s.log} .closeLabel=${s.close} @hdk-close=${() => this.closeLog()}>
      ${n ? c`<div class="detail" data-part="log-detail">
            ${this._log === void 0 ? c`<p class="log-empty">${s.logFailed}</p>` : o.length ? c`${a.length ? c`<h3>${s.logSince}</h3>${d(a)}` : f}${r.length ? c`<h3>${s.logEarlier}</h3>${d(r)}` : f}` : c`<p class="log-empty">${s.logEmpty}</p>`}
          </div>` : f}
    </dd-sheet>`;
  }
  /* ---------- Limitní ordery ---------- */
  instruments(t) {
    const e = t.orders ? C(this.hass, t.orders.entity)?.attributes.instrumenty : void 0;
    return Array.isArray(e) ? e.filter((s) => typeof s == "object" && s !== null && typeof s.symbol == "string") : [];
  }
  /** Euros: whole above a thousand (BTC 55 876 €), otherwise cents (692,52 €). */
  euro(t, e) {
    return e == null || !Number.isFinite(e) ? "—" : `${Math.abs(e) >= 1e3 ? t.whole(e) : t.two(e)} €`;
  }
  /** A signed difference in percent with one decimal place: "+2,8 %", "−1,3 %". */
  signed(t, e) {
    const s = e > 5e-5 ? "+" : e < -5e-5 ? "−" : "";
    return t.percent(`${s}${t.one(Math.abs(e * 100))}`);
  }
  /** The nearest BUY and SELL that lie at the broker now (`ted`), with their distance from the price (dashboard Finance, „Q39 ano“). */
  nearest(t, e) {
    const s = (l) => (e.ordery ?? []).filter((d) => d.side === l && d.ted != null && Number.isFinite(d.ted)).map((d) => d.ted), n = s("BUY"), o = s("SELL"), a = e.cena ?? void 0, r = (l, d) => d === void 0 ? `${l} ${t.t.ordersMissing}` : `${l} ${this.euro(t, d)}${a ? ` (${this.signed(t, d / a - 1)})` : ""}`;
    return G([r("BUY", n.length ? Math.max(...n) : void 0), r("SELL", o.length ? Math.min(...o) : void 0)]);
  }
  /** Updates all orders that differ (one button of Home Assistant); in the dry run a plain button, it changes nothing. */
  updateButton(t, e, s, n) {
    const o = t.orders?.update;
    return o ? c`<button class="button ${n ? "" : "primary"} orders-update ${s ? "pending" : ""}" type="button" aria-busy=${s ? "true" : f}
      @click=${() => this.call("input_button", "press", { entity_id: o })}>${n ? e.t.ordersUpdateDry : e.t.ordersUpdate}</button>` : f;
  }
  renderOrders(t, e) {
    if (!t.orders) return f;
    const s = e.t, n = C(this.hass, t.orders.entity), o = n?.state, a = n?.attributes ?? {}, r = a.dry_run === !0, l = o === "probiha", d = this.instruments(t), u = d.filter((S) => S.upravit).length, h = t.orders.check, p = typeof a.cas == "string" ? a.cas : "", x = this.day(new Date(this._now)), m = (S) => S.slice(11) || S, k = (S) => !S || S.startsWith(x) ? m(S) : `${e.day(Date.parse(S.replace(" ", "T")))} ${m(S)}`, _ = typeof a.cas_kontroly == "string" ? a.cas_kontroly : "00:00", g = new Date(this._now).toTimeString().slice(0, 5), y = p !== "" && !p.startsWith(x) && g >= _, b = k(p), M = (S) => Array.isArray(S) ? S.filter((X) => typeof X == "string" && X !== "") : [], w = M(a.chyby), T = M(a.provedeno).length > 0, $ = (S) => S.map((X) => c`<small class="alert" data-done>${X}</small>`), E = typeof a.posledni_ok == "string" && a.posledni_ok !== "" ? k(a.posledni_ok) : "";
    let z;
    return l ? z = c`<span class="main"><small>${s.ordersChecking}</small></span>` : o === "chyba" ? z = c`<span class="mark alert" aria-hidden="true">!</span><span class="main">${s.ordersFailed}<small class="alert">${G([String(a.chyba ?? ""), E ? s.ordersPricesFrom(E) : ""].filter(Boolean))}</small></span>` : typeof a.cas != "string" ? z = c`<span class="main"><small>${s.ordersNoData}</small></span>` : T && w.length ? z = c`<span class="main"><small class="alert">${s.ordersApplyFailed(b)}</small>${$(w)}</span>` : T && r ? z = c`<span class="main"><small>${s.ordersTried(b)}</small></span>` : T ? z = c`<span class="main"><small class=${u ? "warn" : ""}>${G([s.ordersApplied(b), u ? s.ordersStillDiffer(u) : ""].filter(Boolean))}</small></span>` : z = c`<span class="main"><small class=${y ? "warn" : ""}>${G([s.ordersChecked(b), r ? s.ordersDryRun : ""].filter(Boolean))}</small></span>`, c`<h2><span>${s.orders}</span></h2>
      <div class="group" data-part="orders">
        ${d.map(
      (S) => c`<button class="row link-row" type="button" aria-haspopup="dialog" data-instrument=${S.symbol} @click=${() => this._detail = `order:${S.symbol}`}>
            ${S.upravit ? c`<span class="mark warn" aria-hidden="true">!</span>` : c`<span class="mark" aria-hidden="true">${bt}</span>`}
            <span class="main">${S.symbol} · ${this.euro(e, S.cena)}<small class=${S.upravit ? "warn" : ""}>${this.nearest(e, S)}</small></span>
            <span class="chevron-mark" aria-hidden="true">›</span>
          </button>`
    )}
        <div class="row" data-row="orders-status">
          ${z}
          ${h ? c`<button class="button icon ${l ? "pending" : ""}" type="button" title=${s.ordersCheck} aria-label=${s.ordersCheck} aria-busy=${l ? "true" : f} @click=${() => this.call("input_button", "press", { entity_id: h })}>${Fe}</button>` : f}
        </div>
      </div>
      ${u && o !== "chyba" ? this.updateButton(t, e, l, r) : f}`;
  }
  renderOrdersDetail(t, e) {
    if (!t.orders) return f;
    const s = e.t, n = this._detail?.startsWith("order:") ? this._detail.slice(6) : void 0, o = n ? this.instruments(t).find((d) => d.symbol === n) : void 0, a = C(this.hass, t.orders.entity)?.attributes ?? {}, r = (d, u) => d === void 0 ? "" : `${d.toLocaleString(e.locale, { maximumFractionDigits: u === "BTC" ? 8 : 0 })} ${u ?? ""}`, l = (d, u, h = !1) => c`<div class="health-row"><span class="main">${d}</span><span class="value ${h ? "warn" : ""}">${u}</span></div>`;
    return c`<dd-sheet .open=${o !== void 0} .heading=${n ?? ""} .closeLabel=${s.close} @hdk-close=${() => this._detail = void 0}>
      ${o ? c`<div class="detail" data-part="order-detail">
            ${l(s.ordersPosition, r(o.pozice ?? void 0, o.jednotka))}
            ${o.hodnota != null ? l(s.ordersValue, G([this.euro(e, o.hodnota), o.odchylka != null ? s.ordersTarget(this.signed(e, o.odchylka)) : void 0].filter((d) => !!d))) : f}
            <div class="health-row orders-head"><span class="main">${s.orders}</span><span class="value">${s.ordersNow} → ${s.ordersNew}</span></div>
            ${[...o.ordery ?? []].sort((d, u) => d.side === u.side ? (u.nove ?? u.ted ?? 0) - (d.nove ?? d.ted ?? 0) : d.side === "SELL" ? -1 : 1).map((d) => {
      const u = d.ted != null && d.nove != null && Math.abs(d.ted - d.nove) < 1e-9, h = d.ted == null ? s.ordersMissing : this.euro(e, d.ted), p = d.nove == null ? s.ordersCancel : this.euro(e, d.nove);
      return l(c`${d.side}<small>${r(d.mnozstvi, o.jednotka)}</small>`, u ? `${h} · ${s.ordersSame}` : `${h} → ${p}`, !u);
    })}
            ${o.upravit ? c`<div class="detail-actions">${this.updateButton(t, e, C(this.hass, t.orders.entity)?.state === "probiha", a.dry_run === !0)}</div>` : f}
          </div>` : f}
    </dd-sheet>`;
  }
  /* ---------- Potřebuje tebe ---------- */
  failed(t) {
    const e = C(this.hass, t.failedActions)?.attributes.polozky;
    return Array.isArray(e) ? e.filter((s) => typeof s == "object" && s !== null && typeof s.entita == "string") : [];
  }
  /** The tasks of the `tasks` sensors: the urgent ones („alert“, „warn“) first, otherwise in the order of the sensor. */
  tasks(t) {
    const e = (s) => s.uroven === "alert" ? 0 : s.uroven === "warn" ? 1 : 2;
    return t.tasks.flatMap((s) => {
      const n = C(this.hass, s)?.attributes.ukoly;
      return Array.isArray(n) ? n : [];
    }).filter((s) => typeof s == "object" && s !== null && typeof s.klic == "string" && typeof s.nazev == "string").map((s, n) => ({ task: s, index: n })).sort((s, n) => e(s.task) - e(n.task) || s.index - n.index).map(({ task: s }) => s);
  }
  renderQueue(t, e) {
    if (!t.failedActions && !t.batteries.length && !t.filters.length && !t.laundry.length && !t.maintenance.length && !t.leaks.length && !t.tasks.length) return f;
    const s = e.t, n = this.failed(t), o = this.snoozed(t), a = t.batteries.filter((m) => L(this.hass, m.low) === "on" && !o.has(`battery:${m.low}`)), r = this.dirtyFilters(t).filter(({ filter: m }) => !o.has(`filter:${m.hours}`)), l = t.laundry.filter((m) => L(this.hass, m.entity) === "on"), d = t.maintenance.flatMap((m) => {
      const k = gt(this.hass, m.counter);
      return k !== void 0 && k >= m.every && !o.has(`maintenance:${m.counter}`) ? [{ item: m, cycles: k }] : [];
    }), u = t.leaks.filter((m) => L(this.hass, m.entity) === "on"), h = this.tasks(t), p = u.length + n.length + h.length + a.length + r.length + l.length + d.length, x = [
      ...u.map((m) => {
        const k = this.starts.of(this.hass, m.entity), _ = k !== void 0 && new Date(k).toDateString() === new Date(this._now).toDateString(), g = k === void 0 ? "" : _ ? e.time(k) : `${e.day(k)} ${e.time(k)}`;
        return c`<div class="row" data-row="leak" role="alert">
          <span class="mark alert" aria-hidden="true">${Hn}</span>
          <span class="main">${this.name(m.name)}<small class="alert">${yt(s.leak(g))}</small></span>
        </div>`;
      }),
      ...n.map((m) => {
        const k = t.covers.names[m.entita], _ = C(this.hass, m.entita)?.attributes.friendly_name, g = typeof _ == "string" ? _ : k !== void 0 ? this.name(k) : void 0, y = m.cas ? Date.parse(m.cas) : NaN, b = this.failedGoal(t, m), M = b ? s.notArrivedTo(this.name(b.name)) : m.duvod || m.akce, w = G([M ? M.charAt(0).toLocaleUpperCase(e.language) + M.slice(1) : void 0, Number.isFinite(y) ? e.time(y) : void 0].filter(Boolean)), T = this.retryOf(t, m), $ = typeof g == "string" ? g : m.entita, E = t.clearFailed ? this.iconButton(bt, s.done, $, () => this.call("script", t.clearFailed.split(".")[1], { entita: m.entita })) : f;
        return c`<div class="row" data-row="failed">
          <span class="mark warn" aria-hidden="true">!</span>
          <span class="main">${$}<small>${w}</small></span>
          ${T ? c`<span class="actions">
                <button class="button icon ${this.pending.has(`retry:${m.entita}`) ? "pending" : ""}" type="button" title=${s.retry} aria-label=${`${s.retry}: ${$}`} aria-busy=${this.pending.has(`retry:${m.entita}`) ? "true" : f} @click=${T}>${Fe}</button>
                ${E}
              </span>` : E}
        </div>`;
      }),
      ...h.map((m) => {
        const k = m.uroven === "alert" ? c`<span class="mark alert" aria-hidden="true">!</span>` : m.uroven === "warn" ? c`<span class="mark warn" aria-hidden="true">!</span>` : c`<span class="mark" aria-hidden="true">${Vn}</span>`, [_, g] = (m.akce?.sluzba ?? "").split(".");
        return c`<div class="row" data-row="task" data-key=${m.klic}>
          ${k}
          <span class="main">${m.nazev}${m.detail ? c`<small class=${m.uroven === "alert" ? "alert" : ""}>${m.detail}</small>` : f}</span>
          ${_ && g ? this.iconButton(bt, e.t.done, m.nazev, () => this.call(_, g, m.akce?.data ?? {})) : f}
        </div>`;
      }),
      ...a.map((m) => {
        const k = gt(this.hass, m.level), _ = L(this.hass, m.type), g = G([s.battery(k === void 0 ? void 0 : e.percent(Math.round(k))), _].filter(Boolean));
        return c`<div class="row" data-row="battery">
          <span class="mark">${Un}</span>
          <span class="main">${this.name(m.name)}<small>${g}</small></span>
          ${this.snoozeButton(t, `battery:${m.low}`, e, this.name(m.name))}
        </div>`;
      }),
      ...r.map(({ filter: m, hours: k, threshold: _ }) => {
        const g = (y) => `${e.whole(Math.floor(y))} h`;
        return c`<div class="row" data-row="filter">
          <span class="mark">${Rn}</span>
          <span class="main">${this.name(m.name)}<small>${yt(s.filter(g(k), g(_)))}</small></span>
          <span class="actions">
            ${this.snoozeButton(t, `filter:${m.hours}`, e, this.name(m.name))}
            ${this.iconButton(bt, s.done, this.name(m.name), () => this.call("input_number", "set_value", { entity_id: m.hours, value: 0 }))}
          </span>
        </div>`;
      }),
      ...d.map(({ item: m, cycles: k }) => c`<div class="row" data-row="maintenance">
        <span class="mark">${Wn}</span>
        <span class="main">${this.name(m.name)}<small>${G([this.name(m.task), s.cycles(k, m.every)])}</small></span>
        <span class="actions">
          ${this.snoozeButton(t, `maintenance:${m.counter}`, e, this.name(m.name))}
          ${this.iconButton(bt, s.done, this.name(m.name), () => this.call("counter", "reset", { entity_id: m.counter }))}
        </span>
      </div>`),
      ...l.map((m) => {
        const k = this.starts.of(this.hass, m.entity), _ = k !== void 0 && new Date(k).toDateString() === new Date(this._now).toDateString(), g = k === void 0 ? "" : _ ? e.time(k) : e.day(k);
        return c`<div class="row" data-row="laundry">
          <span class="mark">${In}</span>
          <span class="main">${this.name(m.name)}<small>${yt(s.laundry(g))}</small></span>
          ${this.iconButton(bt, s.done, this.name(m.name), () => this.call("input_boolean", "turn_off", { entity_id: m.entity }))}
        </div>`;
      })
    ];
    return c`<h2><span>${p ? `${s.needsYou} · ${p}` : s.needsYou}</span></h2>
      <div class="group" data-part="queue">
        ${x.length ? x : c`<div class="row"><span class="main">${s.nothingWaits}</span></div>`}
      </div>`;
  }
  /** Air conditioners that ran at least their threshold since the filter was cleaned; a missing value is no task. */
  dirtyFilters(t) {
    return t.filters.flatMap((e) => {
      const s = gt(this.hass, e.hours), n = gt(this.hass, e.threshold);
      return s !== void 0 && n !== void 0 && n > 0 && s >= n ? [{ filter: e, hours: s, threshold: n }] : [];
    });
  }
  /* ---------- Odložit ---------- */
  day(t) {
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }
  /** The keys of the items postponed to a later day than today. */
  snoozed(t) {
    const e = C(this.hass, t.snoozed)?.attributes.polozky, s = this.day(new Date(this._now)), n = /* @__PURE__ */ new Set();
    if (Array.isArray(e))
      for (const o of e)
        typeof o?.klic == "string" && typeof o.do == "string" && o.do > s && n.add(o.klic);
    return n;
  }
  /** "Odložit" with its menu (a day, to the weekend, a week, a month; without a time, it is no alarm). The menu only covers what is under it. */
  /**
   * A 44 px round button with an icon (uživatel 14. 11. 2026: „Hotovo i odložit udělej taky jako ikony. Vymysli jasne a
   * profi ikony“): its word is the tooltip and, with the name of the item, what a screen reader says.
   */
  iconButton(t, e, s, n, o = "") {
    return c`<button class="button icon ${o}" type="button" title=${e} aria-label=${`${e}: ${s}`} @click=${n}>${t}</button>`;
  }
  snoozeButton(t, e, s, n) {
    if (!t.snoozed || !t.snoozeScript) return f;
    const o = s.t, a = new Date(this._now), r = (x) => new Date(a.getFullYear(), a.getMonth(), a.getDate() + x), l = (6 - a.getDay() + 7) % 7 || 7, d = new Date(a.getFullYear(), a.getMonth() + 1, a.getDate()), u = [[o.snoozeFor.day, r(1)], [o.snoozeFor.weekend, r(l)], [o.snoozeFor.week, r(7)], [o.snoozeFor.month, d]], h = this._menu === e, p = (x) => {
      this._menu = void 0, this.call("script", t.snoozeScript.split(".")[1], { klic: e, do: this.day(x) });
    };
    return c`<span class="snooze">
      <button class="button icon" type="button" title=${o.snooze} aria-label=${`${o.snooze}: ${n}`} aria-haspopup="menu" aria-expanded=${h ? "true" : "false"} @click=${() => this._menu = h ? void 0 : e}>${Bn}</button>
      ${h ? c`<div class="menu" role="menu">
            ${u.map(([x, m]) => c`<button type="button" role="menuitem" @click=${() => p(m)}><span>${x}</span><span class="until">${s.day(m.getTime())}</span></button>`)}
          </div>` : f}
    </span>`;
  }
  /** The preset a blind did not arrive at (its target matches one), when it moved but stopped elsewhere. */
  failedGoal(t, e) {
    const s = e.cil;
    if (!(!e.entita.startsWith("cover.") || !/^(nedojela|nepohnula)/i.test(e.duvod ?? "")))
      return t.covers.presets.find((n) => Math.abs(Number(s?.pos) - n.position) <= t.covers.tolerance && Math.abs(Number(s?.tilt) - n.tilt) <= t.covers.tolerance);
  }
  /** A failed command of a blind can be sent again when the sensor kept its target. */
  retryOf(t, e) {
    const s = e.cil;
    if (!e.entita.startsWith("cover.") || !s || s.pos === void 0 || s.tilt === void 0) return;
    const n = Number(s.pos), o = Number(s.tilt);
    if (!Number.isFinite(n) || !Number.isFinite(o)) return;
    const a = { name: "", position: n, tilt: o };
    return () => this.send(
      `retry:${e.entita}`,
      { entities: [e.entita], done: () => this.coverDone(t, e.entita, a) },
      "script",
      t.covers.script.split(".")[1],
      { entity: e.entita, pos: n, tilt: o }
    );
  }
  /* ---------- Teď běží ---------- */
  duration(t) {
    const e = this.starts.of(this.hass, t);
    return e === void 0 ? "" : De((this._now - e) / 6e4);
  }
  renderRunning(t, e) {
    if (!t.running.length) return f;
    const s = new Set(t.devices.flatMap((a) => a.entities.map((r) => r.entity))), n = t.running.filter((a) => !s.has(a.entity) && ["on", "cleaning", "returning"].includes(L(this.hass, a.entity) ?? "")), o = n.map((a) => `${this.name(a.name)} ${this.duration(a.entity)}`.trim());
    return c`<h2><span>${e.t.running}</span></h2>
      <div class="group" data-part="running"><div class="row now ${n.length ? "" : "none"}"><span class="main" style="font-size:inherit;line-height:inherit">${o.length ? G(o) : e.t.nothingRuns}</span></div></div>`;
  }
  /* ---------- Žaluzie ---------- */
  /** Whether one blind is in the preset: undefined when it does not report its position. */
  coverIn(t, e, s) {
    const n = C(this.hass, e);
    if (!n || nt(n.state)) return;
    const o = Number(n.attributes.current_position), a = Number(n.attributes.current_tilt_position);
    if (!(!Number.isFinite(o) || !Number.isFinite(a)))
      return Math.abs(o - s.position) <= t.covers.tolerance && Math.abs(a - s.tilt) <= t.covers.tolerance;
  }
  /** How many blinds are in the preset, and how many report their position at all. */
  inPreset(t, e) {
    let s = 0, n = 0;
    for (const o of t.covers.entities) {
      const a = this.coverIn(t, o, e);
      a !== void 0 && (n += 1, a && (s += 1));
    }
    return { count: s, known: n };
  }
  renderCovers(t, e) {
    if (!t.covers.entities.length) return f;
    const s = t.covers.presets.length - 1;
    return c`<h2>
        <span>${e.t.covers}</span>
        <button class="chevron" type="button" data-open="covers" aria-haspopup="dialog" aria-label=${e.t.coversDetail} @click=${() => this._detail = "covers"}>
          <span aria-hidden="true">›</span>
        </button>
      </h2>
      <div class="tiles" data-part="covers">
        ${t.covers.presets.map((n, o) => {
      const { count: a, known: r } = this.inPreset(t, n), l = r === t.covers.entities.length && a === r, d = l ? "on" : a > 0 ? "mixed" : "idle";
      return c`<dd-tile
            kind="action"
            centered
            guarded
            .name=${this.name(n.name)}
            .state=${d}
            .count=${a > 0 && !l ? a : void 0}
            .hint=${e.t.hint}
            .hintAlign=${o === 0 ? "start" : o === s ? "end" : "center"}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            .pending=${this.pending.has(`covers:${o}`)}
            @hdk-press=${() => this.setCovers(t, n, `covers:${o}`)}
          ></dd-tile>`;
    })}
      </div>`;
  }
  /** When something happened: the time today, else the day. */
  when(t, e) {
    return new Date(t).toDateString() === new Date(this._now).toDateString() ? e.time(t) : e.day(t);
  }
  /** The last action of one blind: a failed command first (warning), else who moved it and when. */
  coverAction(t, e, s) {
    const n = s.t, o = this.failed(t).find((d) => d.entita === e);
    if (o) {
      const d = o.cas ? Date.parse(o.cas) : NaN, u = this.failedGoal(t, o);
      return u ? { text: [n.notArrivedTo(this.name(u.name)), Number.isFinite(d) ? this.when(d, s) : ""].filter(Boolean).join(" "), warn: !0 } : { text: [Number.isFinite(d) ? n.notArrived(this.when(d, s)) : n.notArrived("").trim(), o.duvod].filter(Boolean).join(" · "), warn: !0 };
    }
    const a = C(this.hass, t.covers.lastAction)?.attributes.polozky, r = a && typeof a == "object" ? a[e] : void 0;
    if (!r || typeof r.kdo != "string") return;
    const l = typeof r.cas == "string" ? Date.parse(r.cas) : NaN;
    return { text: [n.who[r.kdo] ?? r.kdo, Number.isFinite(l) ? this.when(l, s) : ""].filter(Boolean).join(" "), warn: !1 };
  }
  /** Detail of the blinds: every room with its last action and the three presets just for it (one tap: the sheet was opened on purpose). */
  renderCoversDetail(t, e) {
    if (!t.covers.entities.length) return f;
    const s = e.t, n = this._detail === "covers";
    return c`<dd-sheet .open=${n} .heading=${s.covers} .closeLabel=${s.close} @hdk-close=${() => this._detail = void 0}>
      ${n ? c`<div class="detail" data-part="covers-detail">
            ${t.covers.entities.map((o) => {
      const a = C(this.hass, o), r = t.covers.names[o], l = a?.attributes.friendly_name, d = r !== void 0 ? this.name(r) : typeof l == "string" ? l : o, u = this.coverAction(t, o, e);
      return c`<div class="cover-row" data-cover=${o}>
                <span class="main">${d}${u ? c`<small class=${u.warn ? "warn" : ""}>${yt(u.text)}</small>` : f}</span>
                <span class="presets">
                  ${t.covers.presets.map(
        (h, p) => c`<dd-tile
                      kind="action"
                      centered
                      .name=${this.name(h.name)}
                      .label=${`${d}: ${this.name(h.name)}`}
                      .state=${this.coverIn(t, o, h) ? "on" : "idle"}
                      .pending=${this.pending.has(`cover:${o}:${p}`)}
                      @hdk-press=${() => this.send(`cover:${o}:${p}`, { entities: [o], done: () => this.coverDone(t, o, h) }, "script", t.covers.script.split(".")[1], {
          entity: o,
          pos: h.position,
          tilt: h.tilt
        })}
                    ></dd-tile>`
      )}
                </span>
              </div>`;
    })}
          </div>` : f}
    </dd-sheet>`;
  }
  setCovers(t, e, s) {
    const n = t.covers.script.split(".")[1];
    if (!this.pending.has(s)) {
      this.pending.start(s, this.hass, { entities: t.covers.entities, done: () => t.covers.entities.every((o) => this.coverDone(t, o, e)) });
      for (const o of t.covers.entities)
        this.call("script", n, { entity: o, pos: e.position, tilt: e.tilt }, s);
    }
  }
  /* ---------- Větrání ---------- */
  align(t) {
    return t % 3 === 0 ? "start" : t % 3 === 2 ? "end" : "center";
  }
  renderVentilation(t, e) {
    const s = e.t, n = [...t.ventilation.mode ? [{ name: s.ventilationMode, entity: t.ventilation.mode }] : [], ...t.ventilation.fans];
    return n.length ? c`<h2><span>${s.ventilation}</span></h2>
      <div class="tiles" data-part="ventilation">
        ${n.map((o, a) => {
      const r = C(this.hass, o.entity), l = !r || nt(r.state), d = r?.state === "on";
      return c`<dd-tile
            kind="toggle"
            guarded
            data-entity=${o.entity}
            .name=${this.name(o.name)}
            .text=${l ? s.unavailable : d ? s.runs(this.duration(o.entity)).trim() : s.off}
            .state=${d ? "on" : "off"}
            .disabled=${l}
            .hint=${s.hint}
            .hintAlign=${this.align(a)}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            .pending=${this.pending.has(`toggle:${o.entity}`)}
            @hdk-toggle=${(u) => {
        const h = u.detail.checked ? "on" : "off";
        this.send(`toggle:${o.entity}`, { entities: [o.entity], done: () => L(this.hass, o.entity) === h }, "homeassistant", u.detail.checked ? "turn_on" : "turn_off", {
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
    const s = e.t;
    return t.devices.filter((n) => n.entities.length).map(
      (n, o) => c`<h2><span>${this.name(n.name)}</span></h2>
          <div class="tiles" data-part=${`devices-${o}`}>
            ${n.entities.map((a, r) => {
        const l = C(this.hass, a.entity), d = !l || nt(l.state);
        if (a.entity.startsWith("vacuum.") || this.lightOptions(a, l) !== void 0) {
          const h = a.entity.startsWith("vacuum."), p = h ? l?.state === "cleaning" : l?.state === "on", x = d ? s.unavailable : h ? this.vacuumText(a, l, e) : this.lightText(l, e);
          return c`<dd-tile
                  kind="open"
                  data-entity=${a.entity}
                  .name=${this.name(a.name)}
                  .text=${x}
                  .label=${`${this.name(a.name)}. ${x}`}
                  .state=${p ? "on" : d ? "off" : h ? "idle" : "off"}
                  @hdk-open=${() => this._detail = `device:${a.entity}`}
                ></dd-tile>`;
        }
        const u = l?.state === "on";
        return c`<dd-tile
                kind="toggle"
                guarded
                data-entity=${a.entity}
                .name=${this.name(a.name)}
                .text=${d ? s.unavailable : u ? s.on : s.off}
                .state=${u ? "on" : "off"}
                .disabled=${d}
                .hint=${s.hint}
                .hintAlign=${this.align(r)}
                .holdMs=${t.guard.holdMs}
                .doubleTapMs=${t.guard.doubleTapMs}
                .hintSeconds=${t.guard.hintSeconds}
                .pending=${this.pending.has(`toggle:${a.entity}`)}
                @hdk-toggle=${(h) => {
          const p = h.detail.checked ? "on" : "off";
          this.send(`toggle:${a.entity}`, { entities: [a.entity], done: () => L(this.hass, a.entity) === p }, "homeassistant", h.detail.checked ? "turn_on" : "turn_off", {
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
    const s = e?.attributes.supported_color_modes, n = Array.isArray(s) ? s.map(String) : [], o = n.some((l) => ["hs", "rgb", "rgbw", "rgbww", "xy"].includes(l)), a = n.includes("color_temp"), r = o || a || n.includes("brightness") || n.includes("white");
    if (!(!r && !t.startupBrightness))
      return { brightness: r, hue: o, temperature: a };
  }
  /** Brightness of a light in % (Home Assistant keeps 0–255). */
  lightPercent(t) {
    const e = Number(t?.attributes.brightness);
    return t?.state === "on" && Number.isFinite(e) ? Math.max(1, Math.round(e / 255 * 100)) : void 0;
  }
  lightText(t, e) {
    const s = this.lightPercent(t);
    return t.state !== "on" ? e.t.off : s === void 0 ? e.t.on : `${e.t.on} · ${e.percent(s)}`;
  }
  /** The vacuum in words as Home Assistant says it, with the time it cleans; the battery when it is not full and not cleaning. */
  vacuumText(t, e, s) {
    const n = this.hass, o = n?.formatEntityState ? n.formatEntityState(e) : e.state;
    return e.state === "cleaning" ? [o, this.duration(t.entity)].filter(Boolean).join(" · ") : o;
  }
  findDevice(t, e) {
    for (const s of t.devices) for (const n of s.entities) if (n.entity === e) return n;
  }
  /** The popup of a light or a vacuum (one tap everywhere in it: the popup was opened on purpose, „Q188“). */
  renderDeviceDetail(t, e) {
    const s = this._detail?.startsWith("device:") ? this._detail.slice(7) : void 0, n = s ? this.findDevice(t, s) : void 0, o = n ? C(this.hass, n.entity) : void 0, a = !o || nt(o.state), r = n ? a ? e.t.unavailable : n.entity.startsWith("vacuum.") ? this.vacuumText(n, o, e) : this.lightText(o, e) : "";
    return c`<dd-sheet .open=${n !== void 0} .heading=${n ? this.name(n.name) : ""} .sub=${r} .closeLabel=${e.t.close} @hdk-close=${() => this._detail = void 0}>
      ${n ? c`<div class="detail device-detail" data-part="device-detail" data-entity=${n.entity}>
            ${n.entity.startsWith("vacuum.") ? this.renderVacuum(n, o, a, e) : this.renderLight(n, o, a, e)}
          </div>` : f}
    </dd-sheet>`;
  }
  /** One setting of a popup: its name and value above, the slider of the kit under it. */
  setting(t, e, s, n, o = !1) {
    return c`<div class="setting ${o ? "apart" : ""}">
      <div class="setting-head"><span>${t}</span><span class="setting-value">${e}</span></div>
      ${s}
      ${n ? c`<small>${n}</small>` : f}
    </div>`;
  }
  /**
   * The light (uživatel 21. 11. 2026: „u lampy bedside nastavovat barvu a jas. Při spuštění potřebuji nastavit konkrétní
   * jas“): on and off, brightness, colour (a rainbow bar), colour temperature (warm to cold) and the brightness after
   * switching on, which an automation of Home Assistant applies (`startup_brightness`, 0 = unchanged).
   */
  renderLight(t, e, s, n) {
    const o = n.t, a = this.lightOptions(t, e) ?? { brightness: !1, hue: !1, temperature: !1 }, r = e?.state === "on", l = this.lightPercent(e), d = e?.attributes.hs_color, u = Array.isArray(d) && Number.isFinite(Number(d[0])) ? Math.round(Number(d[0])) : void 0, h = e?.attributes.color_temp_kelvin, p = typeof h == "number" && h > 0 ? h : NaN, x = Number(e?.attributes.min_color_temp_kelvin) || 2700, m = Number(e?.attributes.max_color_temp_kelvin) || 6500, k = String(e?.attributes.color_mode ?? ""), _ = ($) => `${n.whole($)} K`, g = ($) => this.call("light", "turn_on", { entity_id: t.entity, ...$ }), y = t.startupBrightness ? gt(this.hass, t.startupBrightness) : void 0, b = ["hs", "rgb", "rgbw", "rgbww", "xy"], M = a.hue && (b.includes(k) || !a.temperature) ? "colour" : "white", w = a.hue && a.temperature, T = `light-mode:${t.entity}`;
    return c`<div class="setting-row">
        <span>${o.device.light}</span>
        <dd-switch
          .checked=${r}
          .disabled=${s}
          .label=${`${this.name(t.name)}: ${o.device.light}`}
          .pending=${this.pending.has(`toggle:${t.entity}`)}
          @hdk-toggle=${($) => {
      const E = $.detail.checked ? "on" : "off", z = $.detail.checked && y !== void 0 && y > 0 ? { brightness_pct: Math.round(y) } : {};
      this.send(`toggle:${t.entity}`, { entities: [t.entity], done: () => L(this.hass, t.entity) === E }, "light", $.detail.checked ? "turn_on" : "turn_off", { entity_id: t.entity, ...z });
    }}
        ></dd-switch>
      </div>
      ${a.brightness ? this.setting(
      o.device.brightness,
      l === void 0 ? o.off : n.percent(l),
      c`<dd-slider
              min="5"
              max="100"
              step="5"
              .value=${l ?? 5}
              .disabled=${s}
              .label=${o.device.brightness}
              .valueText=${l === void 0 ? o.off : n.percent(l)}
              .minLabel=${n.percent(5)}
              .maxLabel=${n.percent(100)}
              @hdk-change=${($) => g({ brightness_pct: $.detail.value })}
            ></dd-slider>`
    ) : f}
      ${w ? c`<dd-segmented
            .label=${o.device.lightMode}
            .value=${M}
            .disabled=${s}
            .pending=${this.pending.has(T)}
            .options=${[
      { value: "white", label: o.device.white },
      { value: "colour", label: o.device.coloured }
    ]}
            @hdk-select=${($) => {
      const E = $.detail.value === "colour", z = () => {
        const X = String(C(this.hass, t.entity)?.attributes.color_mode ?? "");
        return E ? b.includes(X) : X === "color_temp";
      }, S = E ? { hs_color: [u ?? 30, 100] } : { color_temp_kelvin: Number.isFinite(p) ? p : x };
      this.send(T, { entities: [t.entity], done: z }, "light", "turn_on", { entity_id: t.entity, ...S });
    }}
          ></dd-segmented>` : f}
      ${a.hue && M === "colour" ? this.setting(
      o.device.colour,
      // The colour as a dot of that colour, not a number of degrees (a number would mean nothing here).
      u === void 0 || !r ? "" : c`<span class="swatch" style=${`background: hsl(${u} 100% 50%)`}></span>`,
      c`<dd-slider
              min="0"
              max="360"
              step="5"
              .value=${u ?? 0}
              .disabled=${s}
              .label=${o.device.colour}
              .valueText=${u === void 0 ? "" : `${u}°`}
              .track=${"linear-gradient(to right, hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(360 100% 50%))"}
              @hdk-change=${($) => g({ hs_color: [$.detail.value, 100] })}
            ></dd-slider>`
    ) : f}
      ${a.temperature && M === "white" ? this.setting(
      o.device.temperature,
      Number.isFinite(p) && r ? _(p) : "",
      c`<dd-slider
              min=${x}
              max=${m}
              step="100"
              .value=${Number.isFinite(p) ? p : x}
              .disabled=${s}
              .label=${o.device.temperature}
              .valueText=${Number.isFinite(p) ? _(p) : ""}
              .minLabel=${""}
              .maxLabel=${""}
              .track=${"linear-gradient(to right, #ff9f3a, #ffd9a8, #ffffff, #cddcff)"}
              @hdk-change=${($) => g({ color_temp_kelvin: $.detail.value })}
            ></dd-slider>`
    ) : f}
      ${t.startupBrightness ? this.setting(
      o.device.startup,
      y === void 0 ? o.unavailable : y > 0 ? n.percent(Math.round(y)) : o.device.unchanged,
      c`<dd-slider
              min="0"
              max="100"
              step="5"
              .value=${y ?? 0}
              .disabled=${y === void 0}
              .label=${o.device.startup}
              .valueText=${y === void 0 ? o.unavailable : y > 0 ? n.percent(Math.round(y)) : o.device.unchanged}
              .minLabel=${o.device.unchanged}
              .maxLabel=${n.percent(100)}
              @hdk-change=${($) => this.call("input_number", "set_value", { entity_id: t.startupBrightness, value: $.detail.value })}
            ></dd-slider>`,
      o.device.startupNote,
      !0
    ) : f}`;
  }
  /**
   * The vacuum (uživatel 21. 11. 2026: „u vysavačů potřebuji kartu vysavačů s mapou, baterii atd.“): its map (`map`, a camera
   * or an image entity), the state, the battery, the last cleaning, suction and the actions start or pause and dock.
   */
  renderVacuum(t, e, s, n) {
    const o = n.t, a = e?.attributes ?? {}, r = e?.state === "cleaning", l = t.map ? C(this.hass, t.map) : void 0, d = l && !nt(l.state) && typeof l.attributes.entity_picture == "string" ? l.attributes.entity_picture : void 0, u = Number(a.battery_level), h = Number(a.clean_area), p = Number(a.clean_time), x = Array.isArray(a.fan_speed_list) ? a.fan_speed_list.map(String) : [], m = typeof a.fan_speed == "string" ? a.fan_speed : "", k = [];
    k.push([o.device.battery, Number.isFinite(u) ? n.percent(Math.round(u)) : "––"]), !r && Number.isFinite(h) && Number.isFinite(p) && (h > 0 || p > 0) && k.push([o.device.lastClean, `${n.whole(h)} m² · ${De(Math.round(p))}`]);
    const _ = `vacuum:${t.entity}`, g = `vacuum-home:${t.entity}`;
    return c`${t.map ? d ? c`<img class="vacuum-map" src=${d} alt=${o.device.map} />` : c`<p class="vacuum-map empty">${o.device.noMap}</p>` : f}
      <div class="vacuum-actions">
        <dd-tile
          kind="action"
          centered
          .name=${r ? o.device.pause : o.device.clean}
          .disabled=${s}
          .pending=${this.pending.has(_)}
          @hdk-press=${() => r ? this.send(_, { entities: [t.entity], done: () => L(this.hass, t.entity) !== "cleaning" }, "vacuum", "pause", { entity_id: t.entity }) : this.send(_, { entities: [t.entity], done: () => L(this.hass, t.entity) === "cleaning" }, "vacuum", "start", { entity_id: t.entity })}
        ></dd-tile>
        <dd-tile
          kind="action"
          centered
          .name=${o.device.dock}
          .disabled=${s || e?.state === "docked"}
          .pending=${this.pending.has(g)}
          @hdk-press=${() => this.send(g, { entities: [t.entity], done: () => ["returning", "docked"].includes(L(this.hass, t.entity) ?? "") }, "vacuum", "return_to_base", { entity_id: t.entity })}
        ></dd-tile>
      </div>
      ${x.length ? c`<div class="setting">
            <div class="setting-head"><span>${o.device.suction}</span></div>
            <dd-segmented
              wrap
              .label=${o.device.suction}
              .value=${m}
              .disabled=${s}
              .pending=${this.pending.has(`speed:${t.entity}`)}
              .options=${x.map((y) => ({ value: y, label: o.device.speeds[y] ?? y }))}
              @hdk-select=${(y) => this.send(`speed:${t.entity}`, { entities: [t.entity], done: () => C(this.hass, t.entity)?.attributes.fan_speed === y.detail.value }, "vacuum", "set_fan_speed", { entity_id: t.entity, fan_speed: y.detail.value })}
            ></dd-segmented>
          </div>` : f}
      ${k.length ? c`<div class="group">${k.map(([y, b]) => c`<div class="health-row"><span class="main">${y}</span><span class="value">${b}</span></div>`)}</div>` : f}`;
  }
  /* ---------- Topení a Klimatizace ---------- */
  target(t, e, s) {
    const n = Number(C(this.hass, t)?.attributes.temperature);
    return Number.isFinite(n) ? `${s ? e.half(n) : e.whole(n)}°` : "";
  }
  renderHeating(t, e) {
    if (!t.heating.rooms.length) return f;
    const s = e.t, n = (r) => ut("heating", C(this.hass, r.entity)), o = (r) => ["manual", "boost"].includes(n(r) ?? ""), a = t.heating.rooms.filter(o).length;
    return c`<h2>
        <span>${s.heating}</span>
        ${a && t.heating.resume ? this.link(
      "resume",
      c`<span class="count">${s.manualCount(a)} · </span>${s.resume}`,
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
      const l = n(r), d = l === void 0 ? s.unavailable : l === "off" ? s.off : [l === "plan" ? s.schedule : s.manual, this.target(r.entity, e, !0)].filter(Boolean).join(" · "), u = l === void 0 || l === "off" ? "off" : l === "plan" ? "idle" : "on";
      return this.openTile("heating", r, d, u, l === void 0);
    })}
      </div>`;
  }
  renderCooling(t, e) {
    if (!t.cooling.rooms.length) return f;
    const s = e.t, n = t.cooling.rooms.filter((o) => !["off", void 0].includes(L(this.hass, o.entity)));
    return c`<h2>
        <span>${s.cooling}</span>
        ${n.length ? this.link(
      "alloff",
      s.allOff,
      () => this.send(
        "alloff",
        { entities: n.map((o) => o.entity), done: () => n.every((o) => ["off", void 0].includes(L(this.hass, o.entity))) },
        "climate",
        "turn_off",
        { entity_id: n.map((o) => o.entity) }
      )
    ) : f}
      </h2>
      <div class="tiles" data-part="cooling">
        ${t.cooling.rooms.map((o) => {
      const a = L(this.hass, o.entity), r = String(C(this.hass, o.entity)?.attributes.preset_mode ?? ""), l = a === "cool" && r === "wind_free" ? "wind_free" : a === "heat_cool" ? "auto" : a ?? "", d = a === void 0 ? s.unavailable : a === "off" ? s.off : [s.mode[l] ?? s.on, a === "fan_only" ? "" : this.target(o.entity, e, !1)].filter(Boolean).join(" · ");
      return this.openTile("cooling", o, d, a === void 0 || a === "off" ? "off" : "on", a === void 0);
    })}
      </div>`;
  }
  /** A tile that opens the popup Topení / Klimatizace with its room selected: one tap, it changes nothing by itself. */
  openTile(t, e, s, n, o) {
    return c`<dd-tile
      kind="open"
      data-entity=${e.entity}
      .name=${this.name(e.name)}
      .text=${s}
      .state=${n}
      .disabled=${o}
      @hdk-open=${() => {
      this._climateSelected = [e.entity], this._detail = t;
    }}
    ></dd-tile>`;
  }
  /** The shared popup of the kit for one system (spec of the kit: in the card Dům only one system, no switch). */
  renderClimate(t, e) {
    const s = this._detail === "heating" || this._detail === "cooling" ? this._detail : void 0, n = (s ?? "heating") === "heating" ? t.heating.rooms : t.cooling.rooms;
    if (!t.heating.rooms.length && !t.cooling.rooms.length) return f;
    const o = async () => {
      await this.renderRoot.querySelector("dd-climate")?.flush(), this._detail = void 0;
    };
    return c`<dd-sheet .open=${s !== void 0} .heading=${s === "cooling" ? e.t.cooling : e.t.heating} .closeLabel=${e.t.close} @hdk-close=${o}>
      ${s ? c`<dd-climate
            .hass=${this.hass}
            .i18n=${e}
            .texts=${e.t.climate}
            .system=${s}
            .rooms=${n.map((a) => ({ name: this.name(a.name), entity: a.entity }))}
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
  link(t, e, s) {
    const n = (r) => {
      if (r.detail === 0) {
        this.gesture.cancel(), s();
        return;
      }
      const l = this.gesture.tap(t, r.timeStamp);
      l === "double" ? (this._hint = void 0, s()) : l === "single" && (this._hint = t, window.clearTimeout(this.hintTimer), this.hintTimer = window.setTimeout(() => this._hint = void 0, (this._config?.guard.hintSeconds ?? 3) * 1e3));
    }, o = (r) => {
      r.button > 0 || this.gesture.start(() => {
        this._hint = void 0, s();
      });
    }, a = () => this.gesture.release();
    return c`<button class="link ${this.pending.has(t) ? "pending" : ""}" type="button" data-link=${t} aria-busy=${this.pending.has(t) ? "true" : f} @click=${n} @pointerdown=${o} @pointerup=${a} @pointerleave=${a} @pointercancel=${a} @contextmenu=${(r) => r.preventDefault()}>
      ${e}${this._hint === t ? c`<div class="hint above end" aria-hidden="true"><i></i><span style="position: relative">${this.i18n.t.hint}</span></div>` : f}
    </button>`;
  }
  /* ---------- Volání Home Assistantu ---------- */
  call(t, e, s, n) {
    this._error = "", this.hass?.callService(t, e, s).catch((o) => {
      n && this.pending.stop(n), this._error = `${this.i18n.t.failed}: ${o instanceof Error ? o.message : String(o)}`;
    });
  }
  /** Sends and pulses the control `key` until `command` is done (or nothing changes for a while, or the call fails). */
  send(t, e, s, n, o) {
    this.pending.has(t) || (this.pending.start(t, this.hass, e), this.call(s, n, o, t));
  }
  /** A blind in a preset and still (its way is over). */
  coverDone(t, e, s) {
    const n = C(this.hass, e)?.state;
    return n === void 0 || nt(n) || this.coverIn(t, e, s) === !0 && n !== "opening" && n !== "closing";
  }
};
be.styles = [Vt, se, Nn];
let B = be;
q([
  v({ attribute: !1 })
], B.prototype, "hass");
q([
  O()
], B.prototype, "_config");
q([
  O()
], B.prototype, "_error");
q([
  O()
], B.prototype, "_hint");
q([
  O()
], B.prototype, "_now");
q([
  O()
], B.prototype, "_detail");
q([
  O()
], B.prototype, "_rules");
q([
  O()
], B.prototype, "_log");
q([
  O()
], B.prototype, "_seen");
q([
  O()
], B.prototype, "_climateSelected");
q([
  O()
], B.prototype, "_menu");
q([
  O()
], B.prototype, "_fit");
Zs("dd");
Us("dd");
customElements.get("ha-dum-dashboard") || customElements.define("ha-dum-dashboard", B);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-dum-dashboard") || window.customCards.push({
  type: "ha-dum-dashboard",
  name: "Dům Dashboard",
  description: Ge(rn()).t.cardDescription,
  preview: !1
});
console.info("%c DUM-DASHBOARD %c 0.24.3 · 2026-11-24 07:18 UTC · po b175efd ", "color:#fff;background:#0A6ED1;font-weight:700", "color:inherit");
