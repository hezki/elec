var Service = require('node-windows').Service,path=require('path'),fs=require('fs');
process.on('uncaughtException', function(err) {
   log('APP_ERR',1);
   log(err,1);
   log(err.stack,1);
   process.exit(0);
});
function datestamp () {
    var local = new Date();
    return local.toJSON().replace('T',' ').replace('Z','');
}
function log(s,time){
	console.log(s);
	if(time){
		fs.appendFileSync(path.resolve(__dirname,'../../log/svc.log'),datestamp()+'\t'+s+'\n');
	}else 
		fs.appendFileSync(path.resolve(__dirname,'../../log/svc.log'),s);
};
var svc=null;
function init(){
	svc = new Service({
	  name:'ElectricTimerWeb',
	  description: 'Electric Timer Web Server',
	  script: __dirname+'/main.js'
	});

	// Listen for the "install" event, which indicates the
	// process is available as a service.
	svc.on('install',function(){
		log('service install',1);	
		svc.start();
	}).on('alreadyinstalled',function(){
		log('alreadyinstalled',1);	
		svc.start();
	}).on('invalidinstallation',function(){
		log('invalidinstallation',1);	
	}).on('uninstall',function(){
		log('uninstall',1);	
	}).on('start',function(){
		log('start',1);	
	}).on('stop',function(){
		log('stop',1);	
	}).on('error',function(e){
		log('ERROR',1);	
		log(e && e.message?e.message:e,1);
		if(e && e.stack)log(e.stack);
	});
};
switch(process.argv[2]){
	case 'I':
	case 'i':
		init();
		svc.install(path.resolve(__dirname,'../temp'));
		break;
	case 'U':
	case 'u':
		init();
		svc.uninstall();
		break;
	case 'S':
	case 's':
		init();
		svc.start();
		break;
	case 'T':
	case 't':
		init();
		svc.stop();
		break;
	default:
		console.log('USAGE: node service.js <OPT>\n\nI to install\nU to uninstall\nS to strart\nT to stop');
};