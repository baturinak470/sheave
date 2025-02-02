

/* CLIENTCONFIG build v1.0.18*/
!function (n, e) { "use strict"; var o = "1.0.18", t = "NOLBUNDLE", r = 0, a = { paramPrefix: "", maxRetries: 5 }, s = { defaultNSDKV: 600, defaultSfcode: "us", subdomain: "cdn-gl", domain: "imrworldwide.com", protocol: 0 === n.location.protocol.indexOf("http:") ? "http:" : "https:", sdkUrl: "{{protocol}}//{{subdomain}}.{{domain}}/novms/js/{{sdksubpath}}/nlsSDK{{nsdkv}}.bundle.min.js" }, i = { parseNOLParams: function (n) { var e = n.replace(/^[^\#]+\#?/, ""), o = {}; if (!e) return o; var t = new RegExp("&" + a.paramPrefix, "gi"), r = "<<nol_delimeter>>", s = r + a.paramPrefix; e = e.replace(t, s); for (var i = e.split(r), l = null, c = 0; c < i.length; c++) { l = i[c].indexOf("="); var d = unescape(i[c].substr(0, l)), u = unescape(i[c].substr(l + 1)); u = u.replace(/\+/g, " "), o[d.replace(a.paramPrefix, "")] = u } return o }, findScript: function (n) { if (document.currentScript) return document.currentScript.src; console && console.log && (console.log("Config", new Date), console.log("Config", new Date)); var e = document.getElementsByTagName("script"), o = []; if (e) for (var t = null, r = "", a = null, s = new RegExp(n + ".*?.js"), i = 0; i < e.length; i++) a = e[i], r = a && a.attributes && a.attributes.src ? a.attributes.src.value : "", (t = r.match(s)) && o.push(r); return o }, loadScript: function (e, o, t) { function r(e, o, t) { var r = n.document.createElement("script"); r.async = !0, r.setAttribute("data-jsonpid", name), r.src = e, r.onload = o, r.onerror = t; var a = n.document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(r, a) } function s(n) { i < a.maxRetries ? (i++, setTimeout(function () { console && console.warn && console.warn("Retry request # " + i), r(e, o, s) }, 2e3)) : (console && console.error && console.error("Unable to load script " + e), t && t()) } var i = 0; r(e, o, s) }, getGlobalsField: function (e, o, t) { if (o && t && n[e] && n[e].configs) { var r = n[e].configs[o]; if (r && r.nol_GLOBALS) return r.nol_GLOBALS[t] } return null } }, l = { setNamespace: function (e) { return n[e] = n[e] || { nlsQ: function (o, t, r, a, s, i) { return s = w.document, a = s.createElement("script"), a.async = 1, a.src = ("http:" === n.location.protocol ? "http:" : "https:") + "//cdn-gl.imrworldwide.com/conf/" + o + ".js#name=" + t + "&ns=" + e, i = s.getElementsByTagName("script")[0], i.parentNode.insertBefore(a, i), w[t] = w[t] || { g: r, ggPM: function (n, e, o, r, a) { (w[t].q = w[t].q || []).push([n, e, o, r, a]) } }, w[t] } } }, setConfig: function (n, e, o) { o.configs = o.configs || {}, o.configs[n] = o.configs[n] || e } }, c = { getInstanceGlobals: function (e, o, t) { var r = { apid: o, sfcode: s.defaultSfcode, nsdkv: i.getGlobalsField(e, o, "nol_nsdkvConfig") || i.getGlobalsField(e, o, "nol_nsdkv") || s.defaultNSDKV }, a = n[e][t.name] || n[t.name], l = a ? a.g : {}; if (l) for (var c = Object.keys(l), d = 0; d < c.length; d++) void 0 !== l[c[d]] && null !== l[c[d]] && "" !== l[c[d]] && (r[c[d]] = l[c[d]]); r.sfcode = i.getGlobalsField(e, o, "nol_sfcode") || r.sfcode; var u = i.getGlobalsField(e, o, "nol_sdkDebug"); return u && (r.nol_sdkDebug = u), r }, isSDKReady: function (e) { var o = n[e]; return o && o.hasOwnProperty("isBuilt") && "function" == typeof o.isBuilt && o.isBuilt() }, loadSDK: function (e, o, t, r) { try { var a = c.getInstanceGlobals(r, o, t), l = function () { try { if (e && t && t.name) { var o = n[r].getInstance(t.name, !0); o && !o.initialized && o.ggInitialize(a) } } catch (n) { } }; if (c.isSDKReady(r)) l(); else { var d = (a && a.sdkUrl ? a.sdkUrl : s.sdkUrl).replace("{{protocol}}", s.protocol).replace("{{subdomain}}", t && t.subdomain ? t.subdomain : a && a.subdomain ? a.subdomain : s.subdomain).replace("{{domain}}", t && t.domain ? t.domain : a && a.domain ? a.domain : s.domain).replace("{{sdksubpath}}", "NOLSDKBUNDLE" === r ? "nolsdk" : "2").replace("{{nsdkv}}", (a ? a.nsdkv : "") || i.getGlobalsField(r, o, "nol_nsdkvConfig") || i.getGlobalsField(r, o, "nol_nsdkv") || s.defaultNSDKV); i.loadScript(d, l) } } catch (n) { } }, iterateInstances: function (n, e) { if (e) { var o = i.findScript(n); if ("string" == typeof o) e(n, i.parseNOLParams(o)); else for (var t = 0; t < o.length; t++) e(n, i.parseNOLParams(o[t])) } } }, d = e && e.nol_GLOBALS ? e.nol_GLOBALS.nol_appid : ""; try { d ? c.iterateInstances(d, function (o, r) { var a = r && r.ns ? n[r.ns][r.name] : null; if (a || (a = r && r.ns ? n[r.name] : null), a && !a.initialized) { var s = l.setNamespace(r && r.ns ? r.ns : t); l.setConfig(o, e, s), c.loadSDK(s, o, r, r && r.ns ? r.ns : t) } }) : console && console.warn && console.warn("Nielsen Log: Client config structure is invalid or corrupt.") } catch (n) { } }(
    window,
	{
		"nol_GLOBALS":{

			"nol_host":"6-217",
			"nol_dma":"",
			"nol_countryCode2":"",
			"nol_countryCode3":"",
            "nol_serverTime":"1588251615",
            "nol_devGroup":"",
            "nol_osver":"NA",
            "nol_clocksrc":"S",
            "nol_osGroup":"",
            "nol_platform":"",
			"nol_md5Seed":"N!3ls3nBL",
			"nol_sdkDelimiter":"_",
            "nol_vcid":"b99",
			"nol_appid":"config250",
            "nol_channelName":"defaultChannelName",
            "nol_fbver":"1",
			"nol_clientCMSmap":{"1":"nol_aggregate","nol_assetid":"assetid","nol_assetName":"(section)","nol_category":"(program)","nol_channelName":"channelName","nol_clientid":"clientid","nol_dpr":"tv","nol_length":"length","nol_tagSrc":"dataSrc","nol_title":"((title))","nol_vidtype":"type"}, 
			"nol_fbCountryCode":"",
			"nol_fbDmaDCR":"",
			"nol_linearAdLoadFlag":"0",
			"nol_tagSrc":"cms",
			"nol_gpsPrecision":"1000",
			"nol_intrvlThrshld":"90",
			"nol_chnlCountThrshld":"10",
			"nol_cacheBusterLmt":"1",
			"nol_id3IntrvlGp":"15",
			"nol_useragent":"NLSDK (|![nol_osver]!|,|![nol_devtypeid]!| BUILD/|![nol_sdkver]!|) |![nol_appid]!|/|![nol_appver]!|",	
			"nol_xorSeed":"cr055pltfrm",
			"nol_unQualSegmentValue":"5",
			"nol_clientid":"",
			"nol_playerId":"|![nol_playerId]!|",
			"nol_pageURL":"",
			"nol_dfltAppid":"NA",
			"nol_defReasonCode":"",
 		    "nol_assetName":"defChnAsset",
			"nol_bgTimeOut":"5",
			"nol_duration":"30",
			"nol_encryptDevId":"true",
			"nol_devTimeZone":"",
			"nol_SDKEncDevIdFlag":"true",
			"nol_suppress": "0",
			"nol_maxStaticInstances": "5",	
			"nol_pendingPingsLimit" :"8",
			"nol_pendingPingsDelay":"1",
			"nol_reqType":"0",
		
			

			"nol_customExtension":[
				"nol_dcrVideoCustom",			
				"nol_dcrStaticCustom"			
			],
			"nol_eventFilter":{
				"onCmsDetected":[
					{"tagVar":{"name":"nol_product","value":"dcrvideo"}, "cond": ["nol_vidtype"],  "is": {"type":"+","value": "content,preroll,midroll,postroll,ad"},  "then":{"nol_disabled": "false"}, "else": {"nol_disabled": "true"}},
					{"tagVar":{"name":"nol_product","value":"dcrstatic"},"cond":["nol_vidtype"], "is":{"type":"+", "value":"static"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"true"}}
					
				],
				"onDcrCmsDetected":[
				                    {"tagVar":{"name":"nol_product","value":"dcrstatic"}, "cond": ["nol_ac"],  "is": {"type":"+","value": "static"},  "then":{"nol_disabled": "false"}, "else": {"nol_disabled": "true"}}
	            ],
				"onDcrDetected":{
					"dcrStatic":[
						{"tagVar":{"name":"nol_product","value":"dcrstatic"}, "cond": ["nol_vidtype"],  "is": {"type":"+","value": "preroll,midroll,postroll,ad,content"},  "then":{"nol_disabled": "true"}, "else":{"nol_disabled":"false"}}
					],
					"dcrVideo":[
						{"tagVar":{"name":"nol_product","value":"dcrvideo"}, "cond": ["nol_vidtype"],  "is": {"type":"+","value": "preroll,midroll,postroll,ad,content"},  "then":{"nol_disabled": "false"}, "else":{"nol_disabled":"true"}},
						{"tagVar":{"name":"nol_product","value":"dcrvideo"}, "cond": ["nol_vidtype"],  "is": {"type":"+","value": "postroll"},  "then":{"nol_minWonOverride": "1"}}
					]
				},
				"onViewWon":[
					{"tagVar":{"name":"nol_cadence", "value":"interval"}, "cond":["nol_segmentPrefix"], "is":{"type":"+", "value":"S"}, "then":{"nol_segmentPrefix":"D"}},
					{"tagVar":{"name":"nol_cadence", "value":"interval"}, "cond":["nol_segmentPrefix"], "is":{"type":"+", "value":"D"}, "then":{"nol_at":"timer"}}
				]
			  },
			 
			"nol_tagMap":{
				"nol_product":["dcrstatic", "dcrvideo"], 
				"nol_cadence":["interval", "episode", "stream", "impression", "daypart", "appstart"],  
				
				"nol_defaults":{
					"nol_creditFlag":"1",
					"nol_creditValue":"30",
					"nol_segmentLength":"5",
					"nol_segmentValue":"60",
					"nol_maxLength":"1832",
					"nol_forward":"1",
					"nol_aggregate":"1",
					"nol_tsvFlag":"99",
					"nol_rt":"video",
					"nol_accessMethod":"0",
					"nol_breakout":"00",
					"nol_currSeg":"0",
					"nol_minWonOverride":"0",
					"nol_segmentA":"NA",
					"nol_segmentB":"NA",
					"nol_segmentC":"NA",
					"nol_placement":"NA",
					"nol_content":"NA",
					"nol_adLoadType":"2",
		            "nol_sfcode":"us",
		            "nol_prefProtocol":"https",
					"nol_isFullEpisode":"yes",
					"nol_sendTime":"0"
				},
				"nol_url":[
				"|!nol_prefProtocol!|://secure-|!nol_dcrsfcode!|.imrworldwide.com/cgi-bin/gn?prd=dcr&ci=|!nol_clientid!|&ch=|!nol_clientid+nol_sdkDelimiter+[nol_vcid]+nol_sdkDelimiter+nol_assetName!|&sessionId=|![(nol_userSessionId)]!|&asn=|!nol_assetName!|&prv=1&c6=vc,|![nol_vcid]!|&ca=|!nol_content!|&c13=asid,|![nol_dfltAppid]!|&c32=segA,|![nol_segmentA]!|&c33=segB,|![nol_segmentB]!|&c34=segC,|![nol_segmentC]!|&c15=apn,|![nol_apn]!|&sup=|![nol_suppress]!|&segment2=|![nol_dma]!|&segment1=|!([nol_countryCode3])!|&forward=|![nol_forward]!|&ad=|!nol_accessMethod!|&cr=|!nol_segmentPrefix!|&c9=devid,|![nol_deviceId]!|&enc=|!nol_encryptDevId!|&c1=nuid,|![nol_nuid||nol_playerId]!|&at=|!nol_at!|&rt=|!nol_rt!|&c16=sdkv,|![nol_sdkv]!|&c27=cln,|![nol_segmentTimeSpent]!|&crs=|![nol_appCrash]!|&lat=|![nol_latitude]!|&lon=|![nol_longitude]!|&c29=plid,|![nol_playerId]!|&c30=bldv,|![nol_bldv]!|&st=dcr&c7=osgrp,|![nol_osGroup]!|&c8=devgrp,|![nol_devGroup]!|&c10=plt,|!([nol_platform])!|&c40=adbid,|![nol_adobeId]!|&c14=osver,|![(nol_osver)]!|&c26=dmap,1&dd=|![nol_dataDate]!|&hrd=|![nol_hourCode]!|&wkd=|![nol_dayId]!|&c35=adrsid,|![nol_reportSuiteID]!|&c36=cref1,|![nol_crossRefID1]!|&c37=cref2,|![nol_crossRefID2]!|&c11=agg,|!nol_aggregate!|&c12=apv,&c51=adl,|![nol_adDuration]!|&c52=noad,|![nol_adCount]!|&devtypid=|![nol_devtypeid]!|&pc=NA|![nol_dcrStaticCustom]!|&si=|![(nol_pageURL)]!|&c62=sendTime,|![nol_sendTime]!|&c73=phtype,&c74=dvcnm,&uoo=|![nol_useroptout]!|",
				""
				
				]
			}
		},
		"nol_TAGS":[
		
		
						{
							"nol_comment":"DCR browser static view",
							"nol_product":"0",
							"nol_cadence":"3",
							"nol_defaults":{"nol_maxPingCount":"1", "nol_creditFlag":"0", "nol_segmentPrefix":"V", "nol_timer":"nol_pageoffset","nol_at":"view", "nol_tagPresence":"4","nol_rt": "text","nol_segmentTimeSpent":"0","nol_adDuration":"0","nol_adCount":"0"},
							"nol_url":"0"
						},

						{
							"nol_comment":"DCR browser static duration",
							"nol_product":"0",
							"nol_cadence":"0",
							"nol_defaults":{"nol_minWonOverride":"1","nol_creditFlag":"1","nol_segmentPrefix":"D","nol_timer":"nol_pageoffset","nol_at":"timer","nol_rt": "text", "nol_tagPresence":"4","nol_segmentLength":"5","nol_segmentTimeSpent":"0","nol_adDuration":"0","nol_adCount":"0"},	
							"nol_url":"0"
						},
						
						
		]
	}
	);		
