(function() {
  'use strict';
  Polymer({

    is: 'px-accordion-group',

    properties: {
      _expandCollapse: {
        type: String,
        value: 'collapse',
        observer: '_onExpandCollapse'
      },
      collapseClass: {
        type: String,
        value: "actionable--disabled"
      },
      expandClass: {
        type: String,
        value: "actionable"
      }
    },

    _onExpandCollapse: function(val) {
      if (val == "collapse") {
        this.collapseClass = "actionable--disabled";
        this.expandClass = "actionable";
      }
      else {
        this.collapseClass = "actionable";
        this.expandClass = "actionable--disabled";
      }
    },

    _expandCollapseListener: function(e) {
      this.set('_expandCollapse', e.currentTarget.dataset.val);
      if (e.currentTarget.dataset.val === 'expand') {
        for (var i = 0; i < this.accordionsDefined.length; i++) {
          this.accordionsDefined[i].$$('iron-collapse').show();
          this.accordionsDefined[i].set('_expandCollapseIcon', this.accordionsDefined[i].icons.less);
        }
      }
      else {
        for (var i = 0; i < this.accordionsDefined.length; i++) {
          this.accordionsDefined[i].$$('iron-collapse').hide();
          this.accordionsDefined[i].set('_expandCollapseIcon', this.accordionsDefined[i].icons.more);
        }
      }
    },

    _getAccordionDefinitions: function(accordionSet) {
      this.accordionsDefined = accordionSet.addedNodes.filter(function(node) {
        return (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'PX-ACCORDION');
      });
    },

    ready: function() {
      var boundHandler = this._getAccordionDefinitions.bind(this);
      this._observer = Polymer.dom(this.$.accordions).observeNodes(boundHandler);
    }

  });
})();
