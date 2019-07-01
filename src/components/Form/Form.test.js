import React from 'react';
import renderer from 'react-test-renderer';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Form from './Form';

configure({ adapter: new Adapter() });

describe('<Form />', () => {
    let wrapper;
    const fakeEvent = {
        preventDefault: () => jest.fn(),
        target: { value: 'testing' }
    };
    const mockAddItemCallback = jest.fn();

    beforeEach(() => {
        mockAddItemCallback.mockClear();

        wrapper = mount(<Form addItem={mockAddItemCallback} />);
    });

    it('should render correctly', () => {
        const component = renderer.create(<Form />).toJSON();
        expect(component).toMatchSnapshot();
    });

    it('should render submit button', () => {
        expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    });

    it('should have "Add" text on the submit button"', () => {
        const btnSubmit = wrapper.find('button[type="submit"]');

        expect(btnSubmit.text()).toEqual('Add');
    });

    it('should render input text box', () => {
        expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });

    it('should have a placeholder in the input box', () => {
        const inputTextBox = wrapper.find('input[type="text"]');

        expect(inputTextBox.prop('placeholder')).toEqual('add a new todo...');
    });

    it('should submit when valid text is entered in the name box', () => {
        const btnSubmit = wrapper.find('button[type="submit"]');
        const inputTextBox = wrapper.find('input[type="text"]');
        const expectedResult = { newItemValue: fakeEvent.target.value };

        inputTextBox.at(0).instance().value = fakeEvent.target.value;
        inputTextBox.simulate('change');
        wrapper.update();
        btnSubmit.simulate('submit', fakeEvent);
        wrapper.update();

        expect(mockAddItemCallback).toHaveBeenCalledTimes(1);
        expect(mockAddItemCallback).toHaveBeenCalledWith(expectedResult);
    });

    it('should show correct validation error when submitting no name', () => {
        const btnSubmit = wrapper.find('button[type="submit"]');
        const inputTextBox = wrapper.find('input[type="text"]');

        inputTextBox.at(0).instance().value = '';
        inputTextBox.simulate('change');
        wrapper.update();
        btnSubmit.simulate('submit', fakeEvent);
        wrapper.update();

        expect(wrapper.find('.error')).toHaveLength(1);
        expect(wrapper.find('.error').text()).toEqual('You must enter a name');
    });

    it('should show correct validation error when submitting short name', () => {
        const btnSubmit = wrapper.find('button[type="submit"]');
        const inputTextBox = wrapper.find('input[type="text"]');

        inputTextBox.at(0).instance().value = 'a';
        inputTextBox.simulate('change');
        wrapper.update();
        btnSubmit.simulate('submit', fakeEvent);
        wrapper.update();

        expect(wrapper.find('.error')).toHaveLength(1);
        expect(wrapper.find('.error').text()).toEqual(
            'Name should be more than 1 characters'
        );
    });
});
