import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Layout } from '~/layout.jsx';

describe('<Layout />', () => {

    let minimalProps;

    beforeEach(() => {
        minimalProps = {
            greeting: {
                message: ''
            }
        };
    });

    it('renders', () => {
        let shallowRenderedComponent = shallow(<Layout {...minimalProps} />);
        expect(shallowRenderedComponent.length).to.equal(1);
    });

});
