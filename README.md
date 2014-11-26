#Servant Javascript SDK

**Rapidly build web pages and client-side applications that connect with Servants using this SDK**

For even more Documentation, check out  [Servant – Developers](https://developers.servant.co).   The Documentation there goes over installing and using the SDK, plus how to use it to build Client-Side Servant Applications.

**[There is a video that shows how to build front-end applications with this SDK here](http://youtu.be/BZeM7CC_w1E)**

## Features ##

 - **Instantiation:**  Create instances of Archetype Objects already filled with all properties available
 - **Validation:**  Validate Archetype Objects locally, without having to send them up to Servant.
 - **Save/Update Archetype Records:** Save and Update Archetype Records easily
 - **Show/Query Archetype Records:** Show and Query Archetype Records kept on Servants
 - **Connect Method:**  Add the connect() Method to any element (i.e., buttons) to make them Servant Connect buttons. 
 - **Image Archetypes** Multiple Image Uploading via Dropzones and File Inputs, with Previews, Progress, and more:**  The initialize method features tons of parameters allowing you to create Image Archetype upload dropzones, file inputs, image upload previews and progress percentages.


## Testing ##

If you have Node installed, run

    node server

Then go to:

    http://localhost:8080/


## How To Use ##

For even more Documentation, check out  [Servant – Developers](https://developers.servant.co).   The Documentation there goes over installing and using the SDK, plus how to use it to build Client-Side Servant Applications.

**Install via Bower:**

    bower install servant-sdk-javascript --save

**Initialize the SDK:**
Put this at the beginning of your application, before any other javascript logic if possible.  When a user is redirected to your website from the Servant Authorization screen, an access_token param is included as a hash fragment in the redirect URL.  This method is designed to quickly check for the token, cache it in the SDK, and remove it from the url.  So it's ideal to run this before your application's other logic.

    Servant.initialize({
        application_client_id: 'Wy69Xg4QgAw16NIH'
    }, function(status) {
        console.log(status);
    });

Initialize Method Options:

* **application_client_id:** 'jasf98asfasf8a568asf',
Required - String - CLIENT_ID from app registered on Servant
* **version:** 0,
Optional - Integer - Must be set to 0
* **protocol:** 'https',
Optional - String - 'http' or 'https'
* **scope:** 'full',
Optional - String - 'full' or 'limited' - IMPORTANT: When you authorize, you are given two access_tokens.  One has full Read/Write access, the other is has only Read access.  If you are passing AccessTokens through to the general public (e.g., A front-end app that shows Servant content to the general public and not only to the Servant account owner), use the 'limited' access_token.  It's more secure.
* **token:** 'LKJFSF9809asfljasf'
Optional - String - Manually input an access token
* **cache:** true,
Optional - Boolean - Auto-cache Servants and User data in the SDK when fetched.  Defaults to true.
* **image_file_input_class:** 'image-input',
Optional - String - If you have file inputs to select images for uploading to create Image Archetypes, put in their class here, and files will be auto-uploaded afer being selected.
* **image_dropzone_class:** 'image-dropzone',
Optional - String - Class of dropzone elements.  Drop listener will be added.
* **image_preview_id:** 'image-upload-previews',
Optional - String - ID of image preview container to which img elements will be appended before upload and removed after upload.
* **image_success_callback:** imageSuccessCallback,
Optional - Function - Image upload success callback,
* **image_failed_callback:** imageFailedCallback,
Optional - Function - Image upload failed callback.
* **image_progress_callback:** imageProgressCallback,
Optional - Function - Image progress callback.  Returns percentage, bytes loaded, bytes total as params.

**Servant.status**
This returns "uninitialized", "no_token", "has_token"
    
    if (Servant.status === "has_token"){
            
    }

**Making A Connect Button with Servant.connect():**
You can turn any button into a Connect Servant button using this method in an onClick event, like this:
    
    <button type="button" onclick="Servant.connect()">Connect Servant</button>

**Servant.getUserAndServants(successCallback, errorCallback)**
Fetches the account user and their Servants which your application has permission to.

    Servant.getUserAndServants(function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });
**Servant.servants, Servant.user**
These variables are created whenever `.getUserAndServants()` is called.

**Servant.setServant(servant)**
This sets the servant whose data you'd like to work with.  You MUST set the Servant before you can work with Archetype records via the Servant API.  Pass in an entire Servant object that you get from `.getUserAndServants()`.  This will also set the following variable: `Servant.servant`.

**Servant.instantiate(archetype, callback)**
Creates a new instance of an Archetype.  Has a callback because it fetches the Archetype's Schema from the Servant API and caches it on first use. 

    Servant.instantiate('product', function(response) {
        var newProduct = response;
    });

**Servant.validate(archetype, instance, callback)**
Validates an instance of an Archetype against the Archetype's rules (e.g. character limits, max items, etc.).  Fetches the Archetype's Schema from the Servant API and caches it on first use.  The instance will pass through without error if it is valid.

    Servant.validate('product', newProduct, function(product) {
        console.log(product)
    }, function(error){
        console.log(error.errors);
    });

**Servant.saveArchetype(archetype, instance, successCallback, errorCallback)**
Creates or Updates an Archetype on a Servant.  If the instance has an "_id" property, this will attempt to update an existing record.  If the instance has no "_id" attribute, a record will be created.  Make sure you set the servant before using this function via `.setServant(servant)`.

    Servant.saveArchetype('product', newProduct, function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });

**Servant.showArchetype(archetype, archetypeID, successCallback, errorCallback)**
Shows a record of an Archetype from Servant.  Make sure you set the servant before using this function via `.setServant(servant)`.

    Servant.showArchetype('product', '8080h1419ua987124', function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });

**Servant.queryArchetypes(archetype, criteria, successCallback, errorCallback)**
Queries records of an Archetype on a Servant.  Make sure you set the servant before using this function via `.setServant(servant)`.  This method can take most MongoDB queries.  Format query criteria like this:

    var criteria = { query: { price: 0 }, sort: {}, page: 1 };   

    Servant.queryArchetypes('product', criteria, function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });

Not including query criteria will simply fetch the 10 most recent records of the specified archetype.  

Simply iterate the page integer to paginate through results.

**Servant.deleteArchetype(archetype, archetypeID, successCallback, errorCallback)**
Deletes a record of an Archetype from Servant.  Make sure you set the servant before using this function via `.setServant(servant)`.

    Servant.deleteArchetype('product', '8080h1419ua987124', function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });

**Creating Image Archetypes**
Image Archetypes cannot be created like other Archetypes.  To create or update them, you must upload an image directly to Servant.  Then you will receive the created Image Archetype in the response.  The `.initialize()` method contains a ton of helpful options to handle uploading for you.  Make sure you set the servant before creating image archetypes via `.setServant(servant)`.



