import React, { useState, useEffect } from 'react';

function InputForm() {

    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('items');
        return savedItems ? JSON.parse(savedItems) : [];
    });

    const [priority, setPriority] = useState('low');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() !== '') { 
            let prevPriority = priority;
            setItems([...items, { text: inputValue, priority, prevPriority }]);  
            setInputValue('');
            setPriority('low');  
        }
    };

    const toggleCheck = (index) => {
        const updatedItems = items.map((item, idx) => {
            if (idx === index) {
                if (item.priority === 'completed') {
                    item.priority = item.prevPriority;
                }
                else {
                    item.priority = 'completed';
                }
            }
            return item;
        });
        setItems(updatedItems);
    };

    const removeItem = (indexToRemove) => {
        setItems(items.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    // To clear local storage
    //localStorage.clear();

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    placeholder="Enter todo..."
                />

                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select> 

                <button className='btn btn-dark' type="submit">Update</button>
                
            </form>
            
            <br/>
            
            <ul>
                
                {items.sort((a, b) => {
                    const priorityOrder = { high: 1, medium: 2, low: 3, completed: 4};
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                }).map((item, index) => (
                    <li data-bs-theme="dark" className='flex' key={index}>
                        <label 
                            onClick={() => toggleCheck(index)} 
                            className={`btn ${item.priority==='completed' ? "btn-success" : item.priority==='low' ? "btn-dark" : item.priority==='medium' ? "btn-warning" : "btn-danger"}`} 
                            style={{ textDecoration: item.priority==='completed' ? 'line-through' : 'none' }} 
                            role="alert"
                        >
                            {item.text}
                        </label>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => removeItem(index)} style={{ marginLeft: '10px' }}></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InputForm; 