import React from "react";

function login() {
    const styles = {
        main: {
            width: '50%',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '5%',
        },
        input: {
            width: '100%',
            height: '20px',
            marginBottom: '20px',
            borderStyle:'none',
            borderBottom: '2px solid gray',
            fontSize: '20px',
            padding: '5px',
        },
        avatar: {
            width: '100%',
            height: '30px',
            marginBottom: '25px',
        },
        button: {
            width: '100%',
            height: '40px',
            borderRadius: '3px',
            borderStyle:'none',
            borderBottom: '2px solid gray',
            fontSize: '20px',
            padding: '10px',
        }
    }
    return (
        <div className='main' style={styles.main}>
            <h2>Login</h2>
            <form>
                <input type="text" placeholder='login' name='login' style={styles.input}/><br/>
                <input type="text" placeholder='password' name='password' style={styles.input}/><br/>
                <button style={styles.button}>Send</button>
            </form>
        </div>
    )
}

export default login;
