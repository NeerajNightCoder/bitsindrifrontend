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
  printItems:PrintingOrder[]
  // Add any props here if required
}

const PrintOrdersTable: React.FC<PrintOrdersTableProps> = ({printItems}:PrintOrdersTableProps) => {
  console.log(printItems)
  
  const [printingOrders, setPrintingOrders] = useState<PrintingOrder[]>(printItems);
  const [filteredOrders, setFilteredOrders] = useState<PrintingOrder[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'PENDING' | 'DONE'>('all');


  // Filter orders based on the active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredOrders(printingOrders);
    } else {
      const filtered = printingOrders.filter(order => order.status.toLowerCase() === activeFilter.toLocaleLowerCase());
      setFilteredOrders(filtered);
    }
  }, [activeFilter, printingOrders]);

  const handleFilterClick = (filter: 'all' | 'PENDING' | 'DONE') => {
    setActiveFilter(filter);
  };

  return (
    <div>
      <div className="flex justify-around p-3">
        <button
          className={`text-orange-400 ${activeFilter === 'PENDING' ? 'font-bold' : ''}`}
          onClick={() => handleFilterClick('PENDING')}
        >
          PENDING
        </button>
        <button
          className={`text-green-400 ${activeFilter === 'DONE' ? 'font-bold' : ''}`}
          onClick={() => handleFilterClick('DONE')}
        >
          DONE
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