import React, { useState, useEffect } from 'react';
import UserAge from '../js/AgeGuessForm';
import UserTable from '../js/UserTable';
import ReactLoading from 'react-loading';
import { fetchUserAge } from '../../../utils/API';
import '../css/Home.css'

function Home() {
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleUserSearch = async (name) => {
        setIsLoading(true);

        try {
            const age = await fetchUserAge(name);

            const user = {
                name,
                age,
            };

            setSearchedUsers((prevUsers) => [...prevUsers, user]);
        } catch (error) {
            console.error('Error:', error);
        }

        setIsLoading(false);
    };

    return (
        <div className={`site-view ${searchedUsers.length === 0 ? "site-view-normal" : "site-view-data-filled"}`}>
            <div className="app">
                <h1 className="fade-in">Age Guessing Game</h1>
                <UserAge onUserSearch={handleUserSearch} />
                {isLoading ? (
                    <div className="loading">
                        <ReactLoading type="bars" color="#95D99B"
                            height={150} width={75} />
                    </div>
                ) : (
                    <UserTable users={searchedUsers} />
                )}
            </div>
            <div className="footer-Area">
                <footer className="footer">
                    Made with ❤️ by CodeSight
                </footer>
            </div>
        </div>
    );
}

export default Home;