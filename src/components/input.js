import React  from 'react';


function Input({type,onKeyDown,onChange},ref){
    return <input type={type} style={{margin:'5px'}} onKeyDown={onKeyDown} ref={ref} onChange={onChange} />
   
}

const forwardedRef =React.forwardRef(Input)

export default forwardedRef;