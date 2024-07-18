import React, { useRef, useState } from 'react';
import '@/assets/styles/components/search/searchResultItem.scss';
import * as RBS from 'react-bootstrap';
import { ThreeDots, ListUl, HeartFill, BookmarkFill, StarFill } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

// Hooks
import useOutsideCallback from '@/hooks/useOutsideCallback';

// Interfaces
import { IMovie } from '@/interfaces/movies';

interface ISearchResultItemProps {
  movie: IMovie;
}

const SearchResultItem: React.FC<ISearchResultItemProps> = ({ movie }) => {
  const wrapperRef = useRef(null);
  useOutsideCallback(wrapperRef, () => resetActions());
  const [blurOn, setBlurOn] = useState<boolean>(false);

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleActionsClick = () => {
    setBlurOn(true);
    setShow(!show);
  };

  const resetActions = () => {
    setBlurOn(false);
    setShow(false);
  };
  return (
    <div className='search-result-item' ref={wrapperRef}>
      <div className='search-result-item__context'>
        <div className='search-result-item__image-box'>
          <div className='search-result-item__actions' ref={target} onClick={handleActionsClick}>
            <ThreeDots className='search-result-item__actions-icon' />
          </div>
          <LinkContainer to={'/movie/' + movie.id}>
            <RBS.Image
              className='search-result-item__image-logo'
              src={import.meta.env.VITE_TMDB_IMAGES_LOCATION_URL + `/${movie.poster_path}`}
              alt={movie.title}
            />
          </LinkContainer>
          <div className='search-result-item__rate'>
            <span className='search-result-item__rate-value'>
              {Math.round(movie.vote_average * 10)}
            </span>
            <span className='search-result-item__rate-symbol'>%</span>
          </div>
          <div className='search-result-item__rate-circle'>
            <RateCircle rate={Math.round(movie.vote_average * 10)} />
          </div>
        </div>
        <div className='search-result-item__text'>
          <LinkContainer to={'/movie/' + movie.id}>
            <h6 className='search-result-item__title'>{movie.title}</h6>
          </LinkContainer>
          <p className='search-result-item__date'>{movie.release_date}</p>
        </div>
      </div>
      <div
        className={`search-result-item__blur ${blurOn ? '' : 'd-none'}`}
        onClick={resetActions}
      ></div>
      <RBS.Overlay
        show={show}
        target={target.current}
        placement='bottom'
        container={wrapperRef}
        containerPadding={20}
      >
        <RBS.Popover id='popover-contained' className='search-result-item__popover'>
          <RBS.Popover.Body>
            <RBS.ListGroup>
              <RBS.ListGroup.Item action className='search-result-item__popover-item'>
                <ListUl className='search-result-item__popover-icon' />
                <span className='search-result-item__popover-title'>Add to list</span>
              </RBS.ListGroup.Item>
              <RBS.ListGroup.Item action className='search-result-item__popover-item'>
                <HeartFill className='search-result-item__popover-icon' />
                <span className='search-result-item__popover-title'>Favorite</span>
              </RBS.ListGroup.Item>
              <RBS.ListGroup.Item action className='search-result-item__popover-item'>
                <BookmarkFill className='search-result-item__popover-icon' />
                <span className='search-result-item__popover-title'>Watchlist</span>
              </RBS.ListGroup.Item>
              <RBS.ListGroup.Item action className='search-result-item__popover-item'>
                <StarFill className='search-result-item__popover-icon' />
                <span className='search-result-item__popover-title'>Your rating</span>
              </RBS.ListGroup.Item>
            </RBS.ListGroup>
          </RBS.Popover.Body>
        </RBS.Popover>
      </RBS.Overlay>
    </div>
  );
};

interface IRateCircleProps {
  rate: number;
}

// TODO Update for under 50%. Now shows 2 lines.
const RateCircle: React.FC<IRateCircleProps> = ({ rate }) => {
  let color = '#FAB041';
  const r = 17;

  switch (true) {
    case rate >= 50 && rate < 75:
      color = '#E7FC00';
      break;
    case rate >= 75:
      color = '#22FC00';
      break;
  }

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
      <g transform='rotate(-90 20 20)'>
        {rate && (
          <circle
            cx='18'
            cy='18'
            r={r}
            stroke={color}
            strokeWidth='2'
            fill='none'
            strokeDasharray={((2 * Math.PI * r) / 100) * rate}
          />
        )}
        <circle
          cx='18'
          cy='18'
          r={r}
          style={{ opacity: 0.2 }}
          stroke={color}
          strokeWidth='2'
          fill='none'
          strokeDasharray={2 * Math.PI * r}
        />
      </g>
    </svg>
  );
};

export default SearchResultItem;
