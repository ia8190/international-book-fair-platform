import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
export default function LoggedInHeader({ role, onLogout }) {
  const navigate = useNavigate();
  return <Header role={role || localStorage.getItem('userRole')} onLogout={() => { localStorage.removeItem('isLoggedIn'); onLogout(); navigate('/'); }} />;
}
LoggedInHeader.propTypes = { role: PropTypes.string, onLogout: PropTypes.func.isRequired };
