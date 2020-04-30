// TagR Container Script
// Version 6.3.2-3

(function (window, document) {

    //For Debuging
    var min = 1;
    var max = 10000;
    var randomStr = Math.floor(Math.random() * (+max - +min)) + +min;

    /*
    Support for polyfill start
     */
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            if (search instanceof RegExp) {
                throw TypeError('first argument must not be a RegExp');
            }
            if (start === undefined) {
                start = 0;
            }
            return this.indexOf(search, start) !== -1;
        };
    }
    //Array for debuging, add log -> CONTAINR_LOGS.push({msg: "Lorem Ipsum..."}); (extendet with other parameter
    if (typeof CONTAINR_LOGS === "undefined") {
        CONTAINR_LOGS = [];
    }

    window.addEventListener("message", function (event) {
        if (event.data == "CONTAINR_LOGS") {
            console.dir(CONTAINR_LOGS);
        }
    });

    'use strict';
    window.pCache = window.pCache || [];

    var CONTAINER_VERSION = '6.3.2-3';

    // Properties too important to miss.
    var hostProp = 'host',
        tagTypeProp = 'tagType',
        tagIdProp = 'tagid';
    // Properties that are used by name. Map parameters must be either one of these
    // or start with 'src.', 'trb.', or 'xdu.'.
    var impProps = ["redirect_url"];
    var validMatch = new RegExp('^src|trb|xdu\\.');

    var TCall = {
        u: '//{1}/t/v2/',
        c: function (p, i) {
            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') TagR call...'
            });
            var protocol = "https:"; // MTRTF-3716
            var imageSrc = this.bTCall(p, i);
            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') src = ' + protocol + imageSrc
            });
            (new Image).src = protocol + imageSrc;
        },
        bTCall: function (p, i) {

            var redirectValue = '';
            var redirectParamUrl = TCall.getRedirectParam(p);

            if (redirectParamUrl) {
                redirectValue = "&redirect_url=" + redirectParamUrl;
                delete p["redirect_url"];
            }

            return this.u.replace('{1}', p[hostProp]) + p[tagTypeProp] + '?tagid=' + i + this.bQS(p) +
                '&depp=' + CONTAINER_VERSION + redirectValue;
        },
        bQS: function (obj) {
            var s = [];
            for (var p in obj) {
                // If this is a property we care about (matches our syntax)...
                if (obj.hasOwnProperty(p) && isValid(p)) {
                    // Make sure both the value and the parameter are properly encoded.
                    var key = encodeIfNeeded(p);
                    var value = encodeIfNeeded(obj[p]);
                    // If we still have a key/value pair, add them.
                    if (key && value) {
                        s.push(key + "=" + value);
                    }
                }
            }
            return s.length > 0 ? '&' + s.join('&') : '';
        },
        getRedirectParam: function (obj) {
            var redirectParam = impProps[0];
            if (obj[redirectParam]) {
                return decodeURIComponent(obj[redirectParam]);
            } else {
                return null;
            }
        }
    };

    var TagR = {
        callTagR: function (p, i) {
            if (hasRequiredProps(p)) {
                TCall.c(p, i);
            } else {
                console.error('Missing required parameters %s and/or %s', hostProp, tagTypeProp);
            }
        }
    };

    // Were we called via script URL (e.g. trafficked via a 3rd-party ad-server where we can only use the script url)
    // Grab our queue (for processing below).
    var mpfContainr = window.mpfContainr;
    // Were we called via URl only? (e.g. trafficked via a 3rd-party ad-server)
    // Grab the script tag we were loaded via (should be the last one).  Changed: grab all and filter
    var scriptTags = document.getElementsByTagName("script");

    for (var t in scriptTags) {
        var scriptSrc = scriptTags[t].src;
        if (scriptSrc && scriptSrc.indexOf("containr.js") > -1 && scriptSrc.indexOf("?") > -1 && scriptSrc.indexOf("tagType=imp")) {
            var params = getParamsFromElementSrc(scriptSrc);
            // Get the tagId
            var tagId = params[tagIdProp];
            if (tagId) {
                // Delete it from the map and push the whole thing into the queue.
                delete params[tagIdProp];
                // Make sure the queue is defined.
                if (!mpfContainr || typeof mpfContainr.q === 'undefined') {
                    var queue = [];
                    window.mpfContainr = function () {
                        queue.push(arguments);
                    };
                    mpfContainr = window.mpfContainr;
                    mpfContainr.q = queue;
                }
                mpfContainr(tagId, params);
            }
            pCache.push(scriptSrc);
        }
    }

    // Process all the calls in the queue.
    if (typeof mpfContainr.q !== 'undefined') {
        for (var i in mpfContainr.q || []) {
            processQueue(mpfContainr.q[i]);
        }
    }

    // swap original function with just loaded one and process anything new added to the queue.
    window.mpfContainr = function () {
        processQueue(arguments);
    };

    function processQueue(args) {
        var params = [].slice.call(args);
        checkAndCall(params[0], params[1]);
    }

    // The one public method.
    function checkAndCall(id, params) {
        CONTAINR_LOGS.push({
            msg: '(' + randomStr + ') checkAndCall called ' + id + ' ' + params + ''
        });
        if (typeof params !== 'undefined') {
            TagR.callTagR(params, id);
        }
    }

    function hasRequiredProps(p) {
        var hasRequiredProp;
        if (typeof p !== 'undefined') {
            if (p[hostProp] && p[tagTypeProp]) {
                hasRequiredProp = true;
            } else {
                hasRequiredProp = false;
            }
        } else {
            hasRequiredProp = false;
        }
        return hasRequiredProp;
    }


    function isValid(propName) {
        return propName !== hostProp &&
            propName !== tagTypeProp &&
            (impProps.indexOf(propName) >= 0 || validMatch.test(propName));
    }

    function encodeIfNeeded(value) {
        try {
            return value !== decodeURIComponent(value) ? value : encodeURIComponent(value);
        } catch (e) {
            console.warn("Value: %s is not a valid URI component! %o", value, e);
        }
        return null;
    }

    function getParamsFromElementSrc(elementSrc) {
        elementSrc = void 0 !== elementSrc ? elementSrc : window.location.href;
        for (var r, n = /\+/g, o = /[&\?]([^&=]+)=?([^&]*)/g, a = function (t) {
                return decodeURIComponent(t.replace(n, " "))
            }, s = {}; r = o.exec(elementSrc);) s[a(r[1])] = a(r[2]);
        return s;
    }

}(window, document));