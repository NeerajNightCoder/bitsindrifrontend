'use client'
import React, { useState, useEffect } from 'react';
import './PrintOrdersTable.css'

// Define the interface for a printing order
interface PrintingOrder {
  id: number;
  name: string;
  file: string;
  size: string;
  instruction: string;
  status: string;
}

// Define the props interface (if needed)
interface PrintOrdersTableProps {
  printItems:PrintingOrder[]
  // Add any props here if required
}

const PrintOrdersTable: React.FC<PrintOrdersTableProps> = ({printItems}:PrintOrdersTableProps) => {
  console.log(printItems)
  const [filteredOrders, setFilteredOrders] = useState<PrintingOrder[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'PENDING' | 'DONE'>('all');


  // Filter orders based on the active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredOrders(printItems);
    } else {
      const filtered = printItems.filter(order => order.status.toLowerCase() === activeFilter.toLocaleLowerCase());
      setFilteredOrders(filtered);
    }
  }, [activeFilter, printItems]);

  const handleFilterClick = (filter: 'all' | 'PENDING' | 'DONE') => {
    setActiveFilter(filter);
  };

  return (
    <div className='w-full flex flex-col items-center' id=''>
      <div className="p-5 flex justify-around w-1/2">
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
      <table className='printtable p-5'>
        <thead>
          <tr>
            <th>Sl.No.</th>
            <th className="" id="filename">Name</th>
            <th className="type">View</th>
            <th className="">Instruction</th>
            <th className="">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td className=''>{"Avinya 2024 workshop.jpeg"}</td>
              <td><a href={order.file} target="_blank">View</a></td>
              <td>{order.instruction}</td>
              <td ><span className={`orderstatus ${order.status=='DONE'?'orderdone':""}`}>{order.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrintOrdersTable;