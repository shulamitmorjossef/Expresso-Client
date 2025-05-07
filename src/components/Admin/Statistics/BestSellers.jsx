import React, { useState } from 'react';
import axios from 'axios';

export default function BestSellers() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchBestSellers = async () => {
        setError('');
        setResults([]);

        if (!startDate || !endDate) {
            setError('Please select both dates.');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            setError('Invalid date range.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3000/BestSellers`, 
                {
                    params: {
                        startDate,
                        endDate,
                    },
                }
            );

            if (response.data.message) {
                setError(response.data.message); // No data for selected period
            } else {
                setResults(response.data);
            }
        } catch (err) {
            setError('Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Best Selling Products</h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                    <label className="block">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                </div>

                <div>
                    <label className="block">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                </div>

                <button
                    onClick={fetchBestSellers}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    View
                </button>
            </div>

            {error && <p className="text-red-600">{error}</p>}

            {loading && <p>Loading...</p>}

            {results.length > 0 && (
                <table className="w-full mt-4 border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left">Product Name</th>
                            <th className="border px-4 py-2 text-left">Units Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((product, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{product.name}</td>
                                <td className="border px-4 py-2">{product.total_sold}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}