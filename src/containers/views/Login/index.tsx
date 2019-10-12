import React from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Icon, Input, Button, Modal } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { useOnMount } from '@utils/hooks'
import styles from './index.scss'
import Cookies from 'js-cookie'

const FormItem = Form.Item

interface IProps extends FormComponentProps, IStore {}

function Login({ form, authStore, routerStore }: IProps) {
    // const { authStore, routerStore } = this.props
    function checkLogin() {
        if (!authStore.userInfo.token) {
            routerStore.replace('/login')
        }
    }

    useOnMount(checkLogin)

    const [loading, setLoading] = React.useState(false)

    const submit = (e: React.FormEvent<any>): void => {
        e.preventDefault()
        form.validateFields(
            async (err, values): Promise<any> => {
                if (!err) {
                    setLoading(true)
                    try {
                        authStore
                            .login({
                                account: values.account,
                                password: values.password
                            })
                            .then(res => {
                                if (res) {
                                    form.setFieldsValue({
                                        password: ''
                                    })
                                    Modal.error({
                                        title: '登录错误',
                                        content: res
                                    })
                                    Cookies.remove('Auth_token')
                                } else {
                                    Cookies.set('Auth_token', authStore.token, { expires: 0.4 })
                                    routerStore.history.push('/account')
                                }
                            })
                    } finally {
                        setLoading(false)
                    }
                }
            }
        )
    }

    const { getFieldDecorator } = form
    return (
        <div className={styles.login}>
            <Form onSubmit={submit} className={styles.form}>
                <div className={styles.logoBox}>
                    {/* <img src="src/assets/images/slog.png" alt="" /> */}
                    <Icon type="ant-design" />
                </div>
                <FormItem hasFeedback>
                    {getFieldDecorator('account', {
                        rules: [{ required: true }]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="account"
                        />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true }]
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        登录
                    </Button>
                </FormItem>
            </Form>
        </div>
    )
}

export default Form.create<IProps>()(
    inject((stores: IStore) => ({
        authStore: stores.authStore,
        routerStore: stores.routerStore
    }))(observer(Login))
)
