import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import '../styles/deliveryDays.css';
import axios from 'axios';
import baseUrl from '../../config';
import { useNavigate } from 'react-router-dom';

export default function DeliveryDays() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    fetchUnavailableDates();
  }, []);

  const fetchUnavailableDates = async () => {
    try {
      const response = await axios.get(`${baseUrl}/get-all-delivery-dates`);
      const dates = response.data.map(({ day, month, year }) => `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
      setUnavailableDates(dates);
    } catch (err) {
      console.error('Error fetching unavailable dates:', err);
    }
  };

  const addUnavailableDate = async (date) => {
    const [year, month, day] = date.split('-');
    try {
      await axios.post(`${baseUrl}/add-delivery-date`, { day: Number(day), month: Number(month), year: Number(year) });
      setUnavailableDates(prev => [...prev, date]);
    } catch (err) {
      console.error('Error adding unavailable date:', err);
    }
  };

  const removeUnavailableDate = async (date) => {
    const [year, month, day] = date.split('-');
    try {
      await axios.delete(`${baseUrl}/remove-delivery-date`, { data: { day: Number(day), month: Number(month), year: Number(year) } });
      setUnavailableDates(prev => prev.filter(d => d !== date));
    } catch (err) {
      console.error('Error removing unavailable date:', err);
    }
  };

  const toggleAvailability = (date) => {
    if (unavailableDates.includes(date)) {
      removeUnavailableDate(date);
    } else {
      addUnavailableDate(date);
    }
  };

  const renderHeader = () => (
    <div className="header">
      <button className="nav-button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>{'<'}</button>
      <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
      <button className="nav-button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>{'>'}</button>
    </div>
  );

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return <div className="days-row">{days.map(day => <div key={day} className="day-name">{day}</div>)}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const isUnavailable = unavailableDates.includes(formattedDate);
        const isCurrentMonth = isSameMonth(day, currentMonth);
        const className = `cell ${isUnavailable ? 'unavailable' : 'available'} ${isCurrentMonth ? '' : 'disabled'}`;

        days.push(
          <div
            key={formattedDate}
            className={className}
            onClick={() => isCurrentMonth && toggleAvailability(formattedDate)}
          >
            {format(day, 'd')}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day} className="row">{days}</div>);
      days = [];
    }
    return rows;
  };

  return (
    <div className="calendar-container">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="unavailable-table">
        <h3>Unavailable Dates</h3>
        <ul>
          {unavailableDates.map(date => (
            <li key={date}>
              {date}
              <button onClick={() => removeUnavailableDate(date)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <button className="back-button" onClick={() => navigate('/AdminHome')}>
        Back
      </button>
    </div>
  );
}
