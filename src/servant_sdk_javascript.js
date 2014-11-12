/**
 * 
 * Servant SDK Javascript for Client-Side Applications and Regular Web Pages
 * Version: v0.0.2
 * By Servant – https://www.servant.co
 * Copyright 2014 Servant
 * Authors: Austen Collins
 * Contact: austen@servant.co
 *
 * Documentation Available @ https://developers.servant.co
 * 
 */

(function(root) {
    // Establish root object, 'window' in the browser
    root.Servant = root.Servant || {};
    var Servant = root.Servant;
    Servant.status = "uninitialized";

    /**
     * Initialize The SDK
     */
    Servant.initialize = function(options) {
        /**
         * Check For Missing Options
         */
        if (!options) return console.error('Servant SDK Error – Please include the required options');
        if (!options.application_client_id) return console.error('Servant SDK Error – Please Include Your Application Client ID when initializing the SDK');

        /**
         * Set Options and Defaults
         */
        this._archetypes = {}; // JSON Archetypes the user is working with
        this._application_client_id = options.application_client_id; // Application Client ID
        this._version = typeof options !== 'undefined' && typeof options.version !== 'undefined' ? options.version : 0; // API Version
        this._protocol = typeof options !== 'undefined' && typeof options.protocol !== 'undefined' ? options.protocol : 'http'; // HTTP Protocol
        this._scope = typeof options !== 'undefined' && typeof options.scope !== 'undefined' ? options.scope : 'full'; // AccessToken Scope:  Is it a FULL or LIMITED token?
        this._path = this._protocol + '://api' + this._version + '.servant.co/data/'; // API Path
        this._connectURL = 'https://www.servant.co/connect/oauth2/authorize?response_type=token&client_id=' + this._application_client_id;
        // Set Token or Check For It In Window Location
        if (options && options.token) {
            this._token = options.token;
            this.status = "has_token";
        } else if (root.location.hash.length && root.location.hash.indexOf('access_token=') > -1) {
            // Set Token whether it's FULL or LIMITED
            var hashData = JSON.parse('{"' + decodeURI(root.location.hash).replace('#', '').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
            this._token = this._scope === 'full' ? hashData.access_token : hashData.accessOtoken_limited;
            this.status = "has_token";
            // Remove hash fragment from URL, new and old browsers
            var scrollV, scrollH, loc = window.location;
            if ("pushState" in history) {
                history.pushState("", document.title, loc.pathname + loc.search);
            } else {
                // Prevent scrolling by storing the page's current scroll offset
                scrollV = document.body.scrollTop;
                scrollH = document.body.scrollLeft;
                loc.hash = "";
                // Restore the scroll offset, should be flicker free
                document.body.scrollTop = scrollV;
                document.body.scrollLeft = scrollH;
            }
        } else {
            this.status = "no_token";
        }
    };








    /**
     *
     * INTERNAL METHODS ------------------------------------------
     *
     */

    /**
     * General Function To Call the Servant API
     */
    Servant._callAPI = function(method, path, json, success, failed) {

        if (this.status !== "has_token") return console.error('Servant SDK Error – The SDK has no Access Token');

        var url = this._path + path + '?access_token=' + this._token;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState < 4)
                return;
            if (xhr.status !== 200)
                return failed.call(window, JSON.parse(xhr.responseText));
            if (xhr.readyState === 4) {
                success.call(null, JSON.parse(xhr.responseText));
            }
        };

        xhr.open(method.toUpperCase(), url, true);
        if (json) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(json));
        } else {
            xhr.send();
        }
    };

    /**
     * Fetches Archetype Scheme From Servant & Caches It In The SDK
     */
    Servant._addArchetypeSchema = function(archetype, callback) {
        var self = this;

        this._callAPI('GET', 'archetypes/' + archetype, null, function(response) {
            self._archetypes[archetype] = response;
            callback(response);
        }, function(error) {
            console.log(error);
        });
    };

    /**
     * Utility Functions to Help With Validation
     */
    Servant._utilities = {};
    Servant._utilities.whatIs = function(what) {

        var to = typeof what;

        if (to === 'object') {
            if (what === null) {
                return 'null';
            }
            if (Array.isArray(what)) {
                return 'array';
            }
            return 'object'; // typeof what === 'object' && what === Object(what) && !Array.isArray(what);
        }

        if (to === 'number') {
            if (isFinite(what)) {
                if (what % 1 === 0) {
                    return 'integer';
                } else {
                    return 'number';
                }
            }
            if (isNaN(what)) {
                return 'not-a-number';
            }
            return 'unknown-number';
        }

        return to; // undefined, boolean, string, function

    };

    Servant._utilities.areEqual = function(json1, json2) {
        if (json1 === json2) {
            return true;
        }

        var i, len;

        // If both are arrays
        if (Array.isArray(json1) && Array.isArray(json2)) {
            // have the same number of items; and
            if (json1.length !== json2.length) {
                return false;
            }
            // items at the same index are equal according to this definition; or
            len = json1.length;
            for (i = 0; i < len; i++) {
                if (!this._utilities.areEqual.call(this, json1[i], json2[i])) {
                    return false;
                }
            }
            return true;
        }

        // If both are objects
        if (this._utilities.whatIs.call(this, json1) === 'object' && this._utilities.whatIs.call(this, json2) === 'object') {
            // have the same set of property names; and
            var keys1 = Object.keys(json1);
            var keys2 = Object.keys(json2);
            if (!this._utilities.areEqual.call(this, keys1, keys2)) {
                return false;
            }
            // values for a same property name are equal according to this definition.
            len = keys1.length;
            for (i = 0; i < len; i++) {
                if (!this._utilities.areEqual.call(this, json1[keys1[i]], json2[keys1[i]])) {
                    return false;
                }
            }
            return true;
        }

        return false;
    };

    Servant._utilities.isUniqueArray = function(arr, indexes) {
        var i, j, l = arr.length;
        for (i = 0; i < l; i++) {
            for (j = i + 1; j < l; j++) {
                if (this._utilities.areEqual.call(this, arr[i], arr[j])) {
                    if (indexes) {
                        indexes.push(i, j);
                    }
                    return false;
                }
            }
        }
        return true;
    };

    Servant._utilities.formatValidators = {
        "date": function(date) {
            if (typeof date !== "string") {
                return true;
            }
            // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
            var matches = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(date);
            if (matches === null) {
                return false;
            }
            // var year = matches[1];
            // var month = matches[2];
            // var day = matches[3];
            if (matches[2] < "01" || matches[2] > "12" || matches[3] < "01" || matches[3] > "31") {
                return false;
            }
            return true;
        },
        "date-time": function(dateTime) {
            if (typeof dateTime !== "string") {
                return true;
            }
            // date-time from http://tools.ietf.org/html/rfc3339#section-5.6
            var s = dateTime.toLowerCase().split("t");
            if (!this._utilities.formatValidators.date(s[0])) {
                return false;
            }
            var matches = /^([0-9]{2}):([0-9]{2}):([0-9]{2})(.[0-9]+)?(z|([+-][0-9]{2}:[0-9]{2}))$/.exec(s[1]);
            if (matches === null) {
                return false;
            }
            // var hour = matches[1];
            // var minute = matches[2];
            // var second = matches[3];
            // var fraction = matches[4];
            // var timezone = matches[5];
            if (matches[1] > "23" || matches[2] > "59" || matches[3] > "59") {
                return false;
            }
            return true;
        },
        "email": function(email) {
            if (typeof email !== "string") {
                return true;
            }
            // use regex from owasp: https://www.owasp.org/index.php/OWASP_Validation_Regex_Repository
            return /^[a-zA-Z0-9+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/.test(email);
        },
        "regex": function(str) {
            try {
                RegExp(str);
                return true;
            } catch (e) {
                return false;
            }
        },
        "uri": function(uri) {
            // RegExp from http://tools.ietf.org/html/rfc3986#appendix-B
            return typeof uri !== "string" || RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?").test(uri);
        }
    }; // _utilities.formatValidators


    /**
     * Validator
     */

    Servant._validators = {
        maximum: function(rules, value) {
            if (rules.exclusiveMaximum !== true) {
                if (value > rules.maximum) return 'Must be less than ' + rules.maximum;
            } else {
                if (value >= rules.maximum) return 'Must be less than ' + rules.maximum;
            }
        },
        minimum: function(rules, value) {
            if (rules.exclusiveMinimum !== true) {
                if (value < rules.minimum) return 'Must be more than ' + rules.minimum;
            } else {
                if (value <= rules.minimum) return 'Must be more than ' + rules.minimum;
            }
        },
        maxLength: function(rules, value) {
            if (value.length > rules.maxLength) return 'Must be less than ' + rules.maxLength + ' characters';
        },
        minLength: function(rules, value) {
            if (json.length < schema.minLength) return 'Must be at least ' + rules.minLength + ' characters or more';
        },
        pattern: function(rules, value) {
            if (RegExp(rules.pattern).test(value) === false) {
                // TODO - Add Error
            }
        },
        maxItems: function(rules, array) {
            if (!Array.isArray(array))
                return;
            if (array.length > rules.maxItems) return 'Only ' + rules.maxItems + ' or less allowed';
        },
        minItems: function(rules, array) {
            if (!Array.isArray(array)) return;
            if (array.length < rules.minItems) return rules.minItems + ' or more are required';
        },
        uniqueItems: function(rules, array) {
            if (!Array.isArray(array))
                return;
            if (rules.uniqueItems === true) {
                if (this._utilities.isUniqueArray.call(this, array, []) === false) return 'No duplicates allowed';
            }
        },
        enum: function(rules, value) {
            var match = false,
                idx = rules.enum.length;
            while (idx--) {
                if (this._utilities.areEqual.call(this, value, rules.enum[idx])) {
                    match = true;
                    break;
                }
            }
            if (match === false) return value + ' is not an allowed option';
        },
        format: function(rules, value) {
            if (!this._utilities.formatValidators[rules.format].call(this, value))
                return 'Not a valid ' + rules.format + ' format';

        },
        required: function(requiredArray, object) {
            var errors = {};
            for (var i = 0, len = requiredArray.length; i < len; i++) {
                if (!object[requiredArray[i]] || object[requiredArray[i]] === '') {
                    errors[requiredArray[i]] = requiredArray[i] + ' is required';
                }
            }
            if (Object.keys(errors).length) return errors;
        }
    };

    Servant._validateProperty = function(errors, rules, value, property) {
        // now iterate all the rules in schema property and execute validation methods
        var keys = Object.keys(rules);
        var idx = keys.length;
        while (idx--) {
            if (this._validators[keys[idx]]) {
                var error = this._validators[keys[idx]].call(this, rules, value, property);
                if (error) return error;
            }
        };
    };

    Servant._validateNestedArchetype = function(errors, rules, value) {
        if (this._utilities.whatIs(value) !== 'object') return 'Invalid type - Nested Archetype must be an object';
        if (!value._id || typeof value._id === 'undefined') return 'Nested Archetypes must be published on Servant first.  Please publish this nested Archetype on Servant, then include the publshed object'
        return null;
    };

    Servant._validateArray = function(errors, rules, array, property) {
        // Function to create array errors
        var createArrayError = function(errors, arrayproperty, objectproperty, index, err) {
            if (!errors[arrayproperty + '_array']) errors[arrayproperty + '_array'] = {};
            if (!objectproperty) return errors[arrayproperty + '_array'][index] = err;
            if (!errors[arrayproperty + '_array'][index]) errors[arrayproperty + '_array'][index] = {};
            return errors[arrayproperty + '_array'][index][objectproperty] = err;
        };
        var self = this;
        // Validate Array Root Schema
        var keys = Object.keys(rules);
        var idx = keys.length;
        while (idx--) {
            if (self._utilities._validators[keys[idx]]) {
                var error = self._utilities._validators[keys[idx]].call(self, rules, array);
                if (error) errors[property] = error;
            }
        };

        // Iterate Through Array
        array.forEach(function(item, i) {
            if (rules.items.$ref) {
                // Check if nested Archetype
                var error = self._utilities._validateNestedArchetype(errors, rules.items, item);
                if (error) createArrayError(errors, property, null, i, error);
            } else if (rules.items.type && rules.items.type !== 'object') {
                // 
                if (self._utilities.whatIs.call(self, item) !== rules.items.type) {
                    createArrayError(errors, property, null, i, 'Invalid type');
                } else {
                    var error = self._utilities._validateProperty(errors, rules.items, item, property);
                    if (error) createArrayError(errors, property, null, i, error);
                }
            } else if (rules.items.type && rules.items.type === 'object') {
                // If the item is not an object
                // Check its type
                if (self._utilities.whatIs.call(self, item) !== 'object') {
                    createArrayError(errors, property, null, i, 'Invalid type.  Must be an object');
                } else {
                    // Check Required Fields
                    var error = self._utilities._validators.required(rules.items.required, item);
                    if (error) {
                        for (prop in error) {
                            createArrayError(errors, property, prop, i, error[prop]);
                        }
                    } else {
                        // If Required Fields Are Present, Iterate Through Properties
                        var keys2 = Object.keys(item);
                        var idx2 = keys2.length;
                        while (idx2--) {
                            // Check if property is allowed
                            if (!rules.items.properties[keys2[idx2]]) {
                                createArrayError(errors, property, keys2[idx2], i, 'This property is not allowed');
                            } else {
                                // Validate Properties
                                var keys3 = Object.keys(rules.items.properties[keys2[idx2]]);
                                var idx3 = keys3.length;
                                // Check Type
                                if (rules.items.properties[keys2[idx2]].type && self._utilities.whatIs.call(self, item[keys2[idx2]]) !== rules.items.properties[keys2[idx2]].type) {
                                    createArrayError(errors, property, keys2[idx2], i, 'Invalid Type');
                                } else {
                                    // Other Validations
                                    while (idx3--) {
                                        if (self._utilities._validators[keys3[idx3]]) {
                                            var error = self._utilities._validators[keys3[idx3]].call(self, rules.items.properties[keys2[idx2]], item[keys2[idx2]]);
                                            if (error && (!errors[property] || !errors[property][i] || !errors[property][i][keys2[idx2]])) createArrayError(errors, property, keys2[idx2], i, error);
                                        }
                                    };
                                }
                            }
                        };
                    }
                }
            }
        });
    };








    /**
     *
     * PUBLIC METHODS ------------------------------------------
     *
     */

    /**
     * Go to Connect URL
     */
    Servant.connect = function() {
        window.location = this._connectURL;
    };

    /**
     * Instantiate An Archeytpe w/ Default Values
     */
    Servant.instantiate = function(archetype, callback) {
        if (typeof archetype !== 'string') return console.error('Servant SDK Error – The new() method only accepts a string for archetype parameter');
        archetype = archetype.toLowerCase();
        if (archetype === 'image') return console.error('Servant SDK Error – Image Archetype cannot be instantiated.  To create an Image Archetype, simply upload an image to Servant.');

        // Check if Archetype has been registered.
        // If not, fetch it from Servant's API then call this function again
        if (!this._archetypes[archetype]) {
            var self = this;
            return this._addArchetypeSchema(archetype, function() {
                return self.instantiate(archetype, callback);
            });
        }

        var instance = {};
        for (property in this._archetypes[archetype].properties) {

            // Handle Depending On Type & Format
            if (this._archetypes[archetype].properties[property].type !== 'array' && this._archetypes[archetype].properties[property].type !== 'object') {

                // Check Format
                if (!this._archetypes[archetype].properties[property].format) {
                    instance[property] = this._archetypes[archetype].properties[property].default;
                } else if (this._archetypes[archetype].properties[property].format === 'date' || this._archetypes[archetype].properties[property].format === 'date-time') {
                    // If Date or Date-time Format
                    var d = new Date();
                    instance[property] = d.toISOString();
                }

            } else {
                // Handle Arrays & Objects
                instance[property] = this._archetypes[archetype].properties[property].default.slice();
            }
        }

        // Remove _id attribute since it is new
        delete instance._id;

        // Callback
        callback(instance);
    };

    /**
     * Public Method – Validate An Archetype Instance
     */
    Servant.validate = function(archetype, instance, callback) {

        // Prepare Archetype
        if (typeof archetype !== 'string') {
            throw new Error('Archetype parameter must be a string');
        } else if (!this._archetypes[archetype]) {
            // If Archetype has not been registered, fetch it from Servant's API then call this function again
            var self = this;
            return this._addArchetypeSchema(archetype, function() {
                return self.validate(archetype, callback);
            });
        } else {
            archetype = this._archetypes[archetype];
        }

        var errors = {};

        // Check Instance
        if (!instance || this._utilities.whatIs(instance) !== 'object') {
            errors.schema = 'You did not submit a valid object to validate';
            return callback(errors, null);
        }

        // Check Required Fields, if they exist
        if (archetype.required && archetype.required.length) {
            var required = this._validators.required(archetype.required, instance);
            if (required) {
                for (prop in required) {
                    errors[prop] = required[prop];
                }
            }
        }

        // Validate Object Root Properties
        var keys1 = Object.keys(instance);
        var idx1 = keys1.length;
        while (idx1--) {

            if (!archetype.properties[keys1[idx1]]) {
                // Check If Allowed Property
                errors[keys1[idx1]] = keys1[idx1] + ' is not allowed';
            } else if (archetype.properties[keys1[idx1]] && archetype.properties[keys1[idx1]].type && this._utilities.whatIs.call(this, instance[keys1[idx1]]) !== archetype.properties[keys1[idx1]].type) {
                // Check If Valid Type
                errors[keys1[idx1]] = 'Invalid type';
            } else if (archetype.properties[keys1[idx1]] && this._utilities.whatIs.call(this, instance[keys1[idx1]]) === 'array' && instance[keys1[idx1]].length) {
                // Check If Array
                this._validateArray(errors, archetype.properties[keys1[idx1]], instance[keys1[idx1]], keys1[idx1]);
            } else if (archetype.properties[keys1[idx1]] && archetype.properties[keys1[idx1]].$ref) {
                // Check If Nested Archetype
                var error = this._validateNestedArchetype(errors, archetype.properties[keys1[idx1]], instance[keys1[idx1]]);
                if (error) errors[keys1[idx1]] = error;
            } else {
                // Check If String Or Number Property, Then Validate
                var error = this._validateProperty(errors, archetype.properties[keys1[idx1]], instance[keys1[idx1]], keys1[idx1]);
                if (error) errors[keys1[idx1]] = error;
            }
        }

        // Callback Errors
        if (Object.keys(errors).length) return callback(errors, null);
        // Callback Valid
        return callback(null, instance);

    }; // Servant.validate

    /**
     * Save Archetype to Servant's API
     */
    Servant.saveArchetype = function(servantID, archetype, instance, success, failed) {
        // Check Params
        if (!servantID) return console.error('Servant SDK Error – The saveArchetype() method requires a servantID parameter');
        if (!archetype) return console.error('Servant SDK Error – The saveArchetype() method requires an archetype parameter');
        if (!instance) return console.error('Servant SDK Error – The saveArchetype() method requires an archetype instance to save');
        if (!success) return console.error('Servant SDK Error – The saveArchetype() method requires a success callback');
        if (!failed) return console.error('Servant SDK Error – The saveArchetype() method requires a failed callback');

        if (instance._id && instance._id.length) {
            this._callAPI('PUT', 'servants/' + servantID + '/archetypes/' + archetype + '/' + instance._id, instance, function(response) {
                success(response);
            }, function(error) {
                failed(error);
            });
        } else {
            this._callAPI('POST', 'servants/' + servantID + '/archetypes/' + archetype, instance, function(response) {
                success(response);
            }, function(error) {
                failed(error);
            });
        }
    };

    /**
     * Show an Archetype Record on Servant
     */
    Servant.showArchetype = function(servantID, archetype, archetypeID, success, failed) {
        // Check Params
        if (!servantID) return console.error('Servant SDK Error – The showArchetype() method requires a servantID parameter');
        if (!archetype) return console.error('Servant SDK Error – The showArchetype() method requires an archetype parameter');
        if (!archetypeID) return console.error('Servant SDK Error – The showArchetype() method requires an archetypeID parameter');
        if (!success) return console.error('Servant SDK Error – The showArchetype() method requires a success callback');
        if (!failed) return console.error('Servant SDK Error – The showArchetype() method requires a failed callback');

        this._callAPI('GET', 'servants/' + servantID + '/archetypes/' + archetype + '/' + archetypeID, null, function(response) {
            success(response);
        }, function(error) {
            failed(error);
        });
    };

    /**
     * Query Archetype Records On Servant
     */
    Servant.queryArchetypes = function(servantID, archetype, criteria, success, failed) {
        // Check Params
        if (!servantID) return console.error('Servant SDK Error – The queryArchetypes() method requires a servantID parameter');
        if (!archetype) return console.error('Servant SDK Error – The queryArchetypes() method requires an archetype parameter');
        if (!criteria) return console.error('Servant SDK Error – The queryArchetypes() method requires an criteria parameter');
        if (!success) return console.error('Servant SDK Error – The queryArchetypes() method requires a success callback');
        if (!failed) return console.error('Servant SDK Error – The queryArchetypes() method requires a failed callback');

        this._callAPI('GET', 'servants/' + servantID + '/archetypes/' + archetype, null, function(response) {
            success(response);
        }, function(error) {
            failed(error);
        });
    };

    /**
     * Gets User and their Servants which have given permission to this application
     */
    Servant.getUserAndServants = function(success, failed) {
        this._callAPI('GET', 'servants', null, function(response) {
            success(response);
        }, function(error) {
            failed(error);
        });
    };

}(this));


// end