"use strict";function add_path(path,space,no_watch){path instanceof Array&&(path.forEach(function(e,t){t&&(alias[e]=path[0])}),path=path[0]);try{var route=require("./route")(path,space);routes[path]=route,path in nsp||(nsp[path]=void 0,io_ofs.push(function(){nsp[path]=global.io.of("/"+encodeURI(path)),nsp[path].on("connection",function(socket){console.log("io connect of "+path.yellow.bold),socket.on(".UID",function(e){e(socket.UID)});var _onevent=socket.onevent;socket.onevent=function(e){var t=e.data||[];return t[0]&&!socket.listeners(t[0]).length?(socket.emit("server_error",{message:"not process",data:t}),void console.log("***".red.bold,"onevent",e)):(console.log("***".red.bold,"onevent",e),void _onevent.call(socket,e))};var r=routes[path];socket.on("app_eval",function(d){try{console.log("app_eval",d),eval(d)}catch(e){console.log("Eval Error",e,e.stack)}}),socket.eval=function(e){"string"==typeof e?socket.emit("eval",e):socket.emit("eval","("+e.toString()+")()")},r.io_proc&&r.io_proc(socket,global.io)})}))}catch(e){return console.log(e,e.stack),console.log("route "+path.yellow+" is missing"),void(fs.existsSync("./app/projects/"+path)?watch("./app/projects/"+path,function(e){console.log(e.red+" is change, reload path "+path.yellow),e=__dirname.replace("/server","").replace("\\server","")+e.replace("app\\","\\").replace("app/","/"),console.log(e),delete require.cache[e],add_path(path,space,no_watch)}):console.log(path.red.bold+" is not valid directory Watch".bold+", abortring"))}route.path=path,console.log(path.yellow.bold+" load, init routing. UID="+route.UID),app.use("/"+encodeURI(path)+"/",route);var base=function(e,t,o){var r=e.params.page;console.log(fs.existsSync("./app/projects/"+path+"/"+r+".jade")),fs.existsSync("./app/projects/"+path+"/"+r+".jade")?route.render(t,r,{}):o()};app.get("/"+encodeURI(path)+"/:page",base),no_watch||watch("./app/projects/"+path,function(e){return global.io.send_all("_watch",{fn:e,path:path}),".js"!=e.substr(-3)?global.io.reconnect(path):(routes[path]&&routes[path].unload&&routes[path].unload(),console.log(e.red+" is change, reload path "+path.yellow),console.log("remove routes: "+remove_path(path)),e=__dirname.replace("/server","").replace("\\server","")+e.replace("app\\","\\").replace("app/","/"),console.log(e),delete require.cache[e],add_path(path,space,1),void global.io.reconnect(path))}),console.log(path.yellow.bold+" init routing OK")}function remove_path(e){for(var t=0,o=encodeURI(e),r=app._router.stack,n="/"+e+"/:page",s="/"+o+"/:page",a=r.length-1;a>-1;a--){var i=r[a];!i.handle||i.handle.path!=e&&i.handle!=o||(r.splice(a,1),t++),i.handle&&i.route&&(i.route.path==n||i.route.path==s)&&(r.splice(a,1),t++)}return t}function safe_stringify(e,t,o,r){return JSON.stringify(e,safe_serializer(t,r),o)}function safe_serializer(e,t){var o=[],r=[];return null==t&&(t=function(e,t){return o[0]===t?"[Circular ~]":"[Circular ~."+r.slice(0,o.indexOf(t)).join(".")+"]"}),function(n,s){if(o.length>0){var a=o.indexOf(this);~a?o.splice(a+1):o.push(this),~a?r.splice(a,1/0,n):r.push(n),~o.indexOf(s)&&(s=t.call(this,n,s))}else o.push(s);return null==e?s:e.call(this,n,s)}}function init_io(){global.io=io.listen(server).set("authorization",function(e,t){return e.headers.cookie?(sessionProc(e,{},function(){}),void e.sessionStore.load(e.sessionID,function(o,r){return o||!r?(console.log("socket.io".red.bold+"error. not found session"),t("Error",!1)):(e.session=r,console.log("socket.io".red.bold+" connect OK"),t(null,!0))})):(console.log("socket.io".red.bold+"No cookie transmitted."),t("No cookie transmitted.",!1))}),global.io.reconnect=function(e){if(e in nsp&&nsp[e].sockets)for(var t in nsp[e].sockets)nsp[e].sockets[t].disconnect()},global.io.send_all=function(e,t){for(var o in nsp)nsp[o]?(console.log("emit",o.bold.red),nsp[o].emit(e,t)):console.log("Not emit",o.bold.red);global.io.sockets.emit(e,t)}}console.log(process.cwd()),require("console-stamp")(console,"yyyy-mm-dd HH:MM:ss.l");var watch=require("node-watch"),path=require("path"),e=path.resolve(__dirname,"..");e=e.split("/"),function(){if(!("UID"in Object.prototype)){var e=1;Object.defineProperty(Object.prototype,"__uniqueId",{writable:!0}),Object.defineProperty(Object.prototype,"UID",{get:function(){return void 0==this.__uniqueId&&(glob.length||(e=1),this.__uniqueId=e++,glob[this.__uniqueId]=this),glob[this.__uniqueId]||(glob[this.__uniqueId]=this),this.__uniqueId>=e&&(e=this.__uniqueId+1),this.__uniqueId},set:function(t){/[0-9]+/.test(t)&&(glob[t]=this,this.__uniqueId=t,t>e&&(e=t+1))}})}}(),Object.defineProperty(Array.prototype,"max",{enumerable:!1,value:function(){return Math.max.apply(null,this)}}),Object.defineProperty(Array.prototype,"min",{enumerable:!1,value:function(){return Math.min.apply(null,this)}}),Object.defineProperty(Array.prototype,"first",{enumerable:!1,value:function(){return this.length?this[0]:void 0}}),Object.defineProperty(Array.prototype,"last",{enumerable:!1,value:function(){return this.length?this[this.length-1]:void 0}}),RegExp.prototype.toJSON=RegExp.prototype.toString;var PORT_LISTENER="test2"==e[e.length-2]?3387:3388;console.log("I am listening to this port: http://localhost:%s",PORT_LISTENER);var yes=require("./yes"),fs=require("fs"),http=require("http"),path=require("path"),express=require("express"),morgan=require("morgan"),bodyParser=require("body-parser"),multer=require("multer"),methodOverride=require("method-override"),session=require("express-session"),errorHandler=require("errorhandler"),io=require("socket.io"),io_ofs=[],colors=require("colors"),appConfig=require("../config/appConfig.json"),app=express();global.app=app,process.on("uncaughtException",function(e){console.log(e),console.log(e.stack)});var glob=[];global.glob=glob;var alias={};app.set("port",process.env.PORT||PORT_LISTENER),app.set("views","./app/projects"),app.set("view engine","jade"),app.set("json replacer",function(e,t){return"null"===t||null===t?"":t});var extend=app.locals.extend=require("extend"),beautify=require("js-beautify").js_beautify;app.locals.pertty=function(e,t){return beautify(e,{indent_with_tabs:!0,indent_level:t?t:0})},app.locals.jsonf=function(e){var t=[],o=JSON.stringify(e,function(e,o){return"function"==typeof o?(t.push(o.toString()),"%function."+(t.length-1)+"%"):"string"==typeof o&&":func:"==o.substr(0,6)?(t.push(o.substr(6)),"%function."+(t.length-1)+"%"):o},4);return o?o.replace(/"(%function\.)(\d+)\%"/g,function(e,o,r){return t[r]}).replace(/:func:/g,""):void 0};var strf=app.locals.strf=function(e){return":func:"+e.toString()};app.locals.args=function(e,t,o){if(1==e.length&&"object"==typeof e[0]&&!("length"in e[0]))return extend({},t,e[0]);if(!e)return t;if(e.length&&!(o instanceof Array))throw new Error("arg_names must a array");if(e.length>o.length)throw new Error("arg_names length shortly"+o.toString());for(var r=extend({},t),n=0;n<e.length;n++)r[o[n]]=e[n];return r};var jade=require("jade");jade.filters.ejs=function(block){return eval(block),""},jade.filters.js=function(e){app.locals;return"\n"+e},jade.filters.css=jade.filters.js,jade.filters.ractive=function(e){return""},jade.filters.load=function(e){return""},app.use(function(e,t,o){var r=e.url.split("/");r[1]in alias&&(r[1]=alias[r[1]]),e.url=r.join("/"),e.url.indexOf("?")>0&&(e.query=require("url").parse(e.url,!0).query),o()}),morgan.token("time",function(e,t){return yes.dt2str(new Date)}),morgan.token("remote-addr",function(e,t){return e.headers["x-forwarded-for"]?e.headers["x-forwarded-for"]:e.ip?e.ip:e._remoteAddress?e._remoteAddress:e.connection?e.connection.remoteAddress:void 0}),app.use(morgan(":time :remote-addr :method :url :status :response-time ms - :res[content-length]",{skip:function(e,t){return t.skip_log}})),app.use(multer({dest:"./uploads/"})),app.get(bodyParser({limit:"250mb"})),app.use(bodyParser.json({limit:"250mb"})),app.use(bodyParser.urlencoded({limit:"250mb",parameterLimit:1e6,extended:!0})),app.use(methodOverride()),app.use(require("express-domain-middleware")),app.use(function(e,t,o){var r=e.headers["x-forwarded-for"]||e.ip;Object.keys(e.files).length?console.log(r.green+" "+e.method.yellow+" "+e.url.green+" upload files :"+Object.keys(e.files).length):Object.keys(e.body).length?console.log(r.green+" "+e.method.yellow+" "+e.url.green+", body: "+JSON.stringify(e.body).substr(0,500)):/\.[a-z]{2,4}$/.test(e.url)||console.log(r.green+" "+e.method.yellow+" "+e.url.green),o()});var sessionProc=session({name:"hezki",secret:"my l1t34l3 s3cret23 s3ss30n k3y dfdsfsfs?",cookie:{path:"/"}});app.use(sessionProc),app.get("/:page",function(e,t,o){return"/"==e.url.substr(-1)||e.params.page.indexOf(".")>-1?o():(console.log("redirect to path "+e.params.page.yellow),void t.redirect(encodeURI(e.params.page)+"/"))});var routes=app.routes={},nsp={};app.serv=[],fs.existsSync("./app/projects/share/share.js")&&add_path("share"),fs.existsSync("./app/projects/projects.json")&&require("../projects/projects.json").forEach(function(e){add_path(e.path,e.space)}),app.use(function(e,t,o){var r=e.url.split("/");r=""==r[0]?r[1]:r[0],!routes[r]&&fs.existsSync("./app/projects/"+r+"/"+r+".js")&&(app.serv.push({path:r}),add_path(r)),o()}),app.use(express["static"](path.join("./app",appConfig.directories.publicDir))),"development"===app.get("env")&&(app.use(function(e,t,o,r){console.log(e),e=JSON.parse(safe_stringify(e)),console.log(e),errorHandler(e,t,o,r)}),app.locals.pretty=!0);var server=http.createServer(app);server.listen(app.get("port"),"0.0.0.0",function(){console.log("Express server listening on port "+app.get("port"))}),init_io();for(var x=0;x<io_ofs.length;x++)io_ofs[x]();
//# sourceMappingURL=app.js.map