// @flow
import React from 'react';
import test from 'ava';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Component from '../../../src/components/Buttons/AutoRefreshSwitch';
import Events from '../../../src/core/events';

configure({ adapter: new Adapter() });
const mockStore = configureStore();

test('autoUpdate true', (t) => {
  const store = mockStore({ autoUpdate: true });
  const wrapper = shallow(<Component store={store} />);
  t.true(wrapper.render().hasClass('enabled'), 'has .enabled class name');

  const el = wrapper.dive().find('.dropdown-toggle');
  el.simulate('click');

  const actions = store.getActions();
  const expectedPayload = [{ type: Events.STOP_API_POLLING, payload: { type: 'auto-refresh' } }];
  t.deepEqual(expectedPayload, actions, 'click fires STOP_API_POLLING if autoUpdate is on');
});

test('autoUpdate false', (t) => {
  const store = mockStore({ autoUpdate: false });
  const wrapper = shallow(<Component store={store} />);
  t.false(wrapper.render().hasClass('enabled'), 'has no .enabled class name');

  const el = wrapper.dive().find('.dropdown-toggle');
  el.simulate('click');

  const actions = store.getActions();
  const expectedPayload = [{ type: Events.START_API_POLLING, payload: { type: 'auto-refresh' } }];
  t.deepEqual(expectedPayload, actions, 'click fires START_API_POLLING if autoUpdate is off');
});
