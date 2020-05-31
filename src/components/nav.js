import React from "react";
import "antd/dist/antd.css";
import { Menu } from 'antd';
import { AppstoreOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";

const { SubMenu } = Menu;

class NavComponent extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    window.location.reload(true)
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div className="text-center">
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="3" icon={<SearchOutlined />}>
          <NavLink to="/">
            Search
          </NavLink>
        </Menu.Item>
        <Menu.Item key="1" icon={<SaveOutlined />}>
          <NavLink to="/saved">
            Saved
          </NavLink>
        </Menu.Item>
        <SubMenu icon={<AppstoreOutlined />} title="Categories">
          <Menu.ItemGroup title="Select a category">
            <Menu.Item key="cat:1">
              <NavLink to="/category/nature">Nature</NavLink>
            </Menu.Item>
            <Menu.Item key="cat:2">
              <NavLink to="/category/people">People</NavLink>
            </Menu.Item>
            <Menu.Item key="cat:3">
              <NavLink to="/category/science">Science</NavLink>
            </Menu.Item>
            <Menu.Item key="cat:4">
              <NavLink to="/category/sports">Sports</NavLink>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
      </div>
    );
  }
};

export default NavComponent;