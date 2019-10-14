/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import { observer } from 'mobx-react'
import { Button, Input, Icon, Table as AntdTable } from 'antd'
import styles from './index.scss'
import { RootConsumer } from '@shared/App/Provider'

export interface IProps {
    onRef: any
    rowKey: string
    columns: any[]
    data: any[]
    loading: boolean
}

@observer
class Table extends React.Component<IProps> {
    state = {
        searchText: '',
        sortedInfo: {
            order: 'descend',
            columnKey: this.props.rowKey
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.props.onRef(this)
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select())
            }
        }
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm()
        this.setState({ searchText: selectedKeys[0] })
    }

    handleReset = clearFilters => {
        clearFilters()
        this.setState({ searchText: '' })
    }

    render() {
        return (
            <AntdTable
                rowKey={this.props.rowKey}
                scroll={{ x: 900 }}
                columns={this.props.columns}
                dataSource={this.props.data || []}
                pagination={{ defaultPageSize: 16, showTotal: total => `共 ${total} 条数据` }}
                loading={this.props.loading}
            />
        )
    }
}

export default Table
