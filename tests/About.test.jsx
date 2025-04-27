import { render, screen, waitFor } from '@testing-library/react';
import About from '../src/components/About';  // ודא שהנתיב נכון

describe('About Component', () => {
  it('should render About component and display loaded data', async () => {
    // מרנדר את הקומפוננטה
    render(<About />);

    // מחכים שהנתונים ייטענו
    await waitFor(() => screen.getByText('About EXpresso'));

    // בודקים שהכותרת "About EXpresso" נמצאת במסך
    expect(screen.getByText('About EXpresso')).toBeInTheDocument();

    // בודקים אם לפחות חלק מהתוכן מוצג
    expect(screen.getByText('EXpresso is a unique digital coffee platform')).toBeInTheDocument();
  });
});
import { useState, useEffect } from 'react';

const About = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/about') // כתובת ה-API שלך
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching About content:', error));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.section1}</p>
      <p>{data.section2}</p>
      <p>{data.section3}</p>
      <p>{data.section4}</p>
      <p>{data.section5}</p>
    </div>
  );
};

export default About;
