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
}



window.CONST.APP.data.storage = localStorage
console.log('%clocalStorage', 'background: rgba(255,100,20,1);color:white;') 
console.log('What\'s in storage', window.CONST.APP.data.storage)


 
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


var $body = $('body')



var App = {
	Forms: {
		Init: () => {
			console.log('App.Forms.Init()')

			App.Tools.Init()
			App.Forms.Components()
			App.Tools.ScreenResize()

		},
		Components: () => {

			// Expanding Radio Sections
			var $inputRadioExpandingSections = $('.radio-expanding-section')
			var $inputRadioExpandingSectionLabels = $('.radio-expanding-section label')
			$inputRadioExpandingSectionLabels.click(function(ev) {
				var $this = $(this)
				// $inputRadioExpandingSections.siblings().removeClass('expanded')
				$this.parents('.radio-expanding-section').siblings().removeClass('expanded')
				// $this.parents('.radio-expanding-section').toggleClass('expanded')
				$this.parents('.radio-expanding-section').toggleClass('expanded')
			});



			// Other Expanding Sections
			$('[data-expand-trigger], .expand-toggle').click(function(ev) {
				ev.preventDefault()
				ev.stopPropagation()
				var $this = $(this)
				console.log('Huh?', $this.attr('href').replace('#', '') )
				$('[data-expand="' + $this.attr('href').replace('#', '') + '"]').addClass('expanded')
			})



			// Input lable value hide - TODO - Refactor
			var $inputTypeTexts = $(
				'input[type="text"], ' +
				'input[type="number"], ' +
				'input[type="tel"], ' +
				'input[type="search"], ' +
				'input[type="password"], ' +
				'input[type="email"]'
			);
			$inputTypeTexts.blur(function(ev) {
				console.log('Value', $(this).val().length);
				if ( $(this).val().length > 0 ) {
					console.log('Text entered');
					$(this).nextAll('label').addClass('shrink');
				}
				else {
					console.log('Empty text field');
					$(this).nextAll('label').removeClass('shrink')
					.parent('.input-container').removeClass('small-label');
				}
			})

			// CDIN-2037
			// CDIN-3191
			// Shrink prefilled fields like email & password 
			// TODO: Confirm if below code is needed
			$inputTypeTexts.on('input', function() {
				var $this = $(this)
				if ($this.val().length > 0) { 
					$this.next('label').addClass('shrink') 
				}
			})

			// Shrink label if value is zero
			// Allows auto complete to prevent this issue

			$inputTypeTexts.each(function() {
				var $this =  $(this)
				//console.log('Inputs shirnk label on launch:', $this.val())
				if ($this.val().length > 0) {
					$this.next('label').addClass('shrink')
				}
			})	


			/**
			 * TODO - Refactor how select boxes are managed
			 */
			// TODO: Review below as not entirely sure if it works
			// Select
			var $selectFields = $('select');

			$selectFields.each(function() {
				var $this =  $(this);

				if ($this.val() != null) {
					$(this).nextAll('label').addClass('shrinked'); //shrinkED - to avoid transition on page load
				}
			})	


			$selectFields.blur(function(ev) {
				console.log('Selected', $(this).find(':selected').text());
				if ($(this).find(':selected').text().length > 0 ) {
					$(this).nextAll('label').addClass('shrink');
				}
				else {
					$(this).nextAll('label').removeClass('shrink').removeClass('shrinked');
				}
			})

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
				$('select:not(".select-country-list")') 
					.select2({
						minimumResultsForSearch: Infinity,
						closeOnSelect: true
					})
					// Select2 events
					.on('change', function(ev) {
						console.log('Select2 Change value: ', $(this).select2('data')[0]) // TODO - Show the fucking value

						var $labelFor = ($(this).attr('id'));
						$('label[for="'+$labelFor+'"]').addClass('shrink');

					})
					.on('select2-opening', function() {
						console.log('Select2 opening')
					})
					.on('select2-open', function() {
						// Fired on original element when the dropdown opens
						console.log('Select2 open')
					})
					.on('select2-close', function() {
						// Fired on the original element when the dropdown closes
						console.log('Select2 close')
					})
					.on('select2-highlight', function(ev) {
						console.log('Select2 highlighted value: ' + ev.val + ' choice=' + ev.choice.text)
					})
					.on('select2-selecting', function(ev) {
						console.log('Select2 selecting value: ' + ev.val + ' choice=' + ev.object.text)
					})
					.on('select2-removed', function(ev) {
						console.log('Select2 removed value: ' + ev.val + ' choice=' + ev.choice.text)
					})
					.on('select2-loaded', function(ev) {
						console.log('Select2 loaded (data property omitted for brevitiy)')
					})
					.on('select2-focus', function(ev) {
						console.log('Select2 focus')
					})


					// Country select only, see https://zpl.io/1TtcvJ for reference
					$('select.select-country-list') 
						.select2({
							closeOnSelect: true, // for testing turn this off
							dropdownCssClass: 'select-country-list-dropdown'
						})
						.on('select2-close', function() {
							// Fired on the original element when the dropdown closes
							console.log('Select2 close')
						})

			}

		}
	},
	UI: {
		Navigation: () => {
			var $mainNav = $('nav.main-nav'),
				$subMenuTitles = $('.menu-item-has-sub-menu > a'), //$('nav.main-nav .main-nav-content ul li span, nav.main-nav .main-nav-content ul li a'),
				$mobileMenuToggle = $('nav.main-nav .mobile-menu-toggle'),
				$profileMenu = $('.user-profile')

			$profileMenu.click(function(ev) {
				var $this = $(this)
				$this.toggleClass('open')
				ev.stopPropagation()
			})
			$('.user-profile a').click(function(ev) {
			    ev.stopImmediatePropagation()
			})

			$subMenuTitles.click(function(ev) {
				ev.preventDefault()
				var $this = $(this)
				var $subMenu = $this.next('.sub-menu')
				console.log($mobileMenuToggle);
				$this.parent('li').toggleClass('open')
				ev.stopPropagation();
			})

			$(document).click(function() {
		       $('li.menu-item-has-sub-menu').removeClass('open');
		       $profileMenu.removeClass('open');
		    });

			$mobileMenuToggle.click(function(ev) {
				$mainNav.toggleClass('open')
			})


		},
		Help: () => {

			var $helpToggle = $('.footer-help-toggle')
			$helpToggle.click(function(ev) {
				ev.preventDefault()
				ev.stopPropagation()
				var $this = $(this)
				$this.toggleClass('close');
				var $text = $(this).children('span')
				$text.text($text.text() == 'Help' ? 'Close' : 'Help')
				$('.footer-help-content').toggleClass('open')

			})

			$('html').click(function(e) {
				if ( $('.footer-help-content').is('.open') )
					{
					    $('.footer-help-content.open').toggleClass('open');
					    $('.footer-help-toggle').toggleClass('close');
					    $('.footer-help-toggle span').text('Help');
					}
			});

			$('.footer-help-content').click(function(e) {
			    e.stopPropagation();
			});


			var $footerMain = $('footer.main-footer'),
				$footerHelp = $('.footer-help') 

			var footerHelpBump = function() {
				// console.log(
				// 	'footerHelp', 
				// 	parseInt($footerMain.offset().top - $(window).scrollTop()),
				// 	parseInt($footerHelp.offset().top - $(window).scrollTop())
				// )

			}


			setTimeout(function() { footerHelpBump() }, 100)
			$(window).scroll(function() { 
				footerHelpBump()
			})

		},
		Swiper: (container, opts) => {
			console.log('Swiper initiated')
			var swiper = new Swiper(container, {
				pagination: opts.pagination,
				paginatonClickable: false
			});
		}
	},
	Tools: {
		Init: () => {
			
		},
		Device: {
			Type: navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(Windows Phone OS)|(IEMobile)|(webOS)/) ? 'mobile' : 'desktop'
		},

		ScreenResize: () => {

			$(window).on('changed.zf.mediaquery', function(event, newSize, oldSize){ 

				if ((newSize == 'small') || (oldSize == 'small')) {

					if ($('.template').hasClass('site-transfers') ||
						$('.template').hasClass('site-buy-currency')) {

						Prototype.AsideSummary();
					}

					if ($('.template').hasClass('site-page-dashboard')) {

						if (newSize == 'small')  {
							Prototype.DashboardSmall()
						}

						if ((newSize == 'medium') && (oldSize == 'small')) {
							Prototype.DashboardMedium()
						}
					}
				}

			});
		}
	}
}


const Prototype = {
	SignUp: () => {
		console.log('Prototype.SignUp')
	},
	Library: () => {
		console.log('Prototype.Library')
	},
	Registration: () => {


		if ($('.template-registration').hasClass('site-registration-01')) {

			$('input[type=radio][name="account-type"]').change(function() {
				var assoc = $(this).val().toLowerCase();
				$('.information').addClass('hide');
				//$('.information').data('assoc', assoc).removeClass('hide');
				$('.information[data-assoc=' + assoc + ']').removeClass('hide');
				$('[data-role="next"]').removeAttr('disabled').html('<span>Next</span>')
			})

		}


	},

	Transfers: () => {

		console.log('Prototype.Transfers')

		$('select#transfer-details-sell-currency').on('change', function(ev) {
			console.log('this.value')
			$('[data-expanding-section="how-much-do-you-want-to-transfer"]').addClass('expanded')
			$('.paddingBottom-01').removeClass('paddingBottom')

		})

		$('.button-outline.get-rate').click(function(ev) {
			ev.preventDefault()
			$('[data-expanding-section="details-of-transfer"]').addClass('expanded')
			$('[data-role="button-continue"]').removeAttr('disabled')
	
		})

		$('select#transfer-details-reason-for-transfer-a0').on('change', function(ev) {
			var $this = $(this)
			console.log(this.value)
			$('.option-toggle.option-' + this.value.charAt(0) + '-group').removeClass('show')
			$('.option-' + this.value).addClass('show')
			// localStorage.setItem($this.attr('id'), $this.val())
			$('[data-role="button-continue"]').removeAttr('disabled')
			if (this.value == 'a2') { $('#bank-cards-00a').trigger('change') }
		})

		$('select#payment-method-b0').on('change', function(ev) {
			var $this = $(this)
			$('.option-toggle.option-' + this.value.charAt(0) + '-group').removeClass('show')
			$('.option-' + this.value).addClass('show')
			// localStorage.setItem($this.attr('id'), $this.val())
			// console.log('localStorage?', window.CONST.APP.data.storage)
		})

		var $transferGetRate = function() {
			var buyAmount = 0
			var sellAmount = 0
			var rate = 1.14567
		}


		/** 
		 * Transfer Pre-Bought 
		 */
		//$('tbody, thead').not('.table-head-expanding-section').css('display', 'none')

		// Expanding tables
		$('.table-head-expanding-section').click(function(ev) {
			ev.preventDefault()
			var $this = $(this)
			var $thisAttr = $this.attr('data-expanding-section')
			console.log('This', $this.attr('data-expanding-section'))
			//$('tbody[data-expanding-section="' + $thisAttr + '"], thead[data-expanding-section="' + $thisAttr + '"]')
			.css('visibility', 'visible')

		})

		$('#transfer-details-sell-currency').on('change', function(ev) {
			console.log('Value', $(this).val())
			$('[data-expanding-section="how-much-do-you-want-to-transfer"]').addClass('expanded')
		})

	},

	AsideSummary: () => {

		var summaryContainer = $('.transfers-summary');
		var summaryTrigger = $('.transfers-summary-title');
		var currentScreen = Foundation.MediaQuery.current;
		var summaryHeight;

		var makeItStickToFooter = function() {
			var summaryHeight = summaryContainer.outerHeight(true)-60;
			summaryContainer.css('bottom', '-' + summaryHeight + 'px');

			summaryTrigger.click(function(){

				summaryContainer.toggleClass('open');
				if (summaryContainer.is('.open')) { 
					summaryContainer.css('transform', 'translate(0, -'+ summaryHeight + 'px)')}
				else { 
					summaryContainer.css('transform', 'translate(0,0)')
				}
			})
		}

		var makeItUnstuck = function() {
			summaryContainer.removeClass('open');
			summaryContainer.css('transform', 'translate(0,0)');
			summaryTrigger.unbind();
		}

		$(window).load(function() { 			
			summaryHeight = summaryContainer.outerHeight(true)-60;
		});				
		
		if (currentScreen == 'small') { makeItStickToFooter() } else { makeItUnstuck() }
	},

	CurrencyContract: () => {

		$('select#transfer-details-reason-for-transfer-a0').on('change', function(ev) {
			var $this = $(this)
			console.log(this.value)
			$('.option-toggle.option-' + this.value.charAt(0) + '-group').removeClass('show')
			$('.option-' + this.value).addClass('show')
			// localStorage.setItem($this.attr('id'), $this.val())
			$('[data-role="button-continue"]').removeAttr('disabled')
		})

	},

	Profile: () => {

		$('[data-index-link="ManageCardDelete"]').on('click', function() {
			$(this).closest('tr.row').addClass('presentation-prepare-delete')
		})
		$('[data-role="confirm-deletion"]').on('click', function() {
			$('.presentation-prepare-delete').remove()
			// TODO - Figure out why this doesn't work
			//$('#manage-recipients-delete').foundation('reveal', 'open')
			// TODO - Replace this hack:
			$('#delete-card .modal-close').trigger('click')
		})

		$('[data-index-link="ManageDeviceDelete"]').on('click', function() {
			$(this).closest('tr.row').addClass('presentation-prepare-delete')
		})

		$('[data-role="confirm-deletion"]').on('click', function() {
			$('.presentation-prepare-delete').remove()
			$('#delete-device .modal-close').trigger('click')
		})

	},

	RateAlert: () => {

		console.log('RateAlerts()')		

		// Delete row
		$('[data-index-link="ManageRecipientsDelete"]').on('click', function() {
			console.log('Flag this element for deletion', $(this).closest('tr.row').addClass('presentation-prepare-delete'))
		})
		$('[data-role="confirm-deletion"]').on('click', function() {
			$('.presentation-prepare-delete').remove()
			// TODO - Figure out why this doesn't work
			//$('#manage-recipients-delete').foundation('reveal', 'open')
			// TODO - Replace this hack:
			$('#manage-recipients-delete .modal-close').trigger('click')
		})



		$('select#currencies-intend-to-sell-c0').on('change', function(ev) {
			console.log(this.value)
			$('[data-expanding-section="how-much-would-you-like-to-pay"]').addClass('expanded')
		})

		$('select#currencies-intend-to-sell-c0').on('change', function(ev) {
			console.log(this.value)
			$('[data-expanding-section="how-much-would-you-like-to-pay"]').addClass('expanded')
		})


		$('.button-outline.get-rate').click(function(ev) {
			ev.preventDefault()
			ev.stopPropagation()
			$('[data-expanding-section="current-targets-and-rates"]').addClass('expanded')
			//$('.temp-btn-continue').prop('disabled', false)
		})

		$('.continue-to-finalise-alert').click(function(ev) {
			ev.preventDefault()
			ev.stopPropagation()
			$('[data-expanding-section="finalise-your-alert"]').addClass('expanded')
			//$('.temp-btn-continue').prop('disabled', false)
		})

		$('[data-reveal-id="rate-alerts-delete"]').on('click', function() {
			console.log('Yup', $(this).closest('tr.row').addClass('presentation-prepare-delete'))
		})

		$('[data-role="confirm-deletion"]').on('click', function() {
			$('.presentation-prepare-delete').remove()
		})


		// Rate alert animation
		setInterval(function() { 
			console.log('Rate alerts update')
			$('.current-rate').addClass('update')
			setTimeout(function() {
				$('.current-rate').removeClass('update')
			}, 1000)
		}, 10000)


	},
	Recipients: () => {

		$('[data-index-link="ManageRecipientsDelete"]').on('click', function() {
			console.log('Flag this element for deletion', $(this).closest('tr.row').addClass('presentation-prepare-delete'))
		})

		$('[data-role="confirm-deletion"]').on('click', function() {
			$('.presentation-prepare-delete').remove()
			// TODO - Figure out why this doesn't work
			//$('#manage-recipients-delete').foundation('reveal', 'open')
			// TODO - Replace this hack:
			$('#manage-recipients-delete .modal-close').trigger('click')
		})

		$('input:radio[name="recipient-type"]').change(function(ev) {
    	var opt = $(this).val()
    	console.log('Change', opt)
    	$('[data-expanding-section]').removeClass('expanded')
    	$('[data-expanding-section="' + opt + '"]').addClass('expanded')
  	})
	},

	ActivityHistory: () => {
		// TODO: Remove the below as it is no longer needed
		$('.site-transfers-pre-bought-currency-01')
			.find('.select-container select') 
				.on('change', function() {
					$('a[data-role="apply-filters"]').removeClass('disabled');
			});
	},

	DashboardSmall: () => {

		if (Foundation.MediaQuery.current == 'small') {

			$('.dashboard-buttons').insertAfter($('.quick-rate-finder'));
			$('.dashboard-create-alert-button').appendTo($('.column-2'));
			$('.dashboard-account-alerts').insertBefore('.dashboard-create-alert-button');
			//$('.main-container').append($('.dashboard-create-alert-button'));
		}

	},

	DashboardMedium: () => {

		$('.dashboard-buttons').prependTo($('.column-2'));
		$('.dashboard-create-alert-button').appendTo($('.column-1'));
		$('.dashboard-account-alerts').appendTo('.column-1');

	},

	CurrencySelector: () => {


		// function to modify the select2 template
		function formatState (state) {
		    if (!state.id) { return state.text; } // for optgroup
		    // inside html for each option
		    var $state = $(
		    '<div class="flag-code-wrapper">' +
		      '<div class="flag ' + state.element.value.toUpperCase() + '">' +
		        '<span class="currency-code">' + state.text + '</span>' +
		      '</div>' +
		    '</div>'// +
		    //'<span class="currency-name">' + state.element.getAttribute('data-title') + '</span>'
		    );
		    return $state;
		};

		// function to modify the search as per entered keyword
		function searchText (params, data) {
		  if ($.trim(params.term) === '') {
		    return data;
		  }

		  // check entered keyword
		  if (
		    data.text.toUpperCase().indexOf(params.term.toUpperCase()) > -1 || 
		    $(data.element).attr("data-title").toUpperCase().indexOf(params.term.toUpperCase()) > -1 ||
		    $(data.element).attr("data-country").toUpperCase().indexOf(params.term.toUpperCase()) > -1 ||
		    $(data.element).attr("data-aliases").toUpperCase().indexOf(params.term.toUpperCase()) > -1
		  ) {
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
		      $('.select2-search input').attr('placeholder','Type country/currency');

		      //$('.select2-search input').prop('focus',false);
		  });
		  
		  // currency switch button
		  $('#switch-btn').click(function(e) {
		    var v1 = $('#from-currency').val();
		    var v2 = $('#to-currency').val();
		    $('#from-currency').val(v2).trigger('change');
		    $('#to-currency').val(v1).trigger('change');
		    e.preventDefault();
		  });

		  var fromPrevious = $('#from-currency').val();
		  var toPrevious = $('#to-currency').val();

		  // auto change if from-currency is same as to-currency
		  $('#from-currency').focus(function() {
		    // Store the current value on focus, before it changes
		    fromPrevious = this.value;
		  }).change(function() {
		    var fromCurrent = $('#from-currency').val();
		    var toCurrent = $('#to-currency').val();
		    if (fromCurrent === toCurrent) {
		      $('#to-currency').val(fromPrevious).trigger('change');
		    }
		    fromPrevious = this.value;
		  });

		  // auto change if from-currency is same as to-currency
		  $('#to-currency').focus(function() {
		    // Store the current value on focus, before it changes
		    toPrevious = this.value;
		  }).change(function() {
		    var fromCurrent = $('#from-currency').val();
		    var toCurrent = $('#to-currency').val();
		    if (toCurrent === fromCurrent) {
		      $('#from-currency').val(toPrevious).trigger('change');
		    }
		    toPrevious = this.value;
		  });

	},

	CountrySelector: () => {

			var isoCountries = [
				{
					name: "Australia",
					text: "+61",
					id: "AU"
				},

				{
					name: "United Kingdom, England, Great Britain",
					text: "+44",
					id: "GB"
				},

				{
					name: "United States, USA",
					text: "+1",
					id: "US"
				},

				{
					name: "Afghanistan",
					text: "+93",
					id: "AF"
				},
				{
					name: "Aland Islands",
					text: "+358",
					id: "AX"
				},
				{
					name: "Albania",
					text: "+355",
					id: "AL"
				},
				{
					name: "Algeria",
					text: "+213",
					id: "DZ"
				},
				{
					name: "AmericanSamoa",
					text: "+1684",
					id: "AS"
				},
				{
					name: "Andorra",
					text: "+376",
					id: "AD"
				},
				{
					name: "Angola",
					text: "+244",
					id: "AO"
				},
				{
					name: "Anguilla",
					text: "+1264",
					id: "AI"
				},
				{
					name: "Antarctica",
					text: "+672",
					id: "AQ"
				},
				{
					name: "Antigua and Barbuda",
					text: "+1268",
					id: "AG"
				},
				{
					name: "Argentina",
					text: "+54",
					id: "AR"
				},
				{
					name: "Armenia",
					text: "+374",
					id: "AM"
				},
				{
					name: "Aruba",
					text: "+297",
					id: "AW"
				},
				{
					name: "Austria",
					text: "+43",
					id: "AT"
				},
				{
					name: "Azerbaijan",
					text: "+994",
					id: "AZ"
				},
				{
					name: "Bahamas",
					text: "+1242",
					id: "BS"
				},
				{
					name: "Bahrain",
					text: "+973",
					id: "BH"
				},
				{
					name: "Bangladesh",
					text: "+880",
					id: "BD"
				},
				{
					name: "Barbados",
					text: "+1246",
					id: "BB"
				},
				{
					name: "Belarus",
					text: "+375",
					id: "BY"
				},
				{
					name: "Belgium",
					text: "+32",
					id: "BE"
				},
				{
					name: "Belize",
					text: "+501",
					id: "BZ"
				},
				{
					name: "Benin",
					text: "+229",
					id: "BJ"
				},
				{
					name: "Bermuda",
					text: "+1441",
					id: "BM"
				},
				{
					name: "Bhutan",
					text: "+975",
					id: "BT"
				},
				{
					name: "Bolivia, Plurinational State of",
					text: "+591",
					id: "BO"
				},
				{
					name: "Bosnia and Herzegovina",
					text: "+387",
					id: "BA"
				},
				{
					name: "Botswana",
					text: "+267",
					id: "BW"
				},
				{
					name: "Brazil",
					text: "+55",
					id: "BR"
				},
				{
					name: "British Indian Ocean Territory",
					text: "+246",
					id: "IO"
				},
				{
					name: "Brunei Darussalam",
					text: "+673",
					id: "BN"
				},
				{
					name: "Bulgaria",
					text: "+359",
					id: "BG"
				},
				{
					name: "Burkina Faso",
					text: "+226",
					id: "BF"
				},
				{
					name: "Burundi",
					text: "+257",
					id: "BI"
				},
				{
					name: "Cambodia",
					text: "+855",
					id: "KH"
				},
				{
					name: "Cameroon",
					text: "+237",
					id: "CM"
				},
				{
					name: "Canada",
					text: "+1",
					id: "CA"
				},
				{
					name: "Cape Verde",
					text: "+238",
					id: "CV"
				},
				{
					name: "Cayman Islands",
					text: "+ 345",
					id: "KY"
				},
				{
					name: "Central African Republic",
					text: "+236",
					id: "CF"
				},
				{
					name: "Chad",
					text: "+235",
					id: "TD"
				},
				{
					name: "Chile",
					text: "+56",
					id: "CL"
				},
				{
					name: "China",
					text: "+86",
					id: "CN"
				},
				{
					name: "Christmas Island",
					text: "+61",
					id: "CX"
				},
				{
					name: "Cocos (Keeling) Islands",
					text: "+61",
					id: "CC"
				},
				{
					name: "Colombia",
					text: "+57",
					id: "CO"
				},
				{
					name: "Comoros",
					text: "+269",
					id: "KM"
				},
				{
					name: "Congo",
					text: "+242",
					id: "CG"
				},
				{
					name: "Congo, The Democratic Republic of the Congo",
					text: "+243",
					id: "CD"
				},
				{
					name: "Cook Islands",
					text: "+682",
					id: "CK"
				},
				{
					name: "Costa Rica",
					text: "+506",
					id: "CR"
				},
				{
					name: "Cote d'Ivoire",
					text: "+225",
					id: "CI"
				},
				{
					name: "Croatia",
					text: "+385",
					id: "HR"
				},
				{
					name: "Cuba",
					text: "+53",
					id: "CU"
				},
				{
					name: "Cyprus",
					text: "+357",
					id: "CY"
				},
				{
					name: "Czech Republic",
					text: "+420",
					id: "CZ"
				},
				{
					name: "Denmark",
					text: "+45",
					id: "DK"
				},
				{
					name: "Djibouti",
					text: "+253",
					id: "DJ"
				},
				{
					name: "Dominica",
					text: "+1767",
					id: "DM"
				},
				{
					name: "Dominican Republic",
					text: "+1849",
					id: "DO"
				},
				{
					name: "Ecuador",
					text: "+593",
					id: "EC"
				},
				{
					name: "Egypt",
					text: "+20",
					id: "EG"
				},
				{
					name: "El Salvador",
					text: "+503",
					id: "SV"
				},
				{
					name: "Equatorial Guinea",
					text: "+240",
					id: "GQ"
				},
				{
					name: "Eritrea",
					text: "+291",
					id: "ER"
				},
				{
					name: "Estonia",
					text: "+372",
					id: "EE"
				},
				{
					name: "Ethiopia",
					text: "+251",
					id: "ET"
				},
				{
					name: "Falkland Islands (Malvinas)",
					text: "+500",
					id: "FK"
				},
				{
					name: "Faroe Islands",
					text: "+298",
					id: "FO"
				},
				{
					name: "Fiji",
					text: "+679",
					id: "FJ"
				},
				{
					name: "Finland",
					text: "+358",
					id: "FI"
				},
				{
					name: "France",
					text: "+33",
					id: "FR"
				},
				{
					name: "French Guiana",
					text: "+594",
					id: "GF"
				},
				{
					name: "French Polynesia",
					text: "+689",
					id: "PF"
				},
				{
					name: "Gabon",
					text: "+241",
					id: "GA"
				},
				{
					name: "Gambia",
					text: "+220",
					id: "GM"
				},
				{
					name: "Georgia",
					text: "+995",
					id: "GE"
				},
				{
					name: "Germany",
					text: "+49",
					id: "DE"
				},
				{
					name: "Ghana",
					text: "+233",
					id: "GH"
				},
				{
					name: "Gibraltar",
					text: "+350",
					id: "GI"
				},
				{
					name: "Greece",
					text: "+30",
					id: "GR"
				},
				{
					name: "Greenland",
					text: "+299",
					id: "GL"
				},
				{
					name: "Grenada",
					text: "+1473",
					id: "GD"
				},
				{
					name: "Guadeloupe",
					text: "+590",
					id: "GP"
				},
				{
					name: "Guam",
					text: "+1671",
					id: "GU"
				},
				{
					name: "Guatemala",
					text: "+502",
					id: "GT"
				},
				{
					name: "Guernsey",
					text: "+44",
					id: "GG"
				},
				{
					name: "Guinea",
					text: "+224",
					id: "GN"
				},
				{
					name: "Guinea-Bissau",
					text: "+245",
					id: "GW"
				},
				{
					name: "Guyana",
					text: "+595",
					id: "GY"
				},
				{
					name: "Haiti",
					text: "+509",
					id: "HT"
				},
				{
					name: "Holy See (Vatican City State)",
					text: "+379",
					id: "VA"
				},
				{
					name: "Honduras",
					text: "+504",
					id: "HN"
				},
				{
					name: "Hong Kong",
					text: "+852",
					id: "HK"
				},
				{
					name: "Hungary",
					text: "+36",
					id: "HU"
				},
				{
					name: "Iceland",
					text: "+354",
					id: "IS"
				},
				{
					name: "India",
					text: "+91",
					id: "IN"
				},
				{
					name: "Indonesia",
					text: "+62",
					id: "ID"
				},
				{
					name: "Iran, Islamic Republic of Persian Gulf",
					text: "+98",
					id: "IR"
				},
				{
					name: "Iraq",
					text: "+964",
					id: "IQ"
				},
				{
					name: "Ireland",
					text: "+353",
					id: "IE"
				},
				{
					name: "Isle of Man",
					text: "+44",
					id: "IM"
				},
				{
					name: "Israel",
					text: "+972",
					id: "IL"
				},
				{
					name: "Italy",
					text: "+39",
					id: "IT"
				},
				{
					name: "Jamaica",
					text: "+1876",
					id: "JM"
				},
				{
					name: "Japan",
					text: "+81",
					id: "JP"
				},
				{
					name: "Jersey",
					text: "+44",
					id: "JE"
				},
				{
					name: "Jordan",
					text: "+962",
					id: "JO"
				},
				{
					name: "Kazakhstan",
					text: "+77",
					id: "KZ"
				},
				{
					name: "Kenya",
					text: "+254",
					id: "KE"
				},
				{
					name: "Kiribati",
					text: "+686",
					id: "KI"
				},
				{
					name: "Korea, Democratic People's Republic of Korea",
					text: "+850",
					id: "KP"
				},
				{
					name: "Korea, Republic of South Korea",
					text: "+82",
					id: "KR"
				},
				{
					name: "Kuwait",
					text: "+965",
					id: "KW"
				},
				{
					name: "Kyrgyzstan",
					text: "+996",
					id: "KG"
				},
				{
					name: "Laos",
					text: "+856",
					id: "LA"
				},
				{
					name: "Latvia",
					text: "+371",
					id: "LV"
				},
				{
					name: "Lebanon",
					text: "+961",
					id: "LB"
				},
				{
					name: "Lesotho",
					text: "+266",
					id: "LS"
				},
				{
					name: "Liberia",
					text: "+231",
					id: "LR"
				},
				{
					name: "Libyan Arab Jamahiriya",
					text: "+218",
					id: "LY"
				},
				{
					name: "Liechtenstein",
					text: "+423",
					id: "LI"
				},
				{
					name: "Lithuania",
					text: "+370",
					id: "LT"
				},
				{
					name: "Luxembourg",
					text: "+352",
					id: "LU"
				},
				{
					name: "Macao",
					text: "+853",
					id: "MO"
				},
				{
					name: "Macedonia",
					text: "+389",
					id: "MK"
				},
				{
					name: "Madagascar",
					text: "+261",
					id: "MG"
				},
				{
					name: "Malawi",
					text: "+265",
					id: "MW"
				},
				{
					name: "Malaysia",
					text: "+60",
					id: "MY"
				},
				{
					name: "Maldives",
					text: "+960",
					id: "MV"
				},
				{
					name: "Mali",
					text: "+223",
					id: "ML"
				},
				{
					name: "Malta",
					text: "+356",
					id: "MT"
				},
				{
					name: "Marshall Islands",
					text: "+692",
					id: "MH"
				},
				{
					name: "Martinique",
					text: "+596",
					id: "MQ"
				},
				{
					name: "Mauritania",
					text: "+222",
					id: "MR"
				},
				{
					name: "Mauritius",
					text: "+230",
					id: "MU"
				},
				{
					name: "Mayotte",
					text: "+262",
					id: "YT"
				},
				{
					name: "Mexico",
					text: "+52",
					id: "MX"
				},
				{
					name: "Micronesia, Federated States of Micronesia",
					text: "+691",
					id: "FM"
				},
				{
					name: "Moldova",
					text: "+373",
					id: "MD"
				},
				{
					name: "Monaco",
					text: "+377",
					id: "MC"
				},
				{
					name: "Mongolia",
					text: "+976",
					id: "MN"
				},
				{
					name: "Montenegro",
					text: "+382",
					id: "ME"
				},
				{
					name: "Montserrat",
					text: "+1664",
					id: "MS"
				},
				{
					name: "Morocco",
					text: "+212",
					id: "MA"
				},
				{
					name: "Mozambique",
					text: "+258",
					id: "MZ"
				},
				{
					name: "Myanmar",
					text: "+95",
					id: "MM"
				},
				{
					name: "Namibia",
					text: "+264",
					id: "NA"
				},
				{
					name: "Nauru",
					text: "+674",
					id: "NR"
				},
				{
					name: "Nepal",
					text: "+977",
					id: "NP"
				},
				{
					name: "Netherlands",
					text: "+31",
					id: "NL"
				},
				{
					name: "Netherlands Antilles",
					text: "+599",
					id: "AN"
				},
				{
					name: "New Caledonia",
					text: "+687",
					id: "NC"
				},
				{
					name: "New Zealand",
					text: "+64",
					id: "NZ"
				},
				{
					name: "Nicaragua",
					text: "+505",
					id: "NI"
				},
				{
					name: "Niger",
					text: "+227",
					id: "NE"
				},
				{
					name: "Nigeria",
					text: "+234",
					id: "NG"
				},
				{
					name: "Niue",
					text: "+683",
					id: "NU"
				},
				{
					name: "Norfolk Island",
					text: "+672",
					id: "NF"
				},
				{
					name: "Northern Mariana Islands",
					text: "+1670",
					id: "MP"
				},
				{
					name: "Norway",
					text: "+47",
					id: "NO"
				},
				{
					name: "Oman",
					text: "+968",
					id: "OM"
				},
				{
					name: "Pakistan",
					text: "+92",
					id: "PK"
				},
				{
					name: "Palau",
					text: "+680",
					id: "PW"
				},
				{
					name: "Palestinian Territory, Occupied",
					text: "+970",
					id: "PS"
				},
				{
					name: "Panama",
					text: "+507",
					id: "PA"
				},
				{
					name: "Papua New Guinea",
					text: "+675",
					id: "PG"
				},
				{
					name: "Paraguay",
					text: "+595",
					id: "PY"
				},
				{
					name: "Peru",
					text: "+51",
					id: "PE"
				},
				{
					name: "Philippines",
					text: "+63",
					id: "PH"
				},
				{
					name: "Pitcairn",
					text: "+872",
					id: "PN"
				},
				{
					name: "Poland",
					text: "+48",
					id: "PL"
				},
				{
					name: "Portugal",
					text: "+351",
					id: "PT"
				},
				{
					name: "Puerto Rico",
					text: "+1939",
					id: "PR"
				},
				{
					name: "Qatar",
					text: "+974",
					id: "QA"
				},
				{
					name: "Romania",
					text: "+40",
					id: "RO"
				},
				{
					name: "Russia",
					text: "+7",
					id: "RU"
				},
				{
					name: "Rwanda",
					text: "+250",
					id: "RW"
				},
				{
					name: "Reunion",
					text: "+262",
					id: "RE"
				},
				{
					name: "Saint Barthelemy",
					text: "+590",
					id: "BL"
				},
				{
					name: "Saint Helena, Ascension and Tristan Da Cunha",
					text: "+290",
					id: "SH"
				},
				{
					name: "Saint Kitts and Nevis",
					text: "+1869",
					id: "KN"
				},
				{
					name: "Saint Lucia",
					text: "+1758",
					id: "LC"
				},
				{
					name: "Saint Martin",
					text: "+590",
					id: "MF"
				},
				{
					name: "Saint Pierre and Miquelon",
					text: "+508",
					id: "PM"
				},
				{
					name: "Saint Vincent and the Grenadines",
					text: "+1784",
					id: "VC"
				},
				{
					name: "Samoa",
					text: "+685",
					id: "WS"
				},
				{
					name: "San Marino",
					text: "+378",
					id: "SM"
				},
				{
					name: "Sao Tome and Principe",
					text: "+239",
					id: "ST"
				},
				{
					name: "Saudi Arabia",
					text: "+966",
					id: "SA"
				},
				{
					name: "Senegal",
					text: "+221",
					id: "SN"
				},
				{
					name: "Serbia",
					text: "+381",
					id: "RS"
				},
				{
					name: "Seychelles",
					text: "+248",
					id: "SC"
				},
				{
					name: "Sierra Leone",
					text: "+232",
					id: "SL"
				},
				{
					name: "Singapore",
					text: "+65",
					id: "SG"
				},
				{
					name: "Slovakia",
					text: "+421",
					id: "SK"
				},
				{
					name: "Slovenia",
					text: "+386",
					id: "SI"
				},
				{
					name: "Solomon Islands",
					text: "+677",
					id: "SB"
				},
				{
					name: "Somalia",
					text: "+252",
					id: "SO"
				},
				{
					name: "South Africa",
					text: "+27",
					id: "ZA"
				},
				{
					name: "South Sudan",
					text: "+211",
					id: "SS"
				},
				{
					name: "South Georgia and the South Sandwich Islands",
					text: "+500",
					id: "GS"
				},
				{
					name: "Spain",
					text: "+34",
					id: "ES"
				},
				{
					name: "Sri Lanka",
					text: "+94",
					id: "LK"
				},
				{
					name: "Sudan",
					text: "+249",
					id: "SD"
				},
				{
					name: "Suriname",
					text: "+597",
					id: "SR"
				},
				{
					name: "Svalbard and Jan Mayen",
					text: "+47",
					id: "SJ"
				},
				{
					name: "Swaziland",
					text: "+268",
					id: "SZ"
				},
				{
					name: "Sweden",
					text: "+46",
					id: "SE"
				},
				{
					name: "Switzerland",
					text: "+41",
					id: "CH"
				},
				{
					name: "Syrian Arab Republic",
					text: "+963",
					id: "SY"
				},
				{
					name: "Taiwan",
					text: "+886",
					id: "TW"
				},
				{
					name: "Tajikistan",
					text: "+992",
					id: "TJ"
				},
				{
					name: "Tanzania, United Republic of Tanzania",
					text: "+255",
					id: "TZ"
				},
				{
					name: "Thailand",
					text: "+66",
					id: "TH"
				},
				{
					name: "Timor-Leste",
					text: "+670",
					id: "TL"
				},
				{
					name: "Togo",
					text: "+228",
					id: "TG"
				},
				{
					name: "Tokelau",
					text: "+690",
					id: "TK"
				},
				{
					name: "Tonga",
					text: "+676",
					id: "TO"
				},
				{
					name: "Trinidad and Tobago",
					text: "+1868",
					id: "TT"
				},
				{
					name: "Tunisia",
					text: "+216",
					id: "TN"
				},
				{
					name: "Turkey",
					text: "+90",
					id: "TR"
				},
				{
					name: "Turkmenistan",
					text: "+993",
					id: "TM"
				},
				{
					name: "Turks and Caicos Islands",
					text: "+1649",
					id: "TC"
				},
				{
					name: "Tuvalu",
					text: "+688",
					id: "TV"
				},
				{
					name: "Uganda",
					text: "+256",
					id: "UG"
				},
				{
					name: "Ukraine",
					text: "+380",
					id: "UA"
				},
				{
					name: "United Arab Emirates",
					text: "+971",
					id: "AE"
				},

				{
					name: "Uruguay",
					text: "+598",
					id: "UY"
				},
				{
					name: "Uzbekistan",
					text: "+998",
					id: "UZ"
				},
				{
					name: "Vanuatu",
					text: "+678",
					id: "VU"
				},
				{
					name: "Venezuela, Bolivarian Republic of Venezuela",
					text: "+58",
					id: "VE"
				},
				{
					name: "Vietnam",
					text: "+84",
					id: "VN"
				},
				{
					name: "Virgin Islands, British",
					text: "+1284",
					id: "VG"
				},
				{
					name: "Virgin Islands, U.S.",
					text: "+1340",
					id: "VI"
				},
				{
					name: "Wallis and Futuna",
					text: "+681",
					id: "WF"
				},
				{
					name: "Yemen",
					text: "+967",
					id: "YE"
				},
				{
					name: "Zambia",
					text: "+260",
					id: "ZM"
				},
				{
					name: "Zimbabwe",
					text: "+263",
					id: "ZW"
				}
			]


		function formatCountry (country) {

			if (!country.id) { return country.text }
			console.log('Who am I', )
			var $country = $(
				'<span class="flag-icon flag-icon-' + (country.id).toLowerCase() +'" data-title="' + country.name + '"></span>' +
				'<span class="flag-text">' + country.text + '</span>'
			)
			return $country
		}

		function searchName (params, data) {
		  if ($.trim(params.term) === '') {
		    return data;
		  }

		  if (
		    data.text.toUpperCase().indexOf(params.term.toUpperCase()) > -1 || 
		     $(data.element).attr("data-code").toUpperCase().indexOf(params.term.toUpperCase()) > -1
		  ) {
		    var modifiedData = $.extend({}, data, true);
		    return modifiedData;
		  }
		  return null;
		  };


		  var $buildSelect;

		  $(isoCountries).each(function(i){  	
		  	$buildSelect += '<option value="' + isoCountries[i].id +'" data-code="' + isoCountries[i].text +'" data-name="' + isoCountries[i].name + '">' + isoCountries[i].text + '</option>'; 
		  })

		  var $selectElements = $('#country-code, #country-code-landline');

		  $selectElements.append($buildSelect);


		// Select2
		$selectElements.select2({
			templateResult: formatCountry,
			templateSelection: formatCountry,
			matcher: searchName
		})

		}
}

const Init = () => {
	//console.log('Hello human');

	// App.Whitelabel.Init() // TODO - Re-enable Init for general features

	//App.Whitelabel.ClientSwitch()
	App.Forms.Init()
	App.UI.Navigation()

	// TODO - Add conditional
	if ($('.footer-help').length) App.UI.Help()

	if ($('.template').hasClass('template-registration')) {
		Prototype.Registration()
	}

	if ($('.template').hasClass('site-transfers')) {
		Prototype.Transfers()
	}

	if ($('.template').hasClass('site-buy-currency')) {
		Prototype.CurrencyContract()
	}

	if ($('.template').hasClass('site-pay-contract')) {
		Prototype.CurrencyContract()
	}

	if ($('.template').hasClass('site-rate-alerts')) {
		Prototype.RateAlert()
	}

	if ($('.template').hasClass('site-recipients')) {
		Prototype.Recipients()
	}

	if ($('.template').hasClass('site-transfers-pre-bought-currency-01')) {
		Prototype.ActivityHistory()
	}

	if ($('.template').hasClass('site-page-profile')) {
		Prototype.Profile()
	}

	if ($('.template').hasClass('site-transfers') ||
		$('.template').hasClass('site-buy-currency')) {

		Prototype.AsideSummary()
	}

	if ($('.template').hasClass('site-page-dashboard')) {
		Prototype.DashboardSmall()
		Prototype.CurrencySelector()
	}

	if ($('.template').hasClass('site-registration-03') ||
		$('.template').hasClass('site-page-profile')) {

		Prototype.CountrySelector()
	}
	

	/**
	 * General Button Links
	 */

	var $buttons = $('button[data-hyperlink]:not([data-role="confirm-deletion"])')
	$buttons.click(function(ev) { 
		ev.preventDefault()
		let $this = $(this)
		console.log('Data hyperlink', $this.attr('data-hyperlink'))
		if ($this.attr('data-hyperlink').length > 0) {
			document.location = $this.attr('data-hyperlink')
		}
	})


	/**
	 * Tab Toggles
	 */
	var $tabToggles = $('.tab-toggle')
	$tabToggles.click(function(ev) {
		ev.preventDefault()
		ev.stopPropagation()
		let $this = $(this)
		let $tabGroup = $this.attr('data-tab-group')
		$('.tab-toggle[data-tab-group="' + $tabGroup + '"], .tab-page-container[data-tab-group="' + $tabGroup + '"]')
			.removeClass('active')
		$('.tab-page-container[data-tab-group="' + $tabGroup + '"]').removeClass('active')
		$this.addClass('active')
		$('.tab-page-container[data-tab-toggle="' + $this.attr('data-tab-page') + '"]')
			.addClass('active')
	})



	$('[data-override]').click(function(ev) {
		var $this = $(this)
		var $fn = $this.attr('data-override')
		if ($fn == 'go-back') history.go(-1)
	})


	$('[data-open').click(function(ev){
		ev.preventDefault();
	})

}


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



$(function() {  
	$('input[name=add-another-person]').change(function() {    
    // $("#their-details").hide();
    if($(this).val() == "Yes"){   
      $('#their-details').slideDown("slow");
    }
    else if($(this).val() == "No"){
      $('#their-details').slideUp("slow");
    }
	});
});

$(function() {  
	$(".change-address").click(function() {
  	$(this).parent('.columns').hide();
  	$('.add-new-address').slideDown("slow");
  });
});

$(function() { 
	$("select#title").change(function(){
		var ddl = document.getElementById("title");
 		var selectedValue = ddl.options[ddl.selectedIndex].value;
		if (selectedValue == "Other") {
  		$('.specify').show();
  	}
  	else {
  		$('.specify').hide();	
  	}
	}); 	
});


$(function() { 
	$("select#select-currency").change(function(){
		var ddl = document.getElementById("select-currency");
 		var selectedValue = ddl.options[ddl.selectedIndex].value;
 		// (selectedValue == "USD") || should be removed for production
		if ((selectedValue == "USD") || (selectedValue == "4_BHD") || (selectedValue == "7_CAD") || (selectedValue == "48_USD"))  {
  		$('.recipients-address').show();
  	}
  	else {
  		$('.recipients-address').hide();	
  	}
	}); 	
});

$(function() {  
	var rowCount = $('.dashboard-your-recipients tr').length;
	// alert(rowCount);
	// TODO: Convert this in class switching
	if (rowCount <= 3 ) {
		$('.show-all-recipients').hide();
	}
});


$(function() {  
	$(".toggle-show:first").click(function() {
  	$(this).hide();
  	$('.new-email--panel').slideDown("slow");
  });

  $('.toggle-hide:first, .new-email--panel button').click(function() {
  	$('.new-email--panel').slideUp("slow", function(){
  		$('.toggle-show').eq(0).show();
  	});
  	
  });
  
	$(".toggle-show:last").click(function() {
  	$(this).hide();
  	$('.new-password--panel').slideDown("slow");
  });
  $('.toggle-hide:last, .new-password--panel button').click(function() {
  	$('.new-password--panel').slideUp("slow", function(){
		$('.toggle-show').eq(1).show();
  	});
  });

  $('.new-password--panel button, .new-email--panel button').click(function(){
  		$('.status-notification.hide').hide().removeClass('hide').fadeIn();
  		setTimeout(function(){
  			$('.status-notification').fadeOut().addClass('hide');
  		}, 2000)
  		
  })
});


$(function() {
	$('#yes-tc').on('change', function () {
    var ch = $(this), c;
    if (ch.is(':checked')) {
      $('button[data-form-section-active="account"]').prop('disabled', false);
    } else {
      $('button[data-form-section-active="account"]').prop('disabled', true);
    }
	});
});


// CDIN-1884
// Function for copy link to clipboard
$(function() {
 	$(".copy-link").on('click', function() {
    $(".share-link input").focus();
    $(".share-link input").select();
    document.execCommand("copy");
  });
});





$(function() {  
	$('#transfer-details-reason-for-transfer-1').on('change', function() {
		$('.transfer-details-recipient-details-one').slideDown("slow");
		$('.expanding-section').slideDown("slow");
	});
	$('[data-role="add-payee"]').eq(0).on('click', function() {
		$('.transfer-details-recipient-details-two').slideDown("slow");
		$('.transfer-details-recipient-details-two .input-container').last().css("margin", "0");
		$('[data-role="add-payee"]').eq(0).hide();
	});
	$('[data-role="add-payee"]').eq(1).on('click', function() {
		$('.transfer-details-recipient-details-three').slideDown("slow");
		$('[data-role="delete-payee"]').eq(0).hide();
		$('[data-role="add-payee"]').eq(1).hide();
	});

	$('[data-role="delete-payee"]').eq(0).on('click', function() {
		$('.transfer-details-recipient-details-two').slideUp("slow");
		$('[data-role="add-payee"]').eq(0).show();
	});
	$('[data-role="delete-payee"]').eq(1).on('click', function() {
		$('.transfer-details-recipient-details-three').slideUp("slow");
		$('[data-role="delete-payee"]').eq(0).show();
		$('[data-role="add-payee"]').eq(1).show();
	});
	

});

$(function() {
	$('#from, #to').on('change', function () {
		if($(this).val().length != 0 ) {
			$(this).next('label').addClass('shrink');
			$(this).parent('.input-container').addClass('small-label');
		}
		else {
			$(this).next('label').removeClass('shrink');
			$(this).parent('.input-container').removeClass('small-label');
		}
	});
});

$(function() {  
	var $elsToHide = $('.main-container, .main-footer, .status-notification, .footer-help');

	$(".mobile-menu-toggle--container").click(function() {
  	if ($(".main-nav").hasClass("open")) {
  		$elsToHide.hide();
  		
  	}
  	else {
  		$elsToHide.show();
  	}
	});
});


$(function() {  
	$('.swap').click(function() {
    $(this).find(".img").toggleClass('show');
    $('.filters').slideToggle();
    return false;
  });
});


$(function() {  
	var NotificaitonContainer = $('.status-notification');

	NotificaitonContainer.find('[data-role="close"]').click(function(e) {
		e.preventDefault()
		NotificaitonContainer.fadeOut(function(){ NotificaitonContainer.remove(); });
	})
});

$(function() { 
	$('[link-expanding-section]').click(function(){
		var $targetSection = $(this).attr('link-expanding-section');
		$('[data-expanding-section='+ $targetSection +']').addClass('expanded');

	})
});

// $(function() { 
// 	$('form.quick-rate-finder select').on('change', function() {
		
// 		$(this).parent('.select-container').find('label').removeClass().addClass($(this).select2('data')[0]['text']);
// 	})
// });

$(function() { 
	$('#recipient-gets-container .CurrencyTo').val('USD');
});


$(function() {
	if($('.site-transfers-03').length) {
		$('#add-new-card [data-role="button-continue"]').click(function(){
			$('.modal-close').trigger('click')
			$('.status-notification.hide').hide().removeClass('hide').fadeIn();
		})
	} 
});

/// SHOW HIDE PASSWORD
/// http://foundation.zurb.com/building-blocks/blocks/show-password.html

$('button[data-role="show-password"]').on('click', function(){

	var inputPassword = $(this).parent('.input-container').find('input').eq(0);
	$(this).toggleClass('checked');

	//var inputPassword = $('.input-password');

  if(inputPassword.attr('type') == 'password')
    changeType(inputPassword, 'text');

  else
    changeType(inputPassword, 'password');
 
  return false;
});

function changeType(x, type) {
  if(x.prop('type') == type)
  return x; //That was easy.
  try {
    return x.prop('type', type); //Stupid IE security will not allow this
  } catch(e) {
    //Try re-creating the element (yep... this sucks)
    //jQuery has no html() method for the element, so we have to put into a div first
    var html = $("<div>").append(x.clone()).html();
    var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
    //If no match, we add the type attribute to the end; otherwise, we replace
    var tmp = $(html.match(regex) == null ?
      html.replace(">", ' type="' + type + '">') :
      html.replace(regex, 'type="' + type + '"') );
    //Copy data from old element
    tmp.data('type', x.data('type') );
    var events = x.data('events');
    var cb = function(events) {
      return function() {
            //Bind all prior events
            for(i in events)
            {
              var y = events[i];
              for(j in y)
                tmp.bind(i, y[j].handler);
            }
          }
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

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.input-file-upload-buttons input' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));


// SHOW MORE
$( function() {
	$('[data-role="show-more"]').click(function(ev){
		ev.preventDefault();

		var $targetSectionName = $('#'+$(this).attr('data-section'));
		var numberElem = $(this).attr('data-number');
		if (!numberElem) numberElem = 5; 

		$('.hide', $targetSectionName).slice(0, numberElem).hide().removeClass('hide').fadeIn();

		if ($('.hide', $targetSectionName).length == 0) $(this).hide();

	})

} );

//ACTIVITY HISTORY
$(function() {
	$('.table-activity-wallets').find('.transaction').click(function(){
		$(this).toggleClass('open');
		if($(this).is('.open')) {
			$(this).next('.details').fadeIn();
		}
		else {
			$(this).next('.details').fadeOut('fast');
		}
	})
})


// TOOLTIP
$( function() {
  $('.tooltip-popup').tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });

} );


// DATE PICKER
$.extend($.datepicker,{_checkOffset:function(inst,offset,isFixed){return offset}});

$(function() {

  $('#from').datepicker({
    dateFormat: 'dd-mm-yy'
  });
  
  $('#to').datepicker({
    dateFormat: 'dd-mm-yy',
    
    onSelect: function () {
      $(this).change();
    }
  });
  
  $("input").bind("change", function(){
    // console.error("change detected");
  });
  
});

$(function() {
	$('.ui-tooltip').hide();

	$(document).on('click', function(e) {
    if ( $(e.target).closest('.tooltip-popup').length ) {
      $(".ui-tooltip").show();
    }
    else if ( ! $(e.target).closest('.ui-tooltip').length ) {
      $('.ui-tooltip').hide();
    }
	});
});


// this supports unlimited nesting
// can be used to intoduce more functionality on dashboard 
$('.toggle').click(function(e) {
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
    $('html, body').on('touchmove', function(e){ 
        //prevent native touch activity like scrolling
        e.preventDefault(); 
    });
}
else {
    $('html, body').off('touchmove');            
}



$(document).foundation();
$(document).ready(Init);

