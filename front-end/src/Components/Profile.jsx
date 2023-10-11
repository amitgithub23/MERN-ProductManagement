import React from 'react'

const Profile = () => {

  let user = localStorage.getItem('user')


  return (
    <>
      <div className='profile-main' >

    
        <h2>Persional Details</h2>
        <table >
          <tbody>
            <tr>
              <td className='first'>
                  ID   
              </td>
              <td>
              {JSON.parse(user)._id}
                </td>
            </tr>
            <tr>
              <td className='first'>
              NAME 
              </td>
              <td>
              {JSON.parse(user).name}
                </td>
            </tr>
            <tr>
              <td className='first'>
              E-mail 
              </td>
              <td>
              {JSON.parse(user).email}
                </td>
            </tr>
          </tbody>
        </table>
     
      </div>
    </>
  )
}

export default Profile
