import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Không tìm thấy trang</h1>
            <Link to="/" style={{ textDecoration: 'none', color: 'blue', fontSize: '1.2em' }}>
                Về trang chủ
            </Link>
        </div>
    );
};
export default NotFound;
