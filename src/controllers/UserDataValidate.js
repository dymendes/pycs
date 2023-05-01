export const validate = {
  username(username) {
    if(username === undefined) {
      return false
    } else {
      return (/^[a-záàâãéèêíïóôõöúçñ]+/i).test(username)
    }
  },
  email(email) {
    if(email === undefined) {
      return false
    } else {
      return (/\S+@\S+\.\S+/).test(email)
    }
  },
  password(password) {
    if(password === undefined || password.length < 5) {
      return false
    } else {
      return true
    }
  }
}