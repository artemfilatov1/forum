import React from "react";

function toolbar() {
    const styles = {
        toolbar: {
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            paddingBottom: '20px',
            paddingTop: '20px',
            backgroundColor: 'gray',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            margin: '0px'
        },
        a: {
            color: 'white',
            fontSize: '20px',
            marginRight: '20px',
            marginLeft: '20px',
        }
    }
    return (
        <div>
            <div style={styles.toolbar}>
                <a href="/api/auth/login" style={styles.a}>login</a>
                <a href="/api/auth/register" style={styles.a}>register</a>
                <a href="/" style={styles.a}>home</a>
            </div>
        </div>
    )
}

export default toolbar;