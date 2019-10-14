import React from 'react'
import { Icon as antdIcon } from 'antd'
import { AliIconUrl } from '@config'

const IconFont = antdIcon.createFromIconfontCN({
    scriptUrl: AliIconUrl
})

interface IProps {
    type: string
    [propName: string]: any
}

function Icon({ type, ...rest }: IProps) {
    return <IconFont type={type} {...rest} />
}

export default Icon
