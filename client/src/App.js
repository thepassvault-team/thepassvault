import './App.css';
import {useState, useEffect} from 'react'
import Axios from 'axios'

function App() {

  const [user_password, setPassword] = useState('')
  const [platform_name, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    Axios.get("http://thepassvault.com:3001/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  const addPassword = () => {
    Axios.post('http://thepassvault.com:3001/addpassword', {platform_name: platform_name, url: url, username: username, user_password: user_password});
  };


  const decryptPassword = (encryption) => {
    Axios.post("http://thepassvault.com:3001/decryptpassword", {
      user_password: encryption.user_password,
      iv: encryption.iv,
    }).then((response) => {
      setPasswordList(
        passwordList.map((val) => {
          return val.id == encryption.id
            ? {
                id: val.id,
                user_password: val.user_password,
                platform_name: response.data,
                iv: val.iv,
              }
            : val;
        })
      );
    });
  };



  return (
    <div className="App">
      <div className='AddingPassword'>
        <input type='text' placeholder='Platform' 
        onChange={(event) => { 
          setTitle(event.target.value);
        }} />
        <input type='text' placeholder='URL'
        onChange={(event) => { 
          setUrl(event.target.value);
        }} />
        <input type='text' placeholder='Username'
        onChange={(event) => { 
          setUsername(event.target.value);
        }} />
        <input type='text' placeholder='Password'
        onChange={(event) => { 
          setPassword(event.target.value);
        }} />
        
        <button onClick={addPassword}> Add Information</button>
      </div>
      
      <div className="Passwords">
        {passwordList.map((val, key) => {
          return (
            <div
              className="password"
              onClick={() => {

                decryptPassword({
                  user_password: val.user_password,
                  iv: val.iv,
                  id: val.id,
                  
                });

                
              }}
              key={key}
            >
              <h3>{val.platform_name}</h3>
              
            </div>
          );
        })}
      </div>


    </div>
  );
}

export default App;