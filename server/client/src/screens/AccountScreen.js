import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from '../context/AuthContext'
import { useHttp } from "../hooks/http.hook"

import M from 'materialize-css'

export const AccountScreen = () => {

  const autoInit = async () => {
    await M.AutoInit()
  }

  const { request } = useHttp()

  let { email } = useParams();

  const { header, container, page, wrapper, listItemStyle } = style
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { token, userId } = useContext(AuthContext)

  const accountId = email || userId;

  const message = useMessage();

  const [inputValue, setInputValue] = useState('')
  const [account, setAccount] = useState([])


  const getAccount = useCallback(async (email) => {
    try {
      const data = await request(
        `/api/account/${email}`,
        'GET',
        null,
        { Authorization: `Bearer ${token}` }
      )
      setAccount(data)
      autoInit()
    } catch (e) {
      message(JSON.stringify(e))
    }
  }, [token, request, setAccount])



  useEffect(() => {

    getAccount(accountId)
  }, [getAccount])


  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  const addFriendHandler = async (event) => {
    event.preventDefault()

    try {
      const data = await request(
        '/api/account/friend',
        'POST',
        { target_account_id: accountId },
        { Authorization: `Bearer ${auth.token}` }
      )
      message(JSON.stringify(data));
    } catch (e) {
      message(JSON.stringify(e));
    }

  }

  return (
    <div style={page}>
      <div style={wrapper}>
        <div style={header}>
          <h3 style={{ margin: 0 }}>
            {accountId}
          </h3>
          {
            accountId != userId
              ? <a href="#" className="waves-effect waves-light btn" onClick={addFriendHandler}> Добавить в друзья</a>
              : null
          }

          <a className="waves-effect waves-light btn"
            href="/"
            onClick={logoutHandler}
          >Logout</a>
        </div>
        <div style={container}>

          <div>
            <div>Имя: {account._name}</div>
            <div>Фамилия: {account._last_name}</div>
            <div>Возраст: {account._age}</div>
            <div>Пол: {account._gender}</div>
            <div>Город: {account._city}</div>
            <div>Интересы: {account._interests}</div>
          </div>

        </div>
        <div style={container}>
          <div>Друзья</div>
          <ul>
            {account._friends
              ? account?._friends.map((email, index) => {
                return (
                  <li name={email} style={listItemStyle} key={index}>
                    <a href={"/account/" + email}>{email}</a>
                  </li>
                );
              })
              : null
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

const style = {
  page:
  {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: 800,

  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    display: "flex",
    flex: 0.1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    backgroundColor: '#424242',
    color: 'white'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)'
  },
  inputBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
  },

  listItemStyle: {
    display: 'flex',
    cursor: 'pointer'

  }
}