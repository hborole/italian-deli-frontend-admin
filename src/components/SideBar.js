import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  Menu,
  MenuItem,
  // SubMenu,
} from 'react-pro-sidebar';

import React from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <ProSidebar style={{ height: `95vh` }}>
      <SidebarHeader className="navbar-header">
        <h1>Admin Panel</h1>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem>
            Dashboard
            <Link to="/" />
          </MenuItem>
          <MenuItem>
            Products
            <Link to="/products" />
          </MenuItem>
          <MenuItem>
            Customers
            <Link to="/customers" />
          </MenuItem>
          <MenuItem>
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
