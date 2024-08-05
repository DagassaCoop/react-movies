import React, { useRef, useState } from 'react';
import * as RBS from 'react-bootstrap';
import { ThreeDots, ListUl, HeartFill, BookmarkFill, StarFill } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';

// Assets
import '@/assets/styles/components/shared/itemPreview.scss';

// Hooks
import useOutsideCallback from '@/hooks/useOutsideCallback';

// Interfaces
import { IMovie } from '@/interfaces/movies.interface';

interface IResultItemProps {
  item: IMovie;
  itemType: string;
}

const ResultItem: React.FC<IResultItemProps> = ({ item, itemType }) => {
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
    <div className='item-preview' ref={wrapperRef}>
      <div className='item-preview__context'>
        <div className='item-preview__image-box'>
          <div className='item-preview__actions' ref={target} onClick={handleActionsClick}>
            <ThreeDots className='item-preview__actions-icon' />
          </div>
          <LinkContainer to={`/${itemType}/${item.id}`}>
            <RBS.Image
              className='item-preview__image-logo'
              src={import.meta.env.VITE_TMDB_IMAGES_LOCATION_URL + import.meta.env.VITE_TMDB_IMAGE_500_SIZE + `/${item.poster_path}`}
              alt={item.title}
            />
          </LinkContainer>
          <div className='item-preview__rate'>
            <span className='item-preview__rate-value'>
              {Math.round(item.vote_average * 10)}
            </span>
            <span className='item-preview__rate-symbol'>%</span>
          </div>
          <div className='item-preview__rate-circle'>
            <RateCircle rate={Math.round(item.vote_average * 10)} />
          </div>
        </div>
        <div className='item-preview__text'>
          <LinkContainer to={`/${itemType}/item.id`}>
            <h6 className='item-preview__title'>{item.title}</h6>
          </LinkContainer>
          <p className='item-preview__date'>{item.release_date}</p>
        </div>
      </div>
      <div
        className={`item-preview__blur ${blurOn ? '' : 'd-none'}`}
        onClick={resetActions}
      ></div>
      <RBS.Overlay
        show={show}
        target={target.current}
        placement='bottom'
        container={wrapperRef}
        containerPadding={20}
      >
        <RBS.Popover id='popover-contained' className='item-preview__popover'>
          <RBS.Popover.Body>
            <RBS.ListGroup>
              <RBS.ListGroup.Item action className='item-preview__popover-item'>
                <ListUl className='item-preview__popover-icon' />
                <span className='item-preview__popover-title'>Add to list</span>
              </RBS.ListGroup.Item>
              <RBS.ListGroup.Item action className='item-preview__popover-item'>
                <HeartFill className='item-preview__popover-icon' />
                <span className='item-preview__popover-title'>Favorite</span>
              </RBS.ListGroup.Item>
              <RBS.ListGroup.Item action className='item-preview__popover-item'>
                <BookmarkFill className='item-preview__popover-icon' />
                <span className='item-preview__popover-title'>Watchlist</span>
              </RBS.ListGroup.Item>
              <RBS.ListGroup.Item action className='item-preview__popover-item'>
                <StarFill className='item-preview__popover-icon' />
                <span className='item-preview__popover-title'>Your rating</span>
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

export default ResultItem;
