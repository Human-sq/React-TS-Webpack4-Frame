import React from 'react'
import { observer } from 'mobx-react'
import { Layout } from 'antd'

import useRootStore from '@store/useRootStore'
import styles from './index.scss'
import SiderMenu from './Menu'

function Sider() {
    const { sideBarCollapsed, toggleSideBarCollapsed } = useRootStore().globalStore
    const { routerStore } = useRootStore()

    const toHome = () => {
        routerStore.history.push('/account')
    }
    return (
        <Layout.Sider onCollapse={toggleSideBarCollapsed} collapsible collapsed={sideBarCollapsed}>
            <div className={styles.logo} onClick={toHome}>
                {sideBarCollapsed ? (
                    <img src={require('@images/slog-min.png')} alt="slog-min" />
                ) : (
                    <img src={require('@images/slog.png')} alt="slog" />
                )}
            </div>
            <SiderMenu />
        </Layout.Sider>
    )
}

export default observer(Sider)
