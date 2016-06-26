function datestamp(){var n=new Date;return n.setMinutes(n.getMinutes()-n.getTimezoneOffset()),n.toJSON().replace("T"," ").replace("Z","")}function log(n,t){console.log(n),t?fs.appendFileSync(path.resolve(__dirname,"../../log/svc.log"),datestamp()+"	"+n+"\n"):fs.appendFileSync(path.resolve(__dirname,"../../log/svc.log"),n)}function init(){svcs.push(initJsSrvc(WEB,"1Electric Timer Web Service",__dirname+"/web.js")),svcs.push(initJsSrvc(SERIAL,"1Electric Timer Serial",__dirname+"/serial_svc.js")),svcs.push(initSrvc(APACHE,APACHE,'"'+path.resolve(__dirname,"../../uniServer/usr/local/apache2/bin/httpd1.exe")+'" -k runservice')),svcs.push(initSrvc(MYSQL,MYSQL,'"'+path.resolve(__dirname,"../../uniServer/usr/local/mysql/bin/mysqld1.exe")+'" --defaults-file="'+path.resolve(__dirname,"../../uniserver/usr/local/mysql")+'/my.ini" '+MYSQL))}function initSrvc(n,t,e){var s=function(t){log("ERROR "+n,1),log(t&&t.message?t.message:t,1)},i={name:n,description:t,exe:e,stop:function(){sc.stop("",n,{timeout:60}).then(function(){log(n+" stop",1)},s)},start:function(){sc.start("",n,{timeout:60}).then(function(){log(n+" start",1)},s)},uninstall:function(){sc.stop("",n,{timeout:60}).then(function(){sc["delete"]("",n,{timeout:60}).then(function(){log(n+" uninstall",1)},s)},s)},install:function(){sc.create("",n,{binpath:e,displayname:n,start:"auto"}).then(function(){sc.start("",n,{timeout:60}).then(function(){log(n+" install",1)},s)},s)}};return i}function initJsSrvc(n,t,e){var s=new Service({name:n,description:t,script:e});return s.directory(path.resolve(__dirname,"../temp")),s.on("install",function(){log(n+" install",1),s.start()}).on("alreadyinstalled",function(){log(n+" already installed",1),s.start()}).on("invalidinstallation",function(){log(n+" invalid installation",1)}).on("uninstall",function(){log(n+" uninstall",1)}).on("start",function(){log(n+" start",1)}).on("stop",function(){log(n+" stop",1)}).on("error",function(t){log("ERROR "+n,1),log(t&&t.message?t.message:t,1),t&&t.stack&&log(t.stack)}),s}var Service=require("node-windows").Service,path=require("path"),fs=require("fs"),WEB="1_ElectricTimerWeb",APACHE="1_APACHE",MYSQL="1_MYSQL",SERIAL="1_BAKAR";process.on("uncaughtException",function(n){log("APP_ERR",1),log(n,1),log(n.stack,1),process.exit(0)});var svcs=[],sc=require("windows-service-controller");switch(log("service control start, arg:"+process.argv[2],1),process.argv[2]){case"I":case"i":init(),svcs.forEach(function(n){n.install()});break;case"U":case"u":init(),svcs.forEach(function(n){n.uninstall()});break;case"S":case"s":init(),svcs.forEach(function(n){n.start()});break;case"T":case"t":init(),svcs.forEach(function(n){n.stop()});break;case"W":sc.stop("","US_APACHE1")["catch"](function(n){console.log("fail",n)}).done(function(n){console.log("done",n)});break;default:console.log("USAGE: node service.js <OPT>\n\nI to install\nU to uninstall\nS to strart\nT to stop")}
//# sourceMappingURL=service.js.map