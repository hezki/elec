function init(){function t(t){if(t.dirty){var e=t.bak;delete t.bak;for(var s in e)t[s]=e[s];delete t.dirty}}function e(t){var e,s=[],a=$$.rsts.select_date;t.forEach(function(t,a){!e&&t.date&&(e=t),a=a/7>>0,s[a]||(s[a]=[]),s[a].push(t)}),s.last().length=7,a.set("weeks",s),a.set("date",e.date),a.set("cal_date",0==a.data.cal_type?e.gmon+" "+e.date.split("-")[0]:e.hmon+" "+e.hyear)}window.scale=function(t,e,s){var a=$(t);s?$(t).css({transformOrigin:"100% 0%",transform:" scale("+e+","+s+")"}).attr("scY",s).attr("scX",e):a.css({transformOrigin:"100% 100%",transform:" scaleX("+e+")"}).attr("scX",e)},$$.on("window.ready.after",function(){$.fn.select2.defaults.set("allowClear",!0),$.fn.select2.defaults.set("templateResult",function(t){return t.element&&"<"==t.element.innerHTML.substr(0,1)?$(t.element.innerHTML):t.text}),$.fn.select2.defaults.set("templateSelection",function(t){return t.element&&"<"==t.element.innerHTML.substr(0,1)?$(t.element.innerHTML):t.text});var t;register_pop("cmd_type_pop","נוסחא"),void 0!==document.onmousewheel?t="onmousewheel":void 0!==document.onwheel&&(t="onwheel");var e=1;$(".area")[0][t]=function(t){var s=window.event||t;t.preventDefault();var a=s.detail?-120*s.detail:s.wheelDelta;a=a/120/20,a=e*(1+a),1>a&&(a=1),e=a,$(".day-stt").css("zoom",a),$(".new-tbl").css("zoom",a),$(".area-days-in td,.area-data-in td").width(120*a),$(".area-names-in td,.area-data-in td,.name-in").height(25*a),$(".area-data-in,.area-days-in").width(840*a)};var a,i;window.go_edit=function(t,e,a,i){s.sid=t,s.mid=e,s.edit_date=a,$$.rsts.edit.update(),i&&($(i).scrollintoview().removeClass("flash"),setTimeout(function(){$(i).addClass("flash")},1)),s.edit_mode="edit"},$(document).on("dblclick click",".part,.start,.end,.on",function(t){if(!("edit"!=s.edit_mode&&"dblclick"!=t.type||a&&(Math.abs(a.x-t.clientX)>5||Math.abs(a.y-t.clientY)>5))){Yes.stop(t);var e,i,r;if($(this).hasClass("part")){var n=$(this),d=$$.rsts.stt,c=d.get(this._ractive.keypath),o=n.attr("day");e=d.data.days[o].matcon.mc.id,r=c.id}else{var n=$(this),d=$$.rsts.stt,c=d.get(this._ractive.keypath),o=n.closest(".day-stt").attr("day");$(this).hasClass("start")||$(this).hasClass("on")?(i=c.m_b?"#cmd_"+c.id_b:"#tmp_"+c.id_b,e=c.m_b||s.mid):(i=c.m_e?"#cmd_"+c.id_e:"#tmp_"+c.id_e,e=c.m_e||s.mid),r=$(this).closest("tr").attr("sid")}go_edit(r,e,o,i)}}),$(document).on("click",".day-stt",function(t){}),$(document).on("click",".start,.end,.on",function(t){}),$(document).on("click",".area",function(){}),$(".area").mousedown(function(t){a={down:1,x:t.clientX,y:t.clientY,top:$(".area").scrollTop(),left:$(".area").scrollLeft()},Yes.stop(t)}).mousemove(function(t){if(t.which&&a&&a.down){var e=t.clientX-a.x,s=t.clientY-a.y;$(".area").scrollTop(a.top-s);var r=a.left-e;$(".area").scrollLeft(r),e=$(".area").scrollLeft()-r,Math.abs(e)>150&&Math.abs(s)<15&&(clearTimeout(i),i=setTimeout(function(t){a=null,$(".new-tbl").css({"transform-origin":"fnext"==t?"100% 0":"0 0",transform:"scaleX(0)"}),setTimeout(function(){$(".new-tbl").css({"transform-origin":"fnext"!=t?"100% 0":"0 0"})},50),$$.emit("goto",t),$("body").click()},100,a.left-e<0?"fnext":"fprev")),Yes.stop(t)}}).mouseup(function(t){a&&(a.down=0),Yes.stop(t)})}),$$.on("toggle_btn",function(){if(Yes.stop(event),s.sw){var t={localy:1,cmd:"hand_cmds",type:"add",s:s.sw.id,date:"now"};t["1"==s.sw.status?"off":"on"]=t.date,Yes.server(t),$$.emit("refresh"),s.emit("refresh_cmds_tmp")}}),$$.on("reset_matcon",function(){s.sw&&s.mid&&bootbox.confirm("לאפס את כל הפקודות?",function(t){t&&(Yes.server({localy:1,cmd:"reset",type:"matcon",s:s.sid,m:s.mid}),s.all.cmds=s.all.cmds.filter(function(t){return t.matcon!=s.mid||t["switch"]!=s.sid}),s.emit("refresh_cmds"))})}),$$.on("new_cmd",function(){s.sw&&s.mid&&(Yes.stop(event),$$.emit("dlg.new_cmd.show",{times:"",daysc:[1,1,1,1,1,1,1]}))}),$$.on("go_new_cmd",function(){var t=$$.rsts.new_cmd.data,e=t.times,a=s.mid,i=s.sid,r=t.daysc,n=parseInt(r.join(""),2),d={matcon:a,"switch":i,id:"",type:0,zman:0,days:n,action:1,time:"",disable:0,daysc:r,typec:"",timec:"",dirty:1};if(e){var c=[];e.replace(/ +([\-,])/g,"$1").replace(/([\-,]) +/g,"$1").replace(/ +/g,",").split(",").forEach(function(t){t.split("-").forEach(function(t,e){t&&(t=t.trim().replace(/\./g,":"),t.match(/^\d$/)&&(t+=":00"),t.match(/^\d\d$/)&&(t=t[0]+t[1]+":00"),t.match(/^\d\d\d$/)&&(t=t[0]+":"+t[1]+t[2]),t.match(/^\d\d\d\d$/)&&(t=t[0]+t[1]+":"+t[2]+t[3]),t.match(/^0\d/)&&(t=t.substr(1)),t.match(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/)||Yes.err("הזמן "+t+" אינו תקין"),t.match(/^\d:/)&&(t="0"+t),c.push($.extend(!0,{},d,{time:t,timec:t,typec:t,action:0==e?1:2})))})}),s.all.cmds.push.apply(s.all.cmds,c)}else s.all.cmds.push(d);$$.emit("dlg.new_cmd.close"),s.emit("refresh_cmds"),$("#cmd_").scrollintoview()}),$$.on("expr_update",function(t,e,a,i){i&&i.length&&(recalc_expr(i[0],s.edit_date),$$.rsts.edit.update())}),$$.on("tmp_select_all",function(t){var e=$("select",$(event.srcElement).closest(".input-group")),s=$("option",e);"all"==t?s.prop("selected","selected"):"none"==t&&s.removeAttr("selected"),e.trigger("change")}),$$.on("new_tmp",function(){s.sw&&(Yes.stop(event),$$.emit("dlg.new_tmp.show",{date:s.edit_date,start:"",end:"",switchs:s.switchsA,s:[s.sid]}))}),$$.on("go_new_tmp",function(){function t(t,e){var s=0;return t.replace(/ +([\-,])/g,"$1").replace(/([\-,]) +/g,"$1").replace(/ +/g,",").split(",").forEach(function(t){s||t.split("-").forEach(function(r,n){if(!s&&r)if(r=r.trim().replace(/\./g,":"),r.match(/^\d$/)&&(r+=":00"),r.match(/^\d\d$/)&&(r=r[0]+r[1]+":00"),r.match(/^\d\d\d$/)&&(r=r[0]+":"+r[1]+r[2]),r.match(/^\d\d\d\d$/)&&(r=r[0]+r[1]+":"+r[2]+r[3]),r.match(/^0\d/)&&(r=r.substr(1)),r.match(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/)||(s=1,Yes.err("הזמן "+r+" אינו תקין")),1==r.match(/:/g).length&&(r+=":00"),0==n)a[e].push($.extend({},i,{t:r}));else if(1==n){var d=a[e][a[e].length-1];d.r=1,d.e=r}else s=1,Yes.err("נתון שגוי: "+t)})}),s}if(Yes.stop(event),s.sw){var e=$$.rsts.new_tmp.data;0==e.s.length&&Yes.err("חובה לבחור לפחות מתג אחד");var a={on:[],off:[]},i={s:s.sw.id},r={};if(e.start){if(t(e.start,"on"))return;r.on="1_"+e.start}if(e.end){if(t(e.end,"off"))return;r.off="2_"+e.end}e.start||e.end||Yes.err("חובה לציין לפחות זמן אחד");var n=[];a.on.forEach(function(t){t.a=1,e.s.forEach(function(e){var s=$.extend({},t);s.s=e,s.src=r.on,n.push(s)})}),a.off.forEach(function(t){t.a=2,e.s.forEach(function(e){var s=$.extend({},t);s.s=e,s.src=r.off,n.push(s)})});var d={localy:1,cmd:"hand_cmds",type:"add",proc:n,date:e.date,src:e.src};Yes.server(d),$$.emit("dlg.new_tmp.close"),$$.emit("refresh"),s.emit("refresh_cmds_tmp")}}),$$.on("set_hand",function(){Yes.stop(),bootbox.confirm("האם אתה בטוח?",function(t){t&&(Yes.server({cmd:"set_hand",date:s.edit_date,grp:s.grp,matcon:s.mid}),s.emit("refresh"),s.emit("refresh_cmds"))})}),$$.on("set_auto",function(){Yes.stop(),Yes.server({cmd:"set_hand_auto",date:s.edit_date,grp:s.grp,matcon:s.mid}),s.emit("refresh"),s.emit("refresh_cmds")}),$$.on("set_lock",function(t){var e=s.sw,a={id:e.id};switch(t){case 0:a.locked=0;break;case 1:a.locked=1,a.lock_status=1;break;case 2:a.locked=1,a.lock_status=0}var i=Yes.server({cmd:"upd",type:"switchs",data:a,localy:1});_data.switchs[i.id]=$.extend(_data.switchs[i.id],i),s.emit("refresh")}),$$.on("today",function(){$$.emit("dlg.select_date.close"),s.date=new Date,s.emit("refresh"),s.edit_date=0,s.emit(".edit_date",0),go_edit(s.sid,0,0)}),$$.on("select_date",function(t){Yes.stop();var a=$$.rsts.select_date.data;a.cal_type=t;var i=Yes.server({cmd:"month",date:s.edit_date,cal_type:t,seek:"",grp:s.grp});$$.rsts.select_date.set("matcons",s.matcons),e(i),$$.emit("dlg.select_date.show")}),$$.on("cal_move",function(t){var a=$$.rsts.select_date.data,i=Yes.server({cmd:"month",date:a.date,cal_type:a.cal_type,seek:t,grp:s.grp});e(i)});var s,a;$$.on("window.ready.after",function(){$(".right").on("transitionend",function(t){0==$(this).width()&&$("#edit").hide()}),s=$$({}).on("init",function(){this.times={};var t=Yes.server({cmd:"init",localy:1});s=this,s.all={},s.cmds=[],s.edit_mode="status",s.all.switchsA=t.switchs,s.all.switchs=Yes.arr2obj(t.switchs,"id"),s.all.matconsA=t.matcons,s.all.matcons=Yes.arr2obj(t.matcons,"id"),t.grps.length<2&&$("#grps_list").hide(),s.grps=Yes.arr2obj(t.grps,"id"),s.grps_length=t.grps.length}).on("refresh_cmds",function(){this.all.cmds||(this.all.cmds=Yes.server({cmd:"rst",q:"cmds",f:"matcon,`switch`,id,`type`,zman,days,`action`,time,`disable`,share,last"})),this.all.cmds.forEach(function(t){t.daysc||(t.daysc=parseInt(parseInt(t.days).toString(2)).pad(7).split("")),void 0===t.last&&(t.last=t.action)});var t=this;if(this.cmds.length=0,$$.rsts.edit.update("cmds"),!this.m||!this.sw)return void $$.rsts.edit.update();var e=[];this.all.cmds.forEach(function(s){t.sw.id==s["switch"]&&t.m.id==s.matcon&&e.push(s)}),e.sort(function(t,e){if(s=e.daysc.filter(function(t){return"1"==t}).length-t.daysc.filter(function(t){return"1"==t}).length)return s;if(s=parseInt(t.days)-parseInt(e.days))return s;var s=(4==t.type?1:0)-(4==e.type?1:0);return s?s:t.timec==e.timec?0:t.timec>e.timec?1:-1}),t.cmds=e,$$.rsts.edit.update()}).on("refresh_cmds_tmp",function(){this.emit(".edit_date",this._last_dayi),this.emit("refresh")}).on(".sid",function(t){t?this.sw=this.switchs[t]:this.sw=void 0,this.emit("refresh_cmds")},function(){return this.sw?this.sw.id:""}).on(".m",function(){this.emit("refresh_cmds")}).on(".mid",function(t){t?this.m=this.matcons[t]:this.m=void 0},function(){return this.m?this.m.id:""}).on(".grp",function(t){t&&Yes.ls("def",$.extend(Yes.ls("def"),{grp:t})),s.matconsA=s.all.matconsA.filter(function(e){return e.grp==t}),s.matcons=Yes.arr2obj(s.matconsA,"id"),s.switchsA=s.all.switchsA.filter(function(e){return e.grp==t}),s.switchs=Yes.arr2obj(s.switchsA,"id"),this.emit("refresh"),setTimeout(function(){$("#grps .hide").removeClass("hide")},500)}).on(".edit_date",function(t){this._last_dayi=t,this.hfull_edit_date=s.days[t].hdate,this.gfull_edit_date=s.days[t].edate,this.day_matcon=s.days[t].matcon,this.mid=this.day_matcon.m,this.edit_date_str=s.days[t].edate;var e=s.days[t].edate,a={};Yes.server({localy:1,cmd:"list",type:"tmp",date:e}).forEach(function(t){a[t.s]||(a[t.s]=[]),t.ti=Yes.dt2str("hh:mm",Yes.str2dt(e+" "+t.t)),t.key=t.ti,t.id=t.a+"_"+(t.r?1:0)+"_"+t.t.replace(/:/g,"_"),t.r&&(t.xi=Yes.dt2str("hh:mm",Yes.str2dt(e+" "+t.e)),t.key=t.ti+" - "+t.xi),a[t.s].push(t)}),Object.keys(a).forEach(function(t){a[t]=a[t].sort(function(t,e){return t.ti>e.ti})}),this.tmp=a,e in this.times||(this.times[e]=Yes.server({cmd:"times_day",date:e})),this.all.cmds||(this.all.cmds=Yes.server({cmd:"rst",q:"cmds",f:"matcon,`switch`,id,`type`,zman,days,`action`,time,`disable`,share"})),this.units||(this.unitsA=Yes.server({localy:1,cmd:"list",type:"zmanim"}),this.units=Yes.arr2obj(this.unitsA,"id")),this.all.cmds.forEach(function(t){recalc_expr(t,e)}),$$.rsts.edit.update()},function(){return this.edit_date_str}).on(".edit_mode",function(t){switch(t){case"edit":s.edit_date||(s.edit_date=0),$$.rsts.grps.update(),$("#edit").show(),$(".left").css({width:"50%",minWidth:"500px"}),$(".right").css({width:"50%",minWidth:"500px"});break;case"status":$$.rsts.grps.update(),$(".left").css({width:"100%",minWidth:"auto"}),$(".right").css({width:"0%",minWidth:"auto"}),$("#edit select.select2").each(function(t,e){$(e).data().select2&&$(e).select2("close")})}}).on("refresh",function(){function t(t){console.time("update");var e=["","א","ב","ג","ד","ה","ו","ש"];t.days.forEach(function(t){t.hwd=e[t.wd];var s=t.matcon;s.grpc=_data.grps[s.grp],0==s.m?s.mc={name:"[ללא מתכון]"}:s.m in _data.matcons?s.mc=_data.matcons[s.m]:s.mc={name:"[מתכון לא קיים]"}}),t.data=t.data.filter(function(t){return t.grp==s.grp}),t.data.forEach(function(t){function e(t){return t=t.split(":"),t.length>2&&t.pop(),"0"==t[0].substr(0,1)&&(t[0]=t[0].substr(1)),t.join(":")}if("1"==t.locked&&"0"==t.lock_status)for(var a=1;8>a;a++)t["w"+a]=[];s.all.switchs[t.id].status=t.status;for(var a=1;8>a;a++)t["w"+a].forEach(function(t){t[0]<0&&(t[0]=0),t[1]<0&&(t[1]=0),t.r=100*(t[0]/120),t.w=100*((120-t[1]-t[0])/120),t.length>3&&(t.id_b=t[3].replace(/:/g,"_"),t.id_e=t[4].replace(/:/g,"_"),t.m_b=t[5],t.m_e=t[6],t.m_e||t.id_e||(t.m_e=t.m_b),t.m_b||t.id_b||(t.m_b=t.m_e));var s=t[2].split("-");s.length>1&&(t.f=e(s[0]),"00:00:00"==s[0]&&(t.f=""),t.t=e(s[1]),"23:59:59"!=s[1]&&"00:00:00"!=s[1]||(t.t=""))})}),s=$.extend(s,t),s.day_matcon=s.days[s._last_dayi?s._last_dayi:0].matcon,$(".cmds").show(),$$.rsts.edit.update(),$$.rsts.stt.update(),setTimeout(function(){$(".new-tbl").css({transform:"scaleX(1)"})},50),console.timeEnd("update")}if(clearTimeout(a),this.no_ref||(a=setTimeout(function(){s.emit("refresh")},6e5)),!this.date)return this.date=new Date;console.time("request");var e=Yes.server({cmd:"week",date:Yes.dt2str("yyyy-MM-dd",this.date),grp:s.grp});console.timeEnd("request"),t(e)}).on(".date",function(t){var e=this;setTimeout(function(){e.emit("refresh")},10)}).on("load_def",function(){1==this.grps_length&&(this.grp=this.grps[Object.keys(this.grps)[0]]);var t=Yes.ls("def");if(t){var e=this;t.grp&&(e.grp=t.grp),setTimeout(function(){e.edit_mode="edit"},1e3)}}).emit("init").emit("load_def"),window._data=s,$$.rsts.stt.data=s,$$.rsts.edit.data=s,$$.rsts.grps.data=s,$$.rsts.stt.update(),$$.rsts.edit.update(),$$.rsts.grps.update(),$("#edit_table").on("mouseover","tr",function(t){var e=$(this).attr("id");if(e&&(e=e.split("_")[1])){var e=$(".start[cid="+e+"],.end[cid="+e+"]").removeClass("flashed");setTimeout(function(){e.addClass("flashed")},1)}}),$(".tcal").on("click",".info",function(t){var e=this._ractive.root.get(this._ractive.keypath);$$.emit("dlg.select_date.close"),s.date=new Date($(this).attr("date")),s.emit("refresh"),s.edit_date=0,s.emit(".edit_date",0),go_edit(s.sid,e.matcon,0)}),$("#edit_table").on("click","span",function(t){$$.uniq.hide("cmd_type_pop");var e=$(this).attr("section")?$(this).attr("section"):$(this).closest("td").attr("section");if(e){Yes.stop(t);var s=t.target._ractive.root,a=t.target._ractive.keypath,i=s.get(a);i.dirty||(i.bak=$.extend(!0,{},i),i.dirty=1,s.update(a+".dirty")),$$.emit("edit_"+e,s,a,i)}}),$("#new_cmd").on("click",".fixed .btn",function(t){var e=event,s=$(e.target),a=e.target._ractive.root,i=a.get(e.target._ractive.keypath);s=s.attr("d"),s&&(i.daysc[s]=1==i.daysc[s]?0:1,a.update())})}),$$.on("del_tmp",function(){var t=event,e=t.target._ractive.root,a=t.target._ractive.keypath,i=e.get(a);Yes.server({localy:1,cmd:"hand_cmds",type:"del",date:s.edit_date,t:i.t,a:i.a,r:i.r,s:s.sid}),s.emit("refresh_cmds_tmp")}),$$.on("edit_tmp",function(){var t=event,e=t.target._ractive.root,a=t.target._ractive.keypath,i=e.get(a);if(Yes.stop(event),i.src){var r={};s.tmp.forEach(function(t){t.forEach(function(t){t.src==i.src&&(r[t.s]=1)})}),r=Object.keys(r);var n={date:s.edit_date,start:"",end:"",switchs:s.switchsA,s:r};1==i.a?n.start=i.src.split("_")[1]:2==i.a&&(n.end=i.src.split("_")[1]),n.src=i.src,$$.emit("dlg.new_tmp.show",n)}}),$$.on("cancel",function(){$$.uniq.hide("cmd_type_pop");var e=event,a=e.target._ractive.root,i=e.target._ractive.keypath,r=a.get(i);return r.id?(t(r),void a.update(i)):(s.all.cmds.splice(s.all.cmds.indexOf(r),1),void s.emit("refresh_cmds"))}),$$.on("del_cmd",function(){$$.uniq.hide("cmd_type_pop");var t=event,e=t.target._ractive.root,a=t.target._ractive.keypath,i=e.get(a);return i?i.id?void bootbox.confirm("אתה בטוח?",function(t){if(t){if(s.all.cmds.splice(s.all.cmds.indexOf(i),1),!i.id)return s.emit("refresh_cmds");var e=Yes.server({localy:1,cmd:"del",tbl:"cmds",id:i.id});e&&s.all.cmds.forEach(function(t){t.share==i.share&&(t.share=0)}),s.days.forEach(function(t){t.matcon.m==i.matcon&&(e=1)}),e&&s.emit("refresh"),s.emit("refresh_cmds")}}):(s.all.cmds.splice(s.all.cmds.indexOf(i),1),void s.emit("refresh_cmds")):void 0}),$$.on("save",function(){var t=event,e=t.target._ractive.root,a=t.target._ractive.keypath,i=e.get(a);"0"!=i.action&&(0==i.type||4==i.type?i.zman=0:0==i.zman&&Yes.err("חובה לבחור אירוע"),i.time||Yes.err("חובה לציין שעה")),$$.uniq.hide("cmd_type_pop"),"0"==i.action&&"0"!=i.bak.action&&(i.last=i.bak.action),delete i.bak,delete i.dirty;var r={type:i.type,zman:i.zman,action:i.action,time:i.time,days:i.days,disable:i.dsiable,last:i.last};i.id?r.id=i.id:r=$.extend(r,{matcon:i.matcon,"switch":i["switch"]});var n=Yes.server({localy:1,cmd:"upd",type:"cmds",data:r});if(n.share&&"0"!=n.share)delete s.all.cmds,s.emit("refresh_cmds"),s.emit("refresh"),s.emit(".edit_date",s._last_dayi);else{i=$.extend(i,n);var d=0;s.days.forEach(function(t){t.matcon.m==i.matcon&&(d=1)}),d&&s.emit("refresh"),recalc_expr(n,s.edit_date)}e.update(a),e.update(a+".dirty")}),$$.on("goto",function(t){var e=864e5,a=+s.date;switch(t){case"next":a+=e;break;case"prev":a-=e;break;case"fnext":a+=7*e;break;case"fprev":a-=7*e}s.date=new Date(a)}),$$.on("edit_days",function(t,e,s){var a=event,i=$(a.target);if(i.hasClass("reset_days")){s||(t=i[0]._ractive.root,s=t.data,"days"in s||(s.days=127));var r=0==s.days?1:0;return s.daysc.forEach(function(t,e){s.daysc[e]=r}),s.days=parseInt(s.daysc.join(""),2),void t.update(e)}i=i.attr("d"),i&&(s.daysc[i]=1==s.daysc[i]?0:1,s.days=parseInt(s.daysc.join(""),2),t.update(e))}),$$.on("edit_action",function(t,e,s){1==s.action?s.action=2:2==s.action?s.action=0:(s.action=void 0!=s.last?s.last:1,s.last=void 0),t.update(e)}),$$.on("share",function(){var t=event;Yes.stop(t);var e=t.target._ractive.root,a=t.target._ractive.keypath,i=e.get(a);if(i&&"0"!=i.action){var r=[],n=[];s.matconsA.forEach(function(t){t.id!=i.matcon&&r.push(t)}),s.switchsA.forEach(function(t){t.id!=i["switch"]&&n.push(t)}),$$.rsts.share.set({m:[],s:[],matcons:r,switchs:n,key:a,obj:i}),_refreshCombo($("#share"));var d=i.share&&"0"!=i.share?Yes.server({localy:1,cmd:"list",type:"share",grp:i.share}):void 0;$$.rsts.share.set({m:d?d.m:[],s:d?d.s:[],old:d}),$$.emit("dlg.share.show")}}),$$.on("go_share",function(){var t=$$.rsts.share.data,e=(t.old,t.obj),a=t.m,i=t.s;(a.length||i.length||"1"==e.share)&&(Yes.server({localy:1,cmd:"share",src:e.id,m:t.m,s:t.s}),delete s.all.cmds,s.emit("refresh"),s.emit("refresh_cmds"),s.emit(".edit_date",s._last_dayi),$$.emit("dlg.share.close"))}),$$.on("edit_type",function(t,e,s){var a=event.target;s&&"0"!=s.action&&($$.rsts.expr.set({cmd:s,times:_data.unitsA}),_refreshCombo($("#expr")),$$.uniq.show("cmd_type_pop",a,$("#expr"),"נוסחא"))})}function recalc_expr(t,e){var s=_data,a=s.times[e];t.daysc=parseInt(parseInt(t.days).toString(2)).pad(7).split("");var i=+Yes.str2dt("1970-01-01 "+t.time),r=Yes.dt2str("hh:mm",i);switch(t.typec=r,parseInt(t.type)){case 1:i=1e3*a[t.zman]-(i+ztc)-ztc,t.typec+=" לפני "+(s.units[t.zman]?s.units[t.zman].name:"?");break;case 2:i=1e3*a[t.zman]+(i+ztc)-ztc,t.typec+=" אחרי "+(s.units[t.zman]?s.units[t.zman].name:"?");break;case 3:i-=DAY,t.typec+=" אתמול";break;case 4:i+=DAY,t.typec+=" מחר"}t.timec=Yes.dt2str("hh:mm",i)}var DAY=864e5,ztc=60*new Date(0).getHours()*60*1e3;
//# sourceMappingURL=status.js.map