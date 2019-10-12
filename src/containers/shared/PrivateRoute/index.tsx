import React from 'react'
import { observer, inject } from 'mobx-react'
import { Route, RouteProps } from 'react-router-dom'

import { useOnMount } from '@utils/hooks'
// import useRootStore from '@store/useRootStore'

function PrivateRoute({ component: Component, authStore, routerStore, ...rest }: any) {
    // const { routerStore, authStore } = useRootStore()
    function checkLocalUserInfo() {
        if (!authStore.userInfo.token) {
            routerStore.history.replace('/login')
        }
    }

    useOnMount(checkLocalUserInfo)

    return <Route {...rest} render={props => <Component {...props} {...rest} />} />
}

export default inject((stores: IStore) => ({
    authStore: stores.authStore,
    routerStore: stores.routerStore
}))(observer(PrivateRoute))
