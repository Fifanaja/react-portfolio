import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";

// นำเข้ารูปภาพจาก assets ที่อยู่ภายใน src
import projImg1 from "../../assets/images/image1.png";
import projImg2 from "../../assets/images/image2.png";
import projImg3 from "../../assets/images/image3.png";

const Portfolio = () => { 
    const [letterClass, setLetterClass] = useState('text-animate');
    const [portfolio, setPortfolio] = useState([]);

    // Static portfolio data with imported images
    const portfolioData = [
        {
            name: "Threads",
            description: "Social mobile app.",
            url: "https://github.com/Fifanaja/Project-Flutter-Clone-App",
            image: projImg1 // ใช้รูปจาก assets
        },
        {
            name: "Acne scanning mobile app",
            description: "The app that will help make you look more beautiful.",
            url: "https://www.example.com",
            image: projImg2 // ใช้รูปจาก assets
        },
        {
            name: "Mobile restaurant",
            description: "The app will ensure you never have to endure hunger again.",
            url: "https://www.example.com",
            image: projImg3 // ใช้รูปจาก assets
        }
    ];

    useEffect(() => {
        setPortfolio(portfolioData); // ตั้งค่า portfolio data
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const renderPortfolio = (portfolio) => {
        return (
            <div className="images-container">
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div className="image-box" key={idx}>
                                <img 
                                    src={port.image} // ใช้รูปจาก data
                                    className="portfolio-image"
                                    alt={port.name}
                                />
                                <div className="content">
                                    <p className="title">{port.name}</p>
                                    <h4 className="description">{port.description}</h4>
                                    <button
                                        className="btn"
                                        onClick={() => window.open(port.url, '_blank')}
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    };

    return (
        <>
            <div className="container portfolio-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={"Portfolio".split("")}
                        idx={15}
                    />
                </h1>

                <div>{renderPortfolio(portfolio)}</div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Portfolio;
