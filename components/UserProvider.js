import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';

const UserProvider = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {    
    fetch('/api/user/getuser') // fetch user data from api
        .then(response => response.json())
        .then(data => setUser(data)) // set userAtom
        .catch(e => {
            if (e.message != "Error: No token found") { // We don't need to do anything if the user is not logged in
                console.log(e)
            }
        }
        );
  }, []);

  return children;
};

export default UserProvider;
