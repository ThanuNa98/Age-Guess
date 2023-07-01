import React, { useState, useEffect } from 'react';
import UserAge from '../js/AgeGuessForm';
import UserTable from '../js/UserTable';
import UseAnimations from "react-useanimations";
import infinity from 'react-useanimations/lib/infinity';
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

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);

            // Fetch initial data or perform any other data loading operations

            setIsLoading(false);
        };

        loadData();
    }, []);

    return (
        <div className={`site-view ${searchedUsers.length === 0 ? "site-view-normal" : "site-view-data-filled"}`}>
            <div className="app">
                <h1 className="fade-in">Age Guesser</h1>
                <UserAge onUserSearch={handleUserSearch} />
                {isLoading ? (
                    <div className="loading">
                        <UseAnimations animation={infinity} size={56} strokeColor="#065106" />
                        <p>Loading...</p>
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