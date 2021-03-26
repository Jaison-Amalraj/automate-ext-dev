const fs = require('fs')

fs.readFile('./app/widget.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let appended = data.replace(`</title>`,'</title> \n <script src="./js/utils.js" charset="utf-8"></script>  \n');
  fs.writeFile('./app/widget.html', appended, 'utf-8', function (err) {
     if (err) throw err;
     console.log('widget.html edited');
   })
})

let scriptContent='function getUtilsInstance(App, connectionLinkName, orgId) { let utils = { "getDC": function() { return App.meta.dcType; }, "getDomain": function() { let domainMap = new Map() domainMap.set("US", "com"); domainMap.set("EU", "eu"); domainMap.set("CN", "com.cn"); domainMap.set("AU", "com.au"); domainMap.set("IN", "in"); let currentDomain = App.meta.dcType; return domainMap.get(currentDomain); }, "request" = function(url, type, headers, postBody) { let reqObj = { url: `https://desk.zoho.${this.getDomain()}${url}?orgId=${orgId}`, headers: headers || {}, type: type || "GET", postBody: postBody || {}, connectionLinkName: connectionLinkName, data: {} }; return ZOHODESK.request(reqObj); }, "encoder": { encodeForHTML: function(input) { var div = document.createElement("div"); div.innerText = input; return div.innerHTML; }, encodeForHTMLAttribute: function(input, immune) { if (!immune) immune = default_immune["attr"]; var encoded = ""; for (var i = 0; i < input.length; i++) { var ch = input.charAt(i), cc = input.charCodeAt(i); if (!ch.match(/[a-zA-Z0-9]/) && immune.indexOf(ch) < 0) { var hex = cc.toString(16); encoded += "&#x" + hex + ";"; } else { encoded += ch; } } return encoded; }, encodeForURL: function(input) { return encodeURIComponent(input); }, encodeForJavascript: function(input, immune) { if (!immune) immune = default_immune["js"]; var encoded = ""; for (var i = 0; i < input.length; i++) { var ch = input.charAt(i), cc = input.charCodeAt(i); if (immune.indexOf(ch) >= 0 || hex[cc] == null) { encoded += ch; continue; } var temp = cc.toString(16), pad; if (cc < 256) { pad = "00".substr(temp.length); encoded += "\\x" + pad + temp.toUpperCase(); } else { pad = "0000".substr(temp.length); encoded += "\\u" + pad + temp.toUpperCase(); } } return encoded; }, createDOMElement: function(str) { var mydiv = document.createElement("div"); mydiv.innerHTML = this.encodeForHTMLAttribute(str); return mydiv.children[0]; } } } if (!orgId) { utils.request = function(url, type, headers, postBody) { let reqObj = { url: url, headers: headers || {}, type: type || "GET", postBody: postBody || {}, connectionLinkName: connectionLinkName, data: {} }; return ZOHODESK.request(reqObj); } } }'

fs.writeFile('./app/js/utils.js', scriptContent, function (err) {
  if (err) throw err;
  console.log('Util File is created successfully.');
});


fs.readFile('./plugin-manifest.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let appended = data.replace(`"whiteListedDomains": []`,'"whiteListedDomains": ["https://desk.zoho.com"]');
  fs.writeFile('./app/plugin-manifest.json', appended, 'utf-8', function (err) {
     if (err) throw err;
     console.log('widget.html edited');
   })
})
