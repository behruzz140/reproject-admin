import { Button, Form, Input } from 'antd'
import './style.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import http from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()


  async function handleSubmit(value:any){
    const response = await http.post('/admins/sign-in', value)
    if(response.status == 200){
        localStorage.setItem('access_token', response?.data?.payload?.token)
        toast.success('Login successful', {autoClose: 1300})
        setTimeout(() => {
          navigate('/dashboard')
        }, 1600);
    }else{
      toast.error('Invalid credentials', {autoClose: 1300})
    }
  }

  return (
     <>
       <ToastContainer/>
    <div className='login'>
      <h1>Login</h1>
       <Form onFinish={handleSubmit}>
          <Form.Item name={'username'} rules={[{
            required: true,
            message: 'Please input your username!',
          }]} hasFeedback>
            <Input prefix={<UserOutlined/>} placeholder='Enter your username'/>
          </Form.Item>
          
          <Form.Item hasFeedback name={'password'} rules={[{
            required: true,
            message: 'Please input your password!',
          }]}>
            <Input.Password prefix={<LockOutlined/>} placeholder='********'/>
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
       </Form>
    </div>
     </>
  )
}

export default Login