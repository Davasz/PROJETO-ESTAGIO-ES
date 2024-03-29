// Imports
import axios from 'axios'

// Method to get new Spotify auth token
const getToken = async () => {
    const body = new URLSearchParams({
        // I didn't use dotenv to facilitate the project startup process, 
        // something in production would definitely use it
        grant_type: 'client_credentials',
        client_id: '7f8086af9a1d445e8f267a629e4753f5',
        client_secret: '84fe23d2d4b240a7860e768e607a060b'
    });
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const responseToken = await axios.post('https://accounts.spotify.com/api/token', body, { headers })
        .then(response => response.data.access_token)


    // Store token at localStorage
    localStorage.setItem('token', responseToken)
    return responseToken
}

// Method to verify current token
const isTokenValid = async () => {
    const token = localStorage.getItem('token')

    try {
        await axios.get('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return true
    } catch (error) {
        localStorage.removeItem('token')
        return false
    }

}

// Method to always return a valid token
const verifyToken = async () => {
    let token = localStorage.getItem('token')

    if (!token) {
        token = await getToken()
        return token
    } else {
        const isValid = await isTokenValid()
        if (isValid) {
            token = await getToken()
            return token
        } else {
            return token
        }
    }
}


// Export function
export default verifyToken