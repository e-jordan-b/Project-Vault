import React from 'react';
import { render, fireEvent, screen, getByLabelText } from '../utils/test-utils';
import CreateProject from './CreateProject';
import { BrowserRouter } from 'react-router-dom';

describe('CreateProject', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CreateProject open={true} onClose={onClose} />
      </BrowserRouter>
    );
  });

  it('renders submit form', () => {
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

  it('sumbits the form successfully', async () => {
    const mockNavigate = jest.fn();
    const mockCreateProject = jest.fn().mockResolvedValueOnce({ status: 200 });
    const mockProject = {
      id: '2',
      title: '',
      description: '',
      tags: [],
      quillValue: '',
      image: '',
      createdBy: null,
      updates: [],
      chat: [],
      author: '',
      date: '',
    }

    const titleInput = screen.getByLabelText('Title:');
    fireEvent.change(titleInput, { target: { value: 'Test Project' } });

    // const imageInput = screen.getByLabelText('Image:');
    // Object.defineProperty(imageInput, 'files', {
    //   value: [
    //     new File(['test'], 'test.png', { type: 'image/png' }),
    //   ],
    // });
    // fireEvent.change(imageInput);

    // const tagsInput = screen.getByLabelText('Tags:');
    // fireEvent.change(tagsInput, { target: { value: 'test, project' } });

    const submitButton = screen.getByText('Create new project');
    fireEvent.click(submitButton);

    await screen.findByText('Your new project');

    expect(mockCreateProject).toHaveBeenCalledWith({
      id: '2',
      title: 'Test Project',
      description: '',
      tags: [],
      quillValue: '',
      image: '',
      createdBy: null,
      updates: [],
      chat: [],
      author: '',
      date: '',
    });

    expect(mockNavigate).toHaveBeenCalledWith('/posts/2');
    expect(onClose).toHaveBeenCalled();
  })
})

// describe('CreateProject', () => {
//   it('submits the form', async () => {
//     const mockNavigate = jest.fn();
//     const mockCreateProject = jest.fn().mockResolvedValueOnce({ status: 200 });
//     const onClose = jest.fn();

//     const { getByLabelText, getByText } = render(
//       <CreateProject open={true} onClose={onClose} />,
//       {
//         // Mocking the useNavigate hook
//         wrapper: ({ children }) => (
//           <div>{children}</div>
//         ),
//       }
//     );

//     const titleInput = getByLabelText('Title:');
//     fireEvent.change(titleInput, { target: { value: 'Test Project' } });

//     const descriptionInput = screen.getByRole('textbox', { name: 'Rich Text Editor, snow' });
//     fireEvent.change(descriptionInput, { target: { value: 'Test description' } });

//     const imageInput = getByLabelText('Image:');
//     Object.defineProperty(imageInput, 'files', {
//       value: [
//         new File(['test'], 'test.png', { type: 'image/png' }),
//       ],
//     });
//     fireEvent.change(imageInput);

//     const tagsInput = getByLabelText('Tags:');
//     fireEvent.change(tagsInput, { target: { value: 'test, project' } });

//     const submitButton = getByText('Create new project');
//     fireEvent.click(submitButton);

//     await screen.findByText('Your new project');

//     expect(mockCreateProject).toHaveBeenCalledWith({
//       title: 'Test Project',
//       description: 'Test description',
//       tags: 'test, project',
//       quillValue: '',
//       image: '',
//       createdBy: null,
//       updates: [],
//       chat: [],
//       author: '',
//       date: '',
//     });

//     expect(mockNavigate).toHaveBeenCalledWith('/posts/null');
//     expect(onClose).toHaveBeenCalled();
//   });
// });
