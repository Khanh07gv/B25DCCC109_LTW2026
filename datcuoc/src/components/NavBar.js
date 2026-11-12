import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const getStyle = ({ isActive }) => ({
        backgroundColor: isActive ? 'darkgreen' : 'transparent',
        color: isActive ? 'white' : 'black',
        padding: '10px 15px',
        textDecoration: 'none',
        marginRight: '10px',
        borderRadius: '4px',
        display: 'inline-block'
    });

    return (
        <nav style={{ padding: '15px', borderBottom: '2px solid #eee' }}>
            <NavLink to="/" end style={getStyle}>Trang chủ</NavLink>
            <NavLink to="/questions" style={getStyle}>Ngân hàng câu hỏi</NavLink>
            <NavLink to="/history" style={getStyle}>Lịch sử</NavLink>
        </nav>
    );
};
export default NavBar;
