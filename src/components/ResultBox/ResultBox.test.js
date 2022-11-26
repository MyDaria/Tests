import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
  ];

  const negativeCases = [
      { amount: '-100', from: 'PLN', to: 'USD' },
      { amount: '-20', from: 'USD', to: 'PLN' },
      { amount: '-200', from: 'PLN', to: 'USD' },
      { amount: '-345', from: 'USD', to: 'PLN' },
  ];

  for(const testObj of testCases) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${formatAmountInCurrency((testObj.amount / 3.5), 'USD')}`);

      cleanup();
    });
  }

  for(const testObj of testCases) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${formatAmountInCurrency((testObj.amount * 3.5), 'PLN')}`);

      cleanup();
    });
  }

  for (const testObj of testCases) {
    it('should render proper info about conversion when PLN -> PLN', () => {
      render(<ResultBox from="PLN" to="PLN" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${formatAmountInCurrency(testObj.amount, 'PLN')}`);
      
      cleanup();
    });
  }

  for (const testObj of testCases) {
    it('should render proper info about conversion when USD -> USD', () => {
      render(<ResultBox from="USD" to="USD" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${formatAmountInCurrency(testObj.amount, 'USD')}`);

      cleanup();
      });
  }

  for (const testObj of negativeCases) {
    it('should render proper info if value is negative', () => {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={Number(testObj.amount)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value');

      cleanup();
      });
  }   
});