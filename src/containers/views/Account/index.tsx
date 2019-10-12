import React from 'react'
import { observer, inject } from 'mobx-react'
// import { useOnMount } from '@utils/hooks'

export interface IProps extends IStore {}

function Account({ routerStore }: IProps) {
    // useOnMount()

    return <div>Account</div>
}

export default inject((stores: IStore) => ({
    routerStore: stores.routerStore
}))(observer(Account))
