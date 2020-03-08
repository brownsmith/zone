import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Content from './Content';

configure({ adapter: new Adapter() });

describe('Content', () => {
  const render = () => {
    const props = {
      doEverything: () => {},
    };
    return shallow(<Content {...props} />);
  };

  test('existing member redirects to membership page', () =>
    expect(render(true)).toMatchSnapshot());
});