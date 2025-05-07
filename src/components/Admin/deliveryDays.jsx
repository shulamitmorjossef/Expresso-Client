import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import '../styles/deliveryDays.css';

export default function DeliveryDays() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    // Fetch unavailable dates from the server (mock data for now)
    setUnavailableDates(["2024-05-15", "2024-05-18", "2024-05-21"]);
  }, []);

  const renderHeader = () => {
    return (
      <div className="header">
        <button className="nav-button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>{'<'}</button>
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button className="nav-button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>{'>'}</button>
      </div>
    );
  };

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
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'yyyy-MM-dd');
        const isUnavailable = unavailableDates.includes(formattedDate);
        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, currentMonth);
        const className = `cell ${isUnavailable ? 'unavailable' : 'available'} ${isToday ? 'today' : ''} ${isCurrentMonth ? '' : 'disabled'}`;
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

  const toggleAvailability = (date) => {
    setUnavailableDates(prev =>
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
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
              <button onClick={() => toggleAvailability(date)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
