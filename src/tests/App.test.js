import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';

configure({ adapter: new Adapter() });

describe('<App />', () => {
    let wrapper;
    const todoItems = [];

    beforeEach(() => {
        todoItems.length = 0;
        todoItems.push({ index: 1, value: 'learn react', done: false });
        todoItems.push({ index: 2, value: 'Go shopping', done: true });
        todoItems.push({ index: 3, value: 'buy flowers', done: true });

        wrapper = shallow(<App initItems={todoItems} />);
    });

    it('should render correctly', () => {
        const component = renderer
            .create(<App initItems={todoItems} />)
            .toJSON();
        expect(component).toMatchSnapshot();
    });

    describe('markTodoDone', () => {
        it('should mark the correct todo item as done and move it to the last in the list', () => {
            const instance = wrapper.instance();
            const item = instance.state.todoItems.find(x => x.index === 1);
            item.done = false;

            expect(
                instance.state.todoItems.find(x => x.index === 1).done
            ).toEqual(false);

            instance.markTodoDone(0);

            expect(
                instance.state.todoItems.find(x => x.index === 1).done
            ).toEqual(true);
            expect(
                instance.state.todoItems.findIndex(x => x.index === 1)
            ).toEqual(todoItems.length - 1);
        });

        it('should mark the correct todo item as incomplete and move it to the top of the list', () => {
            const instance = wrapper.instance();
            const item = instance.state.todoItems.find(x => x.index === 1);
            item.done = true;

            expect(
                instance.state.todoItems.find(x => x.index === 1).done
            ).toEqual(true);

            instance.markTodoDone(0);

            expect(
                instance.state.todoItems.find(x => x.index === 1).done
            ).toEqual(false);
            expect(
                instance.state.todoItems.findIndex(x => x.index === 1)
            ).toEqual(0);
        });
    });

    describe('removeItem', () => {
        it('should remove the correct item from the list', () => {
            const instance = wrapper.instance();
            const item = instance.state.todoItems.find(x => x.index === 1);

            expect(item).toEqual(todoItems[0]);

            instance.removeItem(0);

            expect(
                instance.state.todoItems.find(x => x.index === 1)
            ).not.toBeDefined();
        });
    });

    describe('addItem', () => {
        it('should add a new item to the top of the list', () => {
            const instance = wrapper.instance();
            const newItem = { index: 4, value: 'new item', done: false };
            const expectedLength = todoItems.length + 1;

            expect(instance.state.todoItems.length).toEqual(todoItems.length);

            instance.addItem(newItem);

            expect(instance.state.todoItems.length).toEqual(expectedLength);
            expect(instance.state.todoItems[0].index).toEqual(newItem.index);
        });
    });
});
