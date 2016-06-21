process.on('uncaughtException', function(err) {
   log('APP_ERR',1);
   log(err,1);
   log(err.stack,1);
});
process.on('SIGHUP',function(){
	if(child)child.stop();
	setTimeout(function(){
		process.exit();
	},500);
});
process.on('SIGINT',function(){
	if(child)child.stop();
	setTimeout(function(){
		process.exit();
	},500);
});
var forever=require('forever-monitor'),path=require('path'),stripAnsi = require('strip-ansi'),fs=require('fs');
function datestamp () {
    var local = new Date();
    return local.toJSON().replace('T',' ').replace('Z','');
}
var opt={
	cwd:path.resolve(__dirname,'../../'),
	outFile:path.resolve(__dirname,'../../log/out.log')
};
var child = new (forever.Monitor)(path.resolve(__dirname,'../server/app.js'),opt);

function log(s,time){
	if(time){
		fs.appendFileSync(path.resolve(__dirname,'../../log/app.log'),'\n\n'+datestamp()+'\t'+s+'\n\n');
	}else 
		fs.appendFileSync(path.resolve(__dirname,'../../log/app.log'),s);
};
child.on('exit',function(forever){
	log('EXIT',1);
}).on('start',function(){
	log('START',1);
}).on('error',function(err){
	log('ERROR',1);
	log(err && err.message?err.message:err,1);
	if(err.stack)log(err.stack,1);
}).on('restart',function(data){
	log('RESTART',1);
}).on('stop',function(data){
	log('STOP',1);
}).on('stdout',function(data){
	log(stripAnsi(data));
}).on('stderr',function(data){
	log(stripAnsi(data));
}).start();
