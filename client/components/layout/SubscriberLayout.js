import { Layout } from 'antd';
import SubscriberNav from '../nav/SubscriberNav'
import { AuthContext } from '../../context/auth';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {LoadingOutlined} from '@ant-design/icons'
import axios from 'axios';
import LoadingToRedirect from '../LoadingtoRedirect';

const { Content } = Layout;


function SubscriberLayout ({ children }) {

  // context
  const [auth, setAuth] = useContext (AuthContext)

  // state 
  const [loading, setLoading] = useState(true)

  // hooks
  const router = useRouter()

  useEffect(() => {
    // if (auth?.user?.role !=='Admin') {
    //  router.push('/')
    // } else {
    //   setLoading(false)
    // }
    if(auth?.token) getCurrentAuthor()

  }, [auth?.token])

  const getCurrentAuthor = async () => {
  try {
    const { data } = await axios.get("/current-subscriber")
   setLoading(false)


  } catch (error) {
    (error);
     router.push('/')
  }
  }


  if(loading) {
    return <LoadingToRedirect/>
  }

    return (
        <Layout>
            <SubscriberNav />
            <Layout>
          <Content>
            {children}
          </Content>
          </Layout>
        </Layout>
    ); 
}
export default SubscriberLayout;