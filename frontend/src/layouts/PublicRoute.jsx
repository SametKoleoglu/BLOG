import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const PublicRoute = ({ children }) => {
    const loggedIn = useAuthStore((state) => state.isLoggedIn)();

    // Eğer kullanıcı giriş yapmışsa, kimlik doğrulama sayfalarına erişim engellenecek
    return !loggedIn ? <>{children}</> : <Navigate to="/" />;
};

export default PublicRoute;
