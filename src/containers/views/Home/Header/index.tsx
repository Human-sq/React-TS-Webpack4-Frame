import React from 'react'
import { observer } from 'mobx-react'
import { Layout, Dropdown, Avatar, Menu } from 'antd'
import styles from './index.scss'
import Cookies from 'js-cookie'
import useRootStore from '@store/useRootStore'

function Header() {
    const { authStore, routerStore } = useRootStore()
    const loginOut = () => {
        Cookies.remove('Auth_token')
        authStore.logout()
        routerStore.replace('/login')
    }

    const toUserInfo = () => {
        routerStore.replace('/userInfo')
    }
    const menuList = (
        <Menu>
            <Menu.Item key="0" onClick={toUserInfo}>
                基本信息
            </Menu.Item>
            <Menu.Item key="1" onClick={loginOut}>
                退出
            </Menu.Item>
        </Menu>
    )
    return (
        <Layout.Header className={styles.header}>
            <Dropdown className={styles.dropdown} overlay={menuList} trigger={['click']} placement="bottomCenter">
                <div style={{ cursor: 'pointer' }}>
                    <Avatar src={require('@images/tx.jpg')} style={{ marginRight: '10px' }} />
                    {authStore.userInfo.username}
                </div>
            </Dropdown>
        </Layout.Header>
    )
}

export default observer(Header)
