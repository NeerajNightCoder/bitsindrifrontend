'use client'
import React, { useState, useEffect } from 'react';

// Define the interface for a printing order
interface PrintingOrder {
  id: number;
  name: string;
  type: string;
  size: string;
  charges: number;
  status: string;
}

// Define the props interface (if needed)
interface PrintOrdersTableProps {
  // Add any props here if required
}

const PrintOrdersTable: React.FC<PrintOrdersTableProps> = () => {
  const [printingOrders, setPrintingOrders] = useState<PrintingOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<PrintingOrder[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Simulate fetching data from a database
  useEffect(() => {
    const fetchData = async () => {
      // Replace this with an actual API call to fetch data
      const data: PrintingOrder[] = [
        { id: 1, name: 'Avinya 2024 workshop.jpeg', type: 'PDF', size: '255KB', charges: 10, status: 'Pending' },
        { id: 2, name: 'Avinya 2024 workshop.pdf', type: 'PDF', size: '300KB', charges: 15, status: 'Completed' },
        { id: 3, name: 'Avinya 2024 workshop.png', type: 'Image', size: '500KB', charges: 20, status: 'Pending' },
        // Add more data as needed
      ];
      setPrintingOrders(data);
      setFilteredOrders(data); // Initially show all orders
    };

    fetchData();
  }, []);

  // Filter orders based on the active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredOrders(printingOrders);
    } else {
      const filtered = printingOrders.filter(order => order.status.toLowerCase() === activeFilter);
      setFilteredOrders(filtered);
    }
  }, [activeFilter, printingOrders]);

  const handleFilterClick = (filter: 'all' | 'pending' | 'completed') => {
    setActiveFilter(filter);
  };

  return (
    <div>
      <div className="flex justify-around p-3">
        <button
          className={`text-orange-400 ${activeFilter === 'pending' ? 'font-bold' : ''}`}
          onClick={() => handleFilterClick('pending')}
        >
          Pending
        </button>
        <button
          className={`text-green-400 ${activeFilter === 'completed' ? 'font-bold' : ''}`}
          onClick={() => handleFilterClick('completed')}
        >
          Completed
        </button>
        <button
          className={`text-blue-400 ${activeFilter === 'all' ? 'font-bold' : ''}`}
          onClick={() => handleFilterClick('all')}
        >
          All
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sl.No.</th>
            <th className="name">Name</th>
            <th className="type">Type</th>
            <th className="">Size</th>
            <th className="">Charges</th>
            <th className="">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.name}</td>
              <td>{order.type}</td>
              <td>{order.size}</td>
              <td>{order.charges}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrintOrdersTable;