/**
 * presentation.js
 * Presentation specific JS that should not be used for development or production
 * - TODO - Move all client switching logic to the backend
 */


var $body = $('body')


const Presentation = {
	Init: () => {
		console.log('%cWarning - Remove this file for production', 'background: red; color: white;')
		Presentation.ClientSwitch()
		Presentation.Form.Init()
	},


	Form: {
		Init: () => {
			if ($('.input-type-ui-datepicker').length > 0) {			
				console.log('Datepicker element present')
				$('.input-type-ui-datepicker').datepicker({minDate: -20, maxDate: '+1M +10D' })
			}
		}
	},


	ClientSwitch: () => {
		console.log('%cPresentation.ClientSwitch()', 'background: gray; color: white;')
		var url = window.location.search.slice(1).split('&');
		for (var i = url.length - 1; i >= 0; i--) {
			if (/debug/.test(url[i])) { CONST.DEBUG = /debug=true/.test(url[i]) ? true : CONST.DEBUG; }
			if (/client/.test(url[i])) { CONST.CLIENT = url[i].split('=').pop(0) }
		}
		$body.attr('data-whitelabel', CONST.CLIENT)

		localStorage.setItem('clientId', CONST.CLIENT)

		// Now check that every URL has the correct client ID param
		$('[data-hyperlink], a:not([data-open])').each(function(link) {
			var $this = $(this)

			if ($this.attr('data-hyperlink')) {
				console.log('We have a live one!', $this.attr('data-hyperlink'))
				var url = $this.attr('data-hyperlink')
				$this.attr('data-hyperlink', url + '?clientId=' + CONST.CLIENT)
			}
			else if ($this.is('a')) {
				var url = $this.attr('href')					
				$this.attr('href', $this.attr('href') + '?clientId=' + CONST.CLIENT)
			}
		})
	},


	Section: {
		RateAlerts: () => {

			// New Rate Alert
			/*$('input[type=radio][name="account-type"]').change(function() {
				$('.information').removeClass('invisible')
				$('[data-role="next"]').removeAttr('disabled').html('<span>Next</span>')
			})*/

		},
		BuyCurrency: () => {
			console.log('Buy Currency')

			$('input[type=radio][name="account-type"]').change(function() {
				$('.information').removeClass('invisible')
				$('[data-role="next"]').removeAttr('disabled').html('<span>Next</span>')
			})

		}

	},


	Notificiation: (notificationID) => {
		console.log('Notification ID', notificationID)
		//alert('TODO - Show Notification ID: ' + notificationID)
	},


	Styleguide: {
		Init: () => {
			console.log('%cPresentation.Styleguide.Init()', 'background: orange; color: white;')

		},
		LiveCodeEditor: () => {
			console.log('%cPresentation.Styleguide.LiveCodeEditor()', 'background: orange; color: white;')

			const liveEditor = () => {
				let $html = $('[data-editor="html"]'),
					$css = $('[data-editor="css"]'),
					$js = $('[data-editor="js"]')

					$html.val(
`<button id="live-example-001" type="button" class="columns button small-4">
  <span>Button</span>
</button>`
					)
					$css.val(
`button#live {
  font-size: 150%;
  background: rgba(255,0,0,.5);
  border: 1px solid rgba(255,0,0,.8);
  color: white;
  padding: 10px;
}`
					)
					$js.val(
`window.onload = function() {
  document.getElementById('live-example-001').onclick = function() {
    document.getElementById('live-example-001').innerHTML = 'Button Clicked!'
  }
}`
					)

					// Syntax Highlighting
					var codeEditors = $('textarea[data-editor]')
					codeEditors.each(function(i, block) {
						//hljs.highlightBlock(block); console.log('Testing, testing, 1, 2, 3...', hljs)
					})

					const render = () => {
						console.log('Rendering')
						let $preview = $('[data-preview]');
						let $previewContent = $preview.get(0);
						let $output =
										`<link href="/css/vnd/foundation.min.css" rel="stylesheet">` +
										`<link href="/css/core.min.css" rel="stylesheet">` +
										`<style>` +
											$css.val() +
										// Injected style
										`body {
											background-color: transparent !important;
										}` +
										`</style>` +
										$html.val() +
										`<script>` + $js.val() + `<\/script>`
						console.log('%cRendered\n', 'background:blue;color:white;');
						console.log($output)
						// TODO - Cleaner iframe empty
						$previewContent.contentWindow.document.write($output)
						$previewContent.contentWindow.document.close()
						// TODO - close iframe code injection
					}

					$('[data-editor-toggle]').click(function(ev) {
						ev.preventDefault()
						ev.stopPropagation()
						let $this = $(this)
						$('[data-editor], [data-editor-toggle]').removeClass('active')
						setTimeout(function() {
							$this.addClass('active')
							$('[data-editor="' + $this.attr('data-editor-toggle') + '"]').addClass('active')
						}, 0)
					})

					$('[data-editor]').keyup(render)
					render()
			}
			liveEditor()

		}	
	}
}


$(document).ready(function() {

	Presentation.Init()

	if ($('body').hasClass('template-component-library')) {
		Presentation.Styleguide.LiveCodeEditor()
	}


	// TODO - Port rate alerts presentational JS to this function
	if ($('body').hasClass('')) {
		Presentation.Section.RateAlerts()
	}

	if ($('body').hasClass('site-buy-currency')) {
		Presentation.Section.BuyCurrency()
	}

	if (window.location.hash) {
		var notificationID = window.location.hash.substring(1)
		Presentation.Notificiation(notificationID)
	} else {
		
	}


})

$(document).ready(function() {
	
	//Index clientId switch buttons
	$('.switchTo').on('click', function() {
		window.location = '/?clientId=' + $(this).html();
	});
	
});

$(document).ready(function() {

	var isoCountries = [
		{
			name: "Afghanistan",
			id: "AFG",
			text: "+004"
		}, 
		{
			name: "Åland Islands",
			id: "ALA",
			text: "+248"
		}, 
		{
			name: "Albania",
			id: "ALB",
			text: "+008"
		}, 
		{
			name: "Algeria",
			id: "DZA",
			text: "+012"
		}, 
		{
			name: "American Samoa",
			id: "ASM",
			text: "+016"
		}, 
		{
			name: "Andorra",
			id: "AND",
			text: "+020"
		}, 
		{
			name: "Angola",
			id: "AGO",
			text: "+024"
		}, 
		{
			name: "Anguilla",
			id: "AIA",
			text: "+660"
		}, 
		{
			name: "Antarctica",
			id: "ATA",
			text: "+010"
		}, 
		{
			name: "Antigua and Barbuda",
			id: "ATG",
			text: "+028"
		}, 
		{
			name: "Argentina",
			id: "ARG",
			text: "+032"
		}, 
		{
			name: "Armenia",
			id: "ARM",
			text: "+051"
		}, 
		{
			name: "Aruba",
			id: "ABW",
			text: "+533"
		}, 
		{
			name: "Australia",
			id: "AUS",
			text: "+036"
		}, 
		{
			name: "Austria",
			id: "AUT",
			text: "+040"
		}, 
		{
			name: "Azerbaijan",
			id: "AZE",
			text: "+031"
		}, 
		{
			name: "Bahamas",
			id: "BHS",
			text: "+044"
		}, 
		{
			name: "Bahrain",
			id: "BHR",
			text: "+048"
		}, 
		{
			name: "Bangladesh",
			id: "BGD",
			text: "+050"
		}, 
		{
			name: "Barbados",
			id: "BRB",
			text: "+052"
		}, 
		{
			name: "Belarus",
			id: "BLR",
			text: "+112"
		}, 
		{
			name: "Belgium",
			id: "BEL",
			text: "+056"
		}, 
		{
			name: "Belize",
			id: "BLZ",
			text: "+084"
		}, 
		{
			name: "Benin",
			id: "BEN",
			text: "+204"
		}, 
		{
			name: "Bermuda",
			id: "BMU",
			text: "+060"
		}, 
		{
			name: "Bhutan",
			id: "BTN",
			text: "+064"
		}, 
		{
			name: "Bolivia (Plurinational State of)",
			id: "BOL",
			text: "+068"
		}, 
		{
			name: "Bonaire, Sint Eustatius and Saba",
			id: "BES",
			text: "+535"
		}, 
		{
			name: "Bosnia and Herzegovina",
			id: "BIH",
			text: "+070"
		}, 
		{
			name: "Botswana",
			id: "BWA",
			text: "+072"
		}, 
		{
			name: "Bouvet Island",
			id: "BVT",
			text: "+074"
		}, 
		{
			name: "Brazil",
			id: "BRA",
			text: "+076"
		}, 
		{
			name: "British Indian Ocean Territory",
			id: "IOT",
			text: "+086"
		}, 
		{
			name: "Brunei Darussalam",
			id: "BRN",
			text: "+096"
		}, 
		{
			name: "Bulgaria",
			id: "BGR",
			text: "+100"
		}, 
		{
			name: "Burkina Faso",
			id: "BFA",
			text: "+854"
		}, 
		{
			name: "Burundi",
			id: "BDI",
			text: "+108"
		}, 
		{
			name: "Cambodia",
			id: "KHM",
			text: "+116"
		}, 
		{
			name: "Cameroon",
			id: "CMR",
			text: "+120"
		}, 
		{
			name: "Canada",
			id: "CAN",
			text: "+124"
		}, 
		{
			name: "Cabo Verde",
			id: "CPV",
			text: "+132"
		}, 
		{
			name: "Cayman Islands",
			id: "CYM",
			text: "+136"
		}, 
		{
			name: "Central African Republic",
			id: "CAF",
			text: "+140"
		}, 
		{
			name: "Chad",
			id: "TCD",
			text: "+148"
		}, 
		{
			name: "Chile",
			id: "CHL",
			text: "+152"
		}, 
		{
			name: "China",
			id: "CHN",
			text: "+156"
		}, 
		{
			name: "Christmas Island",
			id: "CXR",
			text: "+162"
		}, 
		{
			name: "Cocos (Keeling) Islands",
			id: "CCK",
			text: "+166"
		}, 
		{
			name: "Colombia",
			id: "COL",
			text: "+170"
		}, 
		{
			name: "Comoros",
			id: "COM",
			text: "+174"
		}, 
		{
			name: "Congo",
			id: "COG",
			text: "+178"
		}, 
		{
			name: "Congo (Democratic Republic of the)",
			id: "COD",
			text: "+180"
		}, 
		{
			name: "Cook Islands",
			id: "COK",
			text: "+184"
		}, 
		{
			name: "Costa Rica",
			id: "CRI",
			text: "+188"
		}, 
		{
			name: "Côte d'Ivoire",
			id: "CIV",
			text: "+384"
		}, 
		{
			name: "Croatia",
			id: "HRV",
			text: "+191"
		}, 
		{
			name: "Cuba",
			id: "CUB",
			text: "+192"
		}, 
		{
			name: "Curaçao",
			id: "CUW",
			text: "+531"
		}, 
		{
			name: "Cyprus",
			id: "CYP",
			text: "+196"
		}, 
		{
			name: "Czech Republic",
			id: "CZE",
			text: "+203"
		}, 
		{
			name: "Denmark",
			id: "DNK",
			text: "+208"
		}, 
		{
			name: "Djibouti",
			id: "DJI",
			text: "+262"
		}, 
		{
			name: "Dominica",
			id: "DMA",
			text: "+212"
		}, 
		{
			name: "Dominican Republic",
			id: "DOM",
			text: "+214"
		}, 
		{
			name: "Ecuador",
			id: "ECU",
			text: "+218"
		}, 
		{
			name: "Egypt",
			id: "EGY",
			text: "+818"
		}, 
		{
			name: "El Salvador",
			id: "SLV",
			text: "+222"
		}, 
		{
			name: "Equatorial Guinea",
			id: "GNQ",
			text: "+226"
		}, 
		{
			name: "Eritrea",
			id: "ERI",
			text: "+232"
		}, 
		{
			name: "Estonia",
			id: "EST",
			text: "+233"
		}, 
		{
			name: "Ethiopia",
			id: "ETH",
			text: "+231"
		}, 
		{
			name: "Falkland Islands (Malvinas)",
			id: "FLK",
			text: "+238"
		}, 
		{
			name: "Faroe Islands",
			id: "FRO",
			text: "+234"
		}, 
		{
			name: "Fiji",
			id: "FJI",
			text: "+242"
		}, 
		{
			name: "Finland",
			id: "FIN",
			text: "+246"
		}, 
		{
			name: "France",
			id: "FRA",
			text: "+250"
		}, 
		{
			name: "French Guiana",
			id: "GUF",
			text: "+254"
		}, 
		{
			name: "French Polynesia",
			id: "PYF",
			text: "+258"
		}, 
		{
			name: "French Southern Territories",
			id: "ATF",
			text: "+260"
		}, 
		{
			name: "Gabon",
			id: "GAB",
			text: "+266"
		}, 
		{
			name: "Gambia",
			id: "GMB",
			text: "+270"
		}, 
		{
			name: "Georgia",
			id: "GEO",
			text: "+268"
		}, 
		{
			name: "Germany",
			id: "DEU",
			text: "+276"
		}, 
		{
			name: "Ghana",
			id: "GHA",
			text: "+288"
		}, 
		{
			name: "Gibraltar",
			id: "GIB",
			text: "+292"
		}, 
		{
			name: "Greece",
			id: "GRC",
			text: "+300"
		}, 
		{
			name: "Greenland",
			id: "GRL",
			text: "+304"
		}, 
		{
			name: "Grenada",
			id: "GRD",
			text: "+308"
		}, 
		{
			name: "Guadeloupe",
			id: "GLP",
			text: "+312"
		}, 
		{
			name: "Guam",
			id: "GUM",
			text: "+316"
		}, 
		{
			name: "Guatemala",
			id: "GTM",
			text: "+320"
		}, 
		{
			name: "Guernsey",
			id: "GGY",
			text: "+831"
		}, 
		{
			name: "Guinea",
			id: "GIN",
			text: "+324"
		}, 
		{
			name: "Guinea-Bissau",
			id: "GNB",
			text: "+624"
		}, 
		{
			name: "Guyana",
			id: "GUY",
			text: "+328"
		}, 
		{
			name: "Haiti",
			id: "HTI",
			text: "+332"
		}, 
		{
			name: "Heard Island and McDonald Islands",
			id: "HMD",
			text: "+334"
		}, 
		{
			name: "Holy See",
			id: "VAT",
			text: "+336"
		}, 
		{
			name: "Honduras",
			id: "HND",
			text: "+340"
		}, 
		{
			name: "Hong Kong",
			id: "HKG",
			text: "+344"
		}, 
		{
			name: "Hungary",
			id: "HUN",
			text: "+348"
		}, 
		{
			name: "Iceland",
			id: "ISL",
			text: "+352"
		}, 
		{
			name: "India",
			id: "IND",
			text: "+356"
		}, 
		{
			name: "Indonesia",
			id: "IDN",
			text: "+360"
		}, 
		{
			name: "Iran (Islamic Republic of)",
			id: "IRN",
			text: "+364"
		}, 
		{
			name: "Iraq",
			id: "IRQ",
			text: "+368"
		}, 
		{
			name: "Ireland",
			id: "IRL",
			text: "+372"
		}, 
		{
			name: "Isle of Man",
			id: "IMN",
			text: "+833"
		}, 
		{
			name: "Israel",
			id: "ISR",
			text: "+376"
		}, 
		{
			name: "Italy",
			id: "ITA",
			text: "+380"
		}, 
		{
			name: "Jamaica",
			id: "JAM",
			text: "+388"
		}, 
		{
			name: "Japan",
			id: "JPN",
			text: "+392"
		}, 
		{
			name: "Jersey",
			id: "JEY",
			text: "+832"
		}, 
		{
			name: "Jordan",
			id: "JOR",
			text: "+400"
		}, 
		{
			name: "Kazakhstan",
			id: "KAZ",
			text: "+398"
		}, 
		{
			name: "Kenya",
			id: "KEN",
			text: "+404"
		}, 
		{
			name: "Kiribati",
			id: "KIR",
			text: "+296"
		}, 
		{
			name: "Korea (Democratic People's Republic of)",
			id: "PRK",
			text: "+408"
		}, 
		{
			name: "Korea (Republic of)",
			id: "KOR",
			text: "+410"
		}, 
		{
			name: "Kuwait",
			id: "KWT",
			text: "+414"
		}, 
		{
			name: "Kyrgyzstan",
			id: "KGZ",
			text: "+417"
		}, 
		{
			name: "Lao People's Democratic Republic",
			id: "LAO",
			text: "+418"
		}, 
		{
			name: "Latvia",
			id: "LVA",
			text: "+428"
		}, 
		{
			name: "Lebanon",
			id: "LBN",
			text: "+422"
		}, 
		{
			name: "Lesotho",
			id: "LSO",
			text: "+426"
		}, 
		{
			name: "Liberia",
			id: "LBR",
			text: "+430"
		}, 
		{
			name: "Libya",
			id: "LBY",
			text: "+434"
		}, 
		{
			name: "Liechtenstein",
			id: "LIE",
			text: "+438"
		}, 
		{
			name: "Lithuania",
			id: "LTU",
			text: "+440"
		}, 
		{
			name: "Luxembourg",
			id: "LUX",
			text: "+442"
		}, 
		{
			name: "Macao",
			id: "MAC",
			text: "+446"
		}, 
		{
			name: "Macedonia (the former Yugoslav Republic of)",
			id: "MKD",
			text: "+807"
		}, 
		{
			name: "Madagascar",
			id: "MDG",
			text: "+450"
		}, 
		{
			name: "Malawi",
			id: "MWI",
			text: "+454"
		}, 
		{
			name: "Malaysia",
			id: "MYS",
			text: "+458"
		}, 
		{
			name: "Maldives",
			id: "MDV",
			text: "+462"
		}, 
		{
			name: "Mali",
			id: "MLI",
			text: "+466"
		}, 
		{
			name: "Malta",
			id: "MLT",
			text: "+470"
		}, 
		{
			name: "Marshall Islands",
			id: "MHL",
			text: "+584"
		}, 
		{
			name: "Martinique",
			id: "MTQ",
			text: "+474"
		}, 
		{
			name: "Mauritania",
			id: "MRT",
			text: "+478"
		}, 
		{
			name: "Mauritius",
			id: "MUS",
			text: "+480"
		}, 
		{
			name: "Mayotte",
			id: "MYT",
			text: "+175"
		}, 
		{
			name: "Mexico",
			id: "MEX",
			text: "+484"
		}, 
		{
			name: "Micronesia (Federated States of)",
			id: "FSM",
			text: "+583"
		}, 
		{
			name: "Moldova (Republic of)",
			id: "MDA",
			text: "+498"
		}, 
		{
			name: "Monaco",
			id: "MCO",
			text: "+492"
		}, 
		{
			name: "Mongolia",
			id: "MNG",
			text: "+496"
		}, 
		{
			name: "Montenegro",
			id: "MNE",
			text: "+499"
		}, 
		{
			name: "Montserrat",
			id: "MSR",
			text: "+500"
		}, 
		{
			name: "Morocco",
			id: "MAR",
			text: "+504"
		}, 
		{
			name: "Mozambique",
			id: "MOZ",
			text: "+508"
		}, 
		{
			name: "Myanmar",
			id: "MMR",
			text: "+104"
		}, 
		{
			name: "Namibia",
			id: "NAM",
			text: "+516"
		}, 
		{
			name: "Nauru",
			id: "NRU",
			text: "+520"
		}, 
		{
			name: "Nepal",
			id: "NPL",
			text: "+524"
		}, 
		{
			name: "Netherlands",
			id: "NLD",
			text: "+528"
		}, 
		{
			name: "New Caledonia",
			id: "NCL",
			text: "+540"
		}, 
		{
			name: "New Zealand",
			id: "NZL",
			text: "+554"
		}, 
		{
			name: "Nicaragua",
			id: "NIC",
			text: "+558"
		}, 
		{
			name: "Niger",
			id: "NER",
			text: "+562"
		}, 
		{
			name: "Nigeria",
			id: "NGA",
			text: "+566"
		}, 
		{
			name: "Niue",
			id: "NIU",
			text: "+570"
		}, 
		{
			name: "Norfolk Island",
			id: "NFK",
			text: "+574"
		}, 
		{
			name: "Northern Mariana Islands",
			id: "MNP",
			text: "+580"
		}, 
		{
			name: "Norway",
			id: "NOR",
			text: "+578"
		}, 
		{
			name: "Oman",
			id: "OMN",
			text: "+512"
		}, 
		{
			name: "Pakistan",
			id: "PAK",
			text: "+586"
		}, 
		{
			name: "Palau",
			id: "PLW",
			text: "+585"
		}, 
		{
			name: "Palestine, State of",
			id: "PSE",
			text: "+275"
		}, 
		{
			name: "Panama",
			id: "PAN",
			text: "+591"
		}, 
		{
			name: "Papua New Guinea",
			id: "PNG",
			text: "+598"
		}, 
		{
			name: "Paraguay",
			id: "PRY",
			text: "+600"
		}, 
		{
			name: "Peru",
			id: "PER",
			text: "+604"
		}, 
		{
			name: "Philippines",
			id: "PHL",
			text: "+608"
		}, 
		{
			name: "Pitcairn",
			id: "PCN",
			text: "+612"
		}, 
		{
			name: "Poland",
			id: "POL",
			text: "+616"
		}, 
		{
			name: "Portugal",
			id: "PRT",
			text: "+620"
		}, 
		{
			name: "Puerto Rico",
			id: "PRI",
			text: "+630"
		}, 
		{
			name: "Qatar",
			id: "QAT",
			text: "+634"
		}, 
		{
			name: "Réunion",
			id: "REU",
			text: "+638"
		}, 
		{
			name: "Romania",
			id: "ROU",
			text: "+642"
		}, 
		{
			name: "Russian Federation",
			id: "RUS",
			text: "+643"
		}, 
		{
			name: "Rwanda",
			id: "RWA",
			text: "+646"
		}, 
		{
			name: "Saint Barthélemy",
			id: "BLM",
			text: "+652"
		}, 
		{
			name: "Saint Helena, Ascension and Tristan da Cunha",
			id: "SHN",
			text: "+654"
		}, 
		{
			name: "Saint Kitts and Nevis",
			id: "KNA",
			text: "+659"
		}, 
		{
			name: "Saint Lucia",
			id: "LCA",
			text: "+662"
		}, 
		{
			name: "Saint Martin (French part)",
			id: "MAF",
			text: "+663"
		}, 
		{
			name: "Saint Pierre and Miquelon",
			id: "SPM",
			text: "+666"
		}, 
		{
			name: "Saint Vincent and the Grenadines",
			id: "VCT",
			text: "+670"
		}, 
		{
			name: "Samoa",
			id: "WSM",
			text: "+882"
		}, 
		{
			name: "San Marino",
			id: "SMR",
			text: "+674"
		}, 
		{
			name: "Sao Tome and Principe",
			id: "STP",
			text: "+678"
		}, 
		{
			name: "Saudi Arabia",
			id: "SAU",
			text: "+682"
		}, 
		{
			name: "Senegal",
			id: "SEN",
			text: "+686"
		}, 
		{
			name: "Serbia",
			id: "SRB",
			text: "+688"
		}, 
		{
			name: "Seychelles",
			id: "SYC",
			text: "+690"
		}, 
		{
			name: "Sierra Leone",
			id: "SLE",
			text: "+694"
		}, 
		{
			name: "Singapore",
			id: "SGP",
			text: "+702"
		}, 
		{
			name: "Sint Maarten (Dutch part)",
			id: "SXM",
			text: "+534"
		}, 
		{
			name: "Slovakia",
			id: "SVK",
			text: "+703"
		}, 
		{
			name: "Slovenia",
			id: "SVN",
			text: "+705"
		}, 
		{
			name: "Solomon Islands",
			id: "SLB",
			text: "+090"
		}, 
		{
			name: "Somalia",
			id: "SOM",
			text: "+706"
		}, 
		{
			name: "South Africa",
			id: "ZAF",
			text: "+710"
		}, 
		{
			name: "South Georgia and the South Sandwich Islands",
			id: "SGS",
			text: "+239"
		}, 
		{
			name: "South Sudan",
			id: "SSD",
			text: "+728"
		}, 
		{
			name: "Spain",
			id: "ESP",
			text: "+724"
		}, 
		{
			name: "Sri Lanka",
			id: "LKA",
			text: "+144"
		}, 
		{
			name: "Sudan",
			id: "SDN",
			text: "+729"
		}, 
		{
			name: "Suriname",
			id: "SUR",
			text: "+740"
		}, 
		{
			name: "Svalbard and Jan Mayen",
			id: "SJM",
			text: "+744"
		}, 
		{
			name: "Swaziland",
			id: "SWZ",
			text: "+748"
		}, 
		{
			name: "Sweden",
			id: "SWE",
			text: "+752"
		}, 
		{
			name: "Switzerland",
			id: "CHE",
			text: "+756"
		}, 
		{
			name: "Syrian Arab Republic",
			id: "SYR",
			text: "+760"
		}, 
		{
			name: "Taiwan, Province of China",
			id: "TWN",
			text: "+158"
		}, 
		{
			name: "Tajikistan",
			id: "TJK",
			text: "+762"
		}, 
		{
			name: "Tanzania, United Republic of",
			id: "TZA",
			text: "+834"
		}, 
		{
			name: "Thailand",
			id: "THA",
			text: "+764"
		}, 
		{
			name: "Timor-Leste",
			id: "TLS",
			text: "+626"
		}, 
		{
			name: "Togo",
			id: "TGO",
			text: "+768"
		}, 
		{
			name: "Tokelau",
			id: "TKL",
			text: "+772"
		}, 
		{
			name: "Tonga",
			id: "TON",
			text: "+776"
		}, 
		{
			name: "Trinidad and Tobago",
			id: "TTO",
			text: "+780"
		}, 
		{
			name: "Tunisia",
			id: "TUN",
			text: "+788"
		}, 
		{
			name: "Turkey",
			id: "TUR",
			text: "+792"
		}, 
		{
			name: "Turkmenistan",
			id: "TKM",
			text: "+795"
		}, 
		{
			name: "Turks and Caicos Islands",
			id: "TCA",
			text: "+796"
		}, 
		{
			name: "Tuvalu",
			id: "TUV",
			text: "+798"
		}, 
		{
			name: "Uganda",
			id: "UGA",
			text: "+800"
		}, 
		{
			name: "Ukraine",
			id: "UKR",
			text: "+804"
		}, 
		{
			name: "United Arab Emirates",
			id: "ARE",
			text: "+784"
		}, 
		{
			name: "United Kingdom of Great Britain and Northern Ireland",
			id: "GBR",
			text: "+44"
		}, 
		{
			name: "United States of America",
			id: "USA",
			text: "+1"
		}, 
		{
			name: "United States Minor Outlying Islands",
			id: "UMI",
			text: "+581"
		}, 
		{
			name: "Uruguay",
			id: "URY",
			text: "+858"
		}, 
		{
			name: "Uzbekistan",
			id: "UZB",
			text: "+860"
		}, 
		{
			name: "Vanuatu",
			id: "VUT",
			text: "+548"
		}, 
		{
			name: "Venezuela (Bolivarian Republic of)",
			id: "VEN",
			text: "+862"
		}, 
		{
			name: "Viet Nam",
			id: "VNM",
			text: "+704"
		}, 
		{
			name: "Virgin Islands (British)",
			id: "VGB",
			text: "+092"
		}, 
		{
			name: "Virgin Islands (U.S.)",
			id: "VIR",
			text: "+850"
		}, 
		{
			name: "Wallis and Futuna",
			id: "WLF",
			text: "+876"
		}, 
		{
			name: "Western Sahara",
			id: "ESH",
			text: "+732"
		}, 
		{
			name: "Yemen",
			id: "YEM",
			text: "+887"
		}, 
		{
			name: "Zambia",
			id: "ZMB",
			text: "+894"
		}, 
		{
			name: "Zimbabwe",
			id: "ZWE",
			text: "+716"
		}
	]


	isoCountries = [
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
		name: "Australia",
		text: "+61",
		id: "AU"
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


/*
- https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes
- https://github.com/mledoze/countries
- https://github.com/datasets/country-codes
- https://gist.github.com/Goles/3196253
- http://country.io/data/
*/

	// function formatCountry (country) {

	// 	if (!country.id) { return country.text }
	// 	console.log('Who am I', )
	// 	var $country = $(
	// 		'<span class="flag-icon flag-icon-' + (country.id).toLowerCase() +'" data-title="' + country.name + '"></span>' +
	// 		'<span class="flag-text">' + country.text + '</span>'
	// 	)
	// 	return $country
	// }

	// function searchName (params, data) {
	//   if ($.trim(params.term) === '') {
	//     return data;
	//   }

	//   if (
	//     data.text.toUpperCase().indexOf(params.term.toUpperCase()) > -1 || 
	//      $(data.element).attr("data-name").toUpperCase().indexOf(params.term.toUpperCase()) > -1
	//   ) {
	//     var modifiedData = $.extend({}, data, true);
	//     return modifiedData;
	//   }
	//   return null;
	//   };


	//   var $buildSelect;
	//   $(isoCountries).each(function(i){  	
	//   	$buildSelect += '<option value="' + isoCountries[i].id +'" data-name="' + isoCountries[i].name + '">' + isoCountries[i].text + '</option>'; 
	//   })

	//   $selectElements = $('#country-code, #country-code-landline')

	//   $selectElements.append($buildSelect);


	// // Select2
	// $selectElements.select2({
	// 	templateResult: formatCountry,
	// 	templateSelection: formatCountry,
	// 	matcher: searchName
	// })



	$('.site-recipients-02').find('button').click(function(){ 

	if ($('#iban-number').val() == '') {
		$('.retrieve-fail').removeClass('hide');
	}                                                                                      
		$('.expanding-section').slideDown(); 
	})

	$('.site-recipients-02').find('.link-need-interm-bank').click(function(){
		$('.need-interm-bank').removeClass('hide');
	})


	$('button[data-role="confirm-deletion"').click(function() {
		$('.modal-close').trigger('click');

	});

	// Rate update in the Transfer Summary (in the step 4)
	if ($('.site-transfers-04').length > 0) {

		setTimeout(function() {
			$('.table-summary tr').eq(1).addClass('update');
			$('.table-summary tr').eq(3).addClass('update');
		}, 2);
	}


	if ($('#language-select').length > 0) {
		$('#language-select button').click(function(){
			$('.modal-close').trigger('click')
		})
	}

	if ($('#address-lookup').length > 0) {
		$('#address-lookup button').click(function(){
			$('.modal-close').trigger('click')
		})
	}	

	$('.button-resend-PIN').click(function(){

		$('.loader-container').removeClass('hide');

		setTimeout(function(){

			$('.loader-container').addClass('hide');

			if (!$(this).is('.disabled')) {

			var $that = $('.p-modal-pin').not('.hide');
			var $next = $that.next();

			console.log($next);

			if ($next.is('.inputs-PIN')) {
				$next = $('.p-modal-pin').eq(0);
			} 

			$next.removeClass('hide');
			$that.addClass('hide');
		}

		}, 1000)

		
	})



	$('button[data-open=pin-code').click(function(){
		setTimeout(function() {
			$('.button-resend-PIN').removeClass('disabled');
		}, 8000);
	})

	

	$('button[data-open=pin-code]').click(function(){
		$('.inputs-PIN').find('input').eq(0).focus();
	})

	$('.inputs-PIN input').keyup(function(){
		if ($(this).val()) {$(this).blur(); $(this).next().focus(); }
	});


	// /whitelabel/transactions/top-up-currency/ show wallet balances

	$('.wallet-balance-hint').find('.wallet, .tooltip-popup').hide();

	$('select#transfer-details-sell-currency').on('change', function (ev) {
		var $this = $(this);
		var $This  = this.value;
		var $TThis  = $This.toUpperCase();

		$('.currency-pay').removeClass().addClass('currency currency-pay '+$This).text($TThis);

		$('.wallet-balance-hint .wallets-container').find('.wallet').hide();
		$('.wallet-balance-hint .wallets-container').find('.'+this.value).show();
		if ($('.wallets-container .wallet').is(':visible')) { 
			$('.wallet-balance-hint .tooltip-popup').show(); }
			else { $('.wallet-balance-hint .tooltip-popup').hide(); }
	});	

	$('select#transfer-details-reason-for-transfer-1').on('change', function (ev) {
		var $this = $(this);
		var $This  = this.value;
		var $TThis  = $This.toUpperCase();

		$('.currency-buy').removeClass().addClass('currency currency-buy '+$This).text($TThis);

	});

})