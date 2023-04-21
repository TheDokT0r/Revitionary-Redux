import axios from 'axios';

const addView = async (revId) => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

    try {
        const response = await axios.post(`${SERVER_URL}/revitions/view/${revId}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export default addView;