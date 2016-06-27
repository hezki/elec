function datestamp(){var e=new Date;return e.setMinutes(e.getMinutes()-e.getTimezoneOffset()),e.toJSON().replace("T"," ").replace("Z","").replace(/(:|\d\d.\d+$)/g,"")}function datestamp(){var e=new Date;return e.setMinutes(e.getMinutes()-e.getTimezoneOffset()),e.toJSON().replace("T"," ").replace("Z","")}function log(e,t){console.log(e),t?fs.appendFileSync(path.resolve(__dirname,"../../log/svc.log"),datestamp()+"	"+e+"\n"):fs.appendFileSync(path.resolve(__dirname,"../../log/svc.log"),e)}function init(){svcs.push(initJsSrvc(WEB,"1Electric Timer Web Service",__dirname+"/web.js")),svcs.push(initJsSrvc(SERIAL,"1Electric Timer Serial",__dirname+"/serial_svc.js")),svcs.push(initSrvc(APACHE,APACHE,'"'+path.resolve(__dirname,"../../uniServer/usr/local/apache2/bin/httpd1.exe")+'" -k runservice')),svcs.push(initSrvc(MYSQL,MYSQL,'"'+path.resolve(__dirname,"../../uniServer/usr/local/mysql/bin/mysqld1.exe")+'" --defaults-file="'+path.resolve(__dirname,"../../uniserver/usr/local/mysql")+'/my.ini" '+MYSQL))}function initSrvc(e,t,n){var s=function(t){log("ERROR "+e,1),log(t&&t.message?t.message:t,1)},i={name:e,description:t,exe:n,stop:function(){sc.stop("",e,{timeout:60}).then(function(){log(e+" stop",1)},s)},start:function(){sc.start("",e,{timeout:60}).then(function(){log(e+" start",1)},s)},uninstall:function(){sc.stop("",e,{timeout:60}).then(function(){sc["delete"]("",e,{timeout:60}).then(function(){log(e+" uninstall",1)},s)},s)},install:function(){sc.create("",e,{binpath:n,displayname:e,start:"auto"}).then(function(){sc.start("",e,{timeout:60}).then(function(){log(e+" install",1)},s)},s)}};return i}function initJsSrvc(e,t,n){var s=new Service({name:e,description:t,script:n});return s.directory(path.resolve(__dirname,"../temp")),s.on("install",function(){log(e+" install",1),s.start()}).on("alreadyinstalled",function(){log(e+" already installed",1),s.start()}).on("invalidinstallation",function(){log(e+" invalid installation",1)}).on("uninstall",function(){log(e+" uninstall",1)}).on("start",function(){log(e+" start",1)}).on("stop",function(){log(e+" stop",1)}).on("error",function(t){log("ERROR "+e,1),log(t&&t.message?t.message:t,1),t&&t.stack&&log(t.stack)}),s}function restore(e,t){var n=fs.readFileSync(e);zlib.inflateRaw(n,function(e,n){e?console.log("ERROR",e):(fs.writeFileSync(t,n),console.log("restore OK to file",t))})}function backup(){var e=process.argv[3]||path.resolve(__dirname,"../../baks")+"/"+datestamp().replace(/(:|\d\d.\d+$)/g,"")+".bak";require("mysqldump")({host:"localhost",user:"root",password:"power001",database:"electric",getDump:1},function(t,n){t?console.log("ERROR",t):require("zlib").deflateRaw(n,function(t,n){t?console.log("ERROR",t):(fs.writeFileSync(e,n),console.log("bak to "+e),console.log("OK"))})})}var Service=require("node-windows").Service,path=require("path"),fs=require("fs"),WEB="1_ElectricTimerWeb",APACHE="1_APACHE",MYSQL="1_MYSQL",SERIAL="1_BAKAR";process.on("uncaughtException",function(e){log("APP_ERR",1),log(e,1),log(e.stack,1),process.exit(0)});var svcs=[],zlib=require("zlib"),sc=require("windows-service-controller");switch(log("service control start, arg:"+process.argv[2],1),process.argv[2]){case"I":case"i":init(),svcs.forEach(function(e){e.install()});break;case"U":case"u":init(),svcs.forEach(function(e){e.uninstall()});break;case"S":case"s":init(),svcs.forEach(function(e){e.start()});break;case"T":case"t":init(),svcs.forEach(function(e){e.stop()});break;case"W":initJsSrvc(WEB,"1Electric Timer Web Service",__dirname+"/web.js").install();break;case"B":backup();break;case"R":process.argv[3]&&process.argv[4]?restore(process.argv[3],process.argv[4]):console.log("must specific src_file and trg_file");break;default:console.log("USAGE: node service.js <OPT>\n\nI to install\nU to uninstall\nS to strart\nT to stop")}
//# sourceMappingURL=service.js.map