import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageContainer from '../PageContainer';

describe('PageContainer', () => {
  it('renders children correctly', () => {
    render(
      <PageContainer>
        <div data-testid="test-child">Test Content</div>
      </PageContainer>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    );
    
    const container = screen.getByText('Content').closest('.flex');
    expect(container).toHaveClass('flex', 'justify-left', 'mt-10');
    
    const innerContainer = screen.getByText('Content').closest('.w-full');
    expect(innerContainer).toHaveClass('w-full', 'max-w-4xl', 'p-8', 'rounded-lg', 'shadow-lg');
  });

  it('accepts additional className prop', () => {
    render(
      <PageContainer className="custom-class bg-gray-100">
        <div>Content</div>
      </PageContainer>
    );
    
    const container = screen.getByText('Content').closest('.flex');
    expect(container).toHaveClass('custom-class', 'bg-gray-100');
  });
}); 