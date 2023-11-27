(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * main.js
 * - Test
 */

window.CONST = null;

window.CONST = {
	DEBUG: false,
	DEBUG_GLOBAL: null, // Assign a value to me when you're stumped or lazy
	CLIENT: 'currencies-direct', // tor-fx, qantas
	APP: {
		data: {
			user: {
				firstName: 'Grace',
				lastName: 'Hopper'
			}
		}
	}
};

window.CONST.APP.data.storage = localStorage;
console.log('%clocalStorage', 'background: rgba(255,100,20,1);color:white;');
console.log('What\'s in storage', window.CONST.APP.data.storage);

// var $countryCodesJSON
// $.getJSON('/js/countrycodes.modified.json', function(json) {
// 	$countryCodesJSON = json
// 	//console.log('Data Country', $countryCodesJSON)

// 	function formatCountry(country) {
// 		if (!country['id']) { return country['text']; }
// 		var $country = $(
// 			'<span class="flag-icon flag-icon-' + ((country['id']).slice(0, -1)).toLowerCase() + ' flag-icon-squared"></span>' +
// 			'<span class="flag-text">' + country['text'] + "</span>"
// 		)
// 		return $country
// 	}

/*$('#country-code').select2({
	placeholder: "Select a country",
	templateResult: formatCountry,
	data: $countryCodesJSON
})*/

// })


var $body = $('body');

var App = {
	Forms: {
		Init: function Init() {
			console.log('App.Forms.Init()');

			App.Tools.Init();
			App.Forms.Components();
			App.Tools.ScreenResize();
		},
		Components: function Components() {

			// Expanding Radio Sections
			var $inputRadioExpandingSections = $('.radio-expanding-section');
			var $inputRadioExpandingSectionLabels = $('.radio-expanding-section label');
			$inputRadioExpandingSectionLabels.click(function (ev) {
				var $this = $(this);
				// $inputRadioExpandingSections.siblings().removeClass('expanded')
				$this.parents('.radio-expanding-section').siblings().removeClass('expanded');
				// $this.parents('.radio-expanding-section').toggleClass('expanded')
				$this.parents('.radio-expanding-section').toggleClass('expanded');
			});

			// Other Expanding Sections
			$('[data-expand-trigger], .expand-toggle').click(function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
				var $this = $(this);
				console.log('Huh?', $this.attr('href').replace('#', ''));
				$('[data-expand="' + $this.attr('href').replace('#', '') + '"]').addClass('expanded');
			});

			// Input lable value hide - TODO - Refactor
			var $inputTypeTexts = $('input[type="text"], ' + 'input[type="number"], ' + 'input[type="tel"], ' + 'input[type="search"], ' + 'input[type="password"], ' + 'input[type="email"]');
			$inputTypeTexts.blur(function (ev) {
				console.log('Value', $(this).val().length);
				if ($(this).val().length > 0) {
					console.log('Text entered');
					$(this).nextAll('label').addClass('shrink');
				} else {
					console.log('Empty text field');
					$(this).nextAll('label').removeClass('shrink').parent('.input-container').removeClass('small-label');
				}
			});

			// CDIN-2037
			// CDIN-3191
			// Shrink prefilled fields like email & password 
			// TODO: Confirm if below code is needed
			$inputTypeTexts.on('input', function () {
				var $this = $(this);
				if ($this.val().length > 0) {
					$this.next('label').addClass('shrink');
				}
			});

			// Shrink label if value is zero
			// Allows auto complete to prevent this issue

			$inputTypeTexts.each(function () {
				var $this = $(this);
				//console.log('Inputs shirnk label on launch:', $this.val())
				if ($this.val().length > 0) {
					$this.next('label').addClass('shrink');
				}
			});

			/**
    * TODO - Refactor how select boxes are managed
    */
			// TODO: Review below as not entirely sure if it works
			// Select
			var $selectFields = $('select');

			$selectFields.each(function () {
				var $this = $(this);

				if ($this.val() != null) {
					$(this).nextAll('label').addClass('shrinked'); //shrinkED - to avoid transition on page load
				}
			});

			$selectFields.blur(function (ev) {
				console.log('Selected', $(this).find(':selected').text());
				if ($(this).find(':selected').text().length > 0) {
					$(this).nextAll('label').addClass('shrink');
				} else {
					$(this).nextAll('label').removeClass('shrink').removeClass('shrinked');
				}
			});

			/**
    * Select2
    * Reference:
    * - AaBbCcDdEeFfGgHhIiKkLlMmNnOoPp
    */
			{
				// Note: suggest this is disabled for iPad (as emoji flags works also)
				/**	
     * TODO: 
     * - Toggle associated label on select2 state change
     * - Style alternative currency and flag versions
     */

				// Standard selects
				$('select:not(".select-country-list")').select2({
					minimumResultsForSearch: Infinity,
					closeOnSelect: true
				})
				// Select2 events
				.on('change', function (ev) {
					console.log('Select2 Change value: ', $(this).select2('data')[0]); // TODO - Show the fucking value

					var $labelFor = $(this).attr('id');
					$('label[for="' + $labelFor + '"]').addClass('shrink');
				}).on('select2-opening', function () {
					console.log('Select2 opening');
				}).on('select2-open', function () {
					// Fired on original element when the dropdown opens
					console.log('Select2 open');
				}).on('select2-close', function () {
					// Fired on the original element when the dropdown closes
					console.log('Select2 close');
				}).on('select2-highlight', function (ev) {
					console.log('Select2 highlighted value: ' + ev.val + ' choice=' + ev.choice.text);
				}).on('select2-selecting', function (ev) {
					console.log('Select2 selecting value: ' + ev.val + ' choice=' + ev.object.text);
				}).on('select2-removed', function (ev) {
					console.log('Select2 removed value: ' + ev.val + ' choice=' + ev.choice.text);
				}).on('select2-loaded', function (ev) {
					console.log('Select2 loaded (data property omitted for brevitiy)');
				}).on('select2-focus', function (ev) {
					console.log('Select2 focus');
				});

				// Country select only, see https://zpl.io/1TtcvJ for reference
				$('select.select-country-list').select2({
					closeOnSelect: true, // for testing turn this off
					dropdownCssClass: 'select-country-list-dropdown'
				}).on('select2-close', function () {
					// Fired on the original element when the dropdown closes
					console.log('Select2 close');
				});
			}
		}
	},
	UI: {
		Navigation: function Navigation() {
			var $mainNav = $('nav.main-nav'),
			    $subMenuTitles = $('.menu-item-has-sub-menu > a'),
			    //$('nav.main-nav .main-nav-content ul li span, nav.main-nav .main-nav-content ul li a'),
			$mobileMenuToggle = $('nav.main-nav .mobile-menu-toggle'),
			    $profileMenu = $('.user-profile');

			$profileMenu.click(function (ev) {
				var $this = $(this);
				$this.toggleClass('open');
				ev.stopPropagation();
			});
			$('.user-profile a').click(function (ev) {
				ev.stopImmediatePropagation();
			});

			$subMenuTitles.click(function (ev) {
				ev.preventDefault();
				var $this = $(this);
				var $subMenu = $this.next('.sub-menu');
				console.log($mobileMenuToggle);
				$this.parent('li').toggleClass('open');
				ev.stopPropagation();
			});

			$(document).click(function () {
				$('li.menu-item-has-sub-menu').removeClass('open');
				$profileMenu.removeClass('open');
			});

			$mobileMenuToggle.click(function (ev) {
				$mainNav.toggleClass('open');
			});
		},
		Help: function Help() {

			var $helpToggle = $('.footer-help-toggle');
			$helpToggle.click(function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
				var $this = $(this);
				$this.toggleClass('close');
				var $text = $(this).children('span');
				$text.text($text.text() == 'Help' ? 'Close' : 'Help');
				$('.footer-help-content').toggleClass('open');
			});

			$('html').click(function (e) {
				if ($('.footer-help-content').is('.open')) {
					$('.footer-help-content.open').toggleClass('open');
					$('.footer-help-toggle').toggleClass('close');
					$('.footer-help-toggle span').text('Help');
				}
			});

			$('.footer-help-content').click(function (e) {
				e.stopPropagation();
			});

			var $footerMain = $('footer.main-footer'),
			    $footerHelp = $('.footer-help');

			var footerHelpBump = function footerHelpBump() {
				// console.log(
				// 	'footerHelp', 
				// 	parseInt($footerMain.offset().top - $(window).scrollTop()),
				// 	parseInt($footerHelp.offset().top - $(window).scrollTop())
				// )

			};

			setTimeout(function () {
				footerHelpBump();
			}, 100);
			$(window).scroll(function () {
				footerHelpBump();
			});
		},
		Swiper: function (_Swiper) {
			function Swiper(_x, _x2) {
				return _Swiper.apply(this, arguments);
			}

			Swiper.toString = function () {
				return _Swiper.toString();
			};

			return Swiper;
		}(function (container, opts) {
			console.log('Swiper initiated');
			var swiper = new Swiper(container, {
				pagination: opts.pagination,
				paginatonClickable: false
			});
		})
	},
	Tools: {
		Init: function Init() {},
		Device: {
			Type: navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(Windows Phone OS)|(IEMobile)|(webOS)/) ? 'mobile' : 'desktop'
		},

		ScreenResize: function ScreenResize() {

			$(window).on('changed.zf.mediaquery', function (event, newSize, oldSize) {

				if (newSize == 'small' || oldSize == 'small') {

					if ($('.template').hasClass('site-transfers') || $('.template').hasClass('site-buy-currency')) {

						Prototype.AsideSummary();
					}

					if ($('.template').hasClass('site-page-dashboard')) {

						if (newSize == 'small') {
							Prototype.DashboardSmall();
						}

						if (newSize == 'medium' && oldSize == 'small') {
							Prototype.DashboardMedium();
						}
					}
				}
			});
		}
	}
};

var Prototype = {
	SignUp: function SignUp() {
		console.log('Prototype.SignUp');
	},
	Library: function Library() {
		console.log('Prototype.Library');
	},
	Registration: function Registration() {

		if ($('.template-registration').hasClass('site-registration-01')) {

			$('input[type=radio][name="account-type"]').change(function () {
				var assoc = $(this).val().toLowerCase();
				$('.information').addClass('hide');
				//$('.information').data('assoc', assoc).removeClass('hide');
				$('.information[data-assoc=' + assoc + ']').removeClass('hide');
				$('[data-role="next"]').removeAttr('disabled').html('<span>Next</span>');
			});
		}
	},

	Transfers: function Transfers() {

		console.log('Prototype.Transfers');

		$('select#transfer-details-sell-currency').on('change', function (ev) {
			console.log('this.value');
			$('[data-expanding-section="how-much-do-you-want-to-transfer"]').addClass('expanded');
			$('.paddingBottom-01').removeClass('paddingBottom');
		});

		$('.button-outline.get-rate').click(function (ev) {
			ev.preventDefault();
			$('[data-expanding-section="details-of-transfer"]').addClass('expanded');
			$('[data-role="button-continue"]').removeAttr('disabled');
		});

		$('select#transfer-details-reason-for-transfer-a0').on('change', function (ev) {
			var $this = $(this);
			console.log(this.value);
			$('.option-toggle.option-' + this.value.charAt(0) + '-group').removeClass('show');
			$('.option-' + this.value).addClass('show');
			// localStorage.setItem($this.attr('id'), $this.val())
			$('[data-role="button-continue"]').removeAttr('disabled');
			if (this.value == 'a2') {
				$('#bank-cards-00a').trigger('change');
			}
		});

		$('select#payment-method-b0').on('change', function (ev) {
			var $this = $(this);
			$('.option-toggle.option-' + this.value.charAt(0) + '-group').removeClass('show');
			$('.option-' + this.value).addClass('show');
			// localStorage.setItem($this.attr('id'), $this.val())
			// console.log('localStorage?', window.CONST.APP.data.storage)
		});

		var $transferGetRate = function $transferGetRate() {
			var buyAmount = 0;
			var sellAmount = 0;
			var rate = 1.14567;
		};

		/** 
   * Transfer Pre-Bought 
   */
		//$('tbody, thead').not('.table-head-expanding-section').css('display', 'none')

		// Expanding tables
		$('.table-head-expanding-section').click(function (ev) {
			ev.preventDefault();
			var $this = $(this);
			var $thisAttr = $this.attr('data-expanding-section');
			console.log('This', $this.attr('data-expanding-section'))
			//$('tbody[data-expanding-section="' + $thisAttr + '"], thead[data-expanding-section="' + $thisAttr + '"]')
			.css('visibility', 'visible');
		});

		$('#transfer-details-sell-currency').on('change', function (ev) {
			console.log('Value', $(this).val());
			$('[data-expanding-section="how-much-do-you-want-to-transfer"]').addClass('expanded');
		});
	},

	AsideSummary: function AsideSummary() {

		var summaryContainer = $('.transfers-summary');
		var summaryTrigger = $('.transfers-summary-title');
		var currentScreen = Foundation.MediaQuery.current;
		var summaryHeight;

		var makeItStickToFooter = function makeItStickToFooter() {
			var summaryHeight = summaryContainer.outerHeight(true) - 60;
			summaryContainer.css('bottom', '-' + summaryHeight + 'px');

			summaryTrigger.click(function () {

				summaryContainer.toggleClass('open');
				if (summaryContainer.is('.open')) {
					summaryContainer.css('transform', 'translate(0, -' + summaryHeight + 'px)');
				} else {
					summaryContainer.css('transform', 'translate(0,0)');
				}
			});
		};

		var makeItUnstuck = function makeItUnstuck() {
			summaryContainer.removeClass('open');
			summaryContainer.css('transform', 'translate(0,0)');
			summaryTrigger.unbind();
		};

		$(window).load(function () {
			summaryHeight = summaryContainer.outerHeight(true) - 60;
		});

		if (currentScreen == 'small') {
			makeItStickToFooter();
		} else {
			makeItUnstuck();
		}
	},

	CurrencyContract: function CurrencyContract() {

		$('select#transfer-details-reason-for-transfer-a0').on('change', function (ev) {
			var $this = $(this);
			console.log(this.value);
			$('.option-toggle.option-' + this.value.charAt(0) + '-group').removeClass('show');
			$('.option-' + this.value).addClass('show');
			// localStorage.setItem($this.attr('id'), $this.val())
			$('[data-role="button-continue"]').removeAttr('disabled');
		});
	},

	Profile: function Profile() {

		$('[data-index-link="ManageCardDelete"]').on('click', function () {
			$(this).closest('tr.row').addClass('presentation-prepare-delete');
		});
		$('[data-role="confirm-deletion"]').on('click', function () {
			$('.presentation-prepare-delete').remove();
			// TODO - Figure out why this doesn't work
			//$('#manage-recipients-delete').foundation('reveal', 'open')
			// TODO - Replace this hack:
			$('#delete-card .modal-close').trigger('click');
		});

		$('[data-index-link="ManageDeviceDelete"]').on('click', function () {
			$(this).closest('tr.row').addClass('presentation-prepare-delete');
		});

		$('[data-role="confirm-deletion"]').on('click', function () {
			$('.presentation-prepare-delete').remove();
			$('#delete-device .modal-close').trigger('click');
		});
	},

	RateAlert: function RateAlert() {

		console.log('RateAlerts()');

		// Delete row
		$('[data-index-link="ManageRecipientsDelete"]').on('click', function () {
			console.log('Flag this element for deletion', $(this).closest('tr.row').addClass('presentation-prepare-delete'));
		});
		$('[data-role="confirm-deletion"]').on('click', function () {
			$('.presentation-prepare-delete').remove();
			// TODO - Figure out why this doesn't work
			//$('#manage-recipients-delete').foundation('reveal', 'open')
			// TODO - Replace this hack:
			$('#manage-recipients-delete .modal-close').trigger('click');
		});

		$('select#currencies-intend-to-sell-c0').on('change', function (ev) {
			console.log(this.value);
			$('[data-expanding-section="how-much-would-you-like-to-pay"]').addClass('expanded');
		});

		$('select#currencies-intend-to-sell-c0').on('change', function (ev) {
			console.log(this.value);
			$('[data-expanding-section="how-much-would-you-like-to-pay"]').addClass('expanded');
		});

		$('.button-outline.get-rate').click(function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
			$('[data-expanding-section="current-targets-and-rates"]').addClass('expanded');
			//$('.temp-btn-continue').prop('disabled', false)
		});

		$('.continue-to-finalise-alert').click(function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
			$('[data-expanding-section="finalise-your-alert"]').addClass('expanded');
			//$('.temp-btn-continue').prop('disabled', false)
		});

		$('[data-reveal-id="rate-alerts-delete"]').on('click', function () {
			console.log('Yup', $(this).closest('tr.row').addClass('presentation-prepare-delete'));
		});

		$('[data-role="confirm-deletion"]').on('click', function () {
			$('.presentation-prepare-delete').remove();
		});

		// Rate alert animation
		setInterval(function () {
			console.log('Rate alerts update');
			$('.current-rate').addClass('update');
			setTimeout(function () {
				$('.current-rate').removeClass('update');
			}, 1000);
		}, 10000);
	},
	Recipients: function Recipients() {

		$('[data-index-link="ManageRecipientsDelete"]').on('click', function () {
			console.log('Flag this element for deletion', $(this).closest('tr.row').addClass('presentation-prepare-delete'));
		});

		$('[data-role="confirm-deletion"]').on('click', function () {
			$('.presentation-prepare-delete').remove();
			// TODO - Figure out why this doesn't work
			//$('#manage-recipients-delete').foundation('reveal', 'open')
			// TODO - Replace this hack:
			$('#manage-recipients-delete .modal-close').trigger('click');
		});

		$('input:radio[name="recipient-type"]').change(function (ev) {
			var opt = $(this).val();
			console.log('Change', opt);
			$('[data-expanding-section]').removeClass('expanded');
			$('[data-expanding-section="' + opt + '"]').addClass('expanded');
		});
	},

	ActivityHistory: function ActivityHistory() {
		// TODO: Remove the below as it is no longer needed
		$('.site-transfers-pre-bought-currency-01').find('.select-container select').on('change', function () {
			$('a[data-role="apply-filters"]').removeClass('disabled');
		});
	},

	DashboardSmall: function DashboardSmall() {

		if (Foundation.MediaQuery.current == 'small') {

			$('.dashboard-buttons').insertAfter($('.quick-rate-finder'));
			$('.dashboard-create-alert-button').appendTo($('.column-2'));
			$('.dashboard-account-alerts').insertBefore('.dashboard-create-alert-button');
			//$('.main-container').append($('.dashboard-create-alert-button'));
		}
	},

	DashboardMedium: function DashboardMedium() {

		$('.dashboard-buttons').prependTo($('.column-2'));
		$('.dashboard-create-alert-button').appendTo($('.column-1'));
		$('.dashboard-account-alerts').appendTo('.column-1');
	},

	CurrencySelector: function CurrencySelector() {

		// function to modify the select2 template
		function formatState(state) {
			if (!state.id) {
				return state.text;
			} // for optgroup
			// inside html for each option
			var $state = $('<div class="flag-code-wrapper">' + '<div class="flag ' + state.element.value.toUpperCase() + '">' + '<span class="currency-code">' + state.text + '</span>' + '</div>' + '</div>' // +
			//'<span class="currency-name">' + state.element.getAttribute('data-title') + '</span>'
			);
			return $state;
		};

		// function to modify the search as per entered keyword
		function searchText(params, data) {
			if ($.trim(params.term) === '') {
				return data;
			}

			// check entered keyword
			if (data.text.toUpperCase().indexOf(params.term.toUpperCase()) > -1 || $(data.element).attr("data-title").toUpperCase().indexOf(params.term.toUpperCase()) > -1 || $(data.element).attr("data-country").toUpperCase().indexOf(params.term.toUpperCase()) > -1 || $(data.element).attr("data-aliases").toUpperCase().indexOf(params.term.toUpperCase()) > -1) {
				var modifiedData = $.extend({}, data, true);
				return modifiedData;
			}
			return null;
		};

		// invoke select2 on from-currency select-box
		$(".CurrencyFrom").select2({
			//placeholder: 'Select an option',
			matcher: searchText,
			templateResult: formatState,
			templateSelection: formatState
		});

		// invoke select2 on to-currency select-box
		$(".CurrencyTo").select2({
			//placeholder: 'Select an option',
			matcher: searchText,
			templateResult: formatState,
			templateSelection: formatState
		});

		$('.CurrencyFrom, .CurrencyTo').on('select2:open', function (e) {
			$('.select2-search input').attr('placeholder', 'Type country/currency');

			//$('.select2-search input').prop('focus',false);
		});

		// currency switch button
		$('#switch-btn').click(function (e) {
			var v1 = $('#from-currency').val();
			var v2 = $('#to-currency').val();
			$('#from-currency').val(v2).trigger('change');
			$('#to-currency').val(v1).trigger('change');
			e.preventDefault();
		});

		var fromPrevious = $('#from-currency').val();
		var toPrevious = $('#to-currency').val();

		// auto change if from-currency is same as to-currency
		$('#from-currency').focus(function () {
			// Store the current value on focus, before it changes
			fromPrevious = this.value;
		}).change(function () {
			var fromCurrent = $('#from-currency').val();
			var toCurrent = $('#to-currency').val();
			if (fromCurrent === toCurrent) {
				$('#to-currency').val(fromPrevious).trigger('change');
			}
			fromPrevious = this.value;
		});

		// auto change if from-currency is same as to-currency
		$('#to-currency').focus(function () {
			// Store the current value on focus, before it changes
			toPrevious = this.value;
		}).change(function () {
			var fromCurrent = $('#from-currency').val();
			var toCurrent = $('#to-currency').val();
			if (toCurrent === fromCurrent) {
				$('#from-currency').val(toPrevious).trigger('change');
			}
			toPrevious = this.value;
		});
	},

	CountrySelector: function CountrySelector() {

		var isoCountries = [{
			name: "Australia",
			text: "+61",
			id: "AU"
		}, {
			name: "United Kingdom, England, Great Britain",
			text: "+44",
			id: "GB"
		}, {
			name: "United States, USA",
			text: "+1",
			id: "US"
		}, {
			name: "Afghanistan",
			text: "+93",
			id: "AF"
		}, {
			name: "Aland Islands",
			text: "+358",
			id: "AX"
		}, {
			name: "Albania",
			text: "+355",
			id: "AL"
		}, {
			name: "Algeria",
			text: "+213",
			id: "DZ"
		}, {
			name: "AmericanSamoa",
			text: "+1684",
			id: "AS"
		}, {
			name: "Andorra",
			text: "+376",
			id: "AD"
		}, {
			name: "Angola",
			text: "+244",
			id: "AO"
		}, {
			name: "Anguilla",
			text: "+1264",
			id: "AI"
		}, {
			name: "Antarctica",
			text: "+672",
			id: "AQ"
		}, {
			name: "Antigua and Barbuda",
			text: "+1268",
			id: "AG"
		}, {
			name: "Argentina",
			text: "+54",
			id: "AR"
		}, {
			name: "Armenia",
			text: "+374",
			id: "AM"
		}, {
			name: "Aruba",
			text: "+297",
			id: "AW"
		}, {
			name: "Austria",
			text: "+43",
			id: "AT"
		}, {
			name: "Azerbaijan",
			text: "+994",
			id: "AZ"
		}, {
			name: "Bahamas",
			text: "+1242",
			id: "BS"
		}, {
			name: "Bahrain",
			text: "+973",
			id: "BH"
		}, {
			name: "Bangladesh",
			text: "+880",
			id: "BD"
		}, {
			name: "Barbados",
			text: "+1246",
			id: "BB"
		}, {
			name: "Belarus",
			text: "+375",
			id: "BY"
		}, {
			name: "Belgium",
			text: "+32",
			id: "BE"
		}, {
			name: "Belize",
			text: "+501",
			id: "BZ"
		}, {
			name: "Benin",
			text: "+229",
			id: "BJ"
		}, {
			name: "Bermuda",
			text: "+1441",
			id: "BM"
		}, {
			name: "Bhutan",
			text: "+975",
			id: "BT"
		}, {
			name: "Bolivia, Plurinational State of",
			text: "+591",
			id: "BO"
		}, {
			name: "Bosnia and Herzegovina",
			text: "+387",
			id: "BA"
		}, {
			name: "Botswana",
			text: "+267",
			id: "BW"
		}, {
			name: "Brazil",
			text: "+55",
			id: "BR"
		}, {
			name: "British Indian Ocean Territory",
			text: "+246",
			id: "IO"
		}, {
			name: "Brunei Darussalam",
			text: "+673",
			id: "BN"
		}, {
			name: "Bulgaria",
			text: "+359",
			id: "BG"
		}, {
			name: "Burkina Faso",
			text: "+226",
			id: "BF"
		}, {
			name: "Burundi",
			text: "+257",
			id: "BI"
		}, {
			name: "Cambodia",
			text: "+855",
			id: "KH"
		}, {
			name: "Cameroon",
			text: "+237",
			id: "CM"
		}, {
			name: "Canada",
			text: "+1",
			id: "CA"
		}, {
			name: "Cape Verde",
			text: "+238",
			id: "CV"
		}, {
			name: "Cayman Islands",
			text: "+ 345",
			id: "KY"
		}, {
			name: "Central African Republic",
			text: "+236",
			id: "CF"
		}, {
			name: "Chad",
			text: "+235",
			id: "TD"
		}, {
			name: "Chile",
			text: "+56",
			id: "CL"
		}, {
			name: "China",
			text: "+86",
			id: "CN"
		}, {
			name: "Christmas Island",
			text: "+61",
			id: "CX"
		}, {
			name: "Cocos (Keeling) Islands",
			text: "+61",
			id: "CC"
		}, {
			name: "Colombia",
			text: "+57",
			id: "CO"
		}, {
			name: "Comoros",
			text: "+269",
			id: "KM"
		}, {
			name: "Congo",
			text: "+242",
			id: "CG"
		}, {
			name: "Congo, The Democratic Republic of the Congo",
			text: "+243",
			id: "CD"
		}, {
			name: "Cook Islands",
			text: "+682",
			id: "CK"
		}, {
			name: "Costa Rica",
			text: "+506",
			id: "CR"
		}, {
			name: "Cote d'Ivoire",
			text: "+225",
			id: "CI"
		}, {
			name: "Croatia",
			text: "+385",
			id: "HR"
		}, {
			name: "Cuba",
			text: "+53",
			id: "CU"
		}, {
			name: "Cyprus",
			text: "+357",
			id: "CY"
		}, {
			name: "Czech Republic",
			text: "+420",
			id: "CZ"
		}, {
			name: "Denmark",
			text: "+45",
			id: "DK"
		}, {
			name: "Djibouti",
			text: "+253",
			id: "DJ"
		}, {
			name: "Dominica",
			text: "+1767",
			id: "DM"
		}, {
			name: "Dominican Republic",
			text: "+1849",
			id: "DO"
		}, {
			name: "Ecuador",
			text: "+593",
			id: "EC"
		}, {
			name: "Egypt",
			text: "+20",
			id: "EG"
		}, {
			name: "El Salvador",
			text: "+503",
			id: "SV"
		}, {
			name: "Equatorial Guinea",
			text: "+240",
			id: "GQ"
		}, {
			name: "Eritrea",
			text: "+291",
			id: "ER"
		}, {
			name: "Estonia",
			text: "+372",
			id: "EE"
		}, {
			name: "Ethiopia",
			text: "+251",
			id: "ET"
		}, {
			name: "Falkland Islands (Malvinas)",
			text: "+500",
			id: "FK"
		}, {
			name: "Faroe Islands",
			text: "+298",
			id: "FO"
		}, {
			name: "Fiji",
			text: "+679",
			id: "FJ"
		}, {
			name: "Finland",
			text: "+358",
			id: "FI"
		}, {
			name: "France",
			text: "+33",
			id: "FR"
		}, {
			name: "French Guiana",
			text: "+594",
			id: "GF"
		}, {
			name: "French Polynesia",
			text: "+689",
			id: "PF"
		}, {
			name: "Gabon",
			text: "+241",
			id: "GA"
		}, {
			name: "Gambia",
			text: "+220",
			id: "GM"
		}, {
			name: "Georgia",
			text: "+995",
			id: "GE"
		}, {
			name: "Germany",
			text: "+49",
			id: "DE"
		}, {
			name: "Ghana",
			text: "+233",
			id: "GH"
		}, {
			name: "Gibraltar",
			text: "+350",
			id: "GI"
		}, {
			name: "Greece",
			text: "+30",
			id: "GR"
		}, {
			name: "Greenland",
			text: "+299",
			id: "GL"
		}, {
			name: "Grenada",
			text: "+1473",
			id: "GD"
		}, {
			name: "Guadeloupe",
			text: "+590",
			id: "GP"
		}, {
			name: "Guam",
			text: "+1671",
			id: "GU"
		}, {
			name: "Guatemala",
			text: "+502",
			id: "GT"
		}, {
			name: "Guernsey",
			text: "+44",
			id: "GG"
		}, {
			name: "Guinea",
			text: "+224",
			id: "GN"
		}, {
			name: "Guinea-Bissau",
			text: "+245",
			id: "GW"
		}, {
			name: "Guyana",
			text: "+595",
			id: "GY"
		}, {
			name: "Haiti",
			text: "+509",
			id: "HT"
		}, {
			name: "Holy See (Vatican City State)",
			text: "+379",
			id: "VA"
		}, {
			name: "Honduras",
			text: "+504",
			id: "HN"
		}, {
			name: "Hong Kong",
			text: "+852",
			id: "HK"
		}, {
			name: "Hungary",
			text: "+36",
			id: "HU"
		}, {
			name: "Iceland",
			text: "+354",
			id: "IS"
		}, {
			name: "India",
			text: "+91",
			id: "IN"
		}, {
			name: "Indonesia",
			text: "+62",
			id: "ID"
		}, {
			name: "Iran, Islamic Republic of Persian Gulf",
			text: "+98",
			id: "IR"
		}, {
			name: "Iraq",
			text: "+964",
			id: "IQ"
		}, {
			name: "Ireland",
			text: "+353",
			id: "IE"
		}, {
			name: "Isle of Man",
			text: "+44",
			id: "IM"
		}, {
			name: "Israel",
			text: "+972",
			id: "IL"
		}, {
			name: "Italy",
			text: "+39",
			id: "IT"
		}, {
			name: "Jamaica",
			text: "+1876",
			id: "JM"
		}, {
			name: "Japan",
			text: "+81",
			id: "JP"
		}, {
			name: "Jersey",
			text: "+44",
			id: "JE"
		}, {
			name: "Jordan",
			text: "+962",
			id: "JO"
		}, {
			name: "Kazakhstan",
			text: "+77",
			id: "KZ"
		}, {
			name: "Kenya",
			text: "+254",
			id: "KE"
		}, {
			name: "Kiribati",
			text: "+686",
			id: "KI"
		}, {
			name: "Korea, Democratic People's Republic of Korea",
			text: "+850",
			id: "KP"
		}, {
			name: "Korea, Republic of South Korea",
			text: "+82",
			id: "KR"
		}, {
			name: "Kuwait",
			text: "+965",
			id: "KW"
		}, {
			name: "Kyrgyzstan",
			text: "+996",
			id: "KG"
		}, {
			name: "Laos",
			text: "+856",
			id: "LA"
		}, {
			name: "Latvia",
			text: "+371",
			id: "LV"
		}, {
			name: "Lebanon",
			text: "+961",
			id: "LB"
		}, {
			name: "Lesotho",
			text: "+266",
			id: "LS"
		}, {
			name: "Liberia",
			text: "+231",
			id: "LR"
		}, {
			name: "Libyan Arab Jamahiriya",
			text: "+218",
			id: "LY"
		}, {
			name: "Liechtenstein",
			text: "+423",
			id: "LI"
		}, {
			name: "Lithuania",
			text: "+370",
			id: "LT"
		}, {
			name: "Luxembourg",
			text: "+352",
			id: "LU"
		}, {
			name: "Macao",
			text: "+853",
			id: "MO"
		}, {
			name: "Macedonia",
			text: "+389",
			id: "MK"
		}, {
			name: "Madagascar",
			text: "+261",
			id: "MG"
		}, {
			name: "Malawi",
			text: "+265",
			id: "MW"
		}, {
			name: "Malaysia",
			text: "+60",
			id: "MY"
		}, {
			name: "Maldives",
			text: "+960",
			id: "MV"
		}, {
			name: "Mali",
			text: "+223",
			id: "ML"
		}, {
			name: "Malta",
			text: "+356",
			id: "MT"
		}, {
			name: "Marshall Islands",
			text: "+692",
			id: "MH"
		}, {
			name: "Martinique",
			text: "+596",
			id: "MQ"
		}, {
			name: "Mauritania",
			text: "+222",
			id: "MR"
		}, {
			name: "Mauritius",
			text: "+230",
			id: "MU"
		}, {
			name: "Mayotte",
			text: "+262",
			id: "YT"
		}, {
			name: "Mexico",
			text: "+52",
			id: "MX"
		}, {
			name: "Micronesia, Federated States of Micronesia",
			text: "+691",
			id: "FM"
		}, {
			name: "Moldova",
			text: "+373",
			id: "MD"
		}, {
			name: "Monaco",
			text: "+377",
			id: "MC"
		}, {
			name: "Mongolia",
			text: "+976",
			id: "MN"
		}, {
			name: "Montenegro",
			text: "+382",
			id: "ME"
		}, {
			name: "Montserrat",
			text: "+1664",
			id: "MS"
		}, {
			name: "Morocco",
			text: "+212",
			id: "MA"
		}, {
			name: "Mozambique",
			text: "+258",
			id: "MZ"
		}, {
			name: "Myanmar",
			text: "+95",
			id: "MM"
		}, {
			name: "Namibia",
			text: "+264",
			id: "NA"
		}, {
			name: "Nauru",
			text: "+674",
			id: "NR"
		}, {
			name: "Nepal",
			text: "+977",
			id: "NP"
		}, {
			name: "Netherlands",
			text: "+31",
			id: "NL"
		}, {
			name: "Netherlands Antilles",
			text: "+599",
			id: "AN"
		}, {
			name: "New Caledonia",
			text: "+687",
			id: "NC"
		}, {
			name: "New Zealand",
			text: "+64",
			id: "NZ"
		}, {
			name: "Nicaragua",
			text: "+505",
			id: "NI"
		}, {
			name: "Niger",
			text: "+227",
			id: "NE"
		}, {
			name: "Nigeria",
			text: "+234",
			id: "NG"
		}, {
			name: "Niue",
			text: "+683",
			id: "NU"
		}, {
			name: "Norfolk Island",
			text: "+672",
			id: "NF"
		}, {
			name: "Northern Mariana Islands",
			text: "+1670",
			id: "MP"
		}, {
			name: "Norway",
			text: "+47",
			id: "NO"
		}, {
			name: "Oman",
			text: "+968",
			id: "OM"
		}, {
			name: "Pakistan",
			text: "+92",
			id: "PK"
		}, {
			name: "Palau",
			text: "+680",
			id: "PW"
		}, {
			name: "Palestinian Territory, Occupied",
			text: "+970",
			id: "PS"
		}, {
			name: "Panama",
			text: "+507",
			id: "PA"
		}, {
			name: "Papua New Guinea",
			text: "+675",
			id: "PG"
		}, {
			name: "Paraguay",
			text: "+595",
			id: "PY"
		}, {
			name: "Peru",
			text: "+51",
			id: "PE"
		}, {
			name: "Philippines",
			text: "+63",
			id: "PH"
		}, {
			name: "Pitcairn",
			text: "+872",
			id: "PN"
		}, {
			name: "Poland",
			text: "+48",
			id: "PL"
		}, {
			name: "Portugal",
			text: "+351",
			id: "PT"
		}, {
			name: "Puerto Rico",
			text: "+1939",
			id: "PR"
		}, {
			name: "Qatar",
			text: "+974",
			id: "QA"
		}, {
			name: "Romania",
			text: "+40",
			id: "RO"
		}, {
			name: "Russia",
			text: "+7",
			id: "RU"
		}, {
			name: "Rwanda",
			text: "+250",
			id: "RW"
		}, {
			name: "Reunion",
			text: "+262",
			id: "RE"
		}, {
			name: "Saint Barthelemy",
			text: "+590",
			id: "BL"
		}, {
			name: "Saint Helena, Ascension and Tristan Da Cunha",
			text: "+290",
			id: "SH"
		}, {
			name: "Saint Kitts and Nevis",
			text: "+1869",
			id: "KN"
		}, {
			name: "Saint Lucia",
			text: "+1758",
			id: "LC"
		}, {
			name: "Saint Martin",
			text: "+590",
			id: "MF"
		}, {
			name: "Saint Pierre and Miquelon",
			text: "+508",
			id: "PM"
		}, {
			name: "Saint Vincent and the Grenadines",
			text: "+1784",
			id: "VC"
		}, {
			name: "Samoa",
			text: "+685",
			id: "WS"
		}, {
			name: "San Marino",
			text: "+378",
			id: "SM"
		}, {
			name: "Sao Tome and Principe",
			text: "+239",
			id: "ST"
		}, {
			name: "Saudi Arabia",
			text: "+966",
			id: "SA"
		}, {
			name: "Senegal",
			text: "+221",
			id: "SN"
		}, {
			name: "Serbia",
			text: "+381",
			id: "RS"
		}, {
			name: "Seychelles",
			text: "+248",
			id: "SC"
		}, {
			name: "Sierra Leone",
			text: "+232",
			id: "SL"
		}, {
			name: "Singapore",
			text: "+65",
			id: "SG"
		}, {
			name: "Slovakia",
			text: "+421",
			id: "SK"
		}, {
			name: "Slovenia",
			text: "+386",
			id: "SI"
		}, {
			name: "Solomon Islands",
			text: "+677",
			id: "SB"
		}, {
			name: "Somalia",
			text: "+252",
			id: "SO"
		}, {
			name: "South Africa",
			text: "+27",
			id: "ZA"
		}, {
			name: "South Sudan",
			text: "+211",
			id: "SS"
		}, {
			name: "South Georgia and the South Sandwich Islands",
			text: "+500",
			id: "GS"
		}, {
			name: "Spain",
			text: "+34",
			id: "ES"
		}, {
			name: "Sri Lanka",
			text: "+94",
			id: "LK"
		}, {
			name: "Sudan",
			text: "+249",
			id: "SD"
		}, {
			name: "Suriname",
			text: "+597",
			id: "SR"
		}, {
			name: "Svalbard and Jan Mayen",
			text: "+47",
			id: "SJ"
		}, {
			name: "Swaziland",
			text: "+268",
			id: "SZ"
		}, {
			name: "Sweden",
			text: "+46",
			id: "SE"
		}, {
			name: "Switzerland",
			text: "+41",
			id: "CH"
		}, {
			name: "Syrian Arab Republic",
			text: "+963",
			id: "SY"
		}, {
			name: "Taiwan",
			text: "+886",
			id: "TW"
		}, {
			name: "Tajikistan",
			text: "+992",
			id: "TJ"
		}, {
			name: "Tanzania, United Republic of Tanzania",
			text: "+255",
			id: "TZ"
		}, {
			name: "Thailand",
			text: "+66",
			id: "TH"
		}, {
			name: "Timor-Leste",
			text: "+670",
			id: "TL"
		}, {
			name: "Togo",
			text: "+228",
			id: "TG"
		}, {
			name: "Tokelau",
			text: "+690",
			id: "TK"
		}, {
			name: "Tonga",
			text: "+676",
			id: "TO"
		}, {
			name: "Trinidad and Tobago",
			text: "+1868",
			id: "TT"
		}, {
			name: "Tunisia",
			text: "+216",
			id: "TN"
		}, {
			name: "Turkey",
			text: "+90",
			id: "TR"
		}, {
			name: "Turkmenistan",
			text: "+993",
			id: "TM"
		}, {
			name: "Turks and Caicos Islands",
			text: "+1649",
			id: "TC"
		}, {
			name: "Tuvalu",
			text: "+688",
			id: "TV"
		}, {
			name: "Uganda",
			text: "+256",
			id: "UG"
		}, {
			name: "Ukraine",
			text: "+380",
			id: "UA"
		}, {
			name: "United Arab Emirates",
			text: "+971",
			id: "AE"
		}, {
			name: "Uruguay",
			text: "+598",
			id: "UY"
		}, {
			name: "Uzbekistan",
			text: "+998",
			id: "UZ"
		}, {
			name: "Vanuatu",
			text: "+678",
			id: "VU"
		}, {
			name: "Venezuela, Bolivarian Republic of Venezuela",
			text: "+58",
			id: "VE"
		}, {
			name: "Vietnam",
			text: "+84",
			id: "VN"
		}, {
			name: "Virgin Islands, British",
			text: "+1284",
			id: "VG"
		}, {
			name: "Virgin Islands, U.S.",
			text: "+1340",
			id: "VI"
		}, {
			name: "Wallis and Futuna",
			text: "+681",
			id: "WF"
		}, {
			name: "Yemen",
			text: "+967",
			id: "YE"
		}, {
			name: "Zambia",
			text: "+260",
			id: "ZM"
		}, {
			name: "Zimbabwe",
			text: "+263",
			id: "ZW"
		}];

		function formatCountry(country) {

			if (!country.id) {
				return country.text;
			}
			console.log('Who am I');
			var $country = $('<span class="flag-icon flag-icon-' + country.id.toLowerCase() + '" data-title="' + country.name + '"></span>' + '<span class="flag-text">' + country.text + '</span>');
			return $country;
		}

		function searchName(params, data) {
			if ($.trim(params.term) === '') {
				return data;
			}

			if (data.text.toUpperCase().indexOf(params.term.toUpperCase()) > -1 || $(data.element).attr("data-code").toUpperCase().indexOf(params.term.toUpperCase()) > -1) {
				var modifiedData = $.extend({}, data, true);
				return modifiedData;
			}
			return null;
		};

		var $buildSelect;

		$(isoCountries).each(function (i) {
			$buildSelect += '<option value="' + isoCountries[i].id + '" data-code="' + isoCountries[i].text + '" data-name="' + isoCountries[i].name + '">' + isoCountries[i].text + '</option>';
		});

		var $selectElements = $('#country-code, #country-code-landline');

		$selectElements.append($buildSelect);

		// Select2
		$selectElements.select2({
			templateResult: formatCountry,
			templateSelection: formatCountry,
			matcher: searchName
		});
	}
};

var Init = function Init() {
	//console.log('Hello human');

	// App.Whitelabel.Init() // TODO - Re-enable Init for general features

	//App.Whitelabel.ClientSwitch()
	App.Forms.Init();
	App.UI.Navigation();

	// TODO - Add conditional
	if ($('.footer-help').length) App.UI.Help();

	if ($('.template').hasClass('template-registration')) {
		Prototype.Registration();
	}

	if ($('.template').hasClass('site-transfers')) {
		Prototype.Transfers();
	}

	if ($('.template').hasClass('site-buy-currency')) {
		Prototype.CurrencyContract();
	}

	if ($('.template').hasClass('site-pay-contract')) {
		Prototype.CurrencyContract();
	}

	if ($('.template').hasClass('site-rate-alerts')) {
		Prototype.RateAlert();
	}

	if ($('.template').hasClass('site-recipients')) {
		Prototype.Recipients();
	}

	if ($('.template').hasClass('site-transfers-pre-bought-currency-01')) {
		Prototype.ActivityHistory();
	}

	if ($('.template').hasClass('site-page-profile')) {
		Prototype.Profile();
	}

	if ($('.template').hasClass('site-transfers') || $('.template').hasClass('site-buy-currency')) {

		Prototype.AsideSummary();
	}

	if ($('.template').hasClass('site-page-dashboard')) {
		Prototype.DashboardSmall();
		Prototype.CurrencySelector();
	}

	if ($('.template').hasClass('site-registration-03') || $('.template').hasClass('site-page-profile')) {

		Prototype.CountrySelector();
	}

	/**
  * General Button Links
  */

	var $buttons = $('button[data-hyperlink]:not([data-role="confirm-deletion"])');
	$buttons.click(function (ev) {
		ev.preventDefault();
		var $this = $(this);
		console.log('Data hyperlink', $this.attr('data-hyperlink'));
		if ($this.attr('data-hyperlink').length > 0) {
			document.location = $this.attr('data-hyperlink');
		}
	});

	/**
  * Tab Toggles
  */
	var $tabToggles = $('.tab-toggle');
	$tabToggles.click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		var $this = $(this);
		var $tabGroup = $this.attr('data-tab-group');
		$('.tab-toggle[data-tab-group="' + $tabGroup + '"], .tab-page-container[data-tab-group="' + $tabGroup + '"]').removeClass('active');
		$('.tab-page-container[data-tab-group="' + $tabGroup + '"]').removeClass('active');
		$this.addClass('active');
		$('.tab-page-container[data-tab-toggle="' + $this.attr('data-tab-page') + '"]').addClass('active');
	});

	$('[data-override]').click(function (ev) {
		var $this = $(this);
		var $fn = $this.attr('data-override');
		if ($fn == 'go-back') history.go(-1);
	});

	$('[data-open').click(function (ev) {
		ev.preventDefault();
	});
};

/**
 * jQuery Plugins
 */

// TODO - Actually make me work

// Toggle Password Mask
/*(function($) {
    $.toggleShowPassword = function(opts) {
        var settings = $.extend({
            field: "#password",
            control: "#toggle_show_password",
        }, opts);

        var control = $(settings.control);
        var field = $(settings.field)

        control.bind('click', function () {
            if (control.is(':checked')) {
                field.attr('type', 'text');
            } else {
                field.attr('type', 'password');
            }
        })
    };
}(jQuery));
//$.toggleShowPassword({field: '#test1', control: '#test2' });
*/

// TODO: be consistent on the single or double quotes


$(function () {
	$('input[name=add-another-person]').change(function () {
		// $("#their-details").hide();
		if ($(this).val() == "Yes") {
			$('#their-details').slideDown("slow");
		} else if ($(this).val() == "No") {
			$('#their-details').slideUp("slow");
		}
	});
});

$(function () {
	$(".change-address").click(function () {
		$(this).parent('.columns').hide();
		$('.add-new-address').slideDown("slow");
	});
});

$(function () {
	$("select#title").change(function () {
		var ddl = document.getElementById("title");
		var selectedValue = ddl.options[ddl.selectedIndex].value;
		if (selectedValue == "Other") {
			$('.specify').show();
		} else {
			$('.specify').hide();
		}
	});
});

$(function () {
	$("select#select-currency").change(function () {
		var ddl = document.getElementById("select-currency");
		var selectedValue = ddl.options[ddl.selectedIndex].value;
		// (selectedValue == "USD") || should be removed for production
		if (selectedValue == "USD" || selectedValue == "4_BHD" || selectedValue == "7_CAD" || selectedValue == "48_USD") {
			$('.recipients-address').show();
		} else {
			$('.recipients-address').hide();
		}
	});
});

$(function () {
	var rowCount = $('.dashboard-your-recipients tr').length;
	// alert(rowCount);
	// TODO: Convert this in class switching
	if (rowCount <= 3) {
		$('.show-all-recipients').hide();
	}
});

$(function () {
	$(".toggle-show:first").click(function () {
		$(this).hide();
		$('.new-email--panel').slideDown("slow");
	});

	$('.toggle-hide:first, .new-email--panel button').click(function () {
		$('.new-email--panel').slideUp("slow", function () {
			$('.toggle-show').eq(0).show();
		});
	});

	$(".toggle-show:last").click(function () {
		$(this).hide();
		$('.new-password--panel').slideDown("slow");
	});
	$('.toggle-hide:last, .new-password--panel button').click(function () {
		$('.new-password--panel').slideUp("slow", function () {
			$('.toggle-show').eq(1).show();
		});
	});

	$('.new-password--panel button, .new-email--panel button').click(function () {
		$('.status-notification.hide').hide().removeClass('hide').fadeIn();
		setTimeout(function () {
			$('.status-notification').fadeOut().addClass('hide');
		}, 2000);
	});
});

$(function () {
	$('#yes-tc').on('change', function () {
		var ch = $(this),
		    c;
		if (ch.is(':checked')) {
			$('button[data-form-section-active="account"]').prop('disabled', false);
		} else {
			$('button[data-form-section-active="account"]').prop('disabled', true);
		}
	});
});

// CDIN-1884
// Function for copy link to clipboard
$(function () {
	$(".copy-link").on('click', function () {
		$(".share-link input").focus();
		$(".share-link input").select();
		document.execCommand("copy");
	});
});

$(function () {
	$('#transfer-details-reason-for-transfer-1').on('change', function () {
		$('.transfer-details-recipient-details-one').slideDown("slow");
		$('.expanding-section').slideDown("slow");
	});
	$('[data-role="add-payee"]').eq(0).on('click', function () {
		$('.transfer-details-recipient-details-two').slideDown("slow");
		$('.transfer-details-recipient-details-two .input-container').last().css("margin", "0");
		$('[data-role="add-payee"]').eq(0).hide();
	});
	$('[data-role="add-payee"]').eq(1).on('click', function () {
		$('.transfer-details-recipient-details-three').slideDown("slow");
		$('[data-role="delete-payee"]').eq(0).hide();
		$('[data-role="add-payee"]').eq(1).hide();
	});

	$('[data-role="delete-payee"]').eq(0).on('click', function () {
		$('.transfer-details-recipient-details-two').slideUp("slow");
		$('[data-role="add-payee"]').eq(0).show();
	});
	$('[data-role="delete-payee"]').eq(1).on('click', function () {
		$('.transfer-details-recipient-details-three').slideUp("slow");
		$('[data-role="delete-payee"]').eq(0).show();
		$('[data-role="add-payee"]').eq(1).show();
	});
});

$(function () {
	$('#from, #to').on('change', function () {
		if ($(this).val().length != 0) {
			$(this).next('label').addClass('shrink');
			$(this).parent('.input-container').addClass('small-label');
		} else {
			$(this).next('label').removeClass('shrink');
			$(this).parent('.input-container').removeClass('small-label');
		}
	});
});

$(function () {
	var $elsToHide = $('.main-container, .main-footer, .status-notification, .footer-help');

	$(".mobile-menu-toggle--container").click(function () {
		if ($(".main-nav").hasClass("open")) {
			$elsToHide.hide();
		} else {
			$elsToHide.show();
		}
	});
});

$(function () {
	$('.swap').click(function () {
		$(this).find(".img").toggleClass('show');
		$('.filters').slideToggle();
		return false;
	});
});

$(function () {
	var NotificaitonContainer = $('.status-notification');

	NotificaitonContainer.find('[data-role="close"]').click(function (e) {
		e.preventDefault();
		NotificaitonContainer.fadeOut(function () {
			NotificaitonContainer.remove();
		});
	});
});

$(function () {
	$('[link-expanding-section]').click(function () {
		var $targetSection = $(this).attr('link-expanding-section');
		$('[data-expanding-section=' + $targetSection + ']').addClass('expanded');
	});
});

// $(function() { 
// 	$('form.quick-rate-finder select').on('change', function() {

// 		$(this).parent('.select-container').find('label').removeClass().addClass($(this).select2('data')[0]['text']);
// 	})
// });

$(function () {
	$('#recipient-gets-container .CurrencyTo').val('USD');
});

$(function () {
	if ($('.site-transfers-03').length) {
		$('#add-new-card [data-role="button-continue"]').click(function () {
			$('.modal-close').trigger('click');
			$('.status-notification.hide').hide().removeClass('hide').fadeIn();
		});
	}
});

/// SHOW HIDE PASSWORD
/// http://foundation.zurb.com/building-blocks/blocks/show-password.html

$('button[data-role="show-password"]').on('click', function () {

	var inputPassword = $(this).parent('.input-container').find('input').eq(0);
	$(this).toggleClass('checked');

	//var inputPassword = $('.input-password');

	if (inputPassword.attr('type') == 'password') changeType(inputPassword, 'text');else changeType(inputPassword, 'password');

	return false;
});

function changeType(x, type) {
	if (x.prop('type') == type) return x; //That was easy.
	try {
		return x.prop('type', type); //Stupid IE security will not allow this
	} catch (e) {
		//Try re-creating the element (yep... this sucks)
		//jQuery has no html() method for the element, so we have to put into a div first
		var html = $("<div>").append(x.clone()).html();
		var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
		//If no match, we add the type attribute to the end; otherwise, we replace
		var tmp = $(html.match(regex) == null ? html.replace(">", ' type="' + type + '">') : html.replace(regex, 'type="' + type + '"'));
		//Copy data from old element
		tmp.data('type', x.data('type'));
		var events = x.data('events');
		var cb = function (events) {
			return function () {
				//Bind all prior events
				for (i in events) {
					var y = events[i];
					for (j in y) {
						tmp.bind(i, y[j].handler);
					}
				}
			};
		}(events);
		x.replaceWith(tmp);
		setTimeout(cb, 10); //Wait a bit to call function
		return tmp;
	}
}

// FILE UPLOAD BUTTONS
/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

;(function (document, window, index) {
	var inputs = document.querySelectorAll('.input-file-upload-buttons input');
	Array.prototype.forEach.call(inputs, function (input) {
		var label = input.nextElementSibling,
		    labelVal = label.innerHTML;

		input.addEventListener('change', function (e) {
			var fileName = '';
			if (this.files && this.files.length > 1) fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);else fileName = e.target.value.split('\\').pop();

			if (fileName) label.querySelector('span').innerHTML = fileName;else label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener('focus', function () {
			input.classList.add('has-focus');
		});
		input.addEventListener('blur', function () {
			input.classList.remove('has-focus');
		});
	});
})(document, window, 0);

// SHOW MORE
$(function () {
	$('[data-role="show-more"]').click(function (ev) {
		ev.preventDefault();

		var $targetSectionName = $('#' + $(this).attr('data-section'));
		var numberElem = $(this).attr('data-number');
		if (!numberElem) numberElem = 5;

		$('.hide', $targetSectionName).slice(0, numberElem).hide().removeClass('hide').fadeIn();

		if ($('.hide', $targetSectionName).length == 0) $(this).hide();
	});
});

//ACTIVITY HISTORY
$(function () {
	$('.table-activity-wallets').find('.transaction').click(function () {
		$(this).toggleClass('open');
		if ($(this).is('.open')) {
			$(this).next('.details').fadeIn();
		} else {
			$(this).next('.details').fadeOut('fast');
		}
	});
});

// TOOLTIP
$(function () {
	$('.tooltip-popup').tooltip({
		position: {
			my: "center bottom-20",
			at: "center top",
			using: function using(position, feedback) {
				$(this).css(position);
				$("<div>").addClass("arrow").addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this);
			}
		}
	});
});

// DATE PICKER
$.extend($.datepicker, { _checkOffset: function _checkOffset(inst, offset, isFixed) {
		return offset;
	} });

$(function () {

	$('#from').datepicker({
		dateFormat: 'dd-mm-yy'
	});

	$('#to').datepicker({
		dateFormat: 'dd-mm-yy',

		onSelect: function onSelect() {
			$(this).change();
		}
	});

	$("input").bind("change", function () {
		// console.error("change detected");
	});
});

$(function () {
	$('.ui-tooltip').hide();

	$(document).on('click', function (e) {
		if ($(e.target).closest('.tooltip-popup').length) {
			$(".ui-tooltip").show();
		} else if (!$(e.target).closest('.ui-tooltip').length) {
			$('.ui-tooltip').hide();
		}
	});
});

// this supports unlimited nesting
// can be used to intoduce more functionality on dashboard 
$('.toggle').click(function (e) {
	e.preventDefault();

	var $this = $(this);

	if ($this.next().hasClass('show')) {
		$this.next().removeClass('show');
		$this.next().slideUp(350);
		$this.parent().find('.toggle').removeClass('open');
	} else {
		$('.toggle').removeClass('open');
		$this.parent().parent().find('li .inner').removeClass('show');
		$this.parent().parent().find('li .inner').slideUp(350);
		$this.next().toggleClass('show');
		$this.next().slideToggle(350);
		$this.parent().find('.toggle').addClass('open');
	}
});

if ($("body").hasClass("is-reveal-open")) {
	$('html, body').on('touchmove', function (e) {
		//prevent native touch activity like scrolling
		e.preventDefault();
	});
} else {
	$('html, body').off('touchmove');
}

$(document).foundation();
$(document).ready(Init);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7O0FBS0EsT0FBTyxLQUFQLEdBQWUsSUFBZjs7QUFFQSxPQUFPLEtBQVAsR0FBZTtBQUNkLFFBQU8sS0FETztBQUVkLGVBQWMsSUFGQSxFQUVNO0FBQ3BCLFNBQVEsbUJBSE0sRUFHZTtBQUM3QixNQUFLO0FBQ0osUUFBTTtBQUNMLFNBQU07QUFDTCxlQUFXLE9BRE47QUFFTCxjQUFVO0FBRkw7QUFERDtBQURGO0FBSlMsQ0FBZjs7QUFnQkEsT0FBTyxLQUFQLENBQWEsR0FBYixDQUFpQixJQUFqQixDQUFzQixPQUF0QixHQUFnQyxZQUFoQztBQUNBLFFBQVEsR0FBUixDQUFZLGdCQUFaLEVBQThCLDZDQUE5QjtBQUNBLFFBQVEsR0FBUixDQUFZLG9CQUFaLEVBQWtDLE9BQU8sS0FBUCxDQUFhLEdBQWIsQ0FBaUIsSUFBakIsQ0FBc0IsT0FBeEQ7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQzs7Ozs7O0FBTUQ7OztBQUdBLElBQUksUUFBUSxFQUFFLE1BQUYsQ0FBWjs7QUFJQSxJQUFJLE1BQU07QUFDVCxRQUFPO0FBQ04sUUFBTSxnQkFBTTtBQUNYLFdBQVEsR0FBUixDQUFZLGtCQUFaOztBQUVBLE9BQUksS0FBSixDQUFVLElBQVY7QUFDQSxPQUFJLEtBQUosQ0FBVSxVQUFWO0FBQ0EsT0FBSSxLQUFKLENBQVUsWUFBVjtBQUVBLEdBUks7QUFTTixjQUFZLHNCQUFNOztBQUVqQjtBQUNBLE9BQUksK0JBQStCLEVBQUUsMEJBQUYsQ0FBbkM7QUFDQSxPQUFJLG9DQUFvQyxFQUFFLGdDQUFGLENBQXhDO0FBQ0EscUNBQWtDLEtBQWxDLENBQXdDLFVBQVMsRUFBVCxFQUFhO0FBQ3BELFFBQUksUUFBUSxFQUFFLElB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LEVBQWdCLEdBQWhCLENBQW9CLFdBQXBCO0FBQ0g7O0FBSUQsRUFBRSxRQUFGLEVBQVksVUFBWjtBQUNBLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsSUFBbEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBtYWluLmpzXG4gKiAtIFRlc3RcbiAqL1xuXG53aW5kb3cuQ09OU1QgPSBudWxsO1xuXG53aW5kb3cuQ09OU1QgPSB7XG5cdERFQlVHOiBmYWxzZSxcblx0REVCVUdfR0xPQkFMOiBudWxsLCAvLyBBc3NpZ24gYSB2YWx1ZSB0byBtZSB3aGVuIHlvdSdyZSBzdHVtcGVkIG9yIGxhenlcblx0Q0xJRU5UOiAnY3VycmVuY2llcy1kaXJlY3QnLCAvLyB0b3ItZngsIHFhbnRhc1xuXHRBUFA6IHtcblx0XHRkYXRhOiB7XG5cdFx0XHR1c2VyOiB7XG5cdFx0XHRcdGZpcnN0TmFtZTogJ0dyYWNlJyxcblx0XHRcdFx0bGFzdE5hbWU6ICdIb3BwZXInXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cblxuXG53aW5kb3cuQ09OU1QuQVBQLmRhdGEuc3RvcmFnZSA9IGxvY2FsU3RvcmFnZVxuY29uc29sZS5sb2coJyVjbG9jYWxTdG9yYWdlJywgJ2JhY2tncm91bmQ6IHJnYmEoMjU1LDEwMCwyMCwxKTtjb2xvcjp3aGl0ZTsnKSBcbmNvbnNvbGUubG9nKCdXaGF0XFwncyBpbiBzdG9yYWdlJywgd2luZG93LkNPTlNULkFQUC5kYXRhLnN0b3JhZ2UpXG5cblxuIFxuLy8gdmFyICRjb3VudHJ5Q29kZXNKU09OXG4vLyAkLmdldEpTT04oJy9qcy9jb3VudHJ5Y29kZXMubW9kaWZpZWQuanNvbicsIGZ1bmN0aW9uKGpzb24pIHtcbi8vIFx0JGNvdW50cnlDb2Rlc0pTT04gPSBqc29uXG4vLyBcdC8vY29uc29sZS5sb2coJ0RhdGEgQ291bnRyeScsICRjb3VudHJ5Q29kZXNKU09OKVxuXG4vLyBcdGZ1bmN0aW9uIGZvcm1hdENvdW50cnkoY291bnRyeSkge1xuLy8gXHRcdGlmICghY291bnRyeVsnaWQnXSkgeyByZXR1cm4gY291bnRyeVsndGV4dCddOyB9XG4vLyBcdFx0dmFyICRjb3VudHJ5ID0gJChcbi8vIFx0XHRcdCc8c3BhbiBjbGFzcz1cImZsYWctaWNvbiBmbGFnLWljb24tJyArICgoY291bnRyeVsnaWQnXSkuc2xpY2UoMCwgLTEpKS50b0xvd2VyQ2FzZSgpICsgJyBmbGFnLWljb24tc3F1YXJlZFwiPjwvc3Bhbj4nICtcbi8vIFx0XHRcdCc8c3BhbiBjbGFzcz1cImZsYWctdGV4dFwiPicgKyBjb3VudHJ5Wyd0ZXh0J10gKyBcIjwvc3Bhbj5cIlxuLy8gXHRcdClcbi8vIFx0XHRyZXR1cm4gJGNvdW50cnlcbi8vIFx0fVxuXG5cdC8qJCgnI2NvdW50cnktY29kZScpLnNlbGVjdDIoe1xuXHRcdHBsYWNlaG9sZGVyOiBcIlNlbGVjdCBhIGNvdW50cnlcIixcblx0XHR0ZW1wbGF0ZVJlc3VsdDogZm9ybWF0Q291bnRyeSxcblx0XHRkYXRhOiAkY291bnRyeUNvZGVzSlNPTlxuXHR9KSovXG5cbi8vIH0pXG5cblxudmFyICRib2R5ID0gJCgnYm9keScpXG5cblxuXG52YXIgQXBwID0ge1xuXHRGb3Jtczoge1xuXHRcdEluaXQ6ICgpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKCdBcHAuRm9ybXMuSW5pdCgpJylcblxuXHRcdFx0QXBwLlRvb2xzLkluaXQoKVxuXHRcdFx0QXBwLkZvcm1zLkNvbXBvbmVudHMoKVxuXHRcdFx0QXBwLlRvb2xzLlNjcmVlblJlc2l6ZSgpXG5cblx0XHR9LFxuXHRcdENvbXBvbmVudHM6ICgpID0+IHtcblxuXHRcdFx0Ly8gRXhwYW5kaW5nIFJhZGlvIFNlY3Rpb25zXG5cdFx0XHR2YXIgJGlucHV0UmFkaW9FeHBhbmRpbmdTZWN0aW9ucyA9ICQoJy5yYWRpby1leHBhbmRpbmctc2VjdGlvbicpXG5cdFx0XHR2YXIgJGlucHV0UmFkaW9FeHBhbmRpbmdTZWN0aW9uTGFiZWxzID0gJCgnLnJhZGlvLWV4cGFuZGluZy1zZWN0aW9uIGxhYmVsJylcblx0XHRcdCRpbnB1dFJhZGlvRXhwYW5kaW5nU2VjdGlvbkxhYmVscy5jbGljayhmdW5jdGlvbihldikge1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpXG5cdFx0XHRcdC8vICRpbnB1dFJhZGlvRXhwYW5kaW5nU2VjdGlvbnMuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKVxuXHRcdFx0XHQkdGhpcy5wYXJlbnRzKCcucmFkaW8tZXhwYW5kaW5nLXNlY3Rpb24nKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpXG5cdFx0XHRcdC8vICR0aGlzLnBhcmVudHMoJy5yYWRpby1leHBhbmRpbmctc2VjdGlvbicpLnRvZ2dsZUNsYXNzKCdleHBhbmRlZCcpXG5cdFx0XHRcdCR0aGlzLnBhcmVudHMoJy5yYWRpby1leHBhbmRpbmctc2VjdGlvbicpLnRvZ2dsZUNsYXNzKCdleHBhbmRlZCcpXG5cdFx0XHR9KTtcblxuXG5cblx0XHRcdC8vIE90aGVyIEV4cGFuZGluZyBTZWN0aW9uc1xuXHRcdFx0JCgnW2RhdGEtZXhwYW5kLXRyaWdnZXJdLCAuZXhwYW5kLXRvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRcdGV2LnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKClcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKVxuXHRcdFx0XHRjb25zb2xlLmxvZygnSHVoPycsICR0aGlzLmF0dHIoJ2hyZWYnKS5yZXBsYWNlKCcjJywgJycpIClcblx0XHRcdFx0JCgnW2RhdGEtZXhwYW5kPVwiJyArICR0aGlzLmF0dHIoJ2hyZWYnKS5yZXBsYWNlKCcjJywgJycpICsgJ1wiXScpLmFkZENsYXNzKCdleHBhbmRlZCcpXG5cdFx0XHR9KVxuXG5cblxuXHRcdFx0Ly8gSW5wdXQgbGFibGUgdmFsdWUgaGlkZSAtIFRPRE8gLSBSZWZhY3RvclxuXHRcdFx0dmFyICRpbnB1dFR5cGVUZXh0cyA9ICQoXG5cdFx0XHRcdCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgJyArXG5cdFx0XHRcdCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdLCAnICtcblx0XHRcdFx0J2lucHV0W3R5cGU9XCJ0ZWxcIl0sICcgK1xuXHRcdFx0XHQnaW5wdXRbdHlwZT1cInNlYXJjaFwiXSwgJyArXG5cdFx0XHRcdCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0sICcgK1xuXHRcdFx0XHQnaW5wdXRbdHlwZT1cImVtYWlsXCJdJ1xuXHRcdFx0KTtcblx0XHRcdCRpbnB1dFR5cGVUZXh0cy5ibHVyKGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdWYWx1ZScsICQodGhpcykudmFsKCkubGVuZ3RoKTtcblx0XHRcdFx0aWYgKCAkKHRoaXMpLnZhbCgpLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1RleHQgZW50ZXJlZCcpO1xuXHRcdFx0XHRcdCQodGhpcykubmV4dEFsbCgnbGFiZWwnKS5hZGRDbGFzcygnc2hyaW5rJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ0VtcHR5IHRleHQgZmllbGQnKTtcblx0XHRcdFx0XHQkKHRoaXMpLm5leHRBbGwoJ2xhYmVsJykucmVtb3ZlQ2xhc3MoJ3NocmluaycpXG5cdFx0XHRcdFx0LnBhcmVudCgnLmlucHV0LWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdzbWFsbC1sYWJlbCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXG5cdFx0XHQvLyBDRElOLTIwMzdcblx0XHRcdC8vIENESU4tMzE5MVxuXHRcdFx0Ly8gU2hyaW5rIHByZWZpbGxlZCBmaWVsZHMgbGlrZSBlbWFpbCAmIHBhc3N3b3JkIFxuXHRcdFx0Ly8gVE9ETzogQ29uZmlybSBpZiBiZWxvdyBjb2RlIGlzIG5lZWRlZFxuXHRcdFx0JGlucHV0VHlwZVRleHRzLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpXG5cdFx0XHRcdGlmICgkdGhpcy52YWwoKS5sZW5ndGggPiAwKSB7IFxuXHRcdFx0XHRcdCR0aGlzLm5leHQoJ2xhYmVsJykuYWRkQ2xhc3MoJ3NocmluaycpIFxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXG5cdFx0XHQvLyBTaHJpbmsgbGFiZWwgaWYgdmFsdWUgaXMgemVyb1xuXHRcdFx0Ly8gQWxsb3dzIGF1dG8gY29tcGxldGUgdG8gcHJldmVudCB0aGlzIGlzc3VlXG5cblx0XHRcdCRpbnB1dFR5cGVUZXh0cy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAgJCh0aGlzKVxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdJbnB1dHMgc2hpcm5rIGxhYmVsIG9uIGxhdW5jaDonLCAkdGhpcy52YWwoKSlcblx0XHRcdFx0aWYgKCR0aGlzLnZhbCgpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHQkdGhpcy5uZXh0KCdsYWJlbCcpLmFkZENsYXNzKCdzaHJpbmsnKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVx0XG5cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBUT0RPIC0gUmVmYWN0b3IgaG93IHNlbGVjdCBib3hlcyBhcmUgbWFuYWdlZFxuXHRcdFx0ICovXG5cdFx0XHQvLyBUT0RPOiBSZXZpZXcgYmVsb3cgYXMgbm90IGVudGlyZWx5IHN1cmUgaWYgaXQgd29ya3Ncblx0XHRcdC8vIFNlbGVjdFxuXHRcdFx0dmFyICRzZWxlY3RGaWVsZHMgPSAkKCdzZWxlY3QnKTtcblxuXHRcdFx0JHNlbGVjdEZpZWxkcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAgJCh0aGlzKTtcblxuXHRcdFx0XHRpZiAoJHRoaXMudmFsKCkgIT0gbnVsbCkge1xuXHRcdFx0XHRcdCQodGhpcykubmV4dEFsbCgnbGFiZWwnKS5hZGRDbGFzcygnc2hyaW5rZWQnKTsgLy9zaHJpbmtFRCAtIHRvIGF2b2lkIHRyYW5zaXRpb24gb24gcGFnZSBsb2FkXG5cdFx0XHRcdH1cblx0XHRcdH0pXHRcblxuXG5cdFx0XHQkc2VsZWN0RmllbGRzLmJsdXIoZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ1NlbGVjdGVkJywgJCh0aGlzKS5maW5kKCc6c2VsZWN0ZWQnKS50ZXh0KCkpO1xuXHRcdFx0XHRpZiAoJCh0aGlzKS5maW5kKCc6c2VsZWN0ZWQnKS50ZXh0KCkubGVuZ3RoID4gMCApIHtcblx0XHRcdFx0XHQkKHRoaXMpLm5leHRBbGwoJ2xhYmVsJykuYWRkQ2xhc3MoJ3NocmluaycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdCQodGhpcykubmV4dEFsbCgnbGFiZWwnKS5yZW1vdmVDbGFzcygnc2hyaW5rJykucmVtb3ZlQ2xhc3MoJ3Nocmlua2VkJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2VsZWN0MlxuXHRcdFx0ICogUmVmZXJlbmNlOlxuXHRcdFx0ICogLSBBYUJiQ2NEZEVlRmZHZ0hoSWlLa0xsTW1Obk9vUHBcblx0XHRcdCAqL1xuXHRcdFx0e1xuXHRcdFx0XHQvLyBOb3RlOiBzdWdnZXN0IHRoaXMgaXMgZGlzYWJsZWQgZm9yIGlQYWQgKGFzIGVtb2ppIGZsYWdzIHdvcmtzIGFsc28pXG5cdFx0XHRcdC8qKlx0XG5cdFx0XHRcdCAqIFRPRE86IFxuXHRcdFx0XHQgKiAtIFRvZ2dsZSBhc3NvY2lhdGVkIGxhYmVsIG9uIHNlbGVjdDIgc3RhdGUgY2hhbmdlXG5cdFx0XHRcdCAqIC0gU3R5bGUgYWx0ZXJuYXRpdmUgY3VycmVuY3kgYW5kIGZsYWcgdmVyc2lvbnNcblx0XHRcdFx0ICovXG5cblxuXHRcdFx0XHQvLyBTdGFuZGFyZCBzZWxlY3RzXG5cdFx0XHRcdCQoJ3NlbGVjdDpub3QoXCIuc2VsZWN0LWNvdW50cnktbGlzdFwiKScpIFxuXHRcdFx0XHRcdC5zZWxlY3QyKHtcblx0XHRcdFx0XHRcdG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiBJbmZpbml0eSxcblx0XHRcdFx0XHRcdGNsb3NlT25TZWxlY3Q6IHRydWVcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC8vIFNlbGVjdDIgZXZlbnRzXG5cdFx0XHRcdFx0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1NlbGVjdDIgQ2hhbmdlIHZhbHVlOiAnLCAkKHRoaXMpLnNlbGVjdDIoJ2RhdGEnKVswXSkgLy8gVE9ETyAtIFNob3cgdGhlIGZ1Y2tpbmcgdmFsdWVcblxuXHRcdFx0XHRcdFx0dmFyICRsYWJlbEZvciA9ICgkKHRoaXMpLmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0JCgnbGFiZWxbZm9yPVwiJyskbGFiZWxGb3IrJ1wiXScpLmFkZENsYXNzKCdzaHJpbmsnKTtcblxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0Lm9uKCdzZWxlY3QyLW9wZW5pbmcnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTZWxlY3QyIG9wZW5pbmcnKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0Lm9uKCdzZWxlY3QyLW9wZW4nLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdC8vIEZpcmVkIG9uIG9yaWdpbmFsIGVsZW1lbnQgd2hlbiB0aGUgZHJvcGRvd24gb3BlbnNcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTZWxlY3QyIG9wZW4nKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0Lm9uKCdzZWxlY3QyLWNsb3NlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQvLyBGaXJlZCBvbiB0aGUgb3JpZ2luYWwgZWxlbWVudCB3aGVuIHRoZSBkcm9wZG93biBjbG9zZXNcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTZWxlY3QyIGNsb3NlJylcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5vbignc2VsZWN0Mi1oaWdobGlnaHQnLCBmdW5jdGlvbihldikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1NlbGVjdDIgaGlnaGxpZ2h0ZWQgdmFsdWU6ICcgKyBldi52YWwgKyAnIGNob2ljZT0nICsgZXYuY2hvaWNlLnRleHQpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQub24oJ3NlbGVjdDItc2VsZWN0aW5nJywgZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTZWxlY3QyIHNlbGVjdGluZyB2YWx1ZTogJyArIGV2LnZhbCArICcgY2hvaWNlPScgKyBldi5vYmplY3QudGV4dClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5vbignc2VsZWN0Mi1yZW1vdmVkJywgZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTZWxlY3QyIHJlbW92ZWQgdmFsdWU6ICcgKyBldi52YWwgKyAnIGNob2ljZT0nICsgZXYuY2hvaWNlLnRleHQpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQub24oJ3NlbGVjdDItbG9hZGVkJywgZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTZWxlY3QyIGxvYWRlZCAoZGF0YSBwcm9wZXJ0eSBvbWl0dGVkIGZvciBicmV2aXRpeSknKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0Lm9uKCdzZWxlY3QyLWZvY3VzJywgZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTZWxlY3QyIGZvY3VzJylcblx0XHRcdFx0XHR9KVxuXG5cblx0XHRcdFx0XHQvLyBDb3VudHJ5IHNlbGVjdCBvbmx5LCBzZWUgaHR0cHM6Ly96cGwuaW8vMVR0Y3ZKIGZvciByZWZlcmVuY2Vcblx0XHRcdFx0XHQkKCdzZWxlY3Quc2VsZWN0LWNvdW50cnktbGlzdCcpIFxuXHRcdFx0XHRcdFx0LnNlbGVjdDIoe1xuXHRcdFx0XHRcdFx0XHRjbG9zZU9uU2VsZWN0OiB0cnVlLCAvLyBmb3IgdGVzdGluZyB0dXJuIHRoaXMgb2ZmXG5cdFx0XHRcdFx0XHRcdGRyb3Bkb3duQ3NzQ2xhc3M6ICdzZWxlY3QtY291bnRyeS1saXN0LWRyb3Bkb3duJ1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5vbignc2VsZWN0Mi1jbG9zZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHQvLyBGaXJlZCBvbiB0aGUgb3JpZ2luYWwgZWxlbWVudCB3aGVuIHRoZSBkcm9wZG93biBjbG9zZXNcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1NlbGVjdDIgY2xvc2UnKVxuXHRcdFx0XHRcdFx0fSlcblxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9LFxuXHRVSToge1xuXHRcdE5hdmlnYXRpb246ICgpID0+IHtcblx0XHRcdHZhciAkbWFpbk5hdiA9ICQoJ25hdi5tYWluLW5hdicpLFxuXHRcdFx0XHQkc3ViTWVudVRpdGxlcyA9ICQoJy5tZW51LWl0ZW0taGFzLXN1Yi1tZW51ID4gYScpLCAvLyQoJ25hdi5tYWluLW5hdiAubWFpbi1uYXYtY29udGVudCB1bCBsaSBzcGFuLCBuYXYubWFpbi1uYXYgLm1haW4tbmF2LWNvbnRlbnQgdWwgbGkgYScpLFxuXHRcdFx0XHQkbW9iaWxlTWVudVRvZ2dsZSA9ICQoJ25hdi5tYWluLW5hdiAubW9iaWxlLW1lbnUtdG9nZ2xlJyksXG5cdFx0XHRcdCRwcm9maWxlTWVudSA9ICQoJy51c2VyLXByb2ZpbGUnKVxuXG5cdFx0XHQkcHJvZmlsZU1lbnUuY2xpY2soZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKVxuXHRcdFx0XHQkdGhpcy50b2dnbGVDbGFzcygnb3BlbicpXG5cdFx0XHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XHR9KVxuXHRcdFx0JCgnLnVzZXItcHJvZmlsZSBhJykuY2xpY2soZnVuY3Rpb24oZXYpIHtcblx0XHRcdCAgICBldi5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuXHRcdFx0fSlcblxuXHRcdFx0JHN1Yk1lbnVUaXRsZXMuY2xpY2soZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpXG5cdFx0XHRcdHZhciAkc3ViTWVudSA9ICR0aGlzLm5leHQoJy5zdWItbWVudScpXG5cdFx0XHRcdGNvbnNvbGUubG9nKCRtb2JpbGVNZW51VG9nZ2xlKTtcblx0XHRcdFx0JHRoaXMucGFyZW50KCdsaScpLnRvZ2dsZUNsYXNzKCdvcGVuJylcblx0XHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9KVxuXG5cdFx0XHQkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbigpIHtcblx0XHQgICAgICAgJCgnbGkubWVudS1pdGVtLWhhcy1zdWItbWVudScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG5cdFx0ICAgICAgICRwcm9maWxlTWVudS5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHRcdCAgICB9KTtcblxuXHRcdFx0JG1vYmlsZU1lbnVUb2dnbGUuY2xpY2soZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0JG1haW5OYXYudG9nZ2xlQ2xhc3MoJ29wZW4nKVxuXHRcdFx0fSlcblxuXG5cdFx0fSxcblx0XHRIZWxwOiAoKSA9PiB7XG5cblx0XHRcdHZhciAkaGVscFRvZ2dsZSA9ICQoJy5mb290ZXItaGVscC10b2dnbGUnKVxuXHRcdFx0JGhlbHBUb2dnbGUuY2xpY2soZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpXG5cdFx0XHRcdCR0aGlzLnRvZ2dsZUNsYXNzKCdjbG9zZScpO1xuXHRcdFx0XHR2YXIgJHRleHQgPSAkKHRoaXMpLmNoaWxkcmVuKCdzcGFuJylcblx0XHRcdFx0JHRleHQudGV4dCgkdGV4dC50ZXh0KCkgPT0gJ0hlbHAnID8gJ0Nsb3NlJyA6ICdIZWxwJylcblx0XHRcdFx0JCgnLmZvb3Rlci1oZWxwLWNvbnRlbnQnKS50b2dnbGVDbGFzcygnb3BlbicpXG5cblx0XHRcdH0pXG5cblx0XHRcdCQoJ2h0bWwnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICggJCgnLmZvb3Rlci1oZWxwLWNvbnRlbnQnKS5pcygnLm9wZW4nKSApXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdCAgICAkKCcuZm9vdGVyLWhlbHAtY29udGVudC5vcGVuJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblx0XHRcdFx0XHQgICAgJCgnLmZvb3Rlci1oZWxwLXRvZ2dsZScpLnRvZ2dsZUNsYXNzKCdjbG9zZScpO1xuXHRcdFx0XHRcdCAgICAkKCcuZm9vdGVyLWhlbHAtdG9nZ2xlIHNwYW4nKS50ZXh0KCdIZWxwJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCQoJy5mb290ZXItaGVscC1jb250ZW50JykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9KTtcblxuXG5cdFx0XHR2YXIgJGZvb3Rlck1haW4gPSAkKCdmb290ZXIubWFpbi1mb290ZXInKSxcblx0XHRcdFx0JGZvb3RlckhlbHAgPSAkKCcuZm9vdGVyLWhlbHAnKSBcblxuXHRcdFx0dmFyIGZvb3RlckhlbHBCdW1wID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKFxuXHRcdFx0XHQvLyBcdCdmb290ZXJIZWxwJywgXG5cdFx0XHRcdC8vIFx0cGFyc2VJbnQoJGZvb3Rlck1haW4ub2Zmc2V0KCkudG9wIC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpKSxcblx0XHRcdFx0Ly8gXHRwYXJzZUludCgkZm9vdGVySGVscC5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkpXG5cdFx0XHRcdC8vIClcblxuXHRcdFx0fVxuXG5cblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGZvb3RlckhlbHBCdW1wKCkgfSwgMTAwKVxuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHsgXG5cdFx0XHRcdGZvb3RlckhlbHBCdW1wKClcblx0XHRcdH0pXG5cblx0XHR9LFxuXHRcdFN3aXBlcjogKGNvbnRhaW5lciwgb3B0cykgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coJ1N3aXBlciBpbml0aWF0ZWQnKVxuXHRcdFx0dmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoY29udGFpbmVyLCB7XG5cdFx0XHRcdHBhZ2luYXRpb246IG9wdHMucGFnaW5hdGlvbixcblx0XHRcdFx0cGFnaW5hdG9uQ2xpY2thYmxlOiBmYWxzZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxuXHRUb29sczoge1xuXHRcdEluaXQ6ICgpID0+IHtcblx0XHRcdFxuXHRcdH0sXG5cdFx0RGV2aWNlOiB7XG5cdFx0XHRUeXBlOiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oaVBhZCl8KGlQaG9uZSl8KGlQb2QpfChBbmRyb2lkKXwoV2luZG93cyBQaG9uZSBPUyl8KElFTW9iaWxlKXwod2ViT1MpLykgPyAnbW9iaWxlJyA6ICdkZXNrdG9wJ1xuXHRcdH0sXG5cblx0XHRTY3JlZW5SZXNpemU6ICgpID0+IHtcblxuXHRcdFx0JCh3aW5kb3cpLm9uKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCBmdW5jdGlvbihldmVudCwgbmV3U2l6ZSwgb2xkU2l6ZSl7IFxuXG5cdFx0XHRcdGlmICgobmV3U2l6ZSA9PSAnc21hbGwnKSB8fCAob2xkU2l6ZSA9PSAnc21hbGwnKSkge1xuXG5cdFx0XHRcdFx0aWYgKCQoJy50ZW1wbGF0ZScpLmhhc0NsYXNzKCdzaXRlLXRyYW5zZmVycycpIHx8XG5cdFx0XHRcdFx0XHQkKCcudGVtcGxhdGUnKS5oYXNDbGFzcygnc2l0ZS1idXktY3VycmVuY3knKSkge1xuXG5cdFx0XHRcdFx0XHRQcm90b3R5cGUuQXNpZGVTdW1tYXJ5KCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCQoJy50ZW1wbGF0ZScpLmhhc0NsYXNzKCdzaXRlLXBhZ2UtZGFzaGJvYXJkJykpIHtcblxuXHRcdFx0XHRcdFx0aWYgKG5ld1NpemUgPT0gJ3NtYWxsJykgIHtcblx0XHRcdFx0XHRcdFx0UHJvdG90eXBlLkRhc2hib2FyZFNtYWxsKClcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKChuZXdTaXplID09ICdtZWRpdW0nKSAmJiAob2xkU2l6ZSA9PSAnc21hbGwnKSkge1xuXHRcdFx0XHRcdFx0XHRQcm90b3R5cGUuRGFzaGJvYXJkTWVkaXVtKClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cblxuY29uc3QgUHJvdG90eXBlID0ge1xuXHRTaWduVXA6ICgpID0+IHtcblx0XHRjb25zb2xlLmxvZygnUHJvdG90eXBlLlNpZ25VcCcpXG5cdH0sXG5cdExpYnJhcnk6ICgpID0+IHtcblx0XHRjb25zb2xlLmxvZygnUHJvdG90eXBlLkxpYnJhcnknKVxuXHR9LFxuXHRSZWdpc3RyYXRpb246ICgpID0+IHtcblxuXG5cdFx0aWYgKCQoJy50ZW1wbGF0ZS1yZWdpc3RyYXRpb24nKS5oYXNDbGFzcygnc2l0ZS1yZWdpc3RyYXRpb24tMDEnKSkge1xuXG5cdFx0XHQkKCdpbnB1dFt0eXBlPXJhZGlvXVtuYW1lPVwiYWNjb3VudC10eXBlXCJdJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgYXNzb2MgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdCQoJy5pbmZvcm1hdGlvbicpLmFkZENsYXNzKCdoaWRlJyk7XG5cdFx0XHRcdC8vJCgnLmluZm9ybWF0aW9uJykuZGF0YSgnYXNzb2MnLCBhc3NvYykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcblx0XHRcdFx0JCgnLmluZm9ybWF0aW9uW2RhdGEtYXNzb2M9JyArIGFzc29jICsgJ10nKS5yZW1vdmVDbGFzcygnaGlkZScpO1xuXHRcdFx0XHQkKCdbZGF0YS1yb2xlPVwibmV4dFwiXScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykuaHRtbCgnPHNwYW4+TmV4dDwvc3Bhbj4nKVxuXHRcdFx0fSlcblxuXHRcdH1cblxuXG5cdH0sXG5cblx0VHJhbnNmZXJzOiAoKSA9PiB7XG5cblx0XHRjb25zb2xlLmxvZygnUHJvdG90eXBlLlRyYW5zZmVycycpXG5cblx0XHQkKCdzZWxlY3QjdHJhbnNmZXItZGV0YWlscy1zZWxsLWN1cnJlbmN5Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRjb25zb2xlLmxvZygndGhpcy52YWx1ZScpXG5cdFx0XHQkKCdbZGF0YS1leHBhbmRpbmctc2VjdGlvbj1cImhvdy1tdWNoLWRvLXlvdS13YW50LXRvLXRyYW5zZmVyXCJdJykuYWRkQ2xhc3MoJ2V4cGFuZGVkJylcblx0XHRcdCQoJy5wYWRkaW5nQm90dG9tLTAxJykucmVtb3ZlQ2xhc3MoJ3BhZGRpbmdCb3R0b20nKVxuXG5cdFx0fSlcblxuXHRcdCQoJy5idXR0b24tb3V0bGluZS5nZXQtcmF0ZScpLmNsaWNrKGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHQkKCdbZGF0YS1leHBhbmRpbmctc2VjdGlvbj1cImRldGFpbHMtb2YtdHJhbnNmZXJcIl0nKS5hZGRDbGFzcygnZXhwYW5kZWQnKVxuXHRcdFx0JCgnW2RhdGEtcm9sZT1cImJ1dHRvbi1jb250aW51ZVwiXScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJylcblx0XG5cdFx0fSlcblxuXHRcdCQoJ3NlbGVjdCN0cmFuc2Zlci1kZXRhaWxzLXJlYXNvbi1mb3ItdHJhbnNmZXItYTAnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZXYpIHtcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcylcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMudmFsdWUpXG5cdFx0XHQkKCcub3B0aW9uLXRvZ2dsZS5vcHRpb24tJyArIHRoaXMudmFsdWUuY2hhckF0KDApICsgJy1ncm91cCcpLnJlbW92ZUNsYXNzKCdzaG93Jylcblx0XHRcdCQoJy5vcHRpb24tJyArIHRoaXMudmFsdWUpLmFkZENsYXNzKCdzaG93Jylcblx0XHRcdC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCR0aGlzLmF0dHIoJ2lkJyksICR0aGlzLnZhbCgpKVxuXHRcdFx0JCgnW2RhdGEtcm9sZT1cImJ1dHRvbi1jb250aW51ZVwiXScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJylcblx0XHRcdGlmICh0aGlzLnZhbHVlID09ICdhMicpIHsgJCgnI2JhbmstY2FyZHMtMDBhJykudHJpZ2dlcignY2hhbmdlJykgfVxuXHRcdH0pXG5cblx0XHQkKCdzZWxlY3QjcGF5bWVudC1tZXRob2QtYjAnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZXYpIHtcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcylcblx0XHRcdCQoJy5vcHRpb24tdG9nZ2xlLm9wdGlvbi0nICsgdGhpcy52YWx1ZS5jaGFyQXQoMCkgKyAnLWdyb3VwJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKVxuXHRcdFx0JCgnLm9wdGlvbi0nICsgdGhpcy52YWx1ZSkuYWRkQ2xhc3MoJ3Nob3cnKVxuXHRcdFx0Ly8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJHRoaXMuYXR0cignaWQnKSwgJHRoaXMudmFsKCkpXG5cdFx0XHQvLyBjb25zb2xlLmxvZygnbG9jYWxTdG9yYWdlPycsIHdpbmRvdy5DT05TVC5BUFAuZGF0YS5zdG9yYWdlKVxuXHRcdH0pXG5cblx0XHR2YXIgJHRyYW5zZmVyR2V0UmF0ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGJ1eUFtb3VudCA9IDBcblx0XHRcdHZhciBzZWxsQW1vdW50ID0gMFxuXHRcdFx0dmFyIHJhdGUgPSAxLjE0NTY3XG5cdFx0fVxuXG5cblx0XHQvKiogXG5cdFx0ICogVHJhbnNmZXIgUHJlLUJvdWdodCBcblx0XHQgKi9cblx0XHQvLyQoJ3Rib2R5LCB0aGVhZCcpLm5vdCgnLnRhYmxlLWhlYWQtZXhwYW5kaW5nLXNlY3Rpb24nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXG5cblx0XHQvLyBFeHBhbmRpbmcgdGFibGVzXG5cdFx0JCgnLnRhYmxlLWhlYWQtZXhwYW5kaW5nLXNlY3Rpb24nKS5jbGljayhmdW5jdGlvbihldikge1xuXHRcdFx0ZXYucHJldmVudERlZmF1bHQoKVxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKVxuXHRcdFx0dmFyICR0aGlzQXR0ciA9ICR0aGlzLmF0dHIoJ2RhdGEtZXhwYW5kaW5nLXNlY3Rpb24nKVxuXHRcdFx0Y29uc29sZS5sb2coJ1RoaXMnLCAkdGhpcy5hdHRyKCdkYXRhLWV4cGFuZGluZy1zZWN0aW9uJykpXG5cdFx0XHQvLyQoJ3Rib2R5W2RhdGEtZXhwYW5kaW5nLXNlY3Rpb249XCInICsgJHRoaXNBdHRyICsgJ1wiXSwgdGhlYWRbZGF0YS1leHBhbmRpbmctc2VjdGlvbj1cIicgKyAkdGhpc0F0dHIgKyAnXCJdJylcblx0XHRcdC5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG5cblx0XHR9KVxuXG5cdFx0JCgnI3RyYW5zZmVyLWRldGFpbHMtc2VsbC1jdXJyZW5jeScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldikge1xuXHRcdFx0Y29uc29sZS5sb2coJ1ZhbHVlJywgJCh0aGlzKS52YWwoKSlcblx0XHRcdCQoJ1tkYXRhLWV4cGFuZGluZy1zZWN0aW9uPVwiaG93LW11Y2gtZG8teW91LXdhbnQtdG8tdHJhbnNmZXJcIl0nKS5hZGRDbGFzcygnZXhwYW5kZWQnKVxuXHRcdH0pXG5cblx0fSxcblxuXHRBc2lkZVN1bW1hcnk6ICgpID0+IHtcblxuXHRcdHZhciBzdW1tYXJ5Q29udGFpbmVyID0gJCgnLnRyYW5zZmVycy1zdW1tYXJ5Jyk7XG5cdFx0dmFyIHN1bW1hcnlUcmlnZ2VyID0gJCgnLnRyYW5zZmVycy1zdW1tYXJ5LXRpdGxlJyk7XG5cdFx0dmFyIGN1cnJlbnRTY3JlZW4gPSBGb3VuZGF0aW9uLk1lZGlhUXVlcnkuY3VycmVudDtcblx0XHR2YXIgc3VtbWFyeUhlaWdodDtcblxuXHRcdHZhciBtYWtlSXRTdGlja1RvRm9vdGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc3VtbWFyeUhlaWdodCA9IHN1bW1hcnlDb250YWluZXIub3V0ZXJIZWlnaHQodHJ1ZSktNjA7XG5cdFx0XHRzdW1tYXJ5Q29udGFpbmVyLmNzcygnYm90dG9tJywgJy0nICsgc3VtbWFyeUhlaWdodCArICdweCcpO1xuXG5cdFx0XHRzdW1tYXJ5VHJpZ2dlci5jbGljayhmdW5jdGlvbigpe1xuXG5cdFx0XHRcdHN1bW1hcnlDb250YWluZXIudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblx0XHRcdFx0aWYgKHN1bW1hcnlDb250YWluZXIuaXMoJy5vcGVuJykpIHsgXG5cdFx0XHRcdFx0c3VtbWFyeUNvbnRhaW5lci5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwgLScrIHN1bW1hcnlIZWlnaHQgKyAncHgpJyl9XG5cdFx0XHRcdGVsc2UgeyBcblx0XHRcdFx0XHRzdW1tYXJ5Q29udGFpbmVyLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLDApJylcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cblx0XHR2YXIgbWFrZUl0VW5zdHVjayA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0c3VtbWFyeUNvbnRhaW5lci5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHRcdFx0c3VtbWFyeUNvbnRhaW5lci5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwwKScpO1xuXHRcdFx0c3VtbWFyeVRyaWdnZXIudW5iaW5kKCk7XG5cdFx0fVxuXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7IFx0XHRcdFxuXHRcdFx0c3VtbWFyeUhlaWdodCA9IHN1bW1hcnlDb250YWluZXIub3V0ZXJIZWlnaHQodHJ1ZSktNjA7XG5cdFx0fSk7XHRcdFx0XHRcblx0XHRcblx0XHRpZiAoY3VycmVudFNjcmVlbiA9PSAnc21hbGwnKSB7IG1ha2VJdFN0aWNrVG9Gb290ZXIoKSB9IGVsc2UgeyBtYWtlSXRVbnN0dWNrKCkgfVxuXHR9LFxuXG5cdEN1cnJlbmN5Q29udHJhY3Q6ICgpID0+IHtcblxuXHRcdCQoJ3NlbGVjdCN0cmFuc2Zlci1kZXRhaWxzLXJlYXNvbi1mb3ItdHJhbnNmZXItYTAnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZXYpIHtcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcylcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMudmFsdWUpXG5cdFx0XHQkKCcub3B0aW9uLXRvZ2dsZS5vcHRpb24tJyArIHRoaXMudmFsdWUuY2hhckF0KDApICsgJy1ncm91cCcpLnJlbW92ZUNsYXNzKCdzaG93Jylcblx0XHRcdCQoJy5vcHRpb24tJyArIHRoaXMudmFsdWUpLmFkZENsYXNzKCdzaG93Jylcblx0XHRcdC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCR0aGlzLmF0dHIoJ2lkJyksICR0aGlzLnZhbCgpKVxuXHRcdFx0JCgnW2RhdGEtcm9sZT1cImJ1dHRvbi1jb250aW51ZVwiXScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJylcblx0XHR9KVxuXG5cdH0sXG5cblx0UHJvZmlsZTogKCkgPT4ge1xuXG5cdFx0JCgnW2RhdGEtaW5kZXgtbGluaz1cIk1hbmFnZUNhcmREZWxldGVcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykuY2xvc2VzdCgndHIucm93JykuYWRkQ2xhc3MoJ3ByZXNlbnRhdGlvbi1wcmVwYXJlLWRlbGV0ZScpXG5cdFx0fSlcblx0XHQkKCdbZGF0YS1yb2xlPVwiY29uZmlybS1kZWxldGlvblwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnLnByZXNlbnRhdGlvbi1wcmVwYXJlLWRlbGV0ZScpLnJlbW92ZSgpXG5cdFx0XHQvLyBUT0RPIC0gRmlndXJlIG91dCB3aHkgdGhpcyBkb2Vzbid0IHdvcmtcblx0XHRcdC8vJCgnI21hbmFnZS1yZWNpcGllbnRzLWRlbGV0ZScpLmZvdW5kYXRpb24oJ3JldmVhbCcsICdvcGVuJylcblx0XHRcdC8vIFRPRE8gLSBSZXBsYWNlIHRoaXMgaGFjazpcblx0XHRcdCQoJyNkZWxldGUtY2FyZCAubW9kYWwtY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpXG5cdFx0fSlcblxuXHRcdCQoJ1tkYXRhLWluZGV4LWxpbms9XCJNYW5hZ2VEZXZpY2VEZWxldGVcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykuY2xvc2VzdCgndHIucm93JykuYWRkQ2xhc3MoJ3ByZXNlbnRhdGlvbi1wcmVwYXJlLWRlbGV0ZScpXG5cdFx0fSlcblxuXHRcdCQoJ1tkYXRhLXJvbGU9XCJjb25maXJtLWRlbGV0aW9uXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCcucHJlc2VudGF0aW9uLXByZXBhcmUtZGVsZXRlJykucmVtb3ZlKClcblx0XHRcdCQoJyNkZWxldGUtZGV2aWNlIC5tb2RhbC1jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJylcblx0XHR9KVxuXG5cdH0sXG5cblx0UmF0ZUFsZXJ0OiAoKSA9PiB7XG5cblx0XHRjb25zb2xlLmxvZygnUmF0ZUFsZXJ0cygpJylcdFx0XG5cblx0XHQvLyBEZWxldGUgcm93XG5cdFx0JCgnW2RhdGEtaW5kZXgtbGluaz1cIk1hbmFnZVJlY2lwaWVudHNEZWxldGVcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdGbGFnIHRoaXMgZWxlbWVudCBmb3IgZGVsZXRpb24nLCAkKHRoaXMpLmNsb3Nlc3QoJ3RyLnJvdycpLmFkZENsYXNzKCdwcmVzZW50YXRpb24tcHJlcGFyZS1kZWxldGUnKSlcblx0XHR9KVxuXHRcdCQoJ1tkYXRhLXJvbGU9XCJjb25maXJtLWRlbGV0aW9uXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCcucHJlc2VudGF0aW9uLXByZXBhcmUtZGVsZXRlJykucmVtb3ZlKClcblx0XHRcdC8vIFRPRE8gLSBGaWd1cmUgb3V0IHdoeSB0aGlzIGRvZXNuJ3Qgd29ya1xuXHRcdFx0Ly8kKCcjbWFuYWdlLXJlY2lwaWVudHMtZGVsZXRlJykuZm91bmRhdGlvbigncmV2ZWFsJywgJ29wZW4nKVxuXHRcdFx0Ly8gVE9ETyAtIFJlcGxhY2UgdGhpcyBoYWNrOlxuXHRcdFx0JCgnI21hbmFnZS1yZWNpcGllbnRzLWRlbGV0ZSAubW9kYWwtY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpXG5cdFx0fSlcblxuXG5cblx0XHQkKCdzZWxlY3QjY3VycmVuY2llcy1pbnRlbmQtdG8tc2VsbC1jMCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldikge1xuXHRcdFx0Y29uc29sZS5sb2codGhpcy52YWx1ZSlcblx0XHRcdCQoJ1tkYXRhLWV4cGFuZGluZy1zZWN0aW9uPVwiaG93LW11Y2gtd291bGQteW91LWxpa2UtdG8tcGF5XCJdJykuYWRkQ2xhc3MoJ2V4cGFuZGVkJylcblx0XHR9KVxuXG5cdFx0JCgnc2VsZWN0I2N1cnJlbmNpZXMtaW50ZW5kLXRvLXNlbGwtYzAnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZXYpIHtcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMudmFsdWUpXG5cdFx0XHQkKCdbZGF0YS1leHBhbmRpbmctc2VjdGlvbj1cImhvdy1tdWNoLXdvdWxkLXlvdS1saWtlLXRvLXBheVwiXScpLmFkZENsYXNzKCdleHBhbmRlZCcpXG5cdFx0fSlcblxuXG5cdFx0JCgnLmJ1dHRvbi1vdXRsaW5lLmdldC1yYXRlJykuY2xpY2soZnVuY3Rpb24oZXYpIHtcblx0XHRcdGV2LnByZXZlbnREZWZhdWx0KClcblx0XHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XHQkKCdbZGF0YS1leHBhbmRpbmctc2VjdGlvbj1cImN1cnJlbnQtdGFyZ2V0cy1hbmQtcmF0ZXNcIl0nKS5hZGRDbGFzcygnZXhwYW5kZWQnKVxuXHRcdFx0Ly8kKCcudGVtcC1idG4tY29udGludWUnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKVxuXHRcdH0pXG5cblx0XHQkKCcuY29udGludWUtdG8tZmluYWxpc2UtYWxlcnQnKS5jbGljayhmdW5jdGlvbihldikge1xuXHRcdFx0ZXYucHJldmVudERlZmF1bHQoKVxuXHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKClcblx0XHRcdCQoJ1tkYXRhLWV4cGFuZGluZy1zZWN0aW9uPVwiZmluYWxpc2UteW91ci1hbGVydFwiXScpLmFkZENsYXNzKCdleHBhbmRlZCcpXG5cdFx0XHQvLyQoJy50ZW1wLWJ0bi1jb250aW51ZScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpXG5cdFx0fSlcblxuXHRcdCQoJ1tkYXRhLXJldmVhbC1pZD1cInJhdGUtYWxlcnRzLWRlbGV0ZVwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coJ1l1cCcsICQodGhpcykuY2xvc2VzdCgndHIucm93JykuYWRkQ2xhc3MoJ3ByZXNlbnRhdGlvbi1wcmVwYXJlLWRlbGV0ZScpKVxuXHRcdH0pXG5cblx0XHQkKCdbZGF0YS1yb2xlPVwiY29uZmlybS1kZWxldGlvblwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnLnByZXNlbnRhdGlvbi1wcmVwYXJlLWRlbGV0ZScpLnJlbW92ZSgpXG5cdFx0fSlcblxuXG5cdFx0Ly8gUmF0ZSBhbGVydCBhbmltYXRpb25cblx0XHRzZXRJbnRlcnZhbChmdW5jdGlvbigpIHsgXG5cdFx0XHRjb25zb2xlLmxvZygnUmF0ZSBhbGVydHMgdXBkYXRlJylcblx0XHRcdCQoJy5jdXJyZW50LXJhdGUnKS5hZGRDbGFzcygndXBkYXRlJylcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCQoJy5jdXJyZW50LXJhdGUnKS5yZW1vdmVDbGFzcygndXBkYXRlJylcblx0XHRcdH0sIDEwMDApXG5cdFx0fSwgMTAwMDApXG5cblxuXHR9LFxuXHRSZWNpcGllbnRzOiAoKSA9PiB7XG5cblx0XHQkKCdbZGF0YS1pbmRleC1saW5rPVwiTWFuYWdlUmVjaXBpZW50c0RlbGV0ZVwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coJ0ZsYWcgdGhpcyBlbGVtZW50IGZvciBkZWxldGlvbicsICQodGhpcykuY2xvc2VzdCgndHIucm93JykuYWRkQ2xhc3MoJ3ByZXNlbnRhdGlvbi1wcmVwYXJlLWRlbGV0ZScpKVxuXHRcdH0pXG5cblx0XHQkKCdbZGF0YS1yb2xlPVwiY29uZmlybS1kZWxldGlvblwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnLnByZXNlbnRhdGlvbi1wcmVwYXJlLWRlbGV0ZScpLnJlbW92ZSgpXG5cdFx0XHQvLyBUT0RPIC0gRmlndXJlIG91dCB3aHkgdGhpcyBkb2Vzbid0IHdvcmtcblx0XHRcdC8vJCgnI21hbmFnZS1yZWNpcGllbnRzLWRlbGV0ZScpLmZvdW5kYXRpb24oJ3JldmVhbCcsICdvcGVuJylcblx0XHRcdC8vIFRPRE8gLSBSZXBsYWNlIHRoaXMgaGFjazpcblx0XHRcdCQoJyNtYW5hZ2UtcmVjaXBpZW50cy1kZWxldGUgLm1vZGFsLWNsb3NlJykudHJpZ2dlcignY2xpY2snKVxuXHRcdH0pXG5cblx0XHQkKCdpbnB1dDpyYWRpb1tuYW1lPVwicmVjaXBpZW50LXR5cGVcIl0nKS5jaGFuZ2UoZnVuY3Rpb24oZXYpIHtcbiAgICBcdHZhciBvcHQgPSAkKHRoaXMpLnZhbCgpXG4gICAgXHRjb25zb2xlLmxvZygnQ2hhbmdlJywgb3B0KVxuICAgIFx0JCgnW2RhdGEtZXhwYW5kaW5nLXNlY3Rpb25dJykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJylcbiAgICBcdCQoJ1tkYXRhLWV4cGFuZGluZy1zZWN0aW9uPVwiJyArIG9wdCArICdcIl0nKS5hZGRDbGFzcygnZXhwYW5kZWQnKVxuICBcdH0pXG5cdH0sXG5cblx0QWN0aXZpdHlIaXN0b3J5OiAoKSA9PiB7XG5cdFx0Ly8gVE9ETzogUmVtb3ZlIHRoZSBiZWxvdyBhcyBpdCBpcyBubyBsb25nZXIgbmVlZGVkXG5cdFx0JCgnLnNpdGUtdHJhbnNmZXJzLXByZS1ib3VnaHQtY3VycmVuY3ktMDEnKVxuXHRcdFx0LmZpbmQoJy5zZWxlY3QtY29udGFpbmVyIHNlbGVjdCcpIFxuXHRcdFx0XHQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdCQoJ2FbZGF0YS1yb2xlPVwiYXBwbHktZmlsdGVyc1wiXScpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0fSk7XG5cdH0sXG5cblx0RGFzaGJvYXJkU21hbGw6ICgpID0+IHtcblxuXHRcdGlmIChGb3VuZGF0aW9uLk1lZGlhUXVlcnkuY3VycmVudCA9PSAnc21hbGwnKSB7XG5cblx0XHRcdCQoJy5kYXNoYm9hcmQtYnV0dG9ucycpLmluc2VydEFmdGVyKCQoJy5xdWljay1yYXRlLWZpbmRlcicpKTtcblx0XHRcdCQoJy5kYXNoYm9hcmQtY3JlYXRlLWFsZXJ0LWJ1dHRvbicpLmFwcGVuZFRvKCQoJy5jb2x1bW4tMicpKTtcblx0XHRcdCQoJy5kYXNoYm9hcmQtYWNjb3VudC1hbGVydHMnKS5pbnNlcnRCZWZvcmUoJy5kYXNoYm9hcmQtY3JlYXRlLWFsZXJ0LWJ1dHRvbicpO1xuXHRcdFx0Ly8kKCcubWFpbi1jb250YWluZXInKS5hcHBlbmQoJCgnLmRhc2hib2FyZC1jcmVhdGUtYWxlcnQtYnV0dG9uJykpO1xuXHRcdH1cblxuXHR9LFxuXG5cdERhc2hib2FyZE1lZGl1bTogKCkgPT4ge1xuXG5cdFx0JCgnLmRhc2hib2FyZC1idXR0b25zJykucHJlcGVuZFRvKCQoJy5jb2x1bW4tMicpKTtcblx0XHQkKCcuZGFzaGJvYXJkLWNyZWF0ZS1hbGVydC1idXR0b24nKS5hcHBlbmRUbygkKCcuY29sdW1uLTEnKSk7XG5cdFx0JCgnLmRhc2hib2FyZC1hY2NvdW50LWFsZXJ0cycpLmFwcGVuZFRvKCcuY29sdW1uLTEnKTtcblxuXHR9LFxuXG5cdEN1cnJlbmN5U2VsZWN0b3I6ICgpID0+IHtcblxuXG5cdFx0Ly8gZnVuY3Rpb24gdG8gbW9kaWZ5IHRoZSBzZWxlY3QyIHRlbXBsYXRlXG5cdFx0ZnVuY3Rpb24gZm9ybWF0U3RhdGUgKHN0YXRlKSB7XG5cdFx0ICAgIGlmICghc3RhdGUuaWQpIHsgcmV0dXJuIHN0YXRlLnRleHQ7IH0gLy8gZm9yIG9wdGdyb3VwXG5cdFx0ICAgIC8vIGluc2lkZSBodG1sIGZvciBlYWNoIG9wdGlvblxuXHRcdCAgICB2YXIgJHN0YXRlID0gJChcblx0XHQgICAgJzxkaXYgY2xhc3M9XCJmbGFnLWNvZGUtd3JhcHBlclwiPicgK1xuXHRcdCAgICAgICc8ZGl2IGNsYXNzPVwiZmxhZyAnICsgc3RhdGUuZWxlbWVudC52YWx1ZS50b1VwcGVyQ2FzZSgpICsgJ1wiPicgK1xuXHRcdCAgICAgICAgJzxzcGFuIGNsYXNzPVwiY3VycmVuY3ktY29kZVwiPicgKyBzdGF0ZS50ZXh0ICsgJzwvc3Bhbj4nICtcblx0XHQgICAgICAnPC9kaXY+JyArXG5cdFx0ICAgICc8L2Rpdj4nLy8gK1xuXHRcdCAgICAvLyc8c3BhbiBjbGFzcz1cImN1cnJlbmN5LW5hbWVcIj4nICsgc3RhdGUuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKSArICc8L3NwYW4+J1xuXHRcdCAgICApO1xuXHRcdCAgICByZXR1cm4gJHN0YXRlO1xuXHRcdH07XG5cblx0XHQvLyBmdW5jdGlvbiB0byBtb2RpZnkgdGhlIHNlYXJjaCBhcyBwZXIgZW50ZXJlZCBrZXl3b3JkXG5cdFx0ZnVuY3Rpb24gc2VhcmNoVGV4dCAocGFyYW1zLCBkYXRhKSB7XG5cdFx0ICBpZiAoJC50cmltKHBhcmFtcy50ZXJtKSA9PT0gJycpIHtcblx0XHQgICAgcmV0dXJuIGRhdGE7XG5cdFx0ICB9XG5cblx0XHQgIC8vIGNoZWNrIGVudGVyZWQga2V5d29yZFxuXHRcdCAgaWYgKFxuXHRcdCAgICBkYXRhLnRleHQudG9VcHBlckNhc2UoKS5pbmRleE9mKHBhcmFtcy50ZXJtLnRvVXBwZXJDYXNlKCkpID4gLTEgfHwgXG5cdFx0ICAgICQoZGF0YS5lbGVtZW50KS5hdHRyKFwiZGF0YS10aXRsZVwiKS50b1VwcGVyQ2FzZSgpLmluZGV4T2YocGFyYW1zLnRlcm0udG9VcHBlckNhc2UoKSkgPiAtMSB8fFxuXHRcdCAgICAkKGRhdGEuZWxlbWVudCkuYXR0cihcImRhdGEtY291bnRyeVwiKS50b1VwcGVyQ2FzZSgpLmluZGV4T2YocGFyYW1zLnRlcm0udG9VcHBlckNhc2UoKSkgPiAtMSB8fFxuXHRcdCAgICAkKGRhdGEuZWxlbWVudCkuYXR0cihcImRhdGEtYWxpYXNlc1wiKS50b1VwcGVyQ2FzZSgpLmluZGV4T2YocGFyYW1zLnRlcm0udG9VcHBlckNhc2UoKSkgPiAtMVxuXHRcdCAgKSB7XG5cdFx0ICAgIHZhciBtb2RpZmllZERhdGEgPSAkLmV4dGVuZCh7fSwgZGF0YSwgdHJ1ZSk7XG5cdFx0ICAgIHJldHVybiBtb2RpZmllZERhdGE7XG5cdFx0ICB9XG5cdFx0ICByZXR1cm4gbnVsbDtcblx0XHR9O1xuXG5cblx0XHQgICAgLy8gaW52b2tlIHNlbGVjdDIgb24gZnJvbS1jdXJyZW5jeSBzZWxlY3QtYm94XG5cdFx0ICAkKFwiLkN1cnJlbmN5RnJvbVwiKS5zZWxlY3QyKHtcblx0XHQgICAgICAvL3BsYWNlaG9sZGVyOiAnU2VsZWN0IGFuIG9wdGlvbicsXG5cdFx0ICAgICAgbWF0Y2hlcjogc2VhcmNoVGV4dCxcblx0XHQgICAgICB0ZW1wbGF0ZVJlc3VsdDogZm9ybWF0U3RhdGUsXG5cdFx0ICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGZvcm1hdFN0YXRlXG5cdFx0ICB9KTtcblxuXHRcdCAgLy8gaW52b2tlIHNlbGVjdDIgb24gdG8tY3VycmVuY3kgc2VsZWN0LWJveFxuXHRcdCAgJChcIi5DdXJyZW5jeVRvXCIpLnNlbGVjdDIoe1xuXHRcdCAgICAgIC8vcGxhY2Vob2xkZXI6ICdTZWxlY3QgYW4gb3B0aW9uJyxcblx0XHQgICAgICBtYXRjaGVyOiBzZWFyY2hUZXh0LFxuXHRcdCAgICAgIHRlbXBsYXRlUmVzdWx0OiBmb3JtYXRTdGF0ZSxcblx0XHQgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogZm9ybWF0U3RhdGVcblx0XHQgIH0pO1xuXHRcdCAgXG5cdFx0ICAkKCcuQ3VycmVuY3lGcm9tLCAuQ3VycmVuY3lUbycpLm9uKCdzZWxlY3QyOm9wZW4nLCBmdW5jdGlvbiAoZSkge1xuXHRcdCAgICAgICQoJy5zZWxlY3QyLXNlYXJjaCBpbnB1dCcpLmF0dHIoJ3BsYWNlaG9sZGVyJywnVHlwZSBjb3VudHJ5L2N1cnJlbmN5Jyk7XG5cblx0XHQgICAgICAvLyQoJy5zZWxlY3QyLXNlYXJjaCBpbnB1dCcpLnByb3AoJ2ZvY3VzJyxmYWxzZSk7XG5cdFx0ICB9KTtcblx0XHQgIFxuXHRcdCAgLy8gY3VycmVuY3kgc3dpdGNoIGJ1dHRvblxuXHRcdCAgJCgnI3N3aXRjaC1idG4nKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0ICAgIHZhciB2MSA9ICQoJyNmcm9tLWN1cnJlbmN5JykudmFsKCk7XG5cdFx0ICAgIHZhciB2MiA9ICQoJyN0by1jdXJyZW5jeScpLnZhbCgpO1xuXHRcdCAgICAkKCcjZnJvbS1jdXJyZW5jeScpLnZhbCh2MikudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0ICAgICQoJyN0by1jdXJyZW5jeScpLnZhbCh2MSkudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0ICAgIGUucHJldmVudERlZmF1bHQoKTtcblx0XHQgIH0pO1xuXG5cdFx0ICB2YXIgZnJvbVByZXZpb3VzID0gJCgnI2Zyb20tY3VycmVuY3knKS52YWwoKTtcblx0XHQgIHZhciB0b1ByZXZpb3VzID0gJCgnI3RvLWN1cnJlbmN5JykudmFsKCk7XG5cblx0XHQgIC8vIGF1dG8gY2hhbmdlIGlmIGZyb20tY3VycmVuY3kgaXMgc2FtZSBhcyB0by1jdXJyZW5jeVxuXHRcdCAgJCgnI2Zyb20tY3VycmVuY3knKS5mb2N1cyhmdW5jdGlvbigpIHtcblx0XHQgICAgLy8gU3RvcmUgdGhlIGN1cnJlbnQgdmFsdWUgb24gZm9jdXMsIGJlZm9yZSBpdCBjaGFuZ2VzXG5cdFx0ICAgIGZyb21QcmV2aW91cyA9IHRoaXMudmFsdWU7XG5cdFx0ICB9KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG5cdFx0ICAgIHZhciBmcm9tQ3VycmVudCA9ICQoJyNmcm9tLWN1cnJlbmN5JykudmFsKCk7XG5cdFx0ICAgIHZhciB0b0N1cnJlbnQgPSAkKCcjdG8tY3VycmVuY3knKS52YWwoKTtcblx0XHQgICAgaWYgKGZyb21DdXJyZW50ID09PSB0b0N1cnJlbnQpIHtcblx0XHQgICAgICAkKCcjdG8tY3VycmVuY3knKS52YWwoZnJvbVByZXZpb3VzKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHQgICAgfVxuXHRcdCAgICBmcm9tUHJldmlvdXMgPSB0aGlzLnZhbHVlO1xuXHRcdCAgfSk7XG5cblx0XHQgIC8vIGF1dG8gY2hhbmdlIGlmIGZyb20tY3VycmVuY3kgaXMgc2FtZSBhcyB0by1jdXJyZW5jeVxuXHRcdCAgJCgnI3RvLWN1cnJlbmN5JykuZm9jdXMoZnVuY3Rpb24oKSB7XG5cdFx0ICAgIC8vIFN0b3JlIHRoZSBjdXJyZW50IHZhbHVlIG9uIGZvY3VzLCBiZWZvcmUgaXQgY2hhbmdlc1xuXHRcdCAgICB0b1ByZXZpb3VzID0gdGhpcy52YWx1ZTtcblx0XHQgIH0pLmNoYW5nZShmdW5jdGlvbigpIHtcblx0XHQgICAgdmFyIGZyb21DdXJyZW50ID0gJCgnI2Zyb20tY3VycmVuY3knKS52YWwoKTtcblx0XHQgICAgdmFyIHRvQ3VycmVudCA9ICQoJyN0by1jdXJyZW5jeScpLnZhbCgpO1xuXHRcdCAgICBpZiAodG9DdXJyZW50ID09PSBmcm9tQ3VycmVudCkge1xuXHRcdCAgICAgICQoJyNmcm9tLWN1cnJlbmN5JykudmFsKHRvUHJldmlvdXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdCAgICB9XG5cdFx0ICAgIHRvUHJldmlvdXMgPSB0aGlzLnZhbHVlO1xuXHRcdCAgfSk7XG5cblx0fSxcblxuXHRDb3VudHJ5U2VsZWN0b3I6ICgpID0+IHtcblxuXHRcdFx0dmFyIGlzb0NvdW50cmllcyA9IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQXVzdHJhbGlhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNjFcIixcblx0XHRcdFx0XHRpZDogXCJBVVwiXG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVW5pdGVkIEtpbmdkb20sIEVuZ2xhbmQsIEdyZWF0IEJyaXRhaW5cIixcblx0XHRcdFx0XHR0ZXh0OiBcIis0NFwiLFxuXHRcdFx0XHRcdGlkOiBcIkdCXCJcblx0XHRcdFx0fSxcblxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJVbml0ZWQgU3RhdGVzLCBVU0FcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiVVNcIlxuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkFmZ2hhbmlzdGFuXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrOTNcIixcblx0XHRcdFx0XHRpZDogXCJBRlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkFsYW5kIElzbGFuZHNcIixcblx0XHRcdFx0XHR0ZXh0OiBcIiszNThcIixcblx0XHRcdFx0XHRpZDogXCJBWFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkFsYmFuaWFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIiszNTVcIixcblx0XHRcdFx0XHRpZDogXCJBTFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkFsZ2VyaWFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyMTNcIixcblx0XHRcdFx0XHRpZDogXCJEWlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkFtZXJpY2FuU2Ftb2FcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisxNjg0XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQVNcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJBbmRvcnJhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzc2XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQURcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJBbmdvbGFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyNDRcIixcblx0XHRcdFx0XHRpZDogXCJBT1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkFuZ3VpbGxhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMTI2NFwiLFxuXHRcdFx0XHRcdGlkOiBcIkFJXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQW50YXJjdGljYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY3MlwiLFxuXHRcdFx0XHRcdGlkOiBcIkFRXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQW50aWd1YSBhbmQgQmFyYnVkYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzEyNjhcIixcblx0XHRcdFx0XHRpZDogXCJBR1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkFyZ2VudGluYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzU0XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQVJcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJBcm1lbmlhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzc0XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQU1cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJBcnViYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI5N1wiLFxuXHRcdFx0XHRcdGlkOiBcIkFXXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQXVzdHJpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzQzXCIsXG5cdFx0XHRcdFx0aWQ6IFwiQVRcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJBemVyYmFpamFuXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrOTk0XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQVpcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJCYWhhbWFzXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMTI0MlwiLFxuXHRcdFx0XHRcdGlkOiBcIkJTXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQmFocmFpblwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzk3M1wiLFxuXHRcdFx0XHRcdGlkOiBcIkJIXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQmFuZ2xhZGVzaFwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzg4MFwiLFxuXHRcdFx0XHRcdGlkOiBcIkJEXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQmFyYmFkb3NcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisxMjQ2XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQkJcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJCZWxhcnVzXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzc1XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQllcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJCZWxnaXVtXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzJcIixcblx0XHRcdFx0XHRpZDogXCJCRVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkJlbGl6ZVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzUwMVwiLFxuXHRcdFx0XHRcdGlkOiBcIkJaXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQmVuaW5cIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyMjlcIixcblx0XHRcdFx0XHRpZDogXCJCSlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkJlcm11ZGFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisxNDQxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiQk1cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJCaHV0YW5cIixcblx0XHRcdFx0XHR0ZXh0OiBcIis5NzVcIixcblx0XHRcdFx0XHRpZDogXCJCVFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkJvbGl2aWEsIFBsdXJpbmF0aW9uYWwgU3RhdGUgb2ZcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis1OTFcIixcblx0XHRcdFx0XHRpZDogXCJCT1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkJvc25pYSBhbmQgSGVyemVnb3ZpbmFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIiszODdcIixcblx0XHRcdFx0XHRpZDogXCJCQVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkJvdHN3YW5hXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjY3XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQldcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJCcmF6aWxcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis1NVwiLFxuXHRcdFx0XHRcdGlkOiBcIkJSXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQnJpdGlzaCBJbmRpYW4gT2NlYW4gVGVycml0b3J5XCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjQ2XCIsXG5cdFx0XHRcdFx0aWQ6IFwiSU9cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJCcnVuZWkgRGFydXNzYWxhbVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY3M1wiLFxuXHRcdFx0XHRcdGlkOiBcIkJOXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQnVsZ2FyaWFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIiszNTlcIixcblx0XHRcdFx0XHRpZDogXCJCR1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkJ1cmtpbmEgRmFzb1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzIyNlwiLFxuXHRcdFx0XHRcdGlkOiBcIkJGXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQnVydW5kaVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI1N1wiLFxuXHRcdFx0XHRcdGlkOiBcIkJJXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQ2FtYm9kaWFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis4NTVcIixcblx0XHRcdFx0XHRpZDogXCJLSFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkNhbWVyb29uXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjM3XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQ01cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJDYW5hZGFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiQ0FcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJDYXBlIFZlcmRlXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjM4XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQ1ZcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJDYXltYW4gSXNsYW5kc1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKyAzNDVcIixcblx0XHRcdFx0XHRpZDogXCJLWVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkNlbnRyYWwgQWZyaWNhbiBSZXB1YmxpY1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzIzNlwiLFxuXHRcdFx0XHRcdGlkOiBcIkNGXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQ2hhZFwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzIzNVwiLFxuXHRcdFx0XHRcdGlkOiBcIlREXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQ2hpbGVcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis1NlwiLFxuXHRcdFx0XHRcdGlkOiBcIkNMXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQ2hpbmFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis4NlwiLFxuXHRcdFx0XHRcdGlkOiBcIkNOXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQ2hyaXN0bWFzIElzbGFuZFwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzYxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiQ1hcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJDb2NvcyAoS2VlbGluZykgSXNsYW5kc1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzYxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiQ0NcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJDb2xvbWJpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzU3XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQ09cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJDb21vcm9zXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjY5XCIsXG5cdFx0XHRcdFx0aWQ6IFwiS01cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJDb25nb1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI0MlwiLFxuXHRcdFx0XHRcdGlkOiBcIkNHXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQ29uZ28sIFRoZSBEZW1vY3JhdGljIFJlcHVibGljIG9mIHRoZSBDb25nb1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI0M1wiLFxuXHRcdFx0XHRcdGlkOiBcIkNEXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQ29vayBJc2xhbmRzXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNjgyXCIsXG5cdFx0XHRcdFx0aWQ6IFwiQ0tcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJDb3N0YSBSaWNhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNTA2XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQ1JcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJDb3RlIGQnSXZvaXJlXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjI1XCIsXG5cdFx0XHRcdFx0aWQ6IFwiQ0lcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJDcm9hdGlhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzg1XCIsXG5cdFx0XHRcdFx0aWQ6IFwiSFJcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJDdWJhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNTNcIixcblx0XHRcdFx0XHRpZDogXCJDVVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkN5cHJ1c1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzM1N1wiLFxuXHRcdFx0XHRcdGlkOiBcIkNZXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiQ3plY2ggUmVwdWJsaWNcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis0MjBcIixcblx0XHRcdFx0XHRpZDogXCJDWlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkRlbm1hcmtcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis0NVwiLFxuXHRcdFx0XHRcdGlkOiBcIkRLXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiRGppYm91dGlcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyNTNcIixcblx0XHRcdFx0XHRpZDogXCJESlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkRvbWluaWNhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMTc2N1wiLFxuXHRcdFx0XHRcdGlkOiBcIkRNXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiRG9taW5pY2FuIFJlcHVibGljXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMTg0OVwiLFxuXHRcdFx0XHRcdGlkOiBcIkRPXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiRWN1YWRvclwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzU5M1wiLFxuXHRcdFx0XHRcdGlkOiBcIkVDXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiRWd5cHRcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyMFwiLFxuXHRcdFx0XHRcdGlkOiBcIkVHXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiRWwgU2FsdmFkb3JcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis1MDNcIixcblx0XHRcdFx0XHRpZDogXCJTVlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkVxdWF0b3JpYWwgR3VpbmVhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjQwXCIsXG5cdFx0XHRcdFx0aWQ6IFwiR1FcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJFcml0cmVhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjkxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiRVJcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJFc3RvbmlhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzcyXCIsXG5cdFx0XHRcdFx0aWQ6IFwiRUVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJFdGhpb3BpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI1MVwiLFxuXHRcdFx0XHRcdGlkOiBcIkVUXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiRmFsa2xhbmQgSXNsYW5kcyAoTWFsdmluYXMpXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNTAwXCIsXG5cdFx0XHRcdFx0aWQ6IFwiRktcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJGYXJvZSBJc2xhbmRzXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjk4XCIsXG5cdFx0XHRcdFx0aWQ6IFwiRk9cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJGaWppXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNjc5XCIsXG5cdFx0XHRcdFx0aWQ6IFwiRkpcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJGaW5sYW5kXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzU4XCIsXG5cdFx0XHRcdFx0aWQ6IFwiRklcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJGcmFuY2VcIixcblx0XHRcdFx0XHR0ZXh0OiBcIiszM1wiLFxuXHRcdFx0XHRcdGlkOiBcIkZSXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiRnJlbmNoIEd1aWFuYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzU5NFwiLFxuXHRcdFx0XHRcdGlkOiBcIkdGXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiRnJlbmNoIFBvbHluZXNpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY4OVwiLFxuXHRcdFx0XHRcdGlkOiBcIlBGXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiR2Fib25cIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyNDFcIixcblx0XHRcdFx0XHRpZDogXCJHQVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkdhbWJpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzIyMFwiLFxuXHRcdFx0XHRcdGlkOiBcIkdNXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiR2VvcmdpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzk5NVwiLFxuXHRcdFx0XHRcdGlkOiBcIkdFXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiR2VybWFueVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzQ5XCIsXG5cdFx0XHRcdFx0aWQ6IFwiREVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJHaGFuYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzIzM1wiLFxuXHRcdFx0XHRcdGlkOiBcIkdIXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiR2licmFsdGFyXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzUwXCIsXG5cdFx0XHRcdFx0aWQ6IFwiR0lcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJHcmVlY2VcIixcblx0XHRcdFx0XHR0ZXh0OiBcIiszMFwiLFxuXHRcdFx0XHRcdGlkOiBcIkdSXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiR3JlZW5sYW5kXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjk5XCIsXG5cdFx0XHRcdFx0aWQ6IFwiR0xcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJHcmVuYWRhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMTQ3M1wiLFxuXHRcdFx0XHRcdGlkOiBcIkdEXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiR3VhZGVsb3VwZVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzU5MFwiLFxuXHRcdFx0XHRcdGlkOiBcIkdQXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiR3VhbVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzE2NzFcIixcblx0XHRcdFx0XHRpZDogXCJHVVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkd1YXRlbWFsYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzUwMlwiLFxuXHRcdFx0XHRcdGlkOiBcIkdUXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiR3Vlcm5zZXlcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis0NFwiLFxuXHRcdFx0XHRcdGlkOiBcIkdHXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiR3VpbmVhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjI0XCIsXG5cdFx0XHRcdFx0aWQ6IFwiR05cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJHdWluZWEtQmlzc2F1XCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjQ1XCIsXG5cdFx0XHRcdFx0aWQ6IFwiR1dcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJHdXlhbmFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis1OTVcIixcblx0XHRcdFx0XHRpZDogXCJHWVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkhhaXRpXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNTA5XCIsXG5cdFx0XHRcdFx0aWQ6IFwiSFRcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJIb2x5IFNlZSAoVmF0aWNhbiBDaXR5IFN0YXRlKVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzM3OVwiLFxuXHRcdFx0XHRcdGlkOiBcIlZBXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiSG9uZHVyYXNcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis1MDRcIixcblx0XHRcdFx0XHRpZDogXCJITlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkhvbmcgS29uZ1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzg1MlwiLFxuXHRcdFx0XHRcdGlkOiBcIkhLXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiSHVuZ2FyeVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzM2XCIsXG5cdFx0XHRcdFx0aWQ6IFwiSFVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJJY2VsYW5kXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzU0XCIsXG5cdFx0XHRcdFx0aWQ6IFwiSVNcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJJbmRpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzkxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiSU5cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJJbmRvbmVzaWFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis2MlwiLFxuXHRcdFx0XHRcdGlkOiBcIklEXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiSXJhbiwgSXNsYW1pYyBSZXB1YmxpYyBvZiBQZXJzaWFuIEd1bGZcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis5OFwiLFxuXHRcdFx0XHRcdGlkOiBcIklSXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiSXJhcVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzk2NFwiLFxuXHRcdFx0XHRcdGlkOiBcIklRXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiSXJlbGFuZFwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzM1M1wiLFxuXHRcdFx0XHRcdGlkOiBcIklFXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiSXNsZSBvZiBNYW5cIixcblx0XHRcdFx0XHR0ZXh0OiBcIis0NFwiLFxuXHRcdFx0XHRcdGlkOiBcIklNXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiSXNyYWVsXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrOTcyXCIsXG5cdFx0XHRcdFx0aWQ6IFwiSUxcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJJdGFseVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzM5XCIsXG5cdFx0XHRcdFx0aWQ6IFwiSVRcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJKYW1haWNhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMTg3NlwiLFxuXHRcdFx0XHRcdGlkOiBcIkpNXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiSmFwYW5cIixcblx0XHRcdFx0XHR0ZXh0OiBcIis4MVwiLFxuXHRcdFx0XHRcdGlkOiBcIkpQXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiSmVyc2V5XCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNDRcIixcblx0XHRcdFx0XHRpZDogXCJKRVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkpvcmRhblwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzk2MlwiLFxuXHRcdFx0XHRcdGlkOiBcIkpPXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiS2F6YWtoc3RhblwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzc3XCIsXG5cdFx0XHRcdFx0aWQ6IFwiS1pcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJLZW55YVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI1NFwiLFxuXHRcdFx0XHRcdGlkOiBcIktFXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiS2lyaWJhdGlcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis2ODZcIixcblx0XHRcdFx0XHRpZDogXCJLSVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIktvcmVhLCBEZW1vY3JhdGljIFBlb3BsZSdzIFJlcHVibGljIG9mIEtvcmVhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrODUwXCIsXG5cdFx0XHRcdFx0aWQ6IFwiS1BcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJLb3JlYSwgUmVwdWJsaWMgb2YgU291dGggS29yZWFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis4MlwiLFxuXHRcdFx0XHRcdGlkOiBcIktSXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiS3V3YWl0XCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrOTY1XCIsXG5cdFx0XHRcdFx0aWQ6IFwiS1dcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJLeXJneXpzdGFuXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrOTk2XCIsXG5cdFx0XHRcdFx0aWQ6IFwiS0dcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJMYW9zXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrODU2XCIsXG5cdFx0XHRcdFx0aWQ6IFwiTEFcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJMYXR2aWFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIiszNzFcIixcblx0XHRcdFx0XHRpZDogXCJMVlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkxlYmFub25cIixcblx0XHRcdFx0XHR0ZXh0OiBcIis5NjFcIixcblx0XHRcdFx0XHRpZDogXCJMQlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkxlc290aG9cIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyNjZcIixcblx0XHRcdFx0XHRpZDogXCJMU1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkxpYmVyaWFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyMzFcIixcblx0XHRcdFx0XHRpZDogXCJMUlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkxpYnlhbiBBcmFiIEphbWFoaXJpeWFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyMThcIixcblx0XHRcdFx0XHRpZDogXCJMWVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkxpZWNodGVuc3RlaW5cIixcblx0XHRcdFx0XHR0ZXh0OiBcIis0MjNcIixcblx0XHRcdFx0XHRpZDogXCJMSVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIkxpdGh1YW5pYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzM3MFwiLFxuXHRcdFx0XHRcdGlkOiBcIkxUXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTHV4ZW1ib3VyZ1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzM1MlwiLFxuXHRcdFx0XHRcdGlkOiBcIkxVXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTWFjYW9cIixcblx0XHRcdFx0XHR0ZXh0OiBcIis4NTNcIixcblx0XHRcdFx0XHRpZDogXCJNT1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk1hY2Vkb25pYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzM4OVwiLFxuXHRcdFx0XHRcdGlkOiBcIk1LXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTWFkYWdhc2NhclwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI2MVwiLFxuXHRcdFx0XHRcdGlkOiBcIk1HXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTWFsYXdpXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjY1XCIsXG5cdFx0XHRcdFx0aWQ6IFwiTVdcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJNYWxheXNpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzYwXCIsXG5cdFx0XHRcdFx0aWQ6IFwiTVlcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJNYWxkaXZlc1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzk2MFwiLFxuXHRcdFx0XHRcdGlkOiBcIk1WXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTWFsaVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzIyM1wiLFxuXHRcdFx0XHRcdGlkOiBcIk1MXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTWFsdGFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIiszNTZcIixcblx0XHRcdFx0XHRpZDogXCJNVFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk1hcnNoYWxsIElzbGFuZHNcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis2OTJcIixcblx0XHRcdFx0XHRpZDogXCJNSFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk1hcnRpbmlxdWVcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis1OTZcIixcblx0XHRcdFx0XHRpZDogXCJNUVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk1hdXJpdGFuaWFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyMjJcIixcblx0XHRcdFx0XHRpZDogXCJNUlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk1hdXJpdGl1c1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzIzMFwiLFxuXHRcdFx0XHRcdGlkOiBcIk1VXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTWF5b3R0ZVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI2MlwiLFxuXHRcdFx0XHRcdGlkOiBcIllUXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTWV4aWNvXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNTJcIixcblx0XHRcdFx0XHRpZDogXCJNWFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk1pY3JvbmVzaWEsIEZlZGVyYXRlZCBTdGF0ZXMgb2YgTWljcm9uZXNpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY5MVwiLFxuXHRcdFx0XHRcdGlkOiBcIkZNXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTW9sZG92YVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzM3M1wiLFxuXHRcdFx0XHRcdGlkOiBcIk1EXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTW9uYWNvXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzc3XCIsXG5cdFx0XHRcdFx0aWQ6IFwiTUNcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJNb25nb2xpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzk3NlwiLFxuXHRcdFx0XHRcdGlkOiBcIk1OXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTW9udGVuZWdyb1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzM4MlwiLFxuXHRcdFx0XHRcdGlkOiBcIk1FXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTW9udHNlcnJhdFwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzE2NjRcIixcblx0XHRcdFx0XHRpZDogXCJNU1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk1vcm9jY29cIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyMTJcIixcblx0XHRcdFx0XHRpZDogXCJNQVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk1vemFtYmlxdWVcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyNThcIixcblx0XHRcdFx0XHRpZDogXCJNWlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk15YW5tYXJcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis5NVwiLFxuXHRcdFx0XHRcdGlkOiBcIk1NXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTmFtaWJpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI2NFwiLFxuXHRcdFx0XHRcdGlkOiBcIk5BXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTmF1cnVcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis2NzRcIixcblx0XHRcdFx0XHRpZDogXCJOUlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk5lcGFsXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrOTc3XCIsXG5cdFx0XHRcdFx0aWQ6IFwiTlBcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJOZXRoZXJsYW5kc1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzMxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiTkxcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJOZXRoZXJsYW5kcyBBbnRpbGxlc1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzU5OVwiLFxuXHRcdFx0XHRcdGlkOiBcIkFOXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTmV3IENhbGVkb25pYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY4N1wiLFxuXHRcdFx0XHRcdGlkOiBcIk5DXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTmV3IFplYWxhbmRcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis2NFwiLFxuXHRcdFx0XHRcdGlkOiBcIk5aXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTmljYXJhZ3VhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNTA1XCIsXG5cdFx0XHRcdFx0aWQ6IFwiTklcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJOaWdlclwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzIyN1wiLFxuXHRcdFx0XHRcdGlkOiBcIk5FXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTmlnZXJpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzIzNFwiLFxuXHRcdFx0XHRcdGlkOiBcIk5HXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTml1ZVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY4M1wiLFxuXHRcdFx0XHRcdGlkOiBcIk5VXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiTm9yZm9sayBJc2xhbmRcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis2NzJcIixcblx0XHRcdFx0XHRpZDogXCJORlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzE2NzBcIixcblx0XHRcdFx0XHRpZDogXCJNUFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIk5vcndheVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzQ3XCIsXG5cdFx0XHRcdFx0aWQ6IFwiTk9cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJPbWFuXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrOTY4XCIsXG5cdFx0XHRcdFx0aWQ6IFwiT01cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJQYWtpc3RhblwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzkyXCIsXG5cdFx0XHRcdFx0aWQ6IFwiUEtcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJQYWxhdVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY4MFwiLFxuXHRcdFx0XHRcdGlkOiBcIlBXXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiUGFsZXN0aW5pYW4gVGVycml0b3J5LCBPY2N1cGllZFwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzk3MFwiLFxuXHRcdFx0XHRcdGlkOiBcIlBTXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiUGFuYW1hXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNTA3XCIsXG5cdFx0XHRcdFx0aWQ6IFwiUEFcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJQYXB1YSBOZXcgR3VpbmVhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNjc1XCIsXG5cdFx0XHRcdFx0aWQ6IFwiUEdcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJQYXJhZ3VheVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzU5NVwiLFxuXHRcdFx0XHRcdGlkOiBcIlBZXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiUGVydVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzUxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiUEVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJQaGlsaXBwaW5lc1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzYzXCIsXG5cdFx0XHRcdFx0aWQ6IFwiUEhcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJQaXRjYWlyblwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzg3MlwiLFxuXHRcdFx0XHRcdGlkOiBcIlBOXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiUG9sYW5kXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNDhcIixcblx0XHRcdFx0XHRpZDogXCJQTFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlBvcnR1Z2FsXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzUxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiUFRcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJQdWVydG8gUmljb1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzE5MzlcIixcblx0XHRcdFx0XHRpZDogXCJQUlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlFhdGFyXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrOTc0XCIsXG5cdFx0XHRcdFx0aWQ6IFwiUUFcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJSb21hbmlhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNDBcIixcblx0XHRcdFx0XHRpZDogXCJST1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlJ1c3NpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzdcIixcblx0XHRcdFx0XHRpZDogXCJSVVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlJ3YW5kYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI1MFwiLFxuXHRcdFx0XHRcdGlkOiBcIlJXXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiUmV1bmlvblwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI2MlwiLFxuXHRcdFx0XHRcdGlkOiBcIlJFXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiU2FpbnQgQmFydGhlbGVteVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzU5MFwiLFxuXHRcdFx0XHRcdGlkOiBcIkJMXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiU2FpbnQgSGVsZW5hLCBBc2NlbnNpb24gYW5kIFRyaXN0YW4gRGEgQ3VuaGFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyOTBcIixcblx0XHRcdFx0XHRpZDogXCJTSFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlNhaW50IEtpdHRzIGFuZCBOZXZpc1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzE4NjlcIixcblx0XHRcdFx0XHRpZDogXCJLTlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlNhaW50IEx1Y2lhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMTc1OFwiLFxuXHRcdFx0XHRcdGlkOiBcIkxDXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiU2FpbnQgTWFydGluXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNTkwXCIsXG5cdFx0XHRcdFx0aWQ6IFwiTUZcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTYWludCBQaWVycmUgYW5kIE1pcXVlbG9uXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNTA4XCIsXG5cdFx0XHRcdFx0aWQ6IFwiUE1cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTYWludCBWaW5jZW50IGFuZCB0aGUgR3JlbmFkaW5lc1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzE3ODRcIixcblx0XHRcdFx0XHRpZDogXCJWQ1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlNhbW9hXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrNjg1XCIsXG5cdFx0XHRcdFx0aWQ6IFwiV1NcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTYW4gTWFyaW5vXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzc4XCIsXG5cdFx0XHRcdFx0aWQ6IFwiU01cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTYW8gVG9tZSBhbmQgUHJpbmNpcGVcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyMzlcIixcblx0XHRcdFx0XHRpZDogXCJTVFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlNhdWRpIEFyYWJpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzk2NlwiLFxuXHRcdFx0XHRcdGlkOiBcIlNBXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiU2VuZWdhbFwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzIyMVwiLFxuXHRcdFx0XHRcdGlkOiBcIlNOXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiU2VyYmlhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMzgxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiUlNcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTZXljaGVsbGVzXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjQ4XCIsXG5cdFx0XHRcdFx0aWQ6IFwiU0NcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTaWVycmEgTGVvbmVcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyMzJcIixcblx0XHRcdFx0XHRpZDogXCJTTFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlNpbmdhcG9yZVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY1XCIsXG5cdFx0XHRcdFx0aWQ6IFwiU0dcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTbG92YWtpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzQyMVwiLFxuXHRcdFx0XHRcdGlkOiBcIlNLXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiU2xvdmVuaWFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIiszODZcIixcblx0XHRcdFx0XHRpZDogXCJTSVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlNvbG9tb24gSXNsYW5kc1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY3N1wiLFxuXHRcdFx0XHRcdGlkOiBcIlNCXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiU29tYWxpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI1MlwiLFxuXHRcdFx0XHRcdGlkOiBcIlNPXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiU291dGggQWZyaWNhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjdcIixcblx0XHRcdFx0XHRpZDogXCJaQVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlNvdXRoIFN1ZGFuXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjExXCIsXG5cdFx0XHRcdFx0aWQ6IFwiU1NcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTb3V0aCBHZW9yZ2lhIGFuZCB0aGUgU291dGggU2FuZHdpY2ggSXNsYW5kc1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzUwMFwiLFxuXHRcdFx0XHRcdGlkOiBcIkdTXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiU3BhaW5cIixcblx0XHRcdFx0XHR0ZXh0OiBcIiszNFwiLFxuXHRcdFx0XHRcdGlkOiBcIkVTXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiU3JpIExhbmthXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrOTRcIixcblx0XHRcdFx0XHRpZDogXCJMS1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlN1ZGFuXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjQ5XCIsXG5cdFx0XHRcdFx0aWQ6IFwiU0RcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTdXJpbmFtZVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzU5N1wiLFxuXHRcdFx0XHRcdGlkOiBcIlNSXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiU3ZhbGJhcmQgYW5kIEphbiBNYXllblwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzQ3XCIsXG5cdFx0XHRcdFx0aWQ6IFwiU0pcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTd2F6aWxhbmRcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyNjhcIixcblx0XHRcdFx0XHRpZDogXCJTWlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlN3ZWRlblwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzQ2XCIsXG5cdFx0XHRcdFx0aWQ6IFwiU0VcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTd2l0emVybGFuZFwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzQxXCIsXG5cdFx0XHRcdFx0aWQ6IFwiQ0hcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJTeXJpYW4gQXJhYiBSZXB1YmxpY1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzk2M1wiLFxuXHRcdFx0XHRcdGlkOiBcIlNZXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVGFpd2FuXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrODg2XCIsXG5cdFx0XHRcdFx0aWQ6IFwiVFdcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJUYWppa2lzdGFuXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrOTkyXCIsXG5cdFx0XHRcdFx0aWQ6IFwiVEpcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJUYW56YW5pYSwgVW5pdGVkIFJlcHVibGljIG9mIFRhbnphbmlhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjU1XCIsXG5cdFx0XHRcdFx0aWQ6IFwiVFpcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJUaGFpbGFuZFwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY2XCIsXG5cdFx0XHRcdFx0aWQ6IFwiVEhcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJUaW1vci1MZXN0ZVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY3MFwiLFxuXHRcdFx0XHRcdGlkOiBcIlRMXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVG9nb1wiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzIyOFwiLFxuXHRcdFx0XHRcdGlkOiBcIlRHXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVG9rZWxhdVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY5MFwiLFxuXHRcdFx0XHRcdGlkOiBcIlRLXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVG9uZ2FcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis2NzZcIixcblx0XHRcdFx0XHRpZDogXCJUT1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlRyaW5pZGFkIGFuZCBUb2JhZ29cIixcblx0XHRcdFx0XHR0ZXh0OiBcIisxODY4XCIsXG5cdFx0XHRcdFx0aWQ6IFwiVFRcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJUdW5pc2lhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMjE2XCIsXG5cdFx0XHRcdFx0aWQ6IFwiVE5cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJUdXJrZXlcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis5MFwiLFxuXHRcdFx0XHRcdGlkOiBcIlRSXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVHVya21lbmlzdGFuXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrOTkzXCIsXG5cdFx0XHRcdFx0aWQ6IFwiVE1cIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJUdXJrcyBhbmQgQ2FpY29zIElzbGFuZHNcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisxNjQ5XCIsXG5cdFx0XHRcdFx0aWQ6IFwiVENcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJUdXZhbHVcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis2ODhcIixcblx0XHRcdFx0XHRpZDogXCJUVlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlVnYW5kYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI1NlwiLFxuXHRcdFx0XHRcdGlkOiBcIlVHXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVWtyYWluZVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzM4MFwiLFxuXHRcdFx0XHRcdGlkOiBcIlVBXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVW5pdGVkIEFyYWIgRW1pcmF0ZXNcIixcblx0XHRcdFx0XHR0ZXh0OiBcIis5NzFcIixcblx0XHRcdFx0XHRpZDogXCJBRVwiXG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVXJ1Z3VheVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzU5OFwiLFxuXHRcdFx0XHRcdGlkOiBcIlVZXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVXpiZWtpc3RhblwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzk5OFwiLFxuXHRcdFx0XHRcdGlkOiBcIlVaXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVmFudWF0dVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY3OFwiLFxuXHRcdFx0XHRcdGlkOiBcIlZVXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVmVuZXp1ZWxhLCBCb2xpdmFyaWFuIFJlcHVibGljIG9mIFZlbmV6dWVsYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzU4XCIsXG5cdFx0XHRcdFx0aWQ6IFwiVkVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJWaWV0bmFtXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrODRcIixcblx0XHRcdFx0XHRpZDogXCJWTlwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlZpcmdpbiBJc2xhbmRzLCBCcml0aXNoXCIsXG5cdFx0XHRcdFx0dGV4dDogXCIrMTI4NFwiLFxuXHRcdFx0XHRcdGlkOiBcIlZHXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiVmlyZ2luIElzbGFuZHMsIFUuUy5cIixcblx0XHRcdFx0XHR0ZXh0OiBcIisxMzQwXCIsXG5cdFx0XHRcdFx0aWQ6IFwiVklcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJXYWxsaXMgYW5kIEZ1dHVuYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzY4MVwiLFxuXHRcdFx0XHRcdGlkOiBcIldGXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiWWVtZW5cIixcblx0XHRcdFx0XHR0ZXh0OiBcIis5NjdcIixcblx0XHRcdFx0XHRpZDogXCJZRVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcIlphbWJpYVwiLFxuXHRcdFx0XHRcdHRleHQ6IFwiKzI2MFwiLFxuXHRcdFx0XHRcdGlkOiBcIlpNXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiWmltYmFid2VcIixcblx0XHRcdFx0XHR0ZXh0OiBcIisyNjNcIixcblx0XHRcdFx0XHRpZDogXCJaV1wiXG5cdFx0XHRcdH1cblx0XHRcdF1cblxuXG5cdFx0ZnVuY3Rpb24gZm9ybWF0Q291bnRyeSAoY291bnRyeSkge1xuXG5cdFx0XHRpZiAoIWNvdW50cnkuaWQpIHsgcmV0dXJuIGNvdW50cnkudGV4dCB9XG5cdFx0XHRjb25zb2xlLmxvZygnV2hvIGFtIEknLCApXG5cdFx0XHR2YXIgJGNvdW50cnkgPSAkKFxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJmbGFnLWljb24gZmxhZy1pY29uLScgKyAoY291bnRyeS5pZCkudG9Mb3dlckNhc2UoKSArJ1wiIGRhdGEtdGl0bGU9XCInICsgY291bnRyeS5uYW1lICsgJ1wiPjwvc3Bhbj4nICtcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiZmxhZy10ZXh0XCI+JyArIGNvdW50cnkudGV4dCArICc8L3NwYW4+J1xuXHRcdFx0KVxuXHRcdFx0cmV0dXJuICRjb3VudHJ5XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2VhcmNoTmFtZSAocGFyYW1zLCBkYXRhKSB7XG5cdFx0ICBpZiAoJC50cmltKHBhcmFtcy50ZXJtKSA9PT0gJycpIHtcblx0XHQgICAgcmV0dXJuIGRhdGE7XG5cdFx0ICB9XG5cblx0XHQgIGlmIChcblx0XHQgICAgZGF0YS50ZXh0LnRvVXBwZXJDYXNlKCkuaW5kZXhPZihwYXJhbXMudGVybS50b1VwcGVyQ2FzZSgpKSA+IC0xIHx8IFxuXHRcdCAgICAgJChkYXRhLmVsZW1lbnQpLmF0dHIoXCJkYXRhLWNvZGVcIikudG9VcHBlckNhc2UoKS5pbmRleE9mKHBhcmFtcy50ZXJtLnRvVXBwZXJDYXNlKCkpID4gLTFcblx0XHQgICkge1xuXHRcdCAgICB2YXIgbW9kaWZpZWREYXRhID0gJC5leHRlbmQoe30sIGRhdGEsIHRydWUpO1xuXHRcdCAgICByZXR1cm4gbW9kaWZpZWREYXRhO1xuXHRcdCAgfVxuXHRcdCAgcmV0dXJuIG51bGw7XG5cdFx0ICB9O1xuXG5cblx0XHQgIHZhciAkYnVpbGRTZWxlY3Q7XG5cblx0XHQgICQoaXNvQ291bnRyaWVzKS5lYWNoKGZ1bmN0aW9uKGkpeyAgXHRcblx0XHQgIFx0JGJ1aWxkU2VsZWN0ICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIGlzb0NvdW50cmllc1tpXS5pZCArJ1wiIGRhdGEtY29kZT1cIicgKyBpc29Db3VudHJpZXNbaV0udGV4dCArJ1wiIGRhdGEtbmFtZT1cIicgKyBpc29Db3VudHJpZXNbaV0ubmFtZSArICdcIj4nICsgaXNvQ291bnRyaWVzW2ldLnRleHQgKyAnPC9vcHRpb24+JzsgXG5cdFx0ICB9KVxuXG5cdFx0ICB2YXIgJHNlbGVjdEVsZW1lbnRzID0gJCgnI2NvdW50cnktY29kZSwgI2NvdW50cnktY29kZS1sYW5kbGluZScpO1xuXG5cdFx0ICAkc2VsZWN0RWxlbWVudHMuYXBwZW5kKCRidWlsZFNlbGVjdCk7XG5cblxuXHRcdC8vIFNlbGVjdDJcblx0XHQkc2VsZWN0RWxlbWVudHMuc2VsZWN0Mih7XG5cdFx0XHR0ZW1wbGF0ZVJlc3VsdDogZm9ybWF0Q291bnRyeSxcblx0XHRcdHRlbXBsYXRlU2VsZWN0aW9uOiBmb3JtYXRDb3VudHJ5LFxuXHRcdFx0bWF0Y2hlcjogc2VhcmNoTmFtZVxuXHRcdH0pXG5cblx0XHR9XG59XG5cbmNvbnN0IEluaXQgPSAoKSA9PiB7XG5cdC8vY29uc29sZS5sb2coJ0hlbGxvIGh1bWFuJyk7XG5cblx0Ly8gQXBwLldoaXRlbGFiZWwuSW5pdCgpIC8vIFRPRE8gLSBSZS1lbmFibGUgSW5pdCBmb3IgZ2VuZXJhbCBmZWF0dXJlc1xuXG5cdC8vQXBwLldoaXRlbGFiZWwuQ2xpZW50U3dpdGNoKClcblx0QXBwLkZvcm1zLkluaXQoKVxuXHRBcHAuVUkuTmF2aWdhdGlvbigpXG5cblx0Ly8gVE9ETyAtIEFkZCBjb25kaXRpb25hbFxuXHRpZiAoJCgnLmZvb3Rlci1oZWxwJykubGVuZ3RoKSBBcHAuVUkuSGVscCgpXG5cblx0aWYgKCQoJy50ZW1wbGF0ZScpLmhhc0NsYXNzKCd0ZW1wbGF0ZS1yZWdpc3RyYXRpb24nKSkge1xuXHRcdFByb3RvdHlwZS5SZWdpc3RyYXRpb24oKVxuXHR9XG5cblx0aWYgKCQoJy50ZW1wbGF0ZScpLmhhc0NsYXNzKCdzaXRlLXRyYW5zZmVycycpKSB7XG5cdFx0UHJvdG90eXBlLlRyYW5zZmVycygpXG5cdH1cblxuXHRpZiAoJCgnLnRlbXBsYXRlJykuaGFzQ2xhc3MoJ3NpdGUtYnV5LWN1cnJlbmN5JykpIHtcblx0XHRQcm90b3R5cGUuQ3VycmVuY3lDb250cmFjdCgpXG5cdH1cblxuXHRpZiAoJCgnLnRlbXBsYXRlJykuaGFzQ2xhc3MoJ3NpdGUtcGF5LWNvbnRyYWN0JykpIHtcblx0XHRQcm90b3R5cGUuQ3VycmVuY3lDb250cmFjdCgpXG5cdH1cblxuXHRpZiAoJCgnLnRlbXBsYXRlJykuaGFzQ2xhc3MoJ3NpdGUtcmF0ZS1hbGVydHMnKSkge1xuXHRcdFByb3RvdHlwZS5SYXRlQWxlcnQoKVxuXHR9XG5cblx0aWYgKCQoJy50ZW1wbGF0ZScpLmhhc0NsYXNzKCdzaXRlLXJlY2lwaWVudHMnKSkge1xuXHRcdFByb3RvdHlwZS5SZWNpcGllbnRzKClcblx0fVxuXG5cdGlmICgkKCcudGVtcGxhdGUnKS5oYXNDbGFzcygnc2l0ZS10cmFuc2ZlcnMtcHJlLWJvdWdodC1jdXJyZW5jeS0wMScpKSB7XG5cdFx0UHJvdG90eXBlLkFjdGl2aXR5SGlzdG9yeSgpXG5cdH1cblxuXHRpZiAoJCgnLnRlbXBsYXRlJykuaGFzQ2xhc3MoJ3NpdGUtcGFnZS1wcm9maWxlJykpIHtcblx0XHRQcm90b3R5cGUuUHJvZmlsZSgpXG5cdH1cblxuXHRpZiAoJCgnLnRlbXBsYXRlJykuaGFzQ2xhc3MoJ3NpdGUtdHJhbnNmZXJzJykgfHxcblx0XHQkKCcudGVtcGxhdGUnKS5oYXNDbGFzcygnc2l0ZS1idXktY3VycmVuY3knKSkge1xuXG5cdFx0UHJvdG90eXBlLkFzaWRlU3VtbWFyeSgpXG5cdH1cblxuXHRpZiAoJCgnLnRlbXBsYXRlJykuaGFzQ2xhc3MoJ3NpdGUtcGFnZS1kYXNoYm9hcmQnKSkge1xuXHRcdFByb3RvdHlwZS5EYXNoYm9hcmRTbWFsbCgpXG5cdFx0UHJvdG90eXBlLkN1cnJlbmN5U2VsZWN0b3IoKVxuXHR9XG5cblx0aWYgKCQoJy50ZW1wbGF0ZScpLmhhc0NsYXNzKCdzaXRlLXJlZ2lzdHJhdGlvbi0wMycpIHx8XG5cdFx0JCgnLnRlbXBsYXRlJykuaGFzQ2xhc3MoJ3NpdGUtcGFnZS1wcm9maWxlJykpIHtcblxuXHRcdFByb3RvdHlwZS5Db3VudHJ5U2VsZWN0b3IoKVxuXHR9XG5cdFxuXG5cdC8qKlxuXHQgKiBHZW5lcmFsIEJ1dHRvbiBMaW5rc1xuXHQgKi9cblxuXHR2YXIgJGJ1dHRvbnMgPSAkKCdidXR0b25bZGF0YS1oeXBlcmxpbmtdOm5vdChbZGF0YS1yb2xlPVwiY29uZmlybS1kZWxldGlvblwiXSknKVxuXHQkYnV0dG9ucy5jbGljayhmdW5jdGlvbihldikgeyBcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0bGV0ICR0aGlzID0gJCh0aGlzKVxuXHRcdGNvbnNvbGUubG9nKCdEYXRhIGh5cGVybGluaycsICR0aGlzLmF0dHIoJ2RhdGEtaHlwZXJsaW5rJykpXG5cdFx0aWYgKCR0aGlzLmF0dHIoJ2RhdGEtaHlwZXJsaW5rJykubGVuZ3RoID4gMCkge1xuXHRcdFx0ZG9jdW1lbnQubG9jYXRpb24gPSAkdGhpcy5hdHRyKCdkYXRhLWh5cGVybGluaycpXG5cdFx0fVxuXHR9KVxuXG5cblx0LyoqXG5cdCAqIFRhYiBUb2dnbGVzXG5cdCAqL1xuXHR2YXIgJHRhYlRvZ2dsZXMgPSAkKCcudGFiLXRvZ2dsZScpXG5cdCR0YWJUb2dnbGVzLmNsaWNrKGZ1bmN0aW9uKGV2KSB7XG5cdFx0ZXYucHJldmVudERlZmF1bHQoKVxuXHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0bGV0ICR0aGlzID0gJCh0aGlzKVxuXHRcdGxldCAkdGFiR3JvdXAgPSAkdGhpcy5hdHRyKCdkYXRhLXRhYi1ncm91cCcpXG5cdFx0JCgnLnRhYi10b2dnbGVbZGF0YS10YWItZ3JvdXA9XCInICsgJHRhYkdyb3VwICsgJ1wiXSwgLnRhYi1wYWdlLWNvbnRhaW5lcltkYXRhLXRhYi1ncm91cD1cIicgKyAkdGFiR3JvdXAgKyAnXCJdJylcblx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblx0XHQkKCcudGFiLXBhZ2UtY29udGFpbmVyW2RhdGEtdGFiLWdyb3VwPVwiJyArICR0YWJHcm91cCArICdcIl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcblx0XHQkdGhpcy5hZGRDbGFzcygnYWN0aXZlJylcblx0XHQkKCcudGFiLXBhZ2UtY29udGFpbmVyW2RhdGEtdGFiLXRvZ2dsZT1cIicgKyAkdGhpcy5hdHRyKCdkYXRhLXRhYi1wYWdlJykgKyAnXCJdJylcblx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJylcblx0fSlcblxuXG5cblx0JCgnW2RhdGEtb3ZlcnJpZGVdJykuY2xpY2soZnVuY3Rpb24oZXYpIHtcblx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpXG5cdFx0dmFyICRmbiA9ICR0aGlzLmF0dHIoJ2RhdGEtb3ZlcnJpZGUnKVxuXHRcdGlmICgkZm4gPT0gJ2dvLWJhY2snKSBoaXN0b3J5LmdvKC0xKVxuXHR9KVxuXG5cblx0JCgnW2RhdGEtb3BlbicpLmNsaWNrKGZ1bmN0aW9uKGV2KXtcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9KVxuXG59XG5cblxuLyoqXG4gKiBqUXVlcnkgUGx1Z2luc1xuICovXG5cblxuLy8gVE9ETyAtIEFjdHVhbGx5IG1ha2UgbWUgd29ya1xuXG4vLyBUb2dnbGUgUGFzc3dvcmQgTWFza1xuLyooZnVuY3Rpb24oJCkge1xuICAgICQudG9nZ2xlU2hvd1Bhc3N3b3JkID0gZnVuY3Rpb24ob3B0cykge1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG4gICAgICAgICAgICBmaWVsZDogXCIjcGFzc3dvcmRcIixcbiAgICAgICAgICAgIGNvbnRyb2w6IFwiI3RvZ2dsZV9zaG93X3Bhc3N3b3JkXCIsXG4gICAgICAgIH0sIG9wdHMpO1xuXG4gICAgICAgIHZhciBjb250cm9sID0gJChzZXR0aW5ncy5jb250cm9sKTtcbiAgICAgICAgdmFyIGZpZWxkID0gJChzZXR0aW5ncy5maWVsZClcblxuICAgICAgICBjb250cm9sLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGNvbnRyb2wuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICBmaWVsZC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH07XG59KGpRdWVyeSkpO1xuLy8kLnRvZ2dsZVNob3dQYXNzd29yZCh7ZmllbGQ6ICcjdGVzdDEnLCBjb250cm9sOiAnI3Rlc3QyJyB9KTtcbiovXG5cblxuLy8gVE9ETzogYmUgY29uc2lzdGVudCBvbiB0aGUgc2luZ2xlIG9yIGRvdWJsZSBxdW90ZXNcblxuXG5cbiQoZnVuY3Rpb24oKSB7ICBcblx0JCgnaW5wdXRbbmFtZT1hZGQtYW5vdGhlci1wZXJzb25dJykuY2hhbmdlKGZ1bmN0aW9uKCkgeyAgICBcbiAgICAvLyAkKFwiI3RoZWlyLWRldGFpbHNcIikuaGlkZSgpO1xuICAgIGlmKCQodGhpcykudmFsKCkgPT0gXCJZZXNcIil7ICAgXG4gICAgICAkKCcjdGhlaXItZGV0YWlscycpLnNsaWRlRG93bihcInNsb3dcIik7XG4gICAgfVxuICAgIGVsc2UgaWYoJCh0aGlzKS52YWwoKSA9PSBcIk5vXCIpe1xuICAgICAgJCgnI3RoZWlyLWRldGFpbHMnKS5zbGlkZVVwKFwic2xvd1wiKTtcbiAgICB9XG5cdH0pO1xufSk7XG5cbiQoZnVuY3Rpb24oKSB7ICBcblx0JChcIi5jaGFuZ2UtYWRkcmVzc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgXHQkKHRoaXMpLnBhcmVudCgnLmNvbHVtbnMnKS5oaWRlKCk7XG4gIFx0JCgnLmFkZC1uZXctYWRkcmVzcycpLnNsaWRlRG93bihcInNsb3dcIik7XG4gIH0pO1xufSk7XG5cbiQoZnVuY3Rpb24oKSB7IFxuXHQkKFwic2VsZWN0I3RpdGxlXCIpLmNoYW5nZShmdW5jdGlvbigpe1xuXHRcdHZhciBkZGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpO1xuIFx0XHR2YXIgc2VsZWN0ZWRWYWx1ZSA9IGRkbC5vcHRpb25zW2RkbC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcblx0XHRpZiAoc2VsZWN0ZWRWYWx1ZSA9PSBcIk90aGVyXCIpIHtcbiAgXHRcdCQoJy5zcGVjaWZ5Jykuc2hvdygpO1xuICBcdH1cbiAgXHRlbHNlIHtcbiAgXHRcdCQoJy5zcGVjaWZ5JykuaGlkZSgpO1x0XG4gIFx0fVxuXHR9KTsgXHRcbn0pO1xuXG5cbiQoZnVuY3Rpb24oKSB7IFxuXHQkKFwic2VsZWN0I3NlbGVjdC1jdXJyZW5jeVwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcblx0XHR2YXIgZGRsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3QtY3VycmVuY3lcIik7XG4gXHRcdHZhciBzZWxlY3RlZFZhbHVlID0gZGRsLm9wdGlvbnNbZGRsLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuIFx0XHQvLyAoc2VsZWN0ZWRWYWx1ZSA9PSBcIlVTRFwiKSB8fCBzaG91bGQgYmUgcmVtb3ZlZCBmb3IgcHJvZHVjdGlvblxuXHRcdGlmICgoc2VsZWN0ZWRWYWx1ZSA9PSBcIlVTRFwiKSB8fCAoc2VsZWN0ZWRWYWx1ZSA9PSBcIjRfQkhEXCIpIHx8IChzZWxlY3RlZFZhbHVlID09IFwiN19DQURcIikgfHwgKHNlbGVjdGVkVmFsdWUgPT0gXCI0OF9VU0RcIikpICB7XG4gIFx0XHQkKCcucmVjaXBpZW50cy1hZGRyZXNzJykuc2hvdygpO1xuICBcdH1cbiAgXHRlbHNlIHtcbiAgXHRcdCQoJy5yZWNpcGllbnRzLWFkZHJlc3MnKS5oaWRlKCk7XHRcbiAgXHR9XG5cdH0pOyBcdFxufSk7XG5cbiQoZnVuY3Rpb24oKSB7ICBcblx0dmFyIHJvd0NvdW50ID0gJCgnLmRhc2hib2FyZC15b3VyLXJlY2lwaWVudHMgdHInKS5sZW5ndGg7XG5cdC8vIGFsZXJ0KHJvd0NvdW50KTtcblx0Ly8gVE9ETzogQ29udmVydCB0aGlzIGluIGNsYXNzIHN3aXRjaGluZ1xuXHRpZiAocm93Q291bnQgPD0gMyApIHtcblx0XHQkKCcuc2hvdy1hbGwtcmVjaXBpZW50cycpLmhpZGUoKTtcblx0fVxufSk7XG5cblxuJChmdW5jdGlvbigpIHsgIFxuXHQkKFwiLnRvZ2dsZS1zaG93OmZpcnN0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICBcdCQodGhpcykuaGlkZSgpO1xuICBcdCQoJy5uZXctZW1haWwtLXBhbmVsJykuc2xpZGVEb3duKFwic2xvd1wiKTtcbiAgfSk7XG5cbiAgJCgnLnRvZ2dsZS1oaWRlOmZpcnN0LCAubmV3LWVtYWlsLS1wYW5lbCBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgXHQkKCcubmV3LWVtYWlsLS1wYW5lbCcpLnNsaWRlVXAoXCJzbG93XCIsIGZ1bmN0aW9uKCl7XG4gIFx0XHQkKCcudG9nZ2xlLXNob3cnKS5lcSgwKS5zaG93KCk7XG4gIFx0fSk7XG4gIFx0XG4gIH0pO1xuICBcblx0JChcIi50b2dnbGUtc2hvdzpsYXN0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICBcdCQodGhpcykuaGlkZSgpO1xuICBcdCQoJy5uZXctcGFzc3dvcmQtLXBhbmVsJykuc2xpZGVEb3duKFwic2xvd1wiKTtcbiAgfSk7XG4gICQoJy50b2dnbGUtaGlkZTpsYXN0LCAubmV3LXBhc3N3b3JkLS1wYW5lbCBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgXHQkKCcubmV3LXBhc3N3b3JkLS1wYW5lbCcpLnNsaWRlVXAoXCJzbG93XCIsIGZ1bmN0aW9uKCl7XG5cdFx0JCgnLnRvZ2dsZS1zaG93JykuZXEoMSkuc2hvdygpO1xuICBcdH0pO1xuICB9KTtcblxuICAkKCcubmV3LXBhc3N3b3JkLS1wYW5lbCBidXR0b24sIC5uZXctZW1haWwtLXBhbmVsIGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gIFx0XHQkKCcuc3RhdHVzLW5vdGlmaWNhdGlvbi5oaWRlJykuaGlkZSgpLnJlbW92ZUNsYXNzKCdoaWRlJykuZmFkZUluKCk7XG4gIFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gIFx0XHRcdCQoJy5zdGF0dXMtbm90aWZpY2F0aW9uJykuZmFkZU91dCgpLmFkZENsYXNzKCdoaWRlJyk7XG4gIFx0XHR9LCAyMDAwKVxuICBcdFx0XG4gIH0pXG59KTtcblxuXG4kKGZ1bmN0aW9uKCkge1xuXHQkKCcjeWVzLXRjJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2ggPSAkKHRoaXMpLCBjO1xuICAgIGlmIChjaC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgJCgnYnV0dG9uW2RhdGEtZm9ybS1zZWN0aW9uLWFjdGl2ZT1cImFjY291bnRcIl0nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnYnV0dG9uW2RhdGEtZm9ybS1zZWN0aW9uLWFjdGl2ZT1cImFjY291bnRcIl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgIH1cblx0fSk7XG59KTtcblxuXG4vLyBDRElOLTE4ODRcbi8vIEZ1bmN0aW9uIGZvciBjb3B5IGxpbmsgdG8gY2xpcGJvYXJkXG4kKGZ1bmN0aW9uKCkge1xuIFx0JChcIi5jb3B5LWxpbmtcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJChcIi5zaGFyZS1saW5rIGlucHV0XCIpLmZvY3VzKCk7XG4gICAgJChcIi5zaGFyZS1saW5rIGlucHV0XCIpLnNlbGVjdCgpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcbiAgfSk7XG59KTtcblxuXG5cblxuXG4kKGZ1bmN0aW9uKCkgeyAgXG5cdCQoJyN0cmFuc2Zlci1kZXRhaWxzLXJlYXNvbi1mb3ItdHJhbnNmZXItMScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHQkKCcudHJhbnNmZXItZGV0YWlscy1yZWNpcGllbnQtZGV0YWlscy1vbmUnKS5zbGlkZURvd24oXCJzbG93XCIpO1xuXHRcdCQoJy5leHBhbmRpbmctc2VjdGlvbicpLnNsaWRlRG93bihcInNsb3dcIik7XG5cdH0pO1xuXHQkKCdbZGF0YS1yb2xlPVwiYWRkLXBheWVlXCJdJykuZXEoMCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0JCgnLnRyYW5zZmVyLWRldGFpbHMtcmVjaXBpZW50LWRldGFpbHMtdHdvJykuc2xpZGVEb3duKFwic2xvd1wiKTtcblx0XHQkKCcudHJhbnNmZXItZGV0YWlscy1yZWNpcGllbnQtZGV0YWlscy10d28gLmlucHV0LWNvbnRhaW5lcicpLmxhc3QoKS5jc3MoXCJtYXJnaW5cIiwgXCIwXCIpO1xuXHRcdCQoJ1tkYXRhLXJvbGU9XCJhZGQtcGF5ZWVcIl0nKS5lcSgwKS5oaWRlKCk7XG5cdH0pO1xuXHQkKCdbZGF0YS1yb2xlPVwiYWRkLXBheWVlXCJdJykuZXEoMSkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0JCgnLnRyYW5zZmVyLWRldGFpbHMtcmVjaXBpZW50LWRldGFpbHMtdGhyZWUnKS5zbGlkZURvd24oXCJzbG93XCIpO1xuXHRcdCQoJ1tkYXRhLXJvbGU9XCJkZWxldGUtcGF5ZWVcIl0nKS5lcSgwKS5oaWRlKCk7XG5cdFx0JCgnW2RhdGEtcm9sZT1cImFkZC1wYXllZVwiXScpLmVxKDEpLmhpZGUoKTtcblx0fSk7XG5cblx0JCgnW2RhdGEtcm9sZT1cImRlbGV0ZS1wYXllZVwiXScpLmVxKDApLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdCQoJy50cmFuc2Zlci1kZXRhaWxzLXJlY2lwaWVudC1kZXRhaWxzLXR3bycpLnNsaWRlVXAoXCJzbG93XCIpO1xuXHRcdCQoJ1tkYXRhLXJvbGU9XCJhZGQtcGF5ZWVcIl0nKS5lcSgwKS5zaG93KCk7XG5cdH0pO1xuXHQkKCdbZGF0YS1yb2xlPVwiZGVsZXRlLXBheWVlXCJdJykuZXEoMSkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0JCgnLnRyYW5zZmVyLWRldGFpbHMtcmVjaXBpZW50LWRldGFpbHMtdGhyZWUnKS5zbGlkZVVwKFwic2xvd1wiKTtcblx0XHQkKCdbZGF0YS1yb2xlPVwiZGVsZXRlLXBheWVlXCJdJykuZXEoMCkuc2hvdygpO1xuXHRcdCQoJ1tkYXRhLXJvbGU9XCJhZGQtcGF5ZWVcIl0nKS5lcSgxKS5zaG93KCk7XG5cdH0pO1xuXHRcblxufSk7XG5cbiQoZnVuY3Rpb24oKSB7XG5cdCQoJyNmcm9tLCAjdG8nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXHRcdGlmKCQodGhpcykudmFsKCkubGVuZ3RoICE9IDAgKSB7XG5cdFx0XHQkKHRoaXMpLm5leHQoJ2xhYmVsJykuYWRkQ2xhc3MoJ3NocmluaycpO1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoJy5pbnB1dC1jb250YWluZXInKS5hZGRDbGFzcygnc21hbGwtbGFiZWwnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkKHRoaXMpLm5leHQoJ2xhYmVsJykucmVtb3ZlQ2xhc3MoJ3NocmluaycpO1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoJy5pbnB1dC1jb250YWluZXInKS5yZW1vdmVDbGFzcygnc21hbGwtbGFiZWwnKTtcblx0XHR9XG5cdH0pO1xufSk7XG5cbiQoZnVuY3Rpb24oKSB7ICBcblx0dmFyICRlbHNUb0hpZGUgPSAkKCcubWFpbi1jb250YWluZXIsIC5tYWluLWZvb3RlciwgLnN0YXR1cy1ub3RpZmljYXRpb24sIC5mb290ZXItaGVscCcpO1xuXG5cdCQoXCIubW9iaWxlLW1lbnUtdG9nZ2xlLS1jb250YWluZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIFx0aWYgKCQoXCIubWFpbi1uYXZcIikuaGFzQ2xhc3MoXCJvcGVuXCIpKSB7XG4gIFx0XHQkZWxzVG9IaWRlLmhpZGUoKTtcbiAgXHRcdFxuICBcdH1cbiAgXHRlbHNlIHtcbiAgXHRcdCRlbHNUb0hpZGUuc2hvdygpO1xuICBcdH1cblx0fSk7XG59KTtcblxuXG4kKGZ1bmN0aW9uKCkgeyAgXG5cdCQoJy5zd2FwJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzKS5maW5kKFwiLmltZ1wiKS50b2dnbGVDbGFzcygnc2hvdycpO1xuICAgICQoJy5maWx0ZXJzJykuc2xpZGVUb2dnbGUoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufSk7XG5cblxuJChmdW5jdGlvbigpIHsgIFxuXHR2YXIgTm90aWZpY2FpdG9uQ29udGFpbmVyID0gJCgnLnN0YXR1cy1ub3RpZmljYXRpb24nKTtcblxuXHROb3RpZmljYWl0b25Db250YWluZXIuZmluZCgnW2RhdGEtcm9sZT1cImNsb3NlXCJdJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdE5vdGlmaWNhaXRvbkNvbnRhaW5lci5mYWRlT3V0KGZ1bmN0aW9uKCl7IE5vdGlmaWNhaXRvbkNvbnRhaW5lci5yZW1vdmUoKTsgfSk7XG5cdH0pXG59KTtcblxuJChmdW5jdGlvbigpIHsgXG5cdCQoJ1tsaW5rLWV4cGFuZGluZy1zZWN0aW9uXScpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cdFx0dmFyICR0YXJnZXRTZWN0aW9uID0gJCh0aGlzKS5hdHRyKCdsaW5rLWV4cGFuZGluZy1zZWN0aW9uJyk7XG5cdFx0JCgnW2RhdGEtZXhwYW5kaW5nLXNlY3Rpb249JysgJHRhcmdldFNlY3Rpb24gKyddJykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cblx0fSlcbn0pO1xuXG4vLyAkKGZ1bmN0aW9uKCkgeyBcbi8vIFx0JCgnZm9ybS5xdWljay1yYXRlLWZpbmRlciBzZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XG4vLyBcdFx0JCh0aGlzKS5wYXJlbnQoJy5zZWxlY3QtY29udGFpbmVyJykuZmluZCgnbGFiZWwnKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKCQodGhpcykuc2VsZWN0MignZGF0YScpWzBdWyd0ZXh0J10pO1xuLy8gXHR9KVxuLy8gfSk7XG5cbiQoZnVuY3Rpb24oKSB7IFxuXHQkKCcjcmVjaXBpZW50LWdldHMtY29udGFpbmVyIC5DdXJyZW5jeVRvJykudmFsKCdVU0QnKTtcbn0pO1xuXG5cbiQoZnVuY3Rpb24oKSB7XG5cdGlmKCQoJy5zaXRlLXRyYW5zZmVycy0wMycpLmxlbmd0aCkge1xuXHRcdCQoJyNhZGQtbmV3LWNhcmQgW2RhdGEtcm9sZT1cImJ1dHRvbi1jb250aW51ZVwiXScpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cdFx0XHQkKCcubW9kYWwtY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpXG5cdFx0XHQkKCcuc3RhdHVzLW5vdGlmaWNhdGlvbi5oaWRlJykuaGlkZSgpLnJlbW92ZUNsYXNzKCdoaWRlJykuZmFkZUluKCk7XG5cdFx0fSlcblx0fSBcbn0pO1xuXG4vLy8gU0hPVyBISURFIFBBU1NXT1JEXG4vLy8gaHR0cDovL2ZvdW5kYXRpb24uenVyYi5jb20vYnVpbGRpbmctYmxvY2tzL2Jsb2Nrcy9zaG93LXBhc3N3b3JkLmh0bWxcblxuJCgnYnV0dG9uW2RhdGEtcm9sZT1cInNob3ctcGFzc3dvcmRcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXG5cdHZhciBpbnB1dFBhc3N3b3JkID0gJCh0aGlzKS5wYXJlbnQoJy5pbnB1dC1jb250YWluZXInKS5maW5kKCdpbnB1dCcpLmVxKDApO1xuXHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdjaGVja2VkJyk7XG5cblx0Ly92YXIgaW5wdXRQYXNzd29yZCA9ICQoJy5pbnB1dC1wYXNzd29yZCcpO1xuXG4gIGlmKGlucHV0UGFzc3dvcmQuYXR0cigndHlwZScpID09ICdwYXNzd29yZCcpXG4gICAgY2hhbmdlVHlwZShpbnB1dFBhc3N3b3JkLCAndGV4dCcpO1xuXG4gIGVsc2VcbiAgICBjaGFuZ2VUeXBlKGlucHV0UGFzc3dvcmQsICdwYXNzd29yZCcpO1xuIFxuICByZXR1cm4gZmFsc2U7XG59KTtcblxuZnVuY3Rpb24gY2hhbmdlVHlwZSh4LCB0eXBlKSB7XG4gIGlmKHgucHJvcCgndHlwZScpID09IHR5cGUpXG4gIHJldHVybiB4OyAvL1RoYXQgd2FzIGVhc3kuXG4gIHRyeSB7XG4gICAgcmV0dXJuIHgucHJvcCgndHlwZScsIHR5cGUpOyAvL1N0dXBpZCBJRSBzZWN1cml0eSB3aWxsIG5vdCBhbGxvdyB0aGlzXG4gIH0gY2F0Y2goZSkge1xuICAgIC8vVHJ5IHJlLWNyZWF0aW5nIHRoZSBlbGVtZW50ICh5ZXAuLi4gdGhpcyBzdWNrcylcbiAgICAvL2pRdWVyeSBoYXMgbm8gaHRtbCgpIG1ldGhvZCBmb3IgdGhlIGVsZW1lbnQsIHNvIHdlIGhhdmUgdG8gcHV0IGludG8gYSBkaXYgZmlyc3RcbiAgICB2YXIgaHRtbCA9ICQoXCI8ZGl2PlwiKS5hcHBlbmQoeC5jbG9uZSgpKS5odG1sKCk7XG4gICAgdmFyIHJlZ2V4ID0gL3R5cGU9KFxcXCIpPyhbXlxcXCJcXHNdKykoXFxcIik/LzsgLy9tYXRjaGVzIHR5cGU9dGV4dCBvciB0eXBlPVwidGV4dFwiXG4gICAgLy9JZiBubyBtYXRjaCwgd2UgYWRkIHRoZSB0eXBlIGF0dHJpYnV0ZSB0byB0aGUgZW5kOyBvdGhlcndpc2UsIHdlIHJlcGxhY2VcbiAgICB2YXIgdG1wID0gJChodG1sLm1hdGNoKHJlZ2V4KSA9PSBudWxsID9cbiAgICAgIGh0bWwucmVwbGFjZShcIj5cIiwgJyB0eXBlPVwiJyArIHR5cGUgKyAnXCI+JykgOlxuICAgICAgaHRtbC5yZXBsYWNlKHJlZ2V4LCAndHlwZT1cIicgKyB0eXBlICsgJ1wiJykgKTtcbiAgICAvL0NvcHkgZGF0YSBmcm9tIG9sZCBlbGVtZW50XG4gICAgdG1wLmRhdGEoJ3R5cGUnLCB4LmRhdGEoJ3R5cGUnKSApO1xuICAgIHZhciBldmVudHMgPSB4LmRhdGEoJ2V2ZW50cycpO1xuICAgIHZhciBjYiA9IGZ1bmN0aW9uKGV2ZW50cykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9CaW5kIGFsbCBwcmlvciBldmVudHNcbiAgICAgICAgICAgIGZvcihpIGluIGV2ZW50cylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIHkgPSBldmVudHNbaV07XG4gICAgICAgICAgICAgIGZvcihqIGluIHkpXG4gICAgICAgICAgICAgICAgdG1wLmJpbmQoaSwgeVtqXS5oYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0oZXZlbnRzKTtcbiAgICAgICAgeC5yZXBsYWNlV2l0aCh0bXApO1xuICAgIHNldFRpbWVvdXQoY2IsIDEwKTsgLy9XYWl0IGEgYml0IHRvIGNhbGwgZnVuY3Rpb25cbiAgICByZXR1cm4gdG1wO1xuICB9XG59XG5cblxuLy8gRklMRSBVUExPQUQgQlVUVE9OU1xuLypcblx0QnkgT3N2YWxkYXMgVmFsdXRpcywgd3d3Lm9zdmFsZGFzLmluZm9cblx0QXZhaWxhYmxlIGZvciB1c2UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4qL1xuXG47KCBmdW5jdGlvbiAoIGRvY3VtZW50LCB3aW5kb3csIGluZGV4IClcbntcblx0dmFyIGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuaW5wdXQtZmlsZS11cGxvYWQtYnV0dG9ucyBpbnB1dCcgKTtcblx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCggaW5wdXRzLCBmdW5jdGlvbiggaW5wdXQgKVxuXHR7XG5cdFx0dmFyIGxhYmVsXHQgPSBpbnB1dC5uZXh0RWxlbWVudFNpYmxpbmcsXG5cdFx0XHRsYWJlbFZhbCA9IGxhYmVsLmlubmVySFRNTDtcblxuXHRcdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoICdjaGFuZ2UnLCBmdW5jdGlvbiggZSApXG5cdFx0e1xuXHRcdFx0dmFyIGZpbGVOYW1lID0gJyc7XG5cdFx0XHRpZiggdGhpcy5maWxlcyAmJiB0aGlzLmZpbGVzLmxlbmd0aCA+IDEgKVxuXHRcdFx0XHRmaWxlTmFtZSA9ICggdGhpcy5nZXRBdHRyaWJ1dGUoICdkYXRhLW11bHRpcGxlLWNhcHRpb24nICkgfHwgJycgKS5yZXBsYWNlKCAne2NvdW50fScsIHRoaXMuZmlsZXMubGVuZ3RoICk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGZpbGVOYW1lID0gZS50YXJnZXQudmFsdWUuc3BsaXQoICdcXFxcJyApLnBvcCgpO1xuXG5cdFx0XHRpZiggZmlsZU5hbWUgKVxuXHRcdFx0XHRsYWJlbC5xdWVyeVNlbGVjdG9yKCAnc3BhbicgKS5pbm5lckhUTUwgPSBmaWxlTmFtZTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0bGFiZWwuaW5uZXJIVE1MID0gbGFiZWxWYWw7XG5cdFx0fSk7XG5cblx0XHQvLyBGaXJlZm94IGJ1ZyBmaXhcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCAnZm9jdXMnLCBmdW5jdGlvbigpeyBpbnB1dC5jbGFzc0xpc3QuYWRkKCAnaGFzLWZvY3VzJyApOyB9KTtcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIGZ1bmN0aW9uKCl7IGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoICdoYXMtZm9jdXMnICk7IH0pO1xuXHR9KTtcbn0oIGRvY3VtZW50LCB3aW5kb3csIDAgKSk7XG5cblxuLy8gU0hPVyBNT1JFXG4kKCBmdW5jdGlvbigpIHtcblx0JCgnW2RhdGEtcm9sZT1cInNob3ctbW9yZVwiXScpLmNsaWNrKGZ1bmN0aW9uKGV2KXtcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0dmFyICR0YXJnZXRTZWN0aW9uTmFtZSA9ICQoJyMnKyQodGhpcykuYXR0cignZGF0YS1zZWN0aW9uJykpO1xuXHRcdHZhciBudW1iZXJFbGVtID0gJCh0aGlzKS5hdHRyKCdkYXRhLW51bWJlcicpO1xuXHRcdGlmICghbnVtYmVyRWxlbSkgbnVtYmVyRWxlbSA9IDU7IFxuXG5cdFx0JCgnLmhpZGUnLCAkdGFyZ2V0U2VjdGlvbk5hbWUpLnNsaWNlKDAsIG51bWJlckVsZW0pLmhpZGUoKS5yZW1vdmVDbGFzcygnaGlkZScpLmZhZGVJbigpO1xuXG5cdFx0aWYgKCQoJy5oaWRlJywgJHRhcmdldFNlY3Rpb25OYW1lKS5sZW5ndGggPT0gMCkgJCh0aGlzKS5oaWRlKCk7XG5cblx0fSlcblxufSApO1xuXG4vL0FDVElWSVRZIEhJU1RPUllcbiQoZnVuY3Rpb24oKSB7XG5cdCQoJy50YWJsZS1hY3Rpdml0eS13YWxsZXRzJykuZmluZCgnLnRyYW5zYWN0aW9uJykuY2xpY2soZnVuY3Rpb24oKXtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cdFx0aWYoJCh0aGlzKS5pcygnLm9wZW4nKSkge1xuXHRcdFx0JCh0aGlzKS5uZXh0KCcuZGV0YWlscycpLmZhZGVJbigpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCQodGhpcykubmV4dCgnLmRldGFpbHMnKS5mYWRlT3V0KCdmYXN0Jyk7XG5cdFx0fVxuXHR9KVxufSlcblxuXG4vLyBUT09MVElQXG4kKCBmdW5jdGlvbigpIHtcbiAgJCgnLnRvb2x0aXAtcG9wdXAnKS50b29sdGlwKHtcbiAgICBwb3NpdGlvbjoge1xuICAgICAgbXk6IFwiY2VudGVyIGJvdHRvbS0yMFwiLFxuICAgICAgYXQ6IFwiY2VudGVyIHRvcFwiLFxuICAgICAgdXNpbmc6IGZ1bmN0aW9uKCBwb3NpdGlvbiwgZmVlZGJhY2sgKSB7XG4gICAgICAgICQoIHRoaXMgKS5jc3MoIHBvc2l0aW9uICk7XG4gICAgICAgICQoIFwiPGRpdj5cIiApXG4gICAgICAgICAgLmFkZENsYXNzKCBcImFycm93XCIgKVxuICAgICAgICAgIC5hZGRDbGFzcyggZmVlZGJhY2sudmVydGljYWwgKVxuICAgICAgICAgIC5hZGRDbGFzcyggZmVlZGJhY2suaG9yaXpvbnRhbCApXG4gICAgICAgICAgLmFwcGVuZFRvKCB0aGlzICk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxufSApO1xuXG5cbi8vIERBVEUgUElDS0VSXG4kLmV4dGVuZCgkLmRhdGVwaWNrZXIse19jaGVja09mZnNldDpmdW5jdGlvbihpbnN0LG9mZnNldCxpc0ZpeGVkKXtyZXR1cm4gb2Zmc2V0fX0pO1xuXG4kKGZ1bmN0aW9uKCkge1xuXG4gICQoJyNmcm9tJykuZGF0ZXBpY2tlcih7XG4gICAgZGF0ZUZvcm1hdDogJ2RkLW1tLXl5J1xuICB9KTtcbiAgXG4gICQoJyN0bycpLmRhdGVwaWNrZXIoe1xuICAgIGRhdGVGb3JtYXQ6ICdkZC1tbS15eScsXG4gICAgXG4gICAgb25TZWxlY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykuY2hhbmdlKCk7XG4gICAgfVxuICB9KTtcbiAgXG4gICQoXCJpbnB1dFwiKS5iaW5kKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCl7XG4gICAgLy8gY29uc29sZS5lcnJvcihcImNoYW5nZSBkZXRlY3RlZFwiKTtcbiAgfSk7XG4gIFxufSk7XG5cbiQoZnVuY3Rpb24oKSB7XG5cdCQoJy51aS10b29sdGlwJykuaGlkZSgpO1xuXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoICQoZS50YXJnZXQpLmNsb3Nlc3QoJy50b29sdGlwLXBvcHVwJykubGVuZ3RoICkge1xuICAgICAgJChcIi51aS10b29sdGlwXCIpLnNob3coKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoICEgJChlLnRhcmdldCkuY2xvc2VzdCgnLnVpLXRvb2x0aXAnKS5sZW5ndGggKSB7XG4gICAgICAkKCcudWktdG9vbHRpcCcpLmhpZGUoKTtcbiAgICB9XG5cdH0pO1xufSk7XG5cblxuLy8gdGhpcyBzdXBwb3J0cyB1bmxpbWl0ZWQgbmVzdGluZ1xuLy8gY2FuIGJlIHVzZWQgdG8gaW50b2R1Y2UgbW9yZSBmdW5jdGlvbmFsaXR5IG9uIGRhc2hib2FyZCBcbiQoJy50b2dnbGUnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICBcbiAgICBpZiAoJHRoaXMubmV4dCgpLmhhc0NsYXNzKCdzaG93JykpIHtcbiAgICAgICAgJHRoaXMubmV4dCgpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVVwKDM1MCk7XG4gICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoJy50b2dnbGUnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgXHRcdCQoJy50b2dnbGUnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdsaSAuaW5uZXInKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdsaSAuaW5uZXInKS5zbGlkZVVwKDM1MCk7XG4gICAgICAgICR0aGlzLm5leHQoKS50b2dnbGVDbGFzcygnc2hvdycpO1xuICAgICAgICAkdGhpcy5uZXh0KCkuc2xpZGVUb2dnbGUoMzUwKTtcbiAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZCgnLnRvZ2dsZScpLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgfVxufSk7XG5cbmlmICgkKFwiYm9keVwiKS5oYXNDbGFzcyhcImlzLXJldmVhbC1vcGVuXCIpKSB7XG4gICAgJCgnaHRtbCwgYm9keScpLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXsgXG4gICAgICAgIC8vcHJldmVudCBuYXRpdmUgdG91Y2ggYWN0aXZpdHkgbGlrZSBzY3JvbGxpbmdcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyBcbiAgICB9KTtcbn1cbmVsc2Uge1xuICAgICQoJ2h0bWwsIGJvZHknKS5vZmYoJ3RvdWNobW92ZScpOyAgICAgICAgICAgIFxufVxuXG5cblxuJChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xuJChkb2N1bWVudCkucmVhZHkoSW5pdCk7XG5cbiJdfQ==
