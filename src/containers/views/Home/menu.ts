import Loadable from 'react-loadable'

import PageLoading from '@components/PageLoading'

const loadComponent = (loader: () => Promise<any>) => Loadable({ loader, loading: PageLoading })

export const asynchronousComponents = {
    Account: loadComponent(() => import(/* webpackChunkName: "Account" */ '@views/Account'))
    // UserInfo: loadComponent(() => import(/* webpackChunkName: "UserInfo" */ '@views/UserInfo'))
}

// all routers key
export type AsynchronousComponentKeys = keyof typeof asynchronousComponents

export interface IMenu {
    title: string
    id: number
    pid?: number
    path?: string
    icon?: string
    component?: AsynchronousComponentKeys
    exact?: boolean
}

export interface IMenuInTree extends IMenu {
    children?: IMenuInTree[]
}

export const menu: IMenu[] = [
    {
        id: 1,
        path: '/account',
        title: '用户管理',
        icon: 'icon-user1',
        component: 'Account',
        exact: true
    }
    // {
    //     id: 3,
    //     pid: 1,
    //     path: '/users/uswe1qwe',
    //     title: '123asdsad',
    //     icon: 'coffee',
    //     component: 'Users',
    //     exact: true
    // }
]

export default menu
