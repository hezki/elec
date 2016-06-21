function check_tbl(e,t){if(_exists[e+"/"+t])return!0;try{var r=wait.forMethod(elas,"request",{method:"get",path:e+"/_mapping"});return r.error?!1:(_exists[r[e]]=1,r[e]&&r[e][t]?(_exists[e+"/"+t]=1,!0):!1)}catch(o){return console.log(o),!1}}function check_db(e){if(_exists[e])return!0;try{var t=wait.forMethod(elas,"request",{method:"get",path:e+"/_mapping"});return t.error?!1:(_exists[t[e]]=1,!0)}catch(r){return console.log(r),!1}}function init_tbl(e,t,r){var o={};return o[t]={properties:{}},o[t].properties=r,wait.forMethod(elas,"request",{method:"put",path:e+"/"+t+"/_mapping",body:o})}function init_db(e){var t={settings:{number_of_shards:1,number_of_replicas:0,analysis:{char_filter:{char_heb_fil:{type:"mapping",mappings:["'=>","!=>","/=>","\\\\\\\\=>",'"=>',"_=> "]},pnx:{type:"mapping",mappings:["ה=>א","ו=>ב","י=>א","ך=>ח","כ=>ח","ס=>ז","ע=>א","ף=>ב","פ=>ב","ץ=>ז","צ=>ז","ק=>ח","ש=>ז","ת=>ד"]}},filter:{rem_rt:{type:"Pattern_replace",pattern:"[^א-תְ-ֹֻּׁׂ]",replacement:""},heb_fil:{type:"word_delimiter",catenate_all:!0,generate_word_parts:!1,preserve_original:!0,type_table:["ְ=>SUBWORD_DELIM","ֱ=>SUBWORD_DELIM","ֲ=>SUBWORD_DELIM","ֳ=>SUBWORD_DELIM","ִ=>SUBWORD_DELIM","ֵ=>SUBWORD_DELIM","ֶ=>SUBWORD_DELIM","ַ=>SUBWORD_DELIM","ָ=>SUBWORD_DELIM","ֹ=>SUBWORD_DELIM","ׂ=>SUBWORD_DELIM","ׁ=>SUBWORD_DELIM","ּ=>SUBWORD_DELIM","ֻ=>SUBWORD_DELIM"]}},tokenizer:{heb_tok:{type:"pattern",pattern:"[^א-ת\"'ְ-ֹֻּׁׂ]+"}},analyzer:{hebrew:{tokenizer:"heb_tok"},hebrew1:{tokenizer:"standard",char_filter:["char_heb_fil"]},hebrew_pnx:{tokenizer:"heb_tok",filter:["rem_rt","heb_fil"],char_filter:["pnx"]}}}},mappings:{}};return t.mappings._default_={dynamic_templates:[{store_generic:{match:"*",mapping:{store:!0,index:"no"}}}]},wait.forMethod(elas,"request",{method:"put",path:e,body:t})}var options={host:"server",port:9200,protocol:"http",logging1:{logger:"",level:"debug",events:["request","response"],formatters:{request:"curl"}}},elas=require("simple-elasticsearch").client.create(options),path=require("path"),wait=require("wait.for"),extend=require("extend"),Fiber=require("fibers"),_exists={};module.exports=function(e,t){var r={initTbl:function(t,o){function n(){return check_tbl(e,t)?(console.log("elas".blue.bold+" - "+e.yellow.bold+"."+t.yellow.bold+" is initaling"),void("log_log"!=t&&r.initTbl("log_log"))):(check_db(e)||(console.log("elas".blue.bold+" init DB "+e.yellow.bold),console.log(init_db(e))),console.log("elas".blue.bold+" init "+e.yellow.bold+"."+t.yellow.bold),console.log(init_tbl(e,t,o)),void("log_log"!=t&&r.init("log_log")))}Fiber.current?n():wait.launchFiber(n)},add:function(t,o,n){if(!check_tbl(e,t))throw new Error("tbl not init");var i=r.get(t,o);if(i)throw new Error('key "'+o+'" exists');return wait.forMethod(elas.core,"index",{index:e,type:t,id:o,doc:n})},del:function(t,r){if(!check_tbl(e,t))throw new Error("tbl not init");throw new Error("not impled")},upd:function(t,o,n){if(!check_tbl(e,t))throw new Error("tbl not init");var i=r.get(t,o,1);return console.log(i),wait.forMethod(elas.core,"index",{index:e,type:"log_log",id:t+"."+o+"."+i._version,doc:i._source}),wait.forMethod(elas.core,"index",{index:e,type:t,id:o,doc:n})},get:function(t,r,o){if(!check_tbl(e,t))throw new Error("tbl not init");var n=function(e,t){elas.core.get(e,function(e,r,n,i){t(e,o?i:r)})};return wait["for"](n,{index:e,type:t,id:r})},find:function(t,r,o){var n=extend(!0,{},{fn:"fn",max_near:5,orderd:!1,use_reg:1,only_id:"",hl:{b:'<span class="hit">',a:"</span>",nf:15,fs:250}},o),i="[משהוכלבד]{0,6}[מהתאינו]{0,2}@[תינומהאןם]{0,3}",l="[אהויע]{0,2}",a=[];for(var s in r){var _=r[s];_&&(_=_.split(" "),_.forEach(function(e){if(e){var t=[],r={};if(n.use_reg){for(var o=e.split(""),_=1;_<o.length;_++){var p=o[_];"*"==p?t.push("[א-ת]*"):/[אהוי]/.test(p)||t.push(p)}r[s]=i.replace("@",o.join(l)),a.push({span_regex:r})}else r[s]=e.replace(/\*/g,"[א-ת]*"),e.indexOf("*")>-1?a.push({span_regex:r}):a.push({span_term:r})}}))}if(a.length){a={span_near:{clauses:a,slop:n.max_near,in_order:n.orderd,collect_payloads:!0}},n.only_id&&(a={bool:{must:[a,{term:{_id:n.only_id}}]}});var _={fields:[n.fn],from:n.from?n.from:0,size:n.size?n.size:1e3,query:a};_.highlight={pre_tags:n.hl.b,post_tags:n.hl.a,fields:{}};for(var s in r)_.highlight.fields[s]={type:"plain",fragment_size:n.hl.fs,number_of_fragments:n.hl.nf};var p=function(e,t){elas.core.search(e,function(e,r,o,n){t(e,r)})};return console.log("Q:",util.inspect(_,{depth:null})),wait["for"](p,{index:e,type:t,search:_})}return console.log("query is empyt ",t,_),null}};return r};
//# sourceMappingURL=elas.js.map