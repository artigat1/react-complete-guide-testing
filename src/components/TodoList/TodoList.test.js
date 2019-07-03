import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TodoList from './TodoList';

configure({ adapter: new Adapter() });

describe('<TodoList />', () => {
    let wrapper;
    const todoItems = [];

    beforeEach(() => {
        todoItems.push({ index: 1, value: 'learn react', done: false });
        todoItems.push({ index: 2, value: 'Go shopping', done: true });
        todoItems.push({ index: 3, value: 'buy flowers', done: true });

        wrapper = shallow(<TodoList items={todoItems} />);
    });

    it('should render correctly', () => {
        const component = renderer.create(<TodoList items={[]} />).toJSON();
        expect(component).toMatchSnapshot();
    });

    it('should render correct number of items', () => {
        wrapper.setProps({ items: todoItems });

        expect(wrapper.find('TodoListItem')).toHaveLength(todoItems.length);
    });
});
