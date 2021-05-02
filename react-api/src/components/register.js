import React from "react";

function register() {
    return (
        <div>
            <span className='input'>
                <input type="text" placeholder='login' name='login'/><br/>
                <input type="text" placeholder='password' name='password'/><br/>
                <input type="text" placeholder='confirm password' name='confirmPassword'/><br/>
                <input type="text" placeholder='email' name='email'/><br/>
                <input type="file" placeholder='avatar' name='avatar'/><br/>
            </span>
            <input type='submit' value='register'/><br/>
        </div>
    );
}

export default register;
