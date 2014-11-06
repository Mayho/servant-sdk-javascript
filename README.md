#Servant Javascript SDK

###Rapidly build web pages and client-side applications that connect with Servants using this SDK

##How To Build Front-End Applications With The Servant Javascript SDK

####**Register Your Application @ [Servant.co](https://www.servant.co)**
Register your application at [https://www.servant.co](https://www.servant.co).  Set the `REDIRECT_URL` to be the URL of your application.  

Servant Client-Side Applications are commonly built as *Single Page Applications*, which is a single HTML page that has different views loaded via javascript.  The first view usually contains the 'Connect Servant' button.  When a User clicks it, authorizes their Servants, they are redirected back to the same page with an `access_token` parameter in the URL.  The Servant SDK is designed to snatch the `access_token` in the URL, save it in the SDK, and remove it from the site URL immediately upon page load.  Once this happens, the application usually changes its view to allow Users to start interacting with their Servant data.  Everything happens in the same page.  This is why you set the REDIRECT_URL to the URL of your application.

Also, when you register your application, be sure to copy the `CLIENT_ID`.  It's needed for the next steps.

####**Import The SDK Into Your HTML**
Before the closing `</body>` tag in your website, add in the Servant SDK, like this:

    <script type='text/javascript' src="servant_sdk_javascript.js"></script>

####**Initialize The SDK**
Initialize the Servant SDK by using the `Servant.initialize(options)` method.  Add your application's `CLIENT_ID` from Servant into the initialize options because it is required:

    Servant.initialize({ 
    	application_client_id: 'paste_your_client_id_here'
    });

You can either pass an AccessToken in directly via the options, but the initialize method also automatically scans the URL for `access_token` parameters, and if it finds any, it will save the `access_token` into the SDK and clear the URL or any access_token parameters.

All Options Available:

**application_client_id:** The CLIENT_ID from your application which you registered at [https://servant.co](https://servant.co)
**token:** A Servant AccessToken string,
**protocol:**  'http' or 'https',
**scope:** 'full' or 'limited'  If you have a front-end that only needs to make GET requests to Servant, you should use 'limited'.  This will make your application more secure for your users. 

    Servant.initialize({ 
    	application_client_id: 'jjAIHDSoasf89ah',
    	token: 'jkAF98aajjlajsfa89234hafsasf',
    	protocol: 'https',
    	scope: 'limited'
    });











