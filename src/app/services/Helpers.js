import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import { roles } from './Access';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token) return true;
  return false;
};

export const TextShrinker = ({
  text = '',
  count = 15,
  placement = 'bottom',
  tooltip = true
}) => {
  return(
    <>
      {text?.length > count ? (
        <>
          {tooltip ?(
            <OverlayTrigger
              delay={{ hide: 450, show: 300 }}
              overlay={(props) => <Tooltip {...props}>{text}</Tooltip>}
              placement={placement}>
              <span>
                {text.substring(0,count)}
                <span className="text-shrinker-ellipsis">...</span>
              </span>
            </OverlayTrigger>
          ):(
            <span>
              {text.substring(0,count)}
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

export const UserRole = (currentPage, right) => {
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    return;
  }
  const decodeToken = jwtDecode(token);
  const roleTitle = decodeToken.role;
  const roleData = roles.find((role) => role.title === roleTitle);
  if (!roleData) {
    localStorage.removeItem('token');
    alert('No Roles Tagged! Please contact administrator');
    window.location.href = '/login';
  }

  const access = roleData.access;

  const currentPageAccess = access.find((acc) => acc.page === currentPage);
  if (!currentPageAccess) return false;
  return currentPageAccess[right];
};
