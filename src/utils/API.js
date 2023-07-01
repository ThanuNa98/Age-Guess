import axios from 'axios';

export async function fetchUserAge(name) {
    try {
        const shortenedName = name.substring(0, 5);
        const url = `https://api.agify.io/?name=${shortenedName}`;
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error('Failed to fetch user age.');
        }

        const data = response.data;
        return data.age;
    } catch (error) {
        throw new Error('Failed to fetch user age.');
    }
}
