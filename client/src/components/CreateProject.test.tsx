import React from 'react';
import { render, fireEvent, screen } from '../utils/test-utils';
import CreateProject from './CreateProject';
import { BrowserRouter } from 'react-router-dom';

describe('CreateProject rendering tests', () => {
  const onClose = jest.fn();

  it('renders the submit form', () => {
    render(
      <BrowserRouter>
        <CreateProject open={true} onClose={onClose} />
      </BrowserRouter>
    );
    const titleInput = screen.getByLabelText('Title:');
    const descriptionInput = screen.getByText('Description:');
    const imgInput = screen.getByLabelText('Image:');
    const tagsInput = screen.getByLabelText('Tags:');
    const submitBtn = screen.getByRole('submit-button');
    const closeBtn = screen.getByRole('close-button');
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(imgInput).toBeInTheDocument();
    expect(tagsInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
  })

  it('executes onClose() when closeBtn is clicked', () => {
    render(
      <BrowserRouter>
        <CreateProject open={true} onClose={onClose} />
      </BrowserRouter>
    );
    const closeBtn = screen.getByRole('close-button');
    fireEvent.click(closeBtn)
    expect(onClose).toHaveBeenCalled();
  })

  it('Does not render the component if open is false', () => {
    render(
      <BrowserRouter>
        <CreateProject open={false} onClose={onClose} />
      </BrowserRouter>
    );
    expect(document.querySelector('.overlay')).not.toBeInTheDocument();
  })
})

