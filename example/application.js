$(function() {

    /*
     Register your application on https://www.servant.co to get a CLIENT_ID

     Servant.initialize()
     Run the Servant.initialize() method at the start of your application.  
     This method will check the URL for access tokens and snatch them automatically.
     This method takes the following options, but only the application_client_id is required:
     
     */

    var SDKOptions = {
        application_client_id: 'Wy69Xg4QgAw16NIH', // String
        protocol: 'http' // String.  Can use either 'http' or 'https'
    }

    Servant.initialize(SDKOptions);

    if (Servant.isReady) {
        // Scroll Down
        window.scrollTo(0,400);

        var data = {};

        // Get Archetypes
        Servant.getUserAndServants(function(response) {
            data.user = response.user;
            data.servants = response.servants;

            // Check if user has servants
            if (!data.servants.length) return alert("You don't have any servants and these examples require you to have at least one.  Go to https:://servant.co and get a Servant.  Then you will be able to run these examples :)");
            
            // Modify DOM
            $('#user').html(JSON.stringify(data.user, undefined, 4));
            $('#servants').html(JSON.stringify(data.servants, undefined, 4));

            // Instantiate New Product
            Servant.instantiate('product', function(instance) {
                $('#product-instance').html(JSON.stringify(instance, undefined, 4));
                data.product = instance;

                Servant.validate('product', data.product, function(errors, result) {
                    $('#product-validated1').html(JSON.stringify(errors, undefined, 4));

                    data.product.name = "White Gloves";
                    data.product.price = 2999;
                    data.product.seller = "The Fancy Store";

                    Servant.validate('product', data.product, function(errors, result) {
                        $('#product-validated2').html(JSON.stringify(result, undefined, 4));

                        Servant.saveArchetype(data.servants[0]._id, 'product', data.product, function(result) {
                            data.product = result;

                            $('#product-saved').html(JSON.stringify(data.product, undefined, 4));

                            data.product.name = "Top Hat";

                            Servant.saveArchetype(data.servants[0]._id, 'product', data.product, function(result) {
                                data.product = result;
                                $('#product-updated').html(JSON.stringify(data.product, undefined, 4));

                                Servant.showArchetype(data.servants[0]._id, 'product', data.product._id, function(result) {
                                    data.product = result;
                                    $('#product-show').html(JSON.stringify(data.product, undefined, 4));


                                }, function(error) {
                                    console.log(error);
                                }); // Servant.showArchetype
                            }, function(errors) {
                                console.log(errors);
                            }); // Servant.saveArchetype
                        }, function(errors) {
                            console.log(errors);
                        }); // Servant.saveArchetype
                    });
                });
            }); // Servant.instantiate

        }, function(error) {
            console.log(error);
            $('#user').html('Oops, something went wrong.  Check the console.');
            $('#servants').html('Oops, something went wrong.  Check the console.');
        });

    } // if (Servant.isReady)

});