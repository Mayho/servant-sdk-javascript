
/**
 * Product Schema
 */
var productSchema = {
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "Product Schema",
	"description": "The Product Archetype - Essential properties that define a product",
	"type": "object",
	"additionalProperties": false,
	"required": ["title", "price", "seller"],
	"properties": {
		"title": {
			"type": "string",
			"description": "The name of the product",
			"maxLength": 140,
			"default": ""
		},
		"price": {
			"type": "integer",
			"description": "Product price in cents as an integer (whole number)",
			"minimum": 0,
			"maximum": 999999999999999,
			"default": 0
		},
		"seller": {
			"type": "string",
			"description": "The person or organization selling the product",
			"maxLength": 70,
			"default": ""
		},
		"_id": {
			"type": "string",
			"description": "Unique identifier for this product",
			"maxLength": 50,
			"default": ""
		},
		"category": {
			"type": "string",
			"description": "General category of the product, e.g. Clothing",
			"maxLength": 40,
			"default": ""
		},
		"subcategory": {
			"type": "string",
			"description": "Specific category of the product, e.g. Jeans",
			"maxLength": 40,
			"default": ""
		},
		"condition": {
			"enum": ["new", "refurbished", "used - like new", "used - very good", "used - good", "used - acceptable"],
			"description": "Condition of the product, e.g. New",
			"default": "new"
		},
		"description": {
			"type": "string",
			"description": "Description of the product",
			"maxLength": 5000,
			"default": ""
		},
		"draft": {
			"type": "boolean",
			"description": "Is the Archetype instance in draft mode or published",
			"default": false
		},
		"primary_image_archetype": {
			"$ref": "image_archetype_schema.json",
			"description": "Image Archetype to use as the primary image of this product"
		},
		"image_archetypes": {
			"type": "array",
			"description": "Array of Image Archetypes related to this product",
			"uniqueItems": true,
			"additionalItems": false,
			"default": [],
			"maxItems": 15,
			"items": {
				"$ref": "image_archetype_schema.json"
			}
		},
		"variations": {
			"type": "array",
			"description": "Array of Product Archetypes that are considered variations of this Product",
			"uniqueItems": true,
			"additionalItems": false,
			"maxItems": 30,
			"default": [],
			"items": {
				"$ref": "product_archetype_schema.json"
			}
		},
		"tags": {
			"type": "array",
			"maxItems": 6,
			"uniqueItems": true,
			"default": [],
			"items": {
				"type": "string",
				"maxLength": 30,
				"default": ""
			}
		},
		"audience": {
			"type": "array",
			"maxItems": 4,
			"uniqueItems": true,
			"default": [],
			"items": {
				"type": "string",
				"maxLength": 30,
				"default": ""
			}
		},
		"brand": {
			"type": "string",
			"description": "Brand of the product",
			"maxLength": 50,
			"default": ""
		},
		"model": {
			"type": "string",
			"description": "Model name or number of the product",
			"maxLength": 50,
			"default": ""
		},
		"currency": {
			"enum": ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP", "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "USS", "UYI", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD", "XCD", "XDR", "XFU", "XOF", "XPD", "XPF", "XPT", "XTS", "XXX", "YER", "ZAR", "ZMW"],
			"description": "ISO 4217 currency code",
			"default": "USD"
		},
		"recurring_payment": {
			"type": "boolean",
			"description": "Does this product require recurring payments, e.g. Subscriptions",
			"default": false
		},
		"payment_interval": {
			"enum": ["yearly", "monthly", "weekly", "daily", "hourly"],
			"description": "Time interval for recurring payment",
			"default": "yearly"
		},
		"sale": {
			"type": "boolean",
			"description": "Is the product on sale",
			"default": false
		},
		"sale_price": {
			"type": "integer",
			"description": "Product price in cents as an integer (whole number)",
			"minimum": 0,
			"maximum": 999999999999999,
			"default": 0
		},
		"in_stock": {
			"type": "boolean",
			"description": "Is the product in stock?",
			"default": true
		},
		"sku": {
			"type": "string",
			"description": "The Stock Keeping Unit of the product",
			"maxLength": 50,
			"default": ""
		},
		"upc": {
			"type": "string",
			"description": "The Universal Product Code of the product",
			"maxLength": 50,
			"default": ""
		},
		"shipping_prices": {
			"type": "array",
			"description": "An array listing countries or states the product ships to and the corresponding price",
			"uniqueItems": true,
			"additionalItems": false,
			"default": [],
			"maxItems": 60,
			"items": {
				"type": "object",
				"additionalProperties": false,
				"required": ["shipping_country", "shipping_price"],
				"properties": {
					"shipping_country": {
						"enum": ["everywhere else", "afghanistan", "albania", "algeria", "andorra", "angola", "anguilla", "antigua & barbuda", "argentina", "armenia", "aruba", "australia", "austria", "azerbaijan", "bahamas", "bahrain", "bangladesh", "barbados", "belarus", "belgium", "belize", "benin", "bermuda", "bhutan", "bolivia", "bosnia &amp; herzegovina", "botswana", "brazil", "british virgin islands", "brunei", "bulgaria", "burkina faso", "burundi", "canada", "cambodia", "cameroon", "cape verde", "cayman islands", "chad", "chile", "china", "colombia", "congo", "cook islands", "costa rica", "cote d ivoire", "croatia", "cruise ship", "cuba", "cyprus", "czech republic", "denmark", "djibouti", "dominica", "dominican republic", "ecuador", "egypt", "el salvador", "equatorial guinea", "estonia", "ethiopia", "falkland islands", "faroe islands", "fiji", "finland", "france", "french polynesia", "french west indies", "gabon", "gambia", "georgia", "germany", "ghana", "gibraltar", "greece", "greenland", "grenada", "guam", "guatemala", "guernsey", "guinea", "guinea bissau", "guyana", "haiti", "honduras", "hong kong", "hungary", "iceland", "india", "indonesia", "iran", "iraq", "ireland", "isle of man", "israel", "italy", "jamaica", "japan", "jersey", "jordan", "kazakhstan", "kenya", "kuwait", "kyrgyz republic", "laos", "latvia", "lebanon", "lesotho", "liberia", "libya", "liechtenstein", "lithuania", "luxembourg", "macau", "macedonia", "madagascar", "malawi", "malaysia", "maldives", "mali", "malta", "mauritania", "mauritius", "mexico", "moldova", "monaco", "mongolia", "montenegro", "montserrat", "morocco", "mozambique", "namibia", "nepal", "netherlands", "netherlands antilles", "new caledonia", "new zealand", "nicaragua", "niger", "nigeria", "norway", "oman", "pakistan", "palestine", "panama", "papua new guinea", "paraguay", "peru", "philippines", "poland", "portugal", "puerto rico", "qatar", "reunion", "romania", "russia", "rwanda", "saint pierre &amp; miquelon", "samoa", "san marino", "satellite", "saudi arabia", "senegal", "serbia", "seychelles", "sierra leone", "singapore", "slovakia", "slovenia", "south africa", "south korea", "spain", "sri lanka", "st kitts &amp; nevis", "st lucia", "st vincent", "st. lucia", "sudan", "suriname", "swaziland", "sweden", "switzerland", "syria", "taiwan", "tajikistan", "tanzania", "thailand", "timor l'este", "togo", "tonga", "trinidad &amp; tobago", "tunisia", "turkey", "turkmenistan", "turks &amp; caicos", "uganda", "ukraine", "united arab emirates", "united kingdom", "united states", "united states minor outlying islands", "uruguay", "uzbekistan", "venezuela", "vietnam", "virgin islands (us)", "yemen", "zambia", "zimbabwe"],
						"description": "Name of the geographic jurisdiction which the product can be shipped to",
						"default": "united states"
					},
					"shipping_price": {
						"type": "integer",
						"description": "The price of shipping to the corresponding place in cents as an integer (whole number)",
						"minimum": 0,
						"default": 0
					}
				}
			}
		},
		"created": {
			"type": "string",
			"description": "Date and time the product was created in ISO 8601 date standard e.g. YYYY-MM-DDThh:mm:ss.sTZD",
			"format": "date-time",
			"default": ""
		},
		"updated": {
			"type": "string",
			"description": "Date and time the product was updated in ISO 8601 date standard e.g. YYYY-MM-DDThh:mm:ss.sTZD",
			"format": "date-time",
			"default": ""
		}
	}
}

/**
 * Task Schema
 */

var taskSchema = {
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "Task Schema",
	"type": "object",
	"additionalProperties": false,
	"required": ["task", "status"],
	"properties": {
		"task": {
			"type": "string",
			"description": "The task",
			"maxLength": 4000,
			"default": ""
		},
		"status": {
			"enum": ["not completed", "completed", "on hold"],
			"description": "Three options in string format to describe status of the task",
			"default": "not completed"
		},
		"list": {
			"type": "string",
			"description": "The list this task belongs to",
			"maxLength": 300,
			"default": ""
		},
		"parent_task": {
			"type": "string",
			"description": "ID of another task that this task belongs to",
			"maxLength": 100,
			"default": ""
		},
		"category": {
			"type": "string",
			"description": "Category for the task",
			"maxLength": 50,
			"default": ""
		},
		"due_date": {
			"type": "string",
			"description": "Date and time the task is due in ISO 8601 date standard e.g. YYYY-MM-DDThh:mm:ss.sTZD",
			"format": "date-time",
			"default": ""
		},
		"draft": {
			"type": "boolean",
			"description": "Is the Archetype instance in draft mode or published",
			"default": false
		},
		"priority_level": {
			"type": "integer",
			"description": "Priority level.  5 being the most important",
			"minimum": 1,
			"maximum": 5,
			"default": 1
		},
		"percentage_completed": {
			"type": "integer",
			"description": "Number out of 100 to represent how much of this task has been completed",
			"minimum": 0,
			"maximum": 100,
			"default": 0
		},
		"assignees": {
			"type": "array",
			"description": "People whom this task has been assigned to",
			"maxItems": 30,
			"uniqueItems": true,
			"additionalItems": false,
			"default": [],
			"items": {
				"type": "string",
				"default": ""
			}
		}
	}
}


/**
 * Receipt Schema
 */

var receiptSchema = {
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "Receipt Schema",
	"type": "object",
	"additionalProperties": false,
	"required": ["transaction_date", "price_total"],
	"properties": {
		"transaction_date": {
			"type": "string",
			"description": "Date and time of the transaction in ISO 8601 date standard e.g. YYYY-MM-DDThh:mm:ss.sTZD",
			"format": "date-time",
			"default": ""
		},
		"price_total": {
			"type": "number",
			"description": "Total purchase price in cents as an integer (whole number)",
			"minimum": 0,
			"default": 0
		},
		"price_shipping": {
			"type": "number",
			"description": "Total shipping cost in cents as an integer (whole number)",
			"minimum": 0,
			"default": 0
		},
		"price_tax": {
			"type": "number",
			"description": "Total sales tax in cents as an integer (whole number)",
			"minimum": 0,
			"default": 0
		},
		"currency": {
			"enum": ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP", "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "USS", "UYI", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD", "XCD", "XDR", "XFU", "XOF", "XPD", "XPF", "XPT", "XTS", "XXX", "YER", "ZAR", "ZMW"],
			"description": "ISO 4217 currency code",
			"default": "USD"
		},
		"draft": {
			"type": "boolean",
			"description": "Is the Archetype instance in draft mode or published",
			"default": false
		},
		"paid": {
			"type": "boolean",
			"description": "Boolean to indicate whether the receipt has been paid for",
			"default": true
		},
		"shipped": {
			"type": "boolean",
			"description": "Boolean to indicate whether the order has been shipped",
			"default": false
		},
		"notes": {
			"type": "string",
			"description": "Order notes from the customer who purchased the product",
			"maxLength": 3000,
			"default": ""
		},
		"discount_code": {
			"type": "string",
			"description": "Coupon or promotional code used, if any",
			"maxLength": 200,
			"default": ""
		},
		"discount_percentage": {
			"type": "number",
			"description": "A number percentage discount to be applied to the order",
			"minimum": 0,
			"default": 0
		},
		"products": {
			"type": "array",
			"description": "An array of the products purchased",
			"additionalItems": false,
			"maxItems": 300,
			"minItems": 1,
			"default": [],
			"items": {
				"type": "object",
				"additionalProperties": false,
				"required": ["product_archetype_id", "product_price", "product_quantity"],
				"properties": {
					"product_archetype_id": {
						"type": "string",
						"description": "Product Archetype ID",
						"maxLength": 50,
						"default": ""
					},
					"product_price": {
						"type": "integer",
						"description": "Product price in cents as an integer (whole number)",
						"minimum": 0,
						"maximum": 999999999999999,
						"default": 0
					},
					"product_quantity": {
						"type": "integer",
						"description": "Quantity of the purchased product",
						"maximum": 999999999999999,
						"default": 1
					}
				}
			}
		},
		"customer_first_name": {
			"type": "string",
			"description": "First name of the buyer",
			"maxLength": 100,
			"default": ""
		},
		"customer_last_name": {
			"type": "string",
			"description": "Last name of the buyer",
			"maxLength": 100,
			"default": ""
		},
		"customer_payment_method": {
			"enum": ["pp", "cc", "ck", "mo", "other"],
			"description": "The payment method used. May be pp, cc, ck, mo, or other (stands for paypal, credit card, check, money order, other)",
			"default": "cc"
		},
		"customer_email": {
			"type": "string",
			"description": "Email address of the buyer",
			"maxLength": 100,
			"format": "email",
			"default": ""
		},
		"customer_phone_number": {
			"type": "string",
			"description": "Phone number of the buyer",
			"maxLength": 50,
			"default": ""
		},
		"customer_address": {
			"type": "string",
			"description": "To add multiple address lines, use \n. For example, 1234 Glücklichkeit Straße\nHinterhaus 5. Etage li.",
			"maxLength": 100,
			"default": ""
		},
		"customer_postal_code": {
			"type": "string",
			"maxLength": 30,
			"default": ""
		},
		"customer_city": {
			"type": "string",
			"maxLength": 100,
			"default": ""
		},
		"customer_country_code": {
			"enum": ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "AN", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "GS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"],
			"description": "code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN",
			"default": "US"
		},
		"customer_region": {
			"type": "string",
			"maxLength": 100,
			"description": "The general region where you live. Can be a US state, or a province, for instance.",
			"default": ""
		},
		"shipping_first_name": {
			"type": "string",
			"description": "First name of the person the product(s) will be shipped to",
			"default": ""
		},
		"shipping_last_name": {
			"type": "string",
			"description": "Last name of the person the product(s) will be shipped to",
			"default": ""
		},
		"shipping_email": {
			"type": "string",
			"description": "Email address of the person the item is being shipped to",
			"maxLength": 100,
			"format": "email",
			"default": ""
		},
		"shipping_phone_number": {
			"type": "string",
			"description": "Phone number of the person the item is being shipped to",
			"maxLength": 50,
			"default": ""
		},
		"shipping_address": {
			"type": "string",
			"description": "To add multiple address lines, use \n. For example, 1234 Glücklichkeit Straße\nHinterhaus 5. Etage li.",
			"default": ""
		},
		"shipping_postal_code": {
			"type": "string",
			"default": ""
		},
		"shipping_city": {
			"type": "string",
			"default": ""
		},
		"shipping_region": {
			"type": "string",
			"description": "The general region where you live. Can be a US state, or a province, for instance.",
			"default": ""
		},
		"shipping_country_code": {
			"enum": ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "AN", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "GS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"],
			"description": "code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN",
			"default": "US"
		}
	}
}







// End