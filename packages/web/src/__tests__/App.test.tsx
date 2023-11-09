/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import App from '../App';
import { validate } from '../helper'; 
import { toast } from 'react-toastify';

// Mock the modules with their correct types
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock('../helper');

type MockedToastSuccess = jest.MockedFunction<typeof toast.success>;
const mockedToastSuccess = toast.success as MockedToastSuccess;

type MockedValidate = jest.MockedFunction<typeof validate>;
const mockedValidate = validate as MockedValidate;


describe('<App />', () => {

  beforeEach(() => {
    mockedValidate.mockClear();
    mockedToastSuccess.mockClear();
    jest.useFakeTimers();
  });

  test('renders the credit card validator', () => {
    render(<App />);
    expect(screen.getByText('Credit Card Validator')).toBeInTheDocument();
  });

  test('displays error and prevents submission when invalid', async () => {
    mockedValidate.mockResolvedValue({ cardNumber: 'Invalid' });
    render(<App />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, { target: { value: '1234' } });
      jest.advanceTimersByTime(500);
    })

    await waitFor(() => {
      expect(screen.getByText('Invalid')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => expect(mockedToastSuccess).not.toHaveBeenCalled());
  });

  test('enables submit button and shows success on valid submission', async () => {
    mockedValidate.mockResolvedValue({}); // No errors
    render(<App />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const submitButton = screen.getByText('Submit') as HTMLButtonElement;

    await act(async () => {
      fireEvent.change(input, { target: { value: '1234567890123456' } });
      jest.advanceTimersByTime(500);
    })

    await waitFor(() => expect(submitButton).not.toBeDisabled());

    fireEvent.click(submitButton);
    await waitFor(() => expect(mockedToastSuccess).toHaveBeenCalledWith('1234567890123456 is a valid card number'));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });
})

