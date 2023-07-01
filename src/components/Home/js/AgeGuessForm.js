import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import '../css/AgeGuessForm.css';

function UserAge({ onUserSearch }) {
    const [name, setName] = useState('');
    const [tutorialText, setTutorialText] = useState('');
    const [isAnimating, setIsAnimating] = useState(true);
    const [isAnimatable, setAnimatable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const textToType = 'Enter your name';
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex === textToType.length) {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setTutorialText('');
                    setIsAnimating(false);
                    setTimeout(() => {
                        if (isAnimatable) {
                            setIsAnimating(true);
                            startTypingAnimation();
                        }
                    }, 1000);
                }, 1000);
                return;
            }

            setTutorialText((prevText) => prevText + textToType[currentIndex]);
            currentIndex++;
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    const handleFocus = () => {
        setIsAnimating(false);
        setAnimatable(false);
    };

    const handleBlur = () => {
        if (isAnimatable) {
            setIsAnimating(true);
            startTypingAnimation();
        }
    };

    const startTypingAnimation = () => {
        const textToType = 'Enter your name';
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex === textToType.length) {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setTutorialText('');
                    setIsAnimating(false);
                    setTimeout(() => {
                        if (isAnimatable) {
                            setIsAnimating(true);
                            startTypingAnimation();
                        }
                    }, 1000);
                }, 3000);
                return;
            }

            setTutorialText((prevText) => prevText + textToType[currentIndex]);
            currentIndex++;
        }, 100);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() !== '') {
            setIsLoading(true);
            try {
                await onUserSearch(name);
                setName('');
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="user-age">
            <form onSubmit={handleSubmit} className={isAnimatable && isAnimating ? 'fade-in' : ''}>
                <div className="input-container">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={tutorialText}
                        className="input-field"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        contentEditable
                        ref={inputRef}
                    />

                    <button type="submit" className="search-button">
                        {isLoading ? (
                            <>
                                <div className="loading-dice" />
                                <span>Guessing...</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faDice} className="guess-icon" />
                                <span>Guess</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserAge;