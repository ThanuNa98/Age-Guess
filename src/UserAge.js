import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import './style.css';

// UserAge component
function UserAge({ onUserSearch }) {
    const [name, setName] = useState('');
    const [tutorialText, setTutorialText] = useState('');
    const [isAnimating, setIsAnimating] = useState(true);
    const [isAnimatable, setAnimatable] = useState(true);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() !== '') {
            onUserSearch(name);
            setName('');
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
                        <FontAwesomeIcon icon={faDice} className="search-icon" />
                        Guess
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserAge;
