const Mt = globalThis, Ut = Mt.ShadowRoot && (Mt.ShadyCSS === void 0 || Mt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Bt = /* @__PURE__ */ Symbol(), de = /* @__PURE__ */ new WeakMap();
let Se = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
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
const Me = (s) => new Se(typeof s == "string" ? s : s + "", void 0, Bt), j = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, o) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[o + 1], s[0]);
  return new Se(e, s, Bt);
}, Ue = (s, t) => {
  if (Ut) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = Mt.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, he = Ut ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Me(e);
})(s) : s;
const { is: Be, defineProperty: Ie, getOwnPropertyDescriptor: He, getOwnPropertyNames: Ye, getOwnPropertySymbols: We, getPrototypeOf: Ve } = Object, Dt = globalThis, ce = Dt.trustedTypes, qe = ce ? ce.emptyScript : "", Ke = Dt.reactiveElementPolyfillSupport, $t = (s, t) => s, Et = { toAttribute(s, t) {
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
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let lt = class extends HTMLElement {
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
    const { get: n, set: o } = He(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: n, set(a) {
      const r = n?.call(this);
      o?.call(this, a), this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty($t("elementProperties"))) return;
    const t = Ve(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($t("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($t("properties"))) {
      const e = this.properties, i = [...Ye(e), ...We(e)];
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
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : Et).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Et;
      this._$Em = n;
      const r = a.fromAttribute(e, o.type);
      this[n] = r ?? this._$Ej?.get(n) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, o) {
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (o = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? It)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: o }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        const { wrapped: a } = o, r = this[n];
        a !== !0 || this._$AL.has(n) || r === void 0 || this.C(n, void 0, o, r);
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
lt.elementStyles = [], lt.shadowRootOptions = { mode: "open" }, lt[$t("elementProperties")] = /* @__PURE__ */ new Map(), lt[$t("finalized")] = /* @__PURE__ */ new Map(), Ke?.({ ReactiveElement: lt }), (Dt.reactiveElementVersions ??= []).push("2.1.2");
const Ht = globalThis, pe = (s) => s, Tt = Ht.trustedTypes, fe = Tt ? Tt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ce = "$lit$", Z = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + Z, Ge = `<${Ee}>`, it = document, xt = () => it.createComment(""), wt = (s) => s === null || typeof s != "object" && typeof s != "function", Yt = Array.isArray, Ze = (s) => Yt(s) || typeof s?.[Symbol.iterator] == "function", Rt = `[ 	
\f\r]`, gt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, me = /-->/g, ge = />/g, Q = RegExp(`>|${Rt}(?:([^\\s"'>=/]+)(${Rt}*=${Rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, ve = /"/g, Te = /^(?:script|style|textarea|title)$/i, Xe = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), c = Xe(1), ht = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), $e = /* @__PURE__ */ new WeakMap(), et = it.createTreeWalker(it, 129);
function Ne(s, t) {
  if (!Yt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fe !== void 0 ? fe.createHTML(t) : t;
}
const Je = (s, t) => {
  const e = s.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = gt;
  for (let r = 0; r < e; r++) {
    const l = s[r];
    let d, p, h = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, p = a.exec(l), p !== null); ) u = a.lastIndex, a === gt ? p[1] === "!--" ? a = me : p[1] !== void 0 ? a = ge : p[2] !== void 0 ? (Te.test(p[2]) && (n = RegExp("</" + p[2], "g")), a = Q) : p[3] !== void 0 && (a = Q) : a === Q ? p[0] === ">" ? (a = n ?? gt, h = -1) : p[1] === void 0 ? h = -2 : (h = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? Q : p[3] === '"' ? ve : be) : a === ve || a === be ? a = Q : a === me || a === ge ? a = gt : (a = Q, n = void 0);
    const v = a === Q && s[r + 1].startsWith("/>") ? " " : "";
    o += a === gt ? l + Ge : h >= 0 ? (i.push(d), l.slice(0, h) + Ce + l.slice(h) + Z + v) : l + Z + (h === -2 ? r : v);
  }
  return [Ne(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class kt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const r = t.length - 1, l = this.parts, [d, p] = Je(t, e);
    if (this.el = kt.createElement(d, i), et.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = et.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Ce)) {
          const u = p[a++], v = n.getAttribute(h).split(Z), g = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: o, name: g[2], strings: v, ctor: g[1] === "." ? ti : g[1] === "?" ? ei : g[1] === "@" ? ii : Pt }), n.removeAttribute(h);
        } else h.startsWith(Z) && (l.push({ type: 6, index: o }), n.removeAttribute(h));
        if (Te.test(n.tagName)) {
          const h = n.textContent.split(Z), u = h.length - 1;
          if (u > 0) {
            n.textContent = Tt ? Tt.emptyScript : "";
            for (let v = 0; v < u; v++) n.append(h[v], xt()), et.nextNode(), l.push({ type: 2, index: ++o });
            n.append(h[u], xt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ee) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(Z, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += Z.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = it.createElement("template");
    return i.innerHTML = t, i;
  }
}
function ct(s, t, e = s, i) {
  if (t === ht) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = wt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = ct(s, n._$AS(s, t.values), n, i)), t;
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? it).importNode(e, !0);
    et.currentNode = n;
    let o = et.nextNode(), a = 0, r = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new _t(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new si(o, this, t)), this._$AV.push(d), l = i[++r];
      }
      a !== l?.index && (o = et.nextNode(), a++);
    }
    return et.currentNode = it, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class _t {
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
    t = ct(this, t, e), wt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== ht && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ze(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && wt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(it.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = kt.createElement(Ne(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new Qe(n, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = $e.get(t.strings);
    return e === void 0 && $e.set(t.strings, e = new kt(t)), e;
  }
  k(t) {
    Yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const o of t) n === e.length ? e.push(i = new _t(this.O(xt()), this.O(xt()), this, this.options)) : i = e[n], i._$AI(o), n++;
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
class Pt {
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
    let a = !1;
    if (o === void 0) t = ct(this, t, e, 0), a = !wt(t) || t !== this._$AH && t !== ht, a && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = ct(this, r[i + l], e, l), d === ht && (d = this._$AH[l]), a ||= !wt(d) || d !== this._$AH[l], d === m ? t = m : t !== m && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ti extends Pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class ei extends Pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class ii extends Pt {
  constructor(t, e, i, n, o) {
    super(t, e, i, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = ct(this, t, e, 0) ?? m) === ht) return;
    const i = this._$AH, n = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== m && (i === m || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class si {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ct(this, t);
  }
}
const ni = Ht.litHtmlPolyfillSupport;
ni?.(kt, _t), (Ht.litHtmlVersions ??= []).push("3.3.3");
const oi = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = n = new _t(t.insertBefore(xt(), o), o, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
const Wt = globalThis;
class L extends lt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = oi(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ht;
  }
}
L._$litElement$ = !0, L.finalized = !0, Wt.litElementHydrateSupport?.({ LitElement: L });
const ai = Wt.litElementPolyfillSupport;
ai?.({ LitElement: L });
(Wt.litElementVersions ??= []).push("4.2.2");
const ze = /* @__PURE__ */ Symbol.for(""), ri = (s) => {
  if (s?.r === ze) return s?._$litStatic$;
}, Vt = (s) => ({ _$litStatic$: s, r: ze }), ye = /* @__PURE__ */ new Map(), li = (s) => (t, ...e) => {
  const i = e.length;
  let n, o;
  const a = [], r = [];
  let l, d = 0, p = !1;
  for (; d < i; ) {
    for (l = t[d]; d < i && (o = e[d], (n = ri(o)) !== void 0); ) l += n + t[++d], p = !0;
    d !== i && r.push(o), a.push(l), d++;
  }
  if (d === i && a.push(t[i]), p) {
    const h = a.join("$$lit$$");
    (t = ye.get(h)) === void 0 && (a.raw = a, ye.set(h, t = a)), e = r;
  }
  return s(t, ...e);
}, qt = li(c);
const di = { attribute: !0, type: String, converter: Et, reflect: !1, hasChanged: It }, hi = (s = di, t, e) => {
  const { kind: i, metadata: n } = e;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: a } = e;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, s, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, s, r), r;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, s, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function f(s) {
  return (t, e) => typeof e == "object" ? hi(s, t, e) : ((i, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, i), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(s, t, e);
}
function A(s) {
  return f({ ...s, state: !0, attribute: !1 });
}
function bt(s, t = {}) {
  return s.length < 2 ? c`${s[0] ?? m}` : c`<span class="joined ${t.whole ? "whole" : ""}">${s.map(
    (e, i) => c`${i ? c`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : m}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function yt(s, t = {}) {
  return bt(s.split(" · "), t);
}
function Nt(s, t) {
  s.querySelectorAll(".joined").forEach((e) => {
    const i = `${t}|${e.textContent}`;
    if (e.dataset.fit === i) return;
    e.classList.remove("stacked", "flow", "probe");
    const n = [...e.querySelectorAll(":scope > .joined-sep")];
    n.forEach((l) => l.classList.remove("break"));
    const o = [...e.querySelectorAll(":scope > .joined-part")], a = o.map((l) => l.getBoundingClientRect());
    if (!a.length || !a[0].width) {
      delete e.dataset.fit;
      return;
    }
    e.dataset.fit = i;
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
const Kt = j`
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
`, ci = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif', De = j`
  :host {
    font-family: ${Me(ci)};
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
`, Pe = 25, Gt = ["off", "cool", "wind_free", "heat", "fan_only", "dry", "auto", "sleep"], ui = ["plan", "manual", "boost", "off"];
function Zt(s) {
  return s === void 0 || s === "" || s === "unavailable" || s === "unknown";
}
function X(s) {
  return Array.isArray(s) ? s.filter((t) => typeof t == "string") : [];
}
function st(s) {
  const t = typeof s == "string" ? Number.parseFloat(s) : s;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function dt(s, t) {
  const e = t?.state;
  if (!t || Zt(e)) return;
  if (s === "heating")
    return e === "auto" ? "plan" : e === "off" ? "off" : e === "heat" ? st(t.attributes.temperature) === Pe ? "boost" : "manual" : void 0;
  const i = String(t.attributes.preset_mode ?? "");
  return e === "off" ? "off" : e === "cool" && i === "wind_free" ? "wind_free" : i === "sleep" ? "sleep" : e === "heat_cool" ? "auto" : Gt.includes(e) ? e : void 0;
}
function zt(s, t) {
  const e = dt(s, t);
  return e === void 0 ? void 0 : e !== "off";
}
function pi(s, t, e, i, n) {
  if (i.includes(n)) return i.length > 1 ? i.filter((a) => a !== n) : i;
  const o = zt(s, t?.states[n]);
  return o === void 0 ? i : e.filter((a) => zt(s, t?.states[a.entity]) === o).map((a) => a.entity);
}
function fi(s, t) {
  return t.flatMap((e) => {
    const i = st(s?.states[e]?.attributes.temperature);
    return i === void 0 ? [] : [{ entity: e, value: i }];
  });
}
function mi(s, t, e) {
  const i = new Set(e.map((n) => dt(s, t?.states[n])).filter((n) => n !== void 0));
  return i.size === 1 ? [...i][0] : void 0;
}
function gi(s, t) {
  const e = s === "heating" ? 0.5 : 1, i = st(t?.attributes.min_temp) ?? (s === "heating" ? 5 : 16), n = st(t?.attributes.max_temp) ?? (s === "heating" ? 25 : 30);
  return { min: Math.ceil(i / e) * e, max: Math.floor(n / e) * e, step: e };
}
function bi(s) {
  const t = X(s?.attributes.hvac_modes), e = X(s?.attributes.preset_modes);
  return Gt.filter((i) => i === "wind_free" ? t.includes("cool") && e.includes("wind_free") : i === "sleep" ? e.includes("sleep") : i === "auto" ? t.includes("auto") || t.includes("heat_cool") : t.includes(i));
}
function vi(s, t, e) {
  const i = t.map((n) => X(s?.states[n]?.attributes[e])).filter((n) => n.length);
  return i.length ? i[0].filter((n) => i.every((o) => o.includes(n))) : [];
}
function $i(s, t, e) {
  const i = new Set(t.map((n) => s?.states[n]?.attributes[e]).filter((n) => typeof n == "string"));
  return i.size === 1 ? [...i][0] : void 0;
}
function Ft(s) {
  return !!s?.services?.tado_ce?.set_climate_timer;
}
function yi(s) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}:00`;
}
function xi(s, t, e, i) {
  const n = e.mode ?? (e.temperature !== void 0 ? "manual" : dt("heating", t));
  if (n === void 0) return [];
  if (n === "plan") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: s, hvac_mode: "auto" } }];
  if (n === "off") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: s, hvac_mode: "off" } }];
  const o = n === "boost" ? Pe : e.temperature ?? st(t?.attributes.temperature) ?? 21;
  if (!i)
    return n === "manual" ? [{ domain: "climate", service: "set_temperature", data: { entity_id: s, temperature: o, hvac_mode: "heat" } }] : [];
  const a = e.manualFor ?? (n === "boost" ? "30" : "next"), r = { entity_id: s, temperature: o };
  return a === "next" ? r.overlay = "next_time_block" : a === "forever" ? r.overlay = "manual" : r.time_period = yi(Number(a)), [{ domain: "tado_ce", service: "set_climate_timer", data: r }];
}
function wi(s, t, e) {
  const i = [], n = { entity_id: s }, o = X(t?.attributes.hvac_modes), a = X(t?.attributes.preset_modes), r = String(t?.attributes.preset_mode ?? ""), l = e.mode;
  if (l !== void 0) {
    const d = (h) => i.push({ domain: "climate", service: "set_hvac_mode", data: { ...n, hvac_mode: h } }), p = (h) => i.push({ domain: "climate", service: "set_preset_mode", data: { ...n, preset_mode: h } });
    l === "wind_free" ? (d("cool"), p("wind_free")) : l === "sleep" ? ((t?.state === "off" || Zt(t?.state)) && d("cool"), p("sleep")) : (d(l === "auto" ? o.includes("auto") ? "auto" : "heat_cool" : l), l !== "off" && (r === "wind_free" || r === "sleep") && a.includes("none") && p("none"));
  }
  return e.temperature !== void 0 && l !== "off" && i.push({ domain: "climate", service: "set_temperature", data: { ...n, temperature: Math.round(e.temperature) } }), e.fan !== void 0 && X(t?.attributes.fan_modes).includes(e.fan) && i.push({ domain: "climate", service: "set_fan_mode", data: { ...n, fan_mode: e.fan } }), e.swing !== void 0 && X(t?.attributes.swing_modes).includes(e.swing) && i.push({ domain: "climate", service: "set_swing_mode", data: { ...n, swing_mode: e.swing } }), i;
}
function ki(s, t) {
  const e = t.mode;
  return e === void 0 ? s?.state : e === "wind_free" || e === "sleep" && (s?.state === "off" || Zt(s?.state)) ? "cool" : e === "sleep" ? s?.state : e === "auto" ? X(s?.attributes.hvac_modes).includes("auto") ? "auto" : "heat_cool" : e;
}
function _i(s, t, e) {
  const i = Math.round(t * 60), n = [{ delay: { hours: Math.floor(i / 3600), minutes: Math.floor(i % 3600 / 60), seconds: i % 60 } }];
  return e !== void 0 && n.push({ condition: "state", entity_id: s, state: e }), n.push({ action: "climate.set_hvac_mode", target: { entity_id: s }, data: { hvac_mode: "off" } }), { type: "execute_script", sequence: n };
}
var Ai = Object.defineProperty, U = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (n = a(t, e, n) || n);
  return n && Ai(t, e, n), n;
};
const Si = ["next", "30", "60", "180", "forever"], Mi = [0, 60, 180, 480], Qt = class Qt extends L {
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
    const o = Ft(n);
    try {
      for (const a of e) {
        const r = n.states[a];
        if (!r || dt(i, r) === void 0) continue;
        const l = i === "heating" ? xi(a, r, t, o) : wi(a, r, t);
        for (const h of l) await n.callService(h.domain, h.service, h.data);
        const d = t.offAfter ?? 0, p = i === "cooling" ? ki(r, t) : void 0;
        d > 0 && p !== void 0 && p !== "off" && await n.callWS(_i(a, d, p));
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
    const e = this.texts, i = this.hass?.states[t], n = dt(this.system, i);
    if (n === void 0) return e.unavailable;
    const o = st(i?.attributes.temperature);
    return n !== "off" && n !== "boost" && n !== "fan_only" && o !== void 0 ? `${e.modes[n]} · ${this.degrees(o)}` : e.modes[n];
  }
  selectRoom(t) {
    const e = pi(this.system, this.hass, this.rooms, this.selected, t);
    e.join() !== this.selected.join() && (this.flush(this.selected), this.selected = e, this.dispatchEvent(new CustomEvent("hdk-select-rooms", { detail: { selected: e }, bubbles: !0, composed: !0 })));
  }
  render() {
    const t = this.texts, e = this.i18n;
    if (!t || !e) return m;
    const i = this.hass, n = i?.states[this.selected[0]], { min: o, max: a, step: r } = gi(this.system, n), l = fi(i, this.selected), d = [...new Set(l.map(($) => $.value))], p = mi(this.system, i, this.selected), h = this.draft.mode ?? p, u = this.draft.temperature === void 0 && d.length > 1, v = this.draft.temperature ?? (h === "boost" ? 25 : d[0]), g = h === "off" || h === "fan_only", x = g && h !== void 0 ? t.modes[h] : u ? `${this.degrees(Math.min(...d)).replace(/°$/, "")}–${this.degrees(Math.max(...d))}` : v !== void 0 ? this.degrees(v) : "––", b = this.selected.flatMap(($) => {
      const W = st(i?.states[$]?.attributes.current_temperature);
      return W === void 0 ? [] : [{ id: $, text: `${e.one(W)} °C` }];
    }), Y = this.system === "heating" && this.selected.length === 1 && i?.states[this.selected[0]]?.attributes.hvac_action === "heating", F = u ? t.targets(l.map(($) => `${this.name($.entity)} ${this.degrees($.value)}`).join(" · ")) : b.length ? t.now(this.selected.length === 1 ? `${b[0].text}${Y ? ` · ${t.heats}` : ""}` : b.map(($) => `${this.name($.id)} ${$.text}`).join(" · ")) : "", ot = this.system === "heating" ? ui.filter(($) => $ !== "boost" || Ft(i)) : Gt.filter(($) => this.selected.some((W) => bi(i?.states[W]).includes($))), J = this.draft.mode === void 0 && p === void 0 && this.selected.length > 1, w = this.system === "cooling" && (h === "off" || h === "fan_only");
    return c`
      <div class="rooms" role="group" aria-label=${t.rooms}>
        ${this.rooms.map(($) => {
      const W = i?.states[$.entity], pt = zt(this.system, W), ft = this.selected.includes($.entity);
      return xe(this.prefix, {
        name: $.name,
        text: this.roomText($.entity),
        state: ft ? "on" : pt ? "idle" : "off",
        disabled: pt === void 0,
        pressed: ft,
        onPress: () => this.selectRoom($.entity)
      });
    })}
      </div>
      <div class="target">
        <div class="big ${g ? "word" : ""}" aria-live="polite">${x}</div>
        <div class="sub">${F}</div>
        ${this.busy ? c`<span class="busy" role="status" aria-label=${t.sending}
              ><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 2.5a7.5 7.5 0 1 1-7.5 7.5"></path></svg
            ></span>` : m}
      </div>
      <div class="slider">
        ${Ci(this.prefix, {
      min: o,
      max: a,
      step: r,
      value: v ?? o,
      mixed: u,
      marks: u ? d : [],
      label: t.temperature,
      valueText: v !== void 0 ? this.degrees(v) : "",
      minLabel: this.degrees(o),
      maxLabel: this.degrees(a),
      disabled: w || !this.selected.length,
      onChange: ($) => (
        // Moving the temperature of the heating is Ručně (spec: „Posunutí teploty přepne Plán na Ručně“).
        this.change(this.system === "heating" && h !== "manual" ? { temperature: $, mode: "manual" } : { temperature: $ })
      )
    })}
      </div>
      <h3>${t.mode}</h3>
      ${this.system === "heating" ? At(this.prefix, {
      label: t.mode,
      options: ot.map(($) => ({ value: $, label: t.modes[$] })),
      value: h ?? "",
      onSelect: ($) => this.change({ mode: $, ...$ === "plan" || $ === "off" ? { temperature: void 0 } : {} })
    }) : c`<div class="modes" role="group" aria-label=${t.mode}>
            ${ot.map(
      ($) => xe(this.prefix, {
        centered: !0,
        name: t.modes[$],
        state: h === $ ? "on" : "idle",
        pressed: h === $,
        onPress: () => this.change({ mode: $ })
      })
    )}
          </div>`}
      ${J ? c`<div class="note">${yt(t.mixedModes(this.selected.map(($) => `${this.name($)} ${t.modes[dt(this.system, i?.states[$]) ?? "off"] ?? ""}`).join(" · ")))}</div>` : m}
      ${(u || J) && !Object.keys(this.draft).length ? c`<div class="note">${t.firstChange}</div>` : m}
      ${this.system === "heating" ? this.renderManualFor(h) : [this.renderAttribute("fan"), this.renderAttribute("swing"), this.renderOffAfter(h)]}
      ${this.error ? c`<div class="error" role="alert">${this.error}</div>` : m}
      ${this.selected.length === 1 ? c`<button
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
    const i = t === "manual" || t === "boost", n = this.draft.manualFor ?? (t === "boost" ? "30" : "next"), o = Number(n), a = i ? n === "next" ? e.untilNextPlan : n === "forever" ? e.untilChanged : e.untilTime(this.i18n.time(Date.now() + o * 6e4)) : "";
    return c`<h3>${e.manualFor}</h3>
      ${At(this.prefix, {
      label: e.manualFor,
      options: Si.map((r) => ({ value: r, label: e.manualForChoices[r] })),
      value: n,
      disabled: !i,
      wrap: !0,
      onSelect: (r) => this.change({ manualFor: r, ...this.draft.mode === void 0 && t ? { mode: t } : {} })
    })}
      <div class="footer">${a}</div>`;
  }
  /** Síla větru or Směr proudění: the choices every selected air conditioner offers; none, no section. */
  renderAttribute(t) {
    const e = this.texts, i = vi(this.hass, this.selected, t === "fan" ? "fan_modes" : "swing_modes");
    if (!i.length) return m;
    const n = t === "fan" ? e.fanModes : e.swingModes, o = this.draft[t] ?? $i(this.hass, this.selected, t === "fan" ? "fan_mode" : "swing_mode") ?? "", a = t === "fan" ? e.fan : e.swing;
    return c`<h3>${a}</h3>
      ${At(this.prefix, {
      label: a,
      options: i.map((r) => ({ value: r, label: n[r] ?? r })),
      value: o,
      onSelect: (r) => this.change(t === "fan" ? { fan: r } : { swing: r })
    })}`;
  }
  renderOffAfter(t) {
    const e = this.texts, i = this.draft.offAfter ?? 0, n = t !== void 0 ? t !== "off" : this.selected.length > 0 && this.selected.every((a) => zt(this.system, this.hass?.states[a]) === !0), o = n ? i === 0 ? e.runsUntilOff : e.offAt(this.i18n.time(Date.now() + i * 6e4)) : "";
    return c`<h3>${e.offAfter}</h3>
      ${At(this.prefix, {
      label: e.offAfter,
      options: Mi.map((a) => ({ value: String(a), label: e.offAfterChoices[String(a)] })),
      value: String(i),
      disabled: !n,
      onSelect: (a) => this.change({ offAfter: Number(a) })
    })}
      <div class="footer">${o}</div>`;
  }
};
Qt.styles = [De, Kt, j`
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
let N = Qt;
U([
  f({ attribute: !1 })
], N.prototype, "hass");
U([
  f({ attribute: !1 })
], N.prototype, "i18n");
U([
  f({ attribute: !1 })
], N.prototype, "texts");
U([
  f()
], N.prototype, "system");
U([
  f({ attribute: !1 })
], N.prototype, "rooms");
U([
  f({ attribute: !1 })
], N.prototype, "selected");
U([
  f()
], N.prototype, "prefix");
U([
  f({ type: Number })
], N.prototype, "delayMs");
U([
  A()
], N.prototype, "draft");
U([
  A()
], N.prototype, "busy");
U([
  A()
], N.prototype, "error");
function xe(s, t) {
  const e = Vt(`${s}-tile`);
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
function At(s, t) {
  const e = Vt(`${s}-segmented`);
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
function Ci(s, t) {
  const e = Vt(`${s}-slider`);
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
    const t = class extends N {
      constructor() {
        super(), this.prefix = s;
      }
    };
    customElements.define(`${s}-climate`, t);
  }
}
var Ti = Object.defineProperty, ut = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (n = a(t, e, n) || n);
  return n && Ti(t, e, n), n;
};
const te = class te extends L {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, i = (t - e) / 2, n = 2 * Math.PI * i, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), a = t / 2;
    return c`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
      <svg viewBox="0 0 ${t} ${t}" aria-hidden="true">
        <circle class="track" cx=${a} cy=${a} r=${i} fill="none" stroke-width=${e}></circle>
        <circle
          class="fill"
          cx=${a}
          cy=${a}
          r=${i}
          fill="none"
          stroke-width=${e}
          stroke-linecap="round"
          stroke-dasharray="${(n * o).toFixed(1)} ${n.toFixed(1)}"
          transform="rotate(-90 ${a} ${a})"
        ></circle>
      </svg>
      ${this.num ? c`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? c`<span class="unit">${this.unit}</span>` : m}` : m}
    </div>`;
  }
};
te.styles = j`
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
let V = te;
ut([
  f({ type: Number })
], V.prototype, "fraction");
ut([
  f({ type: Number })
], V.prototype, "size");
ut([
  f({ type: Number })
], V.prototype, "stroke");
ut([
  f()
], V.prototype, "num");
ut([
  f()
], V.prototype, "unit");
ut([
  f()
], V.prototype, "label");
class Ot {
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
const Lt = j`
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
var Ni = Object.defineProperty, P = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (n = a(t, e, n) || n);
  return n && Ni(t, e, n), n;
};
const ee = class ee extends L {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new Xt(this), this.nudgeIndex = 0, this.gesture = new Ot(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), i = this.options[t]?.value ?? e[0]?.value, n = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !n ? Math.sign(this.nudgeIndex - t) * 14 : 0, a = this._dragging ? this._dx : o;
    return c`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) || this.wrap ? "tall" : ""} ${this.wrap ? "wrap" : ""} ${this.disabled ? "off" : ""}"
        role="radiogroup"
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
            tabindex=${r.value === i ? 0 : -1}
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
    const e = t.currentTarget, i = this.options.findIndex((r) => r.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: i, moved: !1, id: t.pointerId };
    const n = t.target.closest("button[data-index]"), o = n ? Number(n.dataset.index) : -1, a = o >= 0 && o !== i && !this.options[o]?.disabled;
    this.gesture.start(() => {
      a && (this.drag = void 0, this.select(this.options[o].value));
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
    const i = this.options.filter((r) => !r.disabled);
    if (!i.length) return;
    const n = i.findIndex((r) => r.value === this.value), o = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, a = i[(n + o + i.length) % i.length];
    t.preventDefault(), this.select(a.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${a.value}"]`)?.focus());
  }
};
ee.styles = [
  Lt,
  j`
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
let M = ee;
P([
  f({ attribute: !1 })
], M.prototype, "options");
P([
  f()
], M.prototype, "value");
P([
  f()
], M.prototype, "label");
P([
  f({ type: Boolean })
], M.prototype, "disabled");
P([
  f({ type: Boolean })
], M.prototype, "compact");
P([
  f({ type: Boolean })
], M.prototype, "wrap");
P([
  f({ type: Boolean })
], M.prototype, "guarded");
P([
  f({ type: Number })
], M.prototype, "holdMs");
P([
  f({ type: Number })
], M.prototype, "doubleTapMs");
P([
  f({ type: Number })
], M.prototype, "hintSeconds");
P([
  f()
], M.prototype, "hint");
P([
  A()
], M.prototype, "_dx");
P([
  A()
], M.prototype, "_dragging");
var zi = Object.defineProperty, nt = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (n = a(t, e, n) || n);
  return n && zi(t, e, n), n;
};
const Di = 100, Pi = 0.6, Oi = 6, ie = class ie extends L {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.wide = !1, this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.close();
        return;
      }
      if (t.key !== "Tab") return;
      const e = this.focusable();
      if (!e.length) return;
      const i = t.composedPath(), n = e.findIndex((a) => i.includes(a)), o = t.shiftKey ? e[n <= 0 ? e.length - 1 : n - 1] : e[n === -1 || n === e.length - 1 ? 0 : n + 1];
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
        if (i < Oi) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, i);
    }, this.dragEnd = (t) => {
      const e = this.drag;
      if (this.drag = void 0, !e || !this.dragging) return;
      this.dragging = !1;
      const i = Math.max(0, t.clientY - e.startY), n = i / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (i > Di || n > Pi) ? this.close() : this.dragY = 0;
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
              ${this.sub ? c`<div class="sub">${this.sub}</div>` : m}
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
ie.styles = [De, j`
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
let H = ie;
nt([
  f({ type: Boolean, reflect: !0 })
], H.prototype, "open");
nt([
  f()
], H.prototype, "heading");
nt([
  f()
], H.prototype, "sub");
nt([
  f()
], H.prototype, "closeLabel");
nt([
  f({ type: Boolean })
], H.prototype, "wide");
nt([
  A()
], H.prototype, "dragY");
nt([
  A()
], H.prototype, "dragging");
var Li = Object.defineProperty, O = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (n = a(t, e, n) || n);
  return n && Li(t, e, n), n;
};
const se = class se extends L {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [];
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, i = Math.max(0, Math.min(1, (t - this.min) / e)), n = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${i})`, o = this.mixed && this._drag === void 0 ? this.marks.map((d) => c`<i style="left:${(Math.max(0, Math.min(1, (d - this.min) / e)) * 100).toFixed(2)}%"></i>`) : [], a = this.tickStep || this.step || 1, r = Math.floor(e / a + 1e-9) + 1, l = r >= 2 && r <= 40 ? Array.from({ length: r }, (d, p) => c`<i style="left:${(p * a / e * 100).toFixed(2)}%"></i>`) : [];
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
se.styles = j`
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
let C = se;
O([
  f({ type: Number })
], C.prototype, "min");
O([
  f({ type: Number })
], C.prototype, "max");
O([
  f({ type: Number })
], C.prototype, "step");
O([
  f({ type: Number })
], C.prototype, "tickStep");
O([
  f({ type: Number })
], C.prototype, "value");
O([
  f()
], C.prototype, "label");
O([
  f()
], C.prototype, "valueText");
O([
  f()
], C.prototype, "minLabel");
O([
  f()
], C.prototype, "maxLabel");
O([
  f({ type: Boolean })
], C.prototype, "disabled");
O([
  f({ type: Boolean, reflect: !0 })
], C.prototype, "mixed");
O([
  f({ attribute: !1 })
], C.prototype, "marks");
O([
  A()
], C.prototype, "_drag");
var Ri = Object.defineProperty, q = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (n = a(t, e, n) || n);
  return n && Ri(t, e, n), n;
};
const ne = class ne extends L {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new Xt(this), this.gesture = new Ot(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
ne.styles = [
  Lt,
  j`
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
let R = ne;
q([
  f({ type: Boolean })
], R.prototype, "checked");
q([
  f({ type: Boolean })
], R.prototype, "disabled");
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
var Fi = Object.defineProperty, E = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (n = a(t, e, n) || n);
  return n && Fi(t, e, n), n;
};
const oe = class oe extends L {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new Xt(this), this.gesture = new Ot(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
    const t = this.kind === "toggle", e = this.count === void 0 ? null : c`<span class="count">${this.count}</span>`;
    return c`<button
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
        @contextmenu=${(i) => this.protected && i.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? c`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : c`<span class="text">${yt(this.text)}${e}</span>`}</button>
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
oe.styles = [
  Lt,
  Kt,
  j`
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
  f({ type: Boolean, reflect: !0 })
], k.prototype, "pending");
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
function ji(s) {
  const t = [
    [`${s}-switch`, R],
    [`${s}-segmented`, M],
    [`${s}-slider`, C],
    [`${s}-ring`, V],
    [`${s}-tile`, k],
    [`${s}-sheet`, H]
  ];
  for (const [e, i] of t)
    customElements.get(e) || customElements.define(e, i);
}
const Ui = ["cs", "en", "sv"];
class Oe extends Error {
}
function y(s) {
  throw new Oe(s);
}
function Bi(s, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Oe ? new Error(`${s}: ${e.message}`) : e;
  }
}
function I(s) {
  return typeof s == "object" && s !== null && !Array.isArray(s);
}
function at(s, t) {
  return s == null ? {} : (I(s) || y(`"${t}" must be a mapping of keys.`), s);
}
function D(s, t, e) {
  for (const i of Object.keys(s))
    t.includes(i) || y(`${e}: unknown key "${i}" (allowed: ${t.join(", ")}).`);
}
function _(s, t, e = {}) {
  if (s == null)
    return;
  const i = typeof s == "string" ? s.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(i) || y(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !i.startsWith(`${e.domain}.`) && y(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${i}.`), i;
}
function Ii(s, t) {
  if (s != null)
    return (typeof s != "string" || !s.trim()) && y(`${t} must be a non-empty text.`), s.trim();
}
function G(s, t) {
  if (s != null) {
    if (typeof s == "string" && s.trim())
      return s.trim();
    if (I(s) && Object.keys(s).length > 0) {
      const e = Object.entries(s);
      if (e.every(([i, n]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(i) && typeof n == "string" && n.trim()))
        return Object.fromEntries(e.map(([i, n]) => [i, n.trim()]));
    }
    return y(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Hi(s, t) {
  if (s === void 0 || typeof s == "string")
    return s;
  const e = t.toLowerCase();
  return s[e] ?? s[e.split("-")[0]] ?? s.en ?? Object.values(s)[0];
}
const we = ["auto", ...Ui];
function Yi(s) {
  const t = s ?? "auto";
  return we.includes(t) || y(`language must be one of ${we.join(", ")}.`), t;
}
const Wi = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function vt(s) {
  return Wi.has(s);
}
function S(s, t) {
  return t ? s?.states?.[t] : void 0;
}
function T(s, t) {
  const e = S(s, t)?.state;
  return e === void 0 || vt(e) ? void 0 : e;
}
function St(s, t) {
  const e = T(s, t);
  if (e === void 0)
    return;
  const i = Number(e);
  return Number.isFinite(i) ? i : void 0;
}
const Vi = 168 * 36e5;
function Le(s) {
  if (s == null) return;
  const t = typeof s == "number" ? s < 1e11 ? s * 1e3 : s : Date.parse(s);
  return Number.isFinite(t) ? t : void 0;
}
function qi(s) {
  let t;
  for (const e of s ?? []) {
    const i = e.s ?? e.state, n = Le(e.lu ?? e.last_updated);
    i === void 0 || n === void 0 || i === "unavailable" || i === "unknown" || i === "" || (t === void 0 || t.state !== i) && (t = { state: i, start: n });
  }
  return t;
}
class Ki {
  constructor(t, e = Date.now) {
    this.onChange = t, this.now = e, this.known = /* @__PURE__ */ new Map(), this.wanted = /* @__PURE__ */ new Map(), this.pending = /* @__PURE__ */ new Map(), this.scheduled = !1;
  }
  /** The moment (ms) the entity got its current state; undefined when the entity is missing or has no time. */
  of(t, e) {
    const i = S(t, e);
    if (!t || !e || !i) return;
    const n = Le(i.last_changed), o = `${i.state}|${i.last_changed ?? ""}`, a = this.known.get(e);
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
    for (const [o, a] of e) {
      if (this.pending.get(o) === a && this.pending.delete(o), this.wanted.has(o)) continue;
      const r = qi(n?.[o]), l = S(this.hass, o)?.state;
      this.known.set(o, { key: a, start: r && r.state === l ? r.start : void 0 });
    }
    this.onChange();
  }
}
class Gi {
  /** `changed` is called whenever a control starts or stops pulsing (the card re-renders). */
  constructor(t, e = 5e3) {
    this.changed = t, this.stallMs = e, this.watches = /* @__PURE__ */ new Map();
  }
  has(t) {
    return this.watches.has(t);
  }
  /** The command was sent. A state that is already there pulses not at all. */
  start(t, e, i) {
    if (this.stop(t, !1), e && i.done(e)) {
      this.changed();
      return;
    }
    const n = { ...i, signature: ke(e, i.entities) };
    this.watches.set(t, n), this.arm(t, n), this.changed();
  }
  /** The call failed, or the card goes away. */
  stop(t, e = !0) {
    const i = this.watches.get(t);
    i && (clearTimeout(i.timer), this.watches.delete(t), e && this.changed());
  }
  /** On every update of Home Assistant: arrived ones stop, moving ones get the full stall time again. */
  check(t) {
    if (t)
      for (const [e, i] of [...this.watches]) {
        if (i.done(t)) {
          this.stop(e);
          continue;
        }
        const n = ke(t, i.entities);
        n !== i.signature && (i.signature = n, this.arm(e, i));
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
    const i = s?.states[e];
    return i ? `${i.state}|${JSON.stringify(i.attributes)}` : "";
  }).join("§");
}
const Zi = [
  { name: { cs: "Den", en: "Day", sv: "Dag" }, position: 100, tilt: 100 },
  { name: { cs: "Stín", en: "Shade", sv: "Skugga" }, position: 0, tilt: 100 },
  { name: { cs: "Tma", en: "Dark", sv: "Mörker" }, position: 0, tilt: 0 }
];
function tt(s, t) {
  return s == null ? [] : (Array.isArray(s) || y(`"${t}" must be a list.`), s);
}
function K(s, t, e, i, n) {
  return s == null ? e : ((typeof s != "number" || !Number.isFinite(s) || s < i || s > n) && y(`${t} must be a number from ${i} to ${n}.`), s);
}
function rt(s, t, e) {
  return tt(s, t).map((i, n) => {
    const o = `${t}[${n}]`;
    I(i) || y(`${o} must be a mapping with name and entity.`), D(i, ["name", "entity"], o);
    const a = G(i.name, `${o}.name`) ?? y(`${o}.name is missing.`), r = _(i.entity, `${o}.entity`, { example: `${e[0]}.example` }) ?? y(`${o}.entity is missing.`);
    return e.includes(r.split(".")[0]) || y(`${o}.entity must be one of ${e.join(", ")}, not ${r}.`), { name: a, entity: r };
  });
}
function Xi(s) {
  I(s) || y("the configuration must be a mapping of keys.");
  const t = at(s.covers, "covers");
  D(t, ["script", "entities", "last_action", "presets", "tolerance"], "covers");
  const e = {}, i = tt(t.entities, "covers.entities").map((g, x) => {
    const b = `covers.entities[${x}]`;
    if (!I(g)) return _(g, b, { domain: "cover" }) ?? y(`${b} is missing.`);
    D(g, ["name", "entity"], b);
    const Y = _(g.entity, `${b}.entity`, { domain: "cover" }) ?? y(`${b}.entity is missing.`), F = G(g.name, `${b}.name`);
    return F !== void 0 && (e[Y] = F), Y;
  }), n = at(s.ventilation, "ventilation");
  D(n, ["mode", "fans"], "ventilation");
  const o = at(s.heating, "heating");
  D(o, ["resume", "rooms"], "heating");
  const a = at(s.cooling, "cooling");
  D(a, ["rooms"], "cooling");
  const r = at(s.guard, "guard");
  D(r, ["hold_ms", "double_tap_ms", "hint_seconds"], "guard");
  const l = at(s.house_modes, "house_modes");
  D(l, ["winter", "summer"], "house_modes");
  const d = tt(t.presets, "covers.presets").map((g, x) => {
    const b = `covers.presets[${x}]`;
    return I(g) || y(`${b} must be a mapping with name, position and tilt.`), D(g, ["name", "position", "tilt"], b), {
      name: G(g.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      position: K(g.position, `${b}.position`, 0, 0, 100),
      tilt: K(g.tilt, `${b}.tilt`, 0, 0, 100)
    };
  }), p = tt(s.batteries, "batteries").map((g, x) => {
    const b = `batteries[${x}]`;
    return I(g) || y(`${b} must be a mapping with name and low.`), D(g, ["name", "low", "level", "type"], b), {
      name: G(g.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      low: _(g.low, `${b}.low`, { domain: "binary_sensor" }) ?? y(`${b}.low is missing.`),
      level: _(g.level, `${b}.level`, { domain: "sensor" }),
      type: _(g.type, `${b}.type`, { domain: "sensor" })
    };
  }), h = tt(s.filters, "filters").map((g, x) => {
    const b = `filters[${x}]`;
    return I(g) || y(`${b} must be a mapping with name, hours and threshold.`), D(g, ["name", "hours", "threshold"], b), {
      name: G(g.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      hours: _(g.hours, `${b}.hours`, { domain: "input_number" }) ?? y(`${b}.hours is missing.`),
      threshold: _(g.threshold, `${b}.threshold`, { domain: "select" }) ?? y(`${b}.threshold is missing.`)
    };
  }), u = tt(s.maintenance, "maintenance").map((g, x) => {
    const b = `maintenance[${x}]`;
    return I(g) || y(`${b} must be a mapping with name, task, counter and every.`), D(g, ["name", "task", "counter", "every"], b), {
      name: G(g.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      task: G(g.task, `${b}.task`) ?? y(`${b}.task is missing.`),
      counter: _(g.counter, `${b}.counter`, { domain: "counter" }) ?? y(`${b}.counter is missing.`),
      every: K(g.every, `${b}.every`, 30, 1, 1e3)
    };
  }), v = tt(s.devices, "devices").map((g, x) => {
    const b = `devices[${x}]`;
    return I(g) || y(`${b} must be a mapping with name and entities.`), D(g, ["name", "entities"], b), {
      name: G(g.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      entities: rt(g.entities, `${b}.entities`, ["light", "switch", "fan", "input_boolean", "vacuum"])
    };
  });
  return {
    language: Yi(s.language),
    houseMode: _(s.house_mode_entity, "house_mode_entity", { domain: "input_select" }),
    summer: Ii(l.summer, "house_modes.summer") ?? "Léto",
    failedActions: _(s.failed_actions, "failed_actions", { domain: "sensor" }),
    clearFailed: _(s.clear_failed_script, "clear_failed_script", { domain: "script" }),
    snoozed: _(s.snoozed, "snoozed", { domain: "sensor" }),
    snoozeScript: _(s.snooze_script, "snooze_script", { domain: "script" }),
    batteries: p,
    filters: h,
    laundry: rt(s.laundry, "laundry", ["input_boolean"]),
    maintenance: u,
    running: rt(s.running, "running", ["input_boolean", "binary_sensor", "switch", "vacuum"]),
    covers: {
      script: _(t.script, "covers.script", { domain: "script" }) ?? "script.zaluzie_posun",
      entities: i,
      names: e,
      lastAction: _(t.last_action, "covers.last_action", { domain: "sensor" }),
      presets: d.length ? d : Zi,
      tolerance: K(t.tolerance, "covers.tolerance", 5, 0, 20)
    },
    ventilation: {
      mode: _(n.mode, "ventilation.mode", { domain: "input_boolean" }),
      fans: rt(n.fans, "ventilation.fans", ["switch", "fan"])
    },
    heating: {
      resume: _(o.resume, "heating.resume", { domain: "button" }),
      rooms: rt(o.rooms, "heating.rooms", ["climate"])
    },
    cooling: { rooms: rt(a.rooms, "cooling.rooms", ["climate"]) },
    devices: v,
    sendDelaySeconds: K(s.send_delay_seconds, "send_delay_seconds", 2, 0, 30),
    guard: {
      holdMs: K(r.hold_ms, "guard.hold_ms", 550, 200, 3e3),
      doubleTapMs: K(r.double_tap_ms, "guard.double_tap_ms", 400, 150, 1500),
      hintSeconds: K(r.hint_seconds, "guard.hint_seconds", 3, 1, 10)
    }
  };
}
function Ji(s) {
  return Bi("Dům Dashboard", () => Xi(s));
}
function Re(s) {
  return (s?.locale?.language || s?.language || "").trim();
}
function Jt(s) {
  const t = s.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Qi(s, t) {
  return s === "auto" ? Jt(Re(t)) : s;
}
function ts() {
  return Jt(document.documentElement.lang || navigator.language || "");
}
const _e = /* @__PURE__ */ new WeakMap(), es = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, is = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), ss = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function jt(s, t) {
  const e = s?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function ns(s, t, e) {
  const i = Re(e).replace("_", "-"), n = i !== "" && Jt(i) === t ? i : es[t], o = jt(e, "number_format"), a = jt(e, "time_format"), r = jt(e, "date_format"), l = [t, n, o, a, r].join("|");
  let d = _e.get(s);
  d || (d = /* @__PURE__ */ new Map(), _e.set(s, d));
  let p = d.get(l);
  return p || (p = rs(s[t], t, n, o, a, r), d.set(l, p)), p;
}
function os(s) {
  try {
    return new Intl.NumberFormat(s), s;
  } catch {
    return "en";
  }
}
function as(s, t) {
  if (s === "12")
    return !0;
  if (s === "24")
    return !1;
  const e = s === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function rs(s, t, e, i, n, o) {
  const a = os(e), r = i === "system" ? void 0 : i === "none" ? "en-US" : ss[i] ?? a, l = i === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), p = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), u = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), v = as(n, a), g = v ? "h12" : "h23", x = new Intl.DateTimeFormat(a, { hour: v ? "numeric" : "2-digit", minute: "2-digit", hourCycle: g }), b = new Intl.DateTimeFormat(a, v ? { hour: "numeric", hourCycle: g } : { hour: "2-digit", minute: "2-digit", hourCycle: g }), Y = o === "system" ? void 0 : a, F = new Intl.DateTimeFormat(Y, { day: "numeric", month: "numeric" }), ot = (w) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return F.format(w);
    const $ = F.formatToParts(w), W = $.find((mt) => mt.type === "literal")?.value ?? "/", pt = $[$.length - 1], ft = pt?.type === "literal" ? pt.value : "", re = $.find((mt) => mt.type === "day")?.value ?? "", le = $.find((mt) => mt.type === "month")?.value ?? "";
    return o === "DMY" ? `${re}${W}${le}${ft}` : `${le}${W}${re}${ft}`;
  }, J = is.has(a.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: a,
    t: s,
    one: (w) => d.format(w),
    two: (w) => p.format(w),
    half: (w) => h.format(Math.round(w * 2) / 2),
    tick: (w) => h.format(w),
    whole: (w) => u.format(w),
    percent: (w) => `${w}${J}%`,
    time: (w) => x.format(w),
    hour: (w) => b.format(w),
    day: ot
  };
}
const ls = {
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
}, ds = {
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
}, hs = {
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
}, cs = { cs: ls, en: ds, sv: hs };
function Fe(s, t) {
  return ns(cs, s, t);
}
const us = j`
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
`, ps = ["unavailable", "unknown", ""], fs = ["opening", "closing"], ms = 2 * 6e4;
function Ct(s) {
  return typeof s.when == "number" ? s.when * 1e3 : Date.parse(s.when);
}
function Ae(s) {
  return s.context_name || s.context_entity_id_name || (s.context_user_id ? "app" : "");
}
function gs(s, t) {
  const e = s.filter((a) => typeof a.entity_id == "string" && a.state !== void 0).sort((a, r) => Ct(a) - Ct(r)), i = /* @__PURE__ */ new Map(), n = [];
  for (const a of e) {
    const r = String(a.state);
    if (fs.includes(r)) {
      const d = Ae(a);
      d && i.set(a.entity_id, d);
      continue;
    }
    const l = Ae(a) || i.get(a.entity_id) || "";
    i.delete(a.entity_id), !ps.includes(r) && n.push({ time: Ct(a), entries: [a], state: r, reason: l, kind: t(a.entity_id) });
  }
  const o = [];
  for (const a of n) {
    const r = o.find(
      (l) => l.kind === a.kind && l.state === a.state && l.reason === a.reason && a.time - l.time <= ms && !l.entries.some((d) => d.entity_id === a.entries[0].entity_id)
    );
    r && a.kind ? (r.entries.push(a.entries[0]), r.time = a.time) : o.push(a);
  }
  return o.sort((a, r) => r.time - a.time);
}
function bs(s) {
  const t = s.map((i) => i.split(" "));
  let e = 0;
  for (; t.every((i) => i.length > e + 1 && i[e] === t[0][e]); ) e += 1;
  return t.map((i) => {
    const n = i.slice(e).join(" ");
    return n.charAt(0).toLocaleUpperCase() + n.slice(1);
  });
}
var vs = Object.defineProperty, B = (s, t, e, i) => {
  for (var n = void 0, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (n = a(t, e, n) || n);
  return n && vs(t, e, n), n;
};
const je = "dum-dashboard.log-seen";
function $s() {
  try {
    return Number(localStorage.getItem(je)) || 0;
  } catch {
    return 0;
  }
}
function ys(s) {
  try {
    localStorage.setItem(je, String(s));
  } catch {
  }
}
const xs = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="8" width="16" height="8" rx="2"></rect><path d="M21 11v2" stroke-linecap="round"></path><rect x="5" y="10" width="3" height="4" fill="currentColor" stroke="none"></rect></svg>`, ws = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 8v8M12 8v8M16 8v8"></path></svg>`, ks = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2.5"></rect><circle cx="12" cy="13" r="4.5"></circle><path d="M7.5 6.5h2" stroke-linecap="round"></path></svg>`, _s = c`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.6-.6-2.6z"></path></svg>`, ae = class ae extends L {
  constructor() {
    super(...arguments), this._error = "", this._now = Date.now(), this.coverHistory = {}, this._seen = $s(), this.pending = new Gi(() => this.requestUpdate()), this._climateSelected = [], this._fit = "", this.starts = new Ki(() => this.requestUpdate()), this.gesture = new Ot(() => ({
      holdMs: this._config?.guard.holdMs ?? 550,
      doubleTapMs: this._config?.guard.doubleTapMs ?? 400
    })), this.closeMenu = (t) => {
      this._menu && (t instanceof KeyboardEvent ? t.key === "Escape" : !t.composedPath().some((e) => e instanceof Element && e.classList.contains("snooze"))) && (this._menu = void 0);
    };
  }
  setConfig(t) {
    this._config = Ji(t);
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
    return Fe(Qi(this._config?.language ?? "auto", this.hass), this.hass);
  }
  name(t) {
    return Hi(t, this.i18n.language) ?? "";
  }
  render() {
    const t = this._config;
    if (!t) return m;
    const e = this.i18n, n = t.houseMode !== void 0 && T(this.hass, t.houseMode) === t.summer ? [this.renderCooling(t, e), this.renderHeating(t, e)] : [this.renderHeating(t, e), this.renderCooling(t, e)];
    return c`<ha-card>
      ${this.renderQueue(t, e)} ${this.renderRunning(t, e)} ${this.renderCovers(t, e)}
      ${this.renderVentilation(t, e)} ${n} ${this.renderDevices(t, e)} ${this.renderLogRow(t, e)}
      ${this._error ? c`<div class="error" role="alert">${this._error}</div>` : m}
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
      await this.loadCoverHistory(t, n), this._log = Array.isArray(o) ? o : [];
    } catch {
    }
  }
  async loadCoverHistory(t, e) {
    if (!(!t.covers.entities.length || !this.hass))
      try {
        const i = await this.hass.callWS({
          type: "history/history_during_period",
          start_time: e.toISOString(),
          entity_ids: t.covers.entities,
          include_start_time_state: !0,
          significant_changes_only: !1,
          minimal_response: !1,
          no_attributes: !1
        }), n = {};
        for (const [o, a] of Object.entries(i ?? {})) {
          let r;
          n[o] = (Array.isArray(a) ? a : []).flatMap((l) => {
            const d = Number(l.a?.current_position ?? r?.position), p = Number(l.a?.current_tilt_position ?? r?.tilt), h = Number(l.lu ?? l.lc) * 1e3;
            return !Number.isFinite(d) || !Number.isFinite(p) || !Number.isFinite(h) ? [] : (r = { position: d, tilt: p }, [{ time: h, position: d, tilt: p }]);
          });
        }
        this.coverHistory = n;
      } catch {
      }
  }
  /** The preset a blind was in at `time` (from the recorder), or undefined. */
  presetAt(t, e, i) {
    const n = this.coverHistory[e] ?? [];
    let o;
    for (const a of n) a.time <= i + 6e4 && (o = a);
    if (o)
      return t.covers.presets.find((a) => Math.abs(o.position - a.position) <= t.covers.tolerance && Math.abs(o.tilt - a.tilt) <= t.covers.tolerance);
  }
  /** Which entities are one kind: one action on several of them is one row. */
  logKind(t) {
    const e = /* @__PURE__ */ new Map();
    return t.covers.entities.forEach((i) => e.set(i, "covers")), [t.ventilation.mode, ...t.ventilation.fans.map((i) => i.entity)].forEach((i) => i && e.set(i, "ventilation")), t.heating.rooms.forEach((i) => e.set(i.entity, "heating")), t.cooling.rooms.forEach((i) => e.set(i.entity, "cooling")), (i) => e.get(i) ?? "";
  }
  /** Pračka, sušička, myčka in words („Sušička · Doběhla“), not their helpers („Sušička běží · Vypnuto“). */
  logTitle(t, e, i, n) {
    const o = n.t, a = t.running.find((l) => l.entity === e.entity_id);
    if (a) return `${this.name(a.name)} · ${i === "on" ? o.logRuns : o.logFinished}`;
    const r = t.laundry.find((l) => l.entity === e.entity_id);
    return r ? `${this.name(r.name)} · ${i === "on" ? o.logLaundryWaits : o.logLaundryOut}` : `${this.logName(e)} · ${this.logState(e, i)}`;
  }
  /**
   * The reason of a blind when the logbook has none: the helper of the last action of each blind says who sent it
   * (the same source as the detail of the blinds), when its time is just before the entry.
   */
  coverReason(t, e, i) {
    if (e.reason || e.kind !== "covers") return e.reason === "app" ? i.t.who.aplikace : e.reason;
    const n = S(this.hass, t.covers.lastAction)?.attributes.polozky, o = n && typeof n == "object" ? n[e.entries[0].entity_id] : void 0, a = typeof o?.cas == "string" ? Date.parse(o.cas) : NaN;
    return !o || typeof o.kdo != "string" || !(a <= e.time && e.time - a <= 3 * 6e4) ? "" : i.t.who[o.kdo] ?? o.kdo;
  }
  /** „Sušička - konec cyklu“ under „Sušička · Doběhla“ says the name twice: the reason without it („Konec cyklu“). */
  withoutName(t, e, i) {
    const n = e.entries[0].entity_id, o = [...i.running, ...i.laundry].find((l) => l.entity === n), a = o ? this.name(o.name) : this.logName(e.entries[0]);
    if (!t.toLocaleLowerCase().startsWith(a.toLocaleLowerCase())) return t;
    const r = t.slice(a.length).replace(/^[\s\-–—·:]+/, "");
    return r ? r.charAt(0).toLocaleUpperCase() + r.slice(1) : t;
  }
  logName(t) {
    const e = S(this.hass, t.entity_id);
    return t.name || (typeof e?.attributes.friendly_name == "string" ? e.attributes.friendly_name : t.entity_id);
  }
  logState(t, e) {
    const i = e.startsWith("preset:") ? this._config?.covers.presets[Number(e.slice(7))] : void 0;
    if (i) return this.name(i.name);
    const n = this.hass, o = S(this.hass, t.entity_id);
    return o && n?.formatEntityState ? n.formatEntityState(o, e) : e;
  }
  /** A blind in the journal says its preset („Žaluzie · Tma“, uživatel 13. 11. 2026: „Q220 zatím A“), else its state. */
  logRows(t) {
    const e = (this._log ?? []).map((i) => {
      if (!t.covers.entities.includes(i.entity_id) || ["opening", "closing"].includes(String(i.state))) return i;
      const n = this.presetAt(t, i.entity_id, Ct(i));
      return n ? { ...i, state: `preset:${t.covers.presets.indexOf(n)}` } : i;
    });
    return gs(e, this.logKind(t));
  }
  renderLogRow(t, e) {
    if (!this.logEntities(t).length) return m;
    const i = e.t, n = this.logRows(t).filter((l) => l.time > this._seen).length, o = /* @__PURE__ */ new Date();
    o.setHours(0, 0, 0, 0);
    const a = this._seen < o.getTime(), r = this._log === void 0 ? "" : n ? a ? i.logToday(n) : i.logNew(n, e.time(this._seen)) : i.logNothingNew;
    return c`<div class="group" data-part="log">
      <button class="row link-row" type="button" aria-haspopup="dialog" @click=${() => this.openLog()}>
        <span class="main">${i.log}${r ? c`<small>${r}</small>` : m}</span>
        <span class="chevron-mark" aria-hidden="true">›</span>
      </button>
    </div>`;
  }
  openLog() {
    this._detail = "log", this.loadLog();
  }
  closeLog() {
    this._detail = void 0, this._seen = Date.now(), ys(this._seen);
  }
  renderLog(t, e) {
    if (!this.logEntities(t).length) return m;
    const i = e.t, n = this._detail === "log", o = this.logRows(t), a = o.filter((p) => p.time > this._seen), r = o.filter((p) => p.time <= this._seen), l = { covers: i.covers, ventilation: i.ventilation, heating: i.heating, cooling: i.cooling }, d = (p) => p.map((h) => {
      const u = this.withoutName(this.coverReason(t, h, e), h, t), v = h.entries.length > 1, g = v ? `${l[h.kind] ?? ""} · ${this.logState(h.entries[0], h.state)}` : this.logTitle(t, h.entries[0], h.state, e);
      return c`<div class="log-row"><span class="log-time">${e.time(h.time)}</span><span class="main"
            >${g}${v ? c`<span class="log-members">${bs(h.entries.map((x) => this.logName(x))).join(", ")}</span>` : m}${u ? c`<small>${u}</small>` : m}</span
          ></div>`;
    });
    return c`<dd-sheet .open=${n} .heading=${i.log} .closeLabel=${i.close} @hdk-close=${() => this.closeLog()}>
      ${n ? c`<div class="detail" data-part="log-detail">
            ${this._log === void 0 ? c`<p class="log-empty">${i.logFailed}</p>` : o.length ? c`${a.length ? c`<h3>${i.logSince}</h3>${d(a)}` : m}${r.length ? c`<h3>${i.logEarlier}</h3>${d(r)}` : m}` : c`<p class="log-empty">${i.logEmpty}</p>`}
          </div>` : m}
    </dd-sheet>`;
  }
  /* ---------- Potřebuje tebe ---------- */
  failed(t) {
    const e = S(this.hass, t.failedActions)?.attributes.polozky;
    return Array.isArray(e) ? e.filter((i) => typeof i == "object" && i !== null && typeof i.entita == "string") : [];
  }
  renderQueue(t, e) {
    if (!t.failedActions && !t.batteries.length && !t.filters.length && !t.laundry.length && !t.maintenance.length) return m;
    const i = e.t, n = this.failed(t), o = this.snoozed(t), a = t.batteries.filter((u) => T(this.hass, u.low) === "on" && !o.has(`battery:${u.low}`)), r = this.dirtyFilters(t).filter(({ filter: u }) => !o.has(`filter:${u.hours}`)), l = t.laundry.filter((u) => T(this.hass, u.entity) === "on"), d = t.maintenance.flatMap((u) => {
      const v = St(this.hass, u.counter);
      return v !== void 0 && v >= u.every && !o.has(`maintenance:${u.counter}`) ? [{ item: u, cycles: v }] : [];
    }), p = n.length + a.length + r.length + l.length + d.length, h = [
      ...n.map((u) => {
        const v = t.covers.names[u.entita], g = S(this.hass, u.entita)?.attributes.friendly_name, x = typeof g == "string" ? g : v !== void 0 ? this.name(v) : void 0, b = u.cas ? Date.parse(u.cas) : NaN, Y = this.failedGoal(t, u), F = Y ? i.notArrivedTo(this.name(Y.name)) : u.duvod || u.akce, ot = bt([F ? F.charAt(0).toLocaleUpperCase(e.language) + F.slice(1) : void 0, Number.isFinite(b) ? e.time(b) : void 0].filter(Boolean)), J = this.retryOf(t, u);
        return c`<div class="row" data-row="failed">
          <span class="mark warn" aria-hidden="true">!</span>
          <span class="main">${typeof x == "string" ? x : u.entita}<small>${ot}</small></span>
          ${J ? c`<button class="button small ${this.pending.has(`retry:${u.entita}`) ? "pending" : ""}" type="button" aria-label=${`${i.retry}: ${typeof x == "string" ? x : u.entita}`} aria-busy=${this.pending.has(`retry:${u.entita}`) ? "true" : m} @click=${J}>${i.retry}</button>` : t.clearFailed ? c`<button class="button" type="button" @click=${() => this.call("script", t.clearFailed.split(".")[1], { entita: u.entita })}>${i.done}</button>` : m}
        </div>`;
      }),
      ...a.map((u) => {
        const v = St(this.hass, u.level), g = T(this.hass, u.type), x = bt([i.battery(v === void 0 ? void 0 : e.percent(Math.round(v))), g].filter(Boolean));
        return c`<div class="row" data-row="battery">
          <span class="mark">${xs}</span>
          <span class="main">${this.name(u.name)}<small>${x}</small></span>
          ${this.snoozeButton(t, `battery:${u.low}`, e)}
        </div>`;
      }),
      ...r.map(({ filter: u, hours: v, threshold: g }) => {
        const x = (b) => `${e.whole(Math.floor(b))} h`;
        return c`<div class="row two" data-row="filter">
          <span class="mark">${ws}</span>
          <span class="main">${this.name(u.name)}<small>${yt(i.filter(x(v), x(g)))}</small></span>
          <span class="actions">
            ${this.snoozeButton(t, `filter:${u.hours}`, e)}
            <button class="button" type="button" @click=${() => this.call("input_number", "set_value", { entity_id: u.hours, value: 0 })}>${i.done}</button>
          </span>
        </div>`;
      }),
      ...d.map(({ item: u, cycles: v }) => c`<div class="row two" data-row="maintenance">
        <span class="mark">${_s}</span>
        <span class="main">${this.name(u.name)}<small>${bt([this.name(u.task), i.cycles(v, u.every)])}</small></span>
        <span class="actions">
          ${this.snoozeButton(t, `maintenance:${u.counter}`, e)}
          <button class="button" type="button" @click=${() => this.call("counter", "reset", { entity_id: u.counter })}>${i.done}</button>
        </span>
      </div>`),
      ...l.map((u) => {
        const v = this.starts.of(this.hass, u.entity), g = v !== void 0 && new Date(v).toDateString() === new Date(this._now).toDateString(), x = v === void 0 ? "" : g ? e.time(v) : e.day(v);
        return c`<div class="row" data-row="laundry">
          <span class="mark">${ks}</span>
          <span class="main">${this.name(u.name)}<small>${yt(i.laundry(x))}</small></span>
          <button class="button" type="button" @click=${() => this.call("input_boolean", "turn_off", { entity_id: u.entity })}>${i.done}</button>
        </div>`;
      })
    ];
    return c`<h2><span>${p ? `${i.needsYou} · ${p}` : i.needsYou}</span></h2>
      <div class="group" data-part="queue">
        ${h.length ? h : c`<div class="row"><span class="main">${i.nothingWaits}</span></div>`}
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
    const e = S(this.hass, t.snoozed)?.attributes.polozky, i = this.day(new Date(this._now)), n = /* @__PURE__ */ new Set();
    if (Array.isArray(e))
      for (const o of e)
        typeof o?.klic == "string" && typeof o.do == "string" && o.do > i && n.add(o.klic);
    return n;
  }
  /** "Odložit" with its menu (a day, to the weekend, a week, a month; without a time, it is no alarm). The menu only covers what is under it. */
  snoozeButton(t, e, i) {
    if (!t.snoozed || !t.snoozeScript) return m;
    const n = i.t, o = new Date(this._now), a = (u) => new Date(o.getFullYear(), o.getMonth(), o.getDate() + u), r = (6 - o.getDay() + 7) % 7 || 7, l = new Date(o.getFullYear(), o.getMonth() + 1, o.getDate()), d = [[n.snoozeFor.day, a(1)], [n.snoozeFor.weekend, a(r)], [n.snoozeFor.week, a(7)], [n.snoozeFor.month, l]], p = this._menu === e, h = (u) => {
      this._menu = void 0, this.call("script", t.snoozeScript.split(".")[1], { klic: e, do: this.day(u) });
    };
    return c`<span class="snooze">
      <button class="button" type="button" aria-haspopup="menu" aria-expanded=${p ? "true" : "false"} @click=${() => this._menu = p ? void 0 : e}>${n.snooze}</button>
      ${p ? c`<div class="menu" role="menu">
            ${d.map(([u, v]) => c`<button type="button" role="menuitem" @click=${() => h(v)}><span>${u}</span><span class="until">${i.day(v.getTime())}</span></button>`)}
          </div>` : m}
    </span>`;
  }
  /** The preset a blind did not arrive at (its target matches one), when it moved but stopped elsewhere. */
  failedGoal(t, e) {
    const i = e.cil;
    if (!(!e.entita.startsWith("cover.") || !/^nedojela/i.test(e.duvod ?? "")))
      return t.covers.presets.find((n) => Math.abs(Number(i?.pos) - n.position) <= t.covers.tolerance && Math.abs(Number(i?.tilt) - n.tilt) <= t.covers.tolerance);
  }
  /** A failed command of a blind can be sent again when the sensor kept its target. */
  retryOf(t, e) {
    const i = e.cil;
    if (!e.entita.startsWith("cover.") || !i || i.pos === void 0 || i.tilt === void 0) return;
    const n = Number(i.pos), o = Number(i.tilt);
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
  duration(t, e) {
    const i = this.starts.of(this.hass, t);
    if (i === void 0) return "";
    const n = Math.max(0, Math.floor((this._now - i) / 6e4));
    return n < 60 ? e.t.minutes(n) : e.t.hours(Math.floor(n / 60), n % 60);
  }
  renderRunning(t, e) {
    if (!t.running.length) return m;
    const i = new Set(t.devices.flatMap((a) => a.entities.map((r) => r.entity))), n = t.running.filter((a) => !i.has(a.entity) && ["on", "cleaning", "returning"].includes(T(this.hass, a.entity) ?? "")), o = n.map((a) => `${this.name(a.name)} ${this.duration(a.entity, e)}`.trim());
    return c`<h2><span>${e.t.running}</span></h2>
      <div class="group" data-part="running"><div class="row now ${n.length ? "" : "none"}"><span class="main" style="font-size:inherit;line-height:inherit">${o.length ? bt(o) : e.t.nothingRuns}</span></div></div>`;
  }
  /* ---------- Žaluzie ---------- */
  /** Whether one blind is in the preset: undefined when it does not report its position. */
  coverIn(t, e, i) {
    const n = S(this.hass, e);
    if (!n || vt(n.state)) return;
    const o = Number(n.attributes.current_position), a = Number(n.attributes.current_tilt_position);
    if (!(!Number.isFinite(o) || !Number.isFinite(a)))
      return Math.abs(o - i.position) <= t.covers.tolerance && Math.abs(a - i.tilt) <= t.covers.tolerance;
  }
  /** How many blinds are in the preset, and how many report their position at all. */
  inPreset(t, e) {
    let i = 0, n = 0;
    for (const o of t.covers.entities) {
      const a = this.coverIn(t, o, e);
      a !== void 0 && (n += 1, a && (i += 1));
    }
    return { count: i, known: n };
  }
  renderCovers(t, e) {
    if (!t.covers.entities.length) return m;
    const i = t.covers.presets.length - 1;
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
            .hintAlign=${o === 0 ? "start" : o === i ? "end" : "center"}
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
  coverAction(t, e, i) {
    const n = i.t, o = this.failed(t).find((d) => d.entita === e);
    if (o) {
      const d = o.cas ? Date.parse(o.cas) : NaN, p = this.failedGoal(t, o);
      return p ? { text: [n.notArrivedTo(this.name(p.name)), Number.isFinite(d) ? this.when(d, i) : ""].filter(Boolean).join(" "), warn: !0 } : { text: [Number.isFinite(d) ? n.notArrived(this.when(d, i)) : n.notArrived("").trim(), o.duvod].filter(Boolean).join(" · "), warn: !0 };
    }
    const a = S(this.hass, t.covers.lastAction)?.attributes.polozky, r = a && typeof a == "object" ? a[e] : void 0;
    if (!r || typeof r.kdo != "string") return;
    const l = typeof r.cas == "string" ? Date.parse(r.cas) : NaN;
    return { text: [n.who[r.kdo] ?? r.kdo, Number.isFinite(l) ? this.when(l, i) : ""].filter(Boolean).join(" "), warn: !1 };
  }
  /** Detail of the blinds: every room with its last action and the three presets just for it (one tap: the sheet was opened on purpose). */
  renderCoversDetail(t, e) {
    if (!t.covers.entities.length) return m;
    const i = e.t, n = this._detail === "covers";
    return c`<dd-sheet .open=${n} .heading=${i.covers} .closeLabel=${i.close} @hdk-close=${() => this._detail = void 0}>
      ${n ? c`<div class="detail" data-part="covers-detail">
            ${t.covers.entities.map((o) => {
      const a = S(this.hass, o), r = t.covers.names[o], l = a?.attributes.friendly_name, d = r !== void 0 ? this.name(r) : typeof l == "string" ? l : o, p = this.coverAction(t, o, e);
      return c`<div class="cover-row" data-cover=${o}>
                <span class="main">${d}${p ? c`<small class=${p.warn ? "warn" : ""}>${yt(p.text)}</small>` : m}</span>
                <span class="presets">
                  ${t.covers.presets.map(
        (h, u) => c`<dd-tile
                      kind="action"
                      centered
                      .name=${this.name(h.name)}
                      .label=${`${d}: ${this.name(h.name)}`}
                      .state=${this.coverIn(t, o, h) ? "on" : "idle"}
                      .pending=${this.pending.has(`cover:${o}:${u}`)}
                      @hdk-press=${() => this.send(`cover:${o}:${u}`, { entities: [o], done: () => this.coverDone(t, o, h) }, "script", t.covers.script.split(".")[1], {
          entity: o,
          pos: h.position,
          tilt: h.tilt
        })}
                    ></dd-tile>`
      )}
                </span>
              </div>`;
    })}
          </div>` : m}
    </dd-sheet>`;
  }
  setCovers(t, e, i) {
    const n = t.covers.script.split(".")[1];
    if (!this.pending.has(i)) {
      this.pending.start(i, this.hass, { entities: t.covers.entities, done: () => t.covers.entities.every((o) => this.coverDone(t, o, e)) });
      for (const o of t.covers.entities)
        this.call("script", n, { entity: o, pos: e.position, tilt: e.tilt }, i);
    }
  }
  /* ---------- Větrání ---------- */
  align(t) {
    return t % 3 === 0 ? "start" : t % 3 === 2 ? "end" : "center";
  }
  renderVentilation(t, e) {
    const i = e.t, n = [...t.ventilation.mode ? [{ name: i.ventilationMode, entity: t.ventilation.mode }] : [], ...t.ventilation.fans];
    return n.length ? c`<h2><span>${i.ventilation}</span></h2>
      <div class="tiles" data-part="ventilation">
        ${n.map((o, a) => {
      const r = S(this.hass, o.entity), l = !r || vt(r.state), d = r?.state === "on";
      return c`<dd-tile
            kind="toggle"
            guarded
            data-entity=${o.entity}
            .name=${this.name(o.name)}
            .text=${l ? i.unavailable : d ? i.runs(this.duration(o.entity, e)).trim() : i.off}
            .state=${d ? "on" : "off"}
            .disabled=${l}
            .hint=${i.hint}
            .hintAlign=${this.align(a)}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            .pending=${this.pending.has(`toggle:${o.entity}`)}
            @hdk-toggle=${(p) => {
        const h = p.detail.checked ? "on" : "off";
        this.send(`toggle:${o.entity}`, { entities: [o.entity], done: () => T(this.hass, o.entity) === h }, "homeassistant", p.detail.checked ? "turn_on" : "turn_off", {
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
   * a fan of Větrání; a vacuum opens its details in Home Assistant (one tap changes nothing).
   */
  renderDevices(t, e) {
    const i = e.t;
    return t.devices.filter((n) => n.entities.length).map(
      (n, o) => c`<h2><span>${this.name(n.name)}</span></h2>
          <div class="tiles" data-part=${`devices-${o}`}>
            ${n.entities.map((a, r) => {
        const l = S(this.hass, a.entity), d = !l || vt(l.state);
        if (a.entity.startsWith("vacuum.")) {
          const h = l?.state === "cleaning", u = this.hass, v = l && u?.formatEntityState ? u.formatEntityState(l) : l?.state ?? "", g = d ? i.unavailable : h ? [v, this.duration(a.entity, e)].filter(Boolean).join(" · ") : v;
          return c`<dd-tile
                  kind="open"
                  data-entity=${a.entity}
                  .name=${this.name(a.name)}
                  .text=${g}
                  .state=${h ? "on" : d ? "off" : "idle"}
                  .disabled=${d}
                  @hdk-open=${() => this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: !0, composed: !0, detail: { entityId: a.entity } }))}
                ></dd-tile>`;
        }
        const p = l?.state === "on";
        return c`<dd-tile
                kind="toggle"
                guarded
                data-entity=${a.entity}
                .name=${this.name(a.name)}
                .text=${d ? i.unavailable : p ? i.on : i.off}
                .state=${p ? "on" : "off"}
                .disabled=${d}
                .hint=${i.hint}
                .hintAlign=${this.align(r)}
                .holdMs=${t.guard.holdMs}
                .doubleTapMs=${t.guard.doubleTapMs}
                .hintSeconds=${t.guard.hintSeconds}
                .pending=${this.pending.has(`toggle:${a.entity}`)}
                @hdk-toggle=${(h) => {
          const u = h.detail.checked ? "on" : "off";
          this.send(`toggle:${a.entity}`, { entities: [a.entity], done: () => T(this.hass, a.entity) === u }, "homeassistant", h.detail.checked ? "turn_on" : "turn_off", {
            entity_id: a.entity
          });
        }}
              ></dd-tile>`;
      })}
          </div>`
    );
  }
  /* ---------- Topení a Klimatizace ---------- */
  target(t, e, i) {
    const n = Number(S(this.hass, t)?.attributes.temperature);
    return Number.isFinite(n) ? `${i ? e.half(n) : e.whole(n)}°` : "";
  }
  renderHeating(t, e) {
    if (!t.heating.rooms.length) return m;
    const i = e.t, n = t.heating.rooms.filter((o) => T(this.hass, o.entity) === "heat").length;
    return c`<h2>
        <span>${i.heating}</span>
        ${n && t.heating.resume ? this.link(
      "resume",
      c`<span class="count">${i.manualCount(n)} · </span>${i.resume}`,
      () => this.send(
        "resume",
        { entities: t.heating.rooms.map((o) => o.entity), done: () => !t.heating.rooms.some((o) => T(this.hass, o.entity) === "heat") },
        "button",
        "press",
        { entity_id: t.heating.resume }
      )
    ) : m}
      </h2>
      <div class="tiles" data-part="heating">
        ${t.heating.rooms.map((o) => {
      const a = T(this.hass, o.entity), r = a === void 0 ? i.unavailable : a === "off" ? i.off : [a === "auto" ? i.schedule : i.manual, this.target(o.entity, e, !0)].filter(Boolean).join(" · "), l = a === void 0 || a === "off" ? "off" : a === "auto" ? "idle" : "on";
      return this.openTile("heating", o, r, l, a === void 0);
    })}
      </div>`;
  }
  renderCooling(t, e) {
    if (!t.cooling.rooms.length) return m;
    const i = e.t, n = t.cooling.rooms.filter((o) => !["off", void 0].includes(T(this.hass, o.entity)));
    return c`<h2>
        <span>${i.cooling}</span>
        ${n.length ? this.link(
      "alloff",
      i.allOff,
      () => this.send(
        "alloff",
        { entities: n.map((o) => o.entity), done: () => n.every((o) => ["off", void 0].includes(T(this.hass, o.entity))) },
        "climate",
        "turn_off",
        { entity_id: n.map((o) => o.entity) }
      )
    ) : m}
      </h2>
      <div class="tiles" data-part="cooling">
        ${t.cooling.rooms.map((o) => {
      const a = T(this.hass, o.entity), r = String(S(this.hass, o.entity)?.attributes.preset_mode ?? ""), l = a === "cool" && r === "wind_free" ? "wind_free" : a === "heat_cool" ? "auto" : a ?? "", d = a === void 0 ? i.unavailable : a === "off" ? i.off : [i.mode[l] ?? i.on, a === "fan_only" ? "" : this.target(o.entity, e, !1)].filter(Boolean).join(" · ");
      return this.openTile("cooling", o, d, a === void 0 || a === "off" ? "off" : "on", a === void 0);
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
    if (!t.heating.rooms.length && !t.cooling.rooms.length) return m;
    const o = async () => {
      await this.renderRoot.querySelector("dd-climate")?.flush(), this._detail = void 0;
    };
    return c`<dd-sheet .open=${i !== void 0} .heading=${i === "cooling" ? e.t.cooling : e.t.heating} .closeLabel=${e.t.close} @hdk-close=${o}>
      ${i ? c`<dd-climate
            .hass=${this.hass}
            .i18n=${e}
            .texts=${e.t.climate}
            .system=${i}
            .rooms=${n.map((a) => ({ name: this.name(a.name), entity: a.entity }))}
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
  link(t, e, i) {
    const n = (r) => {
      if (r.detail === 0) {
        this.gesture.cancel(), i();
        return;
      }
      const l = this.gesture.tap(t, r.timeStamp);
      l === "double" ? (this._hint = void 0, i()) : l === "single" && (this._hint = t, window.clearTimeout(this.hintTimer), this.hintTimer = window.setTimeout(() => this._hint = void 0, (this._config?.guard.hintSeconds ?? 3) * 1e3));
    }, o = (r) => {
      r.button > 0 || this.gesture.start(() => {
        this._hint = void 0, i();
      });
    }, a = () => this.gesture.release();
    return c`<button class="link ${this.pending.has(t) ? "pending" : ""}" type="button" data-link=${t} aria-busy=${this.pending.has(t) ? "true" : m} @click=${n} @pointerdown=${o} @pointerup=${a} @pointerleave=${a} @pointercancel=${a} @contextmenu=${(r) => r.preventDefault()}>
      ${e}${this._hint === t ? c`<div class="hint above end" aria-hidden="true"><i></i><span style="position: relative">${this.i18n.t.hint}</span></div>` : m}
    </button>`;
  }
  /* ---------- Volání Home Assistantu ---------- */
  call(t, e, i, n) {
    this._error = "", this.hass?.callService(t, e, i).catch((o) => {
      n && this.pending.stop(n), this._error = `${this.i18n.t.failed}: ${o instanceof Error ? o.message : String(o)}`;
    });
  }
  /** Sends and pulses the control `key` until `command` is done (or nothing changes for a while, or the call fails). */
  send(t, e, i, n, o) {
    this.pending.has(t) || (this.pending.start(t, this.hass, e), this.call(i, n, o, t));
  }
  /** A blind in a preset and still (its way is over). */
  coverDone(t, e, i) {
    const n = S(this.hass, e)?.state;
    return n === void 0 || vt(n) || this.coverIn(t, e, i) === !0 && n !== "opening" && n !== "closing";
  }
};
ae.styles = [Lt, Kt, us];
let z = ae;
B([
  f({ attribute: !1 })
], z.prototype, "hass");
B([
  A()
], z.prototype, "_config");
B([
  A()
], z.prototype, "_error");
B([
  A()
], z.prototype, "_hint");
B([
  A()
], z.prototype, "_now");
B([
  A()
], z.prototype, "_detail");
B([
  A()
], z.prototype, "_log");
B([
  A()
], z.prototype, "_seen");
B([
  A()
], z.prototype, "_climateSelected");
B([
  A()
], z.prototype, "_menu");
B([
  A()
], z.prototype, "_fit");
ji("dd");
Ei("dd");
customElements.get("ha-dum-dashboard") || customElements.define("ha-dum-dashboard", z);
window.customCards = window.customCards ?? [];
window.customCards.some((s) => s.type === "ha-dum-dashboard") || window.customCards.push({
  type: "ha-dum-dashboard",
  name: "Dům Dashboard",
  description: Fe(ts()).t.cardDescription,
  preview: !1
});
console.info("%c DUM-DASHBOARD %c 0.11.1 · 2026-11-13 21:48 UTC · po cbb5f17 ", "color:#fff;background:#0A6ED1;font-weight:700", "color:inherit");
