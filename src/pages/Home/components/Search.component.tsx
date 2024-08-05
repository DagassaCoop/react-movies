import React from "react";

// Assets
import "@/assets/styles/pages/home/homeSearch.scss";

interface ISearchProps {
  bgImageLink: string;
}

const Search: React.FC<ISearchProps> = ({ bgImageLink }) => {
  return (
    <section className="home-search">
      <div className="home-search__bg" style={{ backgroundImage: `url(${bgImageLink ?? ""})`}} />
      <div className="home-search__content">
        <h1 className="home-search__title">Welcome.</h1>
        <h2 className="home-search__subtitle">Millions of movies, TV shows and people to discover. Explore now.</h2>
      </div>
    </section>
  );
};

export default Search;