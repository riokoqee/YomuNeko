import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import japanIcon from "../assets/images/Japan.png";
import chinaIcon from "../assets/images/China.png";
import KoreaIcon from "../assets/images/South-Korea.png";

function Home() {
    return(
        <>
            <Header />
            <Sidebar />
            <section className="home__main" id="home">
                <div className="home__poster">
                    <h1 className="poster__title">
                        В а н&nbsp; &nbsp; П и с
                    </h1>
                    <p className="poster__description">
                        "Кид, так сосредоточившийся на том, чтобы сделать птицу из металлолома, не замечает, <br /> 
                        как его голова превращается в птичье гнездо."
                    </p>
                    <button className="poster__button">
                        Ч И Т А Т Ь
                    </button>
                    <article className="poster__type">
                        <img src={japanIcon} alt="japan icon" className="country__icon" />
                        <span className="type__name">
                            М а н г а
                        </span>
                    </article>
                    <article className="poster__chapter">
                        <p className="poster__chapter__number">
                            Глава 1012
                        </p>
                    </article>
                </div>
                <div className="home__recommendations">
                    <h1 className="recommendation__title">
                        Рекомендации
                    </h1>
                    <ul className="recommendation__list">
                        <li className="recommendation__item">
                            <div className="recommendation__poster one_piece">
                                <article className="recommendation__type">
                                    <img src={japanIcon} alt="japan icon" className="recommendation__country" />
                                    <p className="country__name">
                                        Манга
                                    </p>
                                </article>
                            </div>
                        </li>
                        <li className="recommendation__item">
                            <div className="recommendation__poster solo_leveling">
                                <article className="recommendation__type korea">
                                    <img src={KoreaIcon} alt="korea icon" className="recommendation__country" />
                                    <p className="country__name">
                                        Манхва
                                    </p>
                                </article>
                            </div>
                        </li>
                        <li className="recommendation__item">
                            <div className="recommendation__poster berserk">
                                <article className="recommendation__type">
                                    <img src={japanIcon} alt="japan icon" className="recommendation__country" />
                                    <p className="country__name">
                                        Манга
                                    </p>
                                </article>
                            </div>
                        </li>
                        <li className="recommendation__item">
                            <div className="recommendation__poster versatile_mage">
                                <article className="recommendation__type korea">
                                    <img src={KoreaIcon} alt="korea icon" className="recommendation__country" />
                                    <p className="country__name">
                                        Манхва
                                    </p>
                                </article>
                            </div>
                        </li>
                        <li className="recommendation__item">
                            <div className="recommendation__poster beginning_after_end">
                                <article className="recommendation__type china">
                                    <img src={chinaIcon} alt="china icon" className="recommendation__country" />
                                    <p className="country__name">
                                        Маньхуа
                                    </p>
                                </article>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
};

export default Home;