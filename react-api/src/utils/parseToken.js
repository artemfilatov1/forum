export const parseToken = (token) => {
    try {
        console.log(token);
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};