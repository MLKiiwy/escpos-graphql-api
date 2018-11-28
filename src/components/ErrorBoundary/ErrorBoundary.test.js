import React from 'react';
import { shallow, mount } from 'enzyme';
import ErrorBoundary from './ErrorBoundary';

beforeEach(() => {
  // Needed to remove the annoying error message from the throw below
  jest.spyOn(window.console, 'error').mockImplementation(() => false);
});

describe('ErrorBoundary', () => {
  it('renders without crashing', () => {
    shallow(<ErrorBoundary />);
  });

  it('renders an error message when an error is thrown', () => {
    const ErrorChild = () => {
      throw new Error('foo');
    };

    const component = mount(
      <ErrorBoundary>
        <ErrorChild />
      </ErrorBoundary>
    );

    expect(component).toMatchSnapshot();
  });
});
