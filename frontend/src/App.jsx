import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const port = 3000;
  const [postData, setPostData] = useState({});
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isTokenAllocated, setIsTokenAllocated] = useState(!!localStorage.getItem('token'));
  const URL = `http://localhost:${port}/api/v1/gatekeeper`;

  function handelChange(event) {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value
    });
  }

  const access = async () => {
    const token = localStorage.getItem('token');

    try {
      const respond = await axios.get(`${URL}/access`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setConsoleOutput([
        ...consoleOutput,
        {
          status: 'success',
          data: respond.data.msg
        }
      ])
    }
    catch (err) {
      setConsoleOutput([
        ...consoleOutput,
        {
          status: 'error',
          data: `error ${err.response.data.msg}`
        }
      ])
    }

  }

  const login = async () => {
    try {
      const response = await axios.post(`${URL}/login`,
        postData,
        { withCredentials: true });
      setConsoleOutput([
        ...consoleOutput,
        {
          status: 'success',
          data: `recived token ${response.data.token}`
        }
      ]);

      localStorage.setItem("token", response.data.token);
      setIsTokenAllocated(true);
    }
    catch (err) {
      console.log(err.response.data.msg);
      setConsoleOutput([
        ...consoleOutput,
        {
          status: 'error',
          data: `error ${err.response.data.msg}`
        }
      ])
    }

  }

  const handleButton = () => {
    return (isTokenAllocated) ?
      "clear-token-active" :
      "clear-token-inactive"
  }

  const clearTokens = ()=>{
    localStorage.clear();
    setIsTokenAllocated(false);
  }

  return (
    <>
      <h1 className="heading">GATEKEEPER</h1>
      <p className="subheading">// secure authentication system</p>
      <main>

        <div className="login-section">
          <div className="login-box">
            <h2 className="title">Login</h2>

            <div className="form-group">
              <label name="username">Username</label>
              <input type="text" id="username" name="username" onChange={handelChange} />
            </div>

            <div className="form-group">
              <label password="password">Password</label>
              <input type="password" id="password" name="password" onChange={handelChange} />
            </div>

            <button type="button" className="submit-btn" onClick={login}>Submit</button>
          </div>
          <button type="button" className="access-btn" onClick={access}>Access Data</button>
          <button type="button" className={handleButton()} onClick={clearTokens}>Terminate Token</button>

        </div>

        <div className="console-section">
          <div className="console-box">
            <div className="console-header">
              <span className="green-dot"></span>
              <span>Console Output</span>
            </div>
            <div className="console-body">
              {
                consoleOutput.map((el, id) => (
                  <p key={id} className={`console-output-${el.status}`}>
                    $ {el.data}
                  </p>
                ))
              }
            </div>
          </div>
        </div>


      </main>

    </>
  )
}

export default App
