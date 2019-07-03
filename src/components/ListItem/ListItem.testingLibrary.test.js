import React from 'react';
import { render } from '@testing-library/react';

import ListItem from './ListItem';
import renderer from 'react-test-renderer';

describe('<ListItem>', () => {
    let utils;
    let item;
    const idx = 3;
    const mockCloseClickHandler = jest.fn();
    const mockDoneClickHandler = jest.fn();

    beforeEach(() => {
        mockCloseClickHandler.mockClear();
        mockDoneClickHandler.mockClear();

        item = { index: idx, value: 'learn react', done: false };
        utils = render(
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
        console.log(utils);
        expect(utils.queryByText(item.value)).toHaveLength(1);
    });
});
