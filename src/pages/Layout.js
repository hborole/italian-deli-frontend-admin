import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';

export default function Layout() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-start">
        <div maxWidth={`270px`} className={`sidebar-container`}>
          <SideBar />
        </div>
        <div style={{ flex: 1, width: `100%`, height: `100%` }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
