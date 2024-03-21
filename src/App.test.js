import { Characters } from './Components/Character/Characters';
import { CharacterDetails } from './Components/Character/Characters';
import { CharacterList } from './Components/Character/CharacterList';
import { CharacterForm } from './Components/Character/CharacterForm';

import { App } from './App';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

describe('Homepage rendering', () => {
  test('home page renders', () => {
    render(<App />);
    const linkElement = screen.getByText('Character Manager');
    expect(linkElement).toBeInTheDocument();
  });
});

describe('CharacterList component', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

  test('renders character list by default', async() => {
      render(<Characters />, { wrapper: MemoryRouter });
      expect(screen.getByText('List of Characters')).toBeInTheDocument();
    });

  // Test fetching character details
  test('renders character details', async() => {
  // Mock the character data
  const characterData = {
    id: 1,
    name: 'Test Character',
    age: 30,
    iconicLines: 'I am Iron Man',
    creator: 'Stan Lee',
    description: 'Test description',
  };

  // Mock the API response
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(characterData),
    ok: true,
  });

  // Render the component with the character ID in the URL
  render(
    <MemoryRouter initialEntries={['/characters/1']}>
      <Routes>
        <Route path="/characters/:id" element={<CharacterDetails />} />
      </Routes>
    </MemoryRouter>
  );

  // Wait for the character details to be rendered
  await waitFor(() => {
    expect(screen.getByText('Character Details')).toBeInTheDocument();
    expect(screen.getByText(`Name: ${characterData.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Age: ${characterData.age}`)).toBeInTheDocument();
    expect(screen.getByText(`Iconic Lines: ${characterData.iconicLines}`)).toBeInTheDocument();
    expect(screen.getByText(`Creator: ${characterData.creator}`)).toBeInTheDocument();
    expect(screen.getByText(`Description: ${characterData.description}`)).toBeInTheDocument();
  });});
});

describe('CharacterForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock function calls before each test
  });

  test('renders character form', async () => {
    render(
      <MemoryRouter initialEntries={['/characters/add']}>
        <Routes>
          <Route path="/characters/add" element={<CharacterForm />} />
        </Routes>
      </MemoryRouter>
    );
  
    expect(screen.getByText('Add Character')).toBeInTheDocument();
  });

  test('submits form data on save button click', async () => {
    // Mock the fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, name: 'Test Character' }),
    });

    const props = {
      displayList: jest.fn(), // Mock the displayList function
    };

    render(
      <BrowserRouter>
        <CharacterForm {...props} />
      </BrowserRouter>
    );
    // Fill in form inputs
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Character' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText('Iconic Lines'), { target: { value: 'Test Iconic Lines' } });
    fireEvent.change(screen.getByLabelText('Creator'), { target: { value: 'Test Creator' } });

    // Submit the form
    fireEvent.click(screen.getByText('Save'));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1); // Ensure fetch is called once
      expect(fetch).toHaveBeenCalledWith('http://localhost:3005/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Character',
          age: '30',
          iconicLines: 'Test Iconic Lines',
          creator: 'Test Creator',
          description: '',
        }),
      });
     expect(screen.getByText('Character added successfully!')).toBeInTheDocument(); // Ensure success message is displayed
    });
  });
});