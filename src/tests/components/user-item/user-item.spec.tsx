import {UserItem} from '../../../components/user-item/user-item';
import {render} from '@testing-library/react';
import React from 'react';
import {UserItemProps} from '../../../components/user-item/user-item.interface';
import {RenderWithStore} from '../../helpers/render-component-with-store';

const defaultProps: UserItemProps = {
    user: {},
    isExpanded: false,
    fetchRepos: jest.fn(),
    onExpandHandler: jest.fn(),
};

describe('user-item', (): void => {
    it('should not render accordion details if isExpanded prop is false', (): void => {
        const {queryByTestId} = render(
            <RenderWithStore>
                <UserItem {...defaultProps} isExpanded={false} />
            </RenderWithStore>
        );
        const accordionDetails = queryByTestId('userItemAccordionDetails');
        expect(accordionDetails).not.toBeInTheDocument();
    });
    it('should render accordion details if isExpanded prop is true', (): void => {
        const {queryByTestId} = render(
            <RenderWithStore>
                <UserItem {...defaultProps} isExpanded={true} />
            </RenderWithStore>
        );
        const accordionDetails = queryByTestId('userItemAccordionDetails');
        expect(accordionDetails).toBeInTheDocument();
    });
});
