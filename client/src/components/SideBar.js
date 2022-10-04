import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  Menu,
  MenuItem,
  // SubMenu,
} from 'react-pro-sidebar';

export default function SideBar() {
  const location = useLocation().pathname;

  return (
    <ProSidebar style={{ height: `95vh` }}>
      <SidebarHeader className="navbar-header">
        <h1>Admin Panel</h1>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem className={location === '/categories' && 'sidebar-active'}>
            Categories
            <Link to="/categories" />
          </MenuItem>
          <MenuItem className={location === '/products' && 'sidebar-active'}>
            Products
            <Link to="/products" />
          </MenuItem>
          <MenuItem className={location === '/customers' && 'sidebar-active'}>
            Customers
            <Link to="/customers" />
          </MenuItem>
          <MenuItem className={location === '/orders' && 'sidebar-active'}>
            Orders
            <Link to="/orders" />
          </MenuItem>
          {/* <SubMenu title="Components">
            
          </SubMenu> */}
        </Menu>
      </SidebarContent>

      <SidebarFooter>
        <Menu iconShape="square">
          <MenuItem>
            Log Out
            <Link to="/signout" />
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}
