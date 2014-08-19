var JATs = require('json-archetypes');
var test = require('tape');
var svnt = require('../index.js');
var Servant = new svnt;


test('****** Test Adding Schemas', function(t) {
	Servant.addSchema('product', JATs.archetypes.product);
	Servant.addSchema('receipt', JATs.archetypes.receipt);
	Servant.addSchema('task', JATs.archetypes.task);

	t.equal(typeof Servant.schemas.product.title !== 'undefined', true);
	t.equal(typeof Servant.schemas.receipt.title !== 'undefined', true);
	t.equal(typeof Servant.schemas.task.title !== 'undefined', true);
	t.end();
});

test('****** Test Schema Validator - Missing Requireds', function(t) {
	var product = {
		title: 'asfasf'
	};

	Servant.validate(product, 'product', function(errors, product) {
		console.log("Finished: ", errors, product);
	});
	t.end();
});

test('****** Test Schema Validator - Missing Requireds', function(t) {
	var product = {
		// Incorrect type
		title: 098234,
		// Maximum
		price: 999999999999999999,
		// MaxLength
		seller: 'lsajfl;saj sja ;ajsf;l jasf;l jsaf;l jasf;l jsaf;kl jsa;flj sa;fj ;safj as;lfj ;lasfj ;lsakkfj ;alsfj ;aslfj l;kasfj ;lasfj aslk;jf',
		// Minimum
		sale_price: -10,
		// MaxItems (Array)
		audience: ['one', 'two', 'three', 'four', 'five', 'six', 'seven'],
		// ENUM
		condition: 'really old',
		// UniqueItems
		tags: ['one', 'two', 'one'],
		// UniqueItems Deep
		shipping_prices: [{
			price: 90,
			place: 'north pole'
		}, {
			price: 10,
			place: 'canada'
		}],
		// 
		variations: [{
			variation: 'one',
			in_stock: true
		}, {
			variation: 'one',
			in_stock: true
		}]
	};

	Servant.validate(product, 'product', function(errors, product) {
		t.equal(typeof errors.title !== 'undefined', true);
		t.equal(typeof errors.price !== 'undefined', true);
		t.equal(typeof errors.seller !== 'undefined', true);
		t.equal(typeof errors.sale_price !== 'undefined', true);
		t.equal(typeof errors.audience !== 'undefined', true);
		t.equal(typeof errors.condition !== 'undefined', true);
		t.equal(typeof errors.tags !== 'undefined', true);
		t.equal(typeof errors.variations !== 'undefined', true);

		console.log('Errors: ', errors, 'Object: ', product);
	});
	t.end();
});