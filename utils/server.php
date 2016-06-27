<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: content-type');
 require_once('common.php');
// include 'ChromePhp.php';
//ChromePhp::log('Hello console!');
//ChromePhp::log($_SERVER);
//ChromePhp::warn('something went wrong!');
//error_reporting(0);
//date_default_timezone_set('Asia/Jerusalem'); 
date_default_timezone_set('UTC'); 
$h1=explode(',',',א,ב,ג,ד,ה,ו,ז,ח,ט');
$h2=explode(',',',י,כ,ל,מ,נ,ס,ע,פ,צ');
function F11B6($v){
	$v=$v % 100;
	global $h1,$h2;
	if($v==15)return 'טו';
	if($v==16)return 'טז';	
	//return $v-($v % 10);
	return $h2[floor($v/10)].$h1[$v % 10];
}
$_dbg_last=0;
$_dbg_on=1;
$_dbg_step=0;
function F11C3(){
	global $_dbg_last,$_dbg_on,$_dbg_step;
	if(!$_dbg_on)return;
	if(!$_dbg_step){
		$_dbg_step++;
		$_dbg_last=microtime(true);
		return;
	};
	$c=microtime(true);	
	$m=round(($c - $_dbg_last)*1000000)/1000;
	ChromePhp::log('step:'.($_dbg_step++).': '.$m);
	$_dbg_last=$c;
};
function sort_by_timec($a, $b){
	if ($a['action'] == $b['action'] && $b['action']==0) {
		return 0;
	}
	if($a['action']==0)return 1;
	if($b['action']==0)return -1;	
	if ($a['timec'] == $b['timec']) {
		return 0;
	}
	return ($a['timec'] < $b['timec']) ? -1 : 1;
}

 function F11CE($p){
	$res=array('result'=>'OK');
	global $summer;
	$a=$p['cmd'];
	switch($a){
		case "proc":
			if(!F1355($p,'p'))F1348('parameter missing');							
			if(is_array($p['p'])){
				file_put_contents('status.log',serialize($p['p']));
				die('OK');
				return;
			}
			$a=explode(',',$p['p']);
			switch($a[0]){
				case 'data':				
					die("OK\n".F138D());
					break;
				case 'start':
					F1377('insert into log(type,cardid,data)value(1,0,0)');
					die('OK');
					break;
				case 'stop':
					F1377('insert into log(type,cardid,data)value(2,0,0)');
					die('OK');
					break;				
				case "card_ok":
					F1377('insert into log(type,cardid,data)value(3,'.$a[1].','.$a[2].')');
					die('OK');
					break;
				case "card_err":
					F1377('insert into log(type,cardid,data)value(4,'.$a[1].','.$a[2].')');
					die('OK');
					break;
				case "com_ok":
					F1377('insert into log(type,cardid,data)value(5,'.$a[1].',0)');
					die('OK');
					break;
				case "com_err":
					F1377('insert into log(type,cardid,data)value(6,'.$a[1].','.$a[2].')');
					die('OK');
					break;				
				default:
					F1348(print_r($p,1));
			}
			break;
		case "test":
			$t=strtotime('2014-05-01');
			//$t+=60*60;
			//F11FC();
			//$res['data']=date('Y-m-d H:i:s',$t);
			//$res['data']=$summer;
			//$res['data1']=F120A($t);
			//break;
			if(F120A($t)){
				$t+=60*60;
				$res['data']=date('Y-m-d H:i:s',$t);
				$res['data1']=date('Y-m-d H:i:s',F1341());
				}
			//$res['dd']=F137D('select hands from days where grp=0 and date="'.$ds.'"',0);
			$res['test']=F1242(strtotime('2014-04-14'),1);
			
			break;
		case 'hand_cmds':
			switch($p['type']){
				case 'del':
					//F1348($p['a']);
					$d=date('Y-m-d',strtotime($p['date']));					
					$rst=F137D('select * from days where grp=0 and date="'.$d.'"',0);
					if(!$rst)F1348('not found date');
					$v=json_decode($rst['hands'],1);
					$t=date('H:i:s',strtotime($p['t']));
					$s=''.$p['s'];
					$a=''.$p['a'];
					$rng=F1365($p,'r')?1:0;
					$r=array();
					for($i=0;$i<count($v);$i++){
						$w=$v[$i];
						$wt=date('H:i:s',strtotime($w['t']));
						//F1348($w);
						if((isset($w['r']) &&!$rng)||(!isset($w['r']) &&$rng))$r[]=$w;
						else if($wt!=$t||$w['s']!=$s||$w['a']!=$a)$r[]=$w;
					}
					ChromePhp::log($p,$v,$t);
					F1377('update days set hands=\''.json_encode($r).'\' where grp=0 and date="'.$d.'"');							
					break;
				case 'add':
					$d=date('Y-m-d',strtotime($p['date']));
					
					$rst=F137D('select * from days where grp=0 and date="'.$d.'"',0);
					$v=array();
					if(!$rst)F1377('insert into days(date,grp)values("'.$d.'",0)');
					else $v=json_decode($rst['hands'],1);
					if(!$v)$v=array();
					if(F1365($p,'on'))$v[]=array('s'=>"".$p['s'],'a'=>'1','t'=>date('H:i:s',strtotime($p['on'])));
					if(F1365($p,'off'))$v[]=array('s'=>"".$p['s'],'a'=>'2','t'=>date('H:i:s',strtotime($p['off'])));	
					if(F1365($p,'proc'))$v=array_merge($v,$p['proc']);
					F1377('update days set hands=\''.json_encode($v).'\' where grp=0 and date="'.$d.'"');							
					break;				
				default:
					F1348('param err');
			}
			break;
		case "grps":
			$res['data']=F137D('select id,name from grps',1);
			if(!$res['data'])$res['data'][]=array('id'=>'0','name'=>'בסיס');					
			$res['data'][]=array('id'=>'-1','name'=>'הכל ביחד');					
			break;
		case "times_base_rst":
			if(!$p['date'])F1348('parameter missing');						
			$r=F137D('select id,he from zmanim_base order by id',1);
			$t=F1218(date('Y-m-d',strtotime($p['date'])));
			foreach($r as &$v){
				$v['he']=$v['he'].' ('.date('H:i:s',$t[$v['id']-1]).')';
			};
			unset($v);
			$res['data']=$r;
			break;
		case "update_base":
			if(!$p['old']||!$p['new'])F1348('parameter missing');						
			F1377('update cmds set zman='.$p['new'].' where zman='.$p['old']);
			break;
		case "zmanim_rst":
			if(!$p['date'])F1348('parameter missing');							
			if(F1355($p,'id')){				
				$r=F137D('select * from zmanim where id='.$p['id'],1);
			}
			else
				$r=F137D('select * from zmanim order by ord,id',1);
			$d=date('Y-m-d',strtotime($p['date']));
			foreach($r as &$v){
				$v['zman']=date('H:i',F122A($d,$v['id']));
			};
			unset($v);
			F1250($r,array('zman'));				
			$res['data']=$r;
			break;
		case "del_time":
			if(!$p['id'])F1348('parameter missing');							
			F137D('delete from cmds where zman='.$p['id']);
			break;
		case "bak":
			$fn=date('Y_m_d H_i_s');			
			if(!file_exists('baks/'))mkdir('baks');
			chdir('../usr/local/mysql/bin');
			exec('mysqldump.exe -u root -ppower001 electric > "'.__DIR__.'/baks/'.$fn.'.sql"');			
			exec('zip -mj -P e45@e45 "'.__DIR__.'/baks/'.$fn.'.zip" "'.__DIR__.'/baks/'.$fn.'.sql"');
			chdir(__DIR__);
			if(!file_exists('baks/'.$fn.'.zip'))F1348('error backup');
			$res['data']=$fn.'.zip';
			//@unlink($fn.'.sql');
			//rename($fn.'.zip','../../../../www/'.$fn.'.zip');
			break;
		case "setting":
			if(!$p['method'])F1348('parameter missing');						
			
			switch($p["method"]){
				case "get":
					$q=F137D('select * from grps order by id',1);
					$rst=F137D('select * from global',1);
					foreach($q as $v)$rst[]=array('name'=>'$'.$v['id'],'val'=>$v['name'],'notes'=>'שם קבוצה '.$v['id']);
					$res['data']=$rst;
					break;
				case "set":
					if(!$p['name']||!$p['value'])F1348('parameter missing');						
					if(substr($p['name'],0,1)=='$'){
						F1377('update grps set name="'.F136C($p['value']).'" where id='.F136C(substr($p['name'],1)));
						break;
					}
					if($p['name']=='קו_אורך'||$p['name']=='קו_רוחב'||$p['name']=='גובה')F1269();
					F1377('update global set val="'.F136C($p['value']).'" where name="'.F136C($p['name']).'"');
					break;
			}
			break;
		case "error":
			file_put_contents('err.err',$p['error']);
			break;
		case "set_bypass":
			if(!$p['id']||!F1355($p,'value'))F1348('parameter missing');	
			switch($p['value']){
				case 0://שעון
					F1377('update switchs set locked=0 where id='.$p['id']);
					break;
				case 1://עוקף שעון 1
					F1377('update switchs set locked=1,lock_status=1 where id='.$p['id']);
					break;
				case 2://עוקף שעון 0
					F1377('update switchs set locked=1,lock_status=0 where id='.$p['id']);
					break;
				default:
					F1348('value err');
			}	
		case 'tt':
			$d=time();
			$res['data']=F1242($d,1,true,2);
			break;
		case "week":
			global $grps;
			if(!$p['date'])F1348('parameter missing');			
			if(!$p['grp'])$p['grp']=0;//F1348('parameter missing');			
			$d=strtotime($p['date']);
			//F11C3();
			//F11C3();
			global $switchs,$cmds,$grps;
			if(!$switchs){
				$q=F137D('SELECT id,`out` FROM `switchs` where locked=0 and disable=0',1);
				$r=array();
				foreach($q as $v)$r[$v['id']]=$v['out'];
				$switchs=$r;
			}
			if(!$cmds){
				$q=F137D('SELECT id,matcon,switch,type,zman,time,days,action FROM `cmds` where not disable and action>0 order by matcon,switch',1);
				foreach($q as $v)$cmds[$v['matcon']][]=$v;		
			}
			if(!$grps){
				$q=F137D('select * from grps',1);
				$grps=array(0=>'בסיסי');
				foreach($q as $v)$grps[$v['id']]=$v['name'];		
			}
			//F11C3();
			$dd=$d;
			$r=array();
			$s=array();
			
			$rst=F137D('select * from switchs where not disable order by ord=0,ord,name',1);
			$x=(24*60*60)/120;
			$stt=file_get_contents(YESPATH.'global.dat');
			$stt=explode("\t",$stt);
			$stt=str_split($stt[1]);			
			foreach($rst as $v){
				if($v['locked'] && $v['lock_status'])$a=array(array(0,0,'עוקף שעון'));else $a=array();
				$s[$v['id']]=array('id'=>$v['id'],'name'=>$v['name'],'grp'=>$v['grp'],'disable'=>$v['disable'],'locked'=>$v['locked'],'lock_status'=>$v['lock_status'],'status'=>(string)F1365($stt,(int)($v['out']),'?'),'w1'=>$a,'w2'=>$a,'w3'=>$a,'w4'=>$a,'w5'=>$a,'w6'=>$a,'w7'=>$a);
			}				
			//F11C3();
			$t=F1341();	
			$now='0';
			for($i=1;$i<8;$i++){				
				$last_day=array('hdate'=>F12C0($d),'edate'=>date('Y-m-d',$d),'wd'=>F12DE($d));								
				//F11C3();
				$c=F1242($d,false,true,$p['grp']);				
				//F11C3();
				$mtcs=array();
				foreach($grps as $grp_key=>$grp){
					//if($grp){
					if($grp_key==$p['grp']){
						$hnd=0;
						$mtd=F1233($d,$grp_key,$hnd);
						$last_day['matcon']=$mtcs[]=array('grp'=>$grp_key,'m'=>$mtd,'hand'=>$hnd,'d'=>$d);
					}
				};
				//$last_day['matcons']=$mtcs[];
				$r[]=$last_day;
				if($t>$d&&$t<$d+(24*60*60))$now=(($t-$d)/$x)+((($i-1)*DAY)/$x);							
				F1250($c,array('s','t','h','a'));				
				//foreach($c as &$v)$v['t1']=date('Y-m-d H:i:s',$v['t']);
				unset($v);				
				$news=array();
				foreach($c as $v){
					if(!F1355($news,$v['s'])||!is_array($news[$v['s']])){if($v['a']==ACT_ON)$news[$v['s']]=array($v);}
					else if(F1365(end($news[$v['s']]),'a')!=$v['a'])$news[$v['s']][]=$v;
				}
				
				foreach($news as &$v)
					if(F1365(end($v),'a')!=ACT_OFF)$v[]=array('s'=>$v[0]['s'],'a'=>ACT_OFF,'t'=>$d+(24*60*60)-1,'m'=>'','h'=>'','id'=>'');												
				unset($v);
				//file_put_contents('tt',json_encode($news,JSON_PRETTY_PRINT),FILE_APPEND);
				foreach($news as $w=>$v)if(count($v)){					
					if((!F1355($s[$w],1)||!$s[$w][1]) && (!F1355($s[$w],2)||!$s[$w][2])){//not disable												
						for($ii=0;$ii<count($v);$ii+=2){							
							//if(!isset($v[$ii]['m'])||!isset($v[$ii+1]['m']))file_put_contents('tt',json_encode($v,JSON_PRETTY_PRINT));
							//$s[$w]['w'.$i][]=array(($v[$ii]['t']-$d)/$x,120-round(($v[$ii+1]['t']-$d)/$x),date('H:i:s',$v[$ii]['t']).'-'.date('H:i:s',$v[$ii+1]['t']),$v[$ii]['h']?-1:$v[$ii]['id'],$v[$ii+1]['h']?-1:$v[$ii+1]['id'],$v[$ii]['m'],$v[$ii+1]['m']);						
							$s[$w]['w'.$i][]=array(($v[$ii]['t']-$d)/$x,120-round(($v[$ii+1]['t']-$d)/$x),date('H:i:s',$v[$ii]['t']).'-'.date('H:i:s',$v[$ii+1]['t']),$v[$ii]['id'],$v[$ii+1]['id'],$v[$ii]['m'],$v[$ii+1]['m']);						
						}						
					}
				}
				$d+=24*60*60;				
			}			
			
			$res['data']=array('days'=>$r,'data'=>array_values($s),'now'=>(string)$now);			
			$res['data']['now1']=array("time"=>F1341(),"dd"=>date('Y-m-d H:i:s',F1341()));			
			//global $dmatcons;
			//$res['temp']=$dmatcons;
			//$res['matocns']=F137D("select id,color from matcons",1);			
				//F11C3();	
			
			//$res['debug']='sdfsdf';
			break;
		case "copy"://1
			$d=$p['data'];
			if(count($d['switch_src'])==0||count($d['matcon_src'])==0)F1348('חובה לבחור לפחות מתכון אחד ומתג אחד');
			if(count($d['switch_src'])>1&&count($d['matcon_src'])>1)F1348('לא ניתן לבחור יותר ממתכון אחד אם בוחרים יותר ממתג אחד');
			//F1348('בדיקה ששני המתגים באותו קבוצה');	
			$rst=F137D('select * from cmds',1);
			//$cmds=array();
			$sm=array();
			foreach($rst as $v){
				$k=join('_',array($v['type'],$v['zman'],$v['action'],$v['days'],$v['time']));
				$sm[$v['matcon'].'_'.$v['switch']][$k]=1;
				//$cmds[$v['id']]=$v;
			};
			F1377('delete from cmds_tmp');
			$m=join(',',$d['matcon_src']);
			$s=join(',',$d['switch_src']);
			$qq=join(',',array_merge($d['switch_src'],$d['switch_trg']));			
			mysql_query('select grp from switchs where id in('.$qq.') group by grp');
			if(mysql_affected_rows()!=1)F1348('המתכונים חייבים להיות באותה קבוצה ');
			$qq=join(',',array_merge($d['matcon_src'],$d['matcon_trg']));			
			mysql_query('select grp from matcons where id in('.$qq.') group by grp');
			if(mysql_affected_rows()!=1)F1348('המתכונים חייבים להיות באותה קבוצה ');
			if(F1365($d,'ids')){
				$ids=join(',',$d['ids']);
				F1377('insert into cmds_tmp (switch,matcon,`type`,zman,`action`,time,days,disable,last,share) select switch,matcon,`type`,zman,`action`,time,days,disable,last,share from cmds where matcon in('.$m.') and switch in ('.$s.') and id in('.$ids.')');
			}else 
				F1377('insert into cmds_tmp (switch,matcon,`type`,zman,`action`,time,days,disable,last,share) select switch,matcon,`type`,zman,`action`,time,days,disable,last,share from cmds where matcon in('.$m.') and switch in ('.$s.')');
			//F1348(json_encode(array($d['switch_trg'],$d['matcon_trg'])));
			$nk=array();
			$rst=F137D('select * from cmds_tmp',1);
			foreach($rst as $v){
				$k=join('_',array($v['type'],$v['zman'],$v['action'],$v['days'],$v['time']));
				$nk[$k][]=$v['id'];
				//$cmds[$v['id']]=$v;
			};
			//file_put_contents('tesst.log',print_r($nk,1),FILE_APPEND);
			//ChromePhp::log($nk);			
			$filter_cmds=function ($s,$m) use($nk,$sm){				
				$res=array();
				foreach($nk as $k=>$v){
					if(!F1365($sm,$m.'_'.$s))$res[]=$v;
					else if(!F1365($sm[$m.'_'.$s],$k))$res[]=$v;
				};				
				file_put_contents('tesst.log',print_r($res,1),FILE_APPEND);
				return join(',',call_user_func_array('array_merge', $res));
			};
			//break;
			if(count($d['switch_src'])==1&&count($d['matcon_src'])==1){// one source
				if(!$d['matcon_trg'])$d['matcon_trg']=$d['matcon_src'];
				foreach($d['switch_trg'] as $s)
					foreach($d['matcon_trg'] as $m){
						//F1377("delete from cmds where switch=$s and matcon=$m");
						$ids=$filter_cmds($s,$m);
						if($ids)F1377("insert into cmds (switch,matcon,`type`,zman,`action`,time,days,disable,last,share) select $s,$m,`type`,zman,`action`,time,days,disable,last,share from cmds_tmp where id in(".$ids.")");				
					}
			}else if(count($d['switch_src'])>1){//matcon copy				
				foreach($d['switch_src'] as $s)
					foreach($d['matcon_trg'] as $m){
						//F1377("delete from cmds where switch=$s and matcon=$m");
						$ids=$filter_cmds($s,$m);
						if($ids)F1377("insert into cmds (switch,matcon,`type`,zman,`action`,time,days,disable,last,share) select $s,$m,`type`,zman,`action`,time,days,disable,last,share from cmds_tmp where switch=$s and id in(".$ids.")");				
					}
			}
			else if(count($d['matcon_src'])>1){//switch copy
				foreach($d['switch_trg'] as $s)
					foreach($d['matcon_src'] as $m){
						//F1377("delete from cmds where switch=$s and matcon=$m");
						$ids=$filter_cmds($s,$m);
						if($ids)F1377("insert into cmds (switch,matcon,`type`,zman,`action`,time,days,disable,last,share) select $s,$m,`type`,zman,`action`,time,days,disable,last,share from cmds_tmp where matcon=$m and id in(".$ids.")");
					}
			}
			else F1348('data err');
			break;
		case "reset_switch":
			if(!$p['switch'])F1348('parameter missing');			
			F1377('delete from cmds where switch='.$p['switch']);
			break;
		case "reset":
			if(!$p['switch']||!$p['matcon'])F1348('parameter missing');			
			F1377('delete from cmds where switch='.$p['switch'].' and matcon='.$p['matcon']);
			break;
		case "set_hand":
			//file_put_contents('c:\fd.df',print_r($p,1));
			if(!$p['date']||!F1355($p,'matcon')||!F1355($p,'grp'))F1348('parameter missing');			
			$e='insert into days(date,matcon,grp)values("'.$p['date'].'",'.$p['matcon'].','.$p['grp'].') on duplicate key update matcon='.$p['matcon'];
			//F1332($e,'lerr.log',1);
			F1377($e);						
			break;
		case "set_hand_auto":
			if(!$p['date']||!F1355($p,'grp'))F1348('parameter missing');
			F1377('delete from days where date="'.$p['date'].'" and grp='.$p['grp']);
			$res['data']=(string)F1233(strtotime($p['date']),$p['grp'],$hand);	
			break;
		case "timeq":
			$res["data"]=date('Y-m-d H:i:s',strtotime(exec("date")));
			break;
		case "time":
			$res["data"]=exec("sudo date -s \"".$p["time"]."\" 2>&1");
			break;
		case "cmds":
			if(!$p['date'])F1348('parameter missing');
			$res['data']=F1242(strtotime($p['date']),true);
			$rst=F137D('select id,name from matcons',1);
			$m=array();
			foreach($rst as $k)$m[(string)$k['id']]=$k['name'];
			foreach($res['data'] as &$v){
				if($v['m'])$v['mn']=$m[$v['m']];			
				if((int)$v['id']<0)$v['mn'].=' (אוטומטי)';
			}
			$res['switchs']=F137D("select id,name,grp from switchs",1);						
			break;
		case "init":
			$res['data']=array('switchs'=>F137D("select * from switchs",1),
				'matcons'=>F137D("select * from matcons",1),'grps'=>F137D('select * from grps',1));
			if(!isset($res['data']['grps'][0]))$res['data']['grps'][0]='בסיסי';
			break;
		case "recalc_timers":
			F1269();
			break;
		case "zmanim_name":			
			$v=array();
			$r=F137D("select id,he from zmanim_base",1);
			foreach($r as $k)$v[$k['id']]=$k['he'];
			$r=F137D("select base,name from zmanim order by ord,name",1);			
			foreach($r as $k)$v[$k['base']]=$k['name'];
			$b=array();
			foreach($v as $k=>$w)$b[]=array("i"=>(string)$k,"n"=>$w);
			
			$res['data']=$b;
			break;
		case "times":
			if(!$p['date'])F1348('parameter missing');
			$d=strtotime($p['date']);
			$ds=date('Y-m-d',$d);
			$res['data']=F1225($ds);
			//$r=array();
			//foreach($res['data'] as $k)$r[]=date('Y-m-d H:i:s',$k);
			//$res['data1']=$r;
			break;
		case "times_day":
			if(!$p['date'])F1348('parameter missing');
			$d=strtotime($p['date']);
			$ds=date('Y-m-d',$d);
			$x=F137D('select id,base from zmanim order by ord,name',1);
			$q=array();
			foreach($x as $k)$q[$k['id']]=F122A($ds,$k['id']);
			$res['data']=$q;
			break;
		case "cmd_all1"://get all cmds			
			$rst=F137D('SELECT matcon,`switch`,id,`type`,zman,days,`action`,time,`disable` FROM cmds ',1);			
			/*foreach($rst as &$rst){
				$v["time"]=strtotime('1970-01-01 '.$v['time']);
			}*/
			$res['data']=$rst;
			break;
		case "cmd"://get cmd for upd
			if(!$p['id']||!$p['date'])F1348('parameter missing');
			$d=strtotime($p['date']);
			$ds=date('Y-m-d',$d);
			$v=F137D('SELECT matcon,`switch`,id,`type`,zman,days,`action`,time,`disable` FROM cmds where id='.$p['id'],0);
			if(!$v)F1348('פקודה לא קיימת');
			$v["time"]=strtotime('1970-01-01 '.$v['time']);					
			switch($v['type']){
				case 0:
					$v['timec']=$v['time'];
					break;
				case 3:
					$v['timec']=$v['time']-DAY;//date('H:i',$v['time']-DAY);
					break;
				case 4:
					$v['timec']=$v['time']+DAY;
					break;
				case 1://before																
					$v['timec']=F122A($ds,$v['zman'])-$v['time'];
					//if($t<$d)$t=$d;							
					break;
				case 2://after
					$v['timec']=F122A($ds,$v['zman'])+$v['time'];
					//if($t>$d+(24*60*60)-1)$t=$d+(24*60*60)-60;
					//$v['timec']=date('H:i',$t);							
					break;	
			}					
			$v['time']=date('H:i',$v['time']);			
			$v['timec']=date('H:i',$v['timec']);
			$res['data']=$v;
			break;
		case "matcon_update":
		case "matcon_del_cmd":
			if($a=="matcon_update"){
				if(F1355($p,"id")&&$p['id']){
					F11CE(array("cmd"=>"upd","id"=>$p["id"],"q"=>"cmds","data"=>$p["data"]));
				}
				else{
					F11CE(array("cmd"=>"add","q"=>"cmds","data"=>$p["data"]));
				}			
			}
			else{//matcon_del cmds
				if(!$p['id'])F1348('parameter missing');
				F1377("delete from cmds where id=".$p['id']);
			}
		//not break
		/*case "day_matcons":
			if(!$p['date'])F1348('parameter missing');
			$g=F137D('select id from grps',1);
			$r=array();
			foreach($g as $k){
				$h=0;
				$v=F1233(strtotime($p['date']),$k['id'],$h);
				$r[]=array('grp'=>$k['id'],'m'=>$v,'hand'=>$h);
			};
			$res['data']=$r;
			break;*/
		case "matcons":
			if(!$p['date']||!$p['switch']||!F1355($p,'grp'))F1348('parameter missing');
			$m=F137D("select * from matcons where grp=".$p['grp']." and not disable order by ord=0,ord,name",1);
			$r=array();
			$d=strtotime($p['date']);
			$ds=date('Y-m-d',$d);
			foreach($m as $k){
				$b=F137D('SELECT matcon,`switch`,id,`type`,zman,days,`action`,time,`disable` FROM cmds where switch='.$p['switch'].' and matcon='.$k['id'],1);
				//foreach($b as &$v)$v['time']=date('H:i',strtotime($v['time']));
				foreach($b as &$v){					
					$v["time"]=strtotime('1970-01-01 '.$v['time']);					
					switch($v['type']){
						case 0:
							$v['timec']=$d+$v['time'];
							break;
						case 3:
							$v['timec']=($d+$v['time'])-DAY;//date('H:i',$v['time']-DAY);
							break;
						case 4:
							$v['timec']=($d+$v['time'])+DAY;
							break;
						case 1://before																
							$v['timec']=F122A($ds,$v['zman'])-$v['time'];
							//if($t<$d)$t=$d;							
							break;
						case 2://after
							$v['timec']=F122A($ds,$v['zman'])+$v['time'];
							//if($t>$d+(24*60*60)-1)$t=$d+(24*60*60)-60;
							//$v['timec']=date('H:i',$t);							
							break;	
					}					
					$v['time']=date('H:i',$v['time']);
					//$v['time']=date('Y-m-d ',$v['time']);
				}
				unset($v);				
				usort($b,'sort_by_timec');	
				foreach($b as &$v){
					$v['timea']=$v['timec'];
					$v['timec']=date('H:i',$v['timec']);
				}				
				unset($v);
				$r[]=array('id'=>$k['id'],'color'=>$k['color'],'name'=>$k['name'],'cmds'=>$b);
			}
			$res['data']=$r;
			
			break;
		case "month":
			global $hul;
			if(!$p['date']||!F1355($p,'cal_type')||!F1355($p,'grp'))F1348('parameter missing');
			$bs1=F137D("select id from zmanim order by id",1);
			$bs=array();
			foreach($bs1 as $k)$bs[]=$k["id"];
			$hebd=explode(",","א,ב,ג,ד,ה,ו,ז,ח,ט,י,יא,יב,יג,יד,טו,טז,יז,יח,יט,כ,כא,כב,כג,כד,כה,כו,כז,כח,כט,ל");
			$hebm=explode(",","תשרי,חשון,כסלו,טבת,שבט,אדר א,אדר ב,ניסן,אייר,סיון,תמוז,אב,אלול");
			$gregm=explode(",","ינואר,פברואר,מרץ,אפריל,מאי,יוני,יולי,אוגוסט,ספטבמבר,אוקטובר,נובמבר,דצמבר");			
			$b=strtotime($p['date']);
			$jd=F12FA($b);
			$x=cal_from_jd($jd,$p['cal_type']==0?CAL_GREGORIAN:CAL_JEWISH);
			$res['dum']=$x;
			switch($p['seek']){
				case 'nexty':
					$x['year']++;
					if($p['cal_type']==1 && !F12EA($x['year'])&&$x['month']==7)$x['month']++;
					break;
				case 'prevy':
					$x['year']--;
					if($p['cal_type']==1 && !F12EA($x['year'])&&$x['month']==7)$x['month']++;
					break;
				case 'nextm':
					$x['month']++;
					if($p['cal_type']==1 && !F12EA($x['year'])&&$x['month']==7)$x['month']++;
					if(($p['cal_type']==0 && $x['month']>12)||($p['cal_type']==1 && $x['month']>13)){$x['month']=1;$x['year']++;}
					break;
				case 'prevm':					
					$x['month']--;
					if($p['cal_type']==1 && !F12EA($x['year'])&&$x['month']==7)$x['month']--;
					if($x['month']<1){$x['month']=$p['cal_type']==0?12:13;$x['year']--;}
					break;
			}
			$jd=cal_to_jd($p['cal_type']==0?CAL_GREGORIAN:CAL_JEWISH,$x['month'],1,$x['year']);
			$b=F12F2($jd);
			$res['date']=date('Y-m-d',$b);
			
			$w=F12DE($b);
			$r=array();						
			for($i=1;$i<$w;$i++)$r[]=array("hday"=>"");
			$m=cal_from_jd(F12FA($b),$p['cal_type']==0?CAL_GREGORIAN:CAL_JEWISH);
			if($p['cal_type']==1){
				$mm=explode(" ",F12C0($b));
				array_shift($mm);
				$res['month']=join(' ',$mm);
			}
			else $res['month']=$gregm[$m['month']-1].' '.$m['year'];
			
			$m=$m['month'];			
			while(count($r)<37){				
				$b=F12F2($jd);
				$x0=cal_from_jd($jd,CAL_GREGORIAN);				
				$x1=cal_from_jd($jd,CAL_JEWISH);
				
				if(($m==$x0['month'] && $p['cal_type']==0)||($m==$x1['month'] && $p['cal_type']==1)){
					$d=array('wd'=>F12DE($b),'hyear'=>F11B6($x1['year']),"hday"=>$hebd[$x1['day']-1],"hmon"=>$hebm[$x1['month']-1],"gday"=>$x0['day'],"gmon"=>$gregm[$x0['month']-1],"day1"=>"","day2"=>F1322($x1['year'],$x1['month'],$x1['day'],F12DE($b),$htype));
					if($x1['month'] == 6){						
						if(!F12EA($x1['year'])) //$Y != 0 && $Y != 3 && $Y != 6 &&  $Y != 8 &&  $Y != 11 &&   $Y != 14 && $Y != 17);
						 $d['hmon']='אדר'; 	 						 
					}		
					if(F12DE($b)==7)$d['day1']=F1316($b,0);
					$h=false;
					$d['matcon']=(string)F1233($b,$p['grp'],$h);
					$d['hand']=$h?'1':'0';
					$d['times']=array();
					$d['date']=date('Y-m-d',$b);
					$d['smr']=F120A($d['date'])?"1":"0";
					foreach($bs as $k)$d['times'][]=array("t"=>date('H:i',F122A($d['date'],$k)),"b"=>$k);
					//$d["color"]="ffeecc";
				}
				else{
					$d=array("hday"=>"");
				}
				//				,"matcon"=>"1","times"=>array(),
				$r[]=$d;
				$jd++;				
			}
			//global $matcons;
			//$r['dd']=$matcons;
			$res['data']=$r;
			break;
		case "rst":
			if(!$p['q'])F1348('parameter missing');
			$f=F1355($p,'f')?$p['f']:'*';
			$res['data']=F137D("select $f from ".$p['q'],1);
			break;
		case "upd":
			if(!$p['q']||!$p['id']||!$p['data'])F1348('parameter missing');
			$q=$p['data'];
			foreach($q as $k=>&$v)$v='`'.$k.'`="'.F136C($v).'"';
			unset($v);
			$q=join(',',$q);
			//$res['q']=$q;
			F1377('update `'.$p['q'].'` set '.$q.' where id='.$p['id']);
			$res['data']=F137D('select * from `'.$p['q'].'` where id='.$p['id']);
			break;
		case "add":
			if(!$p['q']||!$p['data'])F1348('parameter missing');
			$q=$p['data'];
			foreach($q as $k=>&$v)$v='"'.F136C($v).'"';
			unset($v);
			$f='`'.join('`,`',array_keys($q)).'`';
			$q=join(',',$q);
			F1377('insert into `'.$p['q'].'`('.$f.') values('.$q.')');
			$q=F137D('select last_insert_id() as a');
			$q=$q['a'];
			$res['data']=F137D('select * from `'.$p['q'].'` where id='.$q);
			//F1377('update `'.$p['q'].'` set '.$q.' where id='.$p['id']);
			break;
		case "del":
			if(!$p['q']||!$p['id'])F1348('parameter missing');			
			F1377('delete from `'.$p['q'].'` where id='.$p['id']);					
			break;
		case "del_matcon":
			if(!$p['id'])F1348('parameter missing');			
			$m=$p['id'];
			F1377("delete from cmds where matcon=$m");	
			F1377("delete from days where matcon=$m");	
			F1377("delete from rules where action=0 and params=$m");								
			F1377("delete from matcons where id=$m");								
			break;
		default:
			F1348("cmd not specific");
	};
	global $dbg;
	if($dbg)$res['debug']=print_r($dbg,1);
	return $res;
}

/*
header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header ("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header ("Cache-Control: no-cache, must-revalidate");
header ("Pragma: no-cache");
header("content-type: application/json");

session_start();    
*/


try{		
	$r=mysql_pconnect(SERVER,USER,PASS);//,false,1);	
	if(!$r)F1348('Connect data base Err:'.mysql_error());	
	if(DATABASE)mysql_select_db(DATABASE);
	F1377('set names utf8');
	$p=json_decode($HTTP_RAW_POST_DATA,1);
	if(!$p) F1348("request data is invalid: request'".$HTTP_RAW_POST_DATA."'");	
	$b=$p;
	
	$p=F11CE($p);
	
	//file_put_contents('test1',json_encode($p,JSON_UNESCAPED_UNICODE));
	file_put_contents('lastcmd.log',print_r(array('req'=>$b,'res'=>$p),1));
	//file_put_contents('all.log',"\n".date('Y-m-d H:i:s')."\n\n".json_encode(array('req'=>$b,'res'=>$p),JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT)."\n",FILE_APPEND);	
	echo json_encode($p,JSON_UNESCAPED_UNICODE);
	
}
catch(Exception $e){
	F1332(Array($e->getMessage(),$p,$HTTP_RAW_POST_DATA,$_GET),'local_err.log',1);
	sleep(1);
	echo json_encode(array('result'=>'error','error'=>$e->getMessage(),'request'=>$HTTP_RAW_POST_DATA));
}

