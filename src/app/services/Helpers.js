import moment from 'moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { defaultCategoryScheme } from '../config/dataScheme';
import jwtDecode from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token) return true;
  return false;
};

export const TextShrinker = ({
  text = '',
  count = 15,
  placement = 'bottom',
  tooltip = true,
}) => {
  return (
    <>
      {text?.length > count ? (
        <>
          {tooltip ? (
            <OverlayTrigger
              delay={{ hide: 450, show: 300 }}
              overlay={(props) => <Tooltip {...props}>{text}</Tooltip>}
              placement={placement}>
              <span>
                {text.substring(0, count)}
                <span className="text-shrinker-ellipsis">...</span>
              </span>
            </OverlayTrigger>
          ) : (
            <span>
              {text.substring(0, count)}
              <span className="text-shrinker-ellipsis">...</span>
            </span>
          )}
        </>
      ) : (
        text
      )}
    </>
  );
};

export const ParsedToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Unauthorized Access');
    window.location.href = '/login';
    return;
  }
  const parsedToken = jwtDecode(token);
  return {
    ...parsedToken,
    fullName: `${parsedToken?.fname?.toUpperCase()} ${parsedToken?.lname?.toUpperCase()}`,
  };
};
