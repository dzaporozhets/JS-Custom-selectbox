// Custom selectbox using prototype & scriptaculous
// require prototype 1.6
SelectBox = Class.create();
SelectBox.prototype = {

	// selectbox id passed to replace by custom
    id: 0,
    
    // original selectbox element
    original_selectbox : false,
    
    // misc
    selectText: "please select",
    active_select: null,
    _active: false,
    
    //positions
    options_top : 0,
    options_left : 0,
    select_width : 0,
    
    // animation
    animation_show : 'slide',
    animation_show_interval : 0.5,
    animation_hide : 'slide',
    animation_hide_interval : 0.5,
    
    // select area var
	select_button_id_text: '',
	select_button_class_text : '',
	select_area_id_text: '',
	select_area_class_text: '',
	select_area_active_class_text: '',
	select_text_id_text: '',

	
	// options area var
    option_id_text: '',
    option_holder_id_text: '',
    option_holder_visible_class_text: '',
    option_holder_invisible_class_text: '',

	// construct
    initialize: function (params) {
    	
    	// require id of selectbox
    	if( typeof params.id == 'undefined' ){
    		alert('selectbox id in params required');
    		return false;
    	}
    	
    	//coord data...
    	this.options_top = params.options_top ? params.options_top : 0;
    	this.options_left = params.options_left ? params.options_left : 0;
    	this.select_width = params.select_width ? params.select_width : 0;
    	
    	//animation type ..
    	this.animation_show = params.animation_show ? params.animation_show : this.animation_show;
    	this.animation_hide = params.animation_hide ? params.animation_hide : this.animation_hide;

		//animation interval ..
    	this.animation_show_interval = params.animation_show_interval ? params.animation_show_interval : this.animation_show_interval;
    	this.animation_hide_interval = params.animation_hide_interval ? params.animation_hide_interval : this.animation_hide_interval;
    	
        var id = this.id = params.id;
        this.original_selectbox = $(id);
        
        // select area
        this.select_button_id_text = this.id + '-select-button';
        this.select_button_class_text = 'custom-select-button';
        this.select_area_id_text = this.id + '-select-area';
        this.select_area_class_text = 'select-area';
		this.select_area_active_class_text = 'select-area-active';
        this.select_text_id_text = this.id + '-select-text';
        
        // options area
        this.option_id_text = this.id + '-option-';
        this.option_holder_id_text = this.id + '-options-holder';
        this.option_holder_visible_class_text = 'options-visible';
        this.option_holder_invisible_class_text = 'options-invisible';
        
        // init
        this.createMarkup(id);
        this.initSelectEvent(this.select_button_id_text);
        this.initOptionsEvent($(id));

    },

	// init select event
    initSelectEvent: function (button_id) {
        var self = this;
        $(button_id).observe('click', function (event) {
            self.showOptions(event, self);
        });
    },

	// init option click events
    initOptionsEvent: function (selectBox) {
        var self = this;
        var me = selectBox;
        for (var w = 0; w < me.options.length; w++) {
            if (me.options[w].title.indexOf("title") == -1) {
                $(self.option_id_text + w).observe('click', function (event) {
                    self.showOptions(event, self);
                    self.selectMe(selectBox, this.id.replace(self.option_id_text, ''));
                });
            }
        }
    },

    // create dom element with for custom selectbox 
    createMarkup: function (id) {
        var selectBox = $(id);
        var q = id;
        //create and build div structure
        var selectArea = document.createElement("div");
        var left = document.createElement("span");
        left.className = "left";
        selectArea.appendChild(left);
        var disabled = document.createElement("span");
        disabled.className = "disabled";
        selectArea.appendChild(disabled);
        selectBox._disabled = disabled;
        var center = document.createElement("span");
        var button = document.createElement("a");
        var text = document.createTextNode(this.selectText);
        center.id = this.select_text_id_text;
        button.id = this.select_button_id_text;
        var stWidth = selectBox.offsetWidth;
        selectArea.style.width =  this.select_width ? this.select_width + "px" : stWidth + "px";
        button.href = "#";
        button.className = this.select_button_class_text;
        selectArea.className = this.select_area_class_text;
        selectArea.className += " " + selectBox.className;
        selectArea.id = this.select_area_id_text;
        center.className = "center";
        center.appendChild(text);
        selectArea.appendChild(center);
        selectArea.appendChild(button);
        selectBox.className += " outtaHere";
        selectBox.parentNode.insertBefore(selectArea, selectBox);
        var optionsDiv = document.createElement("div");
        var optionsListParent = document.createElement("div");
        optionsListParent.className = "select-center";
        var optionsList = document.createElement("ul");
        optionsDiv.innerHTML += "<div class='select-top'><div class='select-top-left'></div><div class='select-top-right'></div></div>";
        optionsListParent.appendChild(optionsList);
        optionsDiv.appendChild(optionsListParent);
        selectBox._options = optionsList;
        optionsDiv.style.width = this.select_width ? this.select_width + "px" : stWidth + "px";
        optionsDiv._parent = selectArea;
        optionsDiv.className = this.option_holder_invisible_class_text;
        optionsDiv.id = this.option_holder_id_text;
        this.populateSelectOptions(selectBox);
        optionsDiv.innerHTML += "<div class='select-bottom'><div class='select-bottom-left'></div><div class='select-bottom-right'></div></div>";
        document.getElementsByTagName("body")[0].appendChild(optionsDiv);
        selectBox.replaced = true;
        selectBox.up(0).appendChild(selectArea);
    },

    //collecting select options
    populateSelectOptions: function (selectBox) {
        var me = selectBox;
        me._options.innerHTML = "";
        for (var w = 0; w < me.options.length; w++) {
            if (me.options[w].title.indexOf("title") == -1) {
                var optionHolder = document.createElement('li');
                var optionLink = document.createElement('a');
                var optionTxt;
                if (me.options[w].title.indexOf('image') != -1) {
                    optionTxt = document.createElement('img');
                    optionSpan = document.createElement('span');
                    optionTxt.src = me.options[w].title;
                    optionSpan = document.createTextNode(me.options[w].text);
                } else {
                    optionTxt = document.createTextNode(me.options[w].text);
                }
                optionLink.href = "#";
                optionLink.id = this.option_id_text + w;
                if (me.options[w].title.indexOf('image') != -1) {
                    optionLink.appendChild(optionTxt);
                    optionLink.appendChild(optionSpan);
                } else {
                    optionLink.appendChild(optionTxt);
                }
                optionHolder.appendChild(optionLink);
                me._options.appendChild(optionHolder);
                if (me.options[w].selected) {
                    this.selectMe(selectBox, w);
                }
            }
            else if (me.options[w].selected) this.selectMe(me.id, w);
        }
        if (me.disabled) {
            me._disabled.style.display = "block";
        } else {
            me._disabled.style.display = "none";
        }
    },

	// show options area
    showOptions: function (event, selectbox) {
        var self = selectbox;
        var _selectHeight = self.options_top;
        var id = self.id;
        _elem = document.getElementById(self.option_holder_id_text);
        var divArea = document.getElementById(self.select_area_id_text);
        if (self.active_select && self.active_select != _elem) {
        	self.animateHide({
        		id : self.option_holder_id_text,
        		afterFinish: function () {
                    self.active_select.className = self.active_select.className.replace(self.option_holder_visible_class_text, self.option_holder_invisible_class_text);
                    self.active_select.style.height = "auto";
                    self._active.className = self._active.className.replace(self.select_area_active_class_text, '');
                }
        	});
        	
        }
        if (_elem.className.indexOf(self.option_holder_invisible_class_text) != -1) {
            _elem.style.left = "-9999px";
            _elem.style.top = self.findPosY(divArea) + _selectHeight + 'px';
            _elem.className = _elem.className.replace(self.option_holder_invisible_class_text, '');
            _elem.className += " "+self.option_holder_visible_class_text;
			_elem.setStyle({display:'none'});
            _elem.style.left = self.findPosX(divArea) + self.options_left + 'px';
            divArea.className += " "+self.select_area_active_class_text;
            self._active = divArea;
            self.active_select = _elem;
/*
            if (document.documentElement) {
                document.documentElement.onclick = function (e) {
                    self.hideSelectOptions(e, self)
                };
            } else {
                window.onclick = self.hideSelectOptions;
            }
*/
            self.animateShow({
            	id : self.option_holder_id_text,
            	afterFinish: function () {
					_elem.setStyle({display:'block'});
            	}
            });
        }
        else if (_elem.className.indexOf(self.option_holder_visible_class_text) != -1) {
            self.animateHide({
        		id : self.option_holder_id_text,
        		afterFinish: function () {
                    _elem.style.height = "auto";
                    _elem.className = _elem.className.replace(self.option_holder_visible_class_text, '');
                    _elem.className += " "+self.option_holder_invisible_class_text;
                    divArea.className = divArea.className.replace(self.select_area_active_class_text, '');
                }
            });
        }
    },
    
    animateHide: function (params) {
    	switch(this.animation_hide) {
    		case 'slide':
		    	Effect.SlideUp(params.id, {
		            duration: this.animation_hide_interval,
		            afterFinish: params.afterFinish
		        });
		        break;
   			case 'fade':
				Effect.Fade(params.id, {
		            duration: this.animation_hide_interval,
		            afterFinish:params.afterFinish
		        });
				break;
				
   			case 'blind':
				Effect.BlindUp(params.id, {
		            duration: this.animation_hide_interval,
		            afterFinish:params.afterFinish
		        });
				break;
				
   			case 'shrink':
				Effect.Shrink(params.id, {
		            duration: this.animation_hide_interval,
		            afterFinish:params.afterFinish
		        });
				break;
				
   			case 'squish':
				Effect.Squish(params.id, {
		            duration: this.animation_hide_interval,
		            afterFinish:params.afterFinish
		        });
				break;
												
        }

    },

    animateShow: function (params) {
		switch(this.animation_show) {
    		case 'slide':
		    	Effect.SlideDown(params.id, {
		            duration: this.animation_show_interval,
		            afterFinish:params.afterFinish
		        });
				break;
			case 'appear':
				Effect.Appear(params.id, {
		            duration: this.animation_show_interval,
		            afterFinish:params.afterFinish
		        });
				break;
			case 'blind':
				Effect.BlindDown(params.id, {
		            duration: this.animation_show_interval,
		            afterFinish:params.afterFinish
		        });
				break;				
				
		}
    },    

	// select option
    selectMe: function (selectField, linkNo) {
        selectNo = selectField.id;
        for (var k = 0; k < selectField.options.length; k++) {
            if (k == linkNo) {
                selectField.options[k].selected = true;
            }
            else {
                selectField.options[k].selected = false;
            }
        }
        textVar = document.getElementById(this.select_text_id_text);
        var newText;
        var optionSpan;
        if (selectField.options[linkNo].title.indexOf('image') != -1) {
            newText = document.createElement('img');
            newText.src = selectField.options[linkNo].title;
            optionSpan = document.createElement('span');
            optionSpan = document.createTextNode(selectField.options[linkNo].text);
        } else {
            newText = document.createTextNode(selectField.options[linkNo].text);
        }
        if (selectField.options[linkNo].title.indexOf('image') != -1) {
            if (textVar.childNodes.length > 1) textVar.removeChild(textVar.childNodes[0]);
            textVar.replaceChild(newText, textVar.childNodes[0]);
            textVar.appendChild(optionSpan);
        } else {
            if (textVar.childNodes.length > 1) textVar.removeChild(textVar.childNodes[0]);
            textVar.replaceChild(newText, textVar.childNodes[0]);
        }
        if (selectField.onchange && all_selects) {
            eval(selectField.onchange());
        }
    },

	// find y position
    findPosY: function (obj) {
        var posTop = 0;
        while (obj.offsetParent) {
            posTop += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return posTop;
    },

	//find x position
    findPosX: function (obj) {
        var posLeft = 0;
        while (obj.offsetParent) {
            posLeft += obj.offsetLeft;
            obj = obj.offsetParent;
        }
        return posLeft;
    },

	// hide option area
    hideSelectOptions: function (e, self) {
        if (self.active_select) {
            if (!e) e = window.event;
            var _target = (e.target || e.srcElement);
            if (self.isElementBefore(_target, self.select_area_class_text) == 0 && self.isElementBefore(_target, self.option_holder_id_text) == 0) {
                self.active_select.className = self.active_select.className.replace(self.option_holder_visible_class_text, '');
                self.active_select.className = self.active_select.className.replace(self.option_holder_invisible_class_text, '');
                self.active_select.className += " "+self.option_holder_invisible_class_text;
                self._active.className = self._active.className.replace(self.select_area_active_class_text, '');
                self.active_select = false;

                if (document.documentElement) {
                    document.documentElement.onclick = function () {};
                }
                else {
                    window.onclick = null;
                }
            }
        }
    },

	// check if element
    isElementBefore: function (_el, _class) {
        var _parent = _el;
        do {
            _parent = _parent.parentNode;
        }
        while (_parent && _parent.className != null && _parent.className.indexOf(_class) == -1)
        if (_parent.className && _parent.className.indexOf(_class) != -1) {
            return 1;
        } else {
            return 0;
        }
    }
};