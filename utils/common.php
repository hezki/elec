<?php
//error_reporting(0);
//define('TMPPATH','/tmp/');
//define('YESPATH','/var/yes/');
//define('SERVER','localhost');
//define('USER','root');
define('SHELAIMIM',1);
define('CHASERIM',2);
define('KESIDRAN',3);
define('TMPPATH','./');
define('YESPATH','./');
//define('TMPPATH','../tmp/');
//define('YESPATH','../yes/');
define('SERVER','localhost');
define('USER','root');
define('PASS','power001');
define('DATABASE','electric');
define('ACT_ON',1);
define('ACT_OFF',2);
define('DAY',24*60*60);
$grp=0;
$hul=0;
//date_default_timezone_set('UTC');
//date_default_timezone_set('Etc/GMT+2');
//date_default_tiezone_set(date_default_timezone_get());
function F11D9(){
	$s=func_get_args();
	if(!function_exists('init_zmanim'))return;
	$f=fopen('c:\\hezki\\test1.log','a+');
	if($f){
		if(count($s)>1)$s=print_r($s,true);					
		else{
			$s=$s[0];
			if(is_array($s))$s=print_r($s,true);					
		}
		fwrite($f,$s."\n"); 				
		fclose($f);
	}
}

function F11E1(){
	global $zmanim;
	if($zmanim===null){
		$q=F137D('select id,base,name,igul,`add` from zmanim',1);
		$r=array();
		foreach($q as $v)$r[$v['id']]=$v;
		$zmanim=$r;
	}
}
if(function_exists('init_zmanim')){
	$f=fopen('c:\\hezki\\test1.log','w');
	fclose($f);
}
/*function F11E9($base,$add,$dec){
	$x=getdate($base);
	if($add){
		$x1=getdate($add);
		$x['hours']+=$x1['hours'];
		$x['minutes']+=$x1['minutes'];
		if($x['minutes']>59){$x['hours']++;$x['minutes']-=60;}
		if($x['hours']>23)return mktime(23,59,59);
		return mktime($x['hours'],$x['minutes'],0);		
	}
	if($dec){
		$x1=getdate($dec);
		$x['hours']-=$x1['hours'];
		$x['minutes']-=$x1['minutes'];
		if($x['minutes']<0){$x['hours']--;$x['minutes']+=60;}
		if($x['hours']<0)return mktime(0,0,0);
		return mktime($x['hours'],$x['minutes'],0);		
	}
	return $base;
}*/

function F11F7(){
	global $global;
	if($global===null){
		$r=F137D('select name,val from global',1);
		$glb=array();
		foreach($r as $v)$glb[$v['name']]=$v['val'];
		$global=$glb;
	}
}

function F11FC(){
	global $summer;
	if($summer===null){
		$q=F137D('select * from summer',1);
		$r=array();
		//foreach($q as $v)$r[$v['year']]=array(strtotime($v['begin']),strtotime($v['end']));
		foreach($q as $v)$r[(string)$v['year']]=array(date('Y-m-d H:i:s',strtotime($v['begin'])-1),$v['end']);
		$summer=$r;
	}
}

$cmds=null;
$matcons=null;
$zmanim=null;
$switchs=null;
$grps=null;
$global=null;
$times=array();
$summer=null;

function F120A($ds){
	global $summer;
	F11FC();
	if(!is_string($ds))$ds=date('Y-m-d H:i:s',$ds);
	
	$y=substr($ds,0,4);
	if(!F1355($summer,$y)){		
		F1377("insert into summer(year) values($y)");
		$summer[$y]=array(0,0);
	}
	$sum=$summer[substr($ds,0,4)];	
	return ($ds>$sum[0] && $ds<$sum[1]);
}
function F1218($ds){
	global $zmanim,$times,$global,$summer;
	F11E1();
	F11FC();
	if(!F1355($times,$ds))F122A($ds,0);
	return $times[$ds];	
}
function F1225($ds){
	global $times;
	if(!F1355($times,$ds))F122A($ds,0);
	return $times[$ds];	
}
function F122A($ds,$id){
	global $zmanim,$times,$global,$summer;
	F11E1();
	F11FC();
	if(!F1355($times,$ds)){
		F11F7();
		$d=strtotime($ds);
		$x=date('Y-n',$d);		
		$fn=YESPATH."years/t$x.dat";
		if(!file_exists($fn)){
			$v=getdate($d);
			F1278($v['year'],$v['mon'],$global['קו_רוחב'],$global['קו_אורך'],$global['גובה']);
		}
		$f=fopen($fn,'rb');
		while($s=fread($f,356)){//3 =y m d 1=fe 117*2=times 1=ff		
			//print_r(array(strlen($s),ord($s{3}),ord($s{355})));			
			if(strlen($s)==356 && ord($s{3})==254 && ord($s{355})==255){				
				$r=array();
				$cd='20'.str_pad(ord($s{0}),2,'0',STR_PAD_LEFT).'-'.str_pad(ord($s{1})+1,2,'0',STR_PAD_LEFT).'-'.str_pad(ord($s{2}),2,'0',STR_PAD_LEFT);
				$sum=$summer[substr($cd,0,4)];
				$is_sum=$cd>$sum[0] && $cd<$sum[1];
				for($i=0;$i<117;$i++){
					$c=($i*3)+4;
					$v=strtotime('20'.str_pad(ord($s{0}),2,'0',STR_PAD_LEFT).'-'.(ord($s{1})+1).'-'.ord($s{2}).' '. ord($s{$c++}).':'.ord($s{$c++}).':'.ord($s{$c++}));
					if($is_sum)$v+=(60*60);
					$r[]=$v;
				}
				$times[$cd]=$r;
			}
		}			
		fclose($f);				
	}
	if(!F1355($times,$ds)){F1348('err calc time '.$ds);}
	
	if(F1355($zmanim,$id)){
		$v=$zmanim[$id];		
		$r=$times[$ds][$v['base']-1];
		$x=getdate($r);
		if($v['add'])$x['minutes']+=$v['add'];
		switch($v['igul']){
			case 0:
				if($x['seconds']>30)$x['minutes']++;
				break;
			case 2:
				if($x['seconds']>1)$x['minutes']++;
				break;
		}		
	}else return mktime(0,0,0,0,0,0);
	//$sum=$summer[substr($ds,0,4)];
	//if($ds>$sum[0] && $ds<$sum[1])$x['hours']++;
	//if($x['hours']>23)return mktime(0,0,0);
	$r=mktime($x['hours'],$x['minutes'],0,$x['mon'],$x['mday'],$x['year']);	
	return $r;
}
$dmatcons=array();
function F1233($d,$grp,&$is_hand){
	global $matcons,$dmatcons;
	$x=getdate($d);	
	if($matcons==null || !F1355($matcons,$x['year'])){
		$matcons[$x['year']]=F128D($x['year']);
	}	
	$ds=$x['year'].$x['mon'].$x['mday'];
	//echo date("Y-m-d",$d);	
	if(!F1355($dmatcons,$ds)){
		if(F1355($dmatcons,$ds.'.'.$grp)){		
			$x=$dmatcons[$ds.'.'.$grp];
			$is_hand=$x[1];
			return $x[0];
		}	
		$q=F137D("select grp as g,matcon as m from days where matcon>0 and date='".date("Y-m-d",$d)."'",1);
		foreach($q as $k){
			$dmatcons[$ds]=1;
			$dmatcons[$ds.'.'.$k['g']]=array($k['m'],1);	
		}
		if(F1355($dmatcons,$ds.'.'.$grp)){
			$x=$dmatcons[$ds.'.'.$grp];
			$is_hand=$x[1];		
			return $x[0];
		}
	}else{
		if(F1355($dmatcons,$ds.'.'.$grp)){
			$x=$dmatcons[$ds.'.'.$grp];
			$is_hand=$x[1];		
			return $x[0];
		}
	}
	//if(count($q)){	
    //		$is_hand=true;		
	//	return $q['matcon'];
	//}
	$is_hand=false;
	$x=$matcons[$x['year']][date('Y-m-d',$d)][$grp][0];
	$dmatcons[$ds]=1;
	return $x;
}

function F1242($d,$times_in_string=false,$recalc=true,$only_grp=-1){
	global $cmds,$matcons,$zmanim,$switchs,$grps;
	F11E1();
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
	
	$ds=date('Y-m-d',$d);	
	$d=strtotime($ds);
	$x=getdate($d);
	$dw=F12DE($d);	
	///F11D9($switchs);
	$r=array();	
	foreach($grps as $g1=>$g2){
		if($only_grp>-1 && $g1!=$only_grp)continue;
		$m=F1233($d,$g1,$hh);			
		//F11D9($ds.' matcon '.$m.' count('.count($cmds[$m]).')'.$g1.'-'.$g2);
		$m=F1365($cmds,$m);						
		if(is_array($m))foreach($m as &$v){		
			//F11D9('chk '.$v['id']);
			if(F1355($switchs,$v['switch']) && F12B4($dw,$v['days']) ){//check pail										
				switch((int)$v['type']){					
					case 3://day before						
					case 4://day after
					case 0://fixed;
						$t=$v['time'];												
						$t=strtotime($ds.' '.$t);
						if((int)$v['type']==3){
							if($v['action']!=ACT_OFF)continue;//not valid off at before, only on
							$t-=DAY;
							//if($t<$d-$half)$t=$d-$half;
						}
						else if((int)$v['type']==4){
							$t+=DAY;
							//if($t>$d+($half-1))$t=($d+$half)-60;					
						}
						//if($times_in_string)$t=date('Y-m-d H:i:s',$t);
						break;
					case 1://before
						$t=(F122A($ds,$v['zman']))-strtotime('1970-01-01 '.$v['time']);
						//if($t<$d-$half)$t=$d-$half;
						//if($times_in_string)$t=date('Y-m-d H:i:s',$t);
						break;
					case 2://after
						$t=(F122A($ds,$v['zman']))+strtotime('1970-01-01 '.$v['time']);
						//if($t>$d+($half-1))$t=($d+$half)-60;					
						//if($times_in_string)$t=date('Y-m-d H:i:s',$t);
						break;
					default:
						F1348('type not valid');
				}
				$r[]=array('h'=>'0','t'=>$t,'s'=>$v['switch'],'o'=>$switchs[$v['switch']],'a'=>$v['action'],'id'=>$v['id'],'m'=>$v['matcon'],'g'=>''.$g1);			
				//F11D9('add');
			}
			//else F11D9('remove'.F1355($switchs,$v['switch']).','.F12B4($dw,$v['days']));
		}	
		unset($v);
	}
	//1=on,2=off
	foreach($r as $k)if($k['t']>$d+DAY){						
			if($k['a']==ACT_OFF){$k['t']=$d+DAY;$k['a']=(string)ACT_ON;$k['id']=(string)-$k['id']; $r[]=$k;}//off after day must on 
	}else if($k['t']<$d){						
			if($k['a']==ACT_ON){$k['t']=$d;$k['a']=(string)ACT_ON;$k['id']=(string)-$k['id']; $r[]=$k;}//off after day must on 
	}
	global $dbg;
    if($recalc){
		$b=F1242($d-DAY,false,false,$only_grp);				
		//disable bef;$a=F1242($d+DAY,false,false);		
		$s=array();		
		foreach($b as $k){
			if($k['t']>$d){
				$r[]=$k;
				if($k['a']==ACT_OFF){$k['t']=$d;$k['a']=(string)ACT_ON;$k['id']=(string)-$k['id']; $r[]=$k;}//off after day must on 
			}else if(F1365($k,'hard') && $k['end']>$d){
				$k['t']=$d;
				$r[]=$k;
			}
		}
		//disable bef;foreach($a as $k)if($k['t']<$d+DAY)$r[]=$k;										
	}	
	F1250($r,array('t','a'));	
	//if($recalc)F11D9(array('b'=>$b,'a'=>$a,'c'=>$r));
	//F11D9(array('ok'=>$r));
	/*
	$s=array();
	foreach($r as $k){
		if($k['t']<$d)$s[$k['s']]=array($k['a']==1?1:0,$k);			
	}		
	//$dbg=$r;
	$test=array();
	for($i=0;$i<count($r);$i++)if($r[$i]['o']==22){
		$r[$i]['t1']=date('Y-m-d H:i:s',$r[$i]['t']);
		$test[]=$r[$i];
	}
	//$dbg=$test;
	
	*/
	
	$rst=F137D('select hands from days where grp=0 and date="'.$ds.'"',0);
	if($rst){
		//ChromePhp::log($rst['hands']);
		$rst=json_decode($rst['hands'],1);
		
		if($rst){
			
			foreach($rst as $v){
				//if($only_grp && $switchs[$v['s']]['grp']!=$only_grp)continue;
				if(F1365($v,'r')){//range
					$tmp=array('hard'=>1,'id'=>$v['a'].'_1_'.$v['t'], 't'=>strtotime($ds.' '.$v['t']),'end'=>strtotime($ds.' '.$v['e']),'h'=>'1','s'=>$v['s'],'o'=>F1365($switchs,$v['s']),'a'=>$v['a'],'m'=>'','mn'=>'(חד פעמי)');
					if($tmp['t']>$tmp['end'])$tmp['end']+=DAY;
					
					$r[]=$tmp;
					/*$from=strtotime($ds.' '.$v['f']);
					$to=strtotime($ds.' '.$v['t']);
					$last=0;
					F1250($r,array('t','h','a'));
					for($i=0;$i<count($r);$i++)if($r[$i]['s']==$v['s']){
						if($r[$i]['t']>=$from && $r[$i]['t']<=$to){
							$last=$r[$i];
							$r[$i]=null;
						};
					};
					$r=array_filter($r);
					if($v['a']==ACT_ON){												
						$r[]=array('t'=>strtotime($ds.' '.$v['f']),'h'=>'1','s'=>$v['s'],'o'=>F1365($switchs,$v['s']),'a'=>ACT_ON,'mn'=>'(חד פעמי)');
						if($last && $last['a']==ACT_ON)	
							$r[]=$last;
						else 
							$r[]=array('t'=>strtotime($ds.' '.$v['t']),'h'=>'1','s'=>$v['s'],'o'=>F1365($switchs,$v['s']),'a'=>ACT_OFF,'mn'=>'(חד פעמי)');
					}else{
						$r[]=array('t'=>strtotime($ds.' '.$v['f']),'h'=>'1','s'=>$v['s'],'o'=>F1365($switchs,$v['s']),'a'=>ACT_OFF,'mn'=>'(חד פעמי)');
						if($last && $last['a']==ACT_ON){
							$last['t']=strtotime($ds.' '.$v['t']);
							$r[]=$last;
						}													
					}*/
				}else{
					$r[]=array('id'=>$v['a'].'_0_'.$v['t'],'t'=>strtotime($ds.' '.$v['t']),'h'=>'1','s'=>$v['s'],'o'=>F1365($switchs,$v['s']),'a'=>$v['a'],'m'=>'','mn'=>'(חד פעמי)');
				}
			}
		}
		F1250($r,array('s','t','h','a'));
	}
	
	if(1||$recalc){
		//for($i=0;$i<count($r);$i++)if($r[$i]['t']<$d||$r[$i]['t']>$d+DAY)$r[$i]=null;		
		$tmp= array();
		for($i=0;$i<count($r);$i++){
			if(F1365($r[$i],'hard')){
				if($i && $r[$i-1]['s']==$r[$i]['s'] && !F1365($r[$i-1],'hard'))$r[$i]['last']=$r[$i-1];
				$tmp[$r[$i]['s']][]=$r[$i];
			}
		}
		$hards=array();		
		foreach($tmp as $ta){
			F1250($ta,array('t'));
			for($hi=1;$hi<count($ta);$hi++){
				if($ta[$hi-1]['end']>$ta[$hi]['t'])$ta[$hi-1]['end']=$ta[$hi]['t'];
			}
			for($hi=0;$hi<count($ta);$hi++)$hards[]=$ta[$hi];
		};
		
		
		for($i=0;$i<count($r);$i++){
			//if($r[$i]['id']==7975)
			if(!F1365($r[$i],'hard')){
				for($hi=0;$hi<count($hards);$hi++){
					//ChromePhp::log('last',$r[$i]['t'],date('H:i',$hards[$hi]['t']),date('H:i',$hards[$hi]['end']));				
					if($hards[$hi]['s']==$r[$i]['s'] /*&& $hards[$hi]['a']==$r[$i]['a']*/ && $r[$i]['t']>=$hards[$hi]['t'] && $r[$i]['t']<=$hards[$hi]['end']){
						//ChromePhp::log('last',$ds,date('H:i',$r[$i]['t']),date('H:i',$hards[$hi]['t']),date('H:i',$hards[$hi]['end']));
						$hards[$hi]['last']=$r[$i];
						$r[$i]=null;
					}
				};
			};		
			if($r[$i] && $r[$i]['t']<$d){
				if($r[$i]['a']==ACT_OFF && F1365($r[$i],'hard'))$r[$i]['t']=$d;else $r[$i]=null;
			};
			if($recalc && $r[$i] && $r[$i]['t']>$d+DAY)$r[$i]=null;
		}		
		
		
		if($recalc)for($hi=0;$hi<count($hards);$hi++){
			$h=$hards[$hi];
			if($h['a']==ACT_ON && (!F1355($h,'last') || $h['last']['a']==ACT_OFF)){
				$r[]=array('id'=>$h['id'],'hard'=>1,'t'=>$h['end'],'h'=>'1','s'=>$h['s'],'o'=>$h['o'],'a'=>ACT_OFF,'m'=>'','mn'=>'(חד פעמי)');
			};
			if($h['a']==ACT_OFF && F1355($h,'last') && $h['last']['a']==ACT_ON){
				$h['last']['t']=$h['end'];
				$r[]=$h['last'];
			};
		}
		$r=array_filter($r);		
		F1250($r,array('t','h','a'));
	}
	if($recalc){
		for($i=0;$i<count($r);$i++){
			if($r[$i]['t']>$d+DAY)$r[$i]['t']=$d+DAY;
		};
	};
	/*
	$resort=false;
	//if($recalc)
	foreach($s as $k){
		if($k[0]){
			$resort=true;
			$k1=$k[1];
			$k1['t']=$d;
			$r[]=$k1;
		}
	}
	
	if($resort)F1250($r,'t');
	*/
	
	if($times_in_string)for($i=0;$i<count($r);$i++)$r[$i]['t']=date('Y-m-d H:i:s',$r[$i]['t']);	
	//if($recalc)file_put_contents('c:\\hezki\\test.log',print_r(array($a,$b,$d,$s,$r),1));
	return $r;
}

function F1250(&$array, $props) 
{ 
    if(!is_array($props)) 
        $props = array($props);         
    usort($array, function($a, $b) use ($props) { 
        foreach($props as $prop) 
        { 
            if($a[$prop] != $b[$prop])             
             return $a[$prop] > $b[$prop] ? 1 : -1;                 
        } 
        return  0; //if all props equal        
    });    
} 


function F1259($a, $b){
	if ($a['t'] == $b['t']) {
		return 0;
	}
	return ($a['t'] < $b['t']) ? -1 : 1;
}


function F1269(){//delete all old times
	$c=glob(YESPATH.'years/t*');
	foreach($c as $k)unlink($k);
}

function F1278($y,$m,$rochav,$orech,$gova){
	//F1348(YESPATH);
	$max= cal_days_in_month(CAL_GREGORIAN,$m,$y);
	$r=$m-1;	
	$x="java -jar \"".YESPATH."\"go.jar $rochav $orech $gova $y $r 1 \"".YESPATH."years/t$y-$m.dat\" $max";	
		//echo $x;
	//$b=time();
	$res=array();
	$s=exec($x,$res);
	//$c=time()-$b;
	//F1348("sec:".$c);
	//F1348($s);
	file_put_contents(YESPATH.'last_calc.log',print_r(array($x,$res),1));
	if(strpos($s,'Exception')!==FALSE)F1348($s);
	return true;	
}
/*function F127D(){//delete all old times
	$c=glob('/var/yes/years/y*');
	foreach($c as $k) F12A1($k);
}*/

function F128D($y){
	$b=F12FA(strtotime($y.'-01-01'));	
	$e=F12FA(strtotime(($y+1).'-01-01'));	
	$r=array();	
	$i=$b;	
	while($i<$e){		
		$c=F12F2($i);$x=cal_from_jd($i,CAL_JEWISH);$x1=getdate($c);
		//echo date('Y-m-d',($c))."\n";
		$r[]=array('d'=>date('Y-m-d',$c),'w'=>F12DE($c),'gm'=>$x1['mon'],'gd'=>$x1['mday'],'hm'=>$x['month'],'hd'=>$x['day'],'m'=>0,'s'=>0);				
		$i=$i+1;
	}	
	global $grps;
	if(!$grps){
		$g=F137D('select id,name from grps',1);
		$grps=array(0=>'בסיסי');
		foreach($g as $v)$grps[$v['id']]=$v['name'];		
	}	
	$d=array();
	foreach($grps as $g1=>$g2){				
		
		$q=F137D('select * from rules where action=0 and params>0 and grp='.$g1.' order by ord',1);
		$ye=cal_from_jd($b+150,CAL_JEWISH);
		$ly=F12EA(F1365($ye,'year'));		
		foreach($q as &$v){
			if($v['cal_type']==1){
				if(!$ly && $v['begin_m']==6){$v['begin_m']=5;$v['begin_d']=35;}			
				if(!$ly && $v['end_m']==6){$v['end_m']=5;$v['end_d']=35;}			
				if(!$ly && $v['begin_m']==7)$v['begin_m']=6;
				if(!$ly && $v['end_m']==7)$v['end_m']=6;
				
			}
		}
		unset($v);
		foreach($q as $v){
			for($i=0;$i<count($r);$i++){
					if($v['len']==0 && (($v['cal_type']==0 && F12AF($r[$i]['gm'],$r[$i]['gd'],$v['begin_m'],$v['end_m'],$v['begin_d'],$v['end_d']))||
					   ($v['cal_type']==1 && F12AF($r[$i]['hm'],$r[$i]['hd'],$v['begin_m'],$v['end_m'],$v['begin_d'],$v['end_d'])))){
					   
					if(F12B4($r[$i]['w'],$v['days'])){$r[$i]['m']=$v['params'];$r[$i]['s']=$v['id'];}
				}
				if($v['len']>0 && (($v['cal_type']==0 && $r[$i]['gm']==$v['begin_m'] && $r[$i]['gd']==$v['begin_d'])||($v['cal_type']==1 && $r[$i]['hm']==$v['begin_m'] && $r[$i]['hd']==$v['begin_d']))){
					for($b=$i;$b<$i+$v['len'] && $b<count($r);$b++)if(F12B4($r[$b]['w'],$v['days'])){$r[$b]['m']=$v['params'];$r[$b]['s']=$v['id'];}
					break;
				}			
			}
		}				
		foreach($r as &$v){
			$d[$v['d']][$g1]=array((int)$v['m'],(int)$v['s']);
			$v['m']=0;$v['s']=0;
		}
		unset($v);
	}
	//file_put_contents('c:\\hezki\\test1.log',print_r($r,1));
	return $d;
	//if(file_exists("/var/yes/years/y$y.dat"))F12A1("/var/yes/years/y$y.dat");
	//file_put_contents("/var/yes/years/y$y.dat",serialize($d));	
};

/*function F1296($y,$m){
	$b=F12FA(strtotime($y.'-'.$m.'-01'));
	$y1=$y;$m1=$m+1;if($m1==13){$y1++;$m1=1;}	
	$e=F12FA(strtotime($y1.'-'.$m1.'-01'))-1;
	$r=array();
	for($i=$b;$i<$e;$i++){
		$c=F12F2($i);$x=cal_from_jd($i,CAL_JEWISH);		
		$h=F1322($x['year'],$x['month'],$x['day'],F12DE($c),$t);
		$r[]=array($x['year'],$x['month'],$x['day'],F12DE($c),$t,F12C0($c),F1316($c),$h);		
		echo F12C0($c)."\n";
	}
	file_put_contents("/var/yes/years/d$y-$m.dat",serialize($r));
}*/

//help function -----------------------------------------------------------------------------------------------------------------------
function F12A1($f){
	rename($f,YESPATH.'years/bak/'.basename($f).'.'.date('Y m d H i s'));
}

function F12AF($vm,$vd,$fm,$tm,$fd,$td){
	//print_r(array($vm,$vd,$fm,$tm,$fd,$td));
	if($vm<$fm||$vm>$tm)return false;
	if($vm==$fm && $vd<$fd)return false;
	if($vm==$tm && $vd>$td)return false;
	return true;
}
$d_tbl=array(0, 1, 2, 4, 8, 16, 32, 64);
function F12B4($d,$arr){global $d_tbl;return ((int)$arr & $d_tbl[$d])>0;}



function F12C0($d){	
	if(!is_numeric($d))	$e=strtotime($d);else $e=$d;	
	$jdDate =F12FA($e);
	$H =explode('/',jdtojewish($jdDate));
	$Y=(int)$H[2] %19;
	$H=(int)$H[0];
	$hd=mb_convert_encoding( jdtojewish( $jdDate, true ), "UTF-8", "ISO-8859-8");
	//$hd=iconv( jdtojewish( $jdDate, true ), "UTF-8", "ISO-8859-8");
	if($H == 6){
	 if($Y != 0 && $Y != 3 && $Y != 6 &&  $Y != 8 &&  $Y != 11 &&   $Y != 14 && $Y != 17);
 	 else $hd=str_replace('אדר', 'אדר א', $hd); 	 
	}	
	return $hd;
}

$par=array("[ללא]"
,"בראשית"
,"נח"
,"לך-לך"
,"וירא"
,"חיי שרה"
,"תולדות"
,"ויצא"
,"וישלח"
,"וישב"
,"מיקץ"
,"ויגש"
,"ויחי"
,"שמות"
,"וארא"
,"בא"
,"בשלח"
,"יתרו"
,"משפטים"
,"תרומה"
,"תצוה"
,"כי תשא"
,"ויקהל"
,"פקודי"
,"ויקרא"
,"צו"
,"שמיני"
,"תזריע"
,"מצורע"
,"אחרי מות"
,"קדושים"
,"אמור"
,"בהר"
,"בחקותי"
,"במדבר"
,"נשא"
,"בהעלותך"
,"שלח"
,"קורח"
,"חוקת"
,"בלק"
,"פנחס"
,"מטות"
,"מסעי"
,"דברים"
,"ואתחנן"
,"עקב"
,"ראה"
,"שופטים"
,"כי תצא"
,"כי תבא"
,"נצבים"
,"וילך"
,"האזינו"
,"וזאת הברכה"
,"ויקהל-פקודי"
,"תזריע-מצורע"
,"אחרי מות-קדושים"
,"בהר-בחקותי"
,"חוקת-בלק"
,"מטות-מסעי"
,"נצבים-וילך");
function F12CA($id){
	global $par;
	if(!$id)return;
	return $par[$id];
}

function F12D2($size_of_year, $new_year_dw){
   $year_types = array(1, 0, 0, 2, 0, 3, 4, 0, 5, 0, 6, 7, 8, 0, 9, 10, 0, 11, 0, 0, 12, 0, 13, 14);       
    $offset = ($new_year_dw + 1) / 2;
    $offset = $offset + (4 * floor((($size_of_year % 10) - 3) + (($size_of_year / 10) - 35)));    
    return $year_types[$offset - 1];
}
function F12DE($d){return date('w',$d)+1;}
function F12EA($nYearH){    
    $nYearInCycle = $nYearH % 19;
    return $nYearInCycle == 3 || $nYearInCycle == 6 || $nYearInCycle == 8 || $nYearInCycle == 11 ||$nYearInCycle == 14 || $nYearInCycle == 17 || $nYearInCycle == 0;
}
function F12F2($d){return ($d - 2440587.5) * 86400;}
function F12FA($d){return ceil(($d / 86400) + 2440587.5);}


function F1316($d){
	global $hul;
	$Sat_short = array( -1, 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
			17, 18, 19, 20, 53, 23, 24, -1, 25, 54, 55, 30, 56, 33, 34, 35, 36, 37, 38, 39, 40, 58, 43, 44, 45, 46, 47,
			48, 49, 50 );
	$Sat_long = array( -1, 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
			17, 18, 19, 20, 53, 23, 24, -1, 25, 54, 55, 30, 56, 33, 34, 35, 36, 37, 38, 39, 40, 58, 43, 44, 45, 46, 47,
			48, 49, 59 );
	$Mon_short = array( 51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
			18, 19, 20, 53, 23, 24, -1, 25, 54, 55, 30, 56, 33, 34, 35, 36, 37, 38, 39, 40, 58, 43, 44, 45, 46, 47, 48,
			49, 59 );

	$Mon_long = array( 51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 53, 23, 24, -1, 25, 54, 55,
			30, 56, 33, -1, 34, 35, 36, 37, 57, 40, 58, 43, 44, 45, 46, 47, 48, 49, 59 );

	$Thu_normal = array( 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
			18, 19, 20, 53, 23, 24, -1, -1, 25, 54, 55, 30, 56, 33, 34, 35, 36, 37, 38, 39, 40, 58, 43, 44, 45, 46, 47,
			48, 49, 50 );
	$Thu_normal_Israel = array( 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
			16, 17, 18, 19, 20, 53, 23, 24, -1, 25, 54, 55, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 58, 43, 44, 45,
			46, 47, 48, 49, 50 );

	$Thu_long = array( 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
			18, 19, 20, 21, 22, 23, 24, -1, 25, 54, 55, 30, 56, 33, 34, 35, 36, 37, 38, 39, 40, 58, 43, 44, 45, 46, 47,
			48, 49, 50 );

	$Sat_short_leap = array( -1, 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
			16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 58,
			43, 44, 45, 46, 47, 48, 49, 59 );

	$Sat_long_leap = array( -1, 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
			16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, 28, 29, 30, 31, 32, 33, -1, 34, 35, 36, 37, 57, 40, 58,
			43, 44, 45, 46, 47, 48, 49, 59 );

	$Mon_short_leap = array( 51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
			17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, 28, 29, 30, 31, 32, 33, -1, 34, 35, 36, 37, 57, 40, 58, 43,
			44, 45, 46, 47, 48, 49, 59 );
	$Mon_short_leap_Israel = array( 51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
			15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
			58, 43, 44, 45, 46, 47, 48, 49, 59 );

	$Mon_long_leap = array( 51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
			17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, -1, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 58,
			43, 44, 45, 46, 47, 48, 49, 50 );
	$Mon_long_leap_Israel = array( 51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
			15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
			41, 42, 43, 44, 45, 46, 47, 48, 49, 50 );

	$Thu_short_leap = array( 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
			17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, -1, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
			43, 44, 45, 46, 47, 48, 49, 50 );

	$Thu_long_leap = array( 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
			17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, -1, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
			43, 44, 45, 46, 47, 48, 49, 59 );
	$jd=F12FA($d);		
	$x=cal_from_jd($jd,CAL_JEWISH);		  
	$hd_year=$x['year'];$hd_mon=$x['month'];$hd_day=$x['day'];
	$leap=F12EA($hd_year);
	if (F12DE($d) != 7) return F12CA(0);    
	$rhJD = jewishtojd(1,1,$hd_year);
	$rhNextJD = jewishtojd(1,1,$hd_year + 1);
	$rh=jdtounix($rhJD);  
	$hd_new_year_dw = F12DE($rh);
	$day_of_year=$rhNextJD - $rhJD;
	$isCheshvanLong=$day_of_year % 10 == 5;
    $isKislevShort=$day_of_year % 10 == 3;
	$inIsrael=$hul?0:1;
	
	$kvia =($isCheshvanLong && !$isKislevShort)?SHELAIMIM:((!$isCheshvanLong && $isKislevShort)?CHASERIM:KESIDRAN);

		
	//$week = (((getAbsDate() - roshHashana.getAbsDate()) - (7 - hd_new_year_dw)) / 7);
	$week = ((($jd - $rhJD) - (7 - $hd_new_year_dw)) / 7);
	// determine appropriate array
	trigger_error('kvia:'.$kvia.',new:'.$hd_new_year_dw);
	if (!$leap) {
		switch ($hd_new_year_dw) {
			case 7: // RH was on a Saturday
				if ($kvia == CHASERIM) {
					$a = $Sat_short;
				} else if ($kvia == SHELAIMIM) {
					$a = $Sat_long;
				}
				break;
			case 2: // RH was on a Monday
				if ($kvia == CHASERIM) {
					$a = $Mon_short;
				} else if ($kvia == SHELAIMIM) {
					$a = $inIsrael ? $Mon_short : $Mon_long;
				}
				break;
			case 3: // RH was on a Tuesday
				if ($kvia == KESIDRAN) {
					$a = $inIsrael ? $Mon_short : $Mon_long;
				}
				break;
			case 5: // RH was on a Thursday
				if ($kvia == KESIDRAN) {
					$a = $inIsrael ? $Thu_normal_Israel : $Thu_normal;
				} else if ($kvia == SHELAIMIM) {
					$a = $Thu_long;
				}
				break;
		}
	} else { // if leap year
		switch ($hd_new_year_dw) {
			case 7: // RH was on a Sat
				if ($kvia == CHASERIM) {
					$a = $Sat_short_leap;
				} else if ($kvia == SHELAIMIM) {
					$a = $inIsrael ? $Sat_short_leap : $Sat_long_leap;
				}
				break;
			case 2: // RH was on a Mon
				if ($kvia == CHASERIM) {
					$a = $inIsrael ? $Mon_short_leap_Israel : $Mon_short_leap;
				} else if ($kvia == SHELAIMIM) {
					$a = $inIsrael ? $Mon_long_leap_Israel : $Mon_long_leap;
				}
				break;
			case 3: // RH was on a Tue
				if ($kvia == KESIDRAN) {
					$a = $inIsrael ? $Mon_long_leap_Israel : $Mon_long_leap;
				}
				break;
			case 5: // RH was on a Thu
				if ($kvia == CHASERIM) {
					$a = $Thu_short_leap;
				} else if ($kvia == SHELAIMIM) {
					$a = $Thu_long_leap;
				}
				break;
		}
	}	
	if (!$a)F1348("Unable to claculate the parsha. No index array matched any of the known types for the date: ".$dt);
	$a=$a[$week];
	return F12CA($a+1);
}
	






/*function F1316($d, $inHuztLararez = false){    
  $jd=F12FA($d);		
  $x=cal_from_jd($jd,CAL_JEWISH);		  
  $hd_year=$x['year'];$hd_mon=$x['month'];$hd_day=$x['day'];
  
  $join_flags = array(array( array(1, 1, 1, 1, 0, 1, 1),array(1, 1, 1, 1, 0, 1, 0), array(1, 1, 1, 1, 0, 1, 1), array(1, 1, 1, 0, 0, 1, 0), array(1, 1, 1, 1, 0, 1, 1), array(0, 1, 1, 1, 0, 1, 0),  array(1, 1, 1, 1, 0, 1, 1),           array(0, 0, 0, 0, 0, 1, 1), array(0, 0, 0, 0, 0, 0, 0), array(0, 0, 0, 0, 0, 1, 1), array(0, 0, 0, 0, 0, 0, 0), array(0, 0, 0, 0, 0, 0, 0),array(0, 0, 0, 0, 0, 0, 1), array(0, 0, 0, 0, 0, 1, 1)), 0);
  $join_flags[1] = array(array(1, 1, 1, 1, 0, 1, 1),array(1, 1, 1, 1, 0, 1, 0), array(1, 1, 1, 1, 1, 1, 1), array(1, 1, 1, 1, 0, 1, 0), array(1, 1, 1, 1, 1, 1, 1), array(0, 1, 1, 1, 0, 1, 0), array(1, 1, 1, 1, 0, 1, 1), array(0, 0, 0, 0, 1, 1, 1), array(0, 0, 0, 0, 0, 0, 0), array(0, 0, 0, 0, 0, 1, 1), array(0, 0, 0, 0, 0, 1, 0), array(0, 0, 0, 0, 0, 1, 0), array(0, 0, 0, 0, 0, 0, 1), array(0, 0, 0, 0, 1, 1, 1)) ;      
  if ($hd_mon == 1 && $hd_day == 22) return F12CA(54);          
  if (F12DE($d) != 7) return F12CA(0);    
  $rhJD = jewishtojd(1,1,$hd_year);
  $rhNextJD = jewishtojd(1,1,$hd_year + 1);
  $rh=jdtounix($rhJD);  
  $hd_new_year_dw = F12DE($rh);
  
  $hd_year_type = F12D2($rhNextJD-$rhJD, F12DE($hd_new_year_dw));
  //print_r(array($hd_new_year_dw,$rhNextJD-$rhJD,$hd_year_type));
  $hd_days = floor(($d-$rh) / 86400);
  $hd_weeks = floor(((($hd_days - 1) + ($hd_new_year_dw - 1)) / 7)) + 1;
  
  if ($hd_mon == 7)
        $hd_mon = 14;
  else if($hd_mon == 6){
        if(F12EA($hd_year)) $hd_mon = 13;
  }
  else if($hd_mon > 6)
     $hd_mon = $hd_mon - 1;        
  switch($hd_weeks){
    case 1:
        if ($hd_new_year_dw == 7)return F12CA(0);
        if (($hd_new_year_dw == 2) || ($hd_new_year_dw == 3)) return F12CA(52);
        return F12CA(53);        
    case 2:
        if ($hd_new_year_dw == 5) return F12CA(0);
        return F12CA(53);        
    case 3:
        return F12CA(0);
    case 4:
        if ($hd_new_year_dw == 7)return F12CA(54);
		return F12CA(1);        
    default:        
        $reading = $hd_weeks - 3;
        if ($hd_new_year_dw == 7) $reading--;               
        if ($reading < 22) return F12CA($reading);         
        if (($hd_mon == 7) && ($hd_day > 14) && ($hd_day < 22)) return F12CA(0);
        if ((($hd_mon == 7) && ($hd_day > 21)) || ($hd_mon > 7 && $hd_mon < 13)) $reading --;
        if (($inHuztLararez) && ($hd_mon < 13) && (($hd_mon > 9) || ($hd_mon == 9 && $hd_day >= 7)) && (F12DE($rhNext) == 7)){
            if($hd_mon == 9 && $hd_day == 7) return F12CA(0);
            $reading--;            
        }
        $diaspora = 0;
        if ($inHuztLararez) $diaspora = 1;
        if ($join_flags[$diaspora][$hd_year_type - 1][0] && ($reading >= 22)){
            if ($reading == 22)return F12CA(55);
            $reading++;            
        }
        if ($join_flags[$diaspora][$hd_year_type - 1][1] && ($reading >= 27)){
            if ($reading == 27) return F12CA(56);                
            $reading++;            
        }
        if ($join_flags[$diaspora][$hd_year_type - 1][2] && ($reading >= 29)){
            if ($reading == 29) return F12CA(57);                
			$reading++;
        }
        if ($join_flags[$diaspora][$hd_year_type - 1][3] && ($reading >= 32)){
            if ($reading == 32) return F12CA(58);
            $reading++;
        }        
        if ($join_flags[$diaspora][$hd_year_type - 1][4] && ($reading >= 39)){
            if ($reading == 39) return F12CA(59);
            $reading++;
		}
        if ($join_flags[$diaspora][$hd_year_type - 1][5] && ($reading >= 42)){
            if ($reading == 42) return F12CA(60);
            $reading++;
        }
        if ($join_flags[$diaspora][$hd_year_type - 1][6] && ($reading >= 51)){
            if ($reading == 51)return F12CA(61);
            $reading++;
		}
	}
    return F12CA($reading);
}
*/
function F1322($y,$m,$d,$weekday,&$t){//'hagtype:1=sabot,2=erev sabot,3=zom,4=special day    
	global $hul;
    switch($m){
        case 1:
            switch($d){
                case 1:
					$t=1;
                    return "א ראש השנה";                    
                case 2:
					$t=1;
                    return "ב ראש השנה";                    
                case 3:
                    if ($weekday < 6){
                      $t=3;return "צום גדליה";
                    }
					break;
                case 4:
                    if ($weekday == 1){
						$t=3;	
						return "צום גדליה";
                    }
					break;
                case 9:
					$t=2;
                    return "ערב יום כיפור";                    
                case 10:
					$t=1;
                    return "יום כיפור";
                case 14:
					$t=2;
                    return "ערב סוכות";                    
                case 15:
					$t=1;
                    return "סוכות";                    
                case 16:
					if($hul) {
						$t=1;
						return "סוכות";
					}
				case 17:
				case 18:
				case 19:
				case 20:
					$t=4;
                    return "חול המועד";                    
                case 21:
					$t=2;
                    return "הושענא רבא";                    
                case 22:
					$t=1;
                    return $hul?"שמיני עצרת":"שמחת תורה";
				case 23:
					if($hul){
						$t=1;
						return "שמחת תורה";
					};
             }
			 break;
        case 3:
            switch($d){
                case 24:
					$t=4;
                    return "ערב חנוכה";                    
				case 25:
				case 26:
				case 27:
				case 28:
				case 29:
				case 30:
					$t=4;
                    return "חנוכה";
			}
            break;
        case 4:
			switch($d){
				case 1:
					$t=4;
					return "חנוכה";
				case 2:
					if(jewishtojd(3,30,$y)!=jewishtojd(4,1,$y)){            
						$t=4;
						return "חנוכה";
                    }
					break;
                case 9:
                    if ($weekday == 6){
						$t=3;
                       return "עשרה בטבת";
                    }
					break;
                case 10:
                    if ($weekday < 7){
						$t=3;
                       return "עשרה בטבת";
					}
					break;
			}
			break;            
        case 5:
            if ($d == 15 ){$t=4; return "טו בשבט";}
			break;
		case 6:
			if(F12EA($y))break;
        case 7:
            switch($d){
                case 11:
                    if($weekday == 5){
						$t=3;
                       return "תענית אסתר";
                    }
					break;
                case 12:
                    if ($weekday == 5){
						$t=3;
                        return "תענית אסתר";
                    }
					break;
                case 13:
                    if($weekday < 6){
						$t=3;
                       return "תענית אסתר";
                    }
					break;
                case 14:
					$t=4;
                    return "פורים דפרזים";                    
                case 15:
					$t=4;
                    return "פורים דמוקפים";
                }
			break;            
        case 8:
            switch($d){
                case 13:
					$t=4;
                    return "ערב בדיקת חמץ";                    
                case 14:
					$t=2;
                    return "ערב פסח";                    
                case 15:
					$t=1;
                    return "פסח";                   
                case 16:
					if($hul){
						$t=1;
						return "פסח";
					};
				case 17:
				case 18:
				case 19:
					$t=4;
                    return "חול המועד";                    
                case 20:
					$t=2;
                    return "ערב שביעי של פסח";                    
                case 21:
					$t=1;
                    return "שביעי של פסח";
				case 22:
					if($hul){
						$t=1;
						return "שביעי של פסח";
					};
                }
			break;            
        case 9:
            if ($d == 14){
				$t=4;
                return "פסח שני";                
            }
			break;
        case 10:
            if ($d == 5){
				$t=2;
                return "ערב שבועות";
			}
            if ($d == 6){
				$t=1;
                return "שבועות";
            }
			if ($d == 7 && $hul){
				$t=1;
                return "שבועות";
			}
            break;
        case 11:
            switch($d){
                //case 15:
				case 18:
                   if ($weekday == 1){
					  $t=3;
                      return "י\"ז בתמוז";
                    }
					break;
                case 17:
                    if ($weekday < 6){
					  $t=3;	
                      return "י\"ז בתמוז";
                    }
					break;
			}
			break;
        case 12:
            if ($d == 9 && $weekday < 6){
				$t=3;
                return "תשעה באב";
			}
            if ($d == 10 && $weekday == 1){
				$t=3;
                return "תשעה באב";
             }
			 break;
        case 13:
            if ($d == 15){$t=4; return "ט\"ו באב";}
            if ($d == 29){
				$t=2;
                return "ערב ראש השנה";
			}
	}
}

function F1332($s,$fn='local_error.log',$no_trace=true,$dump=false){	

	$f=fopen(TMPPATH.$fn,file_exists(TMPPATH.$fn)?'a+':'x+');
	if($f){fwrite($f,date('d/m/y H:i:s ',F1341())."\t".F1365($_SERVER,"REMOTE_ADDR").":".F1365($_SERVER,'REQUEST_URI')."\n");						
		if(is_object($s)||is_array($s))$s="Object Error:\n".print_r($s,true);			
		if($no_trace){fwrite($f,$s."\n\n");	
		}else{fwrite($f,$s."\n---------------------------------------------------------\nbacktrace:"); 	
			fwrite($f,$print_r(debug_backtrace(),true) );
			fwrite($f,"\n---------------------------------------------------------\n");}
		fclose($f);
	}
}
function F1341(){
	$t=time();
	//$t+=(60*60);
	//$t+=(60*60);
	return $t;
}
function F1348($e){throw new Exception($e);}
function F1355(&$arr,$k){if(!is_array($arr))return false; return array_key_exists($k,$arr);}
function F1365($arr,$k,$not_ex_value=null){return F1355($arr,$k)? $arr[$k]:$not_ex_value;}	
function F136C($s){return mysql_real_escape_string($s);}

function F1377($q){
	$c=func_get_args();
	array_shift($c);
	for($i=0;$i<count($c);$i++)$c[$i]=F136C($c[$i]);
	array_unshift($c,$q);
	$q=@call_user_func_array('sprintf',$c);		
	if(!$q)F1348("printf arg err:\n".print_r($c,true));		
	//if($q!='set names utf8')F1332($q,'sql.log');
	$r=mysql_unbuffered_query($q);
	//if(function_exists('init_zmanim'))F1332($q,'sql.log');
	if(!$r){
		F1332('Query Error: '.mysql_error(),'sql.log');
		F1348('Query Error: '.mysql_error()."\nQuery: ".$q);
	}
}
	
function F137D($q,$all=false){		
	$r=mysql_query($q);
	//if(function_exists('init_zmanim'))F1332($q,'sql.log');
	if(!$r){
		F1332('Query Error: '.mysql_error(),'sql.log');
		F1348('Query Error: '.mysql_error()."\nQuery:".$q);
	}
	$res=array();
	while($w=mysql_fetch_assoc($r)){
		if(!$all)return $w;
		$res[]=$w;
	}
	return $res;
}

function F138D(){	
	global $cmds,$matcons,$zmanim,$switchs,$global,$times,$summer,$grps;
	$cmds=null;
	$matcons=null;
	$zmanim=null;
	$switchs=null;
	$global=null;
	$grps=null;
	$times=array();
	$summer=null;
	$s=file_get_contents('master.ini');
	$s=explode("\n",$s);
	$sw=array();
	$cards=array();
	foreach($s as $v)if($v && $v{0}!='#' && $v{0}!='\''){
		$v=explode(',',trim($v));
		$begin=(int)$v[0];
		for($i=$begin;$i<=(int)$v[1];$i++)$sw[$i]=array('src'=>$i,'stt'=>0,'com'=>$v[2],'card'=>$v[3],'out'=>$i-$begin);//status,com,card,out
		$cards[$v[2].'|'.$v[3]]='0';
	}		
	$t=F1341();	
	//echo date('Y-m-d H:i:s',$t);
	$c=F1242($t);
	$glob=array();	
	$max=F137D('select max(`out`) as m from switchs',0);
	$max=isset($max['m'])?$max['m']+1:1;
	for($i=0;$i<$max;$i++)$glob[$i]='?';
	$q=F137D('select * from switchs where locked and not disable',1);
	foreach($q as $k){
		$sw[(int)$k['out']]['stt']=$k['lock_status']?1:0;
	}
	foreach($c as $k)if($k['t']<=$t)$sw[(int)$k['o']]['stt']=$k['a']==ACT_ON?1:0;	
	$errs=array();	
	
	foreach($sw as $k=> &$x){
		if(count($x)>1){			
			$glob[$k]=$x['stt'];
			$cards[$x['com'].'|'.$x['card']]{$x['out']}=$x['stt'];
		}else{
			//$glob[$k]='?';
			$errs[]=$k;
		}
	}	
	unset($x);
	$s='';
	$max=0;
	//foreach($glob as $k=>$x)if($k>$max)$max=$k;
	//for($i=1;$i<=$max;$i++)if(!F1355($glob,$i))$glob[$i]='?';
	
	foreach($cards as $k=>$x){
		$x=strrev(str_replace(' ','0',$x));		
		$s.=$k.'|'.$x."\n";
	}	
	unset($x);
	$glob=join('',$glob);
	file_put_contents('global.dat',date('Y-m-d H:i:s',$t)."\t".$glob);	
	file_put_contents('elec.dat',$s);	
	file_put_contents('elec.err',join("\n",$errs));	
	return $s;
}


