#Servant Javascript SDK

**Rapidly build web pages and client-side applications that connect with Servants using this SDK**

For even more Documentation, check out  [Servant – Developers](https://developers.servant.co).   The Documentation there goes over installing and using the SDK, plus how to use it to build Client-Side Servant Applications.

## Features ##

 - **Instantiation:**  Create instances of Archetype Objects already filled with all properties available
 - **Validation:**  Validate Archetype Objects locally, without having to send them up to Servant.
 - **Save/Update Archetype Records:** Save and Update Archetype Records easily
 - **Show/Query Archetype Records:** Show and Query Archetype Records kept on Servants
 - **Connect Method:**  Add the Connect Method to any element (i.e., a button) to make them Servant Connect buttons. 

## How To Use ##

For even more Documentation, check out  [Servant – Developers](https://developers.servant.co).   The Documentation there goes over installing and using the SDK, plus how to use it to build Client-Side Servant Applications.

**Install via Bower:**

    bower install servant-sdk-javascript --save

**Initialize the SDK:**

	Servant.initialize({
    application_client_id: 'Wy69Xg4QgAw16NIH'
	}, function(status) {
		console.log(status);
	});

Options:

#Servant Javascript SDK

**Rapidly build web pages and client-side applications that connect with Servants using this SDK**

For even more Documentation, check out  [Servant – Developers](https://developers.servant.co).   The Documentation there goes over installing and using the SDK, plus how to use it to build Client-Side Servant Applications.

## Features ##

 - **Instantiation:**  Create instances of Archetype Objects already filled with all properties available
 - **Validation:**  Validate Archetype Objects locally, without having to send them up to Servant.
 - **Save/Update Archetype Records:** Save and Update Archetype Records easily
 - **Show/Query Archetype Records:** Show and Query Archetype Records kept on Servants
 - **Connect Method:**  Add the Connect Method to any element (i.e., a button) to make them Servant Connect buttons. 

## How To Use ##

For even more Documentation, check out  [Servant – Developers](https://developers.servant.co).   The Documentation there goes over installing and using the SDK, plus how to use it to build Client-Side Servant Applications.

**Install via Bower:**

    bower install servant-sdk-javascript --save

**Initialize the SDK:**

	Servant.initialize({
    application_client_id: 'Wy69Xg4QgAw16NIH'
	}, function(status) {
		console.log(status);
	});

Options:

**application_client_id: 'jasf98asfasf8a568asf',**
Required - String - CLIENT_ID from app registered on Servant
**version: 0,**
Optional - Integer - Must be set to 0
**protocol: 'https',**
Optional - String - 'http' or 'https'
**scope: 'full',**
Optional - String - 'full' or 'limited' - IMPORTANT: When you authorize, you are given two access_tokens.  One has full Read/Write access, the other is has only Read access.  If you are passing AccessTokens through to the general public (e.g., A front-end app that shows Servant content to the general public and not only to the Servant account owner), use the 'limited' access_token.  It's more secure.
		

**Check Status:**
This returns "uninitialized", "no_token", "has_token"
    
	    if (Servant.status === "has_token"){
		    
	    }

