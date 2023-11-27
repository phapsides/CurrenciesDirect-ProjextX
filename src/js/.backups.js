/**
 * main.js
 */

import $ from '../../public/js/jquery';
import jQuery from '../../public/js/jquery';

window.$ = $;
window.jQuery = jQuery;



import { foundation } from '../../public/js/foundation.min.js';


var App = {
	Forms: function() {

		var $inputs = $('input');
		$inputs.each(function(input) {
			console.log('Input\'s', $inputs);
		});

	}
}



var Init = function() {
	console.log('Hello human');



	App.Forms()
};


//$.fn.foundation = foundation;
$(document).ready(function() {
	//$(document).foundation();
	Init();
});
