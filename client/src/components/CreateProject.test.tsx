import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreateProject from './CreateProject';
import ReactQuill from 'react-quill';

describe('CreateProject', () => {
  it('submits the form', async () => {
    const mockNavigate = jest.fn();
    const mockCreateProject = jest.fn().mockResolvedValueOnce({ status: 200 });
    const onClose = jest.fn();

    const { getByLabelText, getByText } = render(
      <CreateProject open={true} onClose={onClose} />,
      {
        // Mocking the useNavigate hook
        wrapper: ({ children }) => (
          <div>{children}</div>
        ),
      }
    );

    const titleInput = getByLabelText('Title:');
    fireEvent.change(titleInput, { target: { value: 'Test Project' } });

    const descriptionInput = screen.getByRole('textbox', { name: 'Rich Text Editor, snow' });
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });

    const imageInput = getByLabelText('Image:');
    Object.defineProperty(imageInput, 'files', {
      value: [
        new File(['test'], 'test.png', { type: 'image/png' }),
      ],
    });
    fireEvent.change(imageInput);

    const tagsInput = getByLabelText('Tags:');
    fireEvent.change(tagsInput, { target: { value: 'test, project' } });

    const submitButton = getByText('Create new project');
    fireEvent.click(submitButton);

    await screen.findByText('Your new project');

    expect(mockCreateProject).toHaveBeenCalledWith({
      title: 'Test Project',
      description: 'Test description',
      tags: 'test, project',
      quillValue: 'Test description',
      image: '',
      createdBy: null,
      updates: [],
      chat: [],
      author: '',
      date: '',
    });

    expect(mockNavigate).toHaveBeenCalledWith('/posts/null');
    expect(onClose).toHaveBeenCalled();
  });
});
