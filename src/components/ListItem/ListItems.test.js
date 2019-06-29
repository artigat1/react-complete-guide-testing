import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ListItem from './ListItem';

configure({ adapter: new Adapter() });

describe('<ListItems />', () => {
    let wrapper;
    let item;
    const idx = 3;
    const mockCloseClickHandler = jest.fn();
    const mockDoneClickHandler = jest.fn();

    beforeEach(() => {
        mockCloseClickHandler.mockClear();
        mockDoneClickHandler.mockClear();

        item = { index: idx, value: 'learn react', done: false };
        wrapper = shallow(
            <ListItem
                item={item}
                index={idx}
                key={idx}
                removeItem={mockCloseClickHandler}
                markTodoDone={mockDoneClickHandler}
            />
        );
    });

    it('should render correctly', () => {
        const component = renderer
            .create(<ListItem item={item} index={idx} key={idx} />)
            .toJSON();
        expect(component).toMatchSnapshot();
    });

    it('should render item', () => {
        expect(wrapper.find('li.list-group-item')).toHaveLength(1);
    });

    it('should render items to be completed with the undone class', () => {
        expect(wrapper.find('div.undone')).toHaveLength(1);
    });

    it('should render completed items with the done class', () => {
        const updatedItem = {
            ...item,
            done: true
        };
        wrapper.setProps({ item: updatedItem });

        expect(wrapper.find('div.done')).toHaveLength(1);
    });

    it('should render the text of the item', () => {
        expect(wrapper.text()).toContain(item.value);
    });

    it('should render delete button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it('should trigger close when button clicked', () => {
        wrapper.find('button').simulate('click');

        expect(mockCloseClickHandler).toHaveBeenCalledTimes(1);
        expect(mockCloseClickHandler).toHaveBeenCalledWith(idx);
    });

    it('should trigger done when text span clicked', () => {
        wrapper.find('span').simulate('click');

        expect(mockDoneClickHandler).toHaveBeenCalledTimes(1);
        expect(mockDoneClickHandler).toHaveBeenCalledWith(idx);
    });
});
