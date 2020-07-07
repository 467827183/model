import React ,{useState,createRef}from 'react';
import {reqLogin} from '../ajax';
import style from './index.css'
import { Form, Icon, Input, Button } from 'antd';
import { hashHistory } from 'react-router';
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // values存储这提交的数据对象
              //调用父组件的login方法，由父组件发送请求去登陆
              this.props.login(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className={style["login-form"]}>
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名!' },{min:3,message:'用户名请大于三位'},{max:6,message:'用户名请小于六位'}],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    className={style["login-input"]}
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    className={style["login-input"]}
                    />,
                )}
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className={style["login-form-button"]}>
                    Log in
                </Button>
                </Form.Item>
            </Form>
      </div>
    );
  }
}

export const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
