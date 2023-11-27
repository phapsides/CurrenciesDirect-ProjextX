/**
 * Tools
 */

window.λ = document.querySelector.bind(document);

window.Tools = {
	xhr: {
		script: function(src, cb) {
			let script = document.createElement('script');
			script.onload = cb;
			script.src = src;
			document.head.appendChild(script);
		}
	}
};

export { λ, Tools }