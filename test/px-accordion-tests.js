/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe('px-accordion', () => {
  let accordion;

  beforeEach((done) => {
    accordion = fixture('AccordionFixture');
    flush(done);
  });

  it('displays its header value text', () => {
    const headerValue = Polymer.dom(accordion.root).querySelector('#headerValue');
    assert(headerValue.textContent.trim() === 'Header');
  });

  it('display multiple icons', () => {
    const header = Polymer.dom(accordion.root).querySelector('#header');
    assert(header.querySelectorAll('#actionIcon').length === 2);
  });

  it('distributes the content passed into its default slot', () => {
    const span = accordion.queryEffectiveChildren('span');
    assert(span instanceof HTMLElement);
    assert(span.innerText.trim() === 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
  });

  it('is collapsed by default', () => {
    const collapse = Polymer.dom(accordion.root).querySelector('iron-collapse');
    assert(accordion.opened === false);
    assert(window.getComputedStyle(collapse).display === 'none');
  });

  it('expands when the user clicks on its header', (done) => {
    const header = Polymer.dom(accordion.root).querySelector('#header');
    const collapse = Polymer.dom(accordion.root).querySelector('iron-collapse');

    header.click();

    async.until(
      () => window.getComputedStyle(collapse).display === 'block',
      cb => flush(cb),
      () => {
        assert(accordion.opened === true);
        assert(collapse.opened === true);
        done();
      }
    );
  });

  it('collapses when the user clicks the header while it is opened', (done) => {
    const header = Polymer.dom(accordion.root).querySelector('#header');
    const collapse = Polymer.dom(accordion.root).querySelector('iron-collapse');

    const waitUntilOpenThenClickHeader = () => async.until(
      () => window.getComputedStyle(collapse).display === 'block',
      cb => flush(cb),
      () => {
        /* Click to close */
        header.click();
        thenCheckIfCollapsed();
      }
    );

    const thenCheckIfCollapsed = () => async.until(
      () => window.getComputedStyle(collapse).display === 'none',
      cb => flush(cb),
      () => {
        assert(accordion.opened === false);
        assert(collapse.opened === false);
        done();
      }
    );

    /* Click to open */
    header.click();
    /* Click again after its opened, then wait and test if it collapses */
    waitUntilOpenThenClickHeader();
  });


  it('fires an event when the action icon is clicked', (done) => {
    const icon = Polymer.dom(accordion.root).querySelector('#actionIcon');
    const eventFunc = sinon.spy();
    accordion.addEventListener('px-accordion-action-clicked', eventFunc);

    icon.click();

    setTimeout(() => {
      assert(eventFunc.calledOnce, 'px-accordion-action-clicked event should be fired once');
      done();
    }, 200);
  });


  it('fires an event when a content icon is clicked', (done) => {
    const icon = Polymer.dom(accordion.root).querySelector('#contentIcon1');
    const eventFunc = sinon.spy();
    accordion.addEventListener('px-accordion-content-icon-clicked', eventFunc);

    icon.click();

    setTimeout(() => {
      assert(eventFunc.calledOnce, 'px-accordion-content-icon-clicked event should be fired once');
      done();
    }, 200);
  });
});

describe('px-accordion [disabled]', () => {
  it('does not expand when the user clicks its header if it is disabled', (done) => {
    let accordion = fixture('AccordionDisabledFixture');
    flush(() => {
      const header = Polymer.dom(accordion.root).querySelector('#header');
      const collapse = Polymer.dom(accordion.root).querySelector('iron-collapse');
      header.click();

      setTimeout(() => {
        assert(accordion.opened === false);
        assert(collapse.opened === false);
        done();
      }, 200);
    });
  });
});
