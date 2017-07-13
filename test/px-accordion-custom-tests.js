// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom tests for px-accordion', function() {
    test('Header is displayed correctly', function(done){
      var accordion = Polymer.dom(document).querySelector('#px_accordion_1'),
          header = Polymer.dom(accordion.root).querySelector('span');
      assert.equal(header.textContent.trim(), 'Header');
      done();
    });
    test('Content is displayed correctly', function(done){
      var accordion = Polymer.dom(document).querySelector('#px_accordion_1'),
          collapse = Polymer.dom(accordion.root).querySelector('iron-collapse');
      assert.equal(collapse.textContent.trim(), 'Content');
      done();
    });
    test('Accordion collapsed by default', function(done){
      var accordion = Polymer.dom(document).querySelector('#px_accordion_1'),
          collapse = Polymer.dom(accordion.root).querySelector('iron-collapse');
      assert.isFalse(collapse.opened);
      assert.equal(window.getComputedStyle(collapse).display, 'none');
      done();
    });
    test('Accordion expands on click', function(done){
      var accordion = Polymer.dom(document).querySelector('#px_accordion_1'),
          body = Polymer.dom(accordion.root).querySelector('.accordion__header'),
          collapse = Polymer.dom(accordion.root).querySelector('iron-collapse');
      accordion.addEventListener('click', function() {
        assert.isTrue(collapse.opened);
        assert.equal(window.getComputedStyle(collapse).display, 'block');
        done();
      });
      body.click();
    });
    test('Event fired when action icon clicked', function(done){
      var accordion = Polymer.dom(document).querySelector('#px_accordion_1'),
          icon = Polymer.dom(accordion.root).querySelector('#actionIcon'),
          eventFired = false;
      accordion.addEventListener('px-accordion-action-clicked', function(e) {
        eventFired = true;
        assert.equal(e.target, accordion);
      });
      accordion.addEventListener('click', function() {
        setTimeout(function() {
          assert.isTrue(eventFired);
          done();
        },50);
      });
      icon.click();
    });
    test('Disabled accordion does not expand', function(done){
      var accordion = Polymer.dom(document).querySelector('#px_accordion_2'),
          body = Polymer.dom(accordion.root).querySelector('.accordion__header'),
          collapse = Polymer.dom(accordion.root).querySelector('iron-collapse');
      accordion.addEventListener('click', function() {
        assert.isFalse(collapse.opened);
        assert.equal(window.getComputedStyle(collapse).display, 'none');
        done();
      });
      body.click();
    });

  });
}
