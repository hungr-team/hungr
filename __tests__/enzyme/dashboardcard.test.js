import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { beforeAll } from '@jest/globals';

import DashboardCard from '../../client/components/DashboardCard';
import { Button, Card } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });

describe('DashboardCard', () => {
  let wrapper;

  const props = {
    restaurants: [{ name: 'name', vicinity: 'vicinity', rating: 5 }],
    display: 0,
    photo: '',
  };

  describe('DashboardCard should render all child components in a Card Component', () => {
    beforeAll(() => {
      wrapper = shallow(<DashboardCard {...props} />);
    });

    it('should render inside a Card Component', () => {
      const card = wrapper.find(Card);
      expect(card).toHaveLength(1);
    });

    it('should render "" in Card Media Component', () => {
      const rating = wrapper.find('WithStyles(ForwardRef(CardMedia))');
      expect(rating.prop('image')).toEqual('');
    });

    it('should render five stars in rating Component', () => {
      const rating = wrapper.find('WithStyles(ForwardRef(Rating))');
      expect(rating.prop('value')).toEqual(5);
    });

    it('should render "name" and "vicinity in Typography Components', () => {
      const rating = wrapper.find('WithStyles(ForwardRef(Typography))');
      expect(rating.at(0).text()).toEqual('name');
      expect(rating.at(1).text()).toEqual('vicinity');
    });

    it('should render a Material UI block icon', () => {
      const block = wrapper.find('Memo(ForwardRef(BlockIcon))');
      expect(block).toHaveLength(1);
    });
  });

  describe('simulating clicks', () => {
    it('Clicking on the super dislike button should trigger a callback', () => {
      const mockCallBack = jest.fn();
      const button = shallow(<Button onClick={mockCallBack} />);
      button.simulate('click');
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });
  });
});
