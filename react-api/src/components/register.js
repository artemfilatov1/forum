import React from "react";

function register() {
    const styles = {
        main: {
            width: '700px',
            border: '1px solid black',
            borderRadius: '4px',
            display: 'flex',
            textAlign: 'center',
            margin: '15%',
            padding: '20px'
        },
        input: {
            width: '100%',
            height: '20px',
            border: '1px solid black',
            borderRadius: '4px',
            marginBottom: '10px',
        },
        avatar: {
            width: '100%',
            height: '30px',
            marginBottom: '15px',
        }
    }
    return (
        <div className='main' style={styles.main}>
            <form className='input' style={{width:'100%'}}>
                <input type="text" placeholder='login' name='login' style={styles.input}/><br/>
                <input type="text" placeholder='password' name='password' style={styles.input}/><br/>
                <input type="text" placeholder='confirm password' name='confirmPassword' style={styles.input}/><br/>
                <input type="text" placeholder='email' name='email' style={styles.input}/><br/>
                <input type="file" placeholder='avatar' name='avatar' style={styles.avatar}/><br/>
                <button style={styles.input}>Send</button>
            </form>
        </div>
    )
}

export default register;
