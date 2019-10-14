import React from 'react'
import { observer } from 'mobx-react'
import { Tabs } from 'antd'

function Account() {
    return (
        <div>
            <Tabs defaultActiveKey="1" size="small">
                <Tabs.TabPane tab="所有用户" key="1">
                    <div>111</div>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default observer(Account)
