"use strict";var util=require("util"),wait=require("wait.for"),express=require("express"),extend=require("extend"),fs=require("fs"),mysql=require("mysql"),request=require("request"),jade=require("jade"),local=function(e){var o={};return{path:e,pop:function(e){return o[e]?o[e]:[]},push:function(e,n){e in o||(o[e]=[]),o[e].push(n)}}};module.exports=function(e,o){function n(){for(var e=[],o=0;o<arguments.length;o++)"number"==typeof arguments[o]||"this"==arguments[o]?e.push(arguments[o]):e.push("'"+arguments[o]+"'");return"$$.emit("+e.join(",")+");return false;"}function s(){for(var e=[],o=0;o<arguments.length;o++)"number"==typeof arguments[o]||"this"==arguments[o]?e.push(arguments[o]):e.push("'"+arguments[o]+"'");return"Yes.set_by_path(this,"+e[0]+(void 0!==e[1]?","+e[1]:"")+(void 0!==e[2]?","+e[2]:"")+")"}var i=express.Router();i.post("/ajax/:page",function(e,o,n){console.log(e.url.red.bold),o.header("Content-Type","text/html"),e.url=e.url.replace(/^\/ajax/,""),e.method="GET",e.ajax=1,n()}),i.public_urls=[],i.retErr=function(e,o,n){try{console.log("retErr",e,i.UID,e.stack)}catch(s){}throw"string"==typeof e?new Error(e):e},i.pre_proc=function(e){return e||(e=""),e.replace(/(@C\.)([^@]*)(@)/g,function(e,o,n,s){return i.glob.C[n.toUpperCase()]||""})},i.proc=function(){var e=arguments;if("function"==typeof e[0])return i._procf||(i._procf=[]),i._procf.push(e[0]);if(i._procf)for(var o=0;o<i._procf.length;o++)i._procf[o].apply(this,e)};var r,t,l,a,p=e;"/"==p.substr(-1)&&(p=p.substr(0,p.length-1)),i.initdata=function(e){return r=require("./data.js")(e,i,p)},i.initelas=function(e){return require("./elas.js")(e)},i.render=function(e,o,r,t){var l=i.get_login(e.req).uid||0;console.log("render "+o+" by route UID "+(""+i.UID).yellow);var a=function(e,o){var n=e.replace(/\.\./g,"").split(".");if(n.length<2?(e+=".jade",n="jade"):n=n.last(),e="app/projects/"+p+"/"+e,console.log("include: ",e),!fs.existsSync(e))return console.log((e+" not exists").yellow),"";if("jade"==n){var s=extend({},global.app.locals,c,o);return jade.renderFile(e,s)}var s=fs.readFileSync(e).toString();return s},g=local(p);g.on=[],g.on.get=function(){var e={};g.on.forEach(function(o){o[0]in e||(e[o[0]]=[]),e[o[0]].push(o)});var o=[];for(var n in e){var s=[];e[n].forEach(function(e){s.push(e[1].toString().replace(/^function\(\)\{/,"").replace(/\}$/,""))}),o.push('$$.on("'+n+'",function(){'+s.join(";\n")+";\n})\n")}return o},i.glob.C||(i.glob.C={}),i.glob.C.path||(i.glob.C.path=p);var c=extend({},r,{alias:e.req.alias||p,view:o,app:app,ajax:e.req.ajax,login:i.get_login(e.req),C:i.glob.C,uid:l,req:e.req,res:e,ev:n,set:s,local:g,include:a});e.render(p+"/"+o,c,t)},i.redirect=function(e,o){var n=o;if(o.indexOf("//")<0){var s=decodeURI(e.req.originalUrl).split("/");console.log("src reqUrl:"+s.join("/")),s.pop(),s=s.join("/"),n=s+("/"==o.substr(0,1)?"":"/")+o}return n=encodeURI(n),console.log("redirect to:"+n),e.redirect(n)},i.fiber=function(e,o,n){function s(){try{n()}catch(s){i.retErr(s,e,o)}}wait.launchFiber(s)},i.use(function(e,o,n){i.fiber(e,o,n)}),i.check_login=function(e){},i.get_login=function(e){if(!e)throw new Error("must spec req at get_login");return e.session?e.session.login_path&&e.session.login_path[i.path]&&e.session.login_path[i.path].is_login&&e.session.login_path[i.path].login?e.session.login_path[i.path].login:o&&e.session.login_path&&!e.session.login_path[i.path]&&e.session.login_space[o]&&e.session.login_space[o].is_login?(e.session.login_path[p]=e.session.login_space[o],e.session.login_path[i.path].login):{}:{}},i.use(function(e,n,s){if("OPTIONS"==e.method)return s();if(i.public_urls){var r=i.public_urls.filter(function(o){var n=String(e.url).split("?")[0];return o instanceof RegExp?n.match(o):o==n});if(r.length)return console.log("is public:",r[0]),s()}if(e.session.login_path||(e.session.login_path={}),e.session.login_space||(e.session.login_space={}),e.session.login_path[p]&&e.session.login_path[p].is_login)return s();if(o&&e.session.login_space[o]&&e.session.login_space[o].is_login)return e.session.login_path[p]=e.session.login_space[o],console.log(p.yellow.bold+" space "+o+" login"),s();if(t.indexOf(e.ip)>-1){var a=extend({},l);e.session.login_path[p]={},e.session.login_path[p].login=a,e.session.login_path[p].is_login=1,o&&(e.session.login_space[o]=e.session.login_path[p]),console.log("DEBUG_LOGIN")}var g=i.check_login(e);if(void 0!==g){if(g){if("object"!=typeof g)throw new Error("check_login return fail");return e.session.login_path[p]=g,e.session.login_path[p].is_login=1,o&&(e.session.login_space[o]=e.session.login_path[p]),console.log(p.yellow.bold+" check_login login"),s()}return s()}if(/\/login$/.test(e.url)||/\/pass$/.test(e.url)||/\.css$/.test(e.url)||/\.swf$/.test(e.url)||/\.js$/.test(e.url)||/^\/pdf-fonts/.test(e.url))return s();if("GET"==e.method)return e.session.login_target=e.url,console.log("not access to "+e.url.red.bold+", redirect to login"),console.log(e.session.login_path),console.log(o,e.session.login_space),i.redirect(n,"/login");if("/data"==e.url&&e.body&&"public"==e.body.cmd)return s();throw console.log("not access to "+e.url.red.bold),new Error("שגיאת הרשאה, יש להכנס למערכת קודם")}),i.post("/pass",function(e,n){return console.log(e.headers),e.session.login_path||(e.session.login_path={}),e.session.login_path[p]={},e.body&&e.body.name&&e.body.pass?(e.session.login_path[p].name=e.body.name,void a.call(e,e.body.name,e.body.pass,function(s,r){return s?("object"==typeof s&&s.redirect&&(e.session.login_path[p].loginRedirect=s.redirect),e.session.login_path[p].err=s,console.log("login faild".red.bold,s),i.redirect(n,"/login")):(delete e.session.login_path[p].err,e.session.login_path[p].is_login=1,"object"==typeof r?e.session.login_path[p].login=r:e.session.login_path[p].uid=r,console.log("login OK".blue,e.session.login_path),o&&(e.session.login_space[o]=e.session.login_path[p]),void(e.session.login_target?i.redirect(n,e.session.login_target):i.redirect(n,"/")))})):i.redirect(n,"/login")}),i.post("/data",function(e,o){if(!(e.session&&e.session.login_path&&e.session.login_path[p]&&e.session.login_path[p].is_login||e.body&&("public"==e.body.cmd||e.isInternal)))return i.retErr("must login before",e,o);e.body&&"{}"!=JSON.stringify(e.body)||i.retErr("req body empty",e,o);var n=function(n,s,t){var l=arguments,a=0,p=r.pools[0];if(r.pools&&"string"==typeof n&&"string"==typeof s)for(var g=0;g<r.pools.length;g++)if(r.pools[g]&&l[a]==r.pools[g].conn_a){a++,p=r.pools[g];break}if(!("connection"in p)&&"string"==typeof l[a])if("select"==l[a].trim().substr(0,6).toLowerCase());else if(!e.isInternal){var c=i.get_login(o.req).uid||0;l[a]="set @val="+c+";\n"+l[a]}return r.rst(l[0],l[1],l[2])},s=function(o,n,s,i,t,l){return r.upd(e,o,n,s,i,t,l)};if("test"==e.body.cmd)return o.json({result:"OK"});try{i.proc(e,o,n,s)}catch(t){i.retErr(t,e,o)}}),i.get("/",function(e,o){i.redirect(o,"index")}),i.get("/logout",function(e,n){e.session&&e.session.login_path&&delete e.session.login_path[p],o&&e.session&&e.session.login_space&&e.session.login_space[o]&&delete e.session.login_space[o],e.session&&e.session.login_path&&app.serv.forEach(function(n){if(n.space==o){var s="string"==typeof n.path?[n.path]:n.path;s.forEach(function(o){delete e.session.login_path[o]})}}),i.redirect(n,"/")}),i.get(/\/login$/,function(e,o){var n=e.session.login_path&&e.session.login_path[p]?e.session.login_path[p]:{};if(n.is_login)return i.redirect(o,"/");var s=n.err;delete n.err;var r=n.loginRedirect;delete n.loginRedirect,i.render(o,"../share/signin",{loginErr:s,loginRedirect:r,name:n.name,pathToAssets:"/bootstrap-3.0.0",path:p}),delete n.err});var g=require("../projects/"+e+"/"+e+".js")(i);return g.C||(g.C={}),g.C.path=p,i.glob=g,i.glob.C||(i.glob.C={}),g.DEBUG_IP&&(t="string"==typeof g.DEBUG_IP?[g.DEBUG_IP]:g.DEBUG_IP),l=g.DEBUG_LOGIN,a=g.login,i};
//# sourceMappingURL=route.js.map