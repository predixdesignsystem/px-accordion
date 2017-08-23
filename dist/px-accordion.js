'use strict';(function(){'use strict';Polymer({is:'px-accordion',properties:{/**
       * The icon to use in the accordion, either 'more' or 'less' depending on current state.
       */_expandCollapseIcon:{type:String},/**
       * Icons to be used by the accordion component.
       * You should specify a valid iron icon for 'more' and 'less', at least,
       * plus an additional icon for 'action' if `showAction` is true.
       */icons:{type:Object,value:function value(){return{'more':'px-utl:chevron-right','less':'px-utl:chevron','action':'px-utl:edit'}},observer:'_iconsChanged'},/**
       * Flag indicating whether the accordion should be disabled.
       */disabled:{type:Boolean,value:false,reflect:true},/**
       * Flag indicating whether the 'action' icon should be shown on the right hand side.
       */showAction:{type:Boolean,value:false},/**
       * String that will appear in the right hand side of the accordion.
       */status:{type:String,value:''}},_iconsChanged:function _iconsChanged(){this._expandCollapseIcon=this.$.collapse.opened?this.icons.less:this.icons.more},/**
     * Shows or hides the accordion content.
     */toggle:function toggle(e){if(this.disabled)return;Polymer.dom(this.root).querySelector('iron-collapse').toggle();if(this._expandCollapseIcon===this.icons.more){this.set('_expandCollapseIcon',this.icons.less);this.fire('px-accordion-expanded',e);/**
         * Event fired when the accordion is expanded.
         * e.target will contain information about the specific accordion
         * whereas e.detail will contain a reference to the original tap event.
         * @event px-accordion-expanded
         */}else{this.set('_expandCollapseIcon',this.icons.more);this.fire('px-accordion-collapsed',e);/**
         * Event fired when the accordion is collapsed.
         * e.target will contain information about the specific accordion
         * whereas e.detail will contain a reference to the original tap event.
         * @event px-accordion-collapsed
         */}},_onEditIconClick:function _onEditIconClick(e){e.preventDefault();e.stopPropagation();/**
       * Event fired when the action icon is clicked.
       * e.target will contain information about the specific accordion
       * whereas e.detail will contain a reference to the original tap event.
       * @event px-accordion-action-clicked
       */this.fire('px-accordion-action-clicked',e)}})})();
//# sourceMappingURL=px-accordion.js.map
