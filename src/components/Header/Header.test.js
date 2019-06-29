import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './Header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    it('should render correctly', () => {
        const component = renderer.create(<Header />).toJSON();
        expect(component).toMatchSnapshot();
    });

    it('should render item', () => {
        expect(wrapper.find('h1')).toHaveLength(1);
    });

    it('should render with correct title', () => {
        expect(wrapper.text()).toEqual('Todo list');
    });
});
