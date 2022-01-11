import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

export default function SearchInput({
    loading,
    options,
    requests,
    placeholder,
}) {
    const [inputValue, setInputValue] = useState('');

    const debounceSave = useCallback(debounce((val)=> requests(val),500),[])

    const updateValue = (newValue) => {
        setInputValue(newValue);
        debounceSave(newValue);
    };
    return (
        <div>
            <h3>Search Filter</h3>
            <input
                value={inputValue}
                onChange={(e) => updateValue(e.target.value)}
                placeholder={placeholder}
            />
          {/* {console.log(options)}
                <ul>
                    {loading && <li>Loading...</li>}
                    {options?.length > 0 &&
                        !loading &&
                        options?.map((value, index) => (
                            <li key={`${value.name}-${index}`}>{value.name}</li>
                        ))}
                </ul> */}
            
        </div>
    );
}