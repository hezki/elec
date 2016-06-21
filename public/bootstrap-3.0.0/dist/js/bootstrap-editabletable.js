/*global $, window*/
$.fn.yesEditTable = function (options) {
	'use strict';
	return $(this).each(function () {
					
		var buildDefaultOptions = function () {
				var opts = $.extend({}, $.fn.yesEditTable.defaultOptions);
				opts.editor = opts.editor.clone();
				return opts;
			},
			dir=window.getComputedStyle(this).direction,
			activeOptions = $.extend(buildDefaultOptions(), options),
			dataTable=activeOptions.dataTable,dataTableName=dataTable?'grid.'+dataTable.name:'',$$=window.$$?window.$$:activeOptions.$$,
			editEvent =activeOptions.editEvent,
			ARROW_LEFT = dir=="rtl"? 37:39, ARROW_UP = 38, ARROW_RIGHT = dir=="rtl"?39:37, ARROW_DOWN = 40, ENTER = 13, ESC = 27, TAB = 9,
			element = $(this),
			//editorOut activeOptions.editorOut?activeOptions.editorOut:$('<div class="input-group">
			editor = activeOptions.editor.css('position', 'absolute').hide().appendTo(element.parent()),
			editorIn = $('input',editor),
			active,
			showEditor = function (select) {
				active = element.find('td:focus');
				//console.log('set active',active[0]);
				if (active.length) {
					if(active.hasClass('edited')){
						//if(dataTable)active.removeClass('has-error').find('.tootip-err').remove();
						if($$ && dataTableName)$$.emit(dataTableName+'.error',active,'',dataTable);//clr err;
						if($$ && dataTable && (active.hasClass('grid_checkbox')||$$.emit(dataTableName+'.edit',active,dataTable.row(active.closest('tr')[0]).data())))return ;
						//if($$ && editEvent && $$.emit(dataTableName+'.edit',active,dataTable.row(active.closest('tr')[0]).data()))return;
						//if($$ && $$.emit(dataTableName+'.edit',active,dataTable.row(active.closest('tr')[0]).data()))return;
						var ract=active[0] && active[0]._ractive?active[0]._ractive:null;
						if(ract && active.attr('rst_fld')){
							window.$$.emit('rst.'+active[0]._ractive.root.name+'.error',active[0]._ractive.keypath,active.attr('rst_fld'),'');
						};
						if($$ && (active.hasClass('lookup') && dataTable)||(ract && active.attr('lookup'))){
							//console.log(dataTable.pos(active[0]));							
							if(active[0] && show_lookup){								
								var pos,lk,ract;
								if(dataTable){
									pos=dataTable.pos(active[0]);
									if(pos)pos=pos.def;
									if(pos)pos=pos.lookup;									
								}else if(ract){
									pos=ract.lookup;
									if(!pos){
										pos=ract.lookup={
											info:{},
												fld:active.attr('rst_fld'),
												src:{
													src:active.attr('lookup'),
													id:active.attr('lookup_id')||'id',
													fld:active.attr('lookup_fld')||'t'
												}
											};
									};
									if(!pos.fld)pos.info=undefined;
								};
								if(pos)lk=pos.info;								
								if(lk){
									(function(self,add_event){												
										if(!pos.info.initial)lk=pos.info=proc_lookup(pos.src);
										var dt=dataTable?dataTable.data(active[0]):ract.root.get(ract.keypath);
										//console.warn(self,dt);
										show_lookup({on_el:self,v:dt[pos.fld],obj:dt,key:pos.fld,look:lk,
											aft_cb:function(nv){
												if(dataTable)
													$$.emit(dataTableName+'.update',self,nv);					
												if(ract)ract.root.set(ract.keypath+'.'+pos.fld,nv);
											},
											new_cb:function(add){
												if(typeof(add_event)=='string')$$.emit(add_event+'.add',add,self);															
											}
										});										
									})(active[0],pos.src && pos.src.src? pos.src.src:pos.src);
									return; 
								}
							}
						}
						editor.attr('tabindex',1)
							.removeClass('error')
							.show()
							.offset(active.offset())
							.css(active.css(activeOptions.cloneProperties))
							.css({
								'-webkit-box-shadow': '0 0 20px #383838',
								'-moz-box-shadow': '0 0 20px #383838',								
								'box-shadow' :'0 0 20px #383838',
								padding: 0
								//,'word-break': 'break-word'
							})
							.width(active.outerWidth()-2)
							.height(active.outerHeight()-2);
						editorIn.css(active.css(activeOptions.cloneInProperties)).css({'border':0,'box-shadow':'initial'}).val(active.text()).focus();						
						if(editor.data('DateTimePicker')){
								editor.data('DateTimePicker').destroy();
								$('.input-group-addon',editor).hide();
						};
						if((active.hasClass('ltr')))editorIn.addClass('ltr');else editorIn.removeClass('ltr');
						if((active.hasClass('date') || active.hasClass('time') || active.hasClass('datetime'))){
							function fire(el,evttype) {
								if (document.createEvent) {
									var evt = document.createEvent('HTMLEvents');
									evt.initEvent( evttype, false, false);
									el.dispatchEvent(evt);
								} else if (document.createEventObject) {
									el.fireEvent('on' + evttype);
								}
							}
							var x=editor.offset();
							x.left-=30;
							var $d=editor.width(editor.width()+30).offset(x);
							$('.input-group-addon',$d).show();
							if(active.hasClass('datetime'))
								$d.datetimepicker({format:'YYYY-MM-DD HH:mm',language: "he", sideBySide:1,todayHighlight: true});
							else if(active.hasClass('time'))
								$d.datetimepicker({format:'HH:mm',language: "he", sideBySide:1,pickDate:0,pickTime:1});
							else
								$d.datetimepicker({format:'YYYY-MM-DD',language: "he", pickTime:0,todayHighlight: true,noIcon:true});
								//$d.data('DateTimePicker').show();
							$d.on('dp.hide',function(ev){
								fire($(ev.currentTarget).find('input').get(0),'change');
							})							
						}
					}else{
						active.focus();
					}
					if (select) {
						editor.select();
					}
				}
			},
			setActiveText = function (act,val,is_err){//edit,editIn) {
				if(!act){
					act=active;
					val=editorIn.val();
					is_err=editor.hasClass('error');
				}else console.log('use '+val);
				
				if($$ && dataTableName)return $$.emit(dataTableName+'.update',act,val);
				
				
				var text = val,
					evt = $.Event('change'),
					originalContent;
				if (act.text() === text || is_err) {
					return true;
				}
				if(act.attr('event')){
					var ev=act.attr('event').split('.');
					var res=window.$$.emit(ev[0],text,act.text(),act[0],act[0]._ractive?act[0]._ractive.keypath:undefined,ev[1]);
					if(!res)return;
				};
				if(act[0] && act[0]._ractive && act.attr('rst_fld')){					
					var r=act[0]._ractive;
					if(window.$$ && window.$$.exists('rst.'+r.root.name+'.update'))
						window.$$.emit('rst.'+r.root.name+'.update',r.keypath,act.attr('rst_fld'),text,act.text());
					else
						r.root.set(r.keypath+'.'+act.attr('rst_fld'),text);
					return true;
				}
				
				originalContent = act.html();
				active.text(text).trigger(evt, text);
				if (evt.result === false) {
					act.html(originalContent);
				}
			},
			movement = function (el, keycode) {
				if (keycode === ARROW_LEFT) {
					return el.next('td');
				} else if (keycode === ARROW_RIGHT) {
					return el.prev('td');
				} else if (keycode === ARROW_UP) {
					var x=el.parent().prev().children().eq(el.index());
					if(x.length||!dataTableName||!$$)return x;
					x=el.index();
					if($$.emit(dataTableName+'.page')===0)return el;
					$$.emit(dataTableName+'.page.prev');
					return $("tr:last-child >td",element).eq(x);
				} else if (keycode === ARROW_DOWN) {
					var x=el.parent().next().children().not('[tabIndex="-1"]').eq(el.index());
					if(x.length||!dataTableName||!$$)return x;
					x=el.index();
					
					if($$.emit(dataTableName+'.page')==$$.emit(dataTableName+'.pages')-1)return el;
					$$.emit(dataTableName+'.page.next');
					return $("tr:first-child >td",element).eq(x);
				}
				return [];
			};
		if(dataTableName)$$.on(dataTableName+'.refreshed',function(){
			if(editor.is(':visible'))editor.focusout();
		});
		
		editor.focusout(function (e) {
			var $div = $(this),$tr=$(active.parent()),act=active,act0=active[0],val=editorIn.val(),is_err=editor.hasClass('error');
			//console.log('out',document.activeElement);
			//console.trace();
				setTimeout(function() {					
					//var a=element.find('td:focus')[0];
					//console.log(document.activeElement);					
					if( $div[0]==document.activeElement || $div.has(document.activeElement).length){
						if(active[0]!=act0)setActiveText(act,val,is_err);
						return;
					}
					//console.log($elem[0],active[0],document.activeElement,$elem.has(document.activeElement).length);
					//if(document.activeElement==$elem[0]||$elem.has(document.activeElement).length||a[0]==$elem[0])return;
					//console.log(active[0],act0);
					setActiveText(act,val,is_err);
					if(active[0]==act0){
						//debugger;
						editor.hide();
					}
				}, 30);
		}).keydown(function (e) {
			if (e.which === ENTER) {
				setActiveText();
				editor.hide();
				active.focus();
				e.preventDefault();
				e.stopPropagation();
			} else if (e.which === ESC) {
				editorIn.val(active.text());
				e.preventDefault();
				e.stopPropagation();
				editor.hide();
				active.focus();
			} else if (e.which === TAB) {
				active.focus();
			} else if (editorIn[0].selectionEnd - editorIn[0].selectionStart === editorIn[0].value.length) {
				var possibleMove = movement(active, e.which);
				if (possibleMove.length > 0) {
					possibleMove.focus();
					e.preventDefault();
					e.stopPropagation();
				}
			}
		})
		.on('input paste', function () {
			var evt = $.Event('validate');
			active.trigger(evt, editorIn.val());
			if (evt.result === false) {
				editor.addClass('error');
			} else {
				editor.removeClass('error');
			}
		});
		function bindElement(){
			var _last_select,_last_row;
			
			if(activeOptions.selectRow)element.on('focus',element.has('tbody').length? 'tbody td':'td',function(e){
				$(_last_row).removeClass('select-row');
				_last_row=$(e.target).closest('tr');
				_last_row.addClass('select-row');
			});		
			element.on('click keypress dblclick', showEditor)
			.css('cursor', 'pointer')
			.keydown(function (e) {
				var prevent = true,
					possibleMove = movement($(e.target), e.which);
				if (possibleMove.length > 0) {
					possibleMove.focus();
				} else if (e.which === ENTER) {
					showEditor(false);
				} else if (e.which === 17 || e.which === 91 || e.which === 93) {
					showEditor(true);
					prevent = false;
				} else {
					prevent = false;
				}
				if (prevent) {
					e.stopPropagation();
					e.preventDefault();
				}
			});

			element.find('td').not('[tabIndex="-1"]').prop('tabIndex', 1);
		};
		bindElement();
		//if(dataTable)dataTable.reBind=bindElement;
		function correct(){
			if (editor.is(':visible')) {
				editor.offset(active.offset())
				.width(active.width())
				.height(active.height());
			}
		};
		element.closest('.dataTables_scrollBody').on('scroll', correct);
		$(window).on('resize',correct);
	});

};
$.fn.yesEditTable.defaultOptions = {
	cloneInProperties: ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right'],
	cloneProperties: [
					  'text-align', 'font', 'font-size', 'font-family', 'font-weight',
					  'border', 'border-top', 'border-bottom', 'border-left', 'border-right'],
	editor: $('<div class="input-group"><input class="form-control"></input><span class="input-group-addon hide"><span class="glyphicon glyphicon-remove"></span></span></div>')
};

