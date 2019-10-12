import React from 'react'
import { Icon as antdIcon } from 'antd'

const IconFont = antdIcon.createFromIconfontCN({
    scriptUrl: 'http://at.alicdn.com/t/font_1173911_o13o1ln99ps.js'
})

interface IProps {
    type: string
    className?: any
    style?: any
    onClick?: any
}

function Icon({ type, className, style, onClick }: IProps) {
    return <IconFont type={type} className={className} style={style} onClick={onClick} />
}

export default Icon
