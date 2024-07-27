if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_CLIPBOARDMANAGER__ = (function (e) {
		"use strict";
		var r;
		async function t(e, r = {}, t) {
			return window.__TAURI_INTERNALS__.invoke(e, r, t);
		}
		"function" == typeof SuppressedError && SuppressedError;
		class n {
			get rid() {
				return (function (e, r, t, n) {
					if ("a" === t && !n)
						throw new TypeError(
							"Private accessor was defined without a getter",
						);
					if ("function" == typeof r ? e !== r || !n : !r.has(e))
						throw new TypeError(
							"Cannot read private member from an object whose class did not declare it",
						);
					return "m" === t
						? n
						: "a" === t
							? n.call(e)
							: n
								? n.value
								: r.get(e);
				})(this, r, "f");
			}
			constructor(e) {
				r.set(this, void 0),
					(function (e, r, t, n, a) {
						if ("function" == typeof r ? e !== r || !a : !r.has(e))
							throw new TypeError(
								"Cannot write private member to an object whose class did not declare it",
							);
						r.set(e, t);
					})(this, r, e);
			}
			async close() {
				return t("plugin:resources|close", { rid: this.rid });
			}
		}
		r = new WeakMap();
		class a extends n {
			constructor(e) {
				super(e);
			}
			static async new(e, r, n) {
				return t("plugin:image|new", {
					rgba: i(e),
					width: r,
					height: n,
				}).then((e) => new a(e));
			}
			static async fromBytes(e) {
				return t("plugin:image|from_bytes", { bytes: i(e) }).then(
					(e) => new a(e),
				);
			}
			static async fromPath(e) {
				return t("plugin:image|from_path", { path: e }).then(
					(e) => new a(e),
				);
			}
			async rgba() {
				return t("plugin:image|rgba", { rid: this.rid }).then(
					(e) => new Uint8Array(e),
				);
			}
			async size() {
				return t("plugin:image|size", { rid: this.rid });
			}
		}
		function i(e) {
			return null == e
				? null
				: "string" == typeof e
					? e
					: e instanceof Uint8Array
						? Array.from(e)
						: e instanceof ArrayBuffer
							? Array.from(new Uint8Array(e))
							: e instanceof a
								? e.rid
								: e;
		}
		return (
			(e.clear = async function () {
				await t("plugin:clipboard-manager|clear");
			}),
			(e.readImage = async function () {
				return await t("plugin:clipboard-manager|read_image").then(
					(e) => new a(e),
				);
			}),
			(e.readText = async function () {
				return await t("plugin:clipboard-manager|read_text");
			}),
			(e.writeHtml = async function (e, r) {
				await t("plugin:clipboard-manager|write_html", {
					html: e,
					altHtml: r,
				});
			}),
			(e.writeImage = async function (e) {
				await t("plugin:clipboard-manager|write_image", {
					image: i(e),
				});
			}),
			(e.writeText = async function (e, r) {
				await t("plugin:clipboard-manager|write_text", {
					label: r?.label,
					text: e,
				});
			}),
			e
		);
	})({});
	Object.defineProperty(window.__TAURI__, "clipboardManager", {
		value: __TAURI_PLUGIN_CLIPBOARDMANAGER__,
	});
}
