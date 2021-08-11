import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { beforeAll } from '@jest/globals';

import Dashboard from '../../client/components/Dashboard';

Enzyme.configure({ adapter: new Adapter() });

describe('Dashboard', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Dashboard />);
    console.log(wrapper.debug());
  });

  it('should render inside a Paper Component', () => {
    const dashboard = wrapper.find('WithStyles(ForwardRef(Paper))');
    expect(dashboard).toHaveLength(1);
  });

  it('should render a Material UI thumbsdown icon', () => {
    const thumbsdown = wrapper.find('Memo(ForwardRef(ThumbDownIcon))');
    expect(thumbsdown).toHaveLength(1);
  });

  it('should render a DashboardCard Component', () => {
    const dashboardcard = wrapper.find('DashboardCard');
    expect(dashboardcard).toHaveLength(1);
  });

  it('should render a Material UI favorite icon', () => {
    const favorite = wrapper.find('Memo(ForwardRef(FavoriteIcon))');
    expect(favorite).toHaveLength(1);
  });
});