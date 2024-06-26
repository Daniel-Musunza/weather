import React, { useState, useEffect } from 'react';

const RoomsModal = ({ isOpen, onClose, rooms, setRooms }) => {
    const [roomNo, setRoomNos] = useState(1);
   
    const handleAdultsChange = (index, value) => {
        const newRooms = [...rooms];
        newRooms[index].adults = value;
        setRooms(newRooms);
    };

    const handleChildrenChange = (index, value) => {
        const newRooms = [...rooms];
        newRooms[index].children = value;
        setRooms(newRooms);
    };

    const handleRoomNumberChange = (value) => {
        const newRoomNo = parseInt(value);
        setRoomNos(newRoomNo);
        const newRooms = Array(newRoomNo).fill().map((_, i) => rooms[i] || { adults: 2, children: 0 });
        setRooms(newRooms);
    };

    const allAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const allChildren = rooms.reduce((sum, room) => sum + room.children, 0);
  

    if (!isOpen) return null;

   
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center" style={{ zIndex: 9999 }}>
            <div className="bg-white rounded-lg shadow-lg w-96">
                <div className="px-4 py-2 border-b">
                    <h2 className="text-lg font-medium">Rooms</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900 float-right">X</button>
                </div>
                <div className="p-4">
                    <h3 className="text-md font-medium mb-2">{roomNo} Room{roomNo > 1 ? 's' : ''}, {allAdults} Adult{allAdults > 1 ? 's' : ''}{allChildren ? `, ${allChildren} Child${allChildren > 1 ? 'ren' : ''}` : ''}</h3>
                    <div className="mt-2 flex justify-between p-2">
                        <label className="block text-sm font-medium">Rooms</label>
                        <input
                            type="number"
                            value={roomNo}
                            onChange={(e) => handleRoomNumberChange(e.target.value)}
                            className="mt-1 block w-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            min="1"
                        />
                    </div>
                    <div className="h-[60vh] overflow-y-scroll">
                        {rooms.map((room, index) => (
                            <div key={index} className="mb-4">
                                <h4 className="font-semibold">Room {index + 1}</h4>
                                <div className="mt-2 flex justify-between p-2">
                                    <label className="block text-sm font-medium">Adults</label>
                                    <input
                                        type="number"
                                        value={room.adults}
                                        onChange={(e) => handleAdultsChange(index, parseInt(e.target.value))}
                                        className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        min="1"
                                    />
                                </div>
                                <div className="mt-2 flex justify-between p-2">
                                    <label className="block text-sm font-medium">Children</label>
                                    <input
                                        type="number"
                                        value={room.children}
                                        onChange={(e) => handleChildrenChange(index, parseInt(e.target.value))}
                                        className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        min="0"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-4 py-2 border-t flex justify-end w-full">
                    <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Continue</button>
                </div>
            </div>
        </div>
    );
};

export default RoomsModal;
