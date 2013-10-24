/*publish time:2011-07-29 17:49:47*/
(function (E, H, G) {
    var C = {
        mix: function (O, I, J, M) {
            if (!I || !O) {
                return O
            }
            if (J === G) {
                J = true
            }
            var K, N, L;
            if (M && (L = M.length)) {
                for (K = 0; K < L; K++) {
                    N = M[K];
                    if (N in I) {
                        F(N, O, I, J)
                    }
                }
            } else {
                for (N in I) {
                    F(N, O, I, J)
                }
            }
            return O
        }
    }, F = function (I, J, K, L) {
            if (L || !(I in J)) {
                J[I] = K[I]
            }
        }, B = (E && E[H]) || {}, A = 0,
        D = "";
    E = B.__HOST || (B.__HOST = E || {});
    H = E[H] = C.mix(B, C, false);
    H.mix(H, {
        __APP_MEMBERS: ["namespace"],
        __APP_INIT_METHODS: ["__init"],
        version: "1.1.6",
        merge: function () {
            var I = {}, J, K = arguments.length;
            for (J = 0; J < K; J++) {
                H.mix(I, arguments[J])
            }
            return I
        },
        augment: function () {
            var K = arguments,
                L = K.length - 2,
                N = K[0],
                I = K[L],
                M = K[L + 1],
                J = 1;
            if (!H.isArray(M)) {
                I = M;
                M = G;
                L++
            }
            if (!H.isBoolean(I)) {
                I = G;
                L++
            }
            for (; J < L; J++) {
                H.mix(N.prototype, K[J].prototype || K[J], I, M)
            }
            return N
        },
        extend: function (I, J, L, N) {
            if (!J || !I) {
                return I
            }
            var M = Object.create ? function (Q, P) {
                    return Object.create(Q, {
                        constructor: {
                            value: P
                        }
                    })
                } : function (R, P) {
                    function S() {}
                    S.prototype = R;
                    var Q = new S();
                    Q.constructor = P;
                    return Q
                }, O = J.prototype,
                K;
            I.prototype = K = M(O, I);
            I.superclass = M(O, J);
            if (L) {
                H.mix(K, L)
            }
            if (N) {
                H.mix(I, N)
            }
            return I
        },
        __init: function () {
            this.Config = this.Config || {};
            this.Env = this.Env || {};
            this.Config.debug = ""
        },
        namespace: function () {
            var O = arguments,
                J = O.length,
                K = null,
                N, I, L, M = (O[J - 1] === true && J--);
            for (N = 0; N < J; N++) {
                L = (D + O[N]).split(".");
                K = M ? E : this;
                for (I = (E[L[0]] === K) ? 1 : 0; I < L.length; ++I) {
                    K = K[L[I]] = K[L[I]] || {}
                }
            }
            return K
        },
        app: function (K, M) {
            var I = H.isString(K),
                N = I ? E[K] || {} : K,
                J = 0,
                L = H.__APP_INIT_METHODS.length;
            H.mix(N, this, true, H.__APP_MEMBERS);
            for (; J < L; J++) {
                H[H.__APP_INIT_METHODS[J]].call(N)
            }
            H.mix(N, H.isFunction(M) ? M() : M);
            I && (E[K] = N);
            return N
        },
        log: function (I, K, J) {
            if (H.Config.debug) {
                if (J) {
                    I = J + ": " + I
                }
                if (E.console !== G && console.log) {
                    console[K && console[K] ? K : "log"](I)
                }
            }
        },
        error: function (I) {
            if (H.Config.debug) {
                throw I
            }
        },
        guid: function (I) {
            return (I || D) + A++
        }
    });
    H.__init();
    return H
})(this, "KISSY");
(function (F, G) {
    var A = F.__HOST,
        J = Object.prototype.toString,
        D = Array.prototype.indexOf,
        B = Array.prototype.lastIndexOf,
        K = Array.prototype.filter,
        H = String.prototype.trim,
        I = "",
        E = /^\s+|\s+$/g,
        C = {};
    F.mix(F, {
        type: function (L) {
            return L == null ? String(L) : C[J.call(L)] || "object"
        },
        isNull: function (L) {
            return L === null
        },
        isUndefined: function (L) {
            return L === G
        },
        isEmptyObject: function (L) {
            for (var M in L) {
                return false
            }
            return true
        },
        isPlainObject: function (L) {
            return L && J.call(L) === "[object Object]" && "isPrototypeOf" in L
        },
        clone: function (N) {
            var O = N,
                M, L;
            if (N && ((M = F.isArray(N)) || F.isPlainObject(N))) {
                O = M ? [] : {};
                for (L in N) {
                    if (N.hasOwnProperty(L)) {
                        O[L] = F.clone(N[L])
                    }
                }
            }
            return O
        },
        trim: H ? function (L) {
            return (L == G) ? I : H.call(L)
        } : function (L) {
            return (L == G) ? I : L.toString().replace(E, I)
        },
        substitute: function (N, L, M) {
            if (!F.isString(N) || !F.isPlainObject(L)) {
                return N
            }
            return N.replace(M || /\\?\{([^{}]+)\}/g, function (O, P) {
                if (O.charAt(0) === "\\") {
                    return O.slice(1)
                }
                return (L[P] !== G) ? L[P] : I
            })
        },
        each: function (L, P, Q) {
            var R, N, S = 0,
                O = L.length,
                M = O === G || F.type(L) === "function";
            Q = Q || A;
            if (M) {
                for (R in L) {
                    if (P.call(Q, L[R], R, L) === false) {
                        break
                    }
                }
            } else {
                for (N = L[0]; S < O && P.call(Q, N, S, L) !== false; N = L[++S]) {}
            }
            return L
        },
        indexOf: D ? function (L, M) {
            return D.call(M, L)
        } : function (N, L) {
            for (var O = 0, M = L.length; O < M; ++O) {
                if (L[O] === N) {
                    return O
                }
            }
            return -1
        },
        lastIndexOf: (B) ? function (L, M) {
            return B.call(M, L)
        } : function (N, M) {
            for (var L = M.length - 1; L >= 0; L--) {
                if (M[L] === N) {
                    break
                }
            }
            return L
        },
        unique: function (L, P) {
            if (P) {
                L.reverse()
            }
            var M = L.slice(),
                Q = 0,
                N, O;
            while (Q < M.length) {
                O = M[Q];
                while ((N = F.lastIndexOf(O, M)) !== Q) {
                    M.splice(N, 1)
                }
                Q += 1
            }
            if (P) {
                M.reverse()
            }
            return M
        },
        inArray: function (L, M) {
            return F.indexOf(L, M) > -1
        },
        filter: K ? function (M, N, L) {
            return K.call(M, N, L)
        } : function (M, N, O) {
            var L = [];
            F.each(M, function (P, Q, R) {
                if (N.call(O, P, Q, R)) {
                    L.push(P)
                }
            });
            return L
        },
        now: function () {
            return new Date().getTime()
        }
    });
    F.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (M, L) {
        C["[object " + M + "]"] = (L = M.toLowerCase());
        F["is" + M] = function (N) {
            return F.type(N) == L
        }
    })
})(KISSY);
(function (P, S) {
    var Q = P.__HOST,
        B = Q.document,
        E = B.documentElement,
        A = "",
        I = "&",
        N = encodeURIComponent("[]"),
        J = false,
        M = [],
        D = false,
        O = 500,
        K = 40,
        L = /^#?([\w-]+)$/,
        G = /^(\w+)\[\]$/,
        H = /\S/;
    P.mix(P, {
        isWindow: function (T) {
            return P.type(T) === "object" && "setInterval" in T
        },
        makeArray: function (T) {
            if (T === null || T === S) {
                return []
            }
            if (P.isArray(T)) {
                return T
            }
            if (typeof T.length !== "number" || P.isString(T) || P.isFunction(T)) {
                return [T]
            }
            return R(T)
        },
        param: function (Y, V) {
            if (!P.isPlainObject(Y)) {
                return A
            }
            V = V || I;
            var W = [],
                T, Z;
            for (T in Y) {
                Z = Y[T];
                T = encodeURIComponent(T);
                if (C(Z)) {
                    W.push(T, "=", encodeURIComponent(Z + A), V)
                } else {
                    if (P.isArray(Z) && Z.length) {
                        for (var U = 0, X = Z.length; U < X; ++U) {
                            if (C(Z[U])) {
                                W.push(T, N + "=", encodeURIComponent(Z[U] + A), V)
                            }
                        }
                    }
                }
            }
            W.pop();
            return W.join(A)
        },
        unparam: function (V, T) {
            if (typeof V !== "string" || (V = P.trim(V)).length === 0) {
                return {}
            }
            var Y = {}, X = V.split(T || I),
                b, U, d, c, a = 0,
                Z = X.length;
            for (; a < Z; ++a) {
                b = X[a].split("=");
                U = decodeURIComponent(b[0]);
                try {
                    d = decodeURIComponent(b[1] || A)
                } catch (W) {
                    d = b[1] || A
                }
                if ((c = U.match(G)) && c[1]) {
                    Y[c[1]] = Y[c[1]] || [];
                    Y[c[1]].push(d)
                } else {
                    Y[U] = d
                }
            }
            return Y
        },
        globalEval: function (T) {
            if (T && H.test(T)) {
                var U = B.getElementsByTagName("head")[0] || E,
                    V = B.createElement("script");
                V.text = T;
                U.insertBefore(V, U.firstChild);
                U.removeChild(V)
            }
        },
        later: function (T, U, Y, b, Z) {
            U = U || 0;
            b = b || {};
            var a = T,
                W = P.makeArray(Z),
                X, V;
            if (P.isString(T)) {
                a = b[T]
            }
            if (!a) {
                P.error("method undefined")
            }
            X = function () {
                a.apply(b, W)
            };
            V = (Y) ? setInterval(X, U) : setTimeout(X, U);
            return {
                id: V,
                interval: Y,
                cancel: function () {
                    if (this.interval) {
                        clearInterval(V)
                    } else {
                        clearTimeout(V)
                    }
                }
            }
        },
        ready: function (T) {
            if (!D) {
                this._bindReady()
            }
            if (J) {
                T.call(Q, this)
            } else {
                M.push(T)
            }
            return this
        },
        _bindReady: function () {
            var T = this,
                Y = B.documentElement.doScroll,
                c = Y ? "onreadystatechange" : "DOMContentLoaded",
                V = "complete",
                b = function () {
                    T._fireReady()
                };
            D = true;
            if (B.readyState === V) {
                return b()
            }
            if (B.addEventListener) {
                function Z() {
                    B.removeEventListener(c, Z, false);
                    b()
                }
                B.addEventListener(c, Z, false);
                Q.addEventListener("load", b, false)
            } else {
                function W() {
                    if (B.readyState === V) {
                        B.detachEvent(c, W);
                        b()
                    }
                }
                B.attachEvent(c, W);
                Q.attachEvent("onload", b);
                var a = false;
                try {
                    a = Q.frameElement == null
                } catch (U) {}
                if (Y && a) {
                    function X() {
                        try {
                            Y("left");
                            b()
                        } catch (d) {
                            setTimeout(X, 1)
                        }
                    }
                    X()
                }
            }
        },
        _fireReady: function () {
            if (J) {
                return
            }
            J = true;
            if (M) {
                var T, U = 0;
                while (T = M[U++]) {
                    T.call(Q, this)
                }
                M = null
            }
        },
        available: function (T, W) {
            T = (T + A).match(L)[1];
            if (!T || !P.isFunction(W)) {
                return
            }
            var V = 1,
                U = P.later(function () {
                    if (B.getElementById(T) && (W() || 1) || ++V > O) {
                        U.cancel()
                    }
                }, K, true)
        }
    });

    function C(T) {
        var U = typeof T;
        return T === null || (U !== "object" && U !== "function")
    }

    function R(T) {
        return Array.prototype.slice.call(T)
    }
    try {
        R(E.childNodes)
    } catch (F) {
        R = function (V) {
            for (var U = [], T = V.length - 1; T >= 0; T--) {
                U[T] = V[T]
            }
            return U
        }
    }
    if (location && (location.search || A).indexOf("ks-debug") !== -1) {
        P.Config.debug = true
    }
})(KISSY);
(function (M, Q) {
    var N = M.__HOST,
        B = N.document,
        K = B.getElementsByTagName("head")[0] || B.documentElement,
        A = "",
        F = "cssfullpath",
        C = 1,
        L = 2,
        J = 3,
        O = 4,
        H = M.mix,
        E = B.createElement("script").readyState ? function (T, S) {
            var U = T.onreadystatechange;
            T.onreadystatechange = function () {
                var V = T.readyState;
                if (V === "loaded" || V === "complete") {
                    T.onreadystatechange = null;
                    U && U();
                    S.call(this)
                }
            }
        } : function (T, S) {
            T.addEventListener("load", S, false)
        }, P = /\.css(?:\?|$)/i,
        I;
    I = {
        add: function (U, S, V) {
            var W = this,
                Z = W.Env.mods,
                T, Y, X;
            if (M.isString(U) && !V && M.isPlainObject(S)) {
                Y = {};
                Y[U] = S;
                U = Y
            }
            if (M.isPlainObject(U)) {
                M.each(U, function (b, a) {
                    b.name = a;
                    if (Z[a]) {
                        H(b, Z[a], false)
                    }
                });
                H(Z, U)
            } else {
                V = V || {};
                T = Z[U] || {};
                U = V.host || T.host || U;
                T = Z[U] || {};
                H(T, {
                    name: U,
                    status: L
                });
                if (!T.fns) {
                    T.fns = []
                }
                S && T.fns.push(S);
                X = T.requires;
                H((Z[U] = T), V);
                Z[U]["requires"] = X;
                if ((T.attach !== false) && W.__isAttached(T.requires)) {
                    W.__attachMod(T)
                }
            }
            return W
        },
        use: function (V, U, Z) {
            V = V.replace(/\s+/g, A).split(",");
            Z = Z || {};
            var S = this,
                T = S.Env.mods,
                a = (Z || 0).global,
                Y, X = V.length,
                W, b, c;
            if (a) {
                S.__mixMods(a)
            }
            if (S.__isAttached(V)) {
                U && U(S);
                return
            }
            for (Y = 0; Y < X && (W = T[V[Y]]); Y++) {
                if (W.status === O) {
                    continue
                }
                if (Z.order && Y > 0) {
                    if (!W.requires) {
                        W.requires = []
                    }
                    W._requires = W.requires.concat();
                    b = V[Y - 1];
                    if (!M.inArray(b, W.requires) && !(M.inArray(W.name, T[b].requires || []))) {
                        W.requires.push(b)
                    }
                }
                S.__attach(W, function () {
                    if (W._requires) {
                        W.requires = W._requires;
                        delete W._requires
                    }
                    if (!c && S.__isAttached(V)) {
                        c = true;
                        U && U(S)
                    }
                }, a)
            }
            return S
        },
        __attach: function (U, Y, Z) {
            var W = this,
                S = U.requires || [],
                V = 0,
                X = S.length;
            for (; V < X; V++) {
                W.__attach(W.Env.mods[S[V]], T, Z)
            }
            W.__buildPath(U);
            W.__load(U, T, Z);

            function T() {
                var a = U.requires || [];
                if (W.__isAttached(a)) {
                    if (U.status === L) {
                        W.__attachMod(U)
                    }
                    if (U.status === O) {
                        Y()
                    }
                }
            }
        },
        __mixMods: function (S) {
            var T = this.Env.mods,
                U = S.Env.mods,
                V;
            for (V in U) {
                this.__mixMod(T, U, V, S)
            }
        },
        __mixMod: function (S, U, W, T) {
            var V = S[W] || {}, X = V.status;
            M.mix(V, M.clone(U[W]));
            if (X) {
                V.status = X
            }
            if (T) {
                this.__buildPath(V, T.Config.base)
            }
            S[W] = V
        },
        __attachMod: function (S) {
            var T = this;
            if (S.fns) {
                M.each(S.fns, function (U) {
                    U && U(T)
                });
                S.fns = Q
            }
            S.status = O
        },
        __isAttached: function (V) {
            var S = this.Env.mods,
                T, U = (V = M.makeArray(V)).length - 1;
            for (; U >= 0 && (T = S[V[U]]); U--) {
                if (T.status !== O) {
                    return false
                }
            }
            return true
        },
        __load: function (W, U, a) {
            var S = this,
                b = W.fullpath,
                T = M.Env._loadQueue,
                Z = T[b],
                X;
            W.status = W.status || 0;
            if (W.status < C && Z) {
                W.status = Z.nodeName ? C : L
            }
            if (M.isString(W[F])) {
                S.getScript(W[F]);
                W[F] = L
            }
            if (W.status < C && b) {
                W.status = C;
                X = S.getScript(b, {
                    success: function () {
                        KISSY.log(W.name + " is loaded.", "info");
                        V()
                    },
                    error: function () {
                        W.status = J;
                        Y()
                    },
                    charset: W.charset
                });
                if (!P.test(b)) {
                    T[b] = X
                }
            } else {
                if (W.status === C) {
                    E(Z, V)
                } else {
                    U()
                }
            }

            function V() {
                Y();
                if (W.status !== J) {
                    if (a) {
                        S.__mixMod(S.Env.mods, a.Env.mods, W.name, a)
                    }
                    if (W.status !== O) {
                        W.status = L
                    }
                    U()
                }
            }

            function Y() {
                T[b] = L
            }
        },
        __buildPath: function (U, T) {
            var V = this.Config;
            S("path", "fullpath");
            if (U[F] !== L) {
                S("csspath", F)
            }

            function S(W, X) {
                if (!U[X] && U[W]) {
                    U[X] = (T || V.base) + U[W]
                }
                if (U[X] && V.debug) {
                    U[X] = U[X].replace(/-min/g, "")
                }
            }
        },
        getScript: function (a, T, W) {
            var S = P.test(a),
                X = B.createElement(S ? "link" : "script"),
                Y = T,
                V, U, Z;
            if (M.isPlainObject(Y)) {
                T = Y.success;
                V = Y.error;
                U = Y.timeout;
                W = Y.charset
            }
            if (S) {
                X.href = a;
                X.rel = "stylesheet"
            } else {
                X.src = a;
                X.async = true
            } if (W) {
                X.charset = W
            }
            if (S) {
                M.isFunction(T) && T.call(X)
            } else {
                E(X, function () {
                    if (Z) {
                        Z.cancel();
                        Z = Q
                    }
                    M.isFunction(T) && T.call(X);
                    if (K && X.parentNode) {
                        K.removeChild(X)
                    }
                })
            } if (M.isFunction(V)) {
                Z = M.later(function () {
                    Z = Q;
                    V()
                }, (U || this.Config.timeout) * 1000)
            }
            K.insertBefore(X, K.firstChild);
            return X
        }
    };
    H(M, I);
    var R = /^(.*)(seed|kissy)(-min)?\.js[^/]*/i,
        G = /(seed|kissy)(-min)?\.js/;

    function D(T) {
        var c = T.src,
            W = T.getAttribute("data-combo-prefix") || "??",
            S = T.getAttribute("data-combo-sep") || ",",
            Y = c.split(S),
            b, Z = Y[0],
            U = Z.indexOf(W);
        if (U == -1) {
            b = c.replace(R, "$1")
        } else {
            b = Z.substring(0, U);
            var V = Z.substring(U + 2, Z.length);
            if (V.match(G)) {
                b += V.replace(R, "$1")
            } else {
                for (var X = 1; X < Y.length; X++) {
                    var a = Y[X];
                    if (a.match(G)) {
                        b += a.replace(R, "$1");
                        break
                    }
                }
            }
        }
        return b
    }
    M.__initLoader = function () {
        var U = B.getElementsByTagName("script"),
            T = U[U.length - 1],
            S = D(T);
        this.Env.mods = {};
        this.Env._loadQueue = {};
        if (!this.Config.base) {
            this.Config.base = S
        }
        if (!this.Config.timeout) {
            this.Config.timeout = 10
        }
    };
    M.__initLoader();
    M.each(I, function (S, T) {
        M.__APP_MEMBERS.push(T)
    });
    M.__APP_INIT_METHODS.push("__initLoader")
})(KISSY);
(function (B) {
    var A = {
        core: {
            path: "packages/core-min.js",
            charset: "utf-8"
        }
    };
    B.each(["sizzle", "dd", "datalazyload", "flash", "switchable", "suggest", "calendar", "uibase", "overlay", "imagezoom", "template"], function (C) {
        A[C] = {
            path: C + "/" + C + "-pkg-min.js",
            requires: ["core"],
            charset: "utf-8"
        }
    });
    A.calendar.csspath = "calendar/default-min.css";
    A.overlay.requires = ["uibase"];
    B.add(A)
})(KISSY);
KISSY.add("ua", function (B) {
    var H = navigator.userAgent,
        F = "",
        I = "mobile",
        D = F,
        A = F,
        C, G = {}, E = function (K) {
            var J = 0;
            return parseFloat(K.replace(/\./g, function () {
                return (J++ === 0) ? "." : ""
            }))
        };
    if ((C = H.match(/AppleWebKit\/([\d.]*)/)) && C[1]) {
        G[D = "webkit"] = E(C[1]);
        if ((C = H.match(/Chrome\/([\d.]*)/)) && C[1]) {
            G[A = "chrome"] = E(C[1])
        } else {
            if ((C = H.match(/\/([\d.]*) Safari/)) && C[1]) {
                G[A = "safari"] = E(C[1])
            }
        } if (/ Mobile\//.test(H)) {
            G[I] = "apple"
        } else {
            if ((C = H.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))) {
                G[I] = C[0].toLowerCase()
            }
        }
    } else {
        if ((C = H.match(/Presto\/([\d.]*)/)) && C[1]) {
            G[D = "presto"] = E(C[1]);
            if ((C = H.match(/Opera\/([\d.]*)/)) && C[1]) {
                G[A = "opera"] = E(C[1]);
                if ((C = H.match(/Opera\/.* Version\/([\d.]*)/)) && C[1]) {
                    G[A] = E(C[1])
                }
                if ((C = H.match(/Opera Mini[^;]*/)) && C) {
                    G[I] = C[0].toLowerCase()
                } else {
                    if ((C = H.match(/Opera Mobi[^;]*/)) && C) {
                        G[I] = C[0]
                    }
                }
            }
        } else {
            if ((C = H.match(/MSIE\s([^;]*)/)) && C[1]) {
                G[D = "trident"] = 0.1;
                G[A = "ie"] = E(C[1]);
                if ((C = H.match(/Trident\/([\d.]*)/)) && C[1]) {
                    G[D] = E(C[1])
                }
            } else {
                if ((C = H.match(/Gecko/))) {
                    G[D = "gecko"] = 0.1;
                    if ((C = H.match(/rv:([\d.]*)/)) && C[1]) {
                        G[D] = E(C[1])
                    }
                    if ((C = H.match(/Firefox\/([\d.]*)/)) && C[1]) {
                        G[A = "firefox"] = E(C[1])
                    }
                }
            }
        }
    }
    G.core = D;
    G.shell = A;
    G._numberify = E;
    B.UA = G
});
KISSY.add("ua-extra", function (E) {
    var B = E.UA,
        I = navigator.userAgent,
        F, C, D, H = {}, G = B._numberify;
    if (F = I.match(/360SE/)) {
        H[D = "se360"] = 3
    } else {
        if ((F = I.match(/Maxthon/)) && (C = window.external)) {
            D = "maxthon";
            try {
                H[D] = G(C.max_version)
            } catch (A) {
                H[D] = 0.1
            }
        } else {
            if (F = I.match(/TencentTraveler\s([\d.]*)/)) {
                H[D = "tt"] = F[1] ? G(F[1]) : 0.1
            } else {
                if (F = I.match(/TheWorld/)) {
                    H[D = "theworld"] = 3
                } else {
                    if (F = I.match(/SE\s([\d.]*)/)) {
                        H[D = "sougou"] = F[1] ? G(F[1]) : 0.1
                    }
                }
            }
        }
    }
    D && (H.shell = D);
    E.mix(B, H)
});
KISSY.add("dom", function (B, C) {
    B.DOM = {
        _isElementNode: function (D) {
            return A(D, 1)
        },
        _isKSNode: function (D) {
            return B.Node && A(D, B.Node.TYPE)
        },
        _getWin: function (D) {
            return (D && ("scrollTo" in D) && D.document) ? D : A(D, 9) ? D.defaultView || D.parentWindow : D === C ? window : false
        },
        _nodeTypeIs: A
    };

    function A(E, D) {
        return E && E.nodeType === D
    }
});
KISSY.add("selector", function (K, M) {
    var D = document,
        B = K.DOM,
        F = " ",
        N = "*",
        J = "getDOMNode",
        I = J + "s",
        A = /^#[\w-]+$/,
        O = /^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/;

    function G(V, Y) {
        var S, R, T = [],
            X, W, U;
        Y = E(Y);
        if (K.isString(V)) {
            V = K.trim(V);
            if (A.test(V)) {
                R = Q(V.slice(1), Y);
                if (R) {
                    T = [R]
                }
            } else {
                if ((S = O.exec(V))) {
                    X = S[1];
                    W = S[2];
                    U = S[3];
                    if ((Y = X ? Q(X, Y) : Y)) {
                        if (U) {
                            if (!X || V.indexOf(F) !== -1) {
                                T = C(U, W, Y)
                            } else {
                                R = Q(X, Y);
                                if (R && B.hasClass(R, U)) {
                                    T = [R]
                                }
                            }
                        } else {
                            if (W) {
                                T = L(W, Y)
                            }
                        }
                    }
                } else {
                    if (K.ExternalSelector) {
                        return K.ExternalSelector(V, Y)
                    } else {
                        H(V)
                    }
                }
            }
        } else {
            if (V && (V[J] || V[I])) {
                T = V[J] ? [V[J]()] : V[I]()
            } else {
                if (V && (K.isArray(V) || P(V))) {
                    T = V
                } else {
                    if (V) {
                        T = [V]
                    }
                }
            }
        } if (P(T)) {
            T = K.makeArray(T)
        }
        T.each = function (Z, a) {
            return K.each(T, Z, a)
        };
        return T
    }

    function P(R) {
        return R && !R.nodeType && R.item && (R != window)
    }

    function E(R) {
        if (R === M) {
            R = D
        } else {
            if (K.isString(R) && A.test(R)) {
                R = Q(R.slice(1), D)
            } else {
                if (R && R.nodeType !== 1 && R.nodeType !== 9) {
                    R = null
                }
            }
        }
        return R
    }

    function Q(R, S) {
        if (S.nodeType !== 9) {
            S = S.ownerDocument
        }
        return S.getElementById(R)
    }

    function L(S, R) {
        return R.getElementsByTagName(S)
    }(function () {
        var R = D.createElement("div");
        R.appendChild(D.createComment(""));
        if (R.getElementsByTagName(N).length > 0) {
            L = function (W, Y) {
                var U = Y.getElementsByTagName(W);
                if (W === N) {
                    var S = [],
                        T = 0,
                        V = 0,
                        X;
                    while ((X = U[T++])) {
                        if (X.nodeType === 1) {
                            S[V++] = X
                        }
                    }
                    U = S
                }
                return U
            }
        }
    })();

    function C(T, S, R) {
        var Y = R.getElementsByClassName(T),
            U = Y,
            W = 0,
            X = 0,
            V = Y.length,
            Z;
        if (S && S !== N) {
            U = [];
            S = S.toUpperCase();
            for (; W < V; ++W) {
                Z = Y[W];
                if (Z.tagName === S) {
                    U[X++] = Z
                }
            }
        }
        return U
    }
    if (!D.getElementsByClassName) {
        if (D.querySelectorAll) {
            C = function (S, T, R) {
                return R.querySelectorAll((T ? T : "") + "." + S)
            }
        } else {
            C = function (T, S, R) {
                var Z = R.getElementsByTagName(S || N),
                    V = [],
                    X = 0,
                    Y = 0,
                    W = Z.length,
                    a, U;
                T = F + T + F;
                for (; X < W; ++X) {
                    a = Z[X];
                    U = a.className;
                    if (U && (F + U + F).indexOf(T) > -1) {
                        V[Y++] = a
                    }
                }
                return V
            }
        }
    }

    function H(R) {
        K.error("Unsupported selector: " + R)
    }
    K.query = G;
    K.get = function (S, R) {
        return G(S, R)[0] || null
    };
    K.mix(B, {
        query: G,
        get: K.get,
        filter: function (W, R) {
            var U = G(W),
                S, X, V, T = [];
            if (K.isString(R) && (S = O.exec(R)) && !S[1]) {
                X = S[2];
                V = S[3];
                R = function (Y) {
                    return !((X && Y.tagName !== X.toUpperCase()) || (V && !B.hasClass(Y, V)))
                }
            }
            if (K.isFunction(R)) {
                T = K.filter(U, R)
            } else {
                if (R && K.ExternalSelector) {
                    T = K.ExternalSelector._filter(W, R + "")
                } else {
                    H(R)
                }
            }
            return T
        },
        test: function (T, R) {
            var S = G(T);
            return S.length && (B.filter(S, R).length === S.length)
        }
    })
});
KISSY.add("dom-data", function (G, I) {
    var E = window,
        A = G.DOM,
        B = "_ks_data_" + G.now(),
        H = {}, F = {}, C = {
            EMBED: 1,
            OBJECT: 1,
            APPLET: 1
        };
    G.mix(A, {
        data: function (N, P, L) {
            if (G.isPlainObject(P)) {
                for (var M in P) {
                    A.data(N, M, P[M])
                }
                return
            }
            if (L === I) {
                var O = G.get(N),
                    J, Q, R, K;
                if (!O || C[O.nodeName]) {
                    return
                }
                if (O == E) {
                    O = F
                }
                J = D(O);
                Q = J ? H : O;
                R = J ? O[B] : B;
                K = Q[R];
                if (G.isString(P) && K) {
                    return K[P]
                }
                return K
            } else {
                G.query(N).each(function (T) {
                    if (!T || C[T.nodeName]) {
                        return
                    }
                    if (T == E) {
                        T = F
                    }
                    var S = H,
                        U;
                    if (!D(T)) {
                        U = B;
                        S = T
                    } else {
                        if (!(U = T[B])) {
                            U = T[B] = G.guid()
                        }
                    } if (P && L !== I) {
                        if (!S[U]) {
                            S[U] = {}
                        }
                        S[U][P] = L
                    }
                })
            }
        },
        removeData: function (K, J) {
            G.query(K).each(function (P) {
                if (!P) {
                    return
                }
                if (P == E) {
                    P = F
                }
                var Q, M = H,
                    N, O = D(P);
                if (!O) {
                    M = P;
                    Q = B
                } else {
                    Q = P[B]
                } if (!Q) {
                    return
                }
                N = M[Q];
                if (J) {
                    if (N) {
                        delete N[J];
                        if (G.isEmptyObject(N)) {
                            A.removeData(P)
                        }
                    }
                } else {
                    if (!O) {
                        try {
                            delete P[B]
                        } catch (L) {}
                    } else {
                        if (P.removeAttribute) {
                            P.removeAttribute(B)
                        }
                    } if (O) {
                        delete M[Q]
                    }
                }
            })
        }
    });

    function D(J) {
        return J && J.nodeType
    }
});
KISSY.add("dom-class", function (A, D) {
    var E = " ",
        G = A.DOM,
        F = /[\.\s]\s*\.?/,
        C = /[\n\t]/g;
    A.mix(G, {
        hasClass: function (I, H) {
            return B(I, H, function (N, M, L) {
                var P = N.className;
                if (P) {
                    var O = E + P + E,
                        J = 0,
                        K = true;
                    for (; J < L; J++) {
                        if (O.indexOf(E + M[J] + E) < 0) {
                            K = false;
                            break
                        }
                    }
                    if (K) {
                        return true
                    }
                }
            }, true)
        },
        addClass: function (I, H) {
            B(I, H, function (O, M, L) {
                var J = O.className;
                if (!J) {
                    O.className = H
                } else {
                    var P = E + J + E,
                        N = J,
                        K = 0;
                    for (; K < L; K++) {
                        if (P.indexOf(E + M[K] + E) < 0) {
                            N += E + M[K]
                        }
                    }
                    O.className = A.trim(N)
                }
            })
        },
        removeClass: function (I, H) {
            B(I, H, function (O, M, L) {
                var J = O.className;
                if (J) {
                    if (!L) {
                        O.className = ""
                    } else {
                        var P = (E + J + E).replace(C, E),
                            K = 0,
                            N;
                        for (; K < L; K++) {
                            N = E + M[K] + E;
                            while (P.indexOf(N) >= 0) {
                                P = P.replace(N, E)
                            }
                        }
                        O.className = A.trim(P)
                    }
                }
            })
        },
        replaceClass: function (J, H, I) {
            G.removeClass(J, H);
            G.addClass(J, I)
        },
        toggleClass: function (L, H, I) {
            var J = A.isBoolean(I),
                K;
            B(L, H, function (O, N, M) {
                var Q = 0,
                    P;
                for (; Q < M; Q++) {
                    P = N[Q];
                    K = J ? !I : G.hasClass(O, P);
                    G[K ? "removeClass" : "addClass"](O, P)
                }
            })
        }
    });

    function B(N, H, I, J) {
        if (!(H = A.trim(H))) {
            return J ? false : D
        }
        var P = A.query(N),
            M = 0,
            L = P.length,
            Q = H.split(F),
            O, K;
        for (; M < L; M++) {
            O = P[M];
            if (G._isElementNode(O)) {
                K = I(O, Q, Q.length);
                if (K !== D) {
                    return K
                }
            }
        }
        if (J) {
            return false
        }
    }
});
KISSY.add("dom-attr", function (S, P) {
    var K = S.UA,
        B = document,
        D = B.documentElement,
        Q = !D.hasAttribute,
        G = D.textContent !== P ? "textContent" : "innerText",
        U = "select",
        A = "",
        C = "checked",
        O = "style",
        F = S.DOM,
        H = F._isElementNode,
        L = function (V) {
            return F._nodeTypeIs(V, 3)
        }, R = /^(?:href|src|style)/,
        N = /^(?:href|src|colspan|rowspan)/,
        J = /\r/g,
        E = /^(?:radio|checkbox)/,
        M = {
            readonly: "readOnly"
        }, T = {
            val: 1,
            css: 1,
            html: 1,
            text: 1,
            data: 1,
            width: 1,
            height: 1,
            offset: 1
        };
    if (Q) {
        S.mix(M, {
            "for": "htmlFor",
            "class": "className"
        })
    }
    S.mix(F, {
        attr: function (Y, b, a, W) {
            if (S.isPlainObject(b)) {
                W = a;
                for (var X in b) {
                    F.attr(Y, X, b[X], W)
                }
                return
            }
            if (!(b = S.trim(b))) {
                return
            }
            b = b.toLowerCase();
            if (W && T[b]) {
                return F[b](Y, a)
            }
            b = M[b] || b;
            if (a === P) {
                var Z = S.get(Y);
                if (!H(Z)) {
                    return P
                }
                var V;
                if (!R.test(b)) {
                    V = Z[b]
                }
                if (V === P) {
                    V = Z.getAttribute(b)
                }
                if (Q) {
                    if (N.test(b)) {
                        V = Z.getAttribute(b, 2)
                    } else {
                        if (b === O) {
                            V = Z[O].cssText
                        }
                    }
                }
                return V === null ? P : V
            }
            S.each(S.query(Y), function (c) {
                if (!H(c)) {
                    return
                }
                if (b === O) {
                    c[O].cssText = a
                } else {
                    if (b === C) {
                        c[b] = !! a
                    }
                    c.setAttribute(b, A + a)
                }
            })
        },
        removeAttr: function (W, V) {
            S.each(S.query(W), function (X) {
                if (H(X)) {
                    F.attr(X, V, A);
                    X.removeAttribute(V)
                }
            })
        },
        val: function (X, a) {
            if (a === P) {
                var c = S.get(X);
                if (!H(c)) {
                    return P
                }
                if (I("option", c)) {
                    return (c.attributes.value || {}).specified ? c.value : c.text
                }
                if (I(U, c)) {
                    var Z = c.selectedIndex,
                        b = c.options;
                    if (Z < 0) {
                        return null
                    } else {
                        if (c.type === "select-one") {
                            return F.val(b[Z])
                        }
                    }
                    var W = [],
                        V = 0,
                        Y = b.length;
                    for (; V < Y; ++V) {
                        if (b[V].selected) {
                            W.push(F.val(b[V]))
                        }
                    }
                    return W
                }
                if (K.webkit && E.test(c.type)) {
                    return c.getAttribute("value") === null ? "on" : c.value
                }
                return (c.value || A).replace(J, A)
            }
            S.each(S.query(X), function (f) {
                if (I(U, f)) {
                    if (S.isNumber(a)) {
                        a += A
                    }
                    var d = S.makeArray(a),
                        e = f.options,
                        g;
                    for (V = 0, Y = e.length; V < Y; ++V) {
                        g = e[V];
                        g.selected = S.inArray(F.val(g), d)
                    }
                    if (!d.length) {
                        f.selectedIndex = -1
                    }
                } else {
                    if (H(f)) {
                        f.value = a
                    }
                }
            })
        },
        text: function (X, V) {
            if (V === P) {
                var W = S.get(X);
                if (H(W)) {
                    return W[G] || A
                } else {
                    if (L(W)) {
                        return W.nodeValue
                    }
                }
            } else {
                S.each(S.query(X), function (Y) {
                    if (H(Y)) {
                        Y[G] = V
                    } else {
                        if (L(Y)) {
                            Y.nodeValue = V
                        }
                    }
                })
            }
        }
    });

    function I(V, W) {
        return W && W.nodeName.toUpperCase() === V.toUpperCase()
    }
});
KISSY.add("dom-style", function (W, V) {
    var G = W.DOM,
        O = W.UA,
        A = document,
        H = A.documentElement,
        T = "style",
        P = "float",
        D = "cssFloat",
        C = "styleFloat",
        X = "width",
        M = "height",
        N = "auto",
        L = "display",
        S = "none",
        I = parseInt,
        Q = /^(?:left|top)/,
        K = /^(?:width|height|top|left|right|bottom|margin|padding)/i,
        E = /-([a-z])/ig,
        F = function (a, b) {
            return b.toUpperCase()
        }, B = "",
        Z = "px",
        U = {}, R = {};
    W.mix(G, {
        _CUSTOM_STYLES: U,
        _getComputedStyle: function (d, a) {
            var b = "",
                c = d.ownerDocument;
            if (d[T]) {
                b = c.defaultView.getComputedStyle(d, null)[a]
            }
            return b
        },
        css: function (a, d, b) {
            if (W.isPlainObject(d)) {
                for (var f in d) {
                    G.css(a, f, d[f])
                }
                return
            }
            if (d.indexOf("-") > 0) {
                d = d.replace(E, F)
            }
            d = U[d] || d;
            if (b === V) {
                var c = W.get(a),
                    e = "";
                if (c && c[T]) {
                    e = d.get ? d.get(c) : c[T][d];
                    if (e === "" && !d.get) {
                        e = Y(c, d, G._getComputedStyle(c, d))
                    }
                }
                return e === V ? "" : e
            } else {
                if (b === null || b === B) {
                    b = B
                } else {
                    if (!isNaN(new Number(b)) && K.test(d)) {
                        b += Z
                    }
                } if ((d === X || d === M) && parseFloat(b) < 0) {
                    return
                }
                W.each(W.query(a), function (g) {
                    if (g && g[T]) {
                        d.set ? d.set(g, b) : (g[T][d] = b);
                        if (b === B) {
                            if (!g[T].cssText) {
                                g.removeAttribute(T)
                            }
                        }
                    }
                })
            }
        },
        width: function (a, b) {
            if (b === V) {
                return J(a, X)
            } else {
                G.css(a, X, b)
            }
        },
        height: function (a, b) {
            if (b === V) {
                return J(a, M)
            } else {
                G.css(a, M, b)
            }
        },
        show: function (a) {
            W.query(a).each(function (b) {
                if (!b) {
                    return
                }
                b.style[L] = G.data(b, L) || B;
                if (G.css(b, L) === S) {
                    var c = b.tagName,
                        e = R[c],
                        d;
                    if (!e) {
                        d = A.createElement(c);
                        A.body.appendChild(d);
                        e = G.css(d, L);
                        G.remove(d);
                        R[c] = e
                    }
                    G.data(b, L, e);
                    b.style[L] = e
                }
            })
        },
        hide: function (a) {
            W.query(a).each(function (b) {
                if (!b) {
                    return
                }
                var c = b.style,
                    d = c[L];
                if (d !== S) {
                    if (d) {
                        G.data(b, L, d)
                    }
                    c[L] = S
                }
            })
        },
        toggle: function (a) {
            W.query(a).each(function (b) {
                if (b) {
                    if (b.style[L] === S) {
                        G.show(b)
                    } else {
                        G.hide(b)
                    }
                }
            })
        },
        addStyleSheet: function (a, b) {
            var c;
            if (b && (b = b.replace("#", B))) {
                c = W.get("#" + b)
            }
            if (c) {
                return
            }
            c = G.create("<style>", {
                id: b
            });
            W.get("head").appendChild(c);
            if (c.styleSheet) {
                c.styleSheet.cssText = a
            } else {
                c.appendChild(A.createTextNode(a))
            }
        }
    });
    if (H[T][D] !== V) {
        U[P] = D
    } else {
        if (H[T][C] !== V) {
            U[P] = C
        }
    }

    function J(a, e) {
        var d = W.get(a),
            b = e === X ? ["Left", "Right"] : ["Top", "Bottom"],
            c = e === X ? d.offsetWidth : d.offsetHeight;
        W.each(b, function (f) {
            c -= parseFloat(G._getComputedStyle(d, "padding" + f)) || 0;
            c -= parseFloat(G._getComputedStyle(d, "border" + f + "Width")) || 0
        });
        return c
    }

    function Y(d, e, b) {
        var c, a = b;
        if (b === N && Q.test(e)) {
            a = 0;
            if (W.inArray(G.css(d, "position"), ["absolute", "fixed"])) {
                c = d[e === "left" ? "offsetLeft" : "offsetTop"];
                if (O.ie === 8 || O.opera) {
                    c -= I(G.css(d.offsetParent, "border-" + e + "-width")) || 0
                }
                a = c - (I(G.css(d, "margin-" + e)) || 0)
            }
        }
        return a
    }
});
KISSY.add("dom-style-ie", function (L, N) {
    if (!L.UA.ie) {
        return
    }
    var B = L.DOM,
        E = document,
        O = E.documentElement,
        C = "opacity",
        D = "filter",
        H = "filters",
        I = "currentStyle",
        F = "runtimeStyle",
        P = "left",
        M = "px",
        J = B._CUSTOM_STYLES,
        A = /^-?\d+(?:px)?$/i,
        K = /^-?\d/,
        Q = /^(?:width|height)$/;
    try {
        if (O.style[C] === N && O[H]) {
            J[C] = {
                get: function (T) {
                    var R = 100;
                    try {
                        R = T[H]["DXImageTransform.Microsoft.Alpha"][C]
                    } catch (S) {
                        try {
                            R = T[H]("alpha")[C]
                        } catch (U) {}
                    }
                    return R / 100 + ""
                },
                set: function (S, R) {
                    var T = S.style,
                        U = (S.currentStyle || 0).filter || "";
                    T.zoom = 1;
                    if (U) {
                        U = U.replace(/alpha\(opacity=.+\)/ig, "");
                        if (U) {
                            U += ", "
                        }
                    }
                    T[D] = U + "alpha(" + C + "=" + R * 100 + ")"
                }
            }
        }
    } catch (G) {
        L.log("IE filters ActiveX is disabled. ex = " + G)
    }
    if (!(E.defaultView || {}).getComputedStyle && O[I]) {
        B._getComputedStyle = function (S, U) {
            var T = S.style,
                V = S[I][U];
            if (Q.test(U)) {
                V = B[U](S) + M
            } else {
                if ((!A.test(V) && K.test(V))) {
                    var R = T[P],
                        W = S[F][P];
                    S[F][P] = S[I][P];
                    T[P] = U === "fontSize" ? "1em" : (V || 0);
                    V = T.pixelLeft + M;
                    T[P] = R;
                    S[F][P] = W
                }
            }
            return V
        }
    }
});
KISSY.add("dom-offset", function (AC, Z) {
    var F = AC.DOM,
        T = AC.UA,
        AD = window,
        M = document,
        Q = F._isElementNode,
        O = F._nodeTypeIs,
        J = F._getWin,
        W = M.compatMode === "CSS1Compat",
        G = Math.max,
        H = parseInt,
        S = "position",
        N = "relative",
        AA = "document",
        I = "body",
        R = "documentElement",
        K = "ownerDocument",
        X = "viewport",
        U = "scroll",
        AB = "client",
        V = "left",
        L = "top",
        Y = "scrollTo",
        D = U + "Left",
        E = U + "Top",
        AF = "getBoundingClientRect";
    AC.mix(F, {
        offset: function (B, A) {
            if (!(B = AC.get(B)) || !B[K]) {
                return null
            }
            if (A === Z) {
                return AE(B)
            }
            P(B, A)
        },
        scrollIntoView: function (C, i, e, B) {
            if (!(C = AC.get(C)) || !C[K]) {
                return
            }
            B = B === Z ? true : !! B;
            e = e === Z ? true : !! e;
            if (!i || i === AD) {
                return C.scrollIntoView(e)
            }
            i = AC.get(i);
            if (O(i, 9)) {
                i = J(i)
            }
            var k = i && (Y in i) && i[AA],
                m = F.offset(C),
                p = k ? {
                    left: F.scrollLeft(i),
                    top: F.scrollTop(i)
                } : F.offset(i),
                g = {
                    left: m[V] - p[V],
                    top: m[L] - p[L]
                }, j = k ? F.viewportHeight(i) : i.clientHeight,
                s = k ? F.viewportWidth(i) : i.clientWidth,
                n = F[D](i),
                q = F[E](i),
                o = n + s,
                d = q + j,
                r = C.offsetHeight,
                a = C.offsetWidth,
                b = g.left + n - (H(F.css(i, "borderLeftWidth")) || 0),
                h = g.top + q - (H(F.css(i, "borderTopWidth")) || 0),
                f = b + a,
                A = h + r,
                l, c;
            if (r > j || h < q || e) {
                l = h
            } else {
                if (A > d) {
                    l = A - j
                }
            } if (B) {
                if (a > s || b < n || e) {
                    c = b
                } else {
                    if (f > o) {
                        c = f - s
                    }
                }
            }
            if (k) {
                if (l !== Z || c !== Z) {
                    i[Y](c, l)
                }
            } else {
                if (l !== Z) {
                    i[E] = l
                }
                if (c !== Z) {
                    i[D] = c
                }
            }
        }
    });
    AC.each(["Left", "Top"], function (C, B) {
        var A = U + C;
        F[A] = function (b) {
            var c = 0,
                d = J(b),
                a;
            if (d && (a = d[AA])) {
                c = d[B ? "pageYOffset" : "pageXOffset"] || a[R][A] || a[I][A]
            } else {
                if (Q((b = AC.get(b)))) {
                    c = b[A]
                }
            }
            return c
        }
    });
    AC.each(["Width", "Height"], function (A) {
        F["doc" + A] = function (C) {
            var B = C || M;
            return G(W ? B[R][U + A] : B[I][U + A], F[X + A](B))
        };
        F[X + A] = function (a) {
            var B = "inner" + A,
                b = J(a),
                C = b[AA];
            return (B in b) ? b[B] : (W ? C[R][AB + A] : C[I][AB + A])
        }
    });

    function AE(B) {
        var C, b = 0,
            A = 0,
            a = J(B[K]);
        if (B[AF]) {
            C = B[AF]();
            b = C[V];
            A = C[L];
            if (T.mobile !== "apple") {
                b += F[D](a);
                A += F[E](a)
            }
        }
        return {
            left: b,
            top: A
        }
    }

    function P(C, A) {
        if (F.css(C, S) === "static") {
            C.style[S] = N
        }
        var c = AE(C),
            b = {}, B, a;
        for (a in A) {
            B = H(F.css(C, a), 10) || 0;
            b[a] = B + A[a] - c[a]
        }
        F.css(C, b)
    }
});
KISSY.add("dom-traversal", function (A, C) {
    var E = A.DOM,
        D = E._isElementNode;
    A.mix(E, {
        parent: function (H, G) {
            return F(H, G, "parentNode", function (I) {
                return I.nodeType != 11
            })
        },
        next: function (H, G) {
            return F(H, G, "nextSibling")
        },
        prev: function (H, G) {
            return F(H, G, "previousSibling")
        },
        siblings: function (H, G) {
            return B(H, G, true)
        },
        children: function (H, G) {
            return B(H, G)
        },
        contains: function (I, G) {
            var H = false;
            if ((I = A.get(I)) && (G = A.get(G))) {
                if (I.contains) {
                    if (G.nodeType === 3) {
                        G = G.parentNode;
                        if (G === I) {
                            return true
                        }
                    }
                    if (G) {
                        return I.contains(G)
                    }
                } else {
                    if (I.compareDocumentPosition) {
                        return !!(I.compareDocumentPosition(G) & 16)
                    } else {
                        while (!H && (G = G.parentNode)) {
                            H = G == I
                        }
                    }
                }
            }
            return H
        }
    });

    function F(I, K, H, J) {
        if (!(I = A.get(I))) {
            return null
        }
        if (K === C) {
            K = 1
        }
        var L = null,
            G, M;
        if (A.isNumber(K) && K >= 0) {
            if (K === 0) {
                return I
            }
            G = 0;
            M = K;
            K = function () {
                return ++G === M
            }
        }
        while ((I = I[H])) {
            if (D(I) && (!K || E.test(I, K)) && (!J || J(I))) {
                L = I;
                break
            }
        }
        return L
    }

    function B(K, N, G) {
        var I = [],
            M = A.get(K),
            J, L = M,
            H;
        if (M && G) {
            L = M.parentNode
        }
        if (L) {
            for (J = 0, H = L.firstChild; H; H = H.nextSibling) {
                if (D(H) && H !== M && (!N || E.test(H, N))) {
                    I[J++] = H
                }
            }
        }
        return I
    }
});
KISSY.add("dom-create", function (AA, Z) {
    var M = document,
        E = AA.DOM,
        V = AA.UA,
        T = V.ie,
        L = E._nodeTypeIs,
        O = E._isElementNode,
        J = E._isKSNode,
        K = "div",
        X = "parentNode",
        AD = M.createElement(K),
        H = /<(\w+)/,
        I = /<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/ig,
        p = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
        R = /\ssrc=(['"])(.*?)\1/i,
        G = /\scharset=(['"])(.*?)\1/i;
    AA.mix(E, {
        create: function (c, D, a) {
            if (L(c, 1) || L(c, 3)) {
                return Q(c)
            }
            if (J(c)) {
                return Q(c[0])
            }
            if (!(c = AA.trim(c))) {
                return null
            }
            var b = null,
                C = E._creators,
                e, B = K,
                d, A;
            if ((e = p.exec(c))) {
                b = (a || M).createElement(e[1])
            } else {
                if ((e = H.exec(c)) && (d = e[1]) && AA.isFunction(C[(d = d.toLowerCase())])) {
                    B = d
                }
                A = C[B](c, a).childNodes;
                if (A.length === 1) {
                    b = A[0][X].removeChild(A[0])
                } else {
                    b = U(A, a || M)
                }
            }
            return AB(b, D)
        },
        _creators: {
            div: function (B, C) {
                var A = C ? C.createElement(K) : AD;
                A.innerHTML = B;
                return A
            }
        },
        html: function (a, B, D, A) {
            if (B === Z) {
                var C = AA.get(a);
                if (O(C)) {
                    return C.innerHTML
                }
            } else {
                AA.each(AA.query(a), function (b) {
                    if (O(b)) {
                        F(b, B, D, A)
                    }
                })
            }
        },
        remove: function (A) {
            AA.each(AA.query(A), function (B) {
                if (O(B) && B.parentNode) {
                    B.parentNode.removeChild(B)
                }
            })
        }
    });

    function AB(A, B) {
        if (O(A) && AA.isPlainObject(B)) {
            E.attr(A, B, true)
        }
        return A
    }

    function U(D, B) {
        var C = null,
            A, a;
        if (D && (D.push || D.item) && D[0]) {
            B = B || D[0].ownerDocument;
            C = B.createDocumentFragment();
            if (D.item) {
                D = AA.makeArray(D)
            }
            for (A = 0, a = D.length; A < a; A++) {
                C.appendChild(D[A])
            }
        } else {
            AA.log("Unable to convert " + D + " to fragment.")
        }
        return C
    }

    function Q(A) {
        var B = A.cloneNode(true);
        if (V.ie < 8) {
            B.innerHTML = A.innerHTML
        }
        return B
    }

    function F(C, D, a, A) {
        if (!a) {
            AF(C, D);
            AA.isFunction(A) && A();
            return
        }
        var B = AA.guid("ks-tmp-"),
            b = new RegExp(I);
        D += '<span id="' + B + '"></span>';
        AA.available(B, function () {
            var g = AA.get("head"),
                j, c, d, e, i, h, f;
            b.lastIndex = 0;
            while ((j = b.exec(D))) {
                c = j[1];
                d = c ? c.match(R) : false;
                if (d && d[2]) {
                    h = M.createElement("script");
                    h.src = d[2];
                    if ((e = c.match(G)) && e[2]) {
                        h.charset = e[2]
                    }
                    h.async = true;
                    g.appendChild(h)
                } else {
                    if ((f = j[2]) && f.length > 0) {
                        AA.globalEval(f)
                    }
                }
            }(i = M.getElementById(B)) && E.remove(i);
            AA.isFunction(A) && A()
        });
        AF(C, D)
    }

    function AF(A, B) {
        B = (B + "").replace(I, "");
        try {
            A.innerHTML = B
        } catch (C) {
            while (A.firstChild) {
                A.removeChild(A.firstChild)
            }
            if (B) {
                A.appendChild(E.create(B))
            }
        }
    }
    if (T || V.gecko || V.webkit) {
        var Y = E._creators,
            W = E.create,
            N = "<table>",
            P = "</table>",
            AC = /(?:\/(?:thead|tfoot|caption|col|colgroup)>)+\s*<tbody/,
            AE = {
                option: "select",
                td: "tr",
                tr: "tbody",
                tbody: "table",
                col: "colgroup",
                legend: "fieldset"
            };
        for (var S in AE) {
            (function (A) {
                Y[S] = function (B, C) {
                    return W("<" + A + ">" + B + "</" + A + ">", null, C)
                }
            })(AE[S])
        }
        if (T) {
            Y.script = function (B, C) {
                var A = C ? C.createElement(K) : AD;
                A.innerHTML = "-" + B;
                A.removeChild(A.firstChild);
                return A
            };
            if (T < 8) {
                Y.tbody = function (B, C) {
                    var A = W(N + B + P, null, C),
                        D = A.children.tags("tbody")[0];
                    if (A.children.length > 1 && D && !AC.test(B)) {
                        D[X].removeChild(D)
                    }
                    return A
                }
            }
        }
        AA.mix(Y, {
            optgroup: Y.option,
            th: Y.td,
            thead: Y.tbody,
            tfoot: Y.tbody,
            caption: Y.tbody,
            colgroup: Y.tbody
        })
    }
});
KISSY.add("dom-insertion", function (A) {
    var D = A.DOM,
        C = "parentNode",
        B = "nextSibling";
    A.mix(D, {
        insertBefore: function (E, F) {
            if ((E = A.get(E)) && (F = A.get(F)) && F[C]) {
                F[C].insertBefore(E, F)
            }
            return E
        },
        insertAfter: function (E, F) {
            if ((E = A.get(E)) && (F = A.get(F)) && F[C]) {
                if (F[B]) {
                    F[C].insertBefore(E, F[B])
                } else {
                    F[C].appendChild(E)
                }
            }
            return E
        },
        append: function (E, F) {
            if ((E = A.get(E)) && (F = A.get(F))) {
                if (F.appendChild) {
                    F.appendChild(E)
                }
            }
        },
        prepend: function (E, F) {
            if ((E = A.get(E)) && (F = A.get(F))) {
                if (F.firstChild) {
                    D.insertBefore(E, F.firstChild)
                } else {
                    F.appendChild(E)
                }
            }
        }
    })
});
KISSY.add("event", function (N, O) {
    var D = document,
        A = N.DOM,
        E = D.addEventListener ? function (Q, R, S, T) {
            if (Q.addEventListener) {
                Q.addEventListener(R, S, !! T)
            }
        } : function (Q, R, S) {
            if (Q.attachEvent) {
                Q.attachEvent("on" + R, S)
            }
        }, H = D.removeEventListener ? function (Q, R, S, T) {
            if (Q.removeEventListener) {
                Q.removeEventListener(R, S, !! T)
            }
        } : function (Q, R, S) {
            if (Q.detachEvent) {
                Q.detachEvent("on" + R, S)
            }
        }, J = "ksEventTargetId",
        F = " ",
        G = N.now(),
        P = {};
    var B = {
        EVENT_GUID: J,
        special: {},
        add: function (Z, X, V, T) {
            if (M("add", Z, X, V, T)) {
                return
            }
            var Q = I(Z),
                R, Y, S, a, W, U;
            if (Q === -1 || !X || !N.isFunction(V)) {
                return
            }
            if (!Q) {
                K(Z, (Q = G++));
                P[Q] = {
                    target: Z,
                    events: {}
                }
            }
            S = P[Q].events;
            if (!S[X]) {
                R = !Z.isCustomEventTarget;
                Y = ((R || Z._supportSpecialEvent) && B.special[X]) || {};
                a = function (b, c) {
                    if (!b || !b.fixed) {
                        b = new N.EventObject(Z, b, X)
                    }
                    if (N.isPlainObject(c)) {
                        N.mix(b, c)
                    }
                    if (Y.setup) {
                        Y.setup(b)
                    }
                    return (Y.handle || B._handle)(Z, b, S[X].listeners)
                };
                S[X] = {
                    handle: a,
                    listeners: []
                };
                W = Y.fix || X;
                U = Y.capture;
                if (R) {
                    E(Z, W, a, U)
                } else {
                    if (Z._addEvent) {
                        Z._addEvent(W, a, U)
                    }
                }
            }
            S[X].listeners.push({
                fn: V,
                scope: T || Z
            })
        },
        remove: function (a, X, U, R) {
            if (M("remove", a, X, U, R)) {
                return
            }
            var T = I(a),
                d, V, W, c, Q, b, Y, S, Z;
            if (T === -1) {
                return
            }
            if (!T || !(Y = P[T])) {
                return
            }
            if (Y.target !== a) {
                return
            }
            R = R || a;
            d = Y.events || {};
            if ((V = d[X])) {
                W = V.listeners;
                b = W.length;
                if (N.isFunction(U) && b) {
                    for (c = 0, Q = 0, S = []; c < b; ++c) {
                        if (U !== W[c].fn || R !== W[c].scope) {
                            S[Q++] = W[c]
                        }
                    }
                    V.listeners = S;
                    b = S.length
                }
                if (U === O || b === 0) {
                    if (!a.isCustomEventTarget) {
                        Z = B.special[X] || {};
                        H(a, Z.fix || X, V.handle)
                    } else {
                        if (a._removeEvent) {
                            a._removeEvent(X, V.handle)
                        }
                    }
                    delete d[X]
                }
            }
            if (X === O || N.isEmptyObject(d)) {
                for (X in d) {
                    B.remove(a, X)
                }
                delete P[T];
                C(a)
            }
        },
        _handle: function (Q, S, T) {
            T = T.slice(0);
            var V, U = 0,
                W = T.length,
                R;
            for (; U < W; ++U) {
                R = T[U];
                V = R.fn.call(R.scope, S);
                if (V !== O) {
                    S.result = V;
                    if (V === false) {
                        S.halt()
                    }
                }
                if (S.isImmediatePropagationStopped) {
                    break
                }
            }
            return V
        },
        _getCache: function (Q) {
            return P[Q]
        },
        _simpleAdd: E,
        _simpleRemove: H
    };
    B.on = B.add;

    function M(U, V, S, Q, R) {
        if (N.isString(V)) {
            V = N.query(V)
        }
        if (N.isArray(V)) {
            N.each(V, function (W) {
                B[U](W, S, Q, R)
            });
            return true
        }
        if ((S = N.trim(S)) && S.indexOf(F) > 0) {
            N.each(S.split(F), function (W) {
                B[U](V, W, Q, R)
            });
            return true
        }
        if (V.getDOMNodes) {
            for (var T = 0; T < V.length; T++) {
                B[U](V.item(T), S, Q, R)
            }
            return true
        }
    }

    function I(Q) {
        return L(Q) ? A.data(Q, J) : -1
    }

    function K(R, Q) {
        if (L(R)) {
            A.data(R, J, Q)
        }
    }

    function C(Q) {
        A.removeData(Q, J)
    }

    function L(Q) {
        return Q && Q.nodeType !== 3 && Q.nodeType !== 8
    }
    N.Event = B
});
KISSY.add("event-object", function (B, C) {
    var D = document,
        E = "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" ");

    function A(F, G, H) {
        var I = this;
        I.currentTarget = F;
        I.originalEvent = G || {};
        if (G) {
            I.type = G.type;
            I._fix()
        } else {
            I.type = H;
            I.target = F
        } if (F.isCustomEventTarget) {
            if (B.DOM._isKSNode(F)) {
                I.target = new B.Node(I.target)
            }
        }
        I.currentTarget = F;
        I.fixed = true
    }
    B.augment(A, {
        _fix: function () {
            var J = this,
                L = J.originalEvent,
                K = E.length,
                M, H = J.currentTarget,
                I = (H.nodeType === 9) ? H : (H.ownerDocument || D);
            while (K) {
                M = E[--K];
                J[M] = L[M]
            }
            if (!J.target) {
                J.target = J.srcElement || D
            }
            if (J.target.nodeType === 3) {
                J.target = J.target.parentNode
            }
            if (!J.relatedTarget && J.fromElement) {
                J.relatedTarget = (J.fromElement === J.target) ? J.toElement : J.fromElement
            }
            if (J.pageX === C && J.clientX !== C) {
                var F = I.documentElement,
                    G = I.body;
                J.pageX = J.clientX + (F && F.scrollLeft || G && G.scrollLeft || 0) - (F && F.clientLeft || G && G.clientLeft || 0);
                J.pageY = J.clientY + (F && F.scrollTop || G && G.scrollTop || 0) - (F && F.clientTop || G && G.clientTop || 0)
            }
            if (J.which === C) {
                J.which = (J.charCode !== C) ? J.charCode : J.keyCode
            }
            if (J.metaKey === C) {
                J.metaKey = J.ctrlKey
            }
            if (!J.which && J.button !== C) {
                J.which = (J.button & 1 ? 1 : (J.button & 2 ? 3 : (J.button & 4 ? 2 : 0)))
            }
        },
        preventDefault: function () {
            var F = this.originalEvent;
            if (F.preventDefault) {
                F.preventDefault()
            } else {
                F.returnValue = false
            }
            this.isDefaultPrevented = true
        },
        stopPropagation: function () {
            var F = this.originalEvent;
            if (F.stopPropagation) {
                F.stopPropagation()
            } else {
                F.cancelBubble = true
            }
            this.isPropagationStopped = true
        },
        stopImmediatePropagation: function () {
            var F = this.originalEvent;
            if (F.stopImmediatePropagation) {
                F.stopImmediatePropagation()
            } else {
                this.stopPropagation()
            }
            this.isImmediatePropagationStopped = true
        },
        halt: function (F) {
            if (F) {
                this.stopImmediatePropagation()
            } else {
                this.stopPropagation()
            }
            this.preventDefault()
        }
    });
    B.EventObject = A
});
KISSY.add("event-target", function (A, C) {
    var B = A.Event;
    A.EventTarget = {
        isCustomEventTarget: true,
        fire: function (F, E) {
            var D = A.DOM.data(this, B.EVENT_GUID) || -1,
                I = B._getCache(D) || {}, G = I.events || {}, H = G[F];
            if (H && A.isFunction(H.handle)) {
                return H.handle(C, E)
            }
            return this
        },
        on: function (D, E, F) {
            B.add(this, D, E, F);
            return this
        },
        detach: function (D, E, F) {
            B.remove(this, D, E, F);
            return this
        }
    }
});
KISSY.add("event-mouseenter", function (A) {
    var B = A.Event;
    if (!A.UA.ie) {
        A.each([{
            name: "mouseenter",
            fix: "mouseover"
        }, {
            name: "mouseleave",
            fix: "mouseout"
        }], function (C) {
            B.special[C.name] = {
                fix: C.fix,
                setup: function (D) {
                    D.type = C.name
                },
                handle: function (F, E, G) {
                    if (A.DOM._isKSNode(F)) {
                        F = F[0]
                    }
                    var H = E.relatedTarget;
                    try {
                        while (H && H !== F) {
                            H = H.parentNode
                        }
                        if (H !== F) {
                            B._handle(F, E, G)
                        }
                    } catch (D) {
                        A.log(D)
                    }
                }
            }
        })
    }
});
KISSY.add("event-focusin", function (A) {
    var B = A.Event;
    if (document.addEventListener) {
        A.each([{
            name: "focusin",
            fix: "focus"
        }, {
            name: "focusout",
            fix: "blur"
        }], function (C) {
            B.special[C.name] = {
                fix: C.fix,
                capture: true,
                setup: function (D) {
                    D.type = C.name
                }
            }
        })
    }
});
KISSY.add("node", function (A) {
    var C = A.DOM;

    function B(F, D, G) {
        var H = this,
            E;
        if (!(H instanceof B)) {
            return new B(F, D, G)
        }
        if (!F) {
            H.length = 0;
            return
        }
        if (A.isString(F)) {
            E = C.create(F, D, G);
            if (E.nodeType === 11) {
                return new A.NodeList(E.childNodes)
            }
        } else {
            if (F instanceof B) {
                return F
            } else {
                E = F
            }
        }
        H[0] = E
    }
    B.TYPE = "-ks-Node";
    A.augment(B, {
        length: 1,
        getDOMNode: function () {
            return this[0]
        },
        nodeType: B.TYPE
    });
    A.one = function (F, E) {
        var D = A.get(F, E);
        return D ? new B(D) : null
    };
    A.Node = B
});
KISSY.add("nodelist", function (A) {
    var D = A.DOM,
        E = Array.prototype,
        C = D._isElementNode;

    function B(F) {
        if (!(this instanceof B)) {
            return new B(F)
        }
        E.push.apply(this, A.makeArray(F) || [])
    }
    A.mix(B.prototype, {
        length: 0,
        item: function (G) {
            var H = null,
                F, I;
            if (C(G)) {
                for (F = 0, I = this.length; F < I; F++) {
                    if (G === this[F]) {
                        G = F;
                        break
                    }
                }
            }
            if (C(this[G])) {
                H = new A.Node(this[G])
            }
            return H
        },
        getDOMNodes: function () {
            return E.slice.call(this)
        },
        each: function (G, H) {
            var J = this.length,
                I = 0,
                F;
            for (F = new A.Node(this[0]); I < J && G.call(H || F, F, I, this) !== false; F = new A.Node(this[++I])) {}
            return this
        }
    });
    A.all = function (G, F) {
        return new B(A.query(G, F, true))
    };
    A.NodeList = B
});
KISSY.add("node-attach", function (N, P) {
    var A = N.DOM,
        D = N.Event,
        I = A._nodeTypeIs,
        E = A._isKSNode,
        O = N.Node.prototype,
        Q = N.NodeList.prototype,
        L = "getDOMNode",
        M = L + "s",
        K = 1,
        H = 2,
        B = 4;

    function G(V, T, W, S) {
        var U = this[V ? M : L](),
            R = [U].concat(N.makeArray(T));
        if (T[W] === P) {
            return S.apply(A, R)
        } else {
            S.apply(A, R);
            return this
        }
    }

    function J(R, S) {
        N.each(R, function (T) {
            N.each([O, Q], function (U, V) {
                U[T] = (function (W) {
                    switch (S) {
                    case K:
                        return function () {
                            return G.call(this, V, arguments, 1, W)
                        };
                    case H:
                        return function () {
                            return G.call(this, V, arguments, 0, W)
                        };
                    case B:
                        return function () {
                            var X = this[V ? M : L](),
                                Y = W.apply(A, [X].concat(N.makeArray(arguments)));
                            return Y ? new N[N.isArray(Y) ? "NodeList" : "Node"](Y) : null
                        };
                    default:
                        return function () {
                            var X = this[V ? M : L](),
                                Y = W.apply(A, [X].concat(N.makeArray(arguments)));
                            return Y === P ? this : Y
                        }
                    }
                })(A[T])
            })
        })
    }
    N.mix(O, {
        one: function (R) {
            return N.one(R, this[0])
        },
        all: function (R) {
            return N.all(R, this[0])
        }
    });
    J(["data", "removeData"], K);
    J(["hasClass", "addClass", "removeClass", "replaceClass", "toggleClass"]);
    J(["attr", "removeAttr"], K);
    J(["val", "text"], H);
    J(["css"], K);
    J(["width", "height"], H);
    J(["offset"], H);
    J(["scrollIntoView"]);
    J(["parent", "next", "prev", "siblings", "children"], B);
    J(["contains"]);
    J(["html"], H);
    J(["remove"]);
    N.each(["insertBefore", "insertAfter"], function (R) {
        O[R] = function (S) {
            A[R].call(A, this[0], S);
            return this
        }
    });
    N.each([O, Q], function (R, S) {
        N.each(["append", "prepend"], function (T) {
            R[T] = function (U) {
                return C.call(this, U, S, T)
            };
            R[T + "To"] = function (U) {
                return F.call(this, U, T)
            }
        })
    });

    function C(R, T, S) {
        if (R) {
            N.each(this, function (U) {
                var V;
                if (T || N.isString(R)) {
                    V = A.create(R)
                } else {
                    if (I(R, 1) || I(R, 3)) {
                        V = R
                    }
                    if (E(R)) {
                        V = R[0]
                    }
                }
                A[S](V, U)
            })
        }
        return this
    }

    function F(R, S) {
        if ((R = N.get(R)) && R.appendChild) {
            N.each(this, function (T) {
                A[S](T, R)
            })
        }
        return this
    }
    N.mix(O, N.EventTarget);
    O._supportSpecialEvent = true;
    O._addEvent = function (S, R, T) {
        D._simpleAdd(this[0], S, R, T)
    };
    O._removeEvent = function (S, R, T) {
        D._simpleRemove(this[0], S, R, T)
    };
    delete O.fire;
    N.mix(Q, N.EventTarget);
    delete Q.fire
});
if (!this.JSON) {
    this.JSON = {}
}(function () {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null"
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === "string") {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());
KISSY.add("json", function (B) {
    var A = window.JSON;
    B.JSON = {
        parse: function (C) {
            if (C == null || C === "") {
                return null
            }
            return A.parse(C)
        },
        stringify: A.stringify
    }
});
KISSY.add("ajax", function (R, X) {
    var S = window,
        U = function () {}, B = "GET",
        Y = "POST",
        G = "Content-Type",
        V = "json",
        J = V + "p",
        M = "script",
        P = "callback",
        L = "",
        F = "start",
        H = "send",
        AA = "stop",
        C = "success",
        I = "complete",
        Q = "error",
        AB = "timeout",
        E = "parsererror",
        K = {
            type: B,
            url: L,
            contentType: "application/x-www-form-urlencoded",
            async: true,
            data: null,
            xhr: S.ActiveXObject ? function () {
                if (S.XmlHttpRequest) {
                    try {
                        return new S.XMLHttpRequest()
                    } catch (A) {}
                }
                try {
                    return new S.ActiveXObject("Microsoft.XMLHTTP")
                } catch (a) {}
            } : function () {
                return new S.XMLHttpRequest()
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            },
            jsonp: P
        };

    function O(f) {
        f = R.merge(K, f);
        if (!f.url) {
            return
        }
        if (f.data && !R.isString(f.data)) {
            f.data = R.param(f.data)
        }
        f.context = f.context || f;
        var d, i = C,
            h, e = f.type.toUpperCase(),
            b;
        if (f.dataType === J) {
            d = f.jsonpCallback || J + R.now();
            f.url = T(f.url, f.jsonp + "=" + d);
            f.dataType = M;
            var A = S[d];
            S[d] = function (j) {
                if (R.isFunction(A)) {
                    A(j)
                } else {
                    S[d] = X;
                    try {
                        delete S[d]
                    } catch (k) {}
                }
                N([C, I], j, i, c, f)
            }
        }
        if (f.data && e === B) {
            f.url = T(f.url, f.data)
        }
        if (f.dataType === M) {
            D(F, f);
            b = R.getScript(f.url, d ? null : function () {
                N([C, I], L, i, c, f)
            });
            D(H, f);
            return b
        }
        var a = false,
            c = f.xhr();
        D(F, f);
        c.open(e, f.url, f.async);
        try {
            if (f.data || f.contentType) {
                c.setRequestHeader(G, f.contentType)
            }
            c.setRequestHeader("Accept", f.dataType && f.accepts[f.dataType] ? f.accepts[f.dataType] + ", */*; q=0.01" : f.accepts._default)
        } catch (g) {}
        c.onreadystatechange = function (j) {
            if (!c || c.readyState === 0 || j === "abort") {
                if (!a) {
                    N(I, null, Q, c, f)
                }
                a = true;
                if (c) {
                    c.onreadystatechange = U
                }
            } else {
                if (!a && c && (c.readyState === 4 || j === AB)) {
                    a = true;
                    c.onreadystatechange = U;
                    i = (j === AB) ? AB : W(c) ? C : Q;
                    try {
                        h = Z(c, f.dataType)
                    } catch (k) {
                        i = E
                    }
                    N([i === C ? C : Q, I], h, i, c, f);
                    if (j === AB) {
                        c.abort();
                        D(AA, f)
                    }
                    if (f.async) {
                        c = null
                    }
                }
            }
        };
        D(H, f);
        try {
            c.send(e === Y ? f.data : null)
        } catch (g) {
            N([Q, I], h, Q, c, f)
        }
        if (!f.async) {
            D(I, f)
        }
        return c
    }
    R.mix(O, R.EventTarget);
    R.mix(O, {
        get: function (c, a, A, d, b) {
            if (R.isFunction(a)) {
                d = A;
                A = a
            }
            return O({
                type: b || B,
                url: c,
                data: a,
                success: function (g, e, f) {
                    A && A.call(this, g, e, f)
                },
                dataType: d
            })
        },
        post: function (b, a, A, c) {
            if (R.isFunction(a)) {
                c = A;
                A = a;
                a = X
            }
            return O.get(b, a, A, c, Y)
        },
        jsonp: function (b, a, A) {
            if (R.isFunction(a)) {
                A = a;
                a = null
            }
            return O.get(b, a, A, J)
        }
    });
    O.getScript = R.getScript;
    R.io = R.ajax = O.ajax = O;
    R.jsonp = O.jsonp;
    R.IO = O;

    function W(A) {
        try {
            return A.status >= 200 && A.status < 300 || A.status === 304 || A.status === 1223
        } catch (a) {}
        return false
    }

    function T(a, A) {
        return a + (a.indexOf("?") === -1 ? "?" : "&") + A
    }

    function N(c, b, d, a, A) {
        if (R.isArray(c)) {
            R.each(c, function (e) {
                N(e, b, d, a, A)
            })
        } else {
            if (d === c && A[c]) {
                A[c].call(A.context, b, d, a)
            }
            D(c, A)
        }
    }

    function D(A, a) {
        O.fire(A, {
            ajaxConfig: a
        })
    }

    function Z(A, b) {
        var c = L,
            d, a = A;
        if (!R.isString(a)) {
            c = A.getResponseHeader(G) || L;
            d = b === "xml" || !b && c.indexOf("xml") >= 0;
            a = d ? A.responseXML : A.responseText;
            if (d && a.documentElement.nodeName === E) {
                throw E
            }
        }
        if (R.isString(a)) {
            if (b === V || !b && c.indexOf(V) >= 0) {
                a = R.JSON.parse(a)
            }
        }
        return a
    }
});
KISSY.add("anim-easing", function (G) {
    var C = Math,
        D = C.PI,
        F = C.pow,
        B = C.sin,
        A = 1.70158,
        E = {
            easeNone: function (H) {
                return H
            },
            easeIn: function (H) {
                return H * H
            },
            easeOut: function (H) {
                return (2 - H) * H
            },
            easeBoth: function (H) {
                return (H *= 2) < 1 ? 0.5 * H * H : 0.5 * (1 - (--H) * (H - 2))
            },
            easeInStrong: function (H) {
                return H * H * H * H
            },
            easeOutStrong: function (H) {
                return 1 - (--H) * H * H * H
            },
            easeBothStrong: function (H) {
                return (H *= 2) < 1 ? 0.5 * H * H * H * H : 0.5 * (2 - (H -= 2) * H * H * H)
            },
            elasticIn: function (J) {
                var H = 0.3,
                    I = H / 4;
                if (J === 0 || J === 1) {
                    return J
                }
                return -(F(2, 10 * (J -= 1)) * B((J - I) * (2 * D) / H))
            },
            elasticOut: function (J) {
                var H = 0.3,
                    I = H / 4;
                if (J === 0 || J === 1) {
                    return J
                }
                return F(2, -10 * J) * B((J - I) * (2 * D) / H) + 1
            },
            elasticBoth: function (J) {
                var H = 0.45,
                    I = H / 4;
                if (J === 0 || (J *= 2) === 2) {
                    return J
                }
                if (J < 1) {
                    return -0.5 * (F(2, 10 * (J -= 1)) * B((J - I) * (2 * D) / H))
                }
                return F(2, -10 * (J -= 1)) * B((J - I) * (2 * D) / H) * 0.5 + 1
            },
            backIn: function (H) {
                if (H === 1) {
                    H -= 0.001
                }
                return H * H * ((A + 1) * H - A)
            },
            backOut: function (H) {
                return (H -= 1) * H * ((A + 1) * H + A) + 1
            },
            backBoth: function (H) {
                if ((H *= 2) < 1) {
                    return 0.5 * (H * H * (((A *= (1.525)) + 1) * H - A))
                }
                return 0.5 * ((H -= 2) * H * (((A *= (1.525)) + 1) * H + A) + 2)
            },
            bounceIn: function (H) {
                return 1 - E.bounceOut(1 - H)
            },
            bounceOut: function (J) {
                var I = 7.5625,
                    H;
                if (J < (1 / 2.75)) {
                    H = I * J * J
                } else {
                    if (J < (2 / 2.75)) {
                        H = I * (J -= (1.5 / 2.75)) * J + 0.75
                    } else {
                        if (J < (2.5 / 2.75)) {
                            H = I * (J -= (2.25 / 2.75)) * J + 0.9375
                        } else {
                            H = I * (J -= (2.625 / 2.75)) * J + 0.984375
                        }
                    }
                }
                return H
            },
            bounceBoth: function (H) {
                if (H < 0.5) {
                    return E.bounceIn(H * 2) * 0.5
                }
                return E.bounceOut(H * 2 - 1) * 0.5 + 0.5
            }
        };
    E.NativeTimeFunction = {
        easeNone: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeBoth: "ease-in-out",
        easeInStrong: "cubic-bezier(0.9, 0.0, 0.9, 0.5)",
        easeOutStrong: "cubic-bezier(0.1, 0.5, 0.1, 1.0)",
        easeBothStrong: "cubic-bezier(0.9, 0.0, 0.1, 1.0)"
    };
    G.Easing = E
});
KISSY.add("anim", function (S, Q) {
    var D = S.DOM,
        V = S.Easing,
        R = parseFloat,
        U = D.create("<div>"),
        G = ("backgroundColor borderBottomColor borderBottomWidth borderBottomStyle borderLeftColor borderLeftWidth borderLeftStyle borderRightColor borderRightWidth borderRightStyle borderSpacing borderTopColor borderTopWidth borderTopStyle bottom color font fontFamily fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex").split(" "),
        E = 13,
        F = "opacity",
        N = "none",
        B = "Property",
        C = "start",
        M = "step",
        O = "complete",
        L = {
            duration: 1,
            easing: "easeNone",
            nativeSupport: true
        };

    function A(b, X, a, Y, e, Z) {
        if (!(b = S.get(b))) {
            return
        }
        if (!(this instanceof A)) {
            return new A(b, X, a, Y, e, Z)
        }
        var d = this,
            g = S.isPlainObject(a),
            f = X,
            c;
        d.domEl = b;
        if (S.isPlainObject(f)) {
            f = S.param(f, ";").replace(/=/g, ":").replace(/%23/g, "#").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
        }
        d.props = I(f);
        d.targetStyle = f;
        if (g) {
            c = S.merge(L, a)
        } else {
            c = S.clone(L);
            if (a) {
                (c.duration = R(a) || 1)
            }
            if (S.isString(Y) || S.isFunction(Y)) {
                c.easing = Y
            }
            if (S.isFunction(e)) {
                c.complete = e
            }
            if (Z !== Q) {
                c.nativeSupport = Z
            }
        }
        d.config = c;
        if (c.nativeSupport && H() && S.isString((Y = c.easing))) {
            if (/cubic-bezier\([\s\d.,]+\)/.test(Y) || (Y = V.NativeTimeFunction[Y])) {
                c.easing = Y;
                d.transitionName = H()
            }
        }
        if (S.isFunction(e)) {
            d.on(O, e)
        }
    }
    S.augment(A, S.EventTarget, {
        run: function () {
            var d = this,
                a = d.config,
                Z = d.domEl,
                X, f, b, e, h = d.props,
                g = {}, c, Y;
            for (c in h) {
                g[c] = J(D.css(Z, c))
            }
            if (d.fire(C) === false) {
                return
            }
            d.stop();
            if (d.transitionName) {
                d._nativeRun()
            } else {
                X = a.duration * 1000;
                b = S.now();
                e = b + X;
                f = a.easing;
                if (S.isString(f)) {
                    f = V[f] || V.easeNone
                }
                d.timer = S.later((Y = function () {
                    var i = S.now(),
                        k = i > e ? 1 : (i - b) / X,
                        j, m, l;
                    for (c in h) {
                        j = g[c];
                        m = h[c];
                        if (m.v == 0) {
                            m.u = j.u
                        }
                        if (j.u !== m.u) {
                            j.v = 0
                        }
                        D.css(Z, c, m.f(j.v, m.v, f(k)) + m.u)
                    }
                    if ((d.fire(M) === false) || (l = i > e)) {
                        d.stop();
                        if (l) {
                            d.fire(O)
                        }
                    }
                }), E, true);
                Y()
            }
            return d
        },
        _nativeRun: function () {
            var Y = this,
                e = Y.config,
                c = Y.domEl,
                b = Y.props,
                d = e.duration * 1000,
                Z = e.easing,
                X = Y.transitionName,
                a = {};
            S.log("Amin uses native transition.");
            a[X + "Property"] = "all";
            a[X + "Duration"] = d + "ms";
            a[X + "TimingFunction"] = Z;
            D.css(c, a);
            S.later(function () {
                T(c, b, Y.targetStyle)
            }, 0);
            S.later(function () {
                Y.stop(true)
            }, d)
        },
        stop: function (Y) {
            var X = this;
            if (X.transitionName) {
                X._nativeStop(Y)
            } else {
                if (X.timer) {
                    X.timer.cancel();
                    X.timer = Q
                }
                if (Y) {
                    T(X.domEl, X.props, X.targetStyle);
                    X.fire(O)
                }
            }
            return X
        },
        _nativeStop: function (c) {
            var Y = this,
                X = Y.domEl,
                b = Y.transitionName,
                a = Y.props,
                Z;
            if (c) {
                D.css(X, b + B, N);
                Y.fire(O)
            } else {
                for (Z in a) {
                    D.css(X, Z, D._getComputedStyle(X, Z))
                }
                D.css(X, b + B, N)
            }
        }
    });
    A.supportTransition = function () {
        return !!H()
    };
    S.Anim = A;

    function H() {
        var X = "transition",
            Y;
        if (U.style[X] !== Q) {
            Y = X
        } else {
            S.each(["Webkit", "Moz", "O"], function (Z) {
                if (U.style[(X = Z + "Transition")] !== Q) {
                    Y = X;
                    return false
                }
            })
        }
        H = function () {
            return Y
        };
        return Y
    }

    function T(Y, Z, X) {
        if (S.UA.ie && X.indexOf(F) > -1) {
            D.css(Y, F, Z[F].v)
        }
        Y.style.cssText += ";" + X
    }

    function I(X) {
        var Z, b = {}, a = G.length,
            Y;
        U.innerHTML = '<div style="' + X + '"></div>';
        Z = U.firstChild.style;
        while (a--) {
            if ((Y = Z[G[a]])) {
                b[G[a]] = J(Y)
            }
        }
        return b
    }

    function J(Y) {
        var X = R(Y),
            Z = (Y + "").replace(/^[-\d.]+/, "");
        return isNaN(X) ? {
            v: Z,
            u: "",
            f: W
        } : {
            v: X,
            u: Z,
            f: P
        }
    }

    function P(X, Z, Y) {
        return (X + (Z - X) * Y).toFixed(3)
    }

    function W(c, Y, f) {
        var a = 2,
            b, X, Z, d = [],
            e = [];
        while (b = 3, X = arguments[a - 1], a--) {
            if (K(X, 0, 4) === "rgb(") {
                X = X.match(/\d+/g);
                while (b--) {
                    d.push(~~X[b])
                }
            } else {
                if (K(X, 0) === "#") {
                    if (X.length === 4) {
                        X = "#" + K(X, 1) + K(X, 1) + K(X, 2) + K(X, 2) + K(X, 3) + K(X, 3)
                    }
                    while (b--) {
                        d.push(parseInt(K(X, 1 + b * 2, 2), 16))
                    }
                } else {
                    return Y
                }
            }
        }
        while (b--) {
            Z = ~~ (d[b + 3] + (d[b] - d[b + 3]) * f);
            e.push(Z < 0 ? 0 : Z > 255 ? 255 : Z)
        }
        return "rgb(" + e.join(",") + ")"
    }

    function K(Z, X, Y) {
        return Z.substr(X, Y || 1)
    }
});
KISSY.add("anim-node-plugin", function (J, N) {
    var A = J.DOM,
        E = J.Anim,
        K = J.Node.prototype,
        P = J.NodeList.prototype,
        L = "display",
        F = "none",
        I = "overflow",
        O = "hidden",
        H = "opacity",
        G = "height",
        C = "width",
        B = "auto",
        D = {
            show: [I, H, G, C],
            fade: [H],
            slide: [I, G]
        };
    J.each([K, P], function (Q) {
        Q.animate = function () {
            var R = J.makeArray(arguments);
            J.each(this, function (S) {
                E.apply(N, [S].concat(R)).run()
            });
            return this
        };
        J.each({
            show: ["show", 1],
            hide: ["show", 0],
            toggle: ["toggle"],
            fadeIn: ["fade", 1],
            fadeOut: ["fade", 0],
            slideDown: ["slide", 1],
            slideUp: ["slide", 0]
        }, function (R, S) {
            Q[S] = function (U, T) {
                if (A[S] && arguments.length === 0) {
                    A[S](this)
                } else {
                    J.each(this, function (V) {
                        M(V, R[0], U, T, R[1])
                    })
                }
                return this
            }
        })
    });

    function M(V, S, U, Q, T) {
        if (S === "toggle") {
            T = A.css(V, L) === F ? 1 : 0;
            S = "show"
        }
        if (T) {
            A.css(V, L, A.data(V, L) || "")
        }
        var R = {}, W = {};
        J.each(D[S], function (X) {
            if (X === I) {
                R[I] = A.css(V, I);
                A.css(V, I, O)
            } else {
                if (X === H) {
                    R[H] = A.css(V, H);
                    W.opacity = T ? 1 : 0;
                    if (T) {
                        A.css(V, H, 0)
                    }
                } else {
                    if (X === G) {
                        R[G] = A.css(V, G);
                        W.height = (T ? A.css(V, G) || V.naturalHeight : 0);
                        if (T) {
                            A.css(V, G, 0)
                        }
                    } else {
                        if (X === C) {
                            R[C] = A.css(V, C);
                            W.width = (T ? A.css(V, C) || V.naturalWidth : 0);
                            if (T) {
                                A.css(V, C, 0)
                            }
                        }
                    }
                }
            }
        });
        new J.Anim(V, W, U, "easeOut", function () {
            if (!T) {
                var X = V.style,
                    Y = X[L];
                if (Y !== F) {
                    if (Y) {
                        A.data(V, L, Y)
                    }
                    X[L] = F
                }
                if (R[G]) {
                    A.css(V, {
                        height: R[G]
                    })
                }
                if (R[C]) {
                    A.css(V, {
                        width: R[C]
                    })
                }
                if (R[H]) {
                    A.css(V, {
                        opacity: R[H]
                    })
                }
                if (R[I]) {
                    A.css(V, {
                        overflow: R[I]
                    })
                }
            }
            if (Q && J.isFunction(Q)) {
                Q()
            }
        }).run()
    }
});
KISSY.add("cookie", function (B) {
    var C = document,
        E = encodeURIComponent,
        D = decodeURIComponent;
    B.Cookie = {
        get: function (F) {
            var G, H;
            if (A(F)) {
                if ((H = C.cookie.match("(?:^| )" + F + "(?:(?:=([^;]*))|;|$)"))) {
                    G = H[1] ? D(H[1]) : ""
                }
            }
            return G
        },
        set: function (K, F, M, J, H, I) {
            var G = E(F),
                L = M;
            if (typeof L === "number") {
                L = new Date();
                L.setTime(L.getTime() + M * 86400000)
            }
            if (L instanceof Date) {
                G += "; expires=" + L.toUTCString()
            }
            if (A(J)) {
                G += "; domain=" + J
            }
            if (A(H)) {
                G += "; path=" + H
            }
            if (I) {
                G += "; secure"
            }
            C.cookie = K + "=" + G
        },
        remove: function (I, H, F, G) {
            this.set(I, "", 0, H, F, G)
        }
    };

    function A(F) {
        return B.isString(F) && F !== ""
    }
});
KISSY.add("attribute", function (A, C) {
    function B() {
        this.__attrs = {};
        this.__attrVals = {}
    }
    A.augment(B, {
        __getDefAttrs: function () {
            return A.clone(this.__attrs)
        },
        addAttr: function (G, F) {
            var E = this;
            E.__attrs[G] = A.clone(F || {});
            return E
        },
        addAttrs: function (F, G) {
            var E = this;
            A.each(F, function (H, I) {
                if (I in G) {
                    H.value = G[I]
                }
                E.addAttr(I, H)
            });
            return E
        },
        hasAttr: function (E) {
            return E && (E in (this.__attrs || {}))
        },
        removeAttr: function (F) {
            var E = this;
            if (E.hasAttr(F)) {
                delete E.__attrs[F];
                delete E.__attrVals[F]
            }
            return E
        },
        set: function (H, F) {
            var G = this,
                E = G.get(H);
            if (E === F) {
                return
            }
            if (false === G.__fireAttrChange("before", H, E, F)) {
                return
            }
            G.__set(H, F);
            G.__fireAttrChange("after", H, E, G.__attrVals[H]);
            return G
        },
        __fireAttrChange: function (H, F, E, G) {
            return this.fire(H + D(F) + "Change", {
                attrName: F,
                prevVal: E,
                newVal: G
            })
        },
        __set: function (J, G) {
            var H = this,
                F, I = H.__attrs[J],
                E = I && I.setter;
            if (E) {
                F = E.call(H, G)
            }
            if (F !== C) {
                G = F
            }
            H.__attrVals[J] = G
        },
        get: function (G) {
            var E = this,
                F, I, H;
            F = E.__attrs[G];
            I = F && F.getter;
            H = G in E.__attrVals ? E.__attrVals[G] : E.__getDefAttrVal(G);
            if (I) {
                H = I.call(E, H)
            }
            return H
        },
        __getDefAttrVal: function (H) {
            var F = this,
                G = F.__attrs[H],
                I, E;
            if (!G) {
                return
            }
            if ((I = G.valueFn)) {
                E = I.call(F);
                if (E !== C) {
                    G.value = E
                }
                delete G.valueFn
            }
            return G.value
        },
        reset: function (F) {
            var E = this;
            if (E.hasAttr(F)) {
                return E.set(F, E.__getDefAttrVal(F))
            }
            for (F in E.__attrs) {
                if (E.hasAttr(F)) {
                    E.reset(F)
                }
            }
            return E
        }
    });
    A.Attribute = B;

    function D(E) {
        E = E + "";
        return E.charAt(0).toUpperCase() + E.substring(1)
    }
    B.__capitalFirst = D
});
KISSY.add("base", function (C) {
    function D(F) {
        C.Attribute.call(this);
        var E = this.constructor;
        while (E) {
            A(this, E.ATTRS);
            E = E.superclass ? E.superclass.constructor : null
        }
        B(this, F)
    }

    function A(E, F) {
        if (F) {
            for (var G in F) {
                if (F.hasOwnProperty(G) && !E.hasAttr(G)) {
                    E.addAttr(G, F[G])
                }
            }
        }
    }

    function B(E, F) {
        if (F) {
            for (var G in F) {
                if (F.hasOwnProperty(G)) {
                    E.__set(G, F[G])
                }
            }
        }
    }
    C.augment(D, C.EventTarget, C.Attribute);
    C.Base = D
});
KISSY.add("core"); /*publish time:2011-09-15 13:32:22*/
var TB = KISSY.app("TB");
TB.add("mod~global", function () {
    var AL = KISSY,
        AF = !"0" [0],
        U = AF && !window.XMLHttpRequest,
        S = !! window.ActiveXObject,
        N = document,
        AM = window,
        AE, W, AG = " ",
        AB = "hover",
        AI, O = "g_config" in AM ? ("appId" in AM.g_config ? parseInt(AM.g_config.appId) : undefined) : undefined,
        AP = "mini-cart",
        AH = "mini-cart-no-layer",
        AC = location.hostname.split("."),
        M = N.domain,
        AN = M.indexOf("tmall.com") > -1,
        K = !(M.indexOf("taobao.com") > -1 || AN),
        Y = K ? ".daily.taobao.net" : ".taobao.com",
        Q = "",
        J = (N.location.href.indexOf("https://") === 0),
        V = {}, AO = {
            siteNav: function () {
                if (!AI) {
                    return
                }
                AI.setAttribute("role", "navigation");
                AL.each(R("menu", "*", AI), function (B) {
                    TB.Global._addMenu(B)
                });
                var A = N.forms.topSearch;
                L(A, "submit", function () {
                    if (A.q.value == Q) {
                        A.action = "http://list.taobao.com/browse/cat-0.htm"
                    }
                })
            },
            tDog: function () {
                if ((O && O != -1) || "tstart" in W || "tdog" in W) {
                    var B = "http://" + AE + "/p/header/webww-min.js?t=20110629.js",
                        A = 0;
                    AL.ready(function () {
                        if (AL.DOM) {
                            AL.getScript(B)
                        } else {
                            AL.log("webww: try " + A);
                            if (A < 10) {
                                setTimeout(arguments.callee, 1000);
                                A++
                            } else {
                                AL.use("core", function () {
                                    AL.getScript(B)
                                })
                            }
                        }
                    })
                }
            },
            tLabs: function () {
                if (!TB.Global.isLogin()) {
                    return
                }
                if (location.href.indexOf("tms.taobao.com") !== -1) {
                    return
                }
                AL.ready(function () {
                    var A = "http://" + AE + "/p/tlabs/1.0.0/tlabs-min.js?t=1.0.0.js",
                        B = T("_nk_") || T("tracknick");
                    B = encodeURIComponent(P(unescape(B.replace(/\\u/g, "%u"))));
                    AL.getScript(A, function () {
                        if (typeof TLabs !== "undefined") {
                            TLabs.init({
                                nick: B
                            })
                        }
                    })
                })
            },
            POCMonitor: function () {
                var D = AM._poc || [],
                    E, B = 0,
                    C = [
                        ["_setStartTime", (AM.g_config || 0).startTime || AM.HUBBLE_st || AM.g_ks_monitor_st],
                        ["_setAccount", (AM.g_config || 0).appId]
                    ],
                    A = 10000;
                while ((E = D[B++])) {
                    if (E[0] === "_setRate") {
                        A = E[1]
                    } else {
                        if (E[0] === "_setAccount") {
                            C[0] = E
                        } else {
                            if (E[0] === "_setStartTime") {
                                C[1] = E
                            } else {
                                C.push(E)
                            }
                        }
                    }
                }
                if (C[0][1] && parseInt(Math.random() * A) === 0) {
                    AM._poc = C;
                    AL.getScript("http://a.tbcdn.cn/p/poc/m.js?0.0.1.js")
                }
            },
            initHeaderLinks: function () {
                if (M.indexOf(".taobao.net") === -1) {
                    return
                }
                var A = AI ? AI.getElementsByTagName("a") : [],
                    B = 0,
                    C = A.length,
                    D = AC;
                while (D.length > 3) {
                    D.shift()
                }
                D = D.join(".");
                for (; B < C; B++) {
                    A[B].href = A[B].href.replace("taobao.com", D)
                }
            },
            initLogout: function () {
                var A = N.getElementById("#J_Logout");
                if (!A) {
                    return
                }
                L(A, "click", function (B) {
                    B.halt();
                    var C = A.href;
                    new Image().src = "//taobao.alipay.com/user/logout.htm";
                    setTimeout(function () {
                        location.href = C
                    }, 20)
                })
            },
            initSiteNav: function () {
                var B = N.getElementById("J_Service"),
                    C = N.getElementById("J_ServicesContainer"),
                    F, D = "http://www.taobao.com/index_inc/2010c/includes/get-services.php",
                    E = "__services_results";
                if (!B || !C) {
                    return
                }
                L(B, "mouseover", A);
                L(B, "keydown", A);

                function A(G) {
                    if (G.type === "keydown" && G.keyCode !== 39 && G.keyCode !== 40) {
                        return
                    }
                    F = AL.getScript(D + "?cb=" + E, {
                        charset: "gbk"
                    });
                    AJ(G)
                }
                window[E] = function (H) {
                    if (F) {
                        F.parentNode.removeChild(F)
                    }
                    F = null;
                    try {
                        C.innerHTML = H;
                        C.style.height = "auto";
                        AA(B, "mouseover", A);
                        AA(B, "keydown", A)
                    } catch (G) {
                        C.style.display = "none"
                    }
                }
            },
            test: function () {
                var B = false;
                var A = function () {
                    if (B) {
                        return
                    }
                    B = true;
                    if (location.href.indexOf("__cloudyrun__") > -1) {
                        AL.getScript("http://assets.daily.taobao.net/p/cloudyrun/1.0/cloudyrun-taobao-pkg.js?t=" + (+new Date()))
                    }
                };
                AL.ready(A);
                setTimeout(A, 4000)
            },
            assist: function () {
                if (T("test_accouts") && document.domain.indexOf("taobao.net") > -1) {
                    AL.ready(function () {
                        AL.getScript("http://assets.daily.taobao.net/p/assist/login/login.js")
                    })
                }
            },
            miniCart: function () {
                var A = TB.Global;
                if (A._OFF) {
                    return
                }
                if (AN || M.indexOf("tmall.net") > -1) {
                    if (AL.isUndefined(O)) {
                        return
                    } else {
                        if (!(T("uc2") && T("mt"))) {
                            AL.getScript("http://www" + Y + "/go/app/tmall/login-api.php?t=" + AL.now());
                            return
                        }
                    }
                }
                A.initMiniCart()
            },
            mpp: function () {
                AL.getScript("http://" + AE + "/p/tstart/1.0/build/tb-mpp-min.js?t=201107210.js", function () {
                    AL.ready(function () {
                        if (!TB.Global.isLogin()) {
                            return
                        }
                        Mpp.Notify.register({
                            appId: 1010,
                            type: 1,
                            callback: function () {
                                AL.getScript("http://" + (K ? "webww.daily.taobao.net:8080" : "webwangwang.taobao.com") + "/getOtherSystem.do?callback=TB.Global.setUserMsg&t=" + AL.now())
                            }
                        })
                    })
                })
            }
        };
    var X = ["tDog", "tLabs", "test", "assist", "mpp"];
    for (var i = 0; i < X.length; i++) {
        (function (A) {
            var B = AO[A];
            AO[A] = function () {
                setTimeout(B, 3000)
            }
        })(X[i])
    }
    TB.Global = {
        _addMenu: function (A) {
            if (!A) {
                return
            }
            var C = this,
                E = R("menu-hd", "*", A)[0],
                F = R("menu-bd", "*", A)[0];
            if (!F || !E) {
                return
            }
            E.tabIndex = 0;
            C._subMenus.push(F);
            F.setAttribute("role", "menu");
            F.setAttribute("aria-hidden", "true");
            if (!F.getAttribute("id")) {
                F.setAttribute("id", AL.guid("menu-"))
            }
            E.setAttribute("aria-haspopup", F.getAttribute("id"));
            E.setAttribute("aria-label", "\u53f3\u952e\u5f39\u51fa\u83dc\u5355\uff0ctab\u952e\u5bfc\u822a\uff0cesc\u5173\u95ed\u5f53\u524d\u83dc\u5355");
            var B = false;
            if (!J && U) {
                B = N.createElement("iframe");
                B.src = "about: blank";
                B.className = "menu-bd";
                A.insertBefore(B, F)
            }
            L(A, "mouseover", function (G) {
                var H = G.relatedTarget;
                while (H && H !== A) {
                    H = H.parentNode
                }
                if (H !== A) {
                    AL.each(C._subMenus, function (I) {
                        if (I !== F) {
                            Z(I.parentNode, AB);
                            I.setAttribute("aria-hidden", "true")
                        }
                    });
                    AD(A, AB);
                    F.setAttribute("aria-hidden", "false");
                    if (!B) {
                        return
                    }
                    B.style.height = parseInt(F.offsetHeight) + 25 + "px";
                    B.style.width = parseInt(F.offsetWidth) + 1 + "px"
                }
            });
            L(A, "mouseout", function (G) {
                var H = G.relatedTarget;
                while (H && H !== A) {
                    H = H.parentNode
                }
                if (H !== A) {
                    Z(A, AB);
                    F.setAttribute("aria-hidden", "true");
                    AL.each(F.getElementsByTagName("input"), function (I) {
                        if (I.getAttribute("type") !== "hidden") {
                            I.blur()
                        }
                    })
                }
            });
            L(A, "keydown", function (G) {
                var H = G.keyCode;
                if (H == 27 || H == 37 || H == 38) {
                    Z(A, AB);
                    F.setAttribute("aria-hidden", "true");
                    E.focus();
                    AJ(G)
                } else {
                    if (H == 39 || H == 40) {
                        AD(A, AB);
                        F.setAttribute("aria-hidden", "false");
                        AJ(G)
                    }
                }
            });
            var D;
            L(A, S ? "focusin" : "focus", function () {
                if (D) {
                    clearTimeout(D);
                    D = null
                }
            }, !S);
            L(A, S ? "focusout" : "blur", function () {
                D = setTimeout(function () {
                    Z(A, AB);
                    F.setAttribute("aria-hidden", "true")
                }, 100)
            }, !S)
        },
        init: function (B) {
            AE = K ? "assets.daily.taobao.net" : "a.tbcdn.cn";
            W = AL.unparam(location.search.substring(1));
            AI = N.getElementById("site-nav");
            this._OFF = !! !AI;
            this.config = B;
            if (B && B.mc && B.mc === -1) {
                this._OFF = true
            }
            if (window.top !== window.self) {
                AL.log(["in frame, exit"]);
                this._OFF = true
            }
            this._subMenus = [];
            for (var A in AO) {
                AO[A]()
            }
        },
        writeLoginInfo: function (k, e) {
            k = k || {};
            var H = this,
                l = T("_nk_") || T("tracknick"),
                g = AK(T("uc1")),
                D = parseInt(g._msg_) || 0,
                b = AL.now(),
                I = "http://login.taobao.com",
                j = k.memberServer || "http://member1.taobao.com",
                B = k.outmemServer || "http://outmem.taobao.com",
                h = k.loginServer || "https://login.taobao.com",
                G = k.loginUrl || h + "/member/login.jhtml?f=top",
                d = location.href,
                F, A, f, m, C, a = Q;
            if (/^http.*(\/member\/login\.jhtml)$/i.test(d)) {
                d = Q
            }
            F = k.redirectUrl || d;
            if (F) {
                G += "&redirectURL=" + encodeURIComponent(F)
            }
            A = k.logoutUrl || I + "/member/logout.jhtml?f=top";
            f = j + "/member/newbie.htm";
            m = B + "/message/list_private_msg.htm?t=" + b;
            C = "http://jianghu.taobao.com/admin/home.htm?t=" + b;
            if (H.isLogin()) {
                a = 'hi\uff0c<a class="user-nick" href="' + C + '" target="_top">' + P(unescape(l.replace(/\\u/g, "%u"))) + "</a>\uff01" + H.showVIP() + '<a id="J_Logout" href="' + A + '" target="_top">\u9000\u51fa</a><a href="' + m + '" target="_top">\u7ad9\u5185\u4fe1';
                if (D) {
                    a += "(" + D + ")"
                }
                a += "</a>"
            } else {
                a = '\u4eb2\uff0c\u6b22\u8fce\u6765\u6dd8\u5b9d\uff01<a href="' + G + '" target="_top">\u8bf7\u767b\u5f55</a>';
                a += '<a href="' + f + '" target="_top">\u514d\u8d39\u6ce8\u518c</a>'
            } if (e) {
                var c = document.getElementById("site-nav");
                if (c) {
                    var E = c.getElementsByTagName("p")[0];
                    if (E && E.className === "login-info") {
                        E.innerHTML = a
                    }
                }
                return
            }
            N.write(a)
        },
        showVIP: function () {
            var C = parseInt(AK(T("uc1"))["tag"]) || 0,
                A = Q,
                B = "http://vip" + Y;
            AL.log(["vip", C]);
            if (AL.indexOf(C, [1, 2, 3]) > -1) {
                A = '<span class="menu"><a href="' + B + '" rel="nofollow" target="_top"  class="user-vip vip-icon' + C + '" title="' + (C === 1 ? "\u9ec4\u91d1" : (C === 2 ? "\u767d\u91d1" : "\u94bb\u77f3")) + '\u4f1a\u5458"> </a></span>'
            } else {
                if (C === -100) {
                    A = '<span class="menu"><a class="vip-icon0 menu-hd" rel="nofollow" target="_top" href="' + B + '"> <b></b></a><span class="vip-ovl menu-bd">\u60a8\u5df2\u5177\u5907VIP\u8d44\u683c<a href="' + B + '/apply_vip.htm" rel="nofollow" target="_top" >\u70b9\u4eaeVIP\u56fe\u6807</a></span></span>'
                }
            }
            return A
        },
        isLogin: function () {
            var A = T("tracknick"),
                B = T("_nk_") || A;
            return !!(T("_l_g_") && B || T("ck1") && A)
        },
        getCartElem: function () {
            return AI && R("cart", "li", AI)[0]
        },
        initMiniCart: function () {
            var C = this,
                E = "http://cart" + Y + "/top_cart_quantity.htm?",
                A = function () {
                    AL.getScript(E + "callback=TB.Global.setCartNum&t=" + AL.now() + (O ? "&appid=" + O : Q))
                };
            if (C._OFF = (C._OFF || !! !C.getCartElem())) {
                return
            }
            AL.log(["off", C._OFF]);
            var D = AK(T("mt")),
                B, F;
            if (D && (B = D.ci)) {
                B = B.split("_");
                F = parseInt(B[1]);
                B = parseInt(B[0]);
                C._OFF = B < 0;
                if (B < 0) {
                    AL.log("ci < 0, not request and not init minicart");
                    return
                }
                if (C.isLogin()) {
                    if (F === 0) {
                        AL.log("login , cp = 0, ci >= 0, requesting");
                        A()
                    } else {
                        if (F === 1) {
                            AL.log("login , cp = 1, minicart is init.");
                            TB.Global.setCartNum(B)
                        }
                    }
                } else {
                    if (F === 0) {
                        AL.log("not login , cp = 0, ci >= 0, minicart is init.");
                        TB.Global.setCartNum(B)
                    } else {
                        if (F === 1) {
                            AL.log("not login , cp = 1, ci >= 0, requesting.");
                            A()
                        }
                    }
                }
            } else {
                AL.log(["no mt, requesting"]);
                A()
            }
        },
        setCartNum: function (B) {
            if (!AL.isNumber(B) || TB.Global._OFF) {
                return
            }
            var C = TB.Global.getCartElem();
            if (!C) {
                return
            }
            var A = C.getElementsByTagName("a")[0],
                E = '<span class="mini-cart-line"></span><s></s>\u8d2d\u7269\u8f66',
                D = O !== 19;
            if (B < 0) {
                TB.Global._OFF = B === -1;
                A.innerHTML = E;
                Z(C, AP);
                AM.MiniCart && AM.MiniCart.hide();
                return
            }
            A.innerHTML = E + '<span class="mc-count' + (B < 10 ? " mc-pt3" : Q) + '">' + B + "</span>\u4ef6" + (D ? "<b></b>" : Q);
            A.href = "http://ju.atpanel.com/?url=http://cart" + Y + "/my_cart.htm?from=mini&ad_id=&am_id=&cm_id=&pm_id=150042785330be233161";
            AD(C, AP);
            if (!D) {
                AD(C, AH)
            }
            AD(C, "menu");
            AD(A, "menu-hd");
            A.id = "mc-menu-hd";
            if (AM.MiniCart) {
                AM.MiniCart.cartNum = B;
                AM.MiniCart.isExpired = true
            } else {
                AL.ready(function () {
                    var F = 0;
                    AL.getScript("http://" + AE + "/p/global/1.0/minicart" + (K ? Q : "-min") + ".js?t=20110811.js", function () {
                        if (AL.DOM) {
                            AM.MiniCart.init(B, D)
                        } else {
                            AL.log("minicart: try " + F);
                            if (F < 10) {
                                setTimeout(arguments.callee, 1000);
                                F++
                            } else {
                                AL.use("core", function () {
                                    AM.MiniCart.init(B, D)
                                })
                            }
                        }
                    })
                })
            }
        },
        run: function (C) {
            var B = this;
            B.initMiniCart();
            AO.tLabs();
            if (B.isLogin()) {
                var A = 0;
                AL.later(function () {
                    var F = N.getElementById("J_Logout");
                    AL.log(["tmall vip try: ", A]);
                    if (!F) {
                        if (A < 20) {
                            setTimeout(arguments.callee, 20);
                            A++
                        }
                        return
                    }
                    var D = B.showVIP();
                    if (D.length < 1) {
                        return
                    }
                    var E = N.createElement("div");
                    E.innerHTML = D;
                    F.parentNode.insertBefore(E.firstChild, F);
                    B._addMenu(E.firstChild)
                }, 30)
            }
        },
        setUserMsg: function (A) {
            if (A.success && A.success === "true") {
                var B = AL.DOM;
                if (!B) {
                    return
                }
                var E = B.get(".login-info", AI),
                    F = B.offset(E),
                    C = B.get("#gb-msg-notice"),
                    D;
                if (!C) {
                    C = B.create('<div id="gb-msg-notice"><div class="gb-msg-inner gb-msg-info"><p class="gb-msg-content">' + A.result.messages[0] + '</p><div class="gb-msg-icon gb-msg-close" title="\u5173\u95ed"></div></div><div class="gb-msg-icon gb-msg-tri"><div class="gb-msg-icon gb-msg-tri-inner"></div></div></div>');
                    B.append(C, AI.parentNode);
                    B.offset(C, {
                        left: F.left + 30,
                        top: F.top + B.height(E) + 1
                    });
                    AL.Event.on(C, "click", function (G) {
                        var H = G.target;
                        if (B.hasClass(H, "gb-msg-close")) {
                            B.hide(C)
                        }
                    })
                } else {
                    D = B.get(".gb-msg-content", C);
                    B.html(D, A.result.messages[0]);
                    B.show(C)
                }
            }
        }
    };

    function T(A) {
        if (AM.userCookie && !AL.isUndefined(AM.userCookie[A])) {
            return AM.userCookie[A]
        }
        if (AL.isUndefined(V[A])) {
            var B = N.cookie.match("(?:^|;)\\s*" + A + "=([^;]*)");
            V[A] = (B && B[1]) ? decodeURIComponent(B[1]) : Q
        }
        return V[A]
    }

    function P(B) {
        var A = N.createElement("div"),
            C = N.createTextNode(B);
        A.appendChild(C);
        return A.innerHTML
    }

    function R(B, A, a) {
        var H = a.getElementsByTagName(A || "*"),
            D = [],
            F = 0,
            G = 0,
            E = H.length,
            I, C;
        B = AG + B + AG;
        for (; F < E; ++F) {
            I = H[F];
            C = I.className;
            if (C && (AG + C + AG).indexOf(B) > -1) {
                D[G++] = I
            }
        }
        return D
    }

    function L(A, B, C, D) {
        if (!A) {
            return
        }
        if (A.addEventListener) {
            A.addEventListener(B, C, !! D)
        } else {
            if (A.attachEvent) {
                A.attachEvent("on" + B, C)
            }
        }
    }

    function AA(A, B, C, D) {
        if (!A) {
            return
        }
        if (A.removeEventListener) {
            A.removeEventListener(B, C, !! D)
        } else {
            if (A.detachEvent) {
                A.detachEvent("on" + B, C)
            }
        }
    }

    function AD(A, C) {
        var B = AG + A.className + AG;
        if (B.indexOf(AG + C + AG) === -1) {
            B += C;
            A.className = AL.trim(B)
        }
    }

    function Z(A, C) {
        var B = AG + A.className + AG;
        if (B.indexOf(AG + C + AG) !== -1) {
            B = B.replace(AG + C + AG, AG);
            A.className = AL.trim(B)
        }
    }

    function AK(A) {
        if (AM.userCookie && AM.userCookie.version == "2") {
            return AL.unparam(A, "&amp;")
        }
        return AL.unparam(A)
    }

    function AJ(A) {
        if (A.preventDefault) {
            A.preventDefault()
        } else {
            A.returnValue = false
        }
    }
});