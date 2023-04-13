import axios from "axios";

const sendFriendRequest = (uid) => {
    const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
    const token = localStorage.getItem('token');

    axios.post(`${url}/user/friendRequest`, { sendToUid: uid }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

export default sendFriendRequest;
