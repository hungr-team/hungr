import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { beforeAll } from '@jest/globals';

import Dashboard from '../../client/components/Dashboard';
import { Paper } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });

describe('Dashboard', () => {
  let wrapper;

  describe('Dashboard should render all child components in a Paper Component', () => {
    beforeAll(() => {
      wrapper = shallow(<Dashboard />);
    });

    it('should render inside a Paper Component', () => {
      const paper = wrapper.find(Paper);
      expect(paper).toHaveLength(1);
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

  describe('simulating clicks', () => {
    it('Clicking on the paper should trigger a callback', () => {
      const mockCallBack = jest.fn();
      const paperwrapper = shallow(<Paper onClick={mockCallBack} />);
      paperwrapper.simulate('click');
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });
  });
});
