import React from 'react'
import { observer, inject } from 'mobx-react'
import { Layout } from 'antd'

import styles from './index.scss'
import SiderMenu from './Menu'

interface IProps extends IStore {}
function Sider({ globalStore, routerStore }: IProps) {
    const { sideBarCollapsed, toggleSideBarCollapsed } = globalStore

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

export default inject((stores: IStore) => ({
    routerStore: stores.routerStore,
    globalStore: stores.globalStore
}))(observer(Sider))
