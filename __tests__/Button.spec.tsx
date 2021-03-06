import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Button } from '../src/shared/components/button/Button';

afterEach(cleanup);

describe('Button', () => {
    const wrap = render(<Button label="ButtonText" />);

    it('should render the button label', () => {
        expect(wrap.getByText("ButtonText")).toBeTruthy()
    });
});
