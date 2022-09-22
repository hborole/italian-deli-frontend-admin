import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';

export default function Layout() {
  return (
    <>
      <div className="d-flex align-items-start justify-content-start">
        <div style={{ maxWidth: `270px` }} className={`sidebar-container`}>
          <SideBar />
        </div>
        <div
          style={{
            flex: 1,
            width: `100%`,
            height: `100%`,
            padding: `6rem 4rem`,
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
