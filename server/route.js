"use strict";var util=require("util"),wait=require("wait.for"),express=require("express"),extend=require("extend"),fs=require("fs"),mysql=require("mysql"),request=require("request"),jade=require("jade"),local=function(e){var o={};return{path:e,pop:function(e){return o[e]?o[e]:[]},push:function(e,n){e in o||(o[e]=[]),o[e].push(n)}}};module.exports=function(e,o){function n(){for(var e=[],o=0;o<arguments.length;o++)"number"==typeof arguments[o]||"this"==arguments[o]?e.push(arguments[o]):e.push("'"+arguments[o]+"'");return"try{$$.emit("+e.join(",")+")}finally{return false;}"}function s(){for(var e=[],o=0;o<arguments.length;o++)"number"==typeof arguments[o]||"this"==arguments[o]?e.push(arguments[o]):e.push("'"+arguments[o]+"'");return"Yes.set_by_path(this,"+e[0]+(void 0!==e[1]?","+e[1]:"")+(void 0!==e[2]?","+e[2]:"")+")"}var t=o.space,r=e;o&&o.dir&&(r=o.dir);var i=express.Router();i.post("/ajax/:page",function(e,o,n){console.log(e.url.red.bold),o.header("Content-Type","text/html"),e.url=e.url.replace(/^\/ajax/,""),e.method="GET",e.ajax=1,n()}),i.public_urls=[],i.retErr=function(e,o,n){try{console.log("retErr",e,i.UID,e.stack)}catch(s){}throw"string"==typeof e?new Error(e):e},i.pre_proc=function(e){return e||(e=""),e.replace(/(@C\.)([^@]*)(@)/g,function(e,o,n,s){return i.glob.C[n.toUpperCase()]||""})},i.proc=function(){var e=arguments;if("function"==typeof e[0])return i._procf||(i._procf=[]),i._procf.push(e[0]);if(i._procf)for(var o=0;o<i._procf.length;o++)i._procf[o].apply(this,e)};var l,a,c,p,g=e;"/"==g.substr(-1)&&(g=g.substr(0,g.length-1)),i.initdata=function(e){return l=require("./data.js")(e,i,g)},i.initelas=function(e){return require("./elas.js")(e)},i.render=function(e,o,t,l){var a=i.get_login(e.req).uid||0;console.log("render "+o+" by route UID "+(""+i.UID).yellow);var c=function(e,o){var n=e.replace(/\.\./g,"").split(".");if(n.length<2?(e+=".jade",n="jade"):n=n.last(),e="app/projects/"+r+"/"+e,console.log("include: ",e),!fs.existsSync(e))return console.log((e+" not exists").yellow),"";if("jade"==n){var s=extend({},global.app.locals,u,o);return jade.renderFile(e,s)}var s=fs.readFileSync(e).toString();return s},p=local(g);p.on=[],p.on.get=function(){var e={};p.on.forEach(function(o){o[0]in e||(e[o[0]]=[]),e[o[0]].push(o)});var o=[];for(var n in e){var s=[];e[n].forEach(function(e){s.push(e[1].toString().replace(/^function\(\)\{/,"").replace(/\}$/,""))}),o.push('$$.on("'+n+'",function(){'+s.join(";\n")+";\n})\n")}return o},i.glob.C||(i.glob.C={}),i.glob.C.path||(i.glob.C.path=g);var u=extend({},t,{alias:e.req.alias||g,view:o,app:app,ajax:e.req.ajax,login:i.get_login(e.req),C:i.glob.C,uid:a,req:e.req,res:e,ev:n,set:s,local:p,include:c});e.render(r+"/"+o,u,l)},i.redirect=function(e,o){var n=o;if(o.indexOf("//")<0){var s=decodeURI(e.req.originalUrl).split("/");console.log("src reqUrl:"+s.join("/")),s.pop(),s=s.join("/"),n=s+("/"==o.substr(0,1)?"":"/")+o}return n=encodeURI(n),console.log("redirect to:"+n),e.redirect(n)},i.fiber=function(e,o,n){function s(){try{n()}catch(s){i.retErr(s,e,o)}}wait.launchFiber(s)},i.use(function(e,o,n){i.fiber(e,o,n)}),i.check_login=function(e){},i.get_login=function(e){if(!e)throw new Error("must spec req at get_login");return e.session?e.session.login_path&&e.session.login_path[i.path]&&e.session.login_path[i.path].is_login&&e.session.login_path[i.path].login?e.session.login_path[i.path].login:t&&e.session.login_path&&!e.session.login_path[i.path]&&e.session.login_space[t]&&e.session.login_space[t].is_login?(e.session.login_path[g]=e.session.login_space[t],e.session.login_path[i.path].login):{}:{}},i.use(function(o,n,s){if("OPTIONS"==o.method)return n.header("Access-Control-Allow-Origin",o.headers.origin),n.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS"),n.header("Access-Control-Allow-Headers","Content-Type, Authorization, Content-Length, X-Requested-With"),n.header("Access-Control-Allow-Credentials","true"),s();if(o.url&&o.url.match(/\/components\//))return s();if(i.public_urls){var r=i.public_urls.filter(function(e){var n=String(o.url).split("?")[0];return e instanceof RegExp?n.match(e):e==n});if(r.length)return console.log("is public:",r[0]),s()}if(o.session.login_path||(o.session.login_path={}),o.session.login_space||(o.session.login_space={}),o.session.login_path[g]&&o.session.login_path[g].is_login)return s();if(t&&o.session.login_space[t]&&o.session.login_space[t].is_login)return o.session.login_path[g]=o.session.login_space[t],console.log(g.yellow.bold+" space "+t+" login"),s();if(a.indexOf(o.ip)>-1){var l=extend({},c);o.session.login_path[g]={},o.session.login_path[g].login=l,o.session.login_path[g].is_login=1,t&&(o.session.login_space[t]=o.session.login_path[g]),console.log("DEBUG_LOGIN")}var p=i.check_login(o);if(void 0!==p){if(p){if("object"!=typeof p)throw new Error("check_login return fail");return o.session.login_path[g]=p,o.session.login_path[g].is_login=1,t&&(o.session.login_space[t]=o.session.login_path[g]),console.log(g.yellow.bold+" check_login login"),s()}return s()}if(/\/login$/.test(o.url)||/\/pass$/.test(o.url)||/\.css$/.test(o.url)||/\.swf$/.test(o.url)||/\.js$/.test(o.url)||/^\/pdf-fonts/.test(o.url))return s();if("GET"==o.method)return o.session.login_target=o.url,console.log("not access to "+o.url.red.bold+", redirect to login"),console.log(o.session.login_path),console.log(t,o.session.login_space),n.redirect("/"+e+"/login");if("/data"==o.url&&o.body&&"public"==o.body.cmd)return s();throw console.log("not access to "+o.url.red.bold),new Error("שגיאת הרשאה, יש להכנס למערכת קודם")}),i.post("/pass",function(e,o){return console.log(e.headers),e.session.login_path||(e.session.login_path={}),e.session.login_path[g]={},e.body&&e.body.name&&e.body.pass?(e.session.login_path[g].name=e.body.name,void p.call(e,e.body.name,e.body.pass,function(n,s){return n?e.body.json?(o.header("Access-Control-Allow-Headers","Content-Type, Authorization, Content-Length, X-Requested-With"),o.header("Access-Control-Allow-Origin",e.headers.origin),o.header("Access-Control-Allow-Credentials","true"),o.status(500),o.json({result:"ERROR",error:n.toString()})):("object"==typeof n&&n.redirect&&(e.session.login_path[g].loginRedirect=n.redirect),e.session.login_path[g].err=n,console.log("login faild".red.bold,n),i.redirect(o,"/login")):(delete e.session.login_path[g].err,e.session.login_path[g].is_login=1,"object"==typeof s?e.session.login_path[g].login=s:e.session.login_path[g].uid=s,console.log("login OK".blue,e.session.login_path),t&&(e.session.login_space[t]=e.session.login_path[g]),e.body.json?(o.header("Access-Control-Allow-Headers","Content-Type, Authorization, Content-Length, X-Requested-With"),o.header("Access-Control-Allow-Origin",e.headers.origin),o.header("Access-Control-Allow-Credentials","true"),o.status(200),o.json({result:"OK"})):void(s&&s.url?i.redirect(s.url):e.session.login_target?i.redirect(o,e.session.login_target):i.redirect(o,"/")))})):e.body&&e.body.json?(o.header("Access-Control-Allow-Headers","Content-Type, Authorization, Content-Length, X-Requested-With"),o.header("Access-Control-Allow-Origin",e.headers.origin),o.header("Access-Control-Allow-Credentials","true"),o.status(500),o.json({result:"ERROR",error:"נא להזין שם וסיסמה"})):i.redirect(o,"/login")}),i.post("/data",function(e,o){if(!(e.session&&e.session.login_path&&e.session.login_path[g]&&e.session.login_path[g].is_login||e.body&&("public"==e.body.cmd||e.isInternal)))return i.retErr("must login before",e,o);e.body&&"{}"!=JSON.stringify(e.body)||i.retErr("req body empty",e,o);var n=function(n,s,t){var r=arguments,a=0,c=l.pools[0];if(l.pools&&"string"==typeof n&&"string"==typeof s)for(var p=0;p<l.pools.length;p++)if(l.pools[p]&&r[a]==l.pools[p].conn_a){a++,c=l.pools[p];break}if(!("connection"in c)&&"string"==typeof r[a])if("select"==r[a].trim().substr(0,6).toLowerCase());else if(!e.isInternal){var g=i.get_login(o.req).uid||0;r[a]="set @val="+g+";\n"+r[a]}return l.rst(r[0],r[1],r[2])},s=function(o,n,s,t,r,i){return l.upd(e,o,n,s,t,r,i)};if("test"==e.body.cmd)return o.json({result:"OK"});try{i.proc(e,o,n,s)}catch(t){i.retErr(t,e,o)}}),i.get("/",function(o,n){n.redirect("/"+e+"/index")}),i.get("/logout",function(e,o){e.session&&e.session.login_path&&delete e.session.login_path[g],t&&e.session&&e.session.login_space&&e.session.login_space[t]&&delete e.session.login_space[t],e.session&&e.session.login_path&&app.serv.forEach(function(o){if(o.space==t){var n="string"==typeof o.path?[o.path]:o.path;n.forEach(function(o){delete e.session.login_path[o]})}}),i.redirect(o,"/")}),i.get(/\/login$/,function(e,o){var n=e.session.login_path&&e.session.login_path[g]?e.session.login_path[g]:{};if(n.is_login)return i.redirect(o,"/");var s=n.err;delete n.err;var t=n.loginRedirect;delete n.loginRedirect,i.render(o,"../share/signin",{loginErr:s,loginRedirect:t,name:n.name,pathToAssets:"/bootstrap-3.0.0",path:g}),delete n.err}),i.get("/components/:name",function(e,o,n){function s(){return fs.existsSync(i)?(global.is_test?o.append("Last-Modified",(new Date).toGMTString()):o.append("Last-Modified",fs.statSync(i).mtime),o.append("Content-Type","application/javascript"),o.sendfile(i)):n()}function t(){return l>3&&n(new Error("file not complied")),l++,fs.existsSync("app/projects/"+r+"/components/"+e.params.name.replace(/[\\\/]/g,"x")+"/main.lock")?setTimeout(t,1e3):fs.existsSync(i)?void s():n(new Error("file not compiled"))}var i="app/projects/"+r+"/components/"+e.params.name.replace(/[\\\/]/g,"x")+"/umd/main.js";if(fs.existsSync(i))return s();var l=0;fs.existsSync("app/projects/"+r+"/components/"+e.params.name.replace(/[\\\/]/g,"x")+"/main.lock")&&setTimeout(t,1e3)});var u=require("../projects/"+r+"/"+r+".js")(i,o);return u.C||(u.C={}),u.C.path=g,u.C.directory=r,u.C.config=o,i.glob=u,i.glob.C||(i.glob.C={}),u.DEBUG_IP&&(a="string"==typeof u.DEBUG_IP?[u.DEBUG_IP]:u.DEBUG_IP),c=u.DEBUG_LOGIN,p=u.login,i};
//# sourceMappingURL=route.js.map