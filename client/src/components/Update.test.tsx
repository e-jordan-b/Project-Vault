import React from 'react';
import { render, screen } from '@testing-library/react';
import Updates from './Updates';
import { ProjectUpdate } from '../types/project.type';

const mockUpdates: ProjectUpdate[] = [
  {
    _id: '1',
    video: 'https://www.example.com/video.mp4',
    image: '',
    title: 'Test title 1',
    description: 'Test description 1',
    date: '2023-05-02',
  },
  {
    _id: '2',
    video: '',
    image: 'test-image-2',
    title: 'Test title 2',
    description: 'Test description 2',
    date: '2023-05-03',
  },
];

describe('Updates component', () => {
  beforeEach(() => {
    render(<Updates updates={mockUpdates} />);
  });

  test('renders the Updates component', () => {
    const updateContainer = screen.getByTestId('updateContainer');
    expect(updateContainer).toBeInTheDocument();
  });

  test('renders the correct number of update elements', () => {
    const updateElements = screen.getAllByTestId('updateInfo');
    expect(updateElements.length).toBe(mockUpdates.length);
  });

  test('renders an image or a video based on the input data', () => {
    const videoElement = screen.getByTestId('video');
    const imageElement = screen.getByTestId('imageDivUpdate');

    expect(videoElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });

  test('renders the correct title and description', () => {
    const titleElement = screen.getByText(/Test title 1/);
    const descriptionElement = screen.getByText(/Test description 1/);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test('sets the correct date for each update', () => {
    const dateElements = screen.getAllByTestId('updateDate');

    expect(dateElements[0].textContent).toBe(mockUpdates[0].date);
    expect(dateElements[1].textContent).toBe(mockUpdates[1].date);
  });

  test('sets the correct background image URL', () => {
    const imageElement = screen.getByTestId('imageDivUpdate');
    const expectedBackgroundImage = `url(https://res.cloudinary.com/${process.env.REACT_APP_KEY}/image/upload/v1681997706/${mockUpdates[1].image}.jpg)`;

    expect(imageElement).toHaveStyle(
      `background-image: ${expectedBackgroundImage}`
    );
  });
});
